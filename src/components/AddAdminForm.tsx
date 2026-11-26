"use client";
import { useFormState } from "react-dom";
import { createAdminAccount, type CreateAdminState } from "@/lib/actions";
import { PERMISSIONS } from "@/lib/permissions";

export default function AddAdminForm() {
  const [state, formAction] = useFormState<CreateAdminState, FormData>(createAdminAccount, null);
  return (
    <div>
      <form action={formAction} className="mt-4 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[220px]">
          <label className="label">Name (optional)</label>
          <input className="field" name="name" placeholder="Their name" />
        </div>
        <div className="flex-1 min-w-[240px]">
          <label className="label">Email address</label>
          <input className="field" name="email" type="email" required placeholder="person@example.com" />
        </div>
        <button className="btn-black" type="submit">Create Admin Account</button>
      </form>
      <fieldset className="mt-4">
        <legend className="label">What can they access?</legend>
        <div className="grid sm:grid-cols-2 gap-2">
          {PERMISSIONS.map((perm) => (
            <label key={perm.key} className="flex items-center gap-2 text-sm border border-neutral-200 px-3 py-2">
              <input type="checkbox" name={`perm_${perm.key}`} />
              {perm.label}
            </label>
          ))}
        </div>
        <p className="mt-2 text-xs text-ash">Leave everything unchecked for an account that can sign in but change nothing. You can change this later.</p>
      </fieldset>
      {state?.error && (
        <p className="mt-4 border border-ink bg-bone px-4 py-3 text-sm font-semibold">{state.error}</p>
      )}
      {state?.password && (
        <div className="mt-4 border-2 border-ink bg-bone px-4 py-3">
          <div className="font-display font-bold uppercase tracking-wide text-sm">Account created — give them this password</div>
          <div className="mt-2 text-sm space-y-1">
            <div>Email: <strong>{state.email}</strong></div>
            <div>Temporary password: <strong className="font-mono text-base tracking-wider">{state.password}</strong></div>
          </div>
          <p className="mt-2 text-xs text-neutral-600">
            This password is shown only once — copy it now. They sign in at /login with it and can change it
            under <strong>My Account</strong> in the admin dashboard.
          </p>
        </div>
      )}
    </div>
  );
}
