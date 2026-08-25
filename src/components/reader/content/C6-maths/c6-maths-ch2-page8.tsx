"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

interface DoThisItem {
  id: string;
  sub: string;
  problem: string;
  strategy: string;
  ans: string;
}

const DO_THIS_ITEMS: DoThisItem[] = [
  {
    id: "dt1",
    sub: "i",
    problem: "319 + 69 + 81",
    strategy: "(319 + 81) + 69 = 400 + 69 = 469",
    ans: "469",
  },
  {
    id: "dt2",
    sub: "ii",
    problem: "431 + 37 + 69 + 63",
    strategy: "(431 + 69) + (37 + 63) = 500 + 100 = 600",
    ans: "600",
  },
  {
    id: "dt3",
    sub: "iii",
    problem: "2 × (71 × 5)",
    strategy: "(2 × 5) × 71 = 10 × 71 = 710",
    ans: "710",
  },
  {
    id: "dt4",
    sub: "iv",
    problem: "50 × 17 × 2",
    strategy: "(50 × 2) × 17 = 100 × 17 = 1700",
    ans: "1700",
  },
];

export function C6MathsCh2Page8() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch2-page8";

  // State for user answers
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  // Interactive Distributive Grid Cut Simulator (5 x 4 -> 2 x 4 + 3 x 4)
  const [cutCol, setCutCol] = useState<number>(2);

  const ALL_INPUT_IDS = [
    ...DO_THIS_ITEMS.map((item) => `${item.id}_ans`),
    "think_sub_assoc_eq",
    "think_div_assoc",
    "think_sub_assoc",
  ];

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
  }, []);

  useEffect(() => {
    function handleReset() {
      ALL_INPUT_IDS.forEach((id) => {
        localStorage.removeItem(`${storageKey}-${id}-answer`);
        localStorage.removeItem(`${storageKey}-${id}-graded`);
      });
      setAnswers({});
      setGraded({});
    }
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () => window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, []);

  const handleChange = (id: string, v: string) => {
    setAnswers((prev) => ({ ...prev, [id]: v }));
    localStorage.setItem(`${storageKey}-${id}-answer`, v);
  };

  const handleSelectAnswer = (id: string, selected: string, correctAns: string) => {
    if (isRevealed) return;
    handleChange(id, selected);

    const prev = graded[id];
    if (prev && prev.value === selected) return;

    const correct = selected.trim().toLowerCase() === correctAns.trim().toLowerCase();
    let delta = 0;
    if (prev) {
      if (!prev.correct && correct) delta = 2;
      else if (prev.correct && !correct) delta = -2;
    } else {
      delta = correct ? 1 : -1;
    }
    if (delta !== 0) addPoints(delta);

    setFeedback({ correct, id: Date.now() });
    const next = { ...graded, [id]: { value: selected, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${id}-graded`,
      JSON.stringify({ value: selected, correct })
    );
  };

  const handleBlurText = (id: string, correctAnswers: string[]) => {
    if (isRevealed) return;
    const normalize = (s: string) =>
      s.trim().toLowerCase().replace(/[\s.,/#!$%^&*;:{}=\-_`~()]+/g, "");
    const typed = normalize(answers[id] ?? "");
    if (!typed) return;

    const prev = graded[id];
    if (prev && prev.value === typed) return;

    const correct = correctAnswers.some((ans) => normalize(ans) === typed);
    let delta = 0;
    if (prev) {
      if (!prev.correct && correct) delta = 2;
      else if (prev.correct && !correct) delta = -2;
    } else {
      delta = correct ? 1 : -1;
    }
    if (delta !== 0) addPoints(delta);

    setFeedback({ correct, id: Date.now() });
    const next = { ...graded, [id]: { value: typed, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${id}-graded`,
      JSON.stringify({ value: typed, correct })
    );
  };

  function inputClass(id: string): string {
    const typed = (answers[id] ?? "").trim();
    if (isRevealed) return "border-emerald-500 bg-emerald-50 font-bold text-emerald-800";
    if (!typed) return "border-teal-200 focus:border-teal-500";
    const g = graded[id];
    if (g?.correct === true)
      return "border-green-500 bg-green-50 text-green-700 font-bold";
    if (g?.correct === false)
      return "border-destructive bg-destructive/5 text-destructive";
    return "border-teal-200 focus:border-teal-500";
  }

  function badge(id: string) {
    if (isRevealed) return null;
    const typed = (answers[id] ?? "").trim();
    if (!typed) return null;
    const g = graded[id];
    if (g?.correct === true)
      return (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 font-bold text-xs select-none">
          ✓
        </span>
      );
    if (g?.correct === false)
      return (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-destructive font-bold text-xs select-none">
          ✗
        </span>
      );
    return null;
  }

  return (
    <div className="w-full space-y-8 font-body text-sm leading-relaxed text-foreground/90 pb-8">
      {feedback !== null && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* ── Section 1: Worked Examples (Rearrangement Strategies) ── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            Using Commutative &amp; Associative Properties for Quick Calculations
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            Worked Examples
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Example 1 */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-teal-900 text-sm">Example - 1:</span>
              <span className="font-mono font-extrabold text-teal-950 text-base">Find 196 + 57 + 4</span>
            </div>

            <div className="space-y-1.5 font-mono text-xs text-foreground/85 bg-white p-3 rounded-lg border border-teal-100">
              <p>196 + (57 + 4)</p>
              <p>= 196 + (4 + 57) <span className="text-teal-700 font-sans font-semibold">[Commutative]</span></p>
              <p>= (196 + 4) + 57 <span className="text-teal-700 font-sans font-semibold">[Associative]</span></p>
              <p>= 200 + 57</p>
              <p className="font-bold text-emerald-700 text-sm">= 257</p>
            </div>

            <p className="text-xs text-teal-950">
              Here we used a combination of commutative and associative properties for addition to make calculation easier!
            </p>
          </div>

          {/* Example 2 */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-teal-900 text-sm">Example - 2:</span>
              <span className="font-mono font-extrabold text-teal-950 text-base">Find 5 × 9 × 2 × 2 × 3 × 5</span>
            </div>

            <div className="space-y-1.5 font-mono text-xs text-foreground/85 bg-white p-3 rounded-lg border border-teal-100">
              <p>5 × 9 × 2 × 2 × 3 × 5</p>
              <p>= 5 × 2 × 9 × 2 × 5 × 3 <span className="text-teal-700 font-sans font-semibold">[Commutative]</span></p>
              <p>= (5 × 2) × 9 × (2 × 5) × 3 <span className="text-teal-700 font-sans font-semibold">[Associative]</span></p>
              <p>= 10 × 9 × 10 × 3 = 90 × 30</p>
              <p className="font-bold text-emerald-700 text-sm">= 2700</p>
            </div>

            <p className="text-xs text-teal-950">
              Pairing numbers that multiply to 10 makes large multiplications simple!
            </p>
          </div>
        </div>
      </div>

      {/* ── Section 2: DO THIS ─────────────────────────────────── */}
      <div className="rounded-[16px] border-2 border-emerald-500 bg-emerald-50/30 overflow-hidden shadow-sm">
        <div className="bg-emerald-600 px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl text-white">📖</span>
            <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
              Do This
            </h2>
          </div>
          <span className="text-emerald-100 text-xs font-semibold px-2 py-0.5 rounded bg-emerald-700/50">
            {isRevealed ? "Answers Revealed" : "4 Points"}
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <p className="font-semibold text-teal-950">
            Use the commutative and associative properties to simplify the following:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DO_THIS_ITEMS.map((item) => {
              const inputId = `${item.id}_ans`;
              return (
                <div
                  key={item.id}
                  className="p-4 bg-white rounded-xl border border-teal-200 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-teal-800 font-mono">{item.sub}.</span>
                    <span className="font-mono font-extrabold text-teal-950 text-base">
                      {item.problem}
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Calculate..."
                      value={isRevealed ? item.ans : answers[inputId] ?? ""}
                      disabled={isRevealed}
                      onChange={(e) => handleChange(inputId, e.target.value)}
                      onBlur={() => handleBlurText(inputId, [item.ans])}
                      className={`w-full rounded-lg border bg-white px-3 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                        inputId
                      )}`}
                    />
                    {badge(inputId)}
                  </div>

                  <p className="text-xs text-teal-900 bg-teal-50/60 p-2 rounded-md font-mono">
                    💡 <strong>Strategy:</strong> {item.strategy}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Section 3: THINK, DISCUSS AND WRITE ───────────────── */}
      <div className="rounded-[16px] border-2 border-teal-600 bg-teal-50/30 overflow-hidden shadow-sm">
        <div className="bg-teal-700 px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl text-white">💭</span>
            <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
              Think, Discuss and Write
            </h2>
          </div>
          <span className="text-teal-100 text-xs font-semibold px-2 py-0.5 rounded bg-teal-800/50">
            {isRevealed ? "Answers Revealed" : "3 Points"}
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {/* Question 1: Is (16 - 4) - 2 = 16 - (4 - 2)? */}
          <div className="p-4 bg-white rounded-xl border border-teal-100 shadow-xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2">
                <span className="font-bold text-teal-900 font-mono">1.</span>
                <p className="font-medium text-foreground/90">
                  Is <strong className="font-mono">(16 - 4) - 2 = 16 - (4 - 2)</strong>?
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {["Yes", "No"].map((opt) => {
                  const current = answers["think_sub_assoc_eq"];
                  const isSelected = isRevealed ? opt === "No" : current === opt;
                  const isCorrect = opt === "No";
                  return (
                    <button
                      key={opt}
                      disabled={isRevealed}
                      onClick={() => handleSelectAnswer("think_sub_assoc_eq", opt, "No")}
                      className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all border ${
                        isRevealed
                          ? isCorrect
                            ? "bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-xs"
                            : "bg-gray-100 text-gray-400 border-gray-200 opacity-60"
                          : isSelected
                          ? graded["think_sub_assoc_eq"]?.correct
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                            : "bg-rose-500 text-white border-rose-500 shadow-xs"
                          : "bg-white text-teal-900 border-teal-300 hover:bg-teal-50 cursor-pointer"
                      }`}
                    >
                      {opt} {isRevealed && isCorrect ? "✓" : ""}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-xs font-mono bg-teal-50 p-2.5 rounded-lg border border-teal-100 text-teal-950 space-y-1">
              <p>LHS: (16 - 4) - 2 = 12 - 2 = <strong>10</strong></p>
              <p>RHS: 16 - (4 - 2) = 16 - 2 = <strong>14</strong></p>
              <p className="text-rose-700 font-sans font-bold">Since 10 ≠ 14, they are NOT equal!</p>
            </div>
          </div>

          {/* Question 2: Does associative property hold for division? */}
          <div className="p-4 bg-white rounded-xl border border-teal-100 shadow-xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2">
                <span className="font-bold text-teal-900 font-mono">2.</span>
                <p className="font-medium text-foreground/90">
                  Does the associative property for division hold for the set of whole numbers?
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {["Yes", "No"].map((opt) => {
                  const current = answers["think_div_assoc"];
                  const isSelected = isRevealed ? opt === "No" : current === opt;
                  const isCorrect = opt === "No";
                  return (
                    <button
                      key={opt}
                      disabled={isRevealed}
                      onClick={() => handleSelectAnswer("think_div_assoc", opt, "No")}
                      className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all border ${
                        isRevealed
                          ? isCorrect
                            ? "bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-xs"
                            : "bg-gray-100 text-gray-400 border-gray-200 opacity-60"
                          : isSelected
                          ? graded["think_div_assoc"]?.correct
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                            : "bg-rose-500 text-white border-rose-500 shadow-xs"
                          : "bg-white text-teal-900 border-teal-300 hover:bg-teal-50 cursor-pointer"
                      }`}
                    >
                      {opt} {isRevealed && isCorrect ? "✓" : ""}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-foreground/75">
              💡 Example: (16 ÷ 4) ÷ 2 = 4 ÷ 2 = <strong>2</strong>, but 16 ÷ (4 ÷ 2) = 16 ÷ 2 = <strong>8</strong> (2 ≠ 8).
            </p>
          </div>

          {/* Question 3: Does property hold for subtraction? */}
          <div className="p-4 bg-white rounded-xl border border-teal-100 shadow-xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2">
                <span className="font-bold text-teal-900 font-mono">3.</span>
                <p className="font-medium text-foreground/90">
                  Does the associative property hold for subtraction of whole numbers?
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {["Yes", "No"].map((opt) => {
                  const current = answers["think_sub_assoc"];
                  const isSelected = isRevealed ? opt === "No" : current === opt;
                  const isCorrect = opt === "No";
                  return (
                    <button
                      key={opt}
                      disabled={isRevealed}
                      onClick={() => handleSelectAnswer("think_sub_assoc", opt, "No")}
                      className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all border ${
                        isRevealed
                          ? isCorrect
                            ? "bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-xs"
                            : "bg-gray-100 text-gray-400 border-gray-200 opacity-60"
                          : isSelected
                          ? graded["think_sub_assoc"]?.correct
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                            : "bg-rose-500 text-white border-rose-500 shadow-xs"
                          : "bg-white text-teal-900 border-teal-300 hover:bg-teal-50 cursor-pointer"
                      }`}
                    >
                      {opt} {isRevealed && isCorrect ? "✓" : ""}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-foreground/75">
              💡 <em>Conclusion:</em> Associative property holds <strong>ONLY</strong> for Addition and Multiplication, NOT for Subtraction or Division.
            </p>
          </div>
        </div>
      </div>

      {/* ── Section 4: Distributivity Grid Demonstration ──────────── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            Observe the Following Grid (Introduction to Distributivity)
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            Visual Grid Model
          </span>
        </div>

        <p className="text-foreground/90">
          Cut the number grid <strong className="font-mono text-teal-950">5 × 4</strong> as shown below:
        </p>

        {/* SVG Grid Diagram: 5 x 4 = 2 x 4 + 3 x 4 */}
        <div className="p-4 bg-teal-50/30 rounded-xl border border-teal-200 overflow-x-auto">
          <div className="min-w-[580px] flex items-center justify-center gap-4 text-center select-none py-2">
            {/* Full 5 x 4 Grid */}
            <div className="space-y-1.5">
              <svg viewBox="0 0 160 130" className="w-36 h-30 mx-auto">
                <rect x="5" y="5" width="150" height="120" fill="#f0fdfa" stroke="#0d9488" strokeWidth="2" rx="4" />
                {/* Horizontal lines for 4 rows */}
                {[1, 2, 3].map((r) => (
                  <line key={r} x1="5" y1={5 + r * 30} x2="155" y2={5 + r * 30} stroke="#0d9488" strokeWidth="1.5" />
                ))}
                {/* Vertical lines for 5 cols */}
                {[1, 2, 3, 4].map((c) => (
                  <line
                    key={c}
                    x1={5 + c * 30}
                    y1="5"
                    x2={5 + c * 30}
                    y2="125"
                    stroke={c === 2 ? "#e11d48" : "#0d9488"}
                    strokeWidth={c === 2 ? "3" : "1.5"}
                    strokeDasharray={c === 2 ? "4 2" : undefined}
                  />
                ))}
                {/* Scissors icon marker at col 2 */}
                <text x="65" y="0" textAnchor="middle" className="text-sm">✂️</text>
              </svg>
              <p className="font-mono font-extrabold text-teal-950 text-sm">5 × 4 = 20</p>
            </div>

            <span className="font-mono font-extrabold text-2xl text-teal-800">=</span>

            {/* First piece: 2 x 4 */}
            <div className="space-y-1.5">
              <svg viewBox="0 0 70 130" className="w-16 h-30 mx-auto">
                <rect x="5" y="5" width="60" height="120" fill="#fef2f2" stroke="#e11d48" strokeWidth="2" rx="4" />
                {[1, 2, 3].map((r) => (
                  <line key={r} x1="5" y1={5 + r * 30} x2="65" y2={5 + r * 30} stroke="#f87171" strokeWidth="1.5" />
                ))}
                <line x1="35" y1="5" x2="35" y2="125" stroke="#f87171" strokeWidth="1.5" />
              </svg>
              <p className="font-mono font-extrabold text-rose-950 text-sm">2 × 4 = 8</p>
            </div>

            <span className="font-mono font-extrabold text-2xl text-teal-800">+</span>

            {/* Second piece: 3 x 4 */}
            <div className="space-y-1.5">
              <svg viewBox="0 0 100 130" className="w-24 h-30 mx-auto">
                <rect x="5" y="5" width="90" height="120" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" rx="4" />
                {[1, 2, 3].map((r) => (
                  <line key={r} x1="5" y1={5 + r * 30} x2="95" y2={5 + r * 30} stroke="#60a5fa" strokeWidth="1.5" />
                ))}
                {[1, 2].map((c) => (
                  <line key={c} x1={5 + c * 30} y1="5" x2={5 + c * 30} y2="125" stroke="#60a5fa" strokeWidth="1.5" />
                ))}
              </svg>
              <p className="font-mono font-extrabold text-blue-950 text-sm">3 × 4 = 12</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-foreground/85 leading-relaxed bg-teal-50/60 p-3 rounded-xl border border-teal-100">
          The grid paper <span className="font-mono font-bold">5 × 4</span> has been divided into two pieces <span className="font-mono font-bold">2 × 4</span> and <span className="font-mono font-bold">3 × 4</span>.
          <br />
          Notice: <strong className="font-mono text-teal-950">5 × 4 = (2 + 3) × 4 = (2 × 4) + (3 × 4) = 8 + 12 = 20</strong>.
        </p>
      </div>

      {/* ── Footer Banner ───────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 text-sm font-bold text-white rounded-lg shadow-xs mt-8"
        style={{
          background: "linear-gradient(90deg, #0f766e 0%, #14b8a6 100%)",
        }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-teal-700 text-xs font-extrabold mr-3">
          23
        </span>
        <span className="tracking-wide flex-1 text-center font-heading text-xs sm:text-sm">
          Whole Numbers
        </span>
      </div>
    </div>
  );
}
