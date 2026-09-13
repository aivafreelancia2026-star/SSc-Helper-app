"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs (Book Page 79 / PDF Page 88)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "p88_do_this_i",   // -7 + 8
  "p88_do_this_ii",  // -3 + 5
  "p88_do_this_iii", // -3 - 2
  "p88_do_this_iv",  // +7 - 10
];

const CORRECT: Record<string, string[]> = {
  p88_do_this_i: ["1", "+1", "+ 1"],
  p88_do_this_ii: ["2", "+2", "+ 2"],
  p88_do_this_iii: ["-5", "- 5"],
  p88_do_this_iv: ["-3", "- 3"],
};

const REVEAL_TEXT: Record<string, string> = {
  p88_do_this_i: "1",
  p88_do_this_ii: "2",
  p88_do_this_iii: "-5",
  p88_do_this_iv: "-3",
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
   Bottle Caps Diagrams
───────────────────────────────────────────── */
function CapDiagram1() {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-sm shrink-0">
      <div className="flex flex-col gap-2">
        <div className="flex justify-center gap-2">
          {/* Pair 1 */}
          <div className="p-1 border-2 border-dashed border-slate-400 dark:border-slate-600 rounded-lg flex flex-col gap-1 items-center bg-white dark:bg-slate-950">
            <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">-1</span>
            <span className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">+1</span>
          </div>
          {/* Pair 2 */}
          <div className="p-1 border-2 border-dashed border-slate-400 dark:border-slate-600 rounded-lg flex flex-col gap-1 items-center bg-white dark:bg-slate-950">
            <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">-1</span>
            <span className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">+1</span>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          {/* Remaining Cap */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">=</span>
            <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">-1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CapDiagram2() {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-sm shrink-0">
      <div className="flex flex-col gap-2">
        <div className="flex justify-center gap-2">
          {/* Unpaired */}
          <div className="p-1 flex items-center gap-1">
            <span className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">+1</span>
            <span className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">+1</span>
          </div>
          {/* Pair 1 */}
          <div className="p-1 border-2 border-dashed border-slate-400 dark:border-slate-600 rounded-lg flex flex-col gap-1 items-center bg-white dark:bg-slate-950">
            <span className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">+1</span>
            <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">-1</span>
          </div>
          {/* Pair 2 */}
          <div className="p-1 border-2 border-dashed border-slate-400 dark:border-slate-600 rounded-lg flex flex-col gap-1 items-center bg-white dark:bg-slate-950">
            <span className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">+1</span>
            <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">-1</span>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          {/* Remaining Caps */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">=</span>
            <span className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">+1</span>
            <span className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">+1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function C6MathsCh6Page7() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch6-page7";

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
            Page 79 (PDF P88)
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
        
        {/* Paragraphs */}
        <div className="space-y-4">
          <p className="text-sm sm:text-base">
            Does she move right or left on the line? Clearly she moves left two places starting from <strong>-4</strong> and reaches <strong>-6</strong> we say <strong>(-4) + (-2) = -6</strong>.
          </p>
          <p className="text-sm sm:text-base">
            You add two positive integers like <strong>(+3) + (+1) = 4</strong>. You can also add two negative integers and the answer will take a minus sign (-) like <strong>(-3) + (-2) = -5</strong>.
          </p>
          <p className="text-sm sm:text-base">
            What happens when we have one positive integer and one negative integer. Let us take the help of caps. Place as many caps facing up as positive integer and as many caps facing down as negative integer. Remove caps in pairs i.e. an up cap with a down cap since <strong>(+1) + (-1) = 0</strong>. Count the remaining caps.
          </p>
        </div>

        {/* Examples Section */}
        <div className="space-y-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Examples:</h3>
          
          <div className="flex flex-col lg:flex-row items-center gap-6 justify-between">
            <div className="space-y-2 flex-1 font-mono text-sm sm:text-base font-semibold">
              <div className="flex items-center gap-4">
                <span className="text-slate-500 w-12 text-right">Ex: (i)</span>
                <span>(-3) + (+2)</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-12"></span>
                <span>= (-1) + [(-2) + (+2)]</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-12"></span>
                <span>= -1 + 0</span>
              </div>
              <div className="flex items-center gap-4 text-rose-600 dark:text-rose-400">
                <span className="w-12"></span>
                <span>= -1</span>
              </div>
            </div>
            <CapDiagram1 />
          </div>

          <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />

          <div className="flex flex-col lg:flex-row items-center gap-6 justify-between">
            <div className="space-y-2 flex-1 font-mono text-sm sm:text-base font-semibold">
              <div className="flex items-center gap-4">
                <span className="text-slate-500 w-12 text-right">(ii)</span>
                <span>(+4) + (-2)</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-12"></span>
                <span>= (+2) + [(+2) + (-2)]</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-12"></span>
                <span>= (+2) + 0</span>
              </div>
              <div className="flex items-center gap-4 text-teal-600 dark:text-teal-400">
                <span className="w-12"></span>
                <span>= +2</span>
              </div>
            </div>
            <CapDiagram2 />
          </div>
        </div>

        <p className="text-center font-semibold text-indigo-700 dark:text-indigo-400">
          Now you can play the game by adding scores easily.
        </p>

        {/* Do This */}
        <div className="border-2 border-green-600/40 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-green-600 text-white font-bold px-4 py-2 flex items-center gap-2 tracking-wide shadow-md">
            <span>📖</span>
            <h2 className="uppercase">Do This</h2>
          </div>
          <div className="p-6 bg-green-50/30 dark:bg-green-950/10 space-y-4">
            <p className="font-semibold text-foreground">Find the values of the following:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2 flex flex-col p-4 bg-white dark:bg-slate-900 border border-border rounded-xl">
                <div className="flex gap-2 items-center text-sm font-semibold text-green-800 dark:text-green-400">
                  <span>(i)</span>
                  <span className="font-mono text-foreground">-7 + 8 =</span>
                </div>
                <Field id="p88_do_this_i" placeholder="e.g. 1" {...fp} />
              </div>
              <div className="space-y-2 flex flex-col p-4 bg-white dark:bg-slate-900 border border-border rounded-xl">
                <div className="flex gap-2 items-center text-sm font-semibold text-green-800 dark:text-green-400">
                  <span>(ii)</span>
                  <span className="font-mono text-foreground">-3 + 5 =</span>
                </div>
                <Field id="p88_do_this_ii" placeholder="e.g. 2" {...fp} />
              </div>
              <div className="space-y-2 flex flex-col p-4 bg-white dark:bg-slate-900 border border-border rounded-xl">
                <div className="flex gap-2 items-center text-sm font-semibold text-green-800 dark:text-green-400">
                  <span>(iii)</span>
                  <span className="font-mono text-foreground">-3 - 2 =</span>
                </div>
                <Field id="p88_do_this_iii" placeholder="e.g. -5" {...fp} />
              </div>
              <div className="space-y-2 flex flex-col p-4 bg-white dark:bg-slate-900 border border-border rounded-xl">
                <div className="flex gap-2 items-center text-sm font-semibold text-green-800 dark:text-green-400">
                  <span>(iv)</span>
                  <span className="font-mono text-foreground">+7 - 10 =</span>
                </div>
                <Field id="p88_do_this_iv" placeholder="e.g. -3" {...fp} />
              </div>
            </div>
          </div>
        </div>

        {/* 6.6.1 Addition of integers on the number line */}
        <div className="space-y-6 pt-4">
          <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400">
            6.6.1 Addition of integers on the number line
          </h3>
          <p className="text-sm sm:text-base">Let us see how we can add any two integers using a number line.</p>
          
          <div className="space-y-8">
            
            {/* Number Line Example 1 */}
            <div className="flex flex-col gap-4 bg-background border border-border rounded-2xl p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="font-bold">1.</span>
                <p className="font-medium">Let us add 2 and 3 on a number line.</p>
              </div>
              
              <div className="w-full flex justify-center py-6 overflow-hidden">
                <svg viewBox="0 -40 700 80" className="w-full max-w-3xl drop-shadow-sm h-auto overflow-visible">
                  <defs>
                    <marker id="arrowRight" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0d9488" />
                    </marker>
                    <marker id="axisArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
                    </marker>
                  </defs>

                  {/* Axis line */}
                  <line x1="25" y1="20" x2="675" y2="20" stroke="#475569" strokeWidth="2.5" markerStart="url(#axisArrow)" markerEnd="url(#axisArrow)" />

                  {/* Tick Marks and Labels */}
                  {[-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].map((num) => {
                    const x = 350 + num * 42;
                    const isZero = num === 0;
                    return (
                      <g key={num}>
                        <line x1={x} y1="12" x2={x} y2="28" stroke={isZero ? "#0284c7" : "#64748b"} strokeWidth={isZero ? "3" : "2"} />
                        <text x={x} y="45" textAnchor="middle" fontSize="14" fontWeight={isZero ? "bold" : "600"} fill={isZero ? "#0284c7" : "#475569"}>
                          {num}
                        </text>
                      </g>
                    );
                  })}

                  {/* Jump 1: 0 to 2 */}
                  <path d="M 350 10 Q 392 -30 432 10" fill="none" stroke="#0d9488" strokeWidth="2.5" markerEnd="url(#arrowRight)" />
                  <text x="391" y="-18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0d9488">2</text>

                  {/* Jump 2: 2 to 5 */}
                  <path d="M 434 10 Q 497 -30 558 10" fill="none" stroke="#0d9488" strokeWidth="2.5" markerEnd="url(#arrowRight)" />
                  <text x="496" y="-18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0d9488">3</text>
                </svg>
              </div>
              
              <div className="bg-teal-50 dark:bg-teal-950/20 p-4 rounded-xl border border-teal-100 dark:border-teal-900/50 text-sm leading-relaxed">
                On the number line, we first move 2 steps to the right from 0 to reach 2, then we move 3 steps to the right of 3 and to reach 5. Thus we get <strong>2 + 3 = 5</strong>.
              </div>
            </div>

            {/* Number Line Example 2 */}
            <div className="flex flex-col gap-4 bg-background border border-border rounded-2xl p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="font-bold">2.</span>
                <p className="font-medium">Let us add (-4) and (-3).</p>
              </div>
              
              <div className="w-full flex justify-center py-6 overflow-hidden">
                <svg viewBox="0 -40 700 80" className="w-full max-w-3xl drop-shadow-sm h-auto overflow-visible">
                  <defs>
                    <marker id="arrowLeft" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 10 1 L 0 5 L 10 9 z" fill="#e11d48" />
                    </marker>
                  </defs>

                  {/* Axis line */}
                  <line x1="25" y1="20" x2="675" y2="20" stroke="#475569" strokeWidth="2.5" markerStart="url(#axisArrow)" markerEnd="url(#axisArrow)" />

                  {/* Tick Marks and Labels */}
                  {[-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((num) => {
                    const x = 400 + num * 42; // shift zero to right to fit -8 better
                    const isZero = num === 0;
                    return (
                      <g key={num}>
                        <line x1={x} y1="12" x2={x} y2="28" stroke={isZero ? "#0284c7" : "#64748b"} strokeWidth={isZero ? "3" : "2"} />
                        <text x={x} y="45" textAnchor="middle" fontSize="14" fontWeight={isZero ? "bold" : "600"} fill={isZero ? "#0284c7" : "#475569"}>
                          {num}
                        </text>
                      </g>
                    );
                  })}

                  {/* Jump 1: 0 to -4 (Right to Left) */}
                  <path d="M 398 10 Q 316 -30 234 10" fill="none" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrowLeft)" />
                  <text x="316" y="-18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#e11d48">-4</text>

                  {/* Jump 2: -4 to -7 */}
                  <path d="M 230 10 Q 168 -30 108 10" fill="none" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrowLeft)" />
                  <text x="169" y="-18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#e11d48">-3</text>
                </svg>
              </div>
              
              <div className="bg-rose-50 dark:bg-rose-950/20 p-4 rounded-xl border border-rose-100 dark:border-rose-900/50 text-sm leading-relaxed">
                On the number line, we first move 4 steps to the left of 0 to reach -4, then we move 3 steps to the left of -3 and reach -7. Thus, <strong>(-4) + (-3) = -7</strong>.
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
