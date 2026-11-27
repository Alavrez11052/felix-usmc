import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { changePassword } from "@/lib/actions";

export const metadata = { title: "Admin: My Account" };

export default async function MyAccount({ searchParams }: { searchParams: { done?: string; error?: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <div>
      <h1 className="h-display text-3xl">My Account</h1>
      <section className="admin-card mt-6">
        <div className="text-sm space-y-1">
          <div><span className="text-ash">Name:</span> <strong>{user.name}</strong></div>
          <div><span className="text-ash">Email:</span> <strong>{user.email}</strong></div>
          <div><span className="text-ash">Role:</span> <strong>{user.role}</strong></div>
        </div>
      </section>
      <section className="admin-card mt-6">
        <h2 className="font-display font-bold uppercase tracking-wide">Change Your Password</h2>
        <p className="mt-2 text-sm text-neutral-600">
          If the owner gave you a temporary password, set your own here. It takes effect immediately.
        </p>
        {searchParams.done && (
          <p className="mt-4 border border-ink bg-bone px-4 py-3 text-sm font-semibold">Password changed.</p>
        )}
        {searchParams.error && (
          <p className="mt-4 border border-ink bg-bone px-4 py-3 text-sm font-semibold">Your current password was not correct.</p>
        )}
        <form action={changePassword} className="mt-4 space-y-4 max-w-md">
          <div>
            <label className="label" htmlFor="currentPassword">Current password</label>
            <input className="field" id="currentPassword" name="currentPassword" type="password" required autoComplete="current-password" />
          </div>
          <div>
            <label className="label" htmlFor="newPassword">New password (8+ characters)</label>
            <input className="field" id="newPassword" name="newPassword" type="password" required minLength={8} autoComplete="new-password" />
          </div>
          <button className="btn-black" type="submit">Change Password</button>
        </form>
      </section>
    </div>
  );
}
