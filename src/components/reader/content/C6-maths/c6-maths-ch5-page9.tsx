"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   Input IDs (Book Page 69)
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "p69_q3_obtuse",        // Which are obtuse?
  "p69_q5_acute",         // Classify: acute
  "p69_q5_right",         // Classify: right
  "p69_q5_obtuse",        // Classify: obtuse
  "p69_q5_straight",      // Classify: straight
  "p69_q5_reflex",        // Classify: reflex
  "p69_ex1_i",            // True/False i
  "p69_ex1_ii",           // True/False ii
  "p69_ex1_iii",          // True/False iii
  "p69_ex1_iv",           // True/False iv
  "p69_ex1_v",            // True/False v
  "p69_ex2_acute",        // Which are acute?
  "p69_ex2_obtuse",       // Which are obtuse?
  "p69_ex3_abc",          // Measure of ABC
  "p69_ex3_fed",          // Measure of FED
  "p69_ex3_rqp",          // Measure of RQP
  "p69_ex3_largest",      // Largest angle
  "p69_ex4_i",            // 9 AM clock angle
  "p69_ex4_ii",           // 6 PM clock angle
  "p69_ex4_iii",          // 12 Noon clock angle
];

const CORRECT: Record<string, string[]> = {
  p69_q3_obtuse:        ["iii", "iv", "(iii)", "(iv)", "iiiandiv", "(iii)and(iv)"],
  p69_q5_acute:         ["40,44,10,89,30", "40°,44°,10°,89°,30°"],
  p69_q5_right:         ["90", "90°"],
  p69_q5_obtuse:        ["140,125,120,115", "140°,125°,120°,115°"],
  p69_q5_straight:      ["180", "180°"],
  p69_q5_reflex:        ["210,215,345,270", "210°,215°,345°,270°"],
  p69_ex1_i:            ["true", "t"],
  p69_ex1_ii:           ["false", "f"],
  p69_ex1_iii:          ["false", "f"],
  p69_ex1_iv:           ["true", "t"],
  p69_ex1_v:            ["true", "t"],
  p69_ex2_acute:        ["2,4", "2and4", "angle2andangle4", "∠2and∠4"],
  p69_ex2_obtuse:       ["1,3", "1and3", "angle1andangle3", "∠1and∠3"],
  p69_ex3_abc:          ["40", "45", "40°", "45°"],
  p69_ex3_fed:          ["110", "120", "110°", "120°"],
  p69_ex3_rqp:          ["90", "90°"],
  p69_ex3_largest:      ["fed", "∠fed", "anglefed"],
  p69_ex4_i:            ["right", "rightangle", "90", "90°"],
  p69_ex4_ii:           ["straight", "straightangle", "180", "180°"],
  p69_ex4_iii:          ["zero", "zeroangle", "0", "0°", "complete", "completeangle", "360", "360°"],
};

const REVEAL_TEXT: Record<string, string> = {
  p69_q3_obtuse:        "(iii) and (iv)",
  p69_q5_acute:         "40°, 44°, 10°, 89°, 30°",
  p69_q5_right:         "90°",
  p69_q5_obtuse:        "140°, 125°, 120°, 115°",
  p69_q5_straight:      "180°",
  p69_q5_reflex:        "210°, 215°, 345°, 270°",
  p69_ex1_i:            "True",
  p69_ex1_ii:           "False (Right angle measures 90°)",
  p69_ex1_iii:          "False (Straight angle measures 180°)",
  p69_ex1_iv:           "True",
  p69_ex1_v:            "True",
  p69_ex2_acute:        "Angles 2 and 4",
  p69_ex2_obtuse:       "Angles 1 and 3",
  p69_ex3_abc:          "≈ 45°",
  p69_ex3_fed:          "≈ 110°",
  p69_ex3_rqp:          "90°",
  p69_ex3_largest:      "∠FED is the largest",
  p69_ex4_i:            "Right angle (90°)",
  p69_ex4_ii:           "Straight angle (180°)",
  p69_ex4_iii:          "Zero angle (0°) / Complete angle (360°)",
};

const normalize = (s: string) => {
  const res = s.trim().toLowerCase().replace(/[^a-z0-9°]/g, "");
  // To handle permutations of lists in q5, we sort numbers if it consists of numbers
  if (res.match(/^[0-9°]+$/)) {
    const nums = res.replace(/°/g, "").match(/\d+/g);
    if (nums) return nums.sort().join(",");
  }
  return res;
};

// Custom validation for list answers
function validateListAnswer(id: string, raw: string): boolean {
    const v = raw.trim().toLowerCase().replace(/[^0-9]/g, ",");
    const nums = v.split(",").filter(n => n).map(Number).sort().join(",");
    
    let expected = "";
    if (id === "p69_q5_acute") expected = "10,30,40,44,89";
    if (id === "p69_q5_obtuse") expected = "115,120,125,140";
    if (id === "p69_q5_reflex") expected = "210,215,270,345";
    
    if (expected && nums === expected) return true;
    return false;
}

function validateAnswer(id: string, raw: string): boolean {
  if (["p69_q5_acute", "p69_q5_obtuse", "p69_q5_reflex"].includes(id)) {
      return validateListAnswer(id, raw);
  }
    
  const v = normalize(raw);
  if (!v) return false;
  const accepted = CORRECT[id];
  if (!accepted) return v.length >= 4;
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
   Generic angle SVG
───────────────────────────────────────────── */
function AngleSVG({
  angleDeg, label, showRight = false, rotateDeg = 0
}: { angleDeg: number; label: string; showRight?: boolean, rotateDeg?: number }) {
  const cx = 50, cy = 60, rayLen = 40;
  const rnd = (n: number) => Math.round(n * 100) / 100;
  const rad = (-angleDeg * Math.PI) / 180;
  const bx = cx + rayLen;
  const rx = rnd(cx + rayLen * Math.cos(rad));
  const ry = rnd(cy + rayLen * Math.sin(rad));
  const arcR = 14;
  const ax = rnd(cx + arcR);
  const ay = cy;
  const ax2 = rnd(cx + arcR * Math.cos(rad));
  const ay2 = rnd(cy + arcR * Math.sin(rad));

  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 100 80" className="w-20 h-16 sm:w-24 sm:h-20" style={{ transform: `rotate(${rotateDeg}deg)` }}>
        {/* Base ray */}
        <line x1={cx} y1={cy} x2={bx} y2={cy} stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        <polygon points={`${bx},${cy} ${bx - 5},${cy - 2.5} ${bx - 5},${cy + 2.5}`} fill="#475569" />
        {/* Other ray */}
        <line x1={cx} y1={cy} x2={rx} y2={ry} stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
        <polygon
          points={`${rx},${ry} ${rnd(rx - 5 * Math.cos(rad) + 2.5 * Math.sin(rad))},${rnd(ry - 5 * Math.sin(rad) - 2.5 * Math.cos(rad))} ${rnd(rx - 5 * Math.cos(rad) - 2.5 * Math.sin(rad))},${rnd(ry - 5 * Math.sin(rad) + 2.5 * Math.cos(rad))}`}
          fill="#0d9488" />
        {/* Arc */}
        <path d={`M ${ax} ${ay} A ${arcR} ${arcR} 0 0 0 ${ax2} ${ay2}`}
          fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
        {/* Right angle marker */}
        {showRight && (
          <rect x={cx} y={cy - 12} width={12} height={12}
            fill="none" stroke="#7c3aed" strokeWidth="1.5" />
        )}
        {/* Origin dot */}
        <circle cx={cx} cy={cy} r="2" fill="#374151" />
      </svg>
      <span className="text-[11px] font-mono text-muted-foreground font-bold">{label}</span>
    </div>
  );
}

function QuadrilateralAnglesSVG() {
  // A quadrilateral with some angles marked
  return (
      <svg viewBox="0 0 160 120" className="w-32 h-24 sm:w-40 sm:h-32">
          {/* Points */}
          <polygon points="40,20 120,30 110,100 30,90" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2" />
          
          {/* Angles */}
          <path d="M 40,35 A 15,15 0 0 0 52,22" fill="none" stroke="#f59e0b" strokeWidth="2"/>
          <text x="50" y="38" fontSize="10" fill="#b45309" fontWeight="bold">1</text>
          
          <path d="M 106,30 A 15,15 0 0 0 118,43" fill="none" stroke="#f59e0b" strokeWidth="2"/>
          <text x="100" y="44" fontSize="10" fill="#b45309" fontWeight="bold">2</text>
          
          <path d="M 97,98 A 15,15 0 0 0 109,87" fill="none" stroke="#f59e0b" strokeWidth="2"/>
          <text x="96" y="86" fontSize="10" fill="#b45309" fontWeight="bold">3</text>
          
          <path d="M 33,76 A 15,15 0 0 0 45,92" fill="none" stroke="#f59e0b" strokeWidth="2"/>
          <text x="44" y="82" fontSize="10" fill="#b45309" fontWeight="bold">4</text>
      </svg>
  )
}

function CustomAngleSVG({ points, label, angleName, rotate }: { points: number[][], label: string[], angleName: string, rotate?: number }) {
  const [B, A, C] = points; // center, point 1, point 2
  return (
      <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 120 100" className="w-24 h-20 sm:w-32 sm:h-28" style={{ transform: rotate ? `rotate(${rotate}deg)` : 'none'}}>
          {/* Ray 1 */}
          <line x1={B[0]} y1={B[1]} x2={A[0]} y2={A[1]} stroke="#475569" strokeWidth="2" />
          {/* Ray 2 */}
          <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} stroke="#0d9488" strokeWidth="2" />
          
          {/* Points */}
          <circle cx={A[0]} cy={A[1]} r="2" fill="#475569" />
          <circle cx={B[0]} cy={B[1]} r="2" fill="#374151" />
          <circle cx={C[0]} cy={C[1]} r="2" fill="#0d9488" />
          
          <text x={A[0]+4} y={A[1]+4} fontSize="10" fill="#475569" fontWeight="bold">{label[2]}</text>
          <text x={B[0]-6} y={B[1]+12} fontSize="10" fill="#374151" fontWeight="bold">{label[1]}</text>
          <text x={C[0]-8} y={C[1]-4} fontSize="10" fill="#0d9488" fontWeight="bold">{label[0]}</text>
          
          {/* Arc */}
          <path d={`M ${(B[0]*2+A[0])/3} ${(B[1]*2+A[1])/3} Q ${(B[0]+(A[0]+C[0])/2)/2} ${(B[1]+(A[1]+C[1])/2)/2} ${(B[0]*2+C[0])/3} ${(B[1]*2+C[1])/3}`} fill="none" stroke="#f59e0b" strokeWidth="2" />
      </svg>
      <span className="text-[11px] font-bold text-foreground">∠{angleName}</span>
      </div>
  )
}

/* ─────────────────────────────────────────────
   Shared Field Component
───────────────────────────────────────────── */
function Field({ 
  id, placeholder, answers, graded, isRevealed, handleChange, handleBlur, isOpen = false, className = "", multiLine = false 
}: {
  id: string; placeholder: string; answers: Record<string, string>; graded: Record<string, { value: string; correct: boolean }>;
  isRevealed: boolean; handleChange: (id: string, val: string) => void; handleBlur: (id: string, isOpen?: boolean) => void;
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
   Main Component
───────────────────────────────────────────── */
export function C6MathsCh5Page9() {
  const { score, addPoints } = useScore();
  const searchParams = useSearchParams();
  const isUrlRevealed = searchParams.get("reveal") === "1";
  const [showReveal, setShowReveal] = useState(false);
  const isRevealed = isUrlRevealed || showReveal;
  const storageKey = "c6-maths-ch5-page9";

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnswers(saved);
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    const correct = validateAnswer(id, rawTyped);
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
          PAGE HEADER + SCORE / ACTION BAR
      ══════════════════════════════════════ */}
      <div className="rounded-2xl border-2 border-teal-600/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-800 text-white font-heading font-bold px-5 py-4 text-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-white/20 text-xl">📐</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">5.3.1 Measuring Angles &amp; Types</h1>
              <p className="text-xs text-teal-100 font-normal">
                Class 6 Maths &bull; Chapter 5 &bull; Measures of Lines and Angles
              </p>
            </div>
          </div>
          <span className="text-xs bg-teal-950/80 text-teal-200 px-3 py-1 rounded-full border border-teal-400/30 font-mono self-start sm:self-auto font-bold">
            Page 69
          </span>
        </div>

        {/* Score & Action Bar */}
        <div className="bg-teal-50/80 dark:bg-teal-950/30 border-b border-teal-200 dark:border-teal-800/60 p-4 px-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-700/60 rounded-xl px-3.5 py-1.5">
              <span className="text-base">⭐</span>
              <span className="text-xs font-semibold text-muted-foreground">Total Points:</span>
              <span className="font-heading font-bold text-teal-700 dark:text-teal-300 text-sm">{score}</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-700/60 rounded-xl px-3.5 py-1.5">
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
              className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-heading font-semibold text-xs transition-colors cursor-pointer active:scale-95 flex items-center gap-1.5">
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
          PAGE CONTENT
      ══════════════════════════════════════ */}
      
      {/* Q3 */}
      <div className="rounded-2xl border-2 border-indigo-200 dark:border-indigo-800/40 bg-card overflow-hidden shadow-sm p-5 sm:p-6 space-y-4">
          <div className="flex gap-2">
              <span className="font-bold text-indigo-700 dark:text-indigo-400">3.</span>
              <p className="font-semibold">Which are obtuse angles?</p>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 flex flex-col items-center">
                  <AngleSVG angleDeg={60} rotateDeg={-30} label="(i)" />
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 flex flex-col items-center">
                  <AngleSVG angleDeg={90} rotateDeg={90} label="(ii)" showRight={true} />
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 flex flex-col items-center">
                  <AngleSVG angleDeg={140} rotateDeg={-70} label="(iii)" />
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 flex flex-col items-center">
                  <AngleSVG angleDeg={110} rotateDeg={-10} label="(iv)" />
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 flex flex-col items-center">
                  <AngleSVG angleDeg={40} rotateDeg={45} label="(v)" />
              </div>
          </div>
          <div className="max-w-xs mt-2">
              <Field id="p69_q3_obtuse" placeholder="e.g. (iii) and (iv)" answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} />
          </div>
      </div>

      {/* Q4 & Q5 */}
      <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700/60 bg-card overflow-hidden shadow-sm p-5 sm:p-6 space-y-6">
          <div className="space-y-2">
              <div className="flex gap-2">
                  <span className="font-bold">4.</span>
                  <p>Draw any two acute and two obtuse angles of your choice.</p>
              </div>
              <p className="text-xs text-muted-foreground ml-6 italic">(Draw these in your notebook!)</p>
          </div>
          
          <div className="space-y-4">
              <div className="flex gap-2">
                  <span className="font-bold">5.</span>
                  <p>Classify the following angles into acute, right, obtuse, straight and reflex angles:</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-sm font-bold tracking-wider leading-loose">
                  40°, 140°, 90°, 210°, 44°, 215°, 345°, 125°,<br/>
                  10°, 120°, 89°, 270°, 30°, 115°, 180°
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                      <label className="text-xs font-bold text-foreground">Acute angles:</label>
                      <Field id="p69_q5_acute" placeholder="e.g. 10°, 30° ..." answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} />
                  </div>
                  <div className="space-y-1">
                      <label className="text-xs font-bold text-foreground">Right angles:</label>
                      <Field id="p69_q5_right" placeholder="e.g. 90°" answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} />
                  </div>
                  <div className="space-y-1">
                      <label className="text-xs font-bold text-foreground">Obtuse angles:</label>
                      <Field id="p69_q5_obtuse" placeholder="e.g. 120°, 140° ..." answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} />
                  </div>
                  <div className="space-y-1">
                      <label className="text-xs font-bold text-foreground">Straight angles:</label>
                      <Field id="p69_q5_straight" placeholder="e.g. 180°" answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-foreground">Reflex angles:</label>
                      <Field id="p69_q5_reflex" placeholder="e.g. 210°, 270° ..." answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} />
                  </div>
              </div>
          </div>
      </div>
      
      {/* EXERCISE 5.2 */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-card overflow-hidden shadow-sm">
        <div className="bg-emerald-600 text-white font-heading font-bold px-5 py-3 text-lg text-center uppercase tracking-wider">
          Exercise - 5.2
        </div>
        
        <div className="p-5 sm:p-6 space-y-8">
            {/* Ex 1 */}
            <div className="space-y-3">
                <div className="flex gap-2">
                    <span className="font-bold">1.</span>
                    <p className="font-semibold">Write &apos;True&apos; or &apos;False&apos;. Correct all those that are false.</p>
                </div>
                
                <div className="space-y-3 ml-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between bg-slate-50 dark:bg-slate-900/30 p-2 rounded-lg">
                        <span className="text-sm">i) An angle smaller than right angle is acute angle</span>
                        <div className="w-24"><Field id="p69_ex1_i" placeholder="True / False" answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} /></div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between bg-slate-50 dark:bg-slate-900/30 p-2 rounded-lg">
                        <span className="text-sm">ii) A right angle measures 180°</span>
                        <div className="w-24"><Field id="p69_ex1_ii" placeholder="True / False" answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} /></div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between bg-slate-50 dark:bg-slate-900/30 p-2 rounded-lg">
                        <span className="text-sm">iii) A straight angle measures 90°</span>
                        <div className="w-24"><Field id="p69_ex1_iii" placeholder="True / False" answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} /></div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between bg-slate-50 dark:bg-slate-900/30 p-2 rounded-lg">
                        <span className="text-sm">iv) The measure greater than 180° is a reflex angle.</span>
                        <div className="w-24"><Field id="p69_ex1_iv" placeholder="True / False" answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} /></div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between bg-slate-50 dark:bg-slate-900/30 p-2 rounded-lg">
                        <span className="text-sm">v) A complete angle measures 360°.</span>
                        <div className="w-24"><Field id="p69_ex1_v" placeholder="True / False" answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} /></div>
                    </div>
                </div>
            </div>
            
            {/* Ex 2 */}
            <div className="space-y-4">
                <div className="flex gap-2">
                    <span className="font-bold">2.</span>
                    <p className="font-semibold">Which angles in the adjacent figure are acute and which are obtuse? Check your estimation by measuring them. Write their measures too.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                        <QuadrilateralAnglesSVG />
                    </div>
                    <div className="space-y-4 flex-1 w-full">
                        <div className="space-y-1">
                            <label className="text-xs font-bold">Acute Angles:</label>
                            <Field id="p69_ex2_acute" placeholder="e.g. Angles 2 and 4" answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold">Obtuse Angles:</label>
                            <Field id="p69_ex2_obtuse" placeholder="e.g. Angles 1 and 3" answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Ex 3 */}
            <div className="space-y-4">
                <div className="flex gap-2">
                    <span className="font-bold">3.</span>
                    <p className="font-semibold">What is the measure of these angles. Which is the largest angle? Draw an angle larger than the largest angle.</p>
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <CustomAngleSVG points={[[60,60], [20,60], [80,20]]} label={["C","B","A"]} angleName="ABC" />
                        <Field id="p69_ex3_abc" placeholder="∠ABC = ?" className="w-24" answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <CustomAngleSVG points={[[60,60], [20,20], [100,60]]} label={["F","E","D"]} angleName="FED" />
                        <Field id="p69_ex3_fed" placeholder="∠FED = ?" className="w-24" answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <CustomAngleSVG points={[[60,60], [60,20], [100,60]]} label={["P","Q","R"]} angleName="RQP" />
                        <Field id="p69_ex3_rqp" placeholder="∠RQP = ?" className="w-24" answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} />
                    </div>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-200 mt-2">
                    <label className="text-xs font-bold">Which is the largest angle?</label>
                    <Field id="p69_ex3_largest" placeholder="e.g. ∠ABC" className="mt-1" answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} />
                </div>
            </div>
            
            {/* Ex 4 */}
            <div className="space-y-4">
                <div className="flex gap-2">
                    <span className="font-bold">4.</span>
                    <p className="font-semibold">Write the type of angle formed between the long hand and short hand of a clock at the given timings. (Take the small hand as the base)</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ml-6">
                    <div className="space-y-2 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                        <p className="text-sm font-medium">i) At 9 &apos;O&apos; clock in the morning</p>
                        <Field id="p69_ex4_i" placeholder="Type of angle..." answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} />
                    </div>
                    <div className="space-y-2 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                        <p className="text-sm font-medium">ii) At 6 &apos;O&apos; clock in the evening</p>
                        <Field id="p69_ex4_ii" placeholder="Type of angle..." answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} />
                    </div>
                    <div className="space-y-2 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                        <p className="text-sm font-medium">iii) At 12 noon</p>
                        <Field id="p69_ex4_iii" placeholder="Type of angle..." answers={answers} graded={graded} isRevealed={isRevealed} handleChange={handleChange} handleBlur={handleBlur} />
                    </div>
                </div>
            </div>
            
        </div>
      </div>
    </div>
  );
}
