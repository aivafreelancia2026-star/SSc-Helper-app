"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs (Book Page 83 / PDF Page 92)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "p92_do_i",   // -5 - (-3)
  "p92_do_ii",  // -7 - (+2)
  "p92_do_iii", // -7 - (-5)
  "p92_do_iv",  // 3 - (-4)
  "p92_do_v",   // 5 - (+7)
  "p92_do_vi",  // 4 - (-2)
  "p92_ex6",    // Example 6: (-13) - (-6)
  "p92_ex7",    // Example 7: (-8) - (+8)
  "p92_ex8",    // Example 8: (-6) - (+7) - (-24)
];

const CORRECT: Record<string, string[]> = {
  p92_do_i: ["-2"],
  p92_do_ii: ["-9"],
  p92_do_iii: ["-2"],
  p92_do_iv: ["7", "+7"],
  p92_do_v: ["-2"],
  p92_do_vi: ["6", "+6"],
  p92_ex6: ["-7"],
  p92_ex7: ["-16"],
  p92_ex8: ["11", "+11"],
};

const REVEAL_TEXT: Record<string, string> = {
  p92_do_i: "-2",
  p92_do_ii: "-9",
  p92_do_iii: "-2",
  p92_do_iv: "7",
  p92_do_v: "-2",
  p92_do_vi: "6",
  p92_ex6: "-7",
  p92_ex7: "-16",
  p92_ex8: "11",
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
}) {
  const displayVal = isRevealed ? REVEAL_TEXT[id] ?? "" : answers[id] ?? "";
  const baseCls = `w-full rounded-xl border px-3 py-2 text-xs sm:text-sm font-mono outline-none transition-all shadow-sm ${borderCls(
    id,
    answers,
    graded,
    isRevealed
  )}`;

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
export function C6MathsCh6Page11() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch6-page11";

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
            Page 83 (PDF P92)
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

        {/* EXAMPLE 5 */}
        <div className="bg-blue-50/50 dark:bg-blue-950/20 p-5 sm:p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start">
            <span className="font-bold text-blue-800 dark:text-blue-300 whitespace-nowrap">Example-5.</span>
            <p className="font-medium text-lg">Find the value of (-7) - (-9) using number line.</p>
          </div>

          <div className="flex gap-2 sm:gap-4 items-start">
            <span className="font-semibold italic text-slate-600 dark:text-slate-400 whitespace-nowrap pt-1">Solution:</span>
            <div className="space-y-3 w-full">
              <p className="font-medium">
                <span className="font-mono font-bold">(-7) - (-9)</span> is equal to{" "}
                <span className="font-mono font-bold">-7 + 9</span> (Since -9 is the additive inverse of -9 is +9).
              </p>
              <p className="font-medium">
                On the number line, start from <span className="font-mono font-bold">-7</span> and move{" "}
                <span className="font-bold text-blue-700 dark:text-blue-300">9 units to the right</span>, we will reach 2.
              </p>

              {/* Number Line for Example 5 */}
              <div className="w-full flex justify-center py-6 overflow-hidden bg-white dark:bg-slate-900/80 rounded-xl border border-blue-100 dark:border-blue-900/40">
                <svg viewBox="-50 -60 750 110" className="w-full max-w-3xl h-auto overflow-visible">
                  <defs>
                    <marker id="ex5ArrowRight" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
                    </marker>
                    <marker id="ex5ArrowGray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
                    </marker>
                    <marker id="ex5AxisArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
                    </marker>
                  </defs>

                  {/* Axis */}
                  <line x1="-25" y1="20" x2="700" y2="20" stroke="#475569" strokeWidth="2.5"
                    markerStart="url(#ex5AxisArrow)" markerEnd="url(#ex5AxisArrow)" />

                  {/* Ticks -9 to 7 */}
                  {[-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].map((num) => {
                    const x = 430 + num * 35;
                    const isZero = num === 0;
                    const isStart = num === -7;
                    const isEnd = num === 2;
                    return (
                      <g key={num}>
                        <line x1={x} y1="12" x2={x} y2="28"
                          stroke={isStart ? "#e11d48" : isEnd ? "#16a34a" : isZero ? "#0284c7" : "#64748b"}
                          strokeWidth={isStart || isEnd || isZero ? 3 : 2} />
                        <text x={x} y="45" textAnchor="middle" fontSize="13"
                          fontWeight={isStart || isEnd || isZero ? "bold" : "600"}
                          fill={isStart ? "#e11d48" : isEnd ? "#16a34a" : isZero ? "#0284c7" : "#475569"}>
                          {num}
                        </text>
                      </g>
                    );
                  })}

                  {/* Arc: 0 to -7 (gray, going left) */}
                  <path d="M 430 10 Q 307 -40 185 10" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#ex5ArrowGray)" />
                  <text x="307" y="-28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#64748b">(-7)</text>

                  {/* Arc: -7 to 2 (blue, going right +9) */}
                  <path d="M 185 10 Q 307 -50 500 10" fill="none" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#ex5ArrowRight)" />
                  <text x="343" y="-38" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0284c7">- (-9) = +9</text>

                  {/* Dot at 2 */}
                  <circle cx="500" cy="20" r="6" fill="#16a34a" />
                  <text x="500" y="65" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#16a34a">result = 2</text>
                </svg>
              </div>

              <div className="font-mono bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-indigo-700 dark:text-indigo-400 text-lg">
                  So (-7) - (-9) = -7 + 9 = 2.
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-body">
                  Subtracting -9 is the same as adding +9 (the additive inverse of -9).
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t-2 border-indigo-100 dark:border-indigo-900/50" />

        {/* DO THIS */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-700 text-white font-bold text-sm px-4 py-1 rounded-lg tracking-wide">DO THIS</span>
            <p className="font-semibold text-base text-foreground">Find the value of each expression:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2">
            {/* i */}
            <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center gap-2">
                <span className="font-medium text-emerald-700 dark:text-emerald-500">(i)</span>
                <span className="font-mono font-medium">-5 - (-3) =</span>
              </div>
              <Field id="p92_do_i" placeholder="Answer" {...fp} />
            </div>

            {/* ii */}
            <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center gap-2">
                <span className="font-medium text-emerald-700 dark:text-emerald-500">(ii)</span>
                <span className="font-mono font-medium">-7 - (+2) =</span>
              </div>
              <Field id="p92_do_ii" placeholder="Answer" {...fp} />
            </div>

            {/* iii */}
            <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center gap-2">
                <span className="font-medium text-emerald-700 dark:text-emerald-500">(iii)</span>
                <span className="font-mono font-medium">-7 - (-5) =</span>
              </div>
              <Field id="p92_do_iii" placeholder="Answer" {...fp} />
            </div>

            {/* iv */}
            <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center gap-2">
                <span className="font-medium text-emerald-700 dark:text-emerald-500">(iv)</span>
                <span className="font-mono font-medium">3 - (-4) =</span>
              </div>
              <Field id="p92_do_iv" placeholder="Answer" {...fp} />
            </div>

            {/* v */}
            <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center gap-2">
                <span className="font-medium text-emerald-700 dark:text-emerald-500">(v)</span>
                <span className="font-mono font-medium">5 - (+7) =</span>
              </div>
              <Field id="p92_do_v" placeholder="Answer" {...fp} />
            </div>

            {/* vi */}
            <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center gap-2">
                <span className="font-medium text-emerald-700 dark:text-emerald-500">(vi)</span>
                <span className="font-mono font-medium">4 - (-2) =</span>
              </div>
              <Field id="p92_do_vi" placeholder="Answer" {...fp} />
            </div>
          </div>
        </div>

        <hr className="border-t-2 border-indigo-100 dark:border-indigo-900/50" />

        {/* THINK, DISCUSS AND WRITE */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="bg-teal-700 text-white font-bold text-sm px-4 py-1 rounded-lg tracking-wide">THINK, DISCUSS AND WRITE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Pattern table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Observe the pattern:
              </p>
              <div className="space-y-1.5 font-mono text-sm">
                {[
                  ["3 - 3", "= 0"],
                  ["3 - 2", "= 1"],
                  ["3 - 1", "= 2"],
                  ["3 - 0", "= 3"],
                  ["3 - (-1)", "= 4"],
                  ["3 - (-2)", "= 5"],
                  ["3 - (-3)", "= 6"],
                ].map(([expr, result], i) => (
                  <div key={i} className={`flex items-center justify-between px-3 py-1 rounded-lg ${i >= 4 ? "bg-teal-50 dark:bg-teal-950/30 text-teal-800 dark:text-teal-200 font-bold" : "text-foreground"}`}>
                    <span>{expr}</span>
                    <span>{result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Observation */}
            <div className="space-y-4">
              <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-5 rounded-xl shadow-sm">
                <p className="font-medium text-amber-900 dark:text-amber-200 leading-relaxed text-sm">
                  Observe that as the number we subtract from 3 is <span className="font-bold">decreasing</span>,
                  the result obtained is <span className="font-bold">increasing</span>.
                </p>
                <p className="font-medium text-amber-900 dark:text-amber-200 leading-relaxed text-sm mt-2">
                  Is it true for all Integers?
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-xs text-muted-foreground shadow-sm">
                <p className="font-semibold text-foreground text-sm">Key Rule:</p>
                <p className="mt-1 font-mono">a − b = a + (additive inverse of b)</p>
                <p className="mt-1">Subtracting an integer = Adding its additive inverse.</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t-2 border-indigo-100 dark:border-indigo-900/50" />

        {/* EXAMPLE 6 */}
        <div className="bg-blue-50/50 dark:bg-blue-950/20 p-5 sm:p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start">
            <span className="font-bold text-blue-800 dark:text-blue-300 whitespace-nowrap">Example-6.</span>
            <p className="font-medium text-lg">Subtract (-6) from (-13).</p>
          </div>
          <div className="flex gap-2 sm:gap-4 items-start">
            <span className="font-semibold italic text-slate-600 dark:text-slate-400 whitespace-nowrap pt-1">Solution:</span>
            <div className="space-y-2 w-full">
              <div className="font-mono bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 text-sm">
                <div>(-13) - (-6) = (-13) + (additive inverse of -6)</div>
                <div>= -13 + 6</div>
                <div className="font-bold text-indigo-700 dark:text-indigo-400 text-base">= -7</div>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <span className="text-sm font-medium text-foreground shrink-0">Your answer:</span>
                <div className="w-32">
                  <Field id="p92_ex6" placeholder="-7" {...fp} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EXAMPLE 7 */}
        <div className="bg-blue-50/50 dark:bg-blue-950/20 p-5 sm:p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start">
            <span className="font-bold text-blue-800 dark:text-blue-300 whitespace-nowrap">Example-7.</span>
            <p className="font-medium text-lg">Subtract (+8) from (-8).</p>
          </div>
          <div className="flex gap-2 sm:gap-4 items-start">
            <span className="font-semibold italic text-slate-600 dark:text-slate-400 whitespace-nowrap pt-1">Solution:</span>
            <div className="space-y-2 w-full">
              <div className="font-mono bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 text-sm">
                <div>(-8) - (+8) = (-8) + (additive inverse of +8)</div>
                <div>= -8 + (-8)</div>
                <div className="font-bold text-indigo-700 dark:text-indigo-400 text-base">= -16</div>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <span className="text-sm font-medium text-foreground shrink-0">Your answer:</span>
                <div className="w-32">
                  <Field id="p92_ex7" placeholder="-16" {...fp} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EXAMPLE 8 */}
        <div className="bg-blue-50/50 dark:bg-blue-950/20 p-5 sm:p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start">
            <span className="font-bold text-blue-800 dark:text-blue-300 whitespace-nowrap">Example-8.</span>
            <p className="font-medium text-lg">Simplify: (-6) - (+7) - (-24).</p>
          </div>
          <div className="flex gap-2 sm:gap-4 items-start">
            <span className="font-semibold italic text-slate-600 dark:text-slate-400 whitespace-nowrap pt-1">Solution:</span>
            <div className="space-y-2 w-full">
              <div className="font-mono bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 text-sm">
                <div>(-6) - (+7) - (-24)</div>
                <div>= (-6) + (additive inverse of +7) + (additive inverse of -24)</div>
                <div>= (-6) + (-7) + (+24)</div>
                <div>= -13 + 24</div>
                <div className="font-bold text-indigo-700 dark:text-indigo-400 text-base">= 11</div>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <span className="text-sm font-medium text-foreground shrink-0">Your answer:</span>
                <div className="w-32">
                  <Field id="p92_ex8" placeholder="11" {...fp} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
