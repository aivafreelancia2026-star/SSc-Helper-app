"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

export function C6MathsCh3Page3() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page3";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  const ALL_INPUT_IDS = [
    "q_do1_45986",
    "q_do1_36129",
    "q_do1_7874",
    "q_try_1",
    "q_try_2",
    "q_try_3",
    "q_do2_1",
    "q_do2_2",
    "q_do2_3",
    "q_div5_1",
    "q_div5_2",
    "q_div5_3",
    "q_div5_4",
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

  const handleBlurText = (id: string, correctAnswers: string[], isOpenEnded = false) => {
    if (isRevealed) return;
    const normalize = (s: string) =>
      s.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    
    const rawTyped = answers[id] ?? "";
    const typed = normalize(rawTyped);
    if (!typed && !isOpenEnded) return;
    if (isOpenEnded && !rawTyped.trim()) return;

    const prev = graded[id];
    if (prev && prev.value === typed) return;

    let correct = false;
    if (isOpenEnded) {
      correct = rawTyped.trim().length > 3; // Basic check for open-ended questions
    } else {
      correct = correctAnswers.some((ans) => normalize(ans) === typed);
    }

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
        <span className="absolute right-2 top-3 text-green-600 font-bold text-xs select-none bg-white/80 rounded-full px-1">
          ✓
        </span>
      );
    if (g?.correct === false)
      return (
        <span className="absolute right-2 top-3 text-destructive font-bold text-xs select-none bg-white/80 rounded-full px-1">
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

      {/* ── Do This (Divisibility by 3) ───────────────────────────────── */}
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl overflow-hidden mt-6">
        <div className="bg-emerald-600 text-white font-bold px-4 py-2 flex items-center gap-2">
          <span className="bg-white/20 px-2 py-0.5 rounded">✍️</span>
          Do This
        </div>
        <div className="p-5 space-y-4">
          <p className="font-medium text-emerald-900">Check whether the following numbers are divisible by 3?</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: "q_do1_45986", label: "i. 45986", ans: ["no", "n", "false"] },
              { id: "q_do1_36129", label: "ii. 36129", ans: ["yes", "y", "true"] },
              { id: "q_do1_7874", label: "iii. 7874", ans: ["no", "n", "false"] }
            ].map(({ id, label, ans }) => {
              const isYes = ans.includes("yes");
              return (
                <div key={id} className="space-y-2">
                  <label className="text-sm font-bold text-emerald-800 block text-center bg-emerald-100 py-1 rounded">
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Yes/No"
                      value={isRevealed ? (isYes ? "Yes" : "No") : (answers[id] ?? "")}
                      onChange={(e) => handleChange(id, e.target.value)}
                      onBlur={() => handleBlurText(id, ans)}
                      className={`w-full rounded-md border p-2 text-center text-sm outline-none transition-colors ${inputClass(id)}`}
                      readOnly={isRevealed}
                    />
                    {badge(id)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 3.2.3 Divisibility by 6 ───────────────────────────────── */}
      <div className="space-y-6 pt-6 border-t border-teal-100">
        <h2 className="font-heading font-bold text-teal-950 text-xl tracking-wide">
          3.2.3 Divisibility by 6
        </h2>
        
        <p>Put a cross on the numbers which are multiples of 6 in the number chart.</p>
        <p>Do you notice anything special about them?</p>
        <p className="font-medium">Yes, they are divisible by both 2 and 3.</p>
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl shadow-sm text-amber-900 font-medium">
          If a number is divisible by both 2 and 3 then it is also divisible by 6.
        </div>

        {/* Try These (Divisibility by 6) */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl overflow-hidden mt-6">
          <div className="bg-blue-600 text-white font-bold px-4 py-2 flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded">🚀</span>
            TRY THESE
          </div>
          <div className="p-5 space-y-5">
            <div className="space-y-2 relative">
              <label className="font-semibold text-blue-900 block">1. Is 7224 divisible by 6? Why?</label>
              <textarea
                rows={2}
                placeholder="Explain your answer..."
                value={isRevealed ? "Yes, because it is an even number (divisible by 2) and sum of digits 7+2+2+4=15 (divisible by 3)." : (answers.q_try_1 ?? "")}
                onChange={(e) => handleChange("q_try_1", e.target.value)}
                onBlur={() => handleBlurText("q_try_1", [], true)}
                className={`w-full rounded-md border p-3 text-sm outline-none transition-colors resize-none ${inputClass("q_try_1").replace("text-center", "")}`}
                readOnly={isRevealed}
              />
              {badge("q_try_1")}
            </div>
            
            <div className="space-y-2 relative">
              <label className="font-semibold text-blue-900 block">2. Give two examples of 4 digit numbers which are divisible by 6.</label>
              <input
                type="text"
                placeholder="e.g. 1002, 1008"
                value={isRevealed ? "1002, 1008" : (answers.q_try_2 ?? "")}
                onChange={(e) => handleChange("q_try_2", e.target.value)}
                onBlur={() => handleBlurText("q_try_2", [], true)}
                className={`w-full rounded-md border p-3 text-sm outline-none transition-colors ${inputClass("q_try_2").replace("text-center", "")}`}
                readOnly={isRevealed}
              />
              {badge("q_try_2")}
            </div>

            <div className="space-y-2 relative">
              <label className="font-semibold text-blue-900 block">3. Can you give an example of a number which is divisible by 6 but not by 2 and 3? Why?</label>
              <textarea
                rows={2}
                placeholder="Explain your answer..."
                value={isRevealed ? "No, because 2 and 3 are prime factors of 6. Any number divisible by 6 must be divisible by its factors." : (answers.q_try_3 ?? "")}
                onChange={(e) => handleChange("q_try_3", e.target.value)}
                onBlur={() => handleBlurText("q_try_3", [], true)}
                className={`w-full rounded-md border p-3 text-sm outline-none transition-colors resize-none ${inputClass("q_try_3").replace("text-center", "")}`}
                readOnly={isRevealed}
              />
              {badge("q_try_3")}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3.2.4 Divisibility by 9 ───────────────────────────────── */}
      <div className="space-y-6 pt-6 border-t border-teal-100">
        <h2 className="font-heading font-bold text-teal-950 text-xl tracking-wide">
          3.2.4 Divisibility by 9
        </h2>
        
        <p>Put a 🔲 (box) on the numbers which are multiples of 9 in the number chart.</p>
        <p>Now try to find a pattern or rule for checking the divisibility of 9. <em>(Hint: Sum of digits)</em></p>
        <p>Sum of digits in these numbers are also divisible by 9.</p>
        <p>For example If we take 81, <span className="font-mono bg-teal-50 px-1 rounded">8 + 1 = 9</span> similarly 99, <span className="font-mono bg-teal-50 px-1 rounded">9 + 9 = 18</span> divisible by 9.</p>
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl shadow-sm text-amber-900 font-medium">
          <strong>A number is divisible by 9, if the sum of the digits of the number is divisible by 9.</strong>
        </div>

        {/* Do This (Divisibility by 9) */}
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl overflow-hidden mt-6">
          <div className="bg-emerald-600 text-white font-bold px-4 py-2 flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded">✍️</span>
            Do This
          </div>
          <div className="p-5 space-y-4">
            <div className="space-y-2 relative">
              <label className="font-semibold text-emerald-900 block">1. Test whether 9846 is divisible by 9?</label>
              <input
                type="text"
                placeholder="Yes/No"
                value={isRevealed ? "Yes" : (answers.q_do2_1 ?? "")}
                onChange={(e) => handleChange("q_do2_1", e.target.value)}
                onBlur={() => handleBlurText("q_do2_1", ["yes", "y", "true", "yesbecause9846is27whichisdivisibleby9"])}
                className={`w-full max-w-sm rounded-md border p-2 text-sm outline-none transition-colors ${inputClass("q_do2_1")}`}
                readOnly={isRevealed}
              />
              {badge("q_do2_1")}
            </div>
            <div className="space-y-2 relative">
              <label className="font-semibold text-emerald-900 block">2. Without actual division, find whether 8998794 is divisible by 9?</label>
              <input
                type="text"
                placeholder="Yes/No"
                value={isRevealed ? "Yes" : (answers.q_do2_2 ?? "")}
                onChange={(e) => handleChange("q_do2_2", e.target.value)}
                onBlur={() => handleBlurText("q_do2_2", ["yes", "y", "true", "yesbecausesumofdigitsis54whichisdivisibleby9"])}
                className={`w-full max-w-sm rounded-md border p-2 text-sm outline-none transition-colors ${inputClass("q_do2_2")}`}
                readOnly={isRevealed}
              />
              {badge("q_do2_2")}
            </div>
            <div className="space-y-2 relative">
              <label className="font-semibold text-emerald-900 block">3. Check whether 786 is divisible by both 3 and 9?</label>
              <input
                type="text"
                placeholder="Yes/No"
                value={isRevealed ? "No (Only by 3)" : (answers.q_do2_3 ?? "")}
                onChange={(e) => handleChange("q_do2_3", e.target.value)}
                onBlur={() => handleBlurText("q_do2_3", ["no", "n", "false", "noonlyby3", "noitisdivisibleby3butnotby9"])}
                className={`w-full max-w-sm rounded-md border p-2 text-sm outline-none transition-colors ${inputClass("q_do2_3")}`}
                readOnly={isRevealed}
              />
              {badge("q_do2_3")}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3.2.5 Divisibility by 5 ───────────────────────────────── */}
      <div className="space-y-6 pt-6 border-t border-teal-100">
        <h2 className="font-heading font-bold text-teal-950 text-xl tracking-wide">
          3.2.5 Divisibility by 5
        </h2>
        
        <div className="bg-teal-50 p-5 rounded-2xl border border-teal-200 space-y-5 shadow-xs">
          <div className="space-y-2 relative">
            <label className="font-semibold text-teal-900 block">
              Are all the numbers 20, 25, 30, 35, 40, 45, 50 divisible by 5?
            </label>
            <input
              type="text"
              placeholder="Yes/No"
              value={isRevealed ? "Yes" : (answers.q_div5_1 ?? "")}
              onChange={(e) => handleChange("q_div5_1", e.target.value)}
              onBlur={() => handleBlurText("q_div5_1", ["yes", "y", "true"])}
              className={`w-full max-w-sm rounded-md border p-2 text-sm outline-none transition-colors ${inputClass("q_div5_1")}`}
              readOnly={isRevealed}
            />
            {badge("q_div5_1")}
          </div>

          <div className="space-y-2 pt-4 border-t border-teal-100 relative">
            <label className="font-semibold text-teal-900 block">
              Is 53 divisible by 5? Why?
            </label>
            <input
              type="text"
              placeholder="Yes/No & Why?"
              value={isRevealed ? "No, because it does not end in 0 or 5." : (answers.q_div5_2 ?? "")}
              onChange={(e) => handleChange("q_div5_2", e.target.value)}
              onBlur={() => handleBlurText("q_div5_2", ["no", "n", "false", "nobecauseitdoesnotendin0or5"], true)}
              className={`w-full max-w-lg rounded-md border p-2 text-sm outline-none transition-colors ${inputClass("q_div5_2")}`}
              readOnly={isRevealed}
            />
            {badge("q_div5_2")}
          </div>

          <div className="space-y-2 pt-4 border-t border-teal-100 relative">
            <label className="font-semibold text-teal-900 block">
              Can you say that all the numbers with zero and five at ones place is divisible by 5?
            </label>
            <input
              type="text"
              placeholder="Yes/No"
              value={isRevealed ? "Yes" : (answers.q_div5_3 ?? "")}
              onChange={(e) => handleChange("q_div5_3", e.target.value)}
              onBlur={() => handleBlurText("q_div5_3", ["yes", "y", "true"])}
              className={`w-full max-w-sm rounded-md border p-2 text-sm outline-none transition-colors ${inputClass("q_div5_3")}`}
              readOnly={isRevealed}
            />
            {badge("q_div5_3")}
          </div>

          <div className="space-y-2 pt-4 border-t border-teal-100 relative">
            <label className="font-semibold text-teal-900 block">
              Consider the numbers 5785, 6021, 1000, 101010, 9005. Guess which are divisible by 5.
            </label>
            <input
              type="text"
              placeholder="e.g. 5785, 1000..."
              value={isRevealed ? "5785, 1000, 101010, 9005" : (answers.q_div5_4 ?? "")}
              onChange={(e) => handleChange("q_div5_4", e.target.value)}
              onBlur={() => handleBlurText("q_div5_4", ["5785, 1000, 101010, 9005", "578510001010109005"])}
              className={`w-full max-w-lg rounded-md border p-2 text-sm outline-none transition-colors ${inputClass("q_div5_4")}`}
              readOnly={isRevealed}
            />
            {badge("q_div5_4")}
          </div>
        </div>
      </div>
    </div>
  );
}
