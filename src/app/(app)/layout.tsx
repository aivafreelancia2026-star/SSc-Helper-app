import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { getProfile, isProfileComplete } from "@/lib/profile";
import { AppHeader } from "@/components/app-header";
import { NavBar } from "@/components/nav-bar";
import { ClassSelector } from "@/components/class-selector";
import { BottomNav } from "@/components/bottom-nav";

// Shared shell for every page behind login (dashboard and beyond). Enforces
// auth + a completed profile once here, so individual pages don't each need
// their own guard, and renders the persistent header (name/class/logout).
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getProfile(supabase, user.id);
  if (!isProfileComplete(profile)) {
    redirect("/onboarding");
  }

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader
        name={profile?.fullName ?? null}
        classGrade={profile?.classGrade ?? null}
        role={profile?.role ?? "student"}
      />
      <Suspense fallback={null}>
        <NavBar defaultClass={profile?.classGrade ?? null} />
      </Suspense>
      <Suspense fallback={null}>
        <ClassSelector defaultClass={profile?.classGrade ?? null} />
      </Suspense>
      <main className="flex flex-1 flex-col pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
