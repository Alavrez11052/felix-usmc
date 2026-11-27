import { getAffiliates } from "@/lib/data";

export const metadata = { title: "Affiliated Groups" };

const REQUIREMENTS = [
  "The group must be active for more than 2 weeks.",
  "The group must have 30+ members in its Discord and Roblox group.",
  "The group must not contain NSFW or ToS-violating content.",
  "No NSFW or ToS-violating content may appear in its Discord, Roblox group, or social media.",
];

export default async function Affiliates() {
  const affiliates = await getAffiliates();
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="h-display text-4xl border-l-8 border-scarlet pl-4">Affiliated Groups</h1>
      {affiliates.length === 0 ? (
        <p className="mt-5 text-neutral-700 italic">In Progress...</p>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 gap-5">
          {affiliates.map((a) => (
            <article key={a.id} className="card p-5">
              <h2 className="font-display font-bold uppercase tracking-wide">{a.name}</h2>
              {a.description && <p className="mt-2 text-sm text-neutral-700">{a.description}</p>}
              {a.url && <a href={a.url} target="_blank" rel="noreferrer" className="btn-outline-b mt-4 !px-4 !py-2 text-xs">Visit Group</a>}
            </article>
          ))}
        </div>
      )}
      <div className="mt-10 border-2 border-ink bg-bone p-6">
        <h2 className="font-display font-bold uppercase tracking-wide">Become an Affiliated Group</h2>
        <p className="mt-2 text-sm text-neutral-700">
          We currently do not have any affiliated groups. If you wish to become one, please contact a member of HQ and
          meet the requirements below:
        </p>
        <ol className="mt-4 space-y-2 text-sm text-neutral-800 list-decimal list-inside">
          {REQUIREMENTS.map((r) => <li key={r}>{r}</li>)}
        </ol>
      </div>
    </div>
  );
}
