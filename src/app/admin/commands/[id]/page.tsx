import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { db } from "@/lib/db";
import { addStaff, addUnit, deleteStaff, deleteUnit, updateCommand, updateStaff, updateUnit } from "@/lib/actions";

export const metadata = { title: "Admin — Edit Command" };

export default async function EditCommand({ params }: { params: { id: string } }) {
  const me = await getCurrentUser();
  if (!me || !hasPermission(me, "commands")) redirect("/admin");
  const cmd = await db.command.findUnique({
    where: { id: params.id },
    include: { units: { orderBy: { sortOrder: "asc" } }, staff: { orderBy: { sortOrder: "asc" } } },
  });
  if (!cmd) notFound();
  return (
    <div>
      <h1 className="h-display text-3xl">Edit — {cmd.abbr || cmd.name}</h1>

      <section className="admin-card mt-6">
        <h2 className="font-display font-bold uppercase tracking-wide">Command Details</h2>
        <form action={updateCommand} className="mt-4 grid sm:grid-cols-2 gap-4">
          <input type="hidden" name="id" value={cmd.id} />
          <div><label className="label">Name</label><input className="field" name="name" defaultValue={cmd.name} required /></div>
          <div><label className="label">Abbreviation</label><input className="field" name="abbr" defaultValue={cmd.abbr} /></div>
          <div><label className="label">Tagline / Motto</label><input className="field" name="tagline" defaultValue={cmd.tagline} /></div>
          <div><label className="label">Sort Order</label><input className="field" name="sortOrder" type="number" defaultValue={cmd.sortOrder} /></div>
          <div><label className="label">Discord URL (blank = WIP)</label><input className="field" name="discordUrl" defaultValue={cmd.discordUrl ?? ""} /></div>
          <div><label className="label">Image path</label><input className="field" name="image" defaultValue={cmd.image} /></div>
          <div className="sm:col-span-2"><label className="label">Description</label><textarea className="field" name="description" rows={6} defaultValue={cmd.description} /></div>
          <div><button className="btn-black" type="submit">Save Command</button></div>
        </form>
        <p className="mt-3 text-xs text-ash">Public page: /commands/{cmd.slug} · Images live in the project&rsquo;s public/images folder.</p>
      </section>

      <section className="admin-card mt-6">
        <h2 className="font-display font-bold uppercase tracking-wide">Units</h2>
        <div className="mt-4 space-y-3">
          {cmd.units.map((u) => (
            <form key={u.id} action={updateUnit} className="grid sm:grid-cols-[60px_1fr_1fr_130px_auto_auto] gap-2 items-end border border-neutral-200 p-3">
              <input type="hidden" name="id" value={u.id} />
              <div><label className="label">Order</label><input className="tbl-input" name="sortOrder" type="number" defaultValue={u.sortOrder} /></div>
              <div><label className="label">Name</label><input className="tbl-input" name="name" defaultValue={u.name} /></div>
              <div><label className="label">Description</label><input className="tbl-input" name="description" defaultValue={u.description} /></div>
              <div><label className="label">Discord Note</label><input className="tbl-input" name="discordNote" defaultValue={u.discordNote} /></div>
              <button className="btn-black !px-3 !py-1.5 text-xs" type="submit">Save</button>
              <button formAction={deleteUnit} className="btn-outline-b !px-3 !py-1.5 text-xs" type="submit">Delete</button>
            </form>
          ))}
        </div>
        <form action={addUnit} className="mt-4 grid sm:grid-cols-[1fr_1fr_130px_auto] gap-2 items-end">
          <input type="hidden" name="commandId" value={cmd.id} />
          <div><label className="label">New Unit Name</label><input className="tbl-input" name="name" required /></div>
          <div><label className="label">Description</label><input className="tbl-input" name="description" /></div>
          <div><label className="label">Discord Note</label><input className="tbl-input" name="discordNote" placeholder="WIP" /></div>
          <button className="btn-black !px-3 !py-1.5 text-xs" type="submit">Add Unit</button>
        </form>
      </section>

      <section className="admin-card mt-6">
        <h2 className="font-display font-bold uppercase tracking-wide">Chain of Command (Staff)</h2>
        <div className="mt-4 space-y-3">
          {cmd.staff.map((s) => (
            <form key={s.id} action={updateStaff} className="grid sm:grid-cols-[60px_90px_1fr_1fr_auto_auto] gap-2 items-end border border-neutral-200 p-3">
              <input type="hidden" name="id" value={s.id} />
              <div><label className="label">Order</label><input className="tbl-input" name="sortOrder" type="number" defaultValue={s.sortOrder} /></div>
              <div><label className="label">Rank</label><input className="tbl-input" name="rankLabel" defaultValue={s.rankLabel} /></div>
              <div><label className="label">Role Title</label><input className="tbl-input" name="roleTitle" defaultValue={s.roleTitle} /></div>
              <div><label className="label">Name</label><input className="tbl-input" name="name" defaultValue={s.name} /></div>
              <button className="btn-black !px-3 !py-1.5 text-xs" type="submit">Save</button>
              <button formAction={deleteStaff} className="btn-outline-b !px-3 !py-1.5 text-xs" type="submit">Delete</button>
            </form>
          ))}
        </div>
        <form action={addStaff} className="mt-4 grid sm:grid-cols-[90px_1fr_1fr_auto] gap-2 items-end">
          <input type="hidden" name="commandId" value={cmd.id} />
          <div><label className="label">Rank</label><input className="tbl-input" name="rankLabel" placeholder="O-9" /></div>
          <div><label className="label">Role Title</label><input className="tbl-input" name="roleTitle" required placeholder="Commanding General" /></div>
          <div><label className="label">Name</label><input className="tbl-input" name="name" required /></div>
          <button className="btn-black !px-3 !py-1.5 text-xs" type="submit">Add Staff</button>
        </form>
      </section>
    </div>
  );
}
