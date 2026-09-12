"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs (Book Page 70)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "p70_match_acute",       // Acute angle matches ?
  "p70_match_right",       // Right angle matches ?
  "p70_match_obtuse",      // Obtuse angle matches ?
  "p70_match_reflex",      // Reflex angle matches ?
  "p70_match_straight",    // Straight angle matches ?
  "p70_try1_q1",           // Do two lines intersect at more than one point?
  "p70_try1_q2",           // Lines with two common points?
];

const CORRECT: Record<string, string[]> = {
  p70_match_acute:    ["90", "90°"],
  p70_match_right:    ["270", "270°"],
  p70_match_obtuse:   ["45", "45°"],
  p70_match_reflex:   ["180", "180°"],
  p70_match_straight: ["150", "150°"],
  p70_try1_q1:        ["no", "no,theycanonlyintersectatonepoint", "onlyonepoint"],
  p70_try1_q2:        ["no", "parallel", "parallellines", "none", "cannot"],
};

const REVEAL_TEXT: Record<string, string> = {
  p70_match_acute:    "90°",
  p70_match_right:    "270°",
  p70_match_obtuse:   "45°",
  p70_match_reflex:   "180°",
  p70_match_straight: "150°",
  p70_try1_q1:        "No — two distinct lines can intersect at most at ONE point.",
  p70_try1_q2:        "No — distinct lines cannot have two common points. If they did, they would be the same line.",
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
   Shared Field Component
───────────────────────────────────────────── */
function Field({
  id, placeholder, answers, graded, isRevealed, handleChange, handleBlur, isOpen = false, className = "", multiLine = false
}: {
  id: string; placeholder: string; answers: Record<string, string>; graded: Record<string, { value: string; correct: boolean }>;
  isRevealed: boolean; handleChange: (id: string, val: string) => void; handleBlur: (id: string, isOpen?: boolean) => void;
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
   SVG: Two Intersecting Lines at point P
───────────────────────────────────────────── */
function IntersectingLinesSVG() {
  return (
    <svg viewBox="0 0 180 160" className="w-40 h-36 sm:w-52 sm:h-44">
      {/* Line l: bottom-left to top-right */}
      <line x1="20" y1="140" x2="160" y2="20" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" />
      {/* Line m: top-left to bottom-right */}
      <line x1="20" y1="30" x2="165" y2="145" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />

      {/* Intersection point P */}
      <circle cx="93" cy="83" r="4" fill="#dc2626" />
      <text x="98" y="79" fontSize="12" fill="#dc2626" fontWeight="bold" fontFamily="serif">P</text>

      {/* Labels */}
      <text x="152" y="18" fontSize="13" fill="#1d4ed8" fontWeight="bold" fontFamily="serif" fontStyle="italic">l</text>
      <text x="158" y="150" fontSize="13" fill="#0d9488" fontWeight="bold" fontFamily="serif" fontStyle="italic">m</text>

      {/* Angle arcs at intersection */}
      <path d="M 103 83 A 10 10 0 0 0 93 73" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
      <path d="M 83 83 A 10 10 0 0 0 93 93" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SVG: Angle diagram for matching exercise
───────────────────────────────────────────── */
function AngleDiagram({ deg, label, color = "#0d9488" }: { deg: number; label: string; color?: string }) {
  const cx = 45, cy = 55, r = 32;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const rad = toRad(-deg);
  const ex = cx + r * Math.cos(rad);
  const ey = cy + r * Math.sin(rad);
  const bx = cx + r;
  const by = cy;
  const arcLarge = deg > 180 ? 1 : 0;

  const arcEx = cx + 18 * Math.cos(rad);
  const arcEy = cy + 18 * Math.sin(rad);

  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 90 90" className="w-16 h-16 sm:w-20 sm:h-20">
        {/* Base ray */}
        <line x1={cx} y1={cy} x2={bx} y2={by} stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        {/* Other ray */}
        <line x1={cx} y1={cy} x2={ex} y2={ey} stroke={color} strokeWidth="2" strokeLinecap="round" />
        {/* Arc */}
        {deg === 0 ? null : deg === 360 ? (
          <circle cx={cx} cy={cy} r={18} fill="none" stroke="#f59e0b" strokeWidth="1.8" />
        ) : (
          <path
            d={`M ${bx} ${by} A 18 18 0 ${arcLarge} 0 ${arcEx} ${arcEy}`}
            fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round"
          />
        )}
        {/* Right angle box for 90° */}
        {deg === 90 && (
          <rect x={cx} y={cy - 10} width={10} height={10} fill="none" stroke="#7c3aed" strokeWidth="1.5" />
        )}
        {/* Origin */}
        <circle cx={cx} cy={cy} r="2.5" fill="#374151" />
      </svg>
      <span className="text-[11px] font-bold font-mono text-slate-600 dark:text-slate-400">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SVG: Roads / Intersecting lines picture
───────────────────────────────────────────── */
function RoadsSVG() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28">
      {/* Road 1 */}
      <line x1="10" y1="110" x2="110" y2="10" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
      <line x1="10" y1="110" x2="110" y2="10" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 4" />
      {/* Road 2 */}
      <line x1="10" y1="10" x2="110" y2="110" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
      <line x1="10" y1="10" x2="110" y2="110" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 4" />
      {/* Intersection dot */}
      <circle cx="60" cy="60" r="5" fill="#dc2626" />
    </svg>
  );
}

function ScissorsSVG() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28">
      {/* Handle 1 */}
      <ellipse cx="25" cy="20" rx="12" ry="8" fill="none" stroke="#dc2626" strokeWidth="2.5" transform="rotate(35 25 20)" />
      {/* Blade 1 */}
      <line x1="33" y1="26" x2="100" y2="95" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      {/* Handle 2 */}
      <ellipse cx="25" cy="100" rx="12" ry="8" fill="none" stroke="#dc2626" strokeWidth="2.5" transform="rotate(-35 25 100)" />
      {/* Blade 2 */}
      <line x1="33" y1="94" x2="100" y2="25" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      {/* Pivot */}
      <circle cx="60" cy="60" r="4" fill="#dc2626" />
    </svg>
  );
}

function IronTableSVG() {
  return (
    <svg viewBox="0 0 120 100" className="w-24 h-20 sm:w-28 sm:h-24">
      {/* Table top */}
      <rect x="5" y="15" width="110" height="12" rx="3" fill="#b45309" />
      {/* Leg left crossing */}
      <line x1="20" y1="27" x2="40" y2="90" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
      <line x1="40" y1="27" x2="20" y2="90" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
      {/* Leg right crossing */}
      <line x1="75" y1="27" x2="95" y2="90" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
      <line x1="95" y1="27" x2="75" y2="90" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
      {/* Intersection points */}
      <circle cx="30" cy="58" r="3" fill="#dc2626" />
      <circle cx="85" cy="58" r="3" fill="#dc2626" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function C6MathsCh5Page10() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch5-page10";

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

  const fp = {answers, graded, isRevealed, handleChange, handleBlur};

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
        <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-800 text-white font-heading font-bold px-5 py-4 text-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-white/20 text-xl">📐</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">5.4 Intersecting, Perpendicular &amp; Parallel Lines</h1>
              <p className="text-xs text-teal-100 font-normal">
                Class 6 Maths &bull; Chapter 5 &bull; Measures of Lines and Angles
              </p>
            </div>
          </div>
          <span className="text-xs bg-teal-950/80 text-teal-200 px-3 py-1 rounded-full border border-teal-400/30 font-mono self-start sm:self-auto font-bold">
            Page 70
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
          Q5 — Match Angles by Measure
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-violet-200 dark:border-violet-800/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-violet-700 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">🔗</span>
          <span>5. Match the angles by measure. Draw figures for these as well.</span>
        </div>

        <div className="p-5 sm:p-6">
          {/* Visual Match Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm mb-6">
              <thead>
                <tr>
                  <th className="border border-violet-200 dark:border-violet-800/50 bg-violet-50 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 px-4 py-2.5 text-left font-bold">
                    Group A — Angle Type
                  </th>
                  <th className="border border-violet-200 dark:border-violet-800/50 bg-violet-50 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 px-4 py-2.5 text-center font-bold">
                    Visual
                  </th>
                  <th className="border border-violet-200 dark:border-violet-800/50 bg-violet-50 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 px-4 py-2.5 text-left font-bold">
                    Group B — Measure
                  </th>
                  <th className="border border-violet-200 dark:border-violet-800/50 bg-violet-50 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 px-4 py-2.5 text-center font-bold">
                    Your Answer
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "p70_match_acute",    type: "Acute angle",    deg: 45,  color: "#0d9488", bg: "bg-green-50 dark:bg-green-950/20",   hint: "0° < θ < 90°" },
                  { id: "p70_match_right",    type: "Right angle",   deg: 90,  color: "#7c3aed", bg: "bg-purple-50 dark:bg-purple-950/20", hint: "θ = 90°" },
                  { id: "p70_match_obtuse",   type: "Obtuse angle",  deg: 120, color: "#f59e0b", bg: "bg-amber-50 dark:bg-amber-950/20",   hint: "90° < θ < 180°" },
                  { id: "p70_match_reflex",   type: "Reflex angle",  deg: 220, color: "#dc2626", bg: "bg-rose-50 dark:bg-rose-950/20",     hint: "180° < θ < 360°" },
                  { id: "p70_match_straight", type: "Straight angle",deg: 180, color: "#2563eb", bg: "bg-blue-50 dark:bg-blue-950/20",     hint: "θ = 180°" },
                ].map(({ id, type, deg, color, bg, hint }) => (
                  <tr key={id} className={bg}>
                    <td className="border border-violet-200 dark:border-violet-800/50 px-4 py-3 font-semibold">
                      <div className="flex flex-col gap-0.5">
                        <span>{type}</span>
                        <span className="text-[11px] font-mono text-muted-foreground">{hint}</span>
                      </div>
                    </td>
                    <td className="border border-violet-200 dark:border-violet-800/50 px-4 py-2">
                      <div className="flex justify-center">
                        <AngleDiagram deg={deg} label={`${deg}° approx`} color={color} />
                      </div>
                    </td>
                    <td className="border border-violet-200 dark:border-violet-800/50 px-4 py-3">
                      <div className="flex flex-col gap-1.5 font-mono font-bold text-sm">
                        <span className="text-violet-700 dark:text-violet-300">90°</span>
                        <span className="text-violet-700 dark:text-violet-300">270°</span>
                        <span className="text-violet-700 dark:text-violet-300">45°</span>
                        <span className="text-violet-700 dark:text-violet-300">180°</span>
                        <span className="text-violet-700 dark:text-violet-300">150°</span>
                      </div>
                    </td>
                    <td className="border border-violet-200 dark:border-violet-800/50 px-4 py-3">
                      <Field id={id} placeholder="e.g. 90°" className="max-w-[100px]" {...fp} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Group B visual reference */}
          <div className="bg-violet-50 dark:bg-violet-950/20 rounded-xl border border-violet-200 dark:border-violet-800/40 p-4">
            <p className="text-xs font-bold text-violet-800 dark:text-violet-300 mb-3">📊 Group B — Reference angles to match:</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {[
                { deg: 90,  label: "90°",  color: "#7c3aed" },
                { deg: 270, label: "270°", color: "#dc2626" },
                { deg: 45,  label: "45°",  color: "#0d9488" },
                { deg: 180, label: "180°", color: "#2563eb" },
                { deg: 150, label: "150°", color: "#f59e0b" },
              ].map(({ deg, label, color }) => (
                <div key={deg} className="flex flex-col items-center gap-1 bg-white dark:bg-slate-900 rounded-xl p-2 border border-violet-100 dark:border-violet-800/30">
                  <AngleDiagram deg={deg} label={label} color={color} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          Section 5.4 Header
      ══════════════════════════════════════ */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 text-white px-6 py-4 shadow-md">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">🔀</span>
          <div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight">5.4 Intersecting Lines, Perpendicular Lines and Parallel Lines</h2>
            <p className="text-xs text-teal-100 font-normal mt-0.5">Chapter 5 — Section 5.4</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          Section 5.4.1 — Intersecting Lines
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-sky-200 dark:border-sky-800/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-sky-700 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">✖️</span>
          <span>5.4.1 Intersecting Lines</span>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          <p className="text-sm text-foreground leading-relaxed">
            Look at the following pictures. The roads and sticks can be represented by lines.
          </p>

          {/* Real-world examples */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <RoadsSVG />
              <span className="text-[11px] text-muted-foreground text-center font-semibold">Crossroads</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <IronTableSVG />
              <span className="text-[11px] text-muted-foreground text-center font-semibold">Folding Table</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <ScissorsSVG />
              <span className="text-[11px] text-muted-foreground text-center font-semibold">Scissors / Sticks</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-foreground">
            The lines drawn in the pictures represent a <strong>pair of intersecting lines</strong>. These lines have a <strong>common point</strong>.
          </p>

          <div className="bg-sky-50 dark:bg-sky-950/20 rounded-xl border border-sky-200 dark:border-sky-800/40 p-4">
            <p className="text-sm text-sky-800 dark:text-sky-300 font-semibold">
              ❓ How many common points two distinct lines can have?
            </p>
          </div>

          {/* KEY DEFINITION */}
          <div className="flex flex-col sm:flex-row gap-6 items-center rounded-2xl border-2 border-emerald-300 dark:border-emerald-700/50 bg-emerald-50 dark:bg-emerald-950/20 p-5">
            <div className="flex-shrink-0">
              <IntersectingLinesSVG />
            </div>
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-foreground">
                Two separate lines <em className="font-bold text-blue-600 dark:text-blue-400">l</em> and{" "}
                <em className="font-bold text-teal-600 dark:text-teal-400">m</em> meet each other at a point{" "}
                <strong className="text-red-600 dark:text-red-400">P</strong>. We say{" "}
                <em>l</em> and <em>m</em> intersect at <strong>P</strong>.
              </p>
              <p className="text-sm leading-relaxed text-foreground">
                This is the <strong>only common point</strong> these lines can have.
              </p>
              <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-xl border border-emerald-300 dark:border-emerald-700/50 px-4 py-3">
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                  📌 If two lines have a common point, they are called <span className="underline decoration-2 underline-offset-2">intersecting lines</span>.
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Think about lines that have <em>no</em> common point — what would these lines be like?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          TRY THESE
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-teal-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-teal-700 to-emerald-600 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg text-lg">✏️</span>
          <span>Try These</span>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Q1 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-teal-600 text-white text-sm font-black shrink-0 mt-0.5">1</span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  Draw any two separate lines in a plane. Do they intersect at more than one point?
                </p>
                <p className="text-xs text-muted-foreground italic">
                  Try drawing two straight lines on paper — count how many times they cross.
                </p>
              </div>
            </div>

            {/* Interactive visual demonstrating single intersection */}
            <div className="bg-sky-50 dark:bg-sky-950/20 rounded-xl border border-sky-200 dark:border-sky-800/40 p-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-shrink-0">
                <svg viewBox="0 0 160 120" className="w-36 h-28 sm:w-44 sm:h-32">
                  {/* Line l */}
                  <line x1="10" y1="100" x2="150" y2="20" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Line m */}
                  <line x1="10" y1="25" x2="150" y2="100" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Only one common point */}
                  <circle cx="80" cy="60" r="5" fill="#dc2626" />
                  <text x="86" y="55" fontSize="11" fill="#dc2626" fontWeight="bold" fontFamily="serif">P</text>
                  {/* Labels */}
                  <text x="143" y="18" fontSize="12" fill="#1d4ed8" fontWeight="bold" fontStyle="italic">l</text>
                  <text x="143" y="103" fontSize="12" fill="#0d9488" fontWeight="bold" fontStyle="italic">m</text>
                  {/* Annotation */}
                  <text x="8" y="115" fontSize="9" fill="#64748b">Only ONE common point!</text>
                </svg>
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-xs text-sky-800 dark:text-sky-300 font-medium leading-relaxed">
                  Two <strong>distinct</strong> straight lines in a plane can intersect at <strong>at most ONE point</strong>. They cannot cross more than once.
                </p>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">❓ Your answer:</label>
                  <Field id="p70_try1_q1" placeholder="Can they intersect at more than one point? Why?" isOpen multiLine {...fp} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border/60" />

          {/* Q2 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-teal-600 text-white text-sm font-black shrink-0 mt-0.5">2</span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Can you think of distinct lines that have <strong>two common points</strong>?
                </p>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40 p-4 space-y-3">
              <p className="text-xs text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
                💡 <strong>Hint:</strong> If two lines share two common points, what does that tell you about the lines?
                Think about the uniqueness of a line through two points.
              </p>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">❓ Your answer:</label>
                <Field id="p70_try1_q2" placeholder="Can distinct lines have two common points?" isOpen multiLine {...fp} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          KEY CONCEPT CARD
      ══════════════════════════════════════ */}
      <div className="rounded-2xl bg-gradient-to-br from-sky-600 to-blue-700 text-white p-6 shadow-lg">
        <p className="text-base font-black mb-4">💡 Key Concepts — Intersecting Lines</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl px-4 py-3 space-y-1">
            <p className="text-sm font-bold">Intersecting Lines</p>
            <p className="text-xs opacity-90">Two lines that meet at exactly <strong>one common point</strong> (called the point of intersection).</p>
          </div>
          <div className="bg-white/10 rounded-xl px-4 py-3 space-y-1">
            <p className="text-sm font-bold">Key Fact</p>
            <p className="text-xs opacity-90">Two distinct straight lines can intersect at <strong>most once</strong>. They cannot have more than one common point.</p>
          </div>
          <div className="bg-white/10 rounded-xl px-4 py-3 space-y-1">
            <p className="text-sm font-bold">Real-life Examples</p>
            <p className="text-xs opacity-90">Crossroads, scissors blades, folding table legs — all show pairs of intersecting lines.</p>
          </div>
          <div className="bg-white/10 rounded-xl px-4 py-3 space-y-1">
            <p className="text-sm font-bold">Non-intersecting Lines</p>
            <p className="text-xs opacity-90">Lines with <strong>no common point</strong> are called <em>parallel lines</em> — they never meet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
