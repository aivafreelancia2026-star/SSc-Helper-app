"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const CLASSES = [6, 7, 8, 9, 10];

// Selection lives in the URL (?class=N), not local state — see
// class-selector.tsx's original comment. Shared by every UI that lets the
// user change the selected grade (pill row, arrow buttons, swipe).
//
// The dashboard is a Server Component, so every class switch re-runs its
// auth + profile lookup on the server even though only a local JSON lookup
// actually needs to change — that round-trip can't be skipped without a
// bigger data-fetching rework, but wrapping the navigation in a transition
// at least lets callers (see class-selector.tsx) show instant feedback via
// `isPending` instead of the tap appearing to do nothing until it resolves.
export function useClassGrade(defaultClass: number | null) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const fromUrl = Number(searchParams.get("class"));
  const selected = CLASSES.includes(fromUrl) ? fromUrl : (defaultClass ?? CLASSES[0]);

  function setClass(grade: number) {
    if (!CLASSES.includes(grade)) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("class", String(grade));
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  const index = CLASSES.indexOf(selected);

  return {
    selected,
    setClass,
    isPending,
    goPrev: () => setClass(CLASSES[Math.max(0, index - 1)]),
    goNext: () => setClass(CLASSES[Math.min(CLASSES.length - 1, index + 1)]),
    isFirst: index <= 0,
    isLast: index >= CLASSES.length - 1,
  };
}
