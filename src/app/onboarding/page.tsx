import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile, isProfileComplete } from "@/lib/profile";
import { BackgroundBlobs, LogoMark } from "@/components/logo-mark";
import { OnboardingForm } from "@/components/onboarding-form";
import { PAGES } from "@/lib/pages";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getProfile(supabase, user.id);
  if (isProfileComplete(profile)) {
    redirect("/dashboard");
  }

  const googleName =
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    "";

  return (
    <div
      data-page-id={PAGES.onboarding.id}
      className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-12"
    >
      <BackgroundBlobs />

      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 text-center">
          <LogoMark size="lg" />
          <h1 className="mt-4 font-heading text-3xl font-bold text-foreground">
            Tell us about you
          </h1>
          <p className="mt-1 font-body text-base text-foreground/60">
            Just a few details to personalize SSC Helper
          </p>
        </div>

        <OnboardingForm
          userId={user.id}
          email={user.email ?? null}
          defaultName={profile?.fullName ?? googleName}
        />
      </div>
    </div>
  );
}
