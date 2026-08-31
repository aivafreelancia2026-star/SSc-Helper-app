"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   All gradable field IDs for this page
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "q_tdw_product",
  "q_ex_1i",
  "q_ex_1ii",
  "q_ex_1iii",
  "q_ex_1iv",
  "q_ex_1v",
  "q_ex_1vi",
  "q_ex_2i",
  "q_ex_2ii",
  "q_ex_2iii",
  "q_ex_3",
  "q_ex_4i",
  "q_ex_4ii",
  "q_ex_5",
];

/* ─────────────────────────────────────────────
   Correct answers (normalised, lower-case)
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  q_tdw_product: ["co-prime", "coprime", "nocommonfactor"],
  q_ex_1i: ["60"],
  q_ex_1ii: ["75"],
  q_ex_1iii: ["42"],
  q_ex_1iv: ["54"],
  q_ex_1v: ["1008"],
  q_ex_1vi: ["182"],
  q_ex_2i: ["2352"],
  q_ex_2ii: ["2142"],
  q_ex_2iii: ["1980"],
  q_ex_3: ["247"],
  q_ex_4i: ["900"],
  q_ex_4ii: ["904"],
  q_ex_5: ["13", "13th", "thirteenth"],
};

/* ─────────────────────────────────────────────
   Reveal text shown when teacher presses Reveal
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_tdw_product: "When they are co-prime",
  q_ex_1i: "60",
  q_ex_1ii: "75",
  q_ex_1iii: "42",
  q_ex_1iv: "54",
  q_ex_1v: "1008",
  q_ex_1vi: "182",
  q_ex_2i: "2352",
  q_ex_2ii: "2142",
  q_ex_2iii: "1980",
  q_ex_3: "247 (LCM is 252. 252 - 5 = 247)",
  q_ex_4i: "900 (LCM of 75, 45, 60 is 900)",
  q_ex_4ii: "904 (900 + 4 = 904)",
  q_ex_5: "13th day (LCM of 3 and 4 is 12. 1 + 12 = 13)",
};

/* ─────────────────────────────────────────────
   Helpers (pure functions, outside component)
───────────────────────────────────────────── */
const normalize = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

function borderCls(
  id: string,
  answers: Record<string, string>,
  graded: Record<string, { value: string; correct: boolean }>,
  isRevealed: boolean
) {
  if (isRevealed)
    return "border-emerald-500 bg-emerald-50 font-bold text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300";
  const typed = (answers[id] ?? "").trim();
  if (!typed) return "border-slate-300 focus:border-teal-500 bg-background";
  const g = graded[id];
  if (g?.correct === true)
    return "border-green-500 bg-green-50 text-green-700 font-bold dark:bg-green-950/30 dark:text-green-300";
  if (g?.correct === false)
    return "border-red-400 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400";
  return "border-slate-300 focus:border-teal-500 bg-background";
}

function StatusIcon({
  id,
  answers,
  graded,
  isRevealed,
}: {
  id: string;
  answers: Record<string, string>;
  graded: Record<string, { value: string; correct: boolean }>;
  isRevealed: boolean;
}) {
  if (isRevealed) return null;
  const typed = (answers[id] ?? "").trim();
  if (!typed) return null;
  const g = graded[id];
  if (g?.correct === true)
    return (
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none text-sm font-bold text-green-600 dark:text-green-400">
        ✓
      </span>
    );
  if (g?.correct === false)
    return (
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none text-sm font-bold text-red-500 dark:text-red-400">
        ✗
      </span>
    );
  return null;
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export function C6MathsCh3Page14() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page14";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded]   = useState<Record<string, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number } | null>(null);

  /* Restore from localStorage on mount */
  useEffect(() => {
    const saved: Record<string, string> = {};
    const savedG: Record<string, { value: string; correct: boolean }> = {};
    ALL_INPUT_IDS.forEach((id) => {
      const a = localStorage.getItem(`${storageKey}-${id}-answer`);
      if (a) saved[id] = a;
      const g = localStorage.getItem(`${storageKey}-${id}-graded`);
      if (g) { try { savedG[id] = JSON.parse(g); } catch {} }
    });
    setAnswers(saved);
    setGraded(savedG);
  }, [storageKey]);

  /* Listen for Reset button */
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
    return () => window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, [storageKey]);

  /* onChange handler */
  const handleChange = (id: string, val: string) => {
    if (isRevealed) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
    localStorage.setItem(`${storageKey}-${id}-answer`, val);
  };

  /* onBlur handler — grades the answer and awards points */
  const handleBlur = (id: string, correctAnswers: string[], isOpen = false) => {
    if (isRevealed) return;
    const rawTyped = answers[id] ?? "";
    const typed = normalize(rawTyped);
    if (!typed && !isOpen) return;
    if (isOpen && !rawTyped.trim()) return;

    const prev = graded[id];
    if (prev && prev.value === typed) return; // no change

    let correct: boolean;
    if (isOpen) {
      // open-ended: accept if any keyword matches OR student wrote something reasonable
      correct =
        correctAnswers.some((ans) => typed.includes(normalize(ans))) ||
        rawTyped.trim().length >= 5;
    } else {
      correct = correctAnswers.some((ans) => normalize(ans) === typed);
    }

    // Point delta: +1 first correct, +2 switching wrong→right, -2 switching right→wrong
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

  /* Shared input renderer */
  function Field({
    id,
    placeholder,
    correct,
    isOpen = false,
  }: {
    id: string;
    placeholder: string;
    correct: string[];
    isOpen?: boolean;
  }) {
    return (
      <div className="relative w-full">
        <input
          type="text"
          id={`field-${id}`}
          placeholder={placeholder}
          value={isRevealed ? REVEAL_TEXT[id] ?? "" : answers[id] ?? ""}
          onChange={(e) => handleChange(id, e.target.value)}
          onBlur={() => handleBlur(id, correct, isOpen)}
          disabled={isRevealed}
          className={`w-full rounded-xl border px-3 py-2 pr-8 text-sm font-mono outline-none transition-colors ${borderCls(id, answers, graded, isRevealed)}`}
        />
        <StatusIcon id={id} answers={answers} graded={graded} isRevealed={isRevealed} />
      </div>
    );
  }

  /* ── JSX ── */
  return (
    <div className="space-y-8 text-foreground leading-relaxed font-body">
      {feedback && (
        <AnswerFeedback key={feedback.id} correct={feedback.correct} onDone={() => setFeedback(null)} />
      )}

      {/* Recap Note */}
      <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30 pl-4 py-3 pr-3 text-sm font-semibold text-amber-900 dark:text-amber-200">
        If one of the two given numbers is a multiple of the other, then the greater number is the LCM of the given numbers.
      </div>

      {/* 2. Division Method */}
      <div className="rounded-2xl border-2 border-indigo-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-indigo-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono text-sm">2.</span>
          Division Method
        </div>
        
        <div className="p-5 space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1 space-y-4 text-sm">
              <p>To find the LCM of 24 and 90:</p>
              <div className="space-y-2">
                <p><strong>Step-1:</strong> Arrange the given numbers in a row.</p>
                <p><strong>Step-2:</strong> Then divide by a least prime number which divides at least two of the given numbers and carry forward the numbers which are not divisible by that number if any.</p>
                <p><strong>Step-3:</strong> Repeat the process till numbers have no common factor other than 1.</p>
                <p><strong>Step-4:</strong> LCM is the product of the divisors and the remaining numbers.</p>
              </div>
              <p className="font-bold text-indigo-700 dark:text-indigo-400">
                Thus, the LCM of 24 and 90 is 2 × 3 × 4 × 15 = 360
              </p>
            </div>
            
            <div className="shrink-0 w-32">
              <table className="font-mono text-xs border-collapse mx-auto">
                <tbody>
                  <tr className="border-b border-indigo-200 dark:border-indigo-800">
                    <td className="pr-2 text-right w-6 font-bold text-indigo-600 dark:text-indigo-400">2</td>
                    <td className="px-1 text-muted-foreground border-r border-indigo-200 dark:border-indigo-800">|</td>
                    <td className="pl-1">24, 90</td>
                  </tr>
                  <tr className="border-b border-indigo-200 dark:border-indigo-800">
                    <td className="pr-2 text-right w-6 font-bold text-indigo-600 dark:text-indigo-400">3</td>
                    <td className="px-1 text-muted-foreground border-r border-indigo-200 dark:border-indigo-800">|</td>
                    <td className="pl-1">12, 45</td>
                  </tr>
                  <tr>
                    <td className="pr-2 text-right w-6"></td>
                    <td className="px-1 text-muted-foreground border-r border-indigo-200 dark:border-indigo-800">|</td>
                    <td className="pl-1">4, 15</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800/50 p-4 bg-indigo-50/50 dark:bg-indigo-950/20">
            <h4 className="font-heading font-bold text-base text-indigo-900 dark:text-indigo-200 mb-3">
              Example-6
            </h4>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 space-y-3 text-sm">
                <p className="font-semibold">Find the LCM of 21, 35 and 42.</p>
                <p><strong>Solution:</strong></p>
                <p className="font-bold text-indigo-700 dark:text-indigo-400 mt-4">
                  Thus, the LCM of 21, 35 and 42 is 7 × 3 × 5 × 2 = 210
                </p>
              </div>
              <div className="shrink-0 w-32">
                <table className="font-mono text-xs border-collapse mx-auto">
                  <tbody>
                    <tr className="border-b border-indigo-200 dark:border-indigo-800">
                      <td className="pr-2 text-right w-6 font-bold text-indigo-600 dark:text-indigo-400">7</td>
                      <td className="px-1 text-muted-foreground border-r border-indigo-200 dark:border-indigo-800">|</td>
                      <td className="pl-1">21, 35, 42</td>
                    </tr>
                    <tr className="border-b border-indigo-200 dark:border-indigo-800">
                      <td className="pr-2 text-right w-6 font-bold text-indigo-600 dark:text-indigo-400">3</td>
                      <td className="px-1 text-muted-foreground border-r border-indigo-200 dark:border-indigo-800">|</td>
                      <td className="pl-1">3, 5, 6</td>
                    </tr>
                    <tr>
                      <td className="pr-2 text-right w-6"></td>
                      <td className="px-1 text-muted-foreground border-r border-indigo-200 dark:border-indigo-800">|</td>
                      <td className="pl-1">1, 5, 2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Think, Discuss and Write */}
      <div className="rounded-2xl border-2 border-emerald-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-emerald-600 text-white font-heading font-bold px-5 py-3 text-lg flex items-center justify-between">
          <span>💬 Think, Discuss and Write</span>
          <span className="text-2xl">🧑‍🤝‍🧑</span>
        </div>
        <div className="p-5 bg-emerald-50/60 dark:bg-emerald-950/20 space-y-4">
          <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
            When will the LCM of two or more numbers be their own product?
          </p>
          <div className="w-full sm:w-2/3">
            <Field id="q_tdw_product" placeholder="Answer here..." correct={CORRECT.q_tdw_product} isOpen />
          </div>
        </div>
      </div>

      {/* Exercise 3.5 */}
      <div className="rounded-2xl border-2 border-teal-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-teal-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span>✏️</span> Exercise 3.5
        </div>
        <div className="p-5 space-y-8">
          
          {/* Q1 */}
          <div className="space-y-4">
            <p className="font-semibold text-sm sm:text-base">
              <strong>1.</strong> Find the LCM of the following numbers by <strong>prime factorisation method</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { id: "q_ex_1i", label: "i) 12, 15" },
                { id: "q_ex_1ii", label: "ii) 15, 25" },
                { id: "q_ex_1iii", label: "iii) 14, 21" },
                { id: "q_ex_1iv", label: "iv) 18, 27" },
                { id: "q_ex_1v", label: "v) 48, 56, 72" },
                { id: "q_ex_1vi", label: "vi) 26, 14, 91" },
              ].map(({ id, label }) => (
                <div key={id} className="rounded-xl border border-teal-200 bg-teal-50/40 dark:bg-teal-950/20 p-3 space-y-2">
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-200">{label}</p>
                  <Field id={id} placeholder="LCM = ?" correct={CORRECT[id]} />
                </div>
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div className="space-y-4 pt-4 border-t border-teal-200 dark:border-teal-800/50">
            <p className="font-semibold text-sm sm:text-base">
              <strong>2.</strong> Find the LCM of the following numbers by <strong>division method</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: "q_ex_2i", label: "i) 84, 112, 196" },
                { id: "q_ex_2ii", label: "ii) 102, 119, 153" },
                { id: "q_ex_2iii", label: "iii) 45, 99, 132, 165" },
              ].map(({ id, label }) => (
                <div key={id} className="rounded-xl border border-teal-200 bg-teal-50/40 dark:bg-teal-950/20 p-3 space-y-2">
                  <p className="text-sm font-semibold text-teal-900 dark:text-teal-200">{label}</p>
                  <Field id={id} placeholder="LCM = ?" correct={CORRECT[id]} />
                </div>
              ))}
            </div>
          </div>

          {/* Q3 */}
          <div className="space-y-3 pt-4 border-t border-teal-200 dark:border-teal-800/50">
            <p className="text-sm sm:text-base font-semibold">
              <strong>3.</strong> Find the smallest number which when added to 5 is exactly divisible by 12, 14 and 18.
            </p>
            <div className="w-full sm:w-1/2">
              <Field id="q_ex_3" placeholder="Smallest number = ?" correct={CORRECT.q_ex_3} />
            </div>
          </div>

          {/* Q4 */}
          <div className="space-y-4 pt-4 border-t border-teal-200 dark:border-teal-800/50">
            <p className="text-sm sm:text-base font-semibold">
              <strong>4.</strong> Find the greatest 3 digit number which when divided by 75, 45 and 60 leaves:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-teal-200 bg-teal-50/40 dark:bg-teal-950/20 p-3 space-y-2">
                <p className="text-sm font-semibold text-teal-900 dark:text-teal-200">i) no remainder</p>
                <Field id="q_ex_4i" placeholder="Number = ?" correct={CORRECT.q_ex_4i} />
              </div>
              <div className="rounded-xl border border-teal-200 bg-teal-50/40 dark:bg-teal-950/20 p-3 space-y-2">
                <p className="text-sm font-semibold text-teal-900 dark:text-teal-200">ii) the remainder 4 in each case</p>
                <Field id="q_ex_4ii" placeholder="Number = ?" correct={CORRECT.q_ex_4ii} />
              </div>
            </div>
          </div>

          {/* Q5 */}
          <div className="space-y-3 pt-4 border-t border-teal-200 dark:border-teal-800/50">
            <p className="text-sm sm:text-base font-semibold">
              <strong>5.</strong> Prasad and Raju met in the market on 1st of this month. Prasad goes to the market every 3rd day and Raju goes every 4th day. On what day of the month will they meet again?
            </p>
            <div className="w-full sm:w-1/2">
              <Field id="q_ex_5" placeholder="Day of the month = ?" correct={CORRECT.q_ex_5} />
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
