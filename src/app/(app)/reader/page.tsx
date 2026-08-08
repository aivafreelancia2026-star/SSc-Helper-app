import { redirect } from "next/navigation";
import { Suspense } from "react";
import class6Science from "@/data/classes/C6-Science.json";
import { ChapterIndex } from "@/components/chapter-index";
import { PageBadge } from "@/components/page-badge";
import type { Chapter } from "@/lib/content";

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
  searchParams: Promise<{ class?: string; subject?: string; page?: string }>;
}) {
  const params = await searchParams;
  const classGrade = Number(params.class) || 6;
  const subject = params.subject || "Science";

  if (classGrade !== 6 || subject !== "Science") {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="text-center">
          <h1 className="font-heading text-xl font-bold text-foreground">Coming soon</h1>
          <p className="mt-2 font-body text-sm text-foreground/60">
            Content for Class {classGrade} {subject} will be available soon
          </p>
        </div>
      </div>
    );
  }

  const chapters = (class6Science as any).chapters as Chapter[];
  const totalPages = (class6Science as any).totalPages as number;
  const introChapter = chapters.find((c) => c.id === "intro")!;
  const indexChapter = chapters.find((c) => c.id === "index")!;

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

  if (page === indexChapter.pageStart) {
    return (
      <div className="flex flex-1 flex-col items-center overflow-hidden py-8">
        <PageBadge page={page} totalPages={totalPages} />
        <Suspense fallback={<div className="text-center text-foreground/60">Loading index</div>}>
          <ChapterIndex
            chapters={chapters}
            totalPages={totalPages}
            classGrade={classGrade}
            subject={subject}
          />
        </Suspense>
      </div>
    );
  }

  const selectedChapter =
    page <= introChapter.pageEnd ? null : findChapterForPage(chapters, page);

  return (
    <div className="flex flex-1 flex-col items-center gap-6 overflow-hidden px-4 py-8">
      <PageBadge page={page} totalPages={totalPages} />
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
              </div>
            </>
          ) : (
            <h1 className="font-heading text-2xl font-bold text-foreground">Front matter</h1>
          )}
        </div>

        <div className="rounded-[24px] border border-white/60 bg-white/80 p-6 shadow-[6px_6px_14px_rgba(79,70,229,0.1),-4px_-4px_10px_rgba(255,255,255,0.7)]">
          <div className="text-center py-12">
            <p className="font-heading font-semibold text-foreground mb-2">Coming soon</p>
            <p className="font-body text-sm text-foreground/60">
              Page content will be available soon — check back later.
            </p>
          </div>
        </div>

        <a
          href={`/reader?class=${classGrade}&subject=${subject}&page=${indexChapter.pageStart}&total=${totalPages}&index=${indexChapter.pageStart}`}
          className="inline-block rounded-[12px] border-2 border-primary bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:opacity-90 transition-opacity"
        >
          Back to index
        </a>
      </div>
    </div>
  );
}
