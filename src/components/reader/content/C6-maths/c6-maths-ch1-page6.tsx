"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

type Question = {
  id: string;
  question: string;
  answer: string | string[];
};

const EXERCISE_1_2: {
  title: string;
  questions: Question[];
}[] = [
  {
    title: "1. Round off the following numbers to the nearest tens:",
    questions: [
      { id: "q1_i", question: "i. 89", answer: "90" },
      { id: "q1_ii", question: "ii. 415", answer: "420" },
      { id: "q1_iii", question: "iii. 3951", answer: "3950" },
      { id: "q1_iv", question: "iv. 4409", answer: "4410" },
    ],
  },
  {
    title: "2. Round off the following numbers to the nearest hundreds:",
    questions: [
      { id: "q2_i", question: "i. 695", answer: "700" },
      { id: "q2_ii", question: "ii. 36152", answer: "36200" },
      { id: "q2_iii", question: "iii. 13648", answer: "13600" },
      { id: "q2_iv", question: "iv. 93618", answer: "93600" },
    ],
  },
  {
    title: "3. Round off the following numbers to the nearest thousands:",
    questions: [
      { id: "q3_i", question: "i. 3415", answer: "3000" },
      { id: "q3_ii", question: "ii. 70124", answer: "70000" },
      { id: "q3_iii", question: "iii. 8765", answer: "9000" },
      { id: "q3_iv", question: "iv. 4001", answer: "4000" },
    ],
  },
  {
    title: "4. Write the numbers in short form:",
    questions: [
      { id: "q4_i", question: "i. 3000 + 400 + 7", answer: "3407" },
      { id: "q4_ii", question: "ii. 10000 + 2000 + 300 + 50 + 1", answer: "12351" },
      { id: "q4_iii", question: "iii. 30000 + 500 + 20 + 3", answer: "30523" },
      { id: "q4_iv", question: "iv. 90000 + 9000 + 900 + 90 + 9", answer: "99999" },
    ],
  },
  {
    title: "5. Write the expanded form of the numbers:",
    questions: [
      { id: "q5_i", question: "i. 4348", answer: ["4000 + 300 + 40 + 8", "4000+300+40+8"] },
      { id: "q5_ii", question: "ii. 30214", answer: ["30000 + 200 + 10 + 4", "30000+200+10+4", "30000 + 0 + 200 + 10 + 4"] },
      { id: "q5_iii", question: "iii. 22222", answer: ["20000 + 2000 + 200 + 20 + 2", "20000+2000+200+20+2"] },
      { id: "q5_iv", question: "iv. 75025", answer: ["70000 + 5000 + 20 + 5", "70000+5000+20+5", "70000 + 5000 + 0 + 20 + 5"] },
    ],
  },
];

const INTRO_QUESTIONS: Question[] = [
  { id: "intro_q1", question: "how many tens are there in one lakh?", answer: "10000" },
  { id: "intro_q2", question: "how many hundreds are there in one lakh?", answer: "1000" },
  { id: "intro_q3", question: "how many thousands are there in one lakh?", answer: "100" },
];

export function C6MathsCh1Page6() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch1-page6";

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
    const allIds = [
      ...EXERCISE_1_2.flatMap((s) => s.questions.map((q) => q.id)),
      ...INTRO_QUESTIONS.map((q) => q.id),
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
        ...EXERCISE_1_2.flatMap((s) => s.questions.map((q) => q.id)),
        ...INTRO_QUESTIONS.map((q) => q.id),
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
    <div className="w-full space-y-8 font-body text-sm leading-relaxed text-foreground/90">
      {feedback !== null && (
        <AnswerFeedback
          key={feedback.id}
          correct={feedback.correct}
          onDone={() => setFeedback(null)}
        />
      )}

      {/* ── Exercise 1.2 ────────────────────────────── */}
      <div className="rounded-[16px] border border-green-200 bg-green-50/30 overflow-hidden shadow-sm">
        <div className="bg-green-700 px-4 py-2 flex items-center gap-2">
          <span className="text-white text-lg">📝</span>
          <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
            Exercise - 1.2
          </h2>
        </div>
        <div className="p-4 space-y-6">
          {EXERCISE_1_2.map((section, sIdx) => (
            <div key={sIdx} className="space-y-3">
              <p className="font-semibold text-green-900">{section.title}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pl-4">
                {section.questions.map((q) => (
                  <div key={q.id} className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-foreground/80">
                      {q.question}
                    </span>
                    <div className="relative w-full max-w-[200px]">
                      <input
                        type="text"
                        value={
                          isRevealed
                            ? (Array.isArray(q.answer) ? q.answer[0] : q.answer)
                            : (answers[q.id] ?? "")
                        }
                        disabled={isRevealed}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        onBlur={() => handleBlur(q.id, q.answer)}
                        placeholder="Your answer..."
                        className={`w-full rounded-[8px] border bg-white px-3 py-1.5 text-sm focus:outline-none transition-all shadow-sm ${inputClass(
                          q.id
                        )}`}
                      />
                      {badge(q.id)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 1.5 Introduction to Large Numbers ────────── */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-green-700 text-white px-4 py-1.5 rounded-r-full -ml-4 shadow-sm">
          <span className="font-bold">1.5</span>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider">
            Introduction to Large Numbers
          </h2>
        </div>

        <p>
          The greatest five digit number is 99,999. Now, we add 1 to it.
          <br />
          <span className="font-mono text-indigo-700 font-bold ml-4 block mt-1">
            99,999 + 1 = 1,00,000
          </span>
        </p>

        <p>
          This number is <strong>one lakh</strong>. One lakh comes after 99,999.
        </p>

        <div className="rounded-[16px] border border-blue-200 bg-blue-50/50 p-4 shadow-sm space-y-3">
          <p className="font-medium text-blue-900">Now can you say</p>
          <div className="space-y-3 pl-4">
            {INTRO_QUESTIONS.map((q) => (
              <div key={q.id} className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-sm text-foreground/80">{q.question}</span>
                <div className="relative w-[120px]">
                  <input
                    type="text"
                    value={
                      isRevealed
                        ? q.answer
                        : (answers[q.id] ?? "")
                    }
                    disabled={isRevealed}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    onBlur={() => handleBlur(q.id, q.answer)}
                    placeholder="Answer"
                    className={`w-full rounded-[8px] border bg-white px-3 py-1.5 text-sm focus:outline-none transition-all shadow-sm text-center font-mono ${inputClass(
                      q.id
                    )}`}
                  />
                  {badge(q.id)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p>
          Now, let us take the number 3,15,645. Its expanded form is:
          <br />
          <span className="font-mono text-xs block mt-2 ml-4 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
            3,15,645 = (3 × 100000) + (1 × 10000) + (5 × 1000) + (6 × 100) + (4 × 10) + (5 × 1)
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 300000 + 10000 + 5000 + 600 + 40 + 5
          </span>
        </p>

        <p className="font-medium mt-6 mb-2">Observe the table.</p>
        
        <div className="overflow-x-auto">
          <table className="border-collapse text-center text-sm w-full max-w-[600px] border-2 border-green-700">
            <thead>
              <tr className="bg-green-100">
                <th className="border border-green-700 px-3 py-2 text-green-900 font-bold">3</th>
                <th className="border border-green-700 px-3 py-2 text-green-900 font-bold">1</th>
                <th className="border border-green-700 px-3 py-2 text-green-900 font-bold">5</th>
                <th className="border border-green-700 px-3 py-2 text-green-900 font-bold">6</th>
                <th className="border border-green-700 px-3 py-2 text-green-900 font-bold">4</th>
                <th className="border border-green-700 px-3 py-2 text-green-900 font-bold">5</th>
              </tr>
              <tr className="bg-white">
                <th className="border border-green-700 px-3 py-2 font-medium">Lakhs</th>
                <th className="border border-green-700 px-3 py-2 font-medium">Ten thousands</th>
                <th className="border border-green-700 px-3 py-2 font-medium">Thousands</th>
                <th className="border border-green-700 px-3 py-2 font-medium">Hundreds</th>
                <th className="border border-green-700 px-3 py-2 font-medium">Tens</th>
                <th className="border border-green-700 px-3 py-2 font-medium">Ones</th>
              </tr>
            </thead>
          </table>
        </div>

        <p className="text-sm leading-relaxed mt-4">
          This number has 5 in ones place, 4 in tens place, 6 in hundreds place, 5 in thousands place, 1 in ten thousands place and 3 at lakhs place. Now we read the number as three lakh fifteen thousand six hundred and forty five.
        </p>
      </div>

      {/* ── Footer banner ────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 text-sm font-bold text-white"
        style={{
          background: "linear-gradient(90deg, #16a34a 0%, #22c55e 100%)",
        }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-green-600 text-xs font-extrabold mr-3">
          6
        </span>
        <span className="tracking-wide flex-1 text-center">Government's Gift for Students' Progress</span>
      </div>
    </div>
  );
}
