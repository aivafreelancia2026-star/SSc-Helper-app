import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile, isProfileComplete } from "@/lib/profile";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getProfile(supabase, user.id);
  redirect(isProfileComplete(profile) ? "/dashboard" : "/onboarding");
}
