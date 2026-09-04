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
  "q2_angle_1",
  "q2_angle_2",
  "q2_angle_3",
  "q2_angle_4",
  "q3_point_on_arm",
  "q3_point_interior_doe",
  "q3_point_exterior_eof",
  "q4_fig_i",
  "q4_fig_ii",
  "q4_fig_iii",
  "q4_fig_iv",
  "q_min_sticks",
  "q_interior_points",
  "q_boundary_points",
];

/* ─────────────────────────────────────────────
   Accepted correct answers
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  // Question 2: 4 angles in quadrilateral ABCD
  q2_angle_1: ["a", "anglea", "dab", "bad", "angledab", "anglebad", "dabangle", "badangle", "∠a", "∠dab", "∠bad"],
  q2_angle_2: ["b", "angleb", "abc", "cba", "angleabc", "anglecba", "abcangle", "cbaangle", "∠b", "∠abc", "∠cba"],
  q2_angle_3: ["c", "anglec", "bcd", "dcb", "anglebcd", "angledcb", "bcdangle", "dcbangle", "∠c", "∠bcd", "∠dcb"],
  q2_angle_4: ["d", "angled", "cda", "adc", "anglecda", "angleadc", "cdaangle", "adcangle", "∠d", "∠cda", "∠adc"],

  // Question 3: Point deduction based on angle conditions
  q3_point_on_arm: ["b", "pointb"],
  q3_point_interior_doe: ["a", "pointa"],
  q3_point_exterior_eof: ["c", "pointc", "a", "pointa", "ca", "ac", "c,a", "a,c"],

  // Matchstick question
  q_min_sticks: ["3", "three"],
  
  // Triangle PQR interior (O, S)
  q_interior_points: ["s", "points", "so", "os"],
  
  // Triangle boundary points (Q, R, M)
  q_boundary_points: ["mqr", "qr"],
};

/* ─────────────────────────────────────────────
   Reveal text for teacher / answers
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q2_angle_1: "∠A (or ∠DAB)",
  q2_angle_2: "∠B (or ∠ABC)",
  q2_angle_3: "∠C (or ∠BCD)",
  q2_angle_4: "∠D (or ∠CDA)",
  q3_point_on_arm: "Point B (lies on ray OE)",
  q3_point_interior_doe: "Point A (in interior of ∠DOE)",
  q3_point_exterior_eof: "Point C (in exterior of ∠EOF)",
  q_min_sticks: "3 match sticks",
  q_interior_points: "Point S",
  q_boundary_points: "Q, R, M",
};

// Normalises and sorts characters for unordered checks if needed
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

export function C6MathsCh4Page7() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch4-page7";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<Record<string, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number } | null>(null);

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

  // Interactive points marker for Question 3
  const [placedPoints, setPlacedPoints] = useState<Record<string, {x: number, y: number}>>({});
  const [activePoint, setActivePoint] = useState<string | null>(null);

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isRevealed || !activePoint) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Scale to viewBox (200x200)
    const scaleX = 300 / rect.width;
    const scaleY = 250 / rect.height;
    
    setPlacedPoints(prev => ({...prev, [activePoint]: {x: x * scaleX, y: y * scaleY}}));
    setActivePoint(null); // deselect after placing
  };

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
          EXERCISE 4.3 (Continued)
      ────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-indigo-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-indigo-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-white/20 rounded-lg">✏️</span>
            <span>EXERCISE - 4.3 (Continued)</span>
          </div>
          <span className="text-xs bg-indigo-800/80 px-2.5 py-1 rounded-full border border-indigo-500/30">
            Page 55 / Book P63
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-10">
          
          {/* Question 2 */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">2</span>
              Name the four angles formed in the figure.
            </h4>
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-full max-w-[200px] bg-white dark:bg-slate-900 rounded-xl border p-4 flex justify-center shrink-0">
                <svg className="w-full h-auto max-w-[150px]" viewBox="0 0 200 200">
                  <polygon points="100,20 180,100 100,180 20,100" fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinejoin="round" />
                  <circle cx="100" cy="20" r="4" fill="#3730a3" />
                  <circle cx="180" cy="100" r="4" fill="#3730a3" />
                  <circle cx="100" cy="180" r="4" fill="#3730a3" />
                  <circle cx="20" cy="100" r="4" fill="#3730a3" />
                  <text x="95" y="15" fontSize="16" fontWeight="bold" fill="#3730a3" textAnchor="end">A</text>
                  <text x="185" y="105" fontSize="16" fontWeight="bold" fill="#3730a3">B</text>
                  <text x="105" y="195" fontSize="16" fontWeight="bold" fill="#3730a3">C</text>
                  <text x="10" y="105" fontSize="16" fontWeight="bold" fill="#3730a3">D</text>
                </svg>
              </div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Angle at vertex A:</label>
                  <Field id="q2_angle_1" placeholder="e.g. ∠A or ∠DAB" correct={CORRECT.q2_angle_1} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Angle at vertex B:</label>
                  <Field id="q2_angle_2" placeholder="e.g. ∠B or ∠ABC" correct={CORRECT.q2_angle_2} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Angle at vertex C:</label>
                  <Field id="q2_angle_3" placeholder="e.g. ∠C or ∠BCD" correct={CORRECT.q2_angle_3} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Angle at vertex D:</label>
                  <Field id="q2_angle_4" placeholder="e.g. ∠D or ∠CDA" correct={CORRECT.q2_angle_4} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border/60" />

          {/* Question 3 - Interactive Placement & Scoring */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">3</span>
              Mark the points in the figure which satisfy all the three conditions.
            </h4>
            <div className="pl-7 text-sm space-y-1 text-muted-foreground">
              <p>i) A, B in the interior of ∠DOF</p>
              <p>ii) A, C in the exterior of ∠EOF</p>
              <p>iii) B on ∠DOE</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Interactive Placement Graph */}
              <div className="p-4 rounded-xl border bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/30 flex flex-col items-center space-y-3">
                <p className="text-xs font-semibold text-center">
                  {isRevealed ? "Here is the correct placement on the graph:" : "Interactive Graph: Click a letter, then tap on the diagram to position it!"}
                </p>
                
                {!isRevealed && (
                  <div className="flex gap-4">
                    {['A', 'B', 'C'].map(pt => (
                      <button
                        key={pt}
                        onClick={() => setActivePoint(pt)}
                        className={`w-9 h-9 rounded-full font-bold text-white transition-all ${
                          activePoint === pt 
                            ? "bg-indigo-600 ring-4 ring-indigo-600/30 scale-110" 
                            : "bg-indigo-400 hover:bg-indigo-500"
                        }`}
                      >
                        {pt}
                      </button>
                    ))}
                  </div>
                )}

                <div className="w-full bg-white dark:bg-slate-900 rounded-xl border shadow-sm relative overflow-hidden">
                  <svg 
                    className={`w-full h-auto ${!isRevealed && activePoint ? "cursor-crosshair" : "cursor-default"}`} 
                    viewBox="0 0 300 250"
                    onClick={handleSvgClick}
                  >
                    {/* Rays */}
                    <line x1="50" y1="200" x2="250" y2="200" stroke="#0ea5e9" strokeWidth="3" markerEnd="url(#arrow-blue-2)" />
                    <line x1="50" y1="200" x2="200" y2="50" stroke="#0ea5e9" strokeWidth="3" markerEnd="url(#arrow-blue-2)" />
                    <line x1="50" y1="200" x2="50" y2="50" stroke="#0ea5e9" strokeWidth="3" markerEnd="url(#arrow-blue-2)" />
                    
                    <circle cx="50" cy="200" r="4" fill="#0284c7" />
                    <text x="35" y="215" fontSize="16" fontWeight="bold" fill="#0284c7">O</text>
                    
                    <text x="250" y="220" fontSize="16" fontWeight="bold" fill="#0284c7">D</text>
                    <text x="210" y="55" fontSize="16" fontWeight="bold" fill="#0284c7">E</text>
                    <text x="35" y="60" fontSize="16" fontWeight="bold" fill="#0284c7">F</text>

                    {/* Revealed or Placed points */}
                    {isRevealed ? (
                      <>
                        <circle cx="150" cy="150" r="5" fill="#ef4444" />
                        <text x="160" y="155" fontSize="16" fontWeight="bold" fill="#b91c1c">A</text>
                        
                        <circle cx="150" cy="100" r="5" fill="#eab308" />
                        <text x="160" y="95" fontSize="16" fontWeight="bold" fill="#a16207">B</text>
                        
                        <circle cx="150" cy="225" r="5" fill="#22c55e" />
                        <text x="160" y="235" fontSize="16" fontWeight="bold" fill="#15803d">C</text>
                      </>
                    ) : (
                      Object.entries(placedPoints).map(([pt, coords]) => (
                        <g key={pt}>
                          <circle cx={coords.x} cy={coords.y} r="5" fill="#4f46e5" />
                          <text x={coords.x + 8} y={coords.y + 5} fontSize="16" fontWeight="bold" fill="#3730a3">{pt}</text>
                        </g>
                      ))
                    )}

                    <defs>
                      <marker id="arrow-blue-2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
                      </marker>
                    </defs>
                  </svg>
                </div>
                {!isRevealed && (
                  <button 
                    onClick={() => setPlacedPoints({})}
                    className="text-xs text-muted-foreground underline hover:text-foreground"
                  >
                    Clear Placed Points
                  </button>
                )}
              </div>

              {/* Scoring Questions for Q3 */}
              <div className="space-y-4 p-4 rounded-xl border bg-card">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">Identify & Score:</p>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    1. Which point lies on the arm / ray OE?
                  </label>
                  <Field id="q3_point_on_arm" placeholder="Type A, B, or C" correct={CORRECT.q3_point_on_arm} />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    2. Which point lies in the interior of ∠DOE?
                  </label>
                  <Field id="q3_point_interior_doe" placeholder="Type A, B, or C" correct={CORRECT.q3_point_interior_doe} />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    3. Which point lies in the exterior of ∠EOF?
                  </label>
                  <Field id="q3_point_exterior_eof" placeholder="Type A, B, or C" correct={CORRECT.q3_point_exterior_eof} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border/60" />

          {/* Question 4 */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">4</span>
              In which of the following figures, angles are formed? (Tap to tick)
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <TickFigure id="q4_fig_i" label="(i)" isCorrectToTick={true}>
                <svg className="w-16 h-16" viewBox="0 0 100 100">
                  <line x1="20" y1="80" x2="50" y2="20" stroke="#0f766e" strokeWidth="3" />
                  <line x1="80" y1="80" x2="50" y2="20" stroke="#0f766e" strokeWidth="3" />
                  <circle cx="50" cy="20" r="3" fill="#0f766e" />
                </svg>
              </TickFigure>
              
              <TickFigure id="q4_fig_ii" label="(ii)" isCorrectToTick={false}>
                <svg className="w-16 h-16" viewBox="0 0 100 100">
                  <line x1="20" y1="40" x2="80" y2="40" stroke="#0f766e" strokeWidth="3" />
                  <line x1="20" y1="60" x2="80" y2="60" stroke="#0f766e" strokeWidth="3" />
                </svg>
              </TickFigure>

              <TickFigure id="q4_fig_iii" label="(iii)" isCorrectToTick={true}>
                <svg className="w-16 h-16" viewBox="0 0 100 100">
                  <polygon points="50,10 60,35 85,35 65,55 75,85 50,65 25,85 35,55 15,35 40,35" fill="none" stroke="#0f766e" strokeWidth="3" strokeLinejoin="round" />
                </svg>
              </TickFigure>

              <TickFigure id="q4_fig_iv" label="(iv)" isCorrectToTick={false}>
                <svg className="w-16 h-16" viewBox="0 0 100 100">
                  <line x1="40" y1="20" x2="20" y2="80" stroke="#0f766e" strokeWidth="3" />
                  <line x1="80" y1="20" x2="60" y2="80" stroke="#0f766e" strokeWidth="3" />
                </svg>
              </TickFigure>
            </div>
          </div>
        </div>
      </div>


      {/* ──────────────────────────────────────────────────────────
          4.8 TRIANGLE
      ────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-teal-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono text-sm">4.8</span>
            <span>TRIANGLE</span>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-8">
          
          <div className="rounded-xl border border-teal-200 dark:border-teal-900 bg-teal-50 dark:bg-teal-950/20 overflow-hidden">
            <div className="bg-teal-600 text-white font-bold px-4 py-2 text-sm">DO THIS</div>
            <div className="p-4 space-y-4">
              <p className="text-sm font-semibold">Take some match sticks and try to make simple figures. Identify closed figures in them.</p>
              
              <div className="flex flex-wrap justify-center gap-6 py-4">
                {/* 1 stick */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <div className="w-12 h-1.5 bg-amber-200 border-2 border-amber-400 rounded-full relative">
                      <div className="absolute -left-1 -top-1 w-3 h-3.5 bg-red-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* 2 sticks */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 flex items-center justify-center relative">
                    <div className="w-12 h-1.5 bg-amber-200 border-2 border-amber-400 rounded-full absolute rotate-[45deg] origin-left left-2 top-8">
                      <div className="absolute -right-1 -top-1 w-3 h-3.5 bg-red-600 rounded-full"></div>
                    </div>
                    <div className="w-12 h-1.5 bg-amber-200 border-2 border-amber-400 rounded-full absolute rotate-[-15deg] origin-left left-2 top-8">
                      <div className="absolute -right-1 -top-1 w-3 h-3.5 bg-red-600 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* 3 sticks triangle */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 flex items-center justify-center relative">
                    <svg className="w-14 h-14" viewBox="0 0 100 100">
                      <polygon points="50,15 90,85 10,85" fill="none" stroke="#d97706" strokeWidth="6" strokeLinejoin="round" />
                      <circle cx="10" cy="85" r="5" fill="#dc2626" />
                      <circle cx="50" cy="15" r="5" fill="#dc2626" />
                      <circle cx="90" cy="85" r="5" fill="#dc2626" />
                    </svg>
                  </div>
                </div>

                {/* 4 sticks quad */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 flex items-center justify-center relative">
                    <svg className="w-14 h-14" viewBox="0 0 100 100">
                      <polygon points="20,20 80,10 90,80 10,90" fill="none" stroke="#d97706" strokeWidth="6" strokeLinejoin="round" />
                      <circle cx="20" cy="20" r="5" fill="#dc2626" />
                      <circle cx="80" cy="10" r="5" fill="#dc2626" />
                      <circle cx="90" cy="80" r="5" fill="#dc2626" />
                      <circle cx="10" cy="90" r="5" fill="#dc2626" />
                    </svg>
                  </div>
                </div>

                {/* 5 sticks pentagon */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 flex items-center justify-center relative">
                    <svg className="w-14 h-14" viewBox="0 0 100 100">
                      <polygon points="50,10 95,40 75,90 25,90 5,40" fill="none" stroke="#d97706" strokeWidth="6" strokeLinejoin="round" />
                      <circle cx="50" cy="10" r="5" fill="#dc2626" />
                      <circle cx="95" cy="40" r="5" fill="#dc2626" />
                      <circle cx="75" cy="90" r="5" fill="#dc2626" />
                      <circle cx="25" cy="90" r="5" fill="#dc2626" />
                      <circle cx="5" cy="40" r="5" fill="#dc2626" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label className="text-sm font-semibold whitespace-nowrap">What is the least no. of sticks needed to form a closed figure?</label>
                <div className="w-24">
                  <Field id="q_min_sticks" placeholder="e.g. 4" correct={CORRECT.q_min_sticks} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic">
                (Obviously three. Can you explain why two match sticks can not make a closed figure?)
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base">
            <p className="font-bold border-l-4 border-teal-500 pl-3">
              The simple closed figure formed by three line segments is a triangle. The line segments are called sides.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="space-y-3 flex-1">
                <p>
                  Look at the triangle formed by three line segments AB, BC and CA. Here A, B, C are called three vertices of the triangle ABC.
                </p>
                <p>
                  You know that the angles ∠BAC, ∠ABC, ∠ACB are formed at the vertices. The triangle ABC is denoted simply as ∆ABC.
                </p>
              </div>
              <div className="w-48 shrink-0 flex justify-center p-4 bg-white dark:bg-slate-900 rounded-xl border">
                <svg className="w-32 h-32" viewBox="0 0 100 100">
                  <polygon points="50,15 90,85 10,85" fill="none" stroke="#0f766e" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="50" cy="15" r="3" fill="#0f766e" />
                  <circle cx="90" cy="85" r="3" fill="#0f766e" />
                  <circle cx="10" cy="85" r="3" fill="#0f766e" />
                  <text x="50" y="10" fontSize="12" fontWeight="bold" fill="#0f766e" textAnchor="middle">A</text>
                  <text x="5" y="95" fontSize="12" fontWeight="bold" fill="#0f766e">B</text>
                  <text x="95" y="95" fontSize="12" fontWeight="bold" fill="#0f766e" textAnchor="end">C</text>
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border/60" />

          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-full max-w-[220px] shrink-0 bg-white dark:bg-slate-900 rounded-xl border p-4 flex justify-center">
              <svg className="w-full h-auto" viewBox="0 0 150 150">
                <polygon points="75,20 135,110 15,110" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" strokeLinejoin="round" />
                
                {/* Vertices */}
                <circle cx="75" cy="20" r="3" fill="#0f766e" />
                <text x="75" y="12" fontSize="12" fontWeight="bold" fill="#0f766e" textAnchor="middle">P</text>
                <circle cx="15" cy="110" r="3" fill="#0f766e" />
                <text x="5" y="120" fontSize="12" fontWeight="bold" fill="#0f766e">Q</text>
                <circle cx="135" cy="110" r="3" fill="#0f766e" />
                <text x="145" y="120" fontSize="12" fontWeight="bold" fill="#0f766e">R</text>

                {/* Interior points */}
                <circle cx="70" cy="60" r="3" fill="#ef4444" />
                <text x="75" y="65" fontSize="12" fontWeight="bold" fill="#b91c1c">O</text>
                <circle cx="85" cy="90" r="3" fill="#ef4444" />
                <text x="90" y="95" fontSize="12" fontWeight="bold" fill="#b91c1c">S</text>

                {/* Boundary points */}
                <circle cx="95" cy="110" r="3" fill="#0f766e" />
                <text x="95" y="105" fontSize="12" fontWeight="bold" fill="#0f766e" textAnchor="middle">M</text>

                {/* Exterior points */}
                <circle cx="20" cy="60" r="3" fill="#3b82f6" />
                <text x="25" y="65" fontSize="12" fontWeight="bold" fill="#1d4ed8">T</text>
                <circle cx="140" cy="50" r="3" fill="#3b82f6" />
                <text x="145" y="55" fontSize="12" fontWeight="bold" fill="#1d4ed8">V</text>
                <circle cx="60" cy="130" r="3" fill="#3b82f6" />
                <text x="65" y="135" fontSize="12" fontWeight="bold" fill="#1d4ed8">U</text>
              </svg>
            </div>
            
            <div className="text-sm space-y-4">
              <p>
                Being a polygon, a triangle has an exterior and an interior region. Observe the triangle and points marked in the figure.
              </p>
              
              <div className="space-y-4 p-4 rounded-xl border bg-muted/30">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">O is in the interior of the triangle. What are the other points in the interior?</label>
                  <Field id="q_interior_points" placeholder="e.g. S" correct={CORRECT.q_interior_points} sortChars />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold">P is a point on the triangle. Name the other points lying on the boundary of the triangle.</label>
                  <Field id="q_boundary_points" placeholder="e.g. Q, R, M" correct={CORRECT.q_boundary_points} sortChars />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
