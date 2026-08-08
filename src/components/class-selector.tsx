"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CLASSES = [6, 7, 8, 9, 10];

// Selection lives in the URL (?class=N), not local state, so pages outside
// this component (e.g. the dashboard, a server component in the same route
// tree) can read the selected class via their own `searchParams` prop.
export function ClassSelector({ defaultClass }: { defaultClass: number | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fromUrl = Number(searchParams.get("class"));
  const selected = CLASSES.includes(fromUrl) ? fromUrl : (defaultClass ?? CLASSES[0]);

  function selectClass(grade: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("class", String(grade));
    router.push(`${pathname}?${params.toString()}`);
  }

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
    </div>
  );
}
