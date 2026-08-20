"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useScore } from "@/components/score-provider";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

const Q_MILLIGRAMS = { id: "q_mg", ans: ["10,00,000", "1000000", "1,000,000"] };
const Q_MILLILITRES = { id: "q_ml", ans: ["10,00,000", "1000000", "1,000,000"] };

const TRY_THESE = [
  { id: "tt_3_g", ans: ["2000", "2,000"] },
  { id: "tt_3_kg", ans: "2" },
  { id: "tt_4_kl", ans: "20" },
  { id: "tt_4_ml", ans: ["20000000", "2,00,00,000", "20,000,000"] },
];

export function C6MathsCh1Page12() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";
  const storageKey = "c6-maths-ch1-page12";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState<
    Record<string, { value: string; correct: boolean }>
  >({});
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    id: number;
  } | null>(null);

  const ALL_QUESTIONS = [
    Q_MILLIGRAMS, Q_MILLILITRES,
    ...TRY_THESE,
    { id: "tt_1_towns", ans: [] },
    { id: "tt_2_mg", ans: [] }
  ];

  useEffect(() => {
    const saved: Record<string, string> = {};
    const savedG: Record<string, { value: string; correct: boolean }> = {};
    
    ALL_QUESTIONS.forEach((q) => {
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
      ALL_QUESTIONS.forEach((q) => {
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

  const handleBlur = (id: string, correctAnswers: string | string[]) => {
    if (isRevealed) return;
    const typed = (answers[id] ?? "").trim();
    if (!typed) return;
    
    // Normalizer: lowercase and remove all spaces/commas for comparison
    const normalize = (s: string) => s.toLowerCase().replace(/[\s,]+/g, "");
    const normalizedTyped = normalize(typed);
    
    const prev = graded[id];
    if (prev && prev.value === normalizedTyped) return;

    // For open-ended questions (empty ans array) we don't grade
    if (Array.isArray(correctAnswers) && correctAnswers.length === 0) return;

    const correctArray = Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers];
    const correct = correctArray.some(
      (a) => normalize(a) === normalizedTyped
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
    const next = { ...graded, [id]: { value: normalizedTyped, correct } };
    setGraded(next);
    localStorage.setItem(
      `${storageKey}-${id}-graded`,
      JSON.stringify({ value: normalizedTyped, correct })
    );
  };

  function inputClass(id: string): string {
    const typed = (answers[id] ?? "").trim();
    if (!typed && !isRevealed) return "border-border/60 focus:border-primary";
    
    const normalize = (s: string) => s.toLowerCase().replace(/[\s,]+/g, "");
    const g = graded[id];
    const isCorrect = g && g.value === normalize(typed) ? g.correct : null;
    
    // Open-ended questions
    const q = ALL_QUESTIONS.find(q => q.id === id);
    if (q && Array.isArray(q.ans) && q.ans.length === 0) {
      return "border-border/60 focus:border-primary bg-white";
    }

    if (isRevealed) return "border-primary bg-primary/5 font-bold text-primary";
    if (isCorrect === true)
      return "border-green-500 bg-green-50 text-green-700 font-bold";
    if (isCorrect === false)
      return "border-destructive bg-destructive/5 text-destructive";
    return "border-border/60 focus:border-primary";
  }

  function badge(id: string, noAbsolute = false) {
    const typed = (answers[id] ?? "").trim();
    if (!typed && !isRevealed) return null;

    // Open-ended questions
    const q = ALL_QUESTIONS.find(q => q.id === id);
    if (q && Array.isArray(q.ans) && q.ans.length === 0) return null;

    const normalize = (s: string) => s.toLowerCase().replace(/[\s,]+/g, "");
    const g = graded[id];
    const isCorrect = g && g.value === normalize(typed) ? g.correct : null;
    
    if (isRevealed) return null;
    if (isCorrect === true)
      return (
        <span className={noAbsolute ? "text-green-600 font-bold text-xs" : "absolute right-2 top-1/2 -translate-y-1/2 text-green-600 font-bold text-xs"}>
          ✓
        </span>
      );
    if (isCorrect === false)
      return (
        <span className={noAbsolute ? "text-destructive font-bold text-xs" : "absolute right-2 top-1/2 -translate-y-1/2 text-destructive font-bold text-xs"}>
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

      {/* ── 1.7 LARGE NUMBERS USED IN DAILY LIFE SITUATIONS ─── */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-1.5 rounded-r-full -ml-4 shadow-sm">
          <span className="font-bold">1.7</span>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider">
            Large Numbers used in Daily Life Situations
          </h2>
        </div>

        <p className="mt-4">
          We know that we use <strong>meter (m)</strong> as unit of length, <strong>kilogram (kg)</strong> as a unit of weight and <strong>litre (l)</strong> as a unit of volume of liquids and <strong>second (s)</strong> as a unit of time.
        </p>

        <p>
          For example, in the case of length or distance, we use centimeter for measuring the length of a pencil as it is small, meter for measuring length of a cloth and kilometer (km) for measuring distance between two places. But for measuring the thickness of a paper, even centimeter is too big. So we use <strong>millimeter (mm)</strong> in this case.
        </p>

        <p className="font-medium text-foreground/80">
          Since there is a relationship between all of them we need to know about this conversion and convenient usage.
        </p>
      </div>

      {/* ── Conversion Table ─────────────────────────── */}
      <div className="flex justify-center my-6">
        <div className="grid grid-cols-[auto_auto_auto] gap-x-6 gap-y-3 font-mono text-sm bg-teal-50 p-5 rounded-xl border border-teal-200 text-teal-900 shadow-sm">
          <div className="text-right font-medium">10 millimeters</div>
          <div className="text-center">=</div>
          <div className="text-left font-bold">1 centimeter</div>

          <div className="text-right font-medium">100 centimeters</div>
          <div className="text-center">=</div>
          <div className="text-left font-bold">1 meter</div>

          <div className="text-right font-medium">1000 meters</div>
          <div className="text-center">=</div>
          <div className="text-left font-bold">1 kilometer</div>
        </div>
      </div>

      {/* ── Example Calculation ──────────────────────── */}
      <div className="space-y-3 pl-4 border-l-4 border-emerald-300">
        <p className="font-semibold text-emerald-900">How would you calculate the number of millimeters in 1 kilometer?</p>
        <div className="font-mono text-sm space-y-1 text-emerald-800">
          <div className="grid grid-cols-[60px_auto] gap-4">
            <div className="text-right">1 km</div>
            <div>= 1000m</div>
          </div>
          <div className="grid grid-cols-[60px_auto] gap-4">
            <div></div>
            <div>= 1000 × 100 cm</div>
          </div>
          <div className="grid grid-cols-[60px_auto] gap-4">
            <div></div>
            <div>= 1000 × 100 × 10 mm</div>
          </div>
          <div className="grid grid-cols-[60px_auto] gap-4">
            <div></div>
            <div className="font-bold text-base mt-2 border-t border-emerald-200 pt-2 inline-block">
              = 10,00,000 mm
            </div>
          </div>
        </div>
      </div>

      {/* ── Grams & Kilograms ────────────────────────── */}
      <div className="space-y-4 pt-4">
        <p>
          In the same way we buy rice or wheat in kilograms. But items like spices, chillipowder, haldi etc. which we do not need in large quantities, are bought in <strong>grams (g)</strong>.
        </p>
        <div className="flex justify-center my-4">
          <div className="bg-amber-50 px-6 py-2 rounded-lg border border-amber-200 font-mono font-bold text-amber-900">
            1000 g = 1 kg
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
          <p className="font-medium text-amber-900 flex-1">Can you calculate the number of milli grams in 1 kg?</p>
          <div className="relative w-[150px]">
            <input
              type="text"
              value={isRevealed ? Q_MILLIGRAMS.ans[0] : (answers[Q_MILLIGRAMS.id] ?? "")}
              disabled={isRevealed}
              onChange={(e) => handleChange(Q_MILLIGRAMS.id, e.target.value)}
              onBlur={() => handleBlur(Q_MILLIGRAMS.id, Q_MILLIGRAMS.ans)}
              placeholder="e.g. 10,00,000"
              className={`w-full rounded-[6px] border px-3 py-1.5 text-sm font-mono text-center focus:outline-none transition-all shadow-sm ${inputClass(Q_MILLIGRAMS.id)}`}
            />
            {badge(Q_MILLIGRAMS.id)}
          </div>
        </div>
      </div>

      {/* ── Litres & Kilolitres ──────────────────────── */}
      <div className="space-y-4 pt-4">
        <p>
          A bucket normally holds 20 litres of water. But some times we need a smaller unit, the <strong>millilitres</strong>. A bottle of hair oil, painting colour in millilitres (ml) and oil tankers, water in reservoirs are marked with <strong>kilolitres (kl)</strong>.
        </p>
        <div className="flex justify-center my-4">
          <div className="bg-blue-50 px-6 py-2 rounded-lg border border-blue-200 font-mono font-bold text-blue-900">
            1000 litres = 1 kilo litre
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
          <p className="font-medium text-blue-900 flex-1">How many milli litres will make 1 kilo litre?</p>
          <div className="relative w-[150px]">
            <input
              type="text"
              value={isRevealed ? Q_MILLILITRES.ans[0] : (answers[Q_MILLILITRES.id] ?? "")}
              disabled={isRevealed}
              onChange={(e) => handleChange(Q_MILLILITRES.id, e.target.value)}
              onBlur={() => handleBlur(Q_MILLILITRES.id, Q_MILLILITRES.ans)}
              placeholder="e.g. 10,00,000"
              className={`w-full rounded-[6px] border px-3 py-1.5 text-sm font-mono text-center focus:outline-none transition-all shadow-sm ${inputClass(Q_MILLILITRES.id)}`}
            />
            {badge(Q_MILLILITRES.id)}
          </div>
        </div>
      </div>

      {/* ── TRY THESE ────────────────────────────── */}
      <div className="rounded-[16px] border-2 border-emerald-500 overflow-hidden shadow-sm mt-8">
        <div className="bg-emerald-600 px-4 py-2 flex items-center gap-2">
          <span className="text-white text-lg">✏️</span>
          <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
            TRY THESE
          </h2>
        </div>
        <div className="bg-emerald-50/40 p-5 space-y-8">
          <ol className="list-decimal pl-5 space-y-8 font-medium text-emerald-900">
            {/* Q1 */}
            <li className="space-y-3">
              <p>Name four important towns in your district. Note the distance between them in km. Express these in centimeters and millimeters.</p>
              <textarea 
                value={answers["tt_1_towns"] ?? ""}
                onChange={(e) => handleChange("tt_1_towns", e.target.value)}
                onBlur={() => handleBlur("tt_1_towns", [])}
                className="w-full rounded-[8px] border border-emerald-200 bg-white p-3 text-sm focus:outline-none focus:border-emerald-500 shadow-sm resize-none h-28 font-normal"
                placeholder="Write your calculations here..."
              ></textarea>
            </li>

            {/* Q2 */}
            <li className="space-y-3">
              <p>Can you tell where we use milligrams?</p>
              <textarea 
                value={answers["tt_2_mg"] ?? ""}
                onChange={(e) => handleChange("tt_2_mg", e.target.value)}
                onBlur={() => handleBlur("tt_2_mg", [])}
                className="w-full rounded-[8px] border border-emerald-200 bg-white p-3 text-sm focus:outline-none focus:border-emerald-500 shadow-sm resize-none h-20 font-normal"
                placeholder="Examples of things measured in milligrams..."
              ></textarea>
            </li>

            {/* Q3 */}
            <li className="space-y-4">
              <p>A box contains 1,00,000 tablets (medicine) each weighing 20 mg. What is the weight of all the tablets in the box in both grams and kilograms?</p>
              
              <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-emerald-200 font-normal">
                <div className="flex-1 space-y-2">
                  <label className="text-xs font-semibold text-emerald-700">Weight in Grams (g)</label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={isRevealed ? TRY_THESE[0].ans[0] : (answers[TRY_THESE[0].id] ?? "")}
                      disabled={isRevealed}
                      onChange={(e) => handleChange(TRY_THESE[0].id, e.target.value)}
                      onBlur={() => handleBlur(TRY_THESE[0].id, TRY_THESE[0].ans)}
                      className={`w-full rounded-[6px] border px-3 py-2 text-sm font-mono focus:outline-none transition-all ${inputClass(TRY_THESE[0].id)}`}
                      placeholder="e.g. 2,000"
                    />
                    {badge(TRY_THESE[0].id)}
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  <label className="text-xs font-semibold text-emerald-700">Weight in Kilograms (kg)</label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={isRevealed ? (TRY_THESE[1].ans as string) : (answers[TRY_THESE[1].id] ?? "")}
                      disabled={isRevealed}
                      onChange={(e) => handleChange(TRY_THESE[1].id, e.target.value)}
                      onBlur={() => handleBlur(TRY_THESE[1].id, TRY_THESE[1].ans)}
                      className={`w-full rounded-[6px] border px-3 py-2 text-sm font-mono focus:outline-none transition-all ${inputClass(TRY_THESE[1].id)}`}
                      placeholder="e.g. 2"
                    />
                    {badge(TRY_THESE[1].id)}
                  </div>
                </div>
              </div>
            </li>

            {/* Q4 */}
            <li className="space-y-4">
              <p>A petrol tanker contains 20,000 litres of petrol. Express the quantity of petrol in kilolitres and millilitres.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-emerald-200 font-normal">
                <div className="flex-1 space-y-2">
                  <label className="text-xs font-semibold text-emerald-700">Quantity in Kilolitres (kl)</label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={isRevealed ? (TRY_THESE[2].ans as string) : (answers[TRY_THESE[2].id] ?? "")}
                      disabled={isRevealed}
                      onChange={(e) => handleChange(TRY_THESE[2].id, e.target.value)}
                      onBlur={() => handleBlur(TRY_THESE[2].id, TRY_THESE[2].ans)}
                      className={`w-full rounded-[6px] border px-3 py-2 text-sm font-mono focus:outline-none transition-all ${inputClass(TRY_THESE[2].id)}`}
                      placeholder="e.g. 20"
                    />
                    {badge(TRY_THESE[2].id)}
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  <label className="text-xs font-semibold text-emerald-700">Quantity in Millilitres (ml)</label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={isRevealed ? TRY_THESE[3].ans[0] : (answers[TRY_THESE[3].id] ?? "")}
                      disabled={isRevealed}
                      onChange={(e) => handleChange(TRY_THESE[3].id, e.target.value)}
                      onBlur={() => handleBlur(TRY_THESE[3].id, TRY_THESE[3].ans)}
                      className={`w-full rounded-[6px] border px-3 py-2 text-sm font-mono focus:outline-none transition-all ${inputClass(TRY_THESE[3].id)}`}
                      placeholder="e.g. 20,000,000"
                    />
                    {badge(TRY_THESE[3].id)}
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* ── Footer banner ────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 text-sm font-bold text-white mt-8"
        style={{
          background: "linear-gradient(90deg, #16a34a 0%, #22c55e 100%)",
        }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-green-600 text-xs font-extrabold mr-3">
          12
        </span>
        <span className="tracking-wide flex-1 text-center">Government's Gift for Students' Progress</span>
      </div>
    </div>
  );
}
