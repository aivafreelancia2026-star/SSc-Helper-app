"use client";

import React, { useState } from "react";

export function C8ScienceCh1Page19() {
  const [selectedMCQ, setSelectedMCQ] = useState<Record<number, string>>({});

  const mcqAnswers: Record<number, { correct: string; explanation: string }> = {
    3: {
      correct: "b",
      explanation: "The contact force exerted by a solid surface perpendicular (normal) to the surface of contact is the Normal Force.",
    },
    4: {
      correct: "a",
      explanation: "When two forces act in opposite directions along a straight line, the net force is the difference between them: F₁ - F₂.",
    },
    5: {
      correct: "d",
      explanation: "Breaking glass causes permanent deformation/shattering, whereas stretching a rubber band, squeezing a sponge, or pressing a spring are elastic (temporary) changes.",
    },
  };

  const handleSelect = (qNum: number, option: string) => {
    setSelectedMCQ((prev) => ({ ...prev, [qNum]: option }));
  };

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* MCQs 3, 4, 5 */}
      <div className="rounded-[22px] border-2 border-fuchsia-400 bg-white p-5 shadow-sm space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-700 px-4 py-1.5 text-xs font-bold text-white shadow-2xs font-heading">
          <span>☑️</span>
          <span>Multiple Choice Questions (Continued)</span>
        </div>

        <div className="space-y-4 text-xs">
          {/* MCQ 3 */}
          <div className="space-y-2 p-3 rounded-xl border border-border/60 bg-slate-50/50">
            <div className="flex justify-between items-start">
              <p className="font-semibold text-foreground/90">
                3. The force that a solid surface exerts on any object in the normal direction is called
              </p>
              <span className="font-mono text-xs font-bold text-fuchsia-900 px-2 py-0.5 rounded bg-fuchsia-100">
                ( {selectedMCQ[3] ? selectedMCQ[3].toUpperCase() : " "} )
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[
                { label: "a) Muscular force", val: "a" },
                { label: "b) Normal Force", val: "b" },
                { label: "c) Tension force", val: "c" },
                { label: "d) Magnetic force", val: "d" },
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
                4. Let the forces F₁ and F₂ act on the table in opposite directions, F₁ &gt; F₂, the F<sub>net</sub> =
              </p>
              <span className="font-mono text-xs font-bold text-fuchsia-900 px-2 py-0.5 rounded bg-fuchsia-100">
                ( {selectedMCQ[4] ? selectedMCQ[4].toUpperCase() : " "} )
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[
                { label: "a) F₁ - F₂", val: "a" },
                { label: "b) F₁ + F₂", val: "b" },
                { label: "c) 0", val: "c" },
                { label: "d) 2F₂ - F₁", val: "d" },
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

          {/* MCQ 5 */}
          <div className="space-y-2 p-3 rounded-xl border border-border/60 bg-slate-50/50">
            <div className="flex justify-between items-start">
              <p className="font-semibold text-foreground/90">
                5. A situation for effect of force leads to a permanent change in shape of object is
              </p>
              <span className="font-mono text-xs font-bold text-fuchsia-900 px-2 py-0.5 rounded bg-fuchsia-100">
                ( {selectedMCQ[5] ? selectedMCQ[5].toUpperCase() : " "} )
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[
                { label: "a) Stretching Rubber band", val: "a" },
                { label: "b) Squeezing sponge", val: "b" },
                { label: "c) Pressing the Spring", val: "c" },
                { label: "d) Breaking glass", val: "d" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleSelect(5, opt.val)}
                  className={`text-left px-3 py-2 rounded-lg border transition-all ${
                    selectedMCQ[5] === opt.val
                      ? opt.val === mcqAnswers[5].correct
                        ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold"
                        : "border-rose-500 bg-rose-50 text-rose-950 font-semibold"
                      : "border-border/60 bg-white hover:bg-slate-100/80 text-foreground/80"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {selectedMCQ[5] && (
              <p className={`text-[11px] mt-1 ${selectedMCQ[5] === mcqAnswers[5].correct ? "text-emerald-700" : "text-rose-700"}`}>
                {selectedMCQ[5] === mcqAnswers[5].correct ? "✓ Correct!" : "✗ Incorrect."} {mcqAnswers[5].explanation}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Experiments Section */}
      <div className="rounded-[22px] border border-fuchsia-300 bg-fuchsia-50/40 p-5 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-700 px-4 py-1.5 text-xs font-bold text-white shadow-2xs font-heading">
          <span>🔬</span>
          <span>Experiments</span>
        </div>
        <ol className="space-y-2.5 pl-5 list-decimal text-xs text-foreground/90 font-medium leading-relaxed">
          <li>
            Conduct an experiment to find the limiting forces that can be borne by different strings and prepare a report.
          </li>
          <li>
            Design and conduct experiment to test few ways how friction may be reduced.
          </li>
          <li>
            Conduct an experiment to determine the change in effect of force with an area of contact.
          </li>
        </ol>
      </div>

      {/* Project Works Section */}
      <div className="rounded-[22px] border border-sky-300 bg-sky-50/40 p-5 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-700 px-4 py-1.5 text-xs font-bold text-white shadow-2xs font-heading">
          <span>💡</span>
          <span>Project Works</span>
        </div>
        <ol className="space-y-3 pl-5 list-decimal text-xs text-foreground/90 leading-relaxed">
          <li>
            Collect pictures to illustrate contact forces, forces at a distance and prepare a report.
          </li>
          <li>
            Classify the actions in your daily life into:
            <ol className="mt-1 space-y-1 pl-4 list-[lower-roman] text-foreground/80">
              <li>actions where we exert force which appears as a push</li>
              <li>actions where we exert force which appears as a pull</li>
              <li>actions which involve both push and pull</li>
            </ol>
          </li>
          <li>
            Observe the situations of electrostatic forces in your daily life and prepare a report.
          </li>
        </ol>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">19</span>
      </div>
    </div>
  );
}
