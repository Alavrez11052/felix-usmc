import Link from "next/link";
import { getCommands, getConfig } from "@/lib/data";

export const metadata = { title: "Enlist" };

const STEPS = [
  { title: "Join the Discord", text: "Every enlistment starts in our Discord server. Introduce yourself and let Headquarters know you are here to enlist." },
  { title: "Join the Roblox Group", text: "Request to join the official Felix's USMC Roblox group so your rank and record can be tracked." },
  { title: "Complete Recruit Training", text: "Recruit training comes first. The Recruit Training Regiment turns civilians into Marines, and everyone starts out as a Private." },
  { title: "Choose Your Command", text: "After training, join one of the six commands. Raiders, Military Police, aviation, law, and more." },
];

export default async function Enlist() {
  const [cfg, commands] = await Promise.all([getConfig(), getCommands()]);
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="h-display text-4xl border-l-8 border-scarlet pl-4">Ready to Enlist?</h1>
      <p className="mt-5 text-neutral-700 leading-relaxed max-w-3xl">
        Becoming a Marine here takes four steps. Start with the Discord and the Roblox group, finish recruit
        training, then pick your command.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        {cfg.discordUrl && <a href={cfg.discordUrl} target="_blank" rel="noreferrer" className="btn-black">Join Our Discord</a>}
        {cfg.robloxGroupUrl && <a href={cfg.robloxGroupUrl} target="_blank" rel="noreferrer" className="btn-outline-b">Join Our Roblox Group</a>}
      </div>

      <div className="mt-12 grid sm:grid-cols-2 gap-5">
        {STEPS.map((s, i) => (
          <div key={s.title} className="card p-6">
            <div className="font-display font-black text-4xl text-neutral-300">0{i + 1}</div>
            <h2 className="mt-2 font-display font-bold uppercase tracking-wide">{s.title}</h2>
            <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>

      <h2 className="h-display text-2xl border-l-8 border-scarlet pl-4 mt-14">Command Discords</h2>
      <div className="mt-5 border border-neutral-300 divide-y divide-neutral-200 bg-white">
        {commands.map((c) => (
          <div key={c.id} className="flex flex-wrap items-center gap-3 p-4">
            <div className="flex-1 min-w-[220px]">
              <Link href={`/commands/${c.slug}`} className="font-display font-bold uppercase tracking-wide hover:underline">{c.name}</Link>
              <div className="text-xs uppercase tracking-widest text-ash">{c.abbr}</div>
            </div>
            {c.discordUrl ? (
              <a href={c.discordUrl} target="_blank" rel="noreferrer" className="btn-black !px-4 !py-2 text-xs">Join Discord</a>
            ) : (
              <span className="text-xs font-display font-bold uppercase tracking-widest text-ash border border-neutral-300 px-4 py-2">Discord WIP</span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-neutral-600">
        Before you enlist, learn the chain of command. If you have a problem, take it to your direct superior
        first. Discipline and structure are what make this Corps what it is.
      </p>
    </div>
  );
}
