import Link from "next/link";
import Image from "next/image";
import type { Command, Unit, CommandStaff } from "@prisma/client";

export default function CommandCard({ command }: { command: Command & { units: Unit[]; staff: CommandStaff[] } }) {
  return (
    <article className="card flex flex-col overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-44 bg-ink overflow-hidden">
        <Image src={command.image || "/images/hero-honor.png"} alt={command.name} fill className="object-cover grayscale group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-scarletdeep/95 via-black/50 to-transparent p-4 pt-10">
          <div className="text-goldsoft font-display font-black uppercase tracking-wide leading-tight">{command.abbr}</div>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold uppercase tracking-wide">{command.name}</h3>
        {command.tagline && <p className="text-sm text-ash italic mt-1">{command.tagline}</p>}
        <p className="text-sm text-neutral-700 mt-3 line-clamp-3">{command.description}</p>
        <div className="mt-4 flex items-center gap-4 text-[11px] font-display font-bold uppercase tracking-widest text-ash">
          <span>{command.units.length} Units</span>
          <span>{command.staff.length} Leadership Posts</span>
          <span>{command.discordUrl ? "Discord Open" : "Discord WIP"}</span>
        </div>
        <Link href={`/commands/${command.slug}`} className="btn-black mt-5 text-center">View Command</Link>
      </div>
    </article>
  );
}
