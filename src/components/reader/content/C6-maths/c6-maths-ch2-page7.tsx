"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

interface VerifyItem {
  id: string;
  sub: string;
  expr: string;
  leftExpr: string;
  leftStep: string;
  leftVal: number;
  rightExpr: string;
  rightStep: string;
  rightVal: number;
}

const VERIFY_ITEMS: VerifyItem[] = [
  {
    id: "v1",
    sub: "i",
    expr: "(5 × 6) × 2 = 5 × (6 × 2)",
    leftExpr: "(5 × 6) × 2",
    leftStep: "30 × 2",
    leftVal: 60,
    rightExpr: "5 × (6 × 2)",
    rightStep: "5 × 12",
    rightVal: 60,
  },
  {
    id: "v2",
    sub: "ii",
    expr: "(3 × 7) × 5 = 3 × (7 × 5)",
    leftExpr: "(3 × 7) × 5",
    leftStep: "21 × 5",
    leftVal: 105,
    rightExpr: "3 × (7 × 5)",
    rightStep: "3 × 35",
    rightVal: 105,
  },
];

export function C6MathsCh2Page7() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch2-page7";

  // State for user answers
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  // Interactive Associativity Add tester
  const [addA, setAddA] = useState<number>(3);
  const [addB, setAddB] = useState<number>(4);
  const [addC, setAddC] = useState<number>(5);

  const ALL_INPUT_IDS = [
    "try_sub_commutative",
    "try_div_commutative",
    "verify_1_left",
    "verify_1_right",
    "verify_1_equal",
    "verify_2_left",
    "verify_2_right",
    "verify_2_equal",
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

      {/* ── Section 1: TRY THESE ─────────────────────────────────── */}
      <div className="rounded-[16px] border-2 border-teal-600 bg-teal-50/30 overflow-hidden shadow-sm">
        <div className="bg-teal-700 px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl text-white">✍️</span>
            <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
              Try These
            </h2>
          </div>
          <span className="text-teal-100 text-xs font-semibold px-2 py-0.5 rounded bg-teal-800/50">
            {isRevealed ? "Answers Revealed" : "2 Points"}
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <p className="font-semibold text-teal-950">
            Take a few examples and check whether -
          </p>

          <div className="space-y-4">
            {/* Question 1: Subtraction Commutative */}
            <div className="p-4 bg-white rounded-xl border border-teal-100 shadow-xs space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-teal-900 font-mono">1.</span>
                  <p className="font-medium text-foreground/90">
                    Is subtraction commutative for whole numbers or not?
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {["Commutative", "Not commutative"].map((opt) => {
                    const current = answers["try_sub_commutative"];
                    const isSelected = isRevealed ? opt === "Not commutative" : current === opt;
                    const isCorrect = opt === "Not commutative";
                    return (
                      <button
                        key={opt}
                        disabled={isRevealed}
                        onClick={() => handleSelectAnswer("try_sub_commutative", opt, "Not commutative")}
                        className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all border ${
                          isRevealed
                            ? isCorrect
                              ? "bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-xs"
                              : "bg-gray-100 text-gray-400 border-gray-200 opacity-60"
                            : isSelected
                            ? graded["try_sub_commutative"]?.correct
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

              <div className="text-xs text-foreground/75 bg-teal-50/50 p-2.5 rounded-lg border border-teal-100">
                💡 <strong>Counter Example:</strong> 5 - 3 = <strong>2</strong>, but 3 - 5 = <strong>-2</strong>. Since 2 ≠ -2, <em>subtraction is NOT commutative</em>.
              </div>
            </div>

            {/* Question 2: Division Commutative */}
            <div className="p-4 bg-white rounded-xl border border-teal-100 shadow-xs space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-teal-900 font-mono">2.</span>
                  <p className="font-medium text-foreground/90">
                    Is division commutative for whole numbers or not?
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {["Commutative", "Not commutative"].map((opt) => {
                    const current = answers["try_div_commutative"];
                    const isSelected = isRevealed ? opt === "Not commutative" : current === opt;
                    const isCorrect = opt === "Not commutative";
                    return (
                      <button
                        key={opt}
                        disabled={isRevealed}
                        onClick={() => handleSelectAnswer("try_div_commutative", opt, "Not commutative")}
                        className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all border ${
                          isRevealed
                            ? isCorrect
                              ? "bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-xs"
                              : "bg-gray-100 text-gray-400 border-gray-200 opacity-60"
                            : isSelected
                            ? graded["try_div_commutative"]?.correct
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

              <div className="text-xs text-foreground/75 bg-teal-50/50 p-2.5 rounded-lg border border-teal-100">
                💡 <strong>Counter Example:</strong> 6 ÷ 3 = <strong>2</strong>, but 3 ÷ 6 = <strong>1/2</strong>. Since 2 ≠ 1/2, <em>division is NOT commutative</em>.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Associativity of Addition and Multiplication ── */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 bg-teal-700 text-white px-4 py-1.5 rounded-r-full -ml-4 shadow-sm">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider">
            Associativity of Addition and Multiplication
          </h2>
        </div>

        {/* 1. Associativity of Addition */}
        <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
          <h3 className="font-heading font-bold text-teal-950 text-base">
            1. Associativity under Addition
          </h3>

          <p className="text-foreground/90">
            Observe the following:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs sm:text-sm">
            <div className="bg-teal-50/50 p-3.5 rounded-xl border border-teal-200">
              <p className="font-bold text-teal-900 mb-1">i. Grouping first two:</p>
              <p className="text-base font-extrabold text-teal-950">(3 + 4) + 5 = 7 + 5 = 12</p>
            </div>
            <div className="bg-teal-50/50 p-3.5 rounded-xl border border-teal-200">
              <p className="font-bold text-teal-900 mb-1">ii. Grouping last two:</p>
              <p className="text-base font-extrabold text-teal-950">3 + (4 + 5) = 3 + 9 = 12</p>
            </div>
          </div>

          <p className="text-xs text-foreground/85">
            So, <strong className="font-mono text-teal-950">(3 + 4) + 5 = 3 + (4 + 5)</strong>. In (i) we add 3 and 4 first and then add 5 to the sum, and in (ii) we add 4 and 5 first, and then add the sum to 3. But the result is same!
          </p>

          {/* Interactive 3-Number Associativity Calculator */}
          <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50/40 rounded-xl border border-teal-200 space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <label className="font-bold text-teal-900">Try any 3 numbers:</label>
              <input
                type="number"
                min="0"
                value={addA}
                onChange={(e) => setAddA(Math.max(0, Number(e.target.value)))}
                className="w-14 rounded border border-teal-300 bg-white px-2 py-1 font-mono text-center font-bold"
              />
              <span className="font-bold text-teal-700">+</span>
              <input
                type="number"
                min="0"
                value={addB}
                onChange={(e) => setAddB(Math.max(0, Number(e.target.value)))}
                className="w-14 rounded border border-teal-300 bg-white px-2 py-1 font-mono text-center font-bold"
              />
              <span className="font-bold text-teal-700">+</span>
              <input
                type="number"
                min="0"
                value={addC}
                onChange={(e) => setAddC(Math.max(0, Number(e.target.value)))}
                className="w-14 rounded border border-teal-300 bg-white px-2 py-1 font-mono text-center font-bold"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-teal-950 pt-1">
              <span>({addA} + {addB}) + {addC} = {addA + addB + addC}</span>
              <span className="font-bold text-teal-700">===</span>
              <span>{addA} + ({addB} + {addC}) = {addA + addB + addC}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-sans font-bold">
                ✓ Associative
              </span>
            </div>
          </div>

          <p className="text-xs text-teal-900 font-medium bg-teal-50 p-2.5 rounded-lg border border-teal-100">
            This is called the <strong>associative property of addition</strong> for whole numbers: <span className="font-mono font-bold">(a + b) + c = a + (b + c)</span>.
          </p>
        </div>

        {/* 2. Associativity of Multiplication (SVG Block Arrays) */}
        <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
          <h3 className="font-heading font-bold text-teal-950 text-base">
            2. Associativity under Multiplication
          </h3>

          <p className="text-foreground/90">
            Observe the following visual dot block diagrams:
          </p>

          {/* SVG Vector Diagrams: Fig (a) vs Fig (b) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fig (a): 4 x (3 x 2) = 4 times (3 x 2) */}
            <div className="p-4 bg-teal-50/30 rounded-xl border border-teal-200 text-center space-y-3">
              <p className="font-heading font-bold text-teal-950 text-sm">
                Fig. (a): 4 × (3 × 2) = four times (3 × 2)
              </p>

              <div className="flex justify-center py-1 overflow-x-auto">
                <svg viewBox="0 0 310 110" className="w-full max-w-[300px] h-28 select-none">
                  {[0, 1, 2, 3].map((boxIdx) => {
                    const bx = 10 + boxIdx * 75;
                    return (
                      <g key={boxIdx}>
                        {/* Box Header Label */}
                        <text x={bx + 30} y="14" textAnchor="middle" className="font-mono text-[11px] font-bold fill-teal-900">
                          3 × 2
                        </text>
                        {/* Outer Box */}
                        <rect x={bx} y="22" width="60" height="80" rx="6" fill="#f0fdfa" stroke="#0d9488" strokeWidth="1.8" />
                        {/* 3 rows x 2 columns of dots */}
                        {[0, 1, 2].map((r) =>
                          [0, 1].map((c) => (
                            <circle
                              key={`dot-a-${boxIdx}-${r}-${c}`}
                              cx={bx + 18 + c * 24}
                              cy={38 + r * 24}
                              r="5"
                              fill="#e11d48"
                            />
                          ))
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-teal-100 text-xs font-mono">
                <p className="text-teal-900">Each box has 3 × 2 = 6 dots</p>
                <p className="font-bold text-teal-950 text-sm mt-0.5">Total = 4 × (3 × 2) = 4 × 6 = 24</p>
              </div>
            </div>

            {/* Fig (b): 2 x (4 x 3) = twice of (4 x 3) */}
            <div className="p-4 bg-teal-50/30 rounded-xl border border-teal-200 text-center space-y-3">
              <p className="font-heading font-bold text-teal-950 text-sm">
                Fig. (b): 2 × (4 × 3) = twice of (4 × 3)
              </p>

              <div className="flex justify-center py-1 overflow-x-auto">
                <svg viewBox="0 0 230 110" className="w-full max-w-[220px] h-28 select-none">
                  {[0, 1].map((boxIdx) => {
                    const bx = 15 + boxIdx * 105;
                    return (
                      <g key={boxIdx}>
                        {/* Box Header Label */}
                        <text x={bx + 45} y="14" textAnchor="middle" className="font-mono text-[11px] font-bold fill-teal-900">
                          4 × 3
                        </text>
                        {/* Outer Box */}
                        <rect x={bx} y="22" width="90" height="80" rx="6" fill="#f0fdfa" stroke="#0d9488" strokeWidth="1.8" />
                        {/* 3 rows x 4 columns of dots */}
                        {[0, 1, 2].map((r) =>
                          [0, 1, 2, 3].map((c) => (
                            <circle
                              key={`dot-b-${boxIdx}-${r}-${c}`}
                              cx={bx + 15 + c * 20}
                              cy={38 + r * 24}
                              r="4.5"
                              fill="#e11d48"
                            />
                          ))
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-teal-100 text-xs font-mono">
                <p className="text-teal-900">Each box has 4 × 3 = 12 dots</p>
                <p className="font-bold text-teal-950 text-sm mt-0.5">Total = 2 × (4 × 3) = 2 × 12 = 24</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-foreground/85 leading-relaxed">
            Count the number of blocks in fig. (a) and in fig. (b). What do you get? The number of blocks is the same! In fig. (a) we have 4 × (3 × 2) = 24. In fig. (b) we have 2 × (4 × 3) = 24. Thus, <span className="font-mono font-bold text-teal-950">4 × (3 × 2) = 2 × (4 × 3) = (4 × 3) × 2 = 24</span>.
          </p>

          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-bold text-xs sm:text-sm">
            ✨ <strong>Rule:</strong> In multiplication also, we see that the result is same, whichever order of grouping is followed. This is the <strong>associative property for multiplication of whole numbers</strong>: <span className="font-mono">(a × b) × c = a × (b × c)</span>.
          </div>
        </div>
      </div>

      {/* ── Section 3: DO THIS (Verification Problems) ───────────── */}
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
            Verify the following associative multiplication expressions:
          </p>

          <div className="space-y-4">
            {VERIFY_ITEMS.map((item) => {
              const leftId = `verify_${item.id.replace("v", "")}_left`;
              const rightId = `verify_${item.id.replace("v", "")}_right`;
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-teal-200 bg-white shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-teal-100 pb-2">
                    <span className="font-bold text-teal-800 font-mono">{item.sub}.</span>
                    <span className="font-mono font-extrabold text-teal-950 text-sm sm:text-base">
                      {item.expr}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs sm:text-sm">
                    {/* LHS */}
                    <div className="p-3 bg-teal-50/40 rounded-lg border border-teal-100 flex items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold text-teal-900">LHS: {item.leftExpr}</p>
                        <p className="text-xs text-foreground/70 font-mono">= {item.leftStep} =</p>
                      </div>
                      <div className="relative w-28">
                        <input
                          type="text"
                          placeholder={item.leftVal.toString()}
                          value={isRevealed ? item.leftVal.toString() : answers[leftId] ?? ""}
                          disabled={isRevealed}
                          onChange={(e) => handleChange(leftId, e.target.value)}
                          onBlur={() => handleBlurText(leftId, [item.leftVal.toString()])}
                          className={`w-full rounded-lg border bg-white px-2.5 py-1 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                            leftId
                          )}`}
                        />
                        {badge(leftId)}
                      </div>
                    </div>

                    {/* RHS */}
                    <div className="p-3 bg-teal-50/40 rounded-lg border border-teal-100 flex items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold text-teal-900">RHS: {item.rightExpr}</p>
                        <p className="text-xs text-foreground/70 font-mono">= {item.rightStep} =</p>
                      </div>
                      <div className="relative w-28">
                        <input
                          type="text"
                          placeholder={item.rightVal.toString()}
                          value={isRevealed ? item.rightVal.toString() : answers[rightId] ?? ""}
                          disabled={isRevealed}
                          onChange={(e) => handleChange(rightId, e.target.value)}
                          onBlur={() => handleBlurText(rightId, [item.rightVal.toString()])}
                          className={`w-full rounded-lg border bg-white px-2.5 py-1 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                            rightId
                          )}`}
                        />
                        {badge(rightId)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-xs font-semibold text-emerald-950">
                    <span>Both sides equal {item.leftVal}</span>
                    <span className="font-mono">LHS = RHS (Verified ✓)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Footer Banner ───────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 text-sm font-bold text-white rounded-lg shadow-xs mt-8"
        style={{
          background: "linear-gradient(90deg, #0f766e 0%, #14b8a6 100%)",
        }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-teal-700 text-xs font-extrabold mr-3">
          22
        </span>
        <span className="tracking-wide flex-1 text-center font-heading text-xs sm:text-sm">
          Government&apos;s Gift for Students&apos; Progress
        </span>
      </div>
    </div>
  );
}
