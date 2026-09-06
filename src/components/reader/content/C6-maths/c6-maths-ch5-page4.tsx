"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Gradable Points for Page 72 (Class 6 Chapter 5 Page 4)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "q_p72_angle_formation", // Formed between two rays or two line segments
  "q_p72_scissors_angle_change", // When blades move apart, angle increases
  "q_p72_everyday_angle_examples", // Examples of angles: tree branch, scissors, cake, clock
  "q_p72_fig1_zero_angle", // Fig (i): Zero angle (0°)
  "q_p72_fig2_acute_angle", // Fig (ii): Acute angle (< 90°)
  "q_p72_fig3_right_angle", // Fig (iii): Right angle (90°)
  "q_p72_fig4_obtuse_angle", // Fig (iv): Obtuse angle (> 90°)
  "q_p72_fig5_straight_angle", // Fig (v): Straight angle (180°)
  "q_p72_perpendicular_meaning", // Perpendicular arm means exactly 90°
  "q_p72_angles_order_comparison", // Zero < Acute < Right < Obtuse < Straight
];

/* ─────────────────────────────────────────────
   Reveal text for answers
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_p72_angle_formation: "Two rays or two line segments (with a common point)",
  q_p72_scissors_angle_change: "Increases (measure of angle gets larger)",
  q_p72_everyday_angle_examples: "Scissors blades, tree branches, cake slice, clock hands, open door",
  q_p72_fig1_zero_angle: "Zero angle (0° - no rotation between hand and body)",
  q_p72_fig2_acute_angle: "Acute angle (less than a right angle, < 90°)",
  q_p72_fig3_right_angle: "Right angle (exactly 90° - arm perpendicular to body)",
  q_p72_fig4_obtuse_angle: "Obtuse angle (more than a right angle, > 90° and < 180°)",
  q_p72_fig5_straight_angle: "Straight angle (180° - arm forms a straight line pointing up)",
  q_p72_perpendicular_meaning: "90° (Right angle)",
  q_p72_angles_order_comparison: "Zero angle (0°) < Acute (< 90°) < Right (90°) < Obtuse (> 90°) < Straight (180°)",
};

/* ─────────────────────────────────────────────
   Answer Validator
───────────────────────────────────────────── */
function validateAnswer(id: string, rawValue: string): boolean {
  const raw = rawValue.trim().toLowerCase();
  const v = raw.replace(/[^a-z0-9]/g, "");
  if (!v) return false;

  switch (id) {
    case "q_p72_angle_formation":
      if (v.includes("parallel") || v.includes("circle") || v.includes("curve")) return false;
      return (
        v.includes("ray") ||
        v.includes("segment") ||
        v.includes("tworay") ||
        v.includes("linesegment")
      );

    case "q_p72_scissors_angle_change":
      if (v.includes("decrease") || v.includes("same") || v.includes("constant") || v.includes("zero")) return false;
      return v.includes("increase") || v.includes("greater") || v.includes("larger") || v.includes("widen");

    case "q_p72_everyday_angle_examples":
      if (v.includes("water") || v.includes("air") || v.includes("sound") || v.includes("light")) return false;
      return (
        v.includes("scissor") ||
        v.includes("branch") ||
        v.includes("cake") ||
        v.includes("clock") ||
        v.includes("door") ||
        v.includes("tree") ||
        v.includes("blade")
      );

    case "q_p72_fig1_zero_angle":
      if (v.includes("90") || v.includes("180") || v.includes("right") || v.includes("straight") || v.includes("acute") || v.includes("obtuse")) return false;
      return v.includes("zero") || v === "0" || v.includes("0deg") || v.includes("noangle");

    case "q_p72_fig2_acute_angle":
      if (v.includes("obtuse") || v.includes("straight") || v.includes("reflex") || (v.includes("right") && !v.includes("lessthan"))) return false;
      return v.includes("acute") || v.includes("lessthan90") || v.includes("less");

    case "q_p72_fig3_right_angle":
      if (v.includes("acute") || v.includes("obtuse") || v.includes("straight") || v.includes("zero")) return false;
      return v.includes("right") || v.includes("90") || v.includes("perpendicular");

    case "q_p72_fig4_obtuse_angle":
      if (v.includes("acute") || v.includes("straight") || v.includes("zero") || (v.includes("right") && !v.includes("morethan") && !v.includes("greater"))) return false;
      return v.includes("obtuse") || v.includes("morethan") || v.includes("greaterthan90");

    case "q_p72_fig5_straight_angle":
      if (v.includes("acute") || v.includes("obtuse") || v.includes("zero") || (v.includes("right") && !v.includes("straight"))) return false;
      return v.includes("straight") || v.includes("180");

    case "q_p72_perpendicular_meaning":
      if (v.includes("45") || v.includes("180") || v.includes("360")) return false;
      return v.includes("90") || v.includes("right");

    case "q_p72_angles_order_comparison":
      if (raw.startsWith("straight") || raw.includes("straight <") || raw.startsWith("right")) return false;
      return (
        (v.includes("zero") && v.includes("acute") && v.includes("right")) ||
        (v.includes("acute") && v.includes("obtuse") && v.includes("straight"))
      );

    default:
      return false;
  }
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

export function C6MathsCh5Page4() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;

  const storageKey = "c6-maths-ch5-page4";

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
  // Body angle explorer: 0° to 180°
  const [armAngle, setArmAngle] = useState<number>(90);

  // Scissors angle opening: 10° to 90°
  const [scissorsAngle, setScissorsAngle] = useState<number>(35);

  // Cake slice cut angle: 30°, 90°, 120°, 180°
  const [cakeSliceAngle, setCakeSliceAngle] = useState<number>(60);

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
      setArmAngle(90);
      setScissorsAngle(35);
      setCakeSliceAngle(60);
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
    setArmAngle(90);
    setScissorsAngle(35);
    setCakeSliceAngle(60);
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

  // Classification helper for current arm angle
  const getAngleType = (deg: number) => {
    if (deg === 0) return { name: "Zero Angle", color: "text-slate-600 bg-slate-100 dark:bg-slate-800" };
    if (deg < 90) return { name: "Acute Angle", color: "text-emerald-700 bg-emerald-100 dark:bg-emerald-950" };
    if (deg === 90) return { name: "Right Angle", color: "text-blue-700 bg-blue-100 dark:bg-blue-950" };
    if (deg < 180) return { name: "Obtuse Angle", color: "text-amber-700 bg-amber-100 dark:bg-amber-950" };
    return { name: "Straight Angle", color: "text-purple-700 bg-purple-100 dark:bg-purple-950" };
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
          PAGE 72 HEADER & SCORING ACTION BAR
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-600/40 bg-card overflow-hidden shadow-sm">
        {/* Banner */}
        <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-800 text-white font-heading font-bold px-5 py-4 text-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-white/20 text-xl">✂️</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                5.3 Measure of an Angle
              </h1>
              <p className="text-xs text-teal-100 font-normal">
                Class 6 Maths &bull; Chapter 5 &bull; Measures of Lines and Angles &bull; Printed Page 64
              </p>
            </div>
          </div>
          <span className="text-xs bg-teal-950/80 text-teal-200 px-3 py-1 rounded-full border border-teal-400/30 font-mono self-start sm:self-auto font-bold">
            Page 72
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
          SECTION 1: ANGLES AROUND US ALL THE TIME
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-500/40 bg-card overflow-hidden shadow-sm p-5 sm:p-7 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-teal-200 dark:border-teal-800/60">
          <div className="flex items-center gap-2">
            <span className="bg-teal-600 text-white p-1.5 rounded-lg text-lg">
              🌿
            </span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-teal-950 dark:text-teal-200">
              We see angles around us all the time
            </h2>
          </div>
          <span className="text-xs font-mono font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-2.5 py-1 rounded-full">
            Introduction
          </span>
        </div>

        <p className="text-sm sm:text-base leading-relaxed">
          We know as the line segments of the blade of scissors move further apart, the measure of the angle between them increases. Angle is formed between two rays or two line segments.
        </p>

        {/* 3 Illustrated Textbook Figures: Tree Branch, Scissors, Cake */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Item 1: Tree Branch */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border flex flex-col items-center shadow-xs">
            <span className="text-xs font-bold text-teal-800 dark:text-teal-300 mb-2">
              1. Tree Branch (Forked Angle)
            </span>
            <svg viewBox="0 0 160 120" className="w-full max-w-[150px] h-auto">
              {/* Main trunk/branch */}
              <path
                d="M 80 115 Q 80 75 75 60"
                stroke="#854d0e"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
              {/* Left fork */}
              <path
                d="M 75 60 Q 55 45 35 30"
                stroke="#854d0e"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
              {/* Right fork */}
              <path
                d="M 75 60 Q 100 45 125 35"
                stroke="#854d0e"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
              {/* Angle arc between branches */}
              <path
                d="M 55 45 A 25 25 0 0 1 95 48"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="2,2"
              />
              <circle cx="75" cy="60" r="3" fill="#ef4444" />
              <text x="75" y="40" fontSize="10" fontWeight="bold" fill="#ef4444" textAnchor="middle">&ang;</text>
            </svg>
            <span className="text-[11px] text-muted-foreground mt-2 font-mono">
              Angle at branching node
            </span>
          </div>

          {/* Item 2: Interactive Scissors */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border flex flex-col items-center shadow-xs">
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-xs font-bold text-blue-800 dark:text-blue-300">
                2. Scissors Blades
              </span>
              <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400">
                {scissorsAngle}&deg;
              </span>
            </div>
            <svg viewBox="0 0 160 120" className="w-full max-w-[150px] h-auto">
              {/* Central Pivot Screw */}
              <circle cx="70" cy="60" r="4" fill="#0f172a" className="dark:fill-white" />
              {/* Blade 1 (Fixed lower blade) */}
              <g transform={`rotate(-${scissorsAngle / 2}, 70, 60)`}>
                <line x1="70" y1="60" x2="140" y2="35" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                {/* Finger hole 1 */}
                <circle cx="25" cy="80" r="14" fill="none" stroke="#0284c7" strokeWidth="3.5" />
                <line x1="70" y1="60" x2="35" y2="72" stroke="#0284c7" strokeWidth="4" />
              </g>
              {/* Blade 2 (Upper rotating blade) */}
              <g transform={`rotate(${scissorsAngle / 2}, 70, 60)`}>
                <line x1="70" y1="60" x2="140" y2="85" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                {/* Finger hole 2 */}
                <circle cx="25" cy="40" r="14" fill="none" stroke="#0284c7" strokeWidth="3.5" />
                <line x1="70" y1="60" x2="35" y2="48" stroke="#0284c7" strokeWidth="4" />
              </g>
              {/* Angle arc between blades */}
              <path
                d="M 100 50 A 30 30 0 0 1 100 70"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
              />
            </svg>
            <div className="w-full mt-2 space-y-1">
              <input
                type="range"
                min="10"
                max="85"
                value={scissorsAngle}
                onChange={(e) => setScissorsAngle(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-muted-foreground block text-center font-mono">
                Slide to open/close scissors
              </span>
            </div>
          </div>

          {/* Item 3: Cake Slice */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border flex flex-col items-center shadow-xs">
            <span className="text-xs font-bold text-pink-800 dark:text-pink-300 mb-2">
              3. Cake Slice (Sector Angle)
            </span>
            <svg viewBox="0 0 160 120" className="w-full max-w-[150px] h-auto">
              {/* Round cake with cut out */}
              <ellipse cx="70" cy="55" rx="45" ry="22" fill="#f472b6" stroke="#db2777" strokeWidth="1.5" />
              <path d="M 25 55 v 20 c 0 12 90 12 90 0 v -20" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />

              {/* Cut-out slice standing out */}
              <g transform="translate(35, 10)">
                <path d="M 60 40 L 95 30 L 90 55 Z" fill="#ec4899" stroke="#be185d" strokeWidth="1.5" />
                <path d="M 60 40 v 20 l 30 15 v -20 Z" fill="#f472b6" stroke="#be185d" strokeWidth="1.5" />
                <path d="M 95 30 v 20 l -5 25 v -20 Z" fill="#db2777" stroke="#be185d" strokeWidth="1.5" />
              </g>
              {/* Angle indicator at cut center */}
              <circle cx="70" cy="55" r="2.5" fill="#be185d" />
              <text x="70" y="45" fontSize="9" fontWeight="bold" fill="#be185d" textAnchor="middle">&theta;</text>
            </svg>
            <span className="text-[11px] text-muted-foreground mt-2 font-mono">
              Sector angle of cake slice
            </span>
          </div>
        </div>

        {/* ── Gradable Questions for Intro ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
            <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
              <span>An angle is formed between two _______</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
                +1 pt
              </span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Two rays or two line segments",
                "Two parallel lines",
                "Two closed circles",
              ].map((c) => (
                <button
                  key={c}
                  type="button"
                  disabled={isRevealed}
                  onClick={() => {
                    handleChange("q_p72_angle_formation", c);
                    gradeDirectly("q_p72_angle_formation", c);
                  }}
                  className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-50 text-foreground cursor-pointer"
                >
                  {c}
                </button>
              ))}
            </div>
            <Field id="q_p72_angle_formation" placeholder="e.g. Two rays or line segments" />
          </div>

          <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
            <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
              <span>When scissors blades move further apart, the angle:</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
                +1 pt
              </span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["Increases", "Decreases", "Remains the same"].map((c) => (
                <button
                  key={c}
                  type="button"
                  disabled={isRevealed}
                  onClick={() => {
                    handleChange("q_p72_scissors_angle_change", c);
                    gradeDirectly("q_p72_scissors_angle_change", c);
                  }}
                  className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-50 text-foreground cursor-pointer"
                >
                  {c}
                </button>
              ))}
            </div>
            <Field id="q_p72_scissors_angle_change" placeholder="e.g. Increases" />
          </div>

          <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
            <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
              <span>Examples where we see angles:</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
                +1 pt
              </span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Scissors, tree branches, cake slice, clock",
                "Water, air, sound, light",
                "Single point, straight line",
              ].map((c) => (
                <button
                  key={c}
                  type="button"
                  disabled={isRevealed}
                  onClick={() => {
                    handleChange("q_p72_everyday_angle_examples", c);
                    gradeDirectly("q_p72_everyday_angle_examples", c);
                  }}
                  className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-50 text-foreground cursor-pointer"
                >
                  {c}
                </button>
              ))}
            </div>
            <Field id="q_p72_everyday_angle_examples" placeholder="e.g. Scissors, tree branch, cake slice" />
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          SECTION 2: ACTIVITY & THE 5 BODY ANGLES (FIGURES i to v)
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-emerald-600/40 bg-card overflow-hidden shadow-sm">
        {/* Activity Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-800 text-white font-heading font-bold px-5 py-3.5 text-lg flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="bg-white/20 p-1.5 rounded-lg text-base">🤸</span>
            <span>ACTIVITY &bull; The 5 Types of Angles Formed by Your Body</span>
          </div>
          <span className="text-xs font-mono bg-white/20 px-2.5 py-0.5 rounded-full">
            Figures (i) to (v)
          </span>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          <p className="text-sm sm:text-base leading-relaxed">
            Put your hands close to your body. Keep one hand in the same position and slowly move up the other hand. As you go on moving your hand, you can observe the angle between your body and moving hand changes.
          </p>

          {/* ── 5 Illustrated Student Figures Matching Textbook ── */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
            {/* Figure (i): Zero Angle */}
            <div
              onClick={() => setArmAngle(0)}
              className={`p-3 rounded-2xl border-2 flex flex-col items-center cursor-pointer transition-all ${
                armAngle === 0
                  ? "border-slate-600 bg-slate-50 dark:bg-slate-900 shadow-md ring-2 ring-slate-400/40"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-400 bg-card"
              }`}
            >
              <span className="font-heading font-bold text-xs text-slate-800 dark:text-slate-200">
                Figure (i)
              </span>
              <svg viewBox="0 0 80 120" className="w-16 h-24 my-1">
                {/* Head */}
                <circle cx="40" cy="20" r="10" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
                {/* Body / Shirt */}
                <rect x="30" y="32" width="20" height="30" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                {/* Left hand down */}
                <line x1="30" y1="35" x2="22" y2="65" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" />
                {/* Right hand down along body (0°) */}
                <line x1="50" y1="35" x2="58" y2="65" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                {/* Shorts */}
                <rect x="32" y="62" width="16" height="18" fill="#1e40af" />
                {/* Legs */}
                <line x1="36" y1="80" x2="36" y2="108" stroke="#ca8a04" strokeWidth="3" />
                <line x1="44" y1="80" x2="44" y2="108" stroke="#ca8a04" strokeWidth="3" />
              </svg>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Zero Angle
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">0&deg;</span>
            </div>

            {/* Figure (ii): Acute Angle */}
            <div
              onClick={() => setArmAngle(45)}
              className={`p-3 rounded-2xl border-2 flex flex-col items-center cursor-pointer transition-all ${
                armAngle > 0 && armAngle < 90
                  ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 shadow-md ring-2 ring-emerald-400/40"
                  : "border-slate-200 dark:border-slate-800 hover:border-emerald-300 bg-card"
              }`}
            >
              <span className="font-heading font-bold text-xs text-emerald-800 dark:text-emerald-200">
                Figure (ii)
              </span>
              <svg viewBox="0 0 80 120" className="w-16 h-24 my-1">
                <circle cx="40" cy="20" r="10" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
                <rect x="30" y="32" width="20" height="30" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                <line x1="30" y1="35" x2="22" y2="65" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" />
                {/* Right hand raised partially (acute ~45°) */}
                <line x1="50" y1="35" x2="72" y2="52" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                <rect x="32" y="62" width="16" height="18" fill="#1e40af" />
                <line x1="36" y1="80" x2="36" y2="108" stroke="#ca8a04" strokeWidth="3" />
                <line x1="44" y1="80" x2="44" y2="108" stroke="#ca8a04" strokeWidth="3" />
              </svg>
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                Acute Angle
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">&lt; 90&deg;</span>
            </div>

            {/* Figure (iii): Right Angle */}
            <div
              onClick={() => setArmAngle(90)}
              className={`p-3 rounded-2xl border-2 flex flex-col items-center cursor-pointer transition-all ${
                armAngle === 90
                  ? "border-blue-500 bg-blue-50/70 dark:bg-blue-950/30 shadow-md ring-2 ring-blue-400/40"
                  : "border-slate-200 dark:border-slate-800 hover:border-blue-300 bg-card"
              }`}
            >
              <span className="font-heading font-bold text-xs text-blue-800 dark:text-blue-200">
                Figure (iii)
              </span>
              <svg viewBox="0 0 80 120" className="w-16 h-24 my-1">
                <circle cx="40" cy="20" r="10" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
                <rect x="30" y="32" width="20" height="30" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                <line x1="30" y1="35" x2="22" y2="65" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" />
                {/* Right hand horizontal (90°) */}
                <line x1="50" y1="35" x2="78" y2="35" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                <rect x="32" y="62" width="16" height="18" fill="#1e40af" />
                <line x1="36" y1="80" x2="36" y2="108" stroke="#ca8a04" strokeWidth="3" />
                <line x1="44" y1="80" x2="44" y2="108" stroke="#ca8a04" strokeWidth="3" />
              </svg>
              <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300">
                Right Angle
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">= 90&deg;</span>
            </div>

            {/* Figure (iv): Obtuse Angle */}
            <div
              onClick={() => setArmAngle(135)}
              className={`p-3 rounded-2xl border-2 flex flex-col items-center cursor-pointer transition-all ${
                armAngle > 90 && armAngle < 180
                  ? "border-amber-500 bg-amber-50/70 dark:bg-amber-950/30 shadow-md ring-2 ring-amber-400/40"
                  : "border-slate-200 dark:border-slate-800 hover:border-amber-300 bg-card"
              }`}
            >
              <span className="font-heading font-bold text-xs text-amber-800 dark:text-amber-200">
                Figure (iv)
              </span>
              <svg viewBox="0 0 80 120" className="w-16 h-24 my-1">
                <circle cx="40" cy="20" r="10" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
                <rect x="30" y="32" width="20" height="30" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                <line x1="30" y1="35" x2="22" y2="65" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" />
                {/* Right hand raised higher (obtuse ~135°) */}
                <line x1="50" y1="35" x2="72" y2="15" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                <rect x="32" y="62" width="16" height="18" fill="#1e40af" />
                <line x1="36" y1="80" x2="36" y2="108" stroke="#ca8a04" strokeWidth="3" />
                <line x1="44" y1="80" x2="44" y2="108" stroke="#ca8a04" strokeWidth="3" />
              </svg>
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300">
                Obtuse Angle
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">&gt; 90&deg;</span>
            </div>

            {/* Figure (v): Straight Angle */}
            <div
              onClick={() => setArmAngle(180)}
              className={`p-3 rounded-2xl border-2 flex flex-col items-center cursor-pointer transition-all col-span-2 sm:col-span-1 ${
                armAngle === 180
                  ? "border-purple-500 bg-purple-50/70 dark:bg-purple-950/30 shadow-md ring-2 ring-purple-400/40"
                  : "border-slate-200 dark:border-slate-800 hover:border-purple-300 bg-card"
              }`}
            >
              <span className="font-heading font-bold text-xs text-purple-800 dark:text-purple-200">
                Figure (v)
              </span>
              <svg viewBox="0 0 80 120" className="w-16 h-24 my-1">
                <circle cx="40" cy="20" r="10" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
                <rect x="30" y="32" width="20" height="30" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                <line x1="30" y1="35" x2="22" y2="65" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" />
                {/* Right hand pointing vertically up (180°) */}
                <line x1="50" y1="35" x2="50" y2="4" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                <rect x="32" y="62" width="16" height="18" fill="#1e40af" />
                <line x1="36" y1="80" x2="36" y2="108" stroke="#ca8a04" strokeWidth="3" />
                <line x1="44" y1="80" x2="44" y2="108" stroke="#ca8a04" strokeWidth="3" />
              </svg>
              <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300">
                Straight Angle
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">= 180&deg;</span>
            </div>
          </div>

          {/* ── Interactive Live Body Angle Visualizer & Slider ── */}
          <div className="p-5 bg-muted/30 rounded-2xl border border-teal-200 dark:border-teal-800/40 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                  Interactive Body Angle Slider
                </span>
                <p className="text-xs text-muted-foreground">
                  Move the slider to rotate the student&apos;s arm and observe the angle definition:
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-foreground">
                  Angle: {armAngle}&deg;
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    getAngleType(armAngle).color
                  }`}
                >
                  {getAngleType(armAngle).name}
                </span>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="180"
              step="5"
              value={armAngle}
              onChange={(e) => setArmAngle(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
              <span onClick={() => setArmAngle(0)} className="cursor-pointer hover:underline">
                0&deg; (Zero)
              </span>
              <span onClick={() => setArmAngle(45)} className="cursor-pointer hover:underline">
                45&deg; (Acute)
              </span>
              <span onClick={() => setArmAngle(90)} className="cursor-pointer hover:underline font-bold text-blue-600">
                90&deg; (Right)
              </span>
              <span onClick={() => setArmAngle(135)} className="cursor-pointer hover:underline">
                135&deg; (Obtuse)
              </span>
              <span onClick={() => setArmAngle(180)} className="cursor-pointer hover:underline font-bold text-purple-600">
                180&deg; (Straight)
              </span>
            </div>
          </div>

          {/* ── Gradable Questions for the 5 Body Angle Figures ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Question 4: Fig (i) Zero Angle */}
            <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
              <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
                <span>Figure (i): Hand along the body. What angle is formed?</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                  +1 pt
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["Zero angle (0°)", "Right angle (90°)", "Straight angle (180°)"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p72_fig1_zero_angle", c);
                      gradeDirectly("q_p72_fig1_zero_angle", c);
                    }}
                    className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-emerald-50 text-foreground cursor-pointer"
                  >
                    {c}
                  </button>
                ))}
              </div>
              <Field id="q_p72_fig1_zero_angle" placeholder="e.g. Zero angle (0°)" />
            </div>

            {/* Question 5: Fig (ii) Acute Angle */}
            <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
              <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
                <span>Figure (ii): Angle less than a right angle is called:</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                  +1 pt
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["Acute angle (< 90°)", "Obtuse angle (> 90°)", "Reflex angle"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p72_fig2_acute_angle", c);
                      gradeDirectly("q_p72_fig2_acute_angle", c);
                    }}
                    className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-emerald-50 text-foreground cursor-pointer"
                  >
                    {c}
                  </button>
                ))}
              </div>
              <Field id="q_p72_fig2_acute_angle" placeholder="e.g. Acute angle" />
            </div>

            {/* Question 6: Fig (iii) Right Angle */}
            <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
              <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
                <span>Figure (iii): Arm perpendicular to body (exactly 90°):</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                  +1 pt
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["Right angle (exactly 90°)", "Acute angle", "Straight angle"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p72_fig3_right_angle", c);
                      gradeDirectly("q_p72_fig3_right_angle", c);
                    }}
                    className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-emerald-50 text-foreground cursor-pointer"
                  >
                    {c}
                  </button>
                ))}
              </div>
              <Field id="q_p72_fig3_right_angle" placeholder="e.g. Right angle (90°)" />
            </div>

            {/* Question 7: Fig (iv) Obtuse Angle */}
            <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
              <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
                <span>Figure (iv): Angle more than a right angle is called:</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                  +1 pt
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["Obtuse angle (between 90° and 180°)", "Acute angle", "Zero angle"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p72_fig4_obtuse_angle", c);
                      gradeDirectly("q_p72_fig4_obtuse_angle", c);
                    }}
                    className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-emerald-50 text-foreground cursor-pointer"
                  >
                    {c}
                  </button>
                ))}
              </div>
              <Field id="q_p72_fig4_obtuse_angle" placeholder="e.g. Obtuse angle" />
            </div>

            {/* Question 8: Fig (v) Straight Angle */}
            <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
              <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
                <span>Figure (v): Arm pointing straight up forming 180°:</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                  +1 pt
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["Straight angle (180°)", "Right angle (90°)", "Acute angle (< 90°)"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p72_fig5_straight_angle", c);
                      gradeDirectly("q_p72_fig5_straight_angle", c);
                    }}
                    className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-emerald-50 text-foreground cursor-pointer"
                  >
                    {c}
                  </button>
                ))}
              </div>
              <Field id="q_p72_fig5_straight_angle" placeholder="e.g. Straight angle (180°)" />
            </div>

            {/* Question 9: Perpendicular angle definition */}
            <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
              <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
                <span>When two lines are perpendicular, the angle is:</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                  +1 pt
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["90° (Right angle)", "45°", "180°", "360°"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p72_perpendicular_meaning", c);
                      gradeDirectly("q_p72_perpendicular_meaning", c);
                    }}
                    className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-emerald-50 text-foreground cursor-pointer"
                  >
                    {c}
                  </button>
                ))}
              </div>
              <Field id="q_p72_perpendicular_meaning" placeholder="e.g. 90°" />
            </div>

            {/* Question 10: Ascending Order of Angles */}
            <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs md:col-span-2">
              <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
                <span>Arrange the angles from smallest to largest:</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                  +1 pt
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Zero < Acute < Right < Obtuse < Straight",
                  "Straight < Obtuse < Right < Acute",
                  "Right < Acute < Obtuse",
                ].map((c) => (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p72_angles_order_comparison", c);
                      gradeDirectly("q_p72_angles_order_comparison", c);
                    }}
                    className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-emerald-50 text-foreground cursor-pointer"
                  >
                    {c}
                  </button>
                ))}
              </div>
              <Field
                id="q_p72_angles_order_comparison"
                placeholder="e.g. Zero < Acute < Right < Obtuse < Straight"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          PAGE 72 SCORE SUMMARY FOOTER CARD
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-300 dark:border-teal-800/80 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/30 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-2xl font-bold shadow-sm">
            🏆
          </div>
          <div>
            <h4 className="font-heading font-bold text-foreground text-base">
              Page 72 Score Summary
            </h4>
            <p className="text-xs text-muted-foreground">
              {correctCount === ALL_INPUT_IDS.length
                ? "🎉 Fantastic! You mastered all 10 angle concepts on Page 72!"
                : correctCount > 0
                  ? `Keep going! You answered ${correctCount} of ${ALL_INPUT_IDS.length} questions correctly.`
                  : "Click the quick choice buttons or type answers above to score points."}
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
