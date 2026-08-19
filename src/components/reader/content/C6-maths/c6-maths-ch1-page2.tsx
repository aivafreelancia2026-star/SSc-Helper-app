"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ── TABLE: Identify greatest & smallest ──────────────── */
const TABLE_COLUMNS = ["S.No.", "Numbers", "The greatest number", "The smallest number"];

const TABLE_ROWS: TableCell[][] = [
  [
    { value: "1" },
    { value: "1845, 605, 34, 13641" },
    { value: "13641", editable: false },
    { value: "34", editable: false },
  ],
  [
    { value: "2" },
    { value: "856, 4109, 58181, 25" },
    { value: "", editable: true, correctAnswers: ["58181"] },
    { value: "", editable: true, correctAnswers: ["25"] },
  ],
  [
    { value: "3" },
    { value: "645, 958, 172, 18" },
    { value: "", editable: true, correctAnswers: ["958"] },
    { value: "", editable: true, correctAnswers: ["18"] },
  ],
  [
    { value: "4" },
    { value: "81, 704, 1465, 3859" },
    { value: "", editable: true, correctAnswers: ["3859"] },
    { value: "", editable: true, correctAnswers: ["81"] },
  ],
];

/* ── EXERCISE 1.1 data ────────────────────────────────── */
type ExerciseQ1 = {
  id: string;
  label: string;
  numbers: string;
  greatest: string;
  smallest: string;
};

const EX_Q1: ExerciseQ1[] = [
  { id: "q1a", label: "i", numbers: "13452, 13912, 13276, 13224", greatest: "13912", smallest: "13224" },
  { id: "q1b", label: "ii", numbers: "25073, 25329, 25806, 25612", greatest: "25806", smallest: "25073" },
  { id: "q1c", label: "iii", numbers: "44617, 34499, 68176, 84862", greatest: "84862", smallest: "34499" },
  { id: "q1d", label: "iv", numbers: "75671, 73615, 75661, 75610", greatest: "75671", smallest: "73615" },
  { id: "q1e", label: "v", numbers: "34895, 34891, 34899, 34893", greatest: "34899", smallest: "34891" },
];

type ExerciseQ2 = {
  id: string;
  label: string;
  numbers: string;
  ascending: string;
};

const EX_Q2: ExerciseQ2[] = [
  { id: "q2a", label: "i", numbers: "375, 1475, 13451, 4733", ascending: "375, 1475, 4733, 13451" },
  { id: "q2b", label: "ii", numbers: "9643, 19035, 27578, 12900", ascending: "9643, 12900, 19035, 27578" },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function C6MathsCh1Page2() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";

  const storageKey = "c6-maths-ch1-page2";

  /* ── Exercise state ─────────────────────────────────── */
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  /* ── Persistence ────────────────────────────────────── */
  useEffect(() => {
    const saved: Record<string, string> = {};
    const savedG: Record<string, { value: string; correct: boolean }> = {};
    const allIds = [
      ...EX_Q1.flatMap((q) => [`${q.id}-greatest`, `${q.id}-smallest`]),
      ...EX_Q2.map((q) => `${q.id}-ascending`),
    ];
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
      const allIds = [
        ...EX_Q1.flatMap((q) => [`${q.id}-greatest`, `${q.id}-smallest`]),
        ...EX_Q2.map((q) => `${q.id}-ascending`),
      ];
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

  const handleBlur = (id: string, correctAnswers: string[]) => {
    if (isRevealed) return;
    const typed = (answers[id] ?? "").trim().toLowerCase().replace(/\s+/g, "");
    if (!typed) return;
    const prev = graded[id];
    if (prev && prev.value === typed) return;
    const correct = correctAnswers.some(
      (a) => a.toLowerCase().replace(/\s+/g, "") === typed
    );
    addPoints(correct ? 1 : -1);
    setFeedback({ correct, id: Date.now() });
    const next = { ...graded, [id]: { value: typed, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${id}-graded`,
      JSON.stringify({ value: typed, correct })
    );
  };

  function inputClass(id: string): string {
    const typed = answers[id] ?? "";
    const g = graded[id];
    const isCorrect =
      g && g.value === typed.trim().toLowerCase().replace(/\s+/g, "")
        ? g.correct
        : null;
    if (isRevealed) return "border-primary bg-primary/5";
    if (isCorrect === true)
      return "border-green-500 bg-green-50 text-green-700";
    if (isCorrect === false)
      return "border-destructive bg-destructive/5 text-destructive";
    return "border-border/60 focus:border-primary";
  }

  function badge(id: string) {
    const typed = answers[id] ?? "";
    const g = graded[id];
    const isCorrect =
      g && g.value === typed.trim().toLowerCase().replace(/\s+/g, "")
        ? g.correct
        : null;
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

  /* ── Render ─────────────────────────────────────────── */
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {feedback !== null && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* ── Intro text ─────────────────────────────────── */}
      <p>
        We have discussed numbers and the number system in earlier classes. We use
        numbers in many ways. We compare them, arrange them in increasing and
        decreasing orders, add and subtract them.
      </p>

      <div className="rounded-[14px] border border-sky-200 bg-sky-50/60 p-4 space-y-2">
        <p className="font-semibold text-sky-800 text-xs">
          💡 Can you give any five situations where we use numbers in the world?
        </p>
        <p className="text-xs text-foreground/70 italic">
          For example: a television costs ₹12,500.
        </p>
      </div>

      <p>
        Let us revise the numbers learnt in previous classes to understand and
        enjoy about larger numbers.
      </p>

      {/* ── Section 1.2 ────────────────────────────────── */}
      <div className="space-y-1">
        <h2 className="font-heading text-base font-bold text-primary">
          1.2 Estimating and Comparing Numbers
        </h2>
        <div className="h-0.5 w-12 rounded-full bg-primary/40" />
      </div>

      <p className="font-semibold text-primary/90">
        Identify the greatest and the smallest among the following numbers.
      </p>

      {/* ── Fill-in table ──────────────────────────────── */}
      <FillInTable
        title="Greatest & Smallest Numbers"
        columns={TABLE_COLUMNS}
        rows={TABLE_ROWS}
        storageKey="c6-maths-ch1-p2-table1"
      />

      {/* ── Explanation paragraphs ─────────────────────── */}
      <div className="space-y-3">
        <p>
          We can identify them easily by simply counting the digits in the
          numbers. Generally, the numbers having more digits are greater than
          numbers having fewer digits.
        </p>

        {/* Example 1 — comparing 51842 and 41964 */}
        <div className="rounded-[14px] border border-indigo-200 bg-indigo-50/50 p-4 space-y-2">
          <p className="text-xs font-medium text-indigo-800">
            <strong>Example:</strong> Now you find which is greater —{" "}
            <span className="font-bold">51842</span> and{" "}
            <span className="font-bold">41964</span>?
          </p>
          <p className="text-xs text-foreground/80">
            This is not easy as both have the same number of digits. Compare the
            digit in the <strong>ten-thousands</strong> place:{" "}
            <span className="rounded bg-indigo-100 px-1 font-mono font-bold text-indigo-700">
              5
            </span>{" "}
            in 51842 and{" "}
            <span className="rounded bg-indigo-100 px-1 font-mono font-bold text-indigo-700">
              4
            </span>{" "}
            in 41964.
          </p>
          <p className="text-xs font-bold text-indigo-700">
            Since 5 &gt; 4, we get{" "}
            <span className="rounded-md bg-indigo-200/60 px-2 py-0.5">
              51842 &gt; 41964
            </span>
          </p>
        </div>

        {/* Example 2 — comparing 58672 and 57275 */}
        <div className="rounded-[14px] border border-violet-200 bg-violet-50/50 p-4 space-y-2">
          <p className="text-xs font-medium text-violet-800">
            <strong>Example:</strong> Which is greater —{" "}
            <span className="font-bold">58672</span> or{" "}
            <span className="font-bold">57275</span>?
          </p>
          <p className="text-xs text-foreground/80">
            Both numbers contain the same number of digits (5). The
            ten-thousands digit is the same (5). So we compare the{" "}
            <strong>thousands</strong> place:{" "}
            <span className="rounded bg-violet-100 px-1 font-mono font-bold text-violet-700">
              8
            </span>{" "}
            vs{" "}
            <span className="rounded bg-violet-100 px-1 font-mono font-bold text-violet-700">
              7
            </span>
            .
          </p>
          <p className="text-xs font-bold text-violet-700">
            Since 8 &gt; 7, we get{" "}
            <span className="rounded-md bg-violet-200/60 px-2 py-0.5">
              58672 &gt; 57275
            </span>
          </p>
        </div>

        <p>
          If the digits in the thousands place are also the same, what will you
          do? We move to the <strong>hundreds</strong> place to compare, then the{" "}
          <strong>tens</strong> place, and finally the <strong>units</strong>{" "}
          place.
        </p>
      </div>

      {/* ── Exercise 1.1 ──────────────────────────────── */}
      <div
        className="rounded-[16px] border-2 border-emerald-300 overflow-hidden shadow-sm"
      >
        {/* Header */}
        <div
          className="flex items-center justify-center gap-2 py-2"
          style={{
            background:
              "linear-gradient(90deg, #059669 0%, #10b981 50%, #34d399 100%)",
          }}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 text-xs font-extrabold text-white">
            ✏️
          </span>
          <span className="font-heading text-sm font-bold tracking-wide text-white">
            EXERCISE — 1.1
          </span>
        </div>

        <div className="space-y-5 bg-emerald-50/40 p-4">
          {/* Q1 */}
          <div className="space-y-3">
            <p className="font-semibold text-foreground/90">
              1. Which is the greatest and the smallest among the following
              numbers?
            </p>

            {EX_Q1.map((q) => (
              <div
                key={q.id}
                className="rounded-[12px] border border-emerald-200 bg-white/70 p-3 space-y-2"
              >
                <p className="text-xs font-medium text-foreground/70">
                  <span className="mr-1 font-bold text-emerald-600">
                    ({q.label})
                  </span>
                  {q.numbers}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {/* Greatest */}
                  <div className="space-y-0.5">
                    <label className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
                      Greatest
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={isRevealed ? q.greatest : (answers[`${q.id}-greatest`] ?? "")}
                        disabled={isRevealed}
                        onChange={(e) =>
                          handleChange(`${q.id}-greatest`, e.target.value)
                        }
                        onBlur={() =>
                          handleBlur(`${q.id}-greatest`, [q.greatest])
                        }
                        placeholder="…"
                        className={`w-full rounded-[8px] border bg-white/80 px-2 py-1.5 text-xs text-foreground placeholder:text-foreground/30 transition-all focus:outline-none ${inputClass(`${q.id}-greatest`)}`}
                      />
                      {badge(`${q.id}-greatest`)}
                    </div>
                  </div>
                  {/* Smallest */}
                  <div className="space-y-0.5">
                    <label className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
                      Smallest
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={isRevealed ? q.smallest : (answers[`${q.id}-smallest`] ?? "")}
                        disabled={isRevealed}
                        onChange={(e) =>
                          handleChange(`${q.id}-smallest`, e.target.value)
                        }
                        onBlur={() =>
                          handleBlur(`${q.id}-smallest`, [q.smallest])
                        }
                        placeholder="…"
                        className={`w-full rounded-[8px] border bg-white/80 px-2 py-1.5 text-xs text-foreground placeholder:text-foreground/30 transition-all focus:outline-none ${inputClass(`${q.id}-smallest`)}`}
                      />
                      {badge(`${q.id}-smallest`)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Q2 */}
          <div className="space-y-3">
            <p className="font-semibold text-foreground/90">
              2. Write the numbers in ascending (increasing) order:
            </p>

            {EX_Q2.map((q) => (
              <div
                key={q.id}
                className="rounded-[12px] border border-emerald-200 bg-white/70 p-3 space-y-2"
              >
                <p className="text-xs font-medium text-foreground/70">
                  <span className="mr-1 font-bold text-emerald-600">
                    ({q.label})
                  </span>
                  {q.numbers}
                </p>
                <div className="space-y-0.5">
                  <label className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
                    Ascending order
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={isRevealed ? q.ascending : (answers[`${q.id}-ascending`] ?? "")}
                      disabled={isRevealed}
                      onChange={(e) =>
                        handleChange(`${q.id}-ascending`, e.target.value)
                      }
                      onBlur={() =>
                        handleBlur(`${q.id}-ascending`, [
                          q.ascending,
                          q.ascending.replace(/\s/g, ""),
                        ])
                      }
                      placeholder="e.g. 123, 456, 789…"
                      className={`w-full rounded-[8px] border bg-white/80 px-2 py-1.5 text-xs text-foreground placeholder:text-foreground/30 transition-all focus:outline-none ${inputClass(`${q.id}-ascending`)}`}
                    />
                    {badge(`${q.id}-ascending`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom banner ──────────────────────────────── */}
      <div
        className="flex items-center justify-center gap-2 rounded-[12px] px-4 py-2 text-xs font-bold text-white shadow"
        style={{
          background:
            "linear-gradient(90deg, #059669 0%, #10b981 50%, #34d399 100%)",
        }}
      >
        <span>Government&apos;s Gift for Students&apos; Progress</span>
      </div>
    </div>
  );
}
