import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/profile";
import type { Profile } from "@/lib/profile";
import { BackgroundBlobs } from "@/components/logo-mark";
import { AdminUsersList } from "@/components/admin-users-list";
import { PAGES } from "@/lib/pages";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  const profile = await getProfile(supabase, user.id);

  if (profile?.role !== "founder") {
    return (
      <div
        data-page-id={PAGES.admin.id}
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-12"
      >
        <BackgroundBlobs />
        <div className="relative z-10 w-full max-w-sm rounded-[32px] border border-white/60 bg-white/80 p-8 text-center shadow-[12px_12px_28px_rgba(79,70,229,0.12),-8px_-8px_20px_rgba(255,255,255,0.8)] backdrop-blur-sm">
          <h1 className="font-heading text-xl font-bold text-foreground">Founder access only</h1>
          <p className="mt-2 font-body text-sm text-foreground/60">
            This page is only available to the Founder role.
          </p>
        </div>
      </div>
    );
  }

  const full = await supabase
    .from("profiles")
    .select("id, full_name, school_name, class_grade, role, email, score")
    .order("created_at", { ascending: false });

  // score was added after role/email — if that migration hasn't run yet,
  // fall back to the columns that do exist rather than breaking this page.
  const { data } = full.error
    ? await supabase
        .from("profiles")
        .select("id, full_name, school_name, class_grade, role, email")
        .order("created_at", { ascending: false })
    : full;

  const users: Profile[] = (data ?? []).map((row) => ({
    id: row.id,
    fullName: row.full_name,
    schoolName: row.school_name,
    classGrade: row.class_grade,
    role: row.role,
    email: row.email,
    score: ("score" in row && (row.score as number)) || 0,
  }));

  return (
    <div
      data-page-id={PAGES.admin.id}
      className="relative flex flex-1 flex-col items-center gap-6 overflow-hidden px-4 py-8"
    >
      <BackgroundBlobs />
      <h1 className="relative z-10 font-heading text-2xl font-bold text-foreground">
        Users &amp; roles
      </h1>
      <div className="relative z-10 w-full max-w-2xl overflow-x-auto">
        <AdminUsersList users={users} />
      </div>
    </div>
  );
}
