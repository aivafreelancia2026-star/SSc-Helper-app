"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

interface TrueFalseItem {
  id: string;
  sub: string;
  statement: string;
  correct: "T" | "F";
  correction: string;
}

const TF_QUESTIONS: TrueFalseItem[] = [
  {
    id: "tf1",
    sub: "i",
    statement: "There is a natural number that has no predecessor.",
    correct: "T",
    correction: "True. 1 is a natural number which has no predecessor in the set of natural numbers (N).",
  },
  {
    id: "tf2",
    sub: "ii",
    statement: "Zero is the smallest whole number.",
    correct: "T",
    correction: "True. Whole numbers start from 0: W = {0, 1, 2, 3, ...}, so 0 is the smallest whole number.",
  },
  {
    id: "tf3",
    sub: "iii",
    statement: "All whole numbers are natural numbers.",
    correct: "F",
    correction: "False. Zero (0) is a whole number, but 0 is NOT a natural number.",
  },
  {
    id: "tf4",
    sub: "iv",
    statement: "On a number line, the whole number which lies right side of another whole number is greater.",
    correct: "T",
    correction: "True. Numbers on the right are always greater on the number line.",
  },
  {
    id: "tf5",
    sub: "v",
    statement: "A whole number on the left of another number on the number line, is greater.",
    correct: "F",
    correction: "False. A number on the left of another number on the number line is smaller.",
  },
  {
    id: "tf6",
    sub: "vi",
    statement: "We can't show the smallest whole number on the number line.",
    correct: "F",
    correction: "False. We can show 0 (the smallest whole number) on the number line as the starting point.",
  },
  {
    id: "tf7",
    sub: "vii",
    statement: "We can show the greatest whole number on the number line.",
    correct: "F",
    correction: "False. Whole numbers extend infinitely to the right, so there is no greatest whole number.",
  },
];

interface NumLineCalculation {
  id: string;
  sub: string;
  problem: string;
  ans: string;
  explanation: string;
}

const NUM_LINE_CALCS: NumLineCalculation[] = [
  {
    id: "nlc1",
    sub: "i",
    problem: "6 + 7 + 7",
    ans: "20",
    explanation: "Start at 6, jump 7 steps right to 13, then jump 7 steps right to 20 (6 + 7 + 7 = 20).",
  },
  {
    id: "nlc2",
    sub: "ii",
    problem: "18 - 9",
    ans: "9",
    explanation: "Start at 18, jump 9 steps left to 9 (18 - 9 = 9).",
  },
  {
    id: "nlc3",
    sub: "iii",
    problem: "5 × 3",
    ans: "15",
    explanation: "Start at 0, take 5 leaps of 3 units each to the right to reach 15 (5 × 3 = 15).",
  },
];

interface RightPairItem {
  id: string;
  sub: string;
  pair: string;
  correctAns: string;
  options: string[];
}

const RIGHT_PAIRS: RightPairItem[] = [
  {
    id: "rp1",
    sub: "i",
    pair: "895 ; 239",
    correctAns: "895",
    options: ["895", "239"],
  },
  {
    id: "rp2",
    sub: "ii",
    pair: "1001 ; 10001",
    correctAns: "10001",
    options: ["1001", "10001"],
  },
  {
    id: "rp3",
    sub: "iii",
    pair: "10015678 ; 284013",
    correctAns: "10015678",
    options: ["10015678", "284013"],
  },
];

interface ComparisonSymbolItem {
  id: string;
  sub: string;
  left: string;
  right: string;
  symbol: "<" | ">";
}

const COMPARISON_SYMBOLS: ComparisonSymbolItem[] = [
  { id: "cs1", sub: "i", left: "8", right: "7", symbol: ">" },
  { id: "cs2", sub: "ii", left: "5", right: "2", symbol: ">" },
  { id: "cs3", sub: "iii", left: "0", right: "1", symbol: "<" },
  { id: "cs4", sub: "iv", left: "10", right: "5", symbol: ">" },
];

export function C6MathsCh2Page4() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch2-page4";

  // State for answers
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  // Interactive Property visualizer
  const [propA, setPropA] = useState<number>(2);
  const [propB, setPropB] = useState<number>(3);

  // Interactive Question 5 marked dot
  const [markedQ5, setMarkedQ5] = useState<number | null>(null);

  // Interactive Question 7 marked dots
  const [markedQ7, setMarkedQ7] = useState<{ succ11?: number; pred5?: number }>({});

  const ALL_INPUT_IDS = [
    ...TF_QUESTIONS.map((q) => `${q.id}_ans`),
    "q2_between_count",
    ...NUM_LINE_CALCS.map((c) => `${c.id}_ans`),
    ...RIGHT_PAIRS.map((p) => `${p.id}_ans`),
    ...COMPARISON_SYMBOLS.map((s) => `${s.id}_ans`),
    "q5_smallest_marker",
    "q7_succ11",
    "q7_pred5",
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

    if (saved["q5_smallest_marker"]) {
      setMarkedQ5(Number(saved["q5_smallest_marker"]));
    }
    const q7s11 = saved["q7_succ11"] ? Number(saved["q7_succ11"]) : undefined;
    const q7p5 = saved["q7_pred5"] ? Number(saved["q7_pred5"]) : undefined;
    if (q7s11 !== undefined || q7p5 !== undefined) {
      setMarkedQ7({ succ11: q7s11, pred5: q7p5 });
    }
  }, []);

  useEffect(() => {
    function handleReset() {
      ALL_INPUT_IDS.forEach((id) => {
        localStorage.removeItem(`${storageKey}-${id}-answer`);
        localStorage.removeItem(`${storageKey}-${id}-graded`);
      });
      setAnswers({});
      setGraded({});
      setMarkedQ5(null);
      setMarkedQ7({});
    }
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () => window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, []);

  const handleChange = (id: string, v: string) => {
    setAnswers((prev) => ({ ...prev, [id]: v }));
    localStorage.setItem(`${storageKey}-${id}-answer`, v);
  };

  const handleSelect = (id: string, selected: string, correctAns: string) => {
    if (isRevealed) return;
    handleChange(id, selected);

    const prev = graded[id];
    if (prev && prev.value === selected) return;

    const correct = selected.trim().toUpperCase() === correctAns.trim().toUpperCase();
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

  const handleQ5Click = (num: number) => {
    if (isRevealed) return;
    setMarkedQ5(num);
    handleChange("q5_smallest_marker", num.toString());
    const correct = num === 0;

    const prev = graded["q5_smallest_marker"];
    if (prev && prev.value === num.toString()) return;

    let delta = 0;
    if (prev) {
      if (!prev.correct && correct) delta = 2;
      else if (prev.correct && !correct) delta = -2;
    } else {
      delta = correct ? 1 : -1;
    }
    if (delta !== 0) addPoints(delta);

    setFeedback({ correct, id: Date.now() });
    setGraded((prevG) => ({
      ...prevG,
      q5_smallest_marker: { value: num.toString(), correct },
    }));
    localStorage.setItem(
      `${storageKey}-q5_smallest_marker-graded`,
      JSON.stringify({ value: num.toString(), correct })
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

      {/* ── Exercise 2.1 Header ──────────────────────────────────── */}
      <div className="rounded-[16px] overflow-hidden shadow-sm border border-teal-600">
        <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-white">✏️</span>
            <div>
              <h1 className="font-heading text-xl md:text-2xl font-extrabold text-white tracking-wide">
                Exercise - 2.1
              </h1>
              <p className="text-teal-100 text-xs font-medium">Chapter 2: Whole Numbers</p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-white/20 text-white rounded-full backdrop-blur-xs">
            {isRevealed ? "All Answers Revealed" : "Interactive Worksheet"}
          </span>
        </div>
      </div>

      {/* ── Question 1: True or False ────────────────────────────── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            1. Which of the statements are true (T) and which are false (F)? Correct the false statements.
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            7 Points
          </span>
        </div>

        <div className="space-y-3.5">
          {TF_QUESTIONS.map((q) => {
            const inputId = `${q.id}_ans`;
            const userChoice = answers[inputId];
            const isGraded = graded[inputId];
            return (
              <div
                key={q.id}
                className="p-3.5 rounded-xl border border-teal-100 bg-teal-50/20 hover:bg-teal-50/40 transition flex flex-col gap-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5 flex-1">
                    <span className="font-bold text-teal-800 font-mono mt-0.5">{q.sub}.</span>
                    <p className="font-medium text-foreground/90">{q.statement}</p>
                  </div>

                  {/* T / F Buttons */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {(["T", "F"] as const).map((opt) => {
                      const isSelected = isRevealed ? opt === q.correct : userChoice === opt;
                      const isCorrect = opt === q.correct;
                      return (
                        <button
                          key={opt}
                          disabled={isRevealed}
                          onClick={() => handleSelect(inputId, opt, q.correct)}
                          className={`w-11 py-1.5 rounded-lg font-mono font-bold text-xs transition-all border ${
                            isRevealed
                              ? isCorrect
                                ? "bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-xs"
                                : "bg-gray-100 text-gray-400 border-gray-200 opacity-60"
                              : isSelected
                              ? isGraded?.correct
                                ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                                : "bg-rose-500 text-white border-rose-500 shadow-xs"
                              : "bg-white text-teal-900 border-teal-300 hover:bg-teal-50 cursor-pointer"
                          }`}
                        >
                          {opt} {isRevealed && isCorrect ? "✓" : ""}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Explanation / Correction callout */}
                {(isRevealed || isGraded) && (
                  <div className="text-xs bg-white/80 p-2.5 rounded-lg border border-teal-100 text-teal-950">
                    <span className="font-bold">Reason/Correction:</span> {q.correction}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Question 2: Whole numbers between 27 and 46 ──────────── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5 flex-1">
            <span className="font-bold text-teal-900 font-heading text-base">2.</span>
            <div>
              <h2 className="font-heading font-bold text-teal-950 text-base">
                How many whole numbers are there in between 27 and 46?
              </h2>
              <p className="text-xs text-foreground/70 mt-1">
                (Note: Count numbers strictly between 27 and 46, excluding 27 and 46: 28, 29, ..., 45)
              </p>
            </div>
          </div>

          <div className="relative w-full sm:w-36 shrink-0">
            <input
              type="text"
              placeholder="e.g. 18"
              value={isRevealed ? "18" : answers["q2_between_count"] ?? ""}
              disabled={isRevealed}
              onChange={(e) => handleChange("q2_between_count", e.target.value)}
              onBlur={() => handleBlurText("q2_between_count", ["18", "eighteen"])}
              className={`w-full rounded-lg border bg-white px-3 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                "q2_between_count"
              )}`}
            />
            {badge("q2_between_count")}
          </div>
        </div>

        {isRevealed && (
          <div className="text-xs bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-emerald-900 font-medium">
            💡 <strong>Calculation:</strong> Formula = (46 - 27) - 1 = 19 - 1 = <strong>18</strong> whole numbers (28 to 45).
          </div>
        )}
      </div>

      {/* ── Question 3: Find using number line ───────────────────── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            3. Find the following using number line:
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            3 Points
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NUM_LINE_CALCS.map((item) => {
            const inputId = `${item.id}_ans`;
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-teal-200 bg-teal-50/20 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-teal-800">{item.sub}.</span>
                  <span className="font-mono font-extrabold text-teal-950 text-base">
                    {item.problem}
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Result = ?"
                    value={isRevealed ? item.ans : answers[inputId] ?? ""}
                    disabled={isRevealed}
                    onChange={(e) => handleChange(inputId, e.target.value)}
                    onBlur={() => handleBlurText(inputId, [item.ans])}
                    className={`w-full rounded-lg border bg-white px-3 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                      inputId
                    )}`}
                  />
                  {badge(inputId)}
                </div>

                {isRevealed && (
                  <p className="text-xs text-emerald-800 font-medium">💡 {item.explanation}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Question 4: State which number is on the right ───────── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            4. In each pair, state which whole number on the number line is on the right of the other number:
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            3 Points
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RIGHT_PAIRS.map((item) => {
            const inputId = `${item.id}_ans`;
            const val = isRevealed ? item.correctAns : answers[inputId] ?? "";
            const isGraded = graded[inputId];
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-teal-200 bg-teal-50/20 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-teal-800">{item.sub}.</span>
                  <span className="font-mono font-extrabold text-teal-950 text-sm">
                    {item.pair}
                  </span>
                </div>

                <div className="relative">
                  <select
                    aria-label={`Rightmost number for pair ${item.pair}`}
                    value={val}
                    disabled={isRevealed}
                    onChange={(e) => handleSelect(inputId, e.target.value, item.correctAns)}
                    className={`w-full rounded-lg border bg-white px-3 py-2 text-xs sm:text-sm font-mono font-bold focus:outline-none transition-all ${
                      isRevealed
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold"
                        : isGraded?.correct === true
                        ? "border-green-500 bg-green-50 text-green-800 font-bold"
                        : isGraded?.correct === false
                        ? "border-rose-400 bg-rose-50 text-rose-800"
                        : "border-teal-200 focus:border-teal-500"
                    }`}
                  >
                    <option value="">-- Choose number on right --</option>
                    {item.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt} lies on the right
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Question 5: Mark the smallest whole number ───────────── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            5. Mark the smallest whole number on the number line:
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            Interactive Click
          </span>
        </div>

        <p className="text-xs text-foreground/80">
          👉 <strong>Click on the correct point</strong> below to mark the smallest whole number:
        </p>

        {/* Interactive Clickable Number Line */}
        <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-200 overflow-x-auto">
          <svg viewBox="0 0 650 90" className="w-full min-w-[550px] h-auto select-none">
            <line x1="20" y1="45" x2="630" y2="45" stroke="#0f766e" strokeWidth="2.5" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, i) => {
              const x = 40 + i * 50;
              const isSelected = (isRevealed ? 0 : markedQ5) === num;
              const isCorrectTarget = num === 0;
              return (
                <g
                  key={num}
                  className="cursor-pointer group"
                  onClick={() => handleQ5Click(num)}
                >
                  <line x1={x} y1="33" x2={x} y2="57" stroke="#0f766e" strokeWidth="2.5" />
                  <circle
                    cx={x}
                    cy="45"
                    r={isSelected ? 7 : 4}
                    fill={
                      isSelected
                        ? isCorrectTarget || isRevealed
                          ? "#059669"
                          : "#e11d48"
                        : "#0f766e"
                    }
                    className="transition-all group-hover:scale-125"
                  />
                  <text
                    x={x}
                    y="76"
                    textAnchor="middle"
                    className={`font-mono text-sm font-bold ${
                      isSelected ? "fill-emerald-700 font-extrabold" : "fill-teal-950"
                    }`}
                  >
                    {num}
                  </text>
                  {isSelected && (
                    <text
                      x={x}
                      y="24"
                      textAnchor="middle"
                      className="font-sans text-xs font-bold fill-emerald-700"
                    >
                      ★ Smallest (0)
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ── Question 6: Choose appropriate symbol < or > ─────────── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <h2 className="font-heading font-bold text-teal-950 text-base">
            6. Choose the appropriate symbol from &lt; or &gt;:
          </h2>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            4 Points
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {COMPARISON_SYMBOLS.map((s) => {
            const inputId = `${s.id}_ans`;
            const current = answers[inputId];
            return (
              <div
                key={s.id}
                className="p-3.5 rounded-xl border border-teal-100 bg-teal-50/20 flex items-center justify-between gap-2"
              >
                <span className="font-mono font-bold text-teal-800 text-xs">{s.sub}.</span>
                <span className="font-mono font-extrabold text-teal-950 text-base">{s.left}</span>

                <div className="flex items-center gap-1">
                  {(["<", ">"] as const).map((sym) => {
                    const isSelected = isRevealed ? sym === s.symbol : current === sym;
                    const isCorrect = sym === s.symbol;
                    return (
                      <button
                        key={sym}
                        disabled={isRevealed}
                        onClick={() => handleSelect(inputId, sym, s.symbol)}
                        className={`w-9 py-1 rounded-md font-mono font-bold text-sm transition-all border ${
                          isRevealed
                            ? isCorrect
                              ? "bg-emerald-600 text-white border-emerald-600 font-extrabold"
                              : "bg-gray-100 text-gray-400 border-gray-200 opacity-60"
                            : isSelected
                            ? graded[inputId]?.correct
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                              : "bg-rose-500 text-white border-rose-500 shadow-xs"
                            : "bg-white text-teal-900 border-teal-300 hover:bg-teal-50 cursor-pointer"
                        }`}
                      >
                        {sym}
                      </button>
                    );
                  })}
                </div>

                <span className="font-mono font-extrabold text-teal-950 text-base">{s.right}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Question 7: Place successor of 11, predecessor of 5 ─── */}
      <div className="rounded-[16px] border border-teal-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <h2 className="font-heading font-bold text-teal-950 text-base">
          7. Place the successor of 11, predecessor of 5 on the number line:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-200 flex items-center justify-between">
            <span className="font-medium text-teal-950">Successor of 11 (11 + 1):</span>
            <span className="px-3 py-1 rounded-md bg-white border border-teal-300 font-mono font-extrabold text-emerald-700">
              12
            </span>
          </div>

          <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-200 flex items-center justify-between">
            <span className="font-medium text-teal-950">Predecessor of 5 (5 - 1):</span>
            <span className="px-3 py-1 rounded-md bg-white border border-teal-300 font-mono font-extrabold text-emerald-700">
              4
            </span>
          </div>
        </div>

        {/* Vector SVG Number line highlighting 4 and 12 */}
        <div className="bg-teal-50/30 p-4 rounded-xl border border-teal-200 overflow-x-auto">
          <svg viewBox="0 0 680 95" className="w-full min-w-[600px] h-auto select-none">
            <line x1="20" y1="50" x2="660" y2="50" stroke="#0f766e" strokeWidth="2.5" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((num, i) => {
              const x = 35 + i * 45;
              const isPred5 = num === 4;
              const isSucc11 = num === 12;
              return (
                <g key={num}>
                  <line x1={x} y1="38" x2={x} y2="62" stroke="#0f766e" strokeWidth="2.5" />
                  <circle
                    cx={x}
                    cy="50"
                    r={isPred5 || isSucc11 ? 6.5 : 3.5}
                    fill={isPred5 ? "#0284c7" : isSucc11 ? "#059669" : "#0f766e"}
                  />
                  <text
                    x={x}
                    y="80"
                    textAnchor="middle"
                    className={`font-mono text-xs ${
                      isPred5
                        ? "font-extrabold fill-sky-700"
                        : isSucc11
                        ? "font-extrabold fill-emerald-700"
                        : "font-bold fill-teal-950"
                    }`}
                  >
                    {num}
                  </text>
                  {isPred5 && (
                    <text x={x} y="25" textAnchor="middle" className="font-sans text-[10px] font-extrabold fill-sky-700">
                      Pred(5) = 4
                    </text>
                  )}
                  {isSucc11 && (
                    <text x={x} y="25" textAnchor="middle" className="font-sans text-[10px] font-extrabold fill-emerald-700">
                      Succ(11) = 12
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ── Section 2.4 PROPERTIES OF WHOLE NUMBERS ──────────────── */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-teal-700 text-white px-4 py-1.5 rounded-r-full -ml-4 shadow-sm">
          <span className="font-bold">2.4</span>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider">
            Properties of Whole Numbers (Closure Property)
          </h2>
        </div>

        <div className="space-y-3 text-foreground/90 leading-relaxed">
          <p>
            Studying the properties of whole numbers helps us to understand numbers better. Let us look at some of the properties.
          </p>
          <p>
            <strong>Take any two whole numbers and add them. Is the result a whole number?</strong> Think of some more examples and check.
          </p>
        </div>

        {/* ── Interactive Addition Check & Closure Property Playground ── */}
        <div className="bg-gradient-to-br from-teal-50 via-white to-teal-50/50 p-5 rounded-2xl border border-teal-200 shadow-sm space-y-4">
          <p className="font-heading font-bold text-teal-950 text-sm">
            Your additions may be like this:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 font-mono text-xs sm:text-sm">
            <div className="bg-white p-2.5 rounded-lg border border-teal-100 shadow-xs">
              <strong className="text-teal-900">2 + 3 = 5</strong>, a whole number
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-teal-100 shadow-xs">
              <strong className="text-teal-900">0 + 7 = 7</strong>, a whole number
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-teal-100 shadow-xs">
              <strong className="text-teal-900">20 + 51 = 71</strong>, a whole number
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-teal-100 shadow-xs">
              <strong className="text-teal-900">0 + 1 = 1</strong>, a whole number
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-teal-100 shadow-xs">
              <strong className="text-teal-900">0 + 0 = 0</strong>, a whole number
            </div>
            <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-emerald-950 font-bold">
              Sum is always a whole number!
            </div>
          </div>

          {/* Try Any Whole Number Addition Simulator */}
          <div className="bg-white p-3.5 rounded-xl border border-teal-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-teal-900">Try any numbers:</label>
              <input
                type="number"
                min="0"
                value={propA}
                onChange={(e) => setPropA(Math.max(0, Number(e.target.value)))}
                className="w-16 rounded border border-teal-300 px-2 py-1 font-mono text-center text-sm font-bold"
              />
              <span className="font-bold text-teal-700">+</span>
              <input
                type="number"
                min="0"
                value={propB}
                onChange={(e) => setPropB(Math.max(0, Number(e.target.value)))}
                className="w-16 rounded border border-teal-300 px-2 py-1 font-mono text-center text-sm font-bold"
              />
              <span className="font-bold text-teal-700">=</span>
              <span className="font-mono font-extrabold text-emerald-700 text-base px-2">
                {propA + propB}
              </span>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              ✓ Result is in W
            </span>
          </div>

          <div className="p-3 bg-teal-100/70 rounded-xl text-teal-950 font-medium text-xs sm:text-sm">
            ✨ <strong>Conclusion:</strong> Here, we observe that the <em>sum of any two whole numbers is always a whole number</em> (<strong>Closure Property under Addition</strong>).
          </div>
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
          19
        </span>
        <span className="tracking-wide flex-1 text-center font-heading text-xs sm:text-sm">
          Whole Numbers
        </span>
      </div>
    </div>
  );
}
