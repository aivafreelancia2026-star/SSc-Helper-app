"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

const TABLE1_ROWS: TableCell[][] = [
  [{ value: "Ashok" }, { value: "Rice, Dal, Milk, Vegetables, Bread, Jam, Idly, Chutni" }],
  [{ value: "Neelam" }, { value: "Biryani, Chilli Chatni, Roti" }],
  [{ value: "", editable: true }, { value: "", editable: true }],
  [{ value: "", editable: true }, { value: "", editable: true }],
  [{ value: "", editable: true }, { value: "", editable: true }],
];

const REFLECTION_QUESTIONS = [
  "Are food items similar in your list and your friend's list?",
  "Count the number of food varieties you have listed in the table?",
  "Are all eating the same type of food items?",
  "What food items are served in midday meals in your school?",
];

export function C6ScienceCh1Page2() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";

  const [answers, setAnswers] = useState<string[]>(() => REFLECTION_QUESTIONS.map(() => ""));
  const [graded, setGraded] = useState<boolean[]>(() => REFLECTION_QUESTIONS.map(() => false));
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number } | null>(null);

  const answersKey = "c6-science-ch1-page2-answers";
  const gradedKey = "c6-science-ch1-page2-graded";

  // Load persistence
  useEffect(() => {
    const savedAnswers = localStorage.getItem(answersKey);
    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch {}
    }
    const savedGraded = localStorage.getItem(gradedKey);
    if (savedGraded) {
      try {
        setGraded(JSON.parse(savedGraded));
      } catch {}
    }
  }, []);

  // Reset handler
  useEffect(() => {
    function handleReset() {
      const blank = REFLECTION_QUESTIONS.map(() => "");
      setAnswers(blank);
      localStorage.setItem(answersKey, JSON.stringify(blank));
    }
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () => window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, []);

  const handleChange = (index: number, val: string) => {
    const next = [...answers];
    next[index] = val;
    setAnswers(next);
    localStorage.setItem(answersKey, JSON.stringify(next));
  };

  const handleBlur = (index: number) => {
    if (isRevealed) return;

    const val = answers[index].trim();
    if (!val) return;

    if (graded[index]) return; // Already rewarded

    // Open-ended questions: reward student with 1 point for expressing their answer
    addPoints(1);
    setFeedback({ correct: true, id: Date.now() });

    const nextGraded = [...graded];
    nextGraded[index] = true;
    setGraded(nextGraded);
    localStorage.setItem(gradedKey, JSON.stringify(nextGraded));
  };

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {feedback !== null && (
        <AnswerFeedback key={feedback.id} correct={feedback.correct} onDone={() => setFeedback(null)} />
      )}

      {/* Split Columns Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Activity 1 & Table */}
        <div className="space-y-4">
          <h2 className="font-heading text-base font-bold text-primary">
            Activity-1: Finding varieties in our food
          </h2>
          <p>
            Every day we eat different types of food from morning to night. What did you eat
            yesterday? Make a list. Also discuss with your friends and collect information about what
            food they had eaten yesterday. Record the information in table 1.
          </p>

          <FillInTable
            title="Table 1 - What did I eat"
            columns={["Name of student", "Food eaten"]}
            rows={TABLE1_ROWS}
            storageKey="c6-science-ch1-table1"
          />

          <div className="space-y-3 pt-2">
            {REFLECTION_QUESTIONS.map((q, i) => (
              <div key={q} className="space-y-1">
                <p className="font-medium text-foreground/80">• {q}</p>
                <div className="relative">
                  <input
                    type="text"
                    value={answers[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onBlur={() => handleBlur(i)}
                    placeholder="Type your reflection answer here..."
                    className={`w-full rounded-[10px] border px-3 py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none transition-all ${
                      isRevealed ? "border-primary bg-primary/5" :
                      graded[i] ? "border-green-500 bg-green-50/30" : "border-border/60 focus:border-primary"
                    }`}
                  />
                  {graded[i] && !isRevealed && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 font-bold text-xs">✓ Done (+1)</span>
                  )}
                  {isRevealed && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] font-semibold text-primary/70 italic">
                      Student Reflection
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="pt-2">
            We eat different types of food material daily but some food items like rice, dal and
            vegetables are common in the daily menu in large parts of Telangana. On special occasions
            like festivals, birthdays and marriages we eat a larger variety of food.
          </p>
        </div>

        {/* Right Column: 1.2. Food ingredients & Activity-2 */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-primary">1.2. Food ingredients</h2>
          
          <h3 className="font-heading text-sm font-bold text-primary">
            Activity-2: Many ingredients are needed to prepare food
          </h3>
          <p>
            Srinivas wants to eat something special on Sunday. He asked his mother to make biryani.
            His mother asked him to prepare a list of materials which would be required to make
            biryani.
          </p>
          <p>
            Here is the list made by Srinivas - rice, salt, jeera, tomato, potato, onion, etc. Help
            Srinivas if he had missed any material and complete the list.
          </p>
          <p>
            Srinivas was surprised that while cooking boiled rice we need only two materials, raw rice
            and water. But for making biryani we need many materials.
          </p>
        </div>

      </div>

      {/* Tip Box spanning across the bottom */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>
          Don&apos;t eat bananas on an empty stomach; combining them with a bit of protein will help
          to normalize the insulin response caused by the sugar in the banana.
        </TipBox>
      </div>
    </div>
  );
}
