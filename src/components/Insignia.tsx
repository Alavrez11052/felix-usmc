/**
 * Rank insignia drawn as vector artwork (no stock images).
 * Enlisted: gold chevrons and rockers on a scarlet plaque, in the style of
 * dress blue chevrons. Officers: silver or gold devices on a dark plaque.
 * Emblems: crossed rifles (E-3 to E-6, E-8A), bursting bomb (E-7, E-9A),
 * diamond (E-8B), star (E-9B).
 */

const GOLD = "#C5A253";
const GOLD_DARK = "#9A7E3F";
const SILVER = "#D9D9D9";
const SILVER_DARK = "#A8A8A8";
const SCARLET_BG = "#6E1423";
const INK_BG = "#171717";

export function gradeForRankTitle(title?: string | null): string | null {
  if (!title) return null;
  const t = title.trim();
  if (/^mr\.?$/i.test(t) || /secretary/i.test(t)) return null;
  const map: [RegExp, string][] = [
    [/lieutenant general|ltgen/i, "O-9"],
    [/major general|majgen/i, "O-8"],
    [/brigadier general/i, "O-7"],
    [/^general$/i, "O-10"],
    [/lieutenant colonel/i, "O-5"],
    [/^colonel$/i, "O-6"],
    [/^major$/i, "O-4"],
    [/^captain$/i, "O-3"],
    [/first lieutenant/i, "O-2"],
    [/second lieutenant/i, "O-1"],
    [/sergeant major/i, "E-9B"],
    [/master gunnery sergeant/i, "E-9A"],
    [/first sergeant/i, "E-8B"],
    [/master sergeant/i, "E-8A"],
    [/gunnery sergeant/i, "E-7"],
    [/staff sergeant/i, "E-6"],
    [/^sergeant$/i, "E-5"],
    [/^corporal$/i, "E-4"],
    [/lance corporal/i, "E-3"],
    [/private first class/i, "E-2"],
    [/^private/i, "E-1"],
  ];
  for (const [re, g] of map) if (re.test(t)) return g;
  return null;
}

function chevron(y: number) {
  return `M22 ${y + 8} L48 ${y - 6} L74 ${y + 8} L74 ${y + 15.5} L48 ${y + 1.5} L22 ${y + 15.5} Z`;
}

function rocker(y: number) {
  return `M27 ${y} Q48 ${y + 15} 69 ${y} L69 ${y + 6} Q48 ${y + 21} 27 ${y + 6} Z`;
}

function starPoints(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.42;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

function CrossedRifles({ cy }: { cy: number }) {
  return (
    <g stroke={GOLD} strokeWidth="3" strokeLinecap="round">
      <path d={`M38 ${cy + 7} L58 ${cy - 7}`} />
      <path d={`M58 ${cy + 7} L38 ${cy - 7}`} />
      <path d={`M35.5 ${cy + 4.5} L40 ${cy + 9.5}`} />
      <path d={`M60.5 ${cy + 4.5} L56 ${cy + 9.5}`} />
    </g>
  );
}

function BurstingBomb({ cy }: { cy: number }) {
  return (
    <g fill={GOLD}>
      <circle cx="48" cy={cy + 3} r="5.5" />
      <path d={`M48 ${cy - 10} L50.5 ${cy - 2} L45.5 ${cy - 2} Z`} />
      <path d={`M40 ${cy - 7} L45 ${cy - 1} L41.5 ${cy + 1.5} Z`} />
      <path d={`M56 ${cy - 7} L51 ${cy - 1} L54.5 ${cy + 1.5} Z`} />
    </g>
  );
}

function OakLeaf({ color, dark }: { color: string; dark: string }) {
  return (
    <g fill={color} stroke={dark} strokeWidth="0.8">
      <path d="M48 26 C56 36 56 50 48 60 C40 50 40 36 48 26 Z" />
      <path d="M48 60 L48 68" stroke={color} strokeWidth="3" />
      <path d="M33 40 C41 44 44 52 42 62 C34 56 31 48 33 40 Z" />
      <path d="M63 40 C55 44 52 52 54 62 C62 56 65 48 63 40 Z" />
      <circle cx="48" cy="70" r="3" />
    </g>
  );
}

function Eagle() {
  // Stylized spread eagle: layered wing chevrons, head, and shield body.
  return (
    <g fill={SILVER} stroke={SILVER_DARK} strokeWidth="0.7">
      <path d="M48 44 L20 30 L26 40 L16 36 L24 48 L48 56 Z" />
      <path d="M48 44 L76 30 L70 40 L80 36 L72 48 L48 56 Z" />
      <path d="M41 52 L55 52 L52 72 L44 72 Z" />
      <circle cx="48" cy="42" r="5" />
      <path d="M52 40 L59 43 L52 46 Z" />
    </g>
  );
}

function Bar({ x, color, dark }: { x: number; color: string; dark: string }) {
  return <rect x={x} y="38" width="18" height="20" fill={color} stroke={dark} strokeWidth="1.5" />;
}

const ENLISTED: Record<string, { up: number; rockers: number; emblem?: "rifles" | "bomb" | "diamond" | "star" }> = {
  "E-1": { up: 0, rockers: 0 },
  "E-2": { up: 1, rockers: 0 },
  "E-3": { up: 1, rockers: 0, emblem: "rifles" },
  "E-4": { up: 2, rockers: 0, emblem: "rifles" },
  "E-5": { up: 3, rockers: 0, emblem: "rifles" },
  "E-6": { up: 3, rockers: 1, emblem: "rifles" },
  "E-7": { up: 3, rockers: 2, emblem: "bomb" },
  "E-8A": { up: 3, rockers: 3, emblem: "rifles" },
  "E-8B": { up: 3, rockers: 3, emblem: "diamond" },
  "E-9A": { up: 3, rockers: 4, emblem: "bomb" },
  "E-9B": { up: 3, rockers: 4, emblem: "star" },
};

export default function Insignia({ grade, className = "h-12 w-12" }: { grade?: string | null; className?: string }) {
  if (!grade) return null;
  const enlisted = ENLISTED[grade];
  const isOfficer = grade.startsWith("O-");
  if (!enlisted && !isOfficer) return null;

  const bg = enlisted ? SCARLET_BG : INK_BG;

  let art: React.ReactNode = null;
  if (enlisted) {
    const chevYs = [24, 37, 50].slice(0, enlisted.up);
    const rockYs = enlisted.rockers ? [64, 70.5, 77, 83.5].slice(0, enlisted.rockers) : [];
    const emblemCy = enlisted.rockers ? 76 : 74;
    art = (
      <g fill={GOLD}>
        {chevYs.map((y) => <path key={y} d={chevron(y)} />)}
        {rockYs.map((y) => <path key={y} d={rocker(y)} />)}
        {enlisted.emblem === "rifles" && <CrossedRifles cy={emblemCy} />}
        {enlisted.emblem === "bomb" && <BurstingBomb cy={emblemCy} />}
        {enlisted.emblem === "diamond" && <polygon points={`48,${emblemCy - 8} 56,${emblemCy} 48,${emblemCy + 8} 40,${emblemCy}`} />}
        {enlisted.emblem === "star" && <polygon points={starPoints(48, emblemCy, 9)} />}
        {grade === "E-1" && (
          <text x="48" y="52" textAnchor="middle" fontSize="9" fill={GOLD} fontFamily="inherit" letterSpacing="1">NO INSIGNIA</text>
        )}
      </g>
    );
  } else {
    switch (grade) {
      case "O-1": art = <Bar x={39} color={GOLD} dark={GOLD_DARK} />; break;
      case "O-2": art = <Bar x={39} color={SILVER} dark={SILVER_DARK} />; break;
      case "O-3": art = <><Bar x={25} color={SILVER} dark={SILVER_DARK} /><Bar x={53} color={SILVER} dark={SILVER_DARK} /></>; break;
      case "O-4": art = <OakLeaf color={GOLD} dark={GOLD_DARK} />; break;
      case "O-5": art = <OakLeaf color={SILVER} dark={SILVER_DARK} />; break;
      case "O-6": art = <Eagle />; break;
      case "O-7": art = <polygon points={starPoints(48, 48, 13)} fill={SILVER} />; break;
      case "O-8": art = <><polygon points={starPoints(34, 48, 10)} fill={SILVER} /><polygon points={starPoints(62, 48, 10)} fill={SILVER} /></>; break;
      case "O-9": art = <><polygon points={starPoints(24, 48, 8.5)} fill={SILVER} /><polygon points={starPoints(48, 48, 8.5)} fill={SILVER} /><polygon points={starPoints(72, 48, 8.5)} fill={SILVER} /></>; break;
      case "O-10": art = <><polygon points={starPoints(48, 28, 8)} fill={SILVER} /><polygon points={starPoints(30, 50, 8)} fill={SILVER} /><polygon points={starPoints(66, 50, 8)} fill={SILVER} /><polygon points={starPoints(48, 70, 8)} fill={SILVER} /></>; break;
      default: art = null;
    }
  }

  return (
    <svg viewBox="0 0 96 96" className={className} role="img" aria-label={`${grade} insignia`}>
      <rect x="1.5" y="1.5" width="93" height="93" rx="10" fill={bg} stroke={GOLD} strokeWidth="2" />
      {art}
    </svg>
  );
}
