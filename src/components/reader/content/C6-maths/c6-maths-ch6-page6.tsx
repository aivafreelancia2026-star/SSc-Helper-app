"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs (Book Page 78 / PDF Page 86-87)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  // Previous questions continuation
  "p86_ex_i",    // Go 7 steps up from the shop
  "p86_ex_ii",   // Go 3 steps down from the ground floor
  "p86_ex_iii",  // Go 5 steps up... and 3 steps further up
  "p86_ex_iv",   // Go 4 steps down... and further 3 steps
  "p86_ex_v",    // Go down 5 steps... and 10 steps up
  "p86_ex_vi",   // Go 8 steps up... and 9 steps down
  // Game section
  "p86_game_record", // "Have you observed the number lines?"
];

const CORRECT: Record<string, string[]> = {
  p86_ex_i: ["+7", "7", "+ 7", "7 steps up"],
  p86_ex_ii: ["-3", "- 3", "3 steps down", "minus 3"],
  p86_ex_iii: ["+8", "8", "+ 8", "8 steps up"],
  p86_ex_iv: ["-7", "- 7", "7 steps down"],
  p86_ex_v: ["+5", "5", "+ 5", "5 steps up"],
  p86_ex_vi: ["-1", "- 1", "1 step down", "minus 1"],
  p86_game_record: ["yes", "y", "number line", "observed", "right", "left", "positive", "negative"],
};

const REVEAL_TEXT: Record<string, string> = {
  p86_ex_i: "+7",
  p86_ex_ii: "-3",
  p86_ex_iii: "+8",
  p86_ex_iv: "-7",
  p86_ex_v: "+5",
  p86_ex_vi: "-1",
  p86_game_record: "Yes (points are recorded by moving left or right on the number line)",
};

const normalize = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/[°º]/g, "")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9\-+]/g, "");

function validateAnswer(id: string, raw: string): boolean {
  const v = normalize(raw);
  if (!v) return false;
  const accepted = CORRECT[id];
  if (!accepted) return v.length >= 2;
  return accepted.some((a) => {
    const na = normalize(a);
    return na === v || v.includes(na) || na.includes(v);
  });
}

/* ─────────────────────────────────────────────
   Styling helpers
───────────────────────────────────────────── */
function borderCls(
  id: string,
  answers: Record<string, string>,
  graded: Record<string, { value: string; correct: boolean }>,
  isRevealed: boolean
) {
  if (isRevealed)
    return "border-emerald-500 bg-emerald-50 font-bold text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300";
  const typed = (answers[id] ?? "").trim();
  if (!typed) return "border-slate-300 dark:border-slate-700 focus:border-indigo-500 bg-background";
  const g = graded[id];
  if (g?.correct === true)
    return "border-green-500 bg-green-50 text-green-700 font-bold dark:bg-green-950/30 dark:text-green-300";
  if (g?.correct === false)
    return "border-red-400 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400";
  return "border-slate-300 dark:border-slate-700 focus:border-indigo-500 bg-background";
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

/* ─────────────────────────────────────────────
   Shared Field Component
───────────────────────────────────────────── */
function Field({
  id,
  placeholder,
  answers,
  graded,
  isRevealed,
  handleChange,
  handleBlur,
  isOpen = false,
  className = "",
  multiLine = false,
}: {
  id: string;
  placeholder: string;
  answers: Record<string, string>;
  graded: Record<string, { value: string; correct: boolean }>;
  isRevealed: boolean;
  handleChange: (id: string, val: string) => void;
  handleBlur: (id: string, isOpen?: boolean) => void;
  isOpen?: boolean;
  className?: string;
  multiLine?: boolean;
}) {
  const displayVal = isRevealed ? REVEAL_TEXT[id] ?? "" : answers[id] ?? "";
  const baseCls = `w-full rounded-xl border px-3 py-2 text-xs sm:text-sm font-mono outline-none transition-all shadow-sm resize-none ${borderCls(
    id,
    answers,
    graded,
    isRevealed
  )}`;

  if (multiLine) {
    return (
      <div className={`relative w-full ${className}`}>
        <textarea
          id={`field-${id}`}
          rows={2}
          placeholder={placeholder}
          value={displayVal}
          onChange={(e) => handleChange(id, e.target.value)}
          onBlur={() => handleBlur(id, isOpen)}
          disabled={isRevealed}
          className={baseCls}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="text"
        id={`field-${id}`}
        placeholder={placeholder}
        value={displayVal}
        onChange={(e) => handleChange(id, e.target.value)}
        onBlur={() => handleBlur(id, isOpen)}
        disabled={isRevealed}
        className={`${baseCls} pr-7`}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleBlur(id, isOpen);
            e.currentTarget.blur();
          }
        }}
      />
      <StatusIcon id={id} answers={answers} graded={graded} isRevealed={isRevealed} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Interactive Caps Game Component
───────────────────────────────────────────── */
function BottleCapsGame() {
  // caps array, true = +1, false = -1
  const [caps, setCaps] = useState<{ id: number; isPositive: boolean; removed: boolean }[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [points, setPoints] = useState<number | null>(null);

  const startThrow = () => {
    const newCaps = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      isPositive: Math.random() > 0.5,
      removed: false,
    }));
    setCaps(newCaps);
    setSelectedIds([]);
    setIsPlaying(true);
    setPoints(null);
  };

  const handleSelect = (id: number) => {
    if (!isPlaying) return;
    const cap = caps.find((c) => c.id === id);
    if (!cap || cap.removed) return;

    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selId) => selId !== id));
      return;
    }

    if (selectedIds.length === 1) {
      const firstId = selectedIds[0];
      const firstCap = caps.find((c) => c.id === firstId);
      if (firstCap && firstCap.isPositive !== cap.isPositive) {
        // Match found! Remove both
        setCaps((prev) =>
          prev.map((c) => (c.id === id || c.id === firstId ? { ...c, removed: true } : c))
        );
        setSelectedIds([]);
      } else {
        // Switch selection or do nothing
        setSelectedIds([id]);
      }
    } else {
      setSelectedIds([id]);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const activeCaps = caps.filter((c) => !c.removed);
      const positives = activeCaps.filter((c) => c.isPositive).length;
      const negatives = activeCaps.filter((c) => !c.isPositive).length;
      if (positives === 0 || negatives === 0) {
        // Game round over, calculate points
        setPoints(positives > 0 ? positives : -negatives);
        setIsPlaying(false);
      }
    }
  }, [caps, isPlaying]);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 my-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-400 mb-1">
            Bottle Caps Game Simulator
          </h3>
          <p className="text-sm text-muted-foreground">
            Throw 10 caps, then select pairs of (+1) and (-1) to remove them.
          </p>
        </div>
        <button
          onClick={startThrow}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all active:scale-95 shadow-sm text-sm shrink-0"
        >
          {caps.length === 0 ? "Throw Caps 🎲" : "Re-throw Caps 🎲"}
        </button>
      </div>

      {caps.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 min-h-32 p-4 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
            {caps.map((cap) => {
              if (cap.removed) return <div key={cap.id} className="w-12 h-12 sm:w-16 sm:h-16" />;
              const isSelected = selectedIds.includes(cap.id);
              
              return (
                <button
                  key={cap.id}
                  onClick={() => handleSelect(cap.id)}
                  disabled={!isPlaying}
                  className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-bold font-mono transition-all duration-300 ${
                    cap.isPositive
                      ? "bg-teal-500 text-white border-2 border-teal-700 shadow-md"
                      : "bg-white text-rose-600 border-2 border-rose-500 shadow-md"
                  } ${isSelected ? "ring-4 ring-indigo-400 scale-110" : "hover:scale-105"}
                  ${!isPlaying ? "opacity-75 cursor-default" : "cursor-pointer"}`}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="absolute inset-0 rounded-full border-4 border-black/10 m-1 pointer-events-none" />
                  <span className="z-10 text-lg sm:text-2xl drop-shadow-sm">
                    {cap.isPositive ? "+1" : "-1"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-center">
            {points !== null ? (
              <div className="inline-flex flex-col items-center p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
                <span className="text-sm font-semibold text-muted-foreground mb-1">Final Points</span>
                <span className={`text-4xl font-black font-heading ${points > 0 ? "text-teal-600" : points < 0 ? "text-rose-600" : "text-slate-600"}`}>
                  {points > 0 ? `+${points}` : points}
                </span>
                <p className="text-xs text-indigo-700/80 dark:text-indigo-300 mt-2">
                  {points > 0 ? `${points} caps left facing up!` : points < 0 ? `${Math.abs(points)} caps left facing down!` : "No caps left!"}
                </p>
              </div>
            ) : (
              <p className="text-indigo-600 dark:text-indigo-400 font-medium animate-pulse">
                Click a +1 and a -1 cap to form a pair and remove them!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function C6MathsCh6Page6() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch6-page6";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<Record<string, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; label?: string; id: number } | null>(null);

  const answeredCount = ALL_INPUT_IDS.filter((id) => (answers[id] ?? "").trim().length > 0).length;
  const correctCount = ALL_INPUT_IDS.filter((id) => graded[id]?.correct === true).length;

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
      localStorage.removeItem(`${storageKey}-reveal-awarded`);
      setAnswers({});
      setGraded({});
      setFeedback(null);
      setShowReveal(false);
    };
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () => window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, [storageKey]);

  const handleResetPage = () => {
    ALL_INPUT_IDS.forEach((id) => {
      localStorage.removeItem(`${storageKey}-${id}-answer`);
      localStorage.removeItem(`${storageKey}-${id}-graded`);
    });
    localStorage.removeItem(`${storageKey}-reveal-awarded`);
    setAnswers({});
    setGraded({});
    setFeedback(null);
    setShowReveal(false);
  };

  const handleToggleReveal = () => {
    const next = !showReveal;
    setShowReveal(next);
    if (next) {
      const revealKey = `${storageKey}-reveal-awarded`;
      if (!localStorage.getItem(revealKey)) {
        addPoints(1);
        localStorage.setItem(revealKey, "1");
        setFeedback({ correct: true, label: "Answers Revealed! +1 pt", id: Date.now() });
      }
    }
  };

  const handleCheckAll = () => {
    if (isRevealed) return;
    let delta = 0;
    const newGraded = { ...graded };
    ALL_INPUT_IDS.forEach((id) => {
      const rawTyped = answers[id] ?? "";
      if (!rawTyped.trim()) return;
      const correct = validateAnswer(id, rawTyped);
      const prev = graded[id];
      if (prev) {
        if (!prev.correct && correct) delta += 2;
        else if (prev.correct && !correct) delta -= 2;
      } else {
        delta += correct ? 1 : -1;
      }
      newGraded[id] = { value: rawTyped, correct };
      localStorage.setItem(`${storageKey}-${id}-graded`, JSON.stringify({ value: rawTyped, correct }));
    });
    if (delta !== 0) addPoints(delta);
    setGraded(newGraded);
    setFeedback({ correct: delta >= 0, label: delta >= 0 ? `Scored! +${delta} pts` : `Reviewed!`, id: Date.now() });
  };

  const handleChange = (id: string, val: string) => {
    if (isRevealed) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
    localStorage.setItem(`${storageKey}-${id}-answer`, val);
  };

  const handleBlur = (id: string, isOpen = false) => {
    if (isRevealed) return;
    const rawTyped = answers[id] ?? "";
    if (!rawTyped.trim()) return;
    const prev = graded[id];
    if (prev && prev.value === rawTyped) return;
    const correct = isOpen ? rawTyped.trim().length >= 2 : validateAnswer(id, rawTyped);
    let delta = 0;
    if (prev) {
      if (!prev.correct && correct) delta = 2;
      else if (prev.correct && !correct) delta = -2;
    } else {
      delta = correct ? 1 : -1;
    }
    if (delta !== 0) addPoints(delta);
    setFeedback({ correct, label: correct ? "Correct! +1 pt" : "Try Again! -1 pt", id: Date.now() });
    const next = { ...graded, [id]: { value: rawTyped, correct } };
    setGraded(next);
    localStorage.setItem(`${storageKey}-${id}-graded`, JSON.stringify({ value: rawTyped, correct }));
  };

  const fp = { answers, graded, isRevealed, handleChange, handleBlur };

  return (
    <div className="space-y-8 text-foreground leading-relaxed font-body max-w-5xl mx-auto pb-12">
      {feedback && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          label={feedback.label || "Correct! +1 pt"}
          wrongLabel={feedback.label || "Try Again! -1 pt"}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* ══════════════════════════════════════
          PAGE HEADER
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-indigo-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-indigo-800 via-blue-700 to-indigo-800 text-white font-heading font-bold px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-white/20 text-xl font-black px-4">6.6</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">Addition & Subtraction of Integers</h1>
              <p className="text-xs text-indigo-100 font-normal">
                Class 6 Maths &bull; Chapter 6 &bull; Integers
              </p>
            </div>
          </div>
          <span className="text-xs bg-indigo-950/80 text-indigo-200 px-3 py-1 rounded-full border border-indigo-400/30 font-mono self-start sm:self-auto font-bold">
            Page 78 (PDF P86)
          </span>
        </div>

        {/* Score & Action Bar */}
        <div className="bg-indigo-50/80 dark:bg-indigo-950/30 border-b border-indigo-200 dark:border-indigo-800/60 p-4 px-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700/60 rounded-xl px-3.5 py-1.5">
              <span className="text-base">⭐</span>
              <span className="text-xs font-semibold text-muted-foreground">Total Points:</span>
              <span className="font-heading font-bold text-indigo-700 dark:text-indigo-300 text-sm">{score}</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700/60 rounded-xl px-3.5 py-1.5">
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
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-semibold text-xs transition-colors cursor-pointer active:scale-95 flex items-center gap-1.5"
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
                  : "bg-white dark:bg-slate-800 text-foreground border-slate-300 dark:border-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>{isRevealed ? "🙈" : "👁️"}</span>
              <span>{isRevealed ? "Hide Key" : "Reveal Answers"}</span>
            </button>
            <button
              type="button"
              onClick={handleResetPage}
              className="px-3 py-1.5 rounded-xl border border-red-300 dark:border-red-800/60 bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 hover:bg-red-50 text-xs font-heading font-semibold transition-colors cursor-pointer"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm text-foreground/90 leading-relaxed">
        
        {/* Previous page questions continued */}
        <div className="space-y-4">
          <p className="font-semibold text-foreground italic text-muted-foreground border-b border-border pb-3">
            (Continued from previous page...)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* (i) */}
            <div className="flex flex-col gap-2 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-border">
              <div className="flex items-start gap-2">
                <span className="font-bold text-indigo-700 dark:text-indigo-400 w-8 shrink-0">(i)</span>
                <span className="text-sm font-medium leading-relaxed">Go 7 steps up from the shop.</span>
              </div>
              <div className="w-full mt-1">
                <Field id="p86_ex_i" placeholder="e.g. +7" {...fp} />
              </div>
            </div>

            {/* (ii) */}
            <div className="flex flex-col gap-2 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-border">
              <div className="flex items-start gap-2">
                <span className="font-bold text-indigo-700 dark:text-indigo-400 w-8 shrink-0">(ii)</span>
                <span className="text-sm font-medium leading-relaxed">Go 3 steps down from the ground floor.</span>
              </div>
              <div className="w-full mt-1">
                <Field id="p86_ex_ii" placeholder="e.g. -3" {...fp} />
              </div>
            </div>

            {/* (iii) */}
            <div className="flex flex-col gap-2 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-border">
              <div className="flex items-start gap-2">
                <span className="font-bold text-indigo-700 dark:text-indigo-400 w-8 shrink-0">(iii)</span>
                <span className="text-sm font-medium leading-relaxed">Go 5 steps up from the ground floor and then go 3 steps further up from there.</span>
              </div>
              <div className="w-full mt-1">
                <Field id="p86_ex_iii" placeholder="e.g. +8" {...fp} />
              </div>
            </div>

            {/* (iv) */}
            <div className="flex flex-col gap-2 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-border">
              <div className="flex items-start gap-2">
                <span className="font-bold text-indigo-700 dark:text-indigo-400 w-8 shrink-0">(iv)</span>
                <span className="text-sm font-medium leading-relaxed">Go 4 steps down from the ground floor and then further 3 steps from there.</span>
              </div>
              <div className="w-full mt-1">
                <Field id="p86_ex_iv" placeholder="e.g. -7" {...fp} />
              </div>
            </div>

            {/* (v) */}
            <div className="flex flex-col gap-2 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-border">
              <div className="flex items-start gap-2">
                <span className="font-bold text-indigo-700 dark:text-indigo-400 w-8 shrink-0">(v)</span>
                <span className="text-sm font-medium leading-relaxed">Go down 5 steps from the ground floor and 10 steps up from there.</span>
              </div>
              <div className="w-full mt-1">
                <Field id="p86_ex_v" placeholder="e.g. +5" {...fp} />
              </div>
            </div>

            {/* (vi) */}
            <div className="flex flex-col gap-2 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-border">
              <div className="flex items-start gap-2">
                <span className="font-bold text-indigo-700 dark:text-indigo-400 w-8 shrink-0">(vi)</span>
                <span className="text-sm font-medium leading-relaxed">Go 8 steps up from the ground floor and come down 9 steps from there.</span>
              </div>
              <div className="w-full mt-1">
                <Field id="p86_ex_vi" placeholder="e.g. -1" {...fp} />
              </div>
            </div>
            
          </div>
          
          <div className="bg-indigo-50/50 dark:bg-indigo-950/20 px-4 py-3 rounded-xl border border-indigo-100 dark:border-indigo-900/50 mt-2 text-sm text-indigo-800 dark:text-indigo-300 italic flex items-center gap-2">
            <span>💡</span> Check your answers with your friend and discuss.
          </div>
        </div>

        {/* Section 6.6 */}
        <div className="space-y-6 pt-6 border-t-2 border-indigo-100 dark:border-indigo-900/40">
          <div className="inline-block px-4 py-1.5 bg-indigo-600 text-white font-bold rounded-lg uppercase tracking-wider text-sm shadow-sm">
            6.6 Addition and Subtraction of Integers
          </div>

          <h3 className="text-xl font-bold font-heading text-foreground mt-4 mb-2">Play a Game</h3>
          
          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
            <p>
              Take 10 identical caps of cool drink bottle. These bottle caps can be placed downwards and upwards. Consider the top side of the cap to be (<code className="font-bold text-teal-600">+1</code>) and the bottom side to be (<code className="font-bold text-rose-600">-1</code>).
            </p>
            <p>
              Ask your friend to throw 10 caps in a single move after shaking them vigorously. Look at the way the 10 caps lie. Which side of the cap is showing? Consider one up (<code className="font-bold text-teal-600">+1</code>) and one down (<code className="font-bold text-rose-600">-1</code>) to be a pair. Remove all the pairs like <strong>(+1) and (-1)</strong>. Are the remaining caps up or down? Count these caps.
            </p>
            <p>
              If there were 4 pairs made, two caps are left. As in the example below if these face up then it is <strong>+2 points</strong>. If 3 pairs are formed and 4 caps are left facing down, then the points are <strong>-4</strong>.
            </p>
          </div>

          {/* Interactive Game! */}
          <BottleCapsGame />

          <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-5 rounded-r-xl space-y-4">
            <p className="text-sm font-semibold">
              Record the points in your note book using a number line. You can continue to play till any one of you get 10 points and wins the game.
            </p>
            
            {/* Diagram simulation (static visual) */}
            <div className="flex flex-col md:flex-row gap-6 py-4 justify-center items-center opacity-80">
              <div className="flex flex-col items-center">
                <span className="font-bold text-xs mb-2">Your record</span>
                <svg viewBox="-50 -10 100 20" className="w-48 h-8">
                  <line x1="-45" y1="0" x2="45" y2="0" stroke="currentColor" strokeWidth="1" />
                  <polygon points="-45,0 -40,-2 -40,2" fill="currentColor" />
                  <polygon points="45,0 40,-2 40,2" fill="currentColor" />
                  {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((v) => (
                    <g key={v}>
                      <line x1={v * 10} y1="-3" x2={v * 10} y2="3" stroke="currentColor" strokeWidth="1" />
                    </g>
                  ))}
                  <circle cx="20" cy="0" r="2.5" fill="currentColor" />
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-xs mb-2">Your friend's record</span>
                <svg viewBox="-50 -10 100 20" className="w-48 h-8">
                  <line x1="-45" y1="0" x2="45" y2="0" stroke="currentColor" strokeWidth="1" />
                  <polygon points="-45,0 -40,-2 -40,2" fill="currentColor" />
                  <polygon points="45,0 40,-2 40,2" fill="currentColor" />
                  {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((v) => (
                    <g key={v}>
                      <line x1={v * 10} y1="-3" x2={v * 10} y2="3" stroke="currentColor" strokeWidth="1" />
                    </g>
                  ))}
                  <circle cx="-30" cy="0" r="2.5" fill="currentColor" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="font-bold text-amber-800 dark:text-amber-400 shrink-0">Have you observed the number lines?</span>
              <div className="w-full sm:w-64">
                <Field
                  id="p86_game_record"
                  placeholder="Yes/No"
                  isOpen={true}
                  {...fp}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
