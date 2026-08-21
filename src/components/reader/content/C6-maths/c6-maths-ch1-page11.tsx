"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

const EX_1_4_Q1 = [
  { id: "q1_i", q: "97645315", ans: "97,645,315" },
  { id: "q1_ii", q: "20048421", ans: "20,048,421" },
  { id: "q1_iii", q: "476356", ans: "476,356" },
  { id: "q1_iv", q: "9490026834", ans: "9,490,026,834" }
];

const EX_1_4_Q3 = [
  { 
    id: "q3_i", 
    q: "123115027", 
    ansIn: ["Twelve crore thirty one lakh fifteen thousand twenty seven", "Twelve crore thirty-one lakh fifteen thousand twenty-seven", "Twelve crore thirty one lakh fifteen thousand and twenty seven"],
    ansInt: ["One hundred twenty three million one hundred fifteen thousand twenty seven", "One hundred twenty-three million one hundred fifteen thousand twenty-seven", "One hundred and twenty three million one hundred and fifteen thousand and twenty seven"] 
  },
  { 
    id: "q3_ii", 
    q: "89643092", 
    ansIn: ["Eight crore ninety six lakh forty three thousand ninety two", "Eight crore ninety-six lakh forty-three thousand ninety-two", "Eight crore ninety six lakh forty three thousand and ninety two"],
    ansInt: ["Eighty nine million six hundred forty three thousand ninety two", "Eighty-nine million six hundred forty-three thousand ninety-two", "Eighty nine million six hundred and forty three thousand and ninety two"] 
  }
];

const EX_1_4_Q4 = [
  { id: "q4_i", q: "The digit in millions place", ans: "2" },
  { id: "q4_ii", q: "The digit in hundreds place", ans: "4" },
  { id: "q4_iii", q: "The digit in ten millions place", ans: "0" }
];

export function C6MathsCh1Page11() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch1-page11";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  const ALL_QUESTIONS = [
    ...EX_1_4_Q1, 
    ...EX_1_4_Q3.flatMap(q => [{id: `${q.id}_in`, ans: q.ansIn}, {id: `${q.id}_int`, ans: q.ansInt}]),
    ...EX_1_4_Q4
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
    const typed = (answers[id] ?? "").trim();
    if (!typed) return;
    
    // Normalizer: lowercase and remove all spaces/commas for comparison
    const normalize = (s: string) => s.toLowerCase().replace(/[\s,]+/g, "");
    const normalizedTyped = normalize(typed);
    
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

      <p>
        One million is a thousand thousands or ten lakhs. Commas are used to mark thousands and millions. Comma comes after every three digits from the right.
      </p>

      {/* ── Numeration comparison table ─────────── */}
      <div className="space-y-4 bg-sky-50/40 p-4 rounded-xl border border-sky-100">
        <p className="font-semibold text-sky-900">Suppose the number is 45690255</p>
        <div className="overflow-x-auto rounded-[8px] border border-sky-200 shadow-sm">
          <table className="w-full border-collapse text-left text-sm bg-white">
            <thead>
              <tr className="bg-sky-600 text-white">
                <th className="border border-sky-700 px-4 py-2 font-semibold">Indian system of numeration</th>
                <th className="border border-sky-700 px-4 py-2 font-semibold">International system of numeration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-sky-100 px-4 py-2 font-mono text-sky-900">4,56,90,255</td>
                <td className="border border-sky-100 px-4 py-2 font-mono text-sky-900">45,690,255</td>
              </tr>
              <tr className="bg-sky-50/50">
                <td className="border border-sky-100 px-4 py-2">Four crore fifty six lakhs ninety thousand two hundred and fifty five.</td>
                <td className="border border-sky-100 px-4 py-2">Forty five million six hundred ninety thousand two hundred fifty five.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="font-medium text-foreground/80 mt-2">Have you noticed that there is no change of numeration upto hundreds place?</p>
        <p className="font-medium text-foreground/80">What else have you observed?</p>
      </div>

      <p className="font-medium">Let us compare the places in both the systems for better understanding:</p>

      {/* ── Detailed Places Comparison Table ─────── */}
      <div className="overflow-x-auto rounded-[12px] border-2 border-indigo-200 shadow-sm">
        <table className="w-full border-collapse text-center text-xs">
          <tbody>
            <tr className="bg-indigo-50 font-semibold text-indigo-900">
              <td className="border border-indigo-200 px-2 py-3 bg-indigo-100/50 text-left">Indian System</td>
              <td className="border border-indigo-200 px-1 py-3">H.Cr.</td>
              <td className="border border-indigo-200 px-1 py-3">T.Cr.</td>
              <td className="border border-indigo-200 px-1 py-3">Cr.</td>
              <td className="border border-indigo-200 px-1 py-3">T.La</td>
              <td className="border border-indigo-200 px-1 py-3">La</td>
              <td className="border border-indigo-200 px-1 py-3">Ten<br/>Th.</td>
              <td className="border border-indigo-200 px-1 py-3">Thous.</td>
              <td className="border border-indigo-200 px-1 py-3">Hund.</td>
              <td className="border border-indigo-200 px-1 py-3">Tens</td>
              <td className="border border-indigo-200 px-1 py-3">Ones</td>
            </tr>
            <tr className="bg-white font-semibold text-foreground/80">
              <td className="border border-indigo-200 px-2 py-3 bg-indigo-50/50 text-left">International System</td>
              <td className="border border-indigo-200 px-1 py-3">Billion</td>
              <td className="border border-indigo-200 px-1 py-3">Hund.<br/>Million</td>
              <td className="border border-indigo-200 px-1 py-3">Ten<br/>Million</td>
              <td className="border border-indigo-200 px-1 py-3">Million</td>
              <td className="border border-indigo-200 px-1 py-3">Hun.<br/>Th.</td>
              <td className="border border-indigo-200 px-1 py-3">Ten<br/>Th.</td>
              <td className="border border-indigo-200 px-1 py-3">Thous.</td>
              <td className="border border-indigo-200 px-1 py-3">Hund.</td>
              <td className="border border-indigo-200 px-1 py-3">Tens</td>
              <td className="border border-indigo-200 px-1 py-3">Ones</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>From the above table, the relation between these systems can be understood as follows:</p>
      
      {/* ── Relations ─────────────────────────── */}
      <div className="flex justify-center my-6">
        <div className="grid grid-cols-[auto_auto_auto] gap-x-6 gap-y-3 font-mono text-sm bg-emerald-50 p-5 rounded-xl border border-emerald-100 text-emerald-900">
          <div className="text-right font-medium">10 lakhs</div>
          <div className="text-center">=</div>
          <div className="text-left font-bold">1 million</div>

          <div className="text-right font-medium">1 crore</div>
          <div className="text-center">=</div>
          <div className="text-left font-bold">10 million</div>

          <div className="text-right font-medium">10 crore</div>
          <div className="text-center">=</div>
          <div className="text-left font-bold">100 million</div>

          <div className="text-right font-medium">100 crore</div>
          <div className="text-center">=</div>
          <div className="text-left font-bold">1 billion</div>
        </div>
      </div>

      {/* ── EXERCISE - 1.4 ─────────────────────── */}
      <div className="rounded-[16px] border border-teal-300 bg-teal-50/30 overflow-hidden shadow-sm mt-8">
        <div className="bg-teal-600 px-4 py-2 flex items-center gap-2">
          <span className="text-white text-lg">📝</span>
          <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
            Exercise - 1.4
          </h2>
        </div>
        <div className="p-5 space-y-8">
          
          {/* Q1 */}
          <div className="space-y-4">
            <p className="font-semibold text-teal-900">1. Write the numbers using commas according to International system of numeration.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4">
              {EX_1_4_Q1.map((q, idx) => {
                const roman = ['i.', 'ii.', 'iii.', 'iv.'];
                return (
                  <div key={q.id} className="flex items-center gap-3">
                    <span className="w-24 text-right font-mono text-sm">{roman[idx]} {q.q}</span>
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={isRevealed ? q.ans : (answers[q.id] ?? "")}
                        disabled={isRevealed}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        onBlur={() => handleBlur(q.id, q.ans)}
                        className={`w-full rounded-[6px] border bg-white px-3 py-1.5 text-sm focus:outline-none transition-all font-mono ${inputClass(q.id)}`}
                        placeholder="e.g. 1,000,000"
                      />
                      {badge(q.id)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Q2 */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-teal-200">
            <p className="font-semibold text-teal-900">2. Collect the mobile numbers of your friends and other family members. Write them using commas and read them in International system.</p>
            <textarea 
              className="w-full rounded-[8px] border border-teal-200 bg-gray-50 p-3 text-sm focus:outline-none focus:border-teal-500 shadow-inner resize-none h-24"
              placeholder="List mobile numbers with international commas (e.g. 9,876,543,210)..."
            ></textarea>
          </div>

          {/* Q3 */}
          <div className="space-y-4">
            <p className="font-semibold text-teal-900">3. Write the numbers in words in both Indian and International system:</p>
            <div className="space-y-6 pl-4">
              {EX_1_4_Q3.map((q, idx) => {
                const roman = ['i.', 'ii.'];
                const inId = `${q.id}_in`;
                const intId = `${q.id}_int`;
                return (
                  <div key={q.id} className="space-y-3 bg-teal-50/50 p-4 rounded-xl border border-teal-100">
                    <span className="font-bold text-lg font-mono text-teal-800">{roman[idx]} {q.q}</span>
                    
                    <div className="space-y-2 pl-2">
                      <label className="text-xs font-semibold text-teal-700 uppercase tracking-wide">Indian System</label>
                      <div className="relative w-full">
                        <textarea
                          value={isRevealed ? q.ansIn[0] : (answers[inId] ?? "")}
                          disabled={isRevealed}
                          onChange={(e) => handleChange(inId, e.target.value)}
                          onBlur={() => handleBlur(inId, q.ansIn)}
                          className={`w-full rounded-[6px] border bg-white px-3 py-2 text-sm focus:outline-none transition-all resize-none h-16 ${inputClass(inId)}`}
                          placeholder="e.g. Ten crore..."
                        />
                        <div className="absolute right-3 top-3">
                          {badge(inId, true)}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pl-2">
                      <label className="text-xs font-semibold text-blue-700 uppercase tracking-wide">International System</label>
                      <div className="relative w-full">
                        <textarea
                          value={isRevealed ? q.ansInt[0] : (answers[intId] ?? "")}
                          disabled={isRevealed}
                          onChange={(e) => handleChange(intId, e.target.value)}
                          onBlur={() => handleBlur(intId, q.ansInt)}
                          className={`w-full rounded-[6px] border bg-white px-3 py-2 text-sm focus:outline-none transition-all resize-none h-16 ${inputClass(intId)}`}
                          placeholder="e.g. One hundred million..."
                        />
                        <div className="absolute right-3 top-3">
                          {badge(intId, true)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Q4 */}
          <div className="space-y-4">
            <p className="font-semibold text-teal-900">4. Read the number carefully and answer the following:</p>
            <p className="font-mono text-lg font-bold text-center bg-gray-100 py-3 rounded-xl border border-gray-200">
              302,179,468
            </p>
            <div className="space-y-3 pl-4">
              {EX_1_4_Q4.map((q, idx) => {
                const roman = ['i.', 'ii.', 'iii.'];
                return (
                  <div key={q.id} className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="flex-1 text-sm font-medium">{roman[idx]} {q.q}</span>
                    <div className="relative w-24 shrink-0">
                      <input
                        type="text"
                        value={isRevealed ? q.ans : (answers[q.id] ?? "")}
                        disabled={isRevealed}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        onBlur={() => handleBlur(q.id, q.ans)}
                        className={`w-full rounded-[6px] border bg-white px-3 py-1.5 text-center font-mono font-bold focus:outline-none transition-all ${inputClass(q.id)}`}
                      />
                      {badge(q.id)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ── Footer banner ────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 text-sm font-bold text-white mt-8"
        style={{
          background: "linear-gradient(90deg, #16a34a 0%, #22c55e 100%)",
        }}
      >
        <span className="tracking-wide flex-1 text-center">KNOWING OUR NUMBERS</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-green-600 text-xs font-extrabold ml-3">
          11
        </span>
      </div>
    </div>
  );
}
