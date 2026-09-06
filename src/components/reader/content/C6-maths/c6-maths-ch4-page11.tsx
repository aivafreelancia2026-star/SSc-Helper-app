"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input field IDs for Textbook Page 67
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  // Exercise 4.5 - Question 2:
  "q_ex4_5_sector_points",
  "q_ex4_5_segment_points",
  // Exercise 4.5 - Question 3 True/False:
  "q_ex4_5_tf_1",
  "q_ex4_5_tf_2",
  "q_ex4_5_tf_3",
  "q_ex4_5_tf_4",
  "q_ex4_5_tf_5",
  // Exercise 4.5 - Question 4 Paper fold questions:
  "q_ex4_5_crease_name",
  "q_ex4_5_diameters_observed",
  "q_ex4_5_how_many_formed",
  // What Have We Discussed summary questions:
  "q_summary_point_denote",
  "q_summary_line_segment_ends",
];

/* ─────────────────────────────────────────────
   Reveal text for answers
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_ex4_5_sector_points: "Region OAB (Enclosed by OA, OB & Arc AB)",
  q_ex4_5_segment_points: "Region shaded below chord DE (Minor segment)",
  q_ex4_5_tf_1: "True (Only one centre exists for any circle)",
  q_ex4_5_tf_2: "True (Diameter = 2 × Radius)",
  q_ex4_5_tf_3: "True (An arc is a piece/part of a circle)",
  q_ex4_5_tf_4: "False (Chords have different lengths; diameter is longest)",
  q_ex4_5_tf_5: "False (All radii of the same circle are equal in length)",
  q_ex4_5_crease_name: "Diameter (passes right through the circular crease)",
  q_ex4_5_diameters_observed: "1 diameter (each fold crease forms a diameter)",
  q_ex4_5_how_many_formed: "Infinitely many (Countless / Uncounted diameters)",
  q_summary_point_denote: "Capital letter (e.g. A, B, P)",
  q_summary_line_segment_ends: "Two end points (fixed length)",
};

/* ─────────────────────────────────────────────
   Answer Validator
───────────────────────────────────────────── */
function validateAnswer(id: string, rawValue: string): boolean {
  const v = rawValue.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!v) return false;

  switch (id) {
    case "q_ex4_5_sector_points":
      return (
        v.includes("oab") ||
        v.includes("aob") ||
        v.includes("sector") ||
        v.includes("red") ||
        v.includes("oa") ||
        v.includes("ob")
      );

    case "q_ex4_5_segment_points":
      return (
        v.includes("de") ||
        v.includes("ed") ||
        v.includes("segment") ||
        v.includes("chord") ||
        v.includes("yellow")
      );

    case "q_ex4_5_tf_1":
      // We can locate only one centre in a circle -> True
      return v === "true" || v === "t" || v === "yes" || v === "y" || v === "correct";

    case "q_ex4_5_tf_2":
      // Diameter is twice the radius -> True
      return v === "true" || v === "t" || v === "yes" || v === "y" || v === "correct";

    case "q_ex4_5_tf_3":
      // An arc is a part of a circle -> True
      return v === "true" || v === "t" || v === "yes" || v === "y" || v === "correct";

    case "q_ex4_5_tf_4":
      // All chords are equal in length -> False
      return v === "false" || v === "f" || v === "no" || v === "n" || v === "incorrect" || v === "wrong";

    case "q_ex4_5_tf_5":
      // All radii are not equal in length in a circle -> False (they ARE equal)
      return v === "false" || v === "f" || v === "no" || v === "n" || v === "incorrect" || v === "wrong";

    case "q_ex4_5_crease_name":
      return v.includes("diameter") || v.includes("diam");

    case "q_ex4_5_diameters_observed":
      return (
        v.includes("1") ||
        v.includes("one") ||
        v.includes("diameter")
      );

    case "q_ex4_5_how_many_formed":
      return (
        v.includes("infinit") ||
        v.includes("many") ||
        v.includes("countless") ||
        v.includes("unlimited") ||
        v.includes("any") ||
        v.includes("asman")
      );

    case "q_summary_point_denote":
      return (
        v.includes("capital") ||
        v.includes("letter") ||
        v.includes("alphabet") ||
        v.includes("point") ||
        v.includes("dot")
      );

    case "q_summary_line_segment_ends":
      return (
        v.includes("2") ||
        v.includes("two") ||
        v.includes("endpoint") ||
        v.includes("fixed") ||
        v.includes("points")
      );

    default:
      return false;
  }
}

/* ─────────────────────────────────────────────
   Math notation helpers
───────────────────────────────────────────── */

/** Line-segment overline: e.g. <Seg>AB</Seg> renders A̅B̅ */
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

export function C6MathsCh4Page11() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;

  const storageKey = "c6-maths-ch4-page11";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    label?: string;
    id: number;
  } | null>(null);

  /* Interactive States for Visual Models */
  // Concept figure mode
  const [conceptActiveTab, setConceptActiveTab] = useState<"sector" | "segment" | "semicircle">("sector");
  
  // Interactive Sector explorer angle
  const [sectorAngle, setSectorAngle] = useState<number>(60);
  
  // Interactive Segment explorer height
  const [segmentOffset, setSegmentOffset] = useState<number>(40);

  // Exercise 4.5 Q2 interactive shade toggle
  const [q2ShadedRegion, setQ2ShadedRegion] = useState<{
    sectorRed: boolean;
    segmentYellow: boolean;
  }>({
    sectorRed: false,
    segmentYellow: false,
  });

  // Paper folding simulation step (Q4)
  const [foldAngle, setFoldAngle] = useState<number>(0);
  const [paperFoldsCount, setPaperFoldsCount] = useState<number>(1);

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
      setQ2ShadedRegion({ sectorRed: false, segmentYellow: false });
      setFoldAngle(0);
      setPaperFoldsCount(1);
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
    setQ2ShadedRegion({ sectorRed: false, segmentYellow: false });
    setFoldAngle(0);
    setPaperFoldsCount(1);
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

  // Interactive Sector Path Calculation
  const sectorRad = (sectorAngle * Math.PI) / 180;
  const sectorX = 100 + 70 * Math.cos(-sectorRad);
  const sectorY = 100 + 70 * Math.sin(-sectorRad);
  const sectorLargeArc = sectorAngle > 180 ? 1 : 0;

  // Interactive Segment chord calculation
  const segR = 70;
  const segDy = Math.min(65, Math.max(10, segmentOffset));
  const segDx = Math.sqrt(Math.max(0, segR * segR - segDy * segDy));

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
          PAGE 67 HEADER & SCORING CONTROLS BAR
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-600/40 bg-card overflow-hidden shadow-sm">
        {/* Banner */}
        <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-800 text-white font-heading font-bold px-5 py-3.5 text-lg flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-white/20 backdrop-blur rounded-lg text-xl">
              🥧
            </span>
            <div>
              <span className="tracking-wide">Sector, Segment & Semicircle • Exercise 4.5</span>
              <div className="text-[11px] font-sans font-normal opacity-90 text-teal-100">
                Class 6 Maths • Basic Geometrical Ideas • Page 67
              </div>
            </div>
          </div>
          <span className="text-xs bg-teal-950/70 text-teal-200 px-3 py-1 rounded-full border border-teal-400/30 font-mono">
            Page 67 / 193
          </span>
        </div>

        {/* Scoring & Action Controls Bar */}
        <div className="bg-teal-50/80 dark:bg-teal-950/30 border-b border-teal-200 dark:border-teal-800/60 p-4 px-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
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
              className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-heading font-semibold text-xs transition-colors shadow-xs cursor-pointer active:scale-95"
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
          SECTION 1: SOME OTHER PARTS OF THE CIRCLE
          (Exact Textbook Definitions + 3 Side-by-Side Illustrated Figures)
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-500/40 bg-card overflow-hidden shadow-sm space-y-6 p-6">
        <div className="border-b border-teal-200 dark:border-teal-800/60 pb-3">
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-teal-900 dark:text-teal-200 flex items-center gap-2.5">
            <span>Some other parts of the circle</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Learn the key differences between a <strong>Sector</strong>, a <strong>Segment</strong>, and a <strong>Semi-circle</strong>.
          </p>
        </div>

        {/* 3 Key Textbook Core Concepts Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Concept 1: Sector */}
          <div
            onClick={() => setConceptActiveTab("sector")}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              conceptActiveTab === "sector"
                ? "border-amber-500 bg-amber-50/70 dark:bg-amber-950/30 shadow-md ring-2 ring-amber-400/40"
                : "border-slate-200 dark:border-slate-800 hover:border-amber-300 bg-white dark:bg-slate-900"
            }`}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-200 dark:border-amber-800">
              <span className="font-heading font-bold text-sm text-amber-900 dark:text-amber-200">
                1. Sector
              </span>
              <span className="text-lg">🍕</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-foreground">
              Region enclosed by an <strong>arc</strong> and <strong>two radii</strong> is called <strong>sector</strong> of the circle.
            </p>
            <div className="mt-3 text-[11px] font-mono text-amber-800 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-900/40 p-2 rounded-lg">
              Formed by: 2 Radii + 1 Arc
            </div>
          </div>

          {/* Concept 2: Segment */}
          <div
            onClick={() => setConceptActiveTab("segment")}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              conceptActiveTab === "segment"
                ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 shadow-md ring-2 ring-emerald-400/40"
                : "border-slate-200 dark:border-slate-800 hover:border-emerald-300 bg-white dark:bg-slate-900"
            }`}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-200 dark:border-emerald-800">
              <span className="font-heading font-bold text-sm text-emerald-900 dark:text-emerald-200">
                2. Segment
              </span>
              <span className="text-lg">🏹</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-foreground">
              Region enclosed by an <strong>arc</strong> and a <strong>chord</strong> is called <strong>segment</strong> of a circle.
              Chord of a circle divides it into two segments.
            </p>
            <div className="mt-3 text-[11px] font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-100/60 dark:bg-emerald-900/40 p-2 rounded-lg">
              Formed by: 1 Chord + 1 Arc
            </div>
          </div>

          {/* Concept 3: Semi circle */}
          <div
            onClick={() => setConceptActiveTab("semicircle")}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              conceptActiveTab === "semicircle"
                ? "border-cyan-500 bg-cyan-50/70 dark:bg-cyan-950/30 shadow-md ring-2 ring-cyan-400/40"
                : "border-slate-200 dark:border-slate-800 hover:border-cyan-300 bg-white dark:bg-slate-900"
            }`}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-200 dark:border-cyan-800">
              <span className="font-heading font-bold text-sm text-cyan-900 dark:text-cyan-200">
                3. Semi circle
              </span>
              <span className="text-lg">🌓</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-foreground">
              Region enclosed by an <strong>arc</strong> and a <strong>diameter</strong> is called a <strong>semi circle</strong>.
            </p>
            <div className="mt-3 text-[11px] font-mono text-cyan-800 dark:text-cyan-300 bg-cyan-100/60 dark:bg-cyan-900/40 p-2 rounded-lg">
              Formed by: 1 Diameter + 1 Semicircular Arc
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────
            THREE EXACT TEXTBOOK VECTOR DIAGRAMS
            (Matching the 3 figures shown in the prompt)
        ──────────────────────────────────────────── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-muted/30 border border-teal-200 dark:border-teal-800/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-2">
              <span>Textbook Figures Representation</span>
            </span>
            <span className="text-[11px] text-muted-foreground">
              Click any diagram to inspect details
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Figure 1: Sector (Minor Sector & Major Sector) */}
            <div
              onClick={() => setConceptActiveTab("sector")}
              className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-3 shadow-xs hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                Figure (a): Sector of a Circle
              </span>
              <svg viewBox="0 0 200 200" className="w-full max-w-[170px] h-auto select-none">
                {/* Full circle outline */}
                <circle cx="100" cy="100" r="70" fill="#ffffff" stroke="#1e293b" strokeWidth="2" className="dark:fill-slate-900 dark:stroke-slate-200" />
                
                {/* Minor Sector shaded in gold/yellow */}
                {/* Centre(100,100), Point A(50.5, 50.5 approx angle 225), Point B(149.5, 50.5 angle 315) */}
                <path
                  d="M 100 100 L 45 60 A 70 70 0 0 1 155 60 Z"
                  fill="#fde68a"
                  stroke="#d97706"
                  strokeWidth="2"
                />

                {/* Center point O */}
                <circle cx="100" cy="100" r="3.5" fill="#0f172a" className="dark:fill-white" />
                <text x="100" y="118" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0f172a" className="dark:fill-white">
                  O
                </text>

                {/* Point A */}
                <circle cx="45" cy="60" r="3.5" fill="#d97706" />
                <text x="32" y="60" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
                  A
                </text>

                {/* Point B */}
                <circle cx="155" cy="60" r="3.5" fill="#d97706" />
                <text x="163" y="60" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
                  B
                </text>

                {/* Labels: Minor Sector & Major Sector */}
                <text x="100" y="58" fontSize="11" fontWeight="bold" fill="#92400e" textAnchor="middle">
                  Minor Sector
                </text>
                <text x="100" y="150" fontSize="11" fontWeight="bold" fill="#64748b" textAnchor="middle">
                  Major Sector
                </text>
              </svg>
              <div className="text-[11px] text-center text-muted-foreground">
                Radii <Seg>OA</Seg> & <Seg>OB</Seg> divide the circle into <strong>Minor</strong> and <strong>Major</strong> sectors.
              </div>
            </div>

            {/* Figure 2: Segment (Minor Segment & Major Segment) */}
            <div
              onClick={() => setConceptActiveTab("segment")}
              className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-3 shadow-xs hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                Figure (b): Segment of a Circle
              </span>
              <svg viewBox="0 0 200 200" className="w-full max-w-[170px] h-auto select-none">
                {/* Full circle outline */}
                <circle cx="100" cy="100" r="70" fill="#ffffff" stroke="#1e293b" strokeWidth="2" className="dark:fill-slate-900 dark:stroke-slate-200" />
                
                {/* Minor segment shaded in gold/amber */}
                {/* Chord from A(45, 60) to B(155, 60) */}
                <path
                  d="M 45 60 A 70 70 0 0 1 155 60 Z"
                  fill="#fde68a"
                  stroke="#059669"
                  strokeWidth="2"
                />

                {/* Chord line AB */}
                <line x1="45" y1="60" x2="155" y2="60" stroke="#059669" strokeWidth="2" />

                {/* Chord label with arrow */}
                <text x="35" y="75" fontSize="10" fontWeight="bold" fill="#059669">
                  Chord
                </text>
                <line x1="60" y1="72" x2="75" y2="62" stroke="#059669" strokeWidth="1.2" markerEnd="url(#arrow)" />

                {/* Point A */}
                <circle cx="45" cy="60" r="3.5" fill="#059669" />
                <text x="32" y="55" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
                  A
                </text>

                {/* Point B */}
                <circle cx="155" cy="60" r="3.5" fill="#059669" />
                <text x="163" y="55" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
                  B
                </text>

                {/* Labels: Minor Segment & Major Segment */}
                <text x="100" y="44" fontSize="10" fontWeight="bold" fill="#92400e" textAnchor="middle">
                  Minor Segment
                </text>
                <text x="100" y="145" fontSize="11" fontWeight="bold" fill="#64748b" textAnchor="middle">
                  Major Segment
                </text>
              </svg>
              <div className="text-[11px] text-center text-muted-foreground">
                Chord <Seg>AB</Seg> divides the circle into <strong>Minor</strong> and <strong>Major</strong> segments.
              </div>
            </div>

            {/* Figure 3: Semi circle (Two equal halves) */}
            <div
              onClick={() => setConceptActiveTab("semicircle")}
              className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-3 shadow-xs hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300">
                Figure (c): Semi circles
              </span>
              <svg viewBox="0 0 200 200" className="w-full max-w-[170px] h-auto select-none">
                {/* Full circle outline */}
                <circle cx="100" cy="100" r="70" fill="#ffffff" stroke="#1e293b" strokeWidth="2" className="dark:fill-slate-900 dark:stroke-slate-200" />
                
                {/* Upper Semi circle shaded in gold/amber */}
                <path
                  d="M 30 100 A 70 70 0 0 1 170 100 Z"
                  fill="#fde68a"
                  stroke="#0891b2"
                  strokeWidth="2"
                />

                {/* Diameter line AB */}
                <line x1="30" y1="100" x2="170" y2="100" stroke="#0891b2" strokeWidth="2.5" />

                {/* Center point O */}
                <circle cx="100" cy="100" r="3.5" fill="#0f172a" className="dark:fill-white" />
                <text x="100" y="118" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#0f172a" className="dark:fill-white">
                  O
                </text>

                {/* Point A */}
                <circle cx="30" cy="100" r="3.5" fill="#0891b2" />
                <text x="18" y="104" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
                  A
                </text>

                {/* Point B */}
                <circle cx="170" cy="100" r="3.5" fill="#0891b2" />
                <text x="178" y="104" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
                  B
                </text>

                {/* Labels: Semi circle */}
                <text x="100" y="70" fontSize="11" fontWeight="bold" fill="#92400e" textAnchor="middle">
                  Semi circle
                </text>
                <text x="100" y="135" fontSize="11" fontWeight="bold" fill="#0e7490" textAnchor="middle">
                  Semi circle
                </text>
              </svg>
              <div className="text-[11px] text-center text-muted-foreground">
                Diameter <Seg>AB</Seg> divides the circular region into two identical <strong>semi circles</strong>.
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Explorer Sandbox for Dynamic Understanding */}
        <div className="rounded-xl border border-teal-300 dark:border-teal-700/60 bg-gradient-to-br from-teal-50/50 to-emerald-50/40 dark:from-slate-900 dark:to-teal-950/20 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-200 dark:border-teal-800 pb-2">
            <div>
              <h4 className="font-heading font-bold text-sm text-teal-900 dark:text-teal-200 flex items-center gap-2">
                <span>🎮 Interactive Circle Geometry Explorer</span>
              </h4>
              <p className="text-xs text-muted-foreground">
                Adjust sliders to watch sector angle and chord segment change dynamically in real-time!
              </p>
            </div>
            <div className="flex gap-1.5">
              {(["sector", "segment", "semicircle"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setConceptActiveTab(tab)}
                  className={`text-xs px-3 py-1 rounded-lg font-semibold capitalize transition-all cursor-pointer ${
                    conceptActiveTab === tab
                      ? "bg-teal-700 text-white shadow-xs"
                      : "bg-white dark:bg-slate-800 border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Dynamic SVG renderer */}
            <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-950 rounded-xl border">
              <svg viewBox="0 0 200 200" className="w-48 h-48 select-none">
                {/* Base circle */}
                <circle cx="100" cy="100" r="70" fill="none" stroke="#cbd5e1" strokeWidth="2" />

                {conceptActiveTab === "sector" && (
                  <>
                    <path
                      d={`M 100 100 L 170 100 A 70 70 0 ${sectorLargeArc} 0 ${sectorX} ${sectorY} Z`}
                      fill="#fef08a"
                      stroke="#d97706"
                      strokeWidth="2.5"
                    />
                    <line x1="100" y1="100" x2="170" y2="100" stroke="#d97706" strokeWidth="2.5" />
                    <line x1="100" y1="100" x2={sectorX} y2={sectorY} stroke="#d97706" strokeWidth="2.5" />
                    <circle cx="100" cy="100" r="4" fill="#0f172a" className="dark:fill-white" />
                    <circle cx="170" cy="100" r="4" fill="#d97706" />
                    <circle cx={sectorX} cy={sectorY} r="4" fill="#d97706" />
                    <text x="100" y="120" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#0f172a" className="dark:fill-white">
                      O
                    </text>
                  </>
                )}

                {conceptActiveTab === "segment" && (
                  <>
                    <path
                      d={`M ${100 - segDx} ${100 - segDy} A 70 70 0 0 1 ${100 + segDx} ${100 - segDy} Z`}
                      fill="#a7f3d0"
                      stroke="#059669"
                      strokeWidth="2.5"
                    />
                    <line
                      x1={100 - segDx}
                      y1={100 - segDy}
                      x2={100 + segDx}
                      y2={100 - segDy}
                      stroke="#059669"
                      strokeWidth="2.5"
                    />
                    <circle cx={100 - segDx} cy={100 - segDy} r="4" fill="#059669" />
                    <circle cx={100 + segDx} cy={100 - segDy} r="4" fill="#059669" />
                    <circle cx="100" cy="100" r="3.5" fill="#64748b" />
                    <text x="100" y="116" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#64748b">
                      O
                    </text>
                  </>
                )}

                {conceptActiveTab === "semicircle" && (
                  <>
                    <path
                      d="M 30 100 A 70 70 0 0 1 170 100 Z"
                      fill="#a5f3fc"
                      stroke="#0891b2"
                      strokeWidth="2.5"
                    />
                    <line x1="30" y1="100" x2="170" y2="100" stroke="#0891b2" strokeWidth="3" />
                    <circle cx="100" cy="100" r="4" fill="#0f172a" className="dark:fill-white" />
                    <circle cx="30" cy="100" r="4" fill="#0891b2" />
                    <circle cx="170" cy="100" r="4" fill="#0891b2" />
                    <text x="100" y="120" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#0f172a" className="dark:fill-white">
                      O (Centre)
                    </text>
                  </>
                )}
              </svg>
            </div>

            {/* Controls for current active tab */}
            <div className="space-y-3">
              {conceptActiveTab === "sector" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Central Angle:</span>
                    <span className="font-mono text-amber-700 dark:text-amber-300 font-bold">
                      {sectorAngle}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="330"
                    value={sectorAngle}
                    onChange={(e) => setSectorAngle(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    When angle = 180°, a sector becomes a <strong>semi-circle</strong>! When angle &lt; 180°, it is a <strong>minor sector</strong>.
                  </p>
                </div>
              )}

              {conceptActiveTab === "segment" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Chord Distance from Centre:</span>
                    <span className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">
                      {segmentOffset} px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="65"
                    value={segmentOffset}
                    onChange={(e) => setSegmentOffset(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    As the chord moves closer to the centre (distance $\rightarrow$ 0), the segment enlarges into a <strong>semi-circle</strong>!
                  </p>
                </div>
              )}

              {conceptActiveTab === "semicircle" && (
                <div className="space-y-2">
                  <div className="p-3 bg-cyan-100/50 dark:bg-cyan-950/40 rounded-xl text-xs space-y-1">
                    <p className="font-semibold text-cyan-900 dark:text-cyan-200">
                      💡 Semicircle is both:
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                      <li>A sector with angle = 180°</li>
                      <li>A segment cut by the longest chord (diameter)</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          SECTION 2: EXERCISE 4.5 (All Questions from Page 67)
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-600/50 bg-card overflow-hidden shadow-sm space-y-6">
        {/* Exercise Header */}
        <div className="bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="bg-white/20 p-1 rounded-md text-base">✏️</span>
            <span>Exercise - 4.5</span>
          </div>
          <span className="text-xs font-mono bg-white/20 px-2.5 py-0.5 rounded-full">
            Basic Geometrical Ideas
          </span>
        </div>

        <div className="p-5 sm:p-7 space-y-8 text-sm sm:text-base">
          {/* ──────────────────────────────────────────
              QUESTION 1: Draw a circle and name
          ────────────────────────────────────────── */}
          <div className="p-5 rounded-2xl border bg-muted/20 space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </span>
              <div className="space-y-2 flex-1">
                <p className="font-semibold text-foreground">
                  Draw a circle and name its centre, a radius, a diameter and arc.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border flex flex-col items-center">
                    <svg viewBox="0 0 200 180" className="w-full max-w-[190px] h-auto select-none">
                      {/* Circle */}
                      <circle cx="100" cy="90" r="60" fill="none" stroke="#0d9488" strokeWidth="2.5" />
                      
                      {/* Arc CD highlighted */}
                      <path d="M 58 48 A 60 60 0 0 1 142 48" fill="none" stroke="#f59e0b" strokeWidth="4" />
                      
                      {/* Diameter AB */}
                      <line x1="40" y1="90" x2="160" y2="90" stroke="#2563eb" strokeWidth="2.5" />

                      {/* Radius OP */}
                      <line x1="100" y1="90" x2="100" y2="150" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,2" />

                      {/* Centre O */}
                      <circle cx="100" cy="90" r="4" fill="#0f172a" className="dark:fill-white" />
                      <text x="96" y="82" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
                        O
                      </text>

                      {/* Diameter points A and B */}
                      <circle cx="40" cy="90" r="3.5" fill="#2563eb" />
                      <text x="24" y="94" fontSize="12" fontWeight="bold" fill="#2563eb">
                        A
                      </text>
                      <circle cx="160" cy="90" r="3.5" fill="#2563eb" />
                      <text x="168" y="94" fontSize="12" fontWeight="bold" fill="#2563eb">
                        B
                      </text>

                      {/* Radius point P */}
                      <circle cx="100" cy="150" r="3.5" fill="#dc2626" />
                      <text x="97" y="166" fontSize="12" fontWeight="bold" fill="#dc2626">
                        P
                      </text>

                      {/* Arc points C and D */}
                      <circle cx="58" cy="48" r="3.5" fill="#f59e0b" />
                      <text x="44" y="44" fontSize="12" fontWeight="bold" fill="#f59e0b">
                        C
                      </text>
                      <circle cx="142" cy="48" r="3.5" fill="#f59e0b" />
                      <text x="150" y="44" fontSize="12" fontWeight="bold" fill="#f59e0b">
                        D
                      </text>
                    </svg>
                  </div>

                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border space-y-2 text-xs sm:text-sm">
                    <span className="font-bold text-teal-800 dark:text-teal-300 block border-b pb-1">
                      Standard Mathematical Representation:
                    </span>
                    <ul className="space-y-1.5 text-muted-foreground">
                      <li>• <strong>Centre:</strong> Point <strong>O</strong></li>
                      <li>• <strong>Radius:</strong> Segment <Seg>OP</Seg> (or <Seg>OA</Seg>, <Seg>OB</Seg>)</li>
                      <li>• <strong>Diameter:</strong> Segment <Seg>AB</Seg> passing through centre O</li>
                      <li>• <strong>Arc:</strong> Arc <Arc>CD</Arc> along the curved perimeter</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────
              QUESTION 2: Shade the regions in the circle
              (Interactive Shading Sandbox with Red & Yellow)
          ────────────────────────────────────────── */}
          <div className="p-5 rounded-2xl border bg-muted/20 space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                2
              </span>
              <div className="space-y-3 flex-1">
                <p className="font-semibold text-foreground">
                  Shade the regions in the circle:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-teal-700 dark:text-teal-400">i)</span>
                    <span>Sector with <strong>red</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-teal-700 dark:text-teal-400">ii)</span>
                    <span>Minor segment with <strong>yellow</strong></span>
                  </div>
                </div>

                {/* Interactive Diagram corresponding directly to Textbook Q2 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                  <div className="md:col-span-6 flex flex-col items-center bg-white dark:bg-slate-900 p-4 rounded-xl border">
                    <div className="flex items-center justify-between w-full pb-2 border-b text-xs mb-2">
                      <span className="font-semibold text-muted-foreground">
                        Click regions to shade / unshade:
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            setQ2ShadedRegion((prev) => ({ ...prev, sectorRed: !prev.sectorRed }))
                          }
                          className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all ${
                            q2ShadedRegion.sectorRed
                              ? "bg-red-600 text-white"
                              : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border border-red-300"
                          }`}
                        >
                          {q2ShadedRegion.sectorRed ? "✓ Sector Red" : "+ Shade Red"}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setQ2ShadedRegion((prev) => ({ ...prev, segmentYellow: !prev.segmentYellow }))
                          }
                          className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all ${
                            q2ShadedRegion.segmentYellow
                              ? "bg-amber-500 text-white"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 border border-yellow-300"
                          }`}
                        >
                          {q2ShadedRegion.segmentYellow ? "✓ Segment Yellow" : "+ Shade Yellow"}
                        </button>
                      </div>
                    </div>

                    <svg viewBox="0 0 220 200" className="w-full max-w-[200px] h-auto select-none">
                      {/* Circle */}
                      <circle cx="110" cy="100" r="70" fill="#ffffff" stroke="#1e293b" strokeWidth="2" className="dark:fill-slate-950 dark:stroke-slate-300" />

                      {/* Sector OAB: Centre(110,100), Point A(55, 60), Point B(110, 30) */}
                      <path
                        d="M 110 100 L 55 60 A 70 70 0 0 1 110 30 Z"
                        fill={q2ShadedRegion.sectorRed ? "#ef4444" : "transparent"}
                        fillOpacity={q2ShadedRegion.sectorRed ? "0.8" : "0"}
                        stroke="#b91c1c"
                        strokeWidth="1.8"
                        className="cursor-pointer transition-all hover:fill-red-200"
                        onClick={() =>
                          setQ2ShadedRegion((prev) => ({ ...prev, sectorRed: !prev.sectorRed }))
                        }
                      />

                      {/* Radii OA, OB & Chord BC */}
                      <line x1="110" y1="100" x2="55" y2="60" stroke="#0f172a" strokeWidth="1.8" className="dark:stroke-slate-200" />
                      <line x1="110" y1="100" x2="110" y2="30" stroke="#0f172a" strokeWidth="1.8" className="dark:stroke-slate-200" />
                      <line x1="110" y1="30" x2="165" y2="60" stroke="#0f172a" strokeWidth="1.8" className="dark:stroke-slate-200" />

                      {/* Minor Segment: Chord DE from D(60, 145) to E(160, 145) */}
                      <path
                        d="M 60 145 A 70 70 0 0 0 160 145 Z"
                        fill={q2ShadedRegion.segmentYellow ? "#facc15" : "transparent"}
                        fillOpacity={q2ShadedRegion.segmentYellow ? "0.85" : "0"}
                        stroke="#ca8a04"
                        strokeWidth="2"
                        className="cursor-pointer transition-all hover:fill-yellow-200"
                        onClick={() =>
                          setQ2ShadedRegion((prev) => ({ ...prev, segmentYellow: !prev.segmentYellow }))
                        }
                      />
                      <line x1="60" y1="145" x2="160" y2="145" stroke="#0f172a" strokeWidth="2" className="dark:stroke-slate-200" />

                      {/* Centre O */}
                      <circle cx="110" cy="100" r="3.5" fill="#0f172a" className="dark:fill-white" />
                      <text x="116" y="104" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
                        O
                      </text>

                      {/* Point A */}
                      <circle cx="55" cy="60" r="3.5" fill="#b91c1c" />
                      <text x="40" y="60" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
                        A
                      </text>

                      {/* Point B */}
                      <circle cx="110" cy="30" r="3.5" fill="#0f172a" className="dark:fill-white" />
                      <text x="106" y="22" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
                        B
                      </text>

                      {/* Point C */}
                      <circle cx="165" cy="60" r="3.5" fill="#0f172a" className="dark:fill-white" />
                      <text x="173" y="62" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
                        C
                      </text>

                      {/* Point D */}
                      <circle cx="60" cy="145" r="3.5" fill="#ca8a04" />
                      <text x="46" y="150" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
                        D
                      </text>

                      {/* Point E */}
                      <circle cx="160" cy="145" r="3.5" fill="#ca8a04" />
                      <text x="168" y="150" fontSize="12" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
                        E
                      </text>
                    </svg>

                    <div className="text-[11px] text-center text-muted-foreground mt-1">
                      Textbook Figure with points A, B, C, D, E and Centre O.
                    </div>
                  </div>

                  <div className="md:col-span-6 space-y-3">
                    {/* Q2 Part i text answer */}
                    <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-xs">
                      <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between">
                        <span>i) Name the Sector to be shaded with Red:</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 font-bold">
                          +1 pt
                        </span>
                      </label>
                      <div className="flex flex-wrap gap-1.5 mb-1.5">
                        {["Sector OAB", "Sector OBC", "Sector OAC"].map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            disabled={isRevealed}
                            onClick={() => {
                              handleChange("q_ex4_5_sector_points", choice);
                              gradeDirectly("q_ex4_5_sector_points", choice);
                            }}
                            className="text-[11px] px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 bg-muted/40 hover:bg-red-100 dark:hover:bg-red-950/40 text-foreground cursor-pointer transition-all"
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                      <Field
                        id="q_ex4_5_sector_points"
                        placeholder="e.g. Sector OAB (enclosed by OA, OB and arc AB)"
                      />
                    </div>

                    {/* Q2 Part ii text answer */}
                    <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-xs">
                      <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between">
                        <span>ii) Name the Minor segment to be shaded with Yellow:</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 font-bold">
                          +1 pt
                        </span>
                      </label>
                      <div className="flex flex-wrap gap-1.5 mb-1.5">
                        {["Segment DE", "Segment BC", "Segment AB"].map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            disabled={isRevealed}
                            onClick={() => {
                              handleChange("q_ex4_5_segment_points", choice);
                              gradeDirectly("q_ex4_5_segment_points", choice);
                            }}
                            className="text-[11px] px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 bg-muted/40 hover:bg-yellow-100 dark:hover:bg-yellow-950/40 text-foreground cursor-pointer transition-all"
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                      <Field
                        id="q_ex4_5_segment_points"
                        placeholder="e.g. Segment DE (region below chord DE)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────
              QUESTION 3: Say 'True' or 'False'
          ────────────────────────────────────────── */}
          <div className="p-5 rounded-2xl border bg-muted/20 space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                3
              </span>
              <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">
                    Say &apos;True&apos; or &apos;False&apos;:
                  </p>
                  <span className="text-xs font-semibold text-muted-foreground">
                    Type True / False (or T / F)
                  </span>
                </div>

                <div className="space-y-3">
                  {/* (i) */}
                  <div className="p-3.5 rounded-xl bg-background border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-teal-700 dark:text-teal-400 text-xs">i)</span>
                      <span className="text-xs sm:text-sm">
                        We can locate only one centre in a circle
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_ex4_5_tf_1", "True");
                            gradeDirectly("q_ex4_5_tf_1", "True");
                          }}
                          className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                            (answers["q_ex4_5_tf_1"] || "").toLowerCase().startsWith("t")
                              ? "bg-green-600 text-white shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200"
                          }`}
                        >
                          True
                        </button>
                        <button
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_ex4_5_tf_1", "False");
                            gradeDirectly("q_ex4_5_tf_1", "False");
                          }}
                          className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                            (answers["q_ex4_5_tf_1"] || "").toLowerCase().startsWith("f")
                              ? "bg-red-600 text-white shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200"
                          }`}
                        >
                          False
                        </button>
                      </div>
                      <div className="w-24 sm:w-28 shrink-0">
                        <Field id="q_ex4_5_tf_1" placeholder="True / False" />
                      </div>
                    </div>
                  </div>

                  {/* (ii) */}
                  <div className="p-3.5 rounded-xl bg-background border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-teal-700 dark:text-teal-400 text-xs">ii)</span>
                      <span className="text-xs sm:text-sm">
                        Diameter is twice the radius
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_ex4_5_tf_2", "True");
                            gradeDirectly("q_ex4_5_tf_2", "True");
                          }}
                          className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                            (answers["q_ex4_5_tf_2"] || "").toLowerCase().startsWith("t")
                              ? "bg-green-600 text-white shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200"
                          }`}
                        >
                          True
                        </button>
                        <button
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_ex4_5_tf_2", "False");
                            gradeDirectly("q_ex4_5_tf_2", "False");
                          }}
                          className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                            (answers["q_ex4_5_tf_2"] || "").toLowerCase().startsWith("f")
                              ? "bg-red-600 text-white shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200"
                          }`}
                        >
                          False
                        </button>
                      </div>
                      <div className="w-24 sm:w-28 shrink-0">
                        <Field id="q_ex4_5_tf_2" placeholder="True / False" />
                      </div>
                    </div>
                  </div>

                  {/* (iii) */}
                  <div className="p-3.5 rounded-xl bg-background border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-teal-700 dark:text-teal-400 text-xs">iii)</span>
                      <span className="text-xs sm:text-sm">
                        An arc is a part of a circle
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_ex4_5_tf_3", "True");
                            gradeDirectly("q_ex4_5_tf_3", "True");
                          }}
                          className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                            (answers["q_ex4_5_tf_3"] || "").toLowerCase().startsWith("t")
                              ? "bg-green-600 text-white shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200"
                          }`}
                        >
                          True
                        </button>
                        <button
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_ex4_5_tf_3", "False");
                            gradeDirectly("q_ex4_5_tf_3", "False");
                          }}
                          className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                            (answers["q_ex4_5_tf_3"] || "").toLowerCase().startsWith("f")
                              ? "bg-red-600 text-white shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200"
                          }`}
                        >
                          False
                        </button>
                      </div>
                      <div className="w-24 sm:w-28 shrink-0">
                        <Field id="q_ex4_5_tf_3" placeholder="True / False" />
                      </div>
                    </div>
                  </div>

                  {/* (iv) */}
                  <div className="p-3.5 rounded-xl bg-background border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-teal-700 dark:text-teal-400 text-xs">iv)</span>
                      <span className="text-xs sm:text-sm">
                        All chords are equal in length
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_ex4_5_tf_4", "True");
                            gradeDirectly("q_ex4_5_tf_4", "True");
                          }}
                          className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                            (answers["q_ex4_5_tf_4"] || "").toLowerCase().startsWith("t")
                              ? "bg-green-600 text-white shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200"
                          }`}
                        >
                          True
                        </button>
                        <button
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_ex4_5_tf_4", "False");
                            gradeDirectly("q_ex4_5_tf_4", "False");
                          }}
                          className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                            (answers["q_ex4_5_tf_4"] || "").toLowerCase().startsWith("f")
                              ? "bg-red-600 text-white shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200"
                          }`}
                        >
                          False
                        </button>
                      </div>
                      <div className="w-24 sm:w-28 shrink-0">
                        <Field id="q_ex4_5_tf_4" placeholder="True / False" />
                      </div>
                    </div>
                  </div>

                  {/* (v) */}
                  <div className="p-3.5 rounded-xl bg-background border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-teal-700 dark:text-teal-400 text-xs">v)</span>
                      <span className="text-xs sm:text-sm">
                        All radii are not equal in length in a circle
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_ex4_5_tf_5", "True");
                            gradeDirectly("q_ex4_5_tf_5", "True");
                          }}
                          className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                            (answers["q_ex4_5_tf_5"] || "").toLowerCase().startsWith("t")
                              ? "bg-green-600 text-white shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200"
                          }`}
                        >
                          True
                        </button>
                        <button
                          type="button"
                          disabled={isRevealed}
                          onClick={() => {
                            handleChange("q_ex4_5_tf_5", "False");
                            gradeDirectly("q_ex4_5_tf_5", "False");
                          }}
                          className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                            (answers["q_ex4_5_tf_5"] || "").toLowerCase().startsWith("f")
                              ? "bg-red-600 text-white shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200"
                          }`}
                        >
                          False
                        </button>
                      </div>
                      <div className="w-24 sm:w-28 shrink-0">
                        <Field id="q_ex4_5_tf_5" placeholder="True / False" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────
              QUESTION 4: Circular Sheet Paper Fold Activity
              (Interactive Paper Folding Simulation)
          ────────────────────────────────────────── */}
          <div className="p-5 rounded-2xl border bg-muted/20 space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                4
              </span>
              <div className="space-y-4 flex-1">
                <p className="font-semibold text-foreground leading-relaxed">
                  Take a circular sheet of paper. Fold it into two halves. Press the fold and open it.
                  Do you find the crease of a diameter? Repeat the same activity by changing the fold.
                  How many diameters do you observe? How many more diameters can be formed?
                </p>

                {/* Paper fold simulator */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-4 bg-white dark:bg-slate-900 rounded-xl border">
                  <div className="md:col-span-5 flex flex-col items-center gap-3">
                    <span className="text-xs font-bold text-teal-800 dark:text-teal-300">
                      Interactive Paper Folding Simulator
                    </span>
                    <svg viewBox="0 0 200 200" className="w-44 h-44 select-none">
                      {/* Unfolded circle paper */}
                      <circle cx="100" cy="100" r="70" fill="#f8fafc" stroke="#64748b" strokeWidth="2" strokeDasharray="4,2" className="dark:fill-slate-800" />
                      
                      {/* Crease lines representing previous folds */}
                      {Array.from({ length: paperFoldsCount }).map((_, idx) => {
                        const deg = (idx * 180) / paperFoldsCount;
                        const rad = (deg * Math.PI) / 180;
                        const x1 = 100 - 70 * Math.cos(rad);
                        const y1 = 100 - 70 * Math.sin(rad);
                        const x2 = 100 + 70 * Math.cos(rad);
                        const y2 = 100 + 70 * Math.sin(rad);
                        return (
                          <line
                            key={idx}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#0284c7"
                            strokeWidth="2"
                            strokeDasharray="3,3"
                          />
                        );
                      })}

                      {/* Current Active Fold */}
                      <g transform={`rotate(${foldAngle}, 100, 100)`}>
                        <path
                          d="M 30 100 A 70 70 0 0 1 170 100 Z"
                          fill="#38bdf8"
                          fillOpacity="0.4"
                          stroke="#0284c7"
                          strokeWidth="2.5"
                        />
                        <line x1="30" y1="100" x2="170" y2="100" stroke="#0369a1" strokeWidth="3" />
                      </g>

                      {/* Centre of Paper */}
                      <circle cx="100" cy="100" r="4" fill="#0f172a" className="dark:fill-white" />
                      <text x="100" y="118" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#0f172a" className="dark:fill-white">
                        Crease Centre
                      </text>
                    </svg>

                    <div className="flex items-center gap-2 w-full justify-center">
                      <button
                        type="button"
                        onClick={() => setPaperFoldsCount((prev) => Math.min(12, prev + 1))}
                        className="text-xs px-2.5 py-1 rounded bg-teal-600 text-white font-semibold cursor-pointer hover:bg-teal-700"
                      >
                        + Make Another Fold
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaperFoldsCount(1)}
                        className="text-xs px-2 py-1 rounded border text-muted-foreground cursor-pointer hover:text-foreground"
                      >
                        Reset Folds
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-3">
                    <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-xs">
                      <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between">
                        <span>Do you find the crease of a diameter?</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
                          +1 pt
                        </span>
                      </label>
                      <div className="flex flex-wrap gap-1.5 mb-1.5">
                        {["Yes, Diameter", "No"].map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            disabled={isRevealed}
                            onClick={() => {
                              handleChange("q_ex4_5_crease_name", choice);
                              gradeDirectly("q_ex4_5_crease_name", choice);
                            }}
                            className="text-[11px] px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 bg-muted/40 hover:bg-teal-100 dark:hover:bg-teal-950/40 text-foreground cursor-pointer transition-all"
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                      <Field id="q_ex4_5_crease_name" placeholder="e.g. Yes, it is a diameter" />
                    </div>

                    <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-xs">
                      <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between">
                        <span>How many diameters do you observe in 1 fold?</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
                          +1 pt
                        </span>
                      </label>
                      <div className="flex flex-wrap gap-1.5 mb-1.5">
                        {["1 diameter", "2 diameters", "Many"].map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            disabled={isRevealed}
                            onClick={() => {
                              handleChange("q_ex4_5_diameters_observed", choice);
                              gradeDirectly("q_ex4_5_diameters_observed", choice);
                            }}
                            className="text-[11px] px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 bg-muted/40 hover:bg-teal-100 dark:hover:bg-teal-950/40 text-foreground cursor-pointer transition-all"
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                      <Field id="q_ex4_5_diameters_observed" placeholder="e.g. 1 diameter" />
                    </div>

                    <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-xs">
                      <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between">
                        <span>How many more diameters can be formed?</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
                          +1 pt
                        </span>
                      </label>
                      <div className="flex flex-wrap gap-1.5 mb-1.5">
                        {["Infinitely many", "Only 2", "Only 4"].map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            disabled={isRevealed}
                            onClick={() => {
                              handleChange("q_ex4_5_how_many_formed", choice);
                              gradeDirectly("q_ex4_5_how_many_formed", choice);
                            }}
                            className="text-[11px] px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 bg-muted/40 hover:bg-teal-100 dark:hover:bg-teal-950/40 text-foreground cursor-pointer transition-all"
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                      <Field id="q_ex4_5_how_many_formed" placeholder="e.g. Infinitely many (countless)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          SECTION 3: WHAT HAVE WE DISCUSSED?
          (Textbook Summary Section at the Bottom of Page 67 + QR Code)
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-emerald-600/40 bg-card overflow-hidden shadow-sm space-y-6">
        {/* Section Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="bg-white/20 p-1 rounded-md text-base">📖</span>
            <span>WHAT HAVE WE DISCUSSED?</span>
          </div>
          <span className="text-xs font-mono bg-black/20 px-2 py-0.5 rounded">
            QR: W2D1D3
          </span>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-9 space-y-4">
              {/* Point 1 */}
              <div className="p-4 rounded-xl bg-muted/20 border space-y-2">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </span>
                  <div className="space-y-2 flex-1">
                    <p className="text-xs sm:text-sm leading-relaxed text-foreground">
                      A <strong>point</strong> determines a location. It is usually denoted by a <strong>capital letter</strong> (such as A, B, C, P).
                    </p>
                    <div className="max-w-md">
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        How is a point usually denoted?
                      </label>
                      <div className="flex flex-wrap gap-1.5 mb-1.5">
                        {["Capital letter", "Small letter", "Number"].map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            disabled={isRevealed}
                            onClick={() => {
                              handleChange("q_summary_point_denote", choice);
                              gradeDirectly("q_summary_point_denote", choice);
                            }}
                            className="text-[11px] px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 bg-muted/40 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 text-foreground cursor-pointer transition-all"
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                      <Field id="q_summary_point_denote" placeholder="e.g. Capital letter" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Point 2 */}
              <div className="p-4 rounded-xl bg-muted/20 border space-y-2">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </span>
                  <div className="space-y-2 flex-1">
                    <p className="text-xs sm:text-sm leading-relaxed text-foreground">
                      A <strong>line segment</strong> is formed by joining two points. It has a <strong>fixed length</strong> and two end points.
                    </p>
                    <div className="max-w-md">
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        How many end points does a line segment have?
                      </label>
                      <div className="flex flex-wrap gap-1.5 mb-1.5">
                        {["Two end points", "One end point", "No end points"].map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            disabled={isRevealed}
                            onClick={() => {
                              handleChange("q_summary_line_segment_ends", choice);
                              gradeDirectly("q_summary_line_segment_ends", choice);
                            }}
                            className="text-[11px] px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 bg-muted/40 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 text-foreground cursor-pointer transition-all"
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                      <Field id="q_summary_line_segment_ends" placeholder="e.g. Two end points" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code and Chapter Quick Review Badge */}
            <div className="md:col-span-3 flex flex-col items-center justify-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border text-center shadow-xs">
              <div className="p-2 border-2 border-dashed border-emerald-400 rounded-xl bg-emerald-50/50 dark:bg-slate-950">
                {/* SVG QR Code Simulation */}
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                  <rect width="100" height="100" fill="#ffffff" />
                  {/* Outer corner squares */}
                  <rect x="10" y="10" width="25" height="25" fill="#0f172a" />
                  <rect x="15" y="15" width="15" height="15" fill="#ffffff" />
                  <rect x="18" y="18" width="9" height="9" fill="#0f172a" />

                  <rect x="65" y="10" width="25" height="25" fill="#0f172a" />
                  <rect x="70" y="15" width="15" height="15" fill="#ffffff" />
                  <rect x="73" y="18" width="9" height="9" fill="#0f172a" />

                  <rect x="10" y="65" width="25" height="25" fill="#0f172a" />
                  <rect x="15" y="70" width="15" height="15" fill="#ffffff" />
                  <rect x="18" y="73" width="9" height="9" fill="#0f172a" />

                  {/* QR Pattern Blocks */}
                  <rect x="42" y="12" width="6" height="10" fill="#0f172a" />
                  <rect x="52" y="16" width="6" height="6" fill="#0f172a" />
                  <rect x="42" y="38" width="16" height="8" fill="#0f172a" />
                  <rect x="65" y="45" width="10" height="10" fill="#0f172a" />
                  <rect x="80" y="55" width="8" height="12" fill="#0f172a" />
                  <rect x="45" y="60" width="12" height="6" fill="#0f172a" />
                  <rect x="42" y="75" width="8" height="14" fill="#0f172a" />
                  <rect x="60" y="70" width="14" height="8" fill="#0f172a" />
                  <rect x="78" y="80" width="12" height="10" fill="#0f172a" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <span className="font-mono font-bold text-xs text-foreground block">
                  W2D1D3
                </span>
                <span className="text-[10px] text-muted-foreground block">
                  Diksha Digital Asset Code
                </span>
              </div>
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
            🏆
          </div>
          <div>
            <h4 className="font-heading font-bold text-foreground text-base">
              Page 67 Score Summary
            </h4>
            <p className="text-xs text-muted-foreground">
              {correctCount === ALL_INPUT_IDS.length
                ? "🎉 Congratulations! You scored 100% on Page 67 and mastered circle sectors, segments and semicircles!"
                : correctCount > 0
                  ? `Great work! You have correctly solved ${correctCount} of ${ALL_INPUT_IDS.length} questions on Page 67.`
                  : "Solve the Exercise 4.5 questions above or click 'Check Answers' to evaluate your work."}
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
  );
}
