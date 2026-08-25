"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

interface TablePatternRow {
  number: string;
  line: string;
  rectangle: string;
  square: string;
  triangle: string;
  isCustomEditable?: boolean;
}

const DEFAULT_ROWS: TablePatternRow[] = [
  { number: "2", line: "Yes", rectangle: "No", square: "No", triangle: "No" },
  { number: "3", line: "Yes", rectangle: "No", square: "No", triangle: "Yes" },
  { number: "4", line: "Yes", rectangle: "No", square: "Yes", triangle: "No" },
  { number: "5", line: "Yes", rectangle: "No", square: "No", triangle: "No", isCustomEditable: true },
  { number: "6", line: "Yes", rectangle: "Yes", square: "No", triangle: "Yes", isCustomEditable: true },
  { number: "25", line: "Yes", rectangle: "No", square: "Yes", triangle: "No", isCustomEditable: true },
];

export function C6MathsCh2Page11() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch2-page11";

  // State for user answers
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  // Interactive Dot Pattern Explorer
  const [selectedPatternNum, setSelectedPatternNum] = useState<number>(6);

  const ALL_INPUT_IDS = [
    "sq_next_1",
    "sq_next_2",
    "sq_next_3",
    "rect_non_sq_examples",
    "tri_next_1",
    "tri_next_2",
    "table_5_rect",
    "table_5_sq",
    "table_5_tri",
    "table_6_rect",
    "table_6_sq",
    "table_6_tri",
    "table_25_line",
    "table_25_rect",
    "table_25_sq",
    "table_25_tri",
    "is_1_a_square_decision",
  ];

  useEffect(() => {
    const saved: Record<string, string> = {};
    const savedG: Record<string, { value: string; correct: boolean }> = {};
    ALL_INPUT_IDS.forEach((id) => {
      const a = localStorage.getItem(`${storageKey}-${id}-answer`);
      if (a) saved[id] = a;
      const g = localStorage.getItem(`${storageKey}-${id}-graded`);
      if (g) {
        try {
          savedG[id] = JSON.parse(g);
        } catch {}
      }
    });
    setAnswers(saved);
    setGraded(savedG);
  }, []);

  useEffect(() => {
    function handleReset() {
      ALL_INPUT_IDS.forEach((id) => {
        localStorage.removeItem(`${storageKey}-${id}-answer`);
        localStorage.removeItem(`${storageKey}-${id}-graded`);
      });
      setAnswers({});
      setGraded({});
    }
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () => window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, []);

  const handleChange = (id: string, v: string) => {
    setAnswers((prev) => ({ ...prev, [id]: v }));
    localStorage.setItem(`${storageKey}-${id}-answer`, v);
  };

  const handleSelectAnswer = (id: string, selected: string, correctAns: string) => {
    if (isRevealed) return;
    handleChange(id, selected);

    const prev = graded[id];
    if (prev && prev.value === selected) return;

    const correct = selected.trim().toLowerCase() === correctAns.trim().toLowerCase();
    let delta = 0;
    if (prev) {
      if (!prev.correct && correct) delta = 2;
      else if (prev.correct && !correct) delta = -2;
    } else {
      delta = correct ? 1 : -1;
    }
    if (delta !== 0) addPoints(delta);

    setFeedback({ correct, id: Date.now() });
    const next = { ...graded, [id]: { value: selected, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${id}-graded`,
      JSON.stringify({ value: selected, correct })
    );
  };

  const handleBlurText = (id: string, correctAnswers: string[]) => {
    if (isRevealed) return;
    const normalize = (s: string) =>
      s.trim().toLowerCase().replace(/[\s.,/#!$%^&*;:{}=\-_`~()]+/g, "");
    const typed = normalize(answers[id] ?? "");
    if (!typed) return;

    const prev = graded[id];
    if (prev && prev.value === typed) return;

    const correct = correctAnswers.some((ans) => normalize(ans) === typed);
    let delta = 0;
    if (prev) {
      if (!prev.correct && correct) delta = 2;
      else if (prev.correct && !correct) delta = -2;
    } else {
      delta = correct ? 1 : -1;
    }
    if (delta !== 0) addPoints(delta);

    setFeedback({ correct, id: Date.now() });
    const next = { ...graded, [id]: { value: typed, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${id}-graded`,
      JSON.stringify({ value: typed, correct })
    );
  };

  function inputClass(id: string): string {
    const typed = (answers[id] ?? "").trim();
    if (isRevealed) return "border-emerald-500 bg-emerald-50 font-bold text-emerald-800";
    if (!typed) return "border-teal-200 focus:border-teal-500";
    const g = graded[id];
    if (g?.correct === true)
      return "border-green-500 bg-green-50 text-green-700 font-bold";
    if (g?.correct === false)
      return "border-destructive bg-destructive/5 text-destructive";
    return "border-teal-200 focus:border-teal-500";
  }

  function badge(id: string) {
    if (isRevealed) return null;
    const typed = (answers[id] ?? "").trim();
    if (!typed) return null;
    const g = graded[id];
    if (g?.correct === true)
      return (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 font-bold text-xs select-none">
          ✓
        </span>
      );
    if (g?.correct === false)
      return (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-destructive font-bold text-xs select-none">
          ✗
        </span>
      );
    return null;
  }

  return (
    <div className="w-full space-y-8 font-body text-sm leading-relaxed text-foreground/90 pb-8">
      {feedback !== null && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* ── Section 1: Elementary Shapes of Dots ──────────────────── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            Elementary Shapes Made up of Dots
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            Patterns in Whole Numbers
          </span>
        </div>

        <p className="text-foreground/90">
          Whole numbers can be shown in elementary shapes made up of dots. Observe the following:
        </p>

        {/* 1. Line Shapes */}
        <div className="p-4 bg-teal-50/30 rounded-xl border border-teal-200 space-y-2">
          <h3 className="font-heading font-bold text-teal-950 text-sm">
            1. Every number can be arranged as a Line:
          </h3>
          <div className="flex flex-wrap items-center gap-6 pt-1 font-mono text-xs sm:text-sm">
            {/* Number 2 as a line */}
            <div className="bg-white p-2.5 rounded-lg border border-teal-100 flex items-center gap-2">
              <span className="font-bold text-teal-900">Number 2:</span>
              <div className="flex gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-rose-600 inline-block shadow-xs" />
                <span className="h-3.5 w-3.5 rounded-full bg-rose-600 inline-block shadow-xs" />
              </div>
            </div>
            {/* Number 3 as a line */}
            <div className="bg-white p-2.5 rounded-lg border border-teal-100 flex items-center gap-2">
              <span className="font-bold text-teal-900">Number 3:</span>
              <div className="flex gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-rose-600 inline-block shadow-xs" />
                <span className="h-3.5 w-3.5 rounded-full bg-rose-600 inline-block shadow-xs" />
                <span className="h-3.5 w-3.5 rounded-full bg-rose-600 inline-block shadow-xs" />
              </div>
            </div>
            <span className="text-xs text-foreground/75 font-sans font-medium">...and so on.</span>
          </div>
        </div>

        {/* 2. Rectangle Shapes */}
        <div className="p-4 bg-teal-50/30 rounded-xl border border-teal-200 space-y-2">
          <h3 className="font-heading font-bold text-teal-950 text-sm">
            2. Some numbers can also be shown as a Rectangle:
          </h3>
          <p className="text-xs text-foreground/80">For example, the number 6 can be shown as (2 rows × 3 columns):</p>
          <div className="bg-white p-3.5 rounded-xl border border-teal-100 inline-flex flex-col gap-2 shadow-xs">
            <div className="flex gap-3">
              <span className="h-3.5 w-3.5 rounded-full bg-rose-600 inline-block shadow-xs" />
              <span className="h-3.5 w-3.5 rounded-full bg-rose-600 inline-block shadow-xs" />
              <span className="h-3.5 w-3.5 rounded-full bg-rose-600 inline-block shadow-xs" />
            </div>
            <div className="flex gap-3">
              <span className="h-3.5 w-3.5 rounded-full bg-rose-600 inline-block shadow-xs" />
              <span className="h-3.5 w-3.5 rounded-full bg-rose-600 inline-block shadow-xs" />
              <span className="h-3.5 w-3.5 rounded-full bg-rose-600 inline-block shadow-xs" />
            </div>
          </div>
          <p className="text-xs text-teal-950 font-medium">
            In this rectangle, observe that there are <strong>2 rows and 3 columns</strong> (<span className="font-mono font-bold">2 × 3 = 6</span>).
          </p>
        </div>

        {/* 3. Square Shapes */}
        <div className="p-4 bg-teal-50/30 rounded-xl border border-teal-200 space-y-3">
          <h3 className="font-heading font-bold text-teal-950 text-sm">
            3. Some numbers like 4 or 9 can also be arranged as Squares:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Square 4 */}
            <div className="bg-white p-3.5 rounded-xl border border-teal-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-teal-950 text-sm">Square 4 (2 × 2):</p>
                <p className="text-xs text-emerald-800 font-medium mt-1">4 is a perfect square</p>
              </div>
              <div className="flex flex-col gap-2 p-2 bg-teal-50/50 rounded-lg border border-teal-100">
                <div className="flex gap-2">
                  <span className="h-3.5 w-3.5 rounded-full bg-rose-600 inline-block shadow-xs" />
                  <span className="h-3.5 w-3.5 rounded-full bg-rose-600 inline-block shadow-xs" />
                </div>
                <div className="flex gap-2">
                  <span className="h-3.5 w-3.5 rounded-full bg-rose-600 inline-block shadow-xs" />
                  <span className="h-3.5 w-3.5 rounded-full bg-rose-600 inline-block shadow-xs" />
                </div>
              </div>
            </div>

            {/* Square 9 */}
            <div className="bg-white p-3.5 rounded-xl border border-teal-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-teal-950 text-sm">Square 9 (3 × 3):</p>
                <p className="text-xs text-emerald-800 font-medium mt-1">9 is a perfect square</p>
              </div>
              <div className="flex flex-col gap-2 p-2 bg-teal-50/50 rounded-lg border border-teal-100">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-600 inline-block shadow-xs" />
                  <span className="h-3 w-3 rounded-full bg-rose-600 inline-block shadow-xs" />
                  <span className="h-3 w-3 rounded-full bg-rose-600 inline-block shadow-xs" />
                </div>
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-600 inline-block shadow-xs" />
                  <span className="h-3 w-3 rounded-full bg-rose-600 inline-block shadow-xs" />
                  <span className="h-3 w-3 rounded-full bg-rose-600 inline-block shadow-xs" />
                </div>
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-600 inline-block shadow-xs" />
                  <span className="h-3 w-3 rounded-full bg-rose-600 inline-block shadow-xs" />
                  <span className="h-3 w-3 rounded-full bg-rose-600 inline-block shadow-xs" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-foreground/85">
            What will be the next number which can be arranged like a square? Easily we can observe that <span className="font-mono font-bold">4 × 4 = 16</span> and <strong>16</strong> is the next perfect square!
          </p>

          {/* Interactive Square Questions */}
          <div className="bg-white p-4 rounded-xl border border-teal-200 space-y-3">
            <p className="font-semibold text-teal-950 text-xs sm:text-sm">
              👉 Find the next 3 numbers that can be arranged as squares (after 16):
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-24">
                <input
                  type="text"
                  placeholder="5 × 5"
                  value={isRevealed ? "25" : answers["sq_next_1"] ?? ""}
                  disabled={isRevealed}
                  onChange={(e) => handleChange("sq_next_1", e.target.value)}
                  onBlur={() => handleBlurText("sq_next_1", ["25"])}
                  className={`w-full rounded-lg border bg-white px-2.5 py-1 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                    "sq_next_1"
                  )}`}
                />
                {badge("sq_next_1")}
              </div>
              <div className="relative w-24">
                <input
                  type="text"
                  placeholder="6 × 6"
                  value={isRevealed ? "36" : answers["sq_next_2"] ?? ""}
                  disabled={isRevealed}
                  onChange={(e) => handleChange("sq_next_2", e.target.value)}
                  onBlur={() => handleBlurText("sq_next_2", ["36"])}
                  className={`w-full rounded-lg border bg-white px-2.5 py-1 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                    "sq_next_2"
                  )}`}
                />
                {badge("sq_next_2")}
              </div>
              <div className="relative w-24">
                <input
                  type="text"
                  placeholder="7 × 7"
                  value={isRevealed ? "49" : answers["sq_next_3"] ?? ""}
                  disabled={isRevealed}
                  onChange={(e) => handleChange("sq_next_3", e.target.value)}
                  onBlur={() => handleBlurText("sq_next_3", ["49"])}
                  className={`w-full rounded-lg border bg-white px-2.5 py-1 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                    "sq_next_3"
                  )}`}
                />
                {badge("sq_next_3")}
              </div>
            </div>

            <div className="pt-2">
              <p className="font-semibold text-teal-950 text-xs sm:text-sm mb-1">
                👉 Give 5 numbers that can be arranged as rectangles that are not squares:
              </p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. 6, 8, 10, 12, 14"
                  value={isRevealed ? "6, 8, 10, 12, 14, 15, 18, 20" : answers["rect_non_sq_examples"] ?? ""}
                  disabled={isRevealed}
                  onChange={(e) => handleChange("rect_non_sq_examples", e.target.value)}
                  onBlur={() => handleBlurText("rect_non_sq_examples", ["6, 8, 10, 12, 14", "6,8,10,12,14", "6 8 10 12 14", "any"])}
                  className={`w-full rounded-lg border bg-white px-3 py-1.5 font-mono text-xs focus:outline-none transition-all ${inputClass(
                    "rect_non_sq_examples"
                  )}`}
                />
                {badge("rect_non_sq_examples")}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Triangle Shapes */}
        <div className="p-4 bg-teal-50/30 rounded-xl border border-teal-200 space-y-3">
          <h3 className="font-heading font-bold text-teal-950 text-sm">
            4. Some numbers can also be arranged as Triangles:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Triangle 3 */}
            <div className="bg-white p-3.5 rounded-xl border border-teal-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-teal-950 text-sm">Number 3:</p>
                <p className="text-xs text-foreground/75 font-mono">Row 1: 1 dot<br />Row 2: 2 dots</p>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-2 bg-teal-50/50 rounded-lg border border-teal-100">
                <span className="h-3 w-3 rounded-full bg-rose-600 inline-block" />
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-600 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-rose-600 inline-block" />
                </div>
              </div>
            </div>

            {/* Triangle 6 */}
            <div className="bg-white p-3.5 rounded-xl border border-teal-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-teal-950 text-sm">Number 6:</p>
                <p className="text-xs text-foreground/75 font-mono">Row 1: 1 dot<br />Row 2: 2 dots<br />Row 3: 3 dots</p>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-2 bg-teal-50/50 rounded-lg border border-teal-100">
                <span className="h-3 w-3 rounded-full bg-rose-600 inline-block" />
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-600 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-rose-600 inline-block" />
                </div>
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-600 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-rose-600 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-rose-600 inline-block" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-foreground/85">
            Note that the arrangement as a triangle would have its two sides equal. The number of dots from the bottom row can be like 4, 3, 2, 1. The top row always contains only one dot, so as to make one vertex.
          </p>

          <div className="bg-white p-3.5 rounded-xl border border-teal-200 flex flex-wrap items-center justify-between gap-3">
            <span className="font-semibold text-teal-950 text-xs sm:text-sm">
              What are the next two possible triangular numbers?
            </span>
            <div className="flex items-center gap-2">
              <div className="relative w-28">
                <input
                  type="text"
                  placeholder="1+2+3+4"
                  value={isRevealed ? "10" : answers["tri_next_1"] ?? ""}
                  disabled={isRevealed}
                  onChange={(e) => handleChange("tri_next_1", e.target.value)}
                  onBlur={() => handleBlurText("tri_next_1", ["10", "ten"])}
                  className={`w-full rounded-lg border bg-white px-2.5 py-1 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                    "tri_next_1"
                  )}`}
                />
                {badge("tri_next_1")}
              </div>
              <span className="text-xs font-bold text-teal-700">and</span>
              <div className="relative w-28">
                <input
                  type="text"
                  placeholder="+ 5"
                  value={isRevealed ? "15" : answers["tri_next_2"] ?? ""}
                  disabled={isRevealed}
                  onChange={(e) => handleChange("tri_next_2", e.target.value)}
                  onBlur={() => handleBlurText("tri_next_2", ["15", "fifteen"])}
                  className={`w-full rounded-lg border bg-white px-2.5 py-1 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                    "tri_next_2"
                  )}`}
                />
                {badge("tri_next_2")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Complete the Table ─────────────────────────── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            Now Complete the Following Pattern Table:
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            Interactive Table
          </span>
        </div>

        <div className="overflow-x-auto rounded-[14px] border border-teal-200 bg-white shadow-xs">
          <table className="w-full border-collapse text-center text-xs sm:text-sm">
            <thead>
              <tr className="bg-teal-700 text-white">
                <th className="border border-teal-600 px-4 py-2.5 font-semibold">Number</th>
                <th className="border border-teal-600 px-4 py-2.5 font-semibold">Line</th>
                <th className="border border-teal-600 px-4 py-2.5 font-semibold">Rectangle</th>
                <th className="border border-teal-600 px-4 py-2.5 font-semibold">Square</th>
                <th className="border border-teal-600 px-4 py-2.5 font-semibold">Triangle</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 2 */}
              <tr className="bg-white">
                <td className="border border-teal-100 px-3 py-2 font-mono font-bold text-teal-900">2</td>
                <td className="border border-teal-100 px-3 py-2 font-semibold text-emerald-700">Yes</td>
                <td className="border border-teal-100 px-3 py-2 text-foreground/60">No</td>
                <td className="border border-teal-100 px-3 py-2 text-foreground/60">No</td>
                <td className="border border-teal-100 px-3 py-2 text-foreground/60">No</td>
              </tr>
              {/* Row 3 */}
              <tr className="bg-teal-50/30">
                <td className="border border-teal-100 px-3 py-2 font-mono font-bold text-teal-900">3</td>
                <td className="border border-teal-100 px-3 py-2 font-semibold text-emerald-700">Yes</td>
                <td className="border border-teal-100 px-3 py-2 text-foreground/60">No</td>
                <td className="border border-teal-100 px-3 py-2 text-foreground/60">No</td>
                <td className="border border-teal-100 px-3 py-2 font-semibold text-emerald-700">Yes</td>
              </tr>
              {/* Row 4 */}
              <tr className="bg-white">
                <td className="border border-teal-100 px-3 py-2 font-mono font-bold text-teal-900">4</td>
                <td className="border border-teal-100 px-3 py-2 font-semibold text-emerald-700">Yes</td>
                <td className="border border-teal-100 px-3 py-2 text-foreground/60">No</td>
                <td className="border border-teal-100 px-3 py-2 font-semibold text-emerald-700">Yes</td>
                <td className="border border-teal-100 px-3 py-2 text-foreground/60">No</td>
              </tr>

              {/* Row 5 (Editable) */}
              <tr className="bg-teal-50/30">
                <td className="border border-teal-100 px-3 py-2 font-mono font-bold text-teal-900">5</td>
                <td className="border border-teal-100 px-3 py-2 font-semibold text-emerald-700">Yes</td>
                <td className="border border-teal-100 px-2 py-1">
                  <select
                    aria-label="Is 5 a rectangle"
                    value={isRevealed ? "No" : answers["table_5_rect"] ?? ""}
                    disabled={isRevealed}
                    onChange={(e) => handleSelectAnswer("table_5_rect", e.target.value, "No")}
                    className="rounded border border-teal-200 bg-white px-2 py-1 text-xs font-bold"
                  >
                    <option value="">--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td className="border border-teal-100 px-2 py-1">
                  <select
                    aria-label="Is 5 a square"
                    value={isRevealed ? "No" : answers["table_5_sq"] ?? ""}
                    disabled={isRevealed}
                    onChange={(e) => handleSelectAnswer("table_5_sq", e.target.value, "No")}
                    className="rounded border border-teal-200 bg-white px-2 py-1 text-xs font-bold"
                  >
                    <option value="">--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td className="border border-teal-100 px-2 py-1">
                  <select
                    aria-label="Is 5 a triangle"
                    value={isRevealed ? "No" : answers["table_5_tri"] ?? ""}
                    disabled={isRevealed}
                    onChange={(e) => handleSelectAnswer("table_5_tri", e.target.value, "No")}
                    className="rounded border border-teal-200 bg-white px-2 py-1 text-xs font-bold"
                  >
                    <option value="">--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
              </tr>

              {/* Row 6 (Editable) */}
              <tr className="bg-white">
                <td className="border border-teal-100 px-3 py-2 font-mono font-bold text-teal-900">6</td>
                <td className="border border-teal-100 px-3 py-2 font-semibold text-emerald-700">Yes</td>
                <td className="border border-teal-100 px-2 py-1">
                  <select
                    aria-label="Is 6 a rectangle"
                    value={isRevealed ? "Yes" : answers["table_6_rect"] ?? ""}
                    disabled={isRevealed}
                    onChange={(e) => handleSelectAnswer("table_6_rect", e.target.value, "Yes")}
                    className="rounded border border-teal-200 bg-white px-2 py-1 text-xs font-bold"
                  >
                    <option value="">--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td className="border border-teal-100 px-2 py-1">
                  <select
                    aria-label="Is 6 a square"
                    value={isRevealed ? "No" : answers["table_6_sq"] ?? ""}
                    disabled={isRevealed}
                    onChange={(e) => handleSelectAnswer("table_6_sq", e.target.value, "No")}
                    className="rounded border border-teal-200 bg-white px-2 py-1 text-xs font-bold"
                  >
                    <option value="">--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td className="border border-teal-100 px-2 py-1">
                  <select
                    aria-label="Is 6 a triangle"
                    value={isRevealed ? "Yes" : answers["table_6_tri"] ?? ""}
                    disabled={isRevealed}
                    onChange={(e) => handleSelectAnswer("table_6_tri", e.target.value, "Yes")}
                    className="rounded border border-teal-200 bg-white px-2 py-1 text-xs font-bold"
                  >
                    <option value="">--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
              </tr>

              {/* Ellipsis row */}
              <tr className="bg-teal-50/10">
                <td colSpan={5} className="border border-teal-100 py-1 text-teal-800 font-bold">
                  .....
                </td>
              </tr>

              {/* Row 25 (Editable) */}
              <tr className="bg-white">
                <td className="border border-teal-100 px-3 py-2 font-mono font-bold text-teal-900">25</td>
                <td className="border border-teal-100 px-2 py-1">
                  <select
                    aria-label="Is 25 a line"
                    value={isRevealed ? "Yes" : answers["table_25_line"] ?? ""}
                    disabled={isRevealed}
                    onChange={(e) => handleSelectAnswer("table_25_line", e.target.value, "Yes")}
                    className="rounded border border-teal-200 bg-white px-2 py-1 text-xs font-bold"
                  >
                    <option value="">--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td className="border border-teal-100 px-2 py-1">
                  <select
                    aria-label="Is 25 a rectangle"
                    value={isRevealed ? "No" : answers["table_25_rect"] ?? ""}
                    disabled={isRevealed}
                    onChange={(e) => handleSelectAnswer("table_25_rect", e.target.value, "No")}
                    className="rounded border border-teal-200 bg-white px-2 py-1 text-xs font-bold"
                  >
                    <option value="">--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td className="border border-teal-100 px-2 py-1">
                  <select
                    aria-label="Is 25 a square"
                    value={isRevealed ? "Yes" : answers["table_25_sq"] ?? ""}
                    disabled={isRevealed}
                    onChange={(e) => handleSelectAnswer("table_25_sq", e.target.value, "Yes")}
                    className="rounded border border-teal-200 bg-white px-2 py-1 text-xs font-bold"
                  >
                    <option value="">--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
                <td className="border border-teal-100 px-2 py-1">
                  <select
                    aria-label="Is 25 a triangle"
                    value={isRevealed ? "No" : answers["table_25_tri"] ?? ""}
                    disabled={isRevealed}
                    onChange={(e) => handleSelectAnswer("table_25_tri", e.target.value, "No")}
                    className="rounded border border-teal-200 bg-white px-2 py-1 text-xs font-bold"
                  >
                    <option value="">--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Question: Is 1 a square or not? why? */}
        <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-200 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="font-heading font-bold text-teal-950 text-sm">
              Is 1 a square or not? Why?
            </p>
            <div className="flex items-center gap-2">
              {["Yes", "No"].map((opt) => {
                const current = answers["is_1_a_square_decision"];
                const isSelected = isRevealed ? opt === "Yes" : current === opt;
                const isCorrect = opt === "Yes";
                return (
                  <button
                    key={opt}
                    disabled={isRevealed}
                    onClick={() => handleSelectAnswer("is_1_a_square_decision", opt, "Yes")}
                    className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all border ${
                      isRevealed
                        ? isCorrect
                          ? "bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-xs"
                          : "bg-gray-100 text-gray-400 border-gray-200 opacity-60"
                        : isSelected
                        ? graded["is_1_a_square_decision"]?.correct
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                          : "bg-rose-500 text-white border-rose-500 shadow-xs"
                        : "bg-white text-teal-900 border-teal-300 hover:bg-teal-50 cursor-pointer"
                    }`}
                  >
                    {opt} {isRevealed && isCorrect ? "✓" : ""}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="text-xs text-foreground/80 font-medium">
            💡 <strong>Reason:</strong> <strong>Yes</strong>, 1 can be considered as a square because <span className="font-mono font-bold">1 × 1 = 1</span> (1 row of 1 dot = 1²).
          </p>
        </div>
      </div>

      {/* ── Footer Banner ───────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 text-sm font-bold text-white rounded-lg shadow-xs mt-8"
        style={{
          background: "linear-gradient(90deg, #0f766e 0%, #14b8a6 100%)",
        }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-teal-700 text-xs font-extrabold mr-3">
          26
        </span>
        <span className="tracking-wide flex-1 text-center font-heading text-xs sm:text-sm">
          Government&apos;s Gift for Students&apos; Progress
        </span>
      </div>
    </div>
  );
}
