"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Role } from "@/lib/profile";
import { useScore } from "@/components/score-provider";
import { EyeIcon, EyeSlashIcon } from "@/components/icons";

// A bar that only appears while inside a book (reader with a page open) —
// same "in book" detection as the top nav bar's arrow/swipe repurposing and
// the class-selector's page badge. Shows the page number (tap to open the
// page browser/search) and the student's running score, plus a "Reveal
// answers" toggle for Founder/Developer/Teacher (not Student) on the far
// right that flips ?reveal=1 in the URL — FillInTable reads that same flag
// to show each gradable cell's correct answer alongside whatever's typed,
// without overwriting it.
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

  function openPageBrowser() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("browse", "1");
    router.push(`${pathname}?${params.toString()}`);
  }

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
    <div className="sticky top-[52px] z-10 mx-3 my-2.5 flex items-center justify-between gap-3 rounded-[28px] bg-primary/5 px-4 py-3 sm:px-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={openPageBrowser}
          aria-label="Browse and search all pages"
          title="Browse and search all pages"
          className="flex w-20 shrink-0 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl bg-gradient-to-br from-primary to-primary/80 py-2 font-heading text-on-primary shadow-[0_2px_8px_rgba(79,70,229,0.3)] transition-opacity hover:opacity-90"
        >
          <span className="text-[10px] font-semibold opacity-90">Page:</span>
          <span className="text-sm font-bold">
            {page}
            {total ? `/${total}` : ""}
          </span>
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

      {canReveal && (
        <button
          type="button"
          onClick={toggleReveal}
          aria-pressed={isRevealed}
          aria-label={isRevealed ? "Hide answers" : "Reveal answers"}
          title={isRevealed ? "Hide answers" : "Reveal answers"}
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-on-primary shadow-[0_2px_6px_rgba(79,70,229,0.35)] transition-opacity hover:opacity-90"
        >
          {isRevealed ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
}
