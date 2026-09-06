"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Gradable Points for Page 70 (Total: 10 Questions)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "q_p70_trace_endpoints", // Do their end points coincide? No
  "q_p70_trace_ab_cd", // AB is longer than CD
  "q_p70_trace_pq_rs", // PQ and RS are of equal length
  "q_p70_instruments_name", // Ruler (scale) and divider
  "q_p70_ruler_parts", // Ruler divided into 15 big parts
  "q_p70_cm_subparts", // 1 cm divided into 10 equal parts (1 mm)
  "q_p70_measure_ab_ruler", // 4.5 cm
  "q_p70_measure_ab_from_1", // 5.5 - 1 = 4.5 cm
  "q_p70_eye_position", // Vertically above the mark
  "q_p70_viewing_error", // Error due to angular viewing (parallax)
];

/* ─────────────────────────────────────────────
   Reveal text for answers
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_p70_trace_endpoints: "No, they do not coincide",
  q_p70_trace_ab_cd: "AB is longer than CD (AB > CD)",
  q_p70_trace_pq_rs: "PQ and RS are of equal length (PQ = RS)",
  q_p70_instruments_name: "Ruler (scale) and Divider",
  q_p70_ruler_parts: "15 big parts (each 1 cm)",
  q_p70_cm_subparts: "10 equal parts (1 mm each)",
  q_p70_measure_ab_ruler: "4.5 cm",
  q_p70_measure_ab_from_1: "4.5 cm (5.5 - 1 = 4.5 cm)",
  q_p70_eye_position: "Just vertically above the mark",
  q_p70_viewing_error: "Angular viewing error (Parallax error)",
};

/* ─────────────────────────────────────────────
   Answer Validator
───────────────────────────────────────────── */
function validateAnswer(id: string, rawValue: string): boolean {
  const v = rawValue.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!v) return false;

  switch (id) {
    case "q_p70_trace_endpoints":
      if (v.includes("yes") || v === "coincide" || v === "coincides") return false;
      return v.includes("no") || v.includes("not") || v.includes("donot");

    case "q_p70_trace_ab_cd":
      // "CD is longer" or "equal" should be strictly rejected
      if (v.includes("cdislonger") || v.includes("cdlonger") || v.includes("equal")) return false;
      return (
        (v.includes("ab") && (v.includes("longer") || v.includes("greater") || v.includes("more"))) ||
        v === "ablonger" ||
        v === "abgreater" ||
        v === "ab"
      );

    case "q_p70_trace_pq_rs":
      if (v.includes("notequal") || v.includes("unequal") || v.includes("pqlonger") || v.includes("rslonger")) return false;
      return (
        v.includes("equal") ||
        v.includes("same") ||
        v.includes("samelength") ||
        v === "equal"
      );

    case "q_p70_instruments_name":
      if (v.includes("compass") || v.includes("protractor") || v.includes("setsquare")) return false;
      return (
        (v.includes("ruler") && v.includes("divider")) ||
        v.includes("ruleranddivider") ||
        v.includes("scaleanddivider") ||
        v.includes("ruler") ||
        v.includes("divider")
      );

    case "q_p70_ruler_parts":
      if (v.includes("10") || v.includes("30") || v.includes("ten") || v.includes("thirty")) {
        if (!v.includes("15") && !v.includes("fifteen")) return false;
      }
      return v.includes("15") || v.includes("fifteen");

    case "q_p70_cm_subparts":
      // Must NOT match "100" or "5"
      if (v.includes("100") || v.includes("hundred") || v.includes("5") || v.includes("five")) return false;
      return v.includes("10") || v.includes("ten") || v.includes("1mm");

    case "q_p70_measure_ab_ruler":
      if (v.includes("55") || v.includes("40") || v.includes("50") || v === "4" || v === "5") return false;
      return v.includes("45") || v.includes("45cm") || v.includes("fourpointfive");

    case "q_p70_measure_ab_from_1":
      if (v === "55" || v === "1" || v.includes("65")) return false;
      return v.includes("45") || v.includes("45cm") || v.includes("fourpointfive");

    case "q_p70_eye_position":
      if (v.includes("left") || v.includes("right") || v.includes("angular") || v.includes("angle")) return false;
      return v.includes("vertical") || v.includes("above") || v.includes("justvertical");

    case "q_p70_viewing_error":
      if (v.includes("ruler") || v.includes("pencil") || v.includes("scaleerror")) return false;
      return (
        v.includes("angular") ||
        v.includes("parallax") ||
        v.includes("viewing")
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

export function C6MathsCh5Page2() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;

  const storageKey = "c6-maths-ch5-page2";

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
  // Tracing paper overlay animation
  const [tracingOverlayABCD, setTracingOverlayABCD] = useState<boolean>(false);
  const [tracingOverlayPQRS, setTracingOverlayPQRS] = useState<boolean>(false);

  // Ruler measurement simulator mode: 0 cm start vs 1 cm start
  const [rulerStartMark, setRulerStartMark] = useState<0 | 1>(0);

  // Interactive Eye position simulator
  const [eyePosition, setEyePosition] = useState<"left" | "center" | "right">("center");

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
      setTracingOverlayABCD(false);
      setTracingOverlayPQRS(false);
      setRulerStartMark(0);
      setEyePosition("center");
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
    setTracingOverlayABCD(false);
    setTracingOverlayPQRS(false);
    setRulerStartMark(0);
    setEyePosition("center");
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
          PAGE 70 HEADER & CONTROLS
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-600/40 bg-card overflow-hidden shadow-sm">
        {/* Banner */}
        <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-800 text-white font-heading font-bold px-5 py-4 text-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-white/20 text-xl">📏</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                Comparing Line Segments
              </h1>
              <p className="text-xs text-teal-100 font-normal">
                Class 6 Maths &bull; Chapter 5 &bull; Measures of Lines and Angles &bull; Printed Page 62
              </p>
            </div>
          </div>
          <span className="text-xs bg-teal-950/80 text-teal-200 px-3 py-1 rounded-full border border-teal-400/30 font-mono self-start sm:self-auto font-bold">
            Page 70
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
          SECTION 1: THINK AND DISCUSS (Tracing Paper Comparison)
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-card overflow-hidden shadow-sm p-5 sm:p-7 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-200 dark:border-emerald-800/60">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white p-1.5 rounded-lg text-lg">
              💡
            </span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-emerald-950 dark:text-emerald-200">
              THINK AND DISCUSS &bull; Tracing Paper Method
            </h2>
          </div>
          <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2.5 py-1 rounded-full">
            Method 2
          </span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-sm sm:text-base space-y-2">
          <p className="font-semibold text-emerald-900 dark:text-emerald-300">
            How do we compare them?
          </p>
          <p className="text-foreground leading-relaxed">
            To compare them, we trace the line segments <Seg>AB</Seg> and <Seg>CD</Seg> on a tracing paper such that they are roughly aligned in the same direction. Do their end points coincide?
          </p>
        </div>

        {/* Interactive Tracing Paper Visualizer */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <span>Interactive Tracing Experiment</span>
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTracingOverlayABCD((prev) => !prev)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  tracingOverlayABCD
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "border border-slate-300 dark:border-slate-700 bg-muted/40 hover:bg-slate-200 text-foreground"
                }`}
              >
                {tracingOverlayABCD ? "✓ AB & CD Overlaid" : "⚡ Overlay Tracing on AB & CD"}
              </button>
              <button
                type="button"
                onClick={() => setTracingOverlayPQRS((prev) => !prev)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  tracingOverlayPQRS
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "border border-slate-300 dark:border-slate-700 bg-muted/40 hover:bg-slate-200 text-foreground"
                }`}
              >
                {tracingOverlayPQRS ? "✓ PQ & RS Overlaid" : "⚡ Overlay Tracing on PQ & RS"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SVG 1: AB vs CD */}
            <div className="p-4 bg-muted/20 rounded-xl border flex flex-col items-center">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                Comparing <Seg>AB</Seg> and <Seg>CD</Seg>
              </span>
              <svg viewBox="0 0 260 90" className="w-full max-w-[240px] h-auto">
                {/* Segment AB (length 140) */}
                <line x1="30" y1="30" x2="180" y2="30" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                <circle cx="30" cy="30" r="3" fill="#dc2626" />
                <text x="25" y="22" fontSize="11" fontWeight="bold" fill="#dc2626">A</text>
                <circle cx="180" cy="30" r="3" fill="#dc2626" />
                <text x="185" y="22" fontSize="11" fontWeight="bold" fill="#dc2626">B</text>

                {/* Segment CD (length 105) */}
                <g
                  className="transition-all duration-500 ease-in-out"
                  transform={tracingOverlayABCD ? "translate(0, -35)" : "translate(0, 0)"}
                >
                  <line
                    x1="30"
                    y1="65"
                    x2="135"
                    y2="65"
                    stroke="#2563eb"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={tracingOverlayABCD ? "4,2" : undefined}
                  />
                  <circle cx="30" cy="65" r="3" fill="#2563eb" />
                  <text x="25" y="80" fontSize="11" fontWeight="bold" fill="#2563eb">C</text>
                  <circle cx="135" cy="65" r="3" fill="#2563eb" />
                  <text x="138" y="80" fontSize="11" fontWeight="bold" fill="#2563eb">D</text>
                </g>
              </svg>
              <div className="text-[11px] text-center font-mono mt-2 text-emerald-800 dark:text-emerald-300">
                {tracingOverlayABCD ? (
                  <span className="font-bold">Point D falls inside point B &rarr; AB is longer than CD</span>
                ) : (
                  <span>Click overlay button to place CD onto AB</span>
                )}
              </div>
            </div>

            {/* SVG 2: PQ vs RS */}
            <div className="p-4 bg-muted/20 rounded-xl border flex flex-col items-center">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                Comparing <Seg>PQ</Seg> and <Seg>RS</Seg>
              </span>
              <svg viewBox="0 0 260 90" className="w-full max-w-[240px] h-auto">
                {/* Segment PQ (length 120) */}
                <line x1="40" y1="30" x2="160" y2="30" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
                <circle cx="40" cy="30" r="3" fill="#059669" />
                <text x="35" y="22" fontSize="11" fontWeight="bold" fill="#059669">P</text>
                <circle cx="160" cy="30" r="3" fill="#059669" />
                <text x="165" y="22" fontSize="11" fontWeight="bold" fill="#059669">Q</text>

                {/* Segment RS (length 120) */}
                <g
                  className="transition-all duration-500 ease-in-out"
                  transform={tracingOverlayPQRS ? "translate(0, -35)" : "translate(0, 0)"}
                >
                  <line
                    x1="40"
                    y1="65"
                    x2="160"
                    y2="65"
                    stroke="#7c3aed"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={tracingOverlayPQRS ? "4,2" : undefined}
                  />
                  <circle cx="40" cy="65" r="3" fill="#7c3aed" />
                  <text x="35" y="80" fontSize="11" fontWeight="bold" fill="#7c3aed">R</text>
                  <circle cx="160" cy="65" r="3" fill="#7c3aed" />
                  <text x="165" y="80" fontSize="11" fontWeight="bold" fill="#7c3aed">S</text>
                </g>
              </svg>
              <div className="text-[11px] text-center font-mono mt-2 text-indigo-800 dark:text-indigo-300">
                {tracingOverlayPQRS ? (
                  <span className="font-bold">End points coincide exactly &rarr; PQ and RS are equal</span>
                ) : (
                  <span>Click overlay button to place RS onto PQ</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Gradable Questions for Think & Discuss ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Question 1: End points coincide? */}
          <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
            <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
              <span>Do end points of AB & CD coincide?</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                +1 pt
              </span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["No, they do not coincide", "Yes, they coincide"].map((c) => {
                const isSelected = (answers["q_p70_trace_endpoints"] || "").toLowerCase().startsWith("no")
                  ? c.startsWith("No")
                  : (answers["q_p70_trace_endpoints"] || "") === c;
                return (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p70_trace_endpoints", c);
                      gradeDirectly("q_p70_trace_endpoints", c);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-md border font-medium cursor-pointer transition-all ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                        : "border-slate-200 dark:border-slate-800 bg-muted/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
            <Field id="q_p70_trace_endpoints" placeholder="e.g. No, do not coincide" />
          </div>

          {/* Question 2: We can now say _______ */}
          <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
            <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
              <span>We can now say:</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                +1 pt
              </span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["AB is longer than CD", "CD is longer than AB", "They are equal"].map((c) => {
                const isSelected = (answers["q_p70_trace_ab_cd"] || "") === c;
                return (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p70_trace_ab_cd", c);
                      gradeDirectly("q_p70_trace_ab_cd", c);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-md border font-medium cursor-pointer transition-all ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                        : "border-slate-200 dark:border-slate-800 bg-muted/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
            <Field id="q_p70_trace_ab_cd" placeholder="e.g. AB is longer than CD" />
          </div>

          {/* Question 3: Comparing PQ with RS */}
          <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
            <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
              <span>Comparing PQ with RS, we can see:</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                +1 pt
              </span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["PQ and RS are of equal length", "PQ is longer than RS", "RS is longer than PQ"].map((c) => {
                const isSelected = (answers["q_p70_trace_pq_rs"] || "") === c;
                return (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p70_trace_pq_rs", c);
                      gradeDirectly("q_p70_trace_pq_rs", c);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-md border font-medium cursor-pointer transition-all ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                        : "border-slate-200 dark:border-slate-800 bg-muted/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
            <Field id="q_p70_trace_pq_rs" placeholder="e.g. PQ and RS are of equal length" />
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          SECTION 2: 5.2.1 COMPARING BY USING INSTRUMENTS
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-indigo-500/40 bg-card overflow-hidden shadow-sm p-5 sm:p-7 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-indigo-200 dark:border-indigo-800/60">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-700 text-white text-xs font-mono font-bold px-2 py-0.5 rounded">
              5.2.1
            </span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-indigo-950 dark:text-indigo-200 uppercase tracking-tight">
              Comparing by Using Instruments
            </h2>
          </div>
          <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 px-2.5 py-1 rounded-full">
            Method 3
          </span>
        </div>

        <p className="text-sm sm:text-base leading-relaxed">
          To compare any two line segments accurately, then we need proper instruments. These include the <strong>ruler (scale)</strong> and <strong>divider</strong> in the Geometry box. Have you seen and used these instruments? Look at these carefully.
        </p>

        {/* Instruments Image Representation (Fig 5.4) */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border flex flex-col sm:flex-row items-center justify-center gap-12 overflow-x-auto shadow-inner">
          {/* SVG Ruler */}
          <div className="flex flex-col items-center gap-3">
            <svg viewBox="0 0 320 65" className="w-[300px] h-auto drop-shadow-md">
              <rect x="10" y="10" width="300" height="42" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" rx="3" />
              {/* Markings */}
              {Array.from({ length: 16 }).map((_, i) => (
                <g key={i} transform={`translate(${10 + i * (280 / 15)}, 10)`}>
                  <line x1="0" y1="0" x2="0" y2="16" stroke="#0f172a" strokeWidth="1.5" />
                  <text x="0" y="28" fontSize="9" textAnchor="middle" fill="#0f172a" fontWeight="bold">{i}</text>
                  {i < 15 && Array.from({ length: 9 }).map((_, j) => (
                    <line
                      key={j}
                      x1={(j + 1) * (280 / 150)}
                      y1="0"
                      x2={(j + 1) * (280 / 150)}
                      y2={j === 4 ? "10" : "5"}
                      stroke="#334155"
                      strokeWidth="1"
                    />
                  ))}
                </g>
              ))}
              <text x="25" y="47" fontSize="8" fill="#475569" fontWeight="bold">SCALE (cm)</text>
            </svg>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Ruler (Scale)</span>
          </div>

          {/* SVG Divider */}
          <div className="flex flex-col items-center gap-3">
            <svg viewBox="0 0 110 130" className="w-[85px] h-auto drop-shadow-md">
              {/* Divider legs */}
              <line x1="55" y1="25" x2="22" y2="105" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
              <line x1="55" y1="25" x2="88" y2="105" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
              {/* Hinge */}
              <circle cx="55" cy="25" r="7" fill="#475569" />
              <circle cx="55" cy="22" r="3" fill="#cbd5e1" />
              <circle cx="55" cy="10" r="4" fill="#64748b" />
              {/* Sharp metal points */}
              <line x1="22" y1="105" x2="19" y2="122" stroke="#334155" strokeWidth="1.5" />
              <line x1="88" y1="105" x2="91" y2="122" stroke="#334155" strokeWidth="1.5" />
            </svg>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Divider</span>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground font-mono">Fig. 5.4 &bull; Ruler and Divider in Geometry Box</p>

        {/* Instruments Definition and Explanation */}
        <p className="text-sm sm:text-base">
          A ruler (scale) is divided into <strong>15 big parts</strong> as marked along one of its edges. Each of these 15 parts is of length <strong>1 centimeter (1 cm)</strong>. Each centimeter is divided into <strong>10 equal parts</strong> again and each sub part is <strong>1 millimeter (1 mm)</strong>.
        </p>

        {/* Gradable Questions for 5.2.1 Instruments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Question 4: Instruments name */}
          <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
            <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
              <span>Which instruments are used to compare?</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-bold">
                +1 pt
              </span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["Ruler and Divider", "Compass and Protractor", "Set Squares"].map((c) => {
                const isSelected = (answers["q_p70_instruments_name"] || "") === c;
                return (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p70_instruments_name", c);
                      gradeDirectly("q_p70_instruments_name", c);
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
            <Field id="q_p70_instruments_name" placeholder="e.g. Ruler and Divider" />
          </div>

          {/* Question 5: Ruler big parts */}
          <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
            <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
              <span>Ruler is divided into how many big parts?</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-bold">
                +1 pt
              </span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["15 big parts (15 cm)", "10 big parts", "30 big parts"].map((c) => {
                const isSelected = (answers["q_p70_ruler_parts"] || "") === c;
                return (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p70_ruler_parts", c);
                      gradeDirectly("q_p70_ruler_parts", c);
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
            <Field id="q_p70_ruler_parts" placeholder="e.g. 15 big parts" />
          </div>

          {/* Question 6: Sub parts in 1 cm */}
          <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
            <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
              <span>Each cm is divided into how many parts?</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-bold">
                +1 pt
              </span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["10 equal parts (1 mm)", "5 equal parts", "100 equal parts"].map((c) => {
                const isSelected = (answers["q_p70_cm_subparts"] || "") === c;
                return (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p70_cm_subparts", c);
                      gradeDirectly("q_p70_cm_subparts", c);
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
            <Field id="q_p70_cm_subparts" placeholder="e.g. 10 equal parts (1 mm)" />
          </div>
        </div>

        {/* ── Interactive Measuring Simulation (Ruler on Segment AB) ── */}
        <div className="p-5 sm:p-6 bg-muted/30 rounded-2xl border border-indigo-200 dark:border-indigo-800/40 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-indigo-950 dark:text-indigo-200">
                Measuring Length with Ruler: Segment AB
              </h3>
              <p className="text-xs text-muted-foreground">
                Toggle ruler position: Start at 0 cm mark vs Start at 1 cm mark.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRulerStartMark(0)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  rulerStartMark === 0
                    ? "bg-teal-600 text-white shadow-xs"
                    : "border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-foreground"
                }`}
              >
                Place at 0 cm Mark
              </button>
              <button
                type="button"
                onClick={() => setRulerStartMark(1)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  rulerStartMark === 1
                    ? "bg-teal-600 text-white shadow-xs"
                    : "border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-foreground"
                }`}
              >
                Place at 1 cm Mark (Note)
              </button>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-950 rounded-xl border flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg viewBox="0 0 340 95" className="w-[340px] h-auto select-none">
              {/* Ruler body */}
              <rect x="15" y="38" width="310" height="45" fill="#bae6fd" stroke="#0ea5e9" strokeWidth="1.5" rx="3" />
              {Array.from({ length: 16 }).map((_, i) => (
                <g key={`m${i}`} transform={`translate(${20 + i * (290 / 15)}, 38)`}>
                  <line x1="0" y1="0" x2="0" y2="12" stroke="#0f172a" strokeWidth="1.2" />
                  <text x="0" y="24" fontSize="9" textAnchor="middle" fill="#0f172a" fontWeight="bold">{i}</text>
                  {i < 15 && Array.from({ length: 9 }).map((_, j) => (
                    <line
                      key={`s${i}${j}`}
                      x1={(j + 1) * (290 / 150)}
                      y1="0"
                      x2={(j + 1) * (290 / 150)}
                      y2={j === 4 ? "8" : "4"}
                      stroke="#334155"
                      strokeWidth="0.8"
                    />
                  ))}
                </g>
              ))}

              {/* Segment AB (fixed 4.5 cm in length) */}
              {/* If rulerStartMark is 0: A is at 0 cm mark (x = 20), B is at 4.5 cm mark (x = 20 + 4.5 * 290/15 = 107) */}
              {/* If rulerStartMark is 1: A is at 1 cm mark (x = 20 + 290/15 = 39.3), B is at 5.5 cm mark (x = 20 + 5.5 * 290/15 = 126.3) */}
              {(() => {
                const xA = rulerStartMark === 0 ? 20 : 20 + (290 / 15);
                const xB = rulerStartMark === 0 ? 20 + 4.5 * (290 / 15) : 20 + 5.5 * (290 / 15);
                return (
                  <g className="transition-all duration-300 ease-in-out">
                    {/* Vertical guide lines */}
                    <line x1={xA} y1="20" x2={xA} y2="40" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1={xB} y1="20" x2={xB} y2="40" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />

                    {/* Red Segment Line */}
                    <line x1={xA} y1="20" x2={xB} y2="20" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                    <circle cx={xA} cy="20" r="3" fill="#ef4444" />
                    <text x={xA - 10} y="24" fontSize="12" fontWeight="bold" fill="#ef4444">A</text>
                    <circle cx={xB} cy="20" r="3" fill="#ef4444" />
                    <text x={xB + 6} y="24" fontSize="12" fontWeight="bold" fill="#ef4444">B</text>

                    {/* Measurement bracket label */}
                    <rect
                      x={(xA + xB) / 2 - 28}
                      y="4"
                      width="56"
                      height="15"
                      rx="3"
                      fill="#ef4444"
                    />
                    <text
                      x={(xA + xB) / 2}
                      y="15"
                      fontSize="9"
                      fontWeight="bold"
                      fill="#ffffff"
                      textAnchor="middle"
                    >
                      4.5 cm
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Question 7: Direct 0 mark measurement */}
            <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
              <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
                <span>Length of AB (placed at 0 mark):</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
                  +1 pt
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["4.5 cm", "4.0 cm", "5.0 cm", "5.5 cm"].map((c) => {
                  const isSelected = (answers["q_p70_measure_ab_ruler"] || "") === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      disabled={isRevealed}
                      onClick={() => {
                        handleChange("q_p70_measure_ab_ruler", c);
                        gradeDirectly("q_p70_measure_ab_ruler", c);
                      }}
                      className={`text-[11px] px-2.5 py-1 rounded-md border font-medium cursor-pointer transition-all ${
                        isSelected
                          ? "bg-teal-600 text-white border-teal-700 shadow-xs"
                          : "border-slate-200 dark:border-slate-800 bg-muted/40 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
              <Field id="q_p70_measure_ab_ruler" placeholder="e.g. 4.5 cm" />
            </div>

            {/* Question 8: Subtraction from 1 cm mark */}
            <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
              <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
                <span>Note: Placed at 1 cm (5.5 - 1 = ?):</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold">
                  +1 pt
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["4.5 cm", "5.5 cm", "1.0 cm", "6.5 cm"].map((c) => {
                  const isSelected = (answers["q_p70_measure_ab_from_1"] || "") === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      disabled={isRevealed}
                      onClick={() => {
                        handleChange("q_p70_measure_ab_from_1", c);
                        gradeDirectly("q_p70_measure_ab_from_1", c);
                      }}
                      className={`text-[11px] px-2.5 py-1 rounded-md border font-medium cursor-pointer transition-all ${
                        isSelected
                          ? "bg-teal-600 text-white border-teal-700 shadow-xs"
                          : "border-slate-200 dark:border-slate-800 bg-muted/40 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
              <Field id="q_p70_measure_ab_from_1" placeholder="e.g. 4.5 cm" />
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          SECTION 3: THINK, DISCUSS AND WRITE (Eye Positioning & Angular Error)
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-card overflow-hidden shadow-sm p-5 sm:p-7 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-200 dark:border-emerald-800/60">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white p-1.5 rounded-lg text-lg">
              👁️
            </span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-emerald-950 dark:text-emerald-200">
              THINK, DISCUSS AND WRITE &bull; Position of the Eye
            </h2>
          </div>
          <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2.5 py-1 rounded-full">
            Avoiding Errors
          </span>
        </div>

        <p className="text-sm sm:text-base font-medium">
          What other errors can you find while measuring the length of line segment?
        </p>

        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
          For example, to find the length of a pencil, the eye should be correctly positioned as shown in the figure i.e. <strong>just vertically above the mark for both points</strong>. Otherwise there may be an <strong>error due to angular viewing</strong>.
        </p>

        {/* Interactive Parallax Eye Simulator */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border space-y-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Interactive Parallax Experiment: Click an Eye Position
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEyePosition("left")}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  eyePosition === "left"
                    ? "bg-red-600 text-white shadow-xs"
                    : "border border-slate-300 dark:border-slate-700 bg-muted/40 hover:bg-slate-200 text-foreground"
                }`}
              >
                Left Eye (Wrong)
              </button>
              <button
                type="button"
                onClick={() => setEyePosition("center")}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  eyePosition === "center"
                    ? "bg-green-600 text-white shadow-xs"
                    : "border border-slate-300 dark:border-slate-700 bg-muted/40 hover:bg-slate-200 text-foreground"
                }`}
              >
                Center Eye (Right)
              </button>
              <button
                type="button"
                onClick={() => setEyePosition("right")}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  eyePosition === "right"
                    ? "bg-red-600 text-white shadow-xs"
                    : "border border-slate-300 dark:border-slate-700 bg-muted/40 hover:bg-slate-200 text-foreground"
                }`}
              >
                Right Eye (Wrong)
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center p-3 bg-muted/20 rounded-xl">
            {/* SVG Diagram of Eye positions */}
            <div className="w-full md:w-[320px] flex flex-col items-center">
              <svg viewBox="0 0 240 130" className="w-full max-w-[280px] h-auto select-none">
                {/* Ruler scale at bottom */}
                <rect x="20" y="95" width="200" height="20" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" rx="2" />
                {Array.from({ length: 7 }).map((_, i) => (
                  <g key={i} transform={`translate(${30 + i * 30}, 95)`}>
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#000" strokeWidth="1.2" />
                    <text x="0" y="15" fontSize="7" textAnchor="middle" fontWeight="bold">{i}</text>
                  </g>
                ))}

                {/* Mark Point (Target point at 3 cm mark: x = 120) */}
                <line x1="120" y1="85" x2="120" y2="95" stroke="#ef4444" strokeWidth="2" />
                <circle cx="120" cy="95" r="3" fill="#ef4444" />
                <text x="120" y="125" fontSize="8" fontWeight="bold" fill="#ef4444" textAnchor="middle">True Mark</text>

                {/* Eye 1: Left (Wrong) */}
                <g
                  onClick={() => setEyePosition("left")}
                  className="cursor-pointer"
                  opacity={eyePosition === "left" ? 1 : 0.4}
                >
                  <circle cx="60" cy="35" r="14" fill="none" stroke="#ef4444" strokeWidth={eyePosition === "left" ? 2.5 : 1.5} />
                  <circle cx="60" cy="35" r="5" fill="#ef4444" />
                  <line x1="60" y1="49" x2="135" y2="95" stroke="#ef4444" strokeWidth={eyePosition === "left" ? 2 : 1} strokeDasharray="3,3" />
                  <text x="60" y="16" fontSize="10" fill="#ef4444" textAnchor="middle" fontWeight="bold">Wrong</text>
                </g>

                {/* Eye 2: Center (Right) */}
                <g
                  onClick={() => setEyePosition("center")}
                  className="cursor-pointer"
                  opacity={eyePosition === "center" ? 1 : 0.4}
                >
                  <circle cx="120" cy="35" r="14" fill="none" stroke="#22c55e" strokeWidth={eyePosition === "center" ? 2.5 : 1.5} />
                  <circle cx="120" cy="35" r="5" fill="#22c55e" />
                  <line x1="120" y1="49" x2="120" y2="85" stroke="#22c55e" strokeWidth={eyePosition === "center" ? 2.5 : 1} strokeDasharray="3,3" />
                  <text x="120" y="16" fontSize="10" fill="#22c55e" textAnchor="middle" fontWeight="bold">Right</text>
                </g>

                {/* Eye 3: Right (Wrong) */}
                <g
                  onClick={() => setEyePosition("right")}
                  className="cursor-pointer"
                  opacity={eyePosition === "right" ? 1 : 0.4}
                >
                  <circle cx="180" cy="35" r="14" fill="none" stroke="#ef4444" strokeWidth={eyePosition === "right" ? 2.5 : 1.5} />
                  <circle cx="180" cy="35" r="5" fill="#ef4444" />
                  <line x1="180" y1="49" x2="105" y2="95" stroke="#ef4444" strokeWidth={eyePosition === "right" ? 2 : 1} strokeDasharray="3,3" />
                  <text x="180" y="16" fontSize="10" fill="#ef4444" textAnchor="middle" fontWeight="bold">Wrong</text>
                </g>
              </svg>
              <p className="text-xs text-center font-bold text-slate-700 dark:text-slate-300 mt-1">
                Position of the eye (Figure from textbook)
              </p>
            </div>

            {/* Eye Simulator Result Feedback */}
            <div className="flex-1 space-y-3">
              <div
                className={`p-4 rounded-xl border transition-all ${
                  eyePosition === "center"
                    ? "bg-green-50 border-green-300 text-green-900 dark:bg-green-950/40 dark:border-green-800 dark:text-green-200"
                    : "bg-red-50 border-red-300 text-red-900 dark:bg-red-950/40 dark:border-red-800 dark:text-red-200"
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  <span>{eyePosition === "center" ? "✅ Correct Observation" : "⚠️ Angular Viewing Error (Parallax)"}</span>
                </div>
                <p className="text-xs mt-1 leading-relaxed">
                  {eyePosition === "center"
                    ? "The eye is placed vertically above the point. Line of sight directly aligns with the mark with ZERO error!"
                    : eyePosition === "left"
                    ? "Viewing from an angle on the left shifts the apparent reading forward (+0.2 cm). This creates an incorrect reading!"
                    : "Viewing from an angle on the right shifts the apparent reading backward (-0.2 cm). This creates an incorrect reading!"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Gradable Questions for Eye Position & Error ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Question 9: Correct eye position */}
          <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
            <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
              <span>Where should eye be positioned to avoid error?</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                +1 pt
              </span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["Vertically above the mark", "Angular from left", "Angular from right"].map((c) => {
                const isSelected = (answers["q_p70_eye_position"] || "") === c;
                return (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p70_eye_position", c);
                      gradeDirectly("q_p70_eye_position", c);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-md border font-medium cursor-pointer transition-all ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                        : "border-slate-200 dark:border-slate-800 bg-muted/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
            <Field id="q_p70_eye_position" placeholder="e.g. Vertically above the mark" />
          </div>

          {/* Question 10: Viewing error name */}
          <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-xs">
            <label className="text-xs sm:text-sm font-semibold flex items-center justify-between">
              <span>What is this measurement error called?</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                +1 pt
              </span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["Angular viewing error", "Ruler scale error", "Pencil error"].map((c) => {
                const isSelected = (answers["q_p70_viewing_error"] || "") === c;
                return (
                  <button
                    key={c}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => {
                      handleChange("q_p70_viewing_error", c);
                      gradeDirectly("q_p70_viewing_error", c);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-md border font-medium cursor-pointer transition-all ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                        : "border-slate-200 dark:border-slate-800 bg-muted/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
            <Field id="q_p70_viewing_error" placeholder="e.g. Angular viewing error" />
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          PAGE 70 SCORE SUMMARY FOOTER CARD
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-teal-300 dark:border-teal-800/80 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/30 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-2xl font-bold shadow-sm">
            📏
          </div>
          <div>
            <h4 className="font-heading font-bold text-foreground text-base">
              Page 70 Score Summary
            </h4>
            <p className="text-xs text-muted-foreground">
              {correctCount === ALL_INPUT_IDS.length
                ? "🎉 Outstanding! You answered all 10 Page 70 questions correctly and mastered comparing line segments!"
                : correctCount > 0
                  ? `Good progress! You answered ${correctCount} of ${ALL_INPUT_IDS.length} questions correctly.`
                  : "Click the quick choice buttons or type answers above to earn points."}
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
