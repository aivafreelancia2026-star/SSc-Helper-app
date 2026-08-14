"use client";

import { useState } from "react";
import { CLASSES, useClassGrade } from "@/lib/use-class-grade";

// Selection lives in the URL (?class=N), not local state, so pages outside
// this component (e.g. the dashboard, a server component in the same route
// tree) can read the selected class via their own `searchParams` prop.
export function ClassSelector({ defaultClass }: { defaultClass: number | null }) {
  const { selected, setClass: selectClass, isPending } = useClassGrade(defaultClass);
  // `selected` only reflects the tapped class once the server round-trip
  // behind it resolves (see use-class-grade.ts) — tracking the tapped grade
  // separately lets the pill highlight instantly instead of the tap
  // appearing to do nothing while that request is in flight.
  const [pendingGrade, setPendingGrade] = useState<number | null>(null);
  const displaySelected = isPending && pendingGrade !== null ? pendingGrade : selected;

  function handleSelect(grade: number) {
    if (grade === selected) return;
    setPendingGrade(grade);
    selectClass(grade);
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto border-b border-border/60 bg-white/60 px-4 py-3 sm:justify-center sm:px-6">
      {CLASSES.map((grade) => (
        <button
          key={grade}
          type="button"
          onClick={() => handleSelect(grade)}
          aria-pressed={displaySelected === grade}
          className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 font-heading text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
            displaySelected === grade
              ? "bg-primary text-on-primary"
              : "bg-muted text-foreground/60 hover:bg-border/60"
          } ${isPending && pendingGrade === grade ? "animate-pulse" : ""}`}
        >
          Class {grade}
        </button>
      ))}
    </div>
  );
}
