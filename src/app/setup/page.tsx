import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { setupOwner } from "@/lib/actions";

export const metadata = { title: "Owner Setup" };

export default async function Setup() {
  const count = await db.user.count();
  if (count > 0) redirect("/login");
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="h-display text-3xl border-l-8 border-ink pl-4">Owner Setup</h1>
      <p className="mt-3 text-sm text-neutral-600">
        No administrator account exists yet. Create the owner account. This is a one-time step, and it must use the
        site owner's email address below. After this, the owner can invite other administrators by email from the
        dashboard; each invitee sets their own password from a one-time link.
      </p>
      <form action={setupOwner} className="mt-6 space-y-4">
        <div>
          <label className="label" htmlFor="name">Name</label>
          <input className="field" id="name" name="name" required />
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input className="field" id="email" name="email" type="email" required defaultValue="braydenkennedy061@gmail.com" readOnly />
        </div>
        <div>
          <label className="label" htmlFor="password">Password (8+ characters)</label>
          <input className="field" id="password" name="password" type="password" required minLength={8} />
        </div>
        <button className="btn-black w-full" type="submit">Create Owner Account</button>
      </form>
    </div>
  );
}
