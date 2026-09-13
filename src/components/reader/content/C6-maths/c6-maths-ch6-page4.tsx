"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs (Book Page 76 / PDF Page 84)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  // Exercise 6.1 (cont.) - Question 1 items (iv) to (vii)
  "p76_ex1_everest",   // Mount Everest: 36°C below zero-degree
  "p76_ex1_submarine", // Submarine: 500 meters below surface of the sea
  "p76_ex1_darjeeling",// Darjeeling: 19°C below zero-degree
  "p76_ex1_vizag",     // Visakhapatnam: 18°C
  // Question 2: Write any five negative integers
  "p76_ex2_neg_integers",
  // Question 3: Write any five positive integers
  "p76_ex3_pos_integers",
  // Question 4: Mark the integers on the number line: -4, 3, 2, 0, -1, 5
  "p76_ex4_marked",
  // Question 5: True or False
  "p76_ex5_i",   // -7 is on the right side of -6 on the number line
  "p76_ex5_ii",  // Zero is a positive number
  "p76_ex5_iii", // 9 is on the right side of zero on the number line
  "p76_ex5_iv",  // -1 is an integer which lies between -2 and 0
  // Section 6.5: Ordering of Integers
  // 1. What happens when water is poured into the jar?
  "p76_order_q1",
  // 2. What happens when water is removed from the jar from the zero level?
  "p76_order_q2",
];

const CORRECT: Record<string, string[]> = {
  p76_ex1_everest: ["-36", "-36°c", "- 36", "-36 c", "-36 degrees", "-36°", "-36c"],
  p76_ex1_submarine: ["-500", "-500m", "- 500", "-500 m", "-500 meters", "minus 500"],
  p76_ex1_darjeeling: ["-19", "-19°c", "- 19", "-19 c", "-19 degrees", "-19°", "-19c"],
  p76_ex1_vizag: ["+18", "18", "+18°c", "18°c", "+18 c", "18 c", "+18 degrees", "18 degrees", "+18°", "+18c"],
  p76_ex2_neg_integers: ["-", "negative", "minus", "-1", "-2", "-3", "-4", "-5"],
  p76_ex3_pos_integers: ["1", "2", "3", "4", "5", "+1", "+2", "+3", "+4", "+5"],
  p76_ex4_marked: ["-4, -1, 0, 2, 3, 5", "-4,-1,0,2,3,5", "-4 -1 0 2 3 5", "-4", "5"],
  p76_ex5_i: ["false", "f", "false (-7 is on the left side of -6)", "left"],
  p76_ex5_ii: ["false", "f", "false (zero is neither positive nor negative)", "neither"],
  p76_ex5_iii: ["true", "t", "true (positive numbers are on the right)"],
  p76_ex5_iv: ["true", "t", "true (-1 lies between -2 and 0)"],
  p76_order_q1: ["rise", "rises", "increases", "goes up", "positive", "level rises", "water level rises", "up"],
  p76_order_q2: ["fall", "falls", "decreases", "goes down", "negative", "level falls", "water level falls", "down"],
};

const REVEAL_TEXT: Record<string, string> = {
  p76_ex1_everest: "-36°C",
  p76_ex1_submarine: "-500 m",
  p76_ex1_darjeeling: "-19°C",
  p76_ex1_vizag: "+18°C (or 18°C)",
  p76_ex2_neg_integers: "-1, -2, -3, -4, -5 (any five negative integers)",
  p76_ex3_pos_integers: "1, 2, 3, 4, 5 (or +1, +2, +3, +4, +5)",
  p76_ex4_marked: "-4, -1, 0, 2, 3, 5 (in order on number line)",
  p76_ex5_i: "False (-7 lies to the left of -6)",
  p76_ex5_ii: "False (Zero is neither positive nor negative)",
  p76_ex5_iii: "True (9 is positive, so it is to the right of zero)",
  p76_ex5_iv: "True (-1 lies between -2 and 0)",
  p76_order_q1: "The water level rises above zero (positive integers: +1, +2, +3...)",
  p76_order_q2: "The water level falls below zero (negative integers: -1, -2, -3...)",
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
   Question 4 Interactive Number Line SVG
───────────────────────────────────────────── */
function Question4NumberLineSVG({
  markedItems,
  onToggle,
}: {
  markedItems: number[];
  onToggle: (n: number) => void;
}) {
  const targetNumbers = [-4, 3, 2, 0, -1, 5];

  return (
    <div className="w-full flex flex-col items-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 select-none">
      <div className="flex flex-wrap items-center justify-between w-full text-xs text-muted-foreground px-2">
        <span className="font-semibold text-foreground">Click points on the number line to mark or unmark:</span>
        <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">
          Target integers: -4, -1, 0, 2, 3, 5
        </span>
      </div>

      <svg viewBox="0 0 740 100" className="w-full h-auto max-w-3xl drop-shadow-sm">
        <defs>
          <marker id="q4Arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
          </marker>
        </defs>

        {/* Axis line */}
        <line x1="25" y1="50" x2="715" y2="50" stroke="#475569" strokeWidth="2.5" markerStart="url(#q4Arrow)" markerEnd="url(#q4Arrow)" />

        {/* Numbers -6 to +6 */}
        {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((num) => {
          const x = 370 + num * 52;
          const isZero = num === 0;
          const isSelected = markedItems.includes(num);
          const isTarget = targetNumbers.includes(num);

          return (
            <g
              key={num}
              className="cursor-pointer group"
              onClick={() => onToggle(num)}
            >
              {/* Tick */}
              <line
                x1={x}
                y1="42"
                x2={x}
                y2="58"
                stroke={isZero ? "#0284c7" : "#64748b"}
                strokeWidth={isZero ? "3" : "2"}
              />

              {/* Number Label */}
              <text
                x={x}
                y="75"
                textAnchor="middle"
                fontSize={isZero ? "13" : "11"}
                fontWeight={isZero || isSelected ? "bold" : "600"}
                fill={isSelected ? "#0d9488" : isZero ? "#0284c7" : "#475569"}
                className="group-hover:fill-teal-600"
              >
                {num}
              </text>

              {/* Selection Dot */}
              {isSelected ? (
                <circle cx={x} cy="50" r="6" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />
              ) : (
                <circle
                  cx={x}
                  cy="50"
                  r="7"
                  fill="transparent"
                  className="group-hover:fill-teal-500/20"
                />
              )}

              {/* Target Hint Indicator */}
              {isTarget && !isSelected && (
                <circle cx={x} cy="32" r="2.5" fill="#f59e0b" opacity="0.6" />
              )}
            </g>
          );
        })}
      </svg>

      <div className="flex items-center gap-2 text-xs">
        <span className="text-muted-foreground">Currently marked:</span>
        <div className="flex flex-wrap gap-1.5 font-mono font-bold">
          {markedItems.length === 0 ? (
            <span className="text-slate-400 italic">None (click ticks to mark)</span>
          ) : (
            [...markedItems]
              .sort((a, b) => a - b)
              .map((n) => (
                <span
                  key={n}
                  className="px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 border border-teal-300 dark:border-teal-700 text-[11px]"
                >
                  {n}
                </span>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Water Jar & Strip Illustration SVG
───────────────────────────────────────────── */
function WaterJarSVG() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 my-4">
      {/* Jar Illustration */}
      <svg viewBox="0 0 160 220" className="w-36 h-auto drop-shadow">
        <defs>
          <linearGradient id="jarWater" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Jar Outline */}
        <rect x="25" y="20" width="110" height="180" rx="10" fill="#f8fafc" stroke="#64748b" strokeWidth="3" />
        <ellipse cx="80" cy="20" rx="55" ry="10" fill="#e2e8f0" stroke="#64748b" strokeWidth="2.5" />

        {/* Water Inside (filled up to level 0) */}
        <path d="M 27 110 Q 80 115 133 110 L 133 190 Q 80 200 27 190 Z" fill="url(#jarWater)" />

        {/* Measuring Strip attached to Jar */}
        <rect x="110" y="30" width="22" height="160" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
        {[-3, -2, -1, 0, 1, 2, 3].map((val, idx) => {
          const y = 50 + (3 - val) * 20;
          const isZero = val === 0;
          return (
            <g key={val}>
              <line x1="110" y1={y} x2="118" y2={y} stroke={isZero ? "#0284c7" : "#0f172a"} strokeWidth={isZero ? "2" : "1"} />
              <text x="122" y={y + 3.5} fontSize="9" fontWeight="bold" fill={isZero ? "#0284c7" : val < 0 ? "#e11d48" : "#0d9488"}>
                {val > 0 ? `+${val}` : val}
              </text>
            </g>
          );
        })}

        {/* Zero Baseline indicator */}
        <line x1="20" y1="110" x2="140" y2="110" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="75" y="106" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#dc2626">
          Base level (0)
        </text>
      </svg>

      {/* Accompanying Explanation & Horizontal Strip */}
      <div className="space-y-3 max-w-md">
        <h4 className="font-bold text-sm text-foreground">Model of Well & Water Jar:</h4>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Pavan and Harish made a model of the well using a glass jar and pasted a measuring strip:
        </p>
        <ul className="text-xs space-y-1.5 text-foreground/80 pl-2">
          <li>• <strong>Steps above zero:</strong> Marked as <code className="text-teal-600 font-bold">+1, +2, +3, +4</code> (when water is poured in / rises)</li>
          <li>• <strong>Base step level:</strong> Marked as <code className="text-blue-600 font-bold">0</code> (observed level on first day)</li>
          <li>• <strong>Steps below zero:</strong> Marked as <code className="text-rose-600 font-bold">-1, -2, -3</code> (when water level falls / removed)</li>
        </ul>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function C6MathsCh6Page4() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch6-page4";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<Record<string, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; label?: string; id: number } | null>(null);
  const [markedPoints, setMarkedPoints] = useState<number[]>([]);

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

    // load marked points if any
    const savedPoints = localStorage.getItem(`${storageKey}-marked-points`);
    if (savedPoints) {
      try {
        setMarkedPoints(JSON.parse(savedPoints));
      } catch {}
    }
  }, [storageKey]);

  useEffect(() => {
    const handleReset = () => {
      ALL_INPUT_IDS.forEach((id) => {
        localStorage.removeItem(`${storageKey}-${id}-answer`);
        localStorage.removeItem(`${storageKey}-${id}-graded`);
      });
      localStorage.removeItem(`${storageKey}-marked-points`);
      localStorage.removeItem(`${storageKey}-reveal-awarded`);
      setAnswers({});
      setGraded({});
      setMarkedPoints([]);
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
    localStorage.removeItem(`${storageKey}-marked-points`);
    localStorage.removeItem(`${storageKey}-reveal-awarded`);
    setAnswers({});
    setGraded({});
    setMarkedPoints([]);
    setFeedback(null);
    setShowReveal(false);
  };

  const handleToggleReveal = () => {
    const next = !showReveal;
    setShowReveal(next);
    if (next) {
      setMarkedPoints([-4, -1, 0, 2, 3, 5]);
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

  // Interactive toggle for question 4
  const toggleMarkNumber = (n: number) => {
    if (isRevealed) return;
    const next = markedPoints.includes(n)
      ? markedPoints.filter((x) => x !== n)
      : [...markedPoints, n].sort((a, b) => a - b);
    setMarkedPoints(next);
    try {
      localStorage.setItem(`${storageKey}-marked-points`, JSON.stringify(next));
    } catch {}

    // automatically update the answer field
    const textVal = next.join(", ");
    handleChange("p76_ex4_marked", textVal);
    handleBlur("p76_ex4_marked");
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
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">Ordering of Integers</h1>
              <p className="text-xs text-emerald-100 font-normal">
                Class 6 Maths &bull; Chapter 6 &bull; Integers
              </p>
            </div>
          </div>
          <span className="text-xs bg-emerald-950/80 text-emerald-200 px-3 py-1 rounded-full border border-emerald-400/30 font-mono self-start sm:self-auto font-bold">
            Page 76 (PDF P84)
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
        
        {/* Section 1: Exercise 6.1 (Continued) */}
        <div className="rounded-2xl border-2 border-teal-500/40 bg-teal-50/20 dark:bg-teal-950/20 p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-teal-200 dark:border-teal-800/60 pb-3">
            <span className="px-3 py-1 bg-teal-600 text-white text-xs font-bold uppercase rounded-md tracking-wider">
              Exercise - 6.1 (Continued)
            </span>
          </div>

          {/* Question 1: items (iv) to (vii) */}
          <div className="space-y-4">
            <p className="text-sm sm:text-base font-semibold text-foreground">
              1. Represent the following statements using signs of integers (cont.):
            </p>

            <div className="space-y-3">
              {/* iv */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-background rounded-xl border border-border">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-teal-700 dark:text-teal-400 w-7 shrink-0">(iv)</span>
                  <span className="text-sm font-medium">The average temperature at the mount Everest in January is 36°C below zero-degree</span>
                </div>
                <div className="w-full sm:w-44">
                  <Field id="p76_ex1_everest" placeholder="( -36°C )" {...fp} />
                </div>
              </div>

              {/* v */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-background rounded-xl border border-border">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-teal-700 dark:text-teal-400 w-7 shrink-0">(v)</span>
                  <span className="text-sm font-medium">The submarine is 500 meters below the surface of the sea.</span>
                </div>
                <div className="w-full sm:w-44">
                  <Field id="p76_ex1_submarine" placeholder="( -500 m )" {...fp} />
                </div>
              </div>

              {/* vi */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-background rounded-xl border border-border">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-teal-700 dark:text-teal-400 w-7 shrink-0">(vi)</span>
                  <span className="text-sm font-medium">The average temperature of Darjeeling in July is 19°C below zero-degree.</span>
                </div>
                <div className="w-full sm:w-44">
                  <Field id="p76_ex1_darjeeling" placeholder="( -19°C )" {...fp} />
                </div>
              </div>

              {/* vii */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-background rounded-xl border border-border">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-teal-700 dark:text-teal-400 w-7 shrink-0">(vii)</span>
                  <span className="text-sm font-medium">The average low temperature in Visakhapatnam during January is 18°C.</span>
                </div>
                <div className="w-full sm:w-44">
                  <Field id="p76_ex1_vizag" placeholder="( +18°C )" {...fp} />
                </div>
              </div>
            </div>
          </div>

          {/* Questions 2 & 3: Write any 5 integers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="p-4 bg-background rounded-xl border border-border space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-teal-700 dark:text-teal-400">2.</span>
                <p className="text-sm font-semibold">Write any five negative integers:</p>
              </div>
              <Field
                id="p76_ex2_neg_integers"
                placeholder="e.g. -1, -2, -3, -4, -5"
                isOpen={true}
                {...fp}
              />
            </div>

            <div className="p-4 bg-background rounded-xl border border-border space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-teal-700 dark:text-teal-400">3.</span>
                <p className="text-sm font-semibold">Write any five positive integers:</p>
              </div>
              <Field
                id="p76_ex3_pos_integers"
                placeholder="e.g. 1, 2, 3, 4, 5"
                isOpen={true}
                {...fp}
              />
            </div>
          </div>

          {/* Question 4: Mark the integers on the number line */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-teal-700 dark:text-teal-400">4.</span>
              <p className="text-sm font-semibold">
                Mark the integers on the number line given below:{" "}
                <code className="font-mono bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 px-2 py-0.5 rounded font-bold">
                  -4, 3, 2, 0, -1, 5
                </code>
              </p>
            </div>

            <Question4NumberLineSVG
              markedItems={markedPoints}
              onToggle={toggleMarkNumber}
            />

            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Marked values text:</span>
              <div className="w-64">
                <Field
                  id="p76_ex4_marked"
                  placeholder="-4, -1, 0, 2, 3, 5"
                  {...fp}
                />
              </div>
            </div>
          </div>

          {/* Question 5: True or False */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-teal-700 dark:text-teal-400">5.</span>
              <p className="text-sm font-semibold">
                Write True or False. If the statement is false, correct the statement:
              </p>
            </div>

            <div className="space-y-3">
              {/* (i) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-background rounded-xl border border-border">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-teal-700 dark:text-teal-400 w-7 shrink-0">(i)</span>
                  <span className="text-sm font-medium">-7 is on the right side of -6 on the number line.</span>
                </div>
                <div className="w-full sm:w-52">
                  <Field id="p76_ex5_i" placeholder="True or False (False)" {...fp} />
                </div>
              </div>

              {/* (ii) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-background rounded-xl border border-border">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-teal-700 dark:text-teal-400 w-7 shrink-0">(ii)</span>
                  <span className="text-sm font-medium">Zero is a positive number.</span>
                </div>
                <div className="w-full sm:w-52">
                  <Field id="p76_ex5_ii" placeholder="True or False (False)" {...fp} />
                </div>
              </div>

              {/* (iii) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-background rounded-xl border border-border">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-teal-700 dark:text-teal-400 w-7 shrink-0">(iii)</span>
                  <span className="text-sm font-medium">9 is on the right side of zero on the number line.</span>
                </div>
                <div className="w-full sm:w-52">
                  <Field id="p76_ex5_iii" placeholder="True or False (True)" {...fp} />
                </div>
              </div>

              {/* (iv) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-background rounded-xl border border-border">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-teal-700 dark:text-teal-400 w-7 shrink-0">(iv)</span>
                  <span className="text-sm font-medium">-1 is an integer which lies between -2 and 0.</span>
                </div>
                <div className="w-full sm:w-52">
                  <Field id="p76_ex5_iv" placeholder="True or False (True)" {...fp} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6.5: Ordering of Integers */}
        <div className="space-y-6">
          <div className="border-l-4 border-teal-500 pl-4 py-1">
            <h2 className="text-lg sm:text-xl font-bold text-teal-700 dark:text-teal-400">
              6.5 Ordering of Integers
            </h2>
          </div>

          <p className="text-sm sm:text-base leading-relaxed">
            Pavan and Harish are friends and they noticed that the water level in the well of their village reduces during summer and rises during the rainy season. The level is shown by the steps made. They used the idea of the number of steps of the well and prepared a model of the well using a glass jar.
          </p>

          {/* Water Jar Model SVG Illustration */}
          <WaterJarSVG />

          <p className="text-sm sm:text-base leading-relaxed">
            They use this jar to depict the water level, taking out water when water level fell in the well and adding water when it rose. They recorded the water level when above the base step level as positive and below it as negative. They got a record of the rise and fall of water. We will now study the water in the jar. Let us think:
          </p>

          <div className="space-y-4 bg-muted/30 p-5 rounded-2xl border border-border">
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="font-bold text-teal-700 dark:text-teal-400 w-6 shrink-0">1.</span>
                <p className="flex-1 text-sm font-medium">
                  What happens when water is poured into the jar?
                </p>
                <div className="w-full sm:w-64">
                  <Field
                    id="p76_order_q1"
                    placeholder="e.g. Water level rises (positive)"
                    isOpen={true}
                    {...fp}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                <span className="font-bold text-teal-700 dark:text-teal-400 w-6 shrink-0">2.</span>
                <p className="flex-1 text-sm font-medium">
                  What happens when water is removed from the jar from the zero level?
                </p>
                <div className="w-full sm:w-64">
                  <Field
                    id="p76_order_q2"
                    placeholder="e.g. Water level falls (negative)"
                    isOpen={true}
                    {...fp}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Ordering Summary Box */}
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-5 space-y-3 text-sm">
            <p className="font-bold text-emerald-900 dark:text-emerald-300">
              Key Observations on Ordering Integers:
            </p>
            <p>
              We know that <code className="font-bold font-mono">4 &gt; 2</code> and that 4 is to the right of 2 on the number line. Similarly, <code className="font-bold font-mono">2 &gt; 0</code> and is to the right of 0. Now, since 0 is to the right of -3, we say <code className="font-bold font-mono">0 &gt; -3</code>.
            </p>
            <p>
              Thus, we see that on a number line, <strong>the number increases as we move to the right and decreases as we move to the left</strong>. Therefore:
            </p>
            <div className="text-center font-mono font-bold text-sm sm:text-base text-emerald-800 dark:text-emerald-200 bg-white dark:bg-slate-900 py-2 rounded-lg border border-emerald-300 dark:border-emerald-700/60">
              {"-3 < -2 < -1 < 0 and 0 < 1 < 2 < 3 so on."}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
