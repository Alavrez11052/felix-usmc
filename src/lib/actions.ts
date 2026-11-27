"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "./db";
import { audit } from "./audit";
import { createSession, destroySession, getCurrentUser, hashPassword, requirePermission, requireUser, verifyPassword } from "./auth";
import { permissionsFromForm } from "./permissions";

const OWNER_EMAIL = "braydenkennedy061@gmail.com";

function str(fd: FormData, key: string) {
  return String(fd.get(key) ?? "").trim();
}
function revalidateSite() {
  revalidatePath("/", "layout");
}

/* ---------------- Auth ---------------- */

export async function setupOwner(fd: FormData) {
  const count = await db.user.count();
  if (count > 0) throw new Error("Setup already complete");
  const email = str(fd, "email").toLowerCase();
  const name = str(fd, "name");
  const password = str(fd, "password");
  if (email !== OWNER_EMAIL) throw new Error("The owner account must use the site owner's email address");
  if (!email || !name || password.length < 8) throw new Error("Name, email, and an 8+ character password are required");
  const user = await db.user.create({ data: { email, name, passwordHash: await hashPassword(password), role: "OWNER" } });
  await audit({ id: user.id, email }, "OWNER_SETUP", email);
  await createSession({ id: user.id, email, name, role: "OWNER", permissions: [] });
  redirect("/admin");
}

export async function login(fd: FormData) {
  const email = str(fd, "email").toLowerCase();
  const password = str(fd, "password");
  const user = await db.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    redirect("/login?error=1");
  }
  await audit({ id: user.id, email }, "LOGIN", "");
  await createSession({ id: user.id, email: user.email, name: user.name, role: user.role, permissions: user.permissions });
  redirect("/admin");
}

export async function logout() {
  destroySession();
  redirect("/");
}

export async function acceptInvite(fd: FormData) {
  const token = str(fd, "token");
  const name = str(fd, "name");
  const password = str(fd, "password");
  if (!name || password.length < 8) throw new Error("Name and an 8+ character password are required");
  const invite = await db.adminInvite.findUnique({ where: { token } });
  if (!invite || invite.claimedAt) throw new Error("This invite is invalid or has already been used");
  const user = await db.user.create({ data: { email: invite.email, name, passwordHash: await hashPassword(password), role: "ADMIN" } });
  await db.adminInvite.update({ where: { id: invite.id }, data: { claimedAt: new Date() } });
  await audit({ id: user.id, email: user.email }, "ADMIN_INVITE_CLAIMED", invite.email);
  await createSession({ id: user.id, email: user.email, name, role: "ADMIN", permissions: [] });
  redirect("/admin");
}

/* ---------------- Admins (owner only) ---------------- */

export type CreateAdminState = { email?: string; password?: string; error?: string } | null;

const PW_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
function generatePassword(length = 14) {
  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => PW_ALPHABET[b % PW_ALPHABET.length]).join("");
}

/** Owner adds an administrator by email. The account is created immediately with a
 *  generated temporary password, returned once so the owner can hand it over.
 *  The new admin signs in with it and can change it under My Account. */
export async function createAdminAccount(_prev: CreateAdminState, fd: FormData): Promise<CreateAdminState> {
  const owner = await requirePermission("admins");
  const email = str(fd, "email").toLowerCase();
  const name = str(fd, "name") || email.split("@")[0];
  if (!email.includes("@")) return { error: "A valid email is required" };
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return { error: "That email already has an account" };
  const password = generatePassword();
  const permissions = permissionsFromForm(fd);
  await db.user.create({ data: { email, name, passwordHash: await hashPassword(password), role: "ADMIN", permissions } });
  await audit(owner, "ADMIN_CREATED", `${email} [${permissions.join(", ") || "no permissions"}]`);
  revalidateSite();
  return { email, password };
}

export async function changePassword(fd: FormData) {
  const session = await requireUser();
  const current = str(fd, "currentPassword");
  const next = str(fd, "newPassword");
  if (next.length < 8) throw new Error("New password must be at least 8 characters");
  const user = await db.user.findUnique({ where: { id: session.id } });
  if (!user || !(await verifyPassword(current, user.passwordHash))) {
    redirect("/admin/account?error=1");
  }
  await db.user.update({ where: { id: session.id }, data: { passwordHash: await hashPassword(next) } });
  await audit(session, "PASSWORD_CHANGED", "");
  redirect("/admin/account?done=1");
}

export async function removeAdmin(fd: FormData) {
  const owner = await requirePermission("admins");
  const id = str(fd, "id");
  const target = await db.user.findUnique({ where: { id } });
  if (!target || target.role === "OWNER") throw new Error("Cannot remove that account");
  if (target.id === owner.id) throw new Error("You cannot remove your own account");
  await db.user.delete({ where: { id } });
  await audit(owner, "ADMIN_REMOVED", target.email);
  revalidateSite();
}

export async function setAdminPermissions(fd: FormData) {
  const actor = await requirePermission("admins");
  const id = str(fd, "id");
  const target = await db.user.findUnique({ where: { id } });
  if (!target || target.role === "OWNER") throw new Error("Cannot change that account");
  const permissions = permissionsFromForm(fd);
  await db.user.update({ where: { id }, data: { permissions } });
  await audit(actor, "ADMIN_PERMISSIONS_UPDATED", `${target.email}: ${permissions.join(", ") || "none"}`);
  revalidateSite();
}

export async function revokeInvite(fd: FormData) {
  const owner = await requirePermission("admins");
  const id = str(fd, "id");
  const invite = await db.adminInvite.findUnique({ where: { id } });
  if (invite) {
    await db.adminInvite.delete({ where: { id } });
    await audit(owner, "ADMIN_INVITE_REVOKED", invite.email);
  }
  revalidateSite();
}

/* ---------------- Config ---------------- */

export async function updateConfig(fd: FormData) {
  const user = await requirePermission("config");
  const banner = str(fd, "bannerText");
  await db.siteConfig.upsert({
    where: { id: 1 },
    update: { discordUrl: str(fd, "discordUrl"), robloxGroupUrl: str(fd, "robloxGroupUrl"), xUrl: str(fd, "xUrl"), bannerText: banner || null },
    create: { id: 1, discordUrl: str(fd, "discordUrl"), robloxGroupUrl: str(fd, "robloxGroupUrl"), xUrl: str(fd, "xUrl"), bannerText: banner || null },
  });
  await audit(user, "CONFIG_UPDATED", "");
  revalidateSite();
}

/* ---------------- Commands ---------------- */

export async function createCommand(fd: FormData) {
  const user = await requirePermission("commands");
  const name = str(fd, "name");
  const slug = str(fd, "slug").toLowerCase().replace(/[^a-z0-9-]/g, "-") || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const max = await db.command.aggregate({ _max: { sortOrder: true } });
  const cmd = await db.command.create({
    data: { name, slug, abbr: str(fd, "abbr"), tagline: str(fd, "tagline"), description: str(fd, "description"), discordUrl: str(fd, "discordUrl") || null, image: str(fd, "image"), sortOrder: (max._max.sortOrder ?? 0) + 1 },
  });
  await audit(user, "COMMAND_CREATED", name);
  revalidateSite();
  redirect(`/admin/commands/${cmd.id}`);
}

export async function updateCommand(fd: FormData) {
  const user = await requirePermission("commands");
  const id = str(fd, "id");
  await db.command.update({
    where: { id },
    data: { name: str(fd, "name"), abbr: str(fd, "abbr"), tagline: str(fd, "tagline"), description: str(fd, "description"), discordUrl: str(fd, "discordUrl") || null, image: str(fd, "image"), sortOrder: parseInt(str(fd, "sortOrder") || "0", 10) },
  });
  await audit(user, "COMMAND_UPDATED", str(fd, "name"));
  revalidateSite();
}

export async function deleteCommand(fd: FormData) {
  const user = await requirePermission("commands");
  const id = str(fd, "id");
  const cmd = await db.command.findUnique({ where: { id } });
  await db.command.delete({ where: { id } });
  await audit(user, "COMMAND_DELETED", cmd?.name ?? id);
  revalidateSite();
  redirect("/admin/commands");
}

export async function addUnit(fd: FormData) {
  const user = await requirePermission("commands");
  const commandId = str(fd, "commandId");
  const max = await db.unit.aggregate({ where: { commandId }, _max: { sortOrder: true } });
  await db.unit.create({ data: { commandId, name: str(fd, "name"), description: str(fd, "description"), discordNote: str(fd, "discordNote") || "WIP", sortOrder: (max._max.sortOrder ?? 0) + 1 } });
  await audit(user, "UNIT_ADDED", str(fd, "name"));
  revalidateSite();
}

export async function updateUnit(fd: FormData) {
  const user = await requirePermission("commands");
  await db.unit.update({ where: { id: str(fd, "id") }, data: { name: str(fd, "name"), description: str(fd, "description"), discordNote: str(fd, "discordNote"), sortOrder: parseInt(str(fd, "sortOrder") || "0", 10) } });
  await audit(user, "UNIT_UPDATED", str(fd, "name"));
  revalidateSite();
}

export async function deleteUnit(fd: FormData) {
  const user = await requirePermission("commands");
  await db.unit.delete({ where: { id: str(fd, "id") } });
  await audit(user, "UNIT_DELETED", str(fd, "name"));
  revalidateSite();
}

export async function addStaff(fd: FormData) {
  const user = await requirePermission("commands");
  const commandId = str(fd, "commandId");
  const max = await db.commandStaff.aggregate({ where: { commandId }, _max: { sortOrder: true } });
  await db.commandStaff.create({ data: { commandId, roleTitle: str(fd, "roleTitle"), rankLabel: str(fd, "rankLabel"), name: str(fd, "name"), sortOrder: (max._max.sortOrder ?? 0) + 1 } });
  await audit(user, "STAFF_ADDED", `${str(fd, "roleTitle")}: ${str(fd, "name")}`);
  revalidateSite();
}

export async function updateStaff(fd: FormData) {
  const user = await requirePermission("commands");
  await db.commandStaff.update({ where: { id: str(fd, "id") }, data: { roleTitle: str(fd, "roleTitle"), rankLabel: str(fd, "rankLabel"), name: str(fd, "name"), sortOrder: parseInt(str(fd, "sortOrder") || "0", 10) } });
  await audit(user, "STAFF_UPDATED", `${str(fd, "roleTitle")}: ${str(fd, "name")}`);
  revalidateSite();
}

export async function deleteStaff(fd: FormData) {
  const user = await requirePermission("commands");
  await db.commandStaff.delete({ where: { id: str(fd, "id") } });
  await audit(user, "STAFF_DELETED", str(fd, "roleTitle"));
  revalidateSite();
}

/* ---------------- Leadership ---------------- */

export async function addLeadership(fd: FormData) {
  const user = await requirePermission("leadership");
  const max = await db.leadership.aggregate({ _max: { sortOrder: true } });
  await db.leadership.create({ data: { abbr: str(fd, "abbr"), title: str(fd, "title"), rankTitle: str(fd, "rankTitle"), name: str(fd, "name"), sortOrder: (max._max.sortOrder ?? 0) + 1 } });
  await audit(user, "LEADERSHIP_ADDED", `${str(fd, "abbr")}: ${str(fd, "name")}`);
  revalidateSite();
}

export async function updateLeadership(fd: FormData) {
  const user = await requirePermission("leadership");
  await db.leadership.update({ where: { id: str(fd, "id") }, data: { abbr: str(fd, "abbr"), title: str(fd, "title"), rankTitle: str(fd, "rankTitle"), name: str(fd, "name"), sortOrder: parseInt(str(fd, "sortOrder") || "0", 10) } });
  await audit(user, "LEADERSHIP_UPDATED", `${str(fd, "abbr")}: ${str(fd, "name")}`);
  revalidateSite();
}

export async function deleteLeadership(fd: FormData) {
  const user = await requirePermission("leadership");
  await db.leadership.delete({ where: { id: str(fd, "id") } });
  await audit(user, "LEADERSHIP_DELETED", str(fd, "abbr"));
  revalidateSite();
}

/* ---------------- Ranks ---------------- */

export async function updateRank(fd: FormData) {
  const user = await requirePermission("ranks");
  await db.rank.update({ where: { id: str(fd, "id") }, data: { code: str(fd, "code"), name: str(fd, "name"), sortOrder: parseInt(str(fd, "sortOrder") || "0", 10) } });
  await audit(user, "RANK_UPDATED", `${str(fd, "code")}: ${str(fd, "name")}`);
  revalidateSite();
}

/* ---------------- Announcements ---------------- */

export async function createAnnouncement(fd: FormData) {
  const user = await requirePermission("announcements");
  await db.announcement.create({ data: { title: str(fd, "title"), body: str(fd, "body"), featured: fd.get("featured") === "on" } });
  await audit(user, "ANNOUNCEMENT_CREATED", str(fd, "title"));
  revalidateSite();
}

export async function updateAnnouncement(fd: FormData) {
  const user = await requirePermission("announcements");
  await db.announcement.update({ where: { id: str(fd, "id") }, data: { title: str(fd, "title"), body: str(fd, "body"), featured: fd.get("featured") === "on" } });
  await audit(user, "ANNOUNCEMENT_UPDATED", str(fd, "title"));
  revalidateSite();
}

export async function deleteAnnouncement(fd: FormData) {
  const user = await requirePermission("announcements");
  await db.announcement.delete({ where: { id: str(fd, "id") } });
  await audit(user, "ANNOUNCEMENT_DELETED", str(fd, "title"));
  revalidateSite();
}

/* ---------------- Affiliates ---------------- */

export async function addAffiliate(fd: FormData) {
  const user = await requirePermission("affiliates");
  const max = await db.affiliate.aggregate({ _max: { sortOrder: true } });
  await db.affiliate.create({ data: { name: str(fd, "name"), url: str(fd, "url"), description: str(fd, "description"), sortOrder: (max._max.sortOrder ?? 0) + 1 } });
  await audit(user, "AFFILIATE_ADDED", str(fd, "name"));
  revalidateSite();
}

export async function deleteAffiliate(fd: FormData) {
  const user = await requirePermission("affiliates");
  await db.affiliate.delete({ where: { id: str(fd, "id") } });
  await audit(user, "AFFILIATE_DELETED", str(fd, "name"));
  revalidateSite();
}

export async function currentUserEmail() {
  const u = await getCurrentUser();
  return u?.email ?? "";
}
