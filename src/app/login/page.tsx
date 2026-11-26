import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { login } from "@/lib/actions";

export const metadata = { title: "Admin Login" };

export default async function Login({ searchParams }: { searchParams: { error?: string } }) {
  const count = await db.user.count();
  if (count === 0) redirect("/setup");
  const user = await getCurrentUser();
  if (user) redirect("/admin");
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="h-display text-3xl border-l-8 border-ink pl-4">Admin Login</h1>
      <p className="mt-3 text-sm text-neutral-600">Authorized administrators only. Sign in with the email address you were invited with.</p>
      {searchParams.error && (
        <p className="mt-4 border border-ink bg-bone px-4 py-3 text-sm font-semibold">Invalid email or password.</p>
      )}
      <form action={login} className="mt-6 space-y-4">
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input className="field" id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <input className="field" id="password" name="password" type="password" required autoComplete="current-password" />
        </div>
        <button className="btn-black w-full" type="submit">Sign In</button>
      </form>
    </div>
  );
}
