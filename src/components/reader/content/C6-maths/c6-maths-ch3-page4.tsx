"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

const TABLE_ROWS = [
  { number: "72",      sumHint: "7 + 2",             sumVal: "9",  div3: "Yes", div9: "Yes" },
  { number: "197",     sumHint: "1 + 9 + 7",          sumVal: "17", div3: "No",  div9: "No"  },
  { number: "4889",    sumHint: "4 + 8 + 8 + 9",      sumVal: "29", div3: "No",  div9: "No"  },
  { number: "70875",   sumHint: "7 + 0 + 8 + 7 + 5",  sumVal: "27", div3: "Yes", div9: "Yes" },
];

const ALL_INPUT_IDS = [
  "q_div10_1","q_div10_2",
  "q1_i","q1_ii","q1_iii","q1_iv","q1_v","q1_vi","q1_vii",
  "q2",
  "q3_sum_0","q3_sum_1","q3_sum_2","q3_sum_3",
  "q4","q5","q6",
  "q7_a","q7_b","q7_c",
  "q8","q9",
];

const CORRECT: Record<string, string[]> = {
  q_div10_1: ["yes","y","true"],
  q_div10_2: ["0","zero"],
  // Q1 – (i) sum=22, ends 9 → None; (ii–vi) all end even + sum div 3 → 2,3,6;
  // (vii) sum=23 not div 3, ends 2 → 2 only
  q1_i:   ["none","neither","notdivisible"],
  q1_ii:  ["2,3,6","236","2and3and6","divisibleby2and3and6"],
  q1_iii: ["2,3,6","236","2and3and6","divisibleby2and3and6"],
  q1_iv:  ["2,3,6","236","2and3and6","divisibleby2and3and6"],
  q1_v:   ["2,3,6","236","2and3and6","divisibleby2and3and6"],
  q1_vi:  ["2,3,6","236","2and3and6","divisibleby2and3and6"],
  q1_vii: ["2","divisibleby2","2only"],
  // Q2 – divisible by BOTH 5 and 10 means ends in 0: 250, 1250, 35080, 45880
  q2: ["250,1250,35080,45880","250125035080 45880","2501250 3508045880"],
  q3_sum_0: ["9"],
  q3_sum_1: ["17"],
  q3_sum_2: ["29"],
  q3_sum_3: ["27"],
  q4: ["198","918","189","981","819","891"],
  // Q5 – 12345: ends 5 → div 5; sum=15 → div 3; odd → NOT 2,6,9
  q5: ["3and5","3,5","5and3","5,3"],
  q6: ["34","43","35","53","45","54"],
  q7_a: ["2"],
  q7_b: ["0"],
  q7_c: ["1"],
  q8: ["48"],
  q9: ["6"],
};

const REVEAL_TEXT: Record<string, string> = {
  q_div10_1: "Yes",
  q_div10_2: "0 (zero)",
  // Q1 correct answers (verified by digit-sum + ones-digit test)
  q1_i:   "None — 121729: sum=22 (not÷3), ends 9 (odd) → not divisible by 2, 3, or 6",
  q1_ii:  "2, 3, 6 — 197232: sum=24 (÷3 ✓), ends 2 (even ✓)",
  q1_iii: "2, 3, 6 — 972132: sum=24 (÷3 ✓), ends 2 (even ✓)",
  q1_iv:  "2, 3, 6 — 1790184: sum=30 (÷3 ✓), ends 4 (even ✓)",
  q1_v:   "2, 3, 6 — 312792: sum=24 (÷3 ✓), ends 2 (even ✓)",
  q1_vi:  "2, 3, 6 — 800532: sum=18 (÷3 ✓), ends 2 (even ✓)",
  q1_vii: "2 only — 724352: sum=23 (not÷3), ends 2 (even ✓)",
  // Q2: divisible by BOTH 5 and 10 → ones digit must be 0
  q2: "250, 1250, 35080, 45880 (end in 0 → divisible by both 5 and 10)",
  q3_sum_0: "9",
  q3_sum_1: "17",
  q3_sum_2: "29",
  q3_sum_3: "27",
  q4: "All 6 arrangements (198, 189, 918, 981, 819, 891) — 1+9+8=18 is divisible by 9",
  // Q5: 12345 ends in 5 → ÷5; sum=15 → ÷3; odd → NOT ÷2, 6, 9
  q5: "3 and 5 — sum of digits=15 (÷3 ✓), ends in 5 (÷5 ✓)",
  q6: "34, 35, 43, 45, 53, 54",
  q7_a: "2  →  6+2+7+2+4 = 21 ✓ (÷3)",
  q7_b: "0  →  4+7+6+5+0+2 = 24 ✓ (÷3)",
  q7_c: "1  →  7+2+2+1+1+5 = 18 ✓ (÷3)",
  q8: "48  →  57×3=171, 171−123=48",
  q9: "6  →  256÷10 remainder=6, so subtract 6 → 250",
};

export function C6MathsCh3Page4() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page4";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<Record<string, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number } | null>(null);

  useEffect(() => {
    const saved: Record<string, string> = {};
    const savedG: Record<string, { value: string; correct: boolean }> = {};
    ALL_INPUT_IDS.forEach((id) => {
      const a = localStorage.getItem(`${storageKey}-${id}-answer`);
      if (a) saved[id] = a;
      const g = localStorage.getItem(`${storageKey}-${id}-graded`);
      if (g) { try { savedG[id] = JSON.parse(g); } catch {} }
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

  const normalize = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

  const handleBlur = (id: string, isOpen = false) => {
    if (isRevealed) return;
    const rawTyped = answers[id] ?? "";
    const typed = normalize(rawTyped);
    if (!typed && !isOpen) return;
    if (isOpen && !rawTyped.trim()) return;
    const prev = graded[id];
    if (prev && prev.value === typed) return;
    const accepted = CORRECT[id] ?? [];
    const correct = isOpen ? rawTyped.trim().length > 3 : accepted.some((a) => normalize(a) === typed);
    let delta = 0;
    if (prev) { if (!prev.correct && correct) delta = 2; else if (prev.correct && !correct) delta = -2; }
    else { delta = correct ? 1 : -1; }
    if (delta !== 0) addPoints(delta);
    setFeedback({ correct, id: Date.now() });
    const next = { ...graded, [id]: { value: typed, correct } };
    setGraded(next);
    localStorage.setItem(`${storageKey}-${id}-graded`, JSON.stringify({ value: typed, correct }));
  };

  function ic(id: string): string {
    if (isRevealed) return "border-emerald-500 bg-emerald-50 font-bold text-emerald-800";
    const typed = (answers[id] ?? "").trim();
    if (!typed) return "border-teal-200 focus:border-teal-500";
    const g = graded[id];
    if (g?.correct === true) return "border-green-500 bg-green-50 text-green-700 font-bold";
    if (g?.correct === false) return "border-destructive bg-destructive/5 text-destructive";
    return "border-teal-200 focus:border-teal-500";
  }

  function badge(id: string) {
    if (isRevealed) return null;
    const typed = (answers[id] ?? "").trim();
    if (!typed) return null;
    const g = graded[id];
    if (g?.correct === true) return <span className="absolute right-2 top-2 text-green-600 font-bold text-xs select-none bg-white/80 rounded-full px-1">✓</span>;
    if (g?.correct === false) return <span className="absolute right-2 top-2 text-destructive font-bold text-xs select-none bg-white/80 rounded-full px-1">✗</span>;
    return null;
  }

  function inp(id: string, ph = "Type answer…", extraCls = "") {
    return (
      <div className="relative">
        <input
          type="text"
          id={id}
          placeholder={isRevealed ? "" : ph}
          value={isRevealed ? (REVEAL_TEXT[id] ?? "") : (answers[id] ?? "")}
          onChange={(e) => handleChange(id, e.target.value)}
          onBlur={() => handleBlur(id)}
          readOnly={isRevealed}
          className={`w-full ${extraCls} rounded-md border p-2 text-sm outline-none transition-colors ${ic(id)}`}
        />
        {badge(id)}
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 font-body text-sm leading-relaxed text-foreground/90 pb-8">
      {feedback !== null && (
        <AnswerFeedback key={feedback.id} correct={feedback.correct} onDone={() => setFeedback(null)} />
      )}

      {/* 3.2.6 Divisibility by 10 */}
      <div className="space-y-4 pt-4">
        <h2 className="font-heading font-bold text-teal-950 text-xl tracking-wide">
          3.2.6 Divisibility by 10
        </h2>
        <p>Mark all the numbers divisible by <strong>10</strong> with a tick (✓) in the number chart. What do you notice?</p>
        <ol className="list-decimal list-inside space-y-1 pl-2">
          <li>All of them have their <strong>ones place = 0</strong>.</li>
          <li>All of them are divisible by both <strong>2</strong> and <strong>5</strong>.</li>
        </ol>

        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 shadow-sm">
          <p className="font-semibold text-amber-900">
            💡 <strong>Rule:</strong> A number is divisible by <span className="text-amber-700 font-bold">10</span> if its <em>ones digit is 0</em>.
          </p>
        </div>

        {/* Do This */}
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl overflow-hidden">
          <div className="bg-emerald-600 text-white font-bold px-4 py-2 flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded">✍️</span> Do This
          </div>
          <div className="p-5 space-y-5">
            <div className="space-y-2">
              <label className="font-semibold text-emerald-900 block">
                Are all multiples of 10 also divisible by both 2 and 5?
              </label>
              {inp("q_div10_1", "Yes / No")}
            </div>
            <div className="space-y-2">
              <label className="font-semibold text-emerald-900 block">
                What digit must be at the ones place for a number to be divisible by 10?
              </label>
              {inp("q_div10_2", "Enter the digit…")}
            </div>
          </div>
        </div>
      </div>

      {/* Exercise 3.1 */}
      <div className="space-y-6 border-t-2 border-teal-200 pt-6">
        <div className="bg-teal-700 text-white font-bold text-center py-3 rounded-xl text-base tracking-widest uppercase flex items-center justify-center gap-2">
          <span>📘</span> Exercise – 3.1
        </div>

        {/* Q1 */}
        <div className="space-y-3">
          <p className="font-semibold">
            1. Which of the following numbers are divisible by 2, 3 and 6?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: "q1_i",   label: "(i) 121729"   },
              { id: "q1_ii",  label: "(ii) 197232"   },
              { id: "q1_iii", label: "(iii) 972132"  },
              { id: "q1_iv",  label: "(iv) 1790184"  },
              { id: "q1_v",   label: "(v) 312792"    },
              { id: "q1_vi",  label: "(vi) 800532"   },
              { id: "q1_vii", label: "(vii) 724352"  },
            ].map(({ id, label }) => (
              <div key={id} className="bg-teal-50 rounded-lg p-3 space-y-2">
                <p className="font-medium text-teal-900 font-mono">{label}</p>
                <div className="relative">
                  <input
                    type="text"
                    id={id}
                    placeholder={isRevealed ? "" : "e.g. 2, 3 and 6 / None"}
                    value={isRevealed ? (REVEAL_TEXT[id] ?? "") : (answers[id] ?? "")}
                    onChange={(e) => handleChange(id, e.target.value)}
                    onBlur={() => handleBlur(id)}
                    readOnly={isRevealed}
                    className={`w-full rounded-md border p-2 text-xs outline-none transition-colors ${ic(id)}`}
                  />
                  {badge(id)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Q2 */}
        <div className="space-y-2 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-semibold text-blue-900">
            2. Determine which of the following numbers are divisible by 5 and 10.
          </p>
          <p className="text-xs font-mono text-blue-700 bg-white rounded p-2">
            25, 125, 250, 1250, 10205, 35080, 70985, 45880
          </p>
          {inp("q2", "List numbers divisible by 5 and 10…")}
        </div>

        {/* Q3 – Interactive table */}
        <div className="space-y-3">
          <p className="font-semibold">3. Fill the table using divisibility test for 3 and 9:</p>
          <div className="overflow-x-auto rounded-xl border border-teal-200 shadow-sm">
            <table className="w-full text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-teal-700 text-white">
                  <th className="px-3 py-2 text-left font-semibold rounded-tl-xl">Number</th>
                  <th className="px-3 py-2 text-center font-semibold">Sum of the digits</th>
                  <th className="px-3 py-2 text-center font-semibold" colSpan={2}>Divisible by</th>
                </tr>
                <tr className="bg-teal-600 text-white text-xs">
                  <th className="px-3 py-1"></th>
                  <th className="px-3 py-1"></th>
                  <th className="px-3 py-1 text-center border-l border-teal-500">3</th>
                  <th className="px-3 py-1 text-center border-l border-teal-500 rounded-tr-xl">9</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row, i) => (
                  <tr key={row.number} className={i % 2 === 0 ? "bg-white" : "bg-teal-50"}>
                    <td className="px-3 py-2 font-mono font-bold text-teal-800">{row.number}</td>
                    <td className="px-3 py-2">
                      <div className="relative">
                        <input
                          type="text"
                          id={`q3_sum_${i}`}
                          placeholder={isRevealed ? "" : `${row.sumHint} = ?`}
                          value={isRevealed ? (REVEAL_TEXT[`q3_sum_${i}`] ?? "") : (answers[`q3_sum_${i}`] ?? "")}
                          onChange={(e) => handleChange(`q3_sum_${i}`, e.target.value)}
                          onBlur={() => handleBlur(`q3_sum_${i}`)}
                          readOnly={isRevealed}
                          className={`w-full rounded border p-1 text-center text-xs outline-none transition-colors ${ic(`q3_sum_${i}`)}`}
                        />
                        {badge(`q3_sum_${i}`)}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-center border-l border-teal-100">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${row.div3 === "Yes" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        {row.div3}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center border-l border-teal-100">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${row.div9 === "Yes" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        {row.div9}
                      </span>
                    </td>
                  </tr>
                ))}
                {/* Pre-filled example row */}
                <tr className="bg-teal-50">
                  <td className="px-3 py-2 font-mono font-bold text-teal-800">948974</td>
                  <td className="px-3 py-2 text-center font-mono text-teal-700 text-xs">9+4+8+9+7+4 = 41 ✅</td>
                  <td className="px-3 py-2 text-center border-l border-teal-100">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600">No</span>
                  </td>
                  <td className="px-3 py-2 text-center border-l border-teal-100">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600">No</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-teal-600 italic">The last row is pre-filled as an example — fill in the sums for the others!</p>
        </div>

        {/* Q4 */}
        <div className="space-y-2 bg-purple-50 border border-purple-200 rounded-xl p-4">
          <p className="font-semibold text-purple-900">
            4. Make 3 different 3-digit numbers using 1, 9 and 8 (each digit used only once). Check which are divisible by 9.
          </p>
          {inp("q4", "e.g. 198, 918…")}
          {isRevealed && (
            <p className="text-xs text-purple-700 mt-1 bg-white rounded p-2">
              1+9+8 = 18 → divisible by 9. So every arrangement (198, 189, 918, 981, 819, 891) is divisible by 9!
            </p>
          )}
        </div>

        {/* Q5 */}
        <div className="space-y-2 bg-orange-50 border border-orange-200 rounded-xl p-4">
          <p className="font-semibold text-orange-900">
            5. Which numbers among 2, 3, 5, 6, 9 divide 12345 exactly?
          </p>
          <div className="bg-white rounded-lg p-3 text-xs font-mono text-orange-800 space-y-1">
            <div>Ones digit = 5 → divisible by <strong>5</strong> ✓</div>
            <div>Sum = 1+2+3+4+5 = <strong>15</strong> → div by 3 ✓ (not by 9 since 15÷9 has remainder)</div>
            <div>Ends in 5 (odd) → <strong>not</strong> divisible by 2 or 6</div>
          </div>
          {inp("q5", "e.g. 3 and 5")}
        </div>

        {/* Q6 */}
        <div className="space-y-2 bg-rose-50 border border-rose-200 rounded-xl p-4">
          <p className="font-semibold text-rose-900">
            6. Write different 2-digit numbers using digits 3, 4 and 5. Check which are divisible by 2, 3, 5, 6 and 9.
          </p>
          {inp("q6", "List numbers…", "")}
        </div>

        {/* Q7 */}
        <div className="space-y-3 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <p className="font-semibold text-indigo-900">
            7. Write the smallest possible digit in each blank so that the number is divisible by 3.
          </p>
          {[
            { id: "q7_a", display: "6 __ 724" },
            { id: "q7_b", display: "4765 __ 2" },
            { id: "q7_c", display: "7221 __ 5" },
          ].map(({ id, display }, idx) => (
            <div key={id} className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-mono font-bold text-indigo-800 min-w-[7rem]">
                {["i.", "ii.", "iii."][idx]} {display}
              </span>
              <div className="relative flex-1 max-w-xs">
                <input
                  type="text"
                  id={id}
                  placeholder={isRevealed ? "" : "Missing digit…"}
                  value={isRevealed ? (REVEAL_TEXT[id] ?? "") : (answers[id] ?? "")}
                  onChange={(e) => handleChange(id, e.target.value)}
                  onBlur={() => handleBlur(id)}
                  readOnly={isRevealed}
                  className={`w-full rounded-md border p-2 text-sm outline-none transition-colors ${ic(id)}`}
                />
                {badge(id)}
              </div>
            </div>
          ))}
        </div>

        {/* Q8 */}
        <div className="space-y-2 bg-cyan-50 border border-cyan-200 rounded-xl p-4">
          <p className="font-semibold text-cyan-900">
            8. Find the smallest number that must be added to 123 so that it becomes exactly divisible by 57.
          </p>
          <div className="text-xs font-mono text-cyan-700 bg-white rounded p-2">
            57 × 2 = 114 &lt; 123 &lt; 57 × 3 = 171 → 171 − 123 = <strong>48</strong>
          </div>
          {inp("q8", "Answer…", "max-w-xs")}
        </div>

        {/* Q9 */}
        <div className="space-y-2 bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="font-semibold text-green-900">
            9. Find the smallest number that has to be subtracted from 256 so that it becomes exactly divisible by 10.
          </p>
          <div className="text-xs font-mono text-green-700 bg-white rounded p-2">
            256 ÷ 10 → remainder = <strong>6</strong> → subtract 6 → 250 ÷ 10 = 25 ✓
          </div>
          {inp("q9", "Answer…", "max-w-xs")}
        </div>
      </div>
    </div>
  );
}
