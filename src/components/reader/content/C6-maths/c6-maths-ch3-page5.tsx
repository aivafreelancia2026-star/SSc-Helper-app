"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

// Interactive Case Arrangements of 6 Laddoos
const LADDOO_CASES = [
  {
    id: "case1",
    label: "Case (i)",
    columns: 6,
    perCol: 1,
    formula: "1 × 6 = 6",
    desc: "1 laddoo in each column, Number of columns = 6",
    layout: "grid grid-cols-6 gap-2 max-w-[280px]",
    items: [1, 2, 3, 4, 5, 6],
  },
  {
    id: "case2",
    label: "Case (ii)",
    columns: 3,
    perCol: 2,
    formula: "2 × 3 = 6",
    desc: "2 laddoos in each column, Number of columns = 3",
    layout: "grid grid-cols-3 gap-2 max-w-[150px]",
    items: [1, 2, 3, 4, 5, 6],
  },
  {
    id: "case3",
    label: "Case (iii)",
    columns: 2,
    perCol: 3,
    formula: "3 × 2 = 6",
    desc: "3 laddoos in each column, Number of columns = 2",
    layout: "grid grid-cols-2 gap-2 max-w-[100px]",
    items: [1, 2, 3, 4, 5, 6],
  },
  {
    id: "case4",
    label: "Case (iv)",
    columns: 1,
    perCol: 6,
    formula: "6 × 1 = 6",
    desc: "6 laddoos in each column, Number of columns = 1",
    layout: "grid grid-cols-1 gap-2 max-w-[50px]",
    items: [1, 2, 3, 4, 5, 6],
  },
];

const FACTORS_TABLE = [
  { number: 12, factors: "1, 2, 3, 4, 6, 12" },
  { number: 18, factors: "1, 2, 3, 6, 9, 18" },
  { number: 20, factors: "1, 2, 4, 5, 10, 20" },
  { number: 24, factors: "1, 2, 3, 4, 6, 8, 12, 24" },
];

const ALL_INPUT_IDS = [
  "q_prod1",
  "q_prod2",
  "q_prod3",
  "q_prod4",
  "q_factors_of_6",
  "q_factors_of_19",
  "q_why_not_5",
  "q_try_factor_16",
];

const CORRECT: Record<string, string[]> = {
  q_prod1: ["1x6", "1*6", "1×6"],
  q_prod2: ["2x3", "2*3", "2×3"],
  q_prod3: ["3x2", "3*2", "3×2"],
  q_prod4: ["6x1", "6*1", "6×1"],
  q_factors_of_6: ["1,2,3,6", "1, 2, 3, 6", "1,2,3and6", "1, 2, 3 and 6"],
  q_factors_of_19: ["1,19", "1, 19", "1and19", "1 and 19"],
  q_why_not_5: [
    "remainder",
    "notdivisible",
    "notcompletelydivisible",
    "leavesremainder1",
    "leavesremainder",
    "16isnotdivisibleby5",
    "cannotdividetotally",
    "remainder1",
    "notafactor",
    "fraction",
  ],
  q_try_factor_16: ["1,2,4,8,16", "1, 2, 4, 8, 16", "1 2 4 8 16", "1,2,4,8,16."],
};

const REVEAL_TEXT: Record<string, string> = {
  q_prod1: "1 × 6",
  q_prod2: "2 × 3",
  q_prod3: "3 × 2",
  q_prod4: "6 × 1",
  q_factors_of_6: "1, 2, 3, 6",
  q_factors_of_19: "1, 19",
  q_why_not_5:
    "Because 16 is not completely divisible by 5 (16 ÷ 5 = 3 with remainder 1).",
  q_try_factor_16: "1, 2, 4, 8, 16",
};

export function C6MathsCh3Page5() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page5";

  const [activeCase, setActiveCase] = useState<string>("case1");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

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
  }, [storageKey]);

  useEffect(() => {
    const handleReset = () => {
      ALL_INPUT_IDS.forEach((id) => {
        localStorage.removeItem(`${storageKey}-${id}-answer`);
        localStorage.removeItem(`${storageKey}-${id}-graded`);
      });
      setAnswers({});
      setGraded({});
      setFeedback(null);
    };
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () =>
      window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, [storageKey]);

  const handleChange = (id: string, val: string) => {
    if (isRevealed) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
    localStorage.setItem(`${storageKey}-${id}-answer`, val);
  };

  const handleBlurText = (id: string, correctAnswers: string[], isOpenEnded = false) => {
    if (isRevealed) return;
    const normalize = (s: string) =>
      s.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

    const rawTyped = answers[id] ?? "";
    const typed = normalize(rawTyped);
    if (!typed && !isOpenEnded) return;
    if (isOpenEnded && !rawTyped.trim()) return;

    const prev = graded[id];
    if (prev && prev.value === typed) return;

    let correct = false;
    if (isOpenEnded) {
      const lower = rawTyped.toLowerCase().replace(/[^a-z0-9]/g, "");
      correct = correctAnswers.some((ans) => lower.includes(normalize(ans))) || rawTyped.trim().length >= 10;
    } else {
      correct = correctAnswers.some((ans) => normalize(ans) === typed);
    }

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
    if (isRevealed) return "border-emerald-500 bg-emerald-50 font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300";
    if (!typed) return "border-teal-200 focus:border-teal-500 bg-background";
    const g = graded[id];
    if (g?.correct === true)
      return "border-green-500 bg-green-50 text-green-700 font-bold dark:bg-green-950/30 dark:text-green-300";
    if (g?.correct === false)
      return "border-destructive bg-destructive/5 text-destructive";
    return "border-teal-200 focus:border-teal-500 bg-background";
  }

  function badge(id: string) {
    if (isRevealed) return null;
    const typed = (answers[id] ?? "").trim();
    if (!typed) return null;
    const g = graded[id];
    if (g?.correct === true)
      return (
        <span className="absolute right-2.5 top-2.5 text-green-600 font-bold text-xs select-none bg-white/80 dark:bg-black/80 rounded-full px-1.5 py-0.5">
          ✓
        </span>
      );
    if (g?.correct === false)
      return (
        <span className="absolute right-2.5 top-2.5 text-destructive font-bold text-xs select-none bg-white/80 dark:bg-black/80 rounded-full px-1.5 py-0.5">
          ✗
        </span>
      );
    return null;
  }

  return (
    <div className="space-y-8 text-foreground leading-relaxed font-body">
      {feedback && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* Chapter Section Badge & Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-primary/20 pb-4">
        <div className="inline-flex items-center justify-center bg-teal-600 text-white font-heading font-bold text-lg px-3.5 py-1.5 rounded-lg shadow-sm w-fit">
          3.3
        </div>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-teal-800 dark:text-teal-300">
          FACTORS
        </h2>
      </div>

      {/* Intro Text */}
      <div className="rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/40 p-5 space-y-3">
        <p className="text-base sm:text-lg">
          We have studied the divisibility and discovered tests of divisibility for{" "}
          <strong className="text-teal-900 dark:text-teal-200">2, 3, 5, 6, 9 and 10</strong>.
          Now we will learn the concepts of <strong className="text-teal-700 dark:text-teal-400">factors</strong>.
        </p>
      </div>

      {/* Situation Demonstration */}
      <div className="space-y-4">
        <div className="rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-5">
          <h3 className="font-heading text-lg font-bold text-amber-900 dark:text-amber-300 mb-2">
            Let us observe a situation:
          </h3>
          <p className="text-base text-amber-950 dark:text-amber-100">
            <strong>Devi has 6 laddoos with her.</strong> She wants to arrange them in columns in such a way that each column has the same number of laddoos. She arranges them in many ways using all the 6 laddoos.
          </p>
        </div>

        {/* Interactive Laddoo Arrangement Visualizer */}
        <div className="rounded-2xl border-2 border-primary/20 bg-card p-5 space-y-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-heading font-bold text-lg text-primary">
                Visualizing All Arrangements of 6 Laddoos
              </h4>
              <p className="text-sm text-foreground/70">
                Click each case below to see how the 6 laddoos are arranged into columns!
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {LADDOO_CASES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCase(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-sm ${
                    activeCase === c.id
                      ? "bg-primary text-on-primary scale-105 shadow-md"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Case Display Card */}
          {(() => {
            const current =
              LADDOO_CASES.find((c) => c.id === activeCase) || LADDOO_CASES[0];
            return (
              <div className="bg-amber-100/50 dark:bg-amber-950/40 rounded-xl p-5 border border-amber-200 dark:border-amber-900/50 flex flex-col md:flex-row items-center justify-around gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <span className="inline-block bg-amber-500 text-white font-bold text-xs uppercase px-2.5 py-1 rounded-full">
                    {current.label}
                  </span>
                  <h5 className="font-heading font-bold text-lg text-foreground">
                    {current.desc}
                  </h5>
                  <div className="text-xl font-mono font-bold text-amber-800 dark:text-amber-300">
                    Total number of laddoos = {current.formula}
                  </div>
                </div>

                {/* Laddoo Rendering Box */}
                <div className="bg-background/80 rounded-xl p-6 border border-border shadow-inner flex flex-col items-center min-w-[220px]">
                  <div className="text-xs font-semibold text-foreground/60 mb-3 uppercase tracking-wider">
                    Column arrangement
                  </div>
                  <div className={current.layout}>
                    {current.items.map((num) => (
                      <div
                        key={num}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 border-2 border-amber-600 shadow-md flex items-center justify-center text-amber-900 font-bold text-xs transform hover:scale-110 transition-transform duration-200 cursor-pointer select-none"
                        title={`Laddoo #${num}`}
                      >
                        🟡
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground mt-3 italic">
                    {current.columns} column{current.columns > 1 ? "s" : ""} ×{" "}
                    {current.perCol} laddoo{current.perCol > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Grid of all 4 cases side-by-side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {LADDOO_CASES.map((c) => (
              <div
                key={c.id}
                onClick={() => setActiveCase(c.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activeCase === c.id
                    ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                    : "border-border bg-muted/30 hover:bg-muted/60"
                }`}
              >
                <div className="font-bold text-sm text-primary mb-1">
                  {c.label}
                </div>
                <div className="text-xs text-foreground/80 mb-2">{c.desc}</div>
                <div className="text-sm font-mono font-bold text-foreground">
                  {c.formula}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mathematical deduction */}
      <div className="rounded-2xl bg-card border border-border p-5 space-y-4 shadow-sm">
        <p className="text-base font-medium">
          These are the only possible arrangements using all the 6 laddoos.
        </p>
        <p className="text-base">
          From these arrangements, Devi observes that <strong>6</strong> can be written as a product of two numbers in different ways.
        </p>

        {/* Interactive Products of 6 with instant scoring */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-primary">
            Complete the 4 multiplication ways for 6 (e.g. 1 × 6, 2 × 3...):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: "q_prod1", label: "Way 1", hint: "1 × 6" },
              { id: "q_prod2", label: "Way 2", hint: "2 × 3" },
              { id: "q_prod3", label: "Way 3", hint: "3 × 2" },
              { id: "q_prod4", label: "Way 4", hint: "6 × 1" },
            ].map((item) => (
              <div key={item.id} className="relative flex items-center gap-2 p-3 bg-muted/30 rounded-xl border border-border">
                <span className="text-xs font-bold text-muted-foreground w-12">{item.label}:</span>
                <span className="font-mono font-bold">6 =</span>
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={isRevealed ? REVEAL_TEXT[item.id] : answers[item.id] ?? ""}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    onBlur={() => handleBlurText(item.id, CORRECT[item.id])}
                    placeholder="e.g. 1 × 6"
                    disabled={isRevealed}
                    className={`w-full rounded-lg border px-2.5 py-1.5 text-xs sm:text-sm font-mono text-center outline-none transition-colors ${inputClass(
                      item.id
                    )}`}
                  />
                  {badge(item.id)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-base pt-2">
          From <span className="font-mono font-bold">6 = 2 × 3</span> it can be said that <strong>2</strong> and <strong>3</strong> exactly divide <strong>6</strong>. So, 2 and 3 are factors of 6.
        </p>
        <p className="text-base">
          From the other product <span className="font-mono font-bold">6 = 1 × 6</span>, thus <strong>6</strong> and <strong>1</strong> are also factors of 6.
        </p>
        <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-800 text-base font-semibold text-teal-800 dark:text-teal-300">
          Therefore, <strong>1, 2, 3 and 6</strong> are the only factors of 6.
        </div>
      </div>

      {/* Formal Definition Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-500/10 via-primary/10 to-indigo-500/10 border-2 border-teal-500/30 p-6 space-y-3">
        <h4 className="font-heading font-bold text-xl text-teal-900 dark:text-teal-200">
          Definition of a Factor:
        </h4>
        <blockquote className="border-l-4 border-teal-500 pl-4 py-1 italic font-heading text-lg text-foreground font-semibold">
          &ldquo;A number which divides the other number exactly is called a <span className="text-teal-600 dark:text-teal-400 underline decoration-2">factor</span> of that number.&rdquo;
        </blockquote>
        <p className="text-sm sm:text-base text-foreground/80 pt-2">
          In other words, every number is completely divisible by its factors. Here 1, 2, 3 and 6 are all factors of 6. Similarly, <strong>1 and 19</strong> are factors of 19.
        </p>
      </div>

      {/* Think & Answer Interactive Practice Questions with Auto-Scoring */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-5 shadow-sm">
        <h4 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
          <span>❓</span> Think & Answer (Interactive Exercises)
        </h4>

        {/* Question 1: Number 5 is not a factor of 16. Why? */}
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-medium">
            <strong>1.</strong> Number 5 is not a factor of 16. Why?
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g., Because 16 is not completely divisible by 5 (leaves remainder 1)..."
              value={isRevealed ? REVEAL_TEXT["q_why_not_5"] : answers["q_why_not_5"] ?? ""}
              onChange={(e) => handleChange("q_why_not_5", e.target.value)}
              onBlur={() => handleBlurText("q_why_not_5", CORRECT["q_why_not_5"], true)}
              disabled={isRevealed}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors ${inputClass(
                "q_why_not_5"
              )}`}
            />
            {badge("q_why_not_5")}
          </div>
          {isRevealed && (
            <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
              <strong>Answer:</strong> {REVEAL_TEXT["q_why_not_5"]}
            </div>
          )}
        </div>

        {/* Question 2: List all factors of 16 */}
        <div className="space-y-2 pt-2 border-t border-border">
          <label className="block text-sm sm:text-base font-medium">
            <strong>2.</strong> List all factors of <strong>16</strong> (separated by commas):
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. 1, 2, 4, 8, 16"
              value={isRevealed ? REVEAL_TEXT["q_try_factor_16"] : answers["q_try_factor_16"] ?? ""}
              onChange={(e) => handleChange("q_try_factor_16", e.target.value)}
              onBlur={() => handleBlurText("q_try_factor_16", CORRECT["q_try_factor_16"])}
              disabled={isRevealed}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors ${inputClass(
                "q_try_factor_16"
              )}`}
            />
            {badge("q_try_factor_16")}
          </div>
          {isRevealed && (
            <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
              <strong>Answer:</strong> {REVEAL_TEXT["q_try_factor_16"]}
            </div>
          )}
        </div>

        {/* Question 3: Factors of 19 */}
        <div className="space-y-2 pt-2 border-t border-border">
          <label className="block text-sm sm:text-base font-medium">
            <strong>3.</strong> List all factors of <strong>19</strong>:
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. 1, 19"
              value={isRevealed ? REVEAL_TEXT["q_factors_of_19"] : answers["q_factors_of_19"] ?? ""}
              onChange={(e) => handleChange("q_factors_of_19", e.target.value)}
              onBlur={() => handleBlurText("q_factors_of_19", CORRECT["q_factors_of_19"])}
              disabled={isRevealed}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors ${inputClass(
                "q_factors_of_19"
              )}`}
            />
            {badge("q_factors_of_19")}
          </div>
          {isRevealed && (
            <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
              <strong>Answer:</strong> {REVEAL_TEXT["q_factors_of_19"]}
            </div>
          )}
        </div>
      </div>

      {/* Observation Table */}
      <div className="space-y-4">
        <h4 className="font-heading font-bold text-lg text-foreground">
          Observe the following table:
        </h4>

        <div className="overflow-x-auto rounded-2xl border-2 border-teal-500/30 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-teal-700 text-white font-heading text-sm sm:text-base">
                <th className="py-3 px-4 sm:px-6 border-b border-teal-600 w-1/3">
                  Number
                </th>
                <th className="py-3 px-4 sm:px-6 border-b border-teal-600">
                  Factors
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card text-sm sm:text-base">
              {FACTORS_TABLE.map((row, idx) => (
                <tr
                  key={row.number}
                  className={`hover:bg-muted/40 transition-colors ${
                    idx % 2 === 0 ? "bg-muted/10" : ""
                  }`}
                >
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-teal-800 dark:text-teal-300">
                    {row.number}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono text-foreground font-semibold">
                    {row.factors}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm sm:text-base text-foreground/70 italic">
          From the above table we can notice that every number has 1 and itself as factors, and every factor is less than or equal to the given number.
        </p>
      </div>
    </div>
  );
}

