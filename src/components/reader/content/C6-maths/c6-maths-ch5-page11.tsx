"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs (Book Page 79)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "p71_perp_q1",      // How many angles at intersection?
  "p71_perp_q2",      // Some angles are...?
  "p71_tdw_q1",       // If l⊥m, can we say l⊥l?
  "p71_tdw_q2",       // How many perpendicular lines to a given line at a point?
  "p71_tdw_q3",       // English letter that is perpendicular
  "p71_parallel_q1",  // What is special about railroad tracks?
  "p71_parallel_q2",  // Can you name more examples of parallel lines?
];

const CORRECT: Record<string, string[]> = {
  p71_perp_q1:    ["4", "four", "4angles"],
  p71_perp_q2:    ["right", "rightangles", "90", "90°"],
  p71_tdw_q1:     ["no", "false", "lperpl"],
  p71_tdw_q2:     ["one", "1", "only one", "onlyone"],
  p71_tdw_q3:     ["t", "l", "f", "e", "h", "letterl", "lettertl"],
  p71_parallel_q1:["nevermeet", "donotintersect", "parallel", "alwaysapartequaldistance", "equaldistant"],
  p71_parallel_q2:["roads", "railwaytracks", "edges", "lines"],
};

const REVEAL_TEXT: Record<string, string> = {
  p71_perp_q1:    "4 angles are formed at the intersection point.",
  p71_perp_q2:    "All 4 angles are right angles (90° each).",
  p71_tdw_q1:     "No — l ⊥ m means l is perpendicular to m, not to itself. l ⊥ l is not meaningful.",
  p71_tdw_q2:     "Only ONE perpendicular can be drawn to a given line at a given point.",
  p71_tdw_q3:     "Letters like T, L, F, E, H have perpendicular lines in them.",
  p71_parallel_q1:"Railway tracks never meet — they are always the same distance apart (parallel).",
  p71_parallel_q2:"Edges of a ruler/scale, opposite sides of a road, lines on a notebook, railway tracks.",
};

const normalize = (s: string) =>
  s.trim().toLowerCase().replace(/[^a-z0-9°]/g, "");

function validateAnswer(id: string, raw: string): boolean {
  const v = normalize(raw);
  if (!v) return false;
  const accepted = CORRECT[id];
  if (!accepted) return v.length >= 4;
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
   Shared Field Component (outside render)
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
   SVG: Two perpendicular lines (+ shape)
───────────────────────────────────────────── */
function PerpSVG() {
  return (
    <svg viewBox="0 0 140 140" className="w-28 h-28 sm:w-36 sm:h-36">
      {/* Vertical line m */}
      <line x1="70" y1="8" x2="70" y2="132" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
      {/* Horizontal line l */}
      <line x1="8" y1="70" x2="132" y2="70" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right angle box */}
      <rect x="70" y="60" width="10" height="10" fill="none" stroke="#dc2626" strokeWidth="1.8" />
      {/* Right angle arcs for the four quadrants */}
      <path d="M 55 70 A 15 15 0 0 1 70 55" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d="M 70 55 A 15 15 0 0 1 85 70" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d="M 85 70 A 15 15 0 0 1 70 85" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d="M 70 85 A 15 15 0 0 1 55 70" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* Labels */}
      <text x="135" y="74" fontSize="13" fill="#1d4ed8" fontWeight="bold" fontStyle="italic">l</text>
      <text x="72" y="6" fontSize="13" fill="#0d9488" fontWeight="bold" fontStyle="italic">m</text>
      {/* 90° label in each quadrant */}
      <text x="48" y="64" fontSize="9" fill="#b45309" fontWeight="bold">90°</text>
      <text x="76" y="64" fontSize="9" fill="#b45309" fontWeight="bold">90°</text>
      <text x="76" y="88" fontSize="9" fill="#b45309" fontWeight="bold">90°</text>
      <text x="48" y="88" fontSize="9" fill="#b45309" fontWeight="bold">90°</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SVG: Two intersecting lines (not perp)
───────────────────────────────────────────── */
function IntersectAngSVG() {
  return (
    <svg viewBox="0 0 140 120" className="w-28 h-24 sm:w-36 sm:h-28">
      {/* line l */}
      <line x1="10" y1="100" x2="130" y2="20" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" />
      {/* line m */}
      <line x1="10" y1="20" x2="130" y2="100" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
      {/* Intersection */}
      <circle cx="70" cy="60" r="3.5" fill="#dc2626" />
      {/* Angle arcs */}
      <path d="M 82 60 A 12 12 0 0 0 70 48" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
      <path d="M 58 60 A 12 12 0 0 0 70 72" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
      <path d="M 70 48 A 12 12 0 0 0 58 60" fill="none" stroke="#a78bfa" strokeWidth="1.8" />
      <path d="M 70 72 A 12 12 0 0 0 82 60" fill="none" stroke="#a78bfa" strokeWidth="1.8" />
      {/* Labels */}
      <text x="122" y="18" fontSize="12" fill="#1d4ed8" fontWeight="bold" fontStyle="italic">l</text>
      <text x="122" y="103" fontSize="12" fill="#0d9488" fontWeight="bold" fontStyle="italic">m</text>
      {/* angle labels */}
      <text x="84" y="52" fontSize="9" fill="#b45309">a</text>
      <text x="54" y="52" fontSize="9" fill="#b45309">b</text>
      <text x="84" y="76" fontSize="9" fill="#7c3aed">c</text>
      <text x="54" y="76" fontSize="9" fill="#7c3aed">d</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SVG: Red Plus / Cross shape (⊥ example)
───────────────────────────────────────────── */
function PlusSVG() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16 sm:w-20 sm:h-20">
      {/* Vertical bar */}
      <rect x="30" y="5" width="20" height="70" rx="4" fill="#dc2626" />
      {/* Horizontal bar */}
      <rect x="5" y="30" width="70" height="20" rx="4" fill="#dc2626" />
      {/* Right angle markers */}
      <rect x="30" y="30" width="8" height="8" fill="white" opacity="0.6" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SVG: L shape (⊥ example)
───────────────────────────────────────────── */
function LShapeSVG() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16 sm:w-20 sm:h-20">
      {/* Vertical bar */}
      <rect x="15" y="5" width="18" height="60" rx="3" fill="#0d9488" />
      {/* Horizontal bar */}
      <rect x="15" y="50" width="52" height="18" rx="3" fill="#0d9488" />
      {/* Right angle marker */}
      <rect x="15" y="50" width="8" height="8" fill="white" opacity="0.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SVG: T shape (⊥ example)
───────────────────────────────────────────── */
function TShapeSVG() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16 sm:w-20 sm:h-20">
      {/* Horizontal top */}
      <rect x="5" y="10" width="70" height="18" rx="3" fill="#7c3aed" />
      {/* Vertical bar */}
      <rect x="31" y="10" width="18" height="62" rx="3" fill="#7c3aed" />
      {/* Right angle markers */}
      <rect x="31" y="10" width="8" height="8" fill="white" opacity="0.5" />
      <rect x="39" y="10" width="8" height="8" fill="white" opacity="0.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SVG: Railroad tracks (parallel example)
───────────────────────────────────────────── */
function RailTrackSVG() {
  return (
    <svg viewBox="0 0 200 80" className="w-44 h-16 sm:w-56 sm:h-20">
      {/* Rail 1 */}
      <line x1="10" y1="20" x2="190" y2="20" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
      {/* Rail 2 */}
      <line x1="10" y1="60" x2="190" y2="60" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
      {/* Sleepers/Cross ties */}
      {[20, 50, 80, 110, 140, 170].map((x) => (
        <rect key={x} x={x} y="14" width="14" height="52" rx="2" fill="#92400e" opacity="0.7" />
      ))}
      {/* Arrows showing parallel */}
      <polygon points="190,20 183,16 183,24" fill="#64748b" />
      <polygon points="190,60 183,56 183,64" fill="#64748b" />
      {/* Labels */}
      <text x="4" y="17" fontSize="11" fill="#1d4ed8" fontWeight="bold" fontStyle="italic">l</text>
      <text x="4" y="63" fontSize="11" fill="#0d9488" fontWeight="bold" fontStyle="italic">m</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SVG: Parallel lines with arrows
───────────────────────────────────────────── */
function ParallelLinesSVG() {
  return (
    <svg viewBox="0 0 200 80" className="w-44 h-16 sm:w-56 sm:h-20">
      <line x1="10" y1="25" x2="185" y2="25" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="55" x2="185" y2="55" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="185,25 178,22 178,28" fill="#1d4ed8" />
      <polygon points="185,55 178,52 178,58" fill="#0d9488" />
      {/* Parallel markers */}
      <line x1="90" y1="18" x2="100" y2="32" stroke="#dc2626" strokeWidth="2" />
      <line x1="95" y1="18" x2="105" y2="32" stroke="#dc2626" strokeWidth="2" />
      <line x1="90" y1="48" x2="100" y2="62" stroke="#dc2626" strokeWidth="2" />
      <line x1="95" y1="48" x2="105" y2="62" stroke="#dc2626" strokeWidth="2" />
      <text x="4" y="22" fontSize="11" fill="#1d4ed8" fontWeight="bold" fontStyle="italic">l</text>
      <text x="4" y="58" fontSize="11" fill="#0d9488" fontWeight="bold" fontStyle="italic">m</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function C6MathsCh5Page11() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch5-page11";

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnswers(saved);
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
          PAGE HEADER + SCORE / ACTION BAR
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-teal-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-800 text-white font-heading font-bold px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-white/20 text-xl">📐</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">5.4.2 Perpendicular Lines &amp; 5.4.3 Parallel Lines</h1>
              <p className="text-xs text-teal-100 font-normal">
                Class 6 Maths &bull; Chapter 5 &bull; Measures of Lines and Angles
              </p>
            </div>
          </div>
          <span className="text-xs bg-teal-950/80 text-teal-200 px-3 py-1 rounded-full border border-teal-400/30 font-mono self-start sm:self-auto font-bold">
            Page 79
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
          5.4.2 PERPENDICULAR LINES
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-violet-200 dark:border-violet-800/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-violet-700 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">⊥</span>
          <span>5.4.2 Perpendicular Lines</span>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Intro paragraph */}
          <p className="text-sm leading-relaxed text-foreground">
            Angles are made by lines that intersect. Look at the intersecting lines below.
            They all form many angles. Identify all the angles formed by the intersecting lines.
          </p>

          {/* Intersecting lines visual with angle labels */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col items-center gap-2">
              <IntersectAngSVG />
              <p className="text-[11px] text-muted-foreground text-center">4 angles: <strong className="text-amber-600">a, b</strong> and <strong className="text-violet-600">c, d</strong></p>
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-sm text-foreground">
                Some of these angles are <span className="font-bold text-amber-600">obtuse</span>, some are <span className="font-bold text-sky-600">acute</span> and some are <span className="font-bold text-violet-600">right angles</span>.
              </p>
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">❓ How many angles are formed at the intersection?</label>
                  <Field id="p71_perp_q1" placeholder="e.g. 4" className="max-w-xs" {...fp} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">❓ When lines are perpendicular, all the angles formed are?</label>
                  <Field id="p71_perp_q2" placeholder="e.g. right angles / 90°" className="max-w-xs" {...fp} />
                </div>
              </div>
            </div>
          </div>

          {/* Observe lines in figures */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">
              ● Observe the lines formed between the edges of the figures:
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-800/40 p-4">
                <PlusSVG />
                <span className="text-[11px] font-semibold text-red-700 dark:text-red-400 text-center">Plus / Cross</span>
                <span className="text-[10px] text-muted-foreground text-center">Lines at 90°</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-teal-50 dark:bg-teal-950/20 rounded-xl border border-teal-200 dark:border-teal-800/40 p-4">
                <LShapeSVG />
                <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 text-center">L shape</span>
                <span className="text-[10px] text-muted-foreground text-center">Lines at 90°</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-violet-50 dark:bg-violet-950/20 rounded-xl border border-violet-200 dark:border-violet-800/40 p-4">
                <TShapeSVG />
                <span className="text-[11px] font-semibold text-violet-700 dark:text-violet-400 text-center">T shape</span>
                <span className="text-[10px] text-muted-foreground text-center">Lines at 90°</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">
              Do they make a right angle? Do the lines intersect each other?
            </p>
          </div>

          {/* Key Definition */}
          <div className="flex flex-col sm:flex-row gap-6 items-center rounded-2xl border-2 border-violet-300 dark:border-violet-700/50 bg-violet-50 dark:bg-violet-950/20 p-5">
            <div className="flex-shrink-0">
              <PerpSVG />
            </div>
            <div className="space-y-3 flex-1">
              <div className="bg-violet-100 dark:bg-violet-900/30 rounded-xl border border-violet-300 dark:border-violet-700/50 px-4 py-3">
                <p className="text-sm font-bold text-violet-800 dark:text-violet-200">
                  📌 If two lines intersect each other at <strong>right angles</strong>, then the lines are <span className="underline decoration-2 underline-offset-2">perpendicular</span>.
                </p>
              </div>
              <div className="space-y-2 text-sm text-foreground">
                <p>
                  Here, line <em className="font-bold text-sky-600">l</em> is <strong>perpendicular</strong> to line <em className="font-bold text-teal-600">m</em>.
                </p>
                <div className="bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-800/40 rounded-xl px-4 py-2.5 font-mono text-center text-sm font-bold">
                  <span className="text-blue-600">l</span>
                  <span className="text-violet-600 text-lg mx-2">⊥</span>
                  <span className="text-teal-600">m</span>
                  <span className="text-muted-foreground text-xs ml-3 font-normal">(read as &quot;l is perpendicular to m&quot;)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          THINK, DISCUSS AND WRITE
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-emerald-400/50 bg-card overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">💬</span>
          <span>Think, Discuss and Write</span>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {[
            {
              num: 1,
              id: "p71_tdw_q1",
              q: <>If <em>l</em> ⊥ <em>m</em>, then can we say that <em>l</em> ⊥ <em>l</em>?</>,
              placeholder: "Yes or No, and why?",
              isOpen: true,
              multiLine: true,
            },
            {
              num: 2,
              id: "p71_tdw_q2",
              q: <>How many perpendicular lines can be drawn to a given line at a given point?</>,
              placeholder: "How many?",
              isOpen: false,
              multiLine: false,
            },
            {
              num: 3,
              id: "p71_tdw_q3",
              q: <>Which letters in the English alphabet possess perpendicular line segments?</>,
              placeholder: "e.g. T, L, F ...",
              isOpen: true,
              multiLine: false,
            },
          ].map(({ num, id, q, placeholder, isOpen, multiLine }) => (
            <div key={id} className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-600 text-white text-sm font-black shrink-0 mt-0.5">{num}</span>
              <div className="flex-1 space-y-2">
                <p className="text-sm font-medium text-foreground">{q}</p>
                <Field id={id} placeholder={placeholder} isOpen={isOpen} multiLine={multiLine} {...fp} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          5.4.3 PARALLEL LINES
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-sky-200 dark:border-sky-800/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-sky-700 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">∥</span>
          <span>5.4.3 Parallel Lines</span>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          <p className="text-sm leading-relaxed text-foreground">
            Observe the following figures — edges of a scale, railway track, electrical wires. What is special about these pairs of lines? Would they ever extend and meet each other, even if extended in any direction?
          </p>

          {/* Real-world examples of parallel lines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col items-center gap-3">
              <RailTrackSVG />
              <span className="text-[11px] font-semibold text-muted-foreground">Railway Track</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col items-center gap-3">
              {/* Scale edges */}
              <svg viewBox="0 0 200 70" className="w-44 h-14 sm:w-56 sm:h-16">
                <rect x="5" y="20" width="190" height="30" rx="4" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
                {[20, 35, 50, 65, 80, 95, 110, 125, 140, 155, 170].map((x) => (
                  <line key={x} x1={x} y1="20" x2={x} y2="30" stroke="#64748b" strokeWidth="1.2" />
                ))}
                <line x1="5" y1="20" x2="195" y2="20" stroke="#1d4ed8" strokeWidth="2.5" />
                <line x1="5" y1="50" x2="195" y2="50" stroke="#0d9488" strokeWidth="2.5" />
                <text x="4" y="17" fontSize="9" fill="#1d4ed8" fontWeight="bold" fontStyle="italic">l</text>
                <text x="4" y="60" fontSize="9" fill="#0d9488" fontWeight="bold" fontStyle="italic">m</text>
              </svg>
              <span className="text-[11px] font-semibold text-muted-foreground">Edges of a Scale/Ruler</span>
            </div>
          </div>

          {/* Q1 */}
          <div className="bg-sky-50 dark:bg-sky-950/20 rounded-xl border border-sky-200 dark:border-sky-800/40 p-4 space-y-2">
            <label className="text-xs font-bold text-sky-800 dark:text-sky-300">
              ❓ What is special about these lines (railway tracks, ruler edges)?
            </label>
            <Field id="p71_parallel_q1" placeholder="What do they never do?" isOpen multiLine {...fp} />
          </div>

          {/* Key Definition */}
          <div className="flex flex-col sm:flex-row gap-6 items-center rounded-2xl border-2 border-sky-300 dark:border-sky-700/50 bg-sky-50 dark:bg-sky-950/20 p-5">
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <ParallelLinesSVG />
              <span className="text-[11px] text-muted-foreground font-semibold">Lines l and m never meet</span>
            </div>
            <div className="space-y-3 flex-1">
              <div className="bg-sky-100 dark:bg-sky-900/30 rounded-xl border border-sky-300 dark:border-sky-700/50 px-4 py-3">
                <p className="text-sm font-bold text-sky-800 dark:text-sky-200">
                  📌 If two lines on a plane do <strong>not</strong> intersect each other at any point, they are called <span className="underline decoration-2 underline-offset-2">parallel lines</span>.
                </p>
              </div>
              <div className="space-y-2 text-sm text-foreground">
                <p>
                  We write line <em className="font-bold text-blue-600">l</em> is parallel to line <em className="font-bold text-teal-600">m</em> as:
                </p>
                <div className="bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800/40 rounded-xl px-4 py-2.5 font-mono text-center text-sm font-bold">
                  <span className="text-blue-600">l</span>
                  <span className="text-sky-600 text-lg mx-2">∥</span>
                  <span className="text-teal-600">m</span>
                  <span className="text-muted-foreground text-xs ml-3 font-normal">(read as &quot;l is parallel to m&quot;)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Q2 */}
          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40 p-4 space-y-2">
            <label className="text-xs font-bold text-amber-800 dark:text-amber-300">
              ❓ Can you find some more examples of parallel lines in your surroundings?
            </label>
            <Field id="p71_parallel_q2" placeholder="e.g. lines on a notebook, road edges..." isOpen multiLine {...fp} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          KEY CONCEPT SUMMARY CARD
      ══════════════════════════════════════ */}
      <div className="rounded-2xl bg-gradient-to-br from-violet-700 to-sky-700 text-white p-6 shadow-lg">
        <p className="text-base font-black mb-4">💡 Quick Reference — Lines Relationship</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl px-4 py-4 space-y-2 text-center">
            <div className="text-3xl font-bold font-mono">✖</div>
            <p className="text-sm font-bold">Intersecting Lines</p>
            <p className="text-xs opacity-80">Meet at exactly <strong>one point</strong></p>
            <div className="font-mono text-xs bg-white/10 rounded-lg px-2 py-1">l meets m at P</div>
          </div>
          <div className="bg-white/10 rounded-xl px-4 py-4 space-y-2 text-center">
            <div className="text-3xl font-bold font-mono">⊥</div>
            <p className="text-sm font-bold">Perpendicular Lines</p>
            <p className="text-xs opacity-80">Intersect at <strong>right angles (90°)</strong></p>
            <div className="font-mono text-xs bg-white/10 rounded-lg px-2 py-1">l ⊥ m</div>
          </div>
          <div className="bg-white/10 rounded-xl px-4 py-4 space-y-2 text-center">
            <div className="text-3xl font-bold font-mono">∥</div>
            <p className="text-sm font-bold">Parallel Lines</p>
            <p className="text-xs opacity-80"><strong>Never meet</strong> — equal distance apart always</p>
            <div className="font-mono text-xs bg-white/10 rounded-lg px-2 py-1">l ∥ m</div>
          </div>
        </div>
      </div>
    </div>
  );
}
