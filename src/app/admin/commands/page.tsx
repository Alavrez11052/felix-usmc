import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { db } from "@/lib/db";
import { createCommand, deleteCommand } from "@/lib/actions";

export const metadata = { title: "Admin: Commands" };

export default async function AdminCommands() {
  const me = await getCurrentUser();
  if (!me || !hasPermission(me, "commands")) redirect("/admin");
  const commands = await db.command.findMany({ orderBy: { sortOrder: "asc" }, include: { units: true, staff: true } });
  return (
    <div>
      <h1 className="h-display text-3xl">Commands</h1>
      <div className="mt-6 space-y-3">
        {commands.map((c) => (
          <div key={c.id} className="admin-card flex flex-wrap items-center gap-3 !py-3">
            <div className="flex-1 min-w-[220px]">
              <span className="font-display font-bold uppercase tracking-wide">{c.name}</span>
              <span className="text-ash text-sm"> · {c.units.length} divisions · {c.staff.length} staff · /commands/{c.slug}</span>
            </div>
            <Link href={`/admin/commands/${c.id}`} className="btn-black !px-4 !py-2 text-xs">Edit</Link>
            <form action={deleteCommand}>
              <input type="hidden" name="id" value={c.id} />
              <button className="btn-outline-b !px-4 !py-2 text-xs" type="submit">Delete</button>
            </form>
          </div>
        ))}
      </div>
      <section className="admin-card mt-8">
        <h2 className="font-display font-bold uppercase tracking-wide">Add a Command</h2>
        <form action={createCommand} className="mt-4 grid sm:grid-cols-2 gap-4">
          <div><label className="label">Name</label><input className="field" name="name" required /></div>
          <div><label className="label">Slug (optional)</label><input className="field" name="slug" placeholder="auto from name" /></div>
          <div><label className="label">Abbreviation</label><input className="field" name="abbr" /></div>
          <div><label className="label">Tagline / Motto</label><input className="field" name="tagline" /></div>
          <div><label className="label">Discord URL (blank = WIP)</label><input className="field" name="discordUrl" /></div>
          <div><label className="label">Image path</label><input className="field" name="image" placeholder="/images/hero-honor.png" /></div>
          <div className="sm:col-span-2"><label className="label">Description</label><textarea className="field" name="description" rows={4} /></div>
          <div><button className="btn-black" type="submit">Create Command</button></div>
        </form>
      </section>
    </div>
  );
}
