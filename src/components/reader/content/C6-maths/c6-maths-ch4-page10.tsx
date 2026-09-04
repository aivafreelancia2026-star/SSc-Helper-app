"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input field IDs
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "q_is_chord",
  "q_is_diameter",
  "q_table_1_centre",
  "q_table_2_centre",
  "q_table_3_centre",
  "q_table_4_centre",
  "q_table_5_centre",
  "q_longest_chord",
  "q_diameter_formula",
  "q_radius_example",
  "q_more_diameters",
  "q_diameters_equal",
  "q_arc_cd",
  "q_other_arc",
  "q_circle_divides_plane",
];

/* ─────────────────────────────────────────────
   Reveal text for teacher / answers
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_is_chord: "Chord",
  q_is_diameter: "Diameter",
  q_table_1_centre: "Yes",
  q_table_2_centre: "No",
  q_table_3_centre: "No",
  q_table_4_centre: "No",
  q_table_5_centre: "No",
  q_longest_chord: "Diameter (Chord AC)",
  q_diameter_formula: "twice (2 times)",
  q_radius_example: "10 cm",
  q_more_diameters: "Yes (Infinitely many diameters)",
  q_diameters_equal: "Yes (All diameters are equal in length)",
  q_arc_cd: "Arc",
  q_other_arc: "Arc DC (Major arc)",
  q_circle_divides_plane: "3 parts (Interior, Boundary, Exterior)",
};

/* ─────────────────────────────────────────────
   Robust Answer Validator
───────────────────────────────────────────── */
function validateAnswer(id: string, rawValue: string): boolean {
  const v = rawValue.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!v) return false;

  switch (id) {
    case "q_is_chord":
      return v.includes("chord");

    case "q_is_diameter":
      return v.includes("diameter");

    case "q_table_1_centre":
      return v === "yes" || v === "y" || v === "true" || v.startsWith("ye");

    case "q_table_2_centre":
    case "q_table_3_centre":
    case "q_table_4_centre":
    case "q_table_5_centre":
      return v === "no" || v === "n" || v === "false";

    case "q_longest_chord":
      return (
        v.includes("diameter") ||
        v.includes("centre") ||
        v.includes("center") ||
        v === "ac" ||
        v.includes("chordac")
      );

    case "q_diameter_formula":
      return (
        v.includes("twice") ||
        v === "2" ||
        v === "two" ||
        v.includes("double") ||
        v.includes("2time") ||
        v.includes("twotime")
      );

    case "q_radius_example":
      return v.includes("10");

    case "q_more_diameters":
      return (
        v === "yes" ||
        v === "y" ||
        v === "true" ||
        v.includes("infinite") ||
        v.includes("many") ||
        v.includes("possible")
      );

    case "q_diameters_equal":
      return (
        v === "yes" ||
        v === "y" ||
        v === "true" ||
        v.includes("equal") ||
        v.includes("same")
      );

    case "q_arc_cd":
      return v.includes("arc");

    case "q_other_arc":
      return (
        v.includes("dc") ||
        v.includes("major") ||
        v === "cd" ||
        v.includes("arcdc")
      );

    case "q_circle_divides_plane":
      return v.includes("3") || v.includes("three");

    default:
      return false;
  }
}

/* ─────────────────────────────────────────────
   Math notation helpers
───────────────────────────────────────────── */

/** Line-segment overline: e.g. <Seg>AC</Seg> renders A̅C̅ */
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

/** Arc symbol helper: renders an arc cap over letters */
function Arc({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center leading-none font-mono font-bold px-0.5">
      <span className="text-[13px] -mb-1 select-none text-emerald-600 dark:text-emerald-400">⌒</span>
      <span>{children}</span>
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

export function C6MathsCh4Page10() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;

  const storageKey = "c6-maths-ch4-page10";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    label?: string;
    id: number;
  } | null>(null);

  /* Interactive States */
  // Selected chord on the circle diagram
  const [selectedChord, setSelectedChord] = useState<string>("AC");
  // Interactive radius slider for formula exploration (d = 2r)
  const [sliderRadius, setSliderRadius] = useState<number>(4);
  // Rotating diameter angle
  const [diameterAngle, setDiameterAngle] = useState<number>(0);
  // Arc highlight toggle
  const [activeArc, setActiveArc] = useState<"minor" | "major" | "both">("minor");

  // Calculate statistics
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
  };

  const handleToggleReveal = () => {
    const nextState = !showReveal;
    setShowReveal(nextState);
    if (nextState) {
      // Award flat reveal point if not already awarded for this page
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
    if (!rawTyped.trim()) return;

    const prev = graded[id];
    const correct = validateAnswer(id, rawTyped);

    if (prev && prev.value === rawTyped && prev.correct === correct) return;

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

  const handleCheckAll = () => {
    if (isRevealed) return;
    let newGraded = { ...graded };
    let pointsDelta = 0;

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
          PAGE 66 HEADER & SCORING CONTROLS BAR
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-600/40 bg-card overflow-hidden shadow-sm">
        {/* Banner */}
        <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-800 text-white font-heading font-bold px-5 py-3.5 text-lg flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-white/20 backdrop-blur rounded-lg text-xl">
              ⭕
            </span>
            <div>
              <span className="tracking-wide">Circle: Chord, Diameter & Arc</span>
              <div className="text-[11px] font-sans font-normal opacity-90 text-teal-100">
                Class 6 Maths • Basic Geometrical Ideas • Page 66
              </div>
            </div>
          </div>
          <span className="text-xs bg-teal-950/70 text-teal-200 px-3 py-1 rounded-full border border-teal-400/30 font-mono">
            Page 66 / 193
          </span>
        </div>

        {/* Scoring & Action Controls Bar */}
        <div className="bg-teal-50/80 dark:bg-teal-950/30 border-b border-teal-200 dark:border-teal-800/60 p-4 px-5 flex flex-wrap items-center justify-between gap-4">
          {/* Live Page Scoring & Progress */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-700/60 rounded-xl px-3.5 py-1.5 shadow-xs">
              <span className="text-base">⭐</span>
              <span className="text-xs font-semibold text-muted-foreground">Total Points:</span>
              <span className="font-heading font-bold text-teal-700 dark:text-teal-300 text-sm">
                {score}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-700/60 rounded-xl px-3.5 py-1.5 shadow-xs">
              <span className="text-base">🎯</span>
              <span className="text-xs font-semibold text-muted-foreground">Page Progress:</span>
              <span className="font-heading font-bold text-foreground text-sm">
                {correctCount} / {ALL_INPUT_IDS.length}
              </span>
              <span className="text-[10px] text-muted-foreground">correct</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Reveal Answer Button */}
            <button
              type="button"
              onClick={handleToggleReveal}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-heading font-semibold text-xs transition shadow-xs cursor-pointer ${
                isRevealed
                  ? "bg-amber-600 hover:bg-amber-700 text-white"
                  : "bg-teal-700 hover:bg-teal-800 text-white"
              }`}
            >
              <span>{isRevealed ? "🙈 Hide Answers" : "💡 Reveal Answers"}</span>
            </button>

            {/* Check All Answers */}
            {!isRevealed && (
              <button
                type="button"
                onClick={handleCheckAll}
                disabled={answeredCount === 0}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-700 hover:bg-teal-100 dark:hover:bg-teal-950 font-heading font-semibold text-xs text-teal-800 dark:text-teal-300 transition shadow-xs disabled:opacity-50 cursor-pointer"
              >
                <span>✅ Check Answers</span>
              </button>
            )}

            {/* Reset Page */}
            <button
              type="button"
              onClick={handleResetPage}
              title="Reset answers on this page"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground hover:text-foreground font-heading font-medium text-xs transition shadow-xs cursor-pointer"
            >
              <span>🔄 Reset</span>
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-7 space-y-8 text-sm sm:text-base">
          {/* ────────────────────────────────────────────
              SECTION 1: CHORD AND DIAMETER CONCEPTS
          ──────────────────────────────────────────── */}
          <div className="rounded-2xl border border-teal-200 dark:border-teal-800/60 bg-teal-50/30 dark:bg-teal-950/20 p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Concept description & questions */}
              <div className="md:col-span-7 space-y-4">
                <p className="leading-relaxed">
                  <Seg>AC</Seg> is a line segment joining any two points on the circle.
                  Is there any other such line segment which joins two points on the
                  circumference? <Seg>CD</Seg> is one such line segment.
                </p>

                {/* Chord definition card */}
                <div className="p-4 rounded-xl bg-background border space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-teal-900 dark:text-teal-200 text-sm flex items-center gap-1.5">
                      <span>📏</span> Definition of Chord
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-semibold">
                      +1 pt
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    A line segment joining two points on the circumference of the circle is called a:
                  </p>
                  <div className="max-w-xs">
                    <Field
                      id="q_is_chord"
                      placeholder="e.g. Chord"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground pt-1">
                    Thus both <Seg>AC</Seg> and <Seg>CD</Seg> are chords of the circle.
                  </p>
                </div>

                {/* Diameter definition card */}
                <div className="p-4 rounded-xl bg-background border space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-teal-900 dark:text-teal-200 text-sm flex items-center gap-1.5">
                      <span>🎯</span> Special Chord: Diameter
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-semibold">
                      +1 pt
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The chord <Seg>AC</Seg> is a special chord as it passes through the centre &apos;O&apos;.
                    A chord which passes through the centre of a circle is called:
                  </p>
                  <div className="max-w-xs">
                    <Field
                      id="q_is_diameter"
                      placeholder="e.g. Diameter"
                    />
                  </div>
                </div>
              </div>

              {/* Interactive SVG Diagram for Chords & Diameter */}
              <div className="md:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border p-4 flex flex-col items-center gap-3 shadow-sm">
                <div className="w-full flex items-center justify-between text-xs border-b pb-2">
                  <span className="font-semibold text-teal-800 dark:text-teal-300">
                    Chords in a Circle
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Centre: <strong className="font-mono">O</strong>
                  </span>
                </div>

                {/* Chord Selector Buttons */}
                <div className="flex flex-wrap gap-1.5 justify-center w-full">
                  {[
                    { id: "AC", label: "Chord AC (Diameter)", color: "text-red-600" },
                    { id: "CD", label: "Chord CD", color: "text-blue-600" },
                    { id: "AB", label: "Chord AB", color: "text-amber-600" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => setSelectedChord(btn.id)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                        selectedChord === btn.id
                          ? "bg-teal-700 text-white shadow-xs font-semibold"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                <svg viewBox="0 0 240 240" className="w-full max-w-[230px] h-auto select-none">
                  {/* Circle boundary */}
                  <circle
                    cx="120"
                    cy="120"
                    r="85"
                    fill="#0f766e"
                    fillOpacity="0.06"
                    stroke="#0f766e"
                    strokeWidth="2.5"
                  />

                  {/* Chord AC (Diameter passing through O) */}
                  <line
                    x1="45"
                    y1="80"
                    x2="195"
                    y2="160"
                    stroke={selectedChord === "AC" ? "#dc2626" : "#cbd5e1"}
                    strokeWidth={selectedChord === "AC" ? "3.5" : "1.8"}
                    strokeDasharray={selectedChord === "AC" ? undefined : "3,2"}
                  />

                  {/* Chord CD: C(195, 160) to D(165, 45) */}
                  <line
                    x1="195"
                    y1="160"
                    x2="165"
                    y2="45"
                    stroke={selectedChord === "CD" ? "#2563eb" : "#cbd5e1"}
                    strokeWidth={selectedChord === "CD" ? "3.5" : "1.8"}
                  />

                  {/* Chord AB: A(45, 80) to B(120, 35) */}
                  <line
                    x1="45"
                    y1="80"
                    x2="120"
                    y2="35"
                    stroke={selectedChord === "AB" ? "#d97706" : "#cbd5e1"}
                    strokeWidth={selectedChord === "AB" ? "3.5" : "1.8"}
                  />

                  {/* Centre O */}
                  <circle cx="120" cy="120" r="5" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
                  <text x="110" y="112" fontSize="13" fontWeight="bold" fill="#0f172a" className="dark:fill-slate-100">
                    O
                  </text>

                  {/* Vertex A */}
                  <circle cx="45" cy="80" r="4.5" fill="#0f766e" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="28" y="82" fontSize="13" fontWeight="bold" fill="#0f766e" className="dark:fill-teal-300">
                    A
                  </text>

                  {/* Vertex B */}
                  <circle cx="120" cy="35" r="4.5" fill="#0f766e" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="115" y="24" fontSize="13" fontWeight="bold" fill="#0f766e" className="dark:fill-teal-300">
                    B
                  </text>

                  {/* Vertex C */}
                  <circle cx="195" cy="160" r="4.5" fill="#0f766e" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="205" y="165" fontSize="13" fontWeight="bold" fill="#0f766e" className="dark:fill-teal-300">
                    C
                  </text>

                  {/* Vertex D */}
                  <circle cx="165" cy="45" r="4.5" fill="#0f766e" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="175" y="44" fontSize="13" fontWeight="bold" fill="#0f766e" className="dark:fill-teal-300">
                    D
                  </text>
                </svg>

                <div className="text-[11px] text-muted-foreground text-center bg-muted/40 p-2 rounded-xl w-full">
                  {selectedChord === "AC" && (
                    <span className="text-red-700 dark:text-red-300 font-semibold">
                      ⭐ <Seg>AC</Seg> passes through Centre O $\rightarrow$ It is a <strong>Diameter</strong>!
                    </span>
                  )}
                  {selectedChord === "CD" && (
                    <span className="text-blue-700 dark:text-blue-300 font-semibold">
                      <Seg>CD</Seg> joins two boundary points but doesn&apos;t pass through O $\rightarrow$ Regular <strong>Chord</strong>.
                    </span>
                  )}
                  {selectedChord === "AB" && (
                    <span className="text-amber-700 dark:text-amber-300 font-semibold">
                      <Seg>AB</Seg> is another <strong>Chord</strong> of the circle.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────
              SECTION 2: DO THIS (CHORDS INVESTIGATION TABLE)
          ──────────────────────────────────────────── */}
          <div className="rounded-2xl border-2 border-emerald-500/50 bg-emerald-50/40 dark:bg-emerald-950/20 p-5 sm:p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">✍️</span>
                <span className="font-heading font-bold text-emerald-900 dark:text-emerald-200 text-lg uppercase tracking-wider">
                  DO THIS
                </span>
              </div>
              <span className="text-xs bg-emerald-600 text-white font-bold px-3 py-1 rounded-full shadow-xs">
                Hands-on Table
              </span>
            </div>

            <p className="leading-relaxed">
              Draw a circle and draw at least 5 chords in it. Make sure at least one of them passes through the centre.
              Name them and fill the table below:
            </p>

            {/* Interactive Table with 5 graded rows */}
            <div className="overflow-x-auto rounded-xl border bg-background shadow-xs">
              <table className="w-full text-xs sm:text-sm text-left border-collapse">
                <thead className="bg-emerald-700 text-white font-heading font-bold text-xs uppercase">
                  <tr>
                    <th className="p-3 px-4 border-r border-emerald-600 w-16 text-center">S.No.</th>
                    <th className="p-3 px-4 border-r border-emerald-600">Chord</th>
                    <th className="p-3 px-4 border-r border-emerald-600">Sample Length</th>
                    <th className="p-3 px-4">Passes through the centre (Yes/No)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {/* Row 1: AC (Diameter) */}
                  <tr className="hover:bg-muted/40 transition">
                    <td className="p-3 px-4 font-bold text-center">1.</td>
                    <td className="p-3 px-4 font-mono font-bold text-emerald-800 dark:text-emerald-300">
                      <Seg>AC</Seg> (Diameter)
                    </td>
                    <td className="p-3 px-4 font-mono">8.0 cm (Longest)</td>
                    <td className="p-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <Field
                          id="q_table_1_centre"
                          placeholder="Yes / No"
                          width="max-w-[130px]"
                        />
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                          +1 pt
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Row 2: CD */}
                  <tr className="hover:bg-muted/40 transition">
                    <td className="p-3 px-4 font-bold text-center">2.</td>
                    <td className="p-3 px-4 font-mono font-semibold">
                      <Seg>CD</Seg>
                    </td>
                    <td className="p-3 px-4 font-mono">5.2 cm</td>
                    <td className="p-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <Field
                          id="q_table_2_centre"
                          placeholder="Yes / No"
                          width="max-w-[130px]"
                        />
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                          +1 pt
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Row 3: AB */}
                  <tr className="hover:bg-muted/40 transition">
                    <td className="p-3 px-4 font-bold text-center">3.</td>
                    <td className="p-3 px-4 font-mono font-semibold">
                      <Seg>AB</Seg>
                    </td>
                    <td className="p-3 px-4 font-mono">6.4 cm</td>
                    <td className="p-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <Field
                          id="q_table_3_centre"
                          placeholder="Yes / No"
                          width="max-w-[130px]"
                        />
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                          +1 pt
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Row 4: BD */}
                  <tr className="hover:bg-muted/40 transition">
                    <td className="p-3 px-4 font-bold text-center">4.</td>
                    <td className="p-3 px-4 font-mono font-semibold">
                      <Seg>BD</Seg>
                    </td>
                    <td className="p-3 px-4 font-mono">4.8 cm</td>
                    <td className="p-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <Field
                          id="q_table_4_centre"
                          placeholder="Yes / No"
                          width="max-w-[130px]"
                        />
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                          +1 pt
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Row 5: BC */}
                  <tr className="hover:bg-muted/40 transition">
                    <td className="p-3 px-4 font-bold text-center">5.</td>
                    <td className="p-3 px-4 font-mono font-semibold">
                      <Seg>BC</Seg>
                    </td>
                    <td className="p-3 px-4 font-mono">7.1 cm</td>
                    <td className="p-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <Field
                          id="q_table_5_centre"
                          placeholder="Yes / No"
                          width="max-w-[130px]"
                        />
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                          +1 pt
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* What do you notice? */}
            <div className="p-4 rounded-xl bg-background border space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-foreground text-sm flex items-center gap-1.5">
                  <span>💡</span> What do you notice from the table?
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                  +1 pt
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                You must have noticed that the chord passing through the centre is the <strong>longest</strong> chord.
                Which chord is the longest chord in any circle?
              </p>
              <div className="max-w-md">
                <Field
                  id="q_longest_chord"
                  placeholder="e.g. Diameter"
                />
              </div>
            </div>

            {/* Mathematical Proof: Diameter = 2 x Radius */}
            <div className="p-5 rounded-2xl bg-emerald-100/60 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-4">
              <h4 className="font-heading font-bold text-emerald-900 dark:text-emerald-200 text-base flex items-center gap-2">
                <span>📐</span> Mathematical Relation: Diameter and Radius
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed">
                Let us go back to the figure. <Seg>AC</Seg> is a line segment whose mid-point is at <strong>O</strong>.
                Also, we know that <Seg>OA</Seg> and <Seg>OC</Seg> are two radii of the circle.
              </p>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border text-center font-mono font-bold text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 shadow-xs">
                Length of <Seg>OA</Seg> + Length of <Seg>OC</Seg> = Length of <Seg>AC</Seg>
                <div className="text-xs font-normal text-muted-foreground mt-1">
                  radius ($r$) + radius ($r$) = Diameter ($d$) $\implies$ $d = 2r$
                </div>
              </div>

              {/* Core Principle Banner */}
              <div className="p-3 bg-emerald-700 text-white rounded-xl text-center font-heading font-bold text-sm sm:text-base tracking-wide shadow-xs">
                Diameter is twice the radius of the circle.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5 p-3 rounded-xl bg-background border">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-foreground block">
                      Diameter is ________ the radius of the circle:
                    </label>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                      +1 pt
                    </span>
                  </div>
                  <Field
                    id="q_diameter_formula"
                    placeholder="e.g. twice / 2 times"
                  />
                </div>

                <div className="space-y-1.5 p-3 rounded-xl bg-background border">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-foreground block">
                      If radius = 5 cm, then diameter = ________ :
                    </label>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                      +1 pt
                    </span>
                  </div>
                  <Field
                    id="q_radius_example"
                    placeholder="e.g. 10 cm"
                  />
                </div>
              </div>

              {/* Interactive Radius-Diameter Explorer */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-muted-foreground">
                    Interactive Formula Tester:
                  </span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                    Radius r = {sliderRadius} cm &rarr; Diameter d = {sliderRadius * 2} cm
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={sliderRadius}
                  onChange={(e) => setSliderRadius(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────
              SECTION 3: THINK AND DISCUSS
          ──────────────────────────────────────────── */}
          <div className="rounded-2xl border-2 border-indigo-500/40 bg-indigo-50/30 dark:bg-indigo-950/20 p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-indigo-200 dark:border-indigo-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">👥</span>
                <span className="font-heading font-bold text-indigo-900 dark:text-indigo-200 text-lg uppercase tracking-wider">
                  THINK AND DISCUSS
                </span>
              </div>
              <span className="text-xs bg-indigo-600 text-white font-bold px-3 py-1 rounded-full shadow-xs">
                Class Discussion
              </span>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground">
              Discuss with your friends and answer the following questions regarding diameters:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-4">
                {/* Question 1: More than one diameter? */}
                <div className="p-4 rounded-xl bg-background border space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-semibold text-foreground">
                      1. Is it possible to draw more than one diameter in a circle?
                    </label>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-semibold">
                      +1 pt
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <Field
                      id="q_more_diameters"
                      placeholder="Yes / No"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Reason: Since a circle has an infinite number of points on its boundary, infinitely many diameters can be drawn passing through the centre.
                  </p>
                </div>

                {/* Question 2: All diameters equal in length? */}
                <div className="p-4 rounded-xl bg-background border space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-semibold text-foreground">
                      2. Are all the diameters equal in length?
                    </label>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-semibold">
                      +1 pt
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <Field
                      id="q_diameters_equal"
                      placeholder="Yes / No"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Reason: Each diameter equals twice the radius ($2r$). Since the radius of a circle is constant, every diameter is identical in length.
                  </p>
                </div>
              </div>

              {/* Interactive Multi-Diameter Rotation Visualizer */}
              <div className="md:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border p-4 flex flex-col items-center gap-3 shadow-sm">
                <span className="text-xs font-semibold text-indigo-800 dark:text-indigo-300">
                  Rotating Diameter Probe
                </span>

                <svg viewBox="0 0 200 200" className="w-full max-w-[190px] h-auto select-none">
                  {/* Fixed circle */}
                  <circle cx="100" cy="100" r="70" fill="#6366f1" fillOpacity="0.08" stroke="#4f46e5" strokeWidth="2" />
                  
                  {/* Fixed reference diameters (faded) */}
                  <line x1="30" y1="100" x2="170" y2="100" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
                  <line x1="100" y1="30" x2="100" y2="170" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
                  <line x1="50" y1="50" x2="150" y2="150" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />

                  {/* Dynamic rotating diameter */}
                  {(() => {
                    const rad = (diameterAngle * Math.PI) / 180;
                    const x1 = 100 + 70 * Math.cos(rad);
                    const y1 = 100 + 70 * Math.sin(rad);
                    const x2 = 100 - 70 * Math.cos(rad);
                    const y2 = 100 - 70 * Math.sin(rad);
                    return (
                      <g>
                        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4f46e5" strokeWidth="3.5" />
                        <circle cx={x1} cy={y1} r="4.5" fill="#4f46e5" stroke="#ffffff" strokeWidth="1.5" />
                        <circle cx={x2} cy={y2} r="4.5" fill="#4f46e5" stroke="#ffffff" strokeWidth="1.5" />
                      </g>
                    );
                  })()}

                  {/* Centre O */}
                  <circle cx="100" cy="100" r="5" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
                  <text x="92" y="93" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-slate-100">
                    O
                  </text>
                </svg>

                <div className="w-full space-y-1 pt-1 border-t">
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Rotate diameter:</span>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      Length = 2r (Constant)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={diameterAngle}
                    onChange={(e) => setDiameterAngle(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────
              SECTION 4: ARC OF A CIRCLE & REGIONS
          ──────────────────────────────────────────── */}
          <div className="rounded-2xl border-2 border-amber-500/40 bg-amber-50/30 dark:bg-amber-950/20 p-5 sm:p-6 space-y-6">
            <div className="flex items-center gap-2.5 border-b border-amber-200 dark:border-amber-800 pb-3">
              <span className="text-xl">🌙</span>
              <h3 className="font-heading font-bold text-amber-900 dark:text-amber-200 text-lg">
                Arc of a Circle & Plane Division
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-4">
                <p className="leading-relaxed text-xs sm:text-sm">
                  Look at the figure again. The part of the circle between the points <strong>C</strong> and{" "}
                  <strong>D</strong> is called an <strong>arc</strong> and denoted by <Arc>CD</Arc>.
                </p>

                {/* Arc definition input */}
                <div className="p-4 rounded-xl bg-background border space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-semibold text-foreground">
                      The curved portion between any two points on a circle is called an:
                    </label>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold">
                      +1 pt
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <Field
                      id="q_arc_cd"
                      placeholder="e.g. Arc"
                    />
                  </div>
                </div>

                {/* Name other arc input */}
                <div className="p-4 rounded-xl bg-background border space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-semibold text-foreground">
                      Name the other arc in the figure:
                    </label>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold">
                      +1 pt
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <Field
                      id="q_other_arc"
                      placeholder="e.g. Arc DC (or Major arc)"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Points C and D divide the circle into two parts: Minor arc <Arc>CD</Arc> and Major arc <Arc>DC</Arc>.
                  </p>
                </div>

                {/* Circle divides plane */}
                <div className="p-4 rounded-xl bg-background border space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-semibold text-foreground">
                      As a circle is a simple closed figure, it divides the plane into:
                    </label>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold">
                      +1 pt
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <Field
                      id="q_circle_divides_plane"
                      placeholder="e.g. 3 parts"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    The 3 regions are: <strong>Interior</strong> (inside), <strong>Boundary</strong> (on the circle), and <strong>Exterior</strong> (outside).
                  </p>
                </div>
              </div>

              {/* Arc & Region Graphics Display */}
              <div className="md:col-span-5 space-y-4">
                {/* Arc diagram */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border p-4 flex flex-col items-center gap-2.5 shadow-sm">
                  <div className="flex items-center justify-between w-full text-xs pb-1 border-b">
                    <span className="font-semibold text-amber-800 dark:text-amber-300">
                      Arc CD (<Arc>CD</Arc>)
                    </span>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setActiveArc("minor")}
                        className={`text-[10px] px-2 py-0.5 rounded cursor-pointer ${
                          activeArc === "minor" ? "bg-amber-600 text-white font-bold" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        Minor Arc CD
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveArc("major")}
                        className={`text-[10px] px-2 py-0.5 rounded cursor-pointer ${
                          activeArc === "major" ? "bg-teal-600 text-white font-bold" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        Major Arc DC
                      </button>
                    </div>
                  </div>

                  <svg viewBox="0 0 200 160" className="w-full max-w-[190px] h-auto select-none">
                    {/* Circle base (dashed) */}
                    <circle cx="100" cy="80" r="60" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3,3" />

                    {/* Major Arc DC (from D counterclockwise to C) */}
                    <path
                      d="M 142 38 A 60 60 0 1 1 58 38"
                      fill="none"
                      stroke={activeArc === "major" || activeArc === "both" ? "#0f766e" : "#e2e8f0"}
                      strokeWidth={activeArc === "major" ? "4" : "2"}
                    />

                    {/* Minor Arc CD (from C to D along top edge) */}
                    <path
                      d="M 58 38 A 60 60 0 0 1 142 38"
                      fill="none"
                      stroke={activeArc === "minor" || activeArc === "both" ? "#d97706" : "#e2e8f0"}
                      strokeWidth={activeArc === "minor" ? "4" : "2"}
                    />

                    {/* Arrow head along minor arc */}
                    <polygon points="105,17 95,20 102,24" fill="#d97706" />

                    {/* Point C */}
                    <circle cx="58" cy="38" r="4.5" fill="#d97706" stroke="#ffffff" strokeWidth="1.5" />
                    <text x="44" y="36" fontSize="13" fontWeight="bold" fill="#b45309">
                      C
                    </text>

                    {/* Point D */}
                    <circle cx="142" cy="38" r="4.5" fill="#d97706" stroke="#ffffff" strokeWidth="1.5" />
                    <text x="152" y="36" fontSize="13" fontWeight="bold" fill="#b45309">
                      D
                    </text>
                  </svg>
                </div>

                {/* Interior/Exterior Diagram */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border p-4 flex flex-col items-center gap-2 shadow-sm">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Regions of a Circle
                  </span>
                  <svg viewBox="0 0 180 140" className="w-full max-w-[170px] h-auto select-none">
                    {/* Interior Shaded Region */}
                    <circle cx="90" cy="70" r="50" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
                    <text x="90" y="74" fontSize="11" fontWeight="bold" fill="#92400e" textAnchor="middle">
                      Interior
                    </text>
                    {/* Exterior label */}
                    <text x="90" y="132" fontSize="11" fontWeight="bold" fill="#64748b" textAnchor="middle">
                      Exterior
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────
              PAGE SCORE SUMMARY FOOTER CARD
          ──────────────────────────────────────────── */}
          <div className="rounded-2xl border-2 border-teal-300 dark:border-teal-800/80 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/30 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-2xl font-bold shadow-sm">
                ⭐
              </div>
              <div>
                <h4 className="font-heading font-bold text-foreground text-base">
                  Page 66 Score Summary
                </h4>
                <p className="text-xs text-muted-foreground">
                  {correctCount === ALL_INPUT_IDS.length
                    ? "🎉 Congratulations! You have mastered all concepts and questions on Page 66!"
                    : correctCount > 0
                      ? `Great job! You have answered ${correctCount} of ${ALL_INPUT_IDS.length} questions correctly.`
                      : "Fill in the questions above or click 'Check Answers' to evaluate your understanding."}
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
                <span className="text-[11px] text-muted-foreground block">User Score</span>
                <span className="text-base font-bold text-foreground font-mono">
                  ⭐ {score}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
