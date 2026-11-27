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
        <Image src="/images/marforcom-2mardiv.png" alt="2nd Marine Division, Follow Me" fill className="object-cover grayscale" />
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
        Our mission is simple. Train civilians into Marines, put a fighting force in the field, keep order, and
        hold ourselves to the standard. Training and Education Command runs the training. Marine Forces Command
        and the special operations command provide the fighting force. The Military Police keep order, and the
        Judge Advocate Division and the Inspector General keep everyone honest.
      </p>
      <h2 className="h-display text-2xl mt-12 border-l-8 border-scarlet pl-4">Semi-Realism Philosophy</h2>
      <p className="mt-4 text-neutral-700 leading-relaxed">
        We aim for semi-realistic. The structure, the discipline, and the chain of command are treated as real.
        So are the patrols, the weekly trainings, and the promotions. It is still a game, though, and it is
        supposed to be fun.
      </p>
      <h2 className="h-display text-2xl mt-12 border-l-8 border-scarlet pl-4">Organizational Structure</h2>
      <p className="mt-4 text-neutral-700 leading-relaxed">
        Headquarters leads six commands: {commands.map((c) => c.name).join(", ")}. Each command is led by a commanding
        officer, a deputy, and a senior enlisted advisor, and is made up of its own subordinate units.
      </p>
      <h2 className="h-display text-2xl mt-12 border-l-8 border-scarlet pl-4">Opportunities</h2>
      <p className="mt-4 text-neutral-700 leading-relaxed">
        Plenty of positions are still open, and Headquarters is run by experienced members. You can fight with
        the Raiders, fly with the 2nd Marine Aircraft Wing, keep order with the Military Police, train the next
        class of recruits, or work a courtroom with the Judge Advocate Division. There is a spot for you.
      </p>
      <Link href="/enlist" className="btn-black mt-10">Start Your Enlistment</Link>
    </div>
  );
}
