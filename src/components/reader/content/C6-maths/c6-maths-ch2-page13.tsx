"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

export function C6MathsCh2Page13() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch2-page13";

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
    "q2_step4", "q2_step5", "q2_step6", "q2_step7", "q2_step8", "q2_step9", "q2_step10",
    "q2_try1", "q2_try2", "q2_try3",
    "q3_num1", "q3_num2", "q3_num3"
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

      {/* ── EXERCISE 2.3 CONTINUED ────────────────────────────── */}
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="font-semibold">2. Study the pattern:</p>
          <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100 inline-block font-mono text-sm shadow-xs ml-4">
            <div>91 &times; 11 &times; 1 = 1001</div>
            <div>91 &times; 11 &times; 2 = 2002</div>
            <div>91 &times; 11 &times; 3 = 3003</div>
          </div>
          
          <p className="text-sm">Write next seven steps. Check, whether the result is correct.</p>

          <div className="space-y-3 ml-4 max-w-sm">
            {[4, 5, 6, 7, 8, 9, 10].map((step) => {
              const id = `q2_step${step}`;
              const result = 1001 * step;
              const answerStr = `91 * 11 * ${step} = ${result}`;
              return (
                <div key={id} className="relative flex items-center gap-3">
                  <input
                    type="text"
                    placeholder={`Step ${step}...`}
                    value={isRevealed ? answerStr.replace(/\*/g, '×') : (answers[id] ?? "")}
                    onChange={(e) => handleChange(id, e.target.value)}
                    onBlur={() => handleBlurText(id, [answerStr, String(result)])}
                    className={`w-full rounded-md border p-2 text-sm outline-none font-mono transition-colors ${inputClass(id)}`}
                    readOnly={isRevealed}
                  />
                  {badge(id)}
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-sm font-semibold">Try the pattern for 143 &times; 7 &times; 1, 143 &times; 7 &times; 2 ...</p>
          <div className="space-y-3 ml-4 max-w-sm">
            {[1, 2, 3].map((step) => {
              const id = `q2_try${step}`;
              const result = 1001 * step;
              const answerStr = `143 * 7 * ${step} = ${result}`;
              return (
                <div key={id} className="relative flex items-center gap-3">
                  <input
                    type="text"
                    placeholder={`143 × 7 × ${step} = ...`}
                    value={isRevealed ? answerStr.replace(/\*/g, '×') : (answers[id] ?? "")}
                    onChange={(e) => handleChange(id, e.target.value)}
                    onBlur={() => handleBlurText(id, [answerStr, String(result)])}
                    className={`w-full rounded-md border p-2 text-sm outline-none font-mono transition-colors ${inputClass(id)}`}
                    readOnly={isRevealed}
                  />
                  {badge(id)}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-teal-100">
          <p className="font-semibold">3. How would we multiply the numbers 13680347, 35702369 and 25692359 with 9 mentally? What is the pattern that emerges?</p>
          
          <div className="space-y-3 ml-4 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="13680347 × 9 = ..."
                value={isRevealed ? "123123123" : (answers.q3_num1 ?? "")}
                onChange={(e) => handleChange("q3_num1", e.target.value)}
                onBlur={() => handleBlurText("q3_num1", ["123123123", "13680347 * 9 = 123123123"])}
                className={`w-full rounded-md border p-2 text-sm outline-none font-mono transition-colors ${inputClass("q3_num1")}`}
                readOnly={isRevealed}
              />
              {badge("q3_num1")}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="35702369 × 9 = ..."
                value={isRevealed ? "321321321" : (answers.q3_num2 ?? "")}
                onChange={(e) => handleChange("q3_num2", e.target.value)}
                onBlur={() => handleBlurText("q3_num2", ["321321321", "35702369 * 9 = 321321321"])}
                className={`w-full rounded-md border p-2 text-sm outline-none font-mono transition-colors ${inputClass("q3_num2")}`}
                readOnly={isRevealed}
              />
              {badge("q3_num2")}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="25692359 × 9 = ..."
                value={isRevealed ? "231231231" : (answers.q3_num3 ?? "")}
                onChange={(e) => handleChange("q3_num3", e.target.value)}
                onBlur={() => handleBlurText("q3_num3", ["231231231", "25692359 * 9 = 231231231"])}
                className={`w-full rounded-md border p-2 text-sm outline-none font-mono transition-colors ${inputClass("q3_num3")}`}
                readOnly={isRevealed}
              />
              {badge("q3_num3")}
            </div>
          </div>
        </div>
      </div>

      {/* ── WHAT HAVE WE DISCUSSED? ─────────────────────────────── */}
      <div className="rounded-[16px] border border-emerald-200 bg-white p-5 sm:p-6 space-y-6 shadow-sm mt-8">
        <div className="flex items-center gap-3 border-b border-emerald-100 pb-3 bg-emerald-600 rounded-t-lg -mt-6 -mx-6 px-6 pt-6">
          <h2 className="font-heading font-bold text-white text-lg flex-1 flex items-center gap-2">
            <span className="bg-white/20 px-2 py-1 rounded text-sm tracking-widest">WHAT HAVE WE DISCUSSED?</span>
          </h2>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-foreground/80 pl-2">
          <ol className="list-decimal list-outside ml-4 space-y-3">
            <li>The numbers 1, 2, 3, ... which we use for counting are known as <strong>natural numbers</strong>.</li>
            <li>Every natural number has a successor. Every natural number except 1 has a predecessor.</li>
            <li>If we include the number 'zero' to the collection of natural numbers, we get the collection of <strong>whole numbers</strong> <span className="font-mono bg-emerald-50 px-1 rounded">W = {'{'}0, 1, 2, ...{'}'}</span>.</li>
            <li>Every whole number has a successor. Every whole number except zero has a predecessor.</li>
            <li>All natural numbers are whole numbers, and all whole numbers except zero are natural numbers.</li>
            <li>We can make a number line with whole numbers represented on it. We can easily perform the number operations of addition, subtraction and multiplication on such a number line.</li>
            <li>Addition corresponds to moving to the right on the number line, where as subtraction corresponds to moving to the left. Multiplication corresponds to making jumps of equal distance from zero.</li>
            <li>Whole numbers are closed under addition and multiplication. But whole numbers are not closed under subtraction and division.</li>
            <li>Division by zero is not defined.</li>
            <li>Zero is the additive identity and 1 is the multiplicative identity of whole numbers.</li>
            <li>Addition and multiplication are commutative for whole numbers.</li>
            <li>Addition and multiplication are associative for whole numbers.</li>
            <li>Multiplication is distributive over addition for whole numbers.</li>
            <li>Commutativity, associativity and distributivity of whole numbers are useful in simplifying calculations and we often use them without being aware of them.</li>
            <li>Pattern with numbers are not only interesting, but are useful especially for mental calculations. They help us to understand properties of numbers better.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
