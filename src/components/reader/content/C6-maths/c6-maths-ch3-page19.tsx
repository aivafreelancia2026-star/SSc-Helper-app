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
  "q_try_palin",
  "q_try_div11",
  "q_ex_1i", "q_ex_1ii", "q_ex_1iii", "q_ex_1iv", "q_ex_1v",
  "q_ex_2i", "q_ex_2ii", "q_ex_2iii", "q_ex_2iv", "q_ex_2v",
  "q_ex_3i", "q_ex_3ii", "q_ex_3iii",
  "q_ex_4i_4", "q_ex_4i_8",
  "q_ex_4ii_4", "q_ex_4ii_8",
  "q_ex_4iii_4", "q_ex_4iii_8",
  "q_ex_5",
  "q_ex_6",
  "q_ex_7",
  "q_ex_8",
  "q_ex_9"
];

/* ─────────────────────────────────────────────
   Correct answers (normalised, lower-case)
───────────────────────────────────────────── */
const CORRECT: Record<string, string[]> = {
  q_try_palin: [], // validated via custom logic
  q_try_div11: ["yes", "y"],
  q_ex_1i: ["yes", "y"],
  q_ex_1ii: ["yes", "y"],
  q_ex_1iii: ["yes", "y"],
  q_ex_1iv: ["yes", "y"],
  q_ex_1v: ["no", "n"],
  q_ex_2i: ["no", "n"],
  q_ex_2ii: ["yes", "y"],
  q_ex_2iii: ["no", "n"],
  q_ex_2iv: ["yes", "y"],
  q_ex_2v: ["yes", "y"],
  q_ex_3i: ["no", "n"],
  q_ex_3ii: ["yes", "y"],
  q_ex_3iii: ["yes", "y"],
  q_ex_4i_4: ["yes", "y"],
  q_ex_4i_8: ["yes", "y"],
  q_ex_4ii_4: ["yes", "y"],
  q_ex_4ii_8: ["yes", "y"],
  q_ex_4iii_4: ["yes", "y"],
  q_ex_4iii_8: ["yes", "y"],
  q_ex_5: ["1", "one"],
  q_ex_6: ["1", "one"],
  q_ex_7: ["1001", "1012", "1089"], // open ended list
  q_ex_8: ["1243"],
  q_ex_9: ["104"],
};

/* ─────────────────────────────────────────────
   Reveal text shown when teacher presses Reveal
───────────────────────────────────────────── */
const REVEAL_TEXT: Record<string, string> = {
  q_try_palin: "123321 (or any 6 digit palindrome)",
  q_try_div11: "Yes",
  q_ex_1i: "Yes",
  q_ex_1ii: "Yes",
  q_ex_1iii: "Yes",
  q_ex_1iv: "Yes",
  q_ex_1v: "No",
  q_ex_2i: "No",
  q_ex_2ii: "Yes",
  q_ex_2iii: "No",
  q_ex_2iv: "Yes",
  q_ex_2v: "Yes",
  q_ex_3i: "No",
  q_ex_3ii: "Yes",
  q_ex_3iii: "Yes",
  q_ex_4i_4: "Yes",
  q_ex_4i_8: "Yes",
  q_ex_4ii_4: "Yes",
  q_ex_4ii_8: "Yes",
  q_ex_4iii_4: "Yes",
  q_ex_4iii_8: "Yes",
  q_ex_5: "1 (289279+1=289280. 280/8=35)",
  q_ex_6: "1 (1965-1=1964. 64/4=16)",
  q_ex_7: "1001, 1012, 1023, 1034, 1045, 1056, 1067, 1078, 1089",
  q_ex_8: "1243",
  q_ex_9: "104",
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
export function C6MathsCh3Page19() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch3-page19";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded]   = useState<Record<string, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number } | null>(null);

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
    
    if (id === "q_try_palin") {
      // 6 digit palindrome validation
      if (typed.length === 6 && /^\d+$/.test(typed)) {
        const rev = typed.split("").reverse().join("");
        correct = typed === rev;
      } else {
        correct = false;
      }
    } else if (id === "q_ex_7") {
      // open list of multiples of 11 between 1000 and 1100
      correct = typed.length >= 12 || typed.includes("1001") || typed.includes("1089");
    } else if (isOpen) {
      correct =
        correctAnswers.some((ans) => typed.includes(normalize(ans))) ||
        rawTyped.trim().length >= 4;
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
      <div className="relative w-full h-full min-h-[38px]">
        <input
          type="text"
          id={`field-${id}`}
          placeholder={placeholder}
          value={isRevealed ? REVEAL_TEXT[id] ?? "" : answers[id] ?? ""}
          onChange={(e) => handleChange(id, e.target.value)}
          onBlur={() => handleBlur(id, correct, isOpen)}
          disabled={isRevealed}
          className={`w-full h-full rounded-md sm:rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 pr-6 sm:pr-8 text-xs sm:text-sm font-mono outline-none transition-colors ${borderCls(id, answers, graded, isRevealed)}`}
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

      {/* Try These */}
      <div className="rounded-2xl border-2 border-emerald-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-emerald-600 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span>📝</span> Try These
        </div>
        <div className="p-5 bg-emerald-50/60 dark:bg-emerald-950/20 space-y-4">
          <p className="text-sm">
            1221 is a <strong>Palindrome number</strong>, which on reversing their digits gives the same number. 
            Thus, every Palindrome number with even number of digits, is always divisible by 11.
          </p>
          <div className="space-y-3 pt-3">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
              Write a Palindrome number of 6 digits and verify whether it is divisible by 11 or not?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <Field id="q_try_palin" placeholder="6-digit palindrome (e.g. 123321)" correct={CORRECT.q_try_palin} />
              </div>
              <div className="w-full sm:w-1/4 flex items-center gap-2">
                <span className="text-sm font-semibold">Divisible?</span>
                <div className="flex-1">
                  <Field id="q_try_div11" placeholder="Yes/No" correct={CORRECT.q_try_div11} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise 3.7 */}
      <div className="rounded-2xl border-2 border-indigo-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-indigo-700 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span>✏️</span> Exercise 3.7
        </div>
        <div className="p-5 space-y-8">
          
          {/* Q1 */}
          <div className="space-y-4">
            <p className="font-semibold text-sm sm:text-base text-indigo-900 dark:text-indigo-200">
              1. Which of the following numbers are divisible by 4?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { id: "q_ex_1i", label: "i) 572" },
                { id: "q_ex_1ii", label: "ii) 21,084" },
                { id: "q_ex_1iii", label: "iii) 14,560" },
                { id: "q_ex_1iv", label: "iv) 1,700" },
                { id: "q_ex_1v", label: "v) 2150" },
              ].map(({ id, label }) => (
                <div key={id} className="rounded-xl border border-indigo-200 bg-indigo-50/40 dark:bg-indigo-950/20 p-3 space-y-2">
                  <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-200">{label}</p>
                  <Field id={id} placeholder="Yes/No" correct={CORRECT[id]} />
                </div>
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div className="space-y-4 pt-4 border-t border-indigo-200 dark:border-indigo-800/50">
            <p className="font-semibold text-sm sm:text-base text-indigo-900 dark:text-indigo-200">
              2. Test whether the following numbers are divisible by 8?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { id: "q_ex_2i", label: "i) 9774" },
                { id: "q_ex_2ii", label: "ii) 5,31,048" },
                { id: "q_ex_2iii", label: "iii) 5500" },
                { id: "q_ex_2iv", label: "iv) 6136" },
                { id: "q_ex_2v", label: "v) 4152" },
              ].map(({ id, label }) => (
                <div key={id} className="rounded-xl border border-indigo-200 bg-indigo-50/40 dark:bg-indigo-950/20 p-3 space-y-2">
                  <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-200">{label}</p>
                  <Field id={id} placeholder="Yes/No" correct={CORRECT[id]} />
                </div>
              ))}
            </div>
          </div>

          {/* Q3 */}
          <div className="space-y-4 pt-4 border-t border-indigo-200 dark:border-indigo-800/50">
            <p className="font-semibold text-sm sm:text-base text-indigo-900 dark:text-indigo-200">
              3. Check whether the following numbers are divisible by 11?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "q_ex_3i", label: "i) 859484" },
                { id: "q_ex_3ii", label: "ii) 10824" },
                { id: "q_ex_3iii", label: "iii) 20801" },
              ].map(({ id, label }) => (
                <div key={id} className="rounded-xl border border-indigo-200 bg-indigo-50/40 dark:bg-indigo-950/20 p-3 space-y-2">
                  <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-200">{label}</p>
                  <Field id={id} placeholder="Yes/No" correct={CORRECT[id]} />
                </div>
              ))}
            </div>
          </div>

          {/* Q4 */}
          <div className="space-y-4 pt-4 border-t border-indigo-200 dark:border-indigo-800/50">
            <p className="font-semibold text-sm sm:text-base text-indigo-900 dark:text-indigo-200">
              4. Verify whether the following numbers are divisible by 4 and by 8?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { prefix: "q_ex_4i", label: "i) 2104" },
                { prefix: "q_ex_4ii", label: "ii) 726352" },
                { prefix: "q_ex_4iii", label: "iii) 1800" },
              ].map(({ prefix, label }) => (
                <div key={prefix} className="rounded-xl border border-indigo-200 bg-indigo-50/40 dark:bg-indigo-950/20 p-3 space-y-3">
                  <p className="text-sm font-bold text-indigo-900 dark:text-indigo-200 border-b border-indigo-200 dark:border-indigo-800 pb-1">{label}</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold">By 4:</span>
                    <div className="w-24"><Field id={`${prefix}_4`} placeholder="Y/N" correct={CORRECT[`${prefix}_4`]} /></div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold">By 8:</span>
                    <div className="w-24"><Field id={`${prefix}_8`} placeholder="Y/N" correct={CORRECT[`${prefix}_8`]} /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Q5 - Q9 */}
          <div className="space-y-6 pt-4 border-t border-indigo-200 dark:border-indigo-800/50">
            
            <div className="space-y-2">
              <p className="text-sm font-semibold">5. Find the smallest number that must be added to 289279, so that it is divisible by 8?</p>
              <div className="w-full sm:w-1/3"><Field id="q_ex_5" placeholder="Smallest number = ?" correct={CORRECT.q_ex_5} /></div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">6. Find the smallest number that can be subtracted from 1965, so that it becomes divisible by 4?</p>
              <div className="w-full sm:w-1/3"><Field id="q_ex_6" placeholder="Smallest number = ?" correct={CORRECT.q_ex_6} /></div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">7. Write all the possible numbers between 1000 and 1100, that are divisible by 11?</p>
              <div className="w-full"><Field id="q_ex_7" placeholder="e.g. 1001, 1012..." correct={CORRECT.q_ex_7} isOpen /></div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">8. Write the nearest number to 1240 which is divisible by 11?</p>
              <div className="w-full sm:w-1/3"><Field id="q_ex_8" placeholder="Nearest number = ?" correct={CORRECT.q_ex_8} /></div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">9. Write the nearest number to 105 which is divisible by 4?</p>
              <div className="w-full sm:w-1/3"><Field id="q_ex_9" placeholder="Nearest number = ?" correct={CORRECT.q_ex_9} /></div>
            </div>

          </div>
        </div>
      </div>

      {/* What Have We Discussed */}
      <div className="rounded-2xl border-2 border-teal-500/40 overflow-hidden shadow-sm bg-card">
        <div className="bg-teal-600 text-white font-heading font-bold px-5 py-3 text-lg flex items-center gap-3">
          <span>🧠</span> What Have We Discussed?
        </div>
        <div className="p-5 text-sm sm:text-base space-y-4 bg-teal-50/30 dark:bg-teal-950/10">
          <p>
            <strong>1.</strong> We have discussed multiples, divisors, factors and have seen how to identify factors and multiples.
          </p>
          <div className="space-y-2">
            <p><strong>2.</strong> We have discussed the following:</p>
            <ul className="list-none space-y-2 pl-4">
              <li className="flex gap-2"><span>i)</span> <span>A factor of a number is an exact divisor of that number.</span></li>
              <li className="flex gap-2"><span>ii)</span> <span>Every number is a factor of itself. 1 is a factor of every number.</span></li>
              <li className="flex gap-2"><span>iii)</span> <span>Every factor of a number is less than or equal to the given number.</span></li>
              <li className="flex gap-2"><span>iv)</span> <span>Every number is a multiple of each of its factors.</span></li>
              <li className="flex gap-2"><span>v)</span> <span>Every multiple of a given number is greater than or equal to that number.</span></li>
              <li className="flex gap-2"><span>vi)</span> <span>Every number is a multiple of itself.</span></li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
