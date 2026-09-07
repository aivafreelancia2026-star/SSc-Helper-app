"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs  (Book Page 74)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "p74_satya_swetha_diff",   // What is the difference in their angles?
  "p74_think_clockwise",     // Which angle (∠AOC) is clock-wise?
  "p74_think_anticlockwise", // Which angle (∠AOB) is anti clock-wise?
  "p74_activity_fold1",      // Angle at fold after semi-circle (90°)
  "p74_activity_fold2",      // Angle when quadrant folded again (45°)
  "p74_activity_total",      // 90° + 45° = ?
  "p74_discuss_write",       // Open-ended discussion
];

/* ─────────────────────────────────────────────
   Correct answers & reveal text
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  p74_satya_swetha_diff:   ["direction", "sign", "positive", "negative", "clockwise", "anticlockwise", "opposite"],
  p74_think_clockwise:     ["aoc", "∠aoc", "angleanoc", "angleaoc", "aoc"],
  p74_think_anticlockwise: ["aob", "∠aob", "angleaob", "angleanob", "aob"],
  p74_activity_fold1:      ["90", "90°", "ninetydegrees", "rightangle"],
  p74_activity_fold2:      ["45", "45°", "fortyfive"],
  p74_activity_total:      ["135", "135°"],
};

const REVEAL_TEXT: Record<string, string> = {
  p74_satya_swetha_diff:   "The direction — Satya's angle is anti clock-wise (+45°, positive) and Swetha's is clock-wise (−45°, negative).",
  p74_think_clockwise:     "∠AOC — the ray moves in the direction of clock hands (clock-wise, negative)",
  p74_think_anticlockwise: "∠AOB — the ray moves opposite to clock hands (anti clock-wise, positive)",
  p74_activity_fold1:      "90° — the fold is at right angles to the edge",
  p74_activity_fold2:      "45° — half of 90°",
  p74_activity_total:      "135° — since 90° + 45° = 135°",
  p74_discuss_write:       "∠AOB is anti clock-wise (positive). ∠AOC is clock-wise (negative).",
};

const normalize = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9°]/g, "");

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
   Angle SVG — Satya (anti-clockwise, positive)
───────────────────────────────────────────── */
function AntiClockwiseAngle({ angleDeg, label, color = "#0d9488" }: { angleDeg: number; label: string; color?: string }) {
  const cx = 50, cy = 65, rayLen = 38;
  const rnd = (n: number) => Math.round(n * 100) / 100;
  // Base ray → rightward (0°)
  const bx = cx + rayLen;
  // Rotated ray → anti-clockwise = subtract from 0 in SVG coords (SVG y is down, so subtract)
  const rad = (-angleDeg * Math.PI) / 180;
  const rx = rnd(cx + rayLen * Math.cos(rad));
  const ry = rnd(cy + rayLen * Math.sin(rad));
  const arcR = 16;
  const ax = rnd(cx + arcR);
  const ay = cy;
  const ax2 = rnd(cx + arcR * Math.cos(rad));
  const ay2 = rnd(cy + arcR * Math.sin(rad));

  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 100 90" className="w-36 h-32 sm:w-44 sm:h-36">
        {/* Base ray OA → rightward */}
        <line x1={cx} y1={cy} x2={bx} y2={cy} stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
        <polygon points={`${bx},${cy} ${bx-6},${cy-3} ${bx-6},${cy+3}`} fill="#475569"/>
        <text x={bx+2} y={cy+4} fontSize="7" fill="#475569" fontWeight="bold">A</text>
        {/* Rotated ray OB */}
        <line x1={cx} y1={cy} x2={rx} y2={ry} stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
        <polygon
          points={`${rx},${ry} ${rnd(rx - 6*Math.cos(rad) + 3*Math.sin(rad))},${rnd(ry - 6*Math.sin(rad) - 3*Math.cos(rad))} ${rnd(rx - 6*Math.cos(rad) - 3*Math.sin(rad))},${rnd(ry - 6*Math.sin(rad) + 3*Math.cos(rad))}`}
          fill={color}
        />
        <text x={rnd(rx + 4*Math.cos(rad))} y={rnd(ry + 4*Math.sin(rad))} fontSize="7" fill={color} fontWeight="bold">B</text>
        {/* Arc */}
        <path
          d={`M ${ax} ${ay} A ${arcR} ${arcR} 0 0 0 ${ax2} ${ay2}`}
          fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round"
        />
        {/* Angle label */}
        <text x={rnd(cx + 22*Math.cos(rad/2))} y={rnd(cy + 22*Math.sin(rad/2) - 4)} fontSize="8" fill="#f59e0b" fontWeight="bold" textAnchor="middle">{angleDeg}°</text>
        {/* Origin label */}
        <text x={cx-5} y={cy+10} fontSize="7" fill="#64748b" fontWeight="bold">O</text>
        {/* Direction arrow */}
        <text x="5" y="15" fontSize="6.5" fill={color} fontWeight="bold">↺ Anti-clockwise</text>
      </svg>
      <div className="text-center">
        <p className="text-sm font-bold text-foreground">{label}</p>
        <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">∠AOB = +{angleDeg}°</p>
        <p className="text-[11px] text-muted-foreground">(positive — anti clock-wise)</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Angle SVG — Swetha (clockwise, negative)
───────────────────────────────────────────── */
function ClockwiseAngle({ angleDeg, label, color = "#dc2626" }: { angleDeg: number; label: string; color?: string }) {
  const cx = 50, cy = 35, rayLen = 38;
  const rnd = (n: number) => Math.round(n * 100) / 100;
  const bx = cx + rayLen;
  // Clockwise = positive in SVG coords (y-down)
  const rad = (angleDeg * Math.PI) / 180;
  const rx = rnd(cx + rayLen * Math.cos(rad));
  const ry = rnd(cy + rayLen * Math.sin(rad));
  const arcR = 16;
  const ax = rnd(cx + arcR);
  const ay = cy;
  const ax2 = rnd(cx + arcR * Math.cos(rad));
  const ay2 = rnd(cy + arcR * Math.sin(rad));

  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 100 90" className="w-36 h-32 sm:w-44 sm:h-36">
        {/* Base ray OA → rightward */}
        <line x1={cx} y1={cy} x2={bx} y2={cy} stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
        <polygon points={`${bx},${cy} ${bx-6},${cy-3} ${bx-6},${cy+3}`} fill="#475569"/>
        <text x={bx+2} y={cy+4} fontSize="7" fill="#475569" fontWeight="bold">A</text>
        {/* Rotated ray OB */}
        <line x1={cx} y1={cy} x2={rx} y2={ry} stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
        <polygon
          points={`${rx},${ry} ${rnd(rx - 6*Math.cos(rad) + 3*Math.sin(rad))},${rnd(ry - 6*Math.sin(rad) - 3*Math.cos(rad))} ${rnd(rx - 6*Math.cos(rad) - 3*Math.sin(rad))},${rnd(ry - 6*Math.sin(rad) + 3*Math.cos(rad))}`}
          fill={color}
        />
        <text x={rnd(rx + 5*Math.cos(rad))} y={rnd(ry + 5*Math.sin(rad))} fontSize="7" fill={color} fontWeight="bold">B</text>
        {/* Arc */}
        <path
          d={`M ${ax} ${ay} A ${arcR} ${arcR} 0 0 1 ${ax2} ${ay2}`}
          fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round"
        />
        {/* Angle label */}
        <text x={rnd(cx + 24*Math.cos(rad/2))} y={rnd(cy + 24*Math.sin(rad/2) + 7)} fontSize="8" fill="#f59e0b" fontWeight="bold" textAnchor="middle">{angleDeg}°</text>
        {/* Origin label */}
        <text x={cx-5} y={cy-4} fontSize="7" fill="#64748b" fontWeight="bold">O</text>
        {/* Direction arrow */}
        <text x="5" y="82" fontSize="6.5" fill={color} fontWeight="bold">↻ Clock-wise</text>
      </svg>
      <div className="text-center">
        <p className="text-sm font-bold text-foreground">{label}</p>
        <p className="text-xs font-mono text-red-700 dark:text-red-400 font-bold">∠AOB = −{angleDeg}°</p>
        <p className="text-[11px] text-muted-foreground">(negative — clock-wise)</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Think-Discuss figure: ∠AOB (anti-cw) + ∠AOC (cw)
───────────────────────────────────────────── */
function ThinkDiscussFigure() {
  return (
    <svg viewBox="0 0 160 120" className="w-48 h-36 sm:w-56 sm:h-40">
      {/* Origin O */}
      <circle cx="60" cy="70" r="2.5" fill="#334155"/>
      <text x="52" y="84" fontSize="8" fill="#334155" fontWeight="bold">O</text>
      {/* Base ray OA → right */}
      <line x1="60" y1="70" x2="130" y2="70" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
      <polygon points="130,70 122,67 122,73" fill="#475569"/>
      <text x="133" y="74" fontSize="8" fill="#475569" fontWeight="bold">A</text>
      {/* Ray OB → upper-left (anti-clockwise ~120°) */}
      <line x1="60" y1="70" x2="15" y2="32" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round"/>
      <polygon points="15,32 22,38 28,30" fill="#0d9488"/>
      <text x="8" y="28" fontSize="8" fill="#0d9488" fontWeight="bold">B</text>
      {/* Arc AOB - anti-clockwise */}
      <path d="M 85 70 A 25 25 0 0 0 47 48" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3,2"/>
      <text x="95" y="55" fontSize="7" fill="#0d9488" fontWeight="bold">∠AOB</text>
      {/* Ray OC → lower-right (clockwise ~50°) */}
      <line x1="60" y1="70" x2="105" y2="108" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round"/>
      <polygon points="105,108 97,105 103,98" fill="#dc2626"/>
      <text x="108" y="114" fontSize="8" fill="#dc2626" fontWeight="bold">C</text>
      {/* Arc AOC - clockwise */}
      <path d="M 85 70 A 25 25 0 0 1 88 93" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3,2"/>
      <text x="95" y="100" fontSize="7" fill="#dc2626" fontWeight="bold">∠AOC</text>
      {/* ↺ ↻ legend */}
      <text x="5" y="115" fontSize="7" fill="#0d9488" fontWeight="bold">↺ = anti cw</text>
      <text x="80" y="115" fontSize="7" fill="#dc2626" fontWeight="bold">↻ = cw</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Paper-folding step SVGs
───────────────────────────────────────────── */
function FoldStep1() {
  return (
    <svg viewBox="0 0 100 80" className="w-24 h-20 sm:w-28 sm:h-24">
      <circle cx="50" cy="45" r="32" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.8"/>
      <line x1="18" y1="45" x2="82" y2="45" stroke="#1d4ed8" strokeWidth="1.5" strokeDasharray="3,2"/>
      <text x="50" y="20" textAnchor="middle" fontSize="8" fill="#1d4ed8" fontWeight="bold">Circle</text>
    </svg>
  );
}
function FoldStep2() {
  return (
    <svg viewBox="0 0 100 80" className="w-24 h-20 sm:w-28 sm:h-24">
      <path d="M 15 55 A 35 35 0 0 1 85 55 Z" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.8"/>
      <line x1="15" y1="55" x2="85" y2="55" stroke="#1d4ed8" strokeWidth="2"/>
      <text x="50" y="35" textAnchor="middle" fontSize="8" fill="#1d4ed8" fontWeight="bold">Semi-circle</text>
    </svg>
  );
}
function FoldStep3() {
  return (
    <svg viewBox="0 0 100 80" className="w-24 h-20 sm:w-28 sm:h-24">
      <path d="M 50 60 A 35 35 0 0 1 85 60 Z" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.8"/>
      <line x1="50" y1="60" x2="85" y2="60" stroke="#1d4ed8" strokeWidth="2"/>
      <line x1="50" y1="25" x2="50" y2="60" stroke="#7c3aed" strokeWidth="2"/>
      <text x="75" y="50" textAnchor="middle" fontSize="7.5" fill="#7c3aed" fontWeight="bold">90°</text>
      <rect x="50" y="52" width="8" height="8" fill="none" stroke="#7c3aed" strokeWidth="1.5"/>
      <text x="68" y="72" textAnchor="middle" fontSize="7" fill="#1d4ed8" fontWeight="bold">Quadrant</text>
    </svg>
  );
}
function FoldStep4() {
  return (
    <svg viewBox="0 0 100 80" className="w-24 h-20 sm:w-28 sm:h-24">
      {/* Smaller wedge */}
      <path d="M 15 65 A 45 45 0 0 1 50 23 L 15 65 Z" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.8"/>
      <line x1="15" y1="65" x2="57" y2="65" stroke="#1d4ed8" strokeWidth="2"/>
      {/* The crease at 45° */}
      <line x1="15" y1="65" x2="50" y2="23" stroke="#7c3aed" strokeWidth="2"/>
      {/* Fold line at 45° from base */}
      <line x1="15" y1="65" x2="47" y2="36" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,2"/>
      <text x="38" y="60" fontSize="7.5" fill="#7c3aed" fontWeight="bold">45°</text>
      <text x="55" y="25" fontSize="7" fill="#7c3aed">B</text>
      <text x="58" y="67" fontSize="7" fill="#1d4ed8">A</text>
      <text x="8" y="68" fontSize="7" fill="#64748b">O</text>
    </svg>
  );
}
function FoldStep5() {
  return (
    <svg viewBox="0 0 120 90" className="w-28 h-24 sm:w-32 sm:h-28">
      {/* Semi-circle opened */}
      <path d="M 15 70 A 50 50 0 0 1 115 70 Z" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5"/>
      <line x1="15" y1="70" x2="115" y2="70" stroke="#1d4ed8" strokeWidth="2"/>
      {/* 45° crease from left */}
      <line x1="15" y1="70" x2="50" y2="25" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="4,2"/>
      {/* 90° crease (vertical) */}
      <line x1="65" y1="70" x2="65" y2="20" stroke="#7c3aed" strokeWidth="1.8"/>
      <rect x="65" y="62" width="8" height="8" fill="none" stroke="#7c3aed" strokeWidth="1.5"/>
      {/* 135° crease from right */}
      <line x1="115" y1="70" x2="80" y2="25" stroke="#0d9488" strokeWidth="1.8" strokeDasharray="4,2"/>
      {/* Angle labels */}
      <text x="32" y="66" fontSize="7.5" fill="#f59e0b" fontWeight="bold">45°</text>
      <text x="68" y="50" fontSize="7.5" fill="#7c3aed" fontWeight="bold">90°</text>
      <text x="88" y="58" fontSize="7.5" fill="#0d9488" fontWeight="bold">135°</text>
      <text x="10" y="82" fontSize="7" fill="#64748b">O</text>
      <text x="110" y="82" fontSize="7" fill="#64748b">A</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function C6MathsCh5Page6() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch5-page6";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded]   = useState<Record<string, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; label?: string; id: number } | null>(null);

  const answeredCount = useMemo(
    () => ALL_INPUT_IDS.filter((id) => (answers[id] ?? "").trim().length > 0).length,
    [answers]
  );
  const correctCount = useMemo(
    () => ALL_INPUT_IDS.filter((id) => graded[id]?.correct === true).length,
    [graded]
  );

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
      const isOpen = id === "p74_satya_swetha_diff" || id === "p74_discuss_write";
      const correct = isOpen ? rawTyped.trim().length >= 5 : validateAnswer(id, rawTyped);
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

    const correct = isOpen ? rawTyped.trim().length >= 5 : validateAnswer(id, rawTyped);

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

  function Field({ id, placeholder, isOpen = false, className = "", multiLine = false }: {
    id: string; placeholder: string; isOpen?: boolean; className?: string; multiLine?: boolean;
  }) {
    const displayVal = isRevealed ? (REVEAL_TEXT[id] ?? "") : (answers[id] ?? "");
    const baseCls = `w-full rounded-xl border px-3 py-2 text-xs sm:text-sm font-mono outline-none transition-all shadow-sm resize-none ${borderCls(id, answers, graded, isRevealed)}`;
    if (multiLine) {
      return (
        <div className={`relative w-full ${className}`}>
          <textarea id={`field-${id}`} rows={3} placeholder={placeholder}
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
            <span className="p-2 rounded-xl bg-white/20 text-xl">↺</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">5.3 Direction of Angles</h1>
              <p className="text-xs text-teal-100 font-normal">
                Class 6 Maths &bull; Chapter 5 &bull; Clock-wise & Anti Clock-wise Angles
              </p>
            </div>
          </div>
          <span className="text-xs bg-teal-950/80 text-teal-200 px-3 py-1 rounded-full border border-teal-400/30 font-mono self-start sm:self-auto font-bold">
            Page 74
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
          SATYA vs SWETHA — Direction of Angles
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-teal-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-teal-700 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">📐</span>
          <span>Satya &amp; Swetha — Same Angle, Different Directions</span>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Satya and Swetha were given Ray <strong className="font-mono text-foreground">OA</strong> and were
            asked to draw a <strong className="text-foreground">45° angle</strong>. They drew like this:
          </p>

          {/* Two angle diagrams */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Satya — anti-clockwise */}
            <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-950/20 p-5 flex flex-col items-center gap-3">
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">Satya — Anti Clock-wise</p>
              <AntiClockwiseAngle angleDeg={45} label="Satya (∠AOB = 45°)" />
              <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-xl px-4 py-2 text-center">
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  <strong>OA</strong> moved in the <strong>opposite direction</strong> of clock hands.
                  <br/>Called <strong>Anti clock-wise angle</strong> → denoted by{" "}
                  <strong className="font-mono text-emerald-700 dark:text-emerald-400">positive (+)</strong> sign.
                </p>
              </div>
            </div>

            {/* Swetha — clockwise */}
            <div className="rounded-xl border-2 border-red-200 dark:border-red-800/50 bg-red-50/50 dark:bg-red-950/20 p-5 flex flex-col items-center gap-3">
              <p className="text-xs font-bold text-red-800 dark:text-red-300 uppercase tracking-wide">Swetha — Clock-wise</p>
              <ClockwiseAngle angleDeg={45} label="Swetha (∠AOB = 45°)" />
              <div className="bg-red-100 dark:bg-red-900/30 rounded-xl px-4 py-2 text-center">
                <p className="text-xs text-red-800 dark:text-red-300">
                  <strong>OA</strong> moved in the <strong>direction of clock hands</strong>.
                  <br/>Called <strong>Clock-wise angle</strong> → denoted by{" "}
                  <strong className="font-mono text-red-700 dark:text-red-400">negative (−)</strong> sign.
                </p>
              </div>
            </div>
          </div>

          {/* Key concept pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full px-4 py-1.5 text-xs font-bold">
              <span>↺</span><span>Anti clock-wise → <span className="font-mono">+positive</span></span>
            </div>
            <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full px-4 py-1.5 text-xs font-bold">
              <span>↻</span><span>Clock-wise → <span className="font-mono">−negative</span></span>
            </div>
          </div>

          {/* Question */}
          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40 p-4 space-y-3">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-300">
              ❓ What is the difference in the angles drawn by Satya and Swetha?
            </p>
            <Field
              id="p74_satya_swetha_diff"
              placeholder="Describe the difference between Satya's and Swetha's angles..."
              isOpen multiLine
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          THINK, DISCUSS AND WRITE
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-purple-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-purple-700 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">💬</span>
          <span>Think, Discuss and Write</span>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            In the adjacent figure, <strong className="text-foreground">∠AOB</strong> and{" "}
            <strong className="text-foreground">∠AOC</strong> are given. Which angle is <em>clock-wise</em> and
            which angle is <em>anti clock-wise</em>? Think and discuss with your friends.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            {/* The figure */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex items-center justify-center shadow-sm shrink-0">
              <ThinkDiscussFigure />
            </div>

            {/* Answer fields */}
            <div className="w-full space-y-4">
              <div className="space-y-2 bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/40">
                <label className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <span className="font-mono bg-emerald-200 dark:bg-emerald-900 px-2 py-0.5 rounded-lg">↺</span>
                  Which angle is <strong>anti clock-wise</strong> (positive)?
                </label>
                <Field id="p74_think_anticlockwise" placeholder="∠AOB or ∠AOC?" className="max-w-xs" />
              </div>

              <div className="space-y-2 bg-red-50 dark:bg-red-950/20 p-4 rounded-xl border border-red-200 dark:border-red-800/40">
                <label className="text-sm font-semibold text-red-800 dark:text-red-300 flex items-center gap-2">
                  <span className="font-mono bg-red-200 dark:bg-red-900 px-2 py-0.5 rounded-lg">↻</span>
                  Which angle is <strong>clock-wise</strong> (negative)?
                </label>
                <Field id="p74_think_clockwise" placeholder="∠AOB or ∠AOC?" className="max-w-xs" />
              </div>

              <div className="space-y-2 bg-blue-50 dark:bg-blue-950/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800/40">
                <label className="text-xs font-semibold text-blue-800 dark:text-blue-300">
                  📝 Write your discussion notes:
                </label>
                <Field id="p74_discuss_write"
                  placeholder="e.g. ∠AOB is anti clock-wise because... ∠AOC is clock-wise because..."
                  isOpen multiLine />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          ACTIVITY — Paper Folding
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-emerald-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-emerald-700 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">📄</span>
          <span>Activity — Paper Folding to Find Angles</span>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[
              {
                step: 1, icon: <FoldStep1/>,
                title: "Cut a Circle",
                text: "Cut out a circular shape using a bangle or take a circular sheet.",
                color: "border-blue-200 dark:border-blue-800/50 bg-blue-50/60 dark:bg-blue-950/20"
              },
              {
                step: 2, icon: <FoldStep2/>,
                title: "Fold → Semi-circle",
                text: "Fold it once from the middle. You will get a semi circle.",
                color: "border-teal-200 dark:border-teal-800/50 bg-teal-50/60 dark:bg-teal-950/20"
              },
              {
                step: 3, icon: <FoldStep3/>,
                title: "Fold → Quadrant",
                text: "Fold once again to get a quadrant shape. The fold is at 90° to the edge.",
                color: "border-purple-200 dark:border-purple-800/50 bg-purple-50/60 dark:bg-purple-950/20"
              },
              {
                step: 4, icon: <FoldStep4/>,
                title: "Mark 45°",
                text: "Now fold the quadrant once more. The angle is half of 90° = 45°. Open it out.",
                color: "border-amber-200 dark:border-amber-800/50 bg-amber-50/60 dark:bg-amber-950/20"
              },
              {
                step: 5, icon: <FoldStep5/>,
                title: "Mark 135°",
                text: "Mark 45° and 90°. The other side of 90° is 135°, since 90° + 45° = 135°.",
                color: "border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/60 dark:bg-emerald-950/20"
              },
            ].map(({ step, icon, title, text, color }) => (
              <div key={step} className={`rounded-xl border p-3 flex flex-col items-center gap-2 text-center ${color}`}>
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{step}</span>
                {icon}
                <p className="text-xs font-bold text-foreground">{title}</p>
                <p className="text-[11px] text-muted-foreground leading-snug">{text}</p>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-border/60" />

          {/* Questions */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-foreground">📋 Answer the questions about the activity:</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2 bg-purple-50 dark:bg-purple-950/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800/40">
                <label className="text-xs font-bold text-purple-800 dark:text-purple-300">
                  The fold in Step 3 is at what angle to the edge?
                </label>
                <Field id="p74_activity_fold1" placeholder="e.g. 90°" className="" />
                <p className="text-[11px] text-muted-foreground italic">Hint: Look at the right-angle box □</p>
              </div>

              <div className="space-y-2 bg-amber-50 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800/40">
                <label className="text-xs font-bold text-amber-800 dark:text-amber-300">
                  When you fold the quadrant again (Step 4), the angle is?
                </label>
                <Field id="p74_activity_fold2" placeholder="e.g. 45°" className="" />
                <p className="text-[11px] text-muted-foreground italic">Hint: half of 90°</p>
              </div>

              <div className="space-y-2 bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/40">
                <label className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  What is the angle on the other side? (90° + 45° = ?)
                </label>
                <Field id="p74_activity_total" placeholder="e.g. 135°" className="" />
                <p className="text-[11px] text-muted-foreground italic">
                  Since the fold is 45°, the other side of 90° is <strong>90° + 45° = ?</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Key takeaway */}
          <div className="bg-teal-50 dark:bg-teal-950/20 rounded-xl border border-teal-200 dark:border-teal-800/40 p-4">
            <p className="text-sm font-semibold text-teal-800 dark:text-teal-300 mb-2">💡 Key Takeaway from Activity:</p>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              {[
                { label: "Full circle", val: "360°", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300" },
                { label: "Semi-circle", val: "180°", color: "bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300" },
                { label: "Quadrant (¼)", val: "90°", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300" },
                { label: "Half quadrant", val: "45°", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300" },
                { label: "90° + 45°", val: "135°", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300" },
              ].map(({ label, val, color }) => (
                <div key={val} className={`rounded-xl px-3 py-2 text-center ${color}`}>
                  <p className="text-[11px] font-semibold">{label}</p>
                  <p className="text-lg font-black font-mono">{val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
