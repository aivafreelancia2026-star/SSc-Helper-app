"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

interface InlineDistributiveItem {
  id: string;
  label: string;
  expansion: string;
  ans: string;
}

const INLINE_DISTRIB_ITEMS: InlineDistributiveItem[] = [
  {
    id: "id1",
    label: "2 × (5 + 6)",
    expansion: "= (2 × 5) + (2 × 6) = 10 + 12",
    ans: "22",
  },
  {
    id: "id2",
    label: "5 × (7 + 8)",
    expansion: "= (5 × 7) + (5 × 8) = 35 + 40",
    ans: "75",
  },
  {
    id: "id3",
    label: "19 × 7 + 19 × 3",
    expansion: "= 19 × (7 + 3) = 19 × 10",
    ans: "190",
  },
];

interface DoThisItem {
  id: string;
  sub: string;
  problem: string;
  steps: string;
  ans: string;
}

const DO_THIS_ITEMS: DoThisItem[] = [
  {
    id: "dt1",
    sub: "i",
    problem: "25 × 78",
    steps: "25 × (80 - 2) = (25 × 80) - (25 × 2) = 2000 - 50 = 1950 (or 25 × (70 + 8) = 1750 + 200)",
    ans: "1950",
  },
  {
    id: "dt2",
    sub: "ii",
    problem: "17 × 26",
    steps: "17 × (20 + 6) = (17 × 20) + (17 × 6) = 340 + 102 = 442 (or 17 × (30 - 4))",
    ans: "442",
  },
  {
    id: "dt3",
    sub: "iii",
    problem: "49 × 68 + 32 × 49",
    steps: "49 × (68 + 32) = 49 × 100 = 4900",
    ans: "4900",
  },
];

export function C6MathsCh2Page9() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch2-page9";

  // State for user answers
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  // Interactive Distributivity Calculator
  const [distA, setDistA] = useState<number>(12);
  const [distB, setDistB] = useState<number>(70);
  const [distC, setDistC] = useState<number>(5);

  const ALL_INPUT_IDS = [
    ...INLINE_DISTRIB_ITEMS.map((item) => `${item.id}_ans`),
    ...DO_THIS_ITEMS.map((item) => `${item.id}_ans`),
    "additive_identity_blank",
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

      {/* ── Section 1: Distributive Property of Multiplication over Addition ── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            Distributive Property of Multiplication over Addition
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            Property Summary
          </span>
        </div>

        <div className="p-4 bg-teal-50/40 rounded-xl border border-teal-200 space-y-2 text-xs sm:text-sm font-mono text-teal-950">
          <p>Thus, <strong className="text-base">5 × 4 = (2 × 4) + (3 × 4) = 8 + 12 = 20</strong></p>
          <p className="text-foreground/80 font-sans">also since 5 = 2 + 3, we have</p>
          <p><strong className="text-base">5 × 4 = (2 + 3) × 4</strong>. Thus we can say <strong className="text-emerald-800">(2 + 3) × 4 = (2 × 4) + (3 × 4)</strong></p>
        </div>

        <div className="space-y-2 text-xs sm:text-sm">
          <p className="text-foreground/90 font-medium">In the same way,</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
            <div className="bg-white p-3 rounded-lg border border-teal-100 shadow-xs">
              <span className="text-teal-900 font-bold">(5 + 6) × 7</span> = 11 × 7 = <strong>77</strong>
            </div>
            <div className="bg-white p-3 rounded-lg border border-teal-100 shadow-xs">
              <span className="text-teal-900 font-bold">(5 × 7) + (6 × 7)</span> = 35 + 42 = <strong>77</strong>
            </div>
          </div>
          <p className="text-emerald-800 font-bold pt-1">
            We see that both are equal! This is known as the <strong>distributive property of multiplication over addition</strong>.
          </p>
        </div>

        {/* Quick Check Problems */}
        <div className="space-y-3 pt-2">
          <p className="font-heading font-bold text-teal-950 text-sm">
            Using the distributive property, find the value of:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {INLINE_DISTRIB_ITEMS.map((item) => {
              const inputId = `${item.id}_ans`;
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/20 space-y-2"
                >
                  <span className="font-mono font-extrabold text-teal-950 text-sm">
                    {item.label}
                  </span>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Answer..."
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
                  <p className="text-xs text-foreground/75 font-mono">{item.expansion} = {item.ans}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Example 3: Find 12 x 75 */}
        <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50/30 rounded-xl border border-teal-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-heading font-bold text-teal-900 text-sm">Example - 3:</span>
            <span className="font-mono font-extrabold text-teal-950 text-base">Find 12 × 75 using distributive property</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            {/* Method A: Addition */}
            <div className="bg-white p-3 rounded-lg border border-teal-100 shadow-xs space-y-1">
              <p className="font-bold text-teal-900 font-sans">Method 1 (Addition):</p>
              <p>12 × 75 = 12 × (70 + 5)</p>
              <p>= (12 × 70) + (12 × 5)</p>
              <p>= 840 + 60 = <strong className="text-emerald-700 text-sm">900</strong></p>
            </div>

            {/* Method B: Subtraction */}
            <div className="bg-white p-3 rounded-lg border border-teal-100 shadow-xs space-y-1">
              <p className="font-bold text-teal-900 font-sans">Method 2 (Subtraction):</p>
              <p>12 × 75 = 12 × (80 - 5)</p>
              <p>= (12 × 80) - (12 × 5)</p>
              <p>= 960 - 60 = <strong className="text-emerald-700 text-sm">900</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: DO THIS (Distributive Calculations) ────────── */}
      <div className="rounded-[16px] border-2 border-emerald-500 bg-emerald-50/30 overflow-hidden shadow-sm">
        <div className="bg-emerald-600 px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl text-white">📖</span>
            <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
              Do This
            </h2>
          </div>
          <span className="text-emerald-100 text-xs font-semibold px-2 py-0.5 rounded bg-emerald-700/50">
            {isRevealed ? "Answers Revealed" : "3 Points"}
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <p className="font-semibold text-teal-950">
            Find the values of the following using distributive property:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DO_THIS_ITEMS.map((item) => {
              const inputId = `${item.id}_ans`;
              return (
                <div
                  key={item.id}
                  className="p-4 bg-white rounded-xl border border-teal-200 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-teal-800">{item.sub}.</span>
                    <span className="font-mono font-extrabold text-teal-950 text-base">
                      {item.problem}
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Result..."
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

                  <p className="text-xs text-teal-950 bg-teal-50/60 p-2 rounded-md font-mono">
                    💡 <strong>Steps:</strong> {item.steps}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Section 3: Identity (for Addition and Multiplication) ──── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            Identity (for Addition and Multiplication)
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            Additive &amp; Multiplicative Identity
          </span>
        </div>

        <p className="text-foreground/90">
          When you add 7 and 5, you get a new whole number 12. Addition of two whole numbers gives a new whole number. But is this always so for all whole numbers?
          <br />
          <strong>When we add zero to a whole number, we get the same whole number again.</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Additive Identity (Zero) */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/30 space-y-3">
            <h3 className="font-heading font-bold text-teal-950 text-sm">
              1. Additive Identity: <span className="font-mono text-emerald-800 text-base">0 (Zero)</span>
            </h3>

            <div className="overflow-x-auto rounded-lg border border-teal-200 bg-white">
              <table className="w-full text-center font-mono text-xs sm:text-sm border-collapse">
                <tbody>
                  <tr className="border-b border-teal-100"><td className="py-1.5 font-bold">2 + 0 = 2</td></tr>
                  <tr className="border-b border-teal-100 bg-teal-50/30"><td className="py-1.5 font-bold">9 + 0 = 9</td></tr>
                  <tr className="border-b border-teal-100"><td className="py-1.5 font-bold">0 + 11 = 11</td></tr>
                  <tr className="bg-amber-50/50">
                    <td className="py-2 flex items-center justify-center gap-2">
                      <input
                        type="text"
                        placeholder="0"
                        value={isRevealed ? "0" : answers["additive_identity_blank"] ?? ""}
                        disabled={isRevealed}
                        onChange={(e) => handleChange("additive_identity_blank", e.target.value)}
                        onBlur={() => handleBlurText("additive_identity_blank", ["0", "zero"])}
                        className={`w-12 rounded border text-center font-mono font-bold text-xs py-1 ${inputClass("additive_identity_blank")}`}
                      />
                      <span>+ 25 = 25</span>
                      {badge("additive_identity_blank")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-teal-950 font-medium">
              ✨ <strong>Zero is called the additive identity for whole numbers</strong> (<span className="font-mono font-bold">a + 0 = 0 + a = a</span>).
            </p>
          </div>

          {/* Multiplicative Identity (One) */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/30 space-y-3">
            <h3 className="font-heading font-bold text-teal-950 text-sm">
              2. Multiplicative Identity: <span className="font-mono text-emerald-800 text-base">1 (One)</span>
            </h3>

            <div className="overflow-x-auto rounded-lg border border-teal-200 bg-white">
              <table className="w-full text-center font-mono text-xs sm:text-sm border-collapse">
                <tbody>
                  <tr className="border-b border-teal-100"><td className="py-1.5 font-bold">1 × 9 = 9</td></tr>
                  <tr className="border-b border-teal-100 bg-teal-50/30"><td className="py-1.5 font-bold">6 × 5 = 30</td></tr>
                  <tr className="border-b border-teal-100"><td className="py-1.5 font-bold">6 × 4 = 24</td></tr>
                  <tr className="border-b border-teal-100 bg-teal-50/30"><td className="py-1.5 font-bold">5 × 1 = 5</td></tr>
                  <tr className="border-b border-teal-100"><td className="py-1.5 font-bold">11 × 1 = 11</td></tr>
                  <tr className="bg-teal-50/30"><td className="py-1.5 font-bold">2 × 3 = 6</td></tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-teal-950 font-medium">
              ✨ From the above table, we see when we multiply a whole number with 1, the product will be the same whole number. <strong>One is called the multiplicative identity for whole numbers</strong> (<span className="font-mono font-bold">a × 1 = 1 × a = a</span>).
            </p>
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
          24
        </span>
        <span className="tracking-wide flex-1 text-center font-heading text-xs sm:text-sm">
          Government&apos;s Gift for Students&apos; Progress
        </span>
      </div>
    </div>
  );
}
