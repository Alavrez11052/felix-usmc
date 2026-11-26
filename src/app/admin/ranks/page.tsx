import { getRankStructure } from "@/lib/data";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { updateRank } from "@/lib/actions";

export const metadata = { title: "Admin — Ranks" };

export default async function AdminRanks() {
  const me = await getCurrentUser();
  if (!me || !hasPermission(me, "ranks")) redirect("/admin");
  const categories = await getRankStructure();
  return (
    <div>
      <h1 className="h-display text-3xl">Rank Structure</h1>
      <p className="mt-2 text-sm text-neutral-600">Edit rank codes and names. Changes appear on the public Rank Structure page immediately.</p>
      <div className="mt-6 space-y-8">
        {categories.map((cat) => (
          <section key={cat.id} className="admin-card">
            <h2 className="font-display font-bold uppercase tracking-wide">{cat.name}{cat.code ? ` | ${cat.code}` : ""}</h2>
            <div className="mt-4 space-y-2">
              {cat.ranks.map((r) => (
                <form key={r.id} action={updateRank} className="grid sm:grid-cols-[60px_100px_1fr_auto] gap-2 items-end">
                  <input type="hidden" name="id" value={r.id} />
                  <div><label className="label">Order</label><input className="tbl-input" name="sortOrder" type="number" defaultValue={r.sortOrder} /></div>
                  <div><label className="label">Code</label><input className="tbl-input" name="code" defaultValue={r.code} /></div>
                  <div><label className="label">Name</label><input className="tbl-input" name="name" defaultValue={r.name} /></div>
                  <button className="btn-black !px-3 !py-1.5 text-xs" type="submit">Save</button>
                </form>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
