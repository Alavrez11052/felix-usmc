import { db } from "./db";

export async function audit(user: { id: string; email: string } | null, action: string, details = "") {
  try {
    await db.auditLog.create({ data: { userId: user?.id ?? null, userEmail: user?.email ?? "", action, details } });
  } catch {
    // Audit logging must never break the action itself.
  }
}
