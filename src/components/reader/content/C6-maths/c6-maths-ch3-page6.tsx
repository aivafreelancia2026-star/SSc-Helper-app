"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

const PRIME_COMPOSITE_TABLE = [
  { number: 1, factors: "1", count: "1", type: "Neither" },
  { number: 2, factors: "1, 2", count: "2*", type: "Prime" },
  { number: 3, factors: "1, 3", count: "2*", type: "Prime" },
  { number: 4, factors: "1, 2, 4", count: "3", type: "Composite" },
  { number: 5, factors: "1, 5", count: "2*", type: "Prime" },
  { number: 6, factors: "1, 2, 3, 6", count: "4", type: "Composite" },
  { number: 7, factors: "1, 7", count: "2*", type: "Prime" },
];

const ALL_INPUT_IDS = [
  // DO THIS
  "q_do1_factors_80",
  "q_do2_factors_28",
  "q_do2_verify",
  "q_do3_diff_factor",
  // Table observation
  "q_table_two_factors",
  "q_give_5_composite",
  "q_only_one_factor",
  // TRY THESE
  "q_try1_smallest_prime",
  "q_try2_smallest_composite",
  "q_try3_smallest_odd_composite",
  "q_try4_5_odd_composite",
  "q_try4_5_even_composite",
  "q_try5_is_1_prime",
];

const CORRECT: Record<string, string[]> = {
  // DO THIS
  q_do1_factors_80: ["1,2,4,5,8,10,16,20,40,80", "1, 2, 4, 5, 8, 10, 16, 20, 40, 80"],
  q_do2_factors_28: ["1,2,4,7,14,28", "1, 2, 4, 7, 14, 28"],
  q_do2_verify: ["yes", "y", "yesallfactorsdividetheemberexactly", "yesallfactorsdivideexactly"],
  q_do3_diff_factor: ["yes", "y", "yes3isafactor", "yes24-15=9and3divides9"],
  // Table observation
  q_table_two_factors: ["2,3,5,7", "2, 3, 5, 7", "2,3,5and7", "2, 3, 5 and 7"],
  q_give_5_composite: ["12,14,15,16,18", "12, 14, 15, 16, 18", "composite"],
  q_only_one_factor: ["1", "one"],
  // TRY THESE
  q_try1_smallest_prime: ["2", "two"],
  q_try2_smallest_composite: ["4", "four"],
  q_try3_smallest_odd_composite: ["9", "nine"],
  q_try4_5_odd_composite: ["9,15,21,25,27", "9, 15, 21, 25, 27", "odd"],
  q_try4_5_even_composite: ["4,6,8,10,12", "4, 6, 8, 10, 12", "even"],
  q_try5_is_1_prime: ["neither", "neitherprimenorcomposite", "no1hasonlyonefactor", "no", "neitherprime"],
};

const REVEAL_TEXT: Record<string, string> = {
  q_do1_factors_80: "1, 2, 4, 5, 8, 10, 16, 20, 40, 80",
  q_do2_factors_28: "1, 2, 4, 7, 14, 28",
  q_do2_verify: "Yes, all factors (1, 2, 4, 7, 14, 28) divide 28 leaving a remainder of 0.",
  q_do3_diff_factor: "Yes (24 − 15 = 9, and 9 ÷ 3 = 3 with no remainder, so 3 divides their difference also).",
  q_table_two_factors: "2, 3, 5, 7",
  q_give_5_composite: "12, 14, 15, 16, 18 (any 5 composite numbers > 10)",
  q_only_one_factor: "1 (Number 1 has only one factor: itself)",
  q_try1_smallest_prime: "2",
  q_try2_smallest_composite: "4",
  q_try3_smallest_odd_composite: "9",
  q_try4_5_odd_composite: "9, 15, 21, 25, 27 (odd composites)",
  q_try4_5_even_composite: "4, 6, 8, 10, 12 (even composites)",
  q_try5_is_1_prime: "1 is NEITHER prime nor composite because it has only 1 factor (itself).",
};

export function C6MathsCh3Page6() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page6";

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
        rawTyped.trim().length >= 8;
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

      {/* Properties of Factors Continuation */}
      <div className="rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/40 p-5 space-y-3">
        <h3 className="font-heading font-bold text-lg text-teal-900 dark:text-teal-200 mb-2">
          Key Properties of Factors:
        </h3>
        <ul className="space-y-2 text-sm sm:text-base text-teal-950 dark:text-teal-100 list-none pl-1">
          <li className="flex items-start gap-2">
            <span className="font-bold text-teal-700 dark:text-teal-400 min-w-[28px]">(ii)</span>
            <span>Every number is a factor to itself and it is the <strong>biggest factor</strong> of it.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-teal-700 dark:text-teal-400 min-w-[28px]">(iii)</span>
            <span>Every factor of a number is <strong>less than or equal</strong> to the given number.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-teal-700 dark:text-teal-400 min-w-[28px]">(iv)</span>
            <span>Number of factors of a given number are <strong>countable</strong> (finite).</span>
          </li>
        </ul>
      </div>

      {/* DO THIS SECTION */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-emerald-700 text-white font-heading font-bold px-5 py-3 text-lg tracking-wide flex items-center gap-2">
          <span>✏️</span> DO THIS
        </div>

        <div className="p-5 space-y-6">
          {/* Q1 */}
          <div className="space-y-2">
            <label className="block text-sm sm:text-base font-semibold">
              1. Find the factors of <strong>80</strong>:
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. 1, 2, 4, 5, 8, 10, 16, 20, 40, 80"
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_do1_factors_80"]
                    : answers["q_do1_factors_80"] ?? ""
                }
                onChange={(e) => handleChange("q_do1_factors_80", e.target.value)}
                onBlur={() =>
                  handleBlurText("q_do1_factors_80", CORRECT["q_do1_factors_80"])
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors ${inputClass(
                  "q_do1_factors_80"
                )}`}
              />
              {badge("q_do1_factors_80")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_do1_factors_80"]}
              </div>
            )}
          </div>

          {/* Q2 */}
          <div className="space-y-3 pt-3 border-t border-border">
            <label className="block text-sm sm:text-base font-semibold">
              2. Do all the factors of a given number divide the number exactly? Find the factors of <strong>28</strong> and verify by division.
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Factors of 28:</span>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 1, 2, 4, 7, 14, 28"
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_do2_factors_28"]
                        : answers["q_do2_factors_28"] ?? ""
                    }
                    onChange={(e) => handleChange("q_do2_factors_28", e.target.value)}
                    onBlur={() =>
                      handleBlurText("q_do2_factors_28", CORRECT["q_do2_factors_28"])
                    }
                    disabled={isRevealed}
                    className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                      "q_do2_factors_28"
                    )}`}
                  />
                  {badge("q_do2_factors_28")}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Verification (Do they divide exactly?):</span>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Yes, all leave remainder 0"
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_do2_verify"]
                        : answers["q_do2_verify"] ?? ""
                    }
                    onChange={(e) => handleChange("q_do2_verify", e.target.value)}
                    onBlur={() =>
                      handleBlurText("q_do2_verify", CORRECT["q_do2_verify"], true)
                    }
                    disabled={isRevealed}
                    className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                      "q_do2_verify"
                    )}`}
                  />
                  {badge("q_do2_verify")}
                </div>
              </div>
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_do2_factors_28"]} | {REVEAL_TEXT["q_do2_verify"]}
              </div>
            )}
          </div>

          {/* Q3 */}
          <div className="space-y-2 pt-3 border-t border-border">
            <label className="block text-sm sm:text-base font-semibold">
              3. <strong>3</strong> is a factor of 15 and 24. Is 3 a factor of their difference also?
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Yes, 24 − 15 = 9 and 3 divides 9"
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_do3_diff_factor"]
                    : answers["q_do3_diff_factor"] ?? ""
                }
                onChange={(e) => handleChange("q_do3_diff_factor", e.target.value)}
                onBlur={() =>
                  handleBlurText("q_do3_diff_factor", CORRECT["q_do3_diff_factor"], true)
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors ${inputClass(
                  "q_do3_diff_factor"
                )}`}
              />
              {badge("q_do3_diff_factor")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_do3_diff_factor"]}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 3.4 PRIME AND COMPOSITE NUMBERS */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-primary/20 pb-4 pt-4">
        <div className="inline-flex items-center justify-center bg-teal-600 text-white font-heading font-bold text-lg px-3.5 py-1.5 rounded-lg shadow-sm w-fit">
          3.4
        </div>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-teal-800 dark:text-teal-300">
          PRIME AND COMPOSITE NUMBERS
        </h2>
      </div>

      <p className="text-base text-foreground/80">
        Let us observe the number of factors of a few numbers in the table given below:
      </p>

      {/* Prime / Composite Table */}
      <div className="overflow-x-auto rounded-2xl border-2 border-teal-500/30 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-teal-700 text-white font-heading text-sm sm:text-base">
              <th className="py-3 px-4 sm:px-6 border-b border-teal-600 w-1/4">
                Number
              </th>
              <th className="py-3 px-4 sm:px-6 border-b border-teal-600 w-1/2">
                Factors
              </th>
              <th className="py-3 px-4 sm:px-6 border-b border-teal-600 text-center">
                Number of Factors
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card text-sm sm:text-base">
            {PRIME_COMPOSITE_TABLE.map((row, idx) => (
              <tr
                key={row.number}
                className={`hover:bg-muted/40 transition-colors ${
                  row.count.includes("*")
                    ? "bg-teal-50/50 dark:bg-teal-950/20"
                    : idx % 2 === 0
                    ? "bg-muted/10"
                    : ""
                }`}
              >
                <td className="py-3 px-4 sm:px-6 font-mono font-bold text-teal-800 dark:text-teal-300">
                  {row.number}
                </td>
                <td className="py-3 px-4 sm:px-6 font-mono text-foreground font-semibold">
                  {row.factors}
                </td>
                <td className="py-3 px-4 sm:px-6 font-mono text-center font-bold">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      row.count.includes("*")
                        ? "bg-teal-600 text-white shadow-xs"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {row.count}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Observations & Concepts Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Prime Numbers Card */}
        <div className="rounded-2xl bg-teal-500/10 border-2 border-teal-500/30 p-5 space-y-3">
          <h4 className="font-heading font-bold text-lg text-teal-900 dark:text-teal-200 flex items-center gap-2">
            <span className="p-1 bg-teal-600 text-white rounded-md text-xs font-mono">2*</span>
            Prime Numbers
          </h4>
          <p className="text-sm text-foreground/90">
            There are four numbers <strong>2, 3, 5 and 7</strong> having exactly two factors (shown with *), i.e. <strong>1 and the number itself</strong>.
          </p>
          <div className="p-3 bg-background/80 rounded-xl border border-teal-300 dark:border-teal-800 text-sm font-semibold text-teal-800 dark:text-teal-300">
            &ldquo;Numbers whose only factors are 1 and the number itself are called <strong>prime numbers</strong>.&rdquo;
          </div>
        </div>

        {/* Composite Numbers Card */}
        <div className="rounded-2xl bg-indigo-500/10 border-2 border-indigo-500/30 p-5 space-y-3">
          <h4 className="font-heading font-bold text-lg text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
            <span className="p-1 bg-indigo-600 text-white rounded-md text-xs font-mono">&gt;2</span>
            Composite Numbers
          </h4>
          <p className="text-sm text-foreground/90">
            Numbers having <strong>more than two factors</strong> like 4, 6 and so on are called <strong>composite numbers</strong>.
          </p>
          <div className="p-3 bg-background/80 rounded-xl border border-indigo-300 dark:border-indigo-800 text-sm font-semibold text-indigo-800 dark:text-indigo-300">
            &ldquo;Numbers having more than two factors are called <strong>composite numbers</strong>.&rdquo;
          </div>
        </div>
      </div>

      {/* Middle Interactive Observations */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
        <h4 className="font-heading font-bold text-base text-primary">
          From the table, observe and answer:
        </h4>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            1. Which numbers in the table have <strong>only two factors</strong>?
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. 2, 3, 5, 7"
              value={
                isRevealed
                  ? REVEAL_TEXT["q_table_two_factors"]
                  : answers["q_table_two_factors"] ?? ""
              }
              onChange={(e) => handleChange("q_table_two_factors", e.target.value)}
              onBlur={() =>
                handleBlurText(
                  "q_table_two_factors",
                  CORRECT["q_table_two_factors"]
                )
              }
              disabled={isRevealed}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors ${inputClass(
                "q_table_two_factors"
              )}`}
            />
            {badge("q_table_two_factors")}
          </div>
          {isRevealed && (
            <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
              <strong>Answer:</strong> {REVEAL_TEXT["q_table_two_factors"]}
            </div>
          )}
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <label className="block text-sm font-medium">
            2. Give 5 examples of <strong>composite numbers greater than 10</strong>:
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. 12, 14, 15, 16, 18"
              value={
                isRevealed
                  ? REVEAL_TEXT["q_give_5_composite"]
                  : answers["q_give_5_composite"] ?? ""
              }
              onChange={(e) => handleChange("q_give_5_composite", e.target.value)}
              onBlur={() =>
                handleBlurText(
                  "q_give_5_composite",
                  CORRECT["q_give_5_composite"],
                  true
                )
              }
              disabled={isRevealed}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors ${inputClass(
                "q_give_5_composite"
              )}`}
            />
            {badge("q_give_5_composite")}
          </div>
          {isRevealed && (
            <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
              <strong>Answer:</strong> {REVEAL_TEXT["q_give_5_composite"]}
            </div>
          )}
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <label className="block text-sm font-medium">
            3. Which number has <strong>only one factor</strong>?
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. 1"
              value={
                isRevealed
                  ? REVEAL_TEXT["q_only_one_factor"]
                  : answers["q_only_one_factor"] ?? ""
              }
              onChange={(e) => handleChange("q_only_one_factor", e.target.value)}
              onBlur={() =>
                handleBlurText(
                  "q_only_one_factor",
                  CORRECT["q_only_one_factor"]
                )
              }
              disabled={isRevealed}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors ${inputClass(
                "q_only_one_factor"
              )}`}
            />
            {badge("q_only_one_factor")}
          </div>
          {isRevealed && (
            <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
              <strong>Answer:</strong> {REVEAL_TEXT["q_only_one_factor"]}
            </div>
          )}
        </div>
      </div>

      {/* TRY THESE SECTION */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-emerald-700 text-white font-heading font-bold px-5 py-3 text-lg tracking-wide flex items-center gap-2">
          <span>🧠</span> TRY THESE
        </div>

        <div className="p-5 space-y-5">
          {/* Q1 */}
          <div className="space-y-2">
            <label className="block text-sm sm:text-base font-semibold">
              1. What is the smallest <strong>Prime number</strong>?
            </label>
            <div className="relative max-w-sm">
              <input
                type="text"
                placeholder="Enter number..."
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_try1_smallest_prime"]
                    : answers["q_try1_smallest_prime"] ?? ""
                }
                onChange={(e) => handleChange("q_try1_smallest_prime", e.target.value)}
                onBlur={() =>
                  handleBlurText("q_try1_smallest_prime", CORRECT["q_try1_smallest_prime"])
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors ${inputClass(
                  "q_try1_smallest_prime"
                )}`}
              />
              {badge("q_try1_smallest_prime")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_try1_smallest_prime"]}
              </div>
            )}
          </div>

          {/* Q2 */}
          <div className="space-y-2 pt-3 border-t border-border">
            <label className="block text-sm sm:text-base font-semibold">
              2. What is the smallest <strong>composite number</strong>?
            </label>
            <div className="relative max-w-sm">
              <input
                type="text"
                placeholder="Enter number..."
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_try2_smallest_composite"]
                    : answers["q_try2_smallest_composite"] ?? ""
                }
                onChange={(e) => handleChange("q_try2_smallest_composite", e.target.value)}
                onBlur={() =>
                  handleBlurText("q_try2_smallest_composite", CORRECT["q_try2_smallest_composite"])
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors ${inputClass(
                  "q_try2_smallest_composite"
                )}`}
              />
              {badge("q_try2_smallest_composite")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_try2_smallest_composite"]}
              </div>
            )}
          </div>

          {/* Q3 */}
          <div className="space-y-2 pt-3 border-t border-border">
            <label className="block text-sm sm:text-base font-semibold">
              3. What is the smallest <strong>odd composite number</strong>?
            </label>
            <div className="relative max-w-sm">
              <input
                type="text"
                placeholder="Enter number..."
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_try3_smallest_odd_composite"]
                    : answers["q_try3_smallest_odd_composite"] ?? ""
                }
                onChange={(e) =>
                  handleChange("q_try3_smallest_odd_composite", e.target.value)
                }
                onBlur={() =>
                  handleBlurText(
                    "q_try3_smallest_odd_composite",
                    CORRECT["q_try3_smallest_odd_composite"]
                  )
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors ${inputClass(
                  "q_try3_smallest_odd_composite"
                )}`}
              />
              {badge("q_try3_smallest_odd_composite")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_try3_smallest_odd_composite"]}
              </div>
            )}
          </div>

          {/* Q4 */}
          <div className="space-y-3 pt-3 border-t border-border">
            <label className="block text-sm sm:text-base font-semibold">
              4. Give 5 odd and 5 even composite numbers:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">5 Odd Composite Numbers:</span>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 9, 15, 21, 25, 27"
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_try4_5_odd_composite"]
                        : answers["q_try4_5_odd_composite"] ?? ""
                    }
                    onChange={(e) =>
                      handleChange("q_try4_5_odd_composite", e.target.value)
                    }
                    onBlur={() =>
                      handleBlurText(
                        "q_try4_5_odd_composite",
                        CORRECT["q_try4_5_odd_composite"],
                        true
                      )
                    }
                    disabled={isRevealed}
                    className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                      "q_try4_5_odd_composite"
                    )}`}
                  />
                  {badge("q_try4_5_odd_composite")}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">5 Even Composite Numbers:</span>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 4, 6, 8, 10, 12"
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_try4_5_even_composite"]
                        : answers["q_try4_5_even_composite"] ?? ""
                    }
                    onChange={(e) =>
                      handleChange("q_try4_5_even_composite", e.target.value)
                    }
                    onBlur={() =>
                      handleBlurText(
                        "q_try4_5_even_composite",
                        CORRECT["q_try4_5_even_composite"],
                        true
                      )
                    }
                    disabled={isRevealed}
                    className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                      "q_try4_5_even_composite"
                    )}`}
                  />
                  {badge("q_try4_5_even_composite")}
                </div>
              </div>
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> Odd: {REVEAL_TEXT["q_try4_5_odd_composite"]} | Even: {REVEAL_TEXT["q_try4_5_even_composite"]}
              </div>
            )}
          </div>

          {/* Q5 */}
          <div className="space-y-2 pt-3 border-t border-border">
            <label className="block text-sm sm:text-base font-semibold">
              5. Is <strong>1</strong> prime or composite? State reasons.
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Neither, because 1 has only 1 factor (itself)"
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_try5_is_1_prime"]
                    : answers["q_try5_is_1_prime"] ?? ""
                }
                onChange={(e) => handleChange("q_try5_is_1_prime", e.target.value)}
                onBlur={() =>
                  handleBlurText("q_try5_is_1_prime", CORRECT["q_try5_is_1_prime"], true)
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors ${inputClass(
                  "q_try5_is_1_prime"
                )}`}
              />
              {badge("q_try5_is_1_prime")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_try5_is_1_prime"]}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
