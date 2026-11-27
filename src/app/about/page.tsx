import Image from "next/image";
import Link from "next/link";
import { getCommands } from "@/lib/data";

export const metadata = { title: "About Us" };

export default async function About() {
  const commands = await getCommands();
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="h-display text-4xl border-l-8 border-scarlet pl-4">About Us</h1>
      <div className="relative h-64 sm:h-80 border-2 border-ink mt-8">
        <Image src="/images/marforcom-2mardiv.png" alt="2nd Marine Division — Follow Me" fill className="object-cover grayscale" />
      </div>
      <div className="mt-10 space-y-5 text-neutral-700 leading-relaxed">
        <p>Felix&rsquo;s U.S. Marine Corps is an imitation of the modern-day Marine Corps simulated on ROBLOX.</p>
        <p>
          The United States Marine Corps is responsible for conducting expeditionary and amphibious warfare through
          combined arms, implementing its own infantry, artillery, aerial, and special operations forces. It is one of
          the eight uniformed services of the United States.
        </p>
        <p><strong className="text-ink">Founded:</strong> November 14th, 2026.</p>
      </div>
      <h2 className="h-display text-2xl mt-12 border-l-8 border-scarlet pl-4">Our Mission</h2>
      <p className="mt-4 text-neutral-700 leading-relaxed">
        Our mission is to run a disciplined, structured, and immersive Marine Corps simulation on Roblox — training
        civilians into Marines through TECOM, fielding the Corps&rsquo; fighting forces through MARFORCOM and MARSOC,
        upholding order through the Military Police, and holding ourselves accountable through the Judge Advocate
        Division and the Inspector General.
      </p>
      <h2 className="h-display text-2xl mt-12 border-l-8 border-scarlet pl-4">Semi-Realism Philosophy</h2>
      <p className="mt-4 text-neutral-700 leading-relaxed">
        At Felix&rsquo;s United States Marine Corps, we offer semi-realism while still keeping the fun. The group is
        mainly MILSIM based — we value structure and discipline, and we run active patrols, weekly trainings, and
        promotions, all in a community designed to be immersive without losing what makes it enjoyable.
      </p>
      <h2 className="h-display text-2xl mt-12 border-l-8 border-scarlet pl-4">Organizational Structure</h2>
      <p className="mt-4 text-neutral-700 leading-relaxed">
        Headquarters leads six commands: {commands.map((c) => c.name).join(", ")}. Each command is led by a commanding
        officer, a deputy, and a senior enlisted advisor, and is made up of its own subordinate units.
      </p>
      <h2 className="h-display text-2xl mt-12 border-l-8 border-scarlet pl-4">Opportunities</h2>
      <p className="mt-4 text-neutral-700 leading-relaxed">
        We have many positions still open within our divisions and our Headquarters are heavily experienced. Whether
        you want to fight with the Raiders, fly with the 2nd Marine Aircraft Wing, enforce the UCMJ, train the next
        generation of Marines, or argue a court-martial — there is a billet for you.
      </p>
      <Link href="/enlist" className="btn-black mt-10">Start Your Enlistment</Link>
    </div>
  );
}
