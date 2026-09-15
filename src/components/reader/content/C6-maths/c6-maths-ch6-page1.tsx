"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs (Book Page 73 / PDF Page 81)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "p73_intro_q1",
  "p73_intro_q2",
  "p73_intro_q3",
  "p73_intro_q4",
  "p73_intro_q5",
  "p73_intro_q6",
];

const CORRECT: Record<string, string[]> = {
  p73_intro_q1: ["80", "80rs", "rs80", "₹80"],
  p73_intro_q2: ["130", "130rs", "rs130", "₹130"],
  p73_intro_q3: ["100", "100rs", "rs100", "₹100"],
  p73_intro_q4: ["120", "120rs", "rs120", "₹120"],
  p73_intro_q5: ["20", "20rs", "rs20", "₹20"],
  p73_intro_q6: ["-20", "minus 20", "negative 20", "with a minus sign"],
};

const REVEAL_TEXT: Record<string, string> = {
  p73_intro_q1: "₹ 80 (since he owed ₹ 20, 100 - 20 = 80)",
  p73_intro_q2: "₹ 130 (since 80 + 50 = 130)",
  p73_intro_q3: "₹ 100",
  p73_intro_q4: "₹ 120",
  p73_intro_q5: "₹ 20",
  p73_intro_q6: "-20 (with a negative sign)",
};

const normalize = (s: string) =>
  s.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");

function validateAnswer(id: string, raw: string): boolean {
  const v = normalize(raw);
  if (!v) return false;
  const accepted = CORRECT[id];
  if (!accepted) return v.length >= 3;
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
  if (!typed) return "border-slate-300 dark:border-slate-700 focus:border-teal-500 bg-background";
  const g = graded[id];
  if (g?.correct === true)
    return "border-green-500 bg-green-50 text-green-700 font-bold dark:bg-green-950/30 dark:text-green-300";
  if (g?.correct === false)
    return "border-red-400 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400";
  return "border-slate-300 dark:border-slate-700 focus:border-teal-500 bg-background";
}

function StatusIcon({
  id, answers, graded, isRevealed,
}: {
  id: string; answers: Record<string, string>;
  graded: Record<string, { value: string; correct: boolean }>; isRevealed: boolean;
}) {
  if (isRevealed) return null;
  const typed = (answers[id] ?? "").trim();
  if (!typed) return null;
  const g = graded[id];
  if (g?.correct === true)
    return <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 select-none text-xs font-bold text-green-600 dark:text-green-400">✓</span>;
  if (g?.correct === false)
    return <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 select-none text-xs font-bold text-red-500 dark:text-red-400">✗</span>;
  return null;
}

/* ─────────────────────────────────────────────
   Shared Field Component
───────────────────────────────────────────── */
function Field({
  id, placeholder, answers, graded, isRevealed, handleChange, handleBlur,
  isOpen = false, className = "", multiLine = false
}: {
  id: string; placeholder: string; answers: Record<string, string>;
  graded: Record<string, { value: string; correct: boolean }>;
  isRevealed: boolean; handleChange: (id: string, val: string) => void;
  handleBlur: (id: string, isOpen?: boolean) => void;
  isOpen?: boolean; className?: string; multiLine?: boolean;
}) {
  const displayVal = isRevealed ? (REVEAL_TEXT[id] ?? "") : (answers[id] ?? "");
  const baseCls = `w-full rounded-xl border px-3 py-2 text-xs sm:text-sm font-mono outline-none transition-all shadow-sm resize-none ${borderCls(id, answers, graded, isRevealed)}`;
  if (multiLine) {
    return (
      <div className={`relative w-full ${className}`}>
        <textarea id={`field-${id}`} rows={2} placeholder={placeholder}
          value={displayVal} onChange={(e) => handleChange(id, e.target.value)}
          onBlur={() => handleBlur(id, isOpen)} disabled={isRevealed} className={baseCls} />
      </div>
    );
  }
  return (
    <div className={`relative w-full ${className}`}>
      <input type="text" id={`field-${id}`} placeholder={placeholder}
        value={displayVal} onChange={(e) => handleChange(id, e.target.value)}
        onBlur={() => handleBlur(id, isOpen)} disabled={isRevealed}
        className={`${baseCls} pr-7`}
        onKeyDown={(e) => { if (e.key === "Enter") { handleBlur(id, isOpen); e.currentTarget.blur(); } }}
      />
      <StatusIcon id={id} answers={answers} graded={graded} isRevealed={isRevealed} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   SVGs
───────────────────────────────────────────── */
function TimelineMonth1SVG() {
  return (
    <svg viewBox="0 0 600 120" className="w-full h-auto max-w-2xl drop-shadow-sm">
      <defs>
        <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#14b8a6" />
        </marker>
        <marker id="arrowHead2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#8b5cf6" />
        </marker>
        <marker id="arrowHead3" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#f59e0b" />
        </marker>
        <marker id="arrowHead4" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#ef4444" />
        </marker>
      </defs>
      
      {/* Main Axis */}
      <line x1="30" y1="80" x2="570" y2="80" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowHead)" markerStart="url(#arrowHead)" />
      
      {/* Ticks and Labels */}
      {[...Array(13)].map((_, i) => {
        const val = -20 + i * 10;
        const x = 50 + i * 40;
        return (
          <g key={i}>
            <line x1={x} y1="75" x2={x} y2="85" stroke="#475569" strokeWidth="2" />
            <text x={x} y="100" textAnchor="middle" fontSize="12" fill="#475569" className="dark:fill-slate-400 font-semibold">{val}</text>
          </g>
        );
      })}

      {/* Title */}
      <text x="300" y="115" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
        Record of the money in 1st Month
      </text>

      {/* Jumps */}
      {/* 1st week: 100 to 50 */}
      <path d="M 530 70 Q 430 10 330 70" fill="none" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowHead)" />
      <text x="430" y="25" textAnchor="middle" fontSize="11" fill="#0f172a" className="dark:fill-white font-bold">1st week</text>
      <text x="530" y="60" textAnchor="middle" fontSize="10" fill="#475569" className="dark:fill-slate-400">Amount given</text>
      <text x="430" y="10" textAnchor="middle" fontSize="10" fill="#14b8a6" className="font-bold">-₹50</text>

      {/* 2nd week: 50 to 30 */}
      <path d="M 330 70 Q 290 30 250 70" fill="none" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowHead2)" />
      <text x="290" y="45" textAnchor="middle" fontSize="11" fill="#0f172a" className="dark:fill-white font-bold">2nd week</text>
      <text x="290" y="25" textAnchor="middle" fontSize="10" fill="#8b5cf6" className="font-bold">-₹20</text>

      {/* 3rd week: 30 to 0 */}
      <path d="M 250 70 Q 190 20 130 70" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowHead3)" />
      <text x="190" y="35" textAnchor="middle" fontSize="11" fill="#0f172a" className="dark:fill-white font-bold">3rd week</text>
      <text x="190" y="15" textAnchor="middle" fontSize="10" fill="#f59e0b" className="font-bold">-₹30</text>

      {/* 4th week: 0 to -20 */}
      <path d="M 130 70 Q 90 30 50 70" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowHead4)" />
      <text x="90" y="45" textAnchor="middle" fontSize="11" fill="#0f172a" className="dark:fill-white font-bold">4th week</text>
      <text x="90" y="25" textAnchor="middle" fontSize="10" fill="#ef4444" className="font-bold">-₹20</text>
    </svg>
  );
}

function TimelineMonth2SVG() {
  return (
    <svg viewBox="0 0 650 120" className="w-full h-auto max-w-2xl drop-shadow-sm">
      <defs>
        <marker id="arrowHeadM2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#14b8a6" />
        </marker>
        <marker id="arrowHeadM2Tip" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#f59e0b" />
        </marker>
      </defs>
      
      {/* Main Axis */}
      <line x1="30" y1="80" x2="620" y2="80" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowHeadM2)" markerStart="url(#arrowHeadM2)" />
      
      {/* Ticks and Labels */}
      {[...Array(16)].map((_, i) => {
        const val = -20 + i * 10;
        const x = 50 + i * 36;
        return (
          <g key={i}>
            <line x1={x} y1="75" x2={x} y2="85" stroke="#475569" strokeWidth="2" />
            <text x={x} y="100" textAnchor="middle" fontSize="12" fill="#475569" className="dark:fill-slate-400 font-semibold">{val}</text>
          </g>
        );
      })}

      {/* Title */}
      <text x="325" y="115" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
        Record of 2nd Month
      </text>

      {/* Jumps */}
      {/* -20 to 80 (1st week of 2nd month) */}
      <path d="M 50 70 Q 230 0 410 70" fill="none" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowHeadM2)" />
      <text x="230" y="30" textAnchor="middle" fontSize="11" fill="#0f172a" className="dark:fill-white font-bold">1st week of 2nd month</text>
      <text x="230" y="15" textAnchor="middle" fontSize="10" fill="#14b8a6" className="font-bold">+₹100</text>

      {/* 80 to 130 (tip of uncle) */}
      <path d="M 410 70 Q 500 20 590 70" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowHeadM2Tip)" />
      <text x="500" y="35" textAnchor="middle" fontSize="11" fill="#0f172a" className="dark:fill-white font-bold">Tip of uncle</text>
      <text x="500" y="15" textAnchor="middle" fontSize="10" fill="#f59e0b" className="font-bold">+₹50</text>
    </svg>
  );
}


/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function C6MathsCh6Page1() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch6-page1";

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
      if (g) { try { savedG[id] = JSON.parse(g); } catch {} }
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
    const correct = isOpen ? rawTyped.trim().length >= 3 : validateAnswer(id, rawTyped);
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
      <div className="rounded-2xl border-2 border-emerald-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-800 text-white font-heading font-bold px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-white/20 text-xl font-black px-4">6</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">Integers</h1>
              <p className="text-xs text-emerald-100 font-normal">
                Class 6 Maths &bull; Chapter 6 &bull; Introduction
              </p>
            </div>
          </div>
          <span className="text-xs bg-emerald-950/80 text-emerald-200 px-3 py-1 rounded-full border border-emerald-400/30 font-mono self-start sm:self-auto font-bold">
            Page 81
          </span>
        </div>

        {/* Score & Action Bar */}
        <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border-b border-emerald-200 dark:border-emerald-800/60 p-4 px-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700/60 rounded-xl px-3.5 py-1.5">
              <span className="text-base">⭐</span>
              <span className="text-xs font-semibold text-muted-foreground">Total Points:</span>
              <span className="font-heading font-bold text-emerald-700 dark:text-emerald-300 text-sm">{score}</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700/60 rounded-xl px-3.5 py-1.5">
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
            <button type="button" onClick={handleCheckAll}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-semibold text-xs transition-colors cursor-pointer active:scale-95 flex items-center gap-1.5">
              <span>✓</span><span>Check Answers</span>
            </button>
            <button type="button" onClick={handleToggleReveal}
              className={`px-4 py-1.5 rounded-xl border text-xs font-heading font-semibold transition-colors cursor-pointer active:scale-95 flex items-center gap-1.5 ${isRevealed ? "bg-amber-600 text-white border-amber-700" : "bg-white dark:bg-slate-800 text-foreground border-slate-300 dark:border-slate-700 hover:bg-slate-100"}`}>
              <span>{isRevealed ? "🙈" : "👁️"}</span>
              <span>{isRevealed ? "Hide Key" : "Reveal Answers"}</span>
            </button>
            <button type="button" onClick={handleResetPage}
              className="px-3 py-1.5 rounded-xl border border-red-300 dark:border-red-800/60 bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 hover:bg-red-50 text-xs font-heading font-semibold transition-colors cursor-pointer">
              ↺ Reset
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          6.1 INTRODUCTION
      ══════════════════════════════════════ */}
      <div className="bg-card rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-sm">
        <h2 className="text-xl font-heading font-bold text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-100 dark:border-emerald-900 pb-2 inline-block">
          6.1 INTRODUCTION
        </h2>

        <div className="space-y-4">
          <p>
            Rafi gets <strong>₹ 100</strong> as pocket money from his father every month. He gives this money to his mother and takes some amount from her whenever he required. His mother makes a note of the money and he takes and gives in a book.
          </p>
          <p>
            Rafi took ₹ 50 in the first week, ₹ 20 in the second week, ₹ 30 in the third week and wanted ₹ 20 in the last week. But Rafi&apos;s mother told him that he had taken the entire amount given to her. Rafi said that he would adjust the amount from next month&apos;s pocket money, but needs the money. She agreed and gave him ₹ 20 and recorded it as follows:
          </p>
        </div>

        {/* Timeline 1 */}
        <div className="my-8 flex justify-center bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <TimelineMonth1SVG />
        </div>

        <div className="space-y-4 p-5 bg-teal-50 dark:bg-teal-950/20 rounded-xl border border-teal-200 dark:border-teal-900">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="flex-1">
              On the first day of the next month, Rafi got ₹ 100. He gave it to his mother. Can you say, how much money does Rafi have with his mother?
            </p>
            <div className="w-full sm:w-48 shrink-0">
              <Field id="p73_intro_q1" placeholder="₹" {...fp} />
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5 bg-teal-50 dark:bg-teal-950/20 rounded-xl border border-teal-200 dark:border-teal-900 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="flex-1">
              On the same evening his uncle gave him a tip of <strong>₹ 50</strong>. He felt happy and gave the same to his mother to deposit, asking her to keep it and record the money. Can you find out, how much money did Rafi has with his mother then? Look at the record once again:
            </p>
            <div className="w-full sm:w-48 shrink-0">
              <Field id="p73_intro_q2" placeholder="₹" {...fp} />
            </div>
          </div>
        </div>

        {/* Timeline 2 */}
        <div className="my-8 flex justify-center bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <TimelineMonth2SVG />
        </div>

        {/* Questions */}
        <div className="pt-6 space-y-5">
          <p className="font-bold text-foreground">Now answer the following by observing the record:</p>
          
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 w-6">1.</span>
              <p className="flex-1 text-sm font-medium">How much money does Rafi&apos;s father give him as pocket money every month?</p>
              <div className="w-32"><Field id="p73_intro_q3" placeholder="₹" {...fp} /></div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 w-6">2.</span>
              <p className="flex-1 text-sm font-medium">How much money did Rafi spend in four weeks?</p>
              <div className="w-32"><Field id="p73_intro_q4" placeholder="₹" {...fp} /></div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 w-6">3.</span>
              <p className="flex-1 text-sm font-medium">How much money did Rafi&apos;s mother lend him in the fourth week?</p>
              <div className="w-32"><Field id="p73_intro_q5" placeholder="₹" {...fp} /></div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 w-6">4.</span>
              <p className="flex-1 text-sm font-medium">How did she mark the money she lent in the last week?</p>
              <div className="w-32"><Field id="p73_intro_q6" placeholder="e.g. -20" {...fp} /></div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
