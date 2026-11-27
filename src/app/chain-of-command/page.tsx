import { getLeadership } from "@/lib/data";
import Insignia, { gradeForRankTitle } from "@/components/Insignia";

export const metadata = { title: "Chain of Command" };

export default async function ChainOfCommand() {
  const leaders = await getLeadership();
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="h-display text-4xl border-l-8 border-scarlet pl-4">Chain of Command</h1>
      <p className="mt-5 text-neutral-700 leading-relaxed">
        At Felix&rsquo;s United States Marine Corps, we value structure and discipline. Listed below is the Chain of
        Command for our unit, showing the leadership structure, roles, and responsibilities of those who guide our
        members and operations. All of the names listed below are the names of the individuals holding these positions
        within Felix&rsquo;s USMC.
      </p>
      <div className="mt-8 border-2 border-ink divide-y divide-neutral-200">
        {leaders.map((l, i) => (
          <div key={l.id} className={`flex flex-wrap items-center gap-x-5 gap-y-1 p-4 sm:p-5 ${i === 0 ? "bg-ink text-paper" : "bg-white"}`}>
            <div className={`font-display font-black text-lg w-24 shrink-0 ${i === 0 ? "text-paper" : "text-ink"}`}>{l.abbr}</div>
            <div className="flex-1 min-w-[200px]">
              <div className="font-display font-bold uppercase tracking-wide">{l.title}</div>
              <div className={`text-xs uppercase tracking-widest ${i === 0 ? "text-paper/60" : "text-ash"}`}>Headquarters</div>
            </div>
            <Insignia grade={gradeForRankTitle(l.rankTitle)} className="h-12 w-12 shrink-0" />
            <div className="text-right">
              <div className="font-display font-bold">{l.name}</div>
              {l.rankTitle && <div className={`text-xs uppercase tracking-widest ${i === 0 ? "text-paper/60" : "text-ash"}`}>{l.rankTitle}</div>}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 border border-neutral-400 bg-bone p-4 text-sm text-neutral-700">
        Please do not contact any Marine or civilian listed above with a problem unless you have first contacted your
        direct superior.
      </p>
    </div>
  );
}
