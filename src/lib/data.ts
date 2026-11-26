import { db } from "./db";

export async function getConfig() {
  const cfg = await db.siteConfig.findUnique({ where: { id: 1 } });
  return cfg ?? { id: 1, discordUrl: "", robloxGroupUrl: "", xUrl: "", bannerText: null };
}

export async function getCommands() {
  return db.command.findMany({
    orderBy: { sortOrder: "asc" },
    include: { units: { orderBy: { sortOrder: "asc" } }, staff: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getCommand(slug: string) {
  return db.command.findUnique({
    where: { slug },
    include: { units: { orderBy: { sortOrder: "asc" } }, staff: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getLeadership() {
  return db.leadership.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getRankStructure() {
  return db.rankCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: { ranks: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getAnnouncements() {
  return db.announcement.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getAffiliates() {
  return db.affiliate.findMany({ orderBy: { sortOrder: "asc" } });
}
