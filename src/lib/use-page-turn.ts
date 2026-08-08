"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Page position lives in the URL (?page=N&total=M), same pattern as
// useClassGrade — lets the nav bar's arrows/swipe turn pages while inside a
// book instead of switching grades. `total` rides along on the link into a
// page (see chapter-index.tsx) since the nav bar has no access to content
// data to look it up itself.
export function usePageTurn() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page"));
  const total = Number(searchParams.get("total")) || null;

  function setPage(next: number) {
    const clamped = total ? Math.min(Math.max(1, next), total) : Math.max(1, next);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(clamped));
    router.push(`${pathname}?${params.toString()}`);
  }

  return {
    page,
    goPrev: () => setPage(page - 1),
    goNext: () => setPage(page + 1),
    isFirst: page <= 1,
    isLast: total !== null && page >= total,
  };
}
