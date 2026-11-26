import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { logout } from "@/lib/actions";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/commands", label: "Commands" },
  { href: "/admin/leadership", label: "Chain of Command" },
  { href: "/admin/ranks", label: "Ranks" },
  { href: "/admin/announcements", label: "Announcements" },
  { href: "/admin/affiliates", label: "Affiliates" },
  { href: "/admin/admins", label: "Administrators" },
  { href: "/admin/config", label: "Configuration" },
  { href: "/admin/audit", label: "Audit Log" },
  { href: "/admin/account", label: "My Account" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const count = await db.user.count();
  if (count === 0) redirect("/setup");
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 grid lg:grid-cols-[220px_1fr] gap-8">
      <aside>
        <div className="bg-ink text-paper p-4">
          <div className="font-display font-black uppercase tracking-wide">Admin</div>
          <div className="text-xs text-paper/60 mt-1">{user.name}</div>
          <div className="text-xs text-paper/60">{user.email}</div>
          <div className="mt-2 inline-block bg-paper text-ink text-[10px] font-display font-bold uppercase tracking-widest px-2 py-1">{user.role}</div>
        </div>
        <nav className="mt-4 border border-neutral-300 divide-y divide-neutral-200 bg-white">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="block px-4 py-3 text-sm font-display font-bold uppercase tracking-widest hover:bg-bone">{n.label}</Link>
          ))}
          <form action={logout}>
            <button className="block w-full text-left px-4 py-3 text-sm font-display font-bold uppercase tracking-widest hover:bg-bone" type="submit">Sign Out</button>
          </form>
        </nav>
        <Link href="/" className="block mt-4 text-xs font-display font-bold uppercase tracking-widest text-ash hover:text-ink">← View Public Site</Link>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
