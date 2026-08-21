"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

export function C6MathsCh2Page6() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch2-page6";

  // State for user answers
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  // Commutativity Grid Matrix Visualizer (Rows & Columns)
  const [gridRows, setGridRows] = useState<number>(4);
  const [gridCols, setGridCols] = useState<number>(3);

  // Live addition commutativity checker
  const [commAddA, setCommAddA] = useState<number>(16);
  const [commAddB, setCommAddB] = useState<number>(11);

  // Live multiplication commutativity checker
  const [commMultA, setCommMultA] = useState<number>(5);
  const [commMultB, setCommMultB] = useState<number>(6);

  const ALL_INPUT_IDS = [
    "do_this_1_12div3",
    "do_this_1_42div7",
    "do_this_2_6div0",
    "do_this_2_9div0",
    "comm_check_add",
    "comm_check_mult",
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

      {/* ── Section 1: Division by Repeated Subtraction (Continued) ── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            Division as Repeated Subtraction &amp; Division by Zero
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            Core Concept
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Example 1: 6 ÷ 2 */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/20 space-y-2">
            <p className="font-mono font-extrabold text-teal-950 text-base">
              Example 1: 6 ÷ 2
            </p>
            <div className="space-y-1.5 font-mono text-xs text-foreground/85 bg-white p-3 rounded-lg border border-teal-100">
              <p className="flex justify-between"><span>6 - 2 = 4</span> <span className="font-sans font-semibold text-teal-700">once</span></p>
              <p className="flex justify-between"><span>4 - 2 = 2</span> <span className="font-sans font-semibold text-teal-700">twice</span></p>
              <p className="flex justify-between"><span>2 - 2 = 0</span> <span className="font-sans font-semibold text-teal-700">thrice</span></p>
            </div>
            <p className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-md border border-emerald-200">
              So, 6 ÷ 2 = 3
            </p>
          </div>

          {/* Example 2: 3 ÷ 0 */}
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/20 space-y-2">
            <p className="font-mono font-extrabold text-rose-950 text-base">
              Example 2: 3 ÷ 0
            </p>
            <div className="space-y-1.5 font-mono text-xs text-foreground/85 bg-white p-3 rounded-lg border border-rose-100">
              <p className="flex justify-between"><span>3 - 0 = 3</span> <span className="font-sans font-semibold text-rose-700">once</span></p>
              <p className="flex justify-between"><span>3 - 0 = 3</span> <span className="font-sans font-semibold text-rose-700">twice</span></p>
              <p className="flex justify-between"><span>3 - 0 = 3</span> <span className="font-sans font-semibold text-rose-700">thrice and so on...</span></p>
            </div>
            <p className="text-xs font-semibold text-rose-900 bg-rose-50 px-2.5 py-1.5 rounded-md border border-rose-200">
              Will this ever stop? No. So, 3 ÷ 0 is not a number we can reach.
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 font-medium text-xs sm:text-sm">
          💡 <strong>Conclusion:</strong> Division of a whole number by <strong>0</strong> does not give a known number as answer. i.e., <strong>division by zero is not defined</strong>.
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

        <div className="p-5 space-y-4">
          {/* Question 1: Find out 12 ÷ 3 and 42 ÷ 7 */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-teal-200 shadow-xs">
            <span className="font-bold text-teal-900 font-heading">
              1. Find out 12 ÷ 3 and 42 ÷ 7:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* 12 ÷ 3 */}
              <div className="p-3 rounded-lg bg-teal-50/40 border border-teal-100 flex items-center justify-between gap-3">
                <span className="font-mono font-extrabold text-teal-950 text-base">
                  12 ÷ 3 =
                </span>
                <div className="relative w-32">
                  <input
                    type="text"
                    placeholder="e.g. 4"
                    value={isRevealed ? "4" : answers["do_this_1_12div3"] ?? ""}
                    disabled={isRevealed}
                    onChange={(e) => handleChange("do_this_1_12div3", e.target.value)}
                    onBlur={() => handleBlurText("do_this_1_12div3", ["4", "four"])}
                    className={`w-full rounded-lg border bg-white px-3 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                      "do_this_1_12div3"
                    )}`}
                  />
                  {badge("do_this_1_12div3")}
                </div>
              </div>

              {/* 42 ÷ 7 */}
              <div className="p-3 rounded-lg bg-teal-50/40 border border-teal-100 flex items-center justify-between gap-3">
                <span className="font-mono font-extrabold text-teal-950 text-base">
                  42 ÷ 7 =
                </span>
                <div className="relative w-32">
                  <input
                    type="text"
                    placeholder="e.g. 6"
                    value={isRevealed ? "6" : answers["do_this_1_42div7"] ?? ""}
                    disabled={isRevealed}
                    onChange={(e) => handleChange("do_this_1_42div7", e.target.value)}
                    onBlur={() => handleBlurText("do_this_1_42div7", ["6", "six"])}
                    className={`w-full rounded-lg border bg-white px-3 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                      "do_this_1_42div7"
                    )}`}
                  />
                  {badge("do_this_1_42div7")}
                </div>
              </div>
            </div>
          </div>

          {/* Question 2: What would 6 ÷ 0 and 9 ÷ 0 be equal to? */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-teal-200 shadow-xs">
            <span className="font-bold text-teal-900 font-heading">
              2. What would 6 ÷ 0 and 9 ÷ 0 be equal to?
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* 6 ÷ 0 */}
              <div className="p-3 rounded-lg bg-teal-50/40 border border-teal-100 flex items-center justify-between gap-3">
                <span className="font-mono font-extrabold text-teal-950 text-base">
                  6 ÷ 0 =
                </span>
                <div className="relative w-44">
                  <select
                    aria-label="Result of 6 divided by 0"
                    value={
                      isRevealed
                        ? "Not defined"
                        : answers["do_this_2_6div0"] ?? ""
                    }
                    disabled={isRevealed}
                    onChange={(e) =>
                      handleSelectAnswer("do_this_2_6div0", e.target.value, "Not defined")
                    }
                    className={`w-full rounded-lg border bg-white px-2.5 py-1.5 text-xs sm:text-sm font-bold focus:outline-none transition-all ${
                      isRevealed
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold"
                        : graded["do_this_2_6div0"]?.correct
                        ? "border-green-500 bg-green-50 text-green-800 font-bold"
                        : graded["do_this_2_6div0"]?.correct === false
                        ? "border-rose-400 bg-rose-50 text-rose-800"
                        : "border-teal-200"
                    }`}
                  >
                    <option value="">-- Choose result --</option>
                    <option value="Not defined">Not defined</option>
                    <option value="0">0</option>
                    <option value="6">6</option>
                    <option value="Infinity">Infinity</option>
                  </select>
                </div>
              </div>

              {/* 9 ÷ 0 */}
              <div className="p-3 rounded-lg bg-teal-50/40 border border-teal-100 flex items-center justify-between gap-3">
                <span className="font-mono font-extrabold text-teal-950 text-base">
                  9 ÷ 0 =
                </span>
                <div className="relative w-44">
                  <select
                    aria-label="Result of 9 divided by 0"
                    value={
                      isRevealed
                        ? "Not defined"
                        : answers["do_this_2_9div0"] ?? ""
                    }
                    disabled={isRevealed}
                    onChange={(e) =>
                      handleSelectAnswer("do_this_2_9div0", e.target.value, "Not defined")
                    }
                    className={`w-full rounded-lg border bg-white px-2.5 py-1.5 text-xs sm:text-sm font-bold focus:outline-none transition-all ${
                      isRevealed
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold"
                        : graded["do_this_2_9div0"]?.correct
                        ? "border-green-500 bg-green-50 text-green-800 font-bold"
                        : graded["do_this_2_9div0"]?.correct === false
                        ? "border-rose-400 bg-rose-50 text-rose-800"
                        : "border-teal-200"
                    }`}
                  >
                    <option value="">-- Choose result --</option>
                    <option value="Not defined">Not defined</option>
                    <option value="0">0</option>
                    <option value="9">9</option>
                    <option value="Infinity">Infinity</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 3: Commutativity of Whole Numbers ────────────── */}
      <div className="space-y-5">
        <div className="inline-flex items-center gap-2 bg-teal-700 text-white px-4 py-1.5 rounded-r-full -ml-4 shadow-sm">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider">
            Commutativity of Whole Numbers
          </h2>
        </div>

        {/* 1. Commutativity of Addition */}
        <div className="rounded-[16px] border border-teal-200 bg-white p-5 space-y-4 shadow-sm">
          <h3 className="font-heading font-bold text-teal-950 text-base">
            1. Commutativity under Addition
          </h3>
          <p className="text-foreground/90">
            Observe the following additions:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-sm">
            <div className="bg-teal-50/50 p-3 rounded-xl border border-teal-100 flex items-center justify-between">
              <span><strong>2 + 3 = 5</strong> ; <strong>3 + 2 = 5</strong></span>
              <span className="text-xs font-sans font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">2+3 = 3+2</span>
            </div>
            <div className="bg-teal-50/50 p-3 rounded-xl border border-teal-100 flex items-center justify-between">
              <span><strong>7 + 8 = 15</strong> ; <strong>8 + 7 = 15</strong></span>
              <span className="text-xs font-sans font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">7+8 = 8+7</span>
            </div>
          </div>

          <p className="text-xs text-foreground/80">
            We find that <span className="font-mono font-bold">7 + 8</span> and <span className="font-mono font-bold">8 + 7</span> are also equal. Here, the sum is same, though the order of addition of a pair of whole numbers is changed.
          </p>

          {/* Interactive Addition Order Tester */}
          <div className="p-3.5 bg-gradient-to-r from-teal-50 to-emerald-50/40 rounded-xl border border-teal-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-teal-900">Check:</label>
              <input
                type="number"
                min="0"
                value={commAddA}
                onChange={(e) => setCommAddA(Math.max(0, Number(e.target.value)))}
                className="w-16 rounded border border-teal-300 bg-white px-2 py-1 font-mono text-center text-sm font-bold"
              />
              <span className="font-bold text-teal-700">+</span>
              <input
                type="number"
                min="0"
                value={commAddB}
                onChange={(e) => setCommAddB(Math.max(0, Number(e.target.value)))}
                className="w-16 rounded border border-teal-300 bg-white px-2 py-1 font-mono text-center text-sm font-bold"
              />
              <span className="font-bold text-teal-700">=</span>
              <span className="font-mono font-extrabold text-emerald-700 text-sm">
                {commAddA + commAddB}
              </span>
              <span className="text-xs font-bold text-teal-700 mx-1">and</span>
              <span className="font-mono font-bold text-teal-900 text-sm">
                {commAddB} + {commAddA} = {commAddB + commAddA}
              </span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold">
              ✓ Equal ({commAddA + commAddB})
            </span>
          </div>

          <p className="text-xs text-teal-900 font-medium bg-teal-50 p-2.5 rounded-lg border border-teal-100">
            Thus it is clear that we can add two whole numbers in any order. We say that <strong>addition is commutative for whole numbers</strong>: <span className="font-mono font-bold">a + b = b + a</span>.
          </p>
        </div>

        {/* 2. Commutativity of Multiplication with Visual Dot Grid */}
        <div className="rounded-[16px] border border-teal-200 bg-white p-5 space-y-4 shadow-sm">
          <h3 className="font-heading font-bold text-teal-950 text-base">
            2. Commutativity under Multiplication
          </h3>

          <p className="text-foreground/90">
            Observe the following dot patterns:
          </p>

          {/* SVG Visual Dot Grid: 4 x 3 vs 3 x 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pattern 1: 4 rows x 3 columns */}
            <div className="p-4 bg-teal-50/30 rounded-xl border border-teal-200 text-center space-y-2">
              <span className="font-mono font-bold text-teal-900 text-sm">
                4 rows × 3 columns (4 × 3 = 12)
              </span>
              <div className="flex justify-center py-2">
                <svg viewBox="0 0 160 180" className="w-36 h-40">
                  {/* Outer bounding box */}
                  <rect x="25" y="25" width="110" height="135" fill="#f0fdfa" stroke="#0d9488" strokeWidth="2" rx="6" />
                  {/* Top width arrow */}
                  <line x1="30" y1="12" x2="130" y2="12" stroke="#0d9488" strokeWidth="1.5" />
                  <text x="80" y="10" textAnchor="middle" className="font-mono text-xs font-bold fill-teal-900">3</text>
                  {/* Left height arrow */}
                  <line x1="12" y1="30" x2="12" y2="155" stroke="#0d9488" strokeWidth="1.5" />
                  <text x="8" y="95" textAnchor="middle" className="font-mono text-xs font-bold fill-teal-900">4</text>
                  {/* Dots: 4 rows x 3 cols */}
                  {[0, 1, 2, 3].map((r) =>
                    [0, 1, 2].map((c) => (
                      <circle
                        key={`dot-${r}-${c}`}
                        cx={45 + c * 35}
                        cy={45 + r * 32}
                        r="6"
                        fill="#e11d48"
                      />
                    ))
                  )}
                </svg>
              </div>
              <p className="font-mono font-extrabold text-teal-950 text-base">4 × 3 = 12</p>
            </div>

            {/* Pattern 2: 3 rows x 4 columns */}
            <div className="p-4 bg-teal-50/30 rounded-xl border border-teal-200 text-center space-y-2">
              <span className="font-mono font-bold text-teal-900 text-sm">
                3 rows × 4 columns (3 × 4 = 12)
              </span>
              <div className="flex justify-center py-2">
                <svg viewBox="0 0 180 160" className="w-44 h-40">
                  {/* Outer bounding box */}
                  <rect x="25" y="25" width="135" height="110" fill="#f0fdfa" stroke="#0d9488" strokeWidth="2" rx="6" />
                  {/* Top width arrow */}
                  <line x1="30" y1="12" x2="155" y2="12" stroke="#0d9488" strokeWidth="1.5" />
                  <text x="92" y="10" textAnchor="middle" className="font-mono text-xs font-bold fill-teal-900">4</text>
                  {/* Left height arrow */}
                  <line x1="12" y1="30" x2="12" y2="130" stroke="#0d9488" strokeWidth="1.5" />
                  <text x="8" y="83" textAnchor="middle" className="font-mono text-xs font-bold fill-teal-900">3</text>
                  {/* Dots: 3 rows x 4 cols */}
                  {[0, 1, 2].map((r) =>
                    [0, 1, 2, 3].map((c) => (
                      <circle
                        key={`dot2-${r}-${c}`}
                        cx={45 + c * 32}
                        cy={45 + r * 35}
                        r="6"
                        fill="#e11d48"
                      />
                    ))
                  )}
                </svg>
              </div>
              <p className="font-mono font-extrabold text-teal-950 text-base">3 × 4 = 12</p>
            </div>
          </div>

          <p className="text-xs text-foreground/85">
            We observe that, the product is same, though the order of multiplication of two whole numbers is changed.
          </p>

          {/* Interactive Multiplication Tester */}
          <div className="p-3.5 bg-gradient-to-r from-teal-50 to-emerald-50/40 rounded-xl border border-teal-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-teal-900">Check:</label>
              <input
                type="number"
                min="0"
                value={commMultA}
                onChange={(e) => setCommMultA(Math.max(0, Number(e.target.value)))}
                className="w-16 rounded border border-teal-300 bg-white px-2 py-1 font-mono text-center text-sm font-bold"
              />
              <span className="font-bold text-teal-700">×</span>
              <input
                type="number"
                min="0"
                value={commMultB}
                onChange={(e) => setCommMultB(Math.max(0, Number(e.target.value)))}
                className="w-16 rounded border border-teal-300 bg-white px-2 py-1 font-mono text-center text-sm font-bold"
              />
              <span className="font-bold text-teal-700">=</span>
              <span className="font-mono font-extrabold text-emerald-700 text-sm">
                {commMultA * commMultB}
              </span>
              <span className="text-xs font-bold text-teal-700 mx-1">and</span>
              <span className="font-mono font-bold text-teal-900 text-sm">
                {commMultB} × {commMultA} = {commMultB * commMultA}
              </span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold">
              ✓ Equal ({commMultA * commMultB})
            </span>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-bold text-xs sm:text-sm">
            ✨ <strong>Rule:</strong> Thus, <strong>addition and multiplication are commutative for whole numbers</strong> (<span className="font-mono">a + b = b + a</span> and <span className="font-mono">a × b = b × a</span>).
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
          21
        </span>
        <span className="tracking-wide flex-1 text-center font-heading text-xs sm:text-sm">
          Whole Numbers
        </span>
      </div>
    </div>
  );
}
