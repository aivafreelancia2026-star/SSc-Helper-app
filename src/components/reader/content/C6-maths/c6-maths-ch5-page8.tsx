"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs  (Book Page 76)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "p76_step4_reads",       // Where does the base line point?
  "p76_step5_aob",         // ∠AOB = ?
  "p76_zero_angle",        // Zero angle measure
  "p76_right_angle",       // Right angle measure
  "p76_straight_angle",    // Straight angle measure
  "p76_complete_angle",    // Complete angle measure
  "p76_acute_range",       // Acute angle range
  "p76_obtuse_range",      // Obtuse angle range
  "p76_reflex_range",      // Reflex angle range
  "p76_try1_which_greater", // Which angle is greater?
  "p76_try1_verify",       // Verify by measuring
  "p76_try2_i",            // Angle (i)
  "p76_try2_ii",           // Angle (ii)
  "p76_try2_iii",          // Angle (iii)
  "p76_try2_iv",           // Angle (iv)
  "p76_try2_v",            // Angle (v)
  "p76_try2_acute",        // Which are acute?
];

const CORRECT: Record<string, string[]> = {
  p76_step4_reads:       ["0", "0°", "zero"],
  p76_step5_aob:         ["50", "50°"],
  p76_zero_angle:        ["0", "0°"],
  p76_right_angle:       ["90", "90°"],
  p76_straight_angle:    ["180", "180°"],
  p76_complete_angle:    ["360", "360°"],
  p76_acute_range:       ["0and90", "0°and90°", "between0and90", "between0°and90°", "0to90", "0°to90°"],
  p76_obtuse_range:      ["90and180", "90°and180°", "between90and180", "between90°and180°", "90to180", "90°to180°"],
  p76_reflex_range:      ["180and360", "180°and360°", "between180and360", "between180°and360°", "180to360", "180°to360°"],
  p76_try1_which_greater:["b", "angleb", "∠b", "second"],
  p76_try1_verify:       ["b", "angleb", "greater", "bigger", "larger"],
  p76_try2_i:            ["40", "40°", "45", "45°"],
  p76_try2_ii:           ["30", "30°", "35", "35°"],
  p76_try2_iii:          ["90", "90°", "rightangle"],
  p76_try2_iv:           ["120", "120°", "125", "125°", "130", "130°"],
  p76_try2_v:            ["150", "150°", "155", "155°", "160", "160°"],
  p76_try2_acute:        ["i", "ii", "(i)", "(ii)", "iandii", "(i)and(ii)", "iii"],
};

const REVEAL_TEXT: Record<string, string> = {
  p76_step4_reads:       "0° — the base line must point to 0° on the scale",
  p76_step5_aob:         "50° — the other arm crosses the scale at 50°",
  p76_zero_angle:        "0°",
  p76_right_angle:       "90°",
  p76_straight_angle:    "180°",
  p76_complete_angle:    "360°",
  p76_acute_range:       "between 0° and 90°",
  p76_obtuse_range:      "between 90° and 180°",
  p76_reflex_range:      "between 180° and 360°",
  p76_try1_which_greater:"Angle (b) is greater — it opens wider than angle (a).",
  p76_try1_verify:       "Yes, angle (b) ≈ 100° is greater than angle (a) ≈ 40°.",
  p76_try2_i:            "≈ 40° (acute angle)",
  p76_try2_ii:           "≈ 30° (acute angle)",
  p76_try2_iii:          "90° (right angle)",
  p76_try2_iv:           "≈ 120° (obtuse angle)",
  p76_try2_v:            "≈ 150° (obtuse angle)",
  p76_try2_acute:        "(i) and (ii) are acute angles — they are between 0° and 90°.",
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
   Protractor measuring SVGs (Steps 4 & 5)
───────────────────────────────────────────── */
function ProtractorMeasureSVG({ angleDeg, label }: { angleDeg: number; label: string }) {
  const cx = 100, cy = 95, R = 72;
  const toRad = (d: number) => (d * Math.PI) / 180;

  /* ticks */
  const ticks: React.ReactNode[] = [];
  for (let a = 0; a <= 180; a += 5) {
    const inner = a % 10 === 0 ? R - 10 : R - 5;
    const rad = toRad(a);
    const ox = cx + R * Math.cos(Math.PI - rad);
    const oy = cy - R * Math.sin(rad);
    const ix = cx + inner * Math.cos(Math.PI - rad);
    const iy = cy - inner * Math.sin(rad);
    ticks.push(
      <line key={a} x1={ox} y1={oy} x2={ix} y2={iy}
        stroke="#6b7280" strokeWidth={a % 10 === 0 ? 1 : 0.5} />
    );
  }

  /* scale labels */
  const lbls: React.ReactNode[] = [];
  [0, 30, 60, 90, 120, 150, 180].forEach((a) => {
    const rad = toRad(a);
    const lx = cx + (R - 16) * Math.cos(Math.PI - rad);
    const ly = cy - (R - 16) * Math.sin(rad);
    lbls.push(
      <text key={a} x={lx} y={ly} textAnchor="middle" dominantBaseline="central"
        fontSize="5.5" fill="#1e3a5f" fontWeight="bold">{a}</text>
    );
  });

  /* measured angle arm */
  const armRad = toRad(angleDeg);
  const armX = cx + (R + 10) * Math.cos(Math.PI - armRad);
  const armY = cy - (R + 10) * Math.sin(armRad);

  /* angle arc */
  const arcR = 22;
  const arcSX = cx + arcR;
  const arcSY = cy;
  const arcEX = cx + arcR * Math.cos(Math.PI - armRad);
  const arcEY = cy - arcR * Math.sin(armRad);

  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 200 120" className="w-44 h-28 sm:w-52 sm:h-32">
        {/* Semi-circle */}
        <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy} Z`}
          fill="#e0f2fe" stroke="#0369a1" strokeWidth="1.2" opacity="0.8" />
        {ticks}
        {lbls}
        {/* Centre */}
        <circle cx={cx} cy={cy} r={2} fill="#0369a1" />
        {/* Base ray (right) */}
        <line x1={cx} y1={cy} x2={cx + R + 15} y2={cy} stroke="#374151" strokeWidth="1.8" />
        <polygon points={`${cx + R + 15},${cy} ${cx + R + 8},${cy - 2.5} ${cx + R + 8},${cy + 2.5}`} fill="#374151" />
        <text x={cx + R + 18} y={cy + 4} fontSize="6.5" fill="#374151" fontWeight="bold">A</text>
        {/* Measured arm */}
        <line x1={cx} y1={cy} x2={armX} y2={armY} stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
        <circle cx={armX} cy={armY} r={3} fill="#0d9488" />
        <text x={armX + (armRad > Math.PI / 2 ? -10 : 6)} y={armY - 5}
          fontSize="6.5" fill="#0d9488" fontWeight="bold">B</text>
        {/* Arc */}
        <path d={`M ${arcSX} ${arcSY} A ${arcR} ${arcR} 0 0 0 ${arcEX} ${arcEY}`}
          fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        {/* Degree label */}
        <text
          x={cx + (arcR + 12) * Math.cos(Math.PI - toRad(angleDeg / 2))}
          y={cy - (arcR + 12) * Math.sin(toRad(angleDeg / 2)) - 2}
          textAnchor="middle" fontSize="8" fill="#f59e0b" fontWeight="bold">
          {angleDeg}°
        </text>
        {/* O label */}
        <text x={cx - 4} y={cy + 10} fontSize="6" fill="#64748b" fontWeight="bold">O</text>
        {/* 0° pointer */}
        <text x={cx + R - 1} y={cy + 9} fontSize="5" fill="#0369a1" fontWeight="bold">0°</text>
      </svg>
      <span className="text-[11px] font-bold text-foreground">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Generic angle SVG for Try These exercises
───────────────────────────────────────────── */
function AngleSVG({
  angleDeg, label, showRight = false,
}: { angleDeg: number; label: string; showRight?: boolean }) {
  const cx = 50, cy = 60, rayLen = 40;
  const rnd = (n: number) => Math.round(n * 100) / 100;
  const rad = (-angleDeg * Math.PI) / 180;
  const bx = cx + rayLen;
  const rx = rnd(cx + rayLen * Math.cos(rad));
  const ry = rnd(cy + rayLen * Math.sin(rad));
  const arcR = 14;
  const ax = rnd(cx + arcR);
  const ay = cy;
  const ax2 = rnd(cx + arcR * Math.cos(rad));
  const ay2 = rnd(cy + arcR * Math.sin(rad));

  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 100 80" className="w-20 h-16 sm:w-24 sm:h-20">
        {/* Base ray */}
        <line x1={cx} y1={cy} x2={bx} y2={cy} stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        <polygon points={`${bx},${cy} ${bx - 5},${cy - 2.5} ${bx - 5},${cy + 2.5}`} fill="#475569" />
        {/* Other ray */}
        <line x1={cx} y1={cy} x2={rx} y2={ry} stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
        <polygon
          points={`${rx},${ry} ${rnd(rx - 5 * Math.cos(rad) + 2.5 * Math.sin(rad))},${rnd(ry - 5 * Math.sin(rad) - 2.5 * Math.cos(rad))} ${rnd(rx - 5 * Math.cos(rad) - 2.5 * Math.sin(rad))},${rnd(ry - 5 * Math.sin(rad) + 2.5 * Math.cos(rad))}`}
          fill="#0d9488" />
        {/* Arc */}
        <path d={`M ${ax} ${ay} A ${arcR} ${arcR} 0 0 0 ${ax2} ${ay2}`}
          fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
        {/* Right angle marker */}
        {showRight && (
          <rect x={cx + 4} y={cy - 11} width={7} height={7}
            fill="none" stroke="#7c3aed" strokeWidth="1.5" />
        )}
        {/* Origin dot */}
        <circle cx={cx} cy={cy} r={2} fill="#374151" />
      </svg>
      <span className="text-[11px] font-mono text-muted-foreground font-bold">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function C6MathsCh5Page8() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch5-page8";

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
      const isOpen = ["p76_try1_which_greater", "p76_try1_verify", "p76_try2_acute"].includes(id);
      const correct = isOpen ? rawTyped.trim().length >= 3 : validateAnswer(id, rawTyped);
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
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">5.3.1 Measuring Angles &amp; Types</h1>
              <p className="text-xs text-teal-100 font-normal">
                Class 6 Maths &bull; Chapter 5 &bull; Measures of Lines and Angles
              </p>
            </div>
          </div>
          <span className="text-xs bg-teal-950/80 text-teal-200 px-3 py-1 rounded-full border border-teal-400/30 font-mono self-start sm:self-auto font-bold">
            Page 76
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
          STEPS 4 & 5 — Reading the Protractor
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-sky-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-sky-700 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">📏</span>
          <span>Steps 4 &amp; 5 — Reading the Protractor</span>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Step 4 */}
            <div className="bg-sky-50 dark:bg-sky-950/20 rounded-xl border border-sky-200 dark:border-sky-800/40 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sky-600 text-white text-sm font-black">4</span>
                <p className="text-sm font-bold text-sky-800 dark:text-sky-300">Look at the Scale</p>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                Look at the scale where the <strong>base line points to 0°</strong>.
              </p>
              <div className="flex justify-center">
                <ProtractorMeasureSVG angleDeg={50} label="Base line → 0°" />
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40 p-3 space-y-1.5">
                <label className="text-xs font-bold text-amber-800 dark:text-amber-300">
                  ❓ Where does the base line point to?
                </label>
                <Field id="p76_step4_reads" placeholder="e.g. 0°" className="max-w-xs" />
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/40 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-600 text-white text-sm font-black">5</span>
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Read the Measure</p>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                Read the measure of the angle, where the <strong>other arm crosses the scale</strong>.
                Thus <strong className="font-mono text-emerald-700 dark:text-emerald-400">∠AOB = 50°</strong>.
              </p>
              <div className="flex justify-center">
                <ProtractorMeasureSVG angleDeg={50} label="∠AOB = 50°" />
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40 p-3 space-y-1.5">
                <label className="text-xs font-bold text-amber-800 dark:text-amber-300">
                  ❓ ∠AOB = ?
                </label>
                <Field id="p76_step5_aob" placeholder="e.g. 50°" className="max-w-xs" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          TYPES OF ANGLES TABLE
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-violet-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-violet-700 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">📊</span>
          <span>Types of Angles — Read the Following Table</span>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Visual table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border border-violet-300 dark:border-violet-700 bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-300 px-4 py-2.5 text-left font-bold">
                    Type of Angle
                  </th>
                  <th className="border border-violet-300 dark:border-violet-700 bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-300 px-4 py-2.5 text-left font-bold">
                    Measure
                  </th>
                  <th className="border border-violet-300 dark:border-violet-700 bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-300 px-4 py-2.5 text-center font-bold">
                    Visual
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "Zero angle", measure: "0°", deg: 0, color: "bg-slate-50 dark:bg-slate-800/30", emoji: "⬜" },
                  { type: "Right angle", measure: "90°", deg: 90, color: "bg-purple-50 dark:bg-purple-950/20", emoji: "📐", showRight: true },
                  { type: "Straight angle", measure: "180°", deg: 180, color: "bg-blue-50 dark:bg-blue-950/20", emoji: "↔️" },
                  { type: "Complete angle", measure: "360°", deg: 360, color: "bg-teal-50 dark:bg-teal-950/20", emoji: "🔄" },
                  { type: "Acute angle", measure: "between 0° and 90°", deg: 45, color: "bg-green-50 dark:bg-green-950/20", emoji: "📏" },
                  { type: "Obtuse angle", measure: "between 90° and 180°", deg: 130, color: "bg-amber-50 dark:bg-amber-950/20", emoji: "📐" },
                  { type: "Reflex angle", measure: "between 180° and 360°", deg: 250, color: "bg-rose-50 dark:bg-rose-950/20", emoji: "🔃" },
                ].map(({ type, measure, deg, color, emoji, showRight }) => (
                  <tr key={type} className={color}>
                    <td className="border border-violet-200 dark:border-violet-800/50 px-4 py-2.5 font-semibold text-foreground">
                      <span className="mr-1.5">{emoji}</span>{type}
                    </td>
                    <td className="border border-violet-200 dark:border-violet-800/50 px-4 py-2.5 font-mono font-bold text-violet-700 dark:text-violet-300">
                      {measure}
                    </td>
                    <td className="border border-violet-200 dark:border-violet-800/50 px-4 py-2.5">
                      <div className="flex justify-center">
                        {deg === 0 ? (
                          <svg viewBox="0 0 60 30" className="w-14 h-7">
                            <line x1="10" y1="20" x2="55" y2="20" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
                            <polygon points="55,20 48,17 48,23" fill="#475569" />
                            <circle cx="10" cy="20" r="2" fill="#374151" />
                            <text x="8" y="14" fontSize="6" fill="#64748b" fontWeight="bold">0°</text>
                          </svg>
                        ) : deg === 180 ? (
                          <svg viewBox="0 0 80 30" className="w-16 h-7">
                            <line x1="5" y1="18" x2="75" y2="18" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
                            <polygon points="5,18 12,15 12,21" fill="#0d9488" />
                            <polygon points="75,18 68,15 68,21" fill="#475569" />
                            <circle cx="40" cy="18" r="2" fill="#374151" />
                            <text x="36" y="12" fontSize="6" fill="#f59e0b" fontWeight="bold">180°</text>
                          </svg>
                        ) : deg === 360 ? (
                          <svg viewBox="0 0 50 50" className="w-12 h-12">
                            <circle cx="25" cy="25" r="16" fill="none" stroke="#0d9488" strokeWidth="2" />
                            <polygon points="41,25 36,22 36,28" fill="#0d9488" />
                            <circle cx="25" cy="25" r="2" fill="#374151" />
                            <text x="16" y="14" fontSize="6" fill="#f59e0b" fontWeight="bold">360°</text>
                          </svg>
                        ) : deg === 250 ? (
                          <svg viewBox="0 0 60 55" className="w-14 h-13">
                            <line x1="30" y1="30" x2="55" y2="30" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
                            <line x1="30" y1="30" x2="45" y2="18" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                            <path d="M 42 30 A 12 12 0 1 1 39.5 21" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
                            <circle cx="30" cy="30" r="2" fill="#374151" />
                            <text x="8" y="40" fontSize="6" fill="#f59e0b" fontWeight="bold">250°</text>
                          </svg>
                        ) : (
                          <AngleSVG angleDeg={deg} label="" showRight={showRight} />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fill-in fields for angle types */}
          <div className="bg-amber-50/80 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40 p-4 space-y-3">
            <p className="text-sm font-bold text-amber-900 dark:text-amber-300">📝 Fill in the measures:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: "p76_zero_angle", label: "Zero angle =", ph: "0°" },
                { id: "p76_right_angle", label: "Right angle =", ph: "90°" },
                { id: "p76_straight_angle", label: "Straight angle =", ph: "180°" },
                { id: "p76_complete_angle", label: "Complete angle =", ph: "360°" },
              ].map(({ id, label, ph }) => (
                <div key={id} className="space-y-1">
                  <label className="text-[11px] font-bold text-foreground">{label}</label>
                  <Field id={id} placeholder={ph} />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              {[
                { id: "p76_acute_range", label: "Acute angle: between ___ and ___", ph: "e.g. 0° and 90°" },
                { id: "p76_obtuse_range", label: "Obtuse angle: between ___ and ___", ph: "e.g. 90° and 180°" },
                { id: "p76_reflex_range", label: "Reflex angle: between ___ and ___", ph: "e.g. 180° and 360°" },
              ].map(({ id, label, ph }) => (
                <div key={id} className="space-y-1">
                  <label className="text-[11px] font-bold text-foreground">{label}</label>
                  <Field id={id} placeholder={ph} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          TRY THESE
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-teal-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-teal-700 to-emerald-600 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg text-lg">✏️</span>
          <span>Try These</span>
        </div>

        <div className="p-5 sm:p-6 space-y-8">
          {/* Q1 — Which angle is greater? */}
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-black shrink-0 mt-0.5">1</span>
              <div className="space-y-1">
                <p className="text-sm font-bold text-foreground">Which angle is greater? Discuss with your friends.</p>
                <p className="text-xs text-muted-foreground">Verify by measuring the angles using protractor. Is your estimation correct? Give reasons.</p>
              </div>
            </div>

            {/* Two angles side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800/40 p-4 flex flex-col items-center gap-2">
                <p className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wide">Angle (a)</p>
                <svg viewBox="0 0 120 80" className="w-28 h-20 sm:w-36 sm:h-24">
                  {/* Two rays forming ~40° angle */}
                  <line x1="20" y1="65" x2="105" y2="65" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
                  <polygon points="105,65 98,62 98,68" fill="#475569" />
                  <line x1="20" y1="65" x2="72" y2="18" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
                  <polygon points="72,18 64,22 70,27" fill="#0d9488" />
                  {/* Arc */}
                  <path d="M 38 65 A 18 18 0 0 0 33 50" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                  <text x="43" y="56" fontSize="8" fill="#f59e0b" fontWeight="bold">a</text>
                  <circle cx="20" cy="65" r="2.5" fill="#374151" />
                </svg>
                <span className="text-xs font-mono text-muted-foreground">≈ 40°</span>
              </div>

              <div className="bg-rose-50 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-800/40 p-4 flex flex-col items-center gap-2">
                <p className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wide">Angle (b)</p>
                <svg viewBox="0 0 120 80" className="w-28 h-20 sm:w-36 sm:h-24">
                  {/* Two rays forming ~100° angle */}
                  <line x1="55" y1="70" x2="112" y2="70" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
                  <polygon points="112,70 105,67 105,73" fill="#475569" />
                  <line x1="55" y1="70" x2="35" y2="15" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                  <polygon points="35,15 31,24 39,23" fill="#dc2626" />
                  {/* Arc */}
                  <path d="M 73 70 A 18 18 0 0 0 49 54" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                  <text x="68" y="58" fontSize="8" fill="#f59e0b" fontWeight="bold">b</text>
                  <circle cx="55" cy="70" r="2.5" fill="#374151" />
                </svg>
                <span className="text-xs font-mono text-muted-foreground">≈ 100°</span>
              </div>
            </div>

            {/* Answer fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40 p-3">
                <label className="text-xs font-bold text-amber-800 dark:text-amber-300">❓ Which angle is greater?</label>
                <Field id="p76_try1_which_greater" placeholder="e.g. Angle (b)" isOpen />
              </div>
              <div className="space-y-1.5 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40 p-3">
                <label className="text-xs font-bold text-amber-800 dark:text-amber-300">❓ Verify — Is your estimation correct?</label>
                <Field id="p76_try1_verify" placeholder="e.g. Yes, angle (b) is about 100° ..." isOpen multiLine />
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border/60" />

          {/* Q2 — Which are acute angles? */}
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-black shrink-0 mt-0.5">2</span>
              <div className="space-y-1">
                <p className="text-sm font-bold text-foreground">Which are acute angles? Find and write their measures.</p>
              </div>
            </div>

            {/* Five angle diagrams */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {[
                { id: "p76_try2_i", deg: 40, label: "(i)" },
                { id: "p76_try2_ii", deg: 30, label: "(ii)" },
                { id: "p76_try2_iii", deg: 90, label: "(iii)", showRight: true },
                { id: "p76_try2_iv", deg: 120, label: "(iv)" },
                { id: "p76_try2_v", deg: 150, label: "(v)" },
              ].map(({ id, deg, label, showRight }) => (
                <div key={id} className={`rounded-xl border p-3 flex flex-col items-center gap-2 ${
                  deg < 90
                    ? "border-green-200 dark:border-green-800/50 bg-green-50/60 dark:bg-green-950/20"
                    : deg === 90
                    ? "border-purple-200 dark:border-purple-800/50 bg-purple-50/60 dark:bg-purple-950/20"
                    : "border-amber-200 dark:border-amber-800/50 bg-amber-50/60 dark:bg-amber-950/20"
                }`}>
                  <AngleSVG angleDeg={deg} label={label} showRight={showRight} />
                  <Field id={id} placeholder="≈ ?°" className="max-w-[80px]" />
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    deg < 90
                      ? "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300"
                      : deg === 90
                      ? "bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300"
                      : "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300"
                  }`}>
                    {deg < 90 ? "Acute" : deg === 90 ? "Right" : "Obtuse"}
                  </span>
                </div>
              ))}
            </div>

            {/* Which are acute? */}
            <div className="bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200 dark:border-green-800/40 p-4 space-y-2">
              <label className="text-xs font-bold text-green-800 dark:text-green-300">
                ❓ Which of these are acute angles? List them:
              </label>
              <Field id="p76_try2_acute" placeholder="e.g. (i) and (ii)" isOpen />
              <p className="text-[11px] text-muted-foreground italic">
                Hint: Acute angles are between 0° and 90°.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          KEY POINTS CARD
      ══════════════════════════════════════ */}
      <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 text-white p-6 shadow-lg">
        <p className="text-base font-black mb-4">💡 Quick Reference — Types of Angles</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { type: "Zero", val: "0°", bg: "bg-white/10" },
            { type: "Acute", val: "0° < θ < 90°", bg: "bg-green-500/20" },
            { type: "Right", val: "90°", bg: "bg-purple-500/20" },
            { type: "Obtuse", val: "90° < θ < 180°", bg: "bg-amber-500/20" },
            { type: "Straight", val: "180°", bg: "bg-blue-500/20" },
            { type: "Reflex", val: "180° < θ < 360°", bg: "bg-rose-500/20" },
            { type: "Complete", val: "360°", bg: "bg-teal-500/20" },
          ].map(({ type, val, bg }) => (
            <div key={type} className={`${bg} rounded-xl px-3 py-2.5 text-center`}>
              <p className="text-[11px] font-semibold opacity-80">{type}</p>
              <p className="text-sm font-black font-mono">{val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
