"use client";

import { usePathname, useSearchParams } from "next/navigation";

// A bar that only appears while inside a book (reader with a page open) —
// same "in book" detection as the top nav bar's arrow/swipe repurposing and
// the class-selector's page badge. Starts with just the page number; score
// will be added here once this placement is confirmed.
export function BookStatusBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inBook = pathname === "/reader" && searchParams.has("page");

  if (!inBook) return null;

  const page = searchParams.get("page");
  const total = searchParams.get("total");

  return (
    <div className="flex items-center justify-center border-b border-border/60 bg-white/60 px-4 py-2 sm:px-6">
      <span className="font-heading text-xs font-semibold text-foreground/70">
        Page {page}
        {total ? `/${total}` : ""}
      </span>
    </div>
  );
}
