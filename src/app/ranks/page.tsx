import { getRankStructure } from "@/lib/data";
import Insignia from "@/components/Insignia";

export const metadata = { title: "Rank Structure" };

export default async function Ranks() {
  const categories = await getRankStructure();
  const total = categories.reduce((n, c) => n + c.ranks.length, 0);
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="h-display text-4xl border-l-8 border-scarlet pl-4">Rank Structure</h1>
      <p className="mt-4 text-neutral-700">The rank structure of Felix&rsquo;s United States Marine Corps: {total} ranks, from Lieutenant General down to Private.</p>
      <div className="mt-10 space-y-10">
        {categories.map((cat) => (
          <section key={cat.id}>
            <h2 className="bg-ink text-paper font-display font-bold uppercase tracking-widest text-sm px-4 py-3">
              {cat.name}{cat.code ? ` | ${cat.code}` : ""}
            </h2>
            <div className="border border-t-0 border-neutral-300 divide-y divide-neutral-200 bg-white">
              {cat.ranks.map((r) => (
                <div key={r.id} className="flex items-center gap-4 px-4 py-3">
                  <span className="font-display font-black w-16 shrink-0">{r.code}</span>
                  <Insignia grade={r.code} className="h-11 w-11 shrink-0" />
                  <span className="font-medium">{r.name}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
