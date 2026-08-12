"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { LogoMark } from "@/components/logo-mark";
import { ChevronLeftIcon } from "@/components/icons";
import type { Role } from "@/lib/profile";

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

export function AppHeader({
  name,
  classGrade,
  role,
}: {
  name: string | null;
  classGrade: number | null;
  role: Role;
}) {
  const backTarget = useBackTarget();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border/60 bg-white/90 px-4 py-2.5 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2">
        {backTarget && (
          <Link
            href={backTarget}
            aria-label="Back"
            className="flex cursor-pointer items-center justify-center rounded-full p-1.5 text-foreground/70 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </Link>
        )}

        <Link href="/dashboard" className="flex cursor-pointer items-center gap-2">
          <LogoMark size="sm" />
        </Link>

        <div className="leading-tight">
          <p className="font-heading text-sm font-semibold text-foreground">{name}</p>
          {classGrade && (
            <p className="font-body text-xs text-foreground/50">Class {classGrade}</p>
          )}
        </div>
      </div>

      {role === "founder" && (
        <Link
          href="/admin"
          className="shrink-0 cursor-pointer rounded-full bg-primary/10 px-3 py-1.5 font-heading text-xs font-semibold text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          Admin
        </Link>
      )}
    </header>
  );
}
