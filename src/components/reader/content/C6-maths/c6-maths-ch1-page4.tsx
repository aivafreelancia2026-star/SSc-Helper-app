"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ── Number line component ───────────────────────────────── */
function NumberLine({
  start,
  end,
  step,
  highlight,
  label,
}: {
  start: number;
  end: number;
  step: number;
  highlight?: number;
  label?: string;
}) {
  const points: number[] = [];
  for (let n = start; n <= end; n += step) points.push(n);

  return (
    <div className="w-full space-y-1">
      {label && (
        <p className="text-[10px] font-semibold text-foreground/50 uppercase tracking-wider">
          {label}
        </p>
      )}
      <div className="relative flex items-center w-full">
        {/* line */}
        <div className="absolute left-0 right-0 h-0.5 bg-indigo-300 top-1/2 -translate-y-1/2 z-0" />
        {/* left arrow */}
        <div className="relative z-10 mr-1">
          <span className="text-indigo-400 text-lg leading-none">◄</span>
        </div>
        {/* points */}
        <div className="flex flex-1 justify-between z-10">
          {points.map((n) => {
            const isMid = n === start + (end - start) / 2;
            const isEdge = n === start || n === end;
            const isHL = n === highlight;
            return (
              <div key={n} className="flex flex-col items-center">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold shadow-sm border transition-all
                    ${isHL ? "bg-rose-500 text-white border-rose-600 scale-110" :
                      isMid ? "bg-amber-400 text-white border-amber-500" :
                      isEdge ? "bg-indigo-600 text-white border-indigo-700" :
                      "bg-white text-indigo-700 border-indigo-200"}`}
                >
                  {n}
                </div>
              </div>
            );
          })}
        </div>
        {/* right arrow */}
        <div className="relative z-10 ml-1">
          <span className="text-indigo-400 text-lg leading-none">►</span>
        </div>
      </div>
      {/* legend */}
      <div className="flex flex-wrap gap-2 text-[9px] pt-1">
        <span className="flex items-center gap-1">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-600" />
          Start/End
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400" />
          Mid-point
        </span>
        {highlight && (
          <span className="flex items-center gap-1">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-500" />
            Example
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Do-This exercise data ───────────────────────────────── */
type DoThisItem = {
  id: string;
  num: number;
  roundTo: "tens" | "hundreds" | "thousands";
  answer: number;
};

function roundToNearest(n: number, to: number): number {
  return Math.round(n / to) * to;
}

const DO_THIS_ITEMS: DoThisItem[] = [
  // Round to tens
  { id: "dt-48",  num: 48,   roundTo: "tens",      answer: roundToNearest(48, 10) },
  { id: "dt-62",  num: 62,   roundTo: "tens",      answer: roundToNearest(62, 10) },
  { id: "dt-91",  num: 91,   roundTo: "tens",      answer: roundToNearest(91, 10) },
  { id: "dt-94",  num: 94,   roundTo: "tens",      answer: roundToNearest(94, 10) },
  { id: "dt-27",  num: 27,   roundTo: "tens",      answer: roundToNearest(27, 10) },
  // Round to hundreds
  { id: "dt-128", num: 128,  roundTo: "hundreds",  answer: roundToNearest(128, 100) },
  { id: "dt-275", num: 275,  roundTo: "hundreds",  answer: roundToNearest(275, 100) },
  { id: "dt-312", num: 312,  roundTo: "hundreds",  answer: roundToNearest(312, 100) },
  { id: "dt-693", num: 693,  roundTo: "hundreds",  answer: roundToNearest(693, 100) },
  { id: "dt-199", num: 199,  roundTo: "hundreds",  answer: roundToNearest(199, 100) },
  // Round to thousands
  { id: "dt-1232", num: 1232, roundTo: "thousands", answer: roundToNearest(1232, 1000) },
  { id: "dt-4115", num: 4115, roundTo: "thousands", answer: roundToNearest(4115, 1000) },
  { id: "dt-3068", num: 3068, roundTo: "thousands", answer: roundToNearest(3068, 1000) },
  { id: "dt-7119", num: 7119, roundTo: "thousands", answer: roundToNearest(7119, 1000) },
  { id: "dt-9660", num: 9660, roundTo: "thousands", answer: roundToNearest(9660, 1000) },
];

/* ── Q: What is rounding off of 250? ────────────────────── */
const Q250_ID = "q250-why";
const Q250_ANSWERS = ["300", "rounds to 300", "250 rounds to 300"];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function C6MathsCh1Page4() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";

  const storageKey = "c6-maths-ch1-page4";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number } | null>(null);
  const [nlHighlight, setNlHighlight] = useState<number | undefined>(undefined);

  /* ── Persistence ─────────────────────────────────────── */
  useEffect(() => {
    const saved: Record<string, string> = {};
    const savedG: Record<string, { value: string; correct: boolean }> = {};
    const allIds = [...DO_THIS_ITEMS.map((i) => i.id), Q250_ID];
    allIds.forEach((id) => {
      const a = localStorage.getItem(`${storageKey}-${id}-answer`);
      if (a) saved[id] = a;
      const g = localStorage.getItem(`${storageKey}-${id}-graded`);
      if (g) {
        try { savedG[id] = JSON.parse(g); } catch {}
      }
    });
    setAnswers(saved);
    setGraded(savedG);
  }, []);

  useEffect(() => {
    function handleReset() {
      const allIds = [...DO_THIS_ITEMS.map((i) => i.id), Q250_ID];
      allIds.forEach((id) => {
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

  const handleBlur = (id: string, correctAnswers: string[]) => {
    if (isRevealed) return;
    const typed = (answers[id] ?? "").trim().toLowerCase().replace(/\s+/g, "");
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
    localStorage.setItem(`${storageKey}-${id}-graded`, JSON.stringify({ value: typed, correct }));
  };

  function inputClass(id: string): string {
    const typed = (answers[id] ?? "").trim().toLowerCase().replace(/\s+/g, "");
    const g = graded[id];
    const isCorrect = g && g.value === typed ? g.correct : null;
    if (isRevealed) return "border-primary bg-primary/5 font-bold";
    if (isCorrect === true) return "border-green-500 bg-green-50 text-green-700 font-bold";
    if (isCorrect === false) return "border-destructive bg-destructive/5 text-destructive";
    return "border-border/60 focus:border-primary";
  }

  function badge(id: string) {
    const typed = (answers[id] ?? "").trim().toLowerCase().replace(/\s+/g, "");
    const g = graded[id];
    const isCorrect = g && g.value === typed ? g.correct : null;
    if (isRevealed) return null;
    if (isCorrect === true)
      return <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 font-bold text-xs">✓</span>;
    if (isCorrect === false)
      return <span className="absolute right-2 top-1/2 -translate-y-1/2 text-destructive font-bold text-xs">✗</span>;
    return null;
  }

  const groups: { label: string; items: DoThisItem[]; color: string; roundTo: string }[] = [
    {
      label: "1. Round to nearest Tens",
      items: DO_THIS_ITEMS.filter((i) => i.roundTo === "tens"),
      color: "blue",
      roundTo: "tens",
    },
    {
      label: "2. Round to nearest Hundreds",
      items: DO_THIS_ITEMS.filter((i) => i.roundTo === "hundreds"),
      color: "violet",
      roundTo: "hundreds",
    },
    {
      label: "3. Round to nearest Thousands",
      items: DO_THIS_ITEMS.filter((i) => i.roundTo === "thousands"),
      color: "rose",
      roundTo: "thousands",
    },
  ];

  const colorMap: Record<string, { card: string; label: string; badge: string }> = {
    blue:   { card: "border-blue-200 bg-blue-50/50",   label: "text-blue-700",   badge: "bg-blue-100 text-blue-800" },
    violet: { card: "border-violet-200 bg-violet-50/50", label: "text-violet-700", badge: "bg-violet-100 text-violet-800" },
    rose:   { card: "border-rose-200 bg-rose-50/50",   label: "text-rose-700",   badge: "bg-rose-100 text-rose-800" },
  };

  /* ── Render ──────────────────────────────────────────── */
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {feedback !== null && (
        <AnswerFeedback key={feedback.id} correct={feedback.correct} onDone={() => setFeedback(null)} />
      )}

      {/* ── Intro paragraphs ─────────────────────────── */}
      <p>
        The words <strong>'nearly'</strong>, <strong>'approximately'</strong>,{" "}
        <strong>'roughly'</strong> do not show the exact number of people, distances or weight.
        Writing the numbers in the nearest like they consider is a kind of estimation.
      </p>
      <div className="rounded-[14px] border border-amber-200 bg-amber-50/60 p-3 text-xs text-amber-900">
        📌 In fact, 25,000 may be 24,875 or 25,845 — i.e. it may be a little less or more, but not exact.
      </div>
      <p>
        Estimation is also helpful in identifying, rounding off the numbers. We usually round off
        the numbers to the nearest <strong>10's (Tens)</strong>,{" "}
        <strong>100's (Hundreds)</strong>, <strong>1000's (Thousands)</strong>,{" "}
        <strong>10000's (Ten Thousands)</strong>, etc.
      </p>

      {/* ── Rounding to Tens ─────────────────────────── */}
      <div className="rounded-[16px] border border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-4 space-y-4">
        <h3 className="font-heading text-sm font-bold text-indigo-700">
          📏 Rounding off to the nearest Tens
        </h3>

        <p className="text-xs text-foreground/80">
          Observe the procedure — rounding off to the nearest ten:
        </p>

        <NumberLine start={80} end={90} step={1} highlight={nlHighlight} label="Number line: 80 → 90" />

        {/* interactive number selector for the number line */}
        <div className="flex flex-wrap gap-2">
          {[81, 82, 83, 84, 85, 86, 87, 88, 89].map((n) => (
            <button
              key={n}
              onClick={() => setNlHighlight(nlHighlight === n ? undefined : n)}
              className={`rounded-lg border px-2 py-1 text-xs font-semibold transition-all ${
                nlHighlight === n
                  ? "bg-rose-500 text-white border-rose-600"
                  : "bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-100"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        {nlHighlight && (
          <div className="rounded-[10px] bg-indigo-100/80 px-3 py-2 text-xs font-medium text-indigo-800">
            {nlHighlight < 85
              ? `${nlHighlight} is nearer to 80 than 90 → rounds to 80`
              : nlHighlight === 85
              ? `85 is equidistant from 80 and 90 → by convention rounds to 90`
              : `${nlHighlight} is nearer to 90 than 80 → rounds to 90`}
          </div>
        )}

        {/* rules */}
        <ul className="space-y-1.5 text-xs text-foreground/80 list-none">
          {[
            { n: 81, result: 80, rule: "81 is nearer to 80 than 85, so 81 will be rounded off to 80." },
            { n: 87, result: 90, rule: "87 is nearer to 90 than 85, so 87 will be rounded off to 90." },
            { n: 85, result: 90, rule: "85 is equidistant from 80 and 90 but by convention it is rounded off to 90." },
          ].map(({ n, result, rule }) => (
            <li key={n} className="flex gap-2">
              <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${result === 80 ? "bg-indigo-100 text-indigo-700" : "bg-blue-100 text-blue-700"}`}>
                {n} → {result}
              </span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Rounding to Hundreds ─────────────────────── */}
      <div className="rounded-[16px] border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 p-4 space-y-4">
        <h3 className="font-heading text-sm font-bold text-violet-700">
          📏 Rounding off to the nearest Hundreds
        </h3>

        <NumberLine start={200} end={300} step={10} label="Number line: 200 → 300" />

        <ul className="space-y-1.5 text-xs text-foreground/80 list-none">
          {[
            { rule: "In this, the smallest number is 200, the greatest is 300 and the middle number is 250." },
            { rule: "210 is nearer to 200 than 300, so 210 is rounded off to 200." },
            { rule: "290 is nearer to 300 than 200, so it is rounded off to 300." },
          ].map(({ rule }, i) => (
            <li key={i} className="flex gap-2">
              <span className="shrink-0 text-violet-400">•</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>

        {/* Interactive Q: rounding of 250 */}
        <div className="rounded-[12px] border border-violet-300 bg-white/70 p-3 space-y-2">
          <p className="text-xs font-semibold text-violet-700">
            🤔 What is the rounding off number for <span className="font-extrabold">250</span>? Why?
          </p>
          <div className="relative">
            <input
              type="text"
              value={isRevealed ? "300" : (answers[Q250_ID] ?? "")}
              disabled={isRevealed}
              onChange={(e) => handleChange(Q250_ID, e.target.value)}
              onBlur={() => handleBlur(Q250_ID, Q250_ANSWERS)}
              placeholder="Type your answer…"
              className={`w-full rounded-[8px] border bg-white/80 px-3 py-1.5 text-xs text-foreground focus:outline-none transition-all ${inputClass(Q250_ID)}`}
            />
            {badge(Q250_ID)}
          </div>
          {isRevealed && (
            <p className="text-[10px] text-violet-600 italic">
              250 is the midpoint — by convention, it rounds up to 300.
            </p>
          )}
        </div>
      </div>

      {/* ── Do This ──────────────────────────────────── */}
      <div className="rounded-[16px] border-2 border-emerald-300 overflow-hidden shadow-sm">
        <div
          className="flex items-center gap-2 px-4 py-2"
          style={{ background: "linear-gradient(90deg, #0ea5e9 0%, #6366f1 100%)" }}
        >
          <span className="text-white text-base">📝</span>
          <span className="font-heading text-sm font-bold tracking-wide text-white">Do This</span>
        </div>

        <div className="space-y-5 bg-sky-50/40 p-4">
          <p className="text-xs font-medium text-foreground/70">
            Round off these numbers as directed:
          </p>

          {groups.map(({ label, items, color, roundTo }) => {
            const c = colorMap[color];
            return (
              <div key={roundTo} className="space-y-2">
                <p className={`text-xs font-bold ${c.label}`}>{label}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`rounded-[12px] border ${c.card} p-2.5 space-y-1.5`}
                    >
                      {/* number chip */}
                      <div className="flex items-center justify-between">
                        <span className={`inline-block rounded-lg px-2 py-0.5 text-xs font-extrabold ${c.badge}`}>
                          {item.num}
                        </span>
                        <span className="text-[9px] text-foreground/40 uppercase tracking-wider">
                          → {roundTo}
                        </span>
                      </div>
                      {/* input */}
                      <div className="relative">
                        <input
                          type="text"
                          value={isRevealed ? String(item.answer) : (answers[item.id] ?? "")}
                          disabled={isRevealed}
                          onChange={(e) => handleChange(item.id, e.target.value)}
                          onBlur={() => handleBlur(item.id, [String(item.answer)])}
                          placeholder="Answer…"
                          className={`w-full rounded-[8px] border bg-white/80 px-2 py-1 text-xs text-foreground focus:outline-none transition-all ${inputClass(item.id)}`}
                        />
                        {badge(item.id)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Footer banner ────────────────────────────── */}
      <div
        className="flex items-center justify-between rounded-[12px] px-4 py-2 text-sm font-bold text-white shadow"
        style={{ background: "linear-gradient(90deg, #059669 0%, #10b981 50%, #34d399 100%)" }}
      >
        <span className="tracking-wide">KNOWING OUR NUMBERS</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 text-xs font-extrabold">
          4
        </span>
      </div>
    </div>
  );
}
