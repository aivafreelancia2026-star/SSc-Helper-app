"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs  (Book Page 73)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "p73_clock_acute",
  "p73_clock_obtuse",
  "p73_try_fig_i",
  "p73_try_fig_ii",
  "p73_try_fig_iii",
  "p73_try_fig_iv",
  "p73_daily_situations",
  "p73_draw_angles",
];

/* ─────────────────────────────────────────────
   Correct answers & reveal text
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  p73_clock_acute:  ["ii", "2", "(ii)", "clock2", "secondclock", "second"],
  p73_clock_obtuse: ["iii", "3", "(iii)", "clock3", "thirdclock", "third"],
  p73_try_fig_i:    ["acute", "acuteangle"],
  p73_try_fig_ii:   ["right", "rightangle", "90"],
  p73_try_fig_iii:  ["obtuse", "obtuseangle"],
  p73_try_fig_iv:   ["acute", "acuteangle"],
};

const REVEAL_TEXT: Record<string, string> = {
  p73_clock_acute:       "Clock (ii) — hands form an acute angle",
  p73_clock_obtuse:      "Clock (iii) — hands form an obtuse angle",
  p73_try_fig_i:         "Acute angle",
  p73_try_fig_ii:        "Right angle (90°)",
  p73_try_fig_iii:       "Obtuse angle",
  p73_try_fig_iv:        "Acute angle",
  p73_daily_situations:  "e.g. Open scissors, open book, clock hands, tree branch fork, open door hinge",
  p73_draw_angles:       "Draw acute, right, and obtuse angles in your notebook and test each with the tester.",
};

const normalize = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

function validateAnswer(id: string, raw: string): boolean {
  const v = normalize(raw);
  if (!v) return false;
  const accepted = CORRECT[id];
  if (!accepted) return v.length >= 4; // open-ended
  return accepted.some((a) => normalize(a) === v || v.includes(normalize(a)));
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
   Clock SVG
───────────────────────────────────────────── */
function ClockFace({
  hourAngleDeg,
  minuteAngleDeg,
  label,
  highlight = false,
}: {
  hourAngleDeg: number;
  minuteAngleDeg: number;
  label: string;
  highlight?: boolean;
}) {
  const cx = 50, cy = 50, r = 42;
  const toRad = (d: number) => (d - 90) * (Math.PI / 180);
  const rnd = (n: number) => Math.round(n * 1000) / 1000;
  const hourLen = 25, minuteLen = 35;

  const hx = rnd(cx + hourLen * Math.cos(toRad(hourAngleDeg)));
  const hy = rnd(cy + hourLen * Math.sin(toRad(hourAngleDeg)));
  const mx = rnd(cx + minuteLen * Math.cos(toRad(minuteAngleDeg)));
  const my = rnd(cy + minuteLen * Math.sin(toRad(minuteAngleDeg)));

  const arcR = 14;
  const ax1 = rnd(cx + arcR * Math.cos(toRad(minuteAngleDeg)));
  const ay1 = rnd(cy + arcR * Math.sin(toRad(minuteAngleDeg)));
  const ax2 = rnd(cx + arcR * Math.cos(toRad(hourAngleDeg)));
  const ay2 = rnd(cy + arcR * Math.sin(toRad(hourAngleDeg)));

  let angleDiff = hourAngleDeg - minuteAngleDeg;
  if (angleDiff < 0) angleDiff += 360;
  const largeArc = angleDiff > 180 ? 1 : 0;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 100 100" className="w-28 h-28 sm:w-32 sm:h-32 drop-shadow-sm">
        <circle cx={cx} cy={cy} r={r} fill="white" stroke={highlight ? "#0d9488" : "#94a3b8"} strokeWidth="2.5" />
        {Array.from({ length: 12 }, (_, i) => {
          const ang = (i * 30 - 90) * (Math.PI / 180);
          return (
            <line
              key={i}
              x1={rnd(cx + (r - 5) * Math.cos(ang))} y1={rnd(cy + (r - 5) * Math.sin(ang))}
              x2={rnd(cx + (r - 1) * Math.cos(ang))} y2={rnd(cy + (r - 1) * Math.sin(ang))}
              stroke="#94a3b8" strokeWidth="1.5"
            />
          );
        })}
        <text x="50" y="13" textAnchor="middle" fontSize="7" fill="#475569" fontWeight="bold">12</text>
        {/* Angle arc */}
        <path
          d={`M ${ax1} ${ay1} A ${arcR} ${arcR} 0 ${largeArc} 1 ${ax2} ${ay2}`}
          fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"
        />
        <line x1={cx} y1={cy} x2={mx} y2={my} stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={hx} y2={hy} stroke="#334155" strokeWidth="3" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="2.5" fill="#0f766e" />
      </svg>
      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Angle Figure SVGs for Try These
───────────────────────────────────────────── */
function AngleFigure({ type, label }: { type: "acute1" | "right" | "obtuse" | "acute2"; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm">
        {type === "acute1" && (
          <svg viewBox="0 0 100 90" className="w-full h-full p-2">
            <line x1="20" y1="75" x2="85" y2="75" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="20" y1="75" x2="50" y2="15" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round"/>
            <polygon points="85,75 77,71 77,79" fill="#0d9488"/>
            <polygon points="50,15 45,26 55,26" fill="#0d9488"/>
            <path d="M 38 75 A 18 18 0 0 0 28 59" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
        {type === "right" && (
          <svg viewBox="0 0 100 90" className="w-full h-full p-2">
            <line x1="20" y1="72" x2="85" y2="72" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="20" y1="72" x2="20" y2="15" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round"/>
            <polygon points="85,72 77,68 77,76" fill="#7c3aed"/>
            <polygon points="20,15 15,26 25,26" fill="#7c3aed"/>
            <rect x="20" y="60" width="12" height="12" fill="none" stroke="#7c3aed" strokeWidth="2"/>
          </svg>
        )}
        {type === "obtuse" && (
          <svg viewBox="0 0 100 90" className="w-full h-full p-2">
            <line x1="10" y1="68" x2="90" y2="68" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="10" y1="68" x2="45" y2="18" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
            <polygon points="90,68 82,64 82,72" fill="#dc2626"/>
            <polygon points="45,18 39,30 49,30" fill="#dc2626"/>
            <path d="M 35 68 A 25 25 0 0 0 18 50" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
        {type === "acute2" && (
          <svg viewBox="0 0 100 90" className="w-full h-full p-2">
            <line x1="15" y1="78" x2="50" y2="18" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="85" y1="78" x2="50" y2="18" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round"/>
            <polygon points="15,78 22,70 19,80" fill="#0d9488"/>
            <polygon points="85,78 78,70 81,80" fill="#0d9488"/>
            <path d="M 42 35 A 12 12 0 0 1 58 35" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </div>
      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function C6MathsCh5Page5() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch5-page5";

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
    const saved:  Record<string, string> = {};
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
      const isOpen = id === "p73_daily_situations" || id === "p73_draw_angles";
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
    setFeedback({
      correct: delta >= 0,
      label: delta >= 0 ? `Scored! +${delta} pts` : `Reviewed!`,
      id: Date.now(),
    });
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

    setFeedback({
      correct,
      label: correct ? "Correct! +1 pt" : "Try Again! -1 pt",
      id: Date.now(),
    });
    const next = { ...graded, [id]: { value: rawTyped, correct } };
    setGraded(next);
    localStorage.setItem(`${storageKey}-${id}-graded`, JSON.stringify({ value: rawTyped, correct }));
  };

  function Field({
    id,
    placeholder,
    isOpen = false,
    className = "",
    multiLine = false,
  }: {
    id: string;
    placeholder: string;
    isOpen?: boolean;
    className?: string;
    multiLine?: boolean;
  }) {
    const displayVal = isRevealed ? (REVEAL_TEXT[id] ?? "") : (answers[id] ?? "");
    const baseCls = `w-full rounded-xl border px-3 py-2 text-xs sm:text-sm font-mono outline-none transition-all shadow-sm resize-none ${borderCls(id, answers, graded, isRevealed)}`;
    if (multiLine) {
      return (
        <div className={`relative w-full ${className}`}>
          <textarea
            id={`field-${id}`}
            rows={3}
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
        {/* Banner */}
        <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-800 text-white font-heading font-bold px-5 py-4 text-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-white/20 text-xl">📐</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">5.3 Measuring Angles</h1>
              <p className="text-xs text-teal-100 font-normal">
                Class 6 Maths &bull; Chapter 5 &bull; Clock Activity + Right Angle Tester
              </p>
            </div>
          </div>
          <span className="text-xs bg-teal-950/80 text-teal-200 px-3 py-1 rounded-full border border-teal-400/30 font-mono self-start sm:self-auto font-bold">
            Page 73
          </span>
        </div>

        {/* Scoring & Action Controls */}
        <div className="bg-teal-50/80 dark:bg-teal-950/30 border-b border-teal-200 dark:border-teal-800/60 p-4 px-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-700/60 rounded-xl px-3.5 py-1.5 shadow-xs">
              <span className="text-base">⭐</span>
              <span className="text-xs font-semibold text-muted-foreground">Total Points:</span>
              <span className="font-heading font-bold text-teal-700 dark:text-teal-300 text-sm">{score}</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-700/60 rounded-xl px-3.5 py-1.5 shadow-xs">
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
              className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-heading font-semibold text-xs transition-colors shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
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
                  : "bg-white dark:bg-slate-800 text-foreground border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <span>{isRevealed ? "🙈" : "👁️"}</span>
              <span>{isRevealed ? "Hide Key" : "Reveal Answers"}</span>
            </button>
            <button
              type="button"
              onClick={handleResetPage}
              className="px-3 py-1.5 rounded-xl border border-red-300 dark:border-red-800/60 bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-heading font-semibold transition-colors cursor-pointer"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          CLOCK ANGLE ACTIVITY
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-teal-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-teal-700 text-white font-heading font-bold px-5 py-3 text-base flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-white/20 rounded-lg">🕐</span>
            <span>Clock Angles Activity</span>
          </div>
          <span className="text-xs bg-teal-800/80 px-2.5 py-1 rounded-full border border-teal-500/30">
            Book Page 73
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            If we take the angle between the hands to be zero at <strong className="text-foreground">12 o&apos;clock</strong>,
            these angles would be measured using the small i.e.{" "}
            <em>hour</em> hand as a base, and we will measure the{" "}
            <strong className="text-foreground">clockwise movement</strong> of the minutes hand away from the hour&apos;s hand.
          </p>

          {/* Three clock faces */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 py-2">
            {/* Clock (i): 12:00 — hands overlap, zero angle */}
            <ClockFace hourAngleDeg={0}   minuteAngleDeg={0}   label="(i) 12:00" />
            {/* Clock (ii): ~10:10 — hour ≈300°, minute ≈60° → ~60° acute */}
            <ClockFace hourAngleDeg={300} minuteAngleDeg={60}  label="(ii) ~10:10" highlight />
            {/* Clock (iii): 3:00 — hour at 90°, minute at 0° → 90°+ obtuse-like reading */}
            <ClockFace hourAngleDeg={90}  minuteAngleDeg={0}   label="(iii) ~3:00" highlight />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-6 h-0.5 bg-amber-400 rounded"></span>
              angle arc (amber)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-5 h-[2px] bg-slate-800 dark:bg-slate-200 rounded"></span>
              minute hand
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-5 h-[3px] bg-slate-600 dark:bg-slate-400 rounded"></span>
              hour hand
            </span>
          </div>

          {/* Questions */}
          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40 p-4 space-y-4">
            <p className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide">
              📋 Answer:
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="text-sm font-medium text-foreground sm:min-w-[300px]">
                <span className="font-bold text-teal-700 dark:text-teal-400">1.</span>{" "}
                Which clock&apos;s hands are showing an <strong>acute angle</strong>?
              </label>
              <Field id="p73_clock_acute"  placeholder="Clock (i), (ii), or (iii)" className="sm:max-w-[200px]" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="text-sm font-medium text-foreground sm:min-w-[300px]">
                <span className="font-bold text-teal-700 dark:text-teal-400">2.</span>{" "}
                In which figure do the clock&apos;s hands form an <strong>obtuse angle</strong>?
              </label>
              <Field id="p73_clock_obtuse" placeholder="Clock (i), (ii), or (iii)" className="sm:max-w-[200px]" />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          ACTIVITY — Right Angle Tester
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-emerald-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-emerald-700 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">🔬</span>
          <span>Activity — The Right Angle Tester</span>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Take two straws.</strong> Keep one end of one straw over the other
            straw end and fix a pin at that point as{" "}
            <strong className="text-emerald-700 dark:text-emerald-400">&apos;L&apos; shape</strong>.
            Here you find a <strong className="text-emerald-700 dark:text-emerald-400">right angle tester</strong>.
          </p>

          {/* 3-panel activity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Panel 1 — Make the tester */}
            <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/60 dark:bg-emerald-950/20 p-4 flex flex-col items-center gap-3">
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 text-center">Fig. 5.6 — Make the tester</p>
              <svg viewBox="0 0 120 120" className="w-28 h-28">
                {/* Horizontal straw */}
                <rect x="10" y="60" width="80" height="9" rx="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1.2"/>
                {/* Vertical straw */}
                <rect x="13" y="8" width="9" height="58" rx="4" fill="#34d399" stroke="#059669" strokeWidth="1.2"/>
                {/* Pin */}
                <circle cx="17" cy="64" r="5.5" fill="#ef4444" stroke="white" strokeWidth="1.5"/>
                {/* Right-angle square at junction */}
                <rect x="22" y="51" width="11" height="11" fill="none" stroke="#7c3aed" strokeWidth="1.8"/>
                <text x="60" y="100" textAnchor="middle" fontSize="9" fill="#059669" fontWeight="bold">L — shape</text>
                <text x="60" y="112" textAnchor="middle" fontSize="7.5" fill="#6b7280">(Right angle tester)</text>
              </svg>
              <p className="text-xs text-center text-muted-foreground">
                Pin two straws at a corner to form a perfect <strong>90° right angle</strong>.
              </p>
            </div>

            {/* Panel 2 — Acute test */}
            <div className="rounded-xl border border-teal-200 dark:border-teal-800/50 bg-teal-50/60 dark:bg-teal-950/20 p-4 flex flex-col items-center gap-3">
              <p className="text-xs font-bold text-teal-800 dark:text-teal-300 text-center">Fig. 5.7 — ∠AOB is Acute</p>
              <svg viewBox="0 0 120 120" className="w-28 h-28">
                {/* Tester (ghost) */}
                <rect x="8" y="79" width="55" height="7" rx="3" fill="#fbbf24" opacity="0.4" stroke="#d97706" strokeWidth="1"/>
                <rect x="11" y="40" width="7" height="45" rx="3" fill="#34d399" opacity="0.4" stroke="#059669" strokeWidth="1"/>
                <rect x="18" y="69" width="9" height="9" fill="none" stroke="#7c3aed" strokeWidth="1.2" opacity="0.5"/>
                {/* Actual angle — acute */}
                <line x1="18" y1="92" x2="105" y2="92" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="18" y1="92" x2="52" y2="38" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round"/>
                <polygon points="105,92 97,88 97,96" fill="#1e293b"/>
                <polygon points="52,38 46,50 56,50" fill="#1e293b"/>
                {/* Arc */}
                <path d="M 37 92 A 19 19 0 0 0 26 75" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
                <text x="15" y="115" fontSize="8" fill="#0f766e" fontWeight="bold">∠AOB &lt; right angle</text>
                <text x="22" y="108" fontSize="7" fill="#0f766e">→ Acute angle</text>
              </svg>
              <p className="text-xs text-center text-muted-foreground">
                Keep tester on ray <strong>OA</strong> — ∠AOB is{" "}
                <strong className="text-teal-700 dark:text-teal-400">less than</strong> right angle → <strong>Acute</strong>
              </p>
            </div>

            {/* Panel 3 — Obtuse test */}
            <div className="rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50/60 dark:bg-red-950/20 p-4 flex flex-col items-center gap-3">
              <p className="text-xs font-bold text-red-800 dark:text-red-300 text-center">Fig. 5.8 — ∠COD is Obtuse</p>
              <svg viewBox="0 0 120 120" className="w-28 h-28">
                {/* Tester (ghost) */}
                <rect x="8" y="79" width="55" height="7" rx="3" fill="#fbbf24" opacity="0.4" stroke="#d97706" strokeWidth="1"/>
                <rect x="11" y="40" width="7" height="45" rx="3" fill="#34d399" opacity="0.4" stroke="#059669" strokeWidth="1"/>
                <rect x="18" y="69" width="9" height="9" fill="none" stroke="#7c3aed" strokeWidth="1.2" opacity="0.5"/>
                {/* Actual angle — obtuse */}
                <line x1="8"  y1="88" x2="112" y2="88" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="8"  y1="88" x2="32"  y2="32" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round"/>
                <polygon points="112,88 104,84 104,92" fill="#1e293b"/>
                <polygon points="32,32 26,44 36,44"   fill="#1e293b"/>
                {/* Arc — wider */}
                <path d="M 42 88 A 34 34 0 0 0 17 67" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
                <text x="15" y="115" fontSize="8" fill="#dc2626" fontWeight="bold">∠COD &gt; right angle</text>
                <text x="22" y="108" fontSize="7" fill="#dc2626">→ Obtuse angle</text>
              </svg>
              <p className="text-xs text-center text-muted-foreground">
                Keep tester on ray <strong>OC</strong> — ∠COD is{" "}
                <strong className="text-red-700 dark:text-red-400">more than</strong> right angle → <strong>Obtuse</strong>
              </p>
            </div>
          </div>

          {/* Summary pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: "∠ < 90°", desc: "Acute angle", bg: "bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300" },
              { label: "∠ = 90°", desc: "Right angle", bg: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300" },
              { label: "∠ > 90°", desc: "Obtuse angle", bg: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" },
            ].map(({ label, desc, bg }) => (
              <div key={label} className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold ${bg}`}>
                <span className="font-mono">{label}</span>
                <span>→ {desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          TRY THESE
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-violet-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-violet-700 text-white font-heading font-bold px-5 py-3 text-base flex items-center gap-3">
          <span className="p-1.5 bg-white/20 rounded-lg">✏️</span>
          <span>Try These</span>
        </div>

        <div className="p-5 sm:p-6 space-y-8">

          {/* Q1 — Identify angles */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-foreground flex items-start gap-2">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs shrink-0">1</span>
              Use the &apos;right angle tester made of straws&apos; and identify the following angles.
              Type <strong>acute</strong>, <strong>right</strong>, or <strong>obtuse</strong>:
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(
                [
                  { id: "p73_try_fig_i",   type: "acute1", label: "(i)"  },
                  { id: "p73_try_fig_ii",  type: "right",  label: "(ii)" },
                  { id: "p73_try_fig_iii", type: "obtuse", label: "(iii)"},
                  { id: "p73_try_fig_iv",  type: "acute2", label: "(iv)" },
                ] as const
              ).map(({ id, type, label }) => (
                <div key={id} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-background/60 shadow-sm">
                  <AngleFigure type={type} label={label} />
                  <Field id={id} placeholder="acute / right / obtuse" className="w-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-border/60" />

          {/* Q2 — Daily situations */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-foreground flex items-start gap-2">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs shrink-0">2</span>
              List out five daily life situations where you observe <strong>acute angles</strong> and <strong>obtuse angles</strong>.
            </h4>
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800/40 p-4 space-y-2">
              <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">
                💡 Think of objects: scissors, clock hands, open books, roof shape, open door hinge…
              </p>
              <Field
                id="p73_daily_situations"
                placeholder="e.g. Scissors blades (acute), open book (obtuse), clock at 10:10 (acute)..."
                isOpen multiLine
              />
            </div>
          </div>

          <div className="w-full h-px bg-border/60" />

          {/* Q3 — Draw angles */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-foreground flex items-start gap-2">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs shrink-0">3</span>
              Draw some angles of your choice. Test them by the &apos;angle tester&apos; and write which are{" "}
              <strong>acute</strong>, which are <strong>obtuse</strong>, and which are <strong>right angles</strong>.
            </h4>

            {/* Visual hint */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Acute  (< 90°)", stroke: "#0d9488", bg: "bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800/40",
                  el: <svg viewBox="0 0 80 70" className="w-full h-full"><line x1="10" y1="60" x2="70" y2="60" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round"/><line x1="10" y1="60" x2="35" y2="15" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round"/><polygon points="70,60 62,56 62,64" fill="#0d9488"/><polygon points="35,15 29,26 39,26" fill="#0d9488"/><path d="M 28 60 A 18 18 0 0 0 20 47" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round"/></svg> },
                { label: "Right  (= 90°)", stroke: "#7c3aed", bg: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/40",
                  el: <svg viewBox="0 0 80 70" className="w-full h-full"><line x1="10" y1="60" x2="70" y2="60" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round"/><line x1="10" y1="60" x2="10" y2="12" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round"/><polygon points="70,60 62,56 62,64" fill="#7c3aed"/><polygon points="10,12 5,23 15,23" fill="#7c3aed"/><rect x="10" y="50" width="10" height="10" fill="none" stroke="#7c3aed" strokeWidth="1.8"/></svg> },
                { label: "Obtuse (> 90°)", stroke: "#dc2626", bg: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/40",
                  el: <svg viewBox="0 0 80 70" className="w-full h-full"><line x1="5" y1="60" x2="75" y2="60" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/><line x1="5" y1="60" x2="30" y2="18" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/><polygon points="75,60 67,56 67,64" fill="#dc2626"/><polygon points="30,18 24,30 34,30" fill="#dc2626"/><path d="M 30 60 A 25 25 0 0 0 12 46" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round"/></svg> },
              ].map(({ label, bg, el }) => (
                <div key={label} className={`rounded-xl border p-3 flex flex-col items-center gap-2 ${bg}`}>
                  <div className="w-14 h-14 sm:w-16 sm:h-16">{el}</div>
                  <span className="text-[10px] sm:text-xs font-bold text-center text-foreground">{label}</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <p className="text-xs text-muted-foreground mb-2 font-medium">
                📝 Draw in your notebook, then write your observations here:
              </p>
              <Field
                id="p73_draw_angles"
                placeholder="e.g. Fig. A — acute angle, Fig. B — right angle, Fig. C — obtuse angle..."
                isOpen multiLine
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
