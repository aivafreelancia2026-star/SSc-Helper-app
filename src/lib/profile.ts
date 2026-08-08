import type { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

export type Role = "founder" | "developer" | "teacher" | "student";

export type Profile = {
  id: string;
  fullName: string | null;
  schoolName: string | null;
  classGrade: number | null;
  role: Role;
  email: string | null;
};

const BASE_COLUMNS = "id, full_name, school_name, class_grade";

// Cached per request: the (app) layout and each page both need the profile,
// and this dedupes those into a single query when called with the same
// (memoized) supabase client — see createClient in lib/supabase/server.ts.
export const getProfile = cache(async function getProfile(
  supabase: SupabaseClient,
  userId: string,
): Promise<Profile | null> {
  const full = await supabase
    .from("profiles")
    .select(`${BASE_COLUMNS}, role, email`)
    .eq("id", userId)
    .maybeSingle();

  // role/email were added after profiles already existed in production —
  // if that migration hasn't run yet on this environment, fall back to the
  // original columns rather than blocking onboarding/login entirely. Once
  // the migration is confirmed applied everywhere, this fallback is dead
  // code and can be removed.
  const { data } = full.error
    ? await supabase.from("profiles").select(BASE_COLUMNS).eq("id", userId).maybeSingle()
    : full;

  if (!data) return null;
  return {
    id: data.id,
    fullName: data.full_name,
    schoolName: data.school_name,
    classGrade: data.class_grade,
    role: ("role" in data && (data.role as Role)) || "student",
    email: ("email" in data && (data.email as string | null)) || null,
  };
});

export function isProfileComplete(profile: Profile | null): boolean {
  return Boolean(profile?.schoolName && profile?.classGrade);
}
