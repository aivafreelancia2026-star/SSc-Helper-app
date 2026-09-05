"use client";

import React, { useState, useEffect } from "react";
import { useScore } from "@/components/score-provider";
import { useSearchParams } from "next/navigation";
import { AnswerFeedback } from "@/components/reader/answer-feedback";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

type TableItem = {
  sno: number;
  action: string;
  imgSrc: string;
  correctAnswers: string[];
  placeholder: string;
  displayHint: string;
};

const TABLE_ITEMS: TableItem[] = [
  {
    sno: 1,
    action: "Digging bore well",
    imgSrc: "/assets/images/C8-Science/ch1_table1_1.png",
    correctAnswers: ["both", "push and pull", "push", "pull"],
    placeholder: "Push / Pull / Both",
    displayHint: "Both (Push & Pull)",
  },
  {
    sno: 2,
    action: "Sipping Juice with a straw",
    imgSrc: "/assets/images/C8-Science/ch1_table1_2.png",
    correctAnswers: ["pull", "pulling"],
    placeholder: "Push / Pull / Both",
    displayHint: "Pull",
  },
  {
    sno: 3,
    action: "Erasing letters on blackboard with duster",
    imgSrc: "/assets/images/C8-Science/ch1_table1_3.png",
    correctAnswers: ["both", "push and pull", "push", "pull"],
    placeholder: "Push / Pull / Both",
    displayHint: "Both (Push & Pull)",
  },
  {
    sno: 4,
    action: "A magnet attracting nails",
    imgSrc: "/assets/images/C8-Science/ch1_table1_4.png",
    correctAnswers: ["pull", "pulling", "attraction"],
    placeholder: "Push / Pull / Both",
    displayHint: "Pull",
  },
  {
    sno: 5,
    action: "Fruits falling from tree",
    imgSrc: "/assets/images/C8-Science/ch1_table1_5.png",
    correctAnswers: ["pull", "pulling", "gravity pull"],
    placeholder: "Push / Pull / Both",
    displayHint: "Pull (Gravity)",
  },
  {
    sno: 6,
    action: "Hoisting a flag",
    imgSrc: "/assets/images/C8-Science/ch1_table1_6.png",
    correctAnswers: ["pull", "pulling", "both"],
    placeholder: "Push / Pull / Both",
    displayHint: "Pull",
  },
];

export function C8ScienceCh1Page2() {
  const { addPoints } = useScore();
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [graded, setGraded] = useState<Record<number, { value: string; correct: boolean }>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean; id: number } | null>(null);

  const storageKeyPrefix = "c8-science-ch1-table1";

  useEffect(() => {
    const savedAnswers: Record<number, string> = {};
    const savedGraded: Record<number, { value: string; correct: boolean }> = {};

    TABLE_ITEMS.forEach((item) => {
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
      TABLE_ITEMS.forEach((item) => {
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

  const handleBlur = (item: TableItem) => {
    if (isRevealed) return;
    const typed = (answers[item.sno] ?? "").trim().toLowerCase();
    if (!typed) return;

    const prev = graded[item.sno];
    if (prev && prev.value === typed) return;

    const correct = item.correctAnswers.some((a) => typed.includes(a));
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

      {/* Table Title */}
      <div className="space-y-1">
        <h2 className="font-heading text-base font-bold text-fuchsia-950">
          Table 1: Identify tasks as Push or Pull or Both
        </h2>
        <p className="text-xs text-foreground/60">
          Observe each diagram and classify the effort as Push, Pull, or Both.
        </p>
      </div>

      {/* Interactive Table with Cropped Diagrams */}
      <div className="overflow-x-auto rounded-2xl border-2 border-fuchsia-200 bg-white shadow-sm">
        <table className="min-w-full border-collapse text-left text-sm font-body">
          <thead>
            <tr className="bg-fuchsia-200/80 text-fuchsia-950 font-heading font-bold text-xs uppercase tracking-wider">
              <th className="border-b border-fuchsia-300 px-3 py-3 text-center w-14">S.No.</th>
              <th className="border-b border-l border-fuchsia-300 px-4 py-3">Action</th>
              <th className="border-b border-l border-fuchsia-300 px-4 py-3 text-center w-36">Diagram</th>
              <th className="border-b border-l border-fuchsia-300 px-4 py-3 text-center w-48">Push/Pull/Both</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-fuchsia-100 font-medium">
            {TABLE_ITEMS.map((item) => {
              const val = answers[item.sno] ?? "";
              const gr = graded[item.sno];
              const isCorrect = gr?.value === val.trim().toLowerCase() ? gr?.correct : null;

              return (
                <tr key={item.sno} className="hover:bg-fuchsia-50/30 transition-colors">
                  <td className="px-3 py-3 text-center font-bold text-fuchsia-950">
                    {item.sno}
                  </td>
                  <td className="border-l border-fuchsia-100 px-4 py-3 text-foreground/90 font-semibold">
                    {item.action}
                  </td>
                  <td className="border-l border-fuchsia-100 px-4 py-2 text-center">
                    <div className="flex justify-center">
                      <div className="rounded-lg border border-fuchsia-200 bg-fuchsia-50/40 p-1 shadow-2xs">
                        <img
                          src={item.imgSrc}
                          alt={item.action}
                          className="h-12 w-auto object-contain rounded"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="border-l border-fuchsia-100 px-4 py-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => handleChange(item.sno, e.target.value)}
                        onBlur={() => handleBlur(item)}
                        placeholder={item.placeholder}
                        className={`w-full rounded-xl border px-3 py-1.5 text-center text-xs font-semibold transition-all focus:outline-none ${
                          isRevealed
                            ? "border-fuchsia-400 bg-fuchsia-50/50 text-fuchsia-900"
                            : isCorrect === true
                            ? "border-green-500 bg-green-50 text-green-700"
                            : isCorrect === false
                            ? "border-destructive bg-destructive/5 text-destructive"
                            : "border-fuchsia-200 bg-fuchsia-50/20 text-foreground focus:border-fuchsia-500 focus:bg-white focus:ring-2 focus:ring-fuchsia-500/20"
                        }`}
                      />
                      {isRevealed && (
                        <span className="block text-[10px] text-center font-bold text-fuchsia-800 mt-1">
                          {item.displayHint}
                        </span>
                      )}
                      {isCorrect === true && !isRevealed && (
                        <span className="absolute right-2 top-2 text-green-600 font-bold text-xs">✓</span>
                      )}
                      {isCorrect === false && !isRevealed && (
                        <span className="absolute right-2 top-2 text-destructive font-bold text-xs">✗</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Discussion & Concept Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start pt-2">
        {/* Left Column Questions */}
        <div className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50/40 p-4 shadow-sm space-y-3">
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-fuchsia-950">
            Think & Reflect
          </h3>
          <ul className="space-y-2 text-xs leading-relaxed text-foreground/85 list-disc list-inside">
            <li>List three more activities where we exert force which appears as a push.</li>
            <li>List three more activities where we exert a force as a pull.</li>
            <li>State three actions which involve both push and pull.</li>
          </ul>
        </div>

        {/* Right Column Definition Callout */}
        <div className="rounded-2xl border-2 border-sky-200 bg-sky-50/50 p-4 shadow-sm space-y-3">
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-sky-950">
            Concept: Definition of Force
          </h3>
          <p className="text-xs leading-relaxed text-foreground/85">
            Based on this activity, can you explain what is a force?
          </p>
          <div className="rounded-xl border border-sky-300 bg-white p-3 text-xs font-semibold text-sky-900 shadow-2xs">
            Shall we call the effort done on an object by means of pushing or pulling as a force exerted on the object?
          </div>
          <p className="text-xs leading-relaxed text-foreground/75 italic">
            We cannot directly see the forces acting on a body, but we can see the effects caused due to the forces.
          </p>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">2</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
      </div>
    </div>
  );
}
