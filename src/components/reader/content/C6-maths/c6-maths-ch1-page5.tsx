"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ── Place Value Table helper ────────────────────────────── */
function PlaceTable({
  headers,
  digits,
}: {
  headers: string[];
  digits: (number | string)[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-center text-xs">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="border border-indigo-300 bg-indigo-600 px-3 py-1.5 font-semibold text-white whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {digits.map((d, i) => (
              <td
                key={i}
                className="border border-indigo-200 bg-indigo-50 px-4 py-2 font-extrabold text-indigo-800 text-base tabular-nums"
              >
                {d}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ── Expansion steps ─────────────────────────────────────── */
function ExpansionBox({
  steps,
}: {
  steps: { label?: string; value: string }[];
}) {
  return (
    <div className="ml-4 space-y-0.5">
      {steps.map((s, i) => (
        <div key={i} className="flex items-start gap-2 text-xs">
          <span className="w-3 shrink-0 font-semibold text-foreground/40">
            {i === 0 ? "=" : "="}
          </span>
          <span className="font-mono text-foreground/80">{s.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Examples data ───────────────────────────────────────── */
const EXAMPLES = [
  {
    num: 64,
    headers: ["Tens", "Ones"],
    digits: [6, 4],
    steps: [
      { value: "(6 × 10) + (4 × 1)" },
      { value: "60 + 4" },
    ],
    expanded: "60 + 4",
  },
  {
    num: 325,
    headers: ["Hundreds", "Tens", "Ones"],
    digits: [3, 2, 5],
    steps: [
      { value: "(3 × 100) + (2 × 10) + (5 × 1)" },
      { value: "300 + 20 + 5" },
    ],
    expanded: "300 + 20 + 5",
  },
  {
    num: 5078,
    headers: ["Thousands", "Hundreds", "Tens", "Ones"],
    digits: [5, 0, 7, 8],
    steps: [
      { value: "(5 × 1000) + (0 × 100) + (7 × 10) + (8 × 1)" },
      { value: "5000 + 0 + 70 + 8" },
      { value: "5000 + 70 + 8" },
    ],
    expanded: "5000 + 70 + 8",
  },
  {
    num: 29500,
    headers: ["Ten Thousands", "Thousands", "Hundreds", "Tens", "Ones"],
    digits: [2, 9, 5, 0, 0],
    steps: [
      { value: "(2 × 10000) + (9 × 1000) + (5 × 100) + (0 × 10) + (0 × 1)" },
      { value: "20000 + 9000 + 500 + 0 + 0" },
      { value: "20000 + 9000 + 500" },
    ],
    expanded: "20000 + 9000 + 500",
  },
];

/* ── Do This: numbers to expand ─────────────────────────── */
type DoThisRow = {
  id: string;
  num: string;
  expansion: string;
  expandedForm: string;
};

const DO_THIS_ROWS: DoThisRow[] = [
  {
    id: "dt-21504",
    num: "21504",
    expansion: "(2 × 10000) + (1 × 1000) + (5 × 100) + (0 × 10) + (4 × 1)",
    expandedForm: "20000 + 1000 + 500 + 4",
  },
  {
    id: "dt-36100",
    num: "36100",
    expansion: "(3 × 10000) + (6 × 1000) + (1 × 100) + (0 × 10) + (0 × 1)",
    expandedForm: "30000 + 6000 + 100",
  },
  {
    id: "dt-77938",
    num: "77938",
    expansion: "(7 × 10000) + (7 × 1000) + (9 × 100) + (3 × 10) + (8 × 1)",
    expandedForm: "70000 + 7000 + 900 + 30 + 8",
  },
  {
    id: "dt-70050",
    num: "70050",
    expansion: "(7 × 10000) + (0 × 1000) + (0 × 100) + (5 × 10) + (0 × 1)",
    expandedForm: "70000 + 50",
  },
  {
    id: "dt-43381",
    num: "43381",
    expansion: "(4 × 10000) + (3 × 1000) + (3 × 100) + (8 × 10) + (1 × 1)",
    expandedForm: "40000 + 3000 + 300 + 80 + 1",
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function C6MathsCh1Page5() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch1-page5";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);
  const [openExample, setOpenExample] = useState<number | null>(null);

  /* ── Persistence ─────────────────────────────────────── */
  useEffect(() => {
    const saved: Record<string, string> = {};
    const savedG: Record<string, { value: string; correct: boolean }> = {};
    const allIds = DO_THIS_ROWS.flatMap((r) => [
      `${r.id}-expansion`,
      `${r.id}-expanded`,
    ]);
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
      const allIds = DO_THIS_ROWS.flatMap((r) => [
        `${r.id}-expansion`,
        `${r.id}-expanded`,
      ]);
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
    const typed = (answers[id] ?? "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "");
    if (!typed) return;
    const prev = graded[id];
    if (prev && prev.value === typed) return;
    const correct = correctAnswers.some(
      (a) => a.trim().toLowerCase().replace(/\s+/g, "") === typed
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

  /* ── Render ──────────────────────────────────────────── */
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {feedback !== null && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* ── Think, Discuss & Write ───────────────────── */}
      <div
        className="flex items-start gap-3 rounded-[16px] border border-teal-300 p-4 shadow-sm"
        style={{
          background: "linear-gradient(135deg, #0f766e10 0%, #14b8a620 100%)",
        }}
      >
        <div className="shrink-0 text-2xl">🤔</div>
        <div className="space-y-1">
          <h3 className="font-heading text-sm font-bold text-teal-700">
            Think, Discuss and Write
          </h3>
          <p className="text-xs text-foreground/80">
            Discuss with your friends about rounding off numbers for the{" "}
            <strong>ten thousands place</strong>.
          </p>
        </div>
      </div>

      {/* ── 1.4 Revision of Place Value ──────────────── */}
      <div className="space-y-1">
        <h2 className="font-heading text-base font-bold text-primary">
          1.4 Revision of Place Value
        </h2>
        <div className="h-0.5 w-12 rounded-full bg-primary/40" />
      </div>

      <p>
        You have already learnt how to expand a number using place value. Recall
        how you expand a two digit, three digit, and five digit number:
      </p>

      {/* ── Worked Examples ──────────────────────────── */}
      <div className="space-y-3">
        {EXAMPLES.map((ex, idx) => (
          <div
            key={ex.num}
            className="rounded-[16px] border border-indigo-200 overflow-hidden shadow-sm"
          >
            {/* header — click to expand */}
            <button
              onClick={() =>
                setOpenExample(openExample === idx ? null : idx)
              }
              className="w-full flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 transition-colors"
            >
              <span className="font-heading text-sm font-bold text-indigo-800">
                {idx + 1}. Expand{" "}
                <span className="tabular-nums text-indigo-600">{ex.num}</span>
              </span>
              <span
                className="text-indigo-400 text-xs transition-transform duration-200"
                style={{
                  transform:
                    openExample === idx
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                }}
              >
                ▼
              </span>
            </button>

            {/* content */}
            <div
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: openExample === idx ? "400px" : "0px",
              }}
            >
              <div className="space-y-3 p-4 bg-white/60">
                <PlaceTable headers={ex.headers} digits={ex.digits} />
                <ExpansionBox steps={ex.steps} />
                <div className="inline-flex items-center gap-2 rounded-lg bg-indigo-100 px-3 py-1.5">
                  <span className="text-xs font-semibold text-indigo-600">
                    Expanded form:
                  </span>
                  <span className="font-mono text-xs font-bold text-indigo-800">
                    {ex.expanded}
                  </span>
                </div>
              </div>
            </div>

            {/* collapsed peek */}
            {openExample !== idx && (
              <div className="px-4 py-1.5 bg-white/40 text-xs text-indigo-500 font-medium">
                Tap to see expansion ↓
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Do This ──────────────────────────────────── */}
      <div className="rounded-[16px] border-2 border-sky-300 overflow-hidden shadow-sm">
        <div
          className="flex items-center gap-2 px-4 py-2"
          style={{
            background: "linear-gradient(90deg, #0ea5e9 0%, #6366f1 100%)",
          }}
        >
          <span className="text-white text-base">📝</span>
          <span className="font-heading text-sm font-bold tracking-wide text-white">
            Do This
          </span>
        </div>

        <div className="bg-sky-50/40 p-4 space-y-3">
          <p className="text-xs font-medium text-foreground/70">
            Now expand the numbers in the table as given in the example:
          </p>

          {/* table header */}
          <div className="rounded-[12px] border border-sky-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider">
              <div className="px-3 py-2 border-r border-white/20">Number</div>
              <div className="px-3 py-2 border-r border-white/20">Expansion</div>
              <div className="px-3 py-2">Expanded Form</div>
            </div>

            {DO_THIS_ROWS.map((row, idx) => {
              const expId = `${row.id}-expansion`;
              const expFormId = `${row.id}-expanded`;
              const isFirst = idx === 0;

              return (
                <div
                  key={row.id}
                  className={`grid grid-cols-3 border-t border-sky-100 text-xs ${
                    idx % 2 === 0 ? "bg-white/60" : "bg-sky-50/30"
                  }`}
                >
                  {/* number */}
                  <div className="flex items-center px-3 py-3 border-r border-sky-100">
                    <span className="font-extrabold tabular-nums text-sky-800 text-sm">
                      {row.num}
                    </span>
                  </div>

                  {/* expansion */}
                  <div className="flex items-center px-2 py-2 border-r border-sky-100">
                    {isFirst ? (
                      <span className="font-mono text-[9px] text-foreground/70 leading-relaxed">
                        {row.expansion}
                      </span>
                    ) : (
                      <div className="relative w-full">
                        <input
                          type="text"
                          value={
                            isRevealed
                              ? row.expansion
                              : (answers[expId] ?? "")
                          }
                          disabled={isRevealed}
                          onChange={(e) =>
                            handleChange(expId, e.target.value)
                          }
                          onBlur={() =>
                            handleBlur(expId, [
                              row.expansion,
                              row.expansion.replace(/\s/g, ""),
                            ])
                          }
                          placeholder="Write expansion…"
                          className={`w-full rounded-[6px] border bg-white/80 px-2 py-1 text-[9px] text-foreground focus:outline-none transition-all ${inputClass(expId)}`}
                        />
                        {badge(expId)}
                      </div>
                    )}
                  </div>

                  {/* expanded form */}
                  <div className="flex items-center px-2 py-2">
                    {isFirst ? (
                      <span className="font-mono text-[10px] font-bold text-indigo-700">
                        {row.expandedForm}
                      </span>
                    ) : (
                      <div className="relative w-full">
                        <input
                          type="text"
                          value={
                            isRevealed
                              ? row.expandedForm
                              : (answers[expFormId] ?? "")
                          }
                          disabled={isRevealed}
                          onChange={(e) =>
                            handleChange(expFormId, e.target.value)
                          }
                          onBlur={() =>
                            handleBlur(expFormId, [
                              row.expandedForm,
                              row.expandedForm.replace(/\s/g, ""),
                            ])
                          }
                          placeholder="e.g. 30000+6000+100"
                          className={`w-full rounded-[6px] border bg-white/80 px-2 py-1 text-[10px] text-foreground focus:outline-none transition-all ${inputClass(expFormId)}`}
                        />
                        {badge(expFormId)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Footer banner ────────────────────────────── */}
      <div
        className="flex items-center justify-between rounded-[12px] px-4 py-2 text-sm font-bold text-white shadow"
        style={{
          background:
            "linear-gradient(90deg, #059669 0%, #10b981 50%, #34d399 100%)",
        }}
      >
        <span className="tracking-wide">KNOWING OUR NUMBERS</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 text-xs font-extrabold">
          5
        </span>
      </div>
    </div>
  );
}
