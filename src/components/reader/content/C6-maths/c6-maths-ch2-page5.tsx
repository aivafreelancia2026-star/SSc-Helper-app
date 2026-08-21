"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

interface MultiplicationRow {
  id: string;
  a: number;
  b: number;
  product: number;
}

const MULT_EXAMPLES: MultiplicationRow[] = [
  { id: "m1", a: 5, b: 6, product: 30 },
  { id: "m2", a: 11, b: 0, product: 0 },
  { id: "m3", a: 16, b: 5, product: 80 },
  { id: "m4", a: 10, b: 100, product: 1000 },
  { id: "m5", a: 7, b: 16, product: 112 },
];

export function C6MathsCh2Page5() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch2-page5";

  // State for user answers
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  // Interactive Multiplication Checker
  const [multNum1, setMultNum1] = useState<number>(8);
  const [multNum2, setMultNum2] = useState<number>(12);

  // Interactive Division by Zero Step-by-Step Simulation
  const [divTotal, setDivTotal] = useState<number>(6);
  const [divDivisor, setDivDivisor] = useState<number>(2);
  const [divSteps, setDivSteps] = useState<number[]>([]);

  const ALL_INPUT_IDS = [
    "sub_closed_decision",
    "sub_row3_a",
    "sub_row3_b",
    "sub_row3_res",
    "sub_row4_a",
    "sub_row4_b",
    "sub_row4_res",
    "div_closed_decision",
    "div_row3_a",
    "div_row3_b",
    "div_row3_res",
    "div_row4_a",
    "div_row4_b",
    "div_row4_res",
    "div_zero_question",
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

  // Update division steps whenever numbers change
  useEffect(() => {
    if (divDivisor === 0) {
      setDivSteps([]);
      return;
    }
    const steps: number[] = [];
    let current = divTotal;
    while (current > 0 && steps.length < 15) {
      current -= divDivisor;
      steps.push(current);
    }
    setDivSteps(steps);
  }, [divTotal, divDivisor]);

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

      {/* ── Section 1: Closure Property of Multiplication ─────────── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            Closure Property of Multiplication
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            Concept &amp; Verification
          </span>
        </div>

        <p className="text-foreground/90">
          Can you find any pair of whole numbers, which when added will not give a whole number? We see that no such pair exists and the collection of whole numbers are <strong>closed under addition</strong>. This property is known as the <em>closure property of addition for whole numbers</em>.
        </p>

        <p className="font-semibold text-teal-950">
          Let us check whether the collection of whole numbers is also closed under multiplication:
        </p>

        {/* Multiplication Examples Table */}
        <div className="overflow-x-auto rounded-[14px] border border-teal-200 shadow-xs bg-teal-50/20">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-teal-700 text-white">
                <th className="border border-teal-600 px-4 py-2.5 font-semibold text-center w-16">
                  S.No
                </th>
                <th className="border border-teal-600 px-4 py-2.5 font-semibold text-center">
                  Multiplication Expression
                </th>
                <th className="border border-teal-600 px-4 py-2.5 font-semibold text-center w-12">
                  =
                </th>
                <th className="border border-teal-600 px-4 py-2.5 font-semibold">
                  Result &amp; Conclusion
                </th>
              </tr>
            </thead>
            <tbody>
              {MULT_EXAMPLES.map((row, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <tr key={row.id} className={isEven ? "bg-white" : "bg-teal-50/40"}>
                    <td className="border border-teal-100 px-3 py-2.5 text-center font-bold text-teal-800">
                      {idx + 1}.
                    </td>
                    <td className="border border-teal-100 px-4 py-2.5 font-mono font-extrabold text-teal-950 text-center">
                      {row.a} × {row.b}
                    </td>
                    <td className="border border-teal-100 px-2 py-2.5 text-center font-bold text-teal-700">
                      =
                    </td>
                    <td className="border border-teal-100 px-4 py-2.5 font-medium text-foreground/90">
                      <span className="font-mono font-bold text-teal-950 text-base mr-2">
                        {row.product}
                      </span>
                      , a whole number
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Interactive Multiplication Tester */}
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50/40 p-4 rounded-xl border border-teal-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-teal-900">Try any numbers:</label>
            <input
              type="number"
              min="0"
              value={multNum1}
              onChange={(e) => setMultNum1(Math.max(0, Number(e.target.value)))}
              className="w-16 rounded border border-teal-300 bg-white px-2 py-1 font-mono text-center text-sm font-bold"
            />
            <span className="font-bold text-teal-700">×</span>
            <input
              type="number"
              min="0"
              value={multNum2}
              onChange={(e) => setMultNum2(Math.max(0, Number(e.target.value)))}
              className="w-16 rounded border border-teal-300 bg-white px-2 py-1 font-mono text-center text-sm font-bold"
            />
            <span className="font-bold text-teal-700">=</span>
            <span className="font-mono font-extrabold text-emerald-700 text-base px-2">
              {multNum1 * multNum2}
            </span>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
            ✓ Result is always a whole number (W)
          </span>
        </div>

        <div className="p-3.5 bg-teal-100/60 rounded-xl text-teal-950 font-medium text-xs sm:text-sm">
          🌟 <strong>Key Conclusion:</strong> The product of any two whole numbers is found to be a whole number too. Hence, we say that the <strong>collection of whole numbers is closed under multiplication</strong>.
        </div>
      </div>

      {/* ── Section 2: THINK, DISCUSS AND WRITE ───────────────── */}
      <div className="rounded-[16px] border-2 border-teal-600 bg-teal-50/30 overflow-hidden shadow-sm space-y-0">
        <div className="bg-teal-700 px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl text-white">💭</span>
            <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
              Think, Discuss and Write
            </h2>
          </div>
          <span className="text-teal-100 text-xs font-semibold px-2 py-0.5 rounded bg-teal-800/50">
            {isRevealed ? "Answers Revealed" : "Interactive Checks"}
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Question 1: Subtraction Closure */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-200 pb-2">
              <div className="flex items-start gap-2">
                <span className="font-bold text-teal-900 font-heading">1.</span>
                <p className="font-heading font-bold text-teal-950 text-sm sm:text-base">
                  Are the whole numbers closed under subtraction?
                </p>
              </div>

              {/* Yes / No Selector */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {["Yes", "No"].map((opt) => {
                  const current = answers["sub_closed_decision"];
                  const isSelected = isRevealed ? opt === "No" : current === opt;
                  const isCorrect = opt === "No";
                  return (
                    <button
                      key={opt}
                      disabled={isRevealed}
                      onClick={() => handleSelectAnswer("sub_closed_decision", opt, "No")}
                      className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all border ${
                        isRevealed
                          ? isCorrect
                            ? "bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-xs"
                            : "bg-gray-100 text-gray-400 border-gray-200 opacity-60"
                          : isSelected
                          ? graded["sub_closed_decision"]?.correct
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

            <p className="text-xs text-foreground/80">
              Observe the following and fill up the blanks:
            </p>

            <div className="overflow-x-auto rounded-xl border border-teal-200 bg-white">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-teal-600 text-white">
                    <th className="border border-teal-500 px-3 py-2 text-center w-24">a</th>
                    <th className="border border-teal-500 px-2 py-2 text-center w-10">-</th>
                    <th className="border border-teal-500 px-3 py-2 text-center w-24">b</th>
                    <th className="border border-teal-500 px-2 py-2 text-center w-10">=</th>
                    <th className="border border-teal-500 px-4 py-2">Result &amp; State</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-teal-100 px-3 py-2 text-center font-mono font-bold">7</td>
                    <td className="border border-teal-100 px-2 py-2 text-center font-bold text-rose-600">-</td>
                    <td className="border border-teal-100 px-3 py-2 text-center font-mono font-bold">5</td>
                    <td className="border border-teal-100 px-2 py-2 text-center font-bold">=</td>
                    <td className="border border-teal-100 px-4 py-2 font-medium text-emerald-700">
                      <strong>2</strong>, a whole number
                    </td>
                  </tr>
                  <tr className="bg-rose-50/30">
                    <td className="border border-teal-100 px-3 py-2 text-center font-mono font-bold">5</td>
                    <td className="border border-teal-100 px-2 py-2 text-center font-bold text-rose-600">-</td>
                    <td className="border border-teal-100 px-3 py-2 text-center font-mono font-bold">7</td>
                    <td className="border border-teal-100 px-2 py-2 text-center font-bold">=</td>
                    <td className="border border-teal-100 px-4 py-2 font-medium text-rose-700">
                      <strong>-2</strong>, not a whole number
                    </td>
                  </tr>

                  {/* Row 3 Editable */}
                  <tr className="bg-white">
                    <td className="border border-teal-100 px-2 py-1.5 text-center">
                      <input
                        type="text"
                        placeholder="3"
                        value={isRevealed ? "3" : answers["sub_row3_a"] ?? ""}
                        disabled={isRevealed}
                        onChange={(e) => handleChange("sub_row3_a", e.target.value)}
                        onBlur={() => handleBlurText("sub_row3_a", ["3", "any"])}
                        className={`w-16 rounded border text-center font-mono text-xs py-1 ${inputClass("sub_row3_a")}`}
                      />
                    </td>
                    <td className="border border-teal-100 px-2 py-2 text-center font-bold text-rose-600">-</td>
                    <td className="border border-teal-100 px-2 py-1.5 text-center">
                      <input
                        type="text"
                        placeholder="8"
                        value={isRevealed ? "8" : answers["sub_row3_b"] ?? ""}
                        disabled={isRevealed}
                        onChange={(e) => handleChange("sub_row3_b", e.target.value)}
                        onBlur={() => handleBlurText("sub_row3_b", ["8", "any"])}
                        className={`w-16 rounded border text-center font-mono text-xs py-1 ${inputClass("sub_row3_b")}`}
                      />
                    </td>
                    <td className="border border-teal-100 px-2 py-2 text-center font-bold">=</td>
                    <td className="border border-teal-100 px-3 py-1.5">
                      <input
                        type="text"
                        placeholder="-5, not a whole number"
                        value={isRevealed ? "-5, not a whole number" : answers["sub_row3_res"] ?? ""}
                        disabled={isRevealed}
                        onChange={(e) => handleChange("sub_row3_res", e.target.value)}
                        onBlur={() => handleBlurText("sub_row3_res", ["-5, not a whole number", "-5", "not a whole number"])}
                        className={`w-full rounded border px-2 py-1 font-mono text-xs ${inputClass("sub_row3_res")}`}
                      />
                    </td>
                  </tr>

                  {/* Row 4 Editable */}
                  <tr className="bg-teal-50/20">
                    <td className="border border-teal-100 px-2 py-1.5 text-center">
                      <input
                        type="text"
                        placeholder="8"
                        value={isRevealed ? "8" : answers["sub_row4_a"] ?? ""}
                        disabled={isRevealed}
                        onChange={(e) => handleChange("sub_row4_a", e.target.value)}
                        onBlur={() => handleBlurText("sub_row4_a", ["8", "any"])}
                        className={`w-16 rounded border text-center font-mono text-xs py-1 ${inputClass("sub_row4_a")}`}
                      />
                    </td>
                    <td className="border border-teal-100 px-2 py-2 text-center font-bold text-rose-600">-</td>
                    <td className="border border-teal-100 px-2 py-1.5 text-center">
                      <input
                        type="text"
                        placeholder="3"
                        value={isRevealed ? "3" : answers["sub_row4_b"] ?? ""}
                        disabled={isRevealed}
                        onChange={(e) => handleChange("sub_row4_b", e.target.value)}
                        onBlur={() => handleBlurText("sub_row4_b", ["3", "any"])}
                        className={`w-16 rounded border text-center font-mono text-xs py-1 ${inputClass("sub_row4_b")}`}
                      />
                    </td>
                    <td className="border border-teal-100 px-2 py-2 text-center font-bold">=</td>
                    <td className="border border-teal-100 px-3 py-1.5">
                      <input
                        type="text"
                        placeholder="5, a whole number"
                        value={isRevealed ? "5, a whole number" : answers["sub_row4_res"] ?? ""}
                        disabled={isRevealed}
                        onChange={(e) => handleChange("sub_row4_res", e.target.value)}
                        onBlur={() => handleBlurText("sub_row4_res", ["5, a whole number", "5", "a whole number"])}
                        className={`w-full rounded border px-2 py-1 font-mono text-xs ${inputClass("sub_row4_res")}`}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Question 2: Division Closure */}
          <div className="space-y-3 pt-4 border-t border-teal-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-200 pb-2">
              <div className="flex items-start gap-2">
                <span className="font-bold text-teal-900 font-heading">2.</span>
                <p className="font-heading font-bold text-teal-950 text-sm sm:text-base">
                  Are the whole numbers closed under division?
                </p>
              </div>

              {/* Yes / No Selector */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {["Yes", "No"].map((opt) => {
                  const current = answers["div_closed_decision"];
                  const isSelected = isRevealed ? opt === "No" : current === opt;
                  const isCorrect = opt === "No";
                  return (
                    <button
                      key={opt}
                      disabled={isRevealed}
                      onClick={() => handleSelectAnswer("div_closed_decision", opt, "No")}
                      className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all border ${
                        isRevealed
                          ? isCorrect
                            ? "bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-xs"
                            : "bg-gray-100 text-gray-400 border-gray-200 opacity-60"
                          : isSelected
                          ? graded["div_closed_decision"]?.correct
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

            <p className="text-xs text-foreground/80">Now observe this table:</p>

            <div className="overflow-x-auto rounded-xl border border-teal-200 bg-white">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-teal-600 text-white">
                    <th className="border border-teal-500 px-3 py-2 text-center w-24">a</th>
                    <th className="border border-teal-500 px-2 py-2 text-center w-10">÷</th>
                    <th className="border border-teal-500 px-3 py-2 text-center w-24">b</th>
                    <th className="border border-teal-500 px-2 py-2 text-center w-10">=</th>
                    <th className="border border-teal-500 px-4 py-2">Result &amp; State</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-teal-100 px-3 py-2 text-center font-mono font-bold">6</td>
                    <td className="border border-teal-100 px-2 py-2 text-center font-bold text-teal-700">÷</td>
                    <td className="border border-teal-100 px-3 py-2 text-center font-mono font-bold">3</td>
                    <td className="border border-teal-100 px-2 py-2 text-center font-bold">=</td>
                    <td className="border border-teal-100 px-4 py-2 font-medium text-emerald-700">
                      <strong>2</strong>, a whole number
                    </td>
                  </tr>
                  <tr className="bg-rose-50/30">
                    <td className="border border-teal-100 px-3 py-2 text-center font-mono font-bold">5</td>
                    <td className="border border-teal-100 px-2 py-2 text-center font-bold text-teal-700">÷</td>
                    <td className="border border-teal-100 px-3 py-2 text-center font-mono font-bold">2</td>
                    <td className="border border-teal-100 px-2 py-2 text-center font-bold">=</td>
                    <td className="border border-teal-100 px-4 py-2 font-medium text-rose-700">
                      <strong>5/2</strong>, is not a whole number
                    </td>
                  </tr>

                  {/* Row 3 Editable */}
                  <tr className="bg-white">
                    <td className="border border-teal-100 px-2 py-1.5 text-center">
                      <input
                        type="text"
                        placeholder="7"
                        value={isRevealed ? "7" : answers["div_row3_a"] ?? ""}
                        disabled={isRevealed}
                        onChange={(e) => handleChange("div_row3_a", e.target.value)}
                        onBlur={() => handleBlurText("div_row3_a", ["7", "any"])}
                        className={`w-16 rounded border text-center font-mono text-xs py-1 ${inputClass("div_row3_a")}`}
                      />
                    </td>
                    <td className="border border-teal-100 px-2 py-2 text-center font-bold text-teal-700">÷</td>
                    <td className="border border-teal-100 px-2 py-1.5 text-center">
                      <input
                        type="text"
                        placeholder="3"
                        value={isRevealed ? "3" : answers["div_row3_b"] ?? ""}
                        disabled={isRevealed}
                        onChange={(e) => handleChange("div_row3_b", e.target.value)}
                        onBlur={() => handleBlurText("div_row3_b", ["3", "any"])}
                        className={`w-16 rounded border text-center font-mono text-xs py-1 ${inputClass("div_row3_b")}`}
                      />
                    </td>
                    <td className="border border-teal-100 px-2 py-2 text-center font-bold">=</td>
                    <td className="border border-teal-100 px-3 py-1.5">
                      <input
                        type="text"
                        placeholder="7/3, is not a whole number"
                        value={isRevealed ? "7/3, is not a whole number" : answers["div_row3_res"] ?? ""}
                        disabled={isRevealed}
                        onChange={(e) => handleChange("div_row3_res", e.target.value)}
                        onBlur={() => handleBlurText("div_row3_res", ["7/3, is not a whole number", "not a whole number", "7/3"])}
                        className={`w-full rounded border px-2 py-1 font-mono text-xs ${inputClass("div_row3_res")}`}
                      />
                    </td>
                  </tr>

                  {/* Row 4 Editable */}
                  <tr className="bg-teal-50/20">
                    <td className="border border-teal-100 px-2 py-1.5 text-center">
                      <input
                        type="text"
                        placeholder="8"
                        value={isRevealed ? "8" : answers["div_row4_a"] ?? ""}
                        disabled={isRevealed}
                        onChange={(e) => handleChange("div_row4_a", e.target.value)}
                        onBlur={() => handleBlurText("div_row4_a", ["8", "any"])}
                        className={`w-16 rounded border text-center font-mono text-xs py-1 ${inputClass("div_row4_a")}`}
                      />
                    </td>
                    <td className="border border-teal-100 px-2 py-2 text-center font-bold text-teal-700">÷</td>
                    <td className="border border-teal-100 px-2 py-1.5 text-center">
                      <input
                        type="text"
                        placeholder="4"
                        value={isRevealed ? "4" : answers["div_row4_b"] ?? ""}
                        disabled={isRevealed}
                        onChange={(e) => handleChange("div_row4_b", e.target.value)}
                        onBlur={() => handleBlurText("div_row4_b", ["4", "any"])}
                        className={`w-16 rounded border text-center font-mono text-xs py-1 ${inputClass("div_row4_b")}`}
                      />
                    </td>
                    <td className="border border-teal-100 px-2 py-2 text-center font-bold">=</td>
                    <td className="border border-teal-100 px-3 py-1.5">
                      <input
                        type="text"
                        placeholder="2, a whole number"
                        value={isRevealed ? "2, a whole number" : answers["div_row4_res"] ?? ""}
                        disabled={isRevealed}
                        onChange={(e) => handleChange("div_row4_res", e.target.value)}
                        onBlur={() => handleBlurText("div_row4_res", ["2, a whole number", "2", "a whole number"])}
                        className={`w-full rounded border px-2 py-1 font-mono text-xs ${inputClass("div_row4_res")}`}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-foreground/70 italic">
              Confirm it by taking a few more examples.
            </p>
          </div>
        </div>
      </div>

      {/* ── Section 3: Division by Zero ─────────────────────────── */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-teal-700 text-white px-4 py-1.5 rounded-r-full -ml-4 shadow-sm">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider">
            Division by Zero
          </h2>
        </div>

        <div className="space-y-3 text-foreground/90">
          <p>
            Let us find <strong className="font-mono text-base text-teal-950">6 ÷ 2</strong>.
          </p>
          <p>
            <strong>6 divided by 2</strong> means, we subtract 2 from 6 repeatedly i.e. we subtract 2 from 6 again and again till we get zero:
          </p>
        </div>

        {/* Interactive Repeated Subtraction Visualizer */}
        <div className="bg-gradient-to-br from-teal-50 via-white to-teal-50/60 p-5 rounded-2xl border border-teal-200 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-teal-100 pb-3">
            <span className="font-heading font-bold text-teal-900 text-sm">
              Repeated Subtraction Simulator:
            </span>
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-teal-800">Total:</label>
              <select
                aria-label="Total dividend for repeated subtraction"
                value={divTotal}
                onChange={(e) => setDivTotal(Number(e.target.value))}
                className="rounded border border-teal-300 bg-white px-2 py-0.5 font-mono text-xs font-bold"
              >
                {[6, 8, 10, 12].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <span className="text-xs font-bold text-teal-700">÷</span>

              <label className="text-xs font-semibold text-teal-800">Subtract:</label>
              <select
                aria-label="Divisor for repeated subtraction"
                value={divDivisor}
                onChange={(e) => setDivDivisor(Number(e.target.value))}
                className="rounded border border-teal-300 bg-white px-2 py-0.5 font-mono text-xs font-bold"
              >
                {[1, 2, 3, 0].map((n) => (
                  <option key={n} value={n}>
                    {n === 0 ? "0 (Zero)" : n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Repeated subtraction steps display */}
          {divDivisor === 0 ? (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
              <p className="text-rose-950 font-bold">
                ⚠️ What happens when we divide by 0 ({divTotal} ÷ 0)?
              </p>
              <div className="font-mono text-xs space-y-1 text-rose-900 bg-white/80 p-3 rounded-lg border border-rose-100">
                <p>Step 1: {divTotal} - 0 = {divTotal}</p>
                <p>Step 2: {divTotal} - 0 = {divTotal}</p>
                <p>Step 3: {divTotal} - 0 = {divTotal} ... (Will never reach 0!)</p>
              </div>
              <p className="text-xs text-rose-800 font-semibold">
                Because we can keep subtracting 0 endlessly without ever reducing {divTotal}, <strong>division by zero is not defined</strong>.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                {divSteps.map((res, idx) => {
                  const prev = idx === 0 ? divTotal : divSteps[idx - 1];
                  return (
                    <div
                      key={idx}
                      className="bg-white p-3 rounded-xl border border-teal-100 shadow-xs flex items-center justify-between"
                    >
                      <span className="font-bold text-teal-700">Step {idx + 1}:</span>
                      <span className="font-bold text-teal-950">
                        {prev} - {divDivisor} = {res}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs sm:text-sm font-medium text-emerald-950">
                <span>
                  Reached 0 in <strong>{divSteps.length} subtractions</strong>.
                </span>
                <span className="font-mono font-extrabold text-emerald-800 text-base">
                  {divTotal} ÷ {divDivisor} = {divSteps.length}
                </span>
              </div>
            </div>
          )}
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
          20
        </span>
        <span className="tracking-wide flex-1 text-center font-heading text-xs sm:text-sm">
          Government&apos;s Gift for Students&apos; Progress
        </span>
      </div>
    </div>
  );
}
