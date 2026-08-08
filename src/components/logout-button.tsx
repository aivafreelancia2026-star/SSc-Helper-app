"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="cursor-pointer rounded-[20px] border-2 border-primary bg-white px-3.5 py-2 font-heading text-xs font-bold text-primary shadow-[0_2px_0_var(--color-primary)] transition-all duration-150 ease-out hover:bg-primary/5 active:translate-y-1 active:shadow-[0_1px_0_var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
    >
      {isLoading ? "Logging out..." : "Log out"}
    </button>
  );
}
