"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ── EXERCISE 1.1 Continuation Data ─────────────────────── */
type DescendingQ = {
  id: string;
  label: string;
  numbers: string;
  descending: string;
};

const DESCENDING_QS: DescendingQ[] = [
  { id: "q3a", label: "i", numbers: "1876, 89715, 45321, 89254", descending: "89715, 89254, 45321, 1876" },
  { id: "q3b", label: "ii", numbers: "3000, 8700, 3900, 18500", descending: "18500, 8700, 3900, 3000" },
];

type CompareQ = {
  id: string;
  label: string;
  num1: string;
  num2: string;
  symbol: "<" | ">";
};

const COMPARE_QS: CompareQ[] = [
  { id: "q4a", label: "i", num1: "3854", num2: "15200", symbol: "<" },
  { id: "q4b", label: "ii", num1: "4895", num2: "4864", symbol: ">" },
  { id: "q4c", label: "iii", num1: "99454", num2: "99445", symbol: ">" },
  { id: "q4d", label: "iv", num1: "14500", num2: "14499", symbol: ">" },
];

type InWordsQ = {
  id: string;
  label: string;
  num: string;
  correctAnswers: string[];
};

const IN_WORDS_QS: InWordsQ[] = [
  {
    id: "q5a",
    label: "i",
    num: "72642",
    correctAnswers: [
      "seventy two thousand six hundred forty two",
      "seventy-two thousand six hundred and forty-two",
      "seventy two thousand six hundred and forty two",
      "seventy-two thousand six hundred forty-two"
    ]
  },
  {
    id: "q5b",
    label: "ii",
    num: "55345",
    correctAnswers: [
      "fifty five thousand three hundred forty five",
      "fifty-five thousand three hundred and forty-five",
      "fifty five thousand three hundred and forty five",
      "fifty-five thousand three hundred forty-five"
    ]
  },
  {
    id: "q5c",
    label: "iii",
    num: "66600",
    correctAnswers: [
      "sixty six thousand six hundred",
      "sixty-six thousand six hundred"
    ]
  },
  {
    id: "q5d",
    label: "iv",
    num: "30301",
    correctAnswers: [
      "thirty thousand three hundred one",
      "thirty thousand three hundred and one",
      "thirty-thousand three hundred one",
      "thirty-thousand three hundred and one"
    ]
  },
];

type InFiguresQ = {
  id: string;
  label: string;
  words: string;
  figure: string;
};

const IN_FIGURES_QS: InFiguresQ[] = [
  { id: "q6a", label: "i", words: "Forty thousand two hundred seventy", figure: "40270" },
  { id: "q6b", label: "ii", words: "Fourteen thousand sixty four", figure: "14064" },
  { id: "q6c", label: "iii", words: "Nine thousand seven hundred", figure: "9700" },
  { id: "q6d", label: "iv", words: "Sixty thousand", figure: "60000" },
];

type DigitsQ = {
  id: string;
  label: string;
  greatest: string;
  smallest: string;
};

const DIGITS_Q: DigitsQ = {
  id: "q7",
  label: "7",
  greatest: "7430",
  smallest: "3047",
};

type WriteNumQ = {
  id: string;
  label: string;
  desc: string;
  num: string;
};

const WRITE_NUM_QS: WriteNumQ[] = [
  { id: "q8a", label: "i", desc: "the smallest four digit number", num: "1000" },
  { id: "q8b", label: "ii", desc: "the greatest four digit number", num: "9999" },
  { id: "q8c", label: "iii", desc: "the smallest five digit number", num: "10000" },
  { id: "q8d", label: "iv", desc: "the greatest five digit number", num: "99999" },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function C6MathsCh1Page3() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";

  const storageKey = "c6-maths-ch1-page3";

  /* ── State ─────────────────────────────────────────── */
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
      ...DESCENDING_QS.map((q) => `${q.id}-descending`),
      ...COMPARE_QS.map((q) => `${q.id}-compare`),
      ...IN_WORDS_QS.map((q) => `${q.id}-inwords`),
      ...IN_FIGURES_QS.map((q) => `${q.id}-infigures`),
      `${DIGITS_Q.id}-greatest`,
      `${DIGITS_Q.id}-smallest`,
      ...WRITE_NUM_QS.map((q) => `${q.id}-writenum`),
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
        ...DESCENDING_QS.map((q) => `${q.id}-descending`),
        ...COMPARE_QS.map((q) => `${q.id}-compare`),
        ...IN_WORDS_QS.map((q) => `${q.id}-inwords`),
        ...IN_FIGURES_QS.map((q) => `${q.id}-infigures`),
        `${DIGITS_Q.id}-greatest`,
        `${DIGITS_Q.id}-smallest`,
        ...WRITE_NUM_QS.map((q) => `${q.id}-writenum`),
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

  const handleBlur = (id: string, correctAnswers: string[], isWordText = false) => {
    if (isRevealed) return;
    let typed = (answers[id] ?? "").trim().toLowerCase();
    if (!isWordText) {
      typed = typed.replace(/\s+/g, "");
    }
    if (!typed) return;

    const prev = graded[id];
    if (prev && prev.value === typed) return;

    const correct = correctAnswers.some((a) => {
      const normalizedA = isWordText ? a.trim().toLowerCase() : a.trim().toLowerCase().replace(/\s+/g, "");
      return normalizedA === typed;
    });

    addPoints(correct ? 1 : -1);
    setFeedback({ correct, id: Date.now() });
    const next = { ...graded, [id]: { value: typed, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${id}-graded`,
      JSON.stringify({ value: typed, correct })
    );
  };

  function inputClass(id: string, isWordText = false): string {
    const typed = answers[id] ?? "";
    const g = graded[id];
    let normalizedTyped = typed.trim().toLowerCase();
    if (!isWordText) {
      normalizedTyped = normalizedTyped.replace(/\s+/g, "");
    }
    const isCorrect =
      g && g.value === normalizedTyped ? g.correct : null;

    if (isRevealed) return "border-primary bg-primary/5 font-bold";
    if (isCorrect === true)
      return "border-green-500 bg-green-50 text-green-700 font-bold";
    if (isCorrect === false)
      return "border-destructive bg-destructive/5 text-destructive";
    return "border-border/60 focus:border-primary";
  }

  function badge(id: string, isWordText = false) {
    const typed = answers[id] ?? "";
    const g = graded[id];
    let normalizedTyped = typed.trim().toLowerCase();
    if (!isWordText) {
      normalizedTyped = normalizedTyped.replace(/\s+/g, "");
    }
    const isCorrect =
      g && g.value === normalizedTyped ? g.correct : null;

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

      {/* ── Exercise 1.1 Box ───────────────────────────── */}
      <div className="rounded-[16px] border-2 border-emerald-300 overflow-hidden shadow-sm">
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
            EXERCISE — 1.1 (Continued)
          </span>
        </div>

        <div className="space-y-6 bg-emerald-50/40 p-4">
          
          {/* Q3: Descending Order */}
          <div className="space-y-3">
            <p className="font-semibold text-foreground/90">
              3. Write the numbers in descending (decreasing) order:
            </p>
            {DESCENDING_QS.map((q) => (
              <div
                key={q.id}
                className="rounded-[12px] border border-emerald-200 bg-white/70 p-3 space-y-2"
              >
                <p className="text-xs font-medium text-foreground/70">
                  <span className="mr-1 font-bold text-emerald-600">({q.label})</span>
                  {q.numbers}
                </p>
                <div className="relative">
                  <input
                    type="text"
                    value={isRevealed ? q.descending : (answers[`${q.id}-descending`] ?? "")}
                    disabled={isRevealed}
                    onChange={(e) => handleChange(`${q.id}-descending`, e.target.value)}
                    onBlur={() => handleBlur(`${q.id}-descending`, [q.descending])}
                    placeholder="e.g. 89715, 89254, 45321, 1876…"
                    className={`w-full rounded-[8px] border bg-white/80 px-2 py-1.5 text-xs text-foreground focus:outline-none transition-all ${inputClass(`${q.id}-descending`)}`}
                  />
                  {badge(`${q.id}-descending`)}
                </div>
              </div>
            ))}
          </div>

          {/* Q4: Place appropriate symbol (< or >) */}
          <div className="space-y-3">
            <p className="font-semibold text-foreground/90">
              4. Compare the numbers by placing appropriate symbol (&lt; or &gt;) in the space given:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COMPARE_QS.map((q) => (
                <div
                  key={q.id}
                  className="flex items-center justify-between rounded-[12px] border border-emerald-200 bg-white/70 p-3"
                >
                  <span className="text-xs font-medium text-foreground/80">
                    <span className="mr-1.5 font-bold text-emerald-600">({q.label})</span>
                    {q.num1}
                  </span>
                  <div className="relative w-16">
                    <input
                      type="text"
                      value={isRevealed ? q.symbol : (answers[`${q.id}-compare`] ?? "")}
                      disabled={isRevealed}
                      onChange={(e) => handleChange(`${q.id}-compare`, e.target.value)}
                      onBlur={() => handleBlur(`${q.id}-compare`, [q.symbol])}
                      placeholder="< or >"
                      className={`w-full text-center rounded-[8px] border bg-white/80 py-1.5 text-xs text-foreground focus:outline-none transition-all ${inputClass(`${q.id}-compare`)}`}
                    />
                    {badge(`${q.id}-compare`)}
                  </div>
                  <span className="text-xs font-medium text-foreground/80">
                    {q.num2}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Q5: Write the numbers in words */}
          <div className="space-y-3">
            <p className="font-semibold text-foreground/90">
              5. Write the numbers in words:
            </p>
            {IN_WORDS_QS.map((q) => (
              <div
                key={q.id}
                className="rounded-[12px] border border-emerald-200 bg-white/70 p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700">
                    ({q.label}) {q.num} =
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={isRevealed ? q.correctAnswers[0] : (answers[`${q.id}-inwords`] ?? "")}
                    disabled={isRevealed}
                    onChange={(e) => handleChange(`${q.id}-inwords`, e.target.value)}
                    onBlur={() => handleBlur(`${q.id}-inwords`, q.correctAnswers, true)}
                    placeholder="Type number in words…"
                    className={`w-full rounded-[8px] border bg-white/80 px-2 py-1.5 text-xs text-foreground focus:outline-none transition-all ${inputClass(`${q.id}-inwords`, true)}`}
                  />
                  {badge(`${q.id}-inwords`, true)}
                </div>
              </div>
            ))}
          </div>

          {/* Q6: Write the numbers in figures */}
          <div className="space-y-3">
            <p className="font-semibold text-foreground/90">
              6. Write the numbers in figures:
            </p>
            {IN_FIGURES_QS.map((q) => (
              <div
                key={q.id}
                className="rounded-[12px] border border-emerald-200 bg-white/70 p-3 space-y-2"
              >
                <p className="text-xs font-medium text-foreground/75">
                  <span className="mr-1 font-bold text-emerald-600">({q.label})</span>
                  {q.words}
                </p>
                <div className="relative">
                  <input
                    type="text"
                    value={isRevealed ? q.figure : (answers[`${q.id}-infigures`] ?? "")}
                    disabled={isRevealed}
                    onChange={(e) => handleChange(`${q.id}-infigures`, e.target.value)}
                    onBlur={() => handleBlur(`${q.id}-infigures`, [q.figure])}
                    placeholder="e.g. 40270…"
                    className={`w-full rounded-[8px] border bg-white/80 px-2 py-1.5 text-xs text-foreground focus:outline-none transition-all ${inputClass(`${q.id}-infigures`)}`}
                  />
                  {badge(`${q.id}-infigures`)}
                </div>
              </div>
            ))}
          </div>

          {/* Q7: Form 4-digit numbers */}
          <div className="space-y-3">
            <p className="font-semibold text-foreground/90">
              7. Form four-digit numbers with the digits 4, 0, 3, 7 and find which is the greatest and the smallest among them?
            </p>
            <div className="rounded-[12px] border border-emerald-200 bg-white/70 p-3 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-0.5">
                  <label className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
                    Greatest Four-Digit Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={isRevealed ? DIGITS_Q.greatest : (answers[`${DIGITS_Q.id}-greatest`] ?? "")}
                      disabled={isRevealed}
                      onChange={(e) => handleChange(`${DIGITS_Q.id}-greatest`, e.target.value)}
                      onBlur={() => handleBlur(`${DIGITS_Q.id}-greatest`, [DIGITS_Q.greatest])}
                      placeholder="e.g. 7430"
                      className={`w-full rounded-[8px] border bg-white/80 px-2 py-1.5 text-xs text-foreground focus:outline-none transition-all ${inputClass(`${DIGITS_Q.id}-greatest`)}`}
                    />
                    {badge(`${DIGITS_Q.id}-greatest`)}
                  </div>
                </div>
                <div className="space-y-0.5">
                  <label className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
                    Smallest Four-Digit Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={isRevealed ? DIGITS_Q.smallest : (answers[`${DIGITS_Q.id}-smallest`] ?? "")}
                      disabled={isRevealed}
                      onChange={(e) => handleChange(`${DIGITS_Q.id}-smallest`, e.target.value)}
                      onBlur={() => handleBlur(`${DIGITS_Q.id}-smallest`, [DIGITS_Q.smallest])}
                      placeholder="e.g. 3047"
                      className={`w-full rounded-[8px] border bg-white/80 px-2 py-1.5 text-xs text-foreground focus:outline-none transition-all ${inputClass(`${DIGITS_Q.id}-smallest`)}`}
                    />
                    {badge(`${DIGITS_Q.id}-smallest`)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Q8: Write the following numbers */}
          <div className="space-y-3">
            <p className="font-semibold text-foreground/90">
              8. Write the following numbers:
            </p>
            {WRITE_NUM_QS.map((q) => (
              <div
                key={q.id}
                className="rounded-[12px] border border-emerald-200 bg-white/70 p-3 space-y-2"
              >
                <p className="text-xs font-medium text-foreground/75">
                  <span className="mr-1 font-bold text-emerald-600">({q.label})</span>
                  {q.desc}
                </p>
                <div className="relative">
                  <input
                    type="text"
                    value={isRevealed ? q.num : (answers[`${q.id}-writenum`] ?? "")}
                    disabled={isRevealed}
                    onChange={(e) => handleChange(`${q.id}-writenum`, e.target.value)}
                    onBlur={() => handleBlur(`${q.id}-writenum`, [q.num])}
                    placeholder="…"
                    className={`w-full rounded-[8px] border bg-white/80 px-2 py-1.5 text-xs text-foreground focus:outline-none transition-all ${inputClass(`${q.id}-writenum`)}`}
                  />
                  {badge(`${q.id}-writenum`)}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Section 1.3 ────────────────────────────────── */}
      <div className="space-y-1">
        <h2 className="font-heading text-base font-bold text-primary">
          1.3 Estimation and Rounding Off Numbers
        </h2>
        <div className="h-0.5 w-12 rounded-full bg-primary/40" />
      </div>

      <p>
        We use numbers in our daily life situations, such as:
      </p>

      <ul className="list-disc list-outside pl-5 space-y-2.5">
        <li>
          Nearly <span className="font-semibold text-primary">25,000</span> people visited Salarjung museum in the month of November.
        </li>
        <li>
          In our State, this year approximately <span className="font-semibold text-primary">9 lakh</span> students will appear for S.S.C. board examination.
        </li>
      </ul>

      {/* ── Page Footer Banner ──────────────────────────── */}
      <div
        className="flex items-center justify-between rounded-[12px] px-4 py-2 text-sm font-bold text-white shadow"
        style={{
          background:
            "linear-gradient(90deg, #059669 0%, #10b981 50%, #34d399 100%)",
        }}
      >
        <span className="tracking-wide">KNOWING OUR NUMBERS</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 text-xs font-extrabold">
          3
        </span>
      </div>

    </div>
  );
}
