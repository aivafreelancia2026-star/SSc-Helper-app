"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Role } from "@/lib/profile";
import { useScore } from "@/components/score-provider";

// A bar that only appears while inside a book (reader with a page open) —
// same "in book" detection as the top nav bar's arrow/swipe repurposing and
// the class-selector's page badge. Shows the page number and the student's
// running score, plus a "Reveal answers" toggle for Founder/Developer/
// Teacher (not Student) that flips ?reveal=1 in the URL — FillInTable reads
// that same flag to show each gradable cell's correct answer alongside
// whatever's typed, without overwriting it.
export function BookStatusBar({ role }: { role: Role }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { score } = useScore();
  const inBook = pathname === "/reader" && searchParams.has("page");
  const canReveal = role === "founder" || role === "developer" || role === "teacher";

  if (!inBook) return null;

  const page = searchParams.get("page");
  const total = searchParams.get("total");
  const isRevealed = searchParams.get("reveal") === "1";

  function toggleReveal() {
    const params = new URLSearchParams(searchParams.toString());
    if (isRevealed) {
      params.delete("reveal");
    } else {
      params.set("reveal", "1");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="sticky top-14 z-10 flex items-center justify-between gap-3 border-b border-border/60 bg-white/90 px-4 py-2 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-gradient-to-br from-primary to-primary/80 px-3 py-1 font-heading text-xs font-bold text-on-primary shadow-[0_2px_8px_rgba(79,70,229,0.3)]">
          Page {page}
          {total ? `/${total}` : ""}
        </span>
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

      {canReveal && (
        <button
          type="button"
          onClick={toggleReveal}
          aria-pressed={isRevealed}
          aria-label={isRevealed ? "Hide answers" : "Reveal answers"}
          title={isRevealed ? "Hide answers" : "Reveal answers"}
          className={`flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 text-base transition-colors ${
            isRevealed
              ? "border-primary bg-primary"
              : "border-primary bg-transparent hover:bg-primary/10"
          }`}
        >
          {isRevealed ? "🙈" : "👁️"}
        </button>
      )}
    </div>
  );
}
