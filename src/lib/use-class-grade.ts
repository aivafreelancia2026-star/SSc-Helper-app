"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const CLASSES = [6, 7, 8, 9, 10];

// Selection lives in the URL (?class=N), not local state — see
// class-selector.tsx's original comment. Shared by every UI that lets the
// user change the selected grade (pill row, arrow buttons, swipe).
export function useClassGrade(defaultClass: number | null) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fromUrl = Number(searchParams.get("class"));
  const selected = CLASSES.includes(fromUrl) ? fromUrl : (defaultClass ?? CLASSES[0]);

  function setClass(grade: number) {
    if (!CLASSES.includes(grade)) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("class", String(grade));
    router.push(`${pathname}?${params.toString()}`);
  }

  const index = CLASSES.indexOf(selected);

  return {
    selected,
    setClass,
    goPrev: () => setClass(CLASSES[Math.max(0, index - 1)]),
    goNext: () => setClass(CLASSES[Math.min(CLASSES.length - 1, index + 1)]),
    isFirst: index <= 0,
    isLast: index >= CLASSES.length - 1,
  };
}
