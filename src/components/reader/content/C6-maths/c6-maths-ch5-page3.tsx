"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Gradable Points for Page 71 (Class 6 Chapter 5 Page 3)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "q_p71_fig55_ab_length", // What is length of line segment AB in Fig 5.5? 4.8 cm
  "q_p71_divider_advantage", // Why use divider? Eliminates thickness and parallax error
  "q_p71_try_postcard_same", // Do all post cards have same dimensions? Yes
  "q_p71_try_postcard_dimensions", // Postcard dimensions: 14 cm x 9 cm
  "q_p71_try_objects_traced", // Measuring traced objects: Ruler and Divider
  "q_p71_ex51_q1_examples", // 5 examples of line segment: blackboard, bench, door, book, window
  "q_p71_ex51_q2_why_divider", // Ex 5.1 Q2: Better to use divider than ruler why
  "q_p71_ex51_q3_ascending", // Ex 5.1 Q3: Ascending order of line segments
  "q_p71_ex51_q3_longest", // Ex 5.1 Q3: Longest line segment is AE
  "q_p71_ex51_q4_who_correct", // Ex 5.1 Q4: Who is correct? Reshma
  "q_p71_ex51_q4_midpoint_def", // Ex 5.1 Q4: AC = CB
  "q_p71_ex51_q5_pyramid_edges", // Ex 5.1 Q5: Pyramid has 8 line segments
  "q_p71_ex51_q5_box_edges", // Ex 5.1 Q5: Cuboid box has 12 line segments
  "q_p71_ex51_q5_almirah_edges", // Ex 5.1 Q5: Almirah has 12 line segments
];

/* ─────────────────────────────────────────────
   Reveal text for answers
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_p71_fig55_ab_length: "4.8 cm (or 4.7 - 4.8 cm)",
  q_p71_divider_advantage: "Avoids ruler thickness, bevel, and parallax (angular viewing) errors",
  q_p71_try_postcard_same: "Yes, all post cards have the same standard dimensions",
  q_p71_try_postcard_dimensions: "14 cm × 9 cm (140 mm × 90 mm)",
  q_p71_try_objects_traced: "Ruler and Divider",
  q_p71_ex51_q1_examples: "Edge of blackboard, desk/bench, door, book, window frame",
  q_p71_ex51_q2_why_divider: "Avoids ruler thickness & parallax error; needle tips position exactly on endpoints",
  q_p71_ex51_q3_ascending: "AB = BC = CD = DE < AC = BD = CE < AD = BE < AE",
  q_p71_ex51_q3_longest: "Segment AE (spans all intervals)",
  q_p71_ex51_q4_who_correct: "Reshma is correct (C is exactly in the middle)",
  q_p71_ex51_q4_midpoint_def: "AC = CB (Both segments are equal)",
  q_p71_ex51_q5_pyramid_edges: "8 line segments (4 base edges + 4 slant edges)",
  q_p71_ex51_q5_box_edges: "12 line segments (edges of cuboid)",
  q_p71_ex51_q5_almirah_edges: "12 line segments (edges of rectangular frame)",
};

/* ─────────────────────────────────────────────
   Answer Validator
───────────────────────────────────────────── */
function validateAnswer(id: string, rawValue: string): boolean {
  const v = rawValue.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!v) return false;

  switch (id) {
    case "q_p71_fig55_ab_length":
      if (v.includes("50") || v.includes("45") || v.includes("40")) {
        if (!v.includes("48") && !v.includes("47")) return false;
      }
      return v.includes("48") || v.includes("47") || v.includes("fourpoint");

    case "q_p71_divider_advantage":
      if (v.includes("cannot") || v.includes("longerthan")) return false;
      return (
        v.includes("thickness") ||
        v.includes("parallax") ||
        v.includes("angular") ||
        v.includes("error") ||
        v.includes("exact") ||
        v.includes("accurat")
      );

    case "q_p71_try_postcard_same":
      if (v.includes("no") || v.includes("different")) return false;
      return v.includes("yes") || v.includes("same");

    case "q_p71_try_postcard_dimensions":
      if (v.includes("10") || v.includes("20") || v.includes("15")) return false;
      return (
        (v.includes("14") && v.includes("9")) ||
        v.includes("14x9") ||
        v.includes("14cm")
      );

    case "q_p71_try_objects_traced":
      if (v.includes("protractor") || v.includes("compass")) return false;
      return v.includes("ruler") || v.includes("divider") || v.includes("scale");

    case "q_p71_ex51_q1_examples":
      if (v.includes("circle") || v.includes("curve") || v.includes("point")) return false;
      return (
        v.includes("blackboard") ||
        v.includes("board") ||
        v.includes("bench") ||
        v.includes("desk") ||
        v.includes("door") ||
        v.includes("book") ||
        v.includes("table") ||
        v.includes("window") ||
        v.includes("edge")
      );

    case "q_p71_ex51_q2_why_divider":
      if (v.includes("metal") || v.includes("nonumbers")) return false;
      return (
        v.includes("thickness") ||
        v.includes("parallax") ||
        v.includes("angular") ||
        v.includes("needle") ||
        v.includes("exact") ||
        v.includes("endpoint") ||
        v.includes("error")
      );

    case "q_p71_ex51_q3_ascending":
      if (v.includes("allsegment") || v.includes("equalinlength") || v.startsWith("ae<ad")) return false;
      return (
        (v.includes("ab") && v.includes("ae")) ||
        v.includes("ascending") ||
        v.includes("acbd") ||
        v.includes("adbe")
      );

    case "q_p71_ex51_q3_longest":
      if (v.includes("ad") || v.includes("be") || v.includes("ab") || v.includes("bc")) {
        if (!v.includes("ae")) return false;
      }
      return v.includes("ae") || v.includes("segmentae");

    case "q_p71_ex51_q4_who_correct":
      if (v.includes("swetha") || v.includes("both")) return false;
      return v.includes("reshma");

    case "q_p71_ex51_q4_midpoint_def":
      if (v.includes("greater") || v.includes("less") || v.includes("ac>cb") || v.includes("ac<cb")) return false;
      return (
        v.includes("equal") ||
        v.includes("accb") ||
        v.includes("same")
      );

    case "q_p71_ex51_q5_pyramid_edges":
      if (v.includes("4") || v.includes("6") || v.includes("12") || v.includes("four") || v.includes("six") || v.includes("twelve")) {
        if (!v.includes("8") && !v.includes("eight")) return false;
      }
      return v.includes("8") || v.includes("eight");

    case "q_p71_ex51_q5_box_edges":
      if (v.includes("6") || v.includes("8") || v.includes("4") || v.includes("six") || v.includes("eight")) {
        if (!v.includes("12") && !v.includes("twelve")) return false;
      }
      return v.includes("12") || v.includes("twelve");

    case "q_p71_ex51_q5_almirah_edges":
      if (v.includes("4") || v.includes("8") || v.includes("6") || v.includes("four") || v.includes("eight")) {
        if (!v.includes("12") && !v.includes("twelve")) return false;
      }
      return v.includes("12") || v.includes("twelve");

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

export function C6MathsCh5Page3() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;

  const storageKey = "c6-maths-ch5-page3";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    label?: string;
    id: number;
  } | null>(null);

  /* ── Interactive Simulation States ────────────────── */
  // Divider experiment step: 0 = on segment AB, 1 = placed on ruler
  const [dividerOnRuler, setDividerOnRuler] = useState<boolean>(false);

  // Selected segment in Exercise 5.1 Q3
  const [activeSegmentQ3, setActiveSegmentQ3] = useState<string>("AB");

  // Selected 3D figure in Exercise 5.1 Q5: "pyramid" | "box" | "almirah"
  const [selectedShapeQ5, setSelectedShapeQ5] = useState<"pyramid" | "box" | "almirah">("almirah");

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
      setDividerOnRuler(false);
      setActiveSegmentQ3("AB");
      setSelectedShapeQ5("almirah");
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
    setDividerOnRuler(false);
    setActiveSegmentQ3("AB");
    setSelectedShapeQ5("almirah");
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

  // Segment offset mapping for Exercise 5.1 Q3: A=0, B=1, C=2, D=3, E=4 (units of 45px)
  const q3PointsMap: Record<string, { start: number; end: number; units: number }> = {
    AB: { start: 0, end: 1, units: 1 },
    AC: { start: 0, end: 2, units: 2 },
    AD: { start: 0, end: 3, units: 3 },
    AE: { start: 0, end: 4, units: 4 },
    BC: { start: 1, end: 2, units: 1 },
    BD: { start: 1, end: 3, units: 2 },
    BE: { start: 1, end: 4, units: 3 },
    CD: { start: 2, end: 3, units: 1 },
    CE: { start: 2, end: 4, units: 2 },
    DE: { start: 3, end: 4, units: 1 },
  };

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
          PAGE 71 HEADER & SCORING ACTION BAR
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-600/40 bg-card overflow-hidden shadow-sm">
        {/* Banner */}
        <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-800 text-white font-heading font-bold px-5 py-4 text-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-white/20 text-xl">📐</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                Measuring Using Divider &bull; Exercise 5.1
              </h1>
              <p className="text-xs text-teal-100 font-normal">
                Class 6 Maths &bull; Chapter 5 &bull; Measures of Lines and Angles &bull; Printed Page 63
              </p>
            </div>
          </div>
          <span className="text-xs bg-teal-950/80 text-teal-200 px-3 py-1 rounded-full border border-teal-400/30 font-mono self-start sm:self-auto font-bold">
            Page 71
          </span>
        </div>

        {/* Scoring & Action Controls Bar */}
        <div className="bg-teal-50/80 dark:bg-teal-950/30 border-b border-teal-200 dark:border-teal-800/60 p-4 px-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-700/60 rounded-xl px-3.5 py-1.5 shadow-xs">
              <span className="text-base">⭐</span>
              <span className="text-xs font-semibold text-muted-foreground">Total Points:</span>
              <span className="font-heading font-bold text-teal-700 dark:text-teal-300 text-sm">
                {score}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-700/60 rounded-xl px-3.5 py-1.5 shadow-xs">
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
              className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-heading font-semibold text-xs transition-colors shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
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
                  : "bg-white dark:bg-slate-800 text-foreground border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <span>{isRevealed ? "🙈" : "👁️"}</span>
              <span>{isRevealed ? "Hide Key" : "Reveal Answers"}</span>
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
          SECTION 1: USING DIVIDER FOR EXACT MEASUREMENT (FIG 5.5)
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-indigo-500/40 bg-card overflow-hidden shadow-sm p-5 sm:p-7 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-indigo-200 dark:border-indigo-800/60">
          <div className="flex items-center gap-2.5">
            <span className="bg-indigo-700 text-white p-1.5 rounded-lg text-lg">
              ✨
            </span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-indigo-950 dark:text-indigo-200">
              Measuring Length Accurately with a Divider
            </h2>
          </div>
          <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 px-2.5 py-1 rounded-full">
            Fig. 5.5
          </span>
        </div>

        <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 space-y-2 text-sm sm:text-base">
          <p className="font-semibold text-indigo-950 dark:text-indigo-200">
            To avoid this problem a better way is to use a divider.
          </p>
          <p className="text-foreground leading-relaxed">
            Let us use divider to measure exact measure. Open the divider. Place the end point of one of its arms at &apos;A&apos; open it till the end point of the second arm is placed at B. Lift the divider carefully without disturbing the opening of the divider, place it on the ruler. Read the marks against each end point.
          </p>
        </div>

        {/* Interactive Fig 5.5 Simulator: Divider on AB vs Divider on Scale */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border space-y-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
              <span>Interactive Fig 5.5 Experiment</span>
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDividerOnRuler(false)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  !dividerOnRuler
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "border border-slate-300 dark:border-slate-700 bg-muted/40 hover:bg-slate-200 text-foreground"
                }`}
              >
                1. Divider on Segment AB
              </button>
              <button
                type="button"
                onClick={() => setDividerOnRuler(true)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  dividerOnRuler
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "border border-slate-300 dark:border-slate-700 bg-muted/40 hover:bg-slate-200 text-foreground"
                }`}
              >
                2. Divider Lifted onto Ruler (4.8 cm)
              </button>
            </div>
          </div>

          <div className="p-4 bg-muted/20 rounded-xl border flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg viewBox="0 0 360 140" className="w-[360px] h-auto select-none">
              {!dividerOnRuler ? (
                /* Mode 1: Divider on Segment AB */
                <g>
                  {/* Segment AB at bottom (x1 = 50, x2 = 180, length = 130px represents 4.8 cm) */}
                  <line x1="50" y1="110" x2="180" y2="110" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="50" cy="110" r="3.5" fill="#dc2626" />
                  <text x="44" y="128" fontSize="12" fontWeight="bold" fill="#dc2626">A</text>
                  <circle cx="180" cy="110" r="3.5" fill="#dc2626" />
                  <text x="176" y="128" fontSize="12" fontWeight="bold" fill="#dc2626">B</text>

                  {/* Divider arms matching AB */}
                  <g>
                    {/* Hinge at (115, 30) */}
                    <circle cx="115" cy="30" r="7" fill="#475569" />
                    <circle cx="115" cy="27" r="3" fill="#cbd5e1" />
                    <circle cx="115" cy="15" r="4" fill="#64748b" />
                    {/* Left arm from (115, 30) to (50, 110) */}
                    <line x1="115" y1="30" x2="50" y2="110" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                    <line x1="50" y1="110" x2="50" y2="112" stroke="#334155" strokeWidth="2" />
                    {/* Right arm from (115, 30) to (180, 110) */}
                    <line x1="115" y1="30" x2="180" y2="110" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                    <line x1="180" y1="110" x2="180" y2="112" stroke="#334155" strokeWidth="2" />
                  </g>
                  <text x="115" y="8" fontSize="10" fill="#475569" fontWeight="bold" textAnchor="middle">
                    Step 1: Open divider arms from A to B
                  </text>
                </g>
              ) : (
                /* Mode 2: Divider Placed on Ruler */
                <g>
                  {/* Ruler Scale at bottom */}
                  <rect x="20" y="85" width="320" height="40" fill="#bae6fd" stroke="#0ea5e9" strokeWidth="1.5" rx="3" />
                  {Array.from({ length: 16 }).map((_, i) => (
                    <g key={i} transform={`translate(${30 + i * (280 / 15)}, 85)`}>
                      <line x1="0" y1="0" x2="0" y2="12" stroke="#0f172a" strokeWidth="1.2" />
                      <text x="0" y="24" fontSize="9" textAnchor="middle" fill="#0f172a" fontWeight="bold">{i}</text>
                      {i < 15 && Array.from({ length: 9 }).map((_, j) => (
                        <line
                          key={j}
                          x1={(j + 1) * (280 / 150)}
                          y1="0"
                          x2={(j + 1) * (280 / 150)}
                          y2={j === 4 ? "8" : "4"}
                          stroke="#334155"
                          strokeWidth="0.8"
                        />
                      ))}
                    </g>
                  ))}

                  {/* Divider placed on ruler: Arm 1 at 0 cm (x = 30), Arm 2 at 4.8 cm (x = 30 + 4.8 * 280/15 = 119.6) */}
                  {(() => {
                    const x1 = 30;
                    const x2 = 30 + 4.8 * (280 / 15);
                    const hingeX = (x1 + x2) / 2;
                    return (
                      <g>
                        {/* Hinge */}
                        <circle cx={hingeX} cy="25" r="7" fill="#475569" />
                        <circle cx={hingeX} cy="22" r="3" fill="#cbd5e1" />
                        <circle cx={hingeX} cy="10" r="4" fill="#64748b" />
                        {/* Left arm to 0 cm */}
                        <line x1={hingeX} y1="25" x2={x1} y2="85" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                        <line x1={x1} y1="85" x2={x1} y2="90" stroke="#ef4444" strokeWidth="2.5" />
                        {/* Right arm to 4.8 cm */}
                        <line x1={hingeX} y1="25" x2={x2} y2="85" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                        <line x1={x2} y1="85" x2={x2} y2="90" stroke="#ef4444" strokeWidth="2.5" />

                        {/* Measurement badge */}
                        <rect x={hingeX - 25} y="42" width="50" height="18" rx="4" fill="#ef4444" />
                        <text x={hingeX} y="55" fontSize="10" fontWeight="bold" fill="#fff" textAnchor="middle">
                          4.8 cm
                        </text>
                      </g>
                    );
                  })()}
                  <text x="180" y="8" fontSize="10" fill="#0369a1" fontWeight="bold" textAnchor="middle">
                    Step 2: Read marks against endpoints (0 to 4.8 cm)
                  </text>
                </g>
              )}
            </svg>
          </div>
          <p className="text-center text-xs text-muted-foreground font-mono">
            Fig. 5.5 &bull; Measuring line segment AB using a divider and reading the length on a ruler
          </p>
        </div>

        {/* Gradable Questions for Divider Method */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Question 1: Length of AB in Fig 5.5 */}
          <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
            <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
              <span>What is the length of line segment AB in Fig. 5.5?</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-bold">
                +1 pt
              </span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["4.8 cm", "5.0 cm", "4.5 cm", "4.0 cm"].map((c) => {
                const isSelected = (answers["q_p71_fig55_ab_length"] || "") === c;
                return (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p71_fig55_ab_length", c);
                      gradeDirectly("q_p71_fig55_ab_length", c);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-md border font-medium cursor-pointer transition-all ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-700 shadow-xs"
                        : "border-slate-200 dark:border-slate-800 bg-muted/40 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
            <Field id="q_p71_fig55_ab_length" placeholder="e.g. 4.8 cm" />
          </div>

          {/* Question 2: Why divider is better */}
          <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
            <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
              <span>Why is a divider better than direct ruler reading?</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-bold">
                +1 pt
              </span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Eliminates ruler thickness & parallax error",
                "Rulers cannot measure lines",
                "Dividers are longer than rulers",
              ].map((c) => {
                const isSelected = (answers["q_p71_divider_advantage"] || "").toLowerCase().startsWith("eliminat")
                  ? c.startsWith("Eliminat")
                  : (answers["q_p71_divider_advantage"] || "") === c;
                return (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p71_divider_advantage", c);
                      gradeDirectly("q_p71_divider_advantage", c);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-md border font-medium cursor-pointer transition-all ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-700 shadow-xs"
                        : "border-slate-200 dark:border-slate-800 bg-muted/40 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
            <Field id="q_p71_divider_advantage" placeholder="e.g. Eliminates thickness & parallax errors" />
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          SECTION 2: TRY THESE (Green Section Box)
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-emerald-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-800 text-white font-heading font-bold px-5 py-3 text-base sm:text-lg flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span>🌴</span>
            <span>TRY THESE</span>
          </div>
          <span className="text-xs font-mono bg-white/20 px-2.5 py-0.5 rounded-full">
            Hands-on Activities
          </span>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          {/* Try These Activity 1: Postcard */}
          <div className="p-4 sm:p-5 rounded-2xl border bg-muted/20 space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </span>
              <div className="space-y-3 flex-1">
                <p className="font-semibold text-foreground text-sm sm:text-base">
                  Take a post card and measure the length and breadth with ruler and divider. Do all post cards have the same dimensions?
                </p>

                {/* SVG Postcard Illustration */}
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border flex flex-col items-center">
                  <svg viewBox="0 0 240 130" className="w-full max-w-[220px] h-auto drop-shadow-sm">
                    <rect x="20" y="15" width="200" height="100" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" rx="3" />
                    {/* Stamp box */}
                    <rect x="180" y="25" width="30" height="35" fill="none" stroke="#ca8a04" strokeWidth="1" strokeDasharray="3,2" />
                    <text x="195" y="46" fontSize="7" fill="#854d0e" textAnchor="middle">STAMP</text>
                    {/* Address lines */}
                    <line x1="110" y1="75" x2="210" y2="75" stroke="#ca8a04" strokeWidth="1" />
                    <line x1="110" y1="90" x2="210" y2="90" stroke="#ca8a04" strokeWidth="1" />
                    <line x1="110" y1="105" x2="210" y2="105" stroke="#ca8a04" strokeWidth="1" />
                    {/* Dimension arrows */}
                    <text x="120" y="10" fontSize="9" fontWeight="bold" fill="#15803d" textAnchor="middle">Length = 14 cm</text>
                    <text x="10" y="68" fontSize="9" fontWeight="bold" fill="#15803d" textAnchor="middle" transform="rotate(-90 10 68)">Breadth = 9 cm</text>
                  </svg>
                  <span className="text-[11px] text-muted-foreground font-mono mt-2">
                    Standard Post Card (14 cm &times; 9 cm)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                      <span>Do all post cards have same dimensions?</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1 rounded font-bold">+1 pt</span>
                    </label>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {["Yes, all post cards have same dimensions", "No, they differ"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_p71_try_postcard_same", c);
                            gradeDirectly("q_p71_try_postcard_same", c);
                          }}
                          className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-emerald-50 text-foreground cursor-pointer"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <Field id="q_p71_try_postcard_same" placeholder="e.g. Yes, same dimensions" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                      <span>Standard dimensions (length &times; breadth):</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1 rounded font-bold">+1 pt</span>
                    </label>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {["14 cm × 9 cm", "10 cm × 5 cm", "20 cm × 15 cm"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_p71_try_postcard_dimensions", c);
                            gradeDirectly("q_p71_try_postcard_dimensions", c);
                          }}
                          className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-emerald-50 text-foreground cursor-pointer"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <Field id="q_p71_try_postcard_dimensions" placeholder="e.g. 14 cm × 9 cm" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Try These Activity 2: Tracing 3 objects */}
          <div className="p-4 sm:p-5 rounded-2xl border bg-muted/20 space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                2
              </span>
              <div className="space-y-2 flex-1">
                <p className="font-semibold text-foreground text-sm sm:text-base">
                  Select any three objects like eraser, small pencil, etc. Trace their length on a paper. Measure the length of these line segments.
                </p>
                <div className="max-w-md space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                    <span>Which instruments are best used to measure their lengths?</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1 rounded font-bold">+1 pt</span>
                  </label>
                  <div className="flex flex-wrap gap-1 mb-1">
                    {["Ruler and Divider", "Protractor", "Compass"].map((c) => (
                      <button
                        key={c}
                        type="button"
                        disabled={isRevealed}
                        onClick={() => {
                          handleChange("q_p71_try_objects_traced", c);
                          gradeDirectly("q_p71_try_objects_traced", c);
                        }}
                        className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-emerald-50 text-foreground cursor-pointer"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <Field id="q_p71_try_objects_traced" placeholder="e.g. Ruler and Divider" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          SECTION 3: EXERCISE - 5.1 (Textbook Questions 1 to 5)
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-600/40 bg-card overflow-hidden shadow-sm space-y-6">
        <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-800 text-white font-heading font-bold px-5 py-3.5 text-lg flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="bg-white/20 p-1.5 rounded-lg text-base">✏️</span>
            <span>EXERCISE - 5.1</span>
          </div>
          <span className="text-xs font-mono bg-black/20 px-2.5 py-0.5 rounded-full">
            5 Questions
          </span>
        </div>

        <div className="p-5 sm:p-7 space-y-8">
          {/* ── Question 1 ─────────────────────────────── */}
          <div className="p-5 rounded-2xl border bg-muted/20 space-y-3">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </span>
              <div className="space-y-3 flex-1">
                <p className="font-semibold text-foreground text-sm sm:text-base">
                  Give any five examples of line segment observed in your classroom. <br />
                  <span className="text-xs text-muted-foreground font-normal">
                    Eg.: edge of black board.
                  </span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Edge of blackboard, desk, door, book, window",
                    "Circle, ball, wheel, fan, clock",
                    "Point, ray, angle, curve, line",
                  ].map((c) => (
                    <button
                      key={c}
                      type="button"
                      disabled={isRevealed}
                      onClick={() => {
                        handleChange("q_p71_ex51_q1_examples", c);
                        gradeDirectly("q_p71_ex51_q1_examples", c);
                      }}
                      className="text-[11px] px-2.5 py-1 rounded-md border bg-white dark:bg-slate-900 hover:bg-teal-50 text-foreground cursor-pointer"
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <Field
                  id="q_p71_ex51_q1_examples"
                  placeholder="e.g. Edge of blackboard, desk, door, book, window"
                />
              </div>
            </div>
          </div>

          {/* ── Question 2 ─────────────────────────────── */}
          <div className="p-5 rounded-2xl border bg-muted/20 space-y-3">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                2
              </span>
              <div className="space-y-3 flex-1">
                <p className="font-semibold text-foreground text-sm sm:text-base">
                  It is better to use a divider than a ruler, while comparing two line segments why?
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Avoids ruler thickness & parallax error; needle points give exact ends",
                    "Divider is made of metal",
                    "Ruler has no numbers",
                  ].map((c) => (
                    <button
                      key={c}
                      type="button"
                      disabled={isRevealed}
                      onClick={() => {
                        handleChange("q_p71_ex51_q2_why_divider", c);
                        gradeDirectly("q_p71_ex51_q2_why_divider", c);
                      }}
                      className="text-[11px] px-2.5 py-1 rounded-md border bg-white dark:bg-slate-900 hover:bg-teal-50 text-foreground cursor-pointer"
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <Field
                  id="q_p71_ex51_q2_why_divider"
                  placeholder="e.g. Avoids errors due to thickness and angular viewing"
                />
              </div>
            </div>
          </div>

          {/* ── Question 3 ─────────────────────────────── */}
          <div className="p-5 rounded-2xl border bg-muted/20 space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                3
              </span>
              <div className="space-y-3 flex-1">
                <p className="font-semibold text-foreground text-sm sm:text-base">
                  Measure all the line segments in the figure given below and arrange them in the ascending order of their lengths.
                </p>

                {/* Collinear Points A-B-C-D-E Diagram */}
                <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border flex flex-col items-center">
                  <span className="text-xs text-muted-foreground mb-3 font-mono">
                    Click any line segment below to highlight it on the line:
                  </span>
                  <svg viewBox="0 0 340 70" className="w-full max-w-[320px] h-auto select-none">
                    {/* Base straight line */}
                    <line x1="30" y1="35" x2="310" y2="35" stroke="#94a3b8" strokeWidth="2" />

                    {/* Active Highlighted Segment */}
                    {(() => {
                      const segInfo = q3PointsMap[activeSegmentQ3] || { start: 0, end: 1 };
                      const x1 = 50 + segInfo.start * 60;
                      const x2 = 50 + segInfo.end * 60;
                      return (
                        <line
                          x1={x1}
                          y1="35"
                          x2={x2}
                          y2="35"
                          stroke="#ef4444"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      );
                    })()}

                    {/* 5 Collinear Points A, B, C, D, E */}
                    {["A", "B", "C", "D", "E"].map((pt, idx) => {
                      const cx = 50 + idx * 60;
                      return (
                        <g key={pt}>
                          <line x1={cx} y1="28" x2={cx} y2="42" stroke="#0f172a" strokeWidth="2" />
                          <circle cx={cx} cy="35" r="3.5" fill="#0f172a" className="dark:fill-white" />
                          <text
                            x={cx}
                            y="18"
                            fontSize="12"
                            fontWeight="bold"
                            fill="#0f172a"
                            className="dark:fill-white"
                            textAnchor="middle"
                          >
                            {pt}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Segment Selector Chips */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
                    <span className="text-xs font-semibold mr-1">Line Segments:</span>
                    {Object.keys(q3PointsMap).map((seg) => {
                      const isCurr = activeSegmentQ3 === seg;
                      const units = q3PointsMap[seg].units;
                      return (
                        <button
                          key={seg}
                          type="button"
                          onClick={() => setActiveSegmentQ3(seg)}
                          className={`text-[11px] px-2 py-0.5 rounded font-mono font-bold cursor-pointer transition-all ${
                            isCurr
                              ? "bg-red-600 text-white shadow-xs"
                              : "border border-slate-300 dark:border-slate-700 bg-muted/40 hover:bg-red-50 text-foreground"
                          }`}
                        >
                          <Seg>{seg}</Seg> ({units}u)
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                      <span>Arrange in ascending order:</span>
                      <span className="text-[10px] bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-1 rounded font-bold">+1 pt</span>
                    </label>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {[
                        "AB=BC=CD=DE < AC=BD=CE < AD=BE < AE",
                        "AE < AD < AC < AB",
                        "All segments are equal in length",
                      ].map((c) => (
                        <button
                          key={c}
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_p71_ex51_q3_ascending", c);
                            gradeDirectly("q_p71_ex51_q3_ascending", c);
                          }}
                          className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-50 text-foreground cursor-pointer"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <Field
                      id="q_p71_ex51_q3_ascending"
                      placeholder="e.g. AB=BC=CD=DE < AC=BD=CE < AD=BE < AE"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                      <span>Which is the longest line segment?</span>
                      <span className="text-[10px] bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-1 rounded font-bold">+1 pt</span>
                    </label>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {["AE (Longest)", "AD", "BE", "AB"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_p71_ex51_q3_longest", c);
                            gradeDirectly("q_p71_ex51_q3_longest", c);
                          }}
                          className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-50 text-foreground cursor-pointer"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <Field id="q_p71_ex51_q3_longest" placeholder="e.g. AE" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Question 4 ─────────────────────────────── */}
          <div className="p-5 rounded-2xl border bg-muted/20 space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                4
              </span>
              <div className="space-y-3 flex-1">
                <p className="font-semibold text-foreground text-sm sm:text-base">
                  Mid point of <Seg>AB</Seg> is located by Swetha and Reshma like this:
                </p>

                {/* Swetha vs Reshma Visual Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Swetha Figure (Off-center) */}
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border flex flex-col items-center">
                    <span className="text-xs font-bold text-red-600 dark:text-red-400 mb-2">
                      Swetha&apos;s Figure
                    </span>
                    <svg viewBox="0 0 200 60" className="w-full max-w-[180px] h-auto">
                      <line x1="20" y1="30" x2="180" y2="30" stroke="#0f172a" strokeWidth="2.5" className="dark:stroke-white" />
                      <circle cx="20" cy="30" r="3" fill="#0f172a" className="dark:fill-white" />
                      <text x="16" y="20" fontSize="11" fontWeight="bold">A</text>
                      {/* Point C placed at 135 (closer to B) */}
                      <circle cx="135" cy="30" r="3.5" fill="#ef4444" />
                      <text x="131" y="20" fontSize="11" fontWeight="bold" fill="#ef4444">C</text>
                      <circle cx="180" cy="30" r="3" fill="#0f172a" className="dark:fill-white" />
                      <text x="180" y="20" fontSize="11" fontWeight="bold">B</text>
                    </svg>
                    <span className="text-[11px] text-muted-foreground font-mono mt-1 text-center">
                      AC &ne; CB (AC is longer than CB)
                    </span>
                  </div>

                  {/* Reshma Figure (Exactly in middle) */}
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border flex flex-col items-center">
                    <span className="text-xs font-bold text-green-600 dark:text-green-400 mb-2">
                      Reshma&apos;s Figure
                    </span>
                    <svg viewBox="0 0 200 60" className="w-full max-w-[180px] h-auto">
                      <line x1="20" y1="30" x2="180" y2="30" stroke="#0f172a" strokeWidth="2.5" className="dark:stroke-white" />
                      <circle cx="20" cy="30" r="3" fill="#0f172a" className="dark:fill-white" />
                      <text x="16" y="20" fontSize="11" fontWeight="bold">A</text>
                      {/* Point C placed at exact middle (100) */}
                      <circle cx="100" cy="30" r="3.5" fill="#22c55e" />
                      <text x="96" y="20" fontSize="11" fontWeight="bold" fill="#22c55e">C</text>
                      <circle cx="180" cy="30" r="3" fill="#0f172a" className="dark:fill-white" />
                      <text x="180" y="20" fontSize="11" fontWeight="bold">B</text>
                    </svg>
                    <span className="text-[11px] text-green-700 dark:text-green-300 font-mono mt-1 text-center font-semibold">
                      AC = CB (Both segments equal!)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                      <span>Which one do you feel correct?</span>
                      <span className="text-[10px] bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-1 rounded font-bold">+1 pt</span>
                    </label>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {["Reshma is correct (AC = CB)", "Swetha is correct", "Both are correct"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_p71_ex51_q4_who_correct", c);
                            gradeDirectly("q_p71_ex51_q4_who_correct", c);
                          }}
                          className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-50 text-foreground cursor-pointer"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <Field id="q_p71_ex51_q4_who_correct" placeholder="e.g. Reshma is correct" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                      <span>Measure lengths of <Seg>AC</Seg> and <Seg>CB</Seg>:</span>
                      <span className="text-[10px] bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-1 rounded font-bold">+1 pt</span>
                    </label>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {["AC = CB (Equal)", "AC > CB", "AC < CB"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_p71_ex51_q4_midpoint_def", c);
                            gradeDirectly("q_p71_ex51_q4_midpoint_def", c);
                          }}
                          className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-50 text-foreground cursor-pointer"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <Field id="q_p71_ex51_q4_midpoint_def" placeholder="e.g. AC = CB" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Question 5 ─────────────────────────────── */}
          <div className="p-5 rounded-2xl border bg-muted/20 space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                5
              </span>
              <div className="space-y-4 flex-1">
                <p className="font-semibold text-foreground text-sm sm:text-base">
                  Each of the figures has many line segments. For the almirah we have shown one line segment along the longer edge. Identify and mark all such line segments in these figures.
                </p>

                {/* 3D Shapes Representation: Pyramid, Box, Almirah */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Shape 1: Square Pyramid */}
                  <div
                    onClick={() => setSelectedShapeQ5("pyramid")}
                    className={`p-4 rounded-xl border flex flex-col items-center cursor-pointer transition-all ${
                      selectedShapeQ5 === "pyramid"
                        ? "bg-amber-50 dark:bg-amber-950/30 border-amber-500 shadow-sm"
                        : "bg-white dark:bg-slate-900 hover:border-amber-300"
                    }`}
                  >
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-200 mb-1">
                      1. Pyramid
                    </span>
                    <svg viewBox="0 0 100 90" className="w-20 h-20">
                      {/* Base square */}
                      <polygon points="20,65 50,75 80,65 50,55" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                      {/* Slant edges to apex (50, 15) */}
                      <line x1="50" y1="15" x2="20" y2="65" stroke="#b45309" strokeWidth="2" />
                      <line x1="50" y1="15" x2="50" y2="75" stroke="#b45309" strokeWidth="2" />
                      <line x1="50" y1="15" x2="80" y2="65" stroke="#b45309" strokeWidth="2" />
                      <line x1="50" y1="15" x2="50" y2="55" stroke="#d97706" strokeWidth="1" strokeDasharray="2,2" />
                    </svg>
                    <span className="text-[10px] font-mono text-muted-foreground mt-1">
                      4 base + 4 slant = 8 edges
                    </span>
                  </div>

                  {/* Shape 2: Cuboid Box */}
                  <div
                    onClick={() => setSelectedShapeQ5("box")}
                    className={`p-4 rounded-xl border flex flex-col items-center cursor-pointer transition-all ${
                      selectedShapeQ5 === "box"
                        ? "bg-cyan-50 dark:bg-cyan-950/30 border-cyan-500 shadow-sm"
                        : "bg-white dark:bg-slate-900 hover:border-cyan-300"
                    }`}
                  >
                    <span className="text-xs font-bold text-cyan-900 dark:text-cyan-200 mb-1">
                      2. Box (Cuboid)
                    </span>
                    <svg viewBox="0 0 100 90" className="w-20 h-20">
                      {/* Top face */}
                      <polygon points="25,35 60,25 85,35 50,45" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
                      {/* Front face */}
                      <polygon points="25,35 50,45 50,75 25,65" fill="#a5f3fc" stroke="#0891b2" strokeWidth="1.5" />
                      {/* Side face */}
                      <polygon points="50,45 85,35 85,65 50,75" fill="#67e8f9" stroke="#0891b2" strokeWidth="1.5" />
                    </svg>
                    <span className="text-[10px] font-mono text-muted-foreground mt-1">
                      12 line segments (edges)
                    </span>
                  </div>

                  {/* Shape 3: Almirah */}
                  <div
                    onClick={() => setSelectedShapeQ5("almirah")}
                    className={`p-4 rounded-xl border flex flex-col items-center cursor-pointer transition-all ${
                      selectedShapeQ5 === "almirah"
                        ? "bg-blue-50 dark:bg-blue-950/30 border-blue-500 shadow-sm"
                        : "bg-white dark:bg-slate-900 hover:border-blue-300"
                    }`}
                  >
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-200 mb-1">
                      3. Almirah
                    </span>
                    <svg viewBox="0 0 100 90" className="w-20 h-20">
                      {/* Cabinet structure */}
                      <rect x="30" y="15" width="40" height="60" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5" rx="1" />
                      {/* Center door split line */}
                      <line x1="50" y1="15" x2="50" y2="75" stroke="#1d4ed8" strokeWidth="1.5" />
                      {/* Handles */}
                      <circle cx="46" cy="45" r="1.5" fill="#1e3a8a" />
                      <circle cx="54" cy="45" r="1.5" fill="#1e3a8a" />
                      {/* Highlighted long edge in textbook */}
                      <line x1="30" y1="15" x2="30" y2="75" stroke="#ef4444" strokeWidth="3" />
                    </svg>
                    <span className="text-[10px] font-mono text-red-600 dark:text-red-400 mt-1 font-bold">
                      Highlighted long edge
                    </span>
                  </div>
                </div>

                {/* Questions for Shape Edges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                      <span>Pyramid: Line segments count?</span>
                      <span className="text-[10px] bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-1 rounded font-bold">+1 pt</span>
                    </label>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {["8 line segments", "4 line segments", "6 line segments", "12 line segments"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_p71_ex51_q5_pyramid_edges", c);
                            gradeDirectly("q_p71_ex51_q5_pyramid_edges", c);
                          }}
                          className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-50 text-foreground cursor-pointer"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <Field id="q_p71_ex51_q5_pyramid_edges" placeholder="e.g. 8 line segments" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                      <span>Box: Line segments count?</span>
                      <span className="text-[10px] bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-1 rounded font-bold">+1 pt</span>
                    </label>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {["12 line segments", "6 line segments", "8 line segments"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_p71_ex51_q5_box_edges", c);
                            gradeDirectly("q_p71_ex51_q5_box_edges", c);
                          }}
                          className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-50 text-foreground cursor-pointer"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <Field id="q_p71_ex51_q5_box_edges" placeholder="e.g. 12 line segments" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                      <span>Almirah: Line segments count?</span>
                      <span className="text-[10px] bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-1 rounded font-bold">+1 pt</span>
                    </label>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {["12 line segments", "4 line segments", "8 line segments"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_p71_ex51_q5_almirah_edges", c);
                            gradeDirectly("q_p71_ex51_q5_almirah_edges", c);
                          }}
                          className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-50 text-foreground cursor-pointer"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <Field id="q_p71_ex51_q5_almirah_edges" placeholder="e.g. 12 line segments" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          PAGE 71 SCORE SUMMARY FOOTER CARD
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-300 dark:border-teal-800/80 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/30 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-2xl font-bold shadow-sm">
            🏆
          </div>
          <div>
            <h4 className="font-heading font-bold text-foreground text-base">
              Page 71 Score Summary
            </h4>
            <p className="text-xs text-muted-foreground">
              {correctCount === ALL_INPUT_IDS.length
                ? "🎉 Incredible! You solved all 14 questions on Page 71 and mastered Exercise 5.1!"
                : correctCount > 0
                  ? `Great work! You answered ${correctCount} of ${ALL_INPUT_IDS.length} questions correctly.`
                  : "Solve the questions above or click the quick choice options to score points."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-center px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border shadow-xs">
            <span className="text-[11px] text-muted-foreground block">Correct</span>
            <span className="text-base font-bold text-teal-600 dark:text-teal-400 font-mono">
              {correctCount}/{ALL_INPUT_IDS.length}
            </span>
          </div>
          <div className="text-center px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border shadow-xs">
            <span className="text-[11px] text-muted-foreground block">Total Score</span>
            <span className="text-base font-bold text-foreground font-mono">
              ⭐ {score}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
