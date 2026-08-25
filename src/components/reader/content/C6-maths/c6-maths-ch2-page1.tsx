"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

type TableRow = {
  id: string;
  natural: string;
  predecessor: string;
  successor: string;
};

const TABLE_ROWS: TableRow[] = [
  { id: "r1", natural: "13",  predecessor: "12",   successor: "14"   },
  { id: "r2", natural: "237", predecessor: "236",  successor: "238"  },
  { id: "r3", natural: "999", predecessor: "998",  successor: "1000" },
  { id: "r4", natural: "26",  predecessor: "25",   successor: "27"   },
  { id: "r5", natural: "9",   predecessor: "8",    successor: "10"   },
  { id: "r6", natural: "1",   predecessor: "0",    successor: "2"    },
];

export function C6MathsCh2Page1() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch2-page1";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  const ALL_IDS = TABLE_ROWS.flatMap((r) => [`${r.id}_pre`, `${r.id}_suc`]);

  useEffect(() => {
    const saved: Record<string, string> = {};
    const savedG: Record<string, { value: string; correct: boolean }> = {};
    ALL_IDS.forEach((id) => {
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
      ALL_IDS.forEach((id) => {
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

  const handleBlur = (id: string, correctAns: string) => {
    if (isRevealed) return;
    const normalize = (s: string) => s.trim().toLowerCase().replace(/[\s,]+/g, "");
    const typed = normalize(answers[id] ?? "");
    if (!typed) return;
    const prev = graded[id];
    if (prev && prev.value === typed) return;

    const correct = normalize(correctAns) === typed;
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
    localStorage.setItem(`${storageKey}-${id}-graded`, JSON.stringify({ value: typed, correct }));
  };

  function inputClass(id: string): string {
    const typed = (answers[id] ?? "").trim();
    if (!typed && !isRevealed) return "border-border/60 focus:border-primary";
    const normalize = (s: string) => s.toLowerCase().replace(/[\s,]+/g, "");
    const g = graded[id];
    const isCorrect = g && g.value === normalize(typed) ? g.correct : null;
    if (isRevealed) return "border-primary bg-primary/5 font-bold text-primary";
    if (isCorrect === true) return "border-green-500 bg-green-50 text-green-700 font-bold";
    if (isCorrect === false) return "border-destructive bg-destructive/5 text-destructive";
    return "border-border/60 focus:border-primary";
  }

  function badge(id: string) {
    const typed = (answers[id] ?? "").trim();
    if (!typed && !isRevealed) return null;
    const normalize = (s: string) => s.toLowerCase().replace(/[\s,]+/g, "");
    const g = graded[id];
    const isCorrect = g && g.value === normalize(typed) ? g.correct : null;
    if (isRevealed) return null;
    if (isCorrect === true)
      return <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-green-600 font-bold text-xs">✓</span>;
    if (isCorrect === false)
      return <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-destructive font-bold text-xs">✗</span>;
    return null;
  }

  return (
    <div className="w-full space-y-8 font-body text-sm leading-relaxed text-foreground/90 pb-8">
      {feedback !== null && (
        <AnswerFeedback key={feedback.id} correct={feedback.correct} onDone={() => setFeedback(null)} />
      )}

      {/* ── Chapter Header ───────────────────────── */}
      <div className="relative rounded-[16px] overflow-hidden shadow-md">
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ background: "linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #5eead4 100%)" }}
        >
          <div>
            <p className="text-teal-100 text-xs font-semibold uppercase tracking-widest mb-1">Chapter 2</p>
            <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Whole Numbers
            </h1>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white text-3xl font-extrabold shadow">
            2
          </div>
        </div>
      </div>

      {/* ── 2.1 Introduction ────────────────────── */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-1.5 rounded-r-full -ml-4 shadow-sm">
          <span className="font-bold">2.1</span>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider">Introduction</h2>
        </div>

        <div className="space-y-3 mt-4 text-foreground/85">
          <p>
            In our previous class, we learnt about counting things. While counting things, we used numbers 1, 2, 3, … to count. These numbers are called <strong>natural numbers</strong>. We express the set of natural numbers in the form of{" "}
            <span className="font-mono font-bold">N = &#123;1, 2, 3, 4, ....&#125;</span>
          </p>

          <p>
            While learning about natural numbers, we experienced that if we add '1' to any natural number, we get the next natural number. For example, if we add '1' to '16', then we get the number <strong>17</strong> which is again a natural number. In the same way if we deduct '1' from any natural number, generally we get a natural number. For example if we deduct '1' from a natural number 25, the result is 24, which is a natural number. Is this true if 1 is deducted from 1?
          </p>

          <p>
            The next number of any natural number is called its <strong>successor</strong> and the number just before a number is called the <strong>predecessor</strong>.
          </p>

          <div className="bg-teal-50 rounded-xl p-4 border border-teal-100 font-mono text-sm space-y-1">
            <p>For example,</p>
            <p className="pl-4">the successor of 9 is <strong>10</strong></p>
            <p className="pl-4">and the predecessor of 9 is <strong>8</strong></p>
          </div>
        </div>
      </div>

      {/* ── Successor / Predecessor Table ───────── */}
      <div className="space-y-3">
        <p className="font-medium">Now fill the following table with the successor and predecessor of the numbers provided.</p>
        <div className="overflow-x-auto rounded-[12px] border border-teal-200 shadow-sm">
          <table className="w-full border-collapse text-center text-sm">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="border border-teal-700 px-4 py-2.5 font-semibold">S.No.</th>
                <th className="border border-teal-700 px-4 py-2.5 font-semibold">Natural number</th>
                <th className="border border-teal-700 px-4 py-2.5 font-semibold">Predecessor</th>
                <th className="border border-teal-700 px-4 py-2.5 font-semibold">Successor</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row, idx) => {
                const preId = `${row.id}_pre`;
                const sucId = `${row.id}_suc`;
                const bg = idx % 2 === 0 ? "bg-teal-50/30" : "bg-white";
                return (
                  <tr key={row.id} className={bg}>
                    <td className="border border-teal-100 px-3 py-3 font-semibold text-teal-700">{idx + 1}</td>
                    <td className="border border-teal-100 px-3 py-3 font-mono font-bold text-base">{row.natural}</td>
                    <td className="border border-teal-100 px-2 py-2">
                      <div className="relative w-24 mx-auto">
                        <input
                          type="text"
                          value={isRevealed ? row.predecessor : (answers[preId] ?? "")}
                          disabled={isRevealed}
                          onChange={(e) => handleChange(preId, e.target.value)}
                          onBlur={() => handleBlur(preId, row.predecessor)}
                          className={`w-full rounded-[6px] border bg-white px-2 py-1.5 text-center font-mono text-sm focus:outline-none transition-all ${inputClass(preId)}`}
                        />
                        {badge(preId)}
                      </div>
                    </td>
                    <td className="border border-teal-100 px-2 py-2">
                      <div className="relative w-24 mx-auto">
                        <input
                          type="text"
                          value={isRevealed ? row.successor : (answers[sucId] ?? "")}
                          disabled={isRevealed}
                          onChange={(e) => handleChange(sucId, e.target.value)}
                          onBlur={() => handleBlur(sucId, row.successor)}
                          className={`w-full rounded-[6px] border bg-white px-2 py-1.5 text-center font-mono text-sm focus:outline-none transition-all ${inputClass(sucId)}`}
                        />
                        {badge(sucId)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Discuss with your friends ────────────── */}
      <div className="rounded-[14px] bg-amber-50/60 border border-amber-200 p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">🤝</span>
          <h3 className="font-heading font-bold text-amber-900 text-sm uppercase tracking-wide">Discuss with your friends</h3>
        </div>
        <ol className="list-decimal pl-5 space-y-2 text-amber-900 font-medium">
          <li>Which natural number has no successor?</li>
          <li>Which natural number has no predecessor?</li>
        </ol>
        <div className="bg-white/80 rounded-lg p-3 border border-amber-100 text-xs text-foreground/70 space-y-1 mt-2">
          <p>💡 <strong>Hint 1:</strong> Every natural number has a successor — natural numbers go on forever!</p>
          <p>💡 <strong>Hint 2:</strong> The number <strong>1</strong> has no predecessor in the set of natural numbers.</p>
        </div>
      </div>

      {/* ── 2.2 Whole Numbers ─────────────────────── */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-1.5 rounded-r-full -ml-4 shadow-sm">
          <span className="font-bold">2.2</span>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider">Whole Numbers</h2>
        </div>

        <div className="space-y-3 mt-4">
          <p>
            You might have come to know that the number <strong>'1'</strong> has no predecessor in natural numbers. We include zero to the collection of natural numbers. The natural numbers along with the zero form the collection of <strong>Whole numbers</strong>.
          </p>
          <p>Whole numbers are represented as follows:</p>
          <div className="bg-teal-50 rounded-xl p-4 border border-teal-200 font-mono text-base font-bold text-teal-800 text-center shadow-sm">
            W = &#123;0, 1, 2, 3, ....&#125;
          </div>
        </div>
      </div>

      {/* ── Footer banner ─────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 text-sm font-bold text-white mt-8"
        style={{ background: "linear-gradient(90deg, #0f766e 0%, #14b8a6 100%)" }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-teal-600 text-xs font-extrabold mr-3">
          16
        </span>
        <span className="tracking-wide flex-1 text-center">Government's Gift for Students' Progress</span>
      </div>
    </div>
  );
}
