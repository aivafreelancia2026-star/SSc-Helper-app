import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import { LogoutButton } from "@/components/logout-button";
import type { Role } from "@/lib/profile";

export function AppHeader({
  name,
  classGrade,
  role,
}: {
  name: string | null;
  classGrade: number | null;
  role: Role;
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border/60 bg-white/90 px-4 py-2.5 backdrop-blur-sm sm:px-6">
      <Link href="/dashboard" className="flex cursor-pointer items-center gap-2">
        <LogoMark size="sm" />
        <span className="hidden font-heading text-lg font-bold text-foreground sm:inline">
          SSC Helper
        </span>
      </Link>

      <div className="flex items-center gap-3">
        {role === "founder" && (
          <Link
            href="/admin"
            className="cursor-pointer rounded-full bg-primary/10 px-3 py-1.5 font-heading text-xs font-semibold text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Admin
          </Link>
        )}
        <div className="text-right leading-tight">
          <p className="font-heading text-sm font-semibold text-foreground">{name}</p>
          {classGrade && (
            <p className="font-body text-xs text-foreground/50">Class {classGrade}</p>
          )}
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}
