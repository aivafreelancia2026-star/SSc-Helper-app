"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

type TableRow = {
  id: string;
  number: string;
  expandedForm: string | string[];
  readAs: string | string[];
  isExample: boolean;
};

const TABLE_DATA: TableRow[] = [
  {
    id: "r1",
    number: "5,00,000",
    expandedForm: "5 × 100000",
    readAs: "Five lakh",
    isExample: true,
  },
  {
    id: "r2",
    number: "4,50,000",
    expandedForm: "4 × 100000 + 5 × 10000",
    readAs: "Four lakh fifty thousand",
    isExample: true,
  },
  {
    id: "r3",
    number: "4,57,000",
    expandedForm: [
      "4 × 100000 + 5 × 10000 + 7 × 1000",
      "4×100000+5×10000+7×1000",
      "(4 × 100000) + (5 × 10000) + (7 × 1000)"
    ],
    readAs: ["Four lakh fifty seven thousand", "Four lakh fifty-seven thousand"],
    isExample: false,
  },
  {
    id: "r4",
    number: "3,05,400",
    expandedForm: [
      "3 × 100000 + 5 × 1000 + 4 × 100",
      "3×100000+5×1000+4×100",
      "(3 × 100000) + (5 × 1000) + (4 × 100)",
      "3 × 100000 + 0 × 10000 + 5 × 1000 + 4 × 100",
      "3×100000+0×10000+5×1000+4×100"
    ],
    readAs: "Three lakh five thousand four hundred",
    isExample: false,
  },
  {
    id: "r5",
    number: "3,09,390",
    expandedForm: [
      "3 × 100000 + 9 × 1000 + 3 × 100 + 9 × 10",
      "3×100000+9×1000+3×100+9×10",
      "(3 × 100000) + (9 × 1000) + (3 × 100) + (9 × 10)",
      "3 × 100000 + 0 × 10000 + 9 × 1000 + 3 × 100 + 9 × 10",
      "3×100000+0×10000+9×1000+3×100+9×10"
    ],
    readAs: ["Three lakh nine thousand three hundred ninety", "Three lakh nine thousand three hundred and ninety"],
    isExample: false,
  },
  {
    id: "r6",
    number: "2,00,035",
    expandedForm: [
      "2 × 100000 + 3 × 10 + 5 × 1",
      "2×100000+3×10+5×1",
      "(2 × 100000) + (3 × 10) + (5 × 1)",
      "2 × 100000 + 0 × 10000 + 0 × 1000 + 0 × 100 + 3 × 10 + 5 × 1",
      "2×100000+0×10000+0×1000+0×100+3×10+5×1"
    ],
    readAs: ["Two lakh thirty five", "Two lakh thirty-five", "Two lakh and thirty five"],
    isExample: false,
  },
];

const PATTERN_DATA = [
  { id: "p1", eq: "9 + 1 = 10", input: false },
  { id: "p2", eq: "99 + 1 = 100", input: false },
  { id: "p3", eq: "999 + 1 = 1000", input: false },
  { id: "p4", eq: "9999 + 1 =", answer: ["10000", "10,000"], input: true },
  { id: "p5", eq: "99999 + 1 =", answer: ["100000", "1,00,000", "100,000"], input: true },
  { id: "p6", eq: "999999 + 1 =", answer: ["1000000", "10,00,000", "1,000,000"], input: true },
  { id: "p7", eq: "9999999 + 1 = 1,00,00,000", input: false },
];

export function C6MathsCh1Page7() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch1-page7";

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
    TABLE_DATA.filter((r) => !r.isExample).forEach((r) => {
      allIds.push(`${r.id}_exp`, `${r.id}_read`);
    });
    PATTERN_DATA.filter((p) => p.input).forEach((p) => {
      allIds.push(p.id);
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
      TABLE_DATA.filter((r) => !r.isExample).forEach((r) => {
        allIds.push(`${r.id}_exp`, `${r.id}_read`);
      });
      PATTERN_DATA.filter((p) => p.input).forEach((p) => {
        allIds.push(p.id);
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
    const typed = (answers[id] ?? "").trim().toLowerCase().replace(/\s+/g, "");
    if (!typed) return;
    const prev = graded[id];
    if (prev && prev.value === typed) return;

    const correctArray = Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers];
    const correct = correctArray.some(
      (a) => a.trim().toLowerCase().replace(/\s+/g, "") === typed
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
    const typed = (answers[id] ?? "").trim().toLowerCase().replace(/\s+/g, "");
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
    const typed = (answers[id] ?? "").trim().toLowerCase().replace(/\s+/g, "");
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
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {feedback !== null && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      <p className="text-foreground/80 font-medium">Read and expand the numbers as shown below.</p>

      {/* ── Table ────────────────────────────── */}
      <div className="overflow-x-auto rounded-[12px] border border-teal-200 shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="border border-teal-700 px-4 py-2.5 font-semibold">Number</th>
              <th className="border border-teal-700 px-4 py-2.5 font-semibold">Expanded form</th>
              <th className="border border-teal-700 px-4 py-2.5 font-semibold">Read as</th>
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA.map((row, idx) => {
              const bgClass = idx % 2 === 0 ? "bg-teal-50/30" : "bg-white";
              const expId = `${row.id}_exp`;
              const readId = `${row.id}_read`;

              return (
                <tr key={row.id} className={bgClass}>
                  <td className="border border-teal-100 px-4 py-3 font-semibold text-teal-900 tabular-nums">
                    {row.number}
                  </td>
                  <td className="border border-teal-100 px-3 py-2">
                    {row.isExample ? (
                      <span className="font-mono text-xs">{row.expandedForm}</span>
                    ) : (
                      <div className="relative w-full min-w-[200px]">
                        <input
                          type="text"
                          value={
                            isRevealed
                              ? (Array.isArray(row.expandedForm) ? row.expandedForm[0] : row.expandedForm)
                              : (answers[expId] ?? "")
                          }
                          disabled={isRevealed}
                          onChange={(e) => handleChange(expId, e.target.value)}
                          onBlur={() => handleBlur(expId, row.expandedForm)}
                          placeholder="Expanded form..."
                          className={`w-full rounded-[6px] border bg-white px-3 py-1.5 text-xs font-mono focus:outline-none transition-all shadow-sm ${inputClass(
                            expId
                          )}`}
                        />
                        {badge(expId)}
                      </div>
                    )}
                  </td>
                  <td className="border border-teal-100 px-3 py-2">
                    {row.isExample ? (
                      <span>{row.readAs}</span>
                    ) : (
                      <div className="relative w-full min-w-[200px]">
                        <input
                          type="text"
                          value={
                            isRevealed
                              ? (Array.isArray(row.readAs) ? row.readAs[0] : row.readAs)
                              : (answers[readId] ?? "")
                          }
                          disabled={isRevealed}
                          onChange={(e) => handleChange(readId, e.target.value)}
                          onBlur={() => handleBlur(readId, row.readAs)}
                          placeholder="Read as..."
                          className={`w-full rounded-[6px] border bg-white px-3 py-1.5 text-sm focus:outline-none transition-all shadow-sm ${inputClass(
                            readId
                          )}`}
                        />
                        {badge(readId)}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Questions ─────────────────────────── */}
      <ul className="list-disc pl-5 space-y-2">
        <li>Write a few more 6-digit numbers and ask your friend to read and expand them.</li>
        <li>What number would you get if all digits are 9s in a 6-digit number?</li>
        <li>Can you call it the greatest 6-digit number? Why?</li>
        <li>
          Now if we add 1 to this number, what would we get?
          <div className="font-mono text-indigo-700 font-bold ml-4 mt-1">
            9,99,999 + 1 = 10,00,000
          </div>
        </li>
      </ul>

      <p className="font-medium text-foreground/90">It is called <strong>ten lakh</strong>.</p>
      <p>Is it the smallest 7-digit number?</p>

      {/* ── Pattern ───────────────────────────── */}
      <div className="rounded-[16px] border border-blue-200 bg-blue-50/40 p-5 shadow-sm mt-6">
        <p className="font-semibold text-blue-900 mb-4">Now observe the following pattern and complete it.</p>
        <div className="space-y-3 font-mono text-sm pl-4">
          {PATTERN_DATA.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <span className="w-32 text-right">{item.eq}</span>
              {item.input ? (
                <div className="relative w-[140px]">
                  <input
                    type="text"
                    value={
                      isRevealed
                        ? (Array.isArray(item.answer) ? item.answer[0] : item.answer!)
                        : (answers[item.id] ?? "")
                    }
                    disabled={isRevealed}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    onBlur={() => handleBlur(item.id, item.answer!)}
                    placeholder="Value..."
                    className={`w-full rounded-[6px] border bg-white px-2 py-1 focus:outline-none transition-all shadow-sm ${inputClass(
                      item.id
                    )}`}
                  />
                  {badge(item.id)}
                </div>
              ) : (
                <span className="font-bold">{item.id !== "p7" && item.id !== "p1" && item.id !== "p2" && item.id !== "p3" ? "" : ""}</span> // Handled in eq
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <p>
          Add one to the greatest 7-digit number. You get the smallest 8-digit number which is called <strong>one crore</strong>.
        </p>
        <p>How will you get the greatest 8 digit number?</p>
        <p>
          We come across large numbers in many different situations. For example, area of our country is 32, 87, 263 square km., population of our state is 8,46,65,533. Similarly cost of school building, agricultural production, distance between the planets, multiplication of 3 digit numbers with 3 or more digit numbers, we obtain large numbers.
        </p>
        <p className="font-semibold text-indigo-900 bg-indigo-50 p-4 rounded-[12px] border border-indigo-100">
          By learning these large numbers, do you think Uma can understand the numbers taught by her teacher in the classroom?
        </p>
      </div>

      {/* ── Footer banner ────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 text-sm font-bold text-white mt-8"
        style={{
          background: "linear-gradient(90deg, #16a34a 0%, #22c55e 100%)",
        }}
      >
        <span className="tracking-wide flex-1">KNOWING OUR NUMBERS</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-green-600 text-xs font-extrabold ml-3">
          7
        </span>
      </div>
    </div>
  );
}
