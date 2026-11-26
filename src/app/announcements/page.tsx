import { getAnnouncements } from "@/lib/data";

export const metadata = { title: "Announcements" };

export default async function Announcements() {
  const announcements = await getAnnouncements();
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="h-display text-4xl border-l-8 border-ink pl-4">Announcements</h1>
      {announcements.length === 0 ? (
        <p className="mt-6 text-neutral-600">No announcements have been published yet.</p>
      ) : (
        <div className="mt-8 space-y-5">
          {announcements.map((a) => (
            <article key={a.id} className="card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-display font-bold uppercase tracking-widest text-ash">
                  {a.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </span>
                {a.featured && <span className="bg-ink text-paper text-[10px] font-display font-bold uppercase tracking-widest px-2 py-1">Featured</span>}
              </div>
              <h2 className="mt-2 font-display font-bold uppercase tracking-wide text-xl">{a.title}</h2>
              <p className="mt-3 text-neutral-700 leading-relaxed whitespace-pre-line">{a.body}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
