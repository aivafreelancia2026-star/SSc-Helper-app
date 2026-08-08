"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const AUTO_RUN_INTERVAL_MS = 2000;

// Founder/Developer QA tool: walks through every page of a book one by one
// on a timer, so a reviewer can watch content render without manually
// clicking next on each page. Driven entirely by URL state (?autorun=1) so
// it survives each page's own navigation like everything else in the reader.
export function AutoRunController({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isAutoRunning = searchParams.get("autorun") === "1";
  const page = Number(searchParams.get("page")) || 1;
  const reachedEnd = page >= totalPages;

  useEffect(() => {
    if (!isAutoRunning || reachedEnd) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page + 1));
      router.push(`${pathname}?${params.toString()}`);
    }, AUTO_RUN_INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [isAutoRunning, reachedEnd, page, pathname, router, searchParams]);

  if (!isAutoRunning) return null;

  function stop() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("autorun");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="fixed bottom-24 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full bg-foreground px-4 py-2.5 shadow-[0_6px_16px_rgba(0,0,0,0.25)]">
      <span className="font-heading text-xs font-semibold text-white">
        {reachedEnd ? "Auto-run finished" : "Auto-running…"}
      </span>
      <button
        type="button"
        onClick={stop}
        className="cursor-pointer rounded-full bg-white px-3 py-1 font-heading text-xs font-bold text-foreground transition-opacity hover:opacity-90"
      >
        Stop
      </button>
    </div>
  );
}
