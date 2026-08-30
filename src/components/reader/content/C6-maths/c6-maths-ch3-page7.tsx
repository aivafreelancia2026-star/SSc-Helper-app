"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

const PRIMES_UNDER_100 = new Set([
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97,
]);

const ALL_INPUT_IDS = [
  "q_try1_reverse_prime",
  "q_try2_rearrange_311",
  "q_coprime_pair1",
  "q_coprime_pair2",
];

// Helper to check if two positive integers are co-prime (gcd === 1)
function gcd(a: number, b: number): number {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function checkCoprimeInput(str: string): boolean {
  const nums = str.match(/\d+/g);
  if (!nums || nums.length < 2) return false;
  const n1 = parseInt(nums[0], 10);
  const n2 = parseInt(nums[1], 10);
  if (isNaN(n1) || isNaN(n2) || n1 <= 0 || n2 <= 0 || n1 === n2) return false;
  return gcd(n1, n2) === 1;
}

const CORRECT: Record<string, string[]> = {
  // Try These 1: 13/31, 17/71, 37/73, 79/97
  q_try1_reverse_prime: [
    "13", "31", "17", "71", "37", "73", "79", "97",
    "13and31", "13,31", "31and13", "31,13",
    "17and71", "17,71", "71and17", "71,17",
    "37and73", "37,73", "73and37", "73,37",
    "79and97", "79,97", "97and79", "97,79",
  ],
  // Try These 2: From 311 (digits 1, 1, 3) -> 113 and 131
  q_try2_rearrange_311: [
    "113and131",
    "113,131",
    "131and113",
    "131,113",
    "113, 131",
    "131, 113",
    "113",
    "131",
  ],
  q_coprime_pair1: ["coprime"],
  q_coprime_pair2: ["coprime"],
};

const REVEAL_TEXT: Record<string, string> = {
  q_try1_reverse_prime: "13 & 31 (also 17 & 71, 37 & 73, 79 & 97)",
  q_try2_rearrange_311: "113 and 131 (both are prime numbers)",
  q_coprime_pair1: "(4, 9) — Factors of 4: 1,2,4; Factors of 9: 1,3,9 (Common factor: 1)",
  q_coprime_pair2: "(8, 15) — Factors of 8: 1,2,4,8; Factors of 15: 1,3,5,15 (Common factor: 1)",
};

export function C6MathsCh3Page7() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page7";

  // Step in Eratosthenes Sieve: 0 = start, 1 = cross 1, 2 = encircle 2 & cross multiples, 3 = encircle 3 & cross multiples, 4 = encircle 5 & cross multiples, 5 = all primes
  const [sieveStep, setSieveStep] = useState<number>(0);
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
      setSieveStep(0);
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
    if (id.startsWith("q_coprime")) {
      correct = checkCoprimeInput(rawTyped);
    } else if (isOpenEnded) {
      const lower = rawTyped.toLowerCase().replace(/[^a-z0-9]/g, "");
      correct =
        correctAnswers.some((ans) => lower.includes(normalize(ans))) ||
        rawTyped.trim().length >= 2;
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

  // Sieve visual state helper
  const getNumberState = (n: number) => {
    if (sieveStep === 0 && !isRevealed) return "normal";
    if (n === 1) return "crossed";

    if (isRevealed || sieveStep >= 5) {
      return PRIMES_UNDER_100.has(n) ? "circled" : "crossed";
    }

    if (sieveStep >= 1 && n === 1) return "crossed";

    if (sieveStep >= 2) {
      if (n === 2) return "circled";
      if (n > 2 && n % 2 === 0) return "crossed";
    }

    if (sieveStep >= 3) {
      if (n === 3) return "circled";
      if (n > 3 && n % 3 === 0) return "crossed";
    }

    if (sieveStep >= 4) {
      if (n === 5) return "circled";
      if (n > 5 && n % 5 === 0) return "crossed";
      if (n === 7) return "circled";
      if (n > 7 && n % 7 === 0) return "crossed";
    }

    return "normal";
  };

  return (
    <div className="space-y-8 text-foreground leading-relaxed font-body">
      {feedback && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* Intro to Sieve of Eratosthenes */}
      <div className="rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/40 p-5 space-y-3">
        <p className="text-base sm:text-lg">
          Without actually checking the factors of a number, we can find prime numbers from <strong>1 to 100</strong> with an easy method. This method was given by the Greek Mathematician <strong>Eratosthenes</strong> in the third century BC.
        </p>
        <p className="text-sm sm:text-base text-foreground/80">
          Let us see the method. List all the numbers from <strong>1 to 100</strong>, as shown below:
        </p>
      </div>

      {/* Interactive Sieve Grid Container */}
      <div className="rounded-2xl border-2 border-primary/20 bg-card p-5 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
              <span>🔍</span> Sieve of Eratosthenes (1 to 100)
            </h3>
            <p className="text-xs sm:text-sm text-foreground/70">
              Interactive Stepper: Follow steps 1 to 5 to reveal all prime and composite numbers!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSieveStep((prev) => Math.max(0, prev - 1))}
              disabled={sieveStep === 0}
              className="px-3 py-1.5 rounded-lg border border-border bg-muted hover:bg-muted/80 disabled:opacity-40 text-xs font-semibold"
            >
              ◀ Prev Step
            </button>
            <span className="text-xs font-bold font-mono px-2 py-1 bg-primary/10 rounded-md text-primary">
              Step {sieveStep} / 5
            </span>
            <button
              onClick={() => setSieveStep((prev) => Math.min(5, prev + 1))}
              disabled={sieveStep === 5}
              className="px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:opacity-90 disabled:opacity-40 text-xs font-semibold"
            >
              Next Step ▶
            </button>
            <button
              onClick={() => setSieveStep(5)}
              className="px-3 py-1.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 text-xs font-semibold shadow-xs"
            >
              Show All Primes ✨
            </button>
          </div>
        </div>

        {/* 10x10 Number Grid */}
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-cols-10 gap-1.5 sm:gap-2 min-w-[340px] max-w-2xl mx-auto p-3 bg-muted/20 rounded-xl border border-border">
            {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => {
              const state = getNumberState(num);
              let stateStyles = "bg-background text-foreground border-border";

              if (state === "crossed") {
                stateStyles =
                  "bg-red-50 dark:bg-red-950/30 text-red-400 dark:text-red-500 line-through border-red-200 dark:border-red-900/50 opacity-70";
              } else if (state === "circled") {
                stateStyles =
                  "bg-teal-500 text-white font-bold border-teal-600 scale-105 shadow-sm ring-2 ring-teal-300 dark:ring-teal-700";
              }

              return (
                <div
                  key={num}
                  className={`relative aspect-square flex items-center justify-center text-xs sm:text-sm font-mono font-semibold rounded-lg border transition-all duration-300 ${stateStyles}`}
                  title={`Number ${num}${
                    PRIMES_UNDER_100.has(num)
                      ? " (Prime)"
                      : num === 1
                      ? " (Neither)"
                      : " (Composite)"
                  }`}
                >
                  {num}
                  {state === "circled" && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-300"></span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Guide Explanations */}
        <div className="rounded-xl bg-muted/40 p-4 border border-border space-y-2 text-xs sm:text-sm">
          <div
            className={`p-2 rounded-lg transition-colors ${
              sieveStep === 1
                ? "bg-primary/10 border-l-4 border-primary font-semibold"
                : ""
            }`}
          >
            <strong>Step-1:</strong> Cross out <strong>1</strong> because it is neither prime nor composite.
          </div>
          <div
            className={`p-2 rounded-lg transition-colors ${
              sieveStep === 2
                ? "bg-primary/10 border-l-4 border-primary font-semibold"
                : ""
            }`}
          >
            <strong>Step-2:</strong> Encircle <strong>2</strong>, cross out all the other multiples of 2 (i.e. 4, 6, 8 and so on).
          </div>
          <div
            className={`p-2 rounded-lg transition-colors ${
              sieveStep === 3
                ? "bg-primary/10 border-l-4 border-primary font-semibold"
                : ""
            }`}
          >
            <strong>Step-3:</strong> You will find that the next uncrossed number is <strong>3</strong>. Encircle 3 and cross out all the other multiples of 3.
          </div>
          <div
            className={`p-2 rounded-lg transition-colors ${
              sieveStep === 4
                ? "bg-primary/10 border-l-4 border-primary font-semibold"
                : ""
            }`}
          >
            <strong>Step-4:</strong> The next uncrossed number is <strong>5</strong>. Encircle 5 and cross out all the other multiples of 5. Next encircle <strong>7</strong> and cross its multiples.
          </div>
          <div
            className={`p-2 rounded-lg transition-colors ${
              sieveStep >= 5
                ? "bg-teal-50 dark:bg-teal-950/40 border-l-4 border-teal-600 font-semibold"
                : ""
            }`}
          >
            <strong>Step-5:</strong> Continue this process till all the numbers in the list are either encircled or crossed out.
            <div className="mt-1.5 text-teal-800 dark:text-teal-300">
              ✓ All the <strong>encircled numbers (25 total)</strong> are prime numbers! All the crossed out numbers (other than 1) are composite numbers.
            </div>
          </div>
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
              1. Can you guess a prime number which when on reversing its digits, gives another prime number?
            </label>
            <p className="text-xs text-muted-foreground italic">
              (Hint: Take a 2-digit prime number and observe, e.g. 13 ↔ 31, 17 ↔ 71, 37 ↔ 73, 79 ↔ 97)
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. 13 and 31"
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_try1_reverse_prime"]
                    : answers["q_try1_reverse_prime"] ?? ""
                }
                onChange={(e) =>
                  handleChange("q_try1_reverse_prime", e.target.value)
                }
                onBlur={() =>
                  handleBlurText(
                    "q_try1_reverse_prime",
                    CORRECT["q_try1_reverse_prime"]
                  )
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors ${inputClass(
                  "q_try1_reverse_prime"
                )}`}
              />
              {badge("q_try1_reverse_prime")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_try1_reverse_prime"]}
              </div>
            )}
          </div>

          {/* Q2 */}
          <div className="space-y-2 pt-3 border-t border-border">
            <label className="block text-sm sm:text-base font-semibold">
              2. You know <strong>311</strong> is a prime number. Can you find the other two prime numbers just by rearranging the digits?
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. 113 and 131"
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_try2_rearrange_311"]
                    : answers["q_try2_rearrange_311"] ?? ""
                }
                onChange={(e) =>
                  handleChange("q_try2_rearrange_311", e.target.value)
                }
                onBlur={() =>
                  handleBlurText(
                    "q_try2_rearrange_311",
                    CORRECT["q_try2_rearrange_311"]
                  )
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors ${inputClass(
                  "q_try2_rearrange_311"
                )}`}
              />
              {badge("q_try2_rearrange_311")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_try2_rearrange_311"]}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 3.4.1 CO-PRIME OR RELATIVE PRIME */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-primary/20 pb-4">
          <div className="inline-flex items-center justify-center bg-teal-600 text-white font-heading font-bold text-lg px-3 py-1 rounded-lg shadow-sm w-fit">
            3.4.1
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-teal-800 dark:text-teal-300">
            Co-prime or Relative Prime
          </h3>
        </div>

        {/* Observation of 3 and 8 */}
        <div className="rounded-2xl bg-card border border-border p-5 space-y-4 shadow-sm">
          <h4 className="font-heading font-bold text-base text-foreground">
            Observe the numbers 3 and 8:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-muted/40 rounded-xl border border-border space-y-1">
              <span className="font-bold text-primary text-sm">Number 3:</span>
              <p className="text-xs sm:text-sm font-mono">The factors of 3 are <strong>1 and 3</strong></p>
            </div>
            <div className="p-3 bg-muted/40 rounded-xl border border-border space-y-1">
              <span className="font-bold text-primary text-sm">Number 8:</span>
              <p className="text-xs sm:text-sm font-mono">The factors of 8 are <strong>1, 2, 4 and 8</strong></p>
            </div>
          </div>

          <div className="p-3.5 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-800 text-sm font-medium text-teal-900 dark:text-teal-200">
            The common factor for both 3 and 8 is <strong>1 only</strong>.
          </div>

          <blockquote className="border-l-4 border-teal-500 pl-4 py-1 italic text-base text-foreground font-semibold">
            &ldquo;Numbers which have only 1 as the common factor are called <strong>co-primes</strong> or <strong>relatively prime</strong>.&rdquo;
          </blockquote>
        </div>

        {/* Co-prime Practice Inputs */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
          <h4 className="font-heading font-bold text-base text-primary">
            Write two pairs of co-primes, by finding their common factor:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold">
                Pair 1 (e.g. 4, 9 or 2, 3):
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. 4, 9"
                  value={
                    isRevealed
                      ? REVEAL_TEXT["q_coprime_pair1"]
                      : answers["q_coprime_pair1"] ?? ""
                  }
                  onChange={(e) =>
                    handleChange("q_coprime_pair1", e.target.value)
                  }
                  onBlur={() =>
                    handleBlurText(
                      "q_coprime_pair1",
                      CORRECT["q_coprime_pair1"],
                      true
                    )
                  }
                  disabled={isRevealed}
                  className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                    "q_coprime_pair1"
                  )}`}
                />
                {badge("q_coprime_pair1")}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold">
                Pair 2 (e.g. 8, 15 or 5, 7):
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. 8, 15"
                  value={
                    isRevealed
                      ? REVEAL_TEXT["q_coprime_pair2"]
                      : answers["q_coprime_pair2"] ?? ""
                  }
                  onChange={(e) =>
                    handleChange("q_coprime_pair2", e.target.value)
                  }
                  onBlur={() =>
                    handleBlurText(
                      "q_coprime_pair2",
                      CORRECT["q_coprime_pair2"],
                      true
                    )
                  }
                  disabled={isRevealed}
                  className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                    "q_coprime_pair2"
                  )}`}
                />
                {badge("q_coprime_pair2")}
              </div>
            </div>
          </div>

          {isRevealed && (
            <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
              <strong>Sample Co-prime Pairs:</strong> (4, 9), (8, 15), (2, 3), (3, 8), (14, 15) — All have 1 as their only common factor.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
