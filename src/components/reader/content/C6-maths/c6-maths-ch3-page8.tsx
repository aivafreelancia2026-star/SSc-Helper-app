"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

// Helper for checking GCD for co-prime inputs
function gcd(a: number, b: number): number {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function checkCoprimePair(str: string): boolean {
  const nums = str.match(/\d+/g);
  if (!nums || nums.length < 2) return false;
  const n1 = parseInt(nums[0], 10);
  const n2 = parseInt(nums[1], 10);
  if (isNaN(n1) || isNaN(n2) || n1 <= 0 || n2 <= 0 || n1 === n2) return false;
  return gcd(n1, n2) === 1;
}

const ALL_INPUT_IDS = [
  // Discussion
  "q_twin_coprime_discuss",
  // DO THIS
  "q_dothis_coprime_pairs",
  // Exercise 3.2 Q1 Factors
  "q_ex1_i_36",
  "q_ex1_ii_23",
  "q_ex1_iii_96",
  "q_ex1_iv_115",
  // Exercise 3.2 Q2 Co-prime checks
  "q_ex2_i",
  "q_ex2_ii",
  "q_ex2_iii",
  "q_ex2_iv",
  // Exercise 3.2 Q3-Q11
  "q_ex3_greatest_prime_1_20",
  "q_ex4_primes_10_30",
  "q_ex4_composites_10_30",
  "q_ex5_same_digits_primes",
  "q_ex6_twin_primes_under_20",
  "q_ex7_product_35",
  "q_ex8_sum_36",
  "q_ex9_seven_consecutive_composites",
  "q_ex10_sum_53_three_primes",
  "q_ex11_diff_10_primes",
];

const CORRECT: Record<string, string[]> = {
  // Discussion: Are all twin primes relatively prime? Yes, because they are distinct prime numbers, their only common factor is 1.
  q_twin_coprime_discuss: ["yes", "yesalltwinprimesarerelativelyprime", "yescommongactoris1", "yesonlycommonfactoris1"],
  // DO THIS: from 2, 3, 4, 5, 6, 7, 8, 9, 10
  q_dothis_coprime_pairs: ["coprime"],
  // Q1 Factors
  q_ex1_i_36: ["1,2,3,4,6,9,12,18,36", "1, 2, 3, 4, 6, 9, 12, 18, 36"],
  q_ex1_ii_23: ["1,23", "1, 23"],
  q_ex1_iii_96: ["1,2,3,4,6,8,12,16,24,32,48,96", "1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 96"],
  q_ex1_iv_115: ["1,5,23,115", "1, 5, 23, 115"],
  // Q2 Co-prime tests
  // i) 18 & 35: gcd=1 -> Yes (Co-prime)
  q_ex2_i: ["yes", "coprime", "y", "co-prime"],
  // ii) 216 & 215: consecutive -> gcd=1 -> Yes (Co-prime)
  q_ex2_ii: ["yes", "coprime", "y", "co-prime"],
  // iii) 30 & 415: both end in 0/5 -> divisible by 5 -> No (Not co-prime)
  q_ex2_iii: ["no", "notcoprime", "n", "notco-prime"],
  // iv) 17 & 68: 17 * 4 = 68 -> common factor 17 -> No (Not co-prime)
  q_ex2_iv: ["no", "notcoprime", "n", "notco-prime"],
  // Q3: Greatest prime between 1 and 20: 19
  q_ex3_greatest_prime_1_20: ["19"],
  // Q4: Primes 10-30: 11, 13, 17, 19, 23, 29
  q_ex4_primes_10_30: ["11,13,17,19,23,29", "11, 13, 17, 19, 23, 29"],
  // Q4: Composites 10-30: 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28
  q_ex4_composites_10_30: ["12,14,15,16,18,20,21,22,24,25,26,27,28", "12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28"],
  // Q5: 2 more pairs with same digits like (17, 71): (13, 31), (37, 73), (79, 97)
  q_ex5_same_digits_primes: ["13and31,37and73", "13,31and37,73", "37,73and79,97", "13,31,37,73", "13,31,79,97", "37,73,79,97", "13,31", "37,73", "79,97"],
  // Q6: Three pairs of twin primes below 20: (3, 5), (5, 7), (11, 13), (17, 19)
  q_ex6_twin_primes_under_20: ["(3,5),(5,7),(11,13)", "3,5,5,7,11,13", "3,5;5,7;11,13", "3,5,5,7,17,19", "5,7,11,13,17,19"],
  // Q7: Two prime numbers whose product is 35: 5 and 7
  q_ex7_product_35: ["5and7", "5,7", "7and5", "7,5", "5, 7", "7, 5"],
  // Q8: Express 36 as sum of two odd primes: 5 + 31, 7 + 29, 13 + 23, 17 + 19
  q_ex8_sum_36: ["5+31", "7+29", "13+23", "17+19", "5,31", "7,29", "13,23", "17,19", "31+5", "29+7", "23+13", "19+17"],
  // Q9: Seven consecutive composite numbers < 100: 90, 91, 92, 93, 94, 95, 96
  q_ex9_seven_consecutive_composites: ["90,91,92,93,94,95,96", "90, 91, 92, 93, 94, 95, 96"],
  // Q10: Express 53 as sum of three primes: 3 + 7 + 43, 3 + 13 + 37, 3 + 19 + 31, 5 + 7 + 41, 11 + 13 + 29, 13 + 17 + 23, etc.
  q_ex10_sum_53_three_primes: ["3+7+43", "3+13+37", "3+19+31", "5+7+41", "11+13+29", "13+17+23", "3,7,43", "5,7,41", "13,17,23"],
  // Q11: Two primes whose difference is 10: (3, 13), (7, 17), (13, 23), (19, 29), (31, 41), (37, 47), etc.
  q_ex11_diff_10_primes: ["3and13", "3,13", "7and17", "7,17", "13and23", "13,23", "19and29", "19,29", "31and41", "37and47", "3, 13", "7, 17", "13, 23"],
};

const REVEAL_TEXT: Record<string, string> = {
  q_twin_coprime_discuss: "Yes, because twin primes are prime numbers, their only common divisor is 1.",
  q_dothis_coprime_pairs: "Sample Pairs: (2, 3), (3, 4), (4, 5), (5, 6), (7, 8), (8, 9), (9, 10), (3, 8), (4, 9), (7, 10)",
  q_ex1_i_36: "1, 2, 3, 4, 6, 9, 12, 18, 36",
  q_ex1_ii_23: "1, 23",
  q_ex1_iii_96: "1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 96",
  q_ex1_iv_115: "1, 5, 23, 115",
  q_ex2_i: "Yes (Co-prime, gcd(18, 35) = 1)",
  q_ex2_ii: "Yes (Co-prime, gcd(216, 215) = 1)",
  q_ex2_iii: "No (Not co-prime, both are divisible by 5)",
  q_ex2_iv: "No (Not co-prime, 68 is divisible by 17)",
  q_ex3_greatest_prime_1_20: "19",
  q_ex4_primes_10_30: "11, 13, 17, 19, 23, 29",
  q_ex4_composites_10_30: "12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28",
  q_ex5_same_digits_primes: "(13, 31), (37, 73), (79, 97)",
  q_ex6_twin_primes_under_20: "(3, 5), (5, 7), (11, 13), (17, 19)",
  q_ex7_product_35: "5 and 7 (5 × 7 = 35)",
  q_ex8_sum_36: "5 + 31 (or 7 + 29, 13 + 23, 17 + 19)",
  q_ex9_seven_consecutive_composites: "90, 91, 92, 93, 94, 95, 96 (between primes 89 and 97)",
  q_ex10_sum_53_three_primes: "13 + 17 + 23 = 53 (or 3 + 7 + 43, 3 + 13 + 37, 5 + 7 + 41)",
  q_ex11_diff_10_primes: "3 and 13 (or 7 & 17, 13 & 23, 19 & 29, 31 & 41, 37 & 47)",
};

export function C6MathsCh3Page8() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page8";

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
    if (id === "q_dothis_coprime_pairs") {
      correct = checkCoprimePair(rawTyped) || rawTyped.trim().length >= 3;
    } else if (id === "q_ex8_sum_36") {
      // 36 as sum of two odd primes
      const nums = rawTyped.match(/\d+/g);
      if (nums && nums.length >= 2) {
        const p1 = parseInt(nums[0], 10);
        const p2 = parseInt(nums[1], 10);
        const oddPrimes = new Set([3, 5, 7, 11, 13, 17, 19, 23, 29, 31]);
        correct = p1 + p2 === 36 && oddPrimes.has(p1) && oddPrimes.has(p2);
      } else {
        correct = correctAnswers.some((ans) => normalize(ans) === typed);
      }
    } else if (id === "q_ex10_sum_53_three_primes") {
      // 53 as sum of three primes
      const nums = rawTyped.match(/\d+/g);
      if (nums && nums.length >= 3) {
        const p1 = parseInt(nums[0], 10);
        const p2 = parseInt(nums[1], 10);
        const p3 = parseInt(nums[2], 10);
        const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]);
        correct = p1 + p2 + p3 === 53 && primes.has(p1) && primes.has(p2) && primes.has(p3);
      } else {
        correct = correctAnswers.some((ans) => normalize(ans) === typed);
      }
    } else if (id === "q_ex11_diff_10_primes") {
      // difference is 10
      const nums = rawTyped.match(/\d+/g);
      if (nums && nums.length >= 2) {
        const p1 = parseInt(nums[0], 10);
        const p2 = parseInt(nums[1], 10);
        const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]);
        correct = Math.abs(p1 - p2) === 10 && primes.has(p1) && primes.has(p2);
      } else {
        correct = correctAnswers.some((ans) => normalize(ans) === typed);
      }
    } else if (isOpenEnded) {
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

      {/* Example 1 Section */}
      <div className="rounded-2xl bg-card border border-border p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-md font-heading font-bold text-sm">
            Example - 1
          </span>
          <span className="font-heading font-semibold text-base">
            Consider two co-prime numbers 4 and 5. Are both of them prime numbers?
          </span>
        </div>

        <div className="bg-muted/40 p-4 rounded-xl space-y-2 text-sm sm:text-base border border-border">
          <p>
            <strong>Solution:</strong> No, 4 is not a prime. Only 5 is a prime.
          </p>
          <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-lg border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200 font-semibold">
            We can say that: &ldquo;Only two primes are co-primes, but all co-primes need not be primes.&rdquo;
          </div>
        </div>
      </div>

      {/* Section 3.4.2 Twin Primes */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-primary/20 pb-3">
          <div className="inline-flex items-center justify-center bg-teal-600 text-white font-heading font-bold text-base px-3 py-1 rounded-lg shadow-sm w-fit">
            3.4.2
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-teal-800 dark:text-teal-300">
            Twin Primes
          </h3>
        </div>

        <div className="rounded-2xl bg-teal-500/10 border-2 border-teal-500/30 p-5 space-y-3">
          <p className="text-base sm:text-lg">
            <strong>Twin primes</strong> are prime numbers that differ from each other by two, e.g.:
          </p>
          <div className="flex flex-wrap gap-2 pt-1 font-mono font-bold text-sm sm:text-base">
            <span className="px-3 py-1 bg-background rounded-lg border border-teal-300 dark:border-teal-800 text-teal-800 dark:text-teal-300">
              (3, 5)
            </span>
            <span className="px-3 py-1 bg-background rounded-lg border border-teal-300 dark:border-teal-800 text-teal-800 dark:text-teal-300">
              (5, 7)
            </span>
            <span className="px-3 py-1 bg-background rounded-lg border border-teal-300 dark:border-teal-800 text-teal-800 dark:text-teal-300">
              (11, 13)
            </span>
            <span className="px-3 py-1 bg-background rounded-lg border border-teal-300 dark:border-teal-800 text-teal-800 dark:text-teal-300">
              (41, 43)
            </span>
          </div>

          <div className="pt-3 border-t border-teal-300/40 dark:border-teal-800/40 space-y-2">
            <label className="block text-sm font-semibold text-teal-950 dark:text-teal-100">
              Discussion: Are all twin primes relatively prime? Discuss.
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Yes, since both numbers are primes, their only common factor is 1"
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_twin_coprime_discuss"]
                    : answers["q_twin_coprime_discuss"] ?? ""
                }
                onChange={(e) =>
                  handleChange("q_twin_coprime_discuss", e.target.value)
                }
                onBlur={() =>
                  handleBlurText(
                    "q_twin_coprime_discuss",
                    CORRECT["q_twin_coprime_discuss"],
                    true
                  )
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                  "q_twin_coprime_discuss"
                )}`}
              />
              {badge("q_twin_coprime_discuss")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_twin_coprime_discuss"]}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DO THIS SECTION */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-emerald-700 text-white font-heading font-bold px-5 py-3 text-lg tracking-wide flex items-center gap-2">
          <span>✏️</span> DO THIS
        </div>
        <div className="p-5 space-y-3">
          <p className="text-sm sm:text-base font-semibold">
            From the following numbers identify different pairs of co-primes:
          </p>
          <div className="p-3 bg-muted/60 rounded-xl font-mono text-center font-bold text-base tracking-wider border border-border">
            2, 3, 4, 5, 6, 7, 8, 9 and 10
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. (2, 3), (3, 4), (4, 5), (5, 6), (7, 8), (8, 9), (9, 10), (3, 8), (4, 9)..."
              value={
                isRevealed
                  ? REVEAL_TEXT["q_dothis_coprime_pairs"]
                  : answers["q_dothis_coprime_pairs"] ?? ""
              }
              onChange={(e) =>
                handleChange("q_dothis_coprime_pairs", e.target.value)
              }
              onBlur={() =>
                handleBlurText(
                  "q_dothis_coprime_pairs",
                  CORRECT["q_dothis_coprime_pairs"],
                  true
                )
              }
              disabled={isRevealed}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors ${inputClass(
                "q_dothis_coprime_pairs"
              )}`}
            />
            {badge("q_dothis_coprime_pairs")}
          </div>
          {isRevealed && (
            <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
              <strong>Answer:</strong> {REVEAL_TEXT["q_dothis_coprime_pairs"]}
            </div>
          )}
        </div>
      </div>

      {/* EXERCISE 3.2 SECTION */}
      <div className="rounded-2xl border-2 border-teal-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-teal-700 text-white font-heading font-bold px-5 py-3.5 text-lg tracking-wide flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>📝</span> Exercise - 3.2
          </div>
          <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-mono">
            11 Questions
          </span>
        </div>

        <div className="p-5 space-y-6 divide-y divide-border">
          {/* Q1: Factors */}
          <div className="space-y-3 pt-1">
            <h4 className="font-heading font-bold text-base text-foreground">
              1. Write all the factors of the following numbers:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* i) 36 */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">i) 36:</span>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 1, 2, 3, 4, 6, 9, 12, 18, 36"
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_ex1_i_36"]
                        : answers["q_ex1_i_36"] ?? ""
                    }
                    onChange={(e) => handleChange("q_ex1_i_36", e.target.value)}
                    onBlur={() =>
                      handleBlurText("q_ex1_i_36", CORRECT["q_ex1_i_36"])
                    }
                    disabled={isRevealed}
                    className={`w-full rounded-xl border px-3 py-2 text-xs sm:text-sm outline-none transition-colors ${inputClass(
                      "q_ex1_i_36"
                    )}`}
                  />
                  {badge("q_ex1_i_36")}
                </div>
              </div>

              {/* ii) 23 */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">ii) 23:</span>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 1, 23"
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_ex1_ii_23"]
                        : answers["q_ex1_ii_23"] ?? ""
                    }
                    onChange={(e) => handleChange("q_ex1_ii_23", e.target.value)}
                    onBlur={() =>
                      handleBlurText("q_ex1_ii_23", CORRECT["q_ex1_ii_23"])
                    }
                    disabled={isRevealed}
                    className={`w-full rounded-xl border px-3 py-2 text-xs sm:text-sm outline-none transition-colors ${inputClass(
                      "q_ex1_ii_23"
                    )}`}
                  />
                  {badge("q_ex1_ii_23")}
                </div>
              </div>

              {/* iii) 96 */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">iii) 96:</span>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 96"
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_ex1_iii_96"]
                        : answers["q_ex1_iii_96"] ?? ""
                    }
                    onChange={(e) =>
                      handleChange("q_ex1_iii_96", e.target.value)
                    }
                    onBlur={() =>
                      handleBlurText("q_ex1_iii_96", CORRECT["q_ex1_iii_96"])
                    }
                    disabled={isRevealed}
                    className={`w-full rounded-xl border px-3 py-2 text-xs sm:text-sm outline-none transition-colors ${inputClass(
                      "q_ex1_iii_96"
                    )}`}
                  />
                  {badge("q_ex1_iii_96")}
                </div>
              </div>

              {/* iv) 115 */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">iv) 115:</span>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 1, 5, 23, 115"
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_ex1_iv_115"]
                        : answers["q_ex1_iv_115"] ?? ""
                    }
                    onChange={(e) =>
                      handleChange("q_ex1_iv_115", e.target.value)
                    }
                    onBlur={() =>
                      handleBlurText("q_ex1_iv_115", CORRECT["q_ex1_iv_115"])
                    }
                    disabled={isRevealed}
                    className={`w-full rounded-xl border px-3 py-2 text-xs sm:text-sm outline-none transition-colors ${inputClass(
                      "q_ex1_iv_115"
                    )}`}
                  />
                  {badge("q_ex1_iv_115")}
                </div>
              </div>
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answers:</strong> (i) {REVEAL_TEXT["q_ex1_i_36"]} | (ii) {REVEAL_TEXT["q_ex1_ii_23"]} | (iii) {REVEAL_TEXT["q_ex1_iii_96"]} | (iv) {REVEAL_TEXT["q_ex1_iv_115"]}
              </div>
            )}
          </div>

          {/* Q2: Which pairs are co-prime? */}
          <div className="space-y-3 pt-4">
            <h4 className="font-heading font-bold text-base text-foreground">
              2. Which of the following pairs are co-prime? (Answer Yes or No):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* i) 18 and 35 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border">
                <span className="text-sm font-semibold">i) 18 and 35:</span>
                <div className="relative w-28">
                  <input
                    type="text"
                    placeholder="Yes / No"
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_ex2_i"]
                        : answers["q_ex2_i"] ?? ""
                    }
                    onChange={(e) => handleChange("q_ex2_i", e.target.value)}
                    onBlur={() => handleBlurText("q_ex2_i", CORRECT["q_ex2_i"])}
                    disabled={isRevealed}
                    className={`w-full rounded-lg border px-2.5 py-1.5 text-xs text-center outline-none transition-colors ${inputClass(
                      "q_ex2_i"
                    )}`}
                  />
                  {badge("q_ex2_i")}
                </div>
              </div>

              {/* ii) 216 and 215 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border">
                <span className="text-sm font-semibold">ii) 216 and 215:</span>
                <div className="relative w-28">
                  <input
                    type="text"
                    placeholder="Yes / No"
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_ex2_ii"]
                        : answers["q_ex2_ii"] ?? ""
                    }
                    onChange={(e) => handleChange("q_ex2_ii", e.target.value)}
                    onBlur={() => handleBlurText("q_ex2_ii", CORRECT["q_ex2_ii"])}
                    disabled={isRevealed}
                    className={`w-full rounded-lg border px-2.5 py-1.5 text-xs text-center outline-none transition-colors ${inputClass(
                      "q_ex2_ii"
                    )}`}
                  />
                  {badge("q_ex2_ii")}
                </div>
              </div>

              {/* iii) 30 and 415 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border">
                <span className="text-sm font-semibold">iii) 30 and 415:</span>
                <div className="relative w-28">
                  <input
                    type="text"
                    placeholder="Yes / No"
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_ex2_iii"]
                        : answers["q_ex2_iii"] ?? ""
                    }
                    onChange={(e) => handleChange("q_ex2_iii", e.target.value)}
                    onBlur={() =>
                      handleBlurText("q_ex2_iii", CORRECT["q_ex2_iii"])
                    }
                    disabled={isRevealed}
                    className={`w-full rounded-lg border px-2.5 py-1.5 text-xs text-center outline-none transition-colors ${inputClass(
                      "q_ex2_iii"
                    )}`}
                  />
                  {badge("q_ex2_iii")}
                </div>
              </div>

              {/* iv) 17 and 68 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border">
                <span className="text-sm font-semibold">iv) 17 and 68:</span>
                <div className="relative w-28">
                  <input
                    type="text"
                    placeholder="Yes / No"
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_ex2_iv"]
                        : answers["q_ex2_iv"] ?? ""
                    }
                    onChange={(e) => handleChange("q_ex2_iv", e.target.value)}
                    onBlur={() => handleBlurText("q_ex2_iv", CORRECT["q_ex2_iv"])}
                    disabled={isRevealed}
                    className={`w-full rounded-lg border px-2.5 py-1.5 text-xs text-center outline-none transition-colors ${inputClass(
                      "q_ex2_iv"
                    )}`}
                  />
                  {badge("q_ex2_iv")}
                </div>
              </div>
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answers:</strong> (i) Yes | (ii) Yes (consecutive numbers) | (iii) No (divisible by 5) | (iv) No (68 = 17 × 4)
              </div>
            )}
          </div>

          {/* Q3 */}
          <div className="space-y-2 pt-4">
            <label className="block text-sm sm:text-base font-semibold">
              3. What is the greatest prime number between 1 and 20?
            </label>
            <div className="relative max-w-sm">
              <input
                type="text"
                placeholder="Enter prime number..."
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_ex3_greatest_prime_1_20"]
                    : answers["q_ex3_greatest_prime_1_20"] ?? ""
                }
                onChange={(e) =>
                  handleChange("q_ex3_greatest_prime_1_20", e.target.value)
                }
                onBlur={() =>
                  handleBlurText(
                    "q_ex3_greatest_prime_1_20",
                    CORRECT["q_ex3_greatest_prime_1_20"]
                  )
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                  "q_ex3_greatest_prime_1_20"
                )}`}
              />
              {badge("q_ex3_greatest_prime_1_20")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_ex3_greatest_prime_1_20"]}
              </div>
            )}
          </div>

          {/* Q4 */}
          <div className="space-y-3 pt-4">
            <label className="block text-sm sm:text-base font-semibold">
              4. Find the prime and composite numbers between 10 and 30:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Primes (10 to 30):</span>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 11, 13, 17, 19, 23, 29"
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_ex4_primes_10_30"]
                        : answers["q_ex4_primes_10_30"] ?? ""
                    }
                    onChange={(e) =>
                      handleChange("q_ex4_primes_10_30", e.target.value)
                    }
                    onBlur={() =>
                      handleBlurText(
                        "q_ex4_primes_10_30",
                        CORRECT["q_ex4_primes_10_30"]
                      )
                    }
                    disabled={isRevealed}
                    className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                      "q_ex4_primes_10_30"
                    )}`}
                  />
                  {badge("q_ex4_primes_10_30")}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">Composites (10 to 30):</span>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28"
                    value={
                      isRevealed
                        ? REVEAL_TEXT["q_ex4_composites_10_30"]
                        : answers["q_ex4_composites_10_30"] ?? ""
                    }
                    onChange={(e) =>
                      handleChange("q_ex4_composites_10_30", e.target.value)
                    }
                    onBlur={() =>
                      handleBlurText(
                        "q_ex4_composites_10_30",
                        CORRECT["q_ex4_composites_10_30"]
                      )
                    }
                    disabled={isRevealed}
                    className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                      "q_ex4_composites_10_30"
                    )}`}
                  />
                  {badge("q_ex4_composites_10_30")}
                </div>
              </div>
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Primes:</strong> {REVEAL_TEXT["q_ex4_primes_10_30"]} | <strong>Composites:</strong> {REVEAL_TEXT["q_ex4_composites_10_30"]}
              </div>
            )}
          </div>

          {/* Q5 */}
          <div className="space-y-2 pt-4">
            <label className="block text-sm sm:text-base font-semibold">
              5. The numbers 17 and 71 are prime numbers. Both these numbers have same digits 1 and 7. Find 2 more such pairs of prime numbers below 100:
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. (13, 31), (37, 73), (79, 97)"
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_ex5_same_digits_primes"]
                    : answers["q_ex5_same_digits_primes"] ?? ""
                }
                onChange={(e) =>
                  handleChange("q_ex5_same_digits_primes", e.target.value)
                }
                onBlur={() =>
                  handleBlurText(
                    "q_ex5_same_digits_primes",
                    CORRECT["q_ex5_same_digits_primes"],
                    true
                  )
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                  "q_ex5_same_digits_primes"
                )}`}
              />
              {badge("q_ex5_same_digits_primes")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_ex5_same_digits_primes"]}
              </div>
            )}
          </div>

          {/* Q6 */}
          <div className="space-y-2 pt-4">
            <label className="block text-sm sm:text-base font-semibold">
              6. Write three pairs of twin primes below 20:
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. (3, 5), (5, 7), (11, 13)"
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_ex6_twin_primes_under_20"]
                    : answers["q_ex6_twin_primes_under_20"] ?? ""
                }
                onChange={(e) =>
                  handleChange("q_ex6_twin_primes_under_20", e.target.value)
                }
                onBlur={() =>
                  handleBlurText(
                    "q_ex6_twin_primes_under_20",
                    CORRECT["q_ex6_twin_primes_under_20"],
                    true
                  )
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                  "q_ex6_twin_primes_under_20"
                )}`}
              />
              {badge("q_ex6_twin_primes_under_20")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_ex6_twin_primes_under_20"]}
              </div>
            )}
          </div>

          {/* Q7 */}
          <div className="space-y-2 pt-4">
            <label className="block text-sm sm:text-base font-semibold">
              7. Write two prime numbers whose product is 35:
            </label>
            <div className="relative max-w-sm">
              <input
                type="text"
                placeholder="e.g. 5 and 7"
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_ex7_product_35"]
                    : answers["q_ex7_product_35"] ?? ""
                }
                onChange={(e) =>
                  handleChange("q_ex7_product_35", e.target.value)
                }
                onBlur={() =>
                  handleBlurText(
                    "q_ex7_product_35",
                    CORRECT["q_ex7_product_35"]
                  )
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                  "q_ex7_product_35"
                )}`}
              />
              {badge("q_ex7_product_35")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_ex7_product_35"]}
              </div>
            )}
          </div>

          {/* Q8 */}
          <div className="space-y-2 pt-4">
            <label className="block text-sm sm:text-base font-semibold">
              8. Express 36 as the sum of two odd primes:
            </label>
            <div className="relative max-w-sm">
              <input
                type="text"
                placeholder="e.g. 5 + 31 or 7 + 29 or 17 + 19"
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_ex8_sum_36"]
                    : answers["q_ex8_sum_36"] ?? ""
                }
                onChange={(e) => handleChange("q_ex8_sum_36", e.target.value)}
                onBlur={() =>
                  handleBlurText("q_ex8_sum_36", CORRECT["q_ex8_sum_36"])
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                  "q_ex8_sum_36"
                )}`}
              />
              {badge("q_ex8_sum_36")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_ex8_sum_36"]}
              </div>
            )}
          </div>

          {/* Q9 */}
          <div className="space-y-2 pt-4">
            <label className="block text-sm sm:text-base font-semibold">
              9. Write seven consecutive composite numbers less than 100:
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. 90, 91, 92, 93, 94, 95, 96"
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_ex9_seven_consecutive_composites"]
                    : answers["q_ex9_seven_consecutive_composites"] ?? ""
                }
                onChange={(e) =>
                  handleChange(
                    "q_ex9_seven_consecutive_composites",
                    e.target.value
                  )
                }
                onBlur={() =>
                  handleBlurText(
                    "q_ex9_seven_consecutive_composites",
                    CORRECT["q_ex9_seven_consecutive_composites"]
                  )
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                  "q_ex9_seven_consecutive_composites"
                )}`}
              />
              {badge("q_ex9_seven_consecutive_composites")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_ex9_seven_consecutive_composites"]}
              </div>
            )}
          </div>

          {/* Q10 */}
          <div className="space-y-2 pt-4">
            <label className="block text-sm sm:text-base font-semibold">
              10. Express 53 as the sum of three primes:
            </label>
            <div className="relative max-w-sm">
              <input
                type="text"
                placeholder="e.g. 13 + 17 + 23 or 3 + 7 + 43"
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_ex10_sum_53_three_primes"]
                    : answers["q_ex10_sum_53_three_primes"] ?? ""
                }
                onChange={(e) =>
                  handleChange("q_ex10_sum_53_three_primes", e.target.value)
                }
                onBlur={() =>
                  handleBlurText(
                    "q_ex10_sum_53_three_primes",
                    CORRECT["q_ex10_sum_53_three_primes"]
                  )
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                  "q_ex10_sum_53_three_primes"
                )}`}
              />
              {badge("q_ex10_sum_53_three_primes")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_ex10_sum_53_three_primes"]}
              </div>
            )}
          </div>

          {/* Q11 */}
          <div className="space-y-2 pt-4">
            <label className="block text-sm sm:text-base font-semibold">
              11. Write two prime numbers whose difference is 10:
            </label>
            <div className="relative max-w-sm">
              <input
                type="text"
                placeholder="e.g. 3 and 13 or 7 and 17"
                value={
                  isRevealed
                    ? REVEAL_TEXT["q_ex11_diff_10_primes"]
                    : answers["q_ex11_diff_10_primes"] ?? ""
                }
                onChange={(e) =>
                  handleChange("q_ex11_diff_10_primes", e.target.value)
                }
                onBlur={() =>
                  handleBlurText(
                    "q_ex11_diff_10_primes",
                    CORRECT["q_ex11_diff_10_primes"]
                  )
                }
                disabled={isRevealed}
                className={`w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition-colors ${inputClass(
                  "q_ex11_diff_10_primes"
                )}`}
              />
              {badge("q_ex11_diff_10_primes")}
            </div>
            {isRevealed && (
              <div className="text-xs bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Answer:</strong> {REVEAL_TEXT["q_ex11_diff_10_primes"]}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
