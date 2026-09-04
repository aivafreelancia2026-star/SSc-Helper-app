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
  "q_ext_points",
  "q_opp_bc",
  "q_opp_cd",
  "q_opp_ad",
  "q_adj_bc",
  "q_adj_cd",
  "q_adj_ad",
  "q_opp_angle_pair",
  "q_adj_angle_b",
  "q_adj_angle_c",
  "q_adj_angle_d",
  "q_think_quad",
];

/* ─────────────────────────────────────────────
   Accepted correct answers (normalised)
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  q_ext_points: ["tuv", "tvu", "utv", "uvt", "vtu", "vut"],
  // Opposite sides
  q_opp_bc: ["ad", "da"],
  q_opp_cd: ["ab", "ba"],
  q_opp_ad: ["bc", "cb"],
  // Adjacent sides
  q_adj_bc: ["abcd", "abdc", "cdab", "dcab", "cdba", "abandcd", "cdandab"],
  q_adj_cd: ["bcad", "bcda", "adbc", "adcb", "dabc", "bcandad", "adandbc", "bcandda", "daandbc"],
  q_adj_ad: ["abcd", "abdc", "cdab", "dcab", "cdba", "abandcd", "cdandab"],
  // Opposite angles
  q_opp_angle_pair: ["bd", "db", "bandd", "dandb"],
  // Adjacent angles
  q_adj_angle_b: ["ac", "ca", "aandc", "canda"],
  q_adj_angle_c: ["bd", "db", "bandd", "dandb"],
  q_adj_angle_d: ["ac", "ca", "aandc", "canda"],
  // Think, discuss
  q_think_quad: ["no", "cannot", "cant", "notpossible"],
};

/* ─────────────────────────────────────────────
   Reveal text
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_ext_points: "T, U, V",
  q_opp_bc: "AD",
  q_opp_cd: "AB",
  q_opp_ad: "BC",
  q_adj_bc: "AB and CD",
  q_adj_cd: "BC and AD",
  q_adj_ad: "AB and CD",
  q_opp_angle_pair: "∠B and ∠D",
  q_adj_angle_b: "∠A and ∠C",
  q_adj_angle_c: "∠B and ∠D",
  q_adj_angle_d: "∠A and ∠C",
  q_think_quad: "No — it forms △ACD, not a quadrilateral",
};

/* ─────────────────────────────────────────────
   Math helpers
───────────────────────────────────────────── */

/** Line-segment with overline: e.g. <Seg>AB</Seg> renders A̅B̅ style */
function Seg({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block font-semibold font-mono tracking-wide"
      style={{ textDecoration: "overline", textDecorationThickness: "2px" }}
    >
      {children}
    </span>
  );
}

const normalizeAndSort = (s: string) =>
  s.trim().toLowerCase().replace(/[^a-z0-9]/g, "").split("").sort().join("");

const normalize = (s: string) =>
  s.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

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

export function C6MathsCh4Page8() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch4-page8";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  /* Interactive highlight for quadrilateral ABCD diagram */
  const [highlight, setHighlight] = useState<string | null>(null);

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
    return () =>
      window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, [storageKey]);

  const handleChange = (id: string, val: string) => {
    if (isRevealed) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
    localStorage.setItem(`${storageKey}-${id}-answer`, val);
  };

  const handleBlur = (
    id: string,
    correctAnswers: string[],
    isOpen = false,
    sortChars = false
  ) => {
    if (isRevealed) return;
    const rawTyped = answers[id] ?? "";
    const typed = sortChars
      ? normalizeAndSort(rawTyped)
      : normalize(rawTyped);

    if (!typed && !isOpen) return;
    if (isOpen && !rawTyped.trim()) return;

    const prev = graded[id];
    if (prev && prev.value === typed) return;

    let correct: boolean;
    if (isOpen) {
      correct =
        correctAnswers.some((ans) =>
          typed.includes(
            sortChars ? normalizeAndSort(ans) : normalize(ans)
          )
        ) || rawTyped.trim().length >= 4;
    } else {
      correct = correctAnswers.some(
        (ans) =>
          (sortChars ? normalizeAndSort(ans) : normalize(ans)) === typed
      );
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
    sortChars = false,
    className = "",
    width = "",
  }: {
    id: string;
    placeholder: string;
    correct: string[];
    isOpen?: boolean;
    sortChars?: boolean;
    className?: string;
    width?: string;
  }) {
    return (
      <div className={`relative inline-block ${width || "w-full"} ${className}`}>
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
        <StatusIcon
          id={id}
          answers={answers}
          graded={graded}
          isRevealed={isRevealed}
        />
      </div>
    );
  }

  /* ── helpers for interactive quad diagram ── */
  const sideColor = (side: string) =>
    highlight === side ? "#4f46e5" : "#475569";
  const sideWidth = (side: string) => (highlight === side ? "4" : "2.5");
  const diagColor = (d: string) =>
    highlight === d ? "#db2777" : "#94a3b8";
  const diagWidth = (d: string) => (highlight === d ? "3" : "1.5");
  const vtxR = (v: string) => (highlight === v ? 7 : 5);
  const vtxFill = (v: string) =>
    highlight === v ? "#ef4444" : "#3730a3";

  return (
    <div className="space-y-8 text-foreground leading-relaxed font-body max-w-5xl mx-auto pb-12">
      {feedback && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* ────────────────────────────────────────────
          TRIANGLE REGIONS (continuation from P63)
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-teal-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-white/20 rounded-lg">📐</span>
            <span>TRIANGLE (Continued)</span>
          </div>
          <span className="text-xs bg-teal-800/80 px-2.5 py-1 rounded-full border border-teal-500/30">
            Page 56 / Book P64
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-5 text-sm sm:text-base">
          {/* Exterior points question */}
          <div className="space-y-3">
            <p>
              <strong>T</strong> is in the exterior of the triangle. What are
              the other points in the exterior?
            </p>
            <div className="max-w-xs">
              <Field
                id="q_ext_points"
                placeholder="e.g. U, V"
                correct={CORRECT.q_ext_points}
                sortChars
              />
            </div>
          </div>

          {/* Three parts summary */}
          <div className="space-y-2">
            <p>
              Therefore, a <strong>triangle divides a plane</strong> into{" "}
              <strong>three parts</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { n: "i", label: "Interior of the triangle", icon: "🔷", color: "bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800" },
                { n: "ii", label: "Boundary of the triangle", icon: "🔶", color: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800" },
                { n: "iii", label: "Exterior of the triangle", icon: "⬜", color: "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800" },
              ].map((p) => (
                <div
                  key={p.n}
                  className={`rounded-xl border p-3 text-center font-semibold text-xs sm:text-sm ${p.color}`}
                >
                  <span className="mr-1">{p.icon}</span> ({p.n}) {p.label}
                </div>
              ))}
            </div>
            <p className="font-bold border-l-4 border-teal-500 pl-3 mt-2">
              The boundary and interior of the triangle together is called
              the <em className="underline decoration-teal-500 decoration-2">triangular region</em>.
            </p>
          </div>

          {/* DO THIS */}
          <div className="rounded-xl border border-teal-200 dark:border-teal-900 bg-teal-50 dark:bg-teal-950/20 overflow-hidden">
            <div className="bg-teal-600 text-white font-bold px-4 py-2 text-sm flex items-center gap-2">
              <span>📖</span> DO THIS
            </div>
            <div className="p-4 text-sm space-y-2">
              <p>
                Take some straw pieces of different size. Pass thread into any
                3 pieces and make different triangles. Draw figures for the
                triangles in your notebook.
              </p>
              <div className="flex items-center gap-4 pt-1">
                <svg className="w-14 h-14 shrink-0" viewBox="0 0 100 100">
                  <polygon
                    points="50,15 90,85 10,85"
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                  <circle cx="10" cy="85" r="4" fill="#dc2626" />
                  <circle cx="50" cy="15" r="4" fill="#dc2626" />
                  <circle cx="90" cy="85" r="4" fill="#dc2626" />
                </svg>
                <span className="text-xs text-muted-foreground italic">
                  Thread through straw pieces forms the sides of a triangle ▲
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          4.9 QUADRILATERAL
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-indigo-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-indigo-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono text-sm">
              4.9
            </span>
            <span>QUADRILATERAL</span>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-8 text-sm sm:text-base">
          {/* Intro paragraph + polygon figures (i) & (ii) */}
          <div className="space-y-4">
            <p>
              Observe the polygons in the adjacent figure. You know that a
              polygon with three sides as in Fig (i) is a{" "}
              <strong>triangle</strong>, similarly a simple closed polygon
              with four sides is called a <strong>quadrilateral</strong>. Fig.
              (ii) is an example for quadrilateral.
            </p>

            <div className="flex flex-wrap justify-center gap-8 py-2">
              {/* Fig (i) — triangle */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-28 h-28 bg-white dark:bg-slate-900 rounded-xl border p-2 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 120 110">
                    <polygon
                      points="60,10 110,100 10,100"
                      fill="none"
                      stroke="#0ea5e9"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <circle cx="60" cy="10" r="3" fill="#0284c7" />
                    <circle cx="110" cy="100" r="3" fill="#0284c7" />
                    <circle cx="10" cy="100" r="3" fill="#0284c7" />
                  </svg>
                </div>
                <span className="text-xs font-semibold">(i)</span>
              </div>

              {/* Fig (ii) — quadrilateral */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-28 h-28 bg-white dark:bg-slate-900 rounded-xl border p-2 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 120 110">
                    <polygon
                      points="15,95 100,100 105,15 35,20"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <circle cx="15" cy="95" r="3" fill="#3730a3" />
                    <circle cx="100" cy="100" r="3" fill="#3730a3" />
                    <circle cx="105" cy="15" r="3" fill="#3730a3" />
                    <circle cx="35" cy="20" r="3" fill="#3730a3" />
                  </svg>
                </div>
                <span className="text-xs font-semibold">(ii)</span>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border/60" />

          {/* ── Interactive ABCD diagram + description ── */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* SVG diagram */}
              <div className="w-full lg:w-auto shrink-0 flex flex-col items-center">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border p-4 shadow-inner">
                  <svg
                    className="w-56 sm:w-64 h-auto"
                    viewBox="0 0 260 240"
                  >
                    {/* Diagonals (behind polygon) */}
                    <line
                      x1="30" y1="180" x2="220" y2="50"
                      stroke={diagColor("AC")}
                      strokeWidth={diagWidth("AC")}
                      strokeDasharray={highlight === "AC" ? "" : "5,4"}
                      className="cursor-pointer transition-all"
                      onClick={() => setHighlight(highlight === "AC" ? null : "AC")}
                    />
                    <line
                      x1="200" y1="200" x2="60" y2="50"
                      stroke={diagColor("BD")}
                      strokeWidth={diagWidth("BD")}
                      strokeDasharray={highlight === "BD" ? "" : "5,4"}
                      className="cursor-pointer transition-all"
                      onClick={() => setHighlight(highlight === "BD" ? null : "BD")}
                    />

                    {/* Sides */}
                    <line x1="30" y1="180" x2="200" y2="200"
                      stroke={sideColor("AB")} strokeWidth={sideWidth("AB")}
                      className="cursor-pointer" onClick={() => setHighlight(highlight === "AB" ? null : "AB")} />
                    <line x1="200" y1="200" x2="220" y2="50"
                      stroke={sideColor("BC")} strokeWidth={sideWidth("BC")}
                      className="cursor-pointer" onClick={() => setHighlight(highlight === "BC" ? null : "BC")} />
                    <line x1="220" y1="50" x2="60" y2="50"
                      stroke={sideColor("CD")} strokeWidth={sideWidth("CD")}
                      className="cursor-pointer" onClick={() => setHighlight(highlight === "CD" ? null : "CD")} />
                    <line x1="60" y1="50" x2="30" y2="180"
                      stroke={sideColor("DA")} strokeWidth={sideWidth("DA")}
                      className="cursor-pointer" onClick={() => setHighlight(highlight === "DA" ? null : "DA")} />

                    {/* Angle arcs (small) */}
                    {highlight === "∠A" && <path d="M 50,170 A 20,20 0 0,1 38,162" fill="none" stroke="#ef4444" strokeWidth="2" />}
                    {highlight === "∠B" && <path d="M 190,192 A 16,16 0 0,1 202,186" fill="none" stroke="#ef4444" strokeWidth="2" />}
                    {highlight === "∠C" && <path d="M 206,56 A 16,16 0 0,1 214,64" fill="none" stroke="#ef4444" strokeWidth="2" />}
                    {highlight === "∠D" && <path d="M 66,62 A 16,16 0 0,1 54,58" fill="none" stroke="#ef4444" strokeWidth="2" />}

                    {/* Vertices */}
                    <g className="cursor-pointer" onClick={() => setHighlight(highlight === "∠A" ? null : "∠A")}>
                      <circle cx="30" cy="180" r={vtxR("∠A")} fill={vtxFill("∠A")} />
                      <text x="10" y="198" fontSize="15" fontWeight="bold" fill="#312e81">A</text>
                    </g>
                    <g className="cursor-pointer" onClick={() => setHighlight(highlight === "∠B" ? null : "∠B")}>
                      <circle cx="200" cy="200" r={vtxR("∠B")} fill={vtxFill("∠B")} />
                      <text x="207" y="218" fontSize="15" fontWeight="bold" fill="#312e81">B</text>
                    </g>
                    <g className="cursor-pointer" onClick={() => setHighlight(highlight === "∠C" ? null : "∠C")}>
                      <circle cx="220" cy="50" r={vtxR("∠C")} fill={vtxFill("∠C")} />
                      <text x="228" y="48" fontSize="15" fontWeight="bold" fill="#312e81">C</text>
                    </g>
                    <g className="cursor-pointer" onClick={() => setHighlight(highlight === "∠D" ? null : "∠D")}>
                      <circle cx="60" cy="50" r={vtxR("∠D")} fill={vtxFill("∠D")} />
                      <text x="42" y="42" fontSize="15" fontWeight="bold" fill="#312e81">D</text>
                    </g>
                  </svg>
                </div>

                {/* Interactive legend buttons */}
                <div className="flex flex-wrap justify-center gap-1.5 mt-3 max-w-[260px]">
                  {["AB", "BC", "CD", "DA"].map((s) => (
                    <button key={s} onClick={() => setHighlight(highlight === s ? null : s)}
                      className={`px-2 py-0.5 text-[11px] font-mono rounded-md border transition-all ${
                        highlight === s ? "bg-indigo-600 text-white border-indigo-600" : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      <Seg>{s}</Seg>
                    </button>
                  ))}
                  {["AC", "BD"].map((d) => (
                    <button key={d} onClick={() => setHighlight(highlight === d ? null : d)}
                      className={`px-2 py-0.5 text-[11px] font-mono rounded-md border transition-all ${
                        highlight === d ? "bg-pink-600 text-white border-pink-600" : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      <Seg>{d}</Seg>
                    </button>
                  ))}
                  {["∠A", "∠B", "∠C", "∠D"].map((a) => (
                    <button key={a} onClick={() => setHighlight(highlight === a ? null : a)}
                      className={`px-2 py-0.5 text-[11px] font-mono font-bold rounded-md border transition-all ${
                        highlight === a ? "bg-red-500 text-white border-red-500" : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                  {highlight && (
                    <button onClick={() => setHighlight(null)}
                      className="text-[11px] text-muted-foreground underline ml-1"
                    >
                      reset
                    </button>
                  )}
                </div>
              </div>

              {/* Description text */}
              <div className="flex-1 space-y-3 text-sm">
                <p>
                  Here <strong>ABCD</strong> is a quadrilateral and the four
                  line segments <Seg>AB</Seg>, <Seg>BC</Seg>, <Seg>CD</Seg>{" "}
                  and <Seg>AD</Seg> are called its four{" "}
                  <strong>sides</strong>, <strong>∠A</strong>,{" "}
                  <strong>∠B</strong>, <strong>∠C</strong> and{" "}
                  <strong>∠D</strong> are its four <strong>angles</strong> and
                  the line segments joining opposite vertices A, C and B, D
                  namely <Seg>AC</Seg> and <Seg>BD</Seg>, are called its two{" "}
                  <strong>diagonals</strong>.
                </p>
                <p>
                  As in a triangle, quadrilateral drawn on a plane, divides it
                  into three parts known as{" "}
                  <strong>(i) interior</strong>,{" "}
                  <strong>(ii) boundary</strong> and{" "}
                  <strong>(iii) exterior</strong> of the quadrilateral.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border/60" />

          {/* ── Shaded Quadrilateral: Interior / Exterior ── */}
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-44 shrink-0 bg-white dark:bg-slate-900 rounded-xl border p-3 flex justify-center">
              <svg className="w-full h-auto max-w-[150px]" viewBox="0 0 160 150">
                {/* Shaded interior */}
                <polygon
                  points="25,125 135,115 115,25 40,35"
                  fill="#fef08a"
                  stroke="#a16207"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {/* Interior point P */}
                <circle cx="80" cy="75" r="3" fill="#854d0e" />
                <text x="85" y="72" fontSize="11" fontWeight="bold" fill="#854d0e">P</text>
                {/* Exterior point R */}
                <circle cx="148" cy="80" r="3" fill="#dc2626" />
                <text x="148" y="95" fontSize="11" fontWeight="bold" fill="#b91c1c">R</text>
              </svg>
            </div>
            <div className="text-sm space-y-2">
              <p>
                The <span className="px-1 py-0.5 rounded bg-amber-200/80 dark:bg-amber-900/40 font-bold text-amber-900 dark:text-amber-200">shaded part</span> of
                the quadrilateral is its <strong>interior</strong> and the
                unshaded part is the <strong>exterior</strong> of the
                Quadrilateral.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-border/60" />

          {/* ── Opposite & Adjacent: Fill-in-the-blank questions ── */}
          <div className="space-y-6">
            <h4 className="font-heading font-bold text-base text-foreground">
              Opposite & Adjacent Sides and Angles
            </h4>

            {/* ── Opposite Sides ── */}
            <div className="rounded-xl border bg-slate-50/60 dark:bg-slate-900/40 p-4 sm:p-5 space-y-4">
              <p className="font-semibold text-indigo-700 dark:text-indigo-400 text-xs uppercase tracking-wider">
                Opposite Sides
              </p>

              <p className="flex flex-wrap items-center gap-x-1 gap-y-2">
                The side opposite to <Seg>AB</Seg> is <Seg>DC</Seg>.
              </p>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                  <span>What is the side opposite to <Seg>BC</Seg>?</span>
                  <Field
                    id="q_opp_bc"
                    placeholder="e.g. AD"
                    correct={CORRECT.q_opp_bc}
                    width="w-28"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                  <span>What is the side opposite to <Seg>CD</Seg>?</span>
                  <Field
                    id="q_opp_cd"
                    placeholder="e.g. AB"
                    correct={CORRECT.q_opp_cd}
                    width="w-28"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                  <span>What is the side opposite to <Seg>AD</Seg>?</span>
                  <Field
                    id="q_opp_ad"
                    placeholder="e.g. BC"
                    correct={CORRECT.q_opp_ad}
                    width="w-28"
                  />
                </div>
              </div>
            </div>

            {/* ── Adjacent Sides ── */}
            <div className="rounded-xl border bg-slate-50/60 dark:bg-slate-900/40 p-4 sm:p-5 space-y-4">
              <p className="font-semibold text-indigo-700 dark:text-indigo-400 text-xs uppercase tracking-wider">
                Adjacent Sides
              </p>

              <p className="flex flex-wrap items-center gap-x-1 gap-y-2">
                The side <Seg>AB</Seg> is adjacent to <Seg>BC</Seg> and{" "}
                <Seg>AD</Seg>.
              </p>

              <div className="space-y-3">
                <div className="space-y-1">
                  <span>Name the adjacent sides of <Seg>BC</Seg>:</span>
                  <Field
                    id="q_adj_bc"
                    placeholder="e.g. AB and CD"
                    correct={CORRECT.q_adj_bc}
                    sortChars
                  />
                </div>
                <div className="space-y-1">
                  <span>Name the adjacent sides of <Seg>CD</Seg>:</span>
                  <Field
                    id="q_adj_cd"
                    placeholder="e.g. BC and AD"
                    correct={CORRECT.q_adj_cd}
                    sortChars
                  />
                </div>
                <div className="space-y-1">
                  <span>Name the adjacent sides of <Seg>AD</Seg>:</span>
                  <Field
                    id="q_adj_ad"
                    placeholder="e.g. AB and CD"
                    correct={CORRECT.q_adj_ad}
                    sortChars
                  />
                </div>
              </div>
            </div>

            {/* ── Opposite & Adjacent Angles ── */}
            <div className="rounded-xl border bg-slate-50/60 dark:bg-slate-900/40 p-4 sm:p-5 space-y-4">
              <p className="font-semibold text-indigo-700 dark:text-indigo-400 text-xs uppercase tracking-wider">
                Opposite & Adjacent Angles
              </p>

              <p>
                Opposite angles are <strong>∠A</strong> and{" "}
                <strong>∠C</strong>. What is the other pair of opposite
                angles?
              </p>
              <Field
                id="q_opp_angle_pair"
                placeholder="e.g. ∠B and ∠D"
                correct={CORRECT.q_opp_angle_pair}
                sortChars
              />

              <div className="w-full h-px bg-border/40 my-2" />

              <p>
                The adjacent angles of <strong>∠A</strong> are{" "}
                <strong>∠B</strong> and <strong>∠D</strong>. What are the
                other pairs of adjacent angles?
              </p>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                  <span>Adjacent angles of <strong>∠B</strong>:</span>
                  <Field
                    id="q_adj_angle_b"
                    placeholder="e.g. ∠A and ∠C"
                    correct={CORRECT.q_adj_angle_b}
                    sortChars
                    width="w-40"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                  <span>Adjacent angles of <strong>∠C</strong>:</span>
                  <Field
                    id="q_adj_angle_c"
                    placeholder="e.g. ∠B and ∠D"
                    correct={CORRECT.q_adj_angle_c}
                    sortChars
                    width="w-40"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                  <span>Adjacent angles of <strong>∠D</strong>:</span>
                  <Field
                    id="q_adj_angle_d"
                    placeholder="e.g. ∠A and ∠C"
                    correct={CORRECT.q_adj_angle_d}
                    sortChars
                    width="w-40"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          THINK, DISCUSS AND WRITE
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-emerald-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-emerald-700 text-white font-heading font-bold px-4 py-2.5 text-sm sm:text-base flex items-center gap-2">
          <span>💭</span>
          <span>THINK, DISCUSS AND WRITE</span>
        </div>

        <div className="p-5 sm:p-6 space-y-5 text-sm sm:text-base">
          <p>
            Take four points A, B, C and D such that A, B, C lie on the same
            line and D is not on it. Can the four line segments{" "}
            <Seg>BC</Seg>, <Seg>CD</Seg> and <Seg>AD</Seg> form a
            quadrilateral? Give reason.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            {/* Collinear-points diagram */}
            <div className="w-56 shrink-0 bg-white dark:bg-slate-900 rounded-xl border p-3 flex flex-col items-center gap-2">
              <svg className="w-full h-auto" viewBox="0 0 220 120">
                {/* Horizontal line A-B-C */}
                <line
                  x1="15"
                  y1="90"
                  x2="205"
                  y2="90"
                  stroke="#059669"
                  strokeWidth="2.5"
                />
                <circle cx="35" cy="90" r="4" fill="#047857" />
                <text x="27" y="110" fontSize="14" fontWeight="bold" fill="#047857">
                  A
                </text>
                <circle cx="110" cy="90" r="4" fill="#047857" />
                <text x="103" y="110" fontSize="14" fontWeight="bold" fill="#047857">
                  B
                </text>
                <circle cx="185" cy="90" r="4" fill="#047857" />
                <text x="178" y="110" fontSize="14" fontWeight="bold" fill="#047857">
                  C
                </text>

                {/* Point D above */}
                <circle cx="110" cy="22" r="4" fill="#dc2626" />
                <text x="116" y="20" fontSize="14" fontWeight="bold" fill="#b91c1c">
                  D
                </text>

                {/* Dashed lines to D */}
                <line x1="35" y1="90" x2="110" y2="22" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" />
                <line x1="185" y1="90" x2="110" y2="22" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" />
                <line x1="110" y1="90" x2="110" y2="22" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" />
              </svg>
              <span className="text-[10px] text-muted-foreground text-center font-medium">
                A, B, C are collinear; D is not on the line
              </span>
            </div>

            <div className="flex-1 space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">
                  Can they form a quadrilateral?
                </label>
                <Field
                  id="q_think_quad"
                  placeholder="Yes / No"
                  correct={CORRECT.q_think_quad}
                />
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-xs text-emerald-900 dark:text-emerald-200">
                <strong>Reason:</strong> Since A, B, C are on the same line
                (collinear), we only get the triangle △ACD (or △BCD). Three
                collinear vertices cannot form a quadrilateral because the
                polygon would degenerate into a triangle.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
