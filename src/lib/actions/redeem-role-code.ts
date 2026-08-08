"use server";

import { createClient } from "@/lib/supabase/server";
import type { Role } from "@/lib/profile";

// Codes live in server-only env vars (no NEXT_PUBLIC_ prefix), so they never
// reach the client bundle. This function only runs on the server.
function codeToRole(code: string): Role | null {
  if (process.env.FOUNDER_ROLE_CODE && code === process.env.FOUNDER_ROLE_CODE) return "founder";
  if (process.env.DEVELOPER_ROLE_CODE && code === process.env.DEVELOPER_ROLE_CODE) return "developer";
  if (process.env.TEACHER_ROLE_CODE && code === process.env.TEACHER_ROLE_CODE) return "teacher";
  if (process.env.STUDENT_ROLE_CODE && code === process.env.STUDENT_ROLE_CODE) return "student";
  return null;
}

export async function redeemRoleCode(
  code: string,
): Promise<{ success: true; role: Role } | { success: false; error: string }> {
  const role = codeToRole(code);
  if (!role) {
    return { success: false, error: "That code isn't valid." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "You need to be signed in." };
  }

  // Relies on the existing "users can update their own profile" RLS policy
  // — no service-role key needed, this only ever changes the caller's own row.
  const { error } = await supabase.from("profiles").update({ role }).eq("id", user.id);
  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, role };
}
