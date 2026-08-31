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
  "q_table_100",
  "q_table_600",
  "q_table_1000",
  "q_table_10000",
  "q_table_100000",
  "q_all_even",
  "q_126_div",
  "q_32_div",
];

/* ─────────────────────────────────────────────
   Correct answers (normalised, lower-case)
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  q_table_100: ["yes", "y"],
  q_table_600: ["yes", "y"],
  q_table_1000: ["yes", "y"],
  q_table_10000: ["yes", "y"],
  q_table_100000: ["yes", "y"],
  q_all_even: ["no", "n"],
  q_126_div: ["no", "n"],
  q_32_div: ["yes", "y"],
};

/* ─────────────────────────────────────────────
   Reveal text shown when teacher presses Reveal
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_table_100: "Yes",
  q_table_600: "Yes",
  q_table_1000: "Yes",
  q_table_10000: "Yes",
  q_table_100000: "Yes",
  q_all_even: "No",
  q_126_div: "No",
  q_32_div: "Yes",
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
export function C6MathsCh3Page16() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page16";

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
        rawTyped.trim().length >= 3;
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

      {/* Title */}
      <div className="bg-amber-500 text-white font-heading font-bold px-6 py-4 rounded-2xl shadow-sm text-xl flex items-center gap-4">
        <span className="bg-white/20 rounded-lg px-2.5 py-1 font-mono text-base">3.9</span>
        Divisibility Rules for 4, 8 and 11
      </div>

      <div className="space-y-4 px-2">
        <p className="text-sm sm:text-base">
          We have learnt the divisibility rules for 2, 3, 5, 6, 9 and 10. Now, we derive the divisibility rule for 4, 8 and 11.
        </p>
      </div>

      {/* 3.9.1 Divisibility Rule for 4 */}
      <div className="rounded-2xl border-2 border-amber-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-amber-600 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono text-sm">3.9.1</span>
          Divisibility Rule for 4
        </div>
        
        <div className="p-5 space-y-6">
          <p className="font-semibold text-amber-900 dark:text-amber-200">
            Observe the pattern
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] text-sm text-left border-collapse border border-amber-200 dark:border-amber-800">
              <thead className="bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200">
                <tr>
                  <th className="border border-amber-200 dark:border-amber-800 px-4 py-3 text-center">Number</th>
                  <th className="border border-amber-200 dark:border-amber-800 px-4 py-3 text-center">Can be written as</th>
                  <th className="border border-amber-200 dark:border-amber-800 px-4 py-3 text-center">Whether divisible by 4?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-200 dark:divide-amber-800 bg-amber-50/30 dark:bg-amber-950/20">
                {[
                  { num: "100", expr: "100", id: "q_table_100" },
                  { num: "600", expr: "6 × 100", id: "q_table_600" },
                  { num: "1000", expr: "10 × 100", id: "q_table_1000" },
                  { num: "10000", expr: "100 × 100", id: "q_table_10000" },
                  { num: "100000", expr: "1000 × 100", id: "q_table_100000" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-amber-100/50 dark:hover:bg-amber-900/30 transition-colors">
                    <td className="border border-amber-200 dark:border-amber-800 px-4 py-3 text-center font-mono font-semibold">{row.num}</td>
                    <td className="border border-amber-200 dark:border-amber-800 px-4 py-3 text-center text-muted-foreground">{row.expr}</td>
                    <td className="border border-amber-200 dark:border-amber-800 px-2 py-2">
                      <div className="w-24 mx-auto">
                        <Field id={row.id} placeholder="Yes/No" correct={CORRECT[row.id]} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-sm sm:text-base">
            <p>
              From the above table, we can observe that 100 is divisible by four. Here 600, 1000, 10000, 100000 can be expressed as a multiple of 100.
              So, these numbers are also divisible by 4.
            </p>
            <p>
              You know that all even numbers are divisible by 2.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
              <span className="font-semibold text-amber-900 dark:text-amber-200">Are all even numbers also divisible by 4?</span>
              <div className="w-32 shrink-0">
                <Field id="q_all_even" placeholder="Yes / No" correct={CORRECT.q_all_even} />
              </div>
            </div>
            
            <p className="font-semibold text-amber-800 dark:text-amber-300">Let us verify.</p>
            
            <div className="space-y-3 bg-card border-l-4 border-amber-400 pl-4 py-2">
              <p>126 is an even number divisible by 2.</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <span className="font-semibold text-amber-900 dark:text-amber-200">Is 126 divisible by 4?</span>
                <div className="w-32 shrink-0">
                  <Field id="q_126_div" placeholder="Yes / No" correct={CORRECT.q_126_div} />
                </div>
              </div>
              <p>126 can be written as <strong>126 = 100 + 26</strong></p>
              <p>You know that 100 is divisible by 4. But 26 is not divisible by 4.</p>
              <p className="font-bold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/30 inline-block px-3 py-1 rounded-md">
                Hence, we can say that all even numbers are not necessarily divisible by 4.
              </p>
            </div>

            <p className="pt-4 font-semibold text-amber-800 dark:text-amber-300">For example, consider 76532.</p>
            
            <div className="space-y-3 bg-card border-l-4 border-amber-400 pl-4 py-2">
              <p>76532 can be written as <strong>70000 + 6000 + 500 + 30 + 2</strong>.</p>
              <p>
                You know that 100, 1000, 10000 are multiples of 100, and 100 is divisible by 4.
                So we need not test them every time. So, it is enough to test the last two digits of the given number i.e. <strong>32</strong>.
              </p>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-amber-900 dark:text-amber-200">Is 32 divisible by 4?</span>
                <div className="w-32">
                  <Field id="q_32_div" placeholder="Yes / No" correct={CORRECT.q_32_div} />
                </div>
              </div>
              <p className="font-bold text-green-700 dark:text-green-400">
                Yes. It is divisible by 4. Hence, we can say that 76532 is also divisible by 4.
              </p>
            </div>

            <p className="font-medium bg-amber-100 dark:bg-amber-900/40 p-3 rounded-lg mt-4 inline-block">
              💡 You already know that odd numbers are not divisible by 4.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
