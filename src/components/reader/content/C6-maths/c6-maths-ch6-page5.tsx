"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs (Book Page 77 / PDF Page 85)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  // Do This (Top) - fill with > or <
  "p77_dothis_1", // 0 ___ -1
  "p77_dothis_2", // -3 ___ -2
  "p77_dothis_3", // -7 ___ 5 (or 5 ___ -5)
  "p77_dothis_4", // -4 ___ 0

  // Exercise 6.2:
  // 1. Put appropriate symbol > or <
  "p77_ex1_i",   // -1 ___ 0
  "p77_ex1_ii",  // -3 ___ -7
  "p77_ex1_iii", // -10 ___ +10
  "p77_ex1_iv",  // 0 ___ -5
  "p77_ex1_v",   // -100 ___ 99
  "p77_ex1_vi",  // 0 ___ 100

  // 2. Write following integers in increasing and decreasing order:
  "p77_ex2_i_inc",  // -7, 5, -3
  "p77_ex2_i_dec",
  "p77_ex2_ii_inc", // -1, 3, 0
  "p77_ex2_ii_dec",
  "p77_ex2_iii_inc",// 1, 3, -6
  "p77_ex2_iii_dec",
  "p77_ex2_iv_inc", // -5, -3, -1
  "p77_ex2_iv_dec",

  // 3. True or False, correct those that are false:
  "p77_ex3_i",   // Zero is on the right of -3 on the number line
  "p77_ex3_ii",  // -12 and +12 represent on the number line the same integer
  "p77_ex3_iii", // Every positive integer is greater than zero
  "p77_ex3_iv",  // -5 < 8
  "p77_ex3_v",   // (-100) > (+100)
  "p77_ex3_vi",  // -1 < -8

  // 4. Find all integers which lie between the given two integers:
  "p77_ex4_i",   // -1 and 1
  "p77_ex4_ii",  // -5 and 0
  "p77_ex4_iii", // -6 and -8
  "p77_ex4_iv",  // 0 and -3

  // 5. Shimla (-4°C) vs Kufri (-6°C): Which place is colder and why?
  "p77_ex5_colder",

  // Do This (Bottom) - Stairs of Shop:
  "p77_stairs_up",   // stairs going up to terrace (+ positive)
  "p77_stairs_down", // stairs going down to godown (- negative)
];

const CORRECT: Record<string, string[]> = {
  p77_dothis_1: [">", "greater", "greater than", ">0", "gt"],
  p77_dothis_2: ["<", "less", "less than", "smaller", "< -2", "lt"],
  p77_dothis_3: [">", "greater", "greater than", "> -5", "gt"],
  p77_dothis_4: ["<", "less", "less than", "smaller", "< 0", "lt"],

  p77_ex1_i: ["<", "less", "less than", "smaller", "lt"],
  p77_ex1_ii: [">", "greater", "greater than", "gt"],
  p77_ex1_iii: ["<", "less", "less than", "smaller", "lt"],
  p77_ex1_iv: [">", "greater", "greater than", "gt"],
  p77_ex1_v: ["<", "less", "less than", "smaller", "lt"],
  p77_ex1_vi: ["<", "less", "less than", "smaller", "lt"],

  p77_ex2_i_inc: ["-7, -3, 5", "-7,-3,5", "-7 -3 5", "-7<-3<5", "-7 < -3 < 5"],
  p77_ex2_i_dec: ["5, -3, -7", "5,-3,-7", "5 -3 -7", "5>-3>-7", "5 > -3 > -7"],
  p77_ex2_ii_inc: ["-1, 0, 3", "-1,0,3", "-1 0 3", "-1<0<3", "-1 < 0 < 3"],
  p77_ex2_ii_dec: ["3, 0, -1", "3,0,-1", "3 0 -1", "3>0>-1", "3 > 0 > -1"],
  p77_ex2_iii_inc: ["-6, 1, 3", "-6,1,3", "-6 1 3", "-6<1<3", "-6 < 1 < 3"],
  p77_ex2_iii_dec: ["3, 1, -6", "3,1,-6", "3 1 -6", "3>1>-6", "3 > 1 > -6"],
  p77_ex2_iv_inc: ["-5, -3, -1", "-5,-3,-1", "-5 -3 -1", "-5<-3<-1", "-5 < -3 < -1"],
  p77_ex2_iv_dec: ["-1, -3, -5", "-1,-3,-5", "-1 -3 -5", "-1>-3>-5", "-1 > -3 > -5"],

  p77_ex3_i: ["true", "t", "yes", "true (0 is to the right of -3)", "right"],
  p77_ex3_ii: ["false", "f", "no", "false (-12 and +12 are opposite integers)", "opposite", "different"],
  p77_ex3_iii: ["true", "t", "yes", "true (positive integers are > 0)", "greater"],
  p77_ex3_iv: ["true", "t", "yes", "true (-5 < 8)"],
  p77_ex3_v: ["false", "f", "no", "false (+100 is greater than -100)", "+100 is greater", "less"],
  p77_ex3_vi: ["false", "f", "no", "false (-1 > -8)", "-1 is greater", "-1 > -8"],

  p77_ex4_i: ["0", "zero"],
  p77_ex4_ii: ["-4, -3, -2, -1", "-4,-3,-2,-1", "-4 -3 -2 -1", "-1, -2, -3, -4", "-1,-2,-3,-4"],
  p77_ex4_iii: ["-7", "- 7", "minus 7", "negative 7"],
  p77_ex4_iv: ["-2, -1", "-2,-1", "-1, -2", "-2 -1", "-1 -2", "-1,-2"],

  p77_ex5_colder: [
    "kufri",
    "kufri is colder",
    "kufri because -6 < -4",
    "kufri (-6°c is lower)",
    "kufri (-6 < -4)",
    "-6",
    "-6°c",
  ],

  p77_stairs_up: [
    "+",
    "positive",
    "+1, +2, +3",
    "positive integers",
    "+ve",
    "above",
    "plus",
    "up",
  ],
  p77_stairs_down: [
    "-",
    "negative",
    "-1, -2, -3",
    "negative integers",
    "-ve",
    "below",
    "minus",
    "down",
  ],
};

const REVEAL_TEXT: Record<string, string> = {
  p77_dothis_1: ">",
  p77_dothis_2: "<",
  p77_dothis_3: ">",
  p77_dothis_4: "<",

  p77_ex1_i: "<",
  p77_ex1_ii: ">",
  p77_ex1_iii: "<",
  p77_ex1_iv: ">",
  p77_ex1_v: "<",
  p77_ex1_vi: "<",

  p77_ex2_i_inc: "-7, -3, 5",
  p77_ex2_i_dec: "5, -3, -7",
  p77_ex2_ii_inc: "-1, 0, 3",
  p77_ex2_ii_dec: "3, 0, -1",
  p77_ex2_iii_inc: "-6, 1, 3",
  p77_ex2_iii_dec: "3, 1, -6",
  p77_ex2_iv_inc: "-5, -3, -1",
  p77_ex2_iv_dec: "-1, -3, -5",

  p77_ex3_i: "True",
  p77_ex3_ii: "False",
  p77_ex3_iii: "True",
  p77_ex3_iv: "True",
  p77_ex3_v: "False",
  p77_ex3_vi: "False",

  p77_ex4_i: "0",
  p77_ex4_ii: "-4, -3, -2, -1",
  p77_ex4_iii: "-7",
  p77_ex4_iv: "-2, -1",

  p77_ex5_colder: "Kufri (-6°C is colder than -4°C)",

  p77_stairs_up: "+ (Positive)",
  p77_stairs_down: "- (Negative)",
};

const normalize = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/[°º]/g, "")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9\-+><]/g, "");

function validateAnswer(id: string, raw: string): boolean {
  const v = normalize(raw);
  if (!v) return false;
  const accepted = CORRECT[id];
  if (!accepted) return v.length >= 1;
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
        className={`${baseCls} text-center font-bold px-2 py-2 pr-6`}
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
   Stairs & Shop Building Illustration SVG
───────────────────────────────────────────── */
function ShopBuildingSVG() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 my-3">
      <svg viewBox="0 0 260 260" className="w-56 h-auto drop-shadow">
        {/* Building outline */}
        <rect x="30" y="20" width="200" height="220" rx="8" fill="#f8fafc" stroke="#475569" strokeWidth="2.5" />
        
        {/* Floors */}
        {/* Terrace */}
        <rect x="30" y="20" width="200" height="40" fill="#bae6fd" opacity="0.4" />
        <text x="130" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0284c7">
          Terrace (+ steps)
        </text>

        {/* Ground Floor (Shop) */}
        <rect x="30" y="100" width="200" height="60" fill="#fef3c7" opacity="0.6" />
        <line x1="30" y1="100" x2="230" y2="100" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />
        <line x1="30" y1="160" x2="230" y2="160" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />
        <rect x="40" y="112" width="110" height="36" rx="4" fill="#f59e0b" opacity="0.2" stroke="#d97706" />
        <text x="95" y="134" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b45309">
          Shop: Ground Floor (0)
        </text>

        {/* Godown (Basement) */}
        <rect x="30" y="200" width="200" height="40" fill="#fecdd3" opacity="0.4" />
        <text x="130" y="225" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e11d48">
          Godown (- steps)
        </text>

        {/* Stairs Representation */}
        {/* Up to terrace */}
        <g stroke="#0d9488" strokeWidth="2" fill="none">
          <path d="M 160,100 L 160,90 L 175,90 L 175,80 L 190,80 L 190,70 L 205,70 L 205,60" />
        </g>
        <text x="215" y="80" fontSize="10" fontWeight="bold" fill="#0d9488">
          +1, +2...
        </text>

        {/* Down to Godown */}
        <g stroke="#e11d48" strokeWidth="2" fill="none">
          <path d="M 160,160 L 160,170 L 175,170 L 175,180 L 190,180 L 190,190 L 205,190 L 205,200" />
        </g>
        <text x="215" y="185" fontSize="10" fontWeight="bold" fill="#e11d48">
          -1, -2...
        </text>

        {/* Daughter Hasini icon */}
        <circle cx="95" cy="80" r="8" fill="#f43f5e" />
        <path d="M 95,88 L 95,100 L 88,100 M 95,100 L 102,100" stroke="#f43f5e" strokeWidth="2" />
        <text x="95" y="68" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#be123c">
          Hasini
        </text>
      </svg>

      <div className="space-y-2 max-w-md text-xs sm:text-sm">
        <h4 className="font-bold text-foreground">Ground Floor, Terrace & Godown:</h4>
        <p className="text-muted-foreground leading-relaxed">
          Rajesh has a shop on the ground floor. There are stairs going up to the terrace and stairs going down to the godown:
        </p>
        <ul className="space-y-1 text-foreground/80 pl-2">
          <li>• <strong>Ground Floor (Shop):</strong> Zero level (<code className="font-bold text-blue-600">0</code>)</li>
          <li>• <strong>Stairs going up to terrace:</strong> Represented with positive integers (<code className="font-bold text-teal-600">+1, +2, +3...</code>)</li>
          <li>• <strong>Stairs going down to godown:</strong> Represented with negative integers (<code className="font-bold text-rose-600">-1, -2, -3...</code>)</li>
        </ul>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function C6MathsCh6Page5() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch6-page5";

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
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">Comparing & Ordering Integers</h1>
              <p className="text-xs text-emerald-100 font-normal">
                Class 6 Maths &bull; Chapter 6 &bull; Integers
              </p>
            </div>
          </div>
          <span className="text-xs bg-emerald-950/80 text-emerald-200 px-3 py-1 rounded-full border border-emerald-400/30 font-mono self-start sm:self-auto font-bold">
            Page 85
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
        
        {/* Top Section: Do This */}
        <div className="rounded-2xl border-2 border-amber-300 dark:border-amber-700/60 bg-amber-50/40 dark:bg-amber-950/15 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold uppercase rounded-md tracking-wider">
              Do This
            </span>
          </div>

          <p className="text-sm sm:text-base font-semibold text-foreground">
            From the above understanding, fill in the boxes using <code className="font-mono font-bold text-base">&gt;</code> or <code className="font-mono font-bold text-base">&lt;</code> signs:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            {/* 0 ___ -1 */}
            <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border">
              <span className="font-mono font-bold text-base w-8 text-center">0</span>
              <div className="w-24">
                <Field id="p77_dothis_1" placeholder="> or <" {...fp} />
              </div>
              <span className="font-mono font-bold text-base w-8 text-center">-1</span>
            </div>

            {/* -3 ___ -2 */}
            <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border">
              <span className="font-mono font-bold text-base w-8 text-center">-3</span>
              <div className="w-24">
                <Field id="p77_dothis_2" placeholder="> or <" {...fp} />
              </div>
              <span className="font-mono font-bold text-base w-8 text-center">-2</span>
            </div>

            {/* 5 ___ -5 */}
            <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border">
              <span className="font-mono font-bold text-base w-8 text-center">5</span>
              <div className="w-24">
                <Field id="p77_dothis_3" placeholder="> or <" {...fp} />
              </div>
              <span className="font-mono font-bold text-base w-8 text-center">-5</span>
            </div>

            {/* -4 ___ 0 */}
            <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border">
              <span className="font-mono font-bold text-base w-8 text-center">-4</span>
              <div className="w-24">
                <Field id="p77_dothis_4" placeholder="> or <" {...fp} />
              </div>
              <span className="font-mono font-bold text-base w-8 text-center">0</span>
            </div>
          </div>
        </div>

        {/* Section: EXERCISE - 6.2 */}
        <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/20 p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-emerald-200 dark:border-emerald-800/60 pb-3">
            <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold uppercase rounded-md tracking-wider">
              Exercise - 6.2
            </span>
          </div>

          {/* Question 1: Put appropriate symbol > or < */}
          <div className="space-y-4">
            <p className="text-sm sm:text-base font-semibold text-foreground">
              1. Put appropriate symbol <code className="font-mono font-bold">&gt;</code> or <code className="font-mono font-bold">&lt;</code> in the space given between the two integers:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* i */}
              <div className="flex items-center justify-between p-3.5 bg-background rounded-xl border border-border">
                <span className="text-xs font-bold text-teal-700 dark:text-teal-400 w-6">i)</span>
                <span className="font-mono font-bold text-base w-10 text-center">-1</span>
                <div className="w-24"><Field id="p77_ex1_i" placeholder="> or <" {...fp} /></div>
                <span className="font-mono font-bold text-base w-10 text-center">0</span>
              </div>

              {/* ii */}
              <div className="flex items-center justify-between p-3.5 bg-background rounded-xl border border-border">
                <span className="text-xs font-bold text-teal-700 dark:text-teal-400 w-6">ii)</span>
                <span className="font-mono font-bold text-base w-10 text-center">-3</span>
                <div className="w-24"><Field id="p77_ex1_ii" placeholder="> or <" {...fp} /></div>
                <span className="font-mono font-bold text-base w-10 text-center">-7</span>
              </div>

              {/* iii */}
              <div className="flex items-center justify-between p-3.5 bg-background rounded-xl border border-border">
                <span className="text-xs font-bold text-teal-700 dark:text-teal-400 w-6">iii)</span>
                <span className="font-mono font-bold text-base w-10 text-center">-10</span>
                <div className="w-24"><Field id="p77_ex1_iii" placeholder="> or <" {...fp} /></div>
                <span className="font-mono font-bold text-base w-10 text-center">+10</span>
              </div>

              {/* iv */}
              <div className="flex items-center justify-between p-3.5 bg-background rounded-xl border border-border">
                <span className="text-xs font-bold text-teal-700 dark:text-teal-400 w-6">iv)</span>
                <span className="font-mono font-bold text-base w-10 text-center">0</span>
                <div className="w-24"><Field id="p77_ex1_iv" placeholder="> or <" {...fp} /></div>
                <span className="font-mono font-bold text-base w-10 text-center">-5</span>
              </div>

              {/* v */}
              <div className="flex items-center justify-between p-3.5 bg-background rounded-xl border border-border">
                <span className="text-xs font-bold text-teal-700 dark:text-teal-400 w-6">v)</span>
                <span className="font-mono font-bold text-base w-12 text-center">-100</span>
                <div className="w-24"><Field id="p77_ex1_v" placeholder="> or <" {...fp} /></div>
                <span className="font-mono font-bold text-base w-12 text-center">99</span>
              </div>

              {/* vi */}
              <div className="flex items-center justify-between p-3.5 bg-background rounded-xl border border-border">
                <span className="text-xs font-bold text-teal-700 dark:text-teal-400 w-6">vi)</span>
                <span className="font-mono font-bold text-base w-10 text-center">0</span>
                <div className="w-24"><Field id="p77_ex1_vi" placeholder="> or <" {...fp} /></div>
                <span className="font-mono font-bold text-base w-10 text-center">100</span>
              </div>
            </div>
          </div>

          {/* Question 2: Increasing and Decreasing order */}
          <div className="space-y-4 pt-2">
            <p className="text-sm sm:text-base font-semibold text-foreground">
              2. Write the following integers in increasing and decreasing order:
            </p>

            <div className="space-y-3">
              {/* i: -7, 5, -3 */}
              <div className="p-4 bg-background rounded-xl border border-border space-y-3">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-muted text-foreground">
                  i) -7, 5, -3
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground w-24">Increasing:</span>
                    <div className="flex-1"><Field id="p77_ex2_i_inc" placeholder="-7, -3, 5" {...fp} /></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground w-24">Decreasing:</span>
                    <div className="flex-1"><Field id="p77_ex2_i_dec" placeholder="5, -3, -7" {...fp} /></div>
                  </div>
                </div>
              </div>

              {/* ii: -1, 3, 0 */}
              <div className="p-4 bg-background rounded-xl border border-border space-y-3">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-muted text-foreground">
                  ii) -1, 3, 0
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground w-24">Increasing:</span>
                    <div className="flex-1"><Field id="p77_ex2_ii_inc" placeholder="-1, 0, 3" {...fp} /></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground w-24">Decreasing:</span>
                    <div className="flex-1"><Field id="p77_ex2_ii_dec" placeholder="3, 0, -1" {...fp} /></div>
                  </div>
                </div>
              </div>

              {/* iii: 1, 3, -6 */}
              <div className="p-4 bg-background rounded-xl border border-border space-y-3">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-muted text-foreground">
                  iii) 1, 3, -6
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground w-24">Increasing:</span>
                    <div className="flex-1"><Field id="p77_ex2_iii_inc" placeholder="-6, 1, 3" {...fp} /></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground w-24">Decreasing:</span>
                    <div className="flex-1"><Field id="p77_ex2_iii_dec" placeholder="3, 1, -6" {...fp} /></div>
                  </div>
                </div>
              </div>

              {/* iv: -5, -3, -1 */}
              <div className="p-4 bg-background rounded-xl border border-border space-y-3">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-muted text-foreground">
                  iv) -5, -3, -1
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground w-24">Increasing:</span>
                    <div className="flex-1"><Field id="p77_ex2_iv_inc" placeholder="-5, -3, -1" {...fp} /></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground w-24">Decreasing:</span>
                    <div className="flex-1"><Field id="p77_ex2_iv_dec" placeholder="-1, -3, -5" {...fp} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Question 3: True or False */}
          <div className="space-y-4 pt-2">
            <p className="text-sm sm:text-base font-semibold text-foreground">
              3. Write True or False, correct those that are false:
            </p>

            <div className="space-y-2.5">
              {[
                { id: "p77_ex3_i", num: "i", text: "Zero is on the right of -3 on the number line" },
                { id: "p77_ex3_ii", num: "ii", text: "-12 and +12 represent on the number line the same integer" },
                { id: "p77_ex3_iii", num: "iii", text: "Every positive integer is greater than zero" },
                { id: "p77_ex3_iv", num: "iv", text: "-5 < 8" },
                { id: "p77_ex3_v", num: "v", text: "(-100) > (+100)" },
                { id: "p77_ex3_vi", num: "vi", text: "-1 < -8" },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-background rounded-xl border border-border"
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-teal-700 dark:text-teal-400 w-6 shrink-0">{item.num})</span>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                  <div className="w-full sm:w-44">
                    <Field id={item.id} placeholder="True or False" {...fp} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Question 4: Find all integers lying between */}
          <div className="space-y-4 pt-2">
            <p className="text-sm sm:text-base font-semibold text-foreground">
              4. Find all integers which lie between the given two integers. Also represent them on number line:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 bg-background rounded-xl border border-border flex items-center justify-between gap-3">
                <span className="text-sm font-medium">i) -1 and 1:</span>
                <div className="w-36"><Field id="p77_ex4_i" placeholder="e.g. 0" {...fp} /></div>
              </div>

              <div className="p-3.5 bg-background rounded-xl border border-border flex items-center justify-between gap-3">
                <span className="text-sm font-medium">ii) -5 and 0:</span>
                <div className="w-44"><Field id="p77_ex4_ii" placeholder="-4, -3, -2, -1" {...fp} /></div>
              </div>

              <div className="p-3.5 bg-background rounded-xl border border-border flex items-center justify-between gap-3">
                <span className="text-sm font-medium">iii) -6 and -8:</span>
                <div className="w-36"><Field id="p77_ex4_iii" placeholder="e.g. -7" {...fp} /></div>
              </div>

              <div className="p-3.5 bg-background rounded-xl border border-border flex items-center justify-between gap-3">
                <span className="text-sm font-medium">iv) 0 and -3:</span>
                <div className="w-36"><Field id="p77_ex4_iv" placeholder="-2, -1" {...fp} /></div>
              </div>
            </div>
          </div>

          {/* Question 5: Shimla vs Kufri Temperature */}
          <div className="p-4 bg-background rounded-xl border border-border space-y-3">
            <p className="text-sm font-semibold">
              5. The temperature recorded in Shimla is <strong>-4°C</strong> and in Kufri is <strong>-6°C</strong> on the same day. Which place is colder on that day? How?
            </p>
            <Field
              id="p77_ex5_colder"
              placeholder="e.g. Kufri is colder because -6°C < -4°C..."
              isOpen={true}
              {...fp}
            />
          </div>
        </div>

        {/* Section: Do This (Stairs of building) */}
        <div className="rounded-2xl border-2 border-indigo-300 dark:border-indigo-800 bg-indigo-50/30 dark:bg-indigo-950/20 p-6 space-y-5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold uppercase rounded-md tracking-wider">
              Do This
            </span>
          </div>

          <p className="text-sm sm:text-base font-medium">
            Rajesh has a shop on the ground floor of a building. There are stairs going up to the terrace and stairs going down to the godown, where goods are stored. Every day his daughter Hasini, after coming back from school goes up to the terrace to play. She helps father in arranging things in the godown at night.
            <br />
            Observe the picture and try to answer the questions using integers marked on the steps:
          </p>

          <ShopBuildingSVG />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-background rounded-xl border border-border space-y-2">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400">
                1. Sign for steps going up to terrace:
              </span>
              <Field
                id="p77_stairs_up"
                placeholder="+ (Positive integers)"
                isOpen={true}
                {...fp}
              />
            </div>

            <div className="p-4 bg-background rounded-xl border border-border space-y-2">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                2. Sign for steps going down to godown:
              </span>
              <Field
                id="p77_stairs_down"
                placeholder="- (Negative integers)"
                isOpen={true}
                {...fp}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
