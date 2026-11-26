import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";

export const metadata = { title: "Admin — Audit Log" };

export default async function AdminAudit() {
  const me = await getCurrentUser();
  if (!me || !hasPermission(me, "audit")) redirect("/admin");
  const logs = await db.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  return (
    <div>
      <h1 className="h-display text-3xl">Audit Log</h1>
      <p className="mt-2 text-sm text-neutral-600">Every administrative action, newest first (last 200).</p>
      <div className="mt-6 border border-neutral-300 bg-white divide-y divide-neutral-200">
        {logs.map((l) => (
          <div key={l.id} className="px-4 py-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <span className="font-display font-bold text-xs uppercase tracking-widest w-44 shrink-0">{l.action}</span>
            <span className="flex-1 min-w-[160px]">{l.details}</span>
            <span className="text-ash">{l.userEmail || "system"}</span>
            <span className="text-ash">{l.createdAt.toLocaleString()}</span>
          </div>
        ))}
        {logs.length === 0 && <p className="px-4 py-6 text-sm text-neutral-600">No activity recorded yet.</p>}
      </div>
    </div>
  );
}
