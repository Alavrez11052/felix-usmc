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
      tagline: "Home of the Marine Raiders",
      description: "The special operations command of the Marine Corps. Its Raiders are hand picked and trained for close quarters combat and fast, direct missions that regular units do not take on.",
      discordUrl: "https://discord.gg/UZNknayCpm", image: "/images/cmd-marsoc.jpg",
      units: [
        { name: "Marine Raider Regiment", description: "The main fighting force of the command. Raiders specialize in close quarters combat and fast paced operations.", discordNote: "WIP" },
        { name: "Marine Raider Training Center", description: "Runs selection and the training course that follows it. Marines who finish earn the title of Marine Raider and the Marine Special Operator Insignia.", discordNote: "WIP" },
      ],
      staff: [
        { roleTitle: "Commanding General", rankLabel: "O-8", name: "lam_Eddie" },
        { roleTitle: "Deputy Commanding General", rankLabel: "O-7", name: "SHFJGTDL" },
        { roleTitle: "Command Sergeant Major", rankLabel: "E-9B", name: "Tttpogare" },
      ],
    },
    {
      slug: "mcmp", name: "Marine Corps Military Police", abbr: "MCMP", sortOrder: 2,
      tagline: "Semper Vigilans (Always Vigilant)",
      description: "The Military Police keep order and enforce the Uniform Code of Military Justice. They patrol the base, respond to calls, work checkpoints, and investigate crimes involving Marines. The command is made up of four units.",
      discordUrl: "https://discord.gg/ZkZKxfacvQ", image: "/images/cmd-mcmp.jpg",
      units: [
        { name: "Provost Marshal's Office", description: "The headquarters of the Military Police. It enforces order and discipline, and protects Marines, their families, and civilian workers.", discordNote: "MP DISCORD" },
        { name: "Criminal Investigation Division", description: "Investigates crimes involving Marines and civilians connected to the Marine Corps.", discordNote: "WIP" },
        { name: "Special Reaction Team", description: "The tactical team of the Military Police. They handle hostage situations, barricaded suspects, and other high risk calls.", discordNote: "MP DISCORD" },
        { name: "Law Enforcement Battalion", description: "Runs patrols and keeps law and order wherever the command needs it.", discordNote: "MP DISCORD" },
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
      description: "Training and Education Command runs all Marine Corps training. Every Marine starts here, at recruit training or at Officer Candidate School, and Marines come back throughout their careers for more schooling.",
      discordUrl: "https://discord.gg/yEAN9WGGn", image: "/images/cmd-tecom.jpg",
      units: [
        { name: "Recruit Training Regiment", description: "Runs boot camp at the Marine Corps Recruit Depot. Drill Instructors turn civilians into Marines.", discordNote: "WIP" },
        { name: "Officer Candidate School", description: "Trains and screens future officers. The staff decide who is ready to lead Marines.", discordNote: "WIP" },
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
      description: "Marine Forces Command is the fighting force of the Marine Corps. It is built around two units: the 2nd Marine Division on the ground and the 2nd Marine Aircraft Wing in the air.",
      discordUrl: "https://discord.gg/S3ZF94cPqZ", image: "/images/cmd-marforcom.jpg",
      units: [
        { name: "2nd Marine Division", description: "The ground combat division, based at Camp Lejeune, North Carolina. Its infantry regiments and supporting battalions do the fighting on the ground.", discordNote: "WIP" },
        { name: "2nd Marine Aircraft Wing", description: "The aviation side of the command. Its squadrons fly in support of the division.", discordNote: "WIP" },
      ],
      staff: [
        { roleTitle: "Commanding General", rankLabel: "O-9", name: "Blu3Tig3r3" },
        { roleTitle: "Deputy Commanding General", rankLabel: "O-8", name: "MiloooEclipse" },
        { roleTitle: "Command Sergeant Major", rankLabel: "E-9B", name: "connetttf" },
      ],
    },
    {
      slug: "jad", name: "Judge Advocate Division", abbr: "JAD", sortOrder: 5,
      tagline: "Legal advice, trials, and courts-martial",
      description: "The Judge Advocate Division is the legal office of Headquarters. Its judge advocates advise commanders on the law, review investigations, and run trials and courts-martial.",
      discordUrl: null, image: "/images/cmd-jad.jpg",
      units: [],
      staff: [
        { roleTitle: "Staff Judge Advocate to the CMC", rankLabel: "O-8", name: "2jami" },
        { roleTitle: "Deputy Staff Judge Advocate", rankLabel: "O-7", name: "Rias2903" },
        { roleTitle: "Assistant Staff Judge Advocate", rankLabel: "O-6", name: "N/A" },
      ],
    },
    {
      slug: "oigmc", name: "Office of the Inspector General of the Marine Corps", abbr: "OIGMC", sortOrder: 6,
      tagline: "Inspections and accountability",
      description: "The Office of the Inspector General inspects units, checks that standards are being met, and investigates reports of wrongdoing. Any Marine can bring a problem to this office.",
      discordUrl: null, image: "/images/cmd-oigmc.jpg",
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
