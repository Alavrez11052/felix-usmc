import Link from "next/link";
import Image from "next/image";
import CommandCard from "@/components/CommandCard";
import { getAnnouncements, getCommands, getConfig, getLeadership } from "@/lib/data";

export const metadata = { title: "Felix's United States Marine Corps" };

const HIGHLIGHTS = [
  { title: "Semi-Realistic Military Simulation", text: "Semi-realism while still keeping the fun — a mainly MILSIM based group with structure and discipline." },
  { title: "Experienced Leadership", text: "Our Headquarters are heavily experienced, and every command is led by proven Marines." },
  { title: "Multiple Career Opportunities", text: "Many positions are still open within our divisions — infantry, aviation, special operations, military police, law, and more." },
  { title: "Active Military Operations", text: "Active patrols with other members, weekly trainings, promotions, and an immersive community." },
];

export default async function Home() {
  const [cfg, commands, leadership, announcements] = await Promise.all([
    getConfig(), getCommands(), getLeadership(), getAnnouncements(),
  ]);
  const unitCount = commands.reduce((n, c) => n + c.units.length, 0);
  const featured = announcements.filter((a) => a.featured).slice(0, 3);
  const stats = [
    { n: commands.length, label: "Commands" },
    { n: unitCount, label: "Units" },
    { n: leadership.length, label: "HQ Leaders" },
    { n: 20, label: "Ranks" },
  ];
  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink text-paper">
        <div className="absolute inset-0">
          <Image src="/images/hero-honor.png" alt="Marines — death before dishonor" fill priority className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:py-36 text-center">
          <Image src="/images/ega.png" alt="Eagle, Globe, and Anchor" width={110} height={114} className="mx-auto h-24 w-auto" />
          <h1 className="mt-6 font-display font-black uppercase tracking-wide text-4xl sm:text-6xl leading-none">
            United States<br />Marine Corps
          </h1>
          <p className="mt-4 font-display font-bold uppercase tracking-widest2 text-sm sm:text-base text-paper/85">
            Felix&rsquo;s United States Marine Corps
          </p>
          <p className="mt-3 italic text-paper/75">&ldquo;Honor, Courage, Commitment.&rdquo;</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/commands" className="btn-white">Explore Our Commands</Link>
            <Link href="/enlist" className="btn-outline-w">Ready to Enlist?</Link>
          </div>
          <div className="mt-8 flex justify-center gap-6 text-xs font-display font-bold uppercase tracking-widest">
            {cfg.discordUrl && <a className="underline underline-offset-4" href={cfg.discordUrl} target="_blank" rel="noreferrer">Discord</a>}
            {cfg.robloxGroupUrl && <a className="underline underline-offset-4" href={cfg.robloxGroupUrl} target="_blank" rel="noreferrer">Roblox Group</a>}
            {cfg.xUrl && <a className="underline underline-offset-4" href={cfg.xUrl} target="_blank" rel="noreferrer">X</a>}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-paper border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display font-black text-4xl">{s.n}</div>
              <div className="text-xs font-display font-bold uppercase tracking-widest2 text-ash mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="h-display text-3xl border-l-8 border-ink pl-4">Who We Are</h2>
          <p className="mt-5 text-neutral-700 leading-relaxed">
            Felix&rsquo;s U.S. Marine Corps is an imitation of the modern-day Marine Corps simulated on ROBLOX.
          </p>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            The United States Marine Corps is responsible for conducting expeditionary and amphibious warfare through
            combined arms, implementing its own infantry, artillery, aerial, and special operations forces. It is one
            of the eight uniformed services of the United States.
          </p>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            Felix&rsquo;s U.S. Marine Corps was founded on November 14th, 2026.
          </p>
          <Link href="/about" className="btn-outline-b mt-6">More About Us</Link>
        </div>
        <div className="relative h-72 md:h-96 border-2 border-ink">
          <Image src="/images/marsoc-raiders.png" alt="Marines overlooking a village" fill className="object-cover grayscale" />
        </div>
      </section>

      {/* WHY JOIN US */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="h-display text-3xl border-l-8 border-paper pl-4">Why Join Us?</h2>
          <p className="mt-5 max-w-3xl text-paper/80 leading-relaxed">
            At Felix&rsquo;s United States Marine Corps, we offer semi-realism while still keeping the fun. The group is
            known for its discipline, structure, organization, and realistic roleplay. When you join our server, you will
            see active patrols with other members, weekly trainings, promotions, and more, all in a community designed
            to be immersive. We have many positions still open within our divisions and our Headquarters are heavily
            experienced.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HIGHLIGHTS.map((h, i) => (
              <div key={h.title} className="border border-white/25 p-5">
                <div className="font-display font-black text-3xl text-paper/40">0{i + 1}</div>
                <h3 className="mt-2 font-display font-bold uppercase tracking-wide text-sm">{h.title}</h3>
                <p className="mt-2 text-sm text-paper/70 leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ANNOUNCEMENTS */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="h-display text-3xl border-l-8 border-ink pl-4">Announcements</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {featured.map((a) => (
              <article key={a.id} className="card p-5">
                <div className="text-[11px] font-display font-bold uppercase tracking-widest text-ash">{a.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
                <h3 className="mt-2 font-display font-bold uppercase tracking-wide">{a.title}</h3>
                <p className="mt-2 text-sm text-neutral-700 line-clamp-4 whitespace-pre-line">{a.body}</p>
              </article>
            ))}
          </div>
          <Link href="/announcements" className="btn-outline-b mt-8">All Announcements</Link>
        </section>
      )}

      {/* OUR COMMANDS */}
      <section className="bg-bone border-y-2 border-ink">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="h-display text-3xl border-l-8 border-ink pl-4">Our Commands</h2>
          <p className="mt-4 text-neutral-700">Everything listed below are our commands within Felix&rsquo;s U.S. Marine Corps.</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {commands.map((c) => <CommandCard key={c.id} command={c} />)}
          </div>
        </div>
      </section>

      {/* ENLIST */}
      <section className="relative bg-ink text-paper">
        <div className="absolute inset-0">
          <Image src="/images/tecom-recon.png" alt="Marines training at night" fill className="object-cover grayscale opacity-35" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center">
          <h2 className="h-display text-4xl">Ready to Enlist?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-paper/85 leading-relaxed">
            To enlist, join our Discord by clicking on the icon beneath the title, and the Roblox group. Earn your place
            among the Few, the Proud, the Marines. Your journey begins with a single step, Semper Fidelis.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-left">
            {["Join the Discord", "Join the Roblox Group", "Complete Recruit Training (TECOM)"].map((s, i) => (
              <div key={s} className="border border-white/30 bg-black/50 px-4 py-3 text-sm font-display font-bold uppercase tracking-widest">
                <span className="text-paper/50 mr-2">Step {i + 1}</span>{s}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {cfg.discordUrl && <a href={cfg.discordUrl} target="_blank" rel="noreferrer" className="btn-white">Join Our Discord</a>}
            {cfg.robloxGroupUrl && <a href={cfg.robloxGroupUrl} target="_blank" rel="noreferrer" className="btn-outline-w">Join Our Roblox Group</a>}
          </div>
        </div>
      </section>
    </>
  );
}
