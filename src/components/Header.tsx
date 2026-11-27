"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/commands", label: "Our Commands" },
  { href: "/chain-of-command", label: "Chain of Command" },
  { href: "/ranks", label: "Rank Structure" },
  { href: "/affiliates", label: "Affiliated Groups" },
  { href: "/about", label: "About Us" },
];

export default function Header({ bannerText, loggedIn }: { bannerText?: string | null; loggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50">
      {bannerText ? (
        <div className="bg-scarlet text-white text-center text-xs font-display font-bold uppercase tracking-widest2 py-2 px-4">
          {bannerText}
        </div>
      ) : null}
      <div className="bg-gradient-to-r from-scarletdeep via-ink to-scarletdeep text-paper border-b-2 border-gold shadow-lg">
        <div className="mx-auto max-w-7xl px-4 flex items-center gap-4 min-h-16 py-2">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image src="/images/ega.png" alt="Eagle, Globe, and Anchor" width={40} height={42} className="h-10 w-auto" />
            <span className="font-display font-black uppercase leading-tight tracking-wide text-sm sm:text-base whitespace-nowrap">
              Felix&rsquo;s <span className="hidden sm:inline">United States</span> Marine Corps
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-7 ml-auto text-sm font-display font-bold uppercase tracking-wide">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link whitespace-nowrap py-2 hover:text-goldsoft text-paper/85 transition-colors">{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 ml-auto lg:ml-0">
            <Link href="/enlist" className="hidden sm:inline-block whitespace-nowrap bg-scarlet text-white font-display font-bold uppercase tracking-widest text-xs px-4 py-2.5 rounded-md shadow border-2 border-scarlet hover:bg-scarletdeep hover:border-scarletdeep transition-all">
              Enlist Now
            </Link>
            <Link href={loggedIn ? "/admin" : "/login"} className="hidden sm:inline-block whitespace-nowrap text-paper/70 hover:text-paper text-xs font-display font-bold uppercase tracking-widest">
              {loggedIn ? "Admin" : "Admin Login"}
            </Link>
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="lg:hidden text-paper text-2xl leading-none px-2">
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {open && (
          <nav className="anim-menu lg:hidden border-t border-white/15 px-4 py-2 flex flex-col text-sm font-display font-bold uppercase tracking-widest">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2.5 border-b border-white/5">{l.label}</Link>
            ))}
            <Link href="/enlist" onClick={() => setOpen(false)} className="py-2.5 border-b border-white/5">Enlist Now</Link>
            <Link href={loggedIn ? "/admin" : "/login"} onClick={() => setOpen(false)} className="py-2.5">{loggedIn ? "Admin" : "Admin Login"}</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
