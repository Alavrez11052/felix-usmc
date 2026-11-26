import CommandCard from "@/components/CommandCard";
import { getCommands } from "@/lib/data";

export const metadata = { title: "Our Commands" };

export default async function Commands() {
  const commands = await getCommands();
  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <h1 className="h-display text-4xl border-l-8 border-ink pl-4">Our Commands</h1>
      <p className="mt-4 text-neutral-700">Everything listed below are our commands within Felix&rsquo;s U.S. Marine Corps.</p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {commands.map((c) => <CommandCard key={c.id} command={c} />)}
      </div>
    </div>
  );
}
