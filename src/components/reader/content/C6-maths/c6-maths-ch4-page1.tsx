"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   All gradable field IDs for this page
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "q_shapes_tv",
  "q_shapes_bindi",
  "q_point_def",
  "q_point_rep",
  "q_do_this_points",
];

/* ─────────────────────────────────────────────
   Correct answers (normalised, lower-case)
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  q_shapes_tv: ["rectangle", "rectangular", "rect"],
  q_shapes_bindi: ["circle", "circular", "round", "dot", "point"],
  q_point_def: ["location", "position", "place"],
  q_point_rep: ["capital", "capitalletter", "dot", "capitalletters"],
  q_do_this_points: [
    "a,b,c,d",
    "p,q,r,s",
    "w,x,y,z",
    "k,l,m,n",
    "pointa,pointb,pointc,pointd",
    "abcd",
    "pqrs",
  ],
};

/* ─────────────────────────────────────────────
   Reveal text shown when teacher presses Reveal
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_shapes_tv: "Rectangle",
  q_shapes_bindi: "Circle / Round",
  q_point_def: "Location",
  q_point_rep: "Capital Letter (e.g., A, B, C)",
  q_do_this_points: "Point A, Point B, Point C, Point D (or P, Q, R, S)",
};

/* ─────────────────────────────────────────────
   Helpers (pure functions, outside component)
───────────────────────────────────────────── */
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
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none text-sm font-bold text-green-600 dark:text-green-400">
        ✓
      </span>
    );
  if (g?.correct === false)
    return (
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none text-sm font-bold text-red-500 dark:text-red-400">
        ✗
      </span>
    );
  return null;
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export function C6MathsCh4Page1() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch4-page1";

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

  /* Listen for Reset button */
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

  /* onChange handler */
  const handleChange = (id: string, val: string) => {
    if (isRevealed) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
    localStorage.setItem(`${storageKey}-${id}-answer`, val);
  };

  /* onBlur handler — grades the answer and awards points */
  const handleBlur = (id: string, correctAnswers: string[], isOpen = false) => {
    if (isRevealed) return;
    const rawTyped = answers[id] ?? "";
    const typed = normalize(rawTyped);
    if (!typed && !isOpen) return;
    if (isOpen && !rawTyped.trim()) return;

    const prev = graded[id];
    if (prev && prev.value === typed) return;

    let correct: boolean;
    if (id === "q_do_this_points") {
      // If student typed 4 letters or standard point names
      const letters = rawTyped.replace(/[^a-zA-Z]/g, "").toUpperCase();
      correct =
        letters.length >= 4 ||
        correctAnswers.some((ans) => typed.includes(normalize(ans))) ||
        rawTyped.trim().length >= 4;
    } else if (isOpen) {
      correct =
        correctAnswers.some((ans) => typed.includes(normalize(ans))) ||
        rawTyped.trim().length >= 3;
    } else {
      correct = correctAnswers.some((ans) => normalize(ans) === typed);
    }

    // Point delta: +1 first correct, +2 switching wrong→right, -2 switching right→wrong
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

  /* Shared input renderer */
  function Field({
    id,
    placeholder,
    correct,
    isOpen = false,
  }: {
    id: string;
    placeholder: string;
    correct: string[];
    isOpen?: boolean;
  }) {
    return (
      <div className="relative w-full">
        <input
          type="text"
          id={`field-${id}`}
          placeholder={placeholder}
          value={isRevealed ? REVEAL_TEXT[id] ?? "" : answers[id] ?? ""}
          onChange={(e) => handleChange(id, e.target.value)}
          onBlur={() => handleBlur(id, correct, isOpen)}
          disabled={isRevealed}
          className={`w-full rounded-xl border px-3 py-2 pr-8 text-sm font-mono outline-none transition-colors ${borderCls(
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

  return (
    <div className="space-y-8 text-foreground leading-relaxed font-body">
      {feedback && (
        <AnswerFeedback key={feedback.id} isCorrect={feedback.correct} points={1} />
      )}

      {/* Chapter Banner */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-white/20 px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider">
                Chapter 4
              </span>
              <span className="rounded-md bg-black/30 px-2 py-0.5 text-xs font-mono">
                QR: D3W1B4
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight">
              Basic Geometrical Ideas
            </h1>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-3xl font-black text-white shadow-inner">
            4
          </div>
        </div>
      </div>

      {/* 4.1 INTRODUCTION */}
      <div className="rounded-2xl border-2 border-teal-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-teal-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono text-sm">4.1</span>
          INTRODUCTION
        </div>

        <div className="p-5 space-y-6 text-sm sm:text-base">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-4">
              <p>
                We see a variety of things around us. There are buildings, utensils, furniture, pictures and a lot more. 
                You must have seen <strong>rangoli</strong> or <strong>mehendi</strong> designs. Have you ever made these? How do you make these designs?
              </p>
              <p className="font-semibold text-teal-800 dark:text-teal-300">
                ✨ We use various geometrical shapes in them!
              </p>
              <p>
                Observe some objects around you and identify what shapes you can see in them. 
                For example, the screen of a TV is in a <strong>rectangular shape</strong>. 
                Similarly, the face of a fridge, pencil box, book, etc. are also in rectangular shape. 
                But what about a glass, bindi, flower, etc.? We have learnt about some geometrical shapes in earlier classes. 
                In this chapter, we will learn more about such geometrical shapes.
              </p>
            </div>

            {/* Visual Art Box */}
            <div className="flex flex-col gap-3 p-4 rounded-xl border border-teal-200 dark:border-teal-800/60 bg-teal-50/50 dark:bg-teal-950/20 text-center">
              <div className="flex justify-around items-center text-4xl py-2">
                <span title="Rangoli Geometry">💠</span>
                <span title="Mehendi Pattern">✋</span>
                <span title="Geometric shapes">📐</span>
              </div>
              <p className="text-xs font-semibold text-teal-900 dark:text-teal-200">
                Rangoli & Mehendi: Beautiful geometric patterns of lines, curves, and points.
              </p>
            </div>
          </div>

          {/* Quick Shape Observation Quiz */}
          <div className="rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 p-4 space-y-3">
            <h4 className="font-heading font-bold text-sm text-teal-900 dark:text-teal-200">
              🔍 Quick Shape Check
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">
                  What shape is the front of a TV screen / Book?
                </label>
                <Field
                  id="q_shapes_tv"
                  placeholder="e.g. Rectangle"
                  correct={CORRECT.q_shapes_tv}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">
                  What shape is a traditional round bindi?
                </label>
                <Field
                  id="q_shapes_bindi"
                  placeholder="e.g. Circle / Round"
                  correct={CORRECT.q_shapes_bindi}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4.2 POINT */}
      <div className="rounded-2xl border-2 border-indigo-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-indigo-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono text-sm">4.2</span>
          POINT
        </div>

        <div className="p-5 space-y-6 text-sm sm:text-base">
          <div className="space-y-4">
            <p>
              Take a sharpened pencil and mark a dot on the paper. As you take an even sharper pencil, 
              the dot will become smaller. Observe the almost invisible tiny dot. It gives you the idea of a <strong>point</strong>.
            </p>
            
            <div className="rounded-xl border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 p-4 font-semibold text-indigo-900 dark:text-indigo-100">
              📍 <strong>Key Concept:</strong> A point determines a <u>location</u>. It has no length, breadth, or thickness.
            </div>

            <p>
              The distant stars also give us an idea of a point. We use a point to locate <strong>Hyderabad</strong> on a Telangana map. 
              Think of more examples where you use a point to locate something specific in a picture, diagram, or map.
            </p>
          </div>

          {/* Visual representations of points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Sharpened Pencil card */}
            <div className="rounded-xl border border-indigo-200 dark:border-indigo-800/60 p-4 bg-indigo-50/30 dark:bg-indigo-950/20 text-center space-y-2 flex flex-col items-center justify-center">
              <span className="text-3xl">✏️</span>
              <p className="font-bold text-xs text-indigo-900 dark:text-indigo-200">
                Pencil Dot
              </p>
              <div className="w-12 h-12 rounded-full border border-dashed border-indigo-400 flex items-center justify-center bg-white dark:bg-black/30">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 inline-block"></span>
              </div>
              <p className="text-xs text-muted-foreground">A tiny dot on paper</p>
            </div>

            {/* Map Locator card */}
            <div className="rounded-xl border border-indigo-200 dark:border-indigo-800/60 p-4 bg-indigo-50/30 dark:bg-indigo-950/20 text-center space-y-2 flex flex-col items-center justify-center">
              <span className="text-3xl">🗺️</span>
              <p className="font-bold text-xs text-indigo-900 dark:text-indigo-200">
                Map Location
              </p>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>Hyderabad</span>
              </div>
              <p className="text-xs text-muted-foreground">Locating a city on a map</p>
            </div>

            {/* Points A, B, C naming card */}
            <div className="rounded-xl border-2 border-indigo-300 dark:border-indigo-700 p-4 bg-white dark:bg-slate-900/50 space-y-2 flex flex-col items-center justify-center">
              <p className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                Naming Points
              </p>
              <div className="relative w-36 h-20 border border-indigo-200 dark:border-indigo-800 rounded-lg bg-indigo-50/20 flex items-center justify-around px-2">
                <div className="flex items-center gap-1 font-mono font-bold text-xs text-indigo-700 dark:text-indigo-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                  <span>• A</span>
                </div>
                <div className="flex items-center gap-1 font-mono font-bold text-xs text-indigo-700 dark:text-indigo-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                  <span>• B</span>
                </div>
                <div className="flex items-center gap-1 font-mono font-bold text-xs text-indigo-700 dark:text-indigo-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                  <span>• C</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Read as: point A, point B, point C</p>
            </div>

          </div>

          <div className="space-y-3 pt-2">
            <p>
              A point is denoted by a <strong>capital letter</strong> (like A, B, C, P, Q, X, Y).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">
                  A point determines a:
                </label>
                <Field
                  id="q_point_def"
                  placeholder="e.g. Location"
                  correct={CORRECT.q_point_def}
                  isOpen
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">
                  Points are denoted by what kind of letters?
                </label>
                <Field
                  id="q_point_rep"
                  placeholder="e.g. Capital Letter"
                  correct={CORRECT.q_point_rep}
                  isOpen
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DO THIS */}
      <div className="rounded-2xl border-2 border-emerald-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-emerald-600 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span>📖</span> DO THIS
        </div>

        <div className="p-5 bg-emerald-50/60 dark:bg-emerald-950/20 space-y-6">
          <div className="space-y-4">
            <p className="text-sm sm:text-base font-semibold text-emerald-950 dark:text-emerald-100">
              1. Four points are marked in the given rectangle. Name them.
            </p>

            {/* Interactive Rectangle with 4 points */}
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative w-64 h-36 rounded-xl border-2 border-emerald-600 bg-white dark:bg-slate-900 shadow-md p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-sm"></span>
                    <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">Point A</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-sm"></span>
                    <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">Point B</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-sm"></span>
                    <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">Point C</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-sm"></span>
                    <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">Point D</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full space-y-2">
                <label className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                  Write the names of the 4 points:
                </label>
                <Field
                  id="q_do_this_points"
                  placeholder="e.g. Point A, Point B, Point C, Point D"
                  correct={CORRECT.q_do_this_points}
                  isOpen
                />
                <p className="text-xs text-muted-foreground">
                  (You can write: A, B, C, D or P, Q, R, S)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
