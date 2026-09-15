"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs (Book Page 74 / PDF Page 82)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  // Top Questions continuing from previous page
  "p74_q5",
  "p74_q6",
  // "Do This" questions
  "p74_do_manasa",
  "p74_do_swetha",
  "p74_do_more_money",
  // "6.3 Some Examples of Negative Numbers" questions
  "p74_ex1_bird",
  "p74_ex1_fish",
  "p74_ex2_mountain",
  "p74_ex2_lake",
  "p74_ex3_delhi",
  "p74_ex3_kufri",
];

const CORRECT: Record<string, string[]> = {
  p74_q5: [
    "direction",
    "opposite",
    "positive",
    "negative",
    "sign",
    "right",
    "left",
    "credit",
    "debit",
    "debt",
    "plus",
    "minus",
    "40",
    "+20",
    "-20",
    "zero",
  ],
  p74_q6: [
    "right",
    "right side",
    "positive side",
    "to the right of zero",
    "right side of zero",
    "positive",
    "+ve",
  ],
  p74_do_manasa: [
    "-30",
    "- 30",
    "negative 30",
    "minus 30",
    "30 left",
    "left",
  ],
  p74_do_swetha: [
    "-20",
    "- 20",
    "negative 20",
    "minus 20",
    "20 left",
    "left",
  ],
  p74_do_more_money: [
    "swetha",
    "swetha will have more money",
    "swetha has more",
    "swetha (80 > 70)",
    "sweta",
    "swetha 80",
    "80",
  ],
  p74_ex1_bird: [
    "+25",
    "25",
    "+25m",
    "+ 25",
    "+25 m",
    "+25 meters",
    "25m",
    "25 meters",
    "+25metres",
  ],
  p74_ex1_fish: [
    "-2",
    "-2m",
    "- 2",
    "-2 m",
    "-2 meters",
    "minus 2",
    "negative 2",
    "-2metres",
  ],
  p74_ex2_mountain: [
    "+500",
    "500",
    "+500m",
    "+ 500",
    "+500 m",
    "+500 meters",
    "500m",
    "500 meters",
  ],
  p74_ex2_lake: [
    "-35",
    "-35m",
    "- 35",
    "-35 m",
    "-35 meters",
    "minus 35",
    "negative 35",
    "-35metres",
  ],
  p74_ex3_delhi: [
    "9",
    "+9",
    "9°c",
    "+9°c",
    "9 c",
    "9 degrees",
    "9c",
    "+9c",
    "9 degree",
  ],
  p74_ex3_kufri: [
    "-6",
    "-6°c",
    "- 6",
    "-6 c",
    "-6 degrees",
    "-6c",
    "minus 6",
    "negative 6",
    "-6 degree",
  ],
};

const REVEAL_TEXT: Record<string, string> = {
  p74_q5: "Right of zero is positive (+₹20), left of zero is negative (-₹20, debt).",
  p74_q6: "Right side of zero",
  p74_do_manasa: "-30",
  p74_do_swetha: "-20",
  p74_do_more_money: "Swetha",
  p74_ex1_bird: "+25 m",
  p74_ex1_fish: "-2 m",
  p74_ex2_mountain: "+500 m",
  p74_ex2_lake: "-35 m",
  p74_ex3_delhi: "+9°C",
  p74_ex3_kufri: "-6°C",
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
   Number Line Diagram SVG
───────────────────────────────────────────── */
function IntegerNumberLineSVG() {
  return (
    <svg viewBox="0 0 700 130" className="w-full h-auto max-w-2xl drop-shadow-sm select-none">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
        </marker>
        <marker id="posArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#0d9488" />
        </marker>
        <marker id="negArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#e11d48" />
        </marker>
      </defs>

      {/* Main Axis Line */}
      <line x1="30" y1="80" x2="670" y2="80" stroke="#475569" strokeWidth="2.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />

      {/* Center indicator for Zero */}
      <text x="350" y="32" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a" className="dark:fill-slate-100">
        Zero
      </text>
      <line x1="350" y1="40" x2="350" y2="70" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
      <polygon points="350,75 346,67 354,67" fill="#64748b" />

      {/* Direction indicators */}
      {/* Negative Left Arrow */}
      <line x1="320" y1="52" x2="160" y2="52" stroke="#e11d48" strokeWidth="2" markerEnd="url(#negArrow)" />
      <text x="240" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e11d48">
        Negative ( - )
      </text>

      {/* Positive Right Arrow */}
      <line x1="380" y1="52" x2="540" y2="52" stroke="#0d9488" strokeWidth="2" markerEnd="url(#posArrow)" />
      <text x="460" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0d9488">
        Positive ( + )
      </text>

      {/* Tick Marks & Numbers */}
      {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((num) => {
        const x = 350 + num * 65;
        const isZero = num === 0;
        return (
          <g key={num}>
            <line
              x1={x}
              y1="72"
              x2={x}
              y2="88"
              stroke={isZero ? "#0284c7" : "#475569"}
              strokeWidth={isZero ? "3" : "2"}
            />
            <text
              x={x}
              y="110"
              textAnchor="middle"
              fontSize={isZero ? "16" : "14"}
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
   Sea Level & Mountain Illustration SVG
───────────────────────────────────────────── */
function ElevationIllustrationSVG() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      {/* 1. Sea Level Diagram */}
      <div className="flex flex-col items-center bg-blue-50/60 dark:bg-slate-900/50 p-4 rounded-xl border border-blue-200 dark:border-blue-900/40">
        <svg viewBox="0 0 320 200" className="w-full h-auto max-w-xs">
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
            <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect x="10" y="10" width="300" height="100" rx="8" fill="url(#skyGrad)" />
          {/* Sea */}
          <rect x="10" y="110" width="300" height="80" rx="0" fill="url(#seaGrad)" />

          {/* Sea Level line */}
          <line x1="10" y1="110" x2="310" y2="110" stroke="#0369a1" strokeWidth="2.5" strokeDasharray="4 2" />
          <rect x="15" y="98" width="80" height="22" rx="4" fill="#0369a1" />
          <text x="55" y="113" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">
            Sea level (0 m)
          </text>

          {/* Bird flying at +25m */}
          <g transform="translate(180, 35)">
            <path
              d="M 0,8 Q 10,0 20,8 Q 30,0 40,8 Q 30,5 20,11 Q 10,5 0,8 Z"
              fill="#334155"
            />
            <text x="50" y="10" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
              Bird (flying)
            </text>
          </g>
          {/* Height bracket for Bird */}
          <line x1="150" y1="40" x2="150" y2="110" stroke="#0284c7" strokeWidth="1.5" />
          <line x1="145" y1="40" x2="155" y2="40" stroke="#0284c7" strokeWidth="1.5" />
          <line x1="145" y1="110" x2="155" y2="110" stroke="#0284c7" strokeWidth="1.5" />
          <text x="135" y="78" textAnchor="end" fontSize="12" fontWeight="bold" fill="#0369a1">
            25 m
          </text>

          {/* Fish swimming at -2m */}
          <g transform="translate(180, 140)">
            <path
              d="M 0,8 Q 15,-2 30,8 L 40,0 L 40,16 L 30,8 Q 15,18 0,8 Z"
              fill="#f97316"
            />
            <circle cx="8" cy="7" r="1.5" fill="#ffffff" />
            <text x="50" y="12" fontSize="12" fontWeight="bold" fill="#ffffff">
              Fish (swimming)
            </text>
          </g>
          {/* Depth bracket for Fish */}
          <line x1="150" y1="110" x2="150" y2="148" stroke="#0284c7" strokeWidth="1.5" />
          <line x1="145" y1="148" x2="155" y2="148" stroke="#0284c7" strokeWidth="1.5" />
          <text x="135" y="133" textAnchor="end" fontSize="12" fontWeight="bold" fill="#0c4a6e">
            2 m
          </text>
        </svg>
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">
          Figure: Sea level representation (Above 0 & Below 0)
        </span>
      </div>

      {/* 2. Mountain & Lake Diagram */}
      <div className="flex flex-col items-center bg-emerald-50/50 dark:bg-slate-900/50 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40">
        <svg viewBox="0 0 320 200" className="w-full h-auto max-w-xs">
          <defs>
            <linearGradient id="mtnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="lakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* Ground line */}
          <line x1="10" y1="130" x2="310" y2="130" stroke="#16a34a" strokeWidth="3" />
          <text x="250" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
            Ground Level (0)
          </text>

          {/* Mountain */}
          <polygon points="40,130 110,35 180,130" fill="url(#mtnGrad)" />
          {/* Snow peak */}
          <polygon points="95,55 110,35 125,55 118,50 110,54 102,49" fill="#f8fafc" />
          {/* Flag on mountain */}
          <line x1="110" y1="35" x2="110" y2="15" stroke="#dc2626" strokeWidth="2" />
          <polygon points="110,15 130,22 110,29" fill="#dc2626" />
          <text x="135" y="24" fontSize="10" fontWeight="bold" fill="#dc2626">
            Flag (+500 m)
          </text>

          {/* Lake depression */}
          <path d="M 185,130 Q 240,185 295,130 Z" fill="url(#lakeGrad)" />
          {/* Tent at bottom of lake */}
          <polygon points="230,165 240,152 250,165" fill="#f59e0b" />
          <line x1="240" y1="165" x2="240" y2="152" stroke="#b45309" strokeWidth="1" />
          <text x="240" y="180" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369a1">
            Tent (-35 m)
          </text>
        </svg>
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">
          Figure: Mountain height vs. lake bed depth
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function C6MathsCh6Page2() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch6-page2";

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
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">How Negative Numbers Arise?</h1>
              <p className="text-xs text-emerald-100 font-normal">
                Class 6 Maths &bull; Chapter 6 &bull; Integers
              </p>
            </div>
          </div>
          <span className="text-xs bg-emerald-950/80 text-emerald-200 px-3 py-1 rounded-full border border-emerald-400/30 font-mono self-start sm:self-auto font-bold">
            Page 82
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
        
        {/* Section: Continuing Questions 5 & 6 */}
        <div className="p-5 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-5">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="font-bold text-teal-700 dark:text-teal-400 w-6 shrink-0 mt-1">5.</span>
              <p className="flex-1 text-sm font-medium">
                What is the difference between moving by <strong>₹ 20</strong> to the right of zero and by <strong>₹ 20</strong> to the left of zero?
              </p>
            </div>
            <div className="pl-9">
              <Field
                id="p74_q5"
                placeholder="Explain the difference (e.g. Right represents positive/having money, Left represents negative/debt)..."
                multiLine
                isOpen={true}
                {...fp}
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="font-bold text-teal-700 dark:text-teal-400 w-6 shrink-0 mt-1">6.</span>
              <p className="flex-1 text-sm font-medium">
                Which side of the line has she marked the money when Rafi gave <strong>₹ 100</strong> and <strong>₹ 50</strong> in the next month?
              </p>
            </div>
            <div className="pl-9 w-full sm:w-80">
              <Field
                id="p74_q6"
                placeholder="e.g. Right side of zero"
                {...fp}
              />
            </div>
          </div>
        </div>

        {/* Section 6.2: How Negative Numbers Arise? */}
        <div className="space-y-4">
          <div className="border-l-4 border-teal-500 pl-4 py-1">
            <h2 className="text-lg sm:text-xl font-bold text-teal-700 dark:text-teal-400">
              6.2 How Negative Numbers Arise?
            </h2>
          </div>

          <p className="text-sm sm:text-base leading-relaxed">
            You would have realized that <strong>20</strong> marked on either side of zero do not mean the same.
            The numbers on the left of zero are negative numbers and are less than zero.
            The numbers on the right are positive and are greater than zero.
          </p>

          <p className="text-sm sm:text-base leading-relaxed">
            There are several situations in our daily life where we use these numbers to represent loss and profit, past and future, low and high temperatures etc. The numbers on the left side of zero (i.e. less than zero) are called <strong>negative numbers</strong>. These are denoted as{" "}
            <code className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 font-mono text-sm font-bold">
              -1, -2, -3, ..., -10, -20, ...
            </code>{" "}
            for easy understanding.
          </p>

          {/* Interactive / Visual Number Line */}
          <div className="my-6 flex flex-col items-center bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Number Line Representation
            </span>
            <IntegerNumberLineSVG />
          </div>

          {/* Real Life Daily Uses List */}
          <div className="bg-teal-50/50 dark:bg-teal-950/20 p-5 rounded-xl border border-teal-200/60 dark:border-teal-900/40 space-y-3">
            <p className="font-semibold text-teal-900 dark:text-teal-300 text-sm">
              We use negative numbers in our daily lives:
            </p>
            <ul className="space-y-2 text-sm text-foreground/90 pl-2">
              <li className="flex items-start gap-2">
                <span className="font-bold text-teal-600 dark:text-teal-400">(i)</span>
                <span>
                  The loss of <strong>₹ 200</strong> in a business is represented as{" "}
                  <strong className="text-rose-600 dark:text-rose-400 font-mono">(-200)</strong> and profit of <strong>₹ 200</strong> is represented as{" "}
                  <strong className="text-teal-600 dark:text-teal-400 font-mono">(+200)</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-teal-600 dark:text-teal-400">(ii)</span>
                <span>
                  The temperature above <strong>0°C</strong> is denoted as &apos;positive&apos; and below <strong>0°C</strong> is denoted as negative.
                  <br />
                  3°C below 0°C is <strong className="text-rose-600 dark:text-rose-400 font-mono">-3°C</strong>
                  <br />
                  3°C above 0°C is <strong className="text-teal-600 dark:text-teal-400 font-mono">+3°C</strong>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section: Do This */}
        <div className="rounded-2xl border-2 border-amber-300 dark:border-amber-700/60 bg-amber-50/40 dark:bg-amber-950/15 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold uppercase rounded-md tracking-wider">
              Do This
            </span>
          </div>

          <p className="text-sm sm:text-base font-medium">
            Manasa has borrowed <strong>₹ 30</strong> and Swetha has borrowed <strong>₹ 20</strong> from their mother. How will you represent this on the number line? Suppose their father gave them <strong>₹ 100</strong> each as pocket money, who will have more money after clearing the debt?
          </p>

          <div className="space-y-4 pt-2 max-w-xl">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm font-semibold sm:w-56 text-foreground/80">
                Manasa&apos;s borrowed money on number line:
              </span>
              <div className="flex-1">
                <Field id="p74_do_manasa" placeholder="e.g. -30" {...fp} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm font-semibold sm:w-56 text-foreground/80">
                Swetha&apos;s borrowed money on number line:
              </span>
              <div className="flex-1">
                <Field id="p74_do_swetha" placeholder="e.g. -20" {...fp} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm font-semibold sm:w-56 text-foreground/80">
                Who will have more money after clearing debt?
              </span>
              <div className="flex-1">
                <Field id="p74_do_more_money" placeholder="Manasa or Swetha?" {...fp} />
              </div>
            </div>
          </div>
        </div>

        {/* Section 6.3: Some Examples of Negative Numbers */}
        <div className="space-y-5">
          <div className="border-l-4 border-teal-500 pl-4 py-1">
            <h2 className="text-lg sm:text-xl font-bold text-teal-700 dark:text-teal-400">
              6.3 Some Examples of Negative Numbers
            </h2>
          </div>

          <p className="text-sm sm:text-base font-medium">
            Show the following using the ground level / sea level as zero with appropriate sign (<code className="font-mono font-bold">+</code> or <code className="font-mono font-bold">-</code>):
          </p>

          {/* Graphical Illustrations */}
          <ElevationIllustrationSVG />

          <div className="space-y-5 pt-2">
            {/* Example 1 */}
            <div className="p-4 bg-muted/40 rounded-xl border border-border space-y-3">
              <p className="text-sm font-semibold">
                1. A bird is flying at a height of <strong>25 meters</strong> above the sea level and a fish at a depth of <strong>2 meters</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground w-28">
                    Bird (+ height):
                  </span>
                  <div className="flex-1">
                    <Field id="p74_ex1_bird" placeholder="e.g. +25" {...fp} />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground w-28">
                    Fish (- depth):
                  </span>
                  <div className="flex-1">
                    <Field id="p74_ex1_fish" placeholder="e.g. -2" {...fp} />
                  </div>
                </div>
              </div>
            </div>

            {/* Example 2 */}
            <div className="p-4 bg-muted/40 rounded-xl border border-border space-y-3">
              <p className="text-sm font-semibold">
                2. A flag is posted on top of a mountain at the height of <strong>500m</strong> and another one placed on top of a tent made in the bed of a lake <strong>35m</strong> below the ground.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground w-36">
                    Flag on mountain:
                  </span>
                  <div className="flex-1">
                    <Field id="p74_ex2_mountain" placeholder="e.g. +500" {...fp} />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground w-36">
                    Tent in lake bed:
                  </span>
                  <div className="flex-1">
                    <Field id="p74_ex2_lake" placeholder="e.g. -35" {...fp} />
                  </div>
                </div>
              </div>
            </div>

            {/* Example 3 */}
            <div className="p-4 bg-muted/40 rounded-xl border border-border space-y-3">
              <p className="text-sm font-semibold">
                3. The temperature on a cold night in Delhi was <strong>9°C</strong> and in Kufri in Himachal Pradesh was <strong>6 degree below zero</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground w-36">
                    Delhi temperature:
                  </span>
                  <div className="flex-1">
                    <Field id="p74_ex3_delhi" placeholder="e.g. 9 or +9" {...fp} />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground w-36">
                    Kufri temperature:
                  </span>
                  <div className="flex-1">
                    <Field id="p74_ex3_kufri" placeholder="e.g. -6" {...fp} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
