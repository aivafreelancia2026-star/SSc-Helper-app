"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

// Exercise 1.5 continued (Q6-Q9)
const EX_1_5_CONT = [
  {
    id: "q6",
    num: "6.",
    question:
      "The total weight of 5 biscuit packets of same size is 8kg 400 grams. What is the weight of each packet?",
    ans: ["1 kg 680 g", "1kg 680g", "1680 g", "1680g", "1,680g", "1,680 g"],
  },
  {
    id: "q7",
    num: "7.",
    question:
      "Everyday Gayatri walks both the ways to attend the school. The distance between the school and her house is 1 km 875 m. Find the total distance she walked in 6 days?",
    ans: ["22 km 500 m", "22km 500m", "22500 m", "22500m", "22,500 m", "22,500m"],
  },
  {
    id: "q8_shirts",
    num: "8a.",
    question:
      "The cloth required to make a shirt of school uniform for each boy is 1 m 80 cm. How many shirts can a tailor stitch using 90 m of cloth?",
    ans: ["50", "50 shirts"],
  },
  {
    id: "q8_cloth",
    num: "8b.",
    question: "How much cloth will be left?",
    ans: ["0 m", "0", "no cloth left", "nothing left", "0 cm"],
  },
  {
    id: "q9",
    num: "9.",
    question:
      "The rate of petrol is ₹60 per litre. A petrol bunk sells 750 litres of petrol on a day. How much money do they get at the end of the day?",
    ans: ["₹45,000", "45000", "₹45000", "Rs 45,000", "Rs 45000"],
  },
];

// Think, Discuss and Write answers
const THINK_DISCUSS = [
  {
    id: "td1_i",
    label: "i. How much distance did you travel to reach your aunt's house?",
    ans: ["33 km 400 m", "33km 400m", "33400 m", "33400m", "33,400 m"],
  },
  {
    id: "td1_ii",
    label: "ii. If you travel for 7 days like this how much distance would you travel?",
    ans: ["233 km 800 m", "233km 800m", "233800 m", "233800m", "233,800 m"],
  },
  {
    id: "td2",
    label: "How many children poured water bottles in the container?",
    ans: ["700", "700 children"],
  },
];

export function C6MathsCh1Page14() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch1-page14";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  const ALL_IDS = [...EX_1_5_CONT.map((q) => q.id), ...THINK_DISCUSS.map((q) => q.id)];

  useEffect(() => {
    const saved: Record<string, string> = {};
    const savedG: Record<string, { value: string; correct: boolean }> = {};
    ALL_IDS.forEach((id) => {
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
      ALL_IDS.forEach((id) => {
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

  const handleBlur = (id: string, correctAnswers: string | string[]) => {
    if (isRevealed) return;
    const normalize = (s: string) => s.toLowerCase().replace(/[\s,₹]+/g, "");
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
    const normalize = (s: string) => s.toLowerCase().replace(/[\s,₹]+/g, "");
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
    const normalize = (s: string) => s.toLowerCase().replace(/[\s,₹]+/g, "");
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

      {/* ── Exercise 1.5 continued (Q6–Q9) ──────── */}
      <div className="rounded-[16px] border border-green-300 bg-green-50/20 overflow-hidden shadow-sm">
        <div className="bg-green-700 px-4 py-2 flex items-center gap-2">
          <span className="text-white text-lg">✍️</span>
          <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
            Exercise - 1.5 (continued)
          </h2>
        </div>
        <div className="p-5 space-y-6">
          {EX_1_5_CONT.map((q, idx) => (
            <div key={q.id} className="space-y-3 border-b border-green-100 pb-6 last:border-b-0 last:pb-0">
              <p className="font-medium text-green-900">
                <span className="font-bold mr-2">{q.num}</span>
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

      {/* ── Think, Discuss and Write ─────────────── */}
      <div className="rounded-[16px] border-2 border-orange-400 overflow-hidden shadow-sm">
        <div className="bg-orange-500 px-4 py-2 flex items-center gap-2">
          <span className="text-white text-xl">💬</span>
          <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
            Think, Discuss and Write
          </h2>
        </div>
        <div className="bg-orange-50/40 p-5 space-y-8">

          {/* Scenario 1 */}
          <div className="space-y-4">
            <p className="font-medium text-orange-900">
              <span className="font-bold">1.</span> You live in Ahmedabad and you travelled 400 m by bus to reach the nearest station. Then you take a train to reach Gandhi Nagar which is 15 km away. Then you take a cab to reach your aunt's house which is 18 km away.
            </p>
            <div className="space-y-3 pl-5">
              {THINK_DISCUSS.slice(0, 2).map((q) => (
                <div key={q.id} className="space-y-2">
                  <p className="font-medium text-foreground/80">{q.label}</p>
                  <div className="relative max-w-xs">
                    <input
                      type="text"
                      value={isRevealed ? q.ans[0] : (answers[q.id] ?? "")}
                      disabled={isRevealed}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      onBlur={() => handleBlur(q.id, q.ans)}
                      placeholder="Your answer..."
                      className={`w-full rounded-[8px] border bg-white px-4 py-2 text-sm font-mono focus:outline-none transition-all shadow-sm ${inputClass(q.id)}`}
                    />
                    {badge(q.id)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scenario 2 */}
          <div className="space-y-4">
            <p className="font-medium text-orange-900">
              <span className="font-bold">2.</span> Every child in your school brings a water bottle containing 2 litres of water. If all the water is poured into a container which has 2 kilo litre capacity of water it was found that it needed 600 litre more to be filled. How many children poured water bottles in the container?
            </p>
            <div className="pl-5 space-y-2">
              <p className="font-medium text-foreground/80">{THINK_DISCUSS[2].label}</p>
              <div className="relative max-w-xs">
                <input
                  type="text"
                  value={isRevealed ? THINK_DISCUSS[2].ans[0] : (answers[THINK_DISCUSS[2].id] ?? "")}
                  disabled={isRevealed}
                  onChange={(e) => handleChange(THINK_DISCUSS[2].id, e.target.value)}
                  onBlur={() => handleBlur(THINK_DISCUSS[2].id, THINK_DISCUSS[2].ans)}
                  placeholder="Your answer..."
                  className={`w-full rounded-[8px] border bg-white px-4 py-2 text-sm font-mono focus:outline-none transition-all shadow-sm ${inputClass(THINK_DISCUSS[2].id)}`}
                />
                {badge(THINK_DISCUSS[2].id)}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── What Have We Discussed? ──────────────── */}
      <div className="rounded-[16px] border border-sky-300 bg-sky-50/20 overflow-hidden shadow-sm">
        <div className="bg-sky-600 px-4 py-2 flex items-center gap-2">
          <span className="text-white text-xl">📚</span>
          <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
            What Have We Discussed?
          </h2>
        </div>
        <div className="p-5">
          <ol className="list-decimal pl-5 space-y-4 text-foreground/90">
            <li className="leading-relaxed">
              Given two numbers, one with more digits is the greater number. If the number of digits in two given numbers is the same, that number is greater which has a greater leftmost digit. If this digit also happens to be the same, we look at the next digits and so on.
            </li>
            <li className="leading-relaxed">
              In forming numbers from given digits, we should be careful to see if the conditions under which the numbers are to be formed are satisfied. Then, to form the greatest four digit number from 7, 8, 3, 5 without repeating a single digit, we need to use all four digits; the greatest number can have only 8 as the leftmost digit.
            </li>
            <li className="leading-relaxed">
              The smallest four digit number is <strong>1000</strong> (one thousand). It follows the largest three digit number <strong>999</strong>. Similarly, the smallest five digit number is <strong>10,000</strong>. It is ten thousand and follows the largest four digit number <strong>9999</strong>.
            </li>
          </ol>
        </div>
      </div>

      {/* ── Footer banner ─────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 text-sm font-bold text-white mt-8"
        style={{ background: "linear-gradient(90deg, #16a34a 0%, #22c55e 100%)" }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-green-600 text-xs font-extrabold mr-3">
          14
        </span>
        <span className="tracking-wide flex-1 text-center">Government's Gift for Students' Progress</span>
      </div>
    </div>
  );
}
