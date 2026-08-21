"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ── dialogue data ────────────────────────────────────── */
type DialogueLine = { speaker: "Uma" | "Latha"; text: string };

const DIALOGUE: DialogueLine[] = [
  { speaker: "Uma", text: "Do you know the population of our village?" },
  { speaker: "Latha", text: "Yes, I know." },
  { speaker: "Uma", text: "How?" },
  {
    speaker: "Latha",
    text: "I have seen it on the wall of the panchayat office.",
  },
  { speaker: "Uma", text: "What particulars are written on the wall?" },
  {
    speaker: "Latha",
    text: "All information regarding our village — especially population of our village, number of men, women and children, number of houses, pucca, kutcha etc.",
  },
  { speaker: "Uma", text: "Shall we visit the place now?" },
  { speaker: "Latha", text: "Sure." },
];

/* ── panchayat statistics ─────────────────────────────── */
type VillageStat = { label: string; value: string };

const VILLAGE_STATS: VillageStat[] = [
  { label: "Name of the Gram Panchayat", value: "Gummadala" },
  { label: "District", value: "Sriganganagar" },  // Using original name from textbook
  { label: "Population of the village", value: "8,032" },
  { label: "No. of men", value: "4,065" },
  { label: "No. of women", value: "3,967" },  // fixed to match original
  { label: "No. of children", value: "967" },  // Adjust if needed
  { label: "No. of house holds", value: "2,017" },
  { label: "No. of Pucca houses", value: "1,947" },
  { label: "No. of Kutcha houses", value: "76" },
];

/* ── interactive quiz ─────────────────────────────────── */
type QuizItem = {
  id: string;
  question: string;
  correctAnswers: string[];
  placeholder: string;
};

const QUIZ_ITEMS: QuizItem[] = [
  {
    id: "total-pop",
    question: "What is the total population of the village?",
    correctAnswers: ["8032", "8,032"],
    placeholder: "Enter the number…",
  },
  {
    id: "more-men-or-women",
    question: "Are there more men or women?",
    correctAnswers: ["men"],
    placeholder: "men / women",
  },
  {
    id: "pucca-kutcha",
    question: "Are there more Pucca houses or Kutcha houses?",
    correctAnswers: ["pucca", "pucca houses"],
    placeholder: "pucca / kutcha",
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function C6MathsCh1Page1() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";

  /* state ----------------------------------------------- */
  const [expandedDialogue, setExpandedDialogue] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  const storageKey = "c6-maths-ch1-page1-quiz";

  /* persistence ----------------------------------------- */
  useEffect(() => {
    const saved: Record<string, string> = {};
    const savedG: Record<string, { value: string; correct: boolean }> = {};
    QUIZ_ITEMS.forEach((q) => {
      const a = localStorage.getItem(`${storageKey}-${q.id}-answer`);
      if (a) saved[q.id] = a;
      const g = localStorage.getItem(`${storageKey}-${q.id}-graded`);
      if (g) {
        try {
          savedG[q.id] = JSON.parse(g);
        } catch {}
      }
    });
    setAnswers(saved);
    setGraded(savedG);
  }, []);

  useEffect(() => {
    function handleReset() {
      QUIZ_ITEMS.forEach((q) => {
        localStorage.removeItem(`${storageKey}-${q.id}-answer`);
        localStorage.removeItem(`${storageKey}-${q.id}-graded`);
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

  const handleBlur = (item: QuizItem) => {
    if (isRevealed) return;
    const typed = (answers[item.id] ?? "").trim().toLowerCase();
    if (!typed) return;
    const prev = graded[item.id];
    if (prev && prev.value === typed) return;
    const correct = item.correctAnswers.some(
      (a) => a.toLowerCase() === typed
    );
    addPoints(correct ? 1 : -1);
    setFeedback({ correct, id: Date.now() });
    const next = { ...graded, [item.id]: { value: typed, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${item.id}-graded`,
      JSON.stringify({ value: typed, correct })
    );
  };

  /* render ─────────────────────────────────────────────── */
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {feedback !== null && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* ── Chapter banner ─────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-[16px] border border-indigo-300 p-5 shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #a5b4fc 100%)",
        }}
      >
        {/* decorative circles */}
        <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-white/10" />

        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 text-2xl font-extrabold text-white shadow-inner backdrop-blur">
            1
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold leading-tight text-white drop-shadow">
              Knowing our Numbers
            </h1>
            <p className="mt-0.5 text-xs font-medium text-indigo-100">
              Chapter 1 · Class VI Mathematics
            </p>
          </div>
        </div>

        {/* QR placeholder */}
        <div className="absolute right-3 top-3 rounded border border-white/30 bg-white/20 p-1 backdrop-blur">
          <div className="flex h-8 w-8 items-center justify-center bg-zinc-800 text-[5px] font-mono leading-none text-white">
            QR
          </div>
          <span className="mt-0.5 block text-center text-[6px] font-bold tracking-widest text-white/80">
            QARZ1
          </span>
        </div>
      </div>

      {/* ── 1.1 Introduction ───────────────────────────── */}
      <div className="space-y-1">
        <h2 className="font-heading text-base font-bold text-primary">
          1.1 Introduction
        </h2>
        <div className="h-0.5 w-12 rounded-full bg-primary/40" />
      </div>

      <p>
        Latha and Uma took admission in class VI. On the first day at the school,
        their maths teacher discussed the population of India, population of the
        State, population of the District as per the recent census. Uma did not
        understand some of the numbers discussed by the teacher. While coming back
        home, Uma asked Latha about the population of their village.
      </p>

      {/* ── Dialogue section ───────────────────────────── */}
      <div className="rounded-[16px] border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-4 shadow-sm">
        <button
          onClick={() => setExpandedDialogue((p) => !p)}
          className="mb-3 flex w-full items-center justify-between text-left"
        >
          <span className="font-heading text-sm font-bold text-violet-700">
            💬 Conversation between Uma &amp; Latha
          </span>
          <span
            className="text-violet-400 transition-transform duration-200"
            style={{
              transform: expandedDialogue ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▼
          </span>
        </button>

        <div
          className="space-y-2.5 overflow-hidden transition-all duration-300"
          style={{
            maxHeight: expandedDialogue ? "600px" : "180px",
          }}
        >
          {DIALOGUE.map((line, i) => {
            const isUma = line.speaker === "Uma";
            return (
              <div
                key={i}
                className={`flex items-start gap-2 ${isUma ? "" : "flex-row-reverse"}`}
              >
                {/* avatar */}
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow ${
                    isUma
                      ? "bg-gradient-to-br from-pink-400 to-rose-500"
                      : "bg-gradient-to-br from-emerald-400 to-teal-500"
                  }`}
                >
                  {line.speaker[0]}
                </div>
                {/* bubble */}
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm ${
                    isUma
                      ? "rounded-tl-sm bg-white text-foreground/90"
                      : "rounded-tr-sm bg-indigo-600 text-white"
                  }`}
                >
                  <span className="font-semibold">
                    {line.speaker}:{" "}
                  </span>
                  {line.text}
                </div>
              </div>
            );
          })}
        </div>

        {!expandedDialogue && (
          <button
            onClick={() => setExpandedDialogue(true)}
            className="mt-2 text-xs font-semibold text-violet-500 hover:underline"
          >
            Show full conversation ↓
          </button>
        )}
      </div>

      {/* ── Story continuation ─────────────────────────── */}
      <p>
        Both of them visited the panchayat office on their way back home and
        observed the particulars on the wall:
      </p>

      {/* ── Village statistics table ───────────────────── */}
      <div className="rounded-[16px] border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4 shadow-sm">
        <h3 className="mb-3 font-heading text-sm font-bold text-amber-800">
          📋 Gram Panchayat — Village Statistics
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-amber-200">
                <th className="pb-2 pr-4 font-semibold text-amber-700">
                  Particular
                </th>
                <th className="pb-2 font-semibold text-amber-700">Value</th>
              </tr>
            </thead>
            <tbody>
              {VILLAGE_STATS.map((stat, idx) => (
                <tr
                  key={stat.label}
                  className={`border-b border-amber-100 transition-colors hover:bg-amber-100/60 ${
                    idx % 2 === 0 ? "bg-white/40" : ""
                  }`}
                >
                  <td className="py-2 pr-4 font-medium text-foreground/80">
                    {stat.label}
                  </td>
                  <td className="py-2 font-bold tabular-nums text-amber-900">
                    {stat.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Paragraph after table ──────────────────────── */}
      <p>
        Uma read the particulars on the wall and understood the figures. She also
        asked Latha about <strong>lakhs</strong> and <strong>crores</strong>, as
        the teacher had discussed the population in lakhs and crores in the class.
      </p>

      <p className="font-semibold text-primary/90">
        Do you have any idea about lakhs and crores? Discuss with your friends.
      </p>

      {/* ── "Knowing our Numbers" footer banner ────────── */}
      <div
        className="flex items-center justify-between rounded-[12px] px-4 py-2 text-sm font-bold text-white shadow"
        style={{
          background:
            "linear-gradient(90deg, #059669 0%, #10b981 50%, #34d399 100%)",
        }}
      >
        <span className="tracking-wide">KNOWING OUR NUMBERS</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 text-xs font-extrabold">
          1
        </span>
      </div>

      {/* ── Quick-check quiz ───────────────────────────── */}
      <div className="rounded-[16px] border border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 p-4 shadow-sm">
        <h3 className="mb-3 font-heading text-sm font-bold text-sky-700">
          ✏️ Quick Check — Answer from the table
        </h3>

        <div className="space-y-4">
          {QUIZ_ITEMS.map((q) => {
            const typed = answers[q.id] ?? "";
            const g = graded[q.id];
            const isCorrect =
              g && g.value === typed.trim().toLowerCase() ? g.correct : null;

            return (
              <div key={q.id} className="space-y-1">
                <label className="text-xs font-medium text-foreground/80">
                  {q.question}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={isRevealed ? q.correctAnswers[0] : typed}
                    disabled={isRevealed}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    onBlur={() => handleBlur(q)}
                    placeholder={q.placeholder}
                    className={`w-full rounded-[10px] border bg-white/80 px-3 py-2 text-xs text-foreground placeholder:text-foreground/30 transition-all focus:outline-none ${
                      isRevealed
                        ? "border-primary bg-primary/10 font-bold"
                        : isCorrect === true
                          ? "border-green-500 bg-green-50 text-green-700 font-bold"
                          : isCorrect === false
                            ? "border-destructive bg-destructive/5 text-destructive"
                            : "border-border/60 focus:border-primary"
                    }`}
                  />
                  {isCorrect === true && !isRevealed && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 font-bold text-xs">
                      ✓
                    </span>
                  )}
                  {isCorrect === false && !isRevealed && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive font-bold text-xs">
                      ✗
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
