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
  "q1_fig_i",
  "q1_fig_ii",
  "q1_fig_iii",
  "q1_fig_iv",
  "q1_fig_v",
  "q2_i",
  "q2_ii",
  "q2_iii",
  "q2_iv",
  "q2_v",
  "q3_interior",
  "q3_boundary",
  "q3_exterior",
];

/* ─────────────────────────────────────────────
   Accepted correct answers
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  // Q2: Open / Closed
  q2_i: ["closed", "closedcurve"],
  q2_ii: ["open", "opencurve"],
  q2_iii: ["closed", "closedcurve"],
  q2_iv: ["open", "opencurve"],
  q2_v: ["open", "opencurve"],
  // Q3: Points (Will be sorted alphabetically for checking)
  q3_interior: ["abegi"], 
  q3_boundary: ["cfk"],
  q3_exterior: ["dj"],
};

/* ─────────────────────────────────────────────
   Reveal text for teacher / answers
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q2_i: "Closed curve",
  q2_ii: "Open curve",
  q2_iii: "Closed curve",
  q2_iv: "Open curve",
  q2_v: "Open curve",
  q3_interior: "A, B, E, G, I",
  q3_boundary: "C, F, K",
  q3_exterior: "D, J",
};

// Normalises and sorts characters so that "E, B, A, G, I" becomes "abegi"
const normalizeAndSort = (s: string) => 
  s.trim().toLowerCase().replace(/[^a-z0-9]/g, "").split('').sort().join('');

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

export function C6MathsCh4Page5() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch4-page5";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<Record<string, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number } | null>(null);

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

  const handleBlur = (id: string, correctAnswers: string[], isOpen = false, sortChars = false) => {
    if (isRevealed) return;
    const rawTyped = answers[id] ?? "";
    const typed = sortChars ? normalizeAndSort(rawTyped) : normalize(rawTyped);
    
    if (!typed && !isOpen) return;
    if (isOpen && !rawTyped.trim()) return;

    const prev = graded[id];
    if (prev && prev.value === typed) return;

    let correct: boolean;
    if (isOpen) {
      correct =
        correctAnswers.some((ans) => typed.includes(sortChars ? normalizeAndSort(ans) : normalize(ans))) ||
        rawTyped.trim().length >= 4;
    } else {
      correct = correctAnswers.some((ans) => (sortChars ? normalizeAndSort(ans) : normalize(ans)) === typed);
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

  const toggleTick = (id: string, isCorrectToTick: boolean) => {
    if (isRevealed) return;
    const isCurrentlyTicked = answers[id] === "true";
    const newState = !isCurrentlyTicked;
    
    setAnswers((prev) => ({ ...prev, [id]: String(newState) }));
    localStorage.setItem(`${storageKey}-${id}-answer`, String(newState));

    const correct = newState === isCorrectToTick;
    const prev = graded[id];

    let delta = 0;
    if (prev) {
      if (!prev.correct && correct) delta = 2;
      else if (prev.correct && !correct) delta = -2;
    } else {
      delta = correct ? 1 : -1;
    }
    
    if (delta !== 0) addPoints(delta);
    
    setFeedback({ correct, id: Date.now() });
    const next = { ...graded, [id]: { value: String(newState), correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${id}-graded`,
      JSON.stringify({ value: String(newState), correct })
    );
  };

  function Field({
    id,
    placeholder,
    correct,
    isOpen = false,
    sortChars = false,
    className = "",
  }: {
    id: string;
    placeholder: string;
    correct: string[];
    isOpen?: boolean;
    sortChars?: boolean;
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
          onBlur={() => handleBlur(id, correct, isOpen, sortChars)}
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

  function TickFigure({
    id,
    label,
    isCorrectToTick,
    children
  }: {
    id: string;
    label: string;
    isCorrectToTick: boolean;
    children: React.ReactNode;
  }) {
    const isTicked = isRevealed ? isCorrectToTick : answers[id] === "true";
    const g = graded[id];
    let ringCls = "border-slate-200 dark:border-slate-800";
    
    if (isRevealed) {
      ringCls = isCorrectToTick ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-slate-200 opacity-50";
    } else if (answers[id] !== undefined) {
      if (g?.correct === true) ringCls = "border-green-500 ring-2 ring-green-500/20 bg-green-50/30";
      else if (g?.correct === false) ringCls = "border-red-400 ring-2 ring-red-400/20 bg-red-50/30";
    }

    return (
      <div 
        onClick={() => toggleTick(id, isCorrectToTick)}
        className={`p-3 rounded-xl border bg-background/60 flex flex-col items-center text-center space-y-2 shadow-sm transition-all cursor-pointer hover:bg-muted/50 ${ringCls}`}
      >
        <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center relative">
          {children}
          {/* Checkbox overlay */}
          <div className={`absolute top-1 right-1 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${isTicked ? 'bg-teal-500 border-teal-500 text-white' : 'bg-white border-slate-300'}`}>
            {isTicked && (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </div>
        </div>
        <span className="font-bold text-sm text-teal-800 dark:text-teal-300">{label}</span>
      </div>
    );
  }

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
          EXERCISE 4.2
      ────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-teal-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-white/20 rounded-lg">📝</span>
            <span>EXERCISE - 4.2</span>
          </div>
          <span className="text-xs bg-teal-800/80 px-2.5 py-1 rounded-full border border-teal-500/30">
            Page 53 / Book P61
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-10">
          
          {/* Question 1: Simple Curves */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs">1</span>
              Tick the figures which are simple curves. (Tap on them)
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <TickFigure id="q1_fig_i" label="(i)" isCorrectToTick={true}>
                <svg className="w-16 h-16" viewBox="0 0 100 100">
                  <polygon points="50,15 90,85 10,85" fill="none" stroke="#0f766e" strokeWidth="3" strokeLinejoin="round" />
                </svg>
              </TickFigure>
              
              <TickFigure id="q1_fig_ii" label="(ii)" isCorrectToTick={true}>
                <svg className="w-16 h-16" viewBox="0 0 100 100">
                  <path d="M 50 15 Q 75 15 75 40 Q 90 45 90 65 Q 90 85 65 85 Q 50 90 35 85 Q 10 85 10 65 Q 10 45 25 40 Q 25 15 50 15 Z" fill="none" stroke="#0f766e" strokeWidth="3" strokeLinejoin="round" />
                </svg>
              </TickFigure>
              
              <TickFigure id="q1_fig_iii" label="(iii)" isCorrectToTick={true}>
                <svg className="w-16 h-16" viewBox="0 0 100 100">
                  <path d="M 50 50 Q 60 50 60 40 Q 60 30 45 30 Q 30 30 30 50 Q 30 70 55 70 Q 75 70 75 45 Q 75 20 40 20 Q 15 20 15 55 Q 15 85 60 85" fill="none" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </TickFigure>
              
              <TickFigure id="q1_fig_iv" label="(iv)" isCorrectToTick={true}>
                <svg className="w-16 h-16" viewBox="0 0 100 100">
                  <polygon points="50,15 85,35 85,75 50,90 15,45" fill="none" stroke="#0f766e" strokeWidth="3" strokeLinejoin="round" />
                </svg>
              </TickFigure>
              
              <TickFigure id="q1_fig_v" label="(v)" isCorrectToTick={true}>
                <svg className="w-16 h-16" viewBox="0 0 100 100">
                  <path d="M 15 15 L 85 15 L 85 85 L 30 85 L 30 30 L 70 30 L 70 70 L 45 70 L 45 45 L 55 45" fill="none" stroke="#0f766e" strokeWidth="3" strokeLinejoin="miter" />
                </svg>
              </TickFigure>
            </div>
          </div>

          <div className="w-full h-px bg-border/60" />

          {/* Question 2: Open vs Closed */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs">2</span>
              State which curves are open and which are closed
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {/* Figure (i) */}
              <div className="p-3 rounded-xl border border-border bg-background/60 flex flex-col items-center text-center space-y-2 shadow-sm">
                <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                  <svg className="w-16 h-16" viewBox="0 0 100 100">
                    <path d="M 50 50 C 70 30 70 10 50 10 C 30 10 30 30 50 50 C 70 70 70 90 50 90 C 30 90 30 70 50 50 Z" fill="none" stroke="#0f766e" strokeWidth="3" />
                  </svg>
                </div>
                <span className="font-bold text-sm text-teal-800 dark:text-teal-300">(i)</span>
                <Field id="q2_i" placeholder="Open/Closed" correct={CORRECT.q2_i} />
              </div>
              
              {/* Figure (ii) */}
              <div className="p-3 rounded-xl border border-border bg-background/60 flex flex-col items-center text-center space-y-2 shadow-sm">
                <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                  <svg className="w-16 h-16" viewBox="0 0 100 100">
                    <path d="M 20 80 L 20 40 L 50 40 L 50 70 L 80 70 L 80 20 L 50 20" fill="none" stroke="#0f766e" strokeWidth="3" strokeLinejoin="miter" />
                  </svg>
                </div>
                <span className="font-bold text-sm text-teal-800 dark:text-teal-300">(ii)</span>
                <Field id="q2_ii" placeholder="Open/Closed" correct={CORRECT.q2_ii} />
              </div>
              
              {/* Figure (iii) */}
              <div className="p-3 rounded-xl border border-border bg-background/60 flex flex-col items-center text-center space-y-2 shadow-sm">
                <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                  <svg className="w-16 h-16" viewBox="0 0 100 100">
                    <polygon points="50,15 85,80 15,80" fill="none" stroke="#0f766e" strokeWidth="3" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-bold text-sm text-teal-800 dark:text-teal-300">(iii)</span>
                <Field id="q2_iii" placeholder="Open/Closed" correct={CORRECT.q2_iii} />
              </div>
              
              {/* Figure (iv) */}
              <div className="p-3 rounded-xl border border-border bg-background/60 flex flex-col items-center text-center space-y-2 shadow-sm">
                <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                  <svg className="w-16 h-16" viewBox="0 0 100 100">
                    <path d="M 15 80 L 15 40 L 50 80 L 85 40 L 85 80" fill="none" stroke="#0f766e" strokeWidth="3" strokeLinejoin="miter" />
                  </svg>
                </div>
                <span className="font-bold text-sm text-teal-800 dark:text-teal-300">(iv)</span>
                <Field id="q2_iv" placeholder="Open/Closed" correct={CORRECT.q2_iv} />
              </div>
              
              {/* Figure (v) */}
              <div className="p-3 rounded-xl border border-border bg-background/60 flex flex-col items-center text-center space-y-2 shadow-sm">
                <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                  <svg className="w-16 h-16" viewBox="0 0 100 100">
                    <path d="M 20 20 L 20 80 L 80 80 L 80 20" fill="none" stroke="#0f766e" strokeWidth="3" strokeLinejoin="miter" />
                  </svg>
                </div>
                <span className="font-bold text-sm text-teal-800 dark:text-teal-300">(v)</span>
                <Field id="q2_v" placeholder="Open/Closed" correct={CORRECT.q2_v} />
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border/60" />

          {/* Question 3: Points in Region */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs">3</span>
              Name the points that lie in the interior, on the boundary and in the exterior of the figure.
            </h4>

            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Interactive map / polygon */}
              <div className="w-full max-w-sm shrink-0 bg-white dark:bg-slate-900 rounded-xl border shadow-sm p-4 flex items-center justify-center relative">
                <svg className="w-full h-auto" viewBox="0 0 200 200">
                  {/* The irregular shape (Boundary) */}
                  <path 
                    d="M 60 40 L 120 20 L 170 80 L 150 150 L 90 170 L 40 120 Z" 
                    fill="#14b8a6" 
                    fillOpacity="0.2"
                    stroke="#0d9488" 
                    strokeWidth="3" 
                    strokeLinejoin="round" 
                  />
                  
                  {/* Boundary points */}
                  <circle cx="60" cy="40" r="4" fill="#0d9488" />
                  <text x="45" y="35" fontSize="12" fontWeight="bold" fill="#0f766e">K</text>
                  
                  <circle cx="145" cy="50" r="4" fill="#0d9488" />
                  <text x="135" y="45" fontSize="12" fontWeight="bold" fill="#0f766e">C</text>
                  
                  <circle cx="150" cy="150" r="4" fill="#0d9488" />
                  <text x="160" y="160" fontSize="12" fontWeight="bold" fill="#0f766e">F</text>
                  
                  {/* Interior points */}
                  <circle cx="90" cy="70" r="4" fill="#ef4444" />
                  <text x="98" y="75" fontSize="12" fontWeight="bold" fill="#b91c1c">A</text>
                  
                  <circle cx="130" cy="100" r="4" fill="#ef4444" />
                  <text x="140" y="105" fontSize="12" fontWeight="bold" fill="#b91c1c">B</text>

                  <circle cx="80" cy="110" r="4" fill="#ef4444" />
                  <text x="88" y="115" fontSize="12" fontWeight="bold" fill="#b91c1c">E</text>

                  <circle cx="110" cy="140" r="4" fill="#ef4444" />
                  <text x="118" y="145" fontSize="12" fontWeight="bold" fill="#b91c1c">G</text>

                  <circle cx="100" cy="40" r="4" fill="#ef4444" />
                  <text x="108" y="45" fontSize="12" fontWeight="bold" fill="#b91c1c">I</text>

                  {/* Exterior points */}
                  <circle cx="30" cy="80" r="4" fill="#3b82f6" />
                  <text x="15" y="85" fontSize="12" fontWeight="bold" fill="#1d4ed8">D</text>

                  <circle cx="180" cy="120" r="4" fill="#3b82f6" />
                  <text x="188" y="125" fontSize="12" fontWeight="bold" fill="#1d4ed8">J</text>
                </svg>
              </div>

              {/* Input fields */}
              <div className="w-full space-y-4">
                <div className="space-y-1 bg-red-50 dark:bg-red-950/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30">
                  <label className="text-xs font-bold text-red-800 dark:text-red-400">Interior (inside) points:</label>
                  <Field id="q3_interior" placeholder="e.g. A, B, C" correct={CORRECT.q3_interior} sortChars />
                </div>
                
                <div className="space-y-1 bg-teal-50 dark:bg-teal-950/20 p-3 rounded-xl border border-teal-100 dark:border-teal-900/30">
                  <label className="text-xs font-bold text-teal-800 dark:text-teal-400">On the boundary:</label>
                  <Field id="q3_boundary" placeholder="e.g. A, B, C" correct={CORRECT.q3_boundary} sortChars />
                </div>

                <div className="space-y-1 bg-blue-50 dark:bg-blue-950/20 p-3 rounded-xl border border-blue-100 dark:border-blue-900/30">
                  <label className="text-xs font-bold text-blue-800 dark:text-blue-400">Exterior (outside) points:</label>
                  <Field id="q3_exterior" placeholder="e.g. A, B, C" correct={CORRECT.q3_exterior} sortChars />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border/60" />

          {/* Question 4: Draw closed figures */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs">4</span>
              Draw three simple closed figures:
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border bg-background/50 flex flex-col space-y-3">
                <span className="text-sm font-semibold text-foreground">
                  i) by straight lines only
                </span>
                <p className="text-xs text-muted-foreground">
                  (Try drawing in your notebook! A polygon is a simple closed figure made of straight lines.)
                </p>
                <div className="mt-2 w-full h-32 bg-white dark:bg-slate-900 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center gap-4">
                  {/* Examples for straight lines */}
                  <svg className="w-16 h-16 opacity-50" viewBox="0 0 100 100">
                    <polygon points="50,15 85,85 15,85" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
                  </svg>
                  <svg className="w-16 h-16 opacity-50" viewBox="0 0 100 100">
                    <polygon points="20,20 80,20 80,80 20,80" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
                  </svg>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-background/50 flex flex-col space-y-3">
                <span className="text-sm font-semibold text-foreground">
                  ii) by straight lines and curved lines both
                </span>
                <p className="text-xs text-muted-foreground">
                  (Try drawing in your notebook! It should contain at least one curve and one straight segment.)
                </p>
                <div className="mt-2 w-full h-32 bg-white dark:bg-slate-900 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center gap-4">
                  {/* Examples for straight + curved */}
                  <svg className="w-16 h-16 opacity-50" viewBox="0 0 100 100">
                    <path d="M 20 20 L 80 20 A 30 30 0 0 1 80 80 L 20 80 Z" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
                  </svg>
                  <svg className="w-16 h-16 opacity-50" viewBox="0 0 100 100">
                    <path d="M 50 20 L 80 80 Q 50 110 20 80 Z" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
