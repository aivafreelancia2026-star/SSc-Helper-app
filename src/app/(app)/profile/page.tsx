import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/profile";
import { BackgroundBlobs } from "@/components/logo-mark";
import { RoleCodeForm } from "@/components/role-code-form";
import { PAGES } from "@/lib/pages";

const ROLE_LABEL: Record<string, string> = {
  founder: "Founder",
  developer: "Developer",
  teacher: "Teacher",
  student: "Student",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  const profile = await getProfile(supabase, user.id);

  return (
    <div
      data-page-id={PAGES.profile.id}
      className="relative flex flex-1 flex-col items-center gap-6 overflow-hidden px-4 py-8"
    >
      <BackgroundBlobs />

      <div className="relative z-10 w-full max-w-sm rounded-[32px] border border-white/60 bg-white/80 p-6 text-center shadow-[12px_12px_28px_rgba(79,70,229,0.12),-8px_-8px_20px_rgba(255,255,255,0.8)] backdrop-blur-sm">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          {profile?.fullName ?? "My profile"}
        </h1>
        <div className="mt-3 space-y-1 font-body text-sm text-foreground/60">
          {profile?.email && <p>{profile.email}</p>}
          {profile?.schoolName && <p>{profile.schoolName}</p>}
          {profile?.classGrade && <p>Class {profile.classGrade}</p>}
        </div>
        <span className="mt-4 inline-block rounded-full bg-primary/10 px-3 py-1 font-heading text-xs font-semibold text-primary">
          {ROLE_LABEL[profile?.role ?? "student"]}
        </span>
      </div>

      <div className="relative z-10 flex w-full flex-col items-center">
        <RoleCodeForm />
      </div>
    </div>
  );
}
