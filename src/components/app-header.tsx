"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeftIcon } from "@/components/icons";

// Drives the back arrow: reader has a real drill-down hierarchy (subject
// selection -> chapter index -> chapter), everything else (Admin, Profile)
// is a sibling destination reached from the dashboard, so "back" from there
// just returns to it. Dashboard itself is the root — no back target.
function useBackTarget(): string | null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pathname === "/dashboard") return null;

  if (pathname === "/reader") {
    const classParam = searchParams.get("class");
    const subject = searchParams.get("subject");
    const page = searchParams.get("page");
    const indexPage = searchParams.get("index");

    // The index page is itself page-turnable (carries ?page= too), so
    // "page present" alone can't distinguish "on the index" from "on a
    // real page" anymore — compare against the index's own page number.
    if (page && indexPage && page !== indexPage) {
      const total = searchParams.get("total");
      return `/reader?class=${classParam}&subject=${subject}&page=${indexPage}&total=${total}&index=${indexPage}`;
    }
    return classParam ? `/dashboard?class=${classParam}` : "/dashboard";
  }

  return "/dashboard";
}

// Identity (avatar/name/class) and the Admin shortcut live on the My
// profile page now, not here — this header is just back-navigation, kept
// minimal (and collapses to nothing when there's no back target, e.g. on
// the dashboard) to save vertical space on every screen.
export function AppHeader() {
  const backTarget = useBackTarget();

  if (!backTarget) return null;

  return (
    <header className="sticky top-0 z-20 flex items-center border-b border-border/60 bg-white/90 px-4 py-2 backdrop-blur-sm sm:px-6">
      <Link
        href={backTarget}
        aria-label="Back"
        className="flex cursor-pointer items-center justify-center rounded-full p-1.5 text-foreground/70 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </Link>
    </header>
  );
}
