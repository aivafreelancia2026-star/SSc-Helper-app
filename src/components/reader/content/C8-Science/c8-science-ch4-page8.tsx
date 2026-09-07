"use client";

import React, { useState } from "react";

export function C8ScienceCh4Page8() {
  const [showBodyAnalysis, setShowBodyAnalysis] = useState(false);

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Oxide Conclusion, Think & Discuss & 4.2.2 Rusting */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            The oxide of sulphur turns blue litmus paper to red. From this knowledge, you can conclude that <strong>magnesium oxide is basic</strong> and <strong>sulphur dioxide is acidic</strong>.
          </p>

          <p className="font-semibold text-amber-950">
            • You can infer that non-metals react with oxygen to give acidic oxides, while metals react with oxygen to give basic oxides.
          </p>

          {/* Think and Discuss: Is our body a metal or non-metal? */}
          <div className="rounded-[22px] border-2 border-purple-400 bg-gradient-to-br from-purple-50/70 via-pink-50/40 to-purple-50/60 p-4 shadow-sm space-y-2.5 text-purple-950">
            <div className="flex items-center justify-between border-b border-purple-200 pb-1.5">
              <h4 className="font-heading text-xs font-bold text-purple-950 flex items-center gap-1.5">
                <span>🤔</span> Is our body a metal or non-metal?
              </h4>
              <button
                onClick={() => setShowBodyAnalysis(!showBodyAnalysis)}
                className="rounded bg-purple-700 hover:bg-purple-800 text-white px-2 py-0.5 text-[9px] font-semibold cursor-pointer"
              >
                {showBodyAnalysis ? "Hide" : "Analysis"}
              </button>
            </div>

            <p className="text-[11px] leading-relaxed">
              Most of the human body is made up of water ($H_2O$). About <strong>99% of body mass</strong> is composed of just six non-metal elements: <strong>Oxygen (65%)</strong>, <strong>Carbon (18%)</strong>, <strong>Hydrogen (10%)</strong>, <strong>Nitrogen (3%)</strong>, <strong>Calcium (1.5%)</strong>, and <strong>Phosphorus (1.0%)</strong>.
            </p>

            {showBodyAnalysis && (
              <p className="text-[10.5px] text-purple-900 border-t border-purple-200 pt-1.5 leading-relaxed">
                Therefore, our body is predominantly composed of non-metals, containing only tiny essential trace minerals of metals (like Iron in hemoglobin and Calcium in bones).
              </p>
            )}
          </div>

          {/* 4.2.2 Rusting of Metals */}
          <div className="rounded-[20px] border border-amber-300 bg-amber-50/40 p-4 space-y-2">
            <h4 className="font-heading text-xs font-bold text-amber-950">
              4.2.2 Rusting of Metals
            </h4>
            <p>
              In Class VII, we studied the rusting of iron. Recall that iron rusts when it comes into simultaneous contact with oxygen and moisture in the atmosphere.
            </p>
            <p>
              When covered with paint, iron cannot contact air, preventing rust. Similar corrosion phenomena happen to other metals: <em>magnesium ribbon</em> turns dull white, and <em>silver jewelry</em> turns black (forming silver sulphide $Ag_2S$).
            </p>
          </div>
        </div>

        {/* Right Column: Copper patina, Noble metals & Activity-6 (Sodium in Water) */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            Copper statues and brass vessels exposed to moist air gradually develop a dull green coating (a mixture of basic copper carbonate, $CuCO_3 \cdot Cu(OH)_2$).
          </p>

          <div className="rounded-xl border border-amber-300 bg-white p-3 space-y-1">
            <strong className="text-amber-950 font-heading block">
              Noble Metals: Gold and Platinum
            </strong>
            <p className="text-[11px] text-foreground/80 leading-relaxed">
              Gold jewellery does not tarnish or rust. Different metals react with air at widely different rates; gold and platinum are chemically unreactive noble metals.
            </p>
          </div>

          {/* Activity-6 / 4.2.3 Reaction with water */}
          <div className="rounded-[22px] border-2 border-amber-400 bg-white p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-amber-200 pb-1.5">
              <span className="inline-block rounded-full bg-amber-700 px-3 py-0.5 text-[10px] font-bold text-white shadow-2xs font-heading">
                Activity-6
              </span>
              <h4 className="font-heading text-xs font-bold text-amber-950">
                4.2.3 Reaction with Water (Sodium Demo)
              </h4>
            </div>

            <div className="rounded-xl border border-rose-300 bg-rose-50/70 p-2.5 text-[10.5px] text-rose-950 space-y-0.5">
              <strong className="block font-heading text-rose-900">⚠️ Safety Warning:</strong>
              <p>
                This demonstration must only be conducted by the teacher. Sodium reacts violently with water; students must watch from a safe distance.
              </p>
            </div>

            <p className="text-[11px] leading-relaxed">
              Take a beaker half-filled with water. Cut a tiny piece of sodium (stored safely under kerosene), blot it on filter paper, and drop it into the water. It darts vigorously on the surface, producing hydrogen gas with a hissing sound, and dissolves to form an alkaline solution.
            </p>

            {/* Fig 9 Container */}
            <div className="flex flex-col items-center rounded-xl border border-amber-200 bg-amber-50/40 p-2.5 text-center space-y-1 shadow-2xs">
              <img
                src="/assets/images/C8-Science/ch4_fig9.png"
                alt="Fig-9 Litmus paper in sodium solution"
                className="h-20 w-auto object-contain"
              />
              <span className="text-[10px] font-semibold text-amber-950 italic">
                Fig-9 : Red litmus paper turns blue in Sodium Hydroxide solution (Basic)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-amber-900 font-semibold">Metals and Non-Metals</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">61</span>
      </div>
    </div>
  );
}
