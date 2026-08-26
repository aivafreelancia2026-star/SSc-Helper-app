"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

const ALL_INPUT_IDS = [
  // DO THIS
  "q_dothis_div_28",
  "q_dothis_div_36",
  "q_dothis_tree_42",
  // EXERCISE 3.3 Q1 (i)
  "q_tree_i_10_left",
  "q_tree_i_10_right",
  "q_tree_i_9_left",
  "q_tree_i_9_right",
  // EXERCISE 3.3 Q1 (ii)
  "q_tree_ii_top_right",
  "q_tree_ii_10_left",
  "q_tree_ii_10_right",
];

const CORRECT: Record<string, string[]> = {
  // DO THIS 1: 28 = 2 x 2 x 7
  q_dothis_div_28: [
    "2x2x7",
    "2*2*7",
    "2×2×7",
    "2,2,7",
    "2, 2, 7",
    "2*2*7=28",
    "2x2x7=28",
  ],
  // DO THIS 1: 36 = 2 x 2 x 3 x 3
  q_dothis_div_36: [
    "2x2x3x3",
    "2*2*3*3",
    "2×2×3×3",
    "2,2,3,3",
    "2, 2, 3, 3",
    "2*2*3*3=36",
    "2x2x3x3=36",
  ],
  // DO THIS 2: 42 = 2 x 3 x 7
  q_dothis_tree_42: [
    "2x3x7",
    "2*3*7",
    "2×3×7",
    "2,3,7",
    "2, 3, 7",
    "2*3*7=42",
    "2x3x7=42",
  ],
  // Exercise 3.3 Q1 (i): 90 -> 10 and 9; 10 -> 2 and 5; 9 -> 3 and 3
  q_tree_i_10_left: ["2", "5"],
  q_tree_i_10_right: ["5", "2"],
  q_tree_i_9_left: ["3"],
  q_tree_i_9_right: ["3"],
  // Exercise 3.3 Q1 (ii): 90 -> 30 and ? -> 3; 30 -> 10 and ? -> 3; 10 -> ? and ? -> 2 and 5
  q_tree_ii_top_right: ["3"],
  q_tree_ii_10_left: ["2", "5"],
  q_tree_ii_10_right: ["5", "2"],
};

const REVEAL_TEXT: Record<string, string> = {
  q_dothis_div_28: "2 × 2 × 7",
  q_dothis_div_36: "2 × 2 × 3 × 3",
  q_dothis_tree_42: "2 × 3 × 7",
  q_tree_i_10_left: "2",
  q_tree_i_10_right: "5",
  q_tree_i_9_left: "3",
  q_tree_i_9_right: "3",
  q_tree_ii_top_right: "3",
  q_tree_ii_10_left: "2",
  q_tree_ii_10_right: "5",
};

export function C6MathsCh3Page9() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page9";

  const [activeMethod, setActiveMethod] = useState<"division" | "tree">("division");
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

      {/* Chapter Section Badge & Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-primary/20 pb-4">
        <div className="inline-flex items-center justify-center bg-teal-600 text-white font-heading font-bold text-lg px-3.5 py-1.5 rounded-lg shadow-sm w-fit">
          3.5
        </div>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-teal-800 dark:text-teal-300">
          PRIME FACTORIZATION
        </h2>
      </div>

      {/* Concept Introduction */}
      <div className="rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/40 p-5 space-y-3">
        <p className="text-base sm:text-lg">
          When a number is expressed as a product of its factors, we say that the number has been factorized. The process of finding the factors is called <strong>factorization</strong>.
        </p>
        <p className="text-sm sm:text-base text-foreground/80">
          There may be several ways in which a number can be factorized. For example, the number <strong>24</strong> can be factorized as:
        </p>
      </div>

      {/* 24 Factorization Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border space-y-1">
          <span className="text-xs font-bold text-muted-foreground block">i)</span>
          <span className="font-mono font-bold text-sm sm:text-base">24 = 1 × 24</span>
        </div>
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border space-y-1">
          <span className="text-xs font-bold text-muted-foreground block">ii)</span>
          <span className="font-mono font-bold text-sm sm:text-base">24 = 2 × 12</span>
        </div>
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border space-y-1">
          <span className="text-xs font-bold text-muted-foreground block">iii)</span>
          <span className="font-mono font-bold text-sm sm:text-base">24 = 3 × 8</span>
        </div>
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border space-y-1">
          <span className="text-xs font-bold text-muted-foreground block">iv)</span>
          <span className="font-mono font-bold text-sm sm:text-base">24 = 4 × 6</span>
        </div>
        <div className="p-3.5 bg-teal-100/60 dark:bg-teal-950/60 rounded-xl border-2 border-teal-500 space-y-1 col-span-2 sm:col-span-1 shadow-sm">
          <span className="text-xs font-bold text-teal-700 dark:text-teal-300 block">v) Prime Form!</span>
          <span className="font-mono font-bold text-sm sm:text-base text-teal-900 dark:text-teal-200">
            24 = 2 × 2 × 2 × 3
          </span>
        </div>
      </div>

      {/* Analysis Note */}
      <div className="rounded-2xl bg-card border border-border p-5 space-y-3 text-sm sm:text-base">
        <p>
          In (ii) and (iii) one factor is prime, and the other factor is a composite number. In (iv) both the factors are composite numbers. In (i) one factor is composite.
        </p>
        <p className="font-semibold text-teal-800 dark:text-teal-300">
          However in (v) all the factors are <strong>prime numbers</strong>.
        </p>
        <blockquote className="border-l-4 border-teal-500 pl-4 py-1 italic font-heading text-base sm:text-lg text-foreground font-semibold">
          &ldquo;Factorization of the type (v), where all the factors are prime numbers, is known as <span className="text-teal-600 dark:text-teal-400 underline">prime factorization</span>.&rdquo;
        </blockquote>
        <p className="text-xs sm:text-sm text-muted-foreground italic">
          Thus, in prime factorization, the factors obtained cannot be further factorized.
        </p>
      </div>

      {/* SECTION 3.5.1 METHODS OF PRIME FACTORIZATION */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-primary/20 pb-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center bg-teal-600 text-white font-heading font-bold text-sm sm:text-base px-3 py-1 rounded-lg shadow-sm w-fit">
              3.5.1
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-teal-800 dark:text-teal-300">
              Methods of Prime Factorization
            </h3>
          </div>

          {/* Toggle between Division and Tree method */}
          <div className="flex gap-2 bg-muted p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveMethod("division")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMethod === "division"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-foreground hover:text-primary"
              }`}
            >
              1. Division Method
            </button>
            <button
              onClick={() => setActiveMethod("tree")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMethod === "tree"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-foreground hover:text-primary"
              }`}
            >
              2. Factor Tree Method
            </button>
          </div>
        </div>

        {/* Method 1: Division Method Display */}
        <div
          className={`rounded-2xl border-2 transition-all p-5 space-y-4 ${
            activeMethod === "division"
              ? "border-teal-500/50 bg-card shadow-sm"
              : "border-border bg-muted/20"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
              1
            </span>
            <h4 className="font-heading font-bold text-lg text-foreground">
              Division Method (Prime factorisation of 42)
            </h4>
          </div>

          <p className="text-sm sm:text-base">
            Start dividing by the least prime factor. Continue division till the resulting number to be divided is <strong>1</strong>.
          </p>

          {/* Division Ladder Graphic */}
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 p-5 bg-teal-50/50 dark:bg-teal-950/20 rounded-xl border border-teal-200 dark:border-teal-800/40">
            <div className="font-mono text-base sm:text-lg border-2 border-teal-600 rounded-xl p-4 bg-background shadow-xs">
              <div className="flex items-center border-b border-border py-1">
                <span className="text-teal-700 dark:text-teal-300 font-bold w-10 border-r border-border pr-2 text-right">2</span>
                <span className="pl-4 font-bold">42</span>
              </div>
              <div className="flex items-center border-b border-border py-1">
                <span className="text-teal-700 dark:text-teal-300 font-bold w-10 border-r border-border pr-2 text-right">3</span>
                <span className="pl-4 font-bold">21</span>
              </div>
              <div className="flex items-center border-b border-border py-1">
                <span className="text-teal-700 dark:text-teal-300 font-bold w-10 border-r border-border pr-2 text-right">7</span>
                <span className="pl-4 font-bold">7</span>
              </div>
              <div className="flex items-center py-1">
                <span className="w-10 border-r border-transparent pr-2"></span>
                <span className="pl-4 font-bold text-primary">1</span>
              </div>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Resulting Product
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-teal-800 dark:text-teal-300">
                42 = 2 × 3 × 7
              </div>
              <p className="text-xs text-muted-foreground">
                All divisors (2, 3, 7) on the left are prime numbers.
              </p>
            </div>
          </div>
        </div>

        {/* Method 2: Factor Tree Method Display */}
        <div
          className={`rounded-2xl border-2 transition-all p-5 space-y-4 ${
            activeMethod === "tree"
              ? "border-teal-500/50 bg-card shadow-sm"
              : "border-border bg-muted/20"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
              2
            </span>
            <h4 className="font-heading font-bold text-lg text-foreground">
              Factor Tree Method (Prime factorisation of 60)
            </h4>
          </div>

          <div className="space-y-1 text-xs sm:text-sm text-foreground/80 pl-2">
            <p><strong>Step-1:</strong> Express 60 as a product of two numbers (4 × 15).</p>
            <p><strong>Step-2:</strong> Factorise 4 and 15 further, since they are composite numbers (4 = 2 × 2, 15 = 3 × 5).</p>
            <p><strong>Step-3:</strong> Continue till all the factors are prime numbers (2, 2, 3, 5).</p>
          </div>

          {/* Factor Tree Interactive Diagram for 60 */}
          <div className="flex flex-col items-center p-6 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/40">
            {/* Top Node */}
            <div className="w-12 h-12 rounded-full bg-primary text-on-primary font-mono font-bold text-lg flex items-center justify-center shadow-md">
              60
            </div>

            {/* Level 1 Branches */}
            <div className="w-36 h-6 border-t-2 border-l-2 border-r-2 border-primary/50 mt-1"></div>

            {/* Level 1 Nodes */}
            <div className="flex justify-between w-48 -mt-1">
              <div className="w-10 h-10 rounded-full bg-indigo-500 text-white font-mono font-bold text-sm flex items-center justify-center shadow-sm">
                4
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-500 text-white font-mono font-bold text-sm flex items-center justify-center shadow-sm">
                15
              </div>
            </div>

            {/* Level 2 Branches */}
            <div className="flex justify-between w-64 mt-1 px-3">
              <div className="w-20 h-6 border-t-2 border-l-2 border-r-2 border-indigo-400"></div>
              <div className="w-20 h-6 border-t-2 border-l-2 border-r-2 border-indigo-400"></div>
            </div>

            {/* Level 2 Leaves (Primes) */}
            <div className="flex justify-between w-72 -mt-1 px-1">
              <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-mono font-bold text-sm flex items-center justify-center shadow-xs">
                2
              </div>
              <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-mono font-bold text-sm flex items-center justify-center shadow-xs">
                2
              </div>
              <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-mono font-bold text-sm flex items-center justify-center shadow-xs">
                3
              </div>
              <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-mono font-bold text-sm flex items-center justify-center shadow-xs">
                5
              </div>
            </div>

            <div className="font-mono text-lg font-bold text-teal-800 dark:text-teal-300 mt-4">
              Prime factorisation of 60 = 2 × 2 × 3 × 5
            </div>
          </div>
        </div>
      </div>

      {/* DO THIS SECTION */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-emerald-700 text-white font-heading font-bold px-5 py-3 text-lg tracking-wide flex items-center gap-2">
          <span>✏️</span> DO THIS
        </div>

        <div className="p-5 space-y-5">
          {/* Q1: Prime factors through division method */}
          <div className="space-y-3">
            <label className="block text-sm sm:text-base font-semibold">
              1. Write the prime factors of <strong>28</strong> and <strong>36</strong> through division method:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Prime factors of 28:</span>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 2 × 2 × 7"
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_dothis_div_28"]
                        : answers["q_dothis_div_28"] ?? ""
                    }
                    onChange={(e) => handleChange("q_dothis_div_28", e.target.value)}
                    onBlur={() =>
                      handleBlurText(
                        "q_dothis_div_28",
                        CORRECT["q_dothis_div_28"]
                      )
                    }
                    disabled={isRevealed}
                    className={`w-full rounded-xl border px-3.5 py-2 text-sm font-mono outline-none transition-colors ${inputClass(
                      "q_dothis_div_28"
                    )}`}
                  />
                  {badge("q_dothis_div_28")}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Prime factors of 36:</span>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 2 × 2 × 3 × 3"
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_dothis_div_36"]
                        : answers["q_dothis_div_36"] ?? ""
                    }
                    onChange={(e) => handleChange("q_dothis_div_36", e.target.value)}
                    onBlur={() =>
                      handleBlurText(
                        "q_dothis_div_36",
                        CORRECT["q_dothis_div_36"]
                      )
                    }
                    disabled={isRevealed}
                    className={`w-full rounded-xl border px-3.5 py-2 text-sm font-mono outline-none transition-colors ${inputClass(
                      "q_dothis_div_36"
                    )}`}
                  />
                  {badge("q_dothis_div_36")}
                </div>
              </div>
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> 28 = {REVEAL_TEXT["q_dothis_div_28"]} | 36 = {REVEAL_TEXT["q_dothis_div_36"]}
              </div>
            )}
          </div>

          {/* Q2: Prime factors through factor tree */}
          <div className="space-y-2 pt-3 border-t border-border">
            <label className="block text-sm sm:text-base font-semibold">
              2. Write the prime factors of <strong>42</strong> by factor tree method:
            </label>
            <div className="relative max-w-sm">
              <input
                type="text"
                placeholder="e.g. 2 × 3 × 7"
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_dothis_tree_42"]
                    : answers["q_dothis_tree_42"] ?? ""
                }
                onChange={(e) => handleChange("q_dothis_tree_42", e.target.value)}
                onBlur={() =>
                  handleBlurText(
                    "q_dothis_tree_42",
                    CORRECT["q_dothis_tree_42"]
                  )
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2 text-sm font-mono outline-none transition-colors ${inputClass(
                  "q_dothis_tree_42"
                )}`}
              />
              {badge("q_dothis_tree_42")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> 42 = {REVEAL_TEXT["q_dothis_tree_42"]}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EXERCISE 3.3 SECTION */}
      <div className="rounded-2xl border-2 border-teal-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-teal-700 text-white font-heading font-bold px-5 py-3.5 text-lg tracking-wide flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>📝</span> Exercise - 3.3 (Question 1)
          </div>
          <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-mono">
            Factor Trees for 90
          </span>
        </div>

        <div className="p-5 space-y-8">
          <h4 className="font-heading font-bold text-base sm:text-lg text-foreground">
            1. Write the missing numbers in the factor tree for 90?
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tree i: 90 = 10 * 9 */}
            <div className="rounded-xl border border-border p-5 bg-muted/20 flex flex-col items-center space-y-3">
              <span className="font-bold text-sm text-primary">i. Tree via (10 × 9):</span>

              {/* Diagram */}
              <div className="flex flex-col items-center py-2">
                <div className="w-12 h-12 rounded-full bg-primary text-on-primary font-mono font-bold text-base flex items-center justify-center shadow-sm">
                  90
                </div>

                <div className="w-32 h-5 border-t-2 border-l-2 border-r-2 border-primary/50 mt-1"></div>

                <div className="flex justify-between w-44 -mt-1">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 text-white font-mono font-bold text-sm flex items-center justify-center">
                    10
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-500 text-white font-mono font-bold text-sm flex items-center justify-center">
                    9
                  </div>
                </div>

                <div className="flex justify-between w-56 mt-1 px-2">
                  <div className="w-16 h-5 border-t-2 border-l-2 border-r-2 border-indigo-400"></div>
                  <div className="w-16 h-5 border-t-2 border-l-2 border-r-2 border-indigo-400"></div>
                </div>

                {/* Input Circles */}
                <div className="flex justify-between w-64 -mt-1 px-1">
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="?"
                      value={
                        isRevealed
                          ? REVEAL_TEXT["q_tree_i_10_left"]
                          : answers["q_tree_i_10_left"] ?? ""
                      }
                      onChange={(e) =>
                        handleChange("q_tree_i_10_left", e.target.value)
                      }
                      onBlur={() =>
                        handleBlurText(
                          "q_tree_i_10_left",
                          CORRECT["q_tree_i_10_left"]
                        )
                      }
                      disabled={isRevealed}
                      className={`w-9 h-9 rounded-full text-center font-mono font-bold text-sm border-2 outline-none shadow-xs ${inputClass(
                        "q_tree_i_10_left"
                      )}`}
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="?"
                      value={
                        isRevealed
                          ? REVEAL_TEXT["q_tree_i_10_right"]
                          : answers["q_tree_i_10_right"] ?? ""
                      }
                      onChange={(e) =>
                        handleChange("q_tree_i_10_right", e.target.value)
                      }
                      onBlur={() =>
                        handleBlurText(
                          "q_tree_i_10_right",
                          CORRECT["q_tree_i_10_right"]
                        )
                      }
                      disabled={isRevealed}
                      className={`w-9 h-9 rounded-full text-center font-mono font-bold text-sm border-2 outline-none shadow-xs ${inputClass(
                        "q_tree_i_10_right"
                      )}`}
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="?"
                      value={
                        isRevealed
                          ? REVEAL_TEXT["q_tree_i_9_left"]
                          : answers["q_tree_i_9_left"] ?? ""
                      }
                      onChange={(e) =>
                        handleChange("q_tree_i_9_left", e.target.value)
                      }
                      onBlur={() =>
                        handleBlurText(
                          "q_tree_i_9_left",
                          CORRECT["q_tree_i_9_left"]
                        )
                      }
                      disabled={isRevealed}
                      className={`w-9 h-9 rounded-full text-center font-mono font-bold text-sm border-2 outline-none shadow-xs ${inputClass(
                        "q_tree_i_9_left"
                      )}`}
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="?"
                      value={
                        isRevealed
                          ? REVEAL_TEXT["q_tree_i_9_right"]
                          : answers["q_tree_i_9_right"] ?? ""
                      }
                      onChange={(e) =>
                        handleChange("q_tree_i_9_right", e.target.value)
                      }
                      onBlur={() =>
                        handleBlurText(
                          "q_tree_i_9_right",
                          CORRECT["q_tree_i_9_right"]
                        )
                      }
                      disabled={isRevealed}
                      className={`w-9 h-9 rounded-full text-center font-mono font-bold text-sm border-2 outline-none shadow-xs ${inputClass(
                        "q_tree_i_9_right"
                      )}`}
                    />
                  </div>
                </div>
              </div>

              {isRevealed && (
                <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 w-full text-center">
                  <strong>Missing factors for (i):</strong> 10 splits into <strong>2</strong> and <strong>5</strong>; 9 splits into <strong>3</strong> and <strong>3</strong>.
                </div>
              )}
            </div>

            {/* Tree ii: 90 = 30 * ? */}
            <div className="rounded-xl border border-border p-5 bg-muted/20 flex flex-col items-center space-y-3">
              <span className="font-bold text-sm text-primary">ii. Tree via (30 × ?):</span>

              {/* Diagram */}
              <div className="flex flex-col items-center py-2">
                <div className="w-12 h-12 rounded-full bg-primary text-on-primary font-mono font-bold text-base flex items-center justify-center shadow-sm">
                  90
                </div>

                <div className="w-32 h-5 border-t-2 border-l-2 border-r-2 border-primary/50 mt-1"></div>

                <div className="flex justify-between w-44 -mt-1">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 text-white font-mono font-bold text-sm flex items-center justify-center">
                    30
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="?"
                      value={
                        isRevealed
                          ? REVEAL_TEXT["q_tree_ii_top_right"]
                          : answers["q_tree_ii_top_right"] ?? ""
                      }
                      onChange={(e) =>
                        handleChange("q_tree_ii_top_right", e.target.value)
                      }
                      onBlur={() =>
                        handleBlurText(
                          "q_tree_ii_top_right",
                          CORRECT["q_tree_ii_top_right"]
                        )
                      }
                      disabled={isRevealed}
                      className={`w-10 h-10 rounded-full text-center font-mono font-bold text-sm border-2 outline-none shadow-xs ${inputClass(
                        "q_tree_ii_top_right"
                      )}`}
                    />
                  </div>
                </div>

                {/* Branch for 30 */}
                <div className="w-20 h-5 border-t-2 border-l-2 border-r-2 border-indigo-400 mr-24 mt-1"></div>

                <div className="flex justify-between w-32 -mt-1 mr-24">
                  <div className="w-9 h-9 rounded-full bg-indigo-500 text-white font-mono font-bold text-xs flex items-center justify-center">
                    10
                  </div>
                  <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                    3
                  </div>
                </div>

                {/* Branch for 10 */}
                <div className="w-16 h-5 border-t-2 border-l-2 border-r-2 border-indigo-400 mr-36 mt-1"></div>

                <div className="flex justify-between w-24 -mt-1 mr-36">
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="?"
                      value={
                        isRevealed
                          ? REVEAL_TEXT["q_tree_ii_10_left"]
                          : answers["q_tree_ii_10_left"] ?? ""
                      }
                      onChange={(e) =>
                        handleChange("q_tree_ii_10_left", e.target.value)
                      }
                      onBlur={() =>
                        handleBlurText(
                          "q_tree_ii_10_left",
                          CORRECT["q_tree_ii_10_left"]
                        )
                      }
                      disabled={isRevealed}
                      className={`w-8 h-8 rounded-full text-center font-mono font-bold text-xs border-2 outline-none shadow-xs ${inputClass(
                        "q_tree_ii_10_left"
                      )}`}
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="?"
                      value={
                        isRevealed
                          ? REVEAL_TEXT["q_tree_ii_10_right"]
                          : answers["q_tree_ii_10_right"] ?? ""
                      }
                      onChange={(e) =>
                        handleChange("q_tree_ii_10_right", e.target.value)
                      }
                      onBlur={() =>
                        handleBlurText(
                          "q_tree_ii_10_right",
                          CORRECT["q_tree_ii_10_right"]
                        )
                      }
                      disabled={isRevealed}
                      className={`w-8 h-8 rounded-full text-center font-mono font-bold text-xs border-2 outline-none shadow-xs ${inputClass(
                        "q_tree_ii_10_right"
                      )}`}
                    />
                  </div>
                </div>
              </div>

              {isRevealed && (
                <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 w-full text-center">
                  <strong>Missing factors for (ii):</strong> 90 = 30 × <strong>3</strong>; 10 splits into <strong>2</strong> and <strong>5</strong>.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
