import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { createAnnouncement, deleteAnnouncement, updateAnnouncement } from "@/lib/actions";

export const metadata = { title: "Admin: Announcements" };

export default async function AdminAnnouncements() {
  const me = await getCurrentUser();
  if (!me || !hasPermission(me, "announcements")) redirect("/admin");
  const announcements = await db.announcement.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="h-display text-3xl">Announcements</h1>
      <section className="admin-card mt-6">
        <h2 className="font-display font-bold uppercase tracking-wide">Publish an Announcement</h2>
        <form action={createAnnouncement} className="mt-4 space-y-4">
          <div><label className="label">Title</label><input className="field" name="title" required /></div>
          <div><label className="label">Body</label><textarea className="field" name="body" rows={5} required /></div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" /> Feature on the homepage</label>
          <button className="btn-black" type="submit">Publish</button>
        </form>
      </section>
      <div className="mt-8 space-y-4">
        {announcements.map((a) => (
          <section key={a.id} className="admin-card">
            <form action={updateAnnouncement} className="space-y-3">
              <input type="hidden" name="id" value={a.id} />
              <div className="flex flex-wrap gap-4 text-xs text-ash">
                <span>{a.createdAt.toLocaleString()}</span>
                {a.featured && <span className="font-display font-bold uppercase tracking-widest text-ink">Featured</span>}
              </div>
              <div><label className="label">Title</label><input className="field" name="title" defaultValue={a.title} /></div>
              <div><label className="label">Body</label><textarea className="field" name="body" rows={4} defaultValue={a.body} /></div>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" defaultChecked={a.featured} /> Featured</label>
              <div className="flex gap-3">
                <button className="btn-black !px-4 !py-2 text-xs" type="submit">Save</button>
                <button formAction={deleteAnnouncement} className="btn-outline-b !px-4 !py-2 text-xs" type="submit">Delete</button>
              </div>
            </form>
          </section>
        ))}
        {announcements.length === 0 && <p className="text-sm text-neutral-600">No announcements yet.</p>}
      </div>
    </div>
  );
}
