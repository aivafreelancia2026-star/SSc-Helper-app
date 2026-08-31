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
  // THINK, DISCUSS AND WRITE
  "q_tdw_name_ray",
  "q_tdw_write_ray",
  // EXERCISE 4.1 - Q1
  "q_ex1_triangle_segments",
  "q_ex1_pentagon_segments",
  // EXERCISE 4.1 - Q2
  "q_ex2_points",
  "q_ex2_segments",
  "q_ex2_rays",
  "q_ex2_lines",
  // EXERCISE 4.1 - Q3
  "q_ex3_one_point",
  "q_ex3_two_points",
  // EXERCISE 4.1 - Q4
  "q_ex4_definite_length",
  // EXERCISE 4.1 - Q5
  "q_ex5_line_seg_endpoints",
  "q_ex5_ray_endpoints",
  "q_ex5_line_endpoints",
  // EXERCISE 4.1 - Q6 (True or False)
  "q_ex6_tf_1",
  "q_ex6_tf_2",
  "q_ex6_tf_3",
  "q_ex6_tf_4",
  "q_ex6_tf_5",
  // EXERCISE 4.1 - Q7
  "q_ex7_line_p",
];

/* ─────────────────────────────────────────────
   Accepted correct answers
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  // TDW
  q_tdw_name_ray: [
    "yes", "y", "yesbecauseoistheinitialpoint", "yesobalsohasinitialpointo", "true", "yeswecan", "yesbecausebothstartato", "yesrayoaisrayob", "yesbothhaveinitialpointo", "yesitis"
  ],
  q_tdw_write_ray: [
    "no", "n", "nobecausetheinitialpointiso", "noastartsatnott", "cannot", "false", "nowecannot", "nooistheinitialpoint", "nobecauseoistheinitialpoint", "noarrowheadpointsfromotoa"
  ],

  // Q1
  q_ex1_triangle_segments: [
    "ab,bc,ca", "ab,bc,ac", "ab,ca,bc", "ba,cb,ac", "ba,ac,cb", "3", "ab,bc,cd", "segmentab,bc,ca", "ab,bc,aclinesegments", "ab,ac,bc", "bc,ca,ab", "ca,ab,bc"
  ],
  q_ex1_pentagon_segments: [
    "pq,qr,rs,st,tp", "pq,qr,rs,st,pt", "5", "pq,qr,rs,st,tpsegments", "pq,pt,ts,sr,rq", "pq,qr,rs,st,tu", "qp,rq,sr,ts,pt", "pq,rs,st,tp,qr"
  ],

  // Q2
  q_ex2_points: [
    "a,b,c,d,o", "o,a,b,c,d", "a,b,c,d,e", "pointsa,b,c,d,o", "a,b,c,d", "pointa,pointb,pointc,pointd,pointo", "a,b,c,dando"
  ],
  q_ex2_segments: [
    "ab,bc,cd,da,ac", "ab,bc,cd,da,bd", "oa,ob,oc,od,ac", "ab,bc,cd,da,ac,bd", "ab,bc,cd,da,bd,oa,ob,oc,od", "ab,bc,cd,da,ac,bd,oa,ob,oc,od", "ab,bc,cd,ad,ac", "ab,bc,cd,da,oa", "ab,bc,cd,da,ob", "oa,ob,oc,od,bd"
  ],
  q_ex2_rays: [
    "oa,ob,oc", "oa,ob,oc,od", "rayoa,ob,oc", "oa,ob,oc,od,ba,dc", "oa,ob,od", "oa,ob,oc,od,ba,bc", "oa,oc,ob", "oa,od,oc", "ob,oc,od"
  ],
  q_ex2_lines: [
    "ac,bd", "lineac,bd", "ac,db", "ca,db", "lineac,linebd", "ac,bdlines", "lineac,linedb", "ca,bd", "ca,db"
  ],

  // Q3
  q_ex3_one_point: [
    "infinite", "infinitelymany", "unlimited", "many", "countless", "infinitenumbers", "infinite", "infinitelymanyliness", "manylines", "infinitemany"
  ],
  q_ex3_two_points: [
    "onlyone", "1", "one", "only1", "oneandonlyone", "exactlyone", "onlyoneline", "1line", "oneline"
  ],

  // Q4
  q_ex4_definite_length: [
    "linesegment", "segment", "iii", "3", "c", "linesegmentab", "iii)linesegment", "iiilinesegment"
  ],

  // Q5
  q_ex5_line_seg_endpoints: ["2", "two", "twoendpoints", "2endpoints", "twoendspoints"],
  q_ex5_ray_endpoints: ["1", "one", "1endpoint", "oneendpoint", "oneinitialpoint", "1initialpoint"],
  q_ex5_line_endpoints: ["0", "zero", "none", "noendpoints", "0endpoints", "noendpoint", "null"],

  // Q6 True/False
  q_ex6_tf_1: ["true", "t"],
  q_ex6_tf_2: ["true", "t"],
  q_ex6_tf_3: ["false", "f"],
  q_ex6_tf_4: ["false", "f"],
  q_ex6_tf_5: ["true", "t"],

  // Q7
  q_ex7_line_p: [
    "linep", "p", "linecontainingp", "lineab", "line", "yes", "drawn", "linel", "linelcontainingp", "straightline"
  ]
};

/* ─────────────────────────────────────────────
   Reveal text for teacher / answers
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_tdw_name_ray: "Yes, ray OA can be named as ray OB because both start at O and pass in the same direction through A and B (Ray OB).",
  q_tdw_write_ray: "No, we cannot write ray OA as ray AO because the arrow indicates the ray starts at O (initial point) and goes towards A. AO⃗ would mean starting at A and going towards O.",
  q_ex1_triangle_segments: "AB, BC, CA (3 line segments)",
  q_ex1_pentagon_segments: "PQ, QR, RS, ST, TP (5 line segments)",
  q_ex2_points: "A, B, C, D, O (Any five points)",
  q_ex2_segments: "AB, BC, CD, DA, AC, BD, OA, OB, OC, OD (Any 5 segments)",
  q_ex2_rays: "OA⃗, OB⃗, OC⃗, OD⃗ (Any 3 rays)",
  q_ex2_lines: "Line AC (AC⃡), Line BD (BD⃡)",
  q_ex3_one_point: "Infinitely many (infinite number of lines can pass through a single point).",
  q_ex3_two_points: "Only one line can be drawn passing through two distinct points.",
  q_ex4_definite_length: "iii) Line segment (has a fixed/definite length between its two endpoints).",
  q_ex5_line_seg_endpoints: "2 (Two end points)",
  q_ex5_ray_endpoints: "1 (One initial/starting end point)",
  q_ex5_line_endpoints: "0 (No end points; extends endlessly in both directions)",
  q_ex6_tf_1: "True (A line extends indefinitely in both directions)",
  q_ex6_tf_2: "True (A ray is a part of a line extending in one direction)",
  q_ex6_tf_3: "False (A line segment has a fixed definite length)",
  q_ex6_tf_4: "False (A line segment has two end points, not one)",
  q_ex6_tf_5: "True (Infinitely many lines can pass through a single point)",
  q_ex7_line_p: "A straight line with arrows on both ends passing through point P (denoted as Line l or Line AB containing P).",
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

export function C6MathsCh4Page3() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch4-page3";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<Record<string, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number } | null>(null);

  // Interactive connection state for Q1 (i) and (ii)
  const [triangleConnected, setTriangleConnected] = useState<boolean>(false);
  const [pentagonConnected, setPentagonConnected] = useState<boolean>(false);
  
  // Interactive line drawer through point P
  const [linesThroughP, setLinesThroughP] = useState<number[]>([0]);

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

  /* Listen for Reset event */
  useEffect(() => {
    const handleReset = () => {
      ALL_INPUT_IDS.forEach((id) => {
        localStorage.removeItem(`${storageKey}-${id}-answer`);
        localStorage.removeItem(`${storageKey}-${id}-graded`);
      });
      setAnswers({});
      setGraded({});
      setFeedback(null);
      setTriangleConnected(false);
      setPentagonConnected(false);
    };
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () => window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, [storageKey]);

  /* Change handler */
  const handleChange = (id: string, val: string) => {
    if (isRevealed) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
    localStorage.setItem(`${storageKey}-${id}-answer`, val);
  };

  /* Grading blur handler */
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
          className={`w-full rounded-xl border px-3 py-2 pr-8 text-sm font-mono outline-none transition-all shadow-sm ${borderCls(
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
    <div className="space-y-8 text-foreground leading-relaxed font-body max-w-5xl mx-auto pb-12">
      {feedback && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* ──────────────────────────────────────────────────────────
          THINK, DISCUSS AND WRITE SECTION
      ────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-emerald-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-emerald-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-white/20 rounded-lg">💭</span>
            <span>THINK, DISCUSS AND WRITE</span>
          </div>
          <span className="text-xs bg-emerald-800/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
            Ray Notation &amp; Direction
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-6 text-sm sm:text-base">
          <div className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
            <div className="space-y-2 flex-1">
              <p className="text-foreground">
                Here is a ray <span className="inline-flex items-center font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-700">OA⃗</span>. It starts at <strong className="text-emerald-700 dark:text-emerald-300 font-mono">O</strong> and passes through points <strong className="text-emerald-700 dark:text-emerald-300 font-mono">A</strong> and <strong className="text-emerald-700 dark:text-emerald-300 font-mono">B</strong>.
              </p>
              <div className="text-xs text-muted-foreground bg-background/80 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900">
                📌 <strong>Ray Property:</strong> A ray is identified by its initial point and any other point lying on the ray indicating direction.
              </div>
            </div>

            {/* SVG Diagram for Ray OA and B */}
            <div className="w-full md:w-80 h-28 bg-white dark:bg-slate-900 rounded-xl border border-emerald-300 dark:border-emerald-700 p-2 flex items-center justify-center shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 320 80">
                <defs>
                  <marker id="ray-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#059669" />
                  </marker>
                </defs>
                {/* Ray line */}
                <line x1="40" y1="40" x2="280" y2="40" stroke="#059669" strokeWidth="3" markerEnd="url(#ray-arrow)" />
                {/* Initial Point O */}
                <circle cx="40" cy="40" r="5" fill="#dc2626" />
                <text x="35" y="24" fontSize="14" fontWeight="bold" fill="#dc2626" fontFamily="monospace">O</text>
                <text x="18" y="65" fontSize="10" fontWeight="bold" fill="#dc2626">Initial</text>
                {/* Point A */}
                <circle cx="140" cy="40" r="4.5" fill="#047857" />
                <text x="136" y="24" fontSize="14" fontWeight="bold" fill="#047857" fontFamily="monospace">A</text>
                {/* Point B */}
                <circle cx="230" cy="40" r="4.5" fill="#047857" />
                <text x="226" y="24" fontSize="14" fontWeight="bold" fill="#047857" fontFamily="monospace">B</text>
              </svg>
            </div>
          </div>

          <div className="space-y-4">
            {/* TDW Question 1 */}
            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">1.</span>
                <span>Can you name ray <span className="inline-flex items-center font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-700">OA⃗</span> as <span className="inline-flex items-center font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-700">OB⃗</span> ? Why?</span>
              </label>
              <Field
                id="q_tdw_name_ray"
                placeholder="e.g. Yes, because both start at initial point O and travel in the same direction."
                correct={CORRECT.q_tdw_name_ray}
                isOpen
              />
            </div>

            {/* TDW Question 2 */}
            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">2.</span>
                <span>Can you write the ray <span className="inline-flex items-center font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-700">OA⃗</span> as <span className="inline-flex items-center font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-700">AO⃗</span> ? Why? Give reasons.</span>
              </label>
              <Field
                id="q_tdw_write_ray"
                placeholder="e.g. No, because O is the initial point. Ray AO would start at A and go toward O."
                correct={CORRECT.q_tdw_write_ray}
                isOpen
              />
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          EXERCISE 4.1 BANNER
      ────────────────────────────────────────────────────────── */}
      <div className="bg-teal-700 text-white rounded-2xl p-4 sm:p-5 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="p-2 bg-white/20 rounded-xl text-xl">📝</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading">Exercise - 4.1</h2>
            <p className="text-xs sm:text-sm text-teal-100">Points, Line Segments, Rays, and Lines</p>
          </div>
        </div>
        <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full border border-white/20 font-mono font-bold">
          Page 51 / Book P59
        </span>
      </div>

      {/* ──────────────────────────────────────────────────────────
          QUESTION 1: Join the points given below
      ────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-teal-50 dark:bg-teal-950/40 border-b border-teal-200 dark:border-teal-800/80 px-5 py-3 flex items-center justify-between">
          <h3 className="font-heading font-bold text-teal-900 dark:text-teal-200 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs">1</span>
            Join the points given below. Name the line segments so formed in the figure.
          </h3>
        </div>

        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Subquestion (i) Triangle points A, B, C */}
          <div className="space-y-4 p-4 rounded-xl border border-border bg-background/50">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-teal-700 dark:text-teal-300">
                (i) Points A, B, C
              </h4>
              <button
                type="button"
                onClick={() => setTriangleConnected(!triangleConnected)}
                className={`text-xs px-3 py-1 rounded-lg font-semibold transition-all ${
                  triangleConnected
                    ? "bg-teal-600 text-white shadow"
                    : "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 hover:bg-teal-200"
                }`}
              >
                {triangleConnected ? "✓ Connected Lines" : "👆 Click to Join Points"}
              </button>
            </div>

            {/* Interactive Canvas/SVG for 3 points */}
            <div className="w-full h-48 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-2 flex items-center justify-center relative">
              <svg className="w-full h-full" viewBox="0 0 240 160">
                {/* Lines when connected */}
                {triangleConnected && (
                  <polygon
                    points="120,30 50,130 190,130"
                    fill="rgba(13, 148, 136, 0.12)"
                    stroke="#0d9488"
                    strokeWidth="2.5"
                    strokeDasharray="4,4"
                    className="animate-pulse"
                  />
                )}
                {/* Point A */}
                <circle cx="120" cy="30" r="5" fill="#0f766e" />
                <text x="114" y="20" fontSize="13" fontWeight="bold" fill="#0f766e" fontFamily="monospace">A</text>
                {/* Point B */}
                <circle cx="50" cy="130" r="5" fill="#0f766e" />
                <text x="32" y="135" fontSize="13" fontWeight="bold" fill="#0f766e" fontFamily="monospace">B</text>
                {/* Point C */}
                <circle cx="190" cy="130" r="5" fill="#0f766e" />
                <text x="200" y="135" fontSize="13" fontWeight="bold" fill="#0f766e" fontFamily="monospace">C</text>
              </svg>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">
                Name the line segments formed:
              </label>
              <Field
                id="q_ex1_triangle_segments"
                placeholder="e.g. AB, BC, CA"
                correct={CORRECT.q_ex1_triangle_segments}
                isOpen
              />
            </div>
          </div>

          {/* Subquestion (ii) Points P, Q, R, S, T */}
          <div className="space-y-4 p-4 rounded-xl border border-border bg-background/50">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-teal-700 dark:text-teal-300">
                (ii) Points P, Q, R, S, T
              </h4>
              <button
                type="button"
                onClick={() => setPentagonConnected(!pentagonConnected)}
                className={`text-xs px-3 py-1 rounded-lg font-semibold transition-all ${
                  pentagonConnected
                    ? "bg-teal-600 text-white shadow"
                    : "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 hover:bg-teal-200"
                }`}
              >
                {pentagonConnected ? "✓ Connected Lines" : "👆 Click to Join Points"}
              </button>
            </div>

            {/* Interactive Canvas/SVG for 5 points */}
            <div className="w-full h-48 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-2 flex items-center justify-center relative">
              <svg className="w-full h-full" viewBox="0 0 240 160">
                {/* Lines when connected */}
                {pentagonConnected && (
                  <polygon
                    points="120,25 200,60 170,135 70,135 40,60"
                    fill="rgba(13, 148, 136, 0.12)"
                    stroke="#0d9488"
                    strokeWidth="2.5"
                    strokeDasharray="4,4"
                    className="animate-pulse"
                  />
                )}
                {/* Point P (Top) */}
                <circle cx="120" cy="25" r="5" fill="#0f766e" />
                <text x="115" y="16" fontSize="13" fontWeight="bold" fill="#0f766e" fontFamily="monospace">P</text>
                {/* Point Q (Left-mid) */}
                <circle cx="40" cy="60" r="5" fill="#0f766e" />
                <text x="22" y="65" fontSize="13" fontWeight="bold" fill="#0f766e" fontFamily="monospace">Q</text>
                {/* Point T (Right-mid) */}
                <circle cx="200" cy="60" r="5" fill="#0f766e" />
                <text x="210" y="65" fontSize="13" fontWeight="bold" fill="#0f766e" fontFamily="monospace">T</text>
                {/* Point R (Bottom-left) */}
                <circle cx="70" cy="135" r="5" fill="#0f766e" />
                <text x="55" y="145" fontSize="13" fontWeight="bold" fill="#0f766e" fontFamily="monospace">R</text>
                {/* Point S (Bottom-right) */}
                <circle cx="170" cy="135" r="5" fill="#0f766e" />
                <text x="178" y="145" fontSize="13" fontWeight="bold" fill="#0f766e" fontFamily="monospace">S</text>
              </svg>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">
                Name the line segments formed:
              </label>
              <Field
                id="q_ex1_pentagon_segments"
                placeholder="e.g. PQ, QR, RS, ST, TP"
                correct={CORRECT.q_ex1_pentagon_segments}
                isOpen
              />
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          QUESTION 2: Name the following from the figure
      ────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-indigo-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-indigo-50 dark:bg-indigo-950/40 border-b border-indigo-200 dark:border-indigo-800/80 px-5 py-3 flex items-center justify-between">
          <h3 className="font-heading font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">2</span>
            Name the following from the figure:
          </h3>
        </div>

        <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Geometric Figure SVG: Rectangle/Quad with intersecting diagonals AC and BD meeting at O */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 shadow-inner">
            <svg className="w-full max-w-[280px] h-56" viewBox="0 0 280 200">
              <defs>
                <marker id="fig-arr" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#4f46e5" />
                </marker>
                <marker id="fig-arr-rev" markerWidth="6" markerHeight="6" refX="2" refY="3" orient="auto-start-reverse">
                  <polygon points="0 0, 6 3, 0 6" fill="#4f46e5" />
                </marker>
              </defs>
              
              {/* Outer boundary lines */}
              <line x1="40" y1="40" x2="240" y2="40" stroke="#4f46e5" strokeWidth="2.5" />
              <line x1="240" y1="40" x2="240" y2="160" stroke="#4f46e5" strokeWidth="2.5" />
              <line x1="240" y1="160" x2="40" y2="160" stroke="#4f46e5" strokeWidth="2.5" />
              <line x1="40" y1="160" x2="40" y2="40" stroke="#4f46e5" strokeWidth="2.5" />

              {/* Diagonal lines extending with arrows */}
              {/* AC Diagonal */}
              <line x1="25" y1="25" x2="255" y2="175" stroke="#6366f1" strokeWidth="2" markerStart="url(#fig-arr-rev)" markerEnd="url(#fig-arr)" />
              {/* BD Diagonal */}
              <line x1="25" y1="175" x2="255" y2="25" stroke="#6366f1" strokeWidth="2" markerStart="url(#fig-arr-rev)" markerEnd="url(#fig-arr)" />

              {/* Vertices and center */}
              {/* Point A */}
              <circle cx="40" cy="40" r="4.5" fill="#1e1b4b" />
              <text x="24" y="36" fontSize="14" fontWeight="bold" fill="#1e1b4b" fontFamily="monospace">A</text>
              {/* Point D */}
              <circle cx="240" cy="40" r="4.5" fill="#1e1b4b" />
              <text x="248" y="36" fontSize="14" fontWeight="bold" fill="#1e1b4b" fontFamily="monospace">D</text>
              {/* Point B */}
              <circle cx="40" cy="160" r="4.5" fill="#1e1b4b" />
              <text x="24" y="170" fontSize="14" fontWeight="bold" fill="#1e1b4b" fontFamily="monospace">B</text>
              {/* Point C */}
              <circle cx="240" cy="160" r="4.5" fill="#1e1b4b" />
              <text x="248" y="170" fontSize="14" fontWeight="bold" fill="#1e1b4b" fontFamily="monospace">C</text>
              {/* Point O (Center) */}
              <circle cx="140" cy="100" r="5" fill="#dc2626" />
              <text x="135" y="125" fontSize="14" fontWeight="bold" fill="#dc2626" fontFamily="monospace">O</text>
            </svg>
            <span className="text-[11px] text-muted-foreground font-semibold mt-1">
              Figure: Quadrilateral ABCD with intersecting diagonals at point O
            </span>
          </div>

          {/* Sub-inputs for Figure identification */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">i)</span>
                <span>Any five points:</span>
              </label>
              <Field
                id="q_ex2_points"
                placeholder="e.g. A, B, C, D, O"
                correct={CORRECT.q_ex2_points}
                isOpen
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">ii)</span>
                <span>Any five line segments:</span>
              </label>
              <Field
                id="q_ex2_segments"
                placeholder="e.g. AB, BC, CD, DA, AC"
                correct={CORRECT.q_ex2_segments}
                isOpen
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">iii)</span>
                <span>Any Three rays:</span>
              </label>
              <Field
                id="q_ex2_rays"
                placeholder="e.g. OA⃗, OB⃗, OC⃗"
                correct={CORRECT.q_ex2_rays}
                isOpen
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">iv)</span>
                <span>Any two lines:</span>
              </label>
              <Field
                id="q_ex2_lines"
                placeholder="e.g. Line AC, Line BD"
                correct={CORRECT.q_ex2_lines}
                isOpen
              />
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          QUESTION 3 & 4: Lines through points & Definite length
      ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Q3: How many lines can be drawn */}
        <div className="rounded-2xl border-2 border-cyan-500/40 bg-card overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="bg-cyan-50 dark:bg-cyan-950/40 border-b border-cyan-200 dark:border-cyan-800/80 px-5 py-3">
            <h3 className="font-heading font-bold text-cyan-900 dark:text-cyan-200 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs">3</span>
              Lines through given points:
            </h3>
          </div>

          <div className="p-5 space-y-4 text-sm flex-1">
            <p className="text-muted-foreground text-xs">
              How many lines can be drawn through the points given below and make a rough figure for your answer?
            </p>

            <div className="space-y-2 p-3 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900">
              <label className="font-semibold text-foreground text-xs">
                i) Through <strong>One point</strong>:
              </label>
              <Field
                id="q_ex3_one_point"
                placeholder="e.g. Infinitely many / Unlimited"
                correct={CORRECT.q_ex3_one_point}
                isOpen
              />
            </div>

            <div className="space-y-2 p-3 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900">
              <label className="font-semibold text-foreground text-xs">
                ii) Through <strong>Two distinct points</strong>:
              </label>
              <Field
                id="q_ex3_two_points"
                placeholder="e.g. Only one line"
                correct={CORRECT.q_ex3_two_points}
                isOpen
              />
            </div>
          </div>
        </div>

        {/* Q4: Definite Length */}
        <div className="rounded-2xl border-2 border-amber-500/40 bg-card overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800/80 px-5 py-3">
            <h3 className="font-heading font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">4</span>
              Which has a definite length?
            </h3>
          </div>

          <div className="p-5 space-y-4 text-sm flex-1">
            <p className="text-muted-foreground text-xs">
              Which of the following has a definite (measurable fixed) length?
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold py-1">
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-background text-center">
                i) Line
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-background text-center">
                ii) Point
              </div>
              <div className="p-2.5 rounded-lg border-2 border-amber-500/60 bg-amber-50/50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-center">
                iii) Line segment
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-background text-center">
                iv) Ray
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <label className="text-xs font-semibold text-muted-foreground">
                Your Answer:
              </label>
              <Field
                id="q_ex4_definite_length"
                placeholder="e.g. Line segment / iii"
                correct={CORRECT.q_ex4_definite_length}
                isOpen
              />
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          QUESTION 5: How many end points do the following have?
      ────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-blue-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-blue-50 dark:bg-blue-950/40 border-b border-blue-200 dark:border-blue-800/80 px-5 py-3">
          <h3 className="font-heading font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">5</span>
            How many end points do the following have?
          </h3>
        </div>

        <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20 space-y-2">
            <span className="text-xs font-bold text-blue-800 dark:text-blue-300">i) Line segment</span>
            <Field
              id="q_ex5_line_seg_endpoints"
              placeholder="e.g. 2"
              correct={CORRECT.q_ex5_line_seg_endpoints}
            />
          </div>

          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20 space-y-2">
            <span className="text-xs font-bold text-blue-800 dark:text-blue-300">ii) Ray</span>
            <Field
              id="q_ex5_ray_endpoints"
              placeholder="e.g. 1"
              correct={CORRECT.q_ex5_ray_endpoints}
            />
          </div>

          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20 space-y-2">
            <span className="text-xs font-bold text-blue-800 dark:text-blue-300">iii) Line</span>
            <Field
              id="q_ex5_line_endpoints"
              placeholder="e.g. 0 / None"
              correct={CORRECT.q_ex5_line_endpoints}
              isOpen
            />
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          QUESTION 6: Write &apos;True&apos; or &apos;False&apos;
      ────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-purple-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-purple-50 dark:bg-purple-950/40 border-b border-purple-200 dark:border-purple-800/80 px-5 py-3">
          <h3 className="font-heading font-bold text-purple-900 dark:text-purple-200 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">6</span>
            Write &apos;True&apos; or &apos;False&apos;:
          </h3>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {[
            { id: "q_ex6_tf_1", num: "i", text: "A line has no end points.", ans: CORRECT.q_ex6_tf_1 },
            { id: "q_ex6_tf_2", num: "ii", text: "Ray is a part of a line.", ans: CORRECT.q_ex6_tf_2 },
            { id: "q_ex6_tf_3", num: "iii", text: "A line segment has no definite length.", ans: CORRECT.q_ex6_tf_3 },
            { id: "q_ex6_tf_4", num: "iv", text: "A line segment has only one end point.", ans: CORRECT.q_ex6_tf_4 },
            { id: "q_ex6_tf_5", num: "v", text: "We can draw many lines through a point.", ans: CORRECT.q_ex6_tf_5 },
          ].map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-background/50 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-2 text-sm">
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400 w-6">{item.num})</span>
                <span className="font-medium text-foreground">{item.text}</span>
              </div>
              <div className="w-full sm:w-36">
                <Field
                  id={item.id}
                  placeholder="True / False"
                  correct={item.ans}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          QUESTION 7: Draw and name - Interactive Line through Point P
      ────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-rose-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-rose-50 dark:bg-rose-950/40 border-b border-rose-200 dark:border-rose-800/80 px-5 py-3 flex items-center justify-between">
          <h3 className="font-heading font-bold text-rose-900 dark:text-rose-200 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">7</span>
            Draw and name: i) Line containing point P
          </h3>
          <span className="text-xs font-semibold text-rose-700 dark:text-rose-300">
            Interactive Visualisation
          </span>
        </div>

        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Interactive Line Explorer */}
          <div className="md:col-span-6 flex flex-col items-center space-y-3">
            <div className="w-full h-56 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-800 p-2 flex items-center justify-center relative overflow-hidden shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 260 200">
                <defs>
                  <marker id="p-arr" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#e11d48" />
                  </marker>
                  <marker id="p-arr-rev" markerWidth="6" markerHeight="6" refX="2" refY="3" orient="auto-start-reverse">
                    <polygon points="0 0, 6 3, 0 6" fill="#e11d48" />
                  </marker>
                </defs>

                {/* Multiple lines through P */}
                {linesThroughP.map((angle, idx) => {
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 130 - 110 * Math.cos(rad);
                  const y1 = 100 - 85 * Math.sin(rad);
                  const x2 = 130 + 110 * Math.cos(rad);
                  const y2 = 100 + 85 * Math.sin(rad);
                  return (
                    <line
                      key={idx}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={idx === 0 ? "#e11d48" : "#fda4af"}
                      strokeWidth={idx === 0 ? 3 : 1.5}
                      strokeDasharray={idx === 0 ? "none" : "3,3"}
                      markerStart="url(#p-arr-rev)"
                      markerEnd="url(#p-arr)"
                    />
                  );
                })}

                {/* Point P in the center */}
                <circle cx="130" cy="100" r="6" fill="#be123c" />
                <text x="138" y="94" fontSize="16" fontWeight="bold" fill="#be123c" fontFamily="monospace">P</text>
                <text x="105" y="125" fontSize="10" fontWeight="bold" fill="#be123c">Point P</text>
                <text x="210" y="85" fontSize="12" fontStyle="italic" fontWeight="bold" fill="#e11d48">Line l</text>
              </svg>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setLinesThroughP((prev) =>
                    prev.length > 1 ? [0] : [0, 30, 60, 90, 120, 150]
                  );
                }}
                className="text-xs px-3 py-1.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 font-semibold hover:bg-rose-200 transition-colors"
              >
                {linesThroughP.length > 1 ? "Show Single Line" : "Show Multiple Lines through P"}
              </button>
            </div>
          </div>

          <div className="md:col-span-6 space-y-4">
            <p className="text-sm text-foreground">
              A line containing point <strong className="text-rose-600 dark:text-rose-400">P</strong> can be drawn in any orientation extending infinitely on both sides.
            </p>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">
                Describe or name the line drawn containing point P:
              </label>
              <Field
                id="q_ex7_line_p"
                placeholder="e.g. Line l containing point P / Line AB"
                correct={CORRECT.q_ex7_line_p}
                isOpen
              />
            </div>

            <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/60 text-xs text-rose-900 dark:text-rose-200">
              💡 <strong>Observation:</strong> An infinite number of lines can pass through point P, but any one such line is named as <span className="font-mono font-bold">Line l</span> or by choosing another point on it.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
