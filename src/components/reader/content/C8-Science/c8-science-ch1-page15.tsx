"use client";

import React, { useState, useEffect } from "react";
import { useScore } from "@/components/score-provider";
import { useSearchParams } from "next/navigation";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

type Table3Item = {
  sno: number;
  action: string;
  correctAnswers: string[];
  displayHint: string;
};

const TABLE3_ITEMS: Table3Item[] = [
  { sno: 1, action: "Stretching rubber band", correctAnswers: ["t", "temporary", "temp"], displayHint: "Temporary (T)" },
  { sno: 2, action: "Squeezing sponge", correctAnswers: ["t", "temporary", "temp"], displayHint: "Temporary (T)" },
  { sno: 3, action: "Tearing paper", correctAnswers: ["p", "permanent", "perm"], displayHint: "Permanent (P)" },
  { sno: 4, action: "Breaking piece of chalk", correctAnswers: ["p", "permanent", "perm"], displayHint: "Permanent (P)" },
  { sno: 5, action: "Making chapathi", correctAnswers: ["p", "permanent", "perm"], displayHint: "Permanent (P)" },
  { sno: 6, action: "Breaking glass", correctAnswers: ["p", "permanent", "perm"], displayHint: "Permanent (P)" },
];

export function C8ScienceCh1Page15() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [graded, setGraded] = useState<Record<number, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number } | null>(null);

  const storageKeyPrefix = "c8-science-ch1-table3";

  useEffect(() => {
    const savedAnswers: Record<number, string> = {};
    const savedGraded: Record<number, { value: string; correct: boolean }> = {};

    TABLE3_ITEMS.forEach((item) => {
      const ans = localStorage.getItem(`${storageKeyPrefix}-${item.sno}-ans`);
      if (ans) savedAnswers[item.sno] = ans;

      const gr = localStorage.getItem(`${storageKeyPrefix}-${item.sno}-gr`);
      if (gr) {
        try {
          savedGraded[item.sno] = JSON.parse(gr);
        } catch {}
      }
    });

    setAnswers(savedAnswers);
    setGraded(savedGraded);
  }, []);

  useEffect(() => {
    function handleReset() {
      const resetAnswers: Record<number, string> = {};
      TABLE3_ITEMS.forEach((item) => {
        localStorage.removeItem(`${storageKeyPrefix}-${item.sno}-ans`);
        localStorage.removeItem(`${storageKeyPrefix}-${item.sno}-gr`);
        resetAnswers[item.sno] = "";
      });
      setAnswers(resetAnswers);
      setGraded({});
    }
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () => window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, []);

  const handleChange = (sno: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [sno]: val }));
    localStorage.setItem(`${storageKeyPrefix}-${sno}-ans`, val);
  };

  const handleBlur = (item: Table3Item) => {
    if (isRevealed) return;
    const typed = (answers[item.sno] ?? "").trim().toLowerCase();
    if (!typed) return;

    const prev = graded[item.sno];
    if (prev && prev.value === typed) return;

    const correct = item.correctAnswers.some((a) => a === typed || typed.startsWith(a));
    addPoints(correct ? 1 : -1);
    setFeedback({ correct, id: Date.now() });

    const newGraded = { ...graded, [item.sno]: { value: typed, correct } };
    setGraded(newGraded);
    localStorage.setItem(`${storageKeyPrefix}-${item.sno}-gr`, JSON.stringify({ value: typed, correct }));
  };

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {feedback !== null && (
        <AnswerFeedback key={feedback.id} correct={feedback.correct} onDone={() => setFeedback(null)} />
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Table 3 and 1.9 Pressure intro */}
        <div className="space-y-4 text-justify">
          <p className="text-xs italic text-foreground/80">
            Mark &lsquo;T&rsquo; for temporary change and mark &lsquo;P&rsquo; for permanent change in the second column.
          </p>

          <div className="space-y-1">
            <h3 className="font-heading text-sm font-bold text-fuchsia-950 text-center">
              Table 3
            </h3>
          </div>

          {/* Interactive Table 3 */}
          <div className="overflow-x-auto rounded-2xl border-2 border-fuchsia-200 bg-white shadow-sm">
            <table className="min-w-full border-collapse text-left text-xs font-body">
              <thead>
                <tr className="bg-fuchsia-200/80 text-fuchsia-950 font-heading font-bold uppercase">
                  <th className="border-b border-fuchsia-300 px-3 py-2.5">Action of force</th>
                  <th className="border-b border-l border-fuchsia-300 px-3 py-2.5 text-center w-36">
                    Change in shape [temporary (T)/ permanent(P)]
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-fuchsia-100 font-medium">
                {TABLE3_ITEMS.map((item) => {
                  const val = answers[item.sno] ?? "";
                  const gr = graded[item.sno];
                  const isCorrect = gr?.value === val.trim().toLowerCase() ? gr?.correct : null;

                  return (
                    <tr key={item.sno} className="hover:bg-fuchsia-50/30 transition-colors">
                      <td className="px-3 py-2 text-foreground/90 font-semibold">
                        {item.action}
                      </td>
                      <td className="border-l border-fuchsia-100 px-2.5 py-1.5 text-center">
                        <div className="relative">
                          <input
                            type="text"
                            value={val}
                            onChange={(e) => handleChange(item.sno, e.target.value)}
                            onBlur={() => handleBlur(item)}
                            placeholder={isRevealed ? item.displayHint : "T or P"}
                            className={`w-full rounded-lg border px-2 py-1 text-center text-xs font-bold transition-all focus:outline-none ${
                              isRevealed
                                ? "border-fuchsia-400 bg-fuchsia-50/50 text-fuchsia-900"
                                : isCorrect === true
                                ? "border-green-500 bg-green-50 text-green-700"
                                : isCorrect === false
                                ? "border-destructive bg-destructive/5 text-destructive"
                                : "border-fuchsia-200 bg-fuchsia-50/20 text-foreground focus:border-fuchsia-500 focus:bg-white"
                            }`}
                          />
                          {isCorrect === true && !isRevealed && (
                            <span className="absolute right-1.5 top-1 text-green-600 font-bold text-[11px]">✓</span>
                          )}
                          {isCorrect === false && !isRevealed && (
                            <span className="absolute right-1.5 top-1 text-destructive font-bold text-[11px]">✗</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-xs">
            From the above table we can understand that a force not only changes the state of motion of an object but can also change the shape of an object. It may change the shape temporarily or permanently, based on the nature of the object and the force applied on it.
          </p>

          {/* Section 1.9 Pressure */}
          <div className="pt-2 border-t border-sky-200/60 space-y-3">
            <h2 className="font-heading text-base font-bold text-sky-950">
              1.9 Pressure
            </h2>

            {/* Activity-14 Box */}
            <div className="rounded-[18px] border border-sky-200 bg-sky-50/40 p-4 shadow-sm space-y-2">
              <div className="inline-block rounded-full bg-sky-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
                Activity-14
              </div>
              <h3 className="font-heading text-sm font-bold text-sky-950">
                Change in effect of force with area of contact
              </h3>
              <p className="text-xs leading-relaxed text-foreground/85">
                Take a pencil. Just push its rounded end on your palm. Now push from the other side of the pencil gently so that the sharp end is on your palm. What difference did you experience? Why?
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Fig-18, Pressure Definition & Activity-15 */}
        <div className="space-y-4 text-justify">
          {/* Fig-18 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-white p-2.5 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch1_fig18.png"
              alt="Fig 18 Pencil rounded vs sharp end on palm"
              className="h-28 w-auto object-contain rounded"
            />
            <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
              Fig-18
            </span>
          </div>

          <ul className="rounded-xl border border-sky-200 bg-sky-50/40 p-3 text-xs text-sky-950 font-semibold list-disc list-inside space-y-1">
            <li>Why do people who carry weights on their heads wear a turban?</li>
            <li>Why school bags and shopping bags have wide belts?</li>
            <li>Did you ever think why trucks that carry more weight have broader tyres?</li>
          </ul>

          <p className="text-xs">
            In these examples you might have noticed that the effect of force depends on the area of contact on which the force is acting. When there is a decrease in the area of contact of the force or load then the effect of force increases and vice versa.
          </p>

          <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50/70 p-3.5 space-y-1 text-xs">
            <p className="text-emerald-950">
              The force acting perpendicularly on unit area of a surface is called <strong className="font-bold">pressure</strong>.
            </p>
            <p className="font-mono font-bold text-center text-emerald-950 pt-1">
              Pressure = Force / Area
            </p>
            <p className="text-center text-[11px] text-emerald-900">
              The unit of pressure in S.I. system is <span className="font-bold">Newton/meter²</span> or <span className="font-bold">N/m²</span>.
            </p>
          </div>

          {/* Activity-15 */}
          <div className="rounded-[18px] border border-fuchsia-200 bg-fuchsia-50/40 p-4 shadow-sm space-y-2">
            <div className="inline-block rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              Activity-15
            </div>
            <h3 className="font-heading text-sm font-bold text-fuchsia-950">
              Identifying effects of force
            </h3>
            <p className="text-xs leading-relaxed text-foreground/85">
              Take two trays. Fill both the trays with lime powder or fine sand. Now take two rectangular bricks of equal mass and similar shape.
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">15</span>
      </div>
    </div>
  );
}
