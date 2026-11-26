import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { removeAdmin, setAdminPermissions } from "@/lib/actions";
import { PERMISSIONS, hasPermission } from "@/lib/permissions";
import AddAdminForm from "@/components/AddAdminForm";

export const metadata = { title: "Admin — Administrators" };

export default async function AdminAdmins() {
  const me = await getCurrentUser();
  if (!me) redirect("/login");
  const canManage = hasPermission(me, "admins");
  const users = await db.user.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <div>
      <h1 className="h-display text-3xl">Administrators</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Access is granted per person. The owner has every permission and can never be edited or removed.
        {canManage
          ? " You can add administrators by email — the system generates a temporary password for you to give them — and choose exactly what each admin can access, including the right to add admins themselves."
          : " You don't have permission to manage administrators — ask the owner if you need it."}
      </p>

      <section className="admin-card mt-6">
        <h2 className="font-display font-bold uppercase tracking-wide">Current Administrators</h2>
        <div className="mt-4 space-y-4">
          {users.map((u) => (
            <div key={u.id} className="border border-neutral-200 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[200px]">
                  <span className="font-display font-bold">{u.name}</span>{" "}
                  <span className="text-ash text-sm">{u.email}</span>
                  {u.id === me.id && <span className="text-ash text-sm"> (you)</span>}
                </div>
                <span className="bg-ink text-paper text-[10px] font-display font-bold uppercase tracking-widest px-2 py-1">{u.role}</span>
                {canManage && u.role !== "OWNER" && u.id !== me.id && (
                  <form action={removeAdmin}>
                    <input type="hidden" name="id" value={u.id} />
                    <button className="btn-outline-b !px-3 !py-1.5 text-xs" type="submit">Remove</button>
                  </form>
                )}
              </div>
              {u.role === "OWNER" ? (
                <p className="mt-2 text-xs text-ash">All permissions (owner).</p>
              ) : canManage ? (
                <form action={setAdminPermissions} className="mt-3">
                  <input type="hidden" name="id" value={u.id} />
                  <div className="grid sm:grid-cols-2 gap-2">
                    {PERMISSIONS.map((perm) => (
                      <label key={perm.key} className="flex items-center gap-2 text-sm border border-neutral-200 px-3 py-2">
                        <input type="checkbox" name={`perm_${perm.key}`} defaultChecked={u.permissions.includes(perm.key)} />
                        {perm.label}
                      </label>
                    ))}
                  </div>
                  <button className="btn-black !px-3 !py-1.5 text-xs mt-3" type="submit">Save Permissions</button>
                </form>
              ) : (
                <p className="mt-2 text-xs text-ash">
                  {u.permissions.length === 0
                    ? "No permissions — can sign in only."
                    : `Can access: ${PERMISSIONS.filter((p) => u.permissions.includes(p.key)).map((p) => p.label).join(", ")}`}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {canManage && (
        <section className="admin-card mt-6">
          <h2 className="font-display font-bold uppercase tracking-wide">Add an Administrator by Email</h2>
          <AddAdminForm />
        </section>
      )}
    </div>
  );
}
