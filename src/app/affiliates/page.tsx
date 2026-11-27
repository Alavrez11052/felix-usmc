import { getAffiliates } from "@/lib/data";

export const metadata = { title: "Affiliated Groups" };

const REQUIREMENTS = [
  "Around our member size",
  "Competent Headquarters",
  "Realistic and Modern",
  "One branch rule, e.g if we are allied with a BA, we will not ally with another BA.",
];

export default async function Affiliates() {
  const affiliates = await getAffiliates();
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="h-display text-4xl border-l-8 border-scarlet pl-4">Affiliated Groups</h1>

      <h2 className="h-display text-2xl mt-10">Our Affiliates</h2>
      <p className="mt-4 text-neutral-700 leading-relaxed max-w-3xl">
        We have a set of requirements before we establish an alliance with a group. Alliances can be
        terminated if the group has faced inactivity and other reasons. The requirements will be
        stated below.
      </p>

      {affiliates.length > 0 ? (
        <div className="mt-8 grid sm:grid-cols-2 gap-5">
          {affiliates.map((a) => (
            <article key={a.id} className="card p-5">
              <h3 className="font-display font-bold uppercase tracking-wide">{a.name}</h3>
              {a.description && <p className="mt-2 text-sm text-neutral-700">{a.description}</p>}
              {a.url && <a href={a.url} target="_blank" rel="noreferrer" className="btn-outline-b mt-4 !px-4 !py-2 text-xs">Visit Group</a>}
            </article>
          ))}
        </div>
      ) : null}

      <div className="mt-10 border-2 border-ink bg-bone p-6 rounded-xl">
        <h2 className="font-display font-bold uppercase tracking-wide">Requirements to Affiliate with Felix&rsquo;s U.S Marine Corps</h2>
        <ol className="mt-4 space-y-2 text-sm text-neutral-800 list-decimal list-inside">
          {REQUIREMENTS.map((r) => <li key={r}>{r}</li>)}
        </ol>
      </div>
    </div>
  );
}
