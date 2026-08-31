"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

/* ─────────────────────────────────────────────
   All gradable field IDs for this page
───────────────────────────────────────────── */
const ALL_INPUT_IDS = [
  "q_do_hcf_25_35",
  "q_do_hcf_35_45",
  "q_do_hcf_25_35_45",
  "q_tdw_consecutive",
  "q_tdw_even_consecutive",
  "q_ex4_hcf",
  "q_ex4_times",
  "q_ex_1i",
  "q_ex_1ii",
  "q_ex_1iii",
  "q_ex_1iv",
  "q_ex_2",
  "q_ex_3",
  "q_ex_4",
  "q_ex_5",
  "q_cm_4",
  "q_cm_6",
];

/* ─────────────────────────────────────────────
   Correct answers (normalised, lower-case)
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  q_do_hcf_25_35:      ["5", "five"],
  q_do_hcf_35_45:      ["5", "five"],
  q_do_hcf_25_35_45:   ["5", "five"],
  q_tdw_consecutive:   ["1", "one"],
  q_tdw_even_consecutive: ["2", "two"],
  q_ex4_hcf:   ["150"],
  q_ex4_times: ["3", "three"],
  q_ex_1i:  ["9",  "nine"],
  q_ex_1ii: ["4",  "four"],
  q_ex_1iii:["1",  "one"],
  q_ex_1iv: ["8",  "eight"],
  q_ex_2:   ["72"],
  q_ex_3:   ["75"],
  q_ex_4:   ["no", "4", "four"],
  q_ex_5:   ["40"],
  q_cm_4:   ["4", "8", "12"],
  q_cm_6:   ["6", "12", "18"],
};

/* ─────────────────────────────────────────────
   Reveal text shown when teacher presses Reveal
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_do_hcf_25_35:      "5",
  q_do_hcf_35_45:      "5",
  q_do_hcf_25_35_45:   "5",
  q_tdw_consecutive:   "1",
  q_tdw_even_consecutive: "2",
  q_ex4_hcf:   "150",
  q_ex4_times: "3 times (450 ÷ 150 = 3)",
  q_ex_1i:  "9",
  q_ex_1ii: "4",
  q_ex_1iii:"1",
  q_ex_1iv: "8",
  q_ex_2:   "72",
  q_ex_3:   "75 cm",
  q_ex_4:   "No — correct HCF is 4",
  q_ex_5:   "40 litres",
  q_cm_4:   "4, 8, 12, 16, 20, 24, …",
  q_cm_6:   "6, 12, 18, 24, 30, 36, …",
};

/* ─────────────────────────────────────────────
   Helpers (pure functions, outside component)
───────────────────────────────────────────── */
const normalize = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

function borderCls(
  id: string,
  answers: Record<string, string>,
  graded: Record<string, { value: string; correct: boolean }>,
  isRevealed: boolean
) {
  if (isRevealed)
    return "border-emerald-500 bg-emerald-50 font-bold text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300";
  const typed = (answers[id] ?? "").trim();
  if (!typed) return "border-slate-300 focus:border-teal-500 bg-background";
  const g = graded[id];
  if (g?.correct === true)
    return "border-green-500 bg-green-50 text-green-700 font-bold dark:bg-green-950/30 dark:text-green-300";
  if (g?.correct === false)
    return "border-red-400 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400";
  return "border-slate-300 focus:border-teal-500 bg-background";
}

function StatusIcon({
  id,
  answers,
  graded,
  isRevealed,
}: {
  id: string;
  answers: Record<string, string>;
  graded: Record<string, { value: string; correct: boolean }>;
  isRevealed: boolean;
}) {
  if (isRevealed) return null;
  const typed = (answers[id] ?? "").trim();
  if (!typed) return null;
  const g = graded[id];
  if (g?.correct === true)
    return (
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none text-sm font-bold text-green-600 dark:text-green-400">
        ✓
      </span>
    );
  if (g?.correct === false)
    return (
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none text-sm font-bold text-red-500 dark:text-red-400">
        ✗
      </span>
    );
  return null;
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export function C6MathsCh3Page12() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page12";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded]   = useState<Record<string, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number } | null>(null);
  const [tdwOpen, setTdwOpen] = useState(false);

  /* Restore from localStorage on mount */
  useEffect(() => {
    const saved: Record<string, string> = {};
    const savedG: Record<string, { value: string; correct: boolean }> = {};
    ALL_INPUT_IDS.forEach((id) => {
      const a = localStorage.getItem(`${storageKey}-${id}-answer`);
      if (a) saved[id] = a;
      const g = localStorage.getItem(`${storageKey}-${id}-graded`);
      if (g) { try { savedG[id] = JSON.parse(g); } catch {} }
    });
    setAnswers(saved);
    setGraded(savedG);
  }, [storageKey]);

  /* Listen for Reset button */
  useEffect(() => {
    const handleReset = () => {
      ALL_INPUT_IDS.forEach((id) => {
        localStorage.removeItem(`${storageKey}-${id}-answer`);
        localStorage.removeItem(`${storageKey}-${id}-graded`);
      });
      setAnswers({});
      setGraded({});
      setFeedback(null);
      setTdwOpen(false);
    };
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () => window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, [storageKey]);

  /* onChange handler */
  const handleChange = (id: string, val: string) => {
    if (isRevealed) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
    localStorage.setItem(`${storageKey}-${id}-answer`, val);
  };

  /* onBlur handler — grades the answer and awards points */
  const handleBlur = (id: string, correctAnswers: string[], isOpen = false) => {
    if (isRevealed) return;
    const rawTyped = answers[id] ?? "";
    const typed = normalize(rawTyped);
    if (!typed && !isOpen) return;
    if (isOpen && !rawTyped.trim()) return;

    const prev = graded[id];
    if (prev && prev.value === typed) return; // no change

    let correct: boolean;
    if (isOpen) {
      // open-ended: accept if any keyword matches OR student wrote something reasonable
      correct =
        correctAnswers.some((ans) => typed.includes(normalize(ans))) ||
        rawTyped.trim().length >= 3;
    } else {
      correct = correctAnswers.some((ans) => normalize(ans) === typed);
    }

    // Point delta: +1 first correct, +2 switching wrong→right, -2 switching right→wrong
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

  /* Shared input renderer */
  function Field({
    id,
    placeholder,
    correct,
    isOpen = false,
  }: {
    id: string;
    placeholder: string;
    correct: string[];
    isOpen?: boolean;
  }) {
    return (
      <div className="relative w-full">
        <input
          type="text"
          id={`field-${id}`}
          placeholder={placeholder}
          value={isRevealed ? REVEAL_TEXT[id] ?? "" : answers[id] ?? ""}
          onChange={(e) => handleChange(id, e.target.value)}
          onBlur={() => handleBlur(id, correct, isOpen)}
          disabled={isRevealed}
          className={`w-full rounded-xl border px-3 py-2 pr-8 text-sm font-mono outline-none transition-colors ${borderCls(id, answers, graded, isRevealed)}`}
        />
        <StatusIcon id={id} answers={answers} graded={graded} isRevealed={isRevealed} />
      </div>
    );
  }

  /* ── JSX ── */
  return (
    <div className="space-y-8 text-foreground leading-relaxed font-body">
      {feedback && (
        <AnswerFeedback key={feedback.id} correct={feedback.correct} onDone={() => setFeedback(null)} />
      )}

      {/* ══ DO THIS ══ */}
      <div className="rounded-2xl border-2 border-amber-400 overflow-hidden shadow-sm">
        <div className="bg-amber-500 text-white font-heading font-bold px-5 py-3 flex items-center gap-3 text-lg">
          <span>📌</span> Do This
        </div>
        <div className="p-5 bg-amber-50/60 dark:bg-amber-950/20 space-y-4">
          <p className="font-semibold text-base text-amber-900 dark:text-amber-200">
            Find the HCF of <strong>25, 35 and 45</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: "q_do_hcf_25_35",    label: "HCF (25, 35) = ?" },
              { id: "q_do_hcf_35_45",    label: "HCF (35, 45) = ?" },
              { id: "q_do_hcf_25_35_45", label: "HCF (25, 35, 45) = ?" },
            ].map(({ id, label }) => (
              <div key={id} className="space-y-1">
                <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">{label}</p>
                <Field id={id} placeholder="Enter answer" correct={CORRECT[id]} />
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-amber-100 dark:bg-amber-900/30 border border-amber-300 p-3 text-sm text-amber-900 dark:text-amber-200">
            <strong>Hint:</strong> 25 = 5², 35 = 5 × 7, 45 = 5 × 9. Only common prime factor is <strong>5</strong>.
          </div>
        </div>
      </div>

      {/* ══ THINK, DISCUSS AND WRITE ══ */}
      <div className="rounded-2xl border-2 border-sky-400 overflow-hidden shadow-sm">
        <div className="bg-sky-600 text-white font-heading font-bold px-5 py-3 flex items-center gap-3 text-lg">
          <span>💬</span> Think, Discuss and Write
        </div>
        <div className="p-5 bg-sky-50/60 dark:bg-sky-950/20 space-y-4">
          <p className="text-sm font-semibold text-sky-900 dark:text-sky-100">
            Find the HCF of the following pairs and observe the pattern:
          </p>

          {/* (i) consecutive numbers */}
          <div className="rounded-xl border border-sky-200 bg-white/70 dark:bg-sky-950/40 p-4 space-y-2">
            <p className="text-sm font-semibold text-sky-900 dark:text-sky-100">
              (i) Any two <span className="underline underline-offset-2">consecutive</span> numbers
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              HCF(14, 15) = ?  &nbsp;|&nbsp;  HCF(20, 21) = ?  &nbsp;|&nbsp;  HCF(4, 5) = ?
            </p>
            <p className="text-xs text-muted-foreground">What is the HCF always?</p>
            <Field id="q_tdw_consecutive" placeholder="HCF is always ___" correct={CORRECT.q_tdw_consecutive} />
          </div>

          {/* (ii) consecutive even numbers */}
          <div className="rounded-xl border border-sky-200 bg-white/70 dark:bg-sky-950/40 p-4 space-y-2">
            <p className="text-sm font-semibold text-sky-900 dark:text-sky-100">
              (ii) Any two consecutive <span className="underline underline-offset-2">even</span> numbers
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              HCF(10, 12) = ?  &nbsp;|&nbsp;  HCF(16, 18) = ?  &nbsp;|&nbsp;  HCF(4, 6) = ?
            </p>
            <p className="text-xs text-muted-foreground">What is the HCF always?</p>
            <Field id="q_tdw_even_consecutive" placeholder="HCF is always ___" correct={CORRECT.q_tdw_even_consecutive} />
          </div>

          <button
            onClick={() => setTdwOpen((v) => !v)}
            className="text-xs font-semibold text-sky-700 underline underline-offset-4 hover:text-sky-500 transition-colors"
          >
            {tdwOpen ? "▲ Hide discussion" : "▼ Show discussion points"}
          </button>
          {tdwOpen && (
            <div className="rounded-xl bg-sky-100 dark:bg-sky-900/40 border border-sky-300 p-4 text-sm space-y-2">
              <p>✅ HCF of any two <strong>consecutive numbers</strong> is always <strong>1</strong> — they share no common factor (co-prime).</p>
              <p>✅ HCF of any two <strong>consecutive even numbers</strong> is always <strong>2</strong> — both share the prime factor 2.</p>
            </div>
          )}
        </div>
      </div>

      {/* ══ EXAMPLE 4 ══ */}
      <div className="rounded-2xl border-2 border-teal-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-teal-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center justify-between">
          <span>📘 Example 4</span>
          <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-mono">Real-world HCF</span>
        </div>
        <div className="p-5 space-y-5">
          {/* Problem */}
          <div className="rounded-xl bg-teal-50/80 dark:bg-teal-950/30 border border-teal-200 p-4 text-sm sm:text-base font-semibold text-teal-900 dark:text-teal-100">
            Two tankers contain <strong>450 litres</strong> and <strong>600 litres</strong> of petrol respectively.
            Find the maximum capacity of a container which can measure the petrol of either tanker
            an <em>exact</em> number of times.
          </div>

          <p className="text-sm font-semibold">
            <strong>Solution:</strong> The container must divide <strong>both</strong> 450 L and 600 L
            exactly → Find <strong>HCF (450, 600)</strong>.
          </p>

          {/* Prime factorisation tables */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "450", rows: [["2","450"],["3","225"],["3","75"],["5","25"],["5","5"],["","1"]], expr: "2 × 3² × 5²" },
              { n: "600", rows: [["2","600"],["2","300"],["2","150"],["3","75"],["5","25"],["5","5"],["","1"]], expr: "2³ × 3 × 5²" },
            ].map(({ n, rows, expr }) => (
              <div key={n} className="rounded-xl border-2 border-teal-300 p-3 bg-background shadow-sm">
                <p className="font-heading font-bold text-teal-800 dark:text-teal-300 mb-2 text-base">{n}</p>
                <table className="font-mono text-xs border-collapse w-full">
                  <tbody>
                    {rows.map(([d, q], i) => (
                      <tr key={i} className="border-b border-teal-100 last:border-0">
                        <td className="pr-2 text-right w-6 text-teal-700 font-bold">{d}</td>
                        <td className="px-1 text-muted-foreground">|</td>
                        <td className={`pl-1 ${q === "1" ? "font-bold text-teal-700" : "text-foreground/80"}`}>{q}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-muted-foreground pt-2">{n} = {expr}</p>
              </div>
            ))}
          </div>

          {/* HCF answer inputs */}
          <div className="rounded-xl bg-teal-50 dark:bg-teal-900/30 border border-teal-300 p-4 space-y-3">
            <p className="text-sm font-semibold">
              Common prime factors: <strong>2¹ × 3¹ × 5²</strong> = 2 × 3 × 25 = <strong>150</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="field-q_ex4_hcf" className="text-xs font-semibold text-teal-800 dark:text-teal-300">
                  HCF (450, 600) =
                </label>
                <Field id="q_ex4_hcf" placeholder="Enter HCF" correct={CORRECT.q_ex4_hcf} />
              </div>
              <div className="space-y-1">
                <label htmlFor="field-q_ex4_times" className="text-xs font-semibold text-teal-800 dark:text-teal-300">
                  Container measures 450 L how many times?
                </label>
                <Field id="q_ex4_times" placeholder="Enter number" correct={CORRECT.q_ex4_times} />
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border-2 border-green-400 p-4 font-semibold text-sm text-green-900 dark:text-green-200">
            ✅ Maximum capacity = <strong>150 litres</strong>
            &nbsp;(measures 450 L exactly <strong>3 times</strong> and 600 L exactly <strong>4 times</strong>).
          </div>
        </div>
      </div>

      {/* ══ EXERCISE 3.4 ══ */}
      <div className="rounded-2xl border-2 border-indigo-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-indigo-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span>✏️</span> Exercise 3.4
        </div>
        <div className="p-5 space-y-6">

          {/* Q1 */}
          <div className="space-y-3">
            <p className="font-semibold text-sm sm:text-base">
              <strong>1.</strong> Find the HCF of the following numbers:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: "q_ex_1i",   label: "(i)  18, 27, 36",       hint: "9" },
                { id: "q_ex_1ii",  label: "(ii) 20, 28, 36",       hint: "4" },
                { id: "q_ex_1iii", label: "(iii) 19, 15, 26",      hint: "1" },
                { id: "q_ex_1iv",  label: "(iv) 32, 56, 64, 128",  hint: "8" },
              ].map(({ id, label }) => (
                <div key={id} className="rounded-xl border border-indigo-200 bg-indigo-50/40 dark:bg-indigo-950/20 p-3 space-y-2">
                  <p className="text-sm font-semibold font-mono text-indigo-900 dark:text-indigo-200">{label}</p>
                  <Field id={id} placeholder="HCF = ?" correct={CORRECT[id]} />
                </div>
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 dark:bg-indigo-950/20 p-4 space-y-2">
            <p className="text-sm sm:text-base font-semibold">
              <strong>2.</strong> Find the largest number which is a factor of both <strong>504</strong> and <strong>792</strong>.
            </p>
            <p className="text-xs text-muted-foreground">
              504 = 2³ × 3² × 7 &nbsp;|&nbsp; 792 = 2³ × 3² × 11
            </p>
            <Field id="q_ex_2" placeholder="Largest common factor = ?" correct={CORRECT.q_ex_2} />
          </div>

          {/* Q3 */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 dark:bg-indigo-950/20 p-4 space-y-2">
            <p className="text-sm sm:text-base font-semibold">
              <strong>3.</strong> A room measures <strong>8 m 25 cm × 6 m 75 cm × 4 m 50 cm</strong>.
              Find the longest rod that can measure all three dimensions exactly.
            </p>
            <p className="text-xs text-muted-foreground">
              Convert to cm: 825, 675, 450 → HCF
            </p>
            <Field id="q_ex_3" placeholder="Length = ? cm" correct={CORRECT.q_ex_3} />
          </div>

          {/* Q4 */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 dark:bg-indigo-950/20 p-4 space-y-2">
            <p className="text-sm sm:text-base font-semibold">
              <strong>4.</strong> A student says HCF(4, 16) = 16. Is the answer correct? If not, what is the correct HCF?
            </p>
            <p className="text-xs text-muted-foreground">
              Remember: HCF cannot be larger than the smaller number.
            </p>
            <Field id="q_ex_4" placeholder="Yes / No — correct HCF?" correct={CORRECT.q_ex_4} isOpen />
          </div>

          {/* Q5 */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 dark:bg-indigo-950/20 p-4 space-y-2">
            <p className="text-sm sm:text-base font-semibold">
              <strong>5.</strong> What is the capacity of the largest vessel that can exactly fill
              three vessels of <strong>240 L</strong>, <strong>320 L</strong> and <strong>360 L</strong>?
            </p>
            <p className="text-xs text-muted-foreground">Find HCF(240, 320, 360).</p>
            <Field id="q_ex_5" placeholder="Capacity = ? litres" correct={CORRECT.q_ex_5} />
          </div>
        </div>
      </div>

      {/* ══ 3.5 COMMON MULTIPLES ══ */}
      <div className="rounded-2xl border-2 border-purple-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-purple-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono text-sm">3.5</span>
          Common Multiples
        </div>
        <div className="p-5 space-y-5">
          <p className="text-sm sm:text-base">
            A <strong>multiple</strong> of a number is the product of that number with any natural number (1, 2, 3, …).
            A <strong>common multiple</strong> is a multiple shared by two or more numbers.
          </p>

          {/* Multiples of 4 and 6 interactive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { base: 4, list: [4,8,12,16,20,24,28,32], id: "q_cm_4", label: "Multiples of 4" },
              { base: 6, list: [6,12,18,24,30,36],      id: "q_cm_6", label: "Multiples of 6" },
            ].map(({ base, list, id, label }) => (
              <div key={base} className="rounded-xl border-2 border-purple-300 bg-purple-50/60 dark:bg-purple-950/30 p-4 space-y-3">
                <p className="font-heading font-semibold text-purple-800 dark:text-purple-300">{label}:</p>
                <div className="flex flex-wrap gap-2">
                  {list.map((n) => {
                    const isCommon = n % 12 === 0;
                    return (
                      <span
                        key={n}
                        title={isCommon ? "Common multiple of 4 and 6!" : ""}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono border transition-all ${
                          isCommon
                            ? "bg-purple-500 text-white border-purple-600 shadow-md ring-2 ring-purple-300"
                            : "bg-purple-100 text-purple-800 border-purple-300"
                        }`}
                      >
                        {n}
                      </span>
                    );
                  })}
                  <span className="text-muted-foreground text-xs self-center">…</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-purple-700 dark:text-purple-400 font-semibold">
                    Write the first 5 multiples of {base}:
                  </p>
                  <Field id={id} placeholder={`${base}, ${base*2}, ${base*3}, …`} correct={CORRECT[id]} isOpen />
                </div>
              </div>
            ))}
          </div>

          {/* Common multiples highlight */}
          <div className="rounded-xl bg-purple-100 dark:bg-purple-900/40 border border-purple-300 p-4 space-y-3">
            <p className="font-heading font-semibold text-purple-900 dark:text-purple-200 text-sm sm:text-base">
              ✨ Common multiples of 4 and 6:
            </p>
            <div className="flex flex-wrap gap-2">
              {[12, 24, 36, 48, 60].map((n) => (
                <span
                  key={n}
                  className="px-3 py-1.5 rounded-full bg-purple-500 text-white text-sm font-bold font-mono shadow-sm"
                >
                  {n}
                </span>
              ))}
              <span className="text-muted-foreground text-sm self-center">…</span>
            </div>
            <p className="text-xs text-purple-700 dark:text-purple-300">
              Common multiples are <strong>12, 24, 36, …</strong> — all multiples of 12.
              The <em>smallest</em> common multiple = <strong>LCM(4, 6) = 12</strong>.
            </p>
          </div>

          {/* Key property */}
          <div className="rounded-xl border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/30 pl-4 py-3 pr-3 text-sm space-y-1">
            <p className="font-bold text-purple-800 dark:text-purple-300">Key Property:</p>
            <p>Every common multiple of two numbers is a multiple of their <strong>LCM</strong>.</p>
            <p className="text-purple-700 dark:text-purple-400">
              We will study <strong>LCM (Least Common Multiple)</strong> in the next section!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
