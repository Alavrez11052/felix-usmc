import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCommand, getCommands } from "@/lib/data";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cmd = await getCommand(params.slug);
  return { title: cmd ? cmd.name : "Command" };
}

export default async function CommandPage({ params }: { params: { slug: string } }) {
  const cmd = await getCommand(params.slug);
  if (!cmd) notFound();
  const all = await getCommands();
  const others = all.filter((c) => c.slug !== cmd.slug);
  return (
    <div>
      <section className="relative bg-ink text-paper">
        <div className="absolute inset-0">
          <Image src={cmd.image || "/images/hero-honor.png"} alt={cmd.name} fill priority className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/85" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20">
          <nav className="text-xs font-display font-bold uppercase tracking-widest text-paper/60">
            <Link href="/" className="hover:text-paper">Home</Link> / <Link href="/commands" className="hover:text-paper">Our Commands</Link> / <span className="text-paper">{cmd.abbr}</span>
          </nav>
          <h1 className="mt-4 font-display font-black uppercase tracking-wide text-3xl sm:text-5xl leading-tight">{cmd.name}</h1>
          <p className="mt-2 font-display font-bold uppercase tracking-widest2 text-paper/80">{cmd.abbr}</p>
          {cmd.tagline && <p className="mt-3 italic text-paper/75">{cmd.tagline}</p>}
          {cmd.discordUrl ? (
            <a href={cmd.discordUrl} target="_blank" rel="noreferrer" className="btn-white mt-6">Join the {cmd.abbr} Discord</a>
          ) : (
            <span className="inline-block mt-6 border-2 border-paper/50 text-paper/70 font-display font-bold uppercase tracking-widest text-sm px-6 py-3">Discord: Coming Soon</span>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="h-display text-2xl border-l-8 border-scarlet pl-4">Who We Are</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed whitespace-pre-line">{cmd.description}</p>

          <h2 className="h-display text-2xl border-l-8 border-scarlet pl-4 mt-12">Our Divisions</h2>
          {cmd.units.length === 0 ? (
            <p className="mt-4 text-neutral-600">No divisions are currently listed for this command.</p>
          ) : (
            <div className="mt-5 space-y-4">
              {cmd.units.map((u) => (
                <article key={u.id} className="card p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display font-bold uppercase tracking-wide">{u.name}</h3>
                    <span className="text-[11px] font-display font-bold uppercase tracking-widest text-ash">Discord: {u.discordNote}</span>
                  </div>
                  {u.description && <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{u.description}</p>}
                </article>
              ))}
            </div>
          )}
        </div>

        <aside>
          <h2 className="h-display text-2xl border-l-8 border-scarlet pl-4">Chain of Command</h2>
          <div className="mt-5 border border-neutral-300 divide-y divide-neutral-200">
            {cmd.staff.map((s) => (
              <div key={s.id} className="p-4 bg-white">
                <div className="text-[11px] font-display font-bold uppercase tracking-widest text-ash">{s.rankLabel} · {s.roleTitle}</div>
                <div className="font-display font-bold mt-1">{s.name}</div>
              </div>
            ))}
            {cmd.staff.length === 0 && <div className="p-4 bg-white text-sm text-neutral-600">No leadership listed yet.</div>}
          </div>
          <div className="mt-8 bg-ink text-paper p-5">
            <h3 className="font-display font-bold uppercase tracking-wide">Serve With {cmd.abbr}</h3>
            <p className="mt-2 text-sm text-paper/75">Earn your title of Marine, then take your place in this command.</p>
            <Link href="/enlist" className="btn-white mt-4 w-full text-center">Enlist Now</Link>
          </div>
        </aside>
      </div>

      <section className="bg-bone border-t-2 border-ink">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="font-display font-bold uppercase tracking-widest text-sm text-ash">Other Commands</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {others.map((c) => (
              <Link key={c.id} href={`/commands/${c.slug}`} className="btn-outline-b !px-4 !py-2 text-xs">{c.abbr}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
