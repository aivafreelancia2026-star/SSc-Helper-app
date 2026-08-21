"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

interface DoThisItem {
  id: string;
  num: number;
  label: string;
  op: "+" | "-";
  start: number;
  steps: number;
  ans: number;
}

const DO_THIS_ITEMS: DoThisItem[] = [
  { id: "dt1", num: 1, label: "5 + 3", op: "+", start: 5, steps: 3, ans: 8 },
  { id: "dt2", num: 2, label: "5 - 3", op: "-", start: 5, steps: 3, ans: 2 },
  { id: "dt3", num: 3, label: "3 + 5", op: "+", start: 3, steps: 5, ans: 8 },
  { id: "dt4", num: 4, label: "10 + 1", op: "+", start: 10, steps: 1, ans: 11 },
];

interface TryTheseItem {
  id: string;
  num: number;
  question: string;
  correctAns: string[];
  placeholder: string;
  explanation: string;
}

const TRY_THESE_ITEMS: TryTheseItem[] = [
  {
    id: "tt1",
    num: 1,
    question: "What number should be deducted from 8 to get 5?",
    correctAns: ["3", "three"],
    placeholder: "e.g. 3",
    explanation: "8 - 3 = 5 (Jump 3 steps to the left from 8 to reach 5)",
  },
  {
    id: "tt2",
    num: 2,
    question: "What number should be deducted from 6 to get 1?",
    correctAns: ["5", "five"],
    placeholder: "e.g. 5",
    explanation: "6 - 5 = 1 (Jump 5 steps to the left from 6 to reach 1)",
  },
  {
    id: "tt3",
    num: 3,
    question: "What number should be added to 6 to get 8?",
    correctAns: ["2", "two"],
    placeholder: "e.g. 2",
    explanation: "6 + 2 = 8 (Jump 2 steps to the right from 6 to reach 8)",
  },
  {
    id: "tt4",
    num: 4,
    question: "How many 6 are needed to get 30?",
    correctAns: ["5", "five"],
    placeholder: "e.g. 5",
    explanation: "5 × 6 = 30 (5 leaps of 6 units each starting from 0 reach 30)",
  },
];

export function C6MathsCh2Page3() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch2-page3";

  // State for interactive inputs
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  // Interactive Subtraction simulator
  const [subStart, setSubStart] = useState<number>(6);
  const [subMinus, setSubMinus] = useState<number>(2);

  // Interactive Multiplication simulator
  const [multCount, setMultCount] = useState<number>(4);
  const [multSize, setMultSize] = useState<number>(2);

  // Selected Do This tab for interactive visualizer
  const [activeDoThisTab, setActiveDoThisTab] = useState<string>("dt1");

  // Game verification interactive state
  const [gayatriChoice, setGayatriChoice] = useState<string>("");

  const ALL_INPUT_IDS = [
    ...DO_THIS_ITEMS.map((item) => `${item.id}_ans`),
    ...TRY_THESE_ITEMS.map((item) => `${item.id}_ans`),
    "gayatri_decision",
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
    if (saved["gayatri_decision"]) {
      setGayatriChoice(saved["gayatri_decision"]);
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
      setGayatriChoice("");
    }
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () => window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, []);

  const handleChange = (id: string, v: string) => {
    setAnswers((prev) => ({ ...prev, [id]: v }));
    localStorage.setItem(`${storageKey}-${id}-answer`, v);
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

  const handleGayatriAnswer = (choice: string) => {
    if (isRevealed) return;
    setGayatriChoice(choice);
    handleChange("gayatri_decision", choice);

    const prev = graded["gayatri_decision"];
    if (prev && prev.value === choice) return;

    const correct = choice === "Yes";
    let delta = 0;
    if (prev) {
      if (!prev.correct && correct) delta = 2;
      else if (prev.correct && !correct) delta = -2;
    } else {
      delta = correct ? 1 : -1;
    }
    if (delta !== 0) addPoints(delta);

    setFeedback({ correct, id: Date.now() });
    const next = { ...graded, gayatri_decision: { value: choice, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-gayatri_decision-graded`,
      JSON.stringify({ value: choice, correct })
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

  const selectedDoThis =
    DO_THIS_ITEMS.find((d) => d.id === activeDoThisTab) || DO_THIS_ITEMS[0];

  return (
    <div className="w-full space-y-8 font-body text-sm leading-relaxed text-foreground/90 pb-8">
      {feedback !== null && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* ── Section 1: Subtraction on the Number Line ─────────────── */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-teal-700 text-white px-4 py-1.5 rounded-r-full -ml-4 shadow-sm">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider">
            Subtraction on the Number Line
          </h2>
        </div>

        <p className="text-foreground/90">
          Now consider <strong className="font-mono text-base text-teal-950">6 - 2</strong>.
        </p>

        {/* ── Subtraction Jump Visualizer ── */}
        <div className="bg-gradient-to-b from-teal-50/70 to-teal-50/20 p-5 rounded-2xl border border-teal-200 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-teal-100 pb-3">
            <span className="font-heading font-bold text-teal-900 text-sm">
              Interactive Subtraction Visualizer (Moves Left):
            </span>
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-teal-800">Start from:</label>
              <select
                aria-label="Start number for subtraction"
                value={subStart}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSubStart(val);
                  if (subMinus > val) setSubMinus(val);
                }}
                className="rounded border border-teal-300 bg-white px-2 py-0.5 font-mono text-xs font-bold"
              >
                {[4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <span className="text-xs font-bold text-rose-600">-</span>

              <label className="text-xs font-semibold text-teal-800">Subtract:</label>
              <select
                aria-label="Amount to subtract"
                value={subMinus}
                onChange={(e) => setSubMinus(Number(e.target.value))}
                className="rounded border border-teal-300 bg-white px-2 py-0.5 font-mono text-xs font-bold"
              >
                {Array.from({ length: subStart + 1 }).map((_, n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SVG Subtraction Number Line */}
          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 650 120" className="w-full min-w-[550px] h-auto select-none">
              <defs>
                <marker
                  id="sub-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#e11d48" />
                </marker>
                <marker
                  id="axis-arrow-sub"
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
                markerEnd="url(#axis-arrow-sub)"
              />

              {/* Ticks and Numbers */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, i) => {
                const x = 40 + i * 50;
                const isStart = num === subStart;
                const isEnd = num === subStart - subMinus;
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
                      fill={isStart ? "#0284c7" : isEnd ? "#059669" : "#0f766e"}
                    />
                    <text
                      x={x}
                      y="114"
                      textAnchor="middle"
                      className={`font-mono text-sm ${
                        isStart
                          ? "font-extrabold fill-sky-700"
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

              {/* Left-pointing Jump Arcs for Subtraction */}
              {Array.from({ length: subMinus }).map((_, step) => {
                const cur = subStart - step;
                const next = cur - 1;
                if (next < 0) return null;
                const x1 = 40 + cur * 50;
                const x2 = 40 + next * 50;
                const midX = (x1 + x2) / 2;
                const arcH = 45;
                return (
                  <g key={`sub-jump-${step}`}>
                    <path
                      d={`M ${x1} 78 Q ${midX} ${arcH} ${x2} 78`}
                      fill="none"
                      stroke="#e11d48"
                      strokeWidth="2.5"
                      markerEnd="url(#sub-arrow)"
                      strokeDasharray="4 2"
                    />
                    <rect
                      x={midX - 10}
                      y={arcH - 12}
                      width="20"
                      height="15"
                      rx="3"
                      fill="#ffe4e6"
                      stroke="#fb7185"
                      strokeWidth="1"
                    />
                    <text
                      x={midX}
                      y={arcH - 1}
                      textAnchor="middle"
                      className="font-mono text-xs font-bold fill-rose-700"
                    >
                      1
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-teal-100 text-xs sm:text-sm">
            <p>
              Start from <strong>{subStart}</strong>. Since we subtract {subMinus} from {subStart}, we take{" "}
              <strong>{subMinus} steps to the left</strong> on the number line, as shown above. We reach{" "}
              <span className="font-mono font-bold text-emerald-700 text-base">
                {subStart - subMinus}
              </span>
              .
            </p>
            <div className="px-4 py-1.5 rounded-lg bg-teal-50 border border-teal-200 font-mono font-extrabold text-teal-900 text-base shrink-0">
              So, {subStart} - {subMinus} = {subStart - subMinus}
            </div>
          </div>
        </div>

        <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-amber-950 font-medium text-xs sm:text-sm">
          📌 <strong>Key Rule:</strong> Moving towards <strong>left</strong> means <em>subtraction</em>.
        </div>
      </div>

      {/* ── Section 2: DO THIS (Number Line Problems) ─────────────── */}
      <div className="rounded-[16px] border-2 border-emerald-500 bg-emerald-50/30 overflow-hidden shadow-sm">
        <div className="bg-emerald-600 px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl text-white">📖</span>
            <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
              Do This
            </h2>
          </div>
          <span className="text-emerald-100 text-xs font-semibold px-2 py-0.5 rounded bg-emerald-700/50">
            {isRevealed ? "Answers Revealed" : "4 Points"}
          </span>
        </div>

        <div className="p-5 space-y-4">
          <p className="font-medium text-teal-950">Show these on number line:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DO_THIS_ITEMS.map((item) => {
              const inputId = `${item.id}_ans`;
              const isTabActive = activeDoThisTab === item.id;
              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isTabActive
                      ? "bg-white border-teal-500 shadow-md ring-2 ring-teal-500/20"
                      : "bg-white/80 border-teal-200 hover:border-teal-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-extrabold text-teal-900 text-base">
                      {item.num}. {item.label}
                    </span>
                    <button
                      onClick={() => setActiveDoThisTab(item.id)}
                      className={`text-xs px-2 py-0.5 rounded font-semibold transition ${
                        isTabActive
                          ? "bg-teal-600 text-white"
                          : "bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100"
                      }`}
                    >
                      {isTabActive ? "Viewing" : "Plot"}
                    </button>
                  </div>

                  <div className="relative mt-2">
                    <input
                      type="text"
                      placeholder="Calculate..."
                      value={isRevealed ? item.ans.toString() : answers[inputId] ?? ""}
                      disabled={isRevealed}
                      onChange={(e) => handleChange(inputId, e.target.value)}
                      onBlur={() => handleBlurText(inputId, [item.ans.toString()])}
                      className={`w-full rounded-lg border bg-white px-3 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                        inputId
                      )}`}
                    />
                    {badge(inputId)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Plot Viewer for the Selected "Do This" item */}
          <div className="bg-white p-4 rounded-xl border border-teal-200 shadow-xs space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Live Plot: {selectedDoThis.num}. {selectedDoThis.label} = {selectedDoThis.ans}
            </p>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 650 95" className="w-full min-w-[550px] h-auto select-none">
                <line x1="20" y1="65" x2="630" y2="65" stroke="#0f766e" strokeWidth="2.5" />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
                  const x = 35 + i * 48;
                  const isStart = num === selectedDoThis.start;
                  const isEnd = num === selectedDoThis.ans;
                  return (
                    <g key={num}>
                      <line x1={x} y1="55" x2={x} y2="75" stroke="#0f766e" strokeWidth="2" />
                      <circle
                        cx={x}
                        cy="65"
                        r={isStart || isEnd ? 5 : 3}
                        fill={isStart ? "#0284c7" : isEnd ? "#059669" : "#0f766e"}
                      />
                      <text
                        x={x}
                        y="90"
                        textAnchor="middle"
                        className="font-mono text-xs font-bold fill-teal-950"
                      >
                        {num}
                      </text>
                    </g>
                  );
                })}

                {/* Arcs for selected Do This */}
                {Array.from({ length: selectedDoThis.steps }).map((_, s) => {
                  const cur =
                    selectedDoThis.op === "+"
                      ? selectedDoThis.start + s
                      : selectedDoThis.start - s;
                  const next =
                    selectedDoThis.op === "+" ? cur + 1 : cur - 1;
                  const x1 = 35 + cur * 48;
                  const x2 = 35 + next * 48;
                  const midX = (x1 + x2) / 2;
                  return (
                    <path
                      key={s}
                      d={`M ${x1} 58 Q ${midX} 25 ${x2} 58`}
                      fill="none"
                      stroke={selectedDoThis.op === "+" ? "#0284c7" : "#e11d48"}
                      strokeWidth="2.2"
                      strokeDasharray="3 2"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 3: Multiplication on the Number Line ─────────── */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-teal-700 text-white px-4 py-1.5 rounded-r-full -ml-4 shadow-sm">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider">
            Multiplication on the Number Line
          </h2>
        </div>

        <p className="text-foreground/90">
          Let us now consider the multiplication of the whole numbers on the number line. Let us find{" "}
          <strong className="font-mono text-base text-teal-950">4 × 2</strong>. We know that{" "}
          <span className="font-mono font-bold">4 × 2</span> means taking <strong>2 steps four times</strong>.{" "}
          <span className="font-mono font-bold">4 × 2</span> means four jumps towards right, each of 2 steps.
        </p>

        {/* ── Multiplication Jump Visualizer ── */}
        <div className="bg-gradient-to-b from-teal-50/70 to-teal-50/20 p-5 rounded-2xl border border-teal-200 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-teal-100 pb-3">
            <span className="font-heading font-bold text-teal-900 text-sm">
              Interactive Leap Visualizer (Repeated Jumps):
            </span>
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-teal-800">Leaps (times):</label>
              <select
                aria-label="Number of leaps"
                value={multCount}
                onChange={(e) => setMultCount(Number(e.target.value))}
                className="rounded border border-teal-300 bg-white px-2 py-0.5 font-mono text-xs font-bold"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <span className="text-xs font-bold text-teal-700">×</span>

              <label className="text-xs font-semibold text-teal-800">Step Size:</label>
              <select
                aria-label="Step size per leap"
                value={multSize}
                onChange={(e) => setMultSize(Number(e.target.value))}
                className="rounded border border-teal-300 bg-white px-2 py-0.5 font-mono text-xs font-bold"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SVG Multiplication Number Line */}
          <div className="w-full overflow-x-auto py-2">
            <svg viewBox="0 0 650 120" className="w-full min-w-[550px] h-auto select-none">
              <defs>
                <marker
                  id="mult-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
                </marker>
              </defs>

              {/* Baseline */}
              <line x1="20" y1="85" x2="630" y2="85" stroke="#0f766e" strokeWidth="2.5" />

              {/* Ticks and Numbers */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num, i) => {
                const x = 35 + i * 45;
                const isStart = num === 0;
                const isEnd = num === multCount * multSize;
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

              {/* Multi-step Leap Arcs */}
              {Array.from({ length: multCount }).map((_, step) => {
                const startNum = step * multSize;
                const endNum = startNum + multSize;
                if (endNum > 12) return null;
                const x1 = 35 + startNum * 45;
                const x2 = 35 + endNum * 45;
                const midX = (x1 + x2) / 2;
                const arcH = 40;
                return (
                  <g key={`mult-leap-${step}`}>
                    <path
                      d={`M ${x1} 78 Q ${midX} ${arcH} ${x2} 78`}
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="2.5"
                      markerEnd="url(#mult-arrow)"
                      strokeDasharray="4 2"
                    />
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
                      {multSize}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-teal-100 text-xs sm:text-sm">
            <p>
              Start from 0, move {multSize} units to the right each time, making {multCount} such moves. We will reach{" "}
              <span className="font-mono font-bold text-emerald-700 text-base">
                {multCount * multSize}
              </span>
              .
            </p>
            <div className="px-4 py-1.5 rounded-lg bg-teal-50 border border-teal-200 font-mono font-extrabold text-teal-900 text-base shrink-0">
              So, {multCount} × {multSize} = {multCount * multSize}
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 4: TRY THESE ─────────────────────────────────── */}
      <div className="rounded-[16px] border-2 border-teal-600 bg-teal-50/30 overflow-hidden shadow-sm">
        <div className="bg-teal-700 px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl text-white">✍️</span>
            <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
              Try These
            </h2>
          </div>
          <span className="text-teal-100 text-xs font-semibold px-2 py-0.5 rounded bg-teal-800/50">
            {isRevealed ? "Answers Revealed" : "4 Points"}
          </span>
        </div>

        <div className="p-5 space-y-4">
          <p className="font-semibold text-teal-950">
            Find the following by using number line:
          </p>

          <div className="space-y-3">
            {TRY_THESE_ITEMS.map((item) => {
              const inputId = `${item.id}_ans`;
              return (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-teal-100 shadow-xs"
                >
                  <div className="flex items-start gap-2.5 flex-1">
                    <span className="font-bold text-teal-800 mt-0.5">{item.num}.</span>
                    <div>
                      <p className="font-medium text-foreground/90">{item.question}</p>
                      {isRevealed && (
                        <p className="text-xs text-emerald-700 font-semibold mt-1">
                          💡 {item.explanation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="relative w-full md:w-36 shrink-0 self-end md:self-center">
                    <input
                      type="text"
                      placeholder={item.placeholder}
                      value={isRevealed ? item.correctAns[0] : answers[inputId] ?? ""}
                      disabled={isRevealed}
                      onChange={(e) => handleChange(inputId, e.target.value)}
                      onBlur={() => handleBlurText(inputId, item.correctAns)}
                      className={`w-full rounded-lg border bg-white px-3 py-1.5 text-center font-mono font-bold text-sm focus:outline-none transition-all ${inputClass(
                        inputId
                      )}`}
                    />
                    {badge(inputId)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Section 5: Number Line Game (Raju and Gayatri) ─────────── */}
      <div className="rounded-[16px] border-2 border-indigo-200 bg-indigo-50/40 p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎲</span>
          <h3 className="font-heading font-bold text-indigo-950 text-base">
            Number Line Game (Raju &amp; Gayatri)
          </h3>
        </div>

        <p className="text-foreground/90">
          Raju and Gayatri together made a number line and played a game on it:
        </p>

        {/* 0 to 19 Number Line */}
        <div className="bg-white p-4 rounded-xl border border-indigo-200 shadow-xs overflow-x-auto">
          <svg viewBox="0 0 720 85" className="w-full min-w-[650px] h-auto select-none">
            <line x1="15" y1="45" x2="705" y2="45" stroke="#4338ca" strokeWidth="2.5" />
            {Array.from({ length: 20 }).map((_, num) => {
              const x = 25 + num * 34;
              const isGayatriStop = [3, 11, 16].includes(num);
              return (
                <g key={num}>
                  <line x1={x} y1="35" x2={x} y2="55" stroke="#4338ca" strokeWidth="2" />
                  <circle
                    cx={x}
                    cy="45"
                    r={isGayatriStop ? 4.5 : 2.5}
                    fill={isGayatriStop ? "#e11d48" : "#4338ca"}
                  />
                  <text
                    x={x}
                    y="72"
                    textAnchor="middle"
                    className={`font-mono text-xs ${
                      isGayatriStop ? "font-extrabold fill-rose-600" : "font-semibold fill-indigo-950"
                    }`}
                  >
                    {num}
                  </text>
                </g>
              );
            })}

            {/* Gayatri's 3 Leaps (3, 8, 5) */}
            <path d="M 25 40 Q 63 15 127 40" fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="3 2" />
            <path d="M 127 40 Q 256 12 399 40" fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="3 2" />
            <path d="M 399 40 Q 484 15 569 40" fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="3 2" />
          </svg>
        </div>

        <div className="space-y-2 bg-white/90 p-4 rounded-xl border border-indigo-100 text-xs sm:text-sm text-foreground/90">
          <p>
            Raju asked <em>&quot;Gayatri, where will you reach if you jump thrice, taking leaps of <strong>3</strong>, <strong>8</strong> and <strong>5</strong> starting from zero?&quot;</em>
          </p>
          <p className="text-indigo-950 font-medium bg-indigo-50 p-2.5 rounded-lg border border-indigo-200">
            Gayatri said: <em>&quot;The first leap will take me to <strong>3</strong>, and then from there I will reach <strong>11</strong> in the second step (3 + 8 = 11) and another five steps from there to <strong>16</strong> (11 + 5 = 16).&quot;</em>
          </p>
        </div>

        {/* Interactive Verification */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-indigo-200">
          <p className="font-semibold text-indigo-950 text-sm">
            Do you think Gayatri described correctly &quot;where would she reach&quot;?
          </p>
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            {["Yes", "No"].map((opt) => {
              const isSelected = isRevealed ? opt === "Yes" : gayatriChoice === opt;
              const isCorrect = opt === "Yes";
              return (
                <button
                  key={opt}
                  disabled={isRevealed}
                  onClick={() => handleGayatriAnswer(opt)}
                  className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all border ${
                    isRevealed
                      ? isCorrect
                        ? "bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-sm"
                        : "bg-gray-100 text-gray-400 border-gray-200 opacity-60"
                      : isSelected
                      ? graded["gayatri_decision"]?.correct
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-rose-500 text-white border-rose-500 shadow-sm"
                      : "bg-white text-indigo-800 border-indigo-300 hover:bg-indigo-50 cursor-pointer"
                  }`}
                >
                  {opt} {isRevealed && isCorrect ? "✓" : ""}
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-indigo-900/80 italic text-center">
          Play this game using addition and subtraction on this number line with your friend!
        </p>
      </div>

      {/* ── Footer Banner ───────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 text-sm font-bold text-white rounded-lg shadow-xs mt-8"
        style={{
          background: "linear-gradient(90deg, #0f766e 0%, #14b8a6 100%)",
        }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-teal-700 text-xs font-extrabold mr-3">
          18
        </span>
        <span className="tracking-wide flex-1 text-center font-heading text-xs sm:text-sm">
          Government&apos;s Gift for Students&apos; Progress
        </span>
      </div>
    </div>
  );
}
