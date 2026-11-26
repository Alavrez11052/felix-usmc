export const PERMISSIONS = [
  { key: "commands", label: "Commands, units & staff" },
  { key: "leadership", label: "HQ chain of command" },
  { key: "ranks", label: "Rank structure" },
  { key: "announcements", label: "Announcements" },
  { key: "affiliates", label: "Affiliated groups" },
  { key: "config", label: "Site configuration & links" },
  { key: "audit", label: "Audit log (view)" },
  { key: "admins", label: "Manage administrators" },
] as const;

export type PermissionKey = (typeof PERMISSIONS)[number]["key"];

export function hasPermission(u: { role: string; permissions: string[] }, key: string) {
  return u.role === "OWNER" || u.permissions.includes(key);
}

export function permissionsFromForm(fd: FormData) {
  return PERMISSIONS.map((p) => p.key).filter((k) => fd.get(`perm_${k}`) === "on");
}
