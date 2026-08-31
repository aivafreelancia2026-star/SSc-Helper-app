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
  "q_seg_endpoints",
  "q_seg_shortest",
  "q_line_endpoints",
  "q_line_notation",
  "q_geoboard_rep",
  "q_ray_endpoints",
  "q_ray_startpoint",
];

/* ─────────────────────────────────────────────
   Correct answers (normalised, lower-case)
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  q_seg_endpoints: ["2", "two"],
  q_seg_shortest: ["linesegment", "linesegmentab", "ab", "segment", "straightline"],
  q_line_endpoints: ["0", "zero", "none", "noendpoints"],
  q_line_notation: ["ab", "arrowsbothsides", "l", "m", "n", "lineab"],
  q_geoboard_rep: ["linesegment", "segment", "line"],
  q_ray_endpoints: ["1", "one"],
  q_ray_startpoint: ["initialpoint", "initial", "startingpoint", "startpoint", "endpoint", "origin"],
};

/* ─────────────────────────────────────────────
   Reveal text shown when teacher presses Reveal
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_seg_endpoints: "2 (Two end points)",
  q_seg_shortest: "Line Segment AB (AB̄)",
  q_line_endpoints: "0 (No end points - extends endlessly)",
  q_line_notation: "AB⃡ (or lower case letters l, m, n)",
  q_geoboard_rep: "Line segment (between nails)",
  q_ray_endpoints: "1 (One initial point)",
  q_ray_startpoint: "Initial point",
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
export function C6MathsCh4Page2() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch4-page2";

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
    if (isOpen) {
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
        <AnswerFeedback key={feedback.id} correct={feedback.correct} onDone={() => setFeedback(null)} />
      )}

      {/* 4.3 A LINE SEGMENT */}
      <div className="rounded-2xl border-2 border-teal-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-teal-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono text-sm">4.3</span>
          A LINE SEGMENT
        </div>

        <div className="p-5 space-y-6 text-sm sm:text-base">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-4">
              <p>
                Take a thick paper and fold it. Look at the folded edge of this paper. It gives us an idea of what a <strong>line segment</strong> is. 
                The crease left on the sheet represents a line segment. It has two end points named <strong>A</strong> and <strong>B</strong>. 
                A line segment has negligible thickness.
              </p>
              <p>
                Take your notebook or a pencil box and draw a line along its edge with a pencil on a sheet of paper. 
                What you have drawn is a representation of a line segment. It has two ends.
              </p>
              <p>
                Take a thread. Stretch it tight. In this position it gives an idea of a <strong>line segment</strong> where the ends of the thread are the end points.
              </p>
            </div>

            {/* Folded Paper & Thread Illustration Box */}
            <div className="flex flex-col gap-3 p-4 rounded-xl border border-teal-200 dark:border-teal-800/60 bg-teal-50/50 dark:bg-teal-950/20 text-center items-center justify-center">
              <div className="relative w-36 h-28 border-2 border-dashed border-teal-400 bg-amber-50 dark:bg-amber-950/40 rounded-md p-2 flex flex-col justify-between items-center shadow-inner">
                <span className="text-xs font-mono font-bold text-teal-800 dark:text-teal-300">Point A •</span>
                <div className="w-0.5 h-16 bg-teal-600 dark:bg-teal-400 shadow"></div>
                <span className="text-xs font-mono font-bold text-teal-800 dark:text-teal-300">Point B •</span>
                <span className="absolute bottom-1 text-[10px] text-muted-foreground font-semibold">Paper Crease</span>
              </div>
              <p className="text-xs font-semibold text-teal-900 dark:text-teal-200">
                Crease on paper represents a line segment with endpoints A and B.
              </p>
            </div>
          </div>

          {/* Shortest Distance Interactive Demo */}
          <div className="rounded-xl border border-teal-200 dark:border-teal-800/70 p-4 bg-teal-50/40 dark:bg-teal-950/20 space-y-4">
            <h4 className="font-heading font-bold text-sm text-teal-900 dark:text-teal-200">
              📏 Shortest Distance between Two Points
            </h4>
            <p>
              Mark any two points A and B on a sheet of paper. Join them in as many ways as you like (curved paths, zigzag paths, or straight path).
            </p>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* SVG Diagram showing multiple paths vs straight line segment */}
              <div className="w-full sm:w-80 h-32 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 p-2 relative flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 300 100">
                  {/* Curved Path 1 */}
                  <path d="M 40 50 Q 150 10 260 50" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" />
                  {/* Curved Path 2 */}
                  <path d="M 40 50 Q 150 90 260 50" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" />
                  {/* Straight Line Segment */}
                  <line x1="40" y1="50" x2="260" y2="50" stroke="#0d9488" strokeWidth="3.5" strokeLinecap="round" />
                  {/* Point A */}
                  <circle cx="40" cy="50" r="5" fill="#0f766e" />
                  <text x="25" y="55" fontSize="14" fontWeight="bold" fill="#0f766e" fontFamily="monospace">A</text>
                  {/* Point B */}
                  <circle cx="260" cy="50" r="5" fill="#0f766e" />
                  <text x="272" y="55" fontSize="14" fontWeight="bold" fill="#0f766e" fontFamily="monospace">B</text>
                  {/* Label */}
                  <text x="110" y="44" fontSize="11" fontWeight="bold" fill="#0d9488" fontFamily="sans-serif">Line Segment AB</text>
                </svg>
              </div>

              <div className="flex-1 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">
                    How many end points does a line segment have?
                  </label>
                  <Field
                    id="q_seg_endpoints"
                    placeholder="e.g. 2"
                    correct={CORRECT.q_seg_endpoints}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">
                    What is the shortest distance from point A to point B?
                  </label>
                  <Field
                    id="q_seg_shortest"
                    placeholder="e.g. Line segment AB"
                    correct={CORRECT.q_seg_shortest}
                    isOpen
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-teal-100 dark:bg-teal-900/40 p-3 text-xs font-semibold text-teal-900 dark:text-teal-200">
              💡 <strong>Notation:</strong> The line segment between A and B is denoted by <span className="font-mono font-bold">AB̄</span> or <span className="font-mono font-bold">BĀ</span>.
            </div>
          </div>
        </div>
      </div>

      {/* 4.4 A LINE */}
      <div className="rounded-2xl border-2 border-indigo-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-indigo-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono text-sm">4.4</span>
          A LINE
        </div>

        <div className="p-5 space-y-6 text-sm sm:text-base">
          <div className="space-y-4">
            <p>
              Imagine that the line segment from A to B (i.e. <span className="font-mono font-semibold">AB̄</span>) is extended beyond A in one direction and beyond B in the other direction <strong>without any end</strong>.
            </p>
            <p>
              You now get a representation of a <strong>line</strong>.
            </p>
            <p>
              Since we cannot draw an indefinitely long line, we mark <strong>arrow notations</strong> on both sides to show that it will go on endlessly.
            </p>
          </div>

          {/* Line Diagram with SVG */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/30 dark:bg-indigo-950/20">
            <div className="w-full sm:w-80 h-24 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 p-2 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 300 70">
                <defs>
                  <marker id="arrowhead" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                    <polygon points="0 0, 7 3.5, 0 7" fill="#4f46e5" />
                  </marker>
                  <marker id="arrowhead-start" markerWidth="7" markerHeight="7" refX="2" refY="3.5" orient="auto-start-reverse">
                    <polygon points="0 0, 7 3.5, 0 7" fill="#4f46e5" />
                  </marker>
                </defs>
                {/* Double Arrow Line */}
                <line x1="20" y1="35" x2="280" y2="35" stroke="#4f46e5" strokeWidth="3" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead-start)" />
                {/* Point A */}
                <circle cx="90" cy="35" r="4.5" fill="#312e81" />
                <text x="85" y="24" fontSize="13" fontWeight="bold" fill="#312e81" fontFamily="monospace">A</text>
                {/* Point B */}
                <circle cx="210" cy="35" r="4.5" fill="#312e81" />
                <text x="205" y="24" fontSize="13" fontWeight="bold" fill="#312e81" fontFamily="monospace">B</text>
                {/* Line Letter l */}
                <text x="285" y="28" fontSize="14" fontStyle="italic" fontWeight="bold" fill="#4f46e5">l</text>
              </svg>
            </div>

            <div className="space-y-2 flex-1 text-xs sm:text-sm">
              <p>
                This line is denoted by <span className="font-mono font-bold text-indigo-700 dark:text-indigo-300">AB⃡</span> or <span className="font-mono font-bold text-indigo-700 dark:text-indigo-300">BA⃡</span>.
              </p>
              <p>
                It is also denoted by lower case letters such as <span className="font-mono font-semibold">l, m, n</span>, etc. This is also called a <strong>straight line</strong>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">
                How many end points does a line have?
              </label>
              <Field
                id="q_line_endpoints"
                placeholder="e.g. 0 / None"
                correct={CORRECT.q_line_endpoints}
                isOpen
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">
                How do we denote a line passing through A and B?
              </label>
              <Field
                id="q_line_notation"
                placeholder="e.g. AB with arrows on both sides / AB"
                correct={CORRECT.q_line_notation}
                isOpen
              />
            </div>
          </div>
        </div>
      </div>

      {/* DO THIS (Geoboard) */}
      <div className="rounded-2xl border-2 border-emerald-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-emerald-600 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span>📖</span> DO THIS
        </div>

        <div className="p-5 bg-emerald-50/60 dark:bg-emerald-950/20 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-3">
              <p className="text-sm sm:text-base font-semibold text-emerald-950 dark:text-emerald-100">
                Take a geo-board. Select any two nails and tie a thread tightly from one end to the other. 
                The thread you have fixed represents a line segment between the two nails, which could be extended in both directions to form a line.
              </p>
              <div className="space-y-1 pt-2">
                <label className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                  What geometrical figure is formed between the two nails?
                </label>
                <Field
                  id="q_geoboard_rep"
                  placeholder="e.g. Line segment"
                  correct={CORRECT.q_geoboard_rep}
                  isOpen
                />
              </div>
            </div>

            {/* Geoboard Mini Visual */}
            <div className="rounded-xl border-2 border-emerald-300 dark:border-emerald-800 bg-white dark:bg-slate-900 p-3 text-center flex flex-col items-center justify-center space-y-2">
              <div className="grid grid-cols-4 gap-3 p-2 bg-amber-100/50 dark:bg-amber-950/30 rounded-lg border border-amber-300 dark:border-amber-800">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="relative flex items-center justify-center">
                    <span className={`w-2 h-2 rounded-full ${i === 5 || i === 10 ? "bg-red-500 ring-2 ring-emerald-400" : "bg-slate-400"}`}></span>
                  </div>
                ))}
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                Geoboard: Tightly stretched thread between 2 pins
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4.5 A RAY */}
      <div className="rounded-2xl border-2 border-amber-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-amber-600 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono text-sm">4.5</span>
          A RAY
        </div>

        <div className="p-5 space-y-6 text-sm sm:text-base">
          <div className="space-y-4">
            <p>
              Sun rays, light rays, and rays from a torch are some real-life examples of the geometrical idea of a <strong>ray</strong>.
            </p>
            <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30 p-4 font-semibold text-amber-900 dark:text-amber-100">
              ☀️ <strong>Definition:</strong> A ray is a part of a line. It begins at a point (called the <u>initial point</u>) and goes on endlessly in a specified direction.
            </div>
            <p>
              Thus, a ray has <strong>only one end point</strong> (its initial starting point).
            </p>
          </div>

          {/* Real world visual cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-amber-200 dark:border-amber-800/60 p-4 bg-amber-50/40 dark:bg-amber-950/20 flex items-center gap-4">
              <span className="text-4xl">🔦</span>
              <div>
                <h5 className="font-bold text-amber-900 dark:text-amber-200">Torch Light</h5>
                <p className="text-xs text-muted-foreground">Starts from the bulb and travels endlessly forward.</p>
              </div>
            </div>
            <div className="rounded-xl border border-amber-200 dark:border-amber-800/60 p-4 bg-amber-50/40 dark:bg-amber-950/20 flex items-center gap-4">
              <span className="text-4xl">☀️</span>
              <div>
                <h5 className="font-bold text-amber-900 dark:text-amber-200">Sun Rays</h5>
                <p className="text-xs text-muted-foreground">Originates from the Sun and radiates outward in all directions.</p>
              </div>
            </div>
          </div>

          {/* Ray AB and Ray AC SVG Representation */}
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-white dark:bg-slate-900 space-y-3">
            <p className="font-semibold text-xs text-muted-foreground">
              Let A be a point on a line. B and C are two points on the same line on either side of A. Then <span className="font-mono font-bold text-amber-700 dark:text-amber-300">AB⃗</span> and <span className="font-mono font-bold text-amber-700 dark:text-amber-300">AC⃗</span> are two opposite rays:
            </p>
            <div className="w-full h-24 flex items-center justify-center">
              <svg className="w-full max-w-md h-full" viewBox="0 0 340 70">
                <defs>
                  <marker id="ray-arrow-right" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                    <polygon points="0 0, 7 3.5, 0 7" fill="#d97706" />
                  </marker>
                  <marker id="ray-arrow-left" markerWidth="7" markerHeight="7" refX="2" refY="3.5" orient="auto-start-reverse">
                    <polygon points="0 0, 7 3.5, 0 7" fill="#d97706" />
                  </marker>
                </defs>
                {/* Line with rays */}
                <line x1="30" y1="35" x2="310" y2="35" stroke="#d97706" strokeWidth="3" markerEnd="url(#ray-arrow-right)" markerStart="url(#ray-arrow-left)" />
                {/* Point C */}
                <circle cx="80" cy="35" r="4.5" fill="#78350f" />
                <text x="75" y="24" fontSize="13" fontWeight="bold" fill="#78350f" fontFamily="monospace">C</text>
                {/* Initial Point A */}
                <circle cx="170" cy="35" r="5.5" fill="#dc2626" />
                <text x="165" y="22" fontSize="14" fontWeight="bold" fill="#dc2626" fontFamily="monospace">A</text>
                <text x="145" y="58" fontSize="10" fontWeight="bold" fill="#dc2626">Initial Point</text>
                {/* Point B */}
                <circle cx="260" cy="35" r="4.5" fill="#78350f" />
                <text x="255" y="24" fontSize="13" fontWeight="bold" fill="#78350f" fontFamily="monospace">B</text>
              </svg>
            </div>
            <p className="text-center text-xs font-semibold text-amber-800 dark:text-amber-300">
              Ray AB (starts at A, goes through B) and Ray AC (starts at A, goes through C).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">
                How many end points does a ray have?
              </label>
              <Field
                id="q_ray_endpoints"
                placeholder="e.g. 1"
                correct={CORRECT.q_ray_endpoints}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">
                What is the starting point of a ray called?
              </label>
              <Field
                id="q_ray_startpoint"
                placeholder="e.g. Initial point"
                correct={CORRECT.q_ray_startpoint}
                isOpen
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
