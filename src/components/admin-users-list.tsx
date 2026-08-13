"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile, Role } from "@/lib/profile";

const ROLES: Role[] = ["student", "teacher", "developer", "founder"];

export function AdminUsersList({ users: initialUsers }: { users: Profile[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleRoleChange(userId: string, role: Role) {
    setError(null);
    setSavingId(userId);

    const supabase = createClient();
    const { error } = await supabase.from("profiles").update({ role }).eq("id", userId);

    setSavingId(null);
    if (error) {
      setError(error.message);
      return;
    }
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
  }

  return (
    <div className="w-full max-w-2xl">
      {error && (
        <div
          role="alert"
          className="mb-4 rounded-2xl bg-destructive/10 px-4 py-2.5 font-body text-sm font-semibold text-destructive"
        >
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-[24px] border border-white/60 bg-white/80 shadow-[6px_6px_14px_rgba(79,70,229,0.1),-4px_-4px_10px_rgba(255,255,255,0.7)]">
        <table className="w-full min-w-[560px] text-left">
          <thead>
            <tr className="border-b border-border/60 text-xs font-heading font-semibold uppercase tracking-wide text-foreground/50">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border/40 last:border-0">
                <td className="px-4 py-3 font-body text-sm text-foreground">
                  {user.fullName ?? "—"}
                </td>
                <td className="px-4 py-3 font-body text-sm text-foreground/70">
                  {user.email ?? "—"}
                </td>
                <td className="px-4 py-3 font-body text-sm text-foreground/70">
                  {user.classGrade ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={user.role}
                    disabled={savingId === user.id}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                    className="cursor-pointer rounded-[12px] border-2 border-border bg-white/70 px-2.5 py-1.5 font-body text-sm text-foreground focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
