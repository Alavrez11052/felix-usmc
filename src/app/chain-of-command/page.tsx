import { getLeadership } from "@/lib/data";

export const metadata = { title: "Chain of Command" };

export default async function ChainOfCommand() {
  const leadership = await getLeadership();
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="h-display text-4xl border-l-8 border-scarlet pl-4">Chain of Command</h1>
      <p className="mt-5 text-neutral-700 leading-relaxed">
        This page lists the senior leadership of Felix&rsquo;s USMC and the members who currently hold those
        positions at Headquarters. Every issue in the group moves through this chain, from the commands up to
        the Secretary of the Navy.
      </p>
      <div className="mt-8 border-2 border-ink divide-y-2 divide-ink">
        {leadership.map((l) => (
          <div key={l.id} className="p-4 sm:p-5 flex items-center gap-4 bg-white">
            <div className="min-w-0">
              <div className="font-display font-bold uppercase tracking-wide leading-snug">{l.title}</div>
              <div className="text-xs uppercase tracking-widest text-ash">Headquarters</div>
              <div className="mt-1 font-medium">{l.name}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 border border-neutral-400 bg-bone p-4 text-sm text-neutral-700">
        Take problems to your direct superior first. Move up the chain one step at a time, and contact
        Headquarters only when the issue cannot be settled at your level.
      </p>
    </div>
  );
}
