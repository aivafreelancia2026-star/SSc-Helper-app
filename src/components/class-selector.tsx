"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { CLASSES, useClassGrade } from "@/lib/use-class-grade";

// Selection lives in the URL (?class=N), not local state, so pages outside
// this component (e.g. the dashboard, a server component in the same route
// tree) can read the selected class via their own `searchParams` prop.
export function ClassSelector({ defaultClass }: { defaultClass: number | null }) {
  const { selected, setClass: selectClass } = useClassGrade(defaultClass);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inBook = pathname === "/reader" && searchParams.has("page");
  const page = searchParams.get("page");
  const total = searchParams.get("total");

  return (
    <div className="flex items-center gap-2 overflow-x-auto border-b border-border/60 bg-white/60 px-4 py-3 sm:justify-center sm:px-6">
      {CLASSES.map((grade) => (
        <button
          key={grade}
          type="button"
          onClick={() => selectClass(grade)}
          aria-pressed={selected === grade}
          className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 font-heading text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
            selected === grade
              ? "bg-primary text-on-primary"
              : "bg-muted text-foreground/60 hover:bg-border/60"
          }`}
        >
          Class {grade}
        </button>
      ))}

      {inBook && page && total && (
        <span className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-center font-heading text-[10px] font-bold leading-tight text-on-primary">
          {page}/{total}
        </span>
      )}
    </div>
  );
}
