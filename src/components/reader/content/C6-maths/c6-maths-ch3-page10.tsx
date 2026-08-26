"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

const ALL_INPUT_IDS = [
  // Exercise 3.3 continuation
  "q_ex33_q2_84",
  "q_ex33_q3_greatest_4digit",
  "q_ex33_q4_smallest_4primes",
  // Section 3.6 Common Factors
  "q_common_20_24",
  "q_hcf_12_18",
  // DO THIS
  "q_dothis_hcf_12_16_28",
];

const CORRECT: Record<string, string[]> = {
  // Q2: 84 = 2 x 2 x 3 x 7
  q_ex33_q2_84: [
    "2x2x3x7",
    "2*2*3*7",
    "2×2×3×7",
    "2,2,3,7",
    "2, 2, 3, 7",
    "2*2*3*7=84",
    "2x2x3x7=84",
    "84=2x2x3x7",
    "84=2*2*3*7",
    "84=2×2×3×7",
    "2^2x3x7",
    "2^2*3*7",
  ],
  // Q3: 9999 = 3 x 3 x 11 x 101 (or 9999 = 3*3*11*101)
  q_ex33_q3_greatest_4digit: [
    "9999=3x3x11x101",
    "9999=3*3*11*101",
    "9999=3×3×11×101",
    "3x3x11x101",
    "3*3*11*101",
    "3×3×11×101",
    "3,3,11,101",
    "3, 3, 11, 101",
    "9999",
    "3^2x11x101",
    "3^2*11*101",
  ],
  // Q4: 2 x 3 x 5 x 7 = 210
  q_ex33_q4_smallest_4primes: [
    "210",
    "210(2x3x5x7)",
    "210(2*3*5*7)",
    "2x3x5x7=210",
    "2*3*5*7=210",
    "210because2x3x5x7=210",
    "2x3x5x7",
    "2*3*5*7",
    "2×3×5×7",
  ],
  // Common factors of 20 and 24: 1, 2, 4
  q_common_20_24: [
    "1,2,4",
    "1, 2, 4",
    "1,2and4",
    "1, 2 and 4",
    "1 2 4",
    "1,2,4.",
  ],
  // HCF of 12 and 18: 6
  q_hcf_12_18: ["6", "six", "hcf=6", "6."],
  // DO THIS: HCF of 12, 16, 28 -> 4
  q_dothis_hcf_12_16_28: ["4", "four", "hcf=4", "4."],
};

const REVEAL_TEXT: Record<string, string> = {
  q_ex33_q2_84: "84 = 2 × 2 × 3 × 7",
  q_ex33_q3_greatest_4digit: "9999 = 3 × 3 × 11 × 101 (Greatest 4-digit number is 9999)",
  q_ex33_q4_smallest_4primes: "210 (Smallest 4 distinct primes are 2, 3, 5, 7 → 2 × 3 × 5 × 7 = 210)",
  q_common_20_24: "1, 2, 4 (Factors of 20: 1,2,4,5,10,20; Factors of 24: 1,2,3,4,6,8,12,24)",
  q_hcf_12_18: "6 (Highest common factor among 1, 2, 3, 6)",
  q_dothis_hcf_12_16_28: "4 (12 = 2×2×3, 16 = 2×2×2×2, 28 = 2×2×7 → HCF = 2 × 2 = 4)",
};

export function C6MathsCh3Page10() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page10";

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

  const handleBlurText = (
    id: string,
    correctAnswers: string[],
    isOpenEnded = false
  ) => {
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
      correct =
        correctAnswers.some((ans) => lower.includes(normalize(ans))) ||
        rawTyped.trim().length >= 3;
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
    if (isRevealed)
      return "border-emerald-500 bg-emerald-50 font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300";
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
          isCorrect={feedback.correct}
          points={1}
        />
      )}

      {/* EXERCISE 3.3 CONTINUATION (Questions 2, 3, 4) */}
      <div className="rounded-2xl border-2 border-teal-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-teal-700 text-white font-heading font-bold px-5 py-3.5 text-lg tracking-wide flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>📝</span> Exercise - 3.3 (Questions 2, 3, 4)
          </div>
          <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-mono">
            Prime Factorization Problems
          </span>
        </div>

        <div className="p-5 space-y-5">
          {/* Q2 */}
          <div className="space-y-2">
            <label className="block text-sm sm:text-base font-semibold">
              2. Factorise <strong>84</strong> by division method:
            </label>
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="e.g. 2 × 2 × 3 × 7"
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_ex33_q2_84"]
                    : answers["q_ex33_q2_84"] ?? ""
                }
                onChange={(e) => handleChange("q_ex33_q2_84", e.target.value)}
                onBlur={() =>
                  handleBlurText("q_ex33_q2_84", CORRECT["q_ex33_q2_84"])
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm font-mono outline-none transition-colors ${inputClass(
                  "q_ex33_q2_84"
                )}`}
              />
              {badge("q_ex33_q2_84")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_ex33_q2_84"]}
              </div>
            )}
          </div>

          {/* Q3 */}
          <div className="space-y-2 pt-3 border-t border-border">
            <label className="block text-sm sm:text-base font-semibold">
              3. Write the greatest 4-digit number and express it in the form of its prime factors:
            </label>
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="e.g. 9999 = 3 × 3 × 11 × 101"
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_ex33_q3_greatest_4digit"]
                    : answers["q_ex33_q3_greatest_4digit"] ?? ""
                }
                onChange={(e) =>
                  handleChange("q_ex33_q3_greatest_4digit", e.target.value)
                }
                onBlur={() =>
                  handleBlurText(
                    "q_ex33_q3_greatest_4digit",
                    CORRECT["q_ex33_q3_greatest_4digit"]
                  )
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm font-mono outline-none transition-colors ${inputClass(
                  "q_ex33_q3_greatest_4digit"
                )}`}
              />
              {badge("q_ex33_q3_greatest_4digit")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_ex33_q3_greatest_4digit"]}
              </div>
            )}
          </div>

          {/* Q4 */}
          <div className="space-y-2 pt-3 border-t border-border">
            <label className="block text-sm sm:text-base font-semibold">
              4. I am the smallest number, having four different prime factors. Can you find me? Explain.
            </label>
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="e.g. 210 (2 × 3 × 5 × 7 = 210)"
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_ex33_q4_smallest_4primes"]
                    : answers["q_ex33_q4_smallest_4primes"] ?? ""
                }
                onChange={(e) =>
                  handleChange("q_ex33_q4_smallest_4primes", e.target.value)
                }
                onBlur={() =>
                  handleBlurText(
                    "q_ex33_q4_smallest_4primes",
                    CORRECT["q_ex33_q4_smallest_4primes"],
                    true
                  )
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors ${inputClass(
                  "q_ex33_q4_smallest_4primes"
                )}`}
              />
              {badge("q_ex33_q4_smallest_4primes")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_ex33_q4_smallest_4primes"]}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 3.6 COMMON FACTORS */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-primary/20 pb-3">
          <div className="inline-flex items-center justify-center bg-teal-600 text-white font-heading font-bold text-lg px-3 py-1 rounded-lg shadow-sm w-fit">
            3.6
          </div>
          <h3 className="font-heading text-2xl font-bold tracking-tight text-teal-800 dark:text-teal-300">
            COMMON FACTORS
          </h3>
        </div>

        {/* Observation Table for 12 and 18 */}
        <div className="space-y-3">
          <p className="text-sm sm:text-base text-foreground/80">
            Observe the following table:
          </p>

          <div className="overflow-x-auto rounded-2xl border-2 border-teal-500/30 shadow-sm max-w-lg mx-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-teal-700 text-white font-heading text-sm">
                  <th className="py-2.5 px-4 border-b border-teal-600 w-1/3">Number</th>
                  <th className="py-2.5 px-4 border-b border-teal-600 text-center">12</th>
                  <th className="py-2.5 px-4 border-b border-teal-600 text-center">18</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card text-sm">
                <tr>
                  <td className="py-3 px-4 font-semibold text-muted-foreground">Factors of the number</td>
                  <td className="py-3 px-4 font-mono text-center font-bold text-teal-800 dark:text-teal-300">
                    1, 2, 3, 4, 6, 12
                  </td>
                  <td className="py-3 px-4 font-mono text-center font-bold text-teal-800 dark:text-teal-300">
                    1, 2, 3, 6, 9, 18
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-teal-50/70 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800/40 text-sm sm:text-base space-y-2">
            <p>
              Common factors of 12 and 18 are <strong>1, 2, 3 and 6</strong> (from the table above).
            </p>
            <p className="text-teal-900 dark:text-teal-200 font-semibold italic">
              &ldquo;Common factors are those numbers which are factors of all the given numbers.&rdquo;
            </p>
          </div>
        </div>

        {/* Practice question for common factors of 20 and 24 */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-sm">
          <label className="block text-sm sm:text-base font-semibold">
            Now find the common factors of <strong>20 and 24</strong>:
          </label>
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="e.g. 1, 2, 4"
              value={
                isRevealed
                  ? REVEAL_TEXT["q_common_20_24"]
                  : answers["q_common_20_24"] ?? ""
              }
              onChange={(e) => handleChange("q_common_20_24", e.target.value)}
              onBlur={() =>
                handleBlurText("q_common_20_24", CORRECT["q_common_20_24"])
              }
              disabled={isRevealed}
              className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                "q_common_20_24"
              )}`}
            />
            {badge("q_common_20_24")}
          </div>
          {isRevealed && (
            <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
              <strong>Answer:</strong> {REVEAL_TEXT["q_common_20_24"]}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3.6.1 HIGHEST COMMON FACTOR (HCF) */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-primary/20 pb-3">
          <div className="inline-flex items-center justify-center bg-teal-600 text-white font-heading font-bold text-base px-3 py-1 rounded-lg shadow-sm w-fit">
            3.6.1
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-teal-800 dark:text-teal-300">
            Highest Common Factor (HCF)
          </h3>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-teal-500/10 via-primary/10 to-indigo-500/10 border-2 border-teal-500/30 p-5 space-y-3">
          <p className="text-sm sm:text-base">
            From the table above, the common factors of 12 and 18 are <strong>1, 2, 3 and 6</strong>.
          </p>
          <div className="p-3 bg-background/80 rounded-xl border border-teal-300 dark:border-teal-800 text-base font-bold text-teal-800 dark:text-teal-300 flex items-center justify-between">
            <span>What is the highest of these common factors?</span>
            <span className="text-xl bg-teal-600 text-white px-3 py-0.5 rounded-lg">6</span>
          </div>
          <blockquote className="border-l-4 border-teal-500 pl-4 py-1 italic font-heading text-base sm:text-lg text-foreground font-semibold">
            &ldquo;The <strong>Highest Common Factor (HCF)</strong> of two or more given numbers is the highest (or greatest) of their common factors. It is also called as <strong>Greatest Common Divisor (GCD)</strong>.&rdquo;
          </blockquote>
        </div>
      </div>

      {/* SECTION 3.6.2 METHOD OF FINDING HCF */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-primary/20 pb-3">
          <div className="inline-flex items-center justify-center bg-teal-600 text-white font-heading font-bold text-base px-3 py-1 rounded-lg shadow-sm w-fit">
            3.6.2
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-teal-800 dark:text-teal-300">
            Method of finding HCF: Prime Factorisation Method
          </h3>
        </div>

        {/* Example: HCF of 12, 30, 36 via Prime Factorisation */}
        <div className="rounded-2xl bg-card border border-border p-5 space-y-5 shadow-sm">
          <p className="text-sm sm:text-base font-semibold">
            The HCF of <strong>12, 30 and 36</strong> can also be found by prime factorisation as follows:
          </p>

          {/* Three Division Ladders side-by-side */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 12 Ladder */}
            <div className="font-mono text-sm border-2 border-teal-600 rounded-xl p-3 bg-muted/20 text-center">
              <div className="font-bold text-primary mb-1">For 12</div>
              <div className="flex justify-center border-b border-border py-0.5">
                <span className="text-teal-700 dark:text-teal-300 font-bold pr-2 border-r border-border">2</span>
                <span className="pl-3 font-bold">12</span>
              </div>
              <div className="flex justify-center border-b border-border py-0.5">
                <span className="text-teal-700 dark:text-teal-300 font-bold pr-2 border-r border-border">2</span>
                <span className="pl-3 font-bold">6</span>
              </div>
              <div className="flex justify-center border-b border-border py-0.5">
                <span className="text-teal-700 dark:text-teal-300 font-bold pr-2 border-r border-border">3</span>
                <span className="pl-3 font-bold">3</span>
              </div>
              <div className="flex justify-center py-0.5">
                <span className="pr-2 border-r border-transparent"></span>
                <span className="pl-3 font-bold text-primary">1</span>
              </div>
            </div>

            {/* 30 Ladder */}
            <div className="font-mono text-sm border-2 border-teal-600 rounded-xl p-3 bg-muted/20 text-center">
              <div className="font-bold text-primary mb-1">For 30</div>
              <div className="flex justify-center border-b border-border py-0.5">
                <span className="text-teal-700 dark:text-teal-300 font-bold pr-2 border-r border-border">2</span>
                <span className="pl-3 font-bold">30</span>
              </div>
              <div className="flex justify-center border-b border-border py-0.5">
                <span className="text-teal-700 dark:text-teal-300 font-bold pr-2 border-r border-border">3</span>
                <span className="pl-3 font-bold">15</span>
              </div>
              <div className="flex justify-center border-b border-border py-0.5">
                <span className="text-teal-700 dark:text-teal-300 font-bold pr-2 border-r border-border">5</span>
                <span className="pl-3 font-bold">5</span>
              </div>
              <div className="flex justify-center py-0.5">
                <span className="pr-2 border-r border-transparent"></span>
                <span className="pl-3 font-bold text-primary">1</span>
              </div>
            </div>

            {/* 36 Ladder */}
            <div className="font-mono text-sm border-2 border-teal-600 rounded-xl p-3 bg-muted/20 text-center">
              <div className="font-bold text-primary mb-1">For 36</div>
              <div className="flex justify-center border-b border-border py-0.5">
                <span className="text-teal-700 dark:text-teal-300 font-bold pr-2 border-r border-border">3</span>
                <span className="pl-3 font-bold">36</span>
              </div>
              <div className="flex justify-center border-b border-border py-0.5">
                <span className="text-teal-700 dark:text-teal-300 font-bold pr-2 border-r border-border">3</span>
                <span className="pl-3 font-bold">12</span>
              </div>
              <div className="flex justify-center border-b border-border py-0.5">
                <span className="text-teal-700 dark:text-teal-300 font-bold pr-2 border-r border-border">2</span>
                <span className="pl-3 font-bold">4</span>
              </div>
              <div className="flex justify-center border-b border-border py-0.5">
                <span className="text-teal-700 dark:text-teal-300 font-bold pr-2 border-r border-border">2</span>
                <span className="pl-3 font-bold">2</span>
              </div>
              <div className="flex justify-center py-0.5">
                <span className="pr-2 border-r border-transparent"></span>
                <span className="pl-3 font-bold text-primary">1</span>
              </div>
            </div>
          </div>

          {/* Prime Factor Matching Table with Boxes */}
          <div className="p-4 bg-muted/30 rounded-xl border border-border font-mono text-sm sm:text-base space-y-1.5">
            <div>12 = <span className="bg-teal-500/20 text-teal-800 dark:text-teal-200 px-1.5 py-0.5 rounded font-bold border border-teal-500">2</span> × <span className="bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 px-1.5 py-0.5 rounded font-bold border border-indigo-500">3</span> × 2</div>
            <div>30 = <span className="bg-teal-500/20 text-teal-800 dark:text-teal-200 px-1.5 py-0.5 rounded font-bold border border-teal-500">2</span> × <span className="bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 px-1.5 py-0.5 rounded font-bold border border-indigo-500">3</span> × 5</div>
            <div>36 = <span className="bg-teal-500/20 text-teal-800 dark:text-teal-200 px-1.5 py-0.5 rounded font-bold border border-teal-500">2</span> × <span className="bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 px-1.5 py-0.5 rounded font-bold border border-indigo-500">3</span> × 2 × 3</div>
          </div>

          <div className="p-3 bg-teal-100/60 dark:bg-teal-950/60 rounded-xl border border-teal-300 dark:border-teal-800 text-teal-950 dark:text-teal-100 space-y-1 text-sm sm:text-base">
            <p>The common factor of 12, 30 and 36 is <strong className="font-mono">2 × 3 = 6</strong>.</p>
            <p className="font-bold text-teal-800 dark:text-teal-300">
              Hence, HCF of 12, 30 and 36 is 6.
            </p>
          </div>
        </div>
      </div>

      {/* DO THIS SECTION */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-emerald-700 text-white font-heading font-bold px-5 py-3 text-lg tracking-wide flex items-center gap-2">
          <span>✏️</span> DO THIS
        </div>

        <div className="p-5 space-y-3">
          <label className="block text-sm sm:text-base font-semibold">
            Find the HCF of <strong>12, 16 and 28</strong>:
          </label>
          <div className="relative max-w-sm">
            <input
              type="text"
              placeholder="Enter HCF..."
              value={
                isRevealed
                  ? REVEAL_TEXT["q_dothis_hcf_12_16_28"]
                  : answers["q_dothis_hcf_12_16_28"] ?? ""
              }
              onChange={(e) =>
                handleChange("q_dothis_hcf_12_16_28", e.target.value)
              }
              onBlur={() =>
                handleBlurText(
                  "q_dothis_hcf_12_16_28",
                  CORRECT["q_dothis_hcf_12_16_28"]
                )
              }
              disabled={isRevealed}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm font-mono outline-none transition-colors ${inputClass(
                "q_dothis_hcf_12_16_28"
              )}`}
            />
            {badge("q_dothis_hcf_12_16_28")}
          </div>
          {isRevealed && (
            <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
              <strong>Answer:</strong> {REVEAL_TEXT["q_dothis_hcf_12_16_28"]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
