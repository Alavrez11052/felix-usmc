import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { addAffiliate, deleteAffiliate } from "@/lib/actions";

export const metadata = { title: "Admin — Affiliates" };

export default async function AdminAffiliates() {
  const me = await getCurrentUser();
  if (!me || !hasPermission(me, "affiliates")) redirect("/admin");
  const affiliates = await db.affiliate.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="h-display text-3xl">Affiliated Groups</h1>
      <p className="mt-2 text-sm text-neutral-600">Groups shown on the public Affiliated Groups page. While this list is empty, the page shows the affiliation requirements.</p>
      <div className="mt-6 space-y-3">
        {affiliates.map((a) => (
          <div key={a.id} className="admin-card flex flex-wrap items-center gap-3 !py-3">
            <div className="flex-1 min-w-[200px]"><span className="font-display font-bold">{a.name}</span> <span className="text-ash text-sm">{a.url}</span></div>
            <form action={deleteAffiliate}>
              <input type="hidden" name="id" value={a.id} />
              <input type="hidden" name="name" value={a.name} />
              <button className="btn-outline-b !px-4 !py-2 text-xs" type="submit">Remove</button>
            </form>
          </div>
        ))}
        {affiliates.length === 0 && <p className="text-sm text-neutral-600">No affiliated groups yet.</p>}
      </div>
      <section className="admin-card mt-8">
        <h2 className="font-display font-bold uppercase tracking-wide">Add an Affiliated Group</h2>
        <form action={addAffiliate} className="mt-4 grid sm:grid-cols-2 gap-4">
          <div><label className="label">Name</label><input className="field" name="name" required /></div>
          <div><label className="label">URL</label><input className="field" name="url" /></div>
          <div className="sm:col-span-2"><label className="label">Description</label><textarea className="field" name="description" rows={3} /></div>
          <div><button className="btn-black" type="submit">Add Affiliate</button></div>
        </form>
      </section>
    </div>
  );
}
