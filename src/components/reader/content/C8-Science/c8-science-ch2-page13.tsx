"use client";

import React, { useState } from "react";

export function C8ScienceCh2Page13() {
  const [selectedMCQ, setSelectedMCQ] = useState<Record<number, string>>({});

  const mcqAnswers: Record<number, { correct: string; explanation: string }> = {
    1: {
      correct: "c",
      explanation: "Gymnasts apply a coarse chalk powder on their hands to increase friction and ensure a secure, non-slip grip on apparatus.",
    },
    2: {
      correct: "c",
      explanation: "According to Hooke's law for a spring balance, elongation of the spring is directly proportional to the applied tensile force.",
    },
    3: {
      correct: "d",
      explanation: "Streamlined bodies of birds (flying in air) and aquatic animals (swimming in water) reduce fluid drag and conserve energy.",
    },
    4: {
      correct: "b",
      explanation: "Static friction is self-adjusting in both magnitude and direction up to its maximum limiting value to balance applied horizontal forces.",
    },
  };

  const handleSelect = (qNum: number, option: string) => {
    setSelectedMCQ((prev) => ({ ...prev, [qNum]: option }));
  };

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* III. Higher Order Thinking Questions */}
      <div className="rounded-[22px] border border-amber-300 bg-amber-50/40 p-5 shadow-sm space-y-3">
        <h3 className="font-heading text-sm font-bold text-amber-950">
          III. Higher Order Thinking Questions
        </h3>
        <ol className="space-y-3 pl-4 list-decimal text-xs text-foreground/85 leading-relaxed">
          <li>
            Do you agree with the statement, &ldquo;friction is both good and evil.&rdquo; Explain with examples. <span className="font-semibold text-fuchsia-900">(AS₁)</span>
            <p className="mt-1 text-foreground/75 italic">
              <strong>Friend (Good):</strong> Enables walking, driving, braking, writing, holding things. <br />
              <strong>Foe (Evil):</strong> Causes energy dissipation as heat, wear and tear of gears/tyres, reducing machine efficiency.
            </p>
          </li>
          <li>
            Reducing friction to the lowest possible level in machine tools solves the problem of energy crisis and conserves biodiversity. How do you support the statement? Explain? <span className="font-semibold text-fuchsia-900">(AS₆)</span>
            <p className="mt-1 text-foreground/75 italic">
              Lower friction cuts massive parasitic energy losses in industrial machines and transport, decreasing fuel/electricity consumption, reducing fossil fuel emissions, and mitigating global warming that threatens ecosystems.
            </p>
          </li>
        </ol>
      </div>

      {/* Multiple Choice Questions */}
      <div className="rounded-[22px] border-2 border-fuchsia-400 bg-white p-5 shadow-sm space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-700 px-4 py-1.5 text-xs font-bold text-white shadow-2xs font-heading">
          <span>☑️</span>
          <span>Multiple Choice Questions</span>
        </div>

        <div className="space-y-4 text-xs">
          {/* MCQ 1 */}
          <div className="space-y-2 p-3 rounded-xl border border-border/60 bg-slate-50/50">
            <div className="flex justify-between items-start">
              <p className="font-semibold text-foreground/90">
                1. Which material do gymnasts apply on their hands to increase friction for better grip
              </p>
              <span className="font-mono text-xs font-bold text-fuchsia-900 px-2 py-0.5 rounded bg-fuchsia-100">
                ( {selectedMCQ[1] ? selectedMCQ[1].toUpperCase() : " "} )
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[
                { label: "a) Oils", val: "a" },
                { label: "b) Soap", val: "b" },
                { label: "c) Coarse substance", val: "c" },
                { label: "d) water", val: "d" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleSelect(1, opt.val)}
                  className={`text-left px-3 py-2 rounded-lg border transition-all ${
                    selectedMCQ[1] === opt.val
                      ? opt.val === mcqAnswers[1].correct
                        ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold"
                        : "border-rose-500 bg-rose-50 text-rose-950 font-semibold"
                      : "border-border/60 bg-white hover:bg-slate-100/80 text-foreground/80"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {selectedMCQ[1] && (
              <p className={`text-[11px] mt-1 ${selectedMCQ[1] === mcqAnswers[1].correct ? "text-emerald-700" : "text-rose-700"}`}>
                {selectedMCQ[1] === mcqAnswers[1].correct ? "✓ Correct!" : "✗ Incorrect."} {mcqAnswers[1].explanation}
              </p>
            )}
          </div>

          {/* MCQ 2 */}
          <div className="space-y-2 p-3 rounded-xl border border-border/60 bg-slate-50/50">
            <div className="flex justify-between items-start">
              <p className="font-semibold text-foreground/90">
                2. The relation between the change in the length of spring and the applied force is
              </p>
              <span className="font-mono text-xs font-bold text-fuchsia-900 px-2 py-0.5 rounded bg-fuchsia-100">
                ( {selectedMCQ[2] ? selectedMCQ[2].toUpperCase() : " "} )
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[
                { label: "a) Inversely proportional", val: "a" },
                { label: "b) Equal", val: "b" },
                { label: "c) Directly proportional", val: "c" },
                { label: "d) Never depends on the force", val: "d" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleSelect(2, opt.val)}
                  className={`text-left px-3 py-2 rounded-lg border transition-all ${
                    selectedMCQ[2] === opt.val
                      ? opt.val === mcqAnswers[2].correct
                        ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold"
                        : "border-rose-500 bg-rose-50 text-rose-950 font-semibold"
                      : "border-border/60 bg-white hover:bg-slate-100/80 text-foreground/80"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {selectedMCQ[2] && (
              <p className={`text-[11px] mt-1 ${selectedMCQ[2] === mcqAnswers[2].correct ? "text-emerald-700" : "text-rose-700"}`}>
                {selectedMCQ[2] === mcqAnswers[2].correct ? "✓ Correct!" : "✗ Incorrect."} {mcqAnswers[2].explanation}
              </p>
            )}
          </div>

          {/* MCQ 3 */}
          <div className="space-y-2 p-3 rounded-xl border border-border/60 bg-slate-50/50">
            <div className="flex justify-between items-start">
              <p className="font-semibold text-foreground/90">
                3. The bodies of birds and fishes must have evolved to shapes which would make them not to lose much energy in overcoming
              </p>
              <span className="font-mono text-xs font-bold text-fuchsia-900 px-2 py-0.5 rounded bg-fuchsia-100">
                ( {selectedMCQ[3] ? selectedMCQ[3].toUpperCase() : " "} )
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[
                { label: "a) Rolling friction", val: "a" },
                { label: "b) Static friction", val: "b" },
                { label: "c) Sliding friction", val: "c" },
                { label: "d) Fluid friction", val: "d" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleSelect(3, opt.val)}
                  className={`text-left px-3 py-2 rounded-lg border transition-all ${
                    selectedMCQ[3] === opt.val
                      ? opt.val === mcqAnswers[3].correct
                        ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold"
                        : "border-rose-500 bg-rose-50 text-rose-950 font-semibold"
                      : "border-border/60 bg-white hover:bg-slate-100/80 text-foreground/80"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {selectedMCQ[3] && (
              <p className={`text-[11px] mt-1 ${selectedMCQ[3] === mcqAnswers[3].correct ? "text-emerald-700" : "text-rose-700"}`}>
                {selectedMCQ[3] === mcqAnswers[3].correct ? "✓ Correct!" : "✗ Incorrect."} {mcqAnswers[3].explanation}
              </p>
            )}
          </div>

          {/* MCQ 4 */}
          <div className="space-y-2 p-3 rounded-xl border border-border/60 bg-slate-50/50">
            <div className="flex justify-between items-start">
              <p className="font-semibold text-foreground/90">
                4. Which of the following friction has self adjusting force
              </p>
              <span className="font-mono text-xs font-bold text-fuchsia-900 px-2 py-0.5 rounded bg-fuchsia-100">
                ( {selectedMCQ[4] ? selectedMCQ[4].toUpperCase() : " "} )
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[
                { label: "a) Sliding friction", val: "a" },
                { label: "b) Static friction", val: "b" },
                { label: "c) Rolling friction", val: "c" },
                { label: "d) Fluid friction", val: "d" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleSelect(4, opt.val)}
                  className={`text-left px-3 py-2 rounded-lg border transition-all ${
                    selectedMCQ[4] === opt.val
                      ? opt.val === mcqAnswers[4].correct
                        ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold"
                        : "border-rose-500 bg-rose-50 text-rose-950 font-semibold"
                      : "border-border/60 bg-white hover:bg-slate-100/80 text-foreground/80"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {selectedMCQ[4] && (
              <p className={`text-[11px] mt-1 ${selectedMCQ[4] === mcqAnswers[4].correct ? "text-emerald-700" : "text-rose-700"}`}>
                {selectedMCQ[4] === mcqAnswers[4].correct ? "✓ Correct!" : "✗ Incorrect."} {mcqAnswers[4].explanation}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">32</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-fuchsia-900 font-semibold">Friction</span>
      </div>
    </div>
  );
}
