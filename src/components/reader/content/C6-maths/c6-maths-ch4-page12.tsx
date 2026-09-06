"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Gradable Points / Concept Questions for Page 68
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "q_p68_line_def", // 3. Line extending on both sides indefinitely
  "q_p68_ray_def", // 4. Ray starts at one point and goes in one direction endlessly
  "q_p68_curve_types", // 7. Curves are of 2 types: open and closed
  "q_p68_angle_rays", // 8. An angle is made up of two rays starting from a common end point
  "q_p68_triangle_sides", // 10 & 11. Triangle bounded by 3 line segments (3 vertices, 3 sides, 3 angles)
  "q_p68_quad_elements", // 13. Quadrilateral bounded by 4 line segments (4 vertices, 4 sides, 4 angles, 2 diagonals)
  "q_p68_circle_radius", // 14. Equal distance from centre is called radius
  "q_p68_circumference", // 15. Total length of circle is called circumference
  "q_p68_diameter_relation", // 17. A diameter of a circle is double the radius
  "q_p68_sector_def", // 19. Region bounded by two radii and arc is called sector
  "q_p68_segment_def", // 20. Region bounded by a chord and arc is called segment
  "q_p68_semicircle_def", // 21. Each diameter divides a circle into two semicircles (half of circle)
  "q_p68_euclid_father", // Euclid mathematician / Father of Geometry
];

/* ─────────────────────────────────────────────
   Reveal text for answers
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_p68_line_def: "Line (extends on both sides indefinitely)",
  q_p68_ray_def: "Ray (1 end point, extends in 1 direction)",
  q_p68_curve_types: "Open and Closed curves",
  q_p68_angle_rays: "Two rays (with a common vertex)",
  q_p68_triangle_sides: "3 sides, 3 vertices, 3 angles",
  q_p68_quad_elements: "4 vertices, 4 sides, 4 angles, 2 diagonals",
  q_p68_circle_radius: "Radius (equal distance from centre)",
  q_p68_circumference: "Circumference (total perimeter of circle)",
  q_p68_diameter_relation: "Double (Diameter = 2 × Radius)",
  q_p68_sector_def: "Sector (enclosed by 2 radii and arc)",
  q_p68_segment_def: "Segment (enclosed by chord and arc)",
  q_p68_semicircle_def: "Semicircle (half of the circle)",
  q_p68_euclid_father: "Euclid (Father of Geometry - The Elements)",
};

/* ─────────────────────────────────────────────
   Answer Validator
───────────────────────────────────────────── */
function validateAnswer(id: string, rawValue: string): boolean {
  const v = rawValue.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!v) return false;

  switch (id) {
    case "q_p68_line_def":
      // Line is obtained when segment extends on both sides indefinitely (should NOT match segment or ray)
      if (v.includes("segment") && !v.includes("line")) return false;
      if (v.includes("ray")) return false;
      return v === "line" || v.startsWith("line") || v.includes("straightline");

    case "q_p68_ray_def":
      if (v === "line" || v === "segment" || v === "chord") return false;
      return v.includes("ray");

    case "q_p68_curve_types":
      return (
        (v.includes("open") && v.includes("close")) ||
        v.includes("openandclose") ||
        v.includes("closedandopen")
      );

    case "q_p68_angle_rays":
      if (v.includes("one") || v.includes("1ray") || v.includes("threeray") || v.includes("3ray")) return false;
      return (
        v.includes("2") ||
        v.includes("two") ||
        v.includes("tworay") ||
        v.includes("pair")
      );

    case "q_p68_triangle_sides":
      if (v.includes("4") || v.includes("four")) return false;
      return (
        v.includes("3") ||
        v.includes("three") ||
        v.includes("triangle")
      );

    case "q_p68_quad_elements":
      if (v.includes("1diagonal") || v.includes("onediagonal") || v.includes("4diagonal") || v.includes("fourdiagonal")) return false;
      return (
        v.includes("2") ||
        v.includes("two") ||
        v.includes("twodiagonal")
      );

    case "q_p68_circle_radius":
      if (v.includes("diameter") || v.includes("chord") || v.includes("arc")) return false;
      return v.includes("radius") || v.includes("radii");

    case "q_p68_circumference":
      if (v.includes("diameter") || v.includes("area") || v.includes("radius")) return false;
      return (
        v.includes("circumference") ||
        v.includes("perimeter") ||
        v.includes("boundary")
      );

    case "q_p68_diameter_relation":
      if (v.includes("half") || v.includes("equal") || v.includes("triple")) return false;
      return (
        v.includes("double") ||
        v.includes("twice") ||
        v.includes("2") ||
        v.includes("two") ||
        v.includes("2r")
      );

    case "q_p68_sector_def":
      if (v.includes("segment") || v.includes("chord")) return false;
      return v.includes("sector") || v.includes("radii");

    case "q_p68_segment_def":
      if (v.includes("sector") || v.includes("radii")) return false;
      return v.includes("segment") || v.includes("chord");

    case "q_p68_semicircle_def":
      if (v.includes("quadrant") || v.includes("circle")) {
        if (!v.includes("semi")) return false;
      }
      return (
        v.includes("semicircle") ||
        v.includes("semi") ||
        v.includes("half")
      );

    case "q_p68_euclid_father":
      if (v.includes("geometry") && !v.includes("element")) return false;
      if (v.includes("universe")) return false;
      return (
        v.includes("element") ||
        v.includes("theelement") ||
        v.includes("euclid")
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

export function C6MathsCh4Page12() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;

  const storageKey = "c6-maths-ch4-page12";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    label?: string;
    id: number;
  } | null>(null);

  // Interactive geometry flashcard / explorer state
  const [activeTab, setActiveTab] = useState<
    "all" | "lines" | "curves" | "polygons" | "circles" | "euclid"
  >("all");
  const [selectedPointNum, setSelectedPointNum] = useState<number | null>(null);

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
      setSelectedPointNum(null);
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
    setSelectedPointNum(null);
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
          PAGE 68 HEADER & SCORING CONTROLS BAR
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-emerald-600/40 bg-card overflow-hidden shadow-sm">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-800 text-white font-heading font-bold px-5 py-3.5 text-lg flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-white/20 backdrop-blur rounded-lg text-xl">
              📐
            </span>
            <div>
              <span className="tracking-wide">WHAT HAVE WE DISCUSSED? (Summary) & Euclid</span>
              <div className="text-[11px] font-sans font-normal opacity-90 text-emerald-100">
                Class 6 Maths • Basic Geometrical Ideas • Page 68
              </div>
            </div>
          </div>
          <span className="text-xs bg-emerald-950/70 text-emerald-200 px-3 py-1 rounded-full border border-emerald-400/30 font-mono">
            Page 68 / 193
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
          CATEGORY FILTER NAVIGATION TABS
      ──────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-muted/40 rounded-2xl border">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2">
          Explore Summary Topics:
        </span>
        <div className="flex flex-wrap gap-1">
          {[
            { id: "all", label: "All 19 Key Points", icon: "📑" },
            { id: "lines", label: "Lines & Rays (3-4)", icon: "📏" },
            { id: "curves", label: "Curves & Angles (5-9)", icon: "📐" },
            { id: "polygons", label: "Triangles & Quads (10-13)", icon: "🔷" },
            { id: "circles", label: "Circle Properties (14-21)", icon: "⭕" },
            { id: "euclid", label: "Euclid of Alexandria", icon: "🏛️" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-background text-muted-foreground hover:text-foreground border border-slate-200 dark:border-slate-800"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────
          SECTION 1: WHAT HAVE WE DISCUSSED?
          (Textbook Points 3 to 21 with Visual Explanations & Gradable Checks)
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-card overflow-hidden shadow-sm space-y-6 p-5 sm:p-7">
        <div className="border-b border-emerald-200 dark:border-emerald-800/60 pb-3 flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
              <span>What Have We Discussed?</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Complete chapter revision from Point 3 to 21. Review each concept, examine illustrations, and test your understanding.
            </p>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono font-bold px-3 py-1 rounded-full">
            Points 3 – 21
          </span>
        </div>

        {/* ── Group A: Lines & Rays (Points 3 & 4) ──────────────── */}
        {(activeTab === "all" || activeTab === "lines") && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-2 border-b pb-1.5">
              <span>Lines, Line Segments & Rays</span>
            </h3>

            {/* Point 3 */}
            <div className="p-4 rounded-xl bg-muted/20 border space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <div className="space-y-2 flex-1">
                  <p className="text-xs sm:text-sm leading-relaxed text-foreground">
                    A <strong>line</strong> is obtained when a line segment extends on both sides indefinitely.
                  </p>

                  <div className="flex flex-col md:flex-row items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-xl border">
                    <svg viewBox="0 0 240 50" className="w-full max-w-[220px] h-auto select-none">
                      {/* Bidirectional line */}
                      <line x1="20" y1="25" x2="220" y2="25" stroke="#0d9488" strokeWidth="2.5" markerStart="url(#arrow-left)" markerEnd="url(#arrow-right)" />
                      <polygon points="12,25 22,20 22,30" fill="#0d9488" />
                      <polygon points="228,25 218,20 218,30" fill="#0d9488" />
                      {/* Points A and B on line */}
                      <circle cx="70" cy="25" r="3.5" fill="#0f172a" className="dark:fill-white" />
                      <text x="68" y="16" fontSize="11" fontWeight="bold" fill="#0f172a" className="dark:fill-white">A</text>
                      <circle cx="170" cy="25" r="3.5" fill="#0f172a" className="dark:fill-white" />
                      <text x="168" y="16" fontSize="11" fontWeight="bold" fill="#0f172a" className="dark:fill-white">B</text>
                    </svg>

                    <div className="flex-1 w-full space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                        <span>What is obtained when a segment extends on both sides indefinitely?</span>
                        <span className="text-[10px] bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-1 rounded font-bold">+1 pt</span>
                      </label>
                      <div className="flex flex-wrap gap-1.5 mb-1">
                        {["Line", "Ray", "Segment"].map((c) => (
                          <button
                            key={c}
                            type="button"
                            disabled={isRevealed}
                            onClick={() => {
                              handleChange("q_p68_line_def", c);
                              gradeDirectly("q_p68_line_def", c);
                            }}
                            className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-100 dark:hover:bg-teal-950/40 text-foreground cursor-pointer"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                      <Field id="q_p68_line_def" placeholder="e.g. Line" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Point 4 */}
            <div className="p-4 rounded-xl bg-muted/20 border space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  4
                </span>
                <div className="space-y-2 flex-1">
                  <p className="text-xs sm:text-sm leading-relaxed text-foreground">
                    A <strong>ray</strong> is a part of a line starting at a point and goes in one direction endlessly.
                  </p>

                  <div className="flex flex-col md:flex-row items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-xl border">
                    <svg viewBox="0 0 240 50" className="w-full max-w-[220px] h-auto select-none">
                      {/* Ray with start point O and arrow in one direction */}
                      <line x1="30" y1="25" x2="215" y2="25" stroke="#f59e0b" strokeWidth="2.5" />
                      <polygon points="225,25 215,20 215,30" fill="#f59e0b" />
                      {/* Starting point O and point P */}
                      <circle cx="30" cy="25" r="4" fill="#d97706" />
                      <text x="26" y="16" fontSize="11" fontWeight="bold" fill="#d97706">O (Start)</text>
                      <circle cx="140" cy="25" r="3.5" fill="#0f172a" className="dark:fill-white" />
                      <text x="138" y="16" fontSize="11" fontWeight="bold" fill="#0f172a" className="dark:fill-white">P</text>
                    </svg>

                    <div className="flex-1 w-full space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                        <span>A part of a line starting at a point and going endlessly in one direction is a:</span>
                        <span className="text-[10px] bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-1 rounded font-bold">+1 pt</span>
                      </label>
                      <div className="flex flex-wrap gap-1.5 mb-1">
                        {["Ray", "Line", "Chord"].map((c) => (
                          <button
                            key={c}
                            type="button"
                            disabled={isRevealed}
                            onClick={() => {
                              handleChange("q_p68_ray_def", c);
                              gradeDirectly("q_p68_ray_def", c);
                            }}
                            className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-amber-100 dark:hover:bg-amber-950/40 text-foreground cursor-pointer"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                      <Field id="q_p68_ray_def" placeholder="e.g. Ray" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Group B: Curves & Angles (Points 5 to 9) ──────────── */}
        {(activeTab === "all" || activeTab === "curves") && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-2 border-b pb-1.5">
              <span>Curves & Angles (Points 5 to 9)</span>
            </h3>

            {/* Points 5 & 6 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/20 border space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                    5
                  </span>
                  <p className="text-xs sm:text-sm text-foreground">
                    Any figure drawn without lifting a pencil may be called a <strong>curve</strong>. In this sense, a line is also a curve.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/20 border space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                    6
                  </span>
                  <p className="text-xs sm:text-sm text-foreground">
                    A <strong>simple curve</strong> is one that does not cross itself.
                  </p>
                </div>
              </div>
            </div>

            {/* Point 7: Open and Closed curves */}
            <div className="p-4 rounded-xl bg-muted/20 border space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  7
                </span>
                <div className="space-y-2 flex-1">
                  <p className="text-xs sm:text-sm text-foreground">
                    Curves are of <strong>2 types</strong> — <strong>open</strong> and <strong>closed</strong>.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-3 rounded-xl border">
                    <div className="flex gap-4 items-center">
                      <div className="text-center">
                        <svg viewBox="0 0 60 40" className="w-16 h-10">
                          <path d="M 10 30 Q 30 5, 50 30" fill="none" stroke="#2563eb" strokeWidth="2.5" />
                        </svg>
                        <span className="text-[10px] font-bold text-blue-600">Open Curve</span>
                      </div>
                      <div className="text-center">
                        <svg viewBox="0 0 60 40" className="w-16 h-10">
                          <ellipse cx="30" cy="20" rx="22" ry="14" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
                        </svg>
                        <span className="text-[10px] font-bold text-blue-600">Closed Curve</span>
                      </div>
                    </div>
                    <div className="flex-1 w-full sm:max-w-xs space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                        <span>Name the 2 types of curves:</span>
                        <span className="text-[10px] bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-1 rounded font-bold">+1 pt</span>
                      </label>
                      <div className="flex gap-1.5 mb-1">
                        {["Open and Closed", "Straight and Bent"].map((c) => (
                          <button
                            key={c}
                            type="button"
                            disabled={isRevealed}
                            onClick={() => {
                              handleChange("q_p68_curve_types", c);
                              gradeDirectly("q_p68_curve_types", c);
                            }}
                            className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-blue-100 dark:hover:bg-blue-950/40 text-foreground cursor-pointer"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                      <Field id="q_p68_curve_types" placeholder="e.g. Open and closed" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Points 8 & 9: Angle Definition and Plane Division */}
            <div className="p-4 rounded-xl bg-muted/20 border space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  8 & 9
                </span>
                <div className="space-y-3 flex-1">
                  <p className="text-xs sm:text-sm text-foreground">
                    An <strong>angle</strong> is made up of two rays starting from a common end point. The common end point is called <strong>vertex</strong> and the two rays are <strong>arms</strong> of the angle.
                  </p>
                  <p className="text-xs sm:text-sm text-foreground">
                    Every angle divides the plane into <strong>interior</strong>, <strong>exterior</strong> and <strong>boundary</strong> of the angle.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-xl border">
                    <svg viewBox="0 0 140 90" className="w-32 h-20 select-none">
                      {/* Angle rays */}
                      <line x1="20" y1="70" x2="120" y2="70" stroke="#7c3aed" strokeWidth="2.5" />
                      <line x1="20" y1="70" x2="90" y2="15" stroke="#7c3aed" strokeWidth="2.5" />
                      <path d="M 45 70 A 25 25 0 0 0 40 55" fill="none" stroke="#f59e0b" strokeWidth="2" />
                      <circle cx="20" cy="70" r="3.5" fill="#7c3aed" />
                      <text x="10" y="85" fontSize="10" fontWeight="bold" fill="#7c3aed">Vertex (O)</text>
                      <text x="125" y="74" fontSize="10" fontWeight="bold" fill="#7c3aed">Ray B</text>
                      <text x="94" y="16" fontSize="10" fontWeight="bold" fill="#7c3aed">Ray A</text>
                    </svg>
                    <div className="flex-1 w-full space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                        <span>An angle is made up of how many rays starting from a common point?</span>
                        <span className="text-[10px] bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-1 rounded font-bold">+1 pt</span>
                      </label>
                      <div className="flex gap-1.5 mb-1">
                        {["Two rays", "One ray", "Three rays"].map((c) => (
                          <button
                            key={c}
                            type="button"
                            disabled={isRevealed}
                            onClick={() => {
                              handleChange("q_p68_angle_rays", c);
                              gradeDirectly("q_p68_angle_rays", c);
                            }}
                            className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-purple-100 dark:hover:bg-purple-950/40 text-foreground cursor-pointer"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                      <Field id="q_p68_angle_rays" placeholder="e.g. Two rays" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Group C: Triangles & Quadrilaterals (Points 10 to 13) ── */}
        {(activeTab === "all" || activeTab === "polygons") && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-2 border-b pb-1.5">
              <span>Triangles & Quadrilaterals (Points 10 to 13)</span>
            </h3>

            {/* Points 10, 11, 12: Triangle */}
            <div className="p-4 rounded-xl bg-muted/20 border space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  10-12
                </span>
                <div className="space-y-2 flex-1">
                  <p className="text-xs sm:text-sm text-foreground">
                    10. A <strong>triangle</strong> is a simple closed figure bounded by <strong>three line segments</strong>.
                  </p>
                  <p className="text-xs sm:text-sm text-foreground">
                    11. A triangle has <strong>three vertices</strong>, <strong>three sides</strong> and <strong>three angles</strong>.
                  </p>
                  <p className="text-xs sm:text-sm text-foreground">
                    12. A triangle with its boundary and interior is called the <strong>triangular region</strong>.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-xl border">
                    <svg viewBox="0 0 140 100" className="w-32 h-24 select-none">
                      <polygon points="70,15 20,85 120,85" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
                      <circle cx="70" cy="15" r="3" fill="#b45309" />
                      <circle cx="20" cy="85" r="3" fill="#b45309" />
                      <circle cx="120" cy="85" r="3" fill="#b45309" />
                      <text x="68" y="10" fontSize="10" fontWeight="bold" fill="#b45309">A</text>
                      <text x="8" y="88" fontSize="10" fontWeight="bold" fill="#b45309">B</text>
                      <text x="125" y="88" fontSize="10" fontWeight="bold" fill="#b45309">C</text>
                    </svg>
                    <div className="flex-1 w-full space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                        <span>How many sides and angles does a triangle have?</span>
                        <span className="text-[10px] bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-1 rounded font-bold">+1 pt</span>
                      </label>
                      <div className="flex gap-1.5 mb-1">
                        {["3 sides, 3 angles", "4 sides, 4 angles"].map((c) => (
                          <button
                            key={c}
                            type="button"
                            disabled={isRevealed}
                            onClick={() => {
                              handleChange("q_p68_triangle_sides", c);
                              gradeDirectly("q_p68_triangle_sides", c);
                            }}
                            className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-amber-100 dark:hover:bg-amber-950/40 text-foreground cursor-pointer"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                      <Field id="q_p68_triangle_sides" placeholder="e.g. 3 sides and 3 angles" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Point 13: Quadrilateral */}
            <div className="p-4 rounded-xl bg-muted/20 border space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  13
                </span>
                <div className="space-y-2 flex-1">
                  <p className="text-xs sm:text-sm text-foreground">
                    A <strong>quadrilateral</strong> is a simple closed figure bounded by <strong>four line segments</strong>. It has <strong>four vertices</strong>, <strong>four sides</strong>, <strong>four angles</strong> and <strong>two diagonals</strong>.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-xl border">
                    <svg viewBox="0 0 140 100" className="w-32 h-24 select-none">
                      <polygon points="30,20 110,15 125,85 20,80" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
                      {/* Diagonals */}
                      <line x1="30" y1="20" x2="125" y2="85" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="3,2" />
                      <line x1="110" y1="15" x2="20" y2="80" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="3,2" />
                      <text x="24" y="16" fontSize="9" fontWeight="bold" fill="#4f46e5">P</text>
                      <text x="114" y="14" fontSize="9" fontWeight="bold" fill="#4f46e5">Q</text>
                      <text x="128" y="90" fontSize="9" fontWeight="bold" fill="#4f46e5">R</text>
                      <text x="10" y="85" fontSize="9" fontWeight="bold" fill="#4f46e5">S</text>
                    </svg>
                    <div className="flex-1 w-full space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                        <span>How many diagonals does a quadrilateral have?</span>
                        <span className="text-[10px] bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-1 rounded font-bold">+1 pt</span>
                      </label>
                      <div className="flex gap-1.5 mb-1">
                        {["2 diagonals", "1 diagonal", "4 diagonals"].map((c) => (
                          <button
                            key={c}
                            type="button"
                            disabled={isRevealed}
                            onClick={() => {
                              handleChange("q_p68_quad_elements", c);
                              gradeDirectly("q_p68_quad_elements", c);
                            }}
                            className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-indigo-100 dark:hover:bg-indigo-950/40 text-foreground cursor-pointer"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                      <Field id="q_p68_quad_elements" placeholder="e.g. 2 diagonals" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Group D: Circle Properties (Points 14 to 21) ──────── */}
        {(activeTab === "all" || activeTab === "circles") && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-2 border-b pb-1.5">
              <span>Circle Properties (Points 14 to 21)</span>
            </h3>

            {/* Points 14, 15, 16 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Point 14: Circle & Radius */}
              <div className="p-4 rounded-xl bg-muted/20 border space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                    14
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <p className="text-xs sm:text-sm text-foreground">
                      A <strong>circle</strong> is simple closed curve, where each point on the boundary is at an <strong>equal distance from the centre</strong>. The fixed distance is the <strong>radius</strong>.
                    </p>
                    <div className="flex gap-1.5">
                      {["Radius", "Diameter", "Chord"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_p68_circle_radius", c);
                            gradeDirectly("q_p68_circle_radius", c);
                          }}
                          className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-100 dark:hover:bg-teal-950/40 text-foreground cursor-pointer"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <Field id="q_p68_circle_radius" placeholder="e.g. Radius" />
                  </div>
                </div>
              </div>

              {/* Point 15: Arc & Circumference */}
              <div className="p-4 rounded-xl bg-muted/20 border space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                    15
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <p className="text-xs sm:text-sm text-foreground">
                      A part of a circle is an <strong>arc</strong> and the total length of the circle is called its <strong>circumference</strong>.
                    </p>
                    <div className="flex gap-1.5">
                      {["Circumference", "Diameter", "Area"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_p68_circumference", c);
                            gradeDirectly("q_p68_circumference", c);
                          }}
                          className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-100 dark:hover:bg-teal-950/40 text-foreground cursor-pointer"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <Field id="q_p68_circumference" placeholder="e.g. Circumference" />
                  </div>
                </div>
              </div>
            </div>

            {/* Points 16, 17, 18: Chord, Diameter relation, Circular Region */}
            <div className="p-4 rounded-xl bg-muted/20 border space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  16-18
                </span>
                <div className="space-y-2 flex-1">
                  <p className="text-xs sm:text-sm text-foreground">
                    16. A <strong>chord</strong> of a circle is a line segment joining any two points on the circle. Diameter is also a chord (the longest chord).
                  </p>
                  <p className="text-xs sm:text-sm text-foreground">
                    17. A <strong>diameter</strong> of a circle is <strong>double the radius</strong> ($d = 2r$).
                  </p>
                  <p className="text-xs sm:text-sm text-foreground">
                    18. A circle with its boundary and interior together is a <strong>circular region</strong>.
                  </p>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                      <span>What is the relationship between diameter and radius?</span>
                      <span className="text-[10px] bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-1 rounded font-bold">+1 pt</span>
                    </label>
                    <div className="flex gap-1.5 mb-1">
                      {["Diameter is double the radius", "Diameter is half of radius", "Equal"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_p68_diameter_relation", c);
                            gradeDirectly("q_p68_diameter_relation", c);
                          }}
                          className="text-[11px] px-2 py-0.5 rounded border bg-muted/40 hover:bg-teal-100 dark:hover:bg-teal-950/40 text-foreground cursor-pointer"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <Field id="q_p68_diameter_relation" placeholder="e.g. Double the radius (d = 2r)" />
                  </div>
                </div>
              </div>
            </div>

            {/* Points 19, 20, 21: Sector, Segment, Semicircles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Point 19: Sector */}
              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-amber-800 dark:text-amber-300">Point 19: Sector</span>
                  <span className="text-base">🍕</span>
                </div>
                <p className="text-xs text-foreground">
                  The region in a circle bounded by <strong>two radii and the arc</strong> is called <strong>sector</strong>.
                </p>
                <div className="flex gap-1">
                  {["Sector", "Segment"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      disabled={isRevealed}
                      onClick={() => {
                        handleChange("q_p68_sector_def", c);
                        gradeDirectly("q_p68_sector_def", c);
                      }}
                      className="text-[10px] px-2 py-0.5 rounded border bg-white dark:bg-slate-900 cursor-pointer"
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <Field id="q_p68_sector_def" placeholder="e.g. Sector" />
              </div>

              {/* Point 20: Segment */}
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-800 dark:text-emerald-300">Point 20: Segment</span>
                  <span className="text-base">🏹</span>
                </div>
                <p className="text-xs text-foreground">
                  The region in a circle bounded by a <strong>chord and the arc</strong> is called a <strong>segment</strong> of the circle.
                </p>
                <div className="flex gap-1">
                  {["Segment", "Sector"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      disabled={isRevealed}
                      onClick={() => {
                        handleChange("q_p68_segment_def", c);
                        gradeDirectly("q_p68_segment_def", c);
                      }}
                      className="text-[10px] px-2 py-0.5 rounded border bg-white dark:bg-slate-900 cursor-pointer"
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <Field id="q_p68_segment_def" placeholder="e.g. Segment" />
              </div>

              {/* Point 21: Semicircle */}
              <div className="p-4 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-cyan-800 dark:text-cyan-300">Point 21: Semicircles</span>
                  <span className="text-base">🌓</span>
                </div>
                <p className="text-xs text-foreground">
                  Each diameter divides a circle into <strong>two semicircles</strong>. A semi circle is <strong>half of the circle</strong>.
                </p>
                <div className="flex gap-1">
                  {["Semicircle", "Quadrant"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      disabled={isRevealed}
                      onClick={() => {
                        handleChange("q_p68_semicircle_def", c);
                        gradeDirectly("q_p68_semicircle_def", c);
                      }}
                      className="text-[10px] px-2 py-0.5 rounded border bg-white dark:bg-slate-900 cursor-pointer"
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <Field id="q_p68_semicircle_def" placeholder="e.g. Semicircle" />
              </div>
            </div>
          </div>
        )}

        {/* ── Group E: Euclid (Greece) Feature Card ────────────── */}
        {(activeTab === "all" || activeTab === "euclid") && (
          <div className="rounded-2xl border-2 border-emerald-600 bg-gradient-to-br from-emerald-50 via-teal-50/60 to-cyan-50 dark:from-slate-900 dark:via-emerald-950/30 dark:to-teal-950/20 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Illustrated Portrait of Euclid */}
              <div className="w-28 h-32 shrink-0 rounded-2xl border-2 border-emerald-600/60 bg-white dark:bg-slate-950 p-2 flex flex-col items-center justify-center shadow-md">
                <svg viewBox="0 0 100 120" className="w-20 h-24">
                  {/* Greek Laurel / Bust Silhouette */}
                  <ellipse cx="50" cy="45" rx="20" ry="24" fill="#cbd5e1" />
                  <ellipse cx="50" cy="50" rx="16" ry="18" fill="#e2e8f0" />
                  {/* Beard */}
                  <path d="M 35 50 Q 50 85, 65 50 Q 50 65, 35 50 Z" fill="#94a3b8" />
                  {/* Toga robe */}
                  <path d="M 15 110 Q 50 75, 85 110 Z" fill="#0d9488" />
                  {/* Scroll */}
                  <rect x="35" y="85" width="30" height="8" rx="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                </svg>
                <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 mt-1">
                  365 BC
                </span>
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-black text-lg sm:text-xl text-emerald-950 dark:text-emerald-200">
                    Euclid (Greece)
                  </h4>
                  <span className="text-xs bg-emerald-200/80 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200 px-2 py-0.5 rounded font-mono font-bold">
                    365 BC
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                  He was a famous Greek philosopher and mathematician. He has introduced geometry in a logical order in the book, <strong>&apos;The Elements&apos;</strong>. His geometry is known as <strong>Euclidean geometry</strong>.
                </p>
                <div className="pt-2 max-w-md space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                    <span>What was the famous book written by Euclid introducing geometry in logical order?</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1 rounded font-bold">+1 pt</span>
                  </label>
                  <div className="flex gap-1.5 mb-1">
                    {["The Elements", "The Geometry", "The Universe"].map((c) => (
                      <button
                        key={c}
                        type="button"
                        disabled={isRevealed}
                        onClick={() => {
                          handleChange("q_p68_euclid_father", c);
                          gradeDirectly("q_p68_euclid_father", c);
                        }}
                        className="text-[11px] px-2 py-0.5 rounded border bg-white dark:bg-slate-900 hover:bg-emerald-100 text-foreground cursor-pointer"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <Field id="q_p68_euclid_father" placeholder="e.g. The Elements (Euclid)" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ────────────────────────────────────────────
          PAGE 68 SCORE SUMMARY FOOTER CARD
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-emerald-300 dark:border-emerald-800/80 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold shadow-sm">
            🎓
          </div>
          <div>
            <h4 className="font-heading font-bold text-foreground text-base">
              Chapter 4 Complete! (Page 68 Score Summary)
            </h4>
            <p className="text-xs text-muted-foreground">
              {correctCount === ALL_INPUT_IDS.length
                ? "🎉 Incredible! You scored 100% on Page 68 and fully completed Chapter 4: Basic Geometrical Ideas!"
                : correctCount > 0
                  ? `Great progress! You have correctly answered ${correctCount} of ${ALL_INPUT_IDS.length} revision questions.`
                  : "Review the points from 3 to 21 above and click quick-choice chips or type answers to earn your score."}
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
