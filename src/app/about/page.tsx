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
        <p>Felix&rsquo;s USMC is a semi-realistic Roblox military simulation group built around the modern day United States Marine Corps.</p>
        <p>
          The real Marine Corps is one of the eight uniformed services of the United States. It conducts expeditionary
          and amphibious warfare with its own infantry, artillery, aviation, and special operations forces. This group
          copies that structure at group scale: a Headquarters, six commands, and a rank structure that runs from
          Private to Lieutenant General.
        </p>
        <p><strong className="text-ink">Founded:</strong> November 14, 2026.</p>
      </div>
      <h2 className="h-display text-2xl mt-12 border-l-8 border-scarlet pl-4">Our Mission</h2>
      <p className="mt-4 text-neutral-700 leading-relaxed">
        The work of the group breaks down by command. Training and Education Command trains recruits and officer
        candidates. Marine Forces Command and Marine Special Operations Command provide the fighting force. The
        Military Police enforce the law. The Judge Advocate Division handles military justice, and the Inspector
        General checks that all of it is being done properly. Headquarters coordinates the six commands and sets
        the standard they are held to.
      </p>
      <h2 className="h-display text-2xl mt-12 border-l-8 border-scarlet pl-4">Semi-Realism Philosophy</h2>
      <p className="mt-4 text-neutral-700 leading-relaxed">
        Semi-realistic means the military side is taken seriously and the game side is not forgotten. Ranks mean
        something, orders are followed, and the chain of command is used the way it is supposed to be used. Patrols,
        trainings, and promotions are run properly. At the same time, this is Roblox. Members are here to enjoy it,
        and leadership is expected to keep it that way.
      </p>
      <h2 className="h-display text-2xl mt-12 border-l-8 border-scarlet pl-4">Organizational Structure</h2>
      <p className="mt-4 text-neutral-700 leading-relaxed">
        Headquarters leads the group. Under it are six commands: {commands.map((c) => c.name).join(", ")}. Each command
        is led by a Commanding Officer, a Deputy Commanding Officer, and a Senior Enlisted Advisor, and each is made
        up of its own divisions.
      </p>
      <h2 className="h-display text-2xl mt-12 border-l-8 border-scarlet pl-4">Opportunities</h2>
      <p className="mt-4 text-neutral-700 leading-relaxed">
        Recruiting is open in all six commands, and Headquarters is run by experienced members. After recruit training
        you can go to the infantry with the 2nd Marine Division, fly with the 2nd Marine Aircraft Wing, patrol with
        the Military Police, try out for the Raiders, train the next class of recruits with TECOM, or work cases with
        the Judge Advocate Division. Every one of those paths starts the same way, with recruit training.
      </p>
      <Link href="/enlist" className="btn-black mt-10">Start Your Enlistment</Link>
    </div>
  );
}
