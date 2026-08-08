"use client";

import { useState } from "react";
import type { Chapter } from "@/lib/content";

export function ChapterIndex({ chapters }: { chapters: Chapter[] }) {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  const indexChapter = chapters.find((c) => c.id === "index");
  if (!indexChapter || !("indexData" in indexChapter)) {
    return <div className="text-center text-foreground/60">Index not available</div>;
  }

  const indexData = (indexChapter as any).indexData as Array<{
    unit: string;
    chapterNo: number;
    title: string;
    pageNo: number;
    periods: number | null;
    subArea: string | null;
  }>;

  const units = [...new Set(indexData.map((item) => item.unit))];
  const getUnitsData = (unit: string) => indexData.filter((item) => item.unit === unit);

  return (
    <div className="w-full space-y-6 px-4 py-8">
      <div className="text-center">
        <h1 className="font-heading text-2xl font-bold text-foreground">Index</h1>
        <p className="mt-2 font-body text-sm text-foreground/60">Grade 6 Science - 185 pages</p>
      </div>

      <div className="space-y-4">
        {units.map((unit) => {
          const unitData = getUnitsData(unit);
          const isOpen = selectedUnit === unit;

          return (
            <div key={unit} className="overflow-hidden rounded-[24px] border border-white/60 bg-white/80 shadow-[6px_6px_14px_rgba(79,70,229,0.1),-4px_-4px_10px_rgba(255,255,255,0.7)]">
              <button
                onClick={() => setSelectedUnit(isOpen ? null : unit)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-primary/5 transition-colors"
              >
                <h2 className="font-heading font-semibold text-foreground">Unit {unit}</h2>
                <span className="text-sm font-semibold text-foreground/60">{unitData.length} chapters</span>
              </button>

              {isOpen && (
                <div className="border-t border-white/60 divide-y divide-white/60">
                  {unitData.map((item) => (
                    <a
                      key={`${item.unit}-${item.chapterNo}`}
                      href={`#chapter-${item.chapterNo}`}
                      className="block px-6 py-3 hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-heading font-semibold text-foreground text-sm">
                            Chapter {item.chapterNo}: {item.title}
                          </p>
                          <div className="mt-1 flex flex-wrap gap-2 text-xs">
                            {item.subArea && (
                              <span className="inline-block rounded-full bg-primary/10 px-2 py-1 text-primary font-semibold">
                                {item.subArea}
                              </span>
                            )}
                            <span className="text-foreground/60">Page {item.pageNo}</span>
                            {item.periods && (
                              <span className="text-foreground/60">{item.periods} periods</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-[24px] border border-white/60 bg-white/80 p-6 shadow-[6px_6px_14px_rgba(79,70,229,0.1),-4px_-4px_10px_rgba(255,255,255,0.7)]">
        <h3 className="font-heading font-semibold text-foreground mb-3">Legend</h3>
        <div className="space-y-2 text-sm font-body text-foreground/70">
          <p>
            <span className="inline-block rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-semibold mr-2">
              Physics
            </span>
            Physical phenomena and energy
          </p>
          <p>
            <span className="inline-block rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold mr-2">
              Chemistry
            </span>
            Materials and substances
          </p>
          <p>
            <span className="inline-block rounded-full bg-purple-100 text-purple-700 px-2 py-0.5 text-xs font-semibold mr-2">
              Biology
            </span>
            Living organisms and life
          </p>
        </div>
      </div>
    </div>
  );
}
