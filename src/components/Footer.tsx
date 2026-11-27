import Link from "next/link";
import Image from "next/image";
import { getConfig } from "@/lib/data";

export default async function Footer() {
  const cfg = await getConfig();
  return (
    <footer className="bg-ink text-paper mt-0 border-t-2 border-gold">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/ega.png" alt="Eagle, Globe, and Anchor" width={46} height={48} className="h-12 w-auto" />
            <div className="font-display font-black uppercase leading-tight">
              Felix&rsquo;s United States<br />Marine Corps
            </div>
          </div>
          <p className="mt-4 text-paper/70 italic">&ldquo;Honor, Courage, Commitment.&rdquo;</p>
          <div className="mt-4 flex gap-4 text-xs font-display font-bold uppercase tracking-widest">
            {cfg.discordUrl && <a href={cfg.discordUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-fog">Discord</a>}
            {cfg.robloxGroupUrl && <a href={cfg.robloxGroupUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-fog">Roblox Group</a>}
            {cfg.xUrl && <a href={cfg.xUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-fog">X</a>}
          </div>
        </div>
        <div>
          <h3 className="font-display font-bold uppercase tracking-widest text-sm border-b border-gold/60 pb-2 text-goldsoft">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-paper/80 text-sm">
            <li><Link href="/" className="hover:text-paper">Home</Link></li>
            <li><Link href="/about" className="hover:text-paper">About Us</Link></li>
            <li><Link href="/commands" className="hover:text-paper">Our Commands</Link></li>
            <li><Link href="/chain-of-command" className="hover:text-paper">Chain of Command</Link></li>
            <li><Link href="/ranks" className="hover:text-paper">Rank Structure</Link></li>
            <li><Link href="/enlist" className="hover:text-paper">Enlist</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display font-bold uppercase tracking-widest text-sm border-b border-gold/60 pb-2 text-goldsoft">Disclaimer</h3>
          <p className="mt-3 text-paper/60 text-sm leading-relaxed">
            Felix&rsquo;s United States Marine Corps is an independently operated Roblox military simulation community.
            It is not affiliated with, endorsed by, or officially associated with the United States Department of
            Defense or the real United States Marine Corps.
          </p>
        </div>
      </div>
      <div className="border-t border-white/15 py-4 text-center text-xs uppercase tracking-widest text-paper/50">
        Property of Felix&rsquo;s USMC | Website developed by Trooper
      </div>
    </footer>
  );
}
