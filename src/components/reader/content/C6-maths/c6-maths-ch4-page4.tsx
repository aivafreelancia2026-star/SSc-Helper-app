"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input field IDs
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  // THINK, DISCUSS AND WRITE - Q1 (Letters: D, C, O, L, M)
  "q_tdw_letter_D",
  "q_tdw_letter_C",
  "q_tdw_letter_O",
  "q_tdw_letter_L",
  "q_tdw_letter_M",
  // THINK, DISCUSS AND WRITE - Q2
  "q_tdw_simple_letters",
  // TRY THESE - Figures 1 to 4
  "q_try_fig_1",
  "q_try_fig_2",
  "q_try_fig_3",
  "q_try_fig_4",
  // POLYGONS Observation
  "q_poly_def",
  "q_poly_identify",
];

/* ─────────────────────────────────────────────
   Accepted correct answers (normalised)
   NOTE: normalize() strips everything except a-z and 0-9,
   so "C, O" → "co", "closed curve" → "closedcurve" etc.
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  // TDW - Open / Closed (letter D ends meet → closed; C ends don't meet → open; etc.)
  q_tdw_letter_D: ["closed", "closedcurve"],
  q_tdw_letter_C: ["open", "opencurve"],
  q_tdw_letter_O: ["closed", "closedcurve"],
  q_tdw_letter_L: ["open", "opencurve"],
  q_tdw_letter_M: ["open", "opencurve"],

  // TDW - Q2: Which letters are simple curves (don't cross themselves)?
  // All five (D, C, O, L, M) are simple because none cross themselves.
  // After normalize: "D, C, O, L, M" → "dcolm", "all" → "all", etc.
  q_tdw_simple_letters: [
    "dcolm", "dclom", "dlcom", "colm", "clom",
    "all", "allletters", "allaresimple", "allfiveletters",
    "dcolm5", "dcol", "dolcm",
  ],

  // TRY THESE - Simple vs Not Simple
  q_try_fig_1: ["simple", "simplecurve", "simpleclosedcurve", "yes"],
  q_try_fig_2: ["simple", "simplecurve", "simpleclosedcurve", "yes"],
  q_try_fig_3: ["notsimple", "notasimplecurve", "notsimplecurve", "no", "crossesitself"],
  q_try_fig_4: ["notsimple", "notasimplecurve", "notsimplecurve", "no", "crossesitself"],

  // POLYGONS
  q_poly_def: [
    "linesegments", "linesegment", "segments", "straightlines",
    "onlylinesegments", "madeoflinesegments", "straightlinesegments",
  ],
  // Figures (i) pentagon, (ii) triangle, (iv) quadrilateral are polygons.
  // (iii) is open, (v) has a curved side — NOT polygons.
  // After normalize: "(i), (ii), (iv)" → "iiiv", "1, 2, 4" → "124", etc.
  q_poly_identify: [
    "iiiv", "iiiiv", "124", "1and2and4", "iiiandiv",
    "iiandiv", "figureiiiiv", "pentagontrianglequadrilateral",
  ],
};

/* ─────────────────────────────────────────────
   Reveal text for teacher / answers
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_tdw_letter_D: "Closed curve (the starting and ending points of the stroke meet)",
  q_tdw_letter_C: "Open curve (the two ends of the letter do not meet)",
  q_tdw_letter_O: "Closed curve (the stroke starts and ends at the same point)",
  q_tdw_letter_L: "Open curve (the two ends of the letter do not meet)",
  q_tdw_letter_M: "Open curve (the two ends of the letter do not meet)",
  q_tdw_simple_letters: "All five letters D, C, O, L, M are simple curves — none of them cross themselves while being drawn.",
  q_try_fig_1: "Simple curve — it does not cross itself at any point.",
  q_try_fig_2: "Simple curve — it does not cross itself at any point.",
  q_try_fig_3: "Not a simple curve — the three overlapping circles cross each other at multiple points.",
  q_try_fig_4: "Not a simple curve — the lines cross each other at the centre forming an X intersection.",
  q_poly_def: "A polygon is a simple closed curve made up entirely of line segments (no curved sides).",
  q_poly_identify: "Figures (i) Pentagon, (ii) Triangle, and (iv) Quadrilateral are polygons. Figure (iii) is open and (v) has a curved side.",
};

const normalize = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

function borderCls(
  id: string,
  answers: Record<string, string>,
  graded: Record<string, { value: string; correct: boolean }>,
  isRevealed: boolean
) {
  if (isRevealed)
    return "border-emerald-500 bg-emerald-50 font-bold text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300";
  const typed = (answers[id] ?? "").trim();
  if (!typed) return "border-slate-300 focus:border-teal-500 bg-background";
  const g = graded[id];
  if (g?.correct === true)
    return "border-green-500 bg-green-50 text-green-700 font-bold dark:bg-green-950/30 dark:text-green-300";
  if (g?.correct === false)
    return "border-red-400 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400";
  return "border-slate-300 focus:border-teal-500 bg-background";
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

export function C6MathsCh4Page4() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch4-page4";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<Record<string, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number } | null>(null);

  // Selected curve filter for the 7 intro curves
  const [curveFilter, setCurveFilter] = useState<"all" | "open" | "closed" | "simple" | "crossed">("all");

  /* Restore from localStorage on mount */
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

  /* Reset handler */
  useEffect(() => {
    const handleReset = () => {
      ALL_INPUT_IDS.forEach((id) => {
        localStorage.removeItem(`${storageKey}-${id}-answer`);
        localStorage.removeItem(`${storageKey}-${id}-graded`);
      });
      setAnswers({});
      setGraded({});
      setFeedback(null);
    };
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () => window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, [storageKey]);

  const handleChange = (id: string, val: string) => {
    if (isRevealed) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
    localStorage.setItem(`${storageKey}-${id}-answer`, val);
  };

  const handleBlur = (id: string, correctAnswers: string[], isOpen = false) => {
    if (isRevealed) return;
    const rawTyped = answers[id] ?? "";
    const typed = normalize(rawTyped);
    if (!typed && !isOpen) return;
    if (isOpen && !rawTyped.trim()) return;

    const prev = graded[id];
    if (prev && prev.value === typed) return;

    let correct: boolean;
    if (isOpen) {
      correct =
        correctAnswers.some((ans) => typed.includes(normalize(ans))) ||
        rawTyped.trim().length >= 4;
    } else {
      correct = correctAnswers.some((ans) => normalize(ans) === typed);
    }

    let delta = 0;
    if (prev) {
      if (!prev.correct && correct) delta = 2;
      else if (prev.correct && !correct) delta = -2;
    } else {
      delta = correct ? 1 : -1;
    }
    if (delta !== 0) addPoints(delta);

    setFeedback({ correct, id: Date.now() });
    const next = { ...graded, [id]: { value: typed, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${id}-graded`,
      JSON.stringify({ value: typed, correct })
    );
  };

  function Field({
    id,
    placeholder,
    correct,
    isOpen = false,
    className = "",
  }: {
    id: string;
    placeholder: string;
    correct: string[];
    isOpen?: boolean;
    className?: string;
  }) {
    return (
      <div className={`relative w-full ${className}`}>
        <input
          type="text"
          id={`field-${id}`}
          placeholder={placeholder}
          value={isRevealed ? REVEAL_TEXT[id] ?? "" : answers[id] ?? ""}
          onChange={(e) => handleChange(id, e.target.value)}
          onBlur={() => handleBlur(id, correct, isOpen)}
          disabled={isRevealed}
          className={`w-full rounded-xl border px-3 py-2 pr-7 text-xs sm:text-sm font-mono outline-none transition-all shadow-sm ${borderCls(
            id,
            answers,
            graded,
            isRevealed
          )}`}
        />
        <StatusIcon id={id} answers={answers} graded={graded} isRevealed={isRevealed} />
      </div>
    );
  }

  // 7 Intro Curves Data
  const INTRO_CURVES = [
    { id: "i", title: "(i)", type: "open", simple: true, svg: (
      <svg className="w-16 h-16" viewBox="0 0 80 80">
        <path d="M 20 60 Q 30 10 50 30 T 40 70" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ), desc: "Open curve (Ends don't meet)" },
    { id: "ii", title: "(ii)", type: "closed", simple: true, svg: (
      <svg className="w-16 h-16" viewBox="0 0 80 80">
        <path d="M 25 15 L 60 15 L 60 30 L 40 30 L 40 50 L 60 50 L 60 65 L 25 65 Z" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    ), desc: "Closed curve (Ends meet)" },
    { id: "iii", title: "(iii)", type: "closed", simple: false, svg: (
      <svg className="w-16 h-16" viewBox="0 0 80 80">
        <polygon points="20,20 60,20 20,60 60,60" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    ), desc: "Crosses itself (Not simple)" },
    { id: "iv", title: "(iv)", type: "open", simple: true, svg: (
      <svg className="w-16 h-16" viewBox="0 0 80 80">
        <line x1="20" y1="60" x2="60" y2="20" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="30" cy="50" r="3" fill="#0f766e" />
        <text x="24" y="44" fontSize="10" fontWeight="bold" fill="#0f766e">A</text>
        <circle cx="50" cy="30" r="3" fill="#0f766e" />
        <text x="54" y="34" fontSize="10" fontWeight="bold" fill="#0f766e">B</text>
      </svg>
    ), desc: "Straight line (Open curve in maths)" },
    { id: "v", title: "(v)", type: "open", simple: true, svg: (
      <svg className="w-16 h-16" viewBox="0 0 80 80">
        <path d="M 40 15 C 30 30 50 45 40 65" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3,3" />
        <circle cx="40" cy="15" r="2.5" fill="#0d9488" />
        <circle cx="40" cy="65" r="2.5" fill="#0d9488" />
      </svg>
    ), desc: "Wavy path (Open curve)" },
    { id: "vi", title: "(vi)", type: "closed", simple: true, svg: (
      <svg className="w-16 h-16" viewBox="0 0 80 80">
        <path d="M 20 60 Q 55 65 65 30 Q 40 50 20 60 Z" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    ), desc: "Crescent (Closed simple curve)" },
    { id: "vii", title: "(vii)", type: "open", simple: false, svg: (
      <svg className="w-16 h-16" viewBox="0 0 80 80">
        <path d="M 25 55 C 20 20 60 20 30 65 C 50 65 65 40 55 15" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ), desc: "Crosses itself (Not simple curve)" },
  ];

  return (
    <div className="space-y-8 text-foreground leading-relaxed font-body max-w-5xl mx-auto pb-12">
      {feedback && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* ──────────────────────────────────────────────────────────
          4.6 CURVE INTRODUCTION & EXAMPLES
      ────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-teal-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono text-sm">4.6</span>
            <span>CURVE</span>
          </div>
          <span className="text-xs bg-teal-800/80 px-2.5 py-1 rounded-full border border-teal-500/30 font-mono">
            Page 52 / Book P60
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-6 text-sm sm:text-base">
          <p className="text-foreground">
            Have you seen drawings of kids? Here are some examples of curves drawn on paper:
          </p>

          {/* Interactive filter buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="text-muted-foreground mr-1">Filter by type:</span>
            {[
              { id: "all", label: "All Curves" },
              { id: "open", label: "Open Curves" },
              { id: "closed", label: "Closed Curves" },
              { id: "simple", label: "Simple (No self-crossing)" },
              { id: "crossed", label: "Crossed (Not Simple)" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setCurveFilter(f.id as any)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  curveFilter === f.id
                    ? "bg-teal-600 text-white shadow"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* 7 Curves Visual Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {INTRO_CURVES.map((c) => {
              const isMatch =
                curveFilter === "all" ||
                (curveFilter === "open" && c.type === "open") ||
                (curveFilter === "closed" && c.type === "closed") ||
                (curveFilter === "simple" && c.simple) ||
                (curveFilter === "crossed" && !c.simple);

              return (
                <div
                  key={c.id}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-between text-center transition-all ${
                    isMatch
                      ? "border-teal-400 bg-white dark:bg-slate-900 shadow-sm"
                      : "opacity-30 border-dashed bg-muted/20"
                  }`}
                >
                  <span className="font-bold text-xs text-teal-800 dark:text-teal-300 font-mono mb-1">{c.title}</span>
                  <div className="flex items-center justify-center my-1">{c.svg}</div>
                  <span className="text-[10px] text-muted-foreground font-medium leading-tight mt-1">
                    {c.desc}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Key Observations Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-800/60 bg-teal-50/50 dark:bg-teal-950/20 space-y-2">
              <h4 className="font-bold text-teal-900 dark:text-teal-200 flex items-center gap-1.5">
                <span>🔄</span> Open vs Closed Curve
              </h4>
              <p className="text-foreground/90">
                • <strong>Figure (ii)</strong> is called a <u>closed curve</u> because its two ends meet.<br />
                • <strong>Figure (i)</strong> is called an <u>open curve</u> because its two ends do not meet.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-2">
              <h4 className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                <span>✂️</span> Simple Curves
              </h4>
              <p className="text-foreground/90">
                • Figures <strong>(iii)</strong> and <strong>(vii)</strong> cross themselves (not simple).<br />
                • Figures <strong>(i), (ii), (iv), (v), (vi)</strong> do not cross themselves — these are called <strong>simple curves</strong>.
              </p>
            </div>
          </div>

          <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30 p-3.5 text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-100">
            💡 <strong>Mathematical Fact:</strong> In everyday language, &apos;curve&apos; means not straight. But in mathematics, a straight line is also considered a curve!
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          THINK, DISCUSS AND WRITE
      ────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-emerald-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-emerald-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-white/20 rounded-lg">💭</span>
            <span>THINK, DISCUSS AND WRITE</span>
          </div>
          <span className="text-xs bg-emerald-800/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
            Alphabet Curves
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-6 text-sm sm:text-base">
          {/* Question 1: Letter Shapes Open vs Closed */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">1</span>
              Move your pencil along the following English letters and state which are open and which are closed:
            </h4>

            {/* Letter Cards with Inputs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                { letter: "D", id: "q_tdw_letter_D", stroke: "M 20 15 L 20 65 Q 60 40 20 15 Z" },
                { letter: "C", id: "q_tdw_letter_C", stroke: "M 55 20 C 20 15 20 65 55 60" },
                { letter: "O", id: "q_tdw_letter_O", stroke: "M 40 15 C 15 15 15 65 40 65 C 65 65 65 15 40 15 Z" },
                { letter: "L", id: "q_tdw_letter_L", stroke: "M 25 15 L 25 65 L 60 65" },
                { letter: "M", id: "q_tdw_letter_M", stroke: "M 20 65 L 20 15 L 40 45 L 60 15 L 60 65" },
              ].map((item) => (
                <div
                  key={item.letter}
                  className="p-3 rounded-xl border border-border bg-background/60 flex flex-col items-center text-center space-y-2 shadow-sm"
                >
                  <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 80 80">
                      <path d={item.stroke} fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-heading font-bold text-lg text-emerald-800 dark:text-emerald-300">
                    Letter &apos;{item.letter}&apos;
                  </span>
                  <Field
                    id={item.id}
                    placeholder="Open / Closed"
                    correct={CORRECT[item.id]}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Question 2: Simple curve letters */}
          <div className="p-4 rounded-xl border border-border bg-background/50 space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
              <span>Tell which letter is an example of simple curve:</span>
            </label>
            <Field
              id="q_tdw_simple_letters"
              placeholder="e.g. C, O, L, M, D (They do not cross themselves)"
              correct={CORRECT.q_tdw_simple_letters}
              isOpen
            />
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          TRY THESE SECTION
      ────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-cyan-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-cyan-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-white/20 rounded-lg">🚀</span>
            <span>TRY THESE</span>
          </div>
          <span className="text-xs bg-cyan-800/80 px-2.5 py-1 rounded-full border border-cyan-500/30">
            Identify Simple vs Not Simple
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <p className="font-semibold text-foreground text-sm">
            Identify which are simple curves and which are not:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Try 1: Diamond Star */}
            <div className="p-4 rounded-xl border border-border bg-background flex flex-col items-center text-center space-y-3">
              <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300">Figure 1</span>
              <div className="w-28 h-24 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                <svg className="w-20 h-20" viewBox="0 0 100 100">
                  <path d="M 50 10 Q 50 50 90 50 Q 50 50 50 90 Q 50 50 10 50 Q 50 50 50 10 Z" fill="none" stroke="#0284c7" strokeWidth="2.5" />
                </svg>
              </div>
              <Field
                id="q_try_fig_1"
                placeholder="Simple / Not simple"
                correct={CORRECT.q_try_fig_1}
              />
            </div>

            {/* Try 2: Curved dumbbell */}
            <div className="p-4 rounded-xl border border-border bg-background flex flex-col items-center text-center space-y-3">
              <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300">Figure 2</span>
              <div className="w-28 h-24 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                <svg className="w-20 h-20" viewBox="0 0 100 100">
                  <path d="M 30 20 Q 50 30 70 20 Q 60 50 70 80 Q 50 70 30 80 Q 40 50 30 20 Z" fill="none" stroke="#0284c7" strokeWidth="2.5" />
                </svg>
              </div>
              <Field
                id="q_try_fig_2"
                placeholder="Simple / Not simple"
                correct={CORRECT.q_try_fig_2}
              />
            </div>

            {/* Try 3: Triple Loops (Overlapping) */}
            <div className="p-4 rounded-xl border border-border bg-background flex flex-col items-center text-center space-y-3">
              <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300">Figure 3</span>
              <div className="w-28 h-24 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                <svg className="w-24 h-16" viewBox="0 0 120 70">
                  <circle cx="35" cy="35" r="22" fill="none" stroke="#0284c7" strokeWidth="2" />
                  <circle cx="60" cy="35" r="22" fill="none" stroke="#0284c7" strokeWidth="2" />
                  <circle cx="85" cy="35" r="22" fill="none" stroke="#0284c7" strokeWidth="2" />
                </svg>
              </div>
              <Field
                id="q_try_fig_3"
                placeholder="Simple / Not simple"
                correct={CORRECT.q_try_fig_3}
              />
            </div>

            {/* Try 4: Hourglass / Intersecting Triangles */}
            <div className="p-4 rounded-xl border border-border bg-background flex flex-col items-center text-center space-y-3">
              <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300">Figure 4</span>
              <div className="w-28 h-24 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                <svg className="w-20 h-20" viewBox="0 0 100 100">
                  <polygon points="20,20 80,20 20,80 80,80" fill="none" stroke="#0284c7" strokeWidth="2.5" />
                </svg>
              </div>
              <Field
                id="q_try_fig_4"
                placeholder="Simple / Not simple"
                correct={CORRECT.q_try_fig_4}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          POLYGONS INTRODUCTION
      ────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-purple-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-purple-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-white/20 rounded-lg">📐</span>
            <span>POLYGONS</span>
          </div>
          <span className="text-xs bg-purple-800/80 px-2.5 py-1 rounded-full border border-purple-500/30">
            Geometric Shapes
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-6 text-sm sm:text-base">
          <p className="font-semibold text-foreground">
            Look at these following figures:
          </p>

          {/* 5 Polygons / Shapes row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {/* Shape (i) Pentagon */}
            <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900 text-center flex flex-col items-center">
              <svg className="w-20 h-20" viewBox="0 0 100 100">
                <polygon points="50,15 90,45 75,85 25,85 10,45" fill="none" stroke="#7e22ce" strokeWidth="2.5" />
              </svg>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 mt-1 font-mono">(i)</span>
              <span className="text-[10px] text-muted-foreground">5 Line Segments</span>
            </div>

            {/* Shape (ii) Triangle */}
            <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900 text-center flex flex-col items-center">
              <svg className="w-20 h-20" viewBox="0 0 100 100">
                <polygon points="50,15 85,85 15,85" fill="none" stroke="#7e22ce" strokeWidth="2.5" />
              </svg>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 mt-1 font-mono">(ii)</span>
              <span className="text-[10px] text-muted-foreground">3 Line Segments</span>
            </div>

            {/* Shape (iii) Open with jagged teeth */}
            <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900 text-center flex flex-col items-center">
              <svg className="w-20 h-20" viewBox="0 0 100 100">
                <path d="M 20 85 L 20 15 L 65 15 L 65 40 L 85 50 L 65 60 L 65 85" fill="none" stroke="#7e22ce" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 mt-1 font-mono">(iii)</span>
              <span className="text-[10px] text-muted-foreground">Open Figure</span>
            </div>

            {/* Shape (iv) Trapezium / Quadrilateral */}
            <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900 text-center flex flex-col items-center">
              <svg className="w-20 h-20" viewBox="0 0 100 100">
                <polygon points="25,30 85,30 75,80 15,80" fill="none" stroke="#7e22ce" strokeWidth="2.5" />
              </svg>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 mt-1 font-mono">(iv)</span>
              <span className="text-[10px] text-muted-foreground">4 Line Segments</span>
            </div>

            {/* Shape (v) Combined straight + curve */}
            <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900 text-center flex flex-col items-center">
              <svg className="w-20 h-20" viewBox="0 0 100 100">
                <path d="M 20 20 L 60 20 C 85 20 85 80 60 80 L 20 80 Z" fill="none" stroke="#7e22ce" strokeWidth="2.5" strokeLinejoin="round" />
              </svg>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 mt-1 font-mono">(v)</span>
              <span className="text-[10px] text-muted-foreground">Contains Curved Side</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-100 text-xs sm:text-sm font-semibold">
            ✨ <strong>Definition of a Polygon:</strong> A simple closed figure formed entirely of <u>line segments</u> is called a polygon.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                What are polygons made up of?
              </label>
              <Field
                id="q_poly_def"
                placeholder="e.g. Line segments / Straight lines"
                correct={CORRECT.q_poly_def}
                isOpen
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                Which of the figures (i to v) are polygons?
              </label>
              <Field
                id="q_poly_identify"
                placeholder="e.g. (i), (ii), (iv)"
                correct={CORRECT.q_poly_identify}
                isOpen
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
