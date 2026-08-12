"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Chapter } from "@/lib/content";
import { getPageKeywords } from "@/lib/reader-search-index";

type PageEntry = {
  page: number;
  sectionId: string;
  sectionLabel: string;
  unit: string | null;
  subArea: Chapter["subArea"];
  keywords: string;
};

function buildPageEntries(
  chapters: Chapter[],
  totalPages: number,
  classGrade: number,
  subject: string,
): PageEntry[] {
  const entries: PageEntry[] = [];
  for (let page = 1; page <= totalPages; page++) {
    const chapter = chapters.find((c) => page >= c.pageStart && page <= c.pageEnd);
    if (!chapter) continue;

    const sectionLabel =
      chapter.id === "intro"
        ? "Front matter"
        : chapter.id === "index"
          ? "Index"
          : `Chapter ${chapter.number}: ${chapter.title}`;

    entries.push({
      page,
      sectionId: chapter.id,
      sectionLabel,
      unit: chapter.id === "intro" || chapter.id === "index" ? null : chapter.unit,
      subArea: chapter.subArea,
      keywords: getPageKeywords(`${classGrade}-${subject}-${chapter.id}`, page - chapter.pageStart + 1),
    });
  }
  return entries;
}

export function PageBrowser({
  chapters,
  totalPages,
  classGrade,
  subject,
  indexPageStart,
}: {
  chapters: Chapter[];
  totalPages: number;
  classGrade: number;
  subject: string;
  indexPageStart: number;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [openSection, setOpenSection] = useState<string | null>(null);

  const entries = useMemo(
    () => buildPageEntries(chapters, totalPages, classGrade, subject),
    [chapters, totalPages, classGrade, subject],
  );

  const normalizedQuery = query.trim().toLowerCase();
  const searchResults = useMemo(() => {
    if (!normalizedQuery) return null;
    return entries.filter((entry) => {
      if (String(entry.page).startsWith(normalizedQuery)) return true;
      const haystack = `${entry.sectionLabel} ${entry.unit ?? ""} ${entry.subArea ?? ""} ${entry.keywords}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [entries, normalizedQuery]);

  function goToPage(page: number) {
    router.push(
      `/reader?class=${classGrade}&subject=${subject}&page=${page}&total=${totalPages}&index=${indexPageStart}`,
    );
  }

  const sections = useMemo(() => {
    const seen = new Set<string>();
    const order: { id: string; label: string; pages: PageEntry[] }[] = [];
    for (const entry of entries) {
      if (!seen.has(entry.sectionId)) {
        seen.add(entry.sectionId);
        order.push({ id: entry.sectionId, label: entry.sectionLabel, pages: [] });
      }
      order.find((s) => s.id === entry.sectionId)!.pages.push(entry);
    }
    return order;
  }, [entries]);

  return (
    <div className="w-full max-w-2xl space-y-6 px-4 py-8">
      <div className="text-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-2 cursor-pointer font-body text-sm font-semibold text-primary transition-opacity hover:opacity-70"
        >
          ← Back
        </button>
        <h1 className="font-heading text-2xl font-bold text-foreground">All pages</h1>
        <p className="mt-2 font-body text-sm text-foreground/60">
          Search by page number or topic, or browse by chapter
        </p>
      </div>

      <input
        type="text"
        inputMode="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search page number or text…"
        className="w-full rounded-[20px] border-2 border-border bg-white/70 px-4 py-3 font-body text-base text-foreground placeholder:text-foreground/40 shadow-[inset_3px_3px_6px_rgba(79,70,229,0.08),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] transition-colors focus:border-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
      />

      {searchResults ? (
        <div className="space-y-2">
          {searchResults.length === 0 ? (
            <p className="text-center font-body text-sm text-foreground/60">
              No pages match &quot;{query}&quot;.
            </p>
          ) : (
            searchResults.map((entry) => (
              <button
                key={entry.page}
                type="button"
                onClick={() => goToPage(entry.page)}
                className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-[16px] border border-white/60 bg-white/80 px-4 py-3 text-left transition-colors hover:bg-primary/5"
              >
                <div className="min-w-0">
                  <p className="font-heading text-sm font-semibold text-foreground">Page {entry.page}</p>
                  <p className="truncate font-body text-xs text-foreground/60">{entry.sectionLabel}</p>
                </div>
                {entry.subArea && (
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                    {entry.subArea}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((section) => {
            const isOpen = openSection === section.id;
            return (
              <div
                key={section.id}
                className="overflow-hidden rounded-[24px] border border-white/60 bg-white/80 shadow-[6px_6px_14px_rgba(79,70,229,0.1),-4px_-4px_10px_rgba(255,255,255,0.7)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenSection(isOpen ? null : section.id)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-primary/5"
                >
                  <h2 className="font-heading font-semibold text-foreground">{section.label}</h2>
                  <span className="text-sm font-semibold text-foreground/60">
                    {section.pages.length} pages
                  </span>
                </button>

                {isOpen && (
                  <div className="grid grid-cols-5 gap-2 border-t border-white/60 p-4 sm:grid-cols-8">
                    {section.pages.map((entry) => (
                      <button
                        key={entry.page}
                        type="button"
                        onClick={() => goToPage(entry.page)}
                        className="cursor-pointer rounded-[12px] border border-border bg-white py-2 text-center font-heading text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary/10"
                      >
                        {entry.page}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
