"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

interface TableRowItem {
  id: string;
  sNo: number;
  number: string;
  num1: string;
  num2: string;
  posCorrect: string;
  posOptions: string[];
  relCorrect: string;
  relOptions: string[];
}

const TABLE_DATA: TableRowItem[] = [
  {
    id: "r1",
    sNo: 1,
    number: "12, 8",
    num1: "12",
    num2: "8",
    posCorrect: "12 lies on the right of 8",
    posOptions: ["12 lies on the right of 8", "12 lies on the left of 8"],
    relCorrect: "12 > 8",
    relOptions: ["12 > 8", "12 < 8", "12 = 8"],
  },
  {
    id: "r2",
    sNo: 2,
    number: "12, 16",
    num1: "12",
    num2: "16",
    posCorrect: "16 lies on the right of 12",
    posOptions: [
      "16 lies on the right of 12",
      "12 lies on the right of 16",
      "16 lies on the left of 12",
    ],
    relCorrect: "12 < 16",
    relOptions: ["12 < 16", "12 > 16", "16 < 12"],
  },
  {
    id: "r3",
    sNo: 3,
    number: "236, 210",
    num1: "236",
    num2: "210",
    posCorrect: "236 lies on the right of 210",
    posOptions: [
      "236 lies on the right of 210",
      "210 lies on the right of 236",
      "236 lies on the left of 210",
    ],
    relCorrect: "236 > 210",
    relOptions: ["236 > 210", "236 < 210", "210 > 236"],
  },
  {
    id: "r4",
    sNo: 4,
    number: "1182, 9521",
    num1: "1182",
    num2: "9521",
    posCorrect: "9521 lies on the right of 1182",
    posOptions: [
      "9521 lies on the right of 1182",
      "1182 lies on the right of 9521",
      "9521 lies on the left of 1182",
    ],
    relCorrect: "1182 < 9521",
    relOptions: ["1182 < 9521", "1182 > 9521", "9521 < 1182"],
  },
  {
    id: "r5",
    sNo: 5,
    number: "10046, 10960",
    num1: "10046",
    num2: "10960",
    posCorrect: "10960 lies on the right of 10046",
    posOptions: [
      "10960 lies on the right of 10046",
      "10046 lies on the right of 10960",
      "10960 lies on the left of 10046",
    ],
    relCorrect: "10046 < 10960",
    relOptions: ["10046 < 10960", "10046 > 10960", "10960 < 10046"],
  },
];

export function C6MathsCh2Page2() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch2-page2";

  // State for interactive answers
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  // Interactive addition number line simulator
  const [simStart, setSimStart] = useState<number>(2);
  const [simAdd, setSimAdd] = useState<number>(3);

  // Keys to persist
  const ALL_INPUT_IDS = [
    "do_this_1",
    "think_1",
    "think_2",
    ...TABLE_DATA.flatMap((r) => [`${r.id}_pos`, `${r.id}_rel`]),
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
    }
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () => window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, []);

  const handleChange = (id: string, v: string) => {
    setAnswers((prev) => ({ ...prev, [id]: v }));
    localStorage.setItem(`${storageKey}-${id}-answer`, v);
  };

  const handleSelectAnswer = (id: string, selected: string, correctAns: string) => {
    if (isRevealed) return;
    handleChange(id, selected);

    const prev = graded[id];
    if (prev && prev.value === selected) return;

    const correct = selected.trim().toLowerCase() === correctAns.trim().toLowerCase();
    let delta = 0;
    if (prev) {
      if (!prev.correct && correct) delta = 2;
      else if (prev.correct && !correct) delta = -2;
    } else {
      delta = correct ? 1 : -1;
    }
    if (delta !== 0) addPoints(delta);

    setFeedback({ correct, id: Date.now() });
    const next = { ...graded, [id]: { value: selected, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${id}-graded`,
      JSON.stringify({ value: selected, correct })
    );
  };

  const handleBlurText = (id: string, correctAnswers: string[]) => {
    if (isRevealed) return;
    const normalize = (s: string) =>
      s.trim().toLowerCase().replace(/[\s.,/#!$%^&*;:{}=\-_`~()]+/g, "");
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
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 font-bold text-xs select-none">
          ✓
        </span>
      );
    if (g?.correct === false)
      return (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-destructive font-bold text-xs select-none">
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

      {/* ── Section 1: DO THIS ─────────────────────────────────── */}
      <div className="rounded-[16px] border-2 border-emerald-500 bg-emerald-50/30 overflow-hidden shadow-sm">
        <div className="bg-emerald-600 px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl text-white">📖</span>
            <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
              Do This
            </h2>
          </div>
          <span className="text-emerald-100 text-xs font-semibold px-2 py-0.5 rounded bg-emerald-700/50">
            {isRevealed ? "Answer Revealed" : "1 Point"}
          </span>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <span className="font-bold text-emerald-800">1.</span>
            <p className="flex-1 font-medium text-foreground/90">
              Which is the smallest whole number?
            </p>
            <div className="relative w-full md:w-48">
              <input
                type="text"
                placeholder={isRevealed ? "0" : "Type answer here..."}
                value={isRevealed ? "0 (Zero)" : answers["do_this_1"] ?? ""}
                disabled={isRevealed}
                onChange={(e) => handleChange("do_this_1", e.target.value)}
                onBlur={() => handleBlurText("do_this_1", ["0", "zero", "0 (zero)", "0 zero"])}
                className={`w-full rounded-lg border bg-white px-3 py-1.5 text-sm font-medium focus:outline-none transition-all ${inputClass("do_this_1")}`}
              />
              {badge("do_this_1")}
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: THINK, DISCUSS AND WRITE ───────────────── */}
      <div className="rounded-[16px] border-2 border-teal-500 bg-teal-50/30 overflow-hidden shadow-sm">
        <div className="bg-teal-600 px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl text-white">💭</span>
            <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
              Think, Discuss and Write
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-teal-100 text-xs font-semibold px-2 py-0.5 rounded bg-teal-700/50">
              {isRevealed ? "Answers Revealed" : "2 Points"}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Question 1 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-teal-100 shadow-xs">
            <div className="flex items-start gap-2.5">
              <span className="font-bold text-teal-800 mt-0.5">1.</span>
              <p className="font-medium text-foreground/90">
                Are all natural numbers whole numbers?
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              {["Yes", "No"].map((opt) => {
                const current = answers["think_1"];
                const isSelected = isRevealed ? opt === "Yes" : current === opt;
                const isCorrect = opt === "Yes";
                return (
                  <button
                    key={opt}
                    disabled={isRevealed}
                    onClick={() => handleSelectAnswer("think_1", opt, "Yes")}
                    className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all border ${
                      isRevealed
                        ? isCorrect
                          ? "bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-sm"
                          : "bg-gray-100 text-gray-400 border-gray-200 opacity-60"
                        : isSelected
                        ? graded["think_1"]?.correct
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-rose-500 text-white border-rose-500 shadow-sm"
                        : "bg-white text-teal-800 border-teal-300 hover:bg-teal-50 cursor-pointer"
                    }`}
                  >
                    {opt} {isRevealed && isCorrect ? "✓" : ""}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-teal-100 shadow-xs">
            <div className="flex items-start gap-2.5">
              <span className="font-bold text-teal-800 mt-0.5">2.</span>
              <p className="font-medium text-foreground/90">
                Are all whole numbers natural numbers?
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              {["Yes", "No"].map((opt) => {
                const current = answers["think_2"];
                const isSelected = isRevealed ? opt === "No" : current === opt;
                const isCorrect = opt === "No";
                return (
                  <button
                    key={opt}
                    disabled={isRevealed}
                    onClick={() => handleSelectAnswer("think_2", opt, "No")}
                    className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all border ${
                      isRevealed
                        ? isCorrect
                          ? "bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-sm"
                          : "bg-gray-100 text-gray-400 border-gray-200 opacity-60"
                        : isSelected
                        ? graded["think_2"]?.correct
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-rose-500 text-white border-rose-500 shadow-sm"
                        : "bg-white text-teal-800 border-teal-300 hover:bg-teal-50 cursor-pointer"
                    }`}
                  >
                    {opt} {isRevealed && isCorrect ? "✓" : ""}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-teal-800/80 bg-teal-100/60 p-3 rounded-lg flex items-start gap-2">
            <span>💡</span>
            <p>
              <strong>Explanation:</strong> Every natural number (1, 2, 3, …) belongs to whole numbers (0, 1, 2, 3, …). However, <strong>0</strong> is a whole number but not a natural number!
            </p>
          </div>
        </div>
      </div>

      {/* ── Section 3: 2.3 REPRESENTATION OF WHOLE NUMBERS ON NUMBER LINE ── */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-teal-700 text-white px-4 py-1.5 rounded-r-full -ml-4 shadow-sm">
          <span className="font-bold">2.3</span>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider">
            Representation of Whole Numbers on Number Line
          </h2>
        </div>

        <div className="space-y-3 text-foreground/90 leading-relaxed">
          <p>
            Draw a line. Mark a point on it. Label it as <strong>&apos;0&apos;</strong>. Mark as many points as you like on the line at equal distance to the right of 0. Label the points as <strong>1, 2, 3, 4, .....</strong> respectively. The distance between any two consecutive points is the <strong>unit distance</strong>. You can go to any whole number on the right.
          </p>
          <p className="font-semibold text-teal-900">The number line for whole numbers is:</p>
        </div>

        {/* ── Visual SVG Number Line (0 to 11+) ── */}
        <div className="bg-teal-50/50 p-4 sm:p-6 rounded-2xl border border-teal-200 shadow-sm">
          <div className="w-full overflow-x-auto pb-2">
            <svg
              viewBox="0 0 650 90"
              className="w-full min-w-[550px] h-auto select-none"
            >
              {/* Main Arrow Line */}
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f766e" />
                </marker>
              </defs>
              <line
                x1="20"
                y1="45"
                x2="630"
                y2="45"
                stroke="#0f766e"
                strokeWidth="2.5"
                markerEnd="url(#arrow)"
              />

              {/* Ticks and Numbers 0 to 10 */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, i) => {
                const x = 40 + i * 50;
                return (
                  <g key={num}>
                    <line
                      x1={x}
                      y1="33"
                      x2={x}
                      y2="57"
                      stroke="#0f766e"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx={x} cy="45" r="3.5" fill="#0f766e" />
                    <text
                      x={x}
                      y="78"
                      textAnchor="middle"
                      className="font-mono font-bold fill-teal-950 text-sm"
                    >
                      {num}
                    </text>
                  </g>
                );
              })}

              {/* Trailing ticks and dots */}
              <line x1="590" y1="37" x2="590" y2="53" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" />
              <line x1="610" y1="37" x2="610" y2="53" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <p className="mt-3 text-xs text-teal-800 text-center font-medium">
            ↔ Consecutive points are separated by exactly 1 unit distance.
          </p>
        </div>

        <div className="space-y-3 text-foreground/90">
          <p>
            On the number line given above you know that the successor of any number will lie to the <strong>right</strong> of that number. For example, the successor of 3 is 4. 4 is greater than 3 and lies on the right side of number 3.
          </p>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 font-medium">
            Now can we say that <em>all the numbers that lie on the right of that number are greater than the number?</em>
          </div>
        </div>
      </div>

      {/* ── Section 4: Discuss with your friends and fill the table ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-teal-950">
            Discuss with your friends and fill the table:
          </p>
          {isRevealed && (
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
              Showing All Answers (Reveal Mode)
            </span>
          )}
        </div>

        <div className="overflow-x-auto rounded-[14px] border border-teal-300 shadow-sm bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-teal-700 text-white">
                <th className="border border-teal-600 px-3.5 py-2.5 font-semibold text-center w-14">
                  S.No.
                </th>
                <th className="border border-teal-600 px-4 py-2.5 font-semibold w-36">
                  Number
                </th>
                <th className="border border-teal-600 px-4 py-2.5 font-semibold">
                  Position on number line
                </th>
                <th className="border border-teal-600 px-4 py-2.5 font-semibold w-48 text-center">
                  Relation between numbers
                </th>
              </tr>
            </thead>
            <tbody>
              {TABLE_DATA.map((row, idx) => {
                const posId = `${row.id}_pos`;
                const relId = `${row.id}_rel`;
                const isEven = idx % 2 === 0;
                const isFirst = idx === 0;

                const posVal = isRevealed ? row.posCorrect : answers[posId] ?? "";
                const relVal = isRevealed ? row.relCorrect : answers[relId] ?? "";

                const posGraded = graded[posId];
                const relGraded = graded[relId];

                return (
                  <tr
                    key={row.id}
                    className={isEven ? "bg-teal-50/30" : "bg-white"}
                  >
                    {/* S.No */}
                    <td className="border border-teal-100 px-3 py-3 text-center font-bold text-teal-800">
                      {row.sNo}.
                    </td>

                    {/* Number Pair */}
                    <td className="border border-teal-100 px-4 py-3 font-mono font-bold text-base text-teal-950">
                      {row.number}
                    </td>

                    {/* Position on Number Line */}
                    <td className="border border-teal-100 px-3 py-2">
                      {isFirst ? (
                        <div className="font-medium text-foreground/80 px-2 py-1 bg-teal-100/50 rounded-md border border-teal-200">
                          {row.posCorrect}
                        </div>
                      ) : (
                        <div className="relative">
                          <select
                            aria-label={`Position on number line for ${row.number}`}
                            value={posVal}
                            disabled={isRevealed}
                            onChange={(e) =>
                              handleSelectAnswer(posId, e.target.value, row.posCorrect)
                            }
                            className={`w-full rounded-lg border bg-white px-3 py-1.5 text-xs sm:text-sm font-medium focus:outline-none transition-all ${
                              isRevealed
                                ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold"
                                : posGraded?.correct === true
                                ? "border-green-500 bg-green-50 text-green-800 font-bold"
                                : posGraded?.correct === false
                                ? "border-rose-400 bg-rose-50 text-rose-800"
                                : "border-teal-200 focus:border-teal-500"
                            }`}
                          >
                            <option value="">-- Select position --</option>
                            {row.posOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </td>

                    {/* Relation between Numbers */}
                    <td className="border border-teal-100 px-3 py-2 text-center">
                      {isFirst ? (
                        <span className="inline-block px-3 py-1 rounded bg-teal-100/60 font-mono font-extrabold text-teal-900 border border-teal-200 text-sm">
                          {row.relCorrect}
                        </span>
                      ) : (
                        <div className="relative flex justify-center">
                          <select
                            aria-label={`Relation between numbers for ${row.number}`}
                            value={relVal}
                            disabled={isRevealed}
                            onChange={(e) =>
                              handleSelectAnswer(relId, e.target.value, row.relCorrect)
                            }
                            className={`w-32 rounded-lg border bg-white px-2.5 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${
                              isRevealed
                                ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold"
                                : relGraded?.correct === true
                                ? "border-green-500 bg-green-50 text-green-800 font-bold"
                                : relGraded?.correct === false
                                ? "border-rose-400 bg-rose-50 text-rose-800"
                                : "border-teal-200 focus:border-teal-500"
                            }`}
                          >
                            <option value="">-- Choose --</option>
                            {row.relOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section 5: Addition on number line ──────────────────── */}
      <div className="space-y-5">
        <div className="inline-flex items-center gap-2 bg-teal-700 text-white px-4 py-1.5 rounded-r-full -ml-4 shadow-sm">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider">
            Addition on Number Line
          </h2>
        </div>

        <p className="text-foreground/90">
          Addition of whole numbers can be represented on number line. In the line given below; the addition of <strong>2 and 3</strong> is shown as below:
        </p>

        {/* ── Interactive Addition Number Line Visualizer ── */}
        <div className="bg-gradient-to-b from-teal-50/60 to-teal-50/20 p-5 rounded-2xl border border-teal-200 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-teal-100 pb-3">
            <span className="font-heading font-bold text-teal-900 text-sm">
              Interactive Jump Visualizer:
            </span>
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-teal-800">Start from:</label>
              <select
                aria-label="Start number for addition simulation"
                value={simStart}
                onChange={(e) => setSimStart(Number(e.target.value))}
                className="rounded border border-teal-300 bg-white px-2 py-0.5 font-mono text-xs font-bold"
              >
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <span className="text-xs font-bold text-teal-700">+</span>

              <label className="text-xs font-semibold text-teal-800">Add:</label>
              <select
                aria-label="Add amount for addition simulation"
                value={simAdd}
                onChange={(e) => setSimAdd(Number(e.target.value))}
                className="rounded border border-teal-300 bg-white px-2 py-0.5 font-mono text-xs font-bold"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SVG Number Line with Jump Arcs */}
          <div className="w-full overflow-x-auto py-2">
            <svg
              viewBox="0 0 650 120"
              className="w-full min-w-[550px] h-auto select-none"
            >
              <defs>
                <marker
                  id="jump-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
                </marker>
                <marker
                  id="axis-arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f766e" />
                </marker>
              </defs>

              {/* Number Line Baseline */}
              <line
                x1="20"
                y1="85"
                x2="630"
                y2="85"
                stroke="#0f766e"
                strokeWidth="2.5"
                markerEnd="url(#axis-arrow)"
              />

              {/* Ticks and Numbers */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, i) => {
                const x = 40 + i * 50;
                const isStart = num === simStart;
                const isEnd = num === simStart + simAdd;
                return (
                  <g key={num}>
                    <line
                      x1={x}
                      y1="73"
                      x2={x}
                      y2="97"
                      stroke="#0f766e"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx={x}
                      cy="85"
                      r={isStart || isEnd ? 5.5 : 3.5}
                      fill={isStart ? "#e11d48" : isEnd ? "#059669" : "#0f766e"}
                    />
                    <text
                      x={x}
                      y="114"
                      textAnchor="middle"
                      className={`font-mono text-sm ${
                        isStart
                          ? "font-extrabold fill-rose-600"
                          : isEnd
                          ? "font-extrabold fill-emerald-600"
                          : "font-bold fill-teal-950"
                      }`}
                    >
                      {num}
                    </text>
                  </g>
                );
              })}

              {/* Jump Arcs */}
              {Array.from({ length: simAdd }).map((_, step) => {
                const cur = simStart + step;
                const next = cur + 1;
                if (next > 11) return null;
                const x1 = 40 + cur * 50;
                const x2 = 40 + next * 50;
                const midX = (x1 + x2) / 2;
                const arcH = 45; // Height of bounce
                return (
                  <g key={`jump-${step}`}>
                    {/* Quadratic Bézier curve for smooth bounce */}
                    <path
                      d={`M ${x1} 78 Q ${midX} ${arcH} ${x2} 78`}
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="2.5"
                      markerEnd="url(#jump-arrow)"
                      strokeDasharray="4 2"
                    />
                    {/* Jump label (+1) */}
                    <rect
                      x={midX - 10}
                      y={arcH - 12}
                      width="20"
                      height="15"
                      rx="3"
                      fill="#e0f2fe"
                      stroke="#38bdf8"
                      strokeWidth="1"
                    />
                    <text
                      x={midX}
                      y={arcH - 1}
                      textAnchor="middle"
                      className="font-mono text-xs font-bold fill-sky-800"
                    >
                      1
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-teal-100 text-xs sm:text-sm">
            <p>
              Start from <strong>{simStart}</strong>, we add{" "}
              <strong>{simAdd}</strong>. We make <strong>{simAdd} jumps</strong>{" "}
              to the right on the number line, as shown above. We will reach at{" "}
              <span className="font-mono font-bold text-emerald-700 text-base">
                {simStart + simAdd}
              </span>
              .
            </p>
            <div className="px-4 py-1.5 rounded-lg bg-teal-50 border border-teal-200 font-mono font-extrabold text-teal-900 text-base shrink-0">
              So, {simStart} + {simAdd} = {simStart + simAdd}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-teal-50/60 border-l-4 border-teal-600 text-foreground/90 space-y-1">
          <p className="font-semibold text-teal-950">Key Rule for Addition:</p>
          <p>
            Whenever we add two numbers, we move on the number line towards the{" "}
            <strong>right</strong> starting from the first number.
          </p>
        </div>
      </div>

      {/* ── Footer Banner ───────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 text-sm font-bold text-white rounded-lg shadow-xs mt-8"
        style={{
          background: "linear-gradient(90deg, #0f766e 0%, #14b8a6 100%)",
        }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-teal-700 text-xs font-extrabold mr-3">
          17
        </span>
        <span className="tracking-wide flex-1 text-center font-heading text-xs sm:text-sm">
          Whole Numbers
        </span>
      </div>
    </div>
  );
}
