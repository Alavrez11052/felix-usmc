import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { addLeadership, deleteLeadership, updateLeadership } from "@/lib/actions";

export const metadata = { title: "Admin — Chain of Command" };

export default async function AdminLeadership() {
  const me = await getCurrentUser();
  if (!me || !hasPermission(me, "leadership")) redirect("/admin");
  const leaders = await db.leadership.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="h-display text-3xl">Chain of Command</h1>
      <p className="mt-2 text-sm text-neutral-600">Headquarters leadership, highest first. Use the order field to reorder.</p>
      <div className="mt-6 space-y-3">
        {leaders.map((l) => (
          <form key={l.id} action={updateLeadership} className="admin-card grid sm:grid-cols-[60px_90px_1fr_1fr_1fr_auto_auto] gap-2 items-end !py-3">
            <input type="hidden" name="id" value={l.id} />
            <div><label className="label">Order</label><input className="tbl-input" name="sortOrder" type="number" defaultValue={l.sortOrder} /></div>
            <div><label className="label">Abbr</label><input className="tbl-input" name="abbr" defaultValue={l.abbr} /></div>
            <div><label className="label">Title</label><input className="tbl-input" name="title" defaultValue={l.title} /></div>
            <div><label className="label">Rank Title</label><input className="tbl-input" name="rankTitle" defaultValue={l.rankTitle} /></div>
            <div><label className="label">Name</label><input className="tbl-input" name="name" defaultValue={l.name} /></div>
            <button className="btn-black !px-3 !py-1.5 text-xs" type="submit">Save</button>
            <button formAction={deleteLeadership} className="btn-outline-b !px-3 !py-1.5 text-xs" type="submit">Delete</button>
          </form>
        ))}
      </div>
      <section className="admin-card mt-8">
        <h2 className="font-display font-bold uppercase tracking-wide">Add a Position</h2>
        <form action={addLeadership} className="mt-4 grid sm:grid-cols-[90px_1fr_1fr_1fr_auto] gap-2 items-end">
          <div><label className="label">Abbr</label><input className="tbl-input" name="abbr" required /></div>
          <div><label className="label">Title</label><input className="tbl-input" name="title" required /></div>
          <div><label className="label">Rank Title</label><input className="tbl-input" name="rankTitle" /></div>
          <div><label className="label">Name</label><input className="tbl-input" name="name" required /></div>
          <button className="btn-black !px-3 !py-1.5 text-xs" type="submit">Add</button>
        </form>
      </section>
    </div>
  );
}
