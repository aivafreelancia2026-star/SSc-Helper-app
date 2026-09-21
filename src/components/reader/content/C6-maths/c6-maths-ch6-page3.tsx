"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs (Book Page 75 / PDF Page 83)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  // Think, Discuss and Write
  "p75_think_models",
  // Try These
  "p75_try_temp",
  // Section 6.4: Representation of Integers on a Number Line
  // Now answer the following using number line:
  "p75_nl_q1", // nearest positive integer to zero
  "p75_nl_q2", // how many negative numbers on left side of zero
  "p75_nl_q3", // which is greater (-2) or (-1)?
  "p75_nl_q4", // which is smaller -3 and -5? Why?
  "p75_nl_q5", // which integer is neither positive nor negative?
  // Do This: Draw a vertical line and represent: -5, 4, -7, -8, -2, 9, 5, -6, 2
  "p75_dothis_order",
  // Exercise 6.1:
  // 1. Represent the following statements using signs of integers:
  "p75_ex1_plane", // aeroplane flying at height of 3000 meters
  "p75_ex1_fish",  // fish is 10 meters below the water surface
  "p75_ex1_temp",  // temperature in Hyderabad is 35°C above 0°C
];

const CORRECT: Record<string, string[]> = {
  p75_think_models: [
    "temperature",
    "profit",
    "loss",
    "sea level",
    "elevation",
    "debt",
    "deposit",
    "withdrawal",
    "above",
    "below",
    "lift",
    "elevator",
    "floor",
    "score",
    "balance",
    "money",
  ],
  p75_try_temp: [
    "kashmir",
    "shimla",
    "delhi",
    "ladakh",
    "srinagar",
    "manali",
    "degree",
    "celsius",
    "negative",
    "minus",
    "-",
    "+",
    "0",
    "temp",
  ],
  p75_nl_q1: ["1", "+1", "one", "+ 1"],
  p75_nl_q2: [
    "infinite",
    "infinity",
    "infinitely many",
    "countless",
    "unlimited",
    "many",
    "endless",
    "cannot be counted",
    "all",
  ],
  p75_nl_q3: [
    "-1",
    "- 1",
    "minus 1",
    "negative 1",
    "-1 is greater",
    "(-1)",
  ],
  p75_nl_q4: [
    "-5",
    "- 5",
    "minus 5",
    "negative 5",
    "-5 is smaller",
    "-5 lies to the left of -3",
    "-5 is more to the left",
    "-5 because it is more to the left",
    "-5 < -3",
  ],
  p75_nl_q5: ["0", "zero"],
  p75_dothis_order: [
    "-8, -7, -6, -5, -2, 2, 4, 5, 9",
    "-8,-7,-6,-5,-2,2,4,5,9",
    "-8, -7, -6, -5, -2, 0, 2, 4, 5, 9",
    "9, 5, 4, 2, -2, -5, -6, -7, -8",
    "9,5,4,2,-2,-5,-6,-7,-8",
    "-8",
    "-8 -7 -6 -5 -2 2 4 5 9",
  ],
  p75_ex1_plane: [
    "+3000",
    "3000",
    "+3000m",
    "+3000 m",
    "+ 3000",
    "+3000 meters",
    "+3000meters",
    "3000m",
    "+3000metres",
  ],
  p75_ex1_fish: [
    "-10",
    "-10m",
    "-10 m",
    "- 10",
    "-10 meters",
    "-10meters",
    "minus 10",
    "negative 10",
    "-10metres",
  ],
  p75_ex1_temp: [
    "+35",
    "+35°c",
    "35",
    "+35 c",
    "35°c",
    "+35 degrees",
    "+ 35",
    "+35°",
    "+35c",
    "+35 degree",
  ],
};

const REVEAL_TEXT: Record<string, string> = {
  p75_think_models:
    "Elevators (above/below ground G), Bank balances (+credit, -debit), Temperatures (+above 0°C, -below 0°C).",
  p75_try_temp:
    "Drass: -20°C, Srinagar: -2°C, Shimla: +5°C, Delhi: +12°C, Hyderabad: +28°C.",
  p75_nl_q1: "1",
  p75_nl_q2: "Infinitely many",
  p75_nl_q3: "-1",
  p75_nl_q4: "-5 (lies to the left of -3 on number line)",
  p75_nl_q5: "0",
  p75_dothis_order: "-8, -7, -6, -5, -2, 2, 4, 5, 9",
  p75_ex1_plane: "+3000 m",
  p75_ex1_fish: "-10 m",
  p75_ex1_temp: "+35°C",
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
   SVG 1: Horizontal Number Line (-10 to +10)
───────────────────────────────────────────── */
function HorizontalNumberLineSVG() {
  return (
    <svg viewBox="0 0 760 120" className="w-full h-auto max-w-3xl drop-shadow-sm select-none">
      <defs>
        <marker id="axisArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
        </marker>
        <marker id="axisArrowLeft" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#e11d48" />
        </marker>
        <marker id="axisArrowRight" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#0d9488" />
        </marker>
      </defs>

      {/* Axis line */}
      <line x1="20" y1="75" x2="740" y2="75" stroke="#475569" strokeWidth="2.5" markerStart="url(#axisArrow)" markerEnd="url(#axisArrow)" />

      {/* Zero title & dotted pointer */}
      <text x="380" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0284c7">
        Zero
      </text>
      <line x1="380" y1="28" x2="380" y2="68" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Negative Left Arrow label */}
      <line x1="350" y1="42" x2="160" y2="42" stroke="#e11d48" strokeWidth="1.8" markerEnd="url(#axisArrowLeft)" />
      <text x="255" y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#e11d48">
        Negative numbers ( - )
      </text>

      {/* Positive Right Arrow label */}
      <line x1="410" y1="42" x2="600" y2="42" stroke="#0d9488" strokeWidth="1.8" markerEnd="url(#axisArrowRight)" />
      <text x="505" y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0d9488">
        Positive numbers ( + )
      </text>

      {/* Ticks: -10 to +10 */}
      {[-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
        const x = 380 + num * 33;
        const isZero = num === 0;
        return (
          <g key={num}>
            <line
              x1={x}
              y1="68"
              x2={x}
              y2="82"
              stroke={isZero ? "#0284c7" : "#475569"}
              strokeWidth={isZero ? "3" : "1.8"}
            />
            <text
              x={x}
              y="100"
              textAnchor="middle"
              fontSize={isZero ? "13" : "11"}
              fontWeight={isZero ? "bold" : "600"}
              fill={isZero ? "#0284c7" : num < 0 ? "#e11d48" : "#0d9488"}
            >
              {num}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SVG 2: Vertical Number Line (Do This)
───────────────────────────────────────────── */
function VerticalNumberLineSVG() {
  const points = [
    { val: 9, marked: true, color: "#0d9488" },
    { val: 8, marked: false },
    { val: 7, marked: false },
    { val: 6, marked: false },
    { val: 5, marked: true, color: "#0d9488" },
    { val: 4, marked: true, color: "#0d9488" },
    { val: 3, marked: false },
    { val: 2, marked: true, color: "#0d9488" },
    { val: 1, marked: false },
    { val: 0, marked: true, label: "0 (Zero)", color: "#0284c7" },
    { val: -1, marked: false },
    { val: -2, marked: true, color: "#e11d48" },
    { val: -3, marked: false },
    { val: -4, marked: false },
    { val: -5, marked: true, color: "#e11d48" },
    { val: -6, marked: true, color: "#e11d48" },
    { val: -7, marked: true, color: "#e11d48" },
    { val: -8, marked: true, color: "#e11d48" },
    { val: -9, marked: false },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
        Vertical Number Line Representation
      </span>
      <svg viewBox="0 0 240 440" className="h-96 w-auto">
        <defs>
          <marker id="vArrowTop" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 9 L 5 0 L 10 9 z" fill="#0d9488" />
          </marker>
          <marker id="vArrowBottom" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 5 10 L 10 1 z" fill="#e11d48" />
          </marker>
        </defs>

        {/* Vertical Axis */}
        <line x1="90" y1="30" x2="90" y2="410" stroke="#475569" strokeWidth="2.5" markerStart="url(#vArrowTop)" markerEnd="url(#vArrowBottom)" />

        <text x="90" y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0d9488">
          Positive (+) Top
        </text>
        <text x="90" y="428" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#e11d48">
          Negative (-) Bottom
        </text>

        {points.map((p, idx) => {
          const y = 40 + idx * 19;
          const isZero = p.val === 0;
          return (
            <g key={p.val}>
              <line
                x1="80"
                y1={y}
                x2="100"
                y2={y}
                stroke={isZero ? "#0284c7" : p.marked ? (p.color || "#475569") : "#94a3b8"}
                strokeWidth={isZero ? "3" : p.marked ? "2.5" : "1.2"}
              />
              <text
                x="68"
                y={y + 4}
                textAnchor="end"
                fontSize={isZero ? "13" : "11"}
                fontWeight={isZero || p.marked ? "bold" : "normal"}
                fill={isZero ? "#0284c7" : p.val < 0 ? "#e11d48" : "#0d9488"}
              >
                {p.val}
              </text>
              {p.marked && (
                <circle cx="90" cy={y} r="3.5" fill={p.color || "#0f172a"} />
              )}
              {p.marked && (
                <text
                  x="112"
                  y={y + 4}
                  fontSize="10"
                  fontWeight="bold"
                  fill={p.color || "#475569"}
                >
                  {p.val > 0 ? `+${p.val}` : p.val}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <span className="text-xs text-muted-foreground mt-2 font-medium">
        Integers plotted: -8, -7, -6, -5, -2, 2, 4, 5, 9
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function C6MathsCh6Page3() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch6-page3";

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
      <div className="rounded-2xl border-2 border-emerald-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-800 text-white font-heading font-bold px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-white/20 text-xl font-black px-4">6</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">Representation of Integers on a Number Line</h1>
              <p className="text-xs text-emerald-100 font-normal">
                Class 6 Maths &bull; Chapter 6 &bull; Integers
              </p>
            </div>
          </div>
          <span className="text-xs bg-emerald-950/80 text-emerald-200 px-3 py-1 rounded-full border border-emerald-400/30 font-mono self-start sm:self-auto font-bold">
            Page 83
          </span>
        </div>

        {/* Score & Action Bar */}
        <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border-b border-emerald-200 dark:border-emerald-800/60 p-4 px-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700/60 rounded-xl px-3.5 py-1.5">
              <span className="text-base">⭐</span>
              <span className="text-xs font-semibold text-muted-foreground">Total Points:</span>
              <span className="font-heading font-bold text-emerald-700 dark:text-emerald-300 text-sm">{score}</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700/60 rounded-xl px-3.5 py-1.5">
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
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-semibold text-xs transition-colors cursor-pointer active:scale-95 flex items-center gap-1.5"
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
        
        {/* Section 1: THINK, DISCUSS AND WRITE */}
        <div className="rounded-2xl border-2 border-teal-500/40 bg-teal-50/30 dark:bg-teal-950/20 p-6 space-y-4">
          <div className="flex items-center justify-between gap-2 border-b border-teal-200 dark:border-teal-800/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-teal-600 text-white text-xs font-bold uppercase rounded-md tracking-wider">
                Think, Discuss and Write
              </span>
            </div>
            <span className="text-xl">👥</span>
          </div>

          <p className="text-sm sm:text-base font-medium">
            Write some more models for positive and negative numbers in our daily life.
          </p>

          <Field
            id="p75_think_models"
            placeholder="e.g. Elevators (above/below ground floor), Bank deposits/withdrawals, Profit/Loss..."
            multiLine
            isOpen={true}
            {...fp}
          />

          {/* Definition Box */}
          <div className="bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 rounded-xl p-4 text-sm leading-relaxed space-y-2">
            <p>
              The numbers which are positive, zero and negative numbers together are called as <strong>&apos;Integers&apos;</strong> and they are denoted by the letter &apos;I&apos; (or &apos;Z&apos;).
            </p>
            <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-center font-mono text-base font-bold text-teal-800 dark:text-teal-300">
              {"Z = { ..., -3, -2, -1, 0, 1, 2, 3, ... }"}
            </div>
          </div>
        </div>

        {/* Section 2: TRY THESE */}
        <div className="rounded-2xl border-2 border-indigo-300 dark:border-indigo-800 bg-indigo-50/30 dark:bg-indigo-950/20 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold uppercase rounded-md tracking-wider">
              Try These
            </span>
          </div>

          <p className="text-sm sm:text-base font-medium">
            Collect information about temperatures recorded in various places in India in the month of January and write them using integers.
          </p>

          <Field
            id="p75_try_temp"
            placeholder="e.g. Drass: -20°C, Srinagar: -2°C, Shimla: +5°C, Delhi: +12°C..."
            multiLine
            isOpen={true}
            {...fp}
          />
        </div>

        {/* Section 6.4: REPRESENTATION OF INTEGERS ON A NUMBER LINE */}
        <div className="space-y-6">
          <div className="border-l-4 border-teal-500 pl-4 py-1">
            <h2 className="text-lg sm:text-xl font-bold text-teal-700 dark:text-teal-400">
              6.4 Representation of Integers on a Number Line
            </h2>
          </div>

          <p className="text-sm sm:text-base">
            Now, Rafi understood how his mother is representing integers on the number line.
          </p>

          {/* Number Line Diagram */}
          <div className="my-6 flex flex-col items-center bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <HorizontalNumberLineSVG />
          </div>

          <p className="text-sm sm:text-base">
            The numbers which are on the right side of zero are positive numbers (natural numbers) and which are on the left side of zero are negative numbers. <strong>Zero is neither positive nor negative.</strong> Do you agree? Why?
          </p>

          {/* Now answer the following using number line */}
          <div className="space-y-4 bg-muted/30 p-5 rounded-2xl border border-border">
            <h3 className="font-bold text-sm sm:text-base text-foreground">
              Now answer the following using number line:
            </h3>

            <div className="space-y-4">
              {/* Q1 */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="font-bold text-teal-700 dark:text-teal-400 w-6 shrink-0">1.</span>
                <p className="flex-1 text-sm font-medium">
                  Which is the nearest positive integer to zero?
                </p>
                <div className="w-full sm:w-40">
                  <Field id="p75_nl_q1" placeholder="e.g. 1" {...fp} />
                </div>
              </div>

              {/* Q2 */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="font-bold text-teal-700 dark:text-teal-400 w-6 shrink-0">2.</span>
                <p className="flex-1 text-sm font-medium">
                  How many negative numbers you will find on left side of zero?
                </p>
                <div className="w-full sm:w-56">
                  <Field id="p75_nl_q2" placeholder="e.g. Infinitely many" {...fp} />
                </div>
              </div>

              {/* Q3 */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="font-bold text-teal-700 dark:text-teal-400 w-6 shrink-0">3.</span>
                <p className="flex-1 text-sm font-medium">
                  Which is greater <strong>(-2)</strong> or <strong>(-1)</strong>?
                </p>
                <div className="w-full sm:w-40">
                  <Field id="p75_nl_q3" placeholder="e.g. -1" {...fp} />
                </div>
              </div>

              {/* Q4 */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="font-bold text-teal-700 dark:text-teal-400 w-6 shrink-0">4.</span>
                <p className="flex-1 text-sm font-medium">
                  Which is smaller among <strong>-3</strong> and <strong>-5</strong>? Why?
                </p>
                <div className="w-full sm:w-64">
                  <Field id="p75_nl_q4" placeholder="e.g. -5 (further to left)" {...fp} />
                </div>
              </div>

              {/* Q5 */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="font-bold text-teal-700 dark:text-teal-400 w-6 shrink-0">5.</span>
                <p className="flex-1 text-sm font-medium">
                  Which integer is neither positive nor negative?
                </p>
                <div className="w-full sm:w-40">
                  <Field id="p75_nl_q5" placeholder="e.g. 0" {...fp} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: DO THIS */}
        <div className="rounded-2xl border-2 border-amber-300 dark:border-amber-700/60 bg-amber-50/40 dark:bg-amber-950/15 p-6 space-y-5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold uppercase rounded-md tracking-wider">
              Do This
            </span>
          </div>

          <p className="text-sm sm:text-base font-medium">
            Draw a vertical line and represent the following integers on the number line:
            <br />
            <code className="font-mono font-bold text-amber-900 dark:text-amber-200 bg-amber-200/50 dark:bg-amber-900/50 px-2 py-0.5 rounded text-sm mt-1 inline-block">
              -5, 4, -7, -8, -2, 9, 5, -6, 2
            </code>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <VerticalNumberLineSVG />

            <div className="space-y-3 bg-white dark:bg-slate-900 p-5 rounded-xl border border-amber-200 dark:border-amber-900/50">
              <h4 className="font-bold text-sm text-foreground">
                Confirm your representation:
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Enter the numbers in ascending order from bottom (-8) to top (9) separated by commas:
              </p>
              <Field
                id="p75_dothis_order"
                placeholder="-8, -7, -6, -5, -2, 2, 4, 5, 9"
                {...fp}
              />
            </div>
          </div>
        </div>

        {/* Section: EXERCISE - 6.1 */}
        <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/20 p-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold uppercase rounded-md tracking-wider">
              Exercise - 6.1
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-sm sm:text-base font-semibold text-foreground">
              1. Represent the following statements using signs of integers:
            </p>

            {/* i */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-background rounded-xl border border-border">
              <div className="flex items-center gap-2">
                <span className="font-bold text-teal-700 dark:text-teal-400 w-6">i)</span>
                <span className="text-sm font-medium">An aeroplane is flying at a height of 3000 meters</span>
              </div>
              <div className="w-full sm:w-40">
                <Field id="p75_ex1_plane" placeholder="( +3000 m )" {...fp} />
              </div>
            </div>

            {/* ii */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-background rounded-xl border border-border">
              <div className="flex items-center gap-2">
                <span className="font-bold text-teal-700 dark:text-teal-400 w-6">ii)</span>
                <span className="text-sm font-medium">The fish is 10 meters below the water surface</span>
              </div>
              <div className="w-full sm:w-40">
                <Field id="p75_ex1_fish" placeholder="( -10 m )" {...fp} />
              </div>
            </div>

            {/* iii */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-background rounded-xl border border-border">
              <div className="flex items-center gap-2">
                <span className="font-bold text-teal-700 dark:text-teal-400 w-6">iii)</span>
                <span className="text-sm font-medium">The temperature in Hyderabad is 35°C above 0°C.</span>
              </div>
              <div className="w-full sm:w-40">
                <Field id="p75_ex1_temp" placeholder="( +35°C )" {...fp} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
