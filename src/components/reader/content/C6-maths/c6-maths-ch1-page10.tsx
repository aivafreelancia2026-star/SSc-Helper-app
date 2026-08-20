"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

const DO_THIS = [
  { id: "dt_a", num: "5,06,45,075", ans: ["Five crore six lakh forty five thousand seventy five", "Five crore six lakh forty-five thousand seventy-five"] },
  { id: "dt_b", num: "12,36,99,140", ans: ["Twelve crore thirty six lakh ninety nine thousand one hundred forty", "Twelve crore thirty-six lakh ninety-nine thousand one hundred forty"] },
  { id: "dt_c", num: "2,50,00,350", ans: ["Two crore fifty lakh three hundred fifty", "Two crore fifty lakh three hundred and fifty"] }
];

const EX_1_3_Q1 = [
  { id: "q1_i", q: "11245670", ans: "1,12,45,670" },
  { id: "q1_ii", q: "22402151", ans: "2,24,02,151" },
  { id: "q1_iii", q: "30608712", ans: "3,06,08,712" },
  { id: "q1_iv", q: "190308020", ans: "19,03,08,020" }
];

const EX_1_3_Q2 = [
  { id: "q2_i", q: "34,025", ans: ["Thirty four thousand twenty five", "Thirty-four thousand twenty-five", "Thirty four thousand and twenty five"] },
  { id: "q2_ii", q: "7,09,115", ans: ["Seven lakh nine thousand one hundred fifteen", "Seven lakh nine thousand one hundred and fifteen"] },
  { id: "q2_iii", q: "47,60,00,317", ans: ["Forty seven crore sixty lakh three hundred seventeen", "Forty-seven crore sixty lakh three hundred seventeen", "Forty seven crore sixty lakh three hundred and seventeen"] },
  { id: "q2_iv", q: "6,18,07,000", ans: ["Six crore eighteen lakh seven thousand"] }
];

const EX_1_3_Q3 = [
  { id: "q3_i", q: "Four lakh fifty seven thousand four hundred", ans: ["4,57,400", "457400"] },
  { id: "q3_ii", q: "Sixty lakh two thousand and seven hundred seventy five", ans: ["60,02,775", "6002775"] },
  { id: "q3_iii", q: "Two crore fifty lakh forty thousand three hundred and three", ans: ["2,50,40,303", "25040303"] },
  { id: "q3_iv", q: "Sixty crore sixty lakh sixty thousand six hundred", ans: ["60,60,60,600", "606060600"] }
];

const EX_1_3_Q4 = [
  { id: "q4_i", q: "6,40,156", ans: ["600000+40000+100+50+6", "6,00,000+40,000+100+50+6", "6×100000+4×10000+1×100+5×10+6×1"] },
  { id: "q4_ii", q: "63,20,500", ans: ["6000000+300000+20000+500", "60,00,000+3,00,000+20,000+500", "6×1000000+3×100000+2×10000+5×100"] },
  { id: "q4_iii", q: "1,25,30,275", ans: ["10000000+2000000+500000+30000+200+70+5", "1,00,00,000+20,00,000+5,00,000+30,000+200+70+5", "1×10000000+2×1000000+5×100000+3×10000+2×100+7×10+5×1"] },
  { id: "q4_iv", q: "75,80,19,202", ans: ["700000000+50000000+8000000+10000+9000+200+2", "70,00,00,000+5,00,00,000+80,00,000+10,000+9,000+200+2"] }
];

const EX_1_3_Q5 = [
  { id: "q5_i", q: "50,00,000 + 4,00,000 + 20,000 + 8,000 + 500 + 20 + 4", ans: ["54,28,524", "5428524"] },
  { id: "q5_ii", q: "6,00,00,000 + 40,00,000 + 3,00,000 + 20,000 + 500 + 1", ans: ["6,43,20,501", "64320501"] },
  { id: "q5_iii", q: "3,00,00,000 + 3,00,000 + 7,000 + 800 + 80 + 1", ans: ["3,03,07,881", "30307881"] },
  { id: "q5_iv", q: "7,00,00,000 + 70,00,000 + 7000 + 70", ans: ["7,70,07,070", "77007070"] }
];

const EX_1_3_Q6 = [
  { id: "q6_i", q: "4,67,612 or 18,71,964", ans: ["18,71,964>4,67,612", "1871964>467612"] },
  { id: "q6_ii", q: "14,35,10,300 or 14,25,10,300", ans: ["14,35,10,300>14,25,10,300", "143510300>142510300"] }
];

const EX_1_3_Q7 = [
  { id: "q7_i", q: "2,00,015 or 99,999", ans: ["99,999<2,00,015", "99999<200015"] },
  { id: "q7_ii", q: "13,50,050 or 13,49,785", ans: ["13,49,785<13,50,050", "1349785<1350050"] }
];

export function C6MathsCh1Page10() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch1-page10";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  const ALL_QUESTIONS = [
    ...DO_THIS, ...EX_1_3_Q1, ...EX_1_3_Q2, ...EX_1_3_Q3, 
    ...EX_1_3_Q4, ...EX_1_3_Q5, ...EX_1_3_Q6, ...EX_1_3_Q7
  ];

  useEffect(() => {
    const saved: Record<string, string> = {};
    const savedG: Record<string, { value: string; correct: boolean }> = {};
    
    ALL_QUESTIONS.forEach((q) => {
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
      ALL_QUESTIONS.forEach((q) => {
        localStorage.removeItem(`${storageKey}-${q.id}-answer`);
        localStorage.removeItem(`${storageKey}-${q.id}-graded`);
      });
      setAnswers({});
      setGraded({});
    }
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () =>
      window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, []);

  const handleChange = (id: string, v: string) => {
    setAnswers((prev) => ({ ...prev, [id]: v }));
    localStorage.setItem(`${storageKey}-${id}-answer`, v);
  };

  const handleBlur = (id: string, correctAnswers: string | string[]) => {
    if (isRevealed) return;
    const typed = (answers[id] ?? "").trim().toLowerCase().replace(/[\s]+/g, ""); // removed space only, keep commas for comparison flexibility if needed, wait actually just remove all spaces
    
    // Custom normalizer for answers
    const normalize = (s: string) => s.toLowerCase().replace(/[\s,]+/g, "");
    
    const normalizedTyped = normalize(answers[id] ?? "");
    if (!normalizedTyped) return;
    const prev = graded[id];
    if (prev && prev.value === normalizedTyped) return;

    const correctArray = Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers];
    const correct = correctArray.some(
      (a) => normalize(a) === normalizedTyped
    );

    let delta = 0;
    if (prev) {
      if (!prev.correct && correct) delta = 2;
      else if (prev.correct && !correct) delta = -2;
    } else {
      delta = correct ? 1 : -1;
    }

    if (delta !== 0) {
      addPoints(delta);
    }
    
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
    if (isCorrect === true)
      return "border-green-500 bg-green-50 text-green-700 font-bold";
    if (isCorrect === false)
      return "border-destructive bg-destructive/5 text-destructive";
    return "border-border/60 focus:border-primary";
  }

  function badge(id: string, noAbsolute = false) {
    const typed = (answers[id] ?? "").trim();
    if (!typed && !isRevealed) return null;

    const normalize = (s: string) => s.toLowerCase().replace(/[\s,]+/g, "");
    const g = graded[id];
    const isCorrect = g && g.value === normalize(typed) ? g.correct : null;
    
    if (isRevealed) return null;
    if (isCorrect === true)
      return (
        <span className={noAbsolute ? "text-green-600 font-bold text-xs" : "absolute right-2 top-1/2 -translate-y-1/2 text-green-600 font-bold text-xs"}>
          ✓
        </span>
      );
    if (isCorrect === false)
      return (
        <span className={noAbsolute ? "text-destructive font-bold text-xs" : "absolute right-2 top-1/2 -translate-y-1/2 text-destructive font-bold text-xs"}>
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

      {/* ── DO THIS ────────────────────────────── */}
      <div className="rounded-[16px] border-2 border-indigo-400 overflow-hidden shadow-sm">
        <div className="bg-indigo-600 px-4 py-2 flex items-center gap-2">
          <span className="text-white text-lg">📝</span>
          <h2 className="font-heading text-base font-bold text-white tracking-wider">
            DO THIS
          </h2>
        </div>
        <div className="bg-indigo-50/40 p-5 space-y-4">
          <p className="font-medium text-indigo-900">Read these numbers and write in words.</p>
          <div className="space-y-4 pl-4">
            {DO_THIS.map((q, idx) => {
              const letters = ['a)', 'b)', 'c)'];
              return (
                <div key={q.id} className="flex flex-col gap-2">
                  <span className="font-semibold text-foreground/80">{letters[idx]} {q.num}</span>
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={
                        isRevealed
                          ? q.ans[0]
                          : (answers[q.id] ?? "")
                      }
                      disabled={isRevealed}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      onBlur={() => handleBlur(q.id, q.ans)}
                      placeholder="Write in words..."
                      className={`w-full rounded-[8px] border bg-white px-3 py-2 text-sm focus:outline-none transition-all shadow-sm ${inputClass(
                        q.id
                      )}`}
                    />
                    {badge(q.id)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── EXERCISE - 1.3 ─────────────────────── */}
      <div className="rounded-[16px] border border-green-200 bg-green-50/30 overflow-hidden shadow-sm mt-8">
        <div className="bg-green-700 px-4 py-2 flex items-center gap-2">
          <span className="text-white text-lg">✍️</span>
          <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
            Exercise - 1.3
          </h2>
        </div>
        <div className="p-5 space-y-8">
          
          {/* Q1 */}
          <div className="space-y-4">
            <p className="font-semibold text-green-900">1. Write the numbers using commas according to place values.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4">
              {EX_1_3_Q1.map((q, idx) => {
                const roman = ['i)', 'ii)', 'iii)', 'iv)'];
                return (
                  <div key={q.id} className="flex items-center gap-3">
                    <span className="w-20 text-right">{roman[idx]} {q.q}</span>
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={isRevealed ? q.ans : (answers[q.id] ?? "")}
                        disabled={isRevealed}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        onBlur={() => handleBlur(q.id, q.ans)}
                        className={`w-full rounded-[6px] border bg-white px-3 py-1.5 text-sm focus:outline-none transition-all font-mono ${inputClass(q.id)}`}
                      />
                      {badge(q.id)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Q2 */}
          <div className="space-y-4">
            <p className="font-semibold text-green-900">2. Write the numbers in words.</p>
            <div className="space-y-3 pl-4">
              {EX_1_3_Q2.map((q, idx) => {
                const roman = ['i)', 'ii)', 'iii)', 'iv)'];
                return (
                  <div key={q.id} className="flex flex-col gap-1.5">
                    <span className="font-medium text-foreground/80">{roman[idx]} {q.q}</span>
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={isRevealed ? q.ans[0] : (answers[q.id] ?? "")}
                        disabled={isRevealed}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        onBlur={() => handleBlur(q.id, q.ans)}
                        className={`w-full rounded-[6px] border bg-white px-3 py-1.5 text-sm focus:outline-none transition-all ${inputClass(q.id)}`}
                      />
                      {badge(q.id)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Q3 */}
          <div className="space-y-4">
            <p className="font-semibold text-green-900">3. Write the number in figures.</p>
            <div className="space-y-3 pl-4">
              {EX_1_3_Q3.map((q, idx) => {
                const roman = ['i)', 'ii)', 'iii)', 'iv)'];
                return (
                  <div key={q.id} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <span className="flex-1 text-sm">{roman[idx]} {q.q}</span>
                    <div className="relative w-full md:w-[150px] shrink-0">
                      <input
                        type="text"
                        value={isRevealed ? q.ans[0] : (answers[q.id] ?? "")}
                        disabled={isRevealed}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        onBlur={() => handleBlur(q.id, q.ans)}
                        className={`w-full rounded-[6px] border bg-white px-3 py-1.5 text-sm font-mono focus:outline-none transition-all ${inputClass(q.id)}`}
                      />
                      {badge(q.id)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Q4 */}
          <div className="space-y-4">
            <p className="font-semibold text-green-900">4. Write the numbers in expanded form.</p>
            <div className="space-y-3 pl-4">
              {EX_1_3_Q4.map((q, idx) => {
                const roman = ['i)', 'ii)', 'iii)', 'iv)'];
                return (
                  <div key={q.id} className="flex flex-col gap-1.5">
                    <span className="font-medium text-foreground/80">{roman[idx]} {q.q}</span>
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={isRevealed ? q.ans[0] : (answers[q.id] ?? "")}
                        disabled={isRevealed}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        onBlur={() => handleBlur(q.id, q.ans)}
                        className={`w-full rounded-[6px] border bg-white px-3 py-1.5 text-xs font-mono focus:outline-none transition-all ${inputClass(q.id)}`}
                      />
                      {badge(q.id)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Q5 */}
          <div className="space-y-4">
            <p className="font-semibold text-green-900">5. Write the following numbers in short form (standard notation):</p>
            <div className="space-y-3 pl-4">
              {EX_1_3_Q5.map((q, idx) => {
                const roman = ['i)', 'ii)', 'iii)', 'iv)'];
                return (
                  <div key={q.id} className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                    <span className="flex-1 text-xs font-mono bg-white/50 p-1.5 rounded">{roman[idx]} {q.q}</span>
                    <div className="relative w-full lg:w-[150px] shrink-0">
                      <input
                        type="text"
                        value={isRevealed ? q.ans[0] : (answers[q.id] ?? "")}
                        disabled={isRevealed}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        onBlur={() => handleBlur(q.id, q.ans)}
                        className={`w-full rounded-[6px] border bg-white px-3 py-1.5 text-sm font-mono focus:outline-none transition-all ${inputClass(q.id)}`}
                      />
                      {badge(q.id)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Q6 & Q7 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="font-semibold text-green-900 leading-tight">6. Which is larger between each of these two? Use greater than symbol (&gt;) and write.</p>
              <div className="space-y-3 pl-4">
                {EX_1_3_Q6.map((q, idx) => {
                  const roman = ['i)', 'ii)'];
                  return (
                    <div key={q.id} className="flex flex-col gap-1">
                      <span className="text-sm">{roman[idx]} {q.q}</span>
                      <div className="relative w-full max-w-[200px]">
                        <input
                          type="text"
                          value={isRevealed ? q.ans[0] : (answers[q.id] ?? "")}
                          disabled={isRevealed}
                          onChange={(e) => handleChange(q.id, e.target.value)}
                          onBlur={() => handleBlur(q.id, q.ans)}
                          placeholder="e.g. A > B"
                          className={`w-full rounded-[6px] border bg-white px-3 py-1 text-sm font-mono focus:outline-none transition-all ${inputClass(q.id)}`}
                        />
                        {badge(q.id)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-semibold text-green-900 leading-tight">7. Which is smaller between each of these two? Use less than symbol (&lt;) and write.</p>
              <div className="space-y-3 pl-4">
                {EX_1_3_Q7.map((q, idx) => {
                  const roman = ['i)', 'ii)'];
                  return (
                    <div key={q.id} className="flex flex-col gap-1">
                      <span className="text-sm">{roman[idx]} {q.q}</span>
                      <div className="relative w-full max-w-[200px]">
                        <input
                          type="text"
                          value={isRevealed ? q.ans[0] : (answers[q.id] ?? "")}
                          disabled={isRevealed}
                          onChange={(e) => handleChange(q.id, e.target.value)}
                          onBlur={() => handleBlur(q.id, q.ans)}
                          placeholder="e.g. A < B"
                          className={`w-full rounded-[6px] border bg-white px-3 py-1 text-sm font-mono focus:outline-none transition-all ${inputClass(q.id)}`}
                        />
                        {badge(q.id)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Q8 */}
          <div className="space-y-3 bg-green-50/50 p-4 rounded-xl border border-green-200">
            <p className="font-semibold text-green-900">8. Write any ten numbers with digits 5 in crores place, 2 in lakhs place, 1 in ten thousands place, 6 in tens place and 3 in ones place. (keep any digits in the remaining places)</p>
            <textarea 
              className="w-full rounded-[8px] border border-green-200 bg-white p-3 text-sm focus:outline-none focus:border-green-500 shadow-sm resize-none h-32"
              placeholder="Write your ten numbers here..."
            ></textarea>
          </div>

        </div>
      </div>

      {/* ── 1.6 INTERNATIONAL SYSTEM OF NUMERATION ─── */}
      <div className="space-y-4 mt-8">
        <div className="inline-flex items-center gap-2 bg-indigo-700 text-white px-4 py-1.5 rounded-r-full -ml-4 shadow-sm">
          <span className="font-bold">1.6</span>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider">
            International System of Numeration
          </h2>
        </div>

        <p className="mt-4 leading-relaxed">
          The numbers in which we read and write in our country are different from that of many other countries. We use lakhs for 6-digit number, ten lakhs for 7-digit numbers and then crores and ten crores etc. In the International system of numeration, we use ones, tens, hundreds, thousands, ten thousands, hundred thousands and then millions.
        </p>
      </div>

      {/* ── Footer banner ────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 text-sm font-bold text-white mt-8"
        style={{
          background: "linear-gradient(90deg, #16a34a 0%, #22c55e 100%)",
        }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-green-600 text-xs font-extrabold mr-3">
          10
        </span>
        <span className="tracking-wide flex-1 text-center">Government's Gift for Students' Progress</span>
      </div>
    </div>
  );
}
