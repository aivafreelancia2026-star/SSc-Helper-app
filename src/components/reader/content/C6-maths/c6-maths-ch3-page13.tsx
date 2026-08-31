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
  "q_ex5_lcm",
  "q_try_1i",
  "q_try_1ii",
  "q_try_1iii",
  "q_try_1iv",
  "q_try_1v",
  "q_try_1vi",
  "q_try_obs1",
  "q_try_obs2",
];

/* ─────────────────────────────────────────────
   Correct answers (normalised, lower-case)
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  q_ex5_lcm: ["12", "twelve"],
  q_try_1i: ["12"],
  q_try_1ii: ["110"],
  q_try_1iii: ["210"],
  q_try_1iv: ["30"],
  q_try_1v: ["24"],
  q_try_1vi: ["12"],
  q_try_obs1: ["product"],
  q_try_obs2: ["largest"],
};

/* ─────────────────────────────────────────────
   Reveal text shown when teacher presses Reveal
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_ex5_lcm: "12",
  q_try_1i: "12",
  q_try_1ii: "110",
  q_try_1iii: "210",
  q_try_1iv: "30",
  q_try_1v: "24",
  q_try_1vi: "12",
  q_try_obs1: "product",
  q_try_obs2: "largest",
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
export function C6MathsCh3Page13() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page13";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded]   = useState<Record<string, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number } | null>(null);
  const [obsOpen, setObsOpen] = useState(false);

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
      setObsOpen(false);
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

      {/* 3.7.1 Least common Multiple (LCM) */}
      <div className="rounded-2xl border-2 border-purple-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-purple-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono text-sm">3.7.1</span>
          Least Common Multiple (LCM)
        </div>
        <div className="p-5 space-y-5">
          <div className="space-y-2">
            <p className="text-sm sm:text-base">
              Common multiples of both 4 and 6 are 12, 24, 36, ...
            </p>
            <p className="text-sm sm:text-base">
              Least of them is <strong>12</strong>.
            </p>
            <p className="text-sm sm:text-base">
              That means 12 is the lowest among the common multiples of both 4 and 6.
            </p>
            <div className="rounded-xl border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/30 pl-4 py-3 pr-3 text-sm font-bold text-purple-900 dark:text-purple-200">
              ∴ Lowest Common Multiple (LCM) of 4 and 6 is 12
            </div>
          </div>

          <div className="rounded-xl border border-purple-200 p-4 space-y-4">
            <h4 className="font-heading font-bold text-base text-purple-900 dark:text-purple-200">
              Example-5
            </h4>
            <p className="text-sm font-semibold">
              Two bells ring together. If the bells ring at every 3 minutes and 4 minutes respectively. After what interval of time will they ring together again?
            </p>
            
            <div className="space-y-2 text-sm text-foreground/80">
              <p><strong>Solution:</strong> First bell rings after every 3 minutes.</p>
              <p className="pl-4 font-mono text-xs text-muted-foreground">i.e. First bell rings at 3 min, 6, 9, 12, 15, 18, 21, 24, ... (multiples of 3)</p>
              
              <p>Second bell rings after every 4 minutes.</p>
              <p className="pl-4 font-mono text-xs text-muted-foreground">i.e. Second bell rings at 4 min, 8, 12, 16, 20, 24, ... (multiples of 4)</p>
              
              <p>both bells ring together after 12 min, 24 min, ... (common multiples of both 3 and 4)</p>
            </div>
            
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-purple-900 dark:text-purple-200">
                Least of them (LCM) is:
              </p>
              <div className="w-24">
                <Field id="q_ex5_lcm" placeholder="? min" correct={CORRECT.q_ex5_lcm} />
              </div>
            </div>
            
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">
              That means after 12 minutes they ring together again.
            </p>
          </div>
          
          <div className="rounded-xl bg-purple-100 dark:bg-purple-900/40 border border-purple-300 p-4 text-sm font-semibold text-purple-900 dark:text-purple-100">
            <p>Thus, we can say that,</p>
            <p className="mt-2 text-base">
              <strong>The least common multiple of two or more given numbers is the lowest (or smallest or least) of their common multiples.</strong>
            </p>
            <p className="mt-2 text-foreground/70 text-xs">
              Instead of writing all the common multiples of the given numbers every time to identify the least one of them, we can just find the LCM of those numbers directly.
            </p>
          </div>
        </div>
      </div>

      {/* 3.7.2 Methods of Finding LCM */}
      <div className="rounded-2xl border-2 border-indigo-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-indigo-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono text-sm">3.7.2</span>
          Methods of Finding LCM
        </div>
        
        <div className="p-5 space-y-6">
          
          {/* 1. Prime Factorization Method */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-base text-indigo-900 dark:text-indigo-200">
              1. Prime Factorization Method
            </h4>
            <p className="text-sm">
              The LCM of 36 and 60 can be found by prime factorization method as follows:-
            </p>
            
            <div className="rounded-xl border border-indigo-200 p-4 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-3 font-mono text-sm">
              <p className="font-semibold font-body text-indigo-900 dark:text-indigo-200">
                Step-1: Express each number as a product of prime factors.
              </p>
              <div className="pl-4 space-y-1 text-xs">
                <p>Factors of 36 = 2 × 2 × 3 × 3</p>
                <p>Factors of 60 = 2 × 2 × 3 × 5</p>
              </div>
              
              <p className="font-semibold font-body text-indigo-900 dark:text-indigo-200">
                Step-2: Take the common factors of both.
              </p>
              <p className="pl-4 text-xs">2 × 2 × 3</p>
              
              <p className="font-semibold font-body text-indigo-900 dark:text-indigo-200">
                Step-3: Take the extra factors of both 36 and 60.
              </p>
              <p className="pl-4 text-xs">i.e. 3 and 5.</p>
              
              <p className="font-semibold font-body text-indigo-900 dark:text-indigo-200">
                Step-4: LCM is found by the product of all common prime factors of two numbers and extra prime factors of both.
              </p>
              <p className="pl-4 font-bold text-indigo-700 dark:text-indigo-400">
                Hence, the LCM of 36 and 60 = (2 × 2 × 3) × 3 × 5 = 180
              </p>
            </div>
          </div>
          
          {/* Try This */}
          <div className="rounded-2xl border-2 border-emerald-400 overflow-hidden shadow-sm">
            <div className="bg-emerald-500 text-white font-heading font-bold px-5 py-3 flex items-center gap-3 text-lg">
              <span>📌</span> Try This
            </div>
            
            <div className="p-5 bg-emerald-50/60 dark:bg-emerald-950/20 space-y-5">
              <p className="font-semibold text-emerald-900 dark:text-emerald-200">
                1. Find LCM of:
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { id: "q_try_1i", label: "i. 3, 4" },
                  { id: "q_try_1ii", label: "ii. 10, 11" },
                  { id: "q_try_1iii", label: "iii. 5, 6, 7" },
                  { id: "q_try_1iv", label: "iv. 10, 30" },
                  { id: "q_try_1v", label: "v. 4, 12, 24" },
                  { id: "q_try_1vi", label: "vi. 3, 12" },
                ].map(({ id, label }) => (
                  <div key={id} className="space-y-1">
                    <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">{label}</p>
                    <Field id={id} placeholder="LCM = ?" correct={CORRECT[id]} />
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-emerald-200 dark:border-emerald-800/50 space-y-4">
                <p className="font-semibold text-sm text-emerald-900 dark:text-emerald-200">
                  What do you observe?
                </p>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      For co-prime numbers (like 3 and 4; 10 and 11), the LCM is their <span className="font-bold underline">_________</span>.
                    </p>
                    <div className="w-full sm:w-1/2">
                      <Field id="q_try_obs1" placeholder="sum / product / difference" correct={CORRECT.q_try_obs1} isOpen />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      When one number is a factor of the other (like 10 and 30; 3 and 12), the LCM is the <span className="font-bold underline">_________</span> number.
                    </p>
                    <div className="w-full sm:w-1/2">
                      <Field id="q_try_obs2" placeholder="largest / smallest" correct={CORRECT.q_try_obs2} isOpen />
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setObsOpen((v) => !v)}
                  className="text-xs font-semibold text-emerald-700 underline underline-offset-4 hover:text-emerald-500 transition-colors"
                >
                  {obsOpen ? "▲ Hide Observations" : "▼ Show Observations"}
                </button>
                {obsOpen && (
                  <div className="rounded-xl bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-300 p-4 text-sm space-y-2">
                    <p>✅ The LCM of co-prime numbers is equal to their <strong>product</strong>.</p>
                    <p>✅ If one number is a factor of the other number, then their LCM is the <strong>largest number</strong> itself.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
