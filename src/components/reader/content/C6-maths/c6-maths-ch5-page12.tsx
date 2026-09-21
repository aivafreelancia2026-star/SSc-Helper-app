"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs (Book Page 80)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "p72_try_intersect",
  "p72_try_parallel",
  "p72_try_reason",
  "p72_try_angle",
  "p72_ex1_i",
  "p72_ex1_ii",
  "p72_ex1_iii",
  "p72_ex1_iv",
  "p72_ex1_v",
  "p72_ex3_parallel",
  "p72_ex3_perp",
];

const CORRECT: Record<string, string[]> = {
  p72_try_intersect: ["yes", "true", "they will"],
  p72_try_parallel: ["no", "false", "cannot"],
  p72_try_reason: ["distance", "intersect", "meet", "not equal", "unequal", "decreasing"],
  p72_try_angle: ["0", "zero", "0°", "no angle"],
  p72_ex1_i: ["parallel"],
  p72_ex1_ii: ["parallel"],
  p72_ex1_iii: ["perpendicular", "perp"],
  p72_ex1_iv: ["neither", "none", "intersecting", "acute"],
  p72_ex1_v: ["parallel"],
  p72_ex3_parallel: ["ab||dc", "ad||bc", "ab and dc", "ad and bc", "parallel"],
  p72_ex3_perp: ["ab⊥bc", "bc⊥cd", "cd⊥da", "da⊥ab", "perpendicular"],
};

const REVEAL_TEXT: Record<string, string> = {
  p72_try_intersect: "Yes, they will eventually intersect if extended to the right.",
  p72_try_parallel: "No, they are not parallel.",
  p72_try_reason: "Because the distance between them is decreasing, they will meet.",
  p72_try_angle: "0° (they never meet, so they form a zero angle relative to each other).",
  p72_ex1_i: "Parallel",
  p72_ex1_ii: "Parallel",
  p72_ex1_iii: "Perpendicular",
  p72_ex1_iv: "Neither",
  p72_ex1_v: "Parallel",
  p72_ex3_parallel: "AB ∥ DC and AD ∥ BC",
  p72_ex3_perp: "AB ⊥ BC, BC ⊥ CD, CD ⊥ DA, DA ⊥ AB",
};

const normalize = (s: string) =>
  s.trim().toLowerCase().replace(/[^a-z0-9°]/g, "");

function validateAnswer(id: string, raw: string): boolean {
  const v = normalize(raw);
  if (!v) return false;
  const accepted = CORRECT[id];
  if (!accepted) return v.length >= 3;
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
  if (!typed) return "border-slate-300 dark:border-slate-700 focus:border-teal-500 bg-background";
  const g = graded[id];
  if (g?.correct === true)
    return "border-green-500 bg-green-50 text-green-700 font-bold dark:bg-green-950/30 dark:text-green-300";
  if (g?.correct === false)
    return "border-red-400 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400";
  return "border-slate-300 dark:border-slate-700 focus:border-teal-500 bg-background";
}

function StatusIcon({
  id, answers, graded, isRevealed,
}: {
  id: string; answers: Record<string, string>;
  graded: Record<string, { value: string; correct: boolean }>; isRevealed: boolean;
}) {
  if (isRevealed) return null;
  const typed = (answers[id] ?? "").trim();
  if (!typed) return null;
  const g = graded[id];
  if (g?.correct === true)
    return <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 select-none text-xs font-bold text-green-600 dark:text-green-400">✓</span>;
  if (g?.correct === false)
    return <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 select-none text-xs font-bold text-red-500 dark:text-red-400">✗</span>;
  return null;
}

/* ─────────────────────────────────────────────
   Shared Field Component
───────────────────────────────────────────── */
function Field({
  id, placeholder, answers, graded, isRevealed, handleChange, handleBlur,
  isOpen = false, className = "", multiLine = false
}: {
  id: string; placeholder: string; answers: Record<string, string>;
  graded: Record<string, { value: string; correct: boolean }>;
  isRevealed: boolean; handleChange: (id: string, val: string) => void;
  handleBlur: (id: string, isOpen?: boolean) => void;
  isOpen?: boolean; className?: string; multiLine?: boolean;
}) {
  const displayVal = isRevealed ? (REVEAL_TEXT[id] ?? "") : (answers[id] ?? "");
  const baseCls = `w-full rounded-xl border px-3 py-2 text-xs sm:text-sm font-mono outline-none transition-all shadow-sm resize-none ${borderCls(id, answers, graded, isRevealed)}`;
  if (multiLine) {
    return (
      <div className={`relative w-full ${className}`}>
        <textarea id={`field-${id}`} rows={2} placeholder={placeholder}
          value={displayVal} onChange={(e) => handleChange(id, e.target.value)}
          onBlur={() => handleBlur(id, isOpen)} disabled={isRevealed} className={baseCls} />
      </div>
    );
  }
  return (
    <div className={`relative w-full ${className}`}>
      <input type="text" id={`field-${id}`} placeholder={placeholder}
        value={displayVal} onChange={(e) => handleChange(id, e.target.value)}
        onBlur={() => handleBlur(id, isOpen)} disabled={isRevealed}
        className={`${baseCls} pr-7`}
        onKeyDown={(e) => { if (e.key === "Enter") { handleBlur(id, isOpen); e.currentTarget.blur(); } }}
      />
      <StatusIcon id={id} answers={answers} graded={graded} isRevealed={isRevealed} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   SVGs
───────────────────────────────────────────── */
function ConvergingLinesSVG() {
  return (
    <svg viewBox="0 0 160 80" className="w-32 h-16 sm:w-40 sm:h-20">
      <line x1="10" y1="20" x2="140" y2="40" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="65" x2="140" y2="55" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="140,40 133,37 134,44" fill="#1d4ed8" />
      <polygon points="140,55 134,51 133,58" fill="#0d9488" />
      <polygon points="10,20 17,23 16,16" fill="#1d4ed8" />
      <polygon points="10,65 16,69 17,62" fill="#0d9488" />
    </svg>
  );
}

function RectangleSVG() {
  return (
    <svg viewBox="0 0 200 120" className="w-48 h-28 sm:w-60 sm:h-36">
      <rect x="30" y="30" width="140" height="60" fill="none" stroke="#2563eb" strokeWidth="2.5" />
      <line x1="30" y1="30" x2="170" y2="90" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 2" />
      <line x1="30" y1="90" x2="170" y2="30" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 2" />
      <circle cx="30" cy="30" r="3" fill="#ef4444" />
      <circle cx="170" cy="30" r="3" fill="#ef4444" />
      <circle cx="170" cy="90" r="3" fill="#ef4444" />
      <circle cx="30" cy="90" r="3" fill="#ef4444" />
      <text x="18" y="24" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">D</text>
      <text x="175" y="24" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">C</text>
      <text x="175" y="102" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">B</text>
      <text x="18" y="102" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">A</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function C6MathsCh5Page12() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch5-page12";

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
      if (g) { try { savedG[id] = JSON.parse(g); } catch {} }
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
    const correct = isOpen ? rawTyped.trim().length >= 3 : validateAnswer(id, rawTyped);
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
      <div className="rounded-2xl border-2 border-teal-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-800 text-white font-heading font-bold px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-white/20 text-xl">📝</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">Try These &amp; Exercise 5.3</h1>
              <p className="text-xs text-teal-100 font-normal">
                Class 6 Maths &bull; Chapter 5 &bull; Measures of Lines and Angles
              </p>
            </div>
          </div>
          <span className="text-xs bg-teal-950/80 text-teal-200 px-3 py-1 rounded-full border border-teal-400/30 font-mono self-start sm:self-auto font-bold">
            Page 80
          </span>
        </div>

        {/* Score & Action Bar */}
        <div className="bg-teal-50/80 dark:bg-teal-950/30 border-b border-teal-200 dark:border-teal-800/60 p-4 px-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-700/60 rounded-xl px-3.5 py-1.5">
              <span className="text-base">⭐</span>
              <span className="text-xs font-semibold text-muted-foreground">Total Points:</span>
              <span className="font-heading font-bold text-teal-700 dark:text-teal-300 text-sm">{score}</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-700/60 rounded-xl px-3.5 py-1.5">
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
            <button type="button" onClick={handleCheckAll}
              className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-heading font-semibold text-xs transition-colors cursor-pointer active:scale-95 flex items-center gap-1.5">
              <span>✓</span><span>Check Answers</span>
            </button>
            <button type="button" onClick={handleToggleReveal}
              className={`px-4 py-1.5 rounded-xl border text-xs font-heading font-semibold transition-colors cursor-pointer active:scale-95 flex items-center gap-1.5 ${isRevealed ? "bg-amber-600 text-white border-amber-700" : "bg-white dark:bg-slate-800 text-foreground border-slate-300 dark:border-slate-700 hover:bg-slate-100"}`}>
              <span>{isRevealed ? "🙈" : "👁️"}</span>
              <span>{isRevealed ? "Hide Key" : "Reveal Answers"}</span>
            </button>
            <button type="button" onClick={handleResetPage}
              className="px-3 py-1.5 rounded-xl border border-red-300 dark:border-red-800/60 bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 hover:bg-red-50 text-xs font-heading font-semibold transition-colors cursor-pointer">
              ↺ Reset
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          TRY THESE
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-emerald-400/50 bg-card overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">💬</span>
          <span>Try These</span>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col items-center gap-2 shrink-0">
              <ConvergingLinesSVG />
              <p className="text-[11px] text-muted-foreground text-center">Draw two lines on a paper as shown</p>
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-foreground">1. Do they intersect each other?</label>
                <Field id="p72_try_intersect" placeholder="Yes or No?" {...fp} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-foreground">2. Can you call them parallel lines?</label>
                <Field id="p72_try_parallel" placeholder="Yes or No?" {...fp} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-foreground">3. Give reason.</label>
                <Field id="p72_try_reason" placeholder="Why or why not?" multiLine {...fp} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-foreground">4. Make a pair of parallel lines. What is the angle formed between them?</label>
                <Field id="p72_try_angle" placeholder="e.g. 0°" {...fp} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          EXERCISE - 5.3
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-violet-300 dark:border-violet-800/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-violet-700 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">✍️</span>
          <span>Exercise - 5.3</span>
        </div>

        <div className="p-5 sm:p-6 space-y-8">
          
          {/* Question 1 */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="font-bold text-violet-700 dark:text-violet-400">1.</span>
              <p className="text-sm sm:text-base font-semibold text-foreground">
                Which of the following are models for parallel lines, perpendicular lines and which are neither of them:
              </p>
            </div>
            <div className="pl-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <p className="text-sm font-medium">i) The vertical window bars</p>
                <Field id="p72_ex1_i" placeholder="Parallel, Perpendicular or Neither?" {...fp} />
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <p className="text-sm font-medium">ii) Railway lines (track)</p>
                <Field id="p72_ex1_ii" placeholder="Parallel, Perpendicular or Neither?" {...fp} />
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <p className="text-sm font-medium">iii) The adjacent edges of door</p>
                <Field id="p72_ex1_iii" placeholder="Parallel, Perpendicular or Neither?" {...fp} />
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <p className="text-sm font-medium">iv) The letter &apos;V&apos; in English alphabet</p>
                <Field id="p72_ex1_iv" placeholder="Parallel, Perpendicular or Neither?" {...fp} />
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 sm:col-span-2 max-w-md">
                <p className="text-sm font-medium">v) The opposite edges of Black Board</p>
                <Field id="p72_ex1_v" placeholder="Parallel, Perpendicular or Neither?" {...fp} />
              </div>
            </div>
          </div>

          {/* Question 2 */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="font-bold text-violet-700 dark:text-violet-400">2.</span>
              <p className="text-sm sm:text-base font-semibold text-foreground">
                Trace the copy of set squares (Geometry box) on a paper and mark the perpendicular edges.
              </p>
            </div>
            <div className="pl-6">
              <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800/40 text-sm text-amber-800 dark:text-amber-300 italic">
                *Activity*: Try this on a piece of paper! Place your set squares and draw along their edges. Mark the 90° right angles.
              </div>
            </div>
          </div>

          {/* Question 3 */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="font-bold text-violet-700 dark:text-violet-400">3.</span>
              <p className="text-sm sm:text-base font-semibold text-foreground">
                ABCD is a rectangle. AC and BD are diagonals. Write the pairs of parallel lines, perpendicular lines from the figure in symbolic form.
              </p>
            </div>
            <div className="pl-6 flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col items-center gap-2 shrink-0">
                <RectangleSVG />
              </div>
              <div className="flex-1 space-y-4 w-full">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Pairs of Parallel lines:</label>
                  <Field id="p72_ex3_parallel" placeholder="e.g. AB || DC, AD || BC" {...fp} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Pairs of Perpendicular lines:</label>
                  <Field id="p72_ex3_perp" placeholder="e.g. AB ⊥ BC, BC ⊥ CD..." multiLine {...fp} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════
          WHAT HAVE WE DISCUSSED?
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-sky-300 dark:border-sky-800/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-sky-700 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">📘</span>
          <span>What Have We Discussed?</span>
        </div>

        <div className="p-5 sm:p-6 space-y-4 text-sm leading-relaxed text-foreground">
          <ol className="list-decimal list-outside ml-5 space-y-2.5 marker:text-sky-600 marker:font-bold">
            <li>We compare two line segments by simple observation, by tracing the segments and by using instruments.</li>
            <li>The instruments used to compare and draw line segments are ruler and divider.</li>
            <li>Length is measured in cm and mm. 1 cm = 10 mm.</li>
            <li>A protractor is a semi circular curved model with 180 equal divisions used to measure and construct angles. Each division is called 1 degree (1°).</li>
            <li>The unit of measuring an angle is a degree (1°). It is <span className="inline-flex flex-col items-center align-middle mx-1 text-xs"><span className="border-b border-foreground px-1">1</span><span>360</span></span> part of one rotation.</li>
            <li>The measure of right angle is 90° and that of straight angle is 180°.</li>
            <li>An angle is <span className="font-bold text-teal-600">acute</span> if its measure is smaller than that of a right angle.</li>
            <li>An angle is <span className="font-bold text-amber-600">obtuse</span> if its measure is more than that of a right angle and less than a straight angle.</li>
            <li>An angle is <span className="font-bold text-violet-600">reflex</span> if its measure is more than a straight angle and less than a complete angle.</li>
            <li>Two distinct lines of a plane which have a common point are <strong>intersecting lines</strong>.</li>
            <li>Two intersecting lines are <strong>perpendicular</strong> if the angle between them is a right angle.</li>
            <li>If two lines of a plane do not intersect each other then they are called <strong>parallel lines</strong>.</li>
            <li>Two parallel lines do not have any common point.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
