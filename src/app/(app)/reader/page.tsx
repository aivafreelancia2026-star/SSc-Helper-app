import { Suspense } from "react";
import { redirect } from "next/navigation";
import class6Science from "@/data/classes/class-6-science.json";
import { ChapterIndex } from "@/components/chapter-index";
import type { Chapter } from "@/lib/content";

export default async function ReaderPage({
  searchParams,
}: {
  searchParams: Promise<{ class?: string; subject?: string; chapter?: string }>;
}) {
  const params = await searchParams;
  const classGrade = Number(params.class) || 6;
  const subject = params.subject || "Science";
  const chapter = params.chapter;

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

  if (chapter) {
    const selectedChapter = chapters.find((c) => c.id === chapter);
    if (!selectedChapter) redirect("/reader");

    return (
      <div className="flex flex-1 flex-col items-center gap-6 overflow-hidden px-4 py-8">
        <div className="w-full max-w-2xl space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary">Unit {selectedChapter.unit}</p>
              <h1 className="font-heading text-2xl font-bold text-foreground">
                Chapter {selectedChapter.number}: {selectedChapter.title}
              </h1>
              <div className="flex flex-wrap gap-3 text-sm text-foreground/60">
                <span>Pages {selectedChapter.pageStart}–{selectedChapter.pageEnd}</span>
                {selectedChapter.periods && <span>{selectedChapter.periods} periods</span>}
                {selectedChapter.subArea && <span>{selectedChapter.subArea}</span>}
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1.5 font-heading text-sm font-bold text-primary">
              {selectedChapter.pageStart}/{totalPages}
            </span>
          </div>

          <div className="rounded-[24px] border border-white/60 bg-white/80 p-6 shadow-[6px_6px_14px_rgba(79,70,229,0.1),-4px_-4px_10px_rgba(255,255,255,0.7)]">
            {selectedChapter.status === "coming-soon" ? (
              <div className="text-center py-12">
                <p className="font-heading font-semibold text-foreground mb-2">Coming soon</p>
                <p className="font-body text-sm text-foreground/60">
                  Chapter content will be available soon Check back later
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="font-body text-sm text-foreground/60">
                  Chapter reader coming soon
                </p>
              </div>
            )}
          </div>

          <a
            href={`/reader?class=${classGrade}&subject=${subject}`}
            className="inline-block rounded-[12px] border-2 border-primary bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:opacity-90 transition-opacity"
          >
            Back to index
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center overflow-hidden py-8">
      <Suspense
        fallback={
          <div className="text-center text-foreground/60">Loading index</div>
        }
      >
        <ChapterIndex chapters={chapters} totalPages={totalPages} />
      </Suspense>
    </div>
  );
}
