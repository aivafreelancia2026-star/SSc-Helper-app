"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs (Book Page 81 / PDF Page 89)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  // Ex 1
  "p90_ex1_i", "p90_ex1_ii", "p90_ex1_iii", "p90_ex1_iv", "p90_ex1_v", "p90_ex1_vi",
  // Ex 2
  "p90_ex2_i", "p90_ex2_ii", "p90_ex2_iii", "p90_ex2_iv", "p90_ex2_v", "p90_ex2_vi",
  // Ex 3
  "p90_ex3_i", "p90_ex3_ii", "p90_ex3_iii", "p90_ex3_iv"
];

const CORRECT: Record<string, string[]> = {
  // Ex 1
  p90_ex1_i: ["1", "+1"],
  p90_ex1_ii: ["-10"],
  p90_ex1_iii: ["-9"],
  p90_ex1_iv: ["0"],
  p90_ex1_v: ["-16"],
  p90_ex1_vi: ["3", "+3"],
  // Ex 2
  p90_ex2_i: ["7", "+7"],
  p90_ex2_ii: ["6", "+6"],
  p90_ex2_iii: ["0"],
  p90_ex2_iv: ["-115"],
  p90_ex2_v: ["-132"],
  p90_ex2_vi: ["6", "+6"],
  // Ex 3
  p90_ex3_i: ["-154"],
  p90_ex3_ii: ["-40"],
  p90_ex3_iii: ["199", "+199"],
  p90_ex3_iv: ["140", "+140"],
};

const REVEAL_TEXT: Record<string, string> = {
  p90_ex1_i: "1", p90_ex1_ii: "-10", p90_ex1_iii: "-9",
  p90_ex1_iv: "0", p90_ex1_v: "-16", p90_ex1_vi: "3",
  p90_ex2_i: "7", p90_ex2_ii: "6", p90_ex2_iii: "0",
  p90_ex2_iv: "-115", p90_ex2_v: "-132", p90_ex2_vi: "6",
  p90_ex3_i: "-154", p90_ex3_ii: "-40", p90_ex3_iii: "199", p90_ex3_iv: "140",
};

const normalize = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/[°º]/g, "")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9\-+]/g, "");

function validateAnswer(id: string, raw: string): boolean {
  const v = normalize(raw);
  if (!v) return false;
  const accepted = CORRECT[id];
  if (!accepted) return v.length >= 2;
  return accepted.some((a) => {
    const na = normalize(a);
    return na === v || v.includes(na) || na.includes(v);
  });
}

/* ─────────────────────────────────────────────
   Styling helpers
───────────────────────────────────────────── */
function borderCls(
  id: string,
  answers: Record<string, string>,
  graded: Record<string, { value: string; correct: boolean }>,
  isRevealed: boolean
) {
  if (isRevealed)
    return "border-emerald-500 bg-emerald-50 font-bold text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300";
  const typed = (answers[id] ?? "").trim();
  if (!typed) return "border-slate-300 dark:border-slate-700 focus:border-indigo-500 bg-background";
  const g = graded[id];
  if (g?.correct === true)
    return "border-green-500 bg-green-50 text-green-700 font-bold dark:bg-green-950/30 dark:text-green-300";
  if (g?.correct === false)
    return "border-red-400 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400";
  return "border-slate-300 dark:border-slate-700 focus:border-indigo-500 bg-background";
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
      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 select-none text-xs font-bold text-green-600 dark:text-green-400">
        ✓
      </span>
    );
  if (g?.correct === false)
    return (
      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 select-none text-xs font-bold text-red-500 dark:text-red-400">
        ✗
      </span>
    );
  return null;
}

/* ─────────────────────────────────────────────
   Shared Field Component
───────────────────────────────────────────── */
function Field({
  id,
  placeholder,
  answers,
  graded,
  isRevealed,
  handleChange,
  handleBlur,
  isOpen = false,
  className = "",
  multiLine = false,
}: {
  id: string;
  placeholder: string;
  answers: Record<string, string>;
  graded: Record<string, { value: string; correct: boolean }>;
  isRevealed: boolean;
  handleChange: (id: string, val: string) => void;
  handleBlur: (id: string, isOpen?: boolean) => void;
  isOpen?: boolean;
  className?: string;
  multiLine?: boolean;
}) {
  const displayVal = isRevealed ? REVEAL_TEXT[id] ?? "" : answers[id] ?? "";
  const baseCls = `w-full rounded-xl border px-3 py-2 text-xs sm:text-sm font-mono outline-none transition-all shadow-sm resize-none ${borderCls(
    id,
    answers,
    graded,
    isRevealed
  )}`;

  if (multiLine) {
    return (
      <div className={`relative w-full ${className}`}>
        <textarea
          id={`field-${id}`}
          rows={2}
          placeholder={placeholder}
          value={displayVal}
          onChange={(e) => handleChange(id, e.target.value)}
          onBlur={() => handleBlur(id, isOpen)}
          disabled={isRevealed}
          className={baseCls}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="text"
        id={`field-${id}`}
        placeholder={placeholder}
        value={displayVal}
        onChange={(e) => handleChange(id, e.target.value)}
        onBlur={() => handleBlur(id, isOpen)}
        disabled={isRevealed}
        className={`${baseCls} pr-7`}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleBlur(id, isOpen);
            e.currentTarget.blur();
          }
        }}
      />
      <StatusIcon id={id} answers={answers} graded={graded} isRevealed={isRevealed} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function C6MathsCh6Page9() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch6-page9";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<Record<string, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; label?: string; id: number } | null>(null);

  const answeredCount = ALL_INPUT_IDS.filter((id) => (answers[id] ?? "").trim().length > 0).length;
  const correctCount = ALL_INPUT_IDS.filter((id) => graded[id]?.correct === true).length;

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
      localStorage.removeItem(`${storageKey}-reveal-awarded`);
      setAnswers({});
      setGraded({});
      setFeedback(null);
      setShowReveal(false);
    };
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () => window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, [storageKey]);

  const handleResetPage = () => {
    ALL_INPUT_IDS.forEach((id) => {
      localStorage.removeItem(`${storageKey}-${id}-answer`);
      localStorage.removeItem(`${storageKey}-${id}-graded`);
    });
    localStorage.removeItem(`${storageKey}-reveal-awarded`);
    setAnswers({});
    setGraded({});
    setFeedback(null);
    setShowReveal(false);
  };

  const handleToggleReveal = () => {
    const next = !showReveal;
    setShowReveal(next);
    if (next) {
      const revealKey = `${storageKey}-reveal-awarded`;
      if (!localStorage.getItem(revealKey)) {
        addPoints(1);
        localStorage.setItem(revealKey, "1");
        setFeedback({ correct: true, label: "Answers Revealed! +1 pt", id: Date.now() });
      }
    }
  };

  const handleCheckAll = () => {
    if (isRevealed) return;
    let delta = 0;
    const newGraded = { ...graded };
    ALL_INPUT_IDS.forEach((id) => {
      const rawTyped = answers[id] ?? "";
      if (!rawTyped.trim()) return;
      const correct = validateAnswer(id, rawTyped);
      const prev = graded[id];
      if (prev) {
        if (!prev.correct && correct) delta += 2;
        else if (prev.correct && !correct) delta -= 2;
      } else {
        delta += correct ? 1 : -1;
      }
      newGraded[id] = { value: rawTyped, correct };
      localStorage.setItem(`${storageKey}-${id}-graded`, JSON.stringify({ value: rawTyped, correct }));
    });
    if (delta !== 0) addPoints(delta);
    setGraded(newGraded);
    setFeedback({ correct: delta >= 0, label: delta >= 0 ? `Scored! +${delta} pts` : `Reviewed!`, id: Date.now() });
  };

  const handleChange = (id: string, val: string) => {
    if (isRevealed) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
    localStorage.setItem(`${storageKey}-${id}-answer`, val);
  };

  const handleBlur = (id: string, isOpen = false) => {
    if (isRevealed) return;
    const rawTyped = answers[id] ?? "";
    if (!rawTyped.trim()) return;
    const prev = graded[id];
    if (prev && prev.value === rawTyped) return;
    const correct = isOpen ? rawTyped.trim().length >= 2 : validateAnswer(id, rawTyped);
    let delta = 0;
    if (prev) {
      if (!prev.correct && correct) delta = 2;
      else if (prev.correct && !correct) delta = -2;
    } else {
      delta = correct ? 1 : -1;
    }
    if (delta !== 0) addPoints(delta);
    setFeedback({ correct, label: correct ? "Correct! +1 pt" : "Try Again! -1 pt", id: Date.now() });
    const next = { ...graded, [id]: { value: rawTyped, correct } };
    setGraded(next);
    localStorage.setItem(`${storageKey}-${id}-graded`, JSON.stringify({ value: rawTyped, correct }));
  };

  const fp = { answers, graded, isRevealed, handleChange, handleBlur };

  return (
    <div className="space-y-8 text-foreground leading-relaxed font-body max-w-5xl mx-auto pb-12">
      {feedback && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          label={feedback.label || "Correct! +1 pt"}
          wrongLabel={feedback.label || "Try Again! -1 pt"}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* ══════════════════════════════════════
          PAGE HEADER
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-indigo-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-indigo-800 via-blue-700 to-indigo-800 text-white font-heading font-bold px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-white/20 text-xl font-black px-4">6.7</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">Addition of Integers & Exercise 6.3</h1>
              <p className="text-xs text-indigo-100 font-normal">
                Class 6 Maths &bull; Chapter 6 &bull; Integers
              </p>
            </div>
          </div>
          <span className="text-xs bg-indigo-950/80 text-indigo-200 px-3 py-1 rounded-full border border-indigo-400/30 font-mono self-start sm:self-auto font-bold">
            Page 89
          </span>
        </div>

        {/* Score & Action Bar */}
        <div className="bg-indigo-50/80 dark:bg-indigo-950/30 border-b border-indigo-200 dark:border-indigo-800/60 p-4 px-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700/60 rounded-xl px-3.5 py-1.5">
              <span className="text-base">⭐</span>
              <span className="text-xs font-semibold text-muted-foreground">Total Points:</span>
              <span className="font-heading font-bold text-indigo-700 dark:text-indigo-300 text-sm">{score}</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700/60 rounded-xl px-3.5 py-1.5">
              <span className="text-xs font-semibold text-muted-foreground">Progress:</span>
              <span className="font-mono text-xs font-bold text-foreground">
                {answeredCount}/{ALL_INPUT_IDS.length} answered
              </span>
              {correctCount > 0 && (
                <span className="text-[11px] bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 px-2 py-0.5 rounded-full font-bold">
                  {correctCount} correct
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCheckAll}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-semibold text-xs transition-colors cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <span>✓</span>
              <span>Check Answers</span>
            </button>
            <button
              type="button"
              onClick={handleToggleReveal}
              className={`px-4 py-1.5 rounded-xl border text-xs font-heading font-semibold transition-colors cursor-pointer active:scale-95 flex items-center gap-1.5 ${
                isRevealed
                  ? "bg-amber-600 text-white border-amber-700"
                  : "bg-white dark:bg-slate-800 text-foreground border-slate-300 dark:border-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>{isRevealed ? "🙈" : "👁️"}</span>
              <span>{isRevealed ? "Hide Key" : "Reveal Answers"}</span>
            </button>
            <button
              type="button"
              onClick={handleResetPage}
              className="px-3 py-1.5 rounded-xl border border-red-300 dark:border-red-800/60 bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 hover:bg-red-50 text-xs font-heading font-semibold transition-colors cursor-pointer"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm text-foreground/90 leading-relaxed">
        
        {/* Observations Section */}
        <div className="space-y-6">
          <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-200">Observe the following:</h3>
          
          <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-wrap gap-x-12 gap-y-2 font-mono">
              <span className="font-semibold text-slate-500">(i)</span>
              <span>3 + 2 = 5</span>
              <span>20 + 6 = 26</span>
              <span>30 + 22 = 52</span>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-2 font-mono pl-16">
              <span>8 + 16 = 24</span>
              <span>9 + 10 = 19</span>
              <span>20 + 14 = 34</span>
            </div>
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300 pt-2 border-t border-slate-200 dark:border-slate-800">
              We can see that the sum of two positive integers is also a positive number.
            </p>
          </div>

          <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-200">Look at the following now:</h3>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-wrap gap-x-12 gap-y-2 font-mono">
              <span className="font-semibold text-slate-500">(ii)</span>
              <span>-4 + (-6) = -10</span>
              <span>-8 + (-12) = -20</span>
              <span>-3 + (-9) = -12</span>
            </div>
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300 pt-2 border-t border-slate-200 dark:border-slate-800">
              What do you learn from this? The sum of two negative integers is always a negative integer.
            </p>
          </div>

          <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-200">What happens if one integer is positive and the other negative? Let us see these:</h3>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-wrap gap-x-12 gap-y-2 font-mono">
              <span className="font-semibold text-slate-500">(iii)</span>
              <span>15 + (-17) = -2</span>
              <span>-23 + 4 = -19</span>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-2 font-mono pl-16">
              <span>-11 + 16 = 5</span>
              <span>-12 + 12 = 0</span>
            </div>
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300 pt-2 border-t border-slate-200 dark:border-slate-800">
              From the above, we can conclude that when we add two integers one of which is positive and the other negative, then the sum may be either positive, negative or zero.
            </p>
          </div>
        </div>

        {/* Examples Section */}
        <div className="space-y-6 pt-4">
          <div className="bg-blue-50/50 dark:bg-blue-950/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/50 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <span className="font-bold text-blue-800 dark:text-blue-300 whitespace-nowrap">Example-1.</span>
              <div>
                <p className="font-medium mb-3">Find the sum of <span className="font-mono bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">(-10) + (+14) + (-5) + (+8)</span></p>
                <div className="flex gap-3">
                  <span className="font-semibold italic text-slate-600 dark:text-slate-400">Solution:</span>
                  <div className="space-y-2">
                    <p>We can rearrange the numbers so that the positive integers and the negative integers group together. We have:</p>
                    <div className="font-mono bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                      <div>(-10) + (+14) + (-5) + (+8)</div>
                      <div>= (-10) + (-5) + (+14) + (+8)</div>
                      <div>= -15 + 22 = <span className="font-bold text-blue-600 dark:text-blue-400">7</span>.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/50 dark:bg-blue-950/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/50 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <span className="font-bold text-blue-800 dark:text-blue-300 whitespace-nowrap">Example-2.</span>
              <div>
                <p className="font-medium mb-3">Find the sum of <span className="font-mono bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">(-20), (-82), (-28) and (-14)</span>.</p>
                <div className="flex gap-3">
                  <span className="font-semibold italic text-slate-600 dark:text-slate-400">Solution:</span>
                  <div className="font-mono bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div>(-20) + (-82) + (-28) + (-14)</div>
                    <div>= <span className="font-bold text-blue-600 dark:text-blue-400">-144</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/50 dark:bg-blue-950/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/50 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <span className="font-bold text-blue-800 dark:text-blue-300 whitespace-nowrap">Example-3.</span>
              <div>
                <p className="font-medium mb-3">Find the sum of <span className="font-mono bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">25 + (-21) + (-20) + (+17) + (-1)</span></p>
                <div className="flex gap-3">
                  <span className="font-semibold italic text-slate-600 dark:text-slate-400">Solution:</span>
                  <div className="font-mono bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div>25 + (-21) + (-20) + (+17) + (-1)</div>
                    <div>= 25 + (+17) + (-21) + (-20) + (-1)</div>
                    <div>= 42 - 42 = <span className="font-bold text-blue-600 dark:text-blue-400">0</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EXERCISE 6.3 */}
        <div className="border-2 border-emerald-600/40 rounded-2xl overflow-hidden shadow-sm mt-8">
          <div className="bg-emerald-600 text-white font-bold px-4 py-3 flex items-center justify-center gap-2 tracking-wide shadow-md">
            <h2 className="text-xl tracking-wider">EXERCISE - 6.3</h2>
          </div>
          
          <div className="p-6 sm:p-8 bg-emerald-50/20 dark:bg-emerald-950/5 space-y-10">
            
            {/* Question 1 */}
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="font-bold text-lg text-emerald-800 dark:text-emerald-400">1.</span>
                <p className="font-semibold text-lg">Add the following integers using number line.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pl-8">
                <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700 dark:text-emerald-500">(i)</span>
                    <span className="font-mono font-medium">7 + (-6) =</span>
                  </div>
                  <Field id="p90_ex1_i" placeholder="Value" {...fp} />
                </div>
                <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700 dark:text-emerald-500">(ii)</span>
                    <span className="font-mono font-medium">(-8) + (-2) =</span>
                  </div>
                  <Field id="p90_ex1_ii" placeholder="Value" {...fp} />
                </div>
                <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700 dark:text-emerald-500">(iii)</span>
                    <span className="font-mono font-medium">(-6) + (-5) + (+2) =</span>
                  </div>
                  <Field id="p90_ex1_iii" placeholder="Value" {...fp} />
                </div>
                <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700 dark:text-emerald-500">(iv)</span>
                    <span className="font-mono font-medium">(-8) + (-9) + (+17) =</span>
                  </div>
                  <Field id="p90_ex1_iv" placeholder="Value" {...fp} />
                </div>
                <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700 dark:text-emerald-500">(v)</span>
                    <span className="font-mono font-medium">(-3) + (-8) + (-5) =</span>
                  </div>
                  <Field id="p90_ex1_v" placeholder="Value" {...fp} />
                </div>
                <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700 dark:text-emerald-500">(vi)</span>
                    <span className="font-mono font-medium">(-1) + 7 + (-3) =</span>
                  </div>
                  <Field id="p90_ex1_vi" placeholder="Value" {...fp} />
                </div>
              </div>
            </div>

            {/* Question 2 */}
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="font-bold text-lg text-emerald-800 dark:text-emerald-400">2.</span>
                <p className="font-semibold text-lg">Add without using number line.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pl-8">
                <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700 dark:text-emerald-500">(i)</span>
                    <span className="font-mono font-medium">10 + (-3) =</span>
                  </div>
                  <Field id="p90_ex2_i" placeholder="Value" {...fp} />
                </div>
                <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700 dark:text-emerald-500">(ii)</span>
                    <span className="font-mono font-medium">-10 + (+16) =</span>
                  </div>
                  <Field id="p90_ex2_ii" placeholder="Value" {...fp} />
                </div>
                <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700 dark:text-emerald-500">(iii)</span>
                    <span className="font-mono font-medium">(-8) + (+8) =</span>
                  </div>
                  <Field id="p90_ex2_iii" placeholder="Value" {...fp} />
                </div>
                <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700 dark:text-emerald-500">(iv)</span>
                    <span className="font-mono font-medium">-215 + (+100) =</span>
                  </div>
                  <Field id="p90_ex2_iv" placeholder="Value" {...fp} />
                </div>
                <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700 dark:text-emerald-500">(v)</span>
                    <span className="font-mono font-medium">(-110) + (-22) =</span>
                  </div>
                  <Field id="p90_ex2_v" placeholder="Value" {...fp} />
                </div>
                <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700 dark:text-emerald-500">(vi)</span>
                    <span className="font-mono font-medium">17 + (-11) =</span>
                  </div>
                  <Field id="p90_ex2_vi" placeholder="Value" {...fp} />
                </div>
              </div>
            </div>

            {/* Question 3 */}
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="font-bold text-lg text-emerald-800 dark:text-emerald-400">3.</span>
                <p className="font-semibold text-lg">Find the sum of:</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pl-8">
                <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700 dark:text-emerald-500">(i)</span>
                    <span className="font-mono font-medium">120 and -274</span>
                  </div>
                  <Field id="p90_ex3_i" placeholder="Sum" {...fp} />
                </div>
                <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700 dark:text-emerald-500">(ii)</span>
                    <span className="font-mono font-medium">-68 and 28</span>
                  </div>
                  <Field id="p90_ex3_ii" placeholder="Sum" {...fp} />
                </div>
                <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700 dark:text-emerald-500">(iii)</span>
                    <span className="font-mono font-medium">-29, 38 and 190</span>
                  </div>
                  <Field id="p90_ex3_iii" placeholder="Sum" {...fp} />
                </div>
                <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-700 dark:text-emerald-500">(iv)</span>
                    <span className="font-mono font-medium">-60, -100 and 300</span>
                  </div>
                  <Field id="p90_ex3_iv" placeholder="Sum" {...fp} />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
