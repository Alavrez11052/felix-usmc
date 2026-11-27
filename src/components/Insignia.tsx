/**
 * Rank insignia using the official United States Marine Corps insignia
 * artwork from Wikipedia / Wikimedia Commons (2020 to present set),
 * stored locally in public/images/insignia. E-1 (Private) has no insignia.
 */

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

const GRADES = new Set([
  "E-2", "E-3", "E-4", "E-5", "E-6", "E-7", "E-8A", "E-8B", "E-9A", "E-9B",
  "O-1", "O-2", "O-3", "O-4", "O-5", "O-6", "O-7", "O-8", "O-9", "O-10",
]);

export default function Insignia({ grade, className = "h-12 w-12" }: { grade?: string | null; className?: string }) {
  if (!grade) return null;
  if (grade === "E-1") {
    return (
      <span
        className={`${className} inline-flex items-center justify-center border-2 border-[#C5A253] bg-[#6E1423] text-center text-[8px] font-bold tracking-widest text-[#C5A253]`}
        role="img"
        aria-label="E-1 insignia (none)"
      >
        NO INSIGNIA
      </span>
    );
  }
  if (!GRADES.has(grade)) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/insignia/${grade.toLowerCase()}.svg`}
      alt={`${grade} insignia`}
      className={`${className} object-contain`}
      loading="lazy"
    />
  );
}
