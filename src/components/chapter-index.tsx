"use client";

import { useState } from "react";
import type { Chapter } from "@/lib/content";

const MONTH_MAPPING: Record<number, string> = {
  1: "June",
  2: "June",
  3: "July",
  4: "July",
  5: "August",
  6: "August",
  7: "September",
  8: "Sept/Oct",
  9: "October",
  10: "November",
  11: "November",
  12: "December",
  13: "Dec/Jan",
  14: "Dec/Jan",
  15: "February",
  16: "February",
};

export function ChapterIndex({
  chapters,
  totalPages,
  classGrade,
  subject,
}: {
  chapters: Chapter[];
  totalPages: number;
  classGrade: number;
  subject: string;
}) {
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

  // Render textbook-like table for Class 6 Science
  if (classGrade === 6 && subject === "Science") {
    // Group index data by unit to calculate rowspan
    const unitGroups: Record<string, typeof indexData> = {};
    indexData.forEach((item) => {
      if (!unitGroups[item.unit]) {
        unitGroups[item.unit] = [];
      }
      unitGroups[item.unit].push(item);
    });

    const unitsOrdered = ["I", "II", "III", "IV"];

    return (
      <div className="w-full space-y-6">
        <div className="rounded-[20px] border border-sky-200 bg-sky-50/50 p-6 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-sky-900 pb-3 mb-4">
            <span className="bg-sky-700 text-white rounded-full px-5 py-1 text-base font-bold font-heading">
              INDEX
            </span>
            <span className="text-sky-950 font-heading text-xl font-bold">
              VI Class
            </span>
          </div>

          {/* Textbook Table */}
          <div className="overflow-x-auto rounded-lg border border-sky-200 bg-white">
            <table className="min-w-full border-collapse text-left text-sm font-body">
              <thead>
                <tr className="bg-sky-700 text-white font-heading font-semibold text-xs uppercase tracking-wider">
                  <th className="border border-sky-200 px-3 py-3 text-center">Unit</th>
                  <th className="border border-sky-200 px-2 py-3 text-center">S.No.</th>
                  <th className="border border-sky-200 px-4 py-3">Name of the Chapter</th>
                  <th className="border border-sky-200 px-3 py-3 text-center">Page No.</th>
                  <th className="border border-sky-200 px-3 py-3 text-center">Periods</th>
                  <th className="border border-sky-200 px-3 py-3 text-center">Month</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-100 text-foreground/80 font-medium">
                {unitsOrdered.map((unitName) => {
                  const items = unitGroups[unitName] || [];
                  return items.map((item, idx) => {
                    const rowLink = `/reader?class=${classGrade}&subject=${subject}&page=${item.pageNo}&total=${totalPages}&index=${indexChapter.pageStart}`;
                    const subAreaColor =
                      item.subArea === "Physics" ? "text-blue-600 bg-blue-50" :
                      item.subArea === "Chemistry" ? "text-green-600 bg-green-50" :
                      item.subArea === "Biology" ? "text-purple-600 bg-purple-50" : "";

                    return (
                      <tr
                        key={`${item.unit}-${item.chapterNo}`}
                        onClick={() => window.location.href = rowLink}
                        className="cursor-pointer hover:bg-sky-50/50 transition-colors"
                      >
                        {/* Unit Column (rowspan on first item) */}
                        {idx === 0 && (
                          <td
                            rowSpan={items.length}
                            className="border border-sky-200 px-3 py-2 text-center font-heading font-bold text-sky-800 align-middle bg-sky-50/20"
                          >
                            {unitName}
                          </td>
                        )}
                        <td className="border border-sky-200 px-2 py-2.5 text-center align-middle">
                          {item.chapterNo}.
                        </td>
                        <td className="border border-sky-200 px-4 py-2.5">
                          <div className="font-semibold text-foreground">{item.title}</div>
                          {item.subArea && (
                            <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded mt-1 ${subAreaColor}`}>
                              {item.subArea}
                            </span>
                          )}
                        </td>
                        <td className="border border-sky-200 px-3 py-2.5 text-center font-semibold text-sky-900">
                          {item.pageNo}
                        </td>
                        <td className="border border-sky-200 px-3 py-2.5 text-center text-foreground/60">
                          {item.periods || "-"}
                        </td>
                        <td className="border border-sky-200 px-3 py-2.5 text-center text-sky-800 font-semibold">
                          {MONTH_MAPPING[item.chapterNo] || "-"}
                        </td>
                      </tr>
                    );
                  });
                })}
                {/* Revision row */}
                <tr className="bg-sky-50/20 font-semibold text-foreground/90">
                  <td className="border border-sky-200 px-3 py-2.5 text-center"></td>
                  <td className="border border-sky-200 px-2 py-2.5 text-center"></td>
                  <td className="border border-sky-200 px-4 py-2.5 text-sky-950 font-bold">Revision</td>
                  <td className="border border-sky-200 px-3 py-2.5 text-center"></td>
                  <td className="border border-sky-200 px-3 py-2.5 text-center"></td>
                  <td className="border border-sky-200 px-3 py-2.5 text-center text-sky-800 font-bold">March</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="rounded-[20px] border border-sky-200 bg-sky-50/30 p-5 shadow-sm">
          <h3 className="font-heading font-bold text-sky-950 mb-3 text-base">Legend</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold">
            <div className="flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-100 p-2.5 text-blue-700">
              <span className="font-heading font-bold px-2 py-0.5 bg-blue-200 rounded">Physics</span>
              <span>Physical phenomena and energy</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-100 p-2.5 text-green-700">
              <span className="font-heading font-bold px-2 py-0.5 bg-green-200 rounded">Chemistry</span>
              <span>Materials and substances</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-purple-50 border border-purple-100 p-2.5 text-purple-700">
              <span className="font-heading font-bold px-2 py-0.5 bg-purple-200 rounded">Biology</span>
              <span>Living organisms and life</span>
            </div>
          </div>
        </div>

        {/* Textbook Footer */}
        <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
          <span>Government&apos;s Gift for Students&apos; Progress</span>
          <span className="font-semibold font-heading">vi</span>
        </div>
      </div>
    );
  }

  const units = [...new Set(indexData.map((item) => item.unit))];
  const getUnitsData = (unit: string) => indexData.filter((item) => item.unit === unit);

  return (
    <div className="w-full space-y-6 px-4 py-8">
      <div className="text-center">
        <h1 className="font-heading text-2xl font-bold text-foreground">Index</h1>
        <p className="mt-2 font-body text-sm text-foreground/60">Grade {classGrade} {subject} - {totalPages} pages</p>
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
                      href={`/reader?class=${classGrade}&subject=${subject}&page=${item.pageNo}&total=${totalPages}&index=${indexChapter.pageStart}`}
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
