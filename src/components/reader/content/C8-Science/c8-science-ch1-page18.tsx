"use client";

import React, { useState } from "react";

export function C8ScienceCh1Page18() {
  const [selectedMCQ, setSelectedMCQ] = useState<Record<number, string>>({});
  const [showFbdSol, setShowFbdSol] = useState(false);
  const [showPressureSol, setShowPressureSol] = useState(false);
  const [showInclineSol, setShowInclineSol] = useState(false);

  const mcqAnswers: Record<number, { correct: string; explanation: string }> = {
    1: {
      correct: "b",
      explanation: "Hoisting a flag involves pulling the rope attached to the pulley downwards to raise the flag.",
    },
    2: {
      correct: "a",
      explanation: "Pulling water from a well uses human muscles, which is an example of muscular contact force.",
    },
  };

  const handleSelect = (qNum: number, option: string) => {
    setSelectedMCQ((prev) => ({ ...prev, [qNum]: option }));
  };

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* II. Application of Concepts Continued */}
      <div className="rounded-[22px] border border-sky-300 bg-white p-5 shadow-sm space-y-5">
        <h3 className="font-heading text-sm font-bold text-sky-950 border-b border-sky-100 pb-2">
          II. Application of concepts (Continued)
        </h3>

        {/* Q2: Net Forces from Diagrams */}
        <div className="space-y-3 rounded-xl border border-sky-200 bg-sky-50/40 p-4">
          <p className="font-semibold text-sky-950 text-xs">
            2. Find the net forces from the following diagrams: <span className="font-bold text-fuchsia-900">(AS₁)</span>
          </p>

          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-sky-200 shadow-2xs">
            <img
              src="/assets/images/C8-Science/ch1_q2_netforces.png"
              alt="Net forces diagrams a, b, c, d"
              className="max-h-20 w-auto object-contain"
            />
          </div>

          {/* 4 diagrams breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* a */}
            <div className="rounded-lg border border-sky-200 bg-white p-2.5 space-y-1">
              <span className="font-bold text-sky-950">Diagram (a):</span>
              <p className="text-foreground/80">Forces: 8N &rarr;, 10N &rarr;, 12N &larr;</p>
              <p className="text-sky-900 font-semibold">
                F<sub>net</sub> = (8 + 10) - 12 = <strong>6 N &rarr; (Right)</strong>
              </p>
            </div>

            {/* b */}
            <div className="rounded-lg border border-sky-200 bg-white p-2.5 space-y-1">
              <span className="font-bold text-sky-950">Diagram (b):</span>
              <p className="text-foreground/80">Forces: 8N &rarr;, 8N &larr;</p>
              <p className="text-sky-900 font-semibold">
                F<sub>net</sub> = 8 - 8 = <strong>0 N (Balanced)</strong>
              </p>
            </div>

            {/* c */}
            <div className="rounded-lg border border-sky-200 bg-white p-2.5 space-y-1">
              <span className="font-bold text-sky-950">Diagram (c):</span>
              <p className="text-foreground/80">Forces: 8N &rarr;, 6N &rarr;</p>
              <p className="text-sky-900 font-semibold">
                F<sub>net</sub> = 8 + 6 = <strong>14 N &rarr; (Right)</strong>
              </p>
            </div>

            {/* d */}
            <div className="rounded-lg border border-sky-200 bg-white p-2.5 space-y-1">
              <span className="font-bold text-sky-950">Diagram (d):</span>
              <p className="text-foreground/80">Forces: 9N &uarr;, 8N &darr;</p>
              <p className="text-sky-900 font-semibold">
                F<sub>net</sub> = 9 - 8 = <strong>1 N &uarr; (Upward)</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Q3 */}
        <div className="space-y-2 text-xs">
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium text-foreground/90">
              <strong>3.</strong> What forces are acting on a man standing still on a level floor? Draw a free body diagram (FBD) to show all forces acting on him. <span className="font-semibold text-fuchsia-900">(AS₅)</span>
            </p>
            <button
              onClick={() => setShowFbdSol(!showFbdSol)}
              className="shrink-0 rounded-md border border-sky-300 bg-sky-100/70 px-2 py-1 text-[11px] font-semibold text-sky-900 hover:bg-sky-200/80 transition-colors"
            >
              {showFbdSol ? "Hide Diagram" : "View FBD"}
            </button>
          </div>
          {showFbdSol && (
            <div className="rounded-lg border border-sky-200 bg-sky-50/50 p-3 text-xs space-y-2 animate-in fade-in">
              <p className="font-semibold text-sky-950">Forces acting on the man:</p>
              <ul className="list-disc list-inside space-y-1 text-foreground/80">
                <li><strong>Weight (W):</strong> Gravitational force acting vertically downward.</li>
                <li><strong>Normal force (N):</strong> Reaction force exerted by the floor vertically upward.</li>
                <li>Since he is standing still, net force = 0 &rArr; <strong>W = N</strong>.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Q4 */}
        <div className="space-y-2 text-xs">
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium text-foreground/90">
              <strong>4.</strong> The surface area of an object is 20 m² and a force of 10 N is applied on it, then what is the pressure? <span className="font-semibold text-fuchsia-900">(AS₁)</span>
            </p>
            <button
              onClick={() => setShowPressureSol(!showPressureSol)}
              className="shrink-0 rounded-md border border-sky-300 bg-sky-100/70 px-2 py-1 text-[11px] font-semibold text-sky-900 hover:bg-sky-200/80 transition-colors"
            >
              {showPressureSol ? "Hide Solution" : "View Solution"}
            </button>
          </div>
          {showPressureSol && (
            <div className="rounded-lg border border-sky-200 bg-sky-50/50 p-3 text-xs space-y-1 animate-in fade-in">
              <p><strong>Given:</strong> Force (F) = 10 N, Area (A) = 20 m²</p>
              <p><strong>Formula:</strong> Pressure (P) = Force / Area</p>
              <p className="font-bold text-sky-950">
                P = 10 N / 20 m² = 0.5 N/m² (or 0.5 Pascal)
              </p>
            </div>
          )}
        </div>

        {/* Q5 */}
        <div className="text-xs">
          <p className="font-medium text-foreground/90">
            <strong>5.</strong> How do you appreciate the role of friction in facilitating our various activities in our daily life? <span className="font-semibold text-fuchsia-900">(AS₆)</span>
          </p>
          <p className="text-foreground/75 mt-1 pl-4 italic">
            &ldquo;Without friction, we cannot walk without slipping, write on paper or blackboards, hold objects in our hands, or bring moving vehicles to a halt with brakes.&rdquo;
          </p>
        </div>

        {/* Q6 */}
        <div className="space-y-2 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="font-medium text-foreground/90 flex-1">
              <strong>6.</strong> Identify and draw all forces acting on the body shown in the diagram. <span className="font-semibold text-fuchsia-900">(AS₅)</span>
            </p>
            <div className="flex items-center gap-2">
              <img
                src="/assets/images/C8-Science/ch1_q6_incline.png"
                alt="Block on incline"
                className="h-9 w-auto object-contain border border-sky-200 rounded p-1 bg-white"
              />
              <button
                onClick={() => setShowInclineSol(!showInclineSol)}
                className="shrink-0 rounded-md border border-sky-300 bg-sky-100/70 px-2 py-1 text-[11px] font-semibold text-sky-900 hover:bg-sky-200/80 transition-colors"
              >
                {showInclineSol ? "Hide" : "Show Forces"}
              </button>
            </div>
          </div>
          {showInclineSol && (
            <div className="rounded-lg border border-sky-200 bg-sky-50/50 p-3 text-xs space-y-1 animate-in fade-in">
              <ul className="list-disc list-inside space-y-1 text-foreground/80">
                <li><strong>Weight (W = mg):</strong> Acting vertically downward towards center of Earth.</li>
                <li><strong>Normal Reaction Force (N):</strong> Acting perpendicular to the inclined surface upward.</li>
                <li><strong>Frictional Force (f):</strong> Acting parallel to inclined plane upward (opposing downward slide).</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* III. Higher Order Thinking Questions */}
      <div className="rounded-[22px] border border-amber-300 bg-amber-50/30 p-5 shadow-sm space-y-3">
        <h3 className="font-heading text-sm font-bold text-amber-950">
          III. Higher Order Thinking Questions
        </h3>
        <ol className="space-y-2 pl-4 list-decimal text-xs text-foreground/85 leading-relaxed">
          <li>
            If you push a heavy box which is at rest, you must exert some force to start its motion. However once the box is sliding you apply a lesser force to maintain that motion. Why? <span className="font-semibold text-fuchsia-900">(AS₁)</span>
          </li>
          <li>
            How do you increase the pressure by keeping: <span className="font-semibold text-fuchsia-900">(AS₁)</span>
            <div className="pl-4 mt-1 space-y-0.5">
              <p>a) area unchanged &rarr; <em>By increasing the applied force (P &prop; F).</em></p>
              <p>b) force unchanged &rarr; <em>By decreasing the surface area in contact (P &prop; 1/A).</em></p>
            </div>
          </li>
          <li>
            Imagine that friction disappeared from the earth. Explain what would happen? <span className="font-semibold text-fuchsia-900">(AS₂)</span>
          </li>
        </ol>
      </div>

      {/* Multiple Choice Questions */}
      <div className="rounded-[22px] border-2 border-fuchsia-400 bg-white p-5 shadow-sm space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-700 px-4 py-1.5 text-xs font-bold text-white shadow-2xs font-heading">
          <span>☑️</span>
          <span>Multiple Choice Questions</span>
        </div>

        <div className="space-y-5 text-xs">
          {/* MCQ 1 */}
          <div className="space-y-2 p-3 rounded-xl border border-border/60 bg-slate-50/50">
            <div className="flex justify-between items-start">
              <p className="font-semibold text-foreground/90">
                1. Hoisting a flag is related to
              </p>
              <span className="font-mono text-xs font-bold text-fuchsia-900 px-2 py-0.5 rounded bg-fuchsia-100">
                ( {selectedMCQ[1] ? selectedMCQ[1].toUpperCase() : " "} )
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[
                { label: "a) push", val: "a" },
                { label: "b) pull", val: "b" },
                { label: "c) Push and pull both", val: "c" },
                { label: "d) pressure", val: "d" },
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
                2. A person is pulling water from well. Which type of force it is
              </p>
              <span className="font-mono text-xs font-bold text-fuchsia-900 px-2 py-0.5 rounded bg-fuchsia-100">
                ( {selectedMCQ[2] ? selectedMCQ[2].toUpperCase() : " "} )
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[
                { label: "a) Muscular force", val: "a" },
                { label: "b) Magnetic force", val: "b" },
                { label: "c) Friction force", val: "c" },
                { label: "d) Electrostatic force", val: "d" },
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
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">18</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
      </div>
    </div>
  );
}
