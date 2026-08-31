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
  "q_dt_1_yesno",
  "q_dt_1_why",
  "q_dt_2",
  "q_div8_100",
  "q_div8_1000",
  "q_ex9_div",
];

/* ─────────────────────────────────────────────
   Correct answers (normalised, lower-case)
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  q_dt_1_yesno: ["yes", "y"],
  q_dt_1_why: ["last two digits", "00", "zero", "zeros"],
  q_dt_2: [
    "10", "14", "18", "22", "26", "30", "34", "38", "42", "46", "50", 
    "54", "58", "62", "66", "70", "74", "78", "82", "86", "90", "94", "98"
  ],
  q_div8_100: ["no", "n"],
  q_div8_1000: ["yes", "y"],
  q_ex9_div: ["yes", "y"],
};

/* ─────────────────────────────────────────────
   Reveal text shown when teacher presses Reveal
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_dt_1_yesno: "Yes",
  q_dt_1_why: "Because its last two digits are 00 (which is divisible by 4).",
  q_dt_2: "10 (or 14, 18, 22...)",
  q_div8_100: "No",
  q_div8_1000: "Yes",
  q_ex9_div: "Yes",
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
export function C6MathsCh3Page17() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page17";

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
      correct =
        correctAnswers.some((ans) => typed.includes(normalize(ans))) ||
        rawTyped.trim().length >= 4;
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

      {/* The Rule text block */}
      <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm sm:text-base">
        <p className="font-bold text-amber-900 dark:text-amber-100">
          A number is divisible by 4, if the number formed by its last two digits (i.e. tens and ones) is divisible by 4.
        </p>
        <p className="mt-2 text-muted-foreground text-xs sm:text-sm italic">
          Note: This rule works for numbers greater than hundred. For smaller numbers (1 or 2 digit numbers) we have to do actual division.
        </p>
      </div>

      {/* Example 8 */}
      <div className="rounded-2xl border-2 border-amber-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-amber-600 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          Example-8
        </div>
        <div className="p-5 text-sm sm:text-base space-y-3">
          <p className="font-semibold text-amber-900 dark:text-amber-200">
            Verify whether 56496 is divisible by 4?
          </p>
          <div className="space-y-2">
            <p><strong>Solution:</strong></p>
            <p className="pl-4 font-mono text-sm">56496 = 50000 + 6000 + 400 + 96</p>
            <p className="pl-4 text-muted-foreground">
              We already know that 50000, 6000, 400 are all multiples of 100, they are completely divisible by 4.
            </p>
            <p className="pl-4 text-muted-foreground">
              We need to test whether 96 (the last two digits) is divisible by 4 or not.
            </p>
            <p className="pl-4 font-semibold text-green-700 dark:text-green-400">
              96 is divisible by 4.
            </p>
            <p className="pl-4 font-bold text-amber-800 dark:text-amber-300">
              So, the given number 56496 is also divisible by 4.
            </p>
          </div>
        </div>
      </div>

      {/* Do This */}
      <div className="rounded-2xl border-2 border-emerald-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-emerald-600 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span>📝</span> Do This
        </div>
        <div className="p-5 bg-emerald-50/60 dark:bg-emerald-950/20 space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
              1. Is 100000 divisible by 4? Why?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/3">
                <Field id="q_dt_1_yesno" placeholder="Yes / No" correct={CORRECT.q_dt_1_yesno} />
              </div>
              <div className="w-full sm:w-2/3">
                <Field id="q_dt_1_why" placeholder="Why? (Hint: last two digits)" correct={CORRECT.q_dt_1_why} isOpen />
              </div>
            </div>
          </div>
          <div className="space-y-3 pt-4 border-t border-emerald-200 dark:border-emerald-800/50">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
              2. Give an example of a 2 digit number that is divisible by 2 but not divisible by 4?
            </p>
            <div className="w-full sm:w-1/2">
              <Field id="q_dt_2" placeholder="e.g. 10" correct={CORRECT.q_dt_2} />
            </div>
          </div>
        </div>
      </div>

      {/* 3.9.2 Divisibility Rule for 8 */}
      <div className="rounded-2xl border-2 border-indigo-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-indigo-600 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono text-sm">3.9.2</span>
          Divisibility Rule for 8
        </div>
        
        <div className="p-5 space-y-5 text-sm sm:text-base">
          <p>
            We have learnt the divisibility rule for 4. It is based on expanding the number. Since 10 is not divisible by 4 so we consider 100 and any number greater than 100 can be written as multiple of 100, so if the last two digits are divisible by four it will be divisible by 4.
            Similarly since 10 is not divisible by 8, we think of 100.
          </p>

          <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="font-semibold text-indigo-900 dark:text-indigo-200">Is 100 divisible by 8?</span>
              <div className="w-32">
                <Field id="q_div8_100" placeholder="Yes / No" correct={CORRECT.q_div8_100} />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="font-semibold text-indigo-900 dark:text-indigo-200">Is 1000 divisible by 8?</span>
              <div className="w-32">
                <Field id="q_div8_1000" placeholder="Yes / No" correct={CORRECT.q_div8_1000} />
              </div>
            </div>
          </div>

          <p>
            We know that any number greater than 1000 can be written as something added to multiple of 1000.
            For example 4825 = 4 × 1000 + 825.
          </p>
          <div className="rounded-xl border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 p-4 font-bold text-indigo-900 dark:text-indigo-100">
            Thus we can say that if the last three digits of a number is divisible by 8 then the number will be divisible by 8.
          </div>

          <div className="border border-indigo-200 dark:border-indigo-800/50 rounded-xl p-4 space-y-3">
            <p className="font-bold text-indigo-900 dark:text-indigo-200">Example-9</p>
            <p className="font-semibold">Verify whether 93624 is divisible by 8?</p>
            <div className="text-sm space-y-2">
              <p><strong>Solution:</strong></p>
              <p className="pl-4 font-mono">93624 = 90000 + 3000 + 600 + 20 + 4</p>
              <p className="pl-4 text-muted-foreground">We know that 1000 is divisible by 8.</p>
              <p className="pl-4 text-muted-foreground">Here, 90000 and 3000 are multiples of 1000, they are certainly divisible by 8.</p>
              <p className="pl-4 font-semibold text-indigo-800 dark:text-indigo-300">
                So, it is enough to test the divisibility of the last three digits of the number.
              </p>
              <div className="pl-4 flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                <span className="font-semibold">Is 624 divisible by 8?</span>
                <div className="w-32">
                  <Field id="q_ex9_div" placeholder="Yes / No" correct={CORRECT.q_ex9_div} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
