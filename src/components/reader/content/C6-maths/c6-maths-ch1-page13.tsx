"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

// Exercise 1.5 questions
const EX_1_5 = [
  {
    id: "q1",
    question:
      "The number of people who visited during Commonwealth games in New Delhi for the first two days was recorded as 15,290; 14,181; 14,235 and 10,574. Find the total number of people visited in these four days?",
    ans: ["54,280", "54280"],
  },
  {
    id: "q2",
    question:
      "In Lok Sabha election, the electoral candidate got 5,87,900 votes and defeated candidate got 3,52,364. By how many votes did the winner win the election?",
    ans: ["2,35,536", "235536"],
  },
  {
    id: "q3",
    question:
      "Write the greatest and smallest 5-digit number formed by the digits 5, 3, 4, 0 and 7 and find their difference? (use the digits once only)",
    ans: ["27,252", "27252"],
  },
  {
    id: "q4",
    question:
      "A bicycle industry makes 3,125 bicycles each day. Find the total number of bicycles manufactured in the month of July?",
    ans: ["96,875", "96875"],
  },
  {
    id: "q5",
    question:
      "A helicopter covers 600 km. in 1 hour. How much distance will it cover in 4 hours?",
    ans: ["2,400 km", "2400 km", "2,400", "2400"],
  },
];

export function C6MathsCh1Page13() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch1-page13";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  useEffect(() => {
    const saved: Record<string, string> = {};
    const savedG: Record<string, { value: string; correct: boolean }> = {};
    EX_1_5.forEach((q) => {
      const a = localStorage.getItem(`${storageKey}-${q.id}-answer`);
      if (a) saved[q.id] = a;
      const g = localStorage.getItem(`${storageKey}-${q.id}-graded`);
      if (g) {
        try {
          savedG[q.id] = JSON.parse(g);
        } catch {}
      }
    });
    setAnswers(saved);
    setGraded(savedG);
  }, []);

  useEffect(() => {
    function handleReset() {
      EX_1_5.forEach((q) => {
        localStorage.removeItem(`${storageKey}-${q.id}-answer`);
        localStorage.removeItem(`${storageKey}-${q.id}-graded`);
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

  const handleBlur = (id: string, correctAnswers: string | string[]) => {
    if (isRevealed) return;
    const normalize = (s: string) => s.toLowerCase().replace(/[\s,]+/g, "");
    const normalizedTyped = normalize(answers[id] ?? "");
    if (!normalizedTyped) return;
    const prev = graded[id];
    if (prev && prev.value === normalizedTyped) return;

    const correctArray = Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers];
    const correct = correctArray.some((a) => normalize(a) === normalizedTyped);

    let delta = 0;
    if (prev) {
      if (!prev.correct && correct) delta = 2;
      else if (prev.correct && !correct) delta = -2;
    } else {
      delta = correct ? 1 : -1;
    }
    if (delta !== 0) addPoints(delta);

    setFeedback({ correct, id: Date.now() });
    const next = { ...graded, [id]: { value: normalizedTyped, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${id}-graded`,
      JSON.stringify({ value: normalizedTyped, correct })
    );
  };

  function inputClass(id: string): string {
    const typed = (answers[id] ?? "").trim();
    if (!typed && !isRevealed) return "border-border/60 focus:border-primary";
    const normalize = (s: string) => s.toLowerCase().replace(/[\s,]+/g, "");
    const g = graded[id];
    const isCorrect = g && g.value === normalize(typed) ? g.correct : null;
    if (isRevealed) return "border-primary bg-primary/5 font-bold text-primary";
    if (isCorrect === true) return "border-green-500 bg-green-50 text-green-700 font-bold";
    if (isCorrect === false) return "border-destructive bg-destructive/5 text-destructive";
    return "border-border/60 focus:border-primary";
  }

  function badge(id: string) {
    const typed = (answers[id] ?? "").trim();
    if (!typed && !isRevealed) return null;
    const normalize = (s: string) => s.toLowerCase().replace(/[\s,]+/g, "");
    const g = graded[id];
    const isCorrect = g && g.value === normalize(typed) ? g.correct : null;
    if (isRevealed) return null;
    if (isCorrect === true)
      return <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 font-bold text-xs">✓</span>;
    if (isCorrect === false)
      return <span className="absolute right-2 top-1/2 -translate-y-1/2 text-destructive font-bold text-xs">✗</span>;
    return null;
  }

  return (
    <div className="w-full space-y-8 font-body text-sm leading-relaxed text-foreground/90 pb-8">
      {feedback !== null && (
        <AnswerFeedback key={feedback.id} correct={feedback.correct} onDone={() => setFeedback(null)} />
      )}

      <p className="text-foreground/80 font-medium">
        Let us understand some examples using large numbers in daily life.
      </p>

      {/* ── Example 1: Tendulkar ─────────────────── */}
      <div className="rounded-[14px] border border-indigo-200 bg-indigo-50/30 overflow-hidden shadow-sm">
        <div className="bg-indigo-100 px-4 py-2 border-b border-indigo-200">
          <span className="font-bold text-indigo-900">Example-1:</span>
          <span className="text-indigo-800 ml-2">
            Tendulkar is a famous cricket player. He has so far scored 15,030 runs in test matches and 18,111 runs in one day cricket. What is the total number of runs scored by him in both formats?
          </span>
        </div>
        <div className="p-5 space-y-3">
          <p className="font-semibold text-indigo-900">Solution:</p>
          <div className="overflow-x-auto">
            <table className="border-collapse text-sm font-mono mx-auto">
              <tbody>
                <tr>
                  <td className="px-4 py-1 text-left text-foreground/80">Runs scored in Test matches by Tendulkar</td>
                  <td className="px-4 py-1 text-center">=</td>
                  <td className="px-4 py-1 text-right font-semibold">15,030</td>
                </tr>
                <tr>
                  <td className="px-4 py-1 text-left text-foreground/80">Runs scored in One day matches</td>
                  <td className="px-4 py-1 text-center">=</td>
                  <td className="px-4 py-1 text-right font-semibold border-b-2 border-indigo-400">18,111</td>
                </tr>
                <tr className="bg-indigo-100/60">
                  <td className="px-4 py-1.5 text-left font-bold text-indigo-900">Total number of runs</td>
                  <td className="px-4 py-1.5 text-center font-bold">=</td>
                  <td className="px-4 py-1.5 text-right font-bold text-indigo-800 text-base">33,141</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Example 2: Newspaper ─────────────────── */}
      <div className="rounded-[14px] border border-amber-200 bg-amber-50/30 overflow-hidden shadow-sm">
        <div className="bg-amber-100 px-4 py-2 border-b border-amber-200">
          <span className="font-bold text-amber-900">Example-2:</span>
          <span className="text-amber-800 ml-2">
            A newspaper is published everyday. It contains 16 pages. Every day 15,020 copies are printed. How many pages are printed every day?
          </span>
        </div>
        <div className="p-5 space-y-3">
          <p className="font-semibold text-amber-900">Solution:</p>
          <div className="space-y-1.5 font-mono text-sm pl-4">
            <div className="flex justify-between max-w-sm">
              <span className="text-foreground/80">Number of copies printed every day</span>
              <span className="font-semibold ml-4">= 15,020</span>
            </div>
            <div className="flex justify-between max-w-sm">
              <span className="text-foreground/80">Number of pages in each copy</span>
              <span className="font-semibold ml-4">= 16</span>
            </div>
            <div className="flex justify-between max-w-sm">
              <span className="text-foreground/80">Number of pages in 15,020 copies</span>
              <span className="font-semibold ml-4">= 15,020 × 16 pages</span>
            </div>
            <p className="text-foreground/80 font-sans mt-2">Try to estimate the total number of pages. It must be more than 2,00,000 pages.</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-foreground/80">Total number of pages printed</span>
              <span className="font-semibold">= 15,020 × 16 = 2,40,320</span>
            </div>
            <p className="font-sans mt-2 font-medium text-amber-900">So, every day 2,40,320 pages are printed.</p>
          </div>
        </div>
      </div>

      {/* ── Example 3: Hotel milk ────────────────── */}
      <div className="rounded-[14px] border border-teal-200 bg-teal-50/30 overflow-hidden shadow-sm">
        <div className="bg-teal-100 px-4 py-2 border-b border-teal-200">
          <span className="font-bold text-teal-900">Example-3:</span>
          <span className="text-teal-800 ml-2">
            A hotel has 15 litres milk. 25ml of milk is required to prepare a cup of tea. How many cups of tea can be made with the milk.
          </span>
        </div>
        <div className="p-5 space-y-3">
          <p className="font-semibold text-teal-900">Solution:</p>
          <div className="font-mono text-sm pl-4 space-y-1.5">
            <div className="grid grid-cols-[220px_auto] gap-2">
              <span className="text-foreground/80">Quantity of milk in the hotel</span>
              <span>= 15 litres</span>
            </div>
            <div className="grid grid-cols-[220px_auto] gap-2">
              <span></span>
              <span>= 15 × 1000 ml</span>
            </div>
            <div className="grid grid-cols-[220px_auto] gap-2">
              <span></span>
              <span className="font-bold">= 15000 ml</span>
            </div>
            <p className="font-sans mt-2 text-foreground/80">
              Since 25ml of milk is required for each cup of tea
            </p>
            <div className="mt-1">
              <span className="text-foreground/80">number of cups of tea that can be made with the milk</span>
              <span className="font-semibold ml-2">= 15000 ÷ 25</span>
            </div>
            <div className="mt-1 pl-64 font-bold text-teal-800 text-base">= 600 cups</div>
          </div>
        </div>
      </div>

      {/* ── EXERCISE 1.5 ─────────────────────────── */}
      <div className="rounded-[16px] border border-green-300 bg-green-50/20 overflow-hidden shadow-sm mt-8">
        <div className="bg-green-700 px-4 py-2 flex items-center gap-2">
          <span className="text-white text-lg">✍️</span>
          <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
            Exercise - 1.5
          </h2>
        </div>
        <div className="p-5 space-y-6">
          {EX_1_5.map((q, idx) => (
            <div key={q.id} className="space-y-3 border-b border-green-100 pb-6 last:border-b-0 last:pb-0">
              <p className="font-medium text-green-900">
                <span className="font-bold mr-2">{idx + 1}.</span>
                {q.question}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pl-5">
                <span className="text-sm font-semibold text-foreground/70 shrink-0">Answer:</span>
                <div className="relative flex-1 max-w-xs">
                  <input
                    type="text"
                    value={isRevealed ? q.ans[0] : (answers[q.id] ?? "")}
                    disabled={isRevealed}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    onBlur={() => handleBlur(q.id, q.ans)}
                    placeholder="Enter your answer..."
                    className={`w-full rounded-[8px] border bg-white px-4 py-2 text-sm font-mono focus:outline-none transition-all shadow-sm ${inputClass(q.id)}`}
                  />
                  {badge(q.id)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer banner ─────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 text-sm font-bold text-white mt-8"
        style={{ background: "linear-gradient(90deg, #16a34a 0%, #22c55e 100%)" }}
      >
        <span className="tracking-wide flex-1 text-center">KNOWING OUR NUMBERS</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-green-600 text-xs font-extrabold ml-3">
          13
        </span>
      </div>
    </div>
  );
}
