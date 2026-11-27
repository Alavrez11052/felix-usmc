import Link from "next/link";
import { db } from "@/lib/db";

export const metadata = { title: "Admin Overview" };

export default async function AdminOverview() {
  const [users, commands, leadership, announcements, invites, recentAudit, recentAnn] = await Promise.all([
    db.user.count(), db.command.count(), db.leadership.count(), db.announcement.count(),
    db.adminInvite.count({ where: { claimedAt: null } }),
    db.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
    db.announcement.findMany({ orderBy: { createdAt: "desc" }, take: 3 }),
  ]);
  const stats = [
    { n: users, label: "Administrators" },
    { n: commands, label: "Commands" },
    { n: leadership, label: "Leadership Positions" },
    { n: announcements, label: "Announcements" },
    { n: invites, label: "Pending Invites" },
  ];
  return (
    <div>
      <h1 className="h-display text-3xl">Dashboard Overview</h1>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="admin-card text-center">
            <div className="font-display font-black text-3xl">{s.n}</div>
            <div className="text-[11px] font-display font-bold uppercase tracking-widest text-ash mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <section className="admin-card">
          <h2 className="font-display font-bold uppercase tracking-wide">Recent Announcements</h2>
          {recentAnn.length === 0 ? <p className="mt-3 text-sm text-neutral-600">None yet.</p> : (
            <ul className="mt-3 space-y-2 text-sm">
              {recentAnn.map((a) => <li key={a.id} className="border-b border-neutral-200 pb-2"><span className="font-semibold">{a.title}</span> <span className="text-ash">· {a.createdAt.toLocaleDateString()}</span></li>)}
            </ul>
          )}
          <Link href="/admin/announcements" className="btn-outline-b mt-4 !px-4 !py-2 text-xs">Manage Announcements</Link>
        </section>
        <section className="admin-card">
          <h2 className="font-display font-bold uppercase tracking-wide">Recent Activity</h2>
          {recentAudit.length === 0 ? <p className="mt-3 text-sm text-neutral-600">No activity recorded yet.</p> : (
            <ul className="mt-3 space-y-2 text-sm">
              {recentAudit.map((a) => (
                <li key={a.id} className="border-b border-neutral-200 pb-2">
                  <span className="font-display font-bold text-xs uppercase tracking-widest">{a.action}</span>{" "}
                  <span className="text-neutral-700">{a.details}</span>{" "}
                  <span className="text-ash">· {a.userEmail || "system"}, {a.createdAt.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
          <Link href="/admin/audit" className="btn-outline-b mt-4 !px-4 !py-2 text-xs">Full Audit Log</Link>
        </section>
      </div>
    </div>
  );
}
