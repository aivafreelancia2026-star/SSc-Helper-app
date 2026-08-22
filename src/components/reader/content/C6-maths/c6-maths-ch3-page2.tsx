"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

export function C6MathsCh3Page2() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page2";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  // Grid interactive states
  const [showMultiplesOf2, setShowMultiplesOf2] = useState(false);
  const [showMultiplesOf3, setShowMultiplesOf3] = useState(false);

  const ALL_INPUT_IDS = [
    "q_div2_953",
    "q_div2_9534",
    "q_div2_900",
    "q_div2_452",
    "q_div3_36",
    "q_div3_54",
    "q_div3_63",
    "q_div3_72",
    "q_div3_117",
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
      setShowMultiplesOf2(false);
      setShowMultiplesOf3(false);
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

  // Generate 1 to 100 for the grid
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="w-full space-y-8 font-body text-sm leading-relaxed text-foreground/90 pb-8">
      {feedback !== null && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* ── 3.2.1 Divisibility by 2 ───────────────────────────────── */}
      <div className="space-y-6">
        <h2 className="font-heading font-bold text-teal-950 text-xl tracking-wide">
          3.2.1 Divisibility by 2
        </h2>
        
        <p>Let us look at the number chart given below.</p>

        {/* 10x10 Grid */}
        <div className="max-w-xl mx-auto space-y-4">
          <div className="flex gap-4 justify-center mb-4">
            <button 
              onClick={() => setShowMultiplesOf2(!showMultiplesOf2)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors border ${showMultiplesOf2 ? 'bg-red-100 border-red-300 text-red-800' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'}`}
            >
              {showMultiplesOf2 ? "Hide Multiples of 2" : "Cross Multiples of 2"}
            </button>
            <button 
              onClick={() => setShowMultiplesOf3(!showMultiplesOf3)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors border ${showMultiplesOf3 ? 'bg-blue-100 border-blue-300 text-blue-800' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'}`}
            >
              {showMultiplesOf3 ? "Hide Multiples of 3" : "Encircle Multiples of 3"}
            </button>
          </div>

          <div className="grid grid-cols-10 gap-1 border border-teal-200 p-1 bg-white">
            {numbers.map(num => {
              const isMult2 = num % 2 === 0;
              const isMult3 = num % 3 === 0;
              
              let classes = "flex items-center justify-center aspect-square text-xs sm:text-sm font-mono relative";
              
              if (showMultiplesOf2 && isMult2 && showMultiplesOf3 && isMult3) {
                // Both crossed and encircled
                return (
                  <div key={num} className={classes}>
                    <div className="absolute inset-0.5 rounded-full border-2 border-blue-500"></div>
                    <span className="relative z-10 line-through decoration-red-500 decoration-2 text-gray-500">{num}</span>
                  </div>
                );
              } else if (showMultiplesOf2 && isMult2) {
                // Only crossed
                return (
                  <div key={num} className={classes}>
                    <span className="line-through decoration-red-500 decoration-2 text-gray-500">{num}</span>
                  </div>
                );
              } else if (showMultiplesOf3 && isMult3) {
                // Only encircled
                return (
                  <div key={num} className={classes}>
                    <div className="absolute inset-0.5 rounded-full border-2 border-blue-500 bg-blue-50/50"></div>
                    <span className="relative z-10 font-bold text-blue-800">{num}</span>
                  </div>
                );
              }

              // Default
              return (
                <div key={num} className={classes + " border border-gray-100 text-gray-700"}>
                  {num}
                </div>
              );
            })}
          </div>
        </div>

        <p>
          Now cross all the multiples of 2. Do you see any pattern in the ones place of these numbers?
        </p>
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl shadow-sm text-amber-900 font-medium">
          These numbers have only the digits 0, 2, 4, 6, 8 in the ones place. Looking at these observations we can say that <strong>a number is divisible by 2 if it has any of the digits 0, 2, 4, 6 or 8 in its ones place.</strong>
        </div>

        {/* Do This box */}
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl overflow-hidden mt-6">
          <div className="bg-emerald-600 text-white font-bold px-4 py-2 flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded">✍️</span>
            Do This
          </div>
          <div className="p-5 space-y-4">
            <p className="font-medium text-emerald-900">Are 953, 9534, 900, 452 divisible by 2? Also check by actual division.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { num: 953, ans: ["no", "n", "false"] },
                { num: 9534, ans: ["yes", "y", "true"] },
                { num: 900, ans: ["yes", "y", "true"] },
                { num: 452, ans: ["yes", "y", "true"] }
              ].map(({ num, ans }) => {
                const id = `q_div2_${num}`;
                const isYes = ans.includes("yes");
                return (
                  <div key={id} className="space-y-2">
                    <label className="text-sm font-bold text-emerald-800 block text-center bg-emerald-100 py-1 rounded">
                      {num}
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
      </div>

      {/* ── 3.2.2 Divisibility by 3 ───────────────────────────────── */}
      <div className="space-y-6 pt-6 border-t border-teal-100">
        <h2 className="font-heading font-bold text-teal-950 text-xl tracking-wide">
          3.2.2 Divisibility by 3
        </h2>
        
        <p>
          Now encircle all the multiples of 3 in the above chart. You must have encircled numbers like 21, 27, 36, 54 etc. Do you see any pattern in the ones place of these numbers?
        </p>
        
        <p>
          No! Because numbers with the same digit in ones place may or may not be divisible by 3. For example, both 27 and 37 have 7 in ones place. Are they both divisible by 3?
        </p>

        <p>Let us now add the digits of 21, 36, 54, 63, 72, 117</p>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 max-w-sm ml-4 font-mono">
          <div>2 + 1 = 3</div>
          
          <div className="relative flex items-center gap-2">
            <span>3 + 6 =</span>
            <div className="relative w-16">
              <input
                type="text"
                value={isRevealed ? "9" : (answers.q_div3_36 ?? "")}
                onChange={(e) => handleChange("q_div3_36", e.target.value)}
                onBlur={() => handleBlurText("q_div3_36", ["9", "nine"])}
                className={`w-full border-b-2 border-dashed p-1 text-center outline-none bg-transparent transition-colors ${inputClass("q_div3_36").replace("border", "border-b-2").replace("rounded-md", "")}`}
                readOnly={isRevealed}
              />
              {badge("q_div3_36")}
            </div>
          </div>
          
          <div className="relative flex items-center gap-2">
            <span>5 + 4 =</span>
            <div className="relative w-16">
              <input
                type="text"
                value={isRevealed ? "9" : (answers.q_div3_54 ?? "")}
                onChange={(e) => handleChange("q_div3_54", e.target.value)}
                onBlur={() => handleBlurText("q_div3_54", ["9", "nine"])}
                className={`w-full border-b-2 border-dashed p-1 text-center outline-none bg-transparent transition-colors ${inputClass("q_div3_54").replace("border", "border-b-2").replace("rounded-md", "")}`}
                readOnly={isRevealed}
              />
              {badge("q_div3_54")}
            </div>
          </div>

          <div className="relative flex items-center gap-2">
            <span>6 + 3 =</span>
            <div className="relative w-16">
              <input
                type="text"
                value={isRevealed ? "9" : (answers.q_div3_63 ?? "")}
                onChange={(e) => handleChange("q_div3_63", e.target.value)}
                onBlur={() => handleBlurText("q_div3_63", ["9", "nine"])}
                className={`w-full border-b-2 border-dashed p-1 text-center outline-none bg-transparent transition-colors ${inputClass("q_div3_63").replace("border", "border-b-2").replace("rounded-md", "")}`}
                readOnly={isRevealed}
              />
              {badge("q_div3_63")}
            </div>
          </div>

          <div className="relative flex items-center gap-2">
            <span>7 + 2 =</span>
            <div className="relative w-16">
              <input
                type="text"
                value={isRevealed ? "9" : (answers.q_div3_72 ?? "")}
                onChange={(e) => handleChange("q_div3_72", e.target.value)}
                onBlur={() => handleBlurText("q_div3_72", ["9", "nine"])}
                className={`w-full border-b-2 border-dashed p-1 text-center outline-none bg-transparent transition-colors ${inputClass("q_div3_72").replace("border", "border-b-2").replace("rounded-md", "")}`}
                readOnly={isRevealed}
              />
              {badge("q_div3_72")}
            </div>
          </div>

          <div className="relative flex items-center gap-2 col-span-2">
            <span>1 + 1 + 7 =</span>
            <div className="relative w-16">
              <input
                type="text"
                value={isRevealed ? "9" : (answers.q_div3_117 ?? "")}
                onChange={(e) => handleChange("q_div3_117", e.target.value)}
                onBlur={() => handleBlurText("q_div3_117", ["9", "nine"])}
                className={`w-full border-b-2 border-dashed p-1 text-center outline-none bg-transparent transition-colors ${inputClass("q_div3_117").replace("border", "border-b-2").replace("rounded-md", "")}`}
                readOnly={isRevealed}
              />
              {badge("q_div3_117")}
            </div>
          </div>
        </div>

        <p className="font-medium text-teal-800">All these sums are divisible by 3.</p>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl shadow-sm text-amber-900 font-medium">
          Thus we can say that <strong>if the sum of the digits is divisible by 3, then the number is divisible by 3.</strong> Check this rule for other circled numbers.
        </div>
      </div>
    </div>
  );
}
