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
  "q_dt_1",
  "q_dt_2",
  "q_t_29843_odd",
  "q_t_29843_even",
  "q_t_29843_diff",
  "q_t_29843_div",
  "q_t_90002_odd",
  "q_t_90002_even",
  "q_t_90002_diff",
  "q_t_90002_div",
  "q_t_80927_odd",
  "q_t_80927_even",
  "q_t_80927_diff",
  "q_t_80927_div",
  "q_t_83568_odd",
  "q_t_83568_even",
  "q_t_83568_diff",
  "q_t_83568_div",
  "q_obs",
];

/* ─────────────────────────────────────────────
   Correct answers (normalised, lower-case)
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  q_dt_1: ["yes", "y"],
  q_dt_2: ["104", "112", "192"], // open ended list
  q_t_29843_odd: ["13", "3+8+2", "3+8+2=13"],
  q_t_29843_even: ["13", "4+9", "4+9=13"],
  q_t_29843_diff: ["0", "13-13=0", "zero"],
  q_t_29843_div: ["yes", "y"],
  q_t_90002_odd: ["11", "2+0+9", "2+0+9=11"],
  q_t_90002_even: ["0", "0+0", "0+0=0"],
  q_t_90002_diff: ["11", "11-0=11"],
  q_t_90002_div: ["yes", "y"],
  q_t_80927_odd: ["24", "7+9+8", "7+9+8=24"],
  q_t_80927_even: ["2", "2+0", "2+0=2"],
  q_t_80927_diff: ["22", "24-2=22"],
  q_t_80927_div: ["yes", "y"],
  q_t_83568_odd: ["21", "8+5+8", "8+5+8=21"],
  q_t_83568_even: ["9", "6+3", "6+3=9"],
  q_t_83568_diff: ["12", "21-9=12"],
  q_t_83568_div: ["no", "n"],
  q_obs: ["0 or 11", "zero or divisible by 11"], // open ended
};

/* ─────────────────────────────────────────────
   Reveal text shown when teacher presses Reveal
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_dt_1: "Yes (104 is divisible by 8)",
  q_dt_2: "104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192",
  q_t_29843_odd: "13",
  q_t_29843_even: "13",
  q_t_29843_diff: "0",
  q_t_29843_div: "Yes",
  q_t_90002_odd: "11",
  q_t_90002_even: "0",
  q_t_90002_diff: "11",
  q_t_90002_div: "Yes",
  q_t_80927_odd: "24",
  q_t_80927_even: "2",
  q_t_80927_diff: "22",
  q_t_80927_div: "Yes",
  q_t_83568_odd: "21",
  q_t_83568_even: "9",
  q_t_83568_diff: "12",
  q_t_83568_div: "No",
  q_obs: "Difference is 0 or divisible by 11",
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
export function C6MathsCh3Page18() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page18";

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
      if (id === "q_dt_2") {
        correct = typed.length >= 15 || typed.includes("104");
      } else {
        correct =
          correctAnswers.some((ans) => typed.includes(normalize(ans))) ||
          rawTyped.trim().length >= 5;
      }
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
      <div className="relative w-full h-full min-h-[38px]">
        <input
          type="text"
          id={`field-${id}`}
          placeholder={placeholder}
          value={isRevealed ? REVEAL_TEXT[id] ?? "" : answers[id] ?? ""}
          onChange={(e) => handleChange(id, e.target.value)}
          onBlur={() => handleBlur(id, correct, isOpen)}
          disabled={isRevealed}
          className={`w-full h-full rounded-md sm:rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 pr-6 sm:pr-8 text-xs sm:text-sm font-mono outline-none transition-colors ${borderCls(id, answers, graded, isRevealed)}`}
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
      <div className="rounded-xl border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 p-4 text-sm sm:text-base">
        <p className="font-bold text-indigo-900 dark:text-indigo-100">
          A number with 4 or more digits is divisible by 8, if the number formed by its last three digits is divisible by 8.
        </p>
        <p className="mt-2 text-muted-foreground text-xs sm:text-sm italic">
          The divisibility for numbers with 1, 2 or 3 digits by 8 has to be checked by actual division.
        </p>
      </div>

      {/* Do This */}
      <div className="rounded-2xl border-2 border-emerald-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-emerald-600 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span>📝</span> Do This
        </div>
        <div className="p-5 bg-emerald-50/60 dark:bg-emerald-950/20 space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
              1. Is 76104 divisible by 8?
            </p>
            <div className="w-full sm:w-1/3">
              <Field id="q_dt_1" placeholder="Yes / No" correct={CORRECT.q_dt_1} />
            </div>
          </div>
          <div className="space-y-3 pt-4 border-t border-emerald-200 dark:border-emerald-800/50">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
              2. Write the numbers that are divisible by 8 & lie between 100 and 200?
            </p>
            <Field id="q_dt_2" placeholder="e.g. 104, 112..." correct={CORRECT.q_dt_2} isOpen />
          </div>
        </div>
      </div>

      {/* 3.9.3 Divisibility Rule for 11 */}
      <div className="rounded-2xl border-2 border-teal-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-teal-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono text-sm">3.9.3</span>
          Divisibility Rule for 11
        </div>
        
        <div className="p-5 space-y-6">
          <p className="font-semibold text-teal-900 dark:text-teal-200">
            Fill in the blanks and complete the table.
          </p>

          {/* Interactive Table */}
          <div className="overflow-x-auto rounded-xl border border-teal-200 dark:border-teal-800 shadow-sm">
            <table className="w-full text-xs sm:text-sm text-left border-collapse min-w-[600px]">
              <thead className="bg-teal-100 dark:bg-teal-900/40 text-teal-900 dark:text-teal-200 font-semibold">
                <tr>
                  <th className="border border-teal-200 dark:border-teal-800 px-3 py-3 text-center">Number</th>
                  <th className="border border-teal-200 dark:border-teal-800 px-3 py-3 text-center">Sum of digits at odd places<br/>(from the right)</th>
                  <th className="border border-teal-200 dark:border-teal-800 px-3 py-3 text-center">Sum of digits at even places<br/>(from the right)</th>
                  <th className="border border-teal-200 dark:border-teal-800 px-3 py-3 text-center">Difference</th>
                  <th className="border border-teal-200 dark:border-teal-800 px-3 py-3 text-center">Is the difference<br/>divisible by 11?</th>
                </tr>
              </thead>
              <tbody className="bg-teal-50/30 dark:bg-teal-950/20 divide-y divide-teal-200 dark:divide-teal-800">
                
                {/* Row 1 */}
                <tr className="hover:bg-teal-100/50 dark:hover:bg-teal-900/30 transition-colors">
                  <td className="border border-teal-200 dark:border-teal-800 px-3 py-2 text-center font-mono">29843</td>
                  <td className="border border-teal-200 dark:border-teal-800 p-2"><Field id="q_t_29843_odd" placeholder="e.g. 13" correct={CORRECT.q_t_29843_odd} /></td>
                  <td className="border border-teal-200 dark:border-teal-800 p-2"><Field id="q_t_29843_even" placeholder="e.g. 13" correct={CORRECT.q_t_29843_even} /></td>
                  <td className="border border-teal-200 dark:border-teal-800 p-2"><Field id="q_t_29843_diff" placeholder="e.g. 0" correct={CORRECT.q_t_29843_diff} /></td>
                  <td className="border border-teal-200 dark:border-teal-800 p-2"><Field id="q_t_29843_div" placeholder="Yes/No" correct={CORRECT.q_t_29843_div} /></td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-teal-100/50 dark:hover:bg-teal-900/30 transition-colors">
                  <td className="border border-teal-200 dark:border-teal-800 px-3 py-2 text-center font-mono">90002</td>
                  <td className="border border-teal-200 dark:border-teal-800 p-2"><Field id="q_t_90002_odd" placeholder="?" correct={CORRECT.q_t_90002_odd} /></td>
                  <td className="border border-teal-200 dark:border-teal-800 p-2"><Field id="q_t_90002_even" placeholder="?" correct={CORRECT.q_t_90002_even} /></td>
                  <td className="border border-teal-200 dark:border-teal-800 p-2"><Field id="q_t_90002_diff" placeholder="?" correct={CORRECT.q_t_90002_diff} /></td>
                  <td className="border border-teal-200 dark:border-teal-800 p-2"><Field id="q_t_90002_div" placeholder="Yes/No" correct={CORRECT.q_t_90002_div} /></td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-teal-100/50 dark:hover:bg-teal-900/30 transition-colors">
                  <td className="border border-teal-200 dark:border-teal-800 px-3 py-2 text-center font-mono">80927</td>
                  <td className="border border-teal-200 dark:border-teal-800 p-2"><Field id="q_t_80927_odd" placeholder="?" correct={CORRECT.q_t_80927_odd} /></td>
                  <td className="border border-teal-200 dark:border-teal-800 p-2"><Field id="q_t_80927_even" placeholder="?" correct={CORRECT.q_t_80927_even} /></td>
                  <td className="border border-teal-200 dark:border-teal-800 p-2"><Field id="q_t_80927_diff" placeholder="?" correct={CORRECT.q_t_80927_diff} /></td>
                  <td className="border border-teal-200 dark:border-teal-800 p-2"><Field id="q_t_80927_div" placeholder="Yes/No" correct={CORRECT.q_t_80927_div} /></td>
                </tr>

                {/* Row 4 (Pre-filled example from book) */}
                <tr className="bg-teal-100/30 dark:bg-teal-900/10">
                  <td className="border border-teal-200 dark:border-teal-800 px-3 py-3 text-center font-mono">19091908</td>
                  <td className="border border-teal-200 dark:border-teal-800 px-3 py-3 text-center text-muted-foreground">8+9+9+9=35</td>
                  <td className="border border-teal-200 dark:border-teal-800 px-3 py-3 text-center text-muted-foreground">0+1+0+1=2</td>
                  <td className="border border-teal-200 dark:border-teal-800 px-3 py-3 text-center text-muted-foreground">35-2=33</td>
                  <td className="border border-teal-200 dark:border-teal-800 px-3 py-3 text-center text-muted-foreground">Yes</td>
                </tr>

                {/* Row 5 */}
                <tr className="hover:bg-teal-100/50 dark:hover:bg-teal-900/30 transition-colors">
                  <td className="border border-teal-200 dark:border-teal-800 px-3 py-2 text-center font-mono">83568</td>
                  <td className="border border-teal-200 dark:border-teal-800 p-2"><Field id="q_t_83568_odd" placeholder="?" correct={CORRECT.q_t_83568_odd} /></td>
                  <td className="border border-teal-200 dark:border-teal-800 p-2"><Field id="q_t_83568_even" placeholder="?" correct={CORRECT.q_t_83568_even} /></td>
                  <td className="border border-teal-200 dark:border-teal-800 p-2"><Field id="q_t_83568_diff" placeholder="?" correct={CORRECT.q_t_83568_diff} /></td>
                  <td className="border border-teal-200 dark:border-teal-800 p-2"><Field id="q_t_83568_div" placeholder="Yes/No" correct={CORRECT.q_t_83568_div} /></td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Observations */}
          <div className="space-y-4 pt-4 text-sm sm:text-base">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <span className="font-semibold text-teal-900 dark:text-teal-200">What do you observe from the table?</span>
              <div className="flex-1">
                <Field id="q_obs" placeholder="The difference is..." correct={CORRECT.q_obs} isOpen />
              </div>
            </div>
            
            <p className="bg-teal-50 dark:bg-teal-950/30 p-4 rounded-xl border border-teal-100 dark:border-teal-800">
              We observe that in each case the difference is either <strong>0 or divisible by 11</strong>. All these numbers are also divisible by 11.
            </p>
            
            <p className="text-muted-foreground">
              For the number 83568, the difference is 12 which is not divisible by 11. The number 83568 is also not divisible by 11.
            </p>

            <div className="rounded-xl border-l-4 border-teal-500 bg-teal-100 dark:bg-teal-900/40 p-4 font-bold text-teal-900 dark:text-teal-100">
              A given number is divisible by 11, if the difference between the sum of the digits at odd places and the sum of the digits at even places (from the right) is either 0 or divisible by 11.
            </div>
          </div>

          {/* Examples 10 & 11 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            
            {/* Example 10 */}
            <div className="border border-teal-200 dark:border-teal-800/50 rounded-xl p-4 space-y-3">
              <p className="font-bold text-teal-900 dark:text-teal-200">Example-10</p>
              <p className="font-semibold text-sm">Is 6535 divisible by 11?</p>
              <div className="text-xs space-y-2 pl-2">
                <p><strong>Solution:</strong></p>
                <p>Sum of the digits at odd places = 5 + 5 = 10</p>
                <p>Sum of the digits at even places = 3 + 6 = 9</p>
                <p>Their difference = 10 - 9 = 1</p>
                <p>Is 1 divisible by 11? <strong>No</strong></p>
                <p className="font-semibold text-red-600 dark:text-red-400 mt-2">
                  So, 6535 is not divisible by 11.
                </p>
              </div>
            </div>

            {/* Example 11 */}
            <div className="border border-teal-200 dark:border-teal-800/50 rounded-xl p-4 space-y-3">
              <p className="font-bold text-teal-900 dark:text-teal-200">Example-11</p>
              <p className="font-semibold text-sm">Is 1221 divisible by 11?</p>
              <div className="text-xs space-y-2 pl-2">
                <p><strong>Solution:</strong></p>
                <p>Sum of the digits at odd places = 1 + 2 = 3</p>
                <p>Sum of the digits at even places = 2 + 1 = 3</p>
                <p>Their difference = 3 - 3 = 0</p>
                <p className="font-semibold text-green-600 dark:text-green-400 mt-2">
                  So, 1221 is divisible by 11.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
