"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

export function C6MathsCh2Page12() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch2-page12";

  // State for user answers
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  const ALL_INPUT_IDS = [
    "try_these_line",
    "try_these_rectangles",
    "try_these_squares",
    "try_these_triangles",
    "ex23_step1",
    "ex23_step2",
    "ex23_step3",
    "ex23_step4",
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
    if (isRevealed) return;
    setAnswers((prev) => ({ ...prev, [id]: v }));
    localStorage.setItem(`${storageKey}-${id}-answer`, v);
  };

  const handleBlurText = (id: string, correctAnswers: string[]) => {
    if (isRevealed) return;
    const normalize = (s: string) =>
      s.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
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

      {/* ── TRY THESE ──────────────────────────────────────────── */}
      <div className="rounded-[16px] border border-emerald-200 bg-white p-5 sm:p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-emerald-100 pb-3">
          <div className="bg-emerald-600 text-white font-bold px-3 py-1 rounded shadow-xs">
            TRY THESE
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">1. Which numbers can be shown as a line only?</label>
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="e.g. 2"
                value={isRevealed ? "2" : (answers.try_these_line ?? "")}
                onChange={(e) => handleChange("try_these_line", e.target.value)}
                onBlur={() => handleBlurText("try_these_line", ["2", "5", "7", "11", "2, 5, 7, 11", "prime numbers", "primes", "prime"])}
                className={`w-full rounded-md border p-2 text-sm outline-none transition-colors ${inputClass("try_these_line")}`}
                readOnly={isRevealed}
              />
              {badge("try_these_line")}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">2. Which numbers can be shown as rectangles?</label>
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="e.g. 4, 6, 8, 9, 10"
                value={isRevealed ? "Composite numbers (or 4, 6, 8, 9, 10, ...)" : (answers.try_these_rectangles ?? "")}
                onChange={(e) => handleChange("try_these_rectangles", e.target.value)}
                onBlur={() => handleBlurText("try_these_rectangles", ["4, 6, 8, 9, 10", "4, 6, 8", "composite numbers", "composites", "composite"])}
                className={`w-full rounded-md border p-2 text-sm outline-none transition-colors ${inputClass("try_these_rectangles")}`}
                readOnly={isRevealed}
              />
              {badge("try_these_rectangles")}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">3. Which numbers can be shown as squares?</label>
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="e.g. 4, 9, 16, 25"
                value={isRevealed ? "Perfect squares (4, 9, 16, 25, ...)" : (answers.try_these_squares ?? "")}
                onChange={(e) => handleChange("try_these_squares", e.target.value)}
                onBlur={() => handleBlurText("try_these_squares", ["4, 9, 16, 25", "4, 9, 16", "perfect squares", "squares", "square numbers"])}
                className={`w-full rounded-md border p-2 text-sm outline-none transition-colors ${inputClass("try_these_squares")}`}
                readOnly={isRevealed}
              />
              {badge("try_these_squares")}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">4. Which numbers can be shown as triangles? e.g. 3, 6, ...</label>
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Next numbers..."
                value={isRevealed ? "10, 15, 21, ..." : (answers.try_these_triangles ?? "")}
                onChange={(e) => handleChange("try_these_triangles", e.target.value)}
                onBlur={() => handleBlurText("try_these_triangles", ["10, 15, 21", "10, 15", "10", "triangular numbers", "triangular", "triangles"])}
                className={`w-full rounded-md border p-2 text-sm outline-none transition-colors ${inputClass("try_these_triangles")}`}
                readOnly={isRevealed}
              />
              {badge("try_these_triangles")}
            </div>
          </div>
        </div>
      </div>

      {/* ── PATTERNS OF NUMBERS ─────────────────────────────────── */}
      <div className="space-y-4">
        <h2 className="font-heading font-bold text-teal-950 text-base">Patterns of numbers</h2>
        <p>We can use patterns to guide us in simplifying processes. Study the following:</p>

        <div className="bg-teal-50 p-4 rounded-xl space-y-2 border border-teal-100 font-mono text-sm shadow-xs overflow-x-auto">
          <div>1. <span className="font-semibold">296 + 9</span> = 296 + 10 - 1 = <span className="text-teal-700">306 - 1</span> = 305</div>
          <div>2. <span className="font-semibold">296 - 9</span> = 296 - 10 + 1 = <span className="text-teal-700">286 + 1</span> = 287</div>
          <div>3. <span className="font-semibold">296 + 99</span> = 296 + 100 - 1 = <span className="text-teal-700">396 - 1</span> = 395</div>
          <div>4. <span className="font-semibold">296 - 99</span> = 296 - 100 + 1 = <span className="text-teal-700">196 + 1</span> = 197</div>
        </div>

        <p>Let us see one more pattern.</p>

        <div className="bg-teal-50 p-4 rounded-xl space-y-2 border border-teal-100 font-mono text-sm shadow-xs overflow-x-auto">
          <div>1. <span className="font-semibold">65 &times; 99</span> = 65(100 - 1) = <span className="text-teal-700">6500 - 65</span> = 6435</div>
          <div>2. <span className="font-semibold">65 &times; 999</span> = 65(1000 - 1) = <span className="text-teal-700">65000 - 65</span> = 64935</div>
          <div>3. <span className="font-semibold">65 &times; 9999</span> = 65(10000 - 1) = <span className="text-teal-700">650000 - 65</span> = 649935</div>
          <div>4. <span className="font-semibold">65 &times; 99999</span> = 65(100000 - 1) = <span className="text-teal-700">6500000 - 65</span> = 6499935 <span className="font-sans text-foreground/80 italic text-xs ml-2">and so on.</span></div>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p>
            Here, we can see a shortcut to multiply a number by numbers of the form 9, 99, 999, ... This type of shortcuts enable us to do sums mentally.
          </p>
        </div>

        <p>Observe the following pattern: It suggests a way of multiplying a number by 5, 15, 25, ... (You can think of extending it further).</p>

        <div className="bg-teal-50 p-4 rounded-xl space-y-4 border border-teal-100 text-sm shadow-xs overflow-x-auto">
          <div className="flex gap-2">
            <span className="font-semibold">a.</span>
            <div className="flex flex-col gap-1 items-start">
              <span><span className="font-semibold">46 &times; 5</span> = 46 &times; <sup>10</sup>&frasl;<sub>2</sub> = <sup>460</sup>&frasl;<sub>2</sub> = 230 &times; 1</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">b.</span>
            <div className="flex flex-col gap-1 items-start">
              <span><span className="font-semibold">46 &times; 15</span> = 46 &times; (10 + 5)</span>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 46 &times; 10 + 46 &times; 5 = 460 + 230 = 690 = 230 &times; 3</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">c.</span>
            <div className="flex flex-col gap-1 items-start">
              <span><span className="font-semibold">46 &times; 25</span> = 46 &times; (20 + 5)</span>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 46 &times; 20 + 46 &times; 5 = 920 + 230 = 1150 = 230 &times; 5 ...</span>
            </div>
          </div>
        </div>

        <p className="italic font-semibold text-teal-800">
          Can you tell some more examples for using such processes to simplify calculations?
        </p>
      </div>

      {/* ── EXERCISE 2.3 ────────────────────────────────────────── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-teal-100 pb-3 bg-teal-600 rounded-t-lg -mt-6 -mx-6 px-6 pt-6">
          <h2 className="font-heading font-bold text-white text-lg flex-1">
            EXERCISE - 2.3
          </h2>
        </div>

        <div className="space-y-4">
          <p className="font-semibold">1. Study the pattern:</p>
          <div className="bg-teal-50 p-4 rounded-xl border border-teal-100 inline-block font-mono text-sm shadow-xs ml-4">
            <div>&nbsp;&nbsp;&nbsp;&nbsp;1 &times; 8 + 1 = 9</div>
            <div>&nbsp;&nbsp;&nbsp;12 &times; 8 + 2 = 98</div>
            <div>&nbsp;&nbsp;123 &times; 8 + 3 = 987</div>
            <div>&nbsp;1234 &times; 8 + 4 = 9876</div>
            <div>12345 &times; 8 + 5 = 98765</div>
          </div>

          <p>Write the next four steps. Can you find out how the pattern works?</p>
          
          <div className="space-y-3 ml-4 max-w-sm">
            <div className="relative">
              <input
                type="text"
                placeholder="Step 6..."
                value={isRevealed ? "123456 * 8 + 6 = 987654" : (answers.ex23_step1 ?? "")}
                onChange={(e) => handleChange("ex23_step1", e.target.value)}
                onBlur={() => handleBlurText("ex23_step1", ["123456 * 8 + 6 = 987654", "123456 x 8 + 6 = 987654", "123456×8+6=987654"])}
                className={`w-full rounded-md border p-2 text-sm outline-none font-mono transition-colors ${inputClass("ex23_step1")}`}
                readOnly={isRevealed}
              />
              {badge("ex23_step1")}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Step 7..."
                value={isRevealed ? "1234567 * 8 + 7 = 9876543" : (answers.ex23_step2 ?? "")}
                onChange={(e) => handleChange("ex23_step2", e.target.value)}
                onBlur={() => handleBlurText("ex23_step2", ["1234567 * 8 + 7 = 9876543", "1234567 x 8 + 7 = 9876543", "1234567×8+7=9876543"])}
                className={`w-full rounded-md border p-2 text-sm outline-none font-mono transition-colors ${inputClass("ex23_step2")}`}
                readOnly={isRevealed}
              />
              {badge("ex23_step2")}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Step 8..."
                value={isRevealed ? "12345678 * 8 + 8 = 98765432" : (answers.ex23_step3 ?? "")}
                onChange={(e) => handleChange("ex23_step3", e.target.value)}
                onBlur={() => handleBlurText("ex23_step3", ["12345678 * 8 + 8 = 98765432", "12345678 x 8 + 8 = 98765432", "12345678×8+8=98765432"])}
                className={`w-full rounded-md border p-2 text-sm outline-none font-mono transition-colors ${inputClass("ex23_step3")}`}
                readOnly={isRevealed}
              />
              {badge("ex23_step3")}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Step 9..."
                value={isRevealed ? "123456789 * 8 + 9 = 987654321" : (answers.ex23_step4 ?? "")}
                onChange={(e) => handleChange("ex23_step4", e.target.value)}
                onBlur={() => handleBlurText("ex23_step4", ["123456789 * 8 + 9 = 987654321", "123456789 x 8 + 9 = 987654321", "123456789×8+9=987654321"])}
                className={`w-full rounded-md border p-2 text-sm outline-none font-mono transition-colors ${inputClass("ex23_step4")}`}
                readOnly={isRevealed}
              />
              {badge("ex23_step4")}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
