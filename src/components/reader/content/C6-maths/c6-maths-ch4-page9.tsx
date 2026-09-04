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
  "q1_name_quad",
  "q2_opp_side_qr",
  "q2_opp_angle_p",
  "q2_adj_side_1",
  "q2_adj_side_2",
  "q2_adj_angle_1",
  "q2_adj_angle_2",
  "q3_interior",
  "q3_boundary",
  "q3_exterior",
  "q_circle_real_life",
  "q_radii_same",
  "q_how_many_radii",
];

/* ─────────────────────────────────────────────
   Accepted correct answers (normalised)
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  // Question 1: Name quadrilateral
  q1_name_quad: [
    "abcd",
    "bcda",
    "cdab",
    "dabc",
    "adcb",
    "dcba",
    "cbad",
    "badc",
    "quadrilateralabcd",
    "quadabcd",
    "polygonabcd",
  ],

  // Question 2: Quadrilateral PQRS relationships
  q2_opp_side_qr: [
    "ps",
    "sp",
    "sideps",
    "sidesp",
    "lineps",
    "linesp",
    "segmentps",
    "segmentsp",
    "psside",
    "spside",
    "barps",
    "barsp",
    "overlineps",
    "overlinesp",
  ],
  q2_opp_angle_p: [
    "r",
    "angler",
    "∠r",
    "qrs",
    "srq",
    "angleqrs",
    "anglesrq",
    "∠qrs",
    "∠srq",
    "vertexr",
  ],
  q2_adj_side_1: [
    "ps",
    "sp",
    "qr",
    "rq",
    "sideps",
    "sidesp",
    "sideqr",
    "siderq",
    "segmentps",
    "segmentqr",
  ],
  q2_adj_side_2: [
    "qr",
    "rq",
    "ps",
    "sp",
    "sideqr",
    "siderq",
    "sideps",
    "sidesp",
    "segmentqr",
    "segmentps",
  ],
  q2_adj_angle_1: [
    "p",
    "anglep",
    "∠p",
    "r",
    "angler",
    "∠r",
    "spq",
    "qps",
    "srq",
    "qrs",
    "anglespq",
    "angleqps",
    "anglesrq",
    "angleqrs",
  ],
  q2_adj_angle_2: [
    "r",
    "angler",
    "∠r",
    "p",
    "anglep",
    "∠p",
    "srq",
    "qrs",
    "spq",
    "qps",
    "anglesrq",
    "angleqrs",
    "anglespq",
    "angleqps",
  ],

  // Question 3: Points in Quadrilateral
  q3_interior: ["rs", "sr", "sandr", "rands", "pointsr", "pointsandr"], // evaluated with sortChars = true
  q3_boundary: ["abcde", "abcd"], // evaluated with sortChars = true (accepts all 5 or 4 vertices)
  q3_exterior: ["pqt"], // evaluated with sortChars = true (any permutation of T, P, Q)

  // Section 4.10: Circle
  q_circle_real_life: [
    "coin",
    "plate",
    "wheel",
    "cd",
    "dvd",
    "biscuit",
    "pizza",
    "lid",
    "ring",
    "cap",
    "chapati",
    "roti",
    "doughnut",
    "clock",
    "bangle",
    "tire",
    "tyre",
    "bottlecap",
    "moon",
    "sun",
    "lens",
    "button",
    "bowl",
    "disc",
  ],
  q_radii_same: [
    "yes",
    "true",
    "equal",
    "same",
    "theyareequal",
    "theyaresame",
    "allradiiaresame",
    "allsame",
    "allareequal",
    "yesallradiiaresame",
    "yesallradiiarethesame",
    "yesallradiiareequal",
  ],
  q_how_many_radii: [
    "infinite",
    "infinitelymany",
    "many",
    "countless",
    "unlimited",
    "innumerable",
    "uncounted",
    "manyradii",
    "somany",
    "infiniteradii",
    "anynumber",
    "infinitenumber",
  ],
};

/* ─────────────────────────────────────────────
   Reveal text for teacher / answers
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q1_name_quad: "Quadrilateral ABCD",
  q2_opp_side_qr: "PS (or SP)",
  q2_opp_angle_p: "∠R",
  q2_adj_side_1: "SP",
  q2_adj_side_2: "QR",
  q2_adj_angle_1: "∠P",
  q2_adj_angle_2: "∠R",
  q3_interior: "S, R",
  q3_boundary: "A, B, C, D, E",
  q3_exterior: "T, P, Q",
  q_circle_real_life: "Coin, Plate, CD, Wheel, Button",
  q_radii_same: "Yes (All radii of a circle are equal)",
  q_how_many_radii: "Infinitely many (Infinite)",
};

/* ─────────────────────────────────────────────
   Math notation helpers
───────────────────────────────────────────── */

/** Line-segment overline: e.g. <Seg>QR</Seg> renders Q̅R̅ */
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

/** Angle symbol helper with math font */
function Ang({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center font-serif font-bold text-teal-800 dark:text-teal-300">
      <span className="mr-0.5 text-base font-sans">∠</span>
      <span className="italic">{children}</span>
    </span>
  );
}

const normalizeAndSort = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .split("")
    .sort()
    .join("");

const normalize = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

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

export function C6MathsCh4Page9() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;

  const storageKey = "c6-maths-ch4-page9";

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
  // Q1 points
  const [pointsQ1, setPointsQ1] = useState([
    { id: "A", x: 60, y: 70 },
    { id: "B", x: 280, y: 50 },
    { id: "C", x: 230, y: 190 },
    { id: "D", x: 80, y: 180 },
  ]);
  const [draggedPoint, setDraggedPoint] = useState<string | null>(null);

  // Q2 diagram highlighting
  const [q2Highlight, setQ2Highlight] = useState<string | null>(null);

  // Q3 region filtering
  const [q3Filter, setQ3Filter] = useState<"all" | "interior" | "boundary" | "exterior">("all");

  // Circle spoke measurement angle
  const [spokeAngle, setSpokeAngle] = useState<number>(35);

  // Activity paper folding step (1 to 4)
  const [foldingStep, setFoldingStep] = useState<number>(1);

  // Calculate stats
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

  const gradeField = (
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
        ) || rawTyped.trim().length >= 3;
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

    setFeedback({
      correct,
      label: correct ? "Correct! +1 pt" : "Try Again! -1 pt",
      id: Date.now(),
    });

    const next = { ...graded, [id]: { value: typed, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${id}-graded`,
      JSON.stringify({ value: typed, correct })
    );
  };

  // Check and score all filled fields at once
  const handleCheckAll = () => {
    if (isRevealed) return;
    let newGraded = { ...graded };
    let pointsDelta = 0;

    ALL_INPUT_IDS.forEach((id) => {
      const rawTyped = answers[id] ?? "";
      if (!rawTyped.trim()) return;

      const isSort = id === "q3_interior" || id === "q3_boundary" || id === "q3_exterior";
      const isOpen = id === "q_circle_real_life" || id === "q_how_many_radii";
      const correctAnswers = CORRECT[id] || [];
      const typed = isSort ? normalizeAndSort(rawTyped) : normalize(rawTyped);

      let correct = false;
      if (isOpen) {
        correct =
          correctAnswers.some((ans) =>
            typed.includes(isSort ? normalizeAndSort(ans) : normalize(ans))
          ) || rawTyped.trim().length >= 3;
      } else {
        correct = correctAnswers.some(
          (ans) => (isSort ? normalizeAndSort(ans) : normalize(ans)) === typed
        );
      }

      const prev = graded[id];
      if (prev) {
        if (!prev.correct && correct) pointsDelta += 2;
        else if (prev.correct && !correct) pointsDelta -= 2;
      } else {
        pointsDelta += correct ? 1 : -1;
      }

      newGraded[id] = { value: typed, correct };
      localStorage.setItem(
        `${storageKey}-${id}-graded`,
        JSON.stringify({ value: typed, correct })
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
          onBlur={() => gradeField(id, correct, isOpen, sortChars)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              gradeField(id, correct, isOpen, sortChars);
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

  // Draggable point handler for Q1
  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggedPoint) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(30, Math.min(310, Math.round(((e.clientX - rect.left) / rect.width) * 340)));
    const y = Math.max(30, Math.min(210, Math.round(((e.clientY - rect.top) / rect.height) * 240)));
    setPointsQ1((prev) =>
      prev.map((pt) => (pt.id === draggedPoint ? { ...pt, x, y } : pt))
    );
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
          PAGE 65 HEADER & SCORING CONTROLS BAR
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-emerald-600/40 bg-card overflow-hidden shadow-sm">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-800 text-white font-heading font-bold px-5 py-3.5 text-lg flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-white/20 backdrop-blur rounded-lg text-xl">
              ✍️
            </span>
            <div>
              <span className="tracking-wide">Exercise - 4.4 & 4.10 Circle</span>
              <div className="text-[11px] font-sans font-normal opacity-90 text-emerald-100">
                Class 6 Maths • Basic Geometrical Ideas • Page 65
              </div>
            </div>
          </div>
          <span className="text-xs bg-emerald-950/70 text-emerald-200 px-3 py-1 rounded-full border border-emerald-400/30 font-mono">
            Page 65 / 193
          </span>
        </div>

        {/* Scoring & Action Controls Bar */}
        <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border-b border-emerald-200 dark:border-emerald-800/60 p-4 px-5 flex flex-wrap items-center justify-between gap-4">
          {/* Live Page Scoring & Progress */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700/60 rounded-xl px-3.5 py-1.5 shadow-xs">
              <span className="text-base">⭐</span>
              <span className="text-xs font-semibold text-muted-foreground">Total Points:</span>
              <span className="font-heading font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                {score}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700/60 rounded-xl px-3.5 py-1.5 shadow-xs">
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
                  : "bg-emerald-700 hover:bg-emerald-800 text-white"
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
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-950 font-heading font-semibold text-xs text-emerald-800 dark:text-emerald-300 transition shadow-xs disabled:opacity-50 cursor-pointer"
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
              QUESTION 1: MARK 4 POINTS & MAKE QUADRILATERAL
          ──────────────────────────────────────────── */}
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-5 space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-sm">
                1
              </span>
              <p className="font-semibold text-emerald-950 dark:text-emerald-100 text-base pt-0.5">
                Mark any four points <span className="font-mono font-bold">A</span>,{" "}
                <span className="font-mono font-bold">B</span>,{" "}
                <span className="font-mono font-bold">C</span> and{" "}
                <span className="font-mono font-bold">D</span>. Join them to make a
                quadrilateral. Name it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Interactive Draggable Canvas */}
              <div className="md:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-300 dark:border-emerald-700/60 p-3 shadow-sm flex flex-col items-center">
                <div className="w-full flex items-center justify-between px-2 pb-2 text-xs text-muted-foreground border-b mb-2">
                  <span className="font-medium text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Interactive Quadrilateral Canvas
                  </span>
                  <span className="italic">Drag points A, B, C, D</span>
                </div>

                <svg
                  viewBox="0 0 340 240"
                  className="w-full h-56 select-none cursor-crosshair touch-none"
                  onMouseMove={handleSvgMouseMove}
                  onMouseUp={() => setDraggedPoint(null)}
                  onMouseLeave={() => setDraggedPoint(null)}
                >
                  {/* Subtle coordinate grid */}
                  <defs>
                    <pattern id="q1-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="340" height="240" fill="url(#q1-grid)" rx="12" />

                  {/* Shaded Quadrilateral ABCD Interior */}
                  <polygon
                    points={pointsQ1.map((p) => `${p.x},${p.y}`).join(" ")}
                    fill="#10b981"
                    fillOpacity="0.18"
                    stroke="#059669"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />

                  {/* Line Segment Labels */}
                  {pointsQ1.map((p, idx) => {
                    const next = pointsQ1[(idx + 1) % pointsQ1.length];
                    return (
                      <line
                        key={`seg-${p.id}`}
                        x1={p.x}
                        y1={p.y}
                        x2={next.x}
                        y2={next.y}
                        stroke="#047857"
                        strokeWidth="2.5"
                      />
                    );
                  })}

                  {/* Four Draggable Vertices */}
                  {pointsQ1.map((pt) => {
                    const isDragging = draggedPoint === pt.id;
                    return (
                      <g
                        key={pt.id}
                        onMouseDown={() => setDraggedPoint(pt.id)}
                        onTouchStart={() => setDraggedPoint(pt.id)}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        {/* Glow halo */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isDragging ? 18 : 12}
                          fill="#10b981"
                          fillOpacity={isDragging ? 0.35 : 0.15}
                          className="transition-all"
                        />
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isDragging ? 8 : 6}
                          fill="#065f46"
                          stroke="#ffffff"
                          strokeWidth="2.5"
                        />
                        <text
                          x={pt.x > 170 ? pt.x + 12 : pt.x - 18}
                          y={pt.y > 120 ? pt.y + 16 : pt.y - 10}
                          fontSize="15"
                          fontWeight="bold"
                          fill="#065f46"
                          className="font-mono dark:fill-emerald-300"
                        >
                          {pt.id}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Preset Controls */}
                <div className="flex flex-wrap gap-2 pt-2 border-t w-full justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      setPointsQ1([
                        { id: "A", x: 60, y: 70 },
                        { id: "B", x: 280, y: 50 },
                        { id: "C", x: 230, y: 190 },
                        { id: "D", x: 80, y: 180 },
                      ])
                    }
                    className="px-2.5 py-1 text-xs rounded-lg border bg-background hover:bg-muted font-medium transition"
                  >
                    Reset Shape
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPointsQ1([
                        { id: "A", x: 70, y: 50 },
                        { id: "B", x: 250, y: 50 },
                        { id: "C", x: 290, y: 190 },
                        { id: "D", x: 50, y: 190 },
                      ])
                    }
                    className="px-2.5 py-1 text-xs rounded-lg border bg-background hover:bg-muted font-medium transition"
                  >
                    Trapezium
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPointsQ1([
                        { id: "A", x: 160, y: 35 },
                        { id: "B", x: 270, y: 110 },
                        { id: "C", x: 160, y: 205 },
                        { id: "D", x: 60, y: 110 },
                      ])
                    }
                    className="px-2.5 py-1 text-xs rounded-lg border bg-background hover:bg-muted font-medium transition"
                  >
                    Kite / Rhombus
                  </button>
                </div>
              </div>

              {/* Question 1 answer input */}
              <div className="md:col-span-5 space-y-4">
                <div className="p-4 rounded-xl bg-background border space-y-2.5 shadow-sm">
                  <label className="text-xs font-bold text-foreground flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span>🏷️</span>
                      <span>Name the quadrilateral formed by joining A, B, C, D:</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                      +1 pt
                    </span>
                  </label>
                  <Field
                    id="q1_name_quad"
                    placeholder="e.g. Quadrilateral ABCD"
                    correct={CORRECT.q1_name_quad}
                  />
                  <p className="text-[11px] text-muted-foreground leading-normal">
                    Tip: Vertices can be named cyclically:{" "}
                    <span className="font-mono font-semibold">ABCD</span>,{" "}
                    <span className="font-mono font-semibold">BCDA</span>,{" "}
                    <span className="font-mono font-semibold">CDAB</span>, or{" "}
                    <span className="font-mono font-semibold">DABC</span>.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-100/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                  <span className="font-bold block">💡 Key Geometric Rule:</span>
                  <span>
                    To form a quadrilateral, no three of the four points may be collinear
                    (lying in a straight line). Joining them sequentially forms a 4-sided
                    closed polygon.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────
              QUESTION 2: PQRS QUADRILATERAL & PROPERTIES
          ──────────────────────────────────────────── */}
          <div className="rounded-2xl border border-teal-200 dark:border-teal-800/60 bg-teal-50/30 dark:bg-teal-950/20 p-5 space-y-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-teal-700 text-white font-bold text-sm">
                2
              </span>
              <div>
                <p className="font-semibold text-teal-950 dark:text-teal-100 text-base pt-0.5">
                  <span className="font-mono font-bold">PQRS</span> is a Quadrilateral. Answer the following:
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Click any helper button below to visually highlight opposite or adjacent sides/angles on the diagram.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Subquestions Inputs */}
              <div className="md:col-span-7 space-y-4">
                {/* i) Opposite side of QR */}
                <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 text-xs flex items-center justify-center font-bold">
                        i
                      </span>
                      <span>
                        The opposite side of <Seg>QR</Seg> is:
                      </span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-semibold">
                        +1 pt
                      </span>
                      <button
                        type="button"
                        onClick={() => setQ2Highlight(q2Highlight === "opp_sides" ? null : "opp_sides")}
                        className={`text-[11px] px-2 py-0.5 rounded border transition ${
                          q2Highlight === "opp_sides"
                            ? "bg-teal-700 text-white border-teal-800"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {q2Highlight === "opp_sides" ? "Hide" : "Highlight"}
                      </button>
                    </div>
                  </div>
                  <div className="max-w-xs">
                    <Field
                      id="q2_opp_side_qr"
                      placeholder="e.g. PS or SP"
                      correct={CORRECT.q2_opp_side_qr}
                    />
                  </div>
                </div>

                {/* ii) Angle opposite to ∠P */}
                <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 text-xs flex items-center justify-center font-bold">
                        ii
                      </span>
                      <span>
                        The angle opposite to <Ang>P</Ang> is:
                      </span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-semibold">
                        +1 pt
                      </span>
                      <button
                        type="button"
                        onClick={() => setQ2Highlight(q2Highlight === "opp_angles" ? null : "opp_angles")}
                        className={`text-[11px] px-2 py-0.5 rounded border transition ${
                          q2Highlight === "opp_angles"
                            ? "bg-teal-700 text-white border-teal-800"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {q2Highlight === "opp_angles" ? "Hide" : "Highlight"}
                      </button>
                    </div>
                  </div>
                  <div className="max-w-xs">
                    <Field
                      id="q2_opp_angle_p"
                      placeholder="e.g. ∠R or R"
                      correct={CORRECT.q2_opp_angle_p}
                    />
                  </div>
                </div>

                {/* iii) Adjacent sides of PQ */}
                <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 text-xs flex items-center justify-center font-bold">
                        iii
                      </span>
                      <span>
                        The adjacent sides of <Seg>PQ</Seg> are:
                      </span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-semibold">
                        +2 pts
                      </span>
                      <button
                        type="button"
                        onClick={() => setQ2Highlight(q2Highlight === "adj_sides" ? null : "adj_sides")}
                        className={`text-[11px] px-2 py-0.5 rounded border transition ${
                          q2Highlight === "adj_sides"
                            ? "bg-teal-700 text-white border-teal-800"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {q2Highlight === "adj_sides" ? "Hide" : "Highlight"}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <Field
                      id="q2_adj_side_1"
                      placeholder="Side 1 (e.g. SP)"
                      correct={CORRECT.q2_adj_side_1}
                      width="flex-1"
                    />
                    <span className="text-xs font-semibold text-muted-foreground">and</span>
                    <Field
                      id="q2_adj_side_2"
                      placeholder="Side 2 (e.g. QR)"
                      correct={CORRECT.q2_adj_side_2}
                      width="flex-1"
                    />
                  </div>
                </div>

                {/* iv) Adjacent angles of ∠S */}
                <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 text-xs flex items-center justify-center font-bold">
                        iv
                      </span>
                      <span>
                        The adjacent angles of <Ang>S</Ang> are:
                      </span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-semibold">
                        +2 pts
                      </span>
                      <button
                        type="button"
                        onClick={() => setQ2Highlight(q2Highlight === "adj_angles" ? null : "adj_angles")}
                        className={`text-[11px] px-2 py-0.5 rounded border transition ${
                          q2Highlight === "adj_angles"
                            ? "bg-teal-700 text-white border-teal-800"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {q2Highlight === "adj_angles" ? "Hide" : "Highlight"}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <Field
                      id="q2_adj_angle_1"
                      placeholder="Angle 1 (e.g. ∠P)"
                      correct={CORRECT.q2_adj_angle_1}
                      width="flex-1"
                    />
                    <span className="text-xs font-semibold text-muted-foreground">and</span>
                    <Field
                      id="q2_adj_angle_2"
                      placeholder="Angle 2 (e.g. ∠R)"
                      correct={CORRECT.q2_adj_angle_2}
                      width="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* SVG Quadrilateral PQRS Diagram */}
              <div className="md:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border p-4 flex flex-col items-center gap-3 shadow-sm">
                <div className="text-xs font-semibold text-teal-800 dark:text-teal-300">
                  Quadrilateral PQRS
                </div>

                <svg viewBox="0 0 260 210" className="w-full max-w-[240px] h-auto">
                  {/* Fill */}
                  <polygon
                    points="50,60 190,45 220,165 40,150"
                    fill="#0f766e"
                    fillOpacity="0.08"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                  />

                  {/* Sides */}
                  {/* Side SP (Top) */}
                  <line
                    x1="50"
                    y1="60"
                    x2="190"
                    y2="45"
                    stroke={
                      q2Highlight === "opp_sides" || q2Highlight === "adj_sides"
                        ? "#dc2626"
                        : "#0f766e"
                    }
                    strokeWidth={
                      q2Highlight === "opp_sides" || q2Highlight === "adj_sides"
                        ? "4"
                        : "2.5"
                    }
                  />
                  {/* Side QR (Bottom) */}
                  <line
                    x1="40"
                    y1="150"
                    x2="220"
                    y2="165"
                    stroke={
                      q2Highlight === "opp_sides" || q2Highlight === "adj_sides"
                        ? "#2563eb"
                        : "#0f766e"
                    }
                    strokeWidth={
                      q2Highlight === "opp_sides" || q2Highlight === "adj_sides"
                        ? "4"
                        : "2.5"
                    }
                  />
                  {/* Side PQ (Left) */}
                  <line
                    x1="50"
                    y1="60"
                    x2="40"
                    y2="150"
                    stroke={q2Highlight === "adj_sides" ? "#d97706" : "#0f766e"}
                    strokeWidth={q2Highlight === "adj_sides" ? "4.5" : "2.5"}
                  />
                  {/* Side RS (Right) */}
                  <line
                    x1="190"
                    y1="45"
                    x2="220"
                    y2="165"
                    stroke="#0f766e"
                    strokeWidth="2.5"
                  />

                  {/* Vertices & Angles */}
                  {/* Vertex P (Top-left) */}
                  <circle
                    cx="50"
                    cy="60"
                    r={q2Highlight === "opp_angles" || q2Highlight === "adj_angles" ? 7 : 5}
                    fill={q2Highlight === "opp_angles" ? "#dc2626" : "#0f766e"}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x="30"
                    y="55"
                    fontSize="15"
                    fontWeight="bold"
                    fill="#0f766e"
                    className="dark:fill-teal-300"
                  >
                    P
                  </text>

                  {/* Vertex S (Top-right) */}
                  <circle
                    cx="190"
                    cy="45"
                    r={q2Highlight === "adj_angles" ? 7 : 5}
                    fill={q2Highlight === "adj_angles" ? "#7c3aed" : "#0f766e"}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x="200"
                    y="42"
                    fontSize="15"
                    fontWeight="bold"
                    fill="#0f766e"
                    className="dark:fill-teal-300"
                  >
                    S
                  </text>

                  {/* Vertex R (Bottom-right) */}
                  <circle
                    cx="220"
                    cy="165"
                    r={q2Highlight === "opp_angles" || q2Highlight === "adj_angles" ? 7 : 5}
                    fill={q2Highlight === "opp_angles" ? "#2563eb" : "#0f766e"}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x="230"
                    y="175"
                    fontSize="15"
                    fontWeight="bold"
                    fill="#0f766e"
                    className="dark:fill-teal-300"
                  >
                    R
                  </text>

                  {/* Vertex Q (Bottom-left) */}
                  <circle
                    cx="40"
                    cy="150"
                    r="5"
                    fill="#0f766e"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x="22"
                    y="165"
                    fontSize="15"
                    fontWeight="bold"
                    fill="#0f766e"
                    className="dark:fill-teal-300"
                  >
                    Q
                  </text>
                </svg>

                {/* Diagram Legend */}
                <div className="text-[11px] text-muted-foreground text-center flex flex-wrap justify-center gap-x-3 gap-y-1">
                  <span>Sides: <Seg>PQ</Seg>, <Seg>QR</Seg>, <Seg>RS</Seg>, <Seg>SP</Seg></span>
                  <span>•</span>
                  <span>Angles: <Ang>P</Ang>, <Ang>Q</Ang>, <Ang>R</Ang>, <Ang>S</Ang></span>
                </div>
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────
              QUESTION 3: REGIONS & POINTS MARKED IN FIGURE
          ──────────────────────────────────────────── */}
          <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/30 dark:bg-indigo-950/20 p-5 space-y-5">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-sm">
                3
              </span>
              <div>
                <p className="font-semibold text-indigo-950 dark:text-indigo-100 text-base pt-0.5">
                  Name the points marked in the figure:
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Classify points into the interior, boundary, or exterior of the quadrilateral.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Subquestions */}
              <div className="md:col-span-7 space-y-4">
                {/* i) Interior */}
                <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-center font-bold">
                        i
                      </span>
                      <span>The points in the <strong>interior</strong> of Quadrilateral:</span>
                    </label>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                      +1 pt
                    </span>
                  </div>
                  <Field
                    id="q3_interior"
                    placeholder="e.g. S, R"
                    correct={CORRECT.q3_interior}
                    sortChars
                  />
                </div>

                {/* ii) Boundary */}
                <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs flex items-center justify-center font-bold">
                        ii
                      </span>
                      <span>The points on the <strong>boundary</strong> of Quadrilateral:</span>
                    </label>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold">
                      +1 pt
                    </span>
                  </div>
                  <Field
                    id="q3_boundary"
                    placeholder="e.g. A, B, C, D, E"
                    correct={CORRECT.q3_boundary}
                    sortChars
                  />
                </div>

                {/* iii) Exterior */}
                <div className="p-3.5 rounded-xl bg-background border space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 text-xs flex items-center justify-center font-bold">
                        iii
                      </span>
                      <span>The points in the <strong>exterior</strong> of Quadrilateral:</span>
                    </label>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 font-semibold">
                      +1 pt
                    </span>
                  </div>
                  <Field
                    id="q3_exterior"
                    placeholder="e.g. T, P, Q"
                    correct={CORRECT.q3_exterior}
                    sortChars
                  />
                </div>
              </div>

              {/* SVG Quadrilateral with interior/boundary/exterior points */}
              <div className="md:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border p-4 flex flex-col items-center gap-3 shadow-sm">
                {/* Region Filter Buttons */}
                <div className="flex flex-wrap gap-1.5 justify-center w-full pb-2 border-b">
                  {[
                    { id: "all", label: "All Points" },
                    { id: "interior", label: "Interior (S, R)" },
                    { id: "boundary", label: "Boundary (A, B, C, D, E)" },
                    { id: "exterior", label: "Exterior (T, P, Q)" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => setQ3Filter(btn.id as any)}
                      className={`text-[10px] px-2 py-1 rounded-md font-medium transition ${
                        q3Filter === btn.id
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                <svg viewBox="0 0 260 210" className="w-full max-w-[240px] h-auto select-none">
                  {/* Quadrilateral Boundary and Region */}
                  {/* Vertices: C(130, 40), B(200, 105), E(130, 165), D(60, 105) */}
                  <polygon
                    points="130,40 200,105 130,165 60,105"
                    fill={q3Filter === "interior" ? "#10b981" : "#6366f1"}
                    fillOpacity={q3Filter === "interior" ? 0.35 : 0.12}
                    stroke={q3Filter === "boundary" ? "#f59e0b" : "#4f46e5"}
                    strokeWidth={q3Filter === "boundary" ? "4" : "2"}
                    strokeLinejoin="round"
                  />

                  {/* Boundary points */}
                  {/* Top vertex C */}
                  <circle
                    cx="130"
                    cy="40"
                    r={q3Filter === "boundary" ? 6 : 4}
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <text x="130" y="30" fontSize="13" fontWeight="bold" fill="#b45309" textAnchor="middle">
                    C
                  </text>

                  {/* Right vertex B */}
                  <circle
                    cx="200"
                    cy="105"
                    r={q3Filter === "boundary" ? 6 : 4}
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <text x="214" y="110" fontSize="13" fontWeight="bold" fill="#b45309">
                    B
                  </text>

                  {/* Bottom vertex E */}
                  <circle
                    cx="130"
                    cy="165"
                    r={q3Filter === "boundary" ? 6 : 4}
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <text x="130" y="182" fontSize="13" fontWeight="bold" fill="#b45309" textAnchor="middle">
                    E
                  </text>

                  {/* Left vertex D */}
                  <circle
                    cx="60"
                    cy="105"
                    r={q3Filter === "boundary" ? 6 : 4}
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <text x="44" y="110" fontSize="13" fontWeight="bold" fill="#b45309">
                    D
                  </text>

                  {/* Point A on the boundary (side CD) */}
                  <circle
                    cx="95"
                    cy="72"
                    r={q3Filter === "boundary" ? 6 : 4}
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <text x="80" y="66" fontSize="13" fontWeight="bold" fill="#b45309">
                    A
                  </text>

                  {/* Interior points: S and R */}
                  <circle
                    cx="105"
                    cy="110"
                    r={q3Filter === "interior" ? 7 : 4.5}
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all"
                  />
                  <text x="96" y="126" fontSize="13" fontWeight="bold" fill="#047857">
                    S
                  </text>

                  <circle
                    cx="155"
                    cy="105"
                    r={q3Filter === "interior" ? 7 : 4.5}
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all"
                  />
                  <text x="162" y="105" fontSize="13" fontWeight="bold" fill="#047857">
                    R
                  </text>

                  {/* Exterior points: T, P, Q */}
                  {/* Point T above */}
                  <circle
                    cx="110"
                    cy="18"
                    r={q3Filter === "exterior" ? 7 : 4.5}
                    fill="#0284c7"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text x="118" y="20" fontSize="13" fontWeight="bold" fill="#0369a1">
                    T
                  </text>

                  {/* Point P right of C */}
                  <circle
                    cx="205"
                    cy="45"
                    r={q3Filter === "exterior" ? 7 : 4.5}
                    fill="#0284c7"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text x="214" y="47" fontSize="13" fontWeight="bold" fill="#0369a1">
                    P
                  </text>

                  {/* Point Q below left */}
                  <circle
                    cx="95"
                    cy="185"
                    r={q3Filter === "exterior" ? 7 : 4.5}
                    fill="#0284c7"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text x="80" y="195" fontSize="13" fontWeight="bold" fill="#0369a1">
                    Q
                  </text>
                </svg>

                <div className="grid grid-cols-3 gap-1 w-full text-[10px] text-center">
                  <div className="p-1 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold">
                    Interior: S, R
                  </div>
                  <div className="p-1 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-semibold">
                    Boundary: A, B, C, D, E
                  </div>
                  <div className="p-1 rounded bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 font-semibold">
                    Exterior: T, P, Q
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          SECTION 4.10 CIRCLE
      ──────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-sky-600/40 bg-card overflow-hidden shadow-sm">
        {/* Section Heading Banner */}
        <div className="bg-gradient-to-r from-sky-800 via-teal-700 to-sky-800 text-white font-heading font-bold px-5 py-3.5 text-lg flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-white/20 backdrop-blur rounded-lg text-xl">
              ⭕
            </span>
            <span className="tracking-wide">4.10 Circle</span>
          </div>
          <span className="text-xs bg-sky-950/70 text-sky-200 px-3 py-1 rounded-full border border-sky-400/30">
            Geometry Concept
          </span>
        </div>

        <div className="p-5 sm:p-7 space-y-8 text-sm sm:text-base">
          {/* Real-World Circle Objects */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">👀</span>
              <h3 className="font-heading font-bold text-base sm:text-lg text-foreground">
                Look at the figures:
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Clock */}
              <div className="rounded-2xl border p-4 bg-card hover:shadow-md transition flex flex-col items-center gap-2 text-center group">
                <div className="w-28 h-28 relative flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                    {/* Clock Outer Rim */}
                    <circle cx="50" cy="50" r="46" fill="#f8fafc" stroke="#334155" strokeWidth="5" />
                    <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
                    {/* Hour Marks */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                      <line
                        key={deg}
                        x1="50"
                        y1="12"
                        x2="50"
                        y2="16"
                        stroke="#1e293b"
                        strokeWidth="2"
                        transform={`rotate(${deg} 50 50)`}
                      />
                    ))}
                    {/* Hands */}
                    <line x1="50" y1="50" x2="50" y2="24" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                    <line x1="50" y1="50" x2="72" y2="50" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="50" y1="50" x2="35" y2="68" stroke="#ef4444" strokeWidth="1" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="3.5" fill="#ef4444" />
                    {/* Twin top bells */}
                    <circle cx="28" cy="8" r="8" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
                    <circle cx="72" cy="8" r="8" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
                  </svg>
                </div>
                <span className="font-semibold text-xs sm:text-sm text-foreground">
                  Wall Clock
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Circular dial with center pivot
                </span>
              </div>

              {/* Cycle Wheel */}
              <div className="rounded-2xl border p-4 bg-card hover:shadow-md transition flex flex-col items-center gap-2 text-center group">
                <div className="w-28 h-28 relative flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                    {/* Tire and Rim */}
                    <circle cx="50" cy="50" r="46" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
                    <circle cx="50" cy="50" r="41" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="38" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                    {/* Spokes */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                      <line
                        key={deg}
                        x1="50"
                        y1="12"
                        x2="50"
                        y2="88"
                        stroke="#64748b"
                        strokeWidth="1.2"
                        transform={`rotate(${deg} 50 50)`}
                      />
                    ))}
                    {/* Hub (Center) */}
                    <circle cx="50" cy="50" r="9" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
                    <circle cx="50" cy="50" r="3.5" fill="#ffffff" />
                  </svg>
                </div>
                <span className="font-semibold text-xs sm:text-sm text-foreground">
                  Cycle Wheel
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Equal spokes radiating from centre
                </span>
              </div>

              {/* Bangle */}
              <div className="rounded-2xl border p-4 bg-card hover:shadow-md transition flex flex-col items-center gap-2 text-center group">
                <div className="w-28 h-28 relative flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                    {/* Ornate Gold Bangle */}
                    <circle cx="50" cy="50" r="44" fill="none" stroke="#d97706" strokeWidth="7" />
                    <circle cx="50" cy="50" r="44" fill="none" stroke="#fbbf24" strokeWidth="4" strokeDasharray="3,3" />
                    <circle cx="50" cy="50" r="47.5" fill="none" stroke="#92400e" strokeWidth="1" />
                    <circle cx="50" cy="50" r="40.5" fill="none" stroke="#92400e" strokeWidth="1" />
                    {/* Gems / studs */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                      <circle
                        key={deg}
                        cx="50"
                        cy="6"
                        r="2.5"
                        fill="#ef4444"
                        stroke="#ffffff"
                        strokeWidth="0.8"
                        transform={`rotate(${deg} 50 50)`}
                      />
                    ))}
                  </svg>
                </div>
                <span className="font-semibold text-xs sm:text-sm text-foreground">
                  Bangle
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Drawing along its edge gives a circle
                </span>
              </div>
            </div>

            {/* Activity explanation & real life example prompt */}
            <div className="rounded-2xl border bg-muted/30 p-5 space-y-3">
              <p className="leading-relaxed">
                Keep a bangle on a paper and draw along its boundary with pencil. You get
                a round shape. This will give you an idea of a circle. Such a round
                shaped figure is a <strong>circle</strong>.
              </p>

              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <span>❓</span>
                    <span>Can you think of some more examples of circular shapes from real life?</span>
                  </label>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 font-semibold">
                    +1 pt
                  </span>
                </div>
                <div className="max-w-md">
                  <Field
                    id="q_circle_real_life"
                    placeholder="e.g. Coin, Plate, CD, Wheel..."
                    correct={CORRECT.q_circle_real_life}
                    isOpen
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Circle Definitions & Radius Property */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="space-y-3">
                <p className="leading-relaxed">
                  Observe a cycle wheel and measure the length of each spoke. You might
                  conclude that the length of each spoke is the <strong>same</strong>.
                </p>

                {/* Key Concepts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl border bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 space-y-1">
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1">
                      <span>🎯</span> Centre (O)
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      The fixed point in the middle.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 space-y-1">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1">
                      <span>📏</span> Radius (r)
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      Distance from centre to any point on circle.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 space-y-1">
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1">
                      <span>🔄</span> Circumference
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      The total length of curved boundary edge.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border bg-background space-y-3 shadow-sm">
                <p className="text-xs sm:text-sm font-medium">
                  Observe the centre and each radius in the circle given in the figure:
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>
                    • <strong>O</strong> is the centre
                  </div>
                  <div>
                    • <Seg>OA</Seg>, <Seg>OB</Seg> and <Seg>OC</Seg> are radii of the circle
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                      <span>🤔</span>
                      <span>Are all the radii same?</span>
                    </label>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                      +1 pt
                    </span>
                  </div>
                  <div className="max-w-xs">
                    <Field
                      id="q_radii_same"
                      placeholder="Yes / No"
                      correct={CORRECT.q_radii_same}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Circle Radii Measurement Tool */}
            <div className="md:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border p-4 flex flex-col items-center gap-3 shadow-sm">
              <div className="w-full flex items-center justify-between text-xs text-muted-foreground border-b pb-1.5">
                <span className="font-semibold text-sky-800 dark:text-sky-300">
                  Interactive Circle & Radii
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                  Radius r = 4.0 cm
                </span>
              </div>

              <svg viewBox="0 0 240 240" className="w-full max-w-[230px] h-auto select-none">
                {/* Circumference Circle */}
                <circle
                  cx="120"
                  cy="120"
                  r="85"
                  fill="#0284c7"
                  fillOpacity="0.08"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                />

                {/* Circumference curved arrow label */}
                <path
                  d="M 120 25 A 95 95 0 0 1 195 65"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="1.5"
                  strokeDasharray="3,3"
                />
                <text x="175" y="42" fontSize="10" fill="#64748b" fontStyle="italic">
                  Circumference
                </text>

                {/* Fixed Radii: OA (Up-right, 30 deg), OB (Down-right, 140 deg), OC (Down-left, 220 deg) */}
                {/* Spoke OA */}
                <line x1="120" y1="120" x2="193" y2="77" stroke="#059669" strokeWidth="2.5" />
                <circle cx="193" cy="77" r="4.5" fill="#047857" stroke="#ffffff" strokeWidth="1.5" />
                <text x="204" y="80" fontSize="13" fontWeight="bold" fill="#047857">
                  A
                </text>

                {/* Spoke OB */}
                <line x1="120" y1="120" x2="185" y2="175" stroke="#059669" strokeWidth="2.5" />
                <circle cx="185" cy="175" r="4.5" fill="#047857" stroke="#ffffff" strokeWidth="1.5" />
                <text x="195" y="185" fontSize="13" fontWeight="bold" fill="#047857">
                  B
                </text>

                {/* Spoke OC */}
                <line x1="120" y1="120" x2="55" y2="175" stroke="#059669" strokeWidth="2.5" />
                <circle cx="55" cy="175" r="4.5" fill="#047857" stroke="#ffffff" strokeWidth="1.5" />
                <text x="40" y="185" fontSize="13" fontWeight="bold" fill="#047857">
                  C
                </text>

                {/* Dynamic Rotating Spoke P */}
                {(() => {
                  const rad = (spokeAngle * Math.PI) / 180;
                  const px = 120 + 85 * Math.cos(rad);
                  const py = 120 - 85 * Math.sin(rad);
                  return (
                    <g>
                      <line
                        x1="120"
                        y1="120"
                        x2={px}
                        y2={py}
                        stroke="#dc2626"
                        strokeWidth="2.5"
                        strokeDasharray="4,2"
                      />
                      <circle cx={px} cy={py} r="5.5" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                      <text
                        x={px > 120 ? px + 8 : px - 18}
                        y={py > 120 ? py + 14 : py - 6}
                        fontSize="12"
                        fontWeight="bold"
                        fill="#dc2626"
                      >
                        P
                      </text>
                    </g>
                  );
                })()}

                {/* Centre O */}
                <circle cx="120" cy="120" r="5.5" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
                <text x="110" y="112" fontSize="14" fontWeight="bold" fill="#0f172a" className="dark:fill-slate-100">
                  O
                </text>
              </svg>

              {/* Angle slider to test any point */}
              <div className="w-full space-y-1 pt-1 border-t">
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>Rotate probe point P:</span>
                  <span className="font-mono font-bold text-foreground">OP = 4.0 cm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={spokeAngle}
                  onChange={(e) => setSpokeAngle(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────
              ACTIVITY: FOLDING A CIRCLE
          ──────────────────────────────────────────── */}
          <div className="rounded-2xl border-2 border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20 p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">📖</span>
                <span className="font-heading font-bold text-emerald-900 dark:text-emerald-200 text-lg uppercase tracking-wider">
                  ACTIVITY
                </span>
              </div>
              <span className="text-xs bg-emerald-600 text-white font-bold px-3 py-1 rounded-full shadow-sm">
                Hands-on Math
              </span>
            </div>

            <p className="leading-relaxed text-sm sm:text-base">
              Draw a circle on a paper and cut it along its edge. Fold it into half
              and again fold it to one fourth to make folding marks as shown.
            </p>

            {/* Interactive 4-step folding illustrations */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { step: 1, title: "1. Full Circle", desc: "Cut paper circle" },
                  { step: 2, title: "2. Fold in Half", desc: "Semicircle" },
                  { step: 3, title: "3. Fold in 1/4th", desc: "Quarter circle" },
                  { step: 4, title: "4. Unfold", desc: "Center O revealed" },
                ].map((s) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setFoldingStep(s.step)}
                    className={`rounded-xl border p-2.5 text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                      foldingStep === s.step
                        ? "bg-emerald-600 text-white border-emerald-700 shadow-md scale-[1.02]"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-400"
                    }`}
                  >
                    <span className="font-bold text-xs">{s.title}</span>
                    <span className="text-[10px] opacity-80">{s.desc}</span>
                  </button>
                ))}
              </div>

              {/* Step Graphic Display */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border p-5 flex flex-col items-center justify-center min-h-[170px] shadow-sm">
                {foldingStep === 1 && (
                  <div className="flex flex-col items-center gap-2 animate-fadeIn">
                    <svg viewBox="0 0 140 140" className="w-32 h-32">
                      <circle cx="70" cy="70" r="60" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
                    </svg>
                    <span className="text-xs font-semibold text-muted-foreground">
                      Step 1: Circular paper disc
                    </span>
                  </div>
                )}

                {foldingStep === 2 && (
                  <div className="flex flex-col items-center gap-2 animate-fadeIn">
                    <svg viewBox="0 0 140 140" className="w-32 h-32">
                      {/* Semicircle */}
                      <path
                        d="M 70 10 A 60 60 0 0 1 70 130 Z"
                        fill="#facc15"
                        stroke="#ca8a04"
                        strokeWidth="3"
                      />
                      <line x1="70" y1="10" x2="70" y2="130" stroke="#b45309" strokeWidth="2" strokeDasharray="4,2" />
                    </svg>
                    <span className="text-xs font-semibold text-muted-foreground">
                      Step 2: Fold into half along the diameter
                    </span>
                  </div>
                )}

                {foldingStep === 3 && (
                  <div className="flex flex-col items-center gap-2 animate-fadeIn">
                    <svg viewBox="0 0 140 140" className="w-32 h-32">
                      {/* Quarter circle */}
                      <path
                        d="M 70 70 L 130 70 A 60 60 0 0 0 70 10 Z"
                        fill="#facc15"
                        stroke="#ca8a04"
                        strokeWidth="3"
                      />
                    </svg>
                    <span className="text-xs font-semibold text-muted-foreground">
                      Step 3: Fold again into one-fourth
                    </span>
                  </div>
                )}

                {foldingStep === 4 && (
                  <div className="flex flex-col items-center gap-2 animate-fadeIn">
                    <svg viewBox="0 0 140 140" className="w-32 h-32">
                      <circle cx="70" cy="70" r="60" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
                      {/* Perpendicular crease marks */}
                      <line x1="10" y1="70" x2="130" y2="70" stroke="#b45309" strokeWidth="2.5" strokeDasharray="4,3" />
                      <line x1="70" y1="10" x2="70" y2="130" stroke="#b45309" strokeWidth="2.5" strokeDasharray="4,3" />
                      {/* Centre O */}
                      <circle cx="70" cy="70" r="4.5" fill="#0f172a" />
                      <text x="76" y="66" fontSize="13" fontWeight="bold" fill="#0f172a">
                        O
                      </text>
                    </svg>
                    <span className="text-xs font-semibold text-muted-foreground">
                      Step 4: Unfold to find the Centre <strong>O</strong> at the crease intersection!
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Observation & Concluding Questions */}
            <div className="space-y-4 pt-2 border-t border-emerald-200 dark:border-emerald-800">
              <p className="leading-relaxed">
                You will observe a point in the middle. Mark this <strong>O</strong>. This is the{" "}
                <strong>centre of the circle</strong>. You can also indicate its radius.
              </p>

              <div className="p-4 rounded-xl bg-background border space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <span>❓</span>
                    <span>How many radii can you draw in a circle?</span>
                  </label>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                    +1 pt
                  </span>
                </div>
                <div className="max-w-md">
                  <Field
                    id="q_how_many_radii"
                    placeholder="e.g. Infinitely many / Countless"
                    correct={CORRECT.q_how_many_radii}
                    isOpen
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Since a circle consists of an infinite number of points on its boundary,
                  an infinite number of radii can be drawn from the centre to the boundary.
                </p>
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────
              PAGE SCORE SUMMARY FOOTER CARD
          ──────────────────────────────────────────── */}
          <div className="rounded-2xl border-2 border-emerald-300 dark:border-emerald-800/80 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold shadow-sm">
                ⭐
              </div>
              <div>
                <h4 className="font-heading font-bold text-foreground text-base">
                  Page 65 Score Summary
                </h4>
                <p className="text-xs text-muted-foreground">
                  {correctCount === ALL_INPUT_IDS.length
                    ? "🎉 Outstanding! You have successfully mastered all questions on Page 65!"
                    : correctCount > 0
                      ? `Great progress! ${correctCount} of ${ALL_INPUT_IDS.length} questions completed correctly.`
                      : "Answer the questions above or click 'Check Answers' to evaluate your work and earn points."}
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
      </div>
    </div>
  );
}
