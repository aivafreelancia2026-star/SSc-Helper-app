"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs (Book Page 82 / PDF Page 90)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "p91_ex4_i", "p91_ex4_ii", "p91_ex4_iii", "p91_ex4_iv",
];

const CORRECT: Record<string, string[]> = {
  p91_ex4_i: ["6", "+6"],
  p91_ex4_ii: ["-78"],
  p91_ex4_iii: ["-64"],
  p91_ex4_iv: ["25", "+25"],
};

const REVEAL_TEXT: Record<string, string> = {
  p91_ex4_i: "6",
  p91_ex4_ii: "-78",
  p91_ex4_iii: "-64",
  p91_ex4_iv: "25",
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
export function C6MathsCh6Page10() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch6-page10";

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
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">Subtraction of Integers</h1>
              <p className="text-xs text-indigo-100 font-normal">
                Class 6 Maths &bull; Chapter 6 &bull; Integers
              </p>
            </div>
          </div>
          <span className="text-xs bg-indigo-950/80 text-indigo-200 px-3 py-1 rounded-full border border-indigo-400/30 font-mono self-start sm:self-auto font-bold">
            Page 90
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
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-10 shadow-sm text-foreground/90 leading-relaxed">
        
        {/* EXERCISE 6.3 - Q4 */}
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <span className="font-bold text-lg text-emerald-800 dark:text-emerald-400">4.</span>
            <p className="font-semibold text-lg">Simplify:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pl-8">
            <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center gap-2">
                <span className="font-medium text-emerald-700 dark:text-emerald-500">(i)</span>
                <span className="font-mono font-medium">(-6) + (-10) + 5 + 17 =</span>
              </div>
              <Field id="p91_ex4_i" placeholder="Value" {...fp} />
            </div>
            <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center gap-2">
                <span className="font-medium text-emerald-700 dark:text-emerald-500">(ii)</span>
                <span className="font-mono font-medium">30 + (-30) + (-60) + (-18) =</span>
              </div>
              <Field id="p91_ex4_ii" placeholder="Value" {...fp} />
            </div>
            <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center gap-2">
                <span className="font-medium text-emerald-700 dark:text-emerald-500">(iii)</span>
                <span className="font-mono font-medium">(-80) + (+40) + (-30) + (+6) =</span>
              </div>
              <Field id="p91_ex4_iii" placeholder="Value" {...fp} />
            </div>
            <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center gap-2">
                <span className="font-medium text-emerald-700 dark:text-emerald-500">(iv)</span>
                <span className="font-mono font-medium">70 + (-18) + (-10) + (-17) =</span>
              </div>
              <Field id="p91_ex4_iv" placeholder="Value" {...fp} />
            </div>
          </div>
        </div>

        <hr className="border-t-2 border-indigo-100 dark:border-indigo-900/50" />

        {/* 6.6.2 Subtraction of integers */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 font-heading">
            6.6.2 Subtraction of integers
          </h2>
          
          <div className="space-y-4">
            <p className="font-medium text-slate-800 dark:text-slate-200">
              We saw that to add 5 and (-2) on a number line we can start from 5 and then move 2 steps to the left of 5.
            </p>
            <p className="font-medium text-slate-800 dark:text-slate-200">
              We reach at 3 so, we have 5 + (-2) = 3
            </p>

            {/* Number Line Diagram 1 */}
            <div className="w-full flex justify-center py-6 overflow-hidden">
              <svg viewBox="-50 -50 700 90" className="w-full max-w-3xl drop-shadow-sm h-auto overflow-visible">
                <defs>
                  <marker id="arrowRight" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
                  </marker>
                  <marker id="arrowLeft" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 10 1 L 0 5 L 10 9 z" fill="#e11d48" />
                  </marker>
                  <marker id="axisArrowLine" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
                  </marker>
                </defs>

                {/* Axis line */}
                <line x1="-25" y1="20" x2="675" y2="20" stroke="#475569" strokeWidth="2.5" markerStart="url(#axisArrowLine)" markerEnd="url(#axisArrowLine)" />

                {/* Tick Marks and Labels */}
                {[-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].map((num) => {
                  const x = 325 + num * 45;
                  const isZero = num === 0;
                  return (
                    <g key={num}>
                      <line x1={x} y1="12" x2={x} y2="28" stroke={isZero ? "#0284c7" : "#64748b"} strokeWidth={isZero ? "3" : "2"} />
                      <text x={x} y="45" textAnchor="middle" fontSize="14" fontWeight={isZero ? "bold" : "600"} fill={isZero ? "#0284c7" : "#475569"}>
                        {num}
                      </text>
                    </g>
                  );
                })}

                {/* Jump 1: 0 to 5 */}
                <path d="M 325 10 Q 437 -30 550 10" fill="none" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#arrowRight)" />
                
                {/* Jump 2: 5 to 3 */}
                <path d="M 550 10 Q 505 -25 460 10" fill="none" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrowLeft)" />
                <text x="505" y="-12" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#e11d48">-2</text>
              </svg>
            </div>

            <p className="font-medium text-slate-800 dark:text-slate-200">
              Thus, we find that to add a positive integer we move towards the right on a number line and for adding a negative integer we move towards left.
            </p>
            <p className="font-medium text-slate-800 dark:text-slate-200">
              We have also seen that while subtracting whole numbers on a number line, we would move towards left.
            </p>
            
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <p className="font-medium text-slate-700 dark:text-slate-300">For example take 5 - 2 = ?</p>
              <p className="font-medium text-slate-700 dark:text-slate-300">We start from 5 and take two steps to the left and end up at 3.</p>
            </div>

            <p className="font-medium text-slate-800 dark:text-slate-200 pt-2">
              What does subtraction of a negative integer mean?<br/>
              Let us observe the following example,
            </p>
          </div>
        </div>

        {/* Example 4 */}
        <div className="bg-blue-50/50 dark:bg-blue-950/20 p-5 sm:p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start">
            <span className="font-bold text-blue-800 dark:text-blue-300 whitespace-nowrap">Example-4.</span>
            <p className="font-medium text-lg">Subtract -5 from 6.</p>
          </div>
          
          <div className="flex gap-2 sm:gap-4 items-start">
            <span className="font-semibold italic text-slate-600 dark:text-slate-400 whitespace-nowrap pt-1">Solution:</span>
            <div className="space-y-4">
              <p className="font-medium">
                To subtract -5 from 6, let us start at 6 and move 5 towards the right. For -5 we would have moved left but for -(-5) we would move in the opposite direction. Moving 5 to the right, we reach 11.
              </p>

              {/* Number Line Diagram 2 */}
              <div className="w-full flex justify-center py-6 overflow-hidden bg-white dark:bg-slate-900/80 rounded-xl border border-blue-100 dark:border-blue-900/40">
                <svg viewBox="-50 -50 850 90" className="w-full max-w-4xl drop-shadow-sm h-auto overflow-visible">
                  <defs>
                    <marker id="arrowRightEx4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
                    </marker>
                    <marker id="axisArrowLineEx4" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
                    </marker>
                  </defs>

                  {/* Axis line */}
                  <line x1="-25" y1="20" x2="800" y2="20" stroke="#475569" strokeWidth="2.5" markerStart="url(#axisArrowLineEx4)" markerEnd="url(#axisArrowLineEx4)" />

                  {/* Tick Marks and Labels */}
                  {[-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
                    const x = 325 + num * 40;
                    const isZero = num === 0;
                    return (
                      <g key={num}>
                        <line x1={x} y1="12" x2={x} y2="28" stroke={isZero ? "#0284c7" : "#64748b"} strokeWidth={isZero ? "3" : "2"} />
                        <text x={x} y="45" textAnchor="middle" fontSize="14" fontWeight={isZero ? "bold" : "600"} fill={isZero ? "#0284c7" : "#475569"}>
                          {num}
                        </text>
                      </g>
                    );
                  })}

                  {/* Jump 1: 0 to 6 */}
                  <path d="M 325 10 Q 445 -30 565 10" fill="none" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#arrowRightEx4)" />
                  
                  {/* Jump 2: 6 to 11 */}
                  <path d="M 565 10 Q 665 -30 765 10" fill="none" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#arrowRightEx4)" />
                  <text x="665" y="-20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0284c7">- (-5)</text>
                </svg>
              </div>

              <div className="font-mono bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="font-bold text-indigo-700 dark:text-indigo-400 text-lg">We have 6 - (-5) = 11</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-body">i.e. To subtract -5 from 6 means add 5 (the additive inverse of -5) to 6.</div>
                <div className="font-bold text-lg">6 - (-5) = 6 + 5 = 11</div>
              </div>
            </div>
          </div>
        </div>

        {/* Further Explanation */}
        <div className="bg-amber-50/50 dark:bg-amber-950/20 p-5 rounded-xl border border-amber-200 dark:border-amber-900/50 shadow-sm space-y-4">
          <p className="font-medium text-amber-900 dark:text-amber-200 leading-relaxed">
            What would we do for <span className="font-mono font-bold mx-1">4 - (-2)</span>? Would you move towards the left on the number line or towards the right? If we move to the left then we reach 2. Then we have to say <span className="font-mono">4 - (-2) = 2</span>. This is not true because we know <span className="font-mono">4 - 2 = 2</span> and <span className="font-mono">4 - (-2) ≠ 4 - 2</span>.
          </p>
          <p className="font-medium text-amber-900 dark:text-amber-200 leading-relaxed">
            So for <span className="font-mono font-bold mx-1">4 - (-2)</span> we move two steps to the right of 4. This is opposite of what we would do for <span className="font-mono">4 - (2)</span>. We reach 6 in one case and reach 2 in the other.
          </p>
        </div>

      </div>
    </div>
  );
}
