import { db } from "@/lib/db";
import { acceptInvite } from "@/lib/actions";

export const metadata = { title: "Accept Admin Invite" };

export default async function AcceptInvite({ searchParams }: { searchParams: { token?: string } }) {
  const token = searchParams.token ?? "";
  const invite = token ? await db.adminInvite.findUnique({ where: { token } }) : null;
  const valid = invite && !invite.claimedAt;
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="h-display text-3xl border-l-8 border-ink pl-4">Admin Invite</h1>
      {!valid ? (
        <p className="mt-4 border border-ink bg-bone px-4 py-3 text-sm font-semibold">
          This invite link is invalid or has already been used. Ask the site owner for a new one.
        </p>
      ) : (
        <>
          <p className="mt-3 text-sm text-neutral-600">
            You have been invited to administer Felix&rsquo;s USMC as <strong>{invite.email}</strong>. Set your name and
            password to activate your account.
          </p>
          <form action={acceptInvite} className="mt-6 space-y-4">
            <input type="hidden" name="token" value={token} />
            <div>
              <label className="label" htmlFor="name">Name</label>
              <input className="field" id="name" name="name" required />
            </div>
            <div>
              <label className="label" htmlFor="password">Password (8+ characters)</label>
              <input className="field" id="password" name="password" type="password" required minLength={8} />
            </div>
            <button className="btn-black w-full" type="submit">Activate Admin Account</button>
          </form>
        </>
      )}
    </div>
  );
}
