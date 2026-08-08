import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/profile";
import { getSubjectsForClass } from "@/lib/subjects";
import { BackgroundBlobs } from "@/components/logo-mark";
import { SubjectsGrid } from "@/components/subjects-grid";
import { PAGES } from "@/lib/pages";

const VALID_CLASSES = [6, 7, 8, 9, 10];

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The (app) layout already guarantees a signed-in user with a complete
  // profile before this renders; getProfile is cache()-deduped so this
  // doesn't cost a second query.
  if (!user) return null;
  const profile = await getProfile(supabase, user.id);

  const { class: classParam } = await searchParams;
  const requestedClass = Number(classParam);
  const selectedClass = VALID_CLASSES.includes(requestedClass)
    ? requestedClass
    : (profile?.classGrade ?? 6);

  const subjects = getSubjectsForClass(selectedClass);

  return (
    <div
      data-page-id={PAGES.dashboard.id}
      className="relative flex flex-1 flex-col items-center gap-6 overflow-hidden px-4 py-8"
    >
      <BackgroundBlobs />

      <div className="relative z-10 w-full max-w-sm rounded-[32px] border border-white/60 bg-white/80 p-6 text-center shadow-[12px_12px_28px_rgba(79,70,229,0.12),-8px_-8px_20px_rgba(255,255,255,0.8)] backdrop-blur-sm">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Welcome{profile?.fullName ? `, ${profile.fullName}` : ""}
        </h1>
        <p className="mt-2 font-body text-sm text-foreground/60">
          Class {profile?.classGrade} · {profile?.schoolName}
        </p>
      </div>

      <div className="relative z-10 flex w-full flex-col items-center gap-3">
        <h2 className="font-heading text-lg font-bold text-foreground">
          Class {selectedClass} subjects
        </h2>
        {subjects ? (
          <SubjectsGrid
            subjects={subjects}
            classGrade={selectedClass}
            role={profile?.role ?? "student"}
          />
        ) : (
          <p className="font-body text-sm text-foreground/60">
            Class {selectedClass} content is coming soon.
          </p>
        )}
      </div>
    </div>
  );
}
