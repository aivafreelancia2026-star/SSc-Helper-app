"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs (Book Page 80 / PDF Page 89)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "p89_inv_7",      // Additive inverse of 7
  "p89_inv_minus8", // Additive inverse of -8
  "p89_try1_i",     // (-3) + 5
  "p89_try1_ii",    // (-5) + 3
  "p89_try2_i",     // (+5) + (-5)
  "p89_try2_ii",    // (+6) + (-7)
  "p89_try2_iii",   // (-8) + (+2)
];

const CORRECT: Record<string, string[]> = {
  p89_inv_7: ["-7", "- 7"],
  p89_inv_minus8: ["8", "+8", "+ 8"],
  p89_try1_i: ["2", "+2", "+ 2"],
  p89_try1_ii: ["-2", "- 2"],
  p89_try2_i: ["0"],
  p89_try2_ii: ["-1", "- 1"],
  p89_try2_iii: ["-6", "- 6"],
};

const REVEAL_TEXT: Record<string, string> = {
  p89_inv_7: "-7",
  p89_inv_minus8: "8 (or +8)",
  p89_try1_i: "2",
  p89_try1_ii: "-2",
  p89_try2_i: "0",
  p89_try2_ii: "-1",
  p89_try2_iii: "-6",
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
export function C6MathsCh6Page8() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch6-page8";

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
            <span className="p-2 rounded-xl bg-white/20 text-xl font-black px-4">6.6.1</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">Addition & Subtraction on Number Line</h1>
              <p className="text-xs text-indigo-100 font-normal">
                Class 6 Maths &bull; Chapter 6 &bull; Integers
              </p>
            </div>
          </div>
          <span className="text-xs bg-indigo-950/80 text-indigo-200 px-3 py-1 rounded-full border border-indigo-400/30 font-mono self-start sm:self-auto font-bold">
            Page 80 (PDF P89)
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
        
        {/* Addition of Integers Examples continued */}
        <div className="space-y-8">

          {/* Number Line Example 3 */}
          <div className="flex flex-col gap-4 bg-background border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="font-bold">3.</span>
              <p className="font-medium">Suppose we wish to find the sum of (+6) and (-2) on the number line. First we move to the right of 0 by 6 steps to reach 6. Then we move 2 steps to the left of 6 to reach 4.</p>
            </div>
            
            <div className="w-full flex justify-center py-6 overflow-hidden">
              <svg viewBox="-50 -40 700 80" className="w-full max-w-3xl drop-shadow-sm h-auto overflow-visible">
                <defs>
                  <marker id="arrowRightBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
                  </marker>
                  <marker id="arrowLeftRed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 10 1 L 0 5 L 10 9 z" fill="#e11d48" />
                  </marker>
                  <marker id="axisArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
                  </marker>
                </defs>

                {/* Axis line */}
                <line x1="-25" y1="20" x2="675" y2="20" stroke="#475569" strokeWidth="2.5" markerStart="url(#axisArrow)" markerEnd="url(#axisArrow)" />

                {/* Tick Marks and Labels */}
                {[-1, 0, 1, 2, 3, 4, 5, 6, 7].map((num) => {
                  const x = 50 + num * 70;
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

                {/* Jump 1: 0 to 6 (Right) */}
                <path d="M 50 10 Q 260 -40 470 10" fill="none" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#arrowRightBlue)" strokeDasharray="5 3" />
                <text x="260" y="-20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0284c7">+6</text>

                {/* Jump 2: 6 to 4 (Left) */}
                <path d="M 470 10 Q 400 -25 330 10" fill="none" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrowLeftRed)" />
                <text x="400" y="5" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#e11d48">-2</text>
              </svg>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-bold font-mono text-center">
              Thus (+6) + (-2) = 4
            </div>
          </div>

          {/* Number Line Example 4 */}
          <div className="flex flex-col gap-4 bg-background border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="font-bold">4.</span>
              <p className="font-medium">Similarly let us find the sum of (-5) and (+3) on the number line. First we move 5 steps to the left of 0 reach -5 and then from this point we move 3 steps to the right. We reach the point -2. Thus, (-5) + (+3) = -2</p>
            </div>
            
            <div className="w-full flex justify-center py-6 overflow-hidden">
              <svg viewBox="0 -40 700 80" className="w-full max-w-3xl drop-shadow-sm h-auto overflow-visible">
                {/* Axis line */}
                <line x1="25" y1="20" x2="675" y2="20" stroke="#475569" strokeWidth="2.5" markerStart="url(#axisArrow)" markerEnd="url(#axisArrow)" />

                {/* Tick Marks and Labels */}
                {[-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].map((num) => {
                  const x = 350 + num * 42;
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

                {/* Jump 1: 0 to -5 (Left) */}
                <path d="M 350 10 Q 245 -40 140 10" fill="none" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrowLeftRed)" strokeDasharray="5 3" />
                <text x="245" y="-20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#e11d48">-5</text>

                {/* Jump 2: -5 to -2 (Right) */}
                <path d="M 140 10 Q 203 -30 266 10" fill="none" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#arrowRightBlue)" />
                <text x="203" y="-15" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0284c7">+3</text>
              </svg>
            </div>
          </div>

          {/* Number Line Example 5 */}
          <div className="flex flex-col gap-4 bg-background border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="font-bold">5.</span>
              <p className="font-medium">Suneetha adds 3 and -3. She first moves from 0 to +3 and then from +3 she move 3 points to the left. Where does she reach ultimately?</p>
            </div>
            
            <div className="w-full flex justify-center py-6 overflow-hidden">
              <svg viewBox="0 -40 700 80" className="w-full max-w-3xl drop-shadow-sm h-auto overflow-visible">
                {/* Axis line */}
                <line x1="25" y1="20" x2="675" y2="20" stroke="#475569" strokeWidth="2.5" markerStart="url(#axisArrow)" markerEnd="url(#axisArrow)" />

                {/* Tick Marks and Labels */}
                {[-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].map((num) => {
                  const x = 350 + num * 42;
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

                {/* Jump 1: 0 to +3 (Right) */}
                <path d="M 350 10 Q 413 -30 476 10" fill="none" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#arrowRightBlue)" strokeDasharray="5 3" />
                <text x="413" y="-15" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0284c7">+3</text>

                {/* Jump 2: +3 to 0 (Left) */}
                <path d="M 476 10 Q 413 35 350 10" fill="none" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrowLeftRed)" />
                <text x="413" y="32" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#e11d48">-3</text>
              </svg>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-bold font-mono text-center">
              From the number line 3 + (-3) = 0
            </div>
          </div>
        </div>

        {/* Additive Inverse Concept */}
        <div className="border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-950/20 p-5 rounded-2xl shadow-sm">
          <p className="text-sm sm:text-base leading-relaxed text-indigo-900 dark:text-indigo-200">
            Similarly, if we add 1 and -1, 2 and -2, 3 and -3 ...... so on we obtain the sum as zero. They are called additive inverse of each other i.e. <strong>any two distinct numbers that give zero when added to each other are additive inverse of each other.</strong>
          </p>

          <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm">What is additive inverse of 7?</span>
              <div className="w-24">
                <Field id="p89_inv_7" placeholder="e.g. -7" isOpen={true} {...fp} />
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-indigo-200 dark:bg-indigo-800" />
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm">What is additive inverse of -8?</span>
              <div className="w-24">
                <Field id="p89_inv_minus8" placeholder="e.g. 8" isOpen={true} {...fp} />
              </div>
            </div>
          </div>
        </div>

        {/* Try These Section */}
        <div className="border-2 border-emerald-600/40 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-emerald-600 text-white font-bold px-4 py-2 flex items-center gap-2 tracking-wide shadow-md">
            <span>✍️</span>
            <h2 className="uppercase">Try These</h2>
          </div>
          
          <div className="p-6 bg-emerald-50/30 dark:bg-emerald-950/10 space-y-8">
            {/* Question 1 */}
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <span className="font-bold text-emerald-800 dark:text-emerald-400">1.</span>
                <p className="font-semibold">Find the value of the following using a number line.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-border rounded-xl">
                  <span className="font-medium text-emerald-700 dark:text-emerald-500 w-6">(i)</span>
                  <span className="font-mono text-sm">(-3) + 5 =</span>
                  <div className="w-32">
                    <Field id="p89_try1_i" placeholder="e.g. 2" {...fp} />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-border rounded-xl">
                  <span className="font-medium text-emerald-700 dark:text-emerald-500 w-8">(ii)</span>
                  <span className="font-mono text-sm">(-5) + 3 =</span>
                  <div className="w-32">
                    <Field id="p89_try1_ii" placeholder="e.g. -2" {...fp} />
                  </div>
                </div>
              </div>
              <p className="pl-6 text-sm italic text-muted-foreground">
                Make your own two new questions and solve them using the number line.
              </p>
            </div>

            {/* Question 2 */}
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <span className="font-bold text-emerald-800 dark:text-emerald-400">2.</span>
                <p className="font-semibold">Find the solution of the following without using number line.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-6">
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-border rounded-xl">
                  <span className="font-medium text-emerald-700 dark:text-emerald-500 w-6">(i)</span>
                  <span className="font-mono text-sm">(+5) + (-5) =</span>
                  <div className="flex-1 min-w-[4rem]">
                    <Field id="p89_try2_i" placeholder="e.g. 0" {...fp} />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-border rounded-xl">
                  <span className="font-medium text-emerald-700 dark:text-emerald-500 w-8">(ii)</span>
                  <span className="font-mono text-sm">(+6) + (-7) =</span>
                  <div className="flex-1 min-w-[4rem]">
                    <Field id="p89_try2_ii" placeholder="e.g. -1" {...fp} />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-border rounded-xl">
                  <span className="font-medium text-emerald-700 dark:text-emerald-500 w-8">(iii)</span>
                  <span className="font-mono text-sm">(-8) + (+2) =</span>
                  <div className="flex-1 min-w-[4rem]">
                    <Field id="p89_try2_iii" placeholder="e.g. -6" {...fp} />
                  </div>
                </div>
              </div>
              <p className="pl-6 text-sm italic text-muted-foreground">
                Ask your friend to give five such questions and solve them.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
