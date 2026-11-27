import { getConfig } from "@/lib/data";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { updateConfig } from "@/lib/actions";

export const metadata = { title: "Admin: Configuration" };

export default async function AdminConfig() {
  const me = await getCurrentUser();
  if (!me || !hasPermission(me, "config")) redirect("/admin");
  const cfg = await getConfig();
  return (
    <div>
      <h1 className="h-display text-3xl">Website Configuration</h1>
      <section className="admin-card mt-6">
        <form action={updateConfig} className="space-y-4">
          <div><label className="label">Main Discord Invite URL</label><input className="field" name="discordUrl" defaultValue={cfg.discordUrl} /></div>
          <div><label className="label">Roblox Group URL</label><input className="field" name="robloxGroupUrl" defaultValue={cfg.robloxGroupUrl} /></div>
          <div><label className="label">X (Twitter) URL</label><input className="field" name="xUrl" defaultValue={cfg.xUrl} /></div>
          <div><label className="label">Announcement Banner (shown at the top of every page; blank = off)</label><input className="field" name="bannerText" defaultValue={cfg.bannerText ?? ""} /></div>
          <button className="btn-black" type="submit">Save Configuration</button>
        </form>
      </section>
    </div>
  );
}
