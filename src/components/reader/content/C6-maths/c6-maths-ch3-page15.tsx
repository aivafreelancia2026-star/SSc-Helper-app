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
  "q_rel_observe",
  "q_tdw_1_hcf",
  "q_tdw_1_lcm",
  "q_tdw_2",
  "q_ex_1i_hcf",
  "q_ex_1i_lcm",
  "q_ex_1ii_hcf",
  "q_ex_1ii_lcm",
  "q_ex_1iii_hcf",
  "q_ex_1iii_lcm",
  "q_ex_2",
  "q_ex_3",
  "q_ex_4",
];

/* ─────────────────────────────────────────────
   Correct answers (normalised, lower-case)
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  q_rel_observe: ["product", "equal"],
  q_tdw_1_hcf: ["1", "one"],
  q_tdw_1_lcm: ["product", "productofthetwonumbers"],
  q_tdw_2: ["lcmxhcf=product", "productoflcmandhcfisproductofnumbers"],
  q_ex_1i_hcf: ["3"],
  q_ex_1i_lcm: ["120"],
  q_ex_1ii_hcf: ["1"],
  q_ex_1ii_lcm: ["200"],
  q_ex_1iii_hcf: ["12"],
  q_ex_1iii_lcm: ["48"],
  q_ex_2: ["36"],
  q_ex_3: ["546"],
  q_ex_4: ["18"],
};

/* ─────────────────────────────────────────────
   Reveal text shown when teacher presses Reveal
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_rel_observe: "They are equal",
  q_tdw_1_hcf: "1",
  q_tdw_1_lcm: "Product of the numbers",
  q_tdw_2: "LCM × HCF = Product of numbers",
  q_ex_1i_hcf: "3",
  q_ex_1i_lcm: "120",
  q_ex_1ii_hcf: "1",
  q_ex_1ii_lcm: "200",
  q_ex_1iii_hcf: "12",
  q_ex_1iii_lcm: "48",
  q_ex_2: "36",
  q_ex_3: "546",
  q_ex_4: "18",
};

/* ─────────────────────────────────────────────
   Helpers (pure functions, outside component)
───────────────────────────────────────────── */
const normalize = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9=]/g, "");

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
export function C6MathsCh3Page15() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page15";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded]   = useState<Record<string, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number } | null>(null);
  const [tdwOpen, setTdwOpen] = useState(false);

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
      setTdwOpen(false);
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

      {/* 3.8 Relationship between LCM and HCF */}
      <div className="rounded-2xl border-2 border-fuchsia-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-fuchsia-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono text-sm">3.8</span>
          Relationship between LCM and HCF
        </div>
        <div className="p-5 space-y-6">
          <div className="space-y-3 text-sm sm:text-base">
            <p>Consider the numbers <strong>18 and 27</strong>.</p>
            <div className="pl-4 border-l-2 border-fuchsia-200 dark:border-fuchsia-800 space-y-1">
              <p>Product of prime factors of 18 = 2 × 3 × 3</p>
              <p>Product of prime factors of 27 = 3 × 3 × 3</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="rounded-xl bg-fuchsia-50/50 dark:bg-fuchsia-950/20 border border-fuchsia-200 p-3 space-y-1">
                <p>LCM of 18 and 27 = 3 × 3 × 3 × 2 = <strong>54</strong></p>
                <p>HCF of 18 and 27 = 3 × 3 = <strong>9</strong></p>
                <p className="font-bold text-fuchsia-800 dark:text-fuchsia-300 mt-2">
                  LCM × HCF = 54 × 9 = 486
                </p>
              </div>
              <div className="rounded-xl bg-fuchsia-50/50 dark:bg-fuchsia-950/20 border border-fuchsia-200 p-3 flex flex-col justify-center">
                <p>Product of 18 and 27 = 18 × 27 = <strong>486</strong></p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="font-semibold text-fuchsia-900 dark:text-fuchsia-200">
              What do you observe?
            </p>
            <div className="w-full sm:w-1/2">
              <Field id="q_rel_observe" placeholder="They are..." correct={CORRECT.q_rel_observe} isOpen />
            </div>
          </div>

          <div className="rounded-xl bg-fuchsia-100 dark:bg-fuchsia-900/40 border border-fuchsia-300 p-4 text-center">
            <p className="text-base sm:text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100">
              Product of LCM and HCF of the two numbers = Product of the two numbers.
            </p>
          </div>

          <div className="rounded-xl border-2 border-fuchsia-200 dark:border-fuchsia-800/50 p-4 bg-fuchsia-50/50 dark:bg-fuchsia-950/20 space-y-3">
            <h4 className="font-heading font-bold text-base text-fuchsia-900 dark:text-fuchsia-200">
              Example 7
            </h4>
            <p className="text-sm font-semibold">
              Find the LCM of 8 and 12 and then find their HCF using the above relation.
            </p>
            <div className="text-sm space-y-2">
              <div className="flex gap-4">
                <p><strong>Solution:</strong></p>
                <p>LCM of 8 and 12 = 2 × 3 × 4 = 24</p>
                <table className="font-mono text-xs border-collapse mx-4">
                  <tbody>
                    <tr>
                      <td className="pr-2 text-right w-4 border-b border-fuchsia-200 dark:border-fuchsia-800">4</td>
                      <td className="px-1 border-r border-fuchsia-200 dark:border-fuchsia-800 text-muted-foreground border-b border-fuchsia-200 dark:border-fuchsia-800">|</td>
                      <td className="pl-1 border-b border-fuchsia-200 dark:border-fuchsia-800">8, 12</td>
                    </tr>
                    <tr>
                      <td className="pr-2"></td>
                      <td className="px-1 border-r border-fuchsia-200 dark:border-fuchsia-800 text-muted-foreground">|</td>
                      <td className="pl-1">2, 3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>We know, LCM × HCF = product of the two numbers</p>
              <div className="flex flex-col items-center max-w-xs mt-2 p-2 bg-white dark:bg-black/20 rounded-lg border border-fuchsia-100">
                <div className="flex items-center gap-2">
                  <span>HCF =</span>
                  <div className="flex flex-col items-center">
                    <span className="border-b border-foreground/50 px-2 pb-0.5">Product of the two numbers</span>
                    <span className="pt-0.5">LCM</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span>=</span>
                  <div className="flex flex-col items-center">
                    <span className="border-b border-foreground/50 px-2 pb-0.5">8 × 12</span>
                    <span className="pt-0.5">24</span>
                  </div>
                  <span>= 4</span>
                </div>
              </div>
              <p className="font-bold text-fuchsia-800 dark:text-fuchsia-300 mt-2">
                Hence, HCF of 8 and 12 = 4
              </p>
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
        <div className="p-5 bg-emerald-50/60 dark:bg-emerald-950/20 space-y-5">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
              1. What is the LCM and HCF of twin-prime numbers?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">HCF:</span>
                <div className="flex-1"><Field id="q_tdw_1_hcf" placeholder="HCF = ?" correct={CORRECT.q_tdw_1_hcf} /></div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">LCM:</span>
                <div className="flex-1"><Field id="q_tdw_1_lcm" placeholder="LCM = ?" correct={CORRECT.q_tdw_1_lcm} isOpen /></div>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-emerald-200 dark:border-emerald-800/50">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
              2. Interpret relationship between LCM and HCF of any two numbers.
            </p>
            <Field id="q_tdw_2" placeholder="Formula relating them..." correct={CORRECT.q_tdw_2} isOpen />
          </div>

          <button
            onClick={() => setTdwOpen((v) => !v)}
            className="text-xs font-semibold text-emerald-700 underline underline-offset-4 hover:text-emerald-500 transition-colors"
          >
            {tdwOpen ? "▲ Hide Answers" : "▼ Show Answers"}
          </button>
          {tdwOpen && (
            <div className="rounded-xl bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-300 p-4 text-sm space-y-2">
              <p>✅ <strong>1.</strong> Twin-primes are always co-prime, so their <strong>HCF is 1</strong> and their <strong>LCM is their product</strong>.</p>
              <p>✅ <strong>2.</strong> The relationship is: <strong>LCM × HCF = Product of the two numbers</strong>.</p>
            </div>
          )}
        </div>
      </div>

      {/* Exercise 3.6 */}
      <div className="rounded-2xl border-2 border-indigo-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-indigo-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span>✏️</span> Exercise 3.6
        </div>
        <div className="p-5 space-y-8">
          
          {/* Q1 */}
          <div className="space-y-4">
            <p className="font-semibold text-sm sm:text-base">
              <strong>1.</strong> Find the LCM and HCF of the following numbers. Check their relationship.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { idPrefix: "q_ex_1i", label: "i) 15, 24" },
                { idPrefix: "q_ex_1ii", label: "ii) 8, 25" },
                { idPrefix: "q_ex_1iii", label: "iii) 12, 48" },
              ].map(({ idPrefix, label }) => (
                <div key={idPrefix} className="rounded-xl border border-indigo-200 bg-indigo-50/40 dark:bg-indigo-950/20 p-4 space-y-3">
                  <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200 border-b border-indigo-200 dark:border-indigo-800 pb-2 mb-2">{label}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold w-8">HCF:</span>
                      <Field id={`${idPrefix}_hcf`} placeholder="?" correct={CORRECT[`${idPrefix}_hcf`]} />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold w-8">LCM:</span>
                      <Field id={`${idPrefix}_lcm`} placeholder="?" correct={CORRECT[`${idPrefix}_lcm`]} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 p-3 text-xs text-indigo-800 dark:text-indigo-300">
              <strong>Verification check:</strong> Do they satisfy LCM × HCF = Product of the numbers? (Yes, they all do!)
            </div>
          </div>

          {/* Q2 */}
          <div className="space-y-3 pt-4 border-t border-indigo-200 dark:border-indigo-800/50">
            <p className="text-sm sm:text-base font-semibold">
              <strong>2.</strong> If the LCM of two numbers is 216 and their product is 7776, what will be the HCF?
            </p>
            <div className="w-full sm:w-1/2">
              <Field id="q_ex_2" placeholder="HCF = ?" correct={CORRECT.q_ex_2} />
            </div>
          </div>

          {/* Q3 */}
          <div className="space-y-3 pt-4 border-t border-indigo-200 dark:border-indigo-800/50">
            <p className="text-sm sm:text-base font-semibold">
              <strong>3.</strong> The product of two numbers is 3276. If their HCF is 6, find their LCM?
            </p>
            <div className="w-full sm:w-1/2">
              <Field id="q_ex_3" placeholder="LCM = ?" correct={CORRECT.q_ex_3} />
            </div>
          </div>

          {/* Q4 */}
          <div className="space-y-3 pt-4 border-t border-indigo-200 dark:border-indigo-800/50">
            <p className="text-sm sm:text-base font-semibold">
              <strong>4.</strong> The HCF of two numbers is 6 and their LCM is 36. If one of the numbers is 12, find the other number.
            </p>
            <div className="w-full sm:w-1/2">
              <Field id="q_ex_4" placeholder="Other number = ?" correct={CORRECT.q_ex_4} />
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
