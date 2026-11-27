import Link from "next/link";
import { getCommands, getConfig } from "@/lib/data";

export const metadata = { title: "Enlist" };

const STEPS = [
  { title: "Join the Discord", text: "Start in the main Discord server. Introduce yourself and tell Headquarters you are here to enlist. Everything else, including your training, is coordinated there." },
  { title: "Join the Roblox Group", text: "Send a join request to the Felix's USMC Roblox group. Your group rank is how your service is tracked, so this step is not optional." },
  { title: "Complete Recruit Training", text: "Recruit training is run by the Recruit Training Regiment under TECOM. You start as a Private, and the Drill Instructors teach you how the group works: ranks, customs, drill, and what is expected of a Marine. Graduation is what makes you a Marine here." },
  { title: "Choose Your Command", text: "After graduation, pick one of the six commands and join its Discord. That command becomes your unit: its trainings, its operations, and its chain of command." },
];

export default async function Enlist() {
  const [cfg, commands] = await Promise.all([getConfig(), getCommands()]);
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="h-display text-4xl border-l-8 border-scarlet pl-4">Enlistment</h1>
      <p className="mt-5 text-neutral-700 leading-relaxed max-w-3xl">
        Enlisting takes four steps. You will start in the Discord, join the Roblox group, complete recruit
        training, and then choose a command.
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
        One rule to know before you start: problems go to your direct superior first, not straight to the top.
        The chain of command only works if it is used.
      </p>
    </div>
  );
}
