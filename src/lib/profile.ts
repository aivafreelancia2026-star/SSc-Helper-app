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
  score: number;
};

const BASE_COLUMNS = "id, full_name, school_name, class_grade";
const ROLE_COLUMNS = `${BASE_COLUMNS}, role, email`;
const FULL_COLUMNS = `${ROLE_COLUMNS}, score`;

// Cached per request: the (app) layout and each page both need the profile,
// and this dedupes those into a single query when called with the same
// (memoized) supabase client — see createClient in lib/supabase/server.ts.
//
// Columns were added to this table in stages (role/email, then later
// score), and each stage's migration might not have run yet in a given
// environment. This cascades through three tiers rather than jumping
// straight from "every column" to "only the original columns" — a single
// missing later column (e.g. score) must not also drop role/email, or
// every user silently reverts to the student role/no admin access.
export const getProfile = cache(async function getProfile(
  supabase: SupabaseClient,
  userId: string,
): Promise<Profile | null> {
  const full = await supabase
    .from("profiles")
    .select(FULL_COLUMNS)
    .eq("id", userId)
    .maybeSingle();

  const withRole = full.error
    ? await supabase.from("profiles").select(ROLE_COLUMNS).eq("id", userId).maybeSingle()
    : full;

  const { data } = withRole.error
    ? await supabase.from("profiles").select(BASE_COLUMNS).eq("id", userId).maybeSingle()
    : withRole;

  if (!data) return null;
  return {
    id: data.id,
    fullName: data.full_name,
    schoolName: data.school_name,
    classGrade: data.class_grade,
    role: ("role" in data && (data.role as Role)) || "student",
    email: ("email" in data && (data.email as string | null)) || null,
    score: ("score" in data && (data.score as number)) || 0,
  };
});

export function isProfileComplete(profile: Profile | null): boolean {
  return Boolean(profile?.schoolName && profile?.classGrade);
}
