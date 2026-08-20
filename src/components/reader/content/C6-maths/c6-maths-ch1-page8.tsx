"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

type NumberData = {
  digits: string;
  smallest: string;
  greatest: string;
};

const TRY_THESE_NUMBERS: NumberData[] = [
  { digits: "Two digit", smallest: "10", greatest: "99" },
  { digits: "Three digit", smallest: "100", greatest: "999" },
  { digits: "Four digit", smallest: "1000", greatest: "9999" },
  { digits: "Five digit", smallest: "10000", greatest: "99999" },
  { digits: "Six digit", smallest: "100000", greatest: "999999" },
  { digits: "Seven digit", smallest: "1000000", greatest: "9999999" },
  { digits: "Eight digit", smallest: "10000000", greatest: "99999999" },
];

export function C6MathsCh1Page8() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch1-page8";

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
    
    const allIds: string[] = [];
    TRY_THESE_NUMBERS.forEach((_, idx) => {
      allIds.push(`tt_s_${idx}`, `tt_g_${idx}`);
    });

    allIds.forEach((id) => {
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
      const allIds: string[] = [];
      TRY_THESE_NUMBERS.forEach((_, idx) => {
        allIds.push(`tt_s_${idx}`, `tt_g_${idx}`);
      });

      allIds.forEach((id) => {
        localStorage.removeItem(`${storageKey}-${id}-answer`);
        localStorage.removeItem(`${storageKey}-${id}-graded`);
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
    const typed = (answers[id] ?? "").trim().toLowerCase().replace(/[\s,]+/g, ""); // Allow commas and spaces
    if (!typed) return;
    const prev = graded[id];
    if (prev && prev.value === typed) return;

    const correctArray = Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers];
    const correct = correctArray.some(
      (a) => a.trim().toLowerCase().replace(/[\s,]+/g, "") === typed
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
    const next = { ...graded, [id]: { value: typed, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${id}-graded`,
      JSON.stringify({ value: typed, correct })
    );
  };

  function inputClass(id: string): string {
    const typed = (answers[id] ?? "").trim().toLowerCase().replace(/[\s,]+/g, "");
    const g = graded[id];
    const isCorrect = g && g.value === typed ? g.correct : null;
    if (isRevealed) return "border-primary bg-primary/5 font-bold text-primary";
    if (isCorrect === true)
      return "border-green-500 bg-green-50 text-green-700 font-bold";
    if (isCorrect === false)
      return "border-destructive bg-destructive/5 text-destructive";
    return "border-border/60 focus:border-primary";
  }

  function badge(id: string) {
    const typed = (answers[id] ?? "").trim().toLowerCase().replace(/[\s,]+/g, "");
    const g = graded[id];
    const isCorrect = g && g.value === typed ? g.correct : null;
    if (isRevealed) return null;
    if (isCorrect === true)
      return (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 font-bold text-xs">
          ✓
        </span>
      );
    if (isCorrect === false)
      return (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-destructive font-bold text-xs">
          ✗
        </span>
      );
    return null;
  }

  return (
    <div className="w-full space-y-8 font-body text-sm leading-relaxed text-foreground/90">
      {feedback !== null && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* ── TRY THESE ────────────────────────────── */}
      <div className="rounded-[16px] border-2 border-emerald-500 overflow-hidden shadow-sm">
        <div className="bg-emerald-600 px-4 py-2 flex items-center gap-2">
          <span className="text-white text-lg">✏️</span>
          <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
            TRY THESE
          </h2>
        </div>
        <div className="bg-emerald-50/40 p-5 space-y-6">
          <ol className="list-decimal pl-5 space-y-6 font-medium text-emerald-900">
            <li className="space-y-3">
              <p>Give any five examples using daily life situations where the number of things counted would be more than 6-digits.</p>
              <textarea 
                className="w-full rounded-[8px] border border-emerald-200 bg-white p-3 text-sm focus:outline-none focus:border-emerald-500 shadow-sm resize-none h-24"
                placeholder="Write your examples here... (e.g., Population of a city, money in a large bank account, etc.)"
              ></textarea>
            </li>
            <li className="space-y-4">
              <p>Write the smallest and the greatest of all two digit, three digit, four digit, five digit, six digit, seven digit and eight digit numbers.</p>
              
              <div className="overflow-x-auto rounded-[8px] border border-emerald-200 shadow-sm bg-white">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-emerald-100/50">
                      <th className="border-b border-r border-emerald-200 px-4 py-2 text-emerald-800">Number of Digits</th>
                      <th className="border-b border-r border-emerald-200 px-4 py-2 text-emerald-800">Smallest Number</th>
                      <th className="border-b border-emerald-200 px-4 py-2 text-emerald-800">Greatest Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRY_THESE_NUMBERS.map((row, idx) => {
                      const sId = `tt_s_${idx}`;
                      const gId = `tt_g_${idx}`;
                      return (
                        <tr key={idx} className="border-b border-emerald-100 last:border-b-0 hover:bg-emerald-50/30">
                          <td className="border-r border-emerald-100 px-4 py-2 font-medium text-foreground/80">{row.digits}</td>
                          <td className="border-r border-emerald-100 px-4 py-2">
                            <div className="relative w-full max-w-[150px]">
                              <input
                                type="text"
                                value={
                                  isRevealed
                                    ? row.smallest
                                    : (answers[sId] ?? "")
                                }
                                disabled={isRevealed}
                                onChange={(e) => handleChange(sId, e.target.value)}
                                onBlur={() => handleBlur(sId, row.smallest)}
                                className={`w-full rounded-[6px] border bg-white px-3 py-1.5 text-sm font-mono focus:outline-none transition-all shadow-sm ${inputClass(
                                  sId
                                )}`}
                              />
                              {badge(sId)}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="relative w-full max-w-[150px]">
                              <input
                                type="text"
                                value={
                                  isRevealed
                                    ? row.greatest
                                    : (answers[gId] ?? "")
                                }
                                disabled={isRevealed}
                                onChange={(e) => handleChange(gId, e.target.value)}
                                onBlur={() => handleBlur(gId, row.greatest)}
                                className={`w-full rounded-[6px] border bg-white px-3 py-1.5 text-sm font-mono focus:outline-none transition-all shadow-sm ${inputClass(
                                  gId
                                )}`}
                              />
                              {badge(gId)}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* ── 1.5.1 Place value of larger numbers ────────── */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-1.5 rounded-r-full -ml-4 shadow-sm">
          <span className="font-bold">1.5.1</span>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider">
            Place value of larger numbers
          </h2>
        </div>

        <p className="mt-4">Read the following numbers:</p>
        <div className="flex flex-wrap gap-6 pl-4 font-mono text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
          <span>a) 25240</span>
          <span>b) 130407</span>
          <span>c) 4504155</span>
          <span>d) 12200320</span>
        </div>

        <p className="text-foreground/80">Did you find it difficult to read the number in crores, lakhs and thousands?</p>
        
        <p className="mt-2">Now read the following numbers.</p>
        <div className="flex flex-wrap gap-6 pl-4 font-mono text-sm bg-gray-50 p-3 rounded-lg border border-gray-200 font-bold text-indigo-900">
          <span>a) 25,240</span>
          <span>b) 1,30,407</span>
          <span>c) 45,04,155</span>
          <span>d) 1,22,00,320</span>
        </div>

        <p className="text-foreground/80 font-medium">Comparatively is it easier to read the numbers using commas?</p>
        <p>Use of 'commas' helps us in reading and writing of large numbers.</p>
        
        <p>
          There are some indicators useful in writing the expansion of numbers. For example, Radha is expanding a number. She identifies the digits in ones place, tens place and hundreds place in 367, by writing them under O, T and H as shown in the table.
        </p>

        {/* Mini Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex flex-col sm:flex-row items-center gap-4">
            <table className="border-collapse text-center text-sm border-2 border-indigo-300 bg-white shrink-0">
              <thead>
                <tr className="bg-indigo-100 text-indigo-900">
                  <th className="border border-indigo-300 px-3 py-1.5 font-bold">H</th>
                  <th className="border border-indigo-300 px-3 py-1.5 font-bold">T</th>
                  <th className="border border-indigo-300 px-3 py-1.5 font-bold">O</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-indigo-300 px-3 py-1.5 font-mono">3</td>
                  <td className="border border-indigo-300 px-3 py-1.5 font-mono">6</td>
                  <td className="border border-indigo-300 px-3 py-1.5 font-mono">7</td>
                </tr>
              </tbody>
            </table>
            <div className="text-sm">
              <span className="font-semibold text-indigo-900">Expansion</span>
              <div className="font-mono mt-1">3 × 100 + 6 × 10 + 7 × 1</div>
            </div>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-foreground/80">Similarly for 1,729</span>
              <table className="border-collapse text-center text-sm border-2 border-blue-300 bg-white shrink-0">
                <thead>
                  <tr className="bg-blue-100 text-blue-900">
                    <th className="border border-blue-300 px-3 py-1.5 font-bold">Th</th>
                    <th className="border border-blue-300 px-3 py-1.5 font-bold">H</th>
                    <th className="border border-blue-300 px-3 py-1.5 font-bold">T</th>
                    <th className="border border-blue-300 px-3 py-1.5 font-bold">O</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-blue-300 px-3 py-1.5 font-mono">1</td>
                    <td className="border border-blue-300 px-3 py-1.5 font-mono">7</td>
                    <td className="border border-blue-300 px-3 py-1.5 font-mono">2</td>
                    <td className="border border-blue-300 px-3 py-1.5 font-mono">9</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-blue-900">Expansion</span>
              <div className="font-mono mt-1">1 × 1000 + 7 × 100 + 2 × 10 + 9 × 1</div>
            </div>
          </div>
        </div>

        <p className="pt-2">One can extend this idea to numbers upto lakhs and crores as shown in the following table:</p>
        
        {/* Large Table */}
        <div className="overflow-x-auto rounded-[12px] border-2 border-sky-300 shadow-sm my-4">
          <table className="w-full border-collapse text-center text-xs">
            <thead>
              <tr className="bg-sky-100 border-b-2 border-sky-300">
                <th className="border border-sky-300 px-2 py-2 font-bold text-sky-900" rowSpan={2}>Places</th>
                <th className="border border-sky-300 px-2 py-2 font-bold text-sky-900" colSpan={2}>Crores</th>
                <th className="border border-sky-300 px-2 py-2 font-bold text-sky-900" colSpan={2}>Lakhs</th>
                <th className="border border-sky-300 px-2 py-2 font-bold text-sky-900" colSpan={2}>Thousands</th>
                <th className="border border-sky-300 px-2 py-2 font-bold text-sky-900" rowSpan={2}>Hundreds<br/><span className="font-normal">(H)</span></th>
                <th className="border border-sky-300 px-2 py-2 font-bold text-sky-900" rowSpan={2}>Tens<br/><span className="font-normal">(T)</span></th>
                <th className="border border-sky-300 px-2 py-2 font-bold text-sky-900" rowSpan={2}>Ones<br/><span className="font-normal">(O)</span></th>
              </tr>
              <tr className="bg-sky-50">
                <th className="border border-sky-300 px-2 py-1 font-medium text-sky-800">Ten Crores<br/>(T. Cr)</th>
                <th className="border border-sky-300 px-2 py-1 font-medium text-sky-800">Crores<br/>(Cr)</th>
                <th className="border border-sky-300 px-2 py-1 font-medium text-sky-800">Ten<br/>Lakhs<br/>(T. La)</th>
                <th className="border border-sky-300 px-2 py-1 font-medium text-sky-800">Lakhs<br/>(La)</th>
                <th className="border border-sky-300 px-2 py-1 font-medium text-sky-800">Ten<br/>Thousands<br/>(T.Th.)</th>
                <th className="border border-sky-300 px-2 py-1 font-medium text-sky-800">Thousands<br/>(Th.)</th>
              </tr>
            </thead>
            <tbody className="bg-white font-mono text-[11px]">
              <tr>
                <td className="border border-sky-200 px-2 py-2 font-sans font-semibold text-sky-900 bg-sky-50/50">Number</td>
                <td className="border border-sky-200 px-2 py-2">10,00,00,000</td>
                <td className="border border-sky-200 px-2 py-2">1,00,00,000</td>
                <td className="border border-sky-200 px-2 py-2">10,00,000</td>
                <td className="border border-sky-200 px-2 py-2">1,00,000</td>
                <td className="border border-sky-200 px-2 py-2">10,000</td>
                <td className="border border-sky-200 px-2 py-2">1,000</td>
                <td className="border border-sky-200 px-2 py-2">100</td>
                <td className="border border-sky-200 px-2 py-2">10</td>
                <td className="border border-sky-200 px-2 py-2">1</td>
              </tr>
              <tr className="bg-sky-50/30">
                <td className="border border-sky-200 px-2 py-2 font-sans font-semibold text-sky-900 bg-sky-50/50">No. of<br/>Digits</td>
                <td className="border border-sky-200 px-2 py-2">9</td>
                <td className="border border-sky-200 px-2 py-2">8</td>
                <td className="border border-sky-200 px-2 py-2">7</td>
                <td className="border border-sky-200 px-2 py-2">6</td>
                <td className="border border-sky-200 px-2 py-2">5</td>
                <td className="border border-sky-200 px-2 py-2">4</td>
                <td className="border border-sky-200 px-2 py-2">3</td>
                <td className="border border-sky-200 px-2 py-2">2</td>
                <td className="border border-sky-200 px-2 py-2">1</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Conversions */}
        <div className="flex flex-col sm:flex-row justify-around gap-6 bg-teal-50 rounded-xl p-5 border border-teal-100 font-mono text-sm text-teal-900">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <span>1 crore = 100 lakhs</span>
            <span className="text-center sm:text-right">= 10,000 thousands</span>
          </div>
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <span>1 lakh = 100 thousands</span>
            <span className="text-center sm:text-right">= 1000 hundreds</span>
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
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-green-600 text-xs font-extrabold mr-3">
          8
        </span>
        <span className="tracking-wide flex-1 text-center">Government's Gift for Students' Progress</span>
      </div>
    </div>
  );
}
