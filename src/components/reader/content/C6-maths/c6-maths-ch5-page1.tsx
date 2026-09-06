"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Gradable Points / Concept Questions for Page 69
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "q_p69_intro_shapes", // Shapes in fig 5.1: circle, line segment, triangle, quadrilateral, polygon, angle
  "q_p69_line_segment_edges", // Edges of book, TV screen, bricks are like: line segments
  "q_p69_triangle_quad_lines", // Triangle made of 3 and quad of 4 line segments
  "q_p69_length_def", // Measure of each line segment is its: length
  "q_p69_three_ways_compare", // 3 ways to compare: Observation, Tracing, Instruments
  "q_p69_fig52_longer", // Which is longer in fig 5.2? AB is longer than CD
  "q_p69_fig53_ab_cd_compare", // In fig 5.3, are AB and CD equal? Yes / Equal
  "q_p69_fig53_pq_rs_compare", // In fig 5.3, are PQ and RS equal? Yes / Equal (optical illusion)
  "q_p69_why_difficult", // Why difficult to compare fig 5.3? They look different / optical illusion / need instrument
];

/* ─────────────────────────────────────────────
   Reveal text for answers
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_p69_intro_shapes: "Circle, Line Segment, Triangle, Quadrilateral, Polygon, Angle",
  q_p69_line_segment_edges: "Line segment (straight edge with two endpoints)",
  q_p69_triangle_quad_lines: "3 and 4 line segments",
  q_p69_length_def: "Length (measure of distance between endpoints)",
  q_p69_three_ways_compare: "a) Simple observation, b) Tracing on paper, c) Using instruments",
  q_p69_fig52_longer: "Segment AB is longer than Segment CD",
  q_p69_fig53_ab_cd_compare: "Both are equal in length (verified by instrument)",
  q_p69_fig53_pq_rs_compare: "Both are equal in length (T-illusion / vertical-horizontal illusion)",
  q_p69_why_difficult: "Optical illusion: directions & orientation trick the eyes, requiring measuring instruments",
};

/* ─────────────────────────────────────────────
   Answer Validator
───────────────────────────────────────────── */
function validateAnswer(id: string, rawValue: string): boolean {
  const v = rawValue.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!v) return false;

  switch (id) {
    case "q_p69_intro_shapes":
      return (
        v.includes("line") ||
        v.includes("triangle") ||
        v.includes("angle") ||
        v.includes("circle") ||
        v.includes("quad") ||
        v.includes("shape")
      );

    case "q_p69_line_segment_edges":
      return (
        v.includes("linesegment") ||
        v.includes("segment") ||
        (v.includes("line") && !v.includes("ray"))
      );

    case "q_p69_triangle_quad_lines":
      return (
        (v.includes("3") && v.includes("4")) ||
        (v.includes("three") && v.includes("four")) ||
        v.includes("3and4") ||
        v.includes("34")
      );

    case "q_p69_length_def":
      return (
        v.includes("length") ||
        v.includes("measure") ||
        v.includes("distance")
      );

    case "q_p69_three_ways_compare":
      return (
        v.includes("observation") ||
        v.includes("tracing") ||
        v.includes("instrument") ||
        v.includes("3ways") ||
        v.includes("three")
      );

    case "q_p69_fig52_longer":
      return (
        v === "ab" ||
        v.includes("ab") ||
        v.includes("segmentab") ||
        v.includes("lineab") ||
        v.includes("first")
      );

    case "q_p69_fig53_ab_cd_compare":
      return (
        v.includes("equal") ||
        v === "same" ||
        v.includes("samelength") ||
        v.includes("yes")
      );

    case "q_p69_fig53_pq_rs_compare":
      return (
        v.includes("equal") ||
        v === "same" ||
        v.includes("samelength") ||
        v.includes("yes")
      );

    case "q_p69_why_difficult":
      return (
        v.includes("illusion") ||
        v.includes("eye") ||
        v.includes("instrument") ||
        v.includes("direction") ||
        v.includes("difficult") ||
        v.includes("close") ||
        v.includes("look") ||
        v.length >= 3
      );

    default:
      return false;
  }
}

/* ─────────────────────────────────────────────
   Math notation helpers
───────────────────────────────────────────── */
function Seg({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block font-mono font-bold tracking-wider px-0.5"
      style={{ textDecoration: "overline", textDecorationThickness: "2px" }}
    >
      {children}
    </span>
  );
}

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

export function C6MathsCh5Page1() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;

  const storageKey = "c6-maths-ch5-page1";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    label?: string;
    id: number;
  } | null>(null);

  // Interactive Ruler simulation on Fig 5.2 and Fig 5.3
  const [showRulerFig52, setShowRulerFig52] = useState<boolean>(false);
  const [showRulerFig53, setShowRulerFig53] = useState<boolean>(false);

  // Selected shape in Fig 5.1
  const [selectedShapeFig51, setSelectedShapeFig51] = useState<string | null>("triangle");

  // Statistics
  const answeredCount = useMemo(() => {
    return ALL_INPUT_IDS.filter((id) => (answers[id] ?? "").trim().length > 0).length;
  }, [answers]);

  const correctCount = useMemo(() => {
    return ALL_INPUT_IDS.filter((id) => graded[id]?.correct === true).length;
  }, [graded]);

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
      setShowRulerFig52(false);
      setShowRulerFig53(false);
    };
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () =>
      window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, [storageKey]);

  const handleResetPage = () => {
    ALL_INPUT_IDS.forEach((id) => {
      localStorage.removeItem(`${storageKey}-${id}-answer`);
      localStorage.removeItem(`${storageKey}-${id}-graded`);
    });
    setAnswers({});
    setGraded({});
    setFeedback(null);
    setShowRulerFig52(false);
    setShowRulerFig53(false);
  };

  const handleToggleReveal = () => {
    const nextState = !showReveal;
    setShowReveal(nextState);
    if (nextState) {
      const revealKey = `${storageKey}-reveal-awarded`;
      if (!localStorage.getItem(revealKey)) {
        addPoints(1);
        localStorage.setItem(revealKey, "1");
        setFeedback({ correct: true, label: "Answers Revealed! +1 pt", id: Date.now() });
      }
    }
  };

  const handleChange = (id: string, val: string) => {
    if (isRevealed) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
    localStorage.setItem(`${storageKey}-${id}-answer`, val);
  };

  const gradeField = (id: string) => {
    if (isRevealed) return;
    const rawTyped = answers[id] ?? "";
    const typed = rawTyped.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!typed) return;

    const prev = graded[id];
    if (prev && prev.value === rawTyped) return;

    const correct = validateAnswer(id, rawTyped);
    let delta = 0;
    if (prev) {
      if (!prev.correct && correct) delta = 2;
      else if (prev.correct && !correct) delta = -2;
    } else {
      delta = correct ? 1 : -1;
    }

    if (delta !== 0) addPoints(delta);
    setFeedback({
      correct,
      label: correct ? "Correct! +1 pt" : "Try Again! -1 pt",
      id: Date.now(),
    });

    const next = { ...graded, [id]: { value: rawTyped, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${id}-graded`,
      JSON.stringify({ value: rawTyped, correct })
    );
  };

  const gradeDirectly = (id: string, value: string) => {
    if (isRevealed) return;
    const prev = graded[id];
    if (prev && prev.value === value) return;

    const correct = validateAnswer(id, value);
    let delta = 0;
    if (prev) {
      if (!prev.correct && correct) delta = 2;
      else if (prev.correct && !correct) delta = -2;
    } else {
      delta = correct ? 1 : -1;
    }

    if (delta !== 0) addPoints(delta);
    setFeedback({
      correct,
      label: correct ? "Correct! +1 pt" : "Try Again! -1 pt",
      id: Date.now(),
    });

    const next = { ...graded, [id]: { value, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${id}-graded`,
      JSON.stringify({ value, correct })
    );
  };

  const handleCheckAll = () => {
    if (isRevealed) return;
    let pointsDelta = 0;
    const newGraded = { ...graded };

    ALL_INPUT_IDS.forEach((id) => {
      const rawTyped = answers[id] ?? "";
      if (!rawTyped.trim()) return;

      const correct = validateAnswer(id, rawTyped);
      const prev = graded[id];

      if (prev) {
        if (!prev.correct && correct) pointsDelta += 2;
        else if (prev.correct && !correct) pointsDelta -= 2;
      } else {
        pointsDelta += correct ? 1 : -1;
      }

      newGraded[id] = { value: rawTyped, correct };
      localStorage.setItem(
        `${storageKey}-${id}-graded`,
        JSON.stringify({ value: rawTyped, correct })
      );
    });

    if (pointsDelta !== 0) addPoints(pointsDelta);
    setGraded(newGraded);
    setFeedback({
      correct: pointsDelta >= 0,
      label: pointsDelta >= 0 ? `Scored! +${pointsDelta} pts` : `Reviewed!`,
      id: Date.now(),
    });
  };

  function Field({
    id,
    placeholder,
    className = "",
    width = "",
  }: {
    id: string;
    placeholder: string;
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
          onBlur={() => gradeField(id)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              gradeField(id);
              e.currentTarget.blur();
            }
          }}
          disabled={isRevealed}
          className={`w-full rounded-xl border px-3.5 py-2.5 pr-8 text-xs sm:text-sm font-mono outline-none transition-all shadow-sm ${borderCls(
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

  return (
    <div className="space-y-8 text-foreground leading-relaxed font-body max-w-5xl mx-auto pb-12">
      {feedback && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          label={feedback.label || (feedback.correct ? "Correct! +1" : "Try Again! -1")}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* ────────────────────────────────────────────
          PAGE 69 BANNER & CHAPTER 5 INTRODUCTION
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-emerald-600/40 bg-card overflow-hidden shadow-sm">
        {/* Banner with Chapter 5 header & QR Code */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-800 text-white font-heading font-bold px-5 py-4 text-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur rounded-xl text-2xl font-black">
              5
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-950/80 text-emerald-200 px-2 py-0.5 rounded font-mono font-bold">
                  CHAPTER 5
                </span>
                <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded font-mono">
                  QR: Z11032
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                Measures of Lines and Angles
              </h1>
            </div>
          </div>
          <span className="text-xs bg-emerald-950/80 text-emerald-200 px-3 py-1 rounded-full border border-emerald-400/30 font-mono self-start sm:self-auto">
            Page 69 / 193
          </span>
        </div>

        {/* Scoring & Action Controls Bar */}
        <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border-b border-emerald-200 dark:border-emerald-800/60 p-4 px-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700/60 rounded-xl px-3.5 py-1.5 shadow-xs">
              <span className="text-base">⭐</span>
              <span className="text-xs font-semibold text-muted-foreground">Total Points:</span>
              <span className="font-heading font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                {score}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700/60 rounded-xl px-3.5 py-1.5 shadow-xs">
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
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-semibold text-xs transition-colors shadow-xs cursor-pointer active:scale-95"
            >
              ✓ Check Answers
            </button>
            <button
              type="button"
              onClick={handleToggleReveal}
              className={`px-4 py-1.5 rounded-xl border text-xs font-heading font-semibold transition-colors cursor-pointer active:scale-95 ${
                isRevealed
                  ? "bg-amber-600 text-white border-amber-700"
                  : "bg-white dark:bg-slate-800 text-foreground border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {isRevealed ? "🙈 Hide Key" : "👁️ Reveal Answers"}
            </button>
            <button
              type="button"
              onClick={handleResetPage}
              className="px-3 py-1.5 rounded-xl border border-red-300 dark:border-red-800/60 bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-heading font-semibold transition-colors cursor-pointer"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          SECTION 5.1: INTRODUCTION
          (Textbook Fig. 5.1 and Geometrical Shapes)
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-card overflow-hidden shadow-sm space-y-5 p-5 sm:p-7">
        <div className="border-b border-emerald-200 dark:border-emerald-800/60 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="bg-emerald-700 text-white text-xs font-mono font-bold px-2 py-0.5 rounded">
              5.1
            </span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-emerald-950 dark:text-emerald-200">
              INTRODUCTION
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">
            Basic Geometrical Shapes Review
          </span>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-foreground">
          In the chapter <em>&apos;Basic Geometrical Ideas&apos;</em>, we learnt about some geometrical shapes.
          These included lines, angles, triangles, quadrilaterals and circles. Many of these are made of line segments and angles formed by them.
          We can see that in these shapes, lines and angles have different sizes. We can often compare the lengths of line segments and the measures of angles between them by looking at them.
        </p>

        {/* ── Fig. 5.1 Interactive Shapes Display ────────────────── */}
        <div className="p-4 sm:p-6 rounded-2xl bg-muted/30 border border-emerald-200 dark:border-emerald-800/50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Fig. 5.1: Common Geometrical Shapes
            </span>
            <span className="text-[11px] text-muted-foreground">
              Click any shape to inspect its elements
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 py-2">
            {/* Shape 1: Circle */}
            <div
              onClick={() => setSelectedShapeFig51("circle")}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                selectedShapeFig51 === "circle"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 shadow-xs ring-2 ring-emerald-400/30"
                  : "bg-white dark:bg-slate-900 hover:border-emerald-300"
              }`}
            >
              <svg viewBox="0 0 60 60" className="w-12 h-12">
                <circle cx="30" cy="30" r="22" fill="none" stroke="#0d9488" strokeWidth="2.5" />
              </svg>
              <span className="text-[11px] font-bold text-foreground">Circle</span>
            </div>

            {/* Shape 2: Line Segment */}
            <div
              onClick={() => setSelectedShapeFig51("segment")}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                selectedShapeFig51 === "segment"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 shadow-xs ring-2 ring-emerald-400/30"
                  : "bg-white dark:bg-slate-900 hover:border-emerald-300"
              }`}
            >
              <svg viewBox="0 0 60 60" className="w-12 h-12">
                <line x1="8" y1="30" x2="52" y2="30" stroke="#0d9488" strokeWidth="3" />
                <circle cx="8" cy="30" r="3" fill="#0d9488" />
                <circle cx="52" cy="30" r="3" fill="#0d9488" />
              </svg>
              <span className="text-[11px] font-bold text-foreground">Line Segment</span>
            </div>

            {/* Shape 3: Triangle */}
            <div
              onClick={() => setSelectedShapeFig51("triangle")}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                selectedShapeFig51 === "triangle"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 shadow-xs ring-2 ring-emerald-400/30"
                  : "bg-white dark:bg-slate-900 hover:border-emerald-300"
              }`}
            >
              <svg viewBox="0 0 60 60" className="w-12 h-12">
                <polygon points="30,8 10,50 50,50" fill="none" stroke="#0d9488" strokeWidth="2.5" />
              </svg>
              <span className="text-[11px] font-bold text-foreground">Triangle</span>
            </div>

            {/* Shape 4: Rhombus / Quadrilateral */}
            <div
              onClick={() => setSelectedShapeFig51("quadrilateral")}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                selectedShapeFig51 === "quadrilateral"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 shadow-xs ring-2 ring-emerald-400/30"
                  : "bg-white dark:bg-slate-900 hover:border-emerald-300"
              }`}
            >
              <svg viewBox="0 0 60 60" className="w-12 h-12">
                <polygon points="30,8 52,30 30,52 8,30" fill="none" stroke="#0d9488" strokeWidth="2.5" />
              </svg>
              <span className="text-[11px] font-bold text-foreground">Quadrilateral</span>
            </div>

            {/* Shape 5: Trapezium / Polygon */}
            <div
              onClick={() => setSelectedShapeFig51("polygon")}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                selectedShapeFig51 === "polygon"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 shadow-xs ring-2 ring-emerald-400/30"
                  : "bg-white dark:bg-slate-900 hover:border-emerald-300"
              }`}
            >
              <svg viewBox="0 0 60 60" className="w-12 h-12">
                <polygon points="12,16 48,16 54,46 6,46" fill="none" stroke="#0d9488" strokeWidth="2.5" />
              </svg>
              <span className="text-[11px] font-bold text-foreground">Polygon</span>
            </div>

            {/* Shape 6: Angle */}
            <div
              onClick={() => setSelectedShapeFig51("angle")}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                selectedShapeFig51 === "angle"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 shadow-xs ring-2 ring-emerald-400/30"
                  : "bg-white dark:bg-slate-900 hover:border-emerald-300"
              }`}
            >
              <svg viewBox="0 0 60 60" className="w-12 h-12">
                <line x1="12" y1="46" x2="52" y2="46" stroke="#0d9488" strokeWidth="2.5" />
                <line x1="12" y1="46" x2="42" y2="14" stroke="#0d9488" strokeWidth="2.5" />
                <path d="M 26 46 A 16 16 0 0 0 23 35" fill="none" stroke="#f59e0b" strokeWidth="2" />
              </svg>
              <span className="text-[11px] font-bold text-foreground">Angle</span>
            </div>
          </div>

          <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              {selectedShapeFig51 === "circle" && "Circle: Simple closed curve without vertices or straight sides."}
              {selectedShapeFig51 === "segment" && "Line segment: Fixed distance connecting two distinct endpoints."}
              {selectedShapeFig51 === "triangle" && "Triangle: 3 line segments enclosing 3 angles and 3 vertices."}
              {selectedShapeFig51 === "quadrilateral" && "Quadrilateral: 4 line segments enclosing 4 angles with 2 diagonals."}
              {selectedShapeFig51 === "polygon" && "Polygon: Simple closed figure bounded by multiple straight line segments."}
              {selectedShapeFig51 === "angle" && "Angle: Formed by 2 rays originating from a shared common vertex."}
            </span>
            <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-300 font-bold shrink-0">
              Fig. 5.1
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-xs">
            <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between">
              <span>Name any 3 geometrical shapes depicted in Fig 5.1:</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                +1 pt
              </span>
            </label>
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {["Triangle, Circle, Angle", "Line Segment, Quadrilateral, Triangle"].map((c) => (
                <button
                  key={c}
                  type="button"
                  disabled={isRevealed}
                  onClick={() => {
                    handleChange("q_p69_intro_shapes", c);
                    gradeDirectly("q_p69_intro_shapes", c);
                  }}
                  className="text-[11px] px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 bg-muted/40 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 text-foreground cursor-pointer transition-all"
                >
                  {c}
                </button>
              ))}
            </div>
            <Field id="q_p69_intro_shapes" placeholder="e.g. Triangle, circle, angle" />
          </div>

          <p className="text-xs sm:text-sm text-foreground">
            This is not however possible all the times. Some times the measures are so close to each other that we require an accurate tool/device to measure these measurements.
            In this chapter, we are going to learn how to measure the line segments and angles.
          </p>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          SECTION 5.2: MEASURE OF A LINE SEGMENT
          (Properties, 3 Ways to Compare & Visual Illusions)
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-600/50 bg-card overflow-hidden shadow-sm space-y-6 p-5 sm:p-7">
        <div className="border-b border-teal-200 dark:border-teal-800/60 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="bg-teal-700 text-white text-xs font-mono font-bold px-2 py-0.5 rounded">
              5.2
            </span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-teal-950 dark:text-teal-200">
              MEASURE OF A LINE SEGMENT
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">
            Length & Comparison Techniques
          </span>
        </div>

        <div className="space-y-4 text-sm sm:text-base">
          <p>
            The edges of a book, TV screen, bricks etc. are like a line segment drawn through any edge.
            We have seen and also drawn so many line segments.
            We know that a triangle is made of three and a quadrilateral of four lines segments.
          </p>
          <p>
            A line segment is a part of a line with two end points. This makes it possible to measure a line segment.
            This measure of each line segment is its <strong>&quot;length&quot;</strong>. We use length to compare line segments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Quick check 1: Edges */}
            <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-xs">
              <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between">
                <span>The edges of books, bricks, and TV screens resemble:</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
                  +1 pt
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5 mb-1">
                {["Line segments", "Circles"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p69_line_segment_edges", c);
                      gradeDirectly("q_p69_line_segment_edges", c);
                    }}
                    className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-100 dark:hover:bg-teal-950/40 text-foreground cursor-pointer"
                  >
                    {c}
                  </button>
                ))}
              </div>
              <Field id="q_p69_line_segment_edges" placeholder="e.g. Line segments" />
            </div>

            {/* Quick check 2: Length */}
            <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-xs">
              <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between">
                <span>The measure of each line segment is called its:</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
                  +1 pt
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5 mb-1">
                {["Length", "Area"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p69_length_def", c);
                      gradeDirectly("q_p69_length_def", c);
                    }}
                    className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-100 dark:hover:bg-teal-950/40 text-foreground cursor-pointer"
                  >
                    {c}
                  </button>
                ))}
              </div>
              <Field id="q_p69_length_def" placeholder="e.g. Length" />
            </div>

            {/* Quick check 3: Triangle and Quad */}
            <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-xs">
              <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between">
                <span>A triangle and a quadrilateral are made of how many line segments?</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
                  +1 pt
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5 mb-1">
                {["3 and 4 line segments", "4 and 5"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p69_triangle_quad_lines", c);
                      gradeDirectly("q_p69_triangle_quad_lines", c);
                    }}
                    className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-100 dark:hover:bg-teal-950/40 text-foreground cursor-pointer"
                  >
                    {c}
                  </button>
                ))}
              </div>
              <Field id="q_p69_triangle_quad_lines" placeholder="e.g. 3 and 4" />
            </div>
          </div>

          {/* ── 3 Ways to Compare Line Segments Box ────────────────── */}
          <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 space-y-3">
            <h3 className="font-heading font-bold text-sm text-teal-900 dark:text-teal-200">
              We can compare the &apos;length&apos; of two line segments in three ways:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border flex flex-col gap-1 shadow-2xs">
                <span className="font-bold text-xs text-teal-700 dark:text-teal-300">
                  a) Simple Observation
                </span>
                <span className="text-xs text-muted-foreground">
                  Comparing visually by looking directly at the two line segments.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border flex flex-col gap-1 shadow-2xs">
                <span className="font-bold text-xs text-teal-700 dark:text-teal-300">
                  b) Tracing on a Paper
                </span>
                <span className="text-xs text-muted-foreground">
                  Tracing one segment on trace paper and placing it over the other segment.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border flex flex-col gap-1 shadow-2xs">
                <span className="font-bold text-xs text-teal-700 dark:text-teal-300">
                  c) Using Instruments
                </span>
                <span className="text-xs text-muted-foreground">
                  Using a ruler, divider, or compass to measure accurate millimeter values.
                </span>
              </div>
            </div>
            
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border space-y-1.5 shadow-xs mt-3">
              <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between">
                <span>Name the 3 ways to compare the length of two line segments:</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
                  +1 pt
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5 mb-1">
                {["Observation, Tracing, Instruments", "Guessing, Touching, Using Math"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p69_three_ways_compare", c);
                      gradeDirectly("q_p69_three_ways_compare", c);
                    }}
                    className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-100 dark:hover:bg-teal-950/40 text-foreground cursor-pointer"
                  >
                    {c}
                  </button>
                ))}
              </div>
              <Field id="q_p69_three_ways_compare" placeholder="e.g. Observation, Tracing, Instruments" />
            </div>
          </div>

          {/* ── Fig. 5.2: Simple Observation Comparison ──────────── */}
          <div className="p-5 rounded-2xl border bg-muted/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                Figure 5.2: Comparing by Simple Observation
              </span>
              <button
                type="button"
                onClick={() => setShowRulerFig52(!showRulerFig52)}
                className="text-xs px-2.5 py-1 rounded-lg border bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 font-semibold cursor-pointer shadow-2xs"
              >
                {showRulerFig52 ? "Hide Ruler" : "📏 Test with Interactive Ruler"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 flex flex-col items-center bg-white dark:bg-slate-900 p-4 rounded-xl border">
                <svg viewBox="0 0 240 120" className="w-full max-w-[230px] h-auto select-none">
                  {/* Segment AB: tilted longer line */}
                  <line x1="30" y1="90" x2="200" y2="35" stroke="#0f766e" strokeWidth="3" />
                  <circle cx="30" cy="90" r="4" fill="#0f766e" />
                  <text x="18" y="95" fontSize="12" fontWeight="bold" fill="#0f766e">A</text>
                  <circle cx="200" cy="35" r="4" fill="#0f766e" />
                  <text x="208" y="38" fontSize="12" fontWeight="bold" fill="#0f766e">B</text>

                  {/* Segment CD: horizontal shorter line */}
                  <line x1="90" y1="95" x2="190" y2="95" stroke="#2563eb" strokeWidth="2.5" />
                  <circle cx="90" cy="95" r="4" fill="#2563eb" />
                  <text x="76" y="98" fontSize="12" fontWeight="bold" fill="#2563eb">C</text>
                  <circle cx="190" cy="95" r="4" fill="#2563eb" />
                  <text x="198" y="98" fontSize="12" fontWeight="bold" fill="#2563eb">D</text>

                  {/* Optional Interactive Measurement Ruler */}
                  {showRulerFig52 && (
                    <g transform="translate(30, 20)">
                      <rect width="180" height="15" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" rx="2" />
                      {Array.from({ length: 19 }).map((_, i) => (
                        <line
                          key={i}
                          x1={i * 10}
                          y1="0"
                          x2={i * 10}
                          y2={i % 5 === 0 ? "8" : "4"}
                          stroke="#78350f"
                          strokeWidth="0.8"
                        />
                      ))}
                      <text x="6" y="11" fontSize="7" fill="#78350f" fontWeight="bold">AB ≈ 7.8 cm | CD ≈ 4.5 cm</text>
                    </g>
                  )}
                </svg>
                <span className="text-[11px] text-muted-foreground font-mono mt-1">
                  fig. 5.2: Segments <Seg>AB</Seg> and <Seg>CD</Seg>
                </span>
              </div>

              <div className="md:col-span-6 space-y-3">
                <p className="text-xs sm:text-sm text-foreground">
                  The line segments <Seg>AB</Seg> and <Seg>CD</Seg> in figure 5.2 can be compared by simple observation. Can you find the longer one?
                </p>
                <p className="text-xs font-semibold text-teal-800 dark:text-teal-300">
                  By simple observation, we can say that <Seg>AB</Seg> is clearly longer than <Seg>CD</Seg>.
                </p>

                <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-xs">
                  <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between">
                    <span>Which segment in Figure 5.2 is longer?</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
                      +1 pt
                    </span>
                  </label>
                  <div className="flex gap-1.5 mb-1">
                    {["Segment AB", "Segment CD", "Both equal"].map((c) => (
                      <button
                        key={c}
                        type="button"
                        disabled={isRevealed}
                        onClick={() => {
                          handleChange("q_p69_fig52_longer", c);
                          gradeDirectly("q_p69_fig52_longer", c);
                        }}
                        className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-100 dark:hover:bg-teal-950/40 text-foreground cursor-pointer"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <Field id="q_p69_fig52_longer" placeholder="e.g. AB is longer" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Fig. 5.3: Optical Illusions (When Observation Fails) ─ */}
          <div className="p-5 rounded-2xl border bg-muted/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                Figure 5.3: When Simple Observation is Difficult
              </span>
              <button
                type="button"
                onClick={() => setShowRulerFig53(!showRulerFig53)}
                className="text-xs px-2.5 py-1 rounded-lg border bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 font-semibold cursor-pointer shadow-2xs"
              >
                {showRulerFig53 ? "Hide Measurements" : "📏 Verify Actual Equality"}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-foreground">
              But it is difficult to compare the lengths of the another two pairs <Seg>AB</Seg>, <Seg>CD</Seg> and <Seg>PQ</Seg>, <Seg>RS</Seg> shown in the figure 5.3. Why?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Fig 5.3 SVG representation */}
              <div className="md:col-span-6 flex flex-col items-center bg-white dark:bg-slate-900 p-4 rounded-xl border">
                <svg viewBox="0 0 240 180" className="w-full max-w-[240px] h-auto select-none">
                  {/* Pair 1: Horizontal Segments AB and CD */}
                  {/* Segment AB: 60px length */}
                  <line x1="30" y1="40" x2="110" y2="40" stroke="#0f172a" strokeWidth="2.5" className="dark:stroke-slate-200" />
                  <circle cx="30" cy="40" r="3" fill="#0f172a" className="dark:fill-white" />
                  <text x="22" y="44" fontSize="10" fontWeight="bold" fill="#0f172a" className="dark:fill-white">A</text>
                  <circle cx="110" cy="40" r="3" fill="#0f172a" className="dark:fill-white" />
                  <text x="114" y="44" fontSize="10" fontWeight="bold" fill="#0f172a" className="dark:fill-white">B</text>

                  {/* Segment CD: exactly 60px length too (optical comparison) */}
                  <line x1="60" y1="75" x2="140" y2="75" stroke="#0f172a" strokeWidth="2.5" className="dark:stroke-slate-200" />
                  <circle cx="60" cy="75" r="3" fill="#0f172a" className="dark:fill-white" />
                  <text x="48" y="79" fontSize="10" fontWeight="bold" fill="#0f172a" className="dark:fill-white">C</text>
                  <circle cx="140" cy="75" r="3" fill="#0f172a" className="dark:fill-white" />
                  <text x="144" y="79" fontSize="10" fontWeight="bold" fill="#0f172a" className="dark:fill-white">D</text>

                  {/* Pair 2: T-illusion with PQ horizontal (70px) and RS vertical (70px) */}
                  {/* Segment PQ horizontal: from x=110 to x=180, y=120 */}
                  <line x1="110" y1="120" x2="180" y2="120" stroke="#0f172a" strokeWidth="2.5" className="dark:stroke-slate-200" />
                  <circle cx="110" cy="120" r="3" fill="#0f172a" className="dark:fill-white" />
                  <text x="100" y="124" fontSize="10" fontWeight="bold" fill="#0f172a" className="dark:fill-white">P</text>
                  <circle cx="180" cy="120" r="3" fill="#0f172a" className="dark:fill-white" />
                  <text x="184" y="124" fontSize="10" fontWeight="bold" fill="#0f172a" className="dark:fill-white">Q</text>

                  {/* Segment RS vertical: from y=50 to y=120 at x=145 */}
                  <line x1="145" y1="50" x2="145" y2="120" stroke="#0f172a" strokeWidth="2.5" className="dark:stroke-slate-200" />
                  <circle cx="145" cy="50" r="3" fill="#0f172a" className="dark:fill-white" />
                  <text x="142" y="44" fontSize="10" fontWeight="bold" fill="#0f172a" className="dark:fill-white">R</text>
                  <circle cx="145" cy="120" r="3" fill="#0f172a" className="dark:fill-white" />
                  <text x="142" y="134" fontSize="10" fontWeight="bold" fill="#0f172a" className="dark:fill-white">S</text>

                  {/* Real Instrument Measurement Overlay */}
                  {showRulerFig53 && (
                    <g>
                      <rect x="25" y="15" width="95" height="14" fill="#dcfce7" stroke="#15803d" strokeWidth="1" rx="3" />
                      <text x="30" y="25" fontSize="8" fill="#15803d" fontWeight="bold">AB = 4.0 cm | CD = 4.0 cm</text>

                      <rect x="105" y="145" width="95" height="14" fill="#dcfce7" stroke="#15803d" strokeWidth="1" rx="3" />
                      <text x="110" y="155" fontSize="8" fill="#15803d" fontWeight="bold">PQ = 3.5 cm | RS = 3.5 cm</text>
                    </g>
                  )}
                </svg>
                <span className="text-[11px] text-muted-foreground font-mono mt-1">
                  fig. 5.3: Pairs <Seg>AB</Seg>, <Seg>CD</Seg> and <Seg>PQ</Seg>, <Seg>RS</Seg>
                </span>
              </div>

              {/* Questions on Fig 5.3 */}
              <div className="md:col-span-6 space-y-3">
                <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-xs">
                  <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between">
                    <span>In Figure 5.3, are AB and CD actually equal?</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
                      +1 pt
                    </span>
                  </label>
                  <div className="flex gap-1.5 mb-1">
                    {["Equal (Same length)", "AB is longer", "CD is longer"].map((c) => (
                      <button
                        key={c}
                        type="button"
                        disabled={isRevealed}
                        onClick={() => {
                          handleChange("q_p69_fig53_ab_cd_compare", c);
                          gradeDirectly("q_p69_fig53_ab_cd_compare", c);
                        }}
                        className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-100 dark:hover:bg-teal-950/40 text-foreground cursor-pointer"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <Field id="q_p69_fig53_ab_cd_compare" placeholder="e.g. Equal in length" />
                </div>

                <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-xs">
                  <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between">
                    <span>In Figure 5.3, are PQ and RS actually equal?</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
                      +1 pt
                    </span>
                  </label>
                  <div className="flex gap-1.5 mb-1">
                    {["Equal (Same length)", "RS looks longer", "PQ is longer"].map((c) => (
                      <button
                        key={c}
                        type="button"
                        disabled={isRevealed}
                        onClick={() => {
                          handleChange("q_p69_fig53_pq_rs_compare", c);
                          gradeDirectly("q_p69_fig53_pq_rs_compare", c);
                        }}
                        className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-100 dark:hover:bg-teal-950/40 text-foreground cursor-pointer"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <Field id="q_p69_fig53_pq_rs_compare" placeholder="e.g. Equal in length" />
                </div>

                <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-xs">
                  <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between">
                    <span>Why is simple observation difficult here?</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
                      +1 pt
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-1">
                    {["Optical illusion / Eyes get deceived", "Need instruments to measure"].map((c) => (
                      <button
                        key={c}
                        type="button"
                        disabled={isRevealed}
                        onClick={() => {
                          handleChange("q_p69_why_difficult", c);
                          gradeDirectly("q_p69_why_difficult", c);
                        }}
                        className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-100 dark:hover:bg-teal-950/40 text-foreground cursor-pointer"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <Field id="q_p69_why_difficult" placeholder="e.g. Optical illusion / directions mislead" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          PAGE 69 SCORE SUMMARY FOOTER CARD
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-emerald-300 dark:border-emerald-800/80 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold shadow-sm">
            ⭐
          </div>
          <div>
            <h4 className="font-heading font-bold text-foreground text-base">
              Page 69 Score Summary
            </h4>
            <p className="text-xs text-muted-foreground">
              {correctCount === ALL_INPUT_IDS.length
                ? "🎉 Congratulations! You have answered all questions on Page 69 correctly and mastered line segment comparison!"
                : correctCount > 0
                  ? `Good effort! You answered ${correctCount} of ${ALL_INPUT_IDS.length} questions correctly.`
                  : "Compare the line segments above and click the quick-select choices or type answers to earn your score."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-center px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border shadow-xs">
            <span className="text-[11px] text-muted-foreground block">Correct</span>
            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              {correctCount}/{ALL_INPUT_IDS.length}
            </span>
          </div>
          <div className="text-center px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border shadow-xs">
            <span className="text-[11px] text-muted-foreground block">User Score</span>
            <span className="text-base font-bold text-foreground font-mono">
              ⭐ {score}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
