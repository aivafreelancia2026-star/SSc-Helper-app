"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

export function C6MathsCh3Page1() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page1";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  const ALL_INPUT_IDS = [
    "q1_divisible",
    "q2_quotient",
    "q2_remainder",
    "q3_divisible",
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
    if (isRevealed) return;
    setAnswers((prev) => ({ ...prev, [id]: v }));
    localStorage.setItem(`${storageKey}-${id}-answer`, v);
  };

  const handleBlurText = (id: string, correctAnswers: string[]) => {
    if (isRevealed) return;
    const normalize = (s: string) =>
      s.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
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
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 font-bold text-xs select-none bg-white/80 rounded-full px-1">
          ✓
        </span>
      );
    if (g?.correct === false)
      return (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-destructive font-bold text-xs select-none bg-white/80 rounded-full px-1">
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

      {/* ── CHAPTER HEADER ────────────────────────────────────── */}
      <div className="flex flex-col items-center justify-center space-y-2 py-6 border-b-4 border-emerald-500">
        <h1 className="text-3xl font-heading font-black text-emerald-700 tracking-wider uppercase text-center">
          Playing with Numbers
        </h1>
        <div className="flex gap-2">
          <span className="bg-emerald-600 text-white font-bold px-3 py-1 rounded-full text-xs shadow">CHAPTER 3</span>
        </div>
      </div>

      {/* ── 3.1 INTRODUCTION ──────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 text-white font-bold px-3 py-1 rounded shadow-xs text-lg">
            3.1
          </div>
          <h2 className="font-heading font-bold text-teal-950 text-xl tracking-wide uppercase">
            Introduction
          </h2>
        </div>

        <div className="space-y-4 text-justify">
          <p>Let us observe the situation.</p>
          <div className="float-right ml-6 mb-4 w-1/2 max-w-[200px] border-4 border-emerald-100 rounded-2xl overflow-hidden shadow-sm">
            {/* The image from the textbook can be referenced or left as placeholder, we don't have the source image yet so we'll use a styled container */}
            <div className="bg-emerald-50 aspect-square flex flex-col items-center justify-center p-4 text-center">
              <span className="text-4xl mb-2">🍬</span>
              <p className="text-xs text-emerald-800 font-medium">Hasini dividing 125 chocolates</p>
            </div>
          </div>
          <p>
            Hasini wants to distribute chocolates to her classmates on her birthday. Her father brought a box of 125 chocolates. There are 25 students in her class.
          </p>
          <p>
            She decided to distribute all the chocolates such that each one would get equal number of chocolates. First, she thought of giving 2 chocolates each but found that some chocolates were remaining. Then again she tried of giving 3 each, but again some chocolates were remaining. Finally, she thought of giving 5 chocolates each. Now, she found that no chocolates were remaining.
          </p>
          <p>
            Is there any easy way to find the no.of chocolates equally distributed among her classmates? Think. Of course she can divide 125 by 25. In the previous classes you have become familiar with rules which tell us whether a given number is divisible by 2, 3, 5, 6, 9 and 10. In this chapter we will recollect these tests. Further, we will also discover the rules of divisibility for 4, 8 and 11.
          </p>
        </div>
      </div>

      {/* ── 3.2 DIVISIBILITY RULE ─────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 text-white font-bold px-3 py-1 rounded shadow-xs text-lg">
            3.2
          </div>
          <h2 className="font-heading font-bold text-teal-950 text-xl tracking-wide uppercase">
            Divisibility Rule
          </h2>
        </div>

        <div className="space-y-6">
          <p>
            Let us consider 29. When you divide 29 by 4, it leaves remainder 1 and gives quotient 7.
          </p>
          
          <div className="bg-teal-50 p-5 rounded-2xl border border-teal-200 space-y-5 shadow-xs">
            <div className="space-y-2">
              <label className="font-semibold text-teal-900 block">
                Can you say that 29 is completely divisible by 4?
              </label>
              <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  placeholder="Yes / No"
                  value={isRevealed ? "No" : (answers.q1_divisible ?? "")}
                  onChange={(e) => handleChange("q1_divisible", e.target.value)}
                  onBlur={() => handleBlurText("q1_divisible", ["no", "n", "false", "nobecausetheremainderisnotzero", "nobecausetheremainderis1"])}
                  className={`w-full rounded-md border p-2.5 text-sm outline-none transition-colors ${inputClass("q1_divisible")}`}
                  readOnly={isRevealed}
                />
                {badge("q1_divisible")}
              </div>
              <p className="text-xs text-teal-700 italic">
                {isRevealed && "Why? Because the remainder is not zero (it leaves remainder 1)."}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-teal-100">
              <label className="font-semibold text-teal-900 block">
                Find the quotient and remainder when 24 is divided by 4?
              </label>
              <div className="flex flex-wrap gap-4">
                <div className="relative w-full max-w-[150px]">
                  <span className="text-xs font-bold text-teal-700 mb-1 block">Quotient</span>
                  <input
                    type="text"
                    placeholder="Quotient"
                    value={isRevealed ? "6" : (answers.q2_quotient ?? "")}
                    onChange={(e) => handleChange("q2_quotient", e.target.value)}
                    onBlur={() => handleBlurText("q2_quotient", ["6", "six", "quotientis6", "quotient6"])}
                    className={`w-full rounded-md border p-2.5 text-sm outline-none transition-colors ${inputClass("q2_quotient")}`}
                    readOnly={isRevealed}
                  />
                  {badge("q2_quotient")}
                </div>
                <div className="relative w-full max-w-[150px]">
                  <span className="text-xs font-bold text-teal-700 mb-1 block">Remainder</span>
                  <input
                    type="text"
                    placeholder="Remainder"
                    value={isRevealed ? "0" : (answers.q2_remainder ?? "")}
                    onChange={(e) => handleChange("q2_remainder", e.target.value)}
                    onBlur={() => handleBlurText("q2_remainder", ["0", "zero", "remainderis0", "remainder0"])}
                    className={`w-full rounded-md border p-2.5 text-sm outline-none transition-colors ${inputClass("q2_remainder")}`}
                    readOnly={isRevealed}
                  />
                  {badge("q2_remainder")}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-teal-100">
              <label className="font-semibold text-teal-900 block">
                Is 24 completely divisible by 4?
              </label>
              <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  placeholder="Yes / No"
                  value={isRevealed ? "Yes" : (answers.q3_divisible ?? "")}
                  onChange={(e) => handleChange("q3_divisible", e.target.value)}
                  onBlur={() => handleBlurText("q3_divisible", ["yes", "y", "true", "yesbecausetheremainderiszero", "yesbecausetheremainderis0"])}
                  className={`w-full rounded-md border p-2.5 text-sm outline-none transition-colors ${inputClass("q3_divisible")}`}
                  readOnly={isRevealed}
                />
                {badge("q3_divisible")}
              </div>
              <p className="text-xs text-teal-700 italic">
                {isRevealed && "Why? Because the remainder is zero."}
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 mt-6 shadow-sm">
            <p className="font-medium text-amber-900">
              So, we see that a number is completely divisible by another number, when it leaves zero as remainder.
            </p>
          </div>
          
          <p>
            The process of checking whether a number is divisible by a given number or not without actual division is called divisibility rule for that number.
          </p>
          <p>
            Let us review the tests of divisibility studied in the previous classes.
          </p>
        </div>
      </div>
    </div>
  );
}
