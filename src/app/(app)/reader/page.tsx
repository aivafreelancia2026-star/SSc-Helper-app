import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ChapterIndex } from "@/components/chapter-index";
import { AutoRunController } from "@/components/auto-run-controller";
import { getPageContent } from "@/lib/reader-content-registry";
import { PageTurnTransition } from "@/components/reader/page-turn-transition";
import { PageBrowser } from "@/components/reader/page-browser";
import { ComingSoonCard } from "@/components/coming-soon-card";
import { loadClassContent, type Chapter } from "@/lib/content";

function findChapterForPage(chapters: Chapter[], page: number): Chapter | null {
  return (
    chapters.find(
      (c) => c.id !== "index" && c.id !== "intro" && page >= c.pageStart && page <= c.pageEnd,
    ) ?? null
  );
}

export default async function ReaderPage({
  searchParams,
}: {
  searchParams: Promise<{
    class?: string;
    subject?: string;
    page?: string;
    total?: string;
    browse?: string;
    [key: string]: string | undefined;
  }>;
}) {
  const params = await searchParams;
  const classGrade = Number(params.class) || 6;
  const subject = params.subject || "Science";

  const classContent = loadClassContent(classGrade, subject);

  if (!classContent) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <ComingSoonCard message={`Content for Class ${classGrade} ${subject} will be available soon.`} />
      </div>
    );
  }

  const chapters = classContent.chapters;
  const totalPages = classContent.totalPages;
  const introChapter = chapters.find((c) => c.id === "intro")!;
  const indexChapter = chapters.find((c) => c.id === "index")!;

  // Browsing all pages doesn't need a specific page selected, so this check
  // happens before the "page is required" redirect below.
  if (params.browse === "1") {
    return (
      <div className="relative flex flex-1 flex-col items-center overflow-hidden py-8">
        <PageBrowser
          chapters={chapters}
          totalPages={totalPages}
          classGrade={classGrade}
          subject={subject}
          indexPageStart={indexChapter.pageStart}
        />
      </div>
    );
  }

  // Every /reader visit for a real subject always carries a page number —
  // the index (page 9) is page-turnable too, not a separate mode, so the
  // nav bar's "are we in a book" check (searchParams.has("page")) is true
  // everywhere inside this subject, not just once a specific chapter is open.
  const requestedPage = Number(params.page);
  const page =
    Number.isInteger(requestedPage) && requestedPage >= 1
      ? Math.min(requestedPage, totalPages)
      : null;

  if (!page) {
    redirect(
      `/reader?class=${classGrade}&subject=${subject}&page=${indexChapter.pageStart}&total=${totalPages}&index=${indexChapter.pageStart}`,
    );
  }

  // A link carrying a stale `total` (e.g. bookmarked, or opened before a
  // chapter-length fix like this one) would otherwise keep showing the old
  // total forever, since it's never recomputed once it's in the URL.
  // Preserve every other param (e.g. ?reveal=1) exactly as-is.
  if (params.total !== String(totalPages)) {
    const rest = new URLSearchParams(
      Object.entries(params).filter((entry): entry is [string, string] => entry[1] !== undefined),
    );
    rest.set("page", String(page));
    rest.set("total", String(totalPages));
    rest.set("index", String(indexChapter.pageStart));
    redirect(`/reader?${rest.toString()}`);
  }

  if (page === indexChapter.pageStart) {
    return (
      <div className="relative flex flex-1 flex-col items-center overflow-hidden py-8">
        <AutoRunController totalPages={totalPages} />
        <PageTurnTransition page={page}>
          <Suspense fallback={<div className="text-center text-foreground/60">Loading index</div>}>
            <ChapterIndex
              chapters={chapters}
              totalPages={totalPages}
              classGrade={classGrade}
              subject={subject}
            />
          </Suspense>
        </PageTurnTransition>
      </div>
    );
  }

  const selectedChapter =
    (introChapter && page <= introChapter.pageEnd) ? null : findChapterForPage(chapters, page);

  const PageContent = selectedChapter
    ? getPageContent(classGrade, subject, selectedChapter.id, page - selectedChapter.pageStart + 1)
    : null;

  return (
    <div className="relative flex flex-1 flex-col items-center gap-6 overflow-hidden px-4 py-8">
      <AutoRunController totalPages={totalPages} />
      <PageTurnTransition page={page}>
        <div className="w-full max-w-2xl space-y-4">
          <div className="space-y-2">
            {selectedChapter ? (
              <>
                <p className="text-sm font-semibold text-primary">Unit {selectedChapter.unit}</p>
                <h1 className="font-heading text-2xl font-bold text-foreground">
                  Chapter {selectedChapter.number}: {selectedChapter.title}
                </h1>
                <div className="flex flex-wrap gap-3 text-sm text-foreground/60">
                  <span>
                    Pages {selectedChapter.pageStart}–{selectedChapter.pageEnd}
                  </span>
                  {selectedChapter.periods && <span>{selectedChapter.periods} periods</span>}
                  {selectedChapter.subArea && <span>{selectedChapter.subArea}</span>}
                  {selectedChapter.author && <span>{selectedChapter.author}</span>}
                  {selectedChapter.genre && <span>{selectedChapter.genre}</span>}
                </div>
              </>
            ) : (
              <h1 className="font-heading text-2xl font-bold text-foreground">Front matter</h1>
            )}
          </div>

          {PageContent ? (
            <div className="rounded-[24px] border border-white/60 bg-white/80 p-6 shadow-[6px_6px_14px_rgba(79,70,229,0.1),-4px_-4px_10px_rgba(255,255,255,0.7)]">
              <PageContent />
            </div>
          ) : (
            <ComingSoonCard message="Page content will be available soon — check back later." />
          )}

          <a
            href={`/reader?class=${classGrade}&subject=${subject}&page=${indexChapter.pageStart}&total=${totalPages}&index=${indexChapter.pageStart}`}
            className="inline-block rounded-[12px] border-2 border-primary bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:opacity-90 transition-opacity"
          >
            Back to index
          </a>
        </div>
      </PageTurnTransition>
    </div>
  );
}
