"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs  (Book Page 75)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "p75_centre_name",
  "p75_scale_count",
  "p75_each_division",
  "p75_inner_range",
  "p75_outer_range",
  "p75_step1_action",
  "p75_step2_action",
  "p75_step3_action",
];

const CORRECT: Record<string, string[]> = {
  p75_centre_name:   ["centre", "center", "centrepoint", "centerpoint", "meetingpoint"],
  p75_scale_count:   ["180", "onehundredandeighty"],
  p75_each_division: ["1", "1°", "onedegree", "one"],
  p75_inner_range:   ["180", "0to180", "0°to180°"],
  p75_outer_range:   ["180", "0to180", "0°to180°"],
  p75_step1_action:  ["angle", "acute", "obtuse", "reflex", "identify", "type"],
  p75_step2_action:  ["vertex", "centre", "center", "point", "apex"],
  p75_step3_action:  ["arm", "baseline", "read", "measure", "degree", "value"],
};

const REVEAL_TEXT: Record<string, string> = {
  p75_centre_name:   "Centre",
  p75_scale_count:   "180",
  p75_each_division: "1°",
  p75_inner_range:   "0° to 180°",
  p75_outer_range:   "0° to 180°",
  p75_step1_action:  "Identify the angle — whether it is acute, obtuse or reflex.",
  p75_step2_action:  "Place the centre point of the protractor on the vertex of the angle.",
  p75_step3_action:  "Adjust so one arm lies along the base line and read the value where the other arm crosses the arc.",
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
   Interactive SVG Protractor
───────────────────────────────────────────── */
function InteractiveProtractor() {
  const [angleDeg, setAngleDeg] = useState(50);
  const [mode, setMode] = useState<"cw" | "acw">("acw");
  const [dragging, setDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const cx = 120, cy = 120, R = 100;

  const toRad = (d: number) => (d * Math.PI) / 180;

  /* tick marks */
  const ticks: React.ReactNode[] = [];
  for (let a = 0; a <= 180; a++) {
    const inner = a % 10 === 0 ? R - 14 : a % 5 === 0 ? R - 9 : R - 5;
    const rad = toRad(a);
    const ox = cx + R * Math.cos(Math.PI - rad);
    const oy = cy - R * Math.sin(rad);
    const ix = cx + inner * Math.cos(Math.PI - rad);
    const iy = cy - inner * Math.sin(rad);
    ticks.push(
      <line key={a} x1={ox} y1={oy} x2={ix} y2={iy}
        stroke="#4b5563" strokeWidth={a % 10 === 0 ? 1.4 : 0.8} />
    );
  }

  /* degree labels — outer (anti-cw) + inner (cw) */
  const labels: React.ReactNode[] = [];
  [0, 30, 60, 90, 120, 150, 180].forEach((a) => {
    const rad = toRad(a);
    const lx = cx + (R - 22) * Math.cos(Math.PI - rad);
    const ly = cy - (R - 22) * Math.sin(rad);
    const ilx = cx + (R - 33) * Math.cos(Math.PI - rad);
    const ily = cy - (R - 33) * Math.sin(rad);
    labels.push(
      <text key={`o${a}`} x={lx} y={ly} textAnchor="middle" dominantBaseline="central"
        fontSize="7" fill="#1e3a5f" fontWeight="bold">{a}</text>,
      <text key={`i${a}`} x={ilx} y={ily} textAnchor="middle" dominantBaseline="central"
        fontSize="6" fill="#7c3aed">{180 - a}</text>
    );
  });

  /* arm position */
  const armAngleSVG = mode === "acw"
    ? Math.PI - toRad(angleDeg)
    : toRad(angleDeg);

  const armX = cx + (R - 2) * Math.cos(armAngleSVG);
  const armY = cy - (R - 2) * Math.sin(armAngleSVG);
  const dotX = cx + (R + 8) * Math.cos(armAngleSVG);
  const dotY = cy - (R + 8) * Math.sin(armAngleSVG);

  /* arc for angle */
  const arcR = 16;
  const arcSX = cx + arcR * (mode === "acw" ? 1 : -1);
  const arcSY = cy;
  const arcEX = cx + arcR * Math.cos(armAngleSVG);
  const arcEY = cy - arcR * Math.sin(armAngleSVG);
  const sweep = mode === "acw" ? 0 : 1;

  const armColor = mode === "acw" ? "#0d9488" : "#dc2626";

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 240 - cx;
    const svgY = ((e.clientY - rect.top) / rect.height) * 145 - cy;
    let deg = Math.atan2(-svgY, svgX) * (180 / Math.PI);
    if (mode === "cw") deg = 180 - deg;
    setAngleDeg(Math.max(0, Math.min(180, Math.round(deg))));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button type="button" onClick={() => setMode("acw")}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${mode === "acw" ? "bg-teal-600 text-white shadow" : "bg-slate-100 dark:bg-slate-800 text-muted-foreground border border-slate-300 dark:border-slate-700"}`}>
          ↺ Anti-clockwise
        </button>
        <button type="button" onClick={() => setMode("cw")}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${mode === "cw" ? "bg-rose-600 text-white shadow" : "bg-slate-100 dark:bg-slate-800 text-muted-foreground border border-slate-300 dark:border-slate-700"}`}>
          ↻ Clockwise
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-3 shadow-sm w-full max-w-xs sm:max-w-sm">
        <svg ref={svgRef} viewBox="0 0 240 145" className="w-full h-auto cursor-crosshair"
          onPointerDown={() => setDragging(true)}
          onPointerUp={() => setDragging(false)}
          onPointerLeave={() => setDragging(false)}
          onPointerMove={handlePointerMove}>
          {/* Semi-circle body */}
          <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy} Z`}
            fill="#e0f2fe" stroke="#0369a1" strokeWidth="1.5" />
          {ticks}
          {labels}
          {/* Centre point */}
          <circle cx={cx} cy={cy} r={3} fill="#0369a1" />
          <text x={cx} y={cy + 12} textAnchor="middle" fontSize="6.5" fill="#0369a1" fontWeight="bold">Centre</text>
          {/* Base line */}
          <line x1={cx - R - 16} y1={cy} x2={cx - R} y2={cy} stroke="#374151" strokeWidth="1.8" />
          <polygon points={`${cx - R - 16},${cy} ${cx - R - 8},${cy - 3} ${cx - R - 8},${cy + 3}`} fill="#374151" />
          <text x={cx - R - 20} y={cy - 6} fontSize="7" fill="#374151" fontWeight="bold">O</text>
          <line x1={cx + R} y1={cy} x2={cx + R + 16} y2={cy} stroke="#374151" strokeWidth="1.8" />
          <polygon points={`${cx + R + 16},${cy} ${cx + R + 8},${cy - 3} ${cx + R + 8},${cy + 3}`} fill="#374151" />
          {/* 0° labels */}
          <text x={cx - R + 4} y={cy + 11} fontSize="6" fill="#0369a1" fontWeight="bold">0°</text>
          <text x={cx + R - 14} y={cy + 11} fontSize="6" fill="#0369a1" fontWeight="bold">0°</text>
          {/* Angle arc */}
          <path d={`M ${arcSX} ${arcSY} A ${arcR} ${arcR} 0 0 ${sweep} ${arcEX} ${arcEY}`}
            fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" />
          {/* Moving arm */}
          <line x1={cx} y1={cy} x2={armX} y2={armY}
            stroke={armColor} strokeWidth="2" strokeLinecap="round" />
          <circle cx={dotX} cy={dotY} r={4} fill={armColor} />
          {/* Angle label */}
          <text x={cx + 35 * Math.cos(armAngleSVG)} y={cy - 35 * Math.sin(armAngleSVG) - 4}
            textAnchor="middle" fontSize="10" fill="#f59e0b" fontWeight="bold">
            {angleDeg}°
          </text>
          <text x={cx} y={137} textAnchor="middle" fontSize="7" fill="#9ca3af">
            Drag to measure any angle
          </text>
        </svg>

        <div className="mt-3 px-2">
          <input type="range" min={0} max={180} value={angleDeg}
            onChange={(e) => setAngleDeg(Number(e.target.value))}
            className="w-full accent-teal-600" />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono mt-0.5">
            <span>0°</span>
            <span className="font-bold text-foreground">
              {angleDeg}° {mode === "acw" ? "(anti-clockwise)" : "(clockwise)"}
            </span>
            <span>180°</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <div className="rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/50 px-3 py-1.5 text-xs text-teal-800 dark:text-teal-300 font-bold">
          Outer scale (anti-cw): <span className="font-mono">{mode === "acw" ? angleDeg : 180 - angleDeg}°</span>
        </div>
        <div className="rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 px-3 py-1.5 text-xs text-purple-800 dark:text-purple-300 font-bold">
          Inner scale (cw): <span className="font-mono">{mode === "cw" ? angleDeg : 180 - angleDeg}°</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Small angle SVG for steps table
───────────────────────────────────────────── */
function SmallAngleSVG({ direction, angleDeg, label }: { direction: "cw" | "acw"; angleDeg: number; label: string }) {
  const cx = 55, cy = direction === "acw" ? 58 : 38, rayLen = 42;
  const rnd = (n: number) => Math.round(n * 100) / 100;
  const rad = direction === "acw" ? (-angleDeg * Math.PI) / 180 : (angleDeg * Math.PI) / 180;
  const bx = cx + rayLen;
  const rx = rnd(cx + rayLen * Math.cos(rad));
  const ry = rnd(cy + rayLen * Math.sin(rad));
  const arcR = 18;
  const ax = rnd(cx + arcR);
  const ay = cy;
  const ax2 = rnd(cx + arcR * Math.cos(rad));
  const ay2 = rnd(cy + arcR * Math.sin(rad));
  const sweep = direction === "cw" ? 1 : 0;
  const color = direction === "acw" ? "#0d9488" : "#dc2626";
  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 110 88" className="w-24 h-20 sm:w-28 sm:h-24">
        <line x1={cx} y1={cy} x2={bx} y2={cy} stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        <polygon points={`${bx},${cy} ${bx - 6},${cy - 3} ${bx - 6},${cy + 3}`} fill="#475569" />
        <text x={bx + 3} y={cy + 5} fontSize="8" fill="#475569" fontWeight="bold">A</text>
        <line x1={cx} y1={cy} x2={rx} y2={ry} stroke={color} strokeWidth="2.2" strokeLinecap="round" />
        <polygon
          points={`${rx},${ry} ${rnd(rx - 6 * Math.cos(rad) + 3 * Math.sin(rad))},${rnd(ry - 6 * Math.sin(rad) - 3 * Math.cos(rad))} ${rnd(rx - 6 * Math.cos(rad) - 3 * Math.sin(rad))},${rnd(ry - 6 * Math.sin(rad) + 3 * Math.cos(rad))}`}
          fill={color} />
        <text x={rnd(rx + 5 * Math.cos(rad))} y={rnd(ry + 5 * Math.sin(rad))} fontSize="8" fill={color} fontWeight="bold">B</text>
        <path d={`M ${ax} ${ay} A ${arcR} ${arcR} 0 0 ${sweep} ${ax2} ${ay2}`}
          fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        <text x={rnd(cx + 28 * Math.cos(rad / 2))} y={rnd(cy + 28 * Math.sin(rad / 2) + (direction === "acw" ? -4 : 8))}
          fontSize="8.5" fill="#f59e0b" fontWeight="bold" textAnchor="middle">{angleDeg}°</text>
        <text x={cx - 9} y={cy + 5} fontSize="8" fill="#64748b" fontWeight="bold">O</text>
        <text x="3" y={direction === "acw" ? 12 : 84} fontSize="6.5" fill={color} fontWeight="bold">
          {direction === "acw" ? "↺ Anti-cw" : "↻ Clock-wise"}
        </text>
      </svg>
      <span className="text-[11px] font-mono text-muted-foreground">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function C6MathsCh5Page7() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch5-page7";

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
      const isOpen = ["p75_step1_action", "p75_step2_action", "p75_step3_action"].includes(id);
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
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">5.3.1 The Protractor</h1>
              <p className="text-xs text-teal-100 font-normal">
                Class 6 Maths &bull; Chapter 5 &bull; Measures of Lines and Angles
              </p>
            </div>
          </div>
          <span className="text-xs bg-teal-950/80 text-teal-200 px-3 py-1 rounded-full border border-teal-400/30 font-mono self-start sm:self-auto font-bold">
            Page 75
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
          WHAT IS A PROTRACTOR
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-sky-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-sky-700 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">📏</span>
          <span>What is a Protractor?</span>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            The improvised &lsquo;Right angle tester&rsquo; we made is helpful to compare angles with a right angle.
            But it does not give a precise comparison. So in order to compare and measure angles more precisely
            we need an instrument, which is a <strong className="text-foreground">protractor</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Shape & Parts */}
            <div className="bg-sky-50 dark:bg-sky-950/20 rounded-xl border border-sky-200 dark:border-sky-800/40 p-4 space-y-3">
              <p className="text-xs font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wide">📐 Shape &amp; Parts</p>
              <ul className="space-y-2 text-sm text-foreground">
                {[
                  <>It is in the shape of a <strong>semicircle</strong>.</>,
                  <>The line drawn along the diameter is the <strong>base</strong>.</>,
                  <>A perpendicular to the base is marked as <strong>90°</strong>.</>,
                  <>The meeting point of the base and perpendicular line is the{" "}
                    <span className="inline-block bg-sky-200 dark:bg-sky-900 text-sky-800 dark:text-sky-200 px-1.5 rounded font-bold">centre</span>.</>,
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-sky-600 font-bold shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {/* Inline Q */}
              <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40 p-3 space-y-1.5">
                <label className="text-xs font-bold text-amber-800 dark:text-amber-300">
                  ❓ The meeting point of base &amp; perpendicular is called?
                </label>
                <Field id="p75_centre_name" placeholder="e.g. Centre" className="max-w-xs" />
              </div>
            </div>

            {/* The Scale */}
            <div className="bg-purple-50 dark:bg-purple-950/20 rounded-xl border border-purple-200 dark:border-purple-800/40 p-4 space-y-3">
              <p className="text-xs font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wide">🔢 The Scale</p>
              <ul className="space-y-2 text-sm text-foreground">
                {[
                  <>Along the arc, <strong>0° to 180°</strong> marked both clockwise &amp; anti-clockwise.</>,
                  <>Anti-clockwise angles: <strong>inner scale</strong>; clockwise: <strong>outer scale</strong>.</>,
                  <>180 equal parts — each division = <strong>1°</strong>.</>,
                  <>A base line joins both 0° ends through the centre.</>,
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-purple-600 font-bold shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40 p-2.5 space-y-1">
                  <label className="text-[11px] font-bold text-amber-800 dark:text-amber-300">❓ How many equal parts?</label>
                  <Field id="p75_scale_count" placeholder="e.g. 180" />
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40 p-2.5 space-y-1">
                  <label className="text-[11px] font-bold text-amber-800 dark:text-amber-300">❓ Each division =?</label>
                  <Field id="p75_each_division" placeholder="e.g. 1°" />
                </div>
              </div>
            </div>
          </div>

          {/* Scale range pills */}
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <div className="flex items-center gap-2 bg-teal-100 dark:bg-teal-900/30 rounded-xl px-4 py-2 border border-teal-200 dark:border-teal-800/50">
              <span className="text-xs font-bold text-teal-800 dark:text-teal-300">↺ Outer (anti-cw):</span>
              <span className="font-mono text-teal-700 dark:text-teal-400 font-bold text-sm">0° → 180°</span>
            </div>
            <div className="flex items-center gap-2 bg-rose-100 dark:bg-rose-900/30 rounded-xl px-4 py-2 border border-rose-200 dark:border-rose-800/50">
              <span className="text-xs font-bold text-rose-800 dark:text-rose-300">↻ Inner (cw):</span>
              <span className="font-mono text-rose-700 dark:text-rose-400 font-bold text-sm">0° → 180°</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          INTERACTIVE PROTRACTOR
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-emerald-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-emerald-700 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">🎮</span>
          <span>Interactive Protractor — Explore Angles</span>
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Drag the dot on the arm or move the slider to measure different angles.
            Toggle between <strong>clockwise</strong> and <strong>anti-clockwise</strong> to read both scales.
          </p>
          <InteractiveProtractor />
        </div>
      </div>

      {/* ══════════════════════════════════════
          HOW TO USE A PROTRACTOR — 3-column table
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-violet-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-violet-700 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">📋</span>
          <span>How to Measure an Angle with a Protractor</span>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          {/* Header row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-rose-100 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800/40 py-2 text-center text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wide">
              ↻ Clockwise Angle
            </div>
            <div className="rounded-xl bg-violet-100 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800/40 py-2 text-center text-xs font-bold text-violet-800 dark:text-violet-300 uppercase tracking-wide">
              Steps
            </div>
            <div className="rounded-xl bg-teal-100 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800/40 py-2 text-center text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wide">
              ↺ Anti-clockwise Angle
            </div>
          </div>

          {/* Step rows */}
          {[
            {
              step: 1, cwAngle: 55, acwAngle: 55,
              desc: (
                <span>
                  <strong>Identify</strong> the angle — whether it is{" "}
                  <span className="text-teal-700 dark:text-teal-400 font-bold">acute</span>,{" "}
                  <span className="text-amber-600 font-bold">obtuse</span> or{" "}
                  <span className="text-rose-600 font-bold">reflex</span>.
                </span>
              ),
            },
            {
              step: 2, cwAngle: 90, acwAngle: 90,
              desc: (
                <span>
                  Place the <strong>centre point</strong> of the protractor on the{" "}
                  <span className="bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-300 px-1 rounded font-bold">vertex</span>{" "}
                  of the angle (without shifting).
                </span>
              ),
            },
            {
              step: 3, cwAngle: 120, acwAngle: 120,
              desc: (
                <span>
                  Adjust so one <strong>arm lies along the base line</strong>.
                  Read the value where the other arm of the angle crosses the arc.
                </span>
              ),
            },
          ].map(({ step, cwAngle, acwAngle, desc }) => (
            <div key={step} className="grid grid-cols-3 gap-2 items-center border border-slate-200 dark:border-slate-700 rounded-xl p-3">
              <div className="flex justify-center">
                <SmallAngleSVG direction="cw" angleDeg={cwAngle} label={`∠ = ${cwAngle}°`} />
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-center">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-black mb-2">{step}</span>
                <div className="text-xs text-foreground leading-snug">{desc}</div>
              </div>
              <div className="flex justify-center">
                <SmallAngleSVG direction="acw" angleDeg={acwAngle} label={`∠ = ${acwAngle}°`} />
              </div>
            </div>
          ))}

          {/* Step answer fields */}
          <div className="mt-4 space-y-3 bg-amber-50/80 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40 p-4">
            <p className="text-sm font-bold text-amber-900 dark:text-amber-300 mb-2">📝 Describe each step in your own words:</p>
            {[
              { id: "p75_step1_action", label: "Step 1 — What do you identify first?" },
              { id: "p75_step2_action", label: "Step 2 — Where do you place the protractor centre?" },
              { id: "p75_step3_action", label: "Step 3 — How do you read the angle value?" },
            ].map(({ id, label }) => (
              <div key={id} className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">{label}</label>
                <Field id={id} placeholder="Write your answer here..." isOpen multiLine />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SCALE CHECK Q&A
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-amber-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-amber-600 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">❓</span>
          <span>Quick Check — The Two Scales</span>
        </div>
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            A protractor has <strong>two scales</strong>. Test yourself:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 bg-teal-50 dark:bg-teal-950/20 p-4 rounded-xl border border-teal-200 dark:border-teal-800/40">
              <label className="text-xs font-bold text-teal-800 dark:text-teal-300">
                ↺ The outer scale (anti-clockwise) goes from 0° to?
              </label>
              <Field id="p75_inner_range" placeholder="e.g. 180°" className="max-w-xs" />
            </div>
            <div className="space-y-2 bg-rose-50 dark:bg-rose-950/20 p-4 rounded-xl border border-rose-200 dark:border-rose-800/40">
              <label className="text-xs font-bold text-rose-800 dark:text-rose-300">
                ↻ The inner scale (clockwise) goes from 0° to?
              </label>
              <Field id="p75_outer_range" placeholder="e.g. 180°" className="max-w-xs" />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          KEY POINTS CARD
      ══════════════════════════════════════ */}
      <div className="rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-700 text-white p-6 shadow-lg">
        <p className="text-base font-black mb-4">💡 Key Points about the Protractor</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: "🔵", text: "Shape: Semicircle with base along the diameter" },
            { icon: "📍", text: "Centre: Meeting point of base and 90° perpendicular" },
            { icon: "🔢", text: "Divided into 180 equal parts → each = 1° (one degree)" },
            { icon: "↺", text: "Outer scale: anti-clockwise (0° → 180° from right side)" },
            { icon: "↻", text: "Inner scale: clockwise (0° → 180° from left side)" },
            { icon: "📏", text: "Base line joins both 0° points passing through the centre" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-start gap-2.5 bg-white/10 rounded-xl px-4 py-2.5">
              <span className="text-base shrink-0">{icon}</span>
              <span className="text-xs leading-snug font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
