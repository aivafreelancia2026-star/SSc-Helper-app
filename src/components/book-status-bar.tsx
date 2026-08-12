"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";

// A bar that only appears while inside a book (reader with a page open) —
// same "in book" detection as the top nav bar's arrow/swipe repurposing and
// the class-selector's page badge. Shows the page number (tap to open the
// page browser/search) and the student's running score. The reveal-answers
// toggle lives in the bottom nav bar, not here.
export function BookStatusBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { score } = useScore();
  const inBook = pathname === "/reader" && searchParams.has("page");

  if (!inBook) return null;

  const page = searchParams.get("page");
  const total = searchParams.get("total");

  function openPageBrowser() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("browse", "1");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="sticky top-14 z-10 flex items-center justify-between gap-3 border-b border-border/60 bg-white/90 px-4 py-2 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={openPageBrowser}
          aria-label="Browse and search all pages"
          title="Browse and search all pages"
          className="cursor-pointer rounded-full bg-gradient-to-br from-primary to-primary/80 px-3 py-1 font-heading text-xs font-bold text-on-primary shadow-[0_2px_8px_rgba(79,70,229,0.3)] transition-opacity hover:opacity-90"
        >
          Page {page}
          {total ? `/${total}` : ""}
        </button>
        <span
          className={`rounded-full px-3 py-1 font-heading text-xs font-bold ${
            score < 0
              ? "bg-destructive/15 text-destructive"
              : score > 0
                ? "bg-green-100 text-green-700"
                : "bg-accent/15 text-accent"
          }`}
        >
          ⭐ {Math.abs(score)}
        </span>
      </div>
    </div>
  );
}
