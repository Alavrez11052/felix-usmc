import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  // Content-only reset (users/invites are left alone).
  await db.unit.deleteMany();
  await db.commandStaff.deleteMany();
  await db.command.deleteMany();
  await db.leadership.deleteMany();
  await db.rank.deleteMany();
  await db.rankCategory.deleteMany();
  await db.affiliate.deleteMany();
  await db.announcement.deleteMany();

  await db.siteConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      discordUrl: "https://discord.gg/BaqseTRUVA",
      robloxGroupUrl: "https://www.roblox.com/communities/274173297/United-States-Marine-Corps#!/about",
      xUrl: "https://x.com/FelixMarinesRbx",
    },
  });

  const commands = [
    {
      slug: "marsoc", name: "Marine Special Operations Command", abbr: "MARSOC", sortOrder: 1,
      tagline: "Marine Raiders — experts at CQB and SOF capabilities",
      description: "The Marine Special Operations Command (MARSOC) is the United States Marine Corps' main special operations force command. Marine Raiders are experts at CQB and other SOF capabilities.",
      discordUrl: "https://discord.gg/UZNknayCpm", image: "/images/marsoc-raiders.png",
      units: [
        { name: "Marine Raider Regiment", description: "The United States Marine Corps' most elite — experts at CQB and fast-paced combat, the main SOF regiment.", discordNote: "WIP" },
        { name: "Marine Raider Training Center", description: "Processes Marines for the title of \"Marine Raider\"; on completion of A&S and ITC the Marine earns their Marine Special Operator Insignia. MRTC Marines are the instructors of A&S/ITC.", discordNote: "WIP" },
      ],
      staff: [
        { roleTitle: "Commanding General", rankLabel: "O-8", name: "lam_Eddie" },
        { roleTitle: "Deputy Commanding General", rankLabel: "O-7", name: "SHFJGTDL" },
        { roleTitle: "Command Sergeant Major", rankLabel: "E-9B", name: "Tttpogare" },
      ],
    },
    {
      slug: "mcmp", name: "Marine Corps Military Police", abbr: "MCMP", sortOrder: 2,
      tagline: "Semper Vigilans — Always Vigilant",
      description: "The Marine Corps Military Police (MCMP) provides support to the United States Marine Corps by enforcing the UCMJ. The Marine Corps Military Police has four units within MCMP.",
      discordUrl: "https://discord.gg/ZkZKxfacvQ", image: "/images/hero-honor.png",
      units: [
        { name: "Provost Marshal's Office", description: "Enforces order and discipline, and protects service members, their families and civilian workers.", discordNote: "MP DISCORD" },
        { name: "Criminal Investigation Division", description: "Investigates criminal offenses involving service members and civilians associated with the U.S. Marine Corps.", discordNote: "WIP" },
        { name: "Special Reaction Team", description: "High-risk situations, hostage rescue, counter-terrorism, armed suspects and barricaded individuals.", discordNote: "MP DISCORD" },
        { name: "Law Enforcement Battalion", description: "Maintains law, order and discipline.", discordNote: "MP DISCORD" },
      ],
      staff: [
        { roleTitle: "Provost Marshal General", rankLabel: "O-9", name: "KUNALNG6" },
        { roleTitle: "Deputy Provost Marshal General", rankLabel: "O-8", name: "Sgt9899" },
        { roleTitle: "Provost Sergeant Major", rankLabel: "E-9B", name: "ffdydydfxggxxxx" },
      ],
    },
    {
      slug: "tecom", name: "Training & Education Command", abbr: "TECOM", sortOrder: 3,
      tagline: "The backbone of training within the Marine Corps",
      description: "Training and Education Command (TECOM) is the United States Marine Corps' main training command. TECOM leads the Marine Corps' individual-entry-level training and professional military education — teaching, ensuring common knowledge, and transforming civilians into Marines. Without them, the Marine Corps would be a thing of the past.",
      discordUrl: "https://discord.gg/yEAN9WGGn", image: "/images/tecom-recon.png",
      units: [
        { name: "Recruit Training Regiment", description: "Turns civilians into United States Marines at Marine Corps Recruit Depot, led by Drill Instructors — the best of the best.", discordNote: "WIP" },
        { name: "Officer Candidate School", description: "Trains new officers; OCS Commanders decide whether a candidate is ready to become an officer.", discordNote: "WIP" },
      ],
      staff: [
        { roleTitle: "Commanding General", rankLabel: "O-9", name: "Quorvex1212" },
        { roleTitle: "Deputy Commanding General", rankLabel: "O-8", name: "N/A" },
        { roleTitle: "Command Sergeant Major", rankLabel: "E-9B", name: "Juju_Dev1" },
      ],
    },
    {
      slug: "marforcom", name: "Marine Forces Command", abbr: "MARFORCOM", sortOrder: 4,
      tagline: "The main fighting force of the United States Marine Corps",
      description: "The Marine Forces Command is the main fighting force of the United States Marine Corps. MARFORLANT was officially named the Marine Corps Forces Command on the 30th December, 2004. MARFORCOM is home of 2 units: the 2nd Marine Division (2MARDIV) and the 2nd Marine Aircraft Wing (2MAW).",
      discordUrl: "https://discord.gg/S3ZF94cPqZ", image: "/images/marforcom-2mardiv.png",
      units: [
        { name: "2nd Marine Division", description: "Ground combat division of infantry regiments and supporting battalions, stationed at Marine Corps Base Camp Lejeune, North Carolina, under II Marine Expeditionary Force.", discordNote: "WIP" },
        { name: "2nd Marine Aircraft Wing", description: "Provides aviation support to the Marine Forces Command.", discordNote: "WIP" },
      ],
      staff: [
        { roleTitle: "Commanding General", rankLabel: "O-9", name: "Blu3Tig3r3" },
        { roleTitle: "Deputy Commanding General", rankLabel: "O-8", name: "MiloooEclipse" },
        { roleTitle: "Command Sergeant Major", rankLabel: "E-9B", name: "connetttf" },
      ],
    },
    {
      slug: "jad", name: "Judge Advocate Division", abbr: "JAD", sortOrder: 5,
      tagline: "Legal services, proceedings, and courts-martial",
      description: "The Judge Advocate Division is responsible for advising Marine Headquarters regarding legal matters. JAD reviews investigations. Marines under JAD determine who is guilty and who is innocent. JAD provides legal services, legal proceedings and trials, courts-martial, and JAG officers.",
      discordUrl: null, image: "/images/hero-honor.png",
      units: [],
      staff: [
        { roleTitle: "Staff Judge Advocate to the CMC", rankLabel: "O-8", name: "2jami" },
        { roleTitle: "Deputy Staff Judge Advocate", rankLabel: "O-7", name: "Rias2903" },
        { roleTitle: "Assistant Staff Judge Advocate", rankLabel: "O-6", name: "N/A" },
      ],
    },
    {
      slug: "oigmc", name: "Office of the Inspector General of the Marine Corps", abbr: "OIGMC", sortOrder: 6,
      tagline: "Inspections, accountability, and investigations",
      description: "The Office of the Inspector General of the Marine Corps handles all logistical purposes of the United States Marine Corps, for example approving a decorations request, recommendations, etcetera. OIGMC conducts inspections, ensures accountability, and handles reporting and investigations — members are encouraged to report any violations. Marines under OIGMC are expected to be disciplined, as they contribute to the inspections of Marines during important events.",
      discordUrl: null, image: "/images/hero-honor.png",
      units: [],
      staff: [
        { roleTitle: "Chief of Staff", rankLabel: "COS", name: "MaximMax01" },
        { roleTitle: "Deputy Chief of Staff", rankLabel: "DCOS", name: "z5hFhElI" },
        { roleTitle: "Senior Enlisted Advisor", rankLabel: "E-9B", name: "N/A" },
      ],
    },
  ];

  for (const c of commands) {
    const { units, staff, ...data } = c;
    const cmd = await db.command.create({ data });
    for (let i = 0; i < units.length; i++) await db.unit.create({ data: { ...units[i], commandId: cmd.id, sortOrder: i + 1 } });
    for (let i = 0; i < staff.length; i++) await db.commandStaff.create({ data: { ...staff[i], commandId: cmd.id, sortOrder: i + 1 } });
  }

  const leadership = [
    { abbr: "SECNAV", title: "Secretary of the Navy", rankTitle: "Mr. Secretary", name: "felix2417" },
    { abbr: "CMC", title: "Commandant of the Marine Corps", rankTitle: "General", name: "MoonOfAstra" },
    { abbr: "ACMC", title: "Assistant Commandant of the Marine Corps", rankTitle: "General", name: "Pine63381" },
    { abbr: "SMMC", title: "Sergeant Major of the Marine Corps", rankTitle: "Sergeant Major", name: "Paraxaum_Xerit" },
    { abbr: "DMCS", title: "Director of Marine Corps Staff", rankTitle: "LtGen", name: "alpha3391" },
    { abbr: "OIGMC", title: "Inspector General of the Marine Corps", rankTitle: "MajGen", name: "Caydenpogi33" },
    { abbr: "DIGMC", title: "Deputy Inspector General of the Marine Corps", rankTitle: "Mr.", name: "TheImperialNugget" },
    { abbr: "SJA", title: "Staff Judge Advocate to the Commandant of the Marine Corps", rankTitle: "MajGen", name: "2jami" },
  ];
  for (let i = 0; i < leadership.length; i++) await db.leadership.create({ data: { ...leadership[i], sortOrder: i + 1 } });

  const categories: [string, string, [string, string][]][] = [
    ["General Grade Officers", "GGO", [["O-9", "Lieutenant General"], ["O-8", "Major General"], ["O-7", "Brigadier General"]]],
    ["Field Grade Officers", "FGO", [["O-6", "Colonel"], ["O-5", "Lieutenant Colonel"], ["O-4", "Major"]]],
    ["Company Grade Officers", "CGO", [["O-3", "Captain"], ["O-2", "First Lieutenant"], ["O-1", "Second Lieutenant"]]],
    ["Staff Non-Commissioned Officers", "SNCO", [["E-9B", "Sergeant Major"], ["E-9A", "Master Gunnery Sergeant"], ["E-8B", "First Sergeant"], ["E-8A", "Master Sergeant"], ["E-7", "Gunnery Sergeant"], ["E-6", "Staff Sergeant"]]],
    ["Non-Commissioned Officers", "NCO", [["E-5", "Sergeant"], ["E-4", "Corporal"]]],
    ["Junior Enlisted", "", [["E-3", "Lance Corporal"], ["E-2", "Private First Class"], ["E-1", "Private (RT/BOOTCAMP)"]]],
  ];
  for (let ci = 0; ci < categories.length; ci++) {
    const [name, code, ranks] = categories[ci];
    const cat = await db.rankCategory.create({ data: { name, code, sortOrder: ci + 1 } });
    for (let ri = 0; ri < ranks.length; ri++) await db.rank.create({ data: { categoryId: cat.id, code: ranks[ri][0], name: ranks[ri][1], sortOrder: ri + 1 } });
  }

  console.log("Seed complete: 6 commands, 8 leadership, 20 ranks.");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());
