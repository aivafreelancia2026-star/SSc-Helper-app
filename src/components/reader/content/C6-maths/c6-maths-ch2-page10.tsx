"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

interface Q1Item {
  id: string;
  sub: string;
  given: string;
  question: string;
  correctAns: string[];
  explanation: string;
}

const Q1_ITEMS: Q1Item[] = [
  {
    id: "q1_1",
    sub: "i",
    given: "28 × 19 = 532",
    question: "then 19 × 28 =",
    correctAns: ["532"],
    explanation: "Commutative property under multiplication: a × b = b × a = 532",
  },
  {
    id: "q1_2",
    sub: "ii",
    given: "1 × 47 = 47",
    question: "then 47 × 1 =",
    correctAns: ["47"],
    explanation: "Multiplicative identity / Commutative property: 47 × 1 = 47",
  },
  {
    id: "q1_3",
    sub: "iii",
    given: "a × b = c",
    question: "then b × a =",
    correctAns: ["c"],
    explanation: "Commutative property of multiplication: b × a = a × b = c",
  },
  {
    id: "q1_4",
    sub: "iv",
    given: "58 + 42 = 100",
    question: "then 42 + 58 =",
    correctAns: ["100"],
    explanation: "Commutative property under addition: a + b = b + a = 100",
  },
  {
    id: "q1_5",
    sub: "v",
    given: "85 + 0 = 85",
    question: "then 0 + 85 =",
    correctAns: ["85"],
    explanation: "Additive identity: 0 + 85 = 85 + 0 = 85",
  },
  {
    id: "q1_6",
    sub: "vi",
    given: "a + b = d",
    question: "then b + a =",
    correctAns: ["d"],
    explanation: "Commutative property under addition: b + a = a + b = d",
  },
];

interface MatchItem {
  id: string;
  sub: string;
  expr: string;
  correctLetter: string;
  options: { letter: string; desc: string }[];
}

const MATCH_OPTIONS = [
  { letter: "a", desc: "Additive identity" },
  { letter: "b", desc: "Multiplicative identity" },
  { letter: "c", desc: "Commutative under addition" },
  { letter: "d", desc: "Distributive property of multiplication over addition" },
  { letter: "e", desc: "Commutative under multiplication" },
];

const MATCH_ITEMS: MatchItem[] = [
  {
    id: "m1",
    sub: "i",
    expr: "1991 + 7 = 7 + 1991",
    correctLetter: "c",
    options: MATCH_OPTIONS,
  },
  {
    id: "m2",
    sub: "ii",
    expr: "68 × 50 = 50 × 68",
    correctLetter: "e",
    options: MATCH_OPTIONS,
  },
  {
    id: "m3",
    sub: "iii",
    expr: "1",
    correctLetter: "b",
    options: MATCH_OPTIONS,
  },
  {
    id: "m4",
    sub: "iv",
    expr: "0",
    correctLetter: "a",
    options: MATCH_OPTIONS,
  },
  {
    id: "m5",
    sub: "v",
    expr: "879 × (100 + 30) = 879 × 100 + 879 × 30",
    correctLetter: "d",
    options: MATCH_OPTIONS,
  },
];

export function C6MathsCh2Page10() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch2-page10";

  // State for user answers
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  const ALL_INPUT_IDS = [
    ...Q1_ITEMS.map((item) => `${item.id}_ans`),
    "q2_1_ans",
    "q2_2_ans",
    "q3_1_ans",
    "q3_2_ans",
    "q4_1_ans",
    "q4_2_ans",
    "q5_1_ans",
    "q5_2_ans",
    "q6_ans",
    "q7_ans",
    ...MATCH_ITEMS.map((item) => `${item.id}_ans`),
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

      {/* ── Exercise 2.2 Header ──────────────────────────────────── */}
      <div className="rounded-[16px] overflow-hidden shadow-sm border border-teal-600">
        <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-white">✏️</span>
            <div>
              <h1 className="font-heading text-xl md:text-2xl font-extrabold text-white tracking-wide">
                Exercise - 2.2
              </h1>
              <p className="text-teal-100 text-xs font-medium">Chapter 2: Whole Numbers</p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-white/20 text-white rounded-full backdrop-blur-xs">
            {isRevealed ? "All Answers Revealed" : "Interactive Worksheet"}
          </span>
        </div>
      </div>

      {/* ── Question 1: Give results without actual calculations ──── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            1. Give the results without actually performing the operations using the given information:
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            6 Points
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {Q1_ITEMS.map((item) => {
            const inputId = `${item.id}_ans`;
            return (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/20 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-800 font-mono">{item.sub}.</span>
                  <span className="font-mono text-xs font-semibold text-foreground/80">{item.given}</span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="font-mono font-bold text-teal-950 text-xs">{item.question}</span>
                  <div className="relative w-24">
                    <input
                      type="text"
                      placeholder="?"
                      value={isRevealed ? item.correctAns[0] : answers[inputId] ?? ""}
                      disabled={isRevealed}
                      onChange={(e) => handleChange(inputId, e.target.value)}
                      onBlur={() => handleBlurText(inputId, item.correctAns)}
                      className={`w-full rounded-lg border bg-white px-2.5 py-1 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                        inputId
                      )}`}
                    />
                    {badge(inputId)}
                  </div>
                </div>

                {isRevealed && (
                  <p className="text-[11px] text-emerald-800 font-medium pt-1">💡 {item.explanation}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Question 2: Find sum by suitable rearrangement ───────── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            2. Find the sum by suitable rearrangement:
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            2 Points
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* i. 238 + 695 + 162 */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-teal-800">i. 238 + 695 + 162</span>
              <div className="relative w-32">
                <input
                  type="text"
                  placeholder="Sum..."
                  value={isRevealed ? "1095" : answers["q2_1_ans"] ?? ""}
                  disabled={isRevealed}
                  onChange={(e) => handleChange("q2_1_ans", e.target.value)}
                  onBlur={() => handleBlurText("q2_1_ans", ["1095"])}
                  className={`w-full rounded-lg border bg-white px-3 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                    "q2_1_ans"
                  )}`}
                />
                {badge("q2_1_ans")}
              </div>
            </div>
            <p className="text-xs text-teal-900 font-mono bg-white p-2 rounded border border-teal-100">
              💡 Grouping: (238 + 162) + 695 = 400 + 695 = <strong>1095</strong>
            </p>
          </div>

          {/* ii. 154 + 197 + 46 + 203 */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-teal-800">ii. 154 + 197 + 46 + 203</span>
              <div className="relative w-32">
                <input
                  type="text"
                  placeholder="Sum..."
                  value={isRevealed ? "600" : answers["q2_2_ans"] ?? ""}
                  disabled={isRevealed}
                  onChange={(e) => handleChange("q2_2_ans", e.target.value)}
                  onBlur={() => handleBlurText("q2_2_ans", ["600"])}
                  className={`w-full rounded-lg border bg-white px-3 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                    "q2_2_ans"
                  )}`}
                />
                {badge("q2_2_ans")}
              </div>
            </div>
            <p className="text-xs text-teal-900 font-mono bg-white p-2 rounded border border-teal-100">
              💡 Grouping: (154 + 46) + (197 + 203) = 200 + 400 = <strong>600</strong>
            </p>
          </div>
        </div>
      </div>

      {/* ── Question 3: Find product by suitable rearrangement ────── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            3. Find the product by suitable rearrangement:
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            2 Points
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* i. 25 × 1963 × 4 */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-teal-800">i. 25 × 1963 × 4</span>
              <div className="relative w-36">
                <input
                  type="text"
                  placeholder="Product..."
                  value={isRevealed ? "196300" : answers["q3_1_ans"] ?? ""}
                  disabled={isRevealed}
                  onChange={(e) => handleChange("q3_1_ans", e.target.value)}
                  onBlur={() => handleBlurText("q3_1_ans", ["196300", "1,96,300"])}
                  className={`w-full rounded-lg border bg-white px-3 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                    "q3_1_ans"
                  )}`}
                />
                {badge("q3_1_ans")}
              </div>
            </div>
            <p className="text-xs text-teal-900 font-mono bg-white p-2 rounded border border-teal-100">
              💡 Grouping: (25 × 4) × 1963 = 100 × 1963 = <strong>196300</strong>
            </p>
          </div>

          {/* ii. 20 × 255 × 50 × 6 */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-teal-800">ii. 20 × 255 × 50 × 6</span>
              <div className="relative w-36">
                <input
                  type="text"
                  placeholder="Product..."
                  value={isRevealed ? "1530000" : answers["q3_2_ans"] ?? ""}
                  disabled={isRevealed}
                  onChange={(e) => handleChange("q3_2_ans", e.target.value)}
                  onBlur={() => handleBlurText("q3_2_ans", ["1530000", "15,30,000"])}
                  className={`w-full rounded-lg border bg-white px-3 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                    "q3_2_ans"
                  )}`}
                />
                {badge("q3_2_ans")}
              </div>
            </div>
            <p className="text-xs text-teal-900 font-mono bg-white p-2 rounded border border-teal-100">
              💡 Grouping: (20 × 50) × (255 × 6) = 1000 × 1530 = <strong>1530000</strong>
            </p>
          </div>
        </div>
      </div>

      {/* ── Question 4: Find value using distributive property ───── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            4. Find the value of the following:
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            2 Points
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* i. (368 × 12) + (18 × 368) */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-teal-800">i. (368 × 12) + (18 × 368)</span>
              <div className="relative w-32">
                <input
                  type="text"
                  placeholder="Value..."
                  value={isRevealed ? "11040" : answers["q4_1_ans"] ?? ""}
                  disabled={isRevealed}
                  onChange={(e) => handleChange("q4_1_ans", e.target.value)}
                  onBlur={() => handleBlurText("q4_1_ans", ["11040", "11,040"])}
                  className={`w-full rounded-lg border bg-white px-3 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                    "q4_1_ans"
                  )}`}
                />
                {badge("q4_1_ans")}
              </div>
            </div>
            <p className="text-xs text-teal-900 font-mono bg-white p-2 rounded border border-teal-100">
              💡 Common 368: 368 × (12 + 18) = 368 × 30 = <strong>11040</strong>
            </p>
          </div>

          {/* ii. (79 × 4319) + (4319 × 11) */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-teal-800">ii. (79 × 4319) + (4319 × 11)</span>
              <div className="relative w-36">
                <input
                  type="text"
                  placeholder="Value..."
                  value={isRevealed ? "388710" : answers["q4_2_ans"] ?? ""}
                  disabled={isRevealed}
                  onChange={(e) => handleChange("q4_2_ans", e.target.value)}
                  onBlur={() => handleBlurText("q4_2_ans", ["388710", "3,88,710"])}
                  className={`w-full rounded-lg border bg-white px-3 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                    "q4_2_ans"
                  )}`}
                />
                {badge("q4_2_ans")}
              </div>
            </div>
            <p className="text-xs text-teal-900 font-mono bg-white p-2 rounded border border-teal-100">
              💡 Common 4319: 4319 × (79 + 11) = 4319 × 90 = <strong>388710</strong>
            </p>
          </div>
        </div>
      </div>

      {/* ── Question 5: Product using suitable properties ─────────── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            5. Find the product using suitable properties:
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            2 Points
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* i. 205 × 1989 */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-teal-800">i. 205 × 1989</span>
              <div className="relative w-36">
                <input
                  type="text"
                  placeholder="Product..."
                  value={isRevealed ? "407745" : answers["q5_1_ans"] ?? ""}
                  disabled={isRevealed}
                  onChange={(e) => handleChange("q5_1_ans", e.target.value)}
                  onBlur={() => handleBlurText("q5_1_ans", ["407745", "4,07,745"])}
                  className={`w-full rounded-lg border bg-white px-3 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                    "q5_1_ans"
                  )}`}
                />
                {badge("q5_1_ans")}
              </div>
            </div>
            <p className="text-xs text-teal-900 font-mono bg-white p-2 rounded border border-teal-100">
              💡 (200 + 5) × 1989 = 397800 + 9945 = <strong>407745</strong>
            </p>
          </div>

          {/* ii. 1991 × 1005 */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-teal-800">ii. 1991 × 1005</span>
              <div className="relative w-36">
                <input
                  type="text"
                  placeholder="Product..."
                  value={isRevealed ? "2000955" : answers["q5_2_ans"] ?? ""}
                  disabled={isRevealed}
                  onChange={(e) => handleChange("q5_2_ans", e.target.value)}
                  onBlur={() => handleBlurText("q5_2_ans", ["2000955", "20,00,955"])}
                  className={`w-full rounded-lg border bg-white px-3 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                    "q5_2_ans"
                  )}`}
                />
                {badge("q5_2_ans")}
              </div>
            </div>
            <p className="text-xs text-teal-900 font-mono bg-white p-2 rounded border border-teal-100">
              💡 1991 × (1000 + 5) = 1991000 + 9955 = <strong>2000955</strong>
            </p>
          </div>
        </div>
      </div>

      {/* ── Question 6 & 7: Word Problems ────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Question 6: Milk vendor */}
        <div className="p-5 rounded-[16px] border border-teal-200 bg-white shadow-sm space-y-3">
          <h3 className="font-heading font-bold text-teal-950 text-sm sm:text-base">
            6. Milk Vendor Supply Problem
          </h3>
          <p className="text-foreground/90 text-xs sm:text-sm">
            A milk vendor supplies <strong>56 liters</strong> of milk in the morning and <strong>44 liters</strong> of milk in the evening to a hostel. If the milk costs <strong>₹ 30 per liter</strong>, how much money does he get per day?
          </p>

          <div className="flex items-center justify-between pt-2">
            <span className="font-semibold text-teal-900 text-xs">Total Money (₹):</span>
            <div className="relative w-32">
              <input
                type="text"
                placeholder="₹ Amount"
                value={isRevealed ? "3000" : answers["q6_ans"] ?? ""}
                disabled={isRevealed}
                onChange={(e) => handleChange("q6_ans", e.target.value)}
                onBlur={() => handleBlurText("q6_ans", ["3000", "3,000", "₹3000", "₹ 3000"])}
                className={`w-full rounded-lg border bg-white px-3 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                  "q6_ans"
                )}`}
              />
              {badge("q6_ans")}
            </div>
          </div>

          <p className="text-xs text-teal-900 font-mono bg-teal-50 p-2 rounded border border-teal-100">
            💡 30 × (56 + 44) = 30 × 100 = <strong>₹ 3000</strong> per day.
          </p>
        </div>

        {/* Question 7: Chandana and Venu */}
        <div className="p-5 rounded-[16px] border border-teal-200 bg-white shadow-sm space-y-3">
          <h3 className="font-heading font-bold text-teal-950 text-sm sm:text-base">
            7. Note Books Purchase Problem
          </h3>
          <p className="text-foreground/90 text-xs sm:text-sm">
            Chandana and Venu purchased <strong>12 note books</strong> and <strong>10 note books</strong> respectively. The cost of each note book is <strong>₹ 15</strong>. How much amount should they pay to the shop keeper?
          </p>

          <div className="flex items-center justify-between pt-2">
            <span className="font-semibold text-teal-900 text-xs">Total Amount (₹):</span>
            <div className="relative w-32">
              <input
                type="text"
                placeholder="₹ Amount"
                value={isRevealed ? "330" : answers["q7_ans"] ?? ""}
                disabled={isRevealed}
                onChange={(e) => handleChange("q7_ans", e.target.value)}
                onBlur={() => handleBlurText("q7_ans", ["330", "₹330", "₹ 330"])}
                className={`w-full rounded-lg border bg-white px-3 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                  "q7_ans"
                )}`}
              />
              {badge("q7_ans")}
            </div>
          </div>

          <p className="text-xs text-teal-900 font-mono bg-teal-50 p-2 rounded border border-teal-100">
            💡 15 × (12 + 10) = 15 × 22 = <strong>₹ 330</strong>.
          </p>
        </div>
      </div>

      {/* ── Question 8: Match the Following ──────────────────────── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            8. Match the following:
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            5 Points
          </span>
        </div>

        <div className="space-y-3">
          {MATCH_ITEMS.map((item) => {
            const inputId = `${item.id}_ans`;
            const current = answers[inputId];
            const isGraded = graded[inputId];
            const correctOpt = MATCH_OPTIONS.find((o) => o.letter === item.correctLetter);
            return (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-teal-100 bg-teal-50/20 flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono font-bold text-teal-800 w-6">{item.sub}.</span>
                  <span className="font-mono font-bold text-teal-950 text-xs sm:text-sm">
                    {item.expr}
                  </span>
                </div>

                <div className="relative w-full md:w-80">
                  <select
                    aria-label={`Match property for ${item.expr}`}
                    value={isRevealed ? item.correctLetter : current ?? ""}
                    disabled={isRevealed}
                    onChange={(e) => handleSelectAnswer(inputId, e.target.value, item.correctLetter)}
                    className={`w-full rounded-lg border bg-white px-3 py-1.5 text-xs font-semibold focus:outline-none transition-all ${
                      isRevealed
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold"
                        : isGraded?.correct === true
                        ? "border-green-500 bg-green-50 text-green-800 font-bold"
                        : isGraded?.correct === false
                        ? "border-rose-400 bg-rose-50 text-rose-800"
                        : "border-teal-200"
                    }`}
                  >
                    <option value="">-- Select matching property --</option>
                    {item.options.map((opt) => (
                      <option key={opt.letter} value={opt.letter}>
                        [{opt.letter}] {opt.desc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Section 2.4 PATTERNS IN WHOLE NUMBERS (Intro) ─────────── */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-teal-700 text-white px-4 py-1.5 rounded-r-full -ml-4 shadow-sm">
          <span className="font-bold">2.4</span>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider">
            Patterns in Whole Numbers
          </h2>
        </div>

        <div className="space-y-3 text-foreground/90 leading-relaxed bg-gradient-to-r from-teal-50/70 to-teal-50/20 p-5 rounded-2xl border border-teal-200">
          <p>
            We shall try to arrange numbers in elementary shapes made up of dots. The dots would be placed on a grid with equidistant points along the two axes. The shapes we would make are:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-bold pt-1">
            <div className="bg-white p-2.5 rounded-lg border border-teal-200 text-teal-900 shadow-xs">
              (i) a Line ───
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-teal-200 text-teal-900 shadow-xs">
              (ii) a Rectangle ▰
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-teal-200 text-teal-900 shadow-xs">
              (iii) a Square ◼
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-teal-200 text-teal-900 shadow-xs">
              (iv) a Triangle ▲
            </div>
          </div>
          <p className="text-xs text-teal-950 font-medium pt-1">
            Every number should be arranged in one of these shapes. No other irregular shape is allowed!
          </p>
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
          25
        </span>
        <span className="tracking-wide flex-1 text-center font-heading text-xs sm:text-sm">
          Whole Numbers
        </span>
      </div>
    </div>
  );
}
