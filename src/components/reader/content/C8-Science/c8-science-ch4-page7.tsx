"use client";

import React, { useState } from "react";

export function C8ScienceCh4Page7() {
  const [showTable7, setShowTable7] = useState(false);

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout: Procedure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Magnesium Procedure */}
        <div className="space-y-3 text-justify text-xs">
          <div className="rounded-[20px] border border-amber-300 bg-white p-4 space-y-2">
            <h4 className="font-heading text-xs font-bold text-amber-950">
              Procedure: Part A (Magnesium)
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-[11px] text-foreground/85">
              <li>Take a small strip of clean magnesium ribbon and note its silvery appearance.</li>
              <li>Ignite it in a flame—it burns with a dazzling white light into a white powder ash.</li>
              <li>Collect the magnesium ash in a petridish, dissolve it in distilled water, and test with red and blue litmus papers.</li>
            </ul>
          </div>

          <div className="rounded-[20px] border border-amber-300 bg-white p-4 space-y-2">
            <h4 className="font-heading text-xs font-bold text-amber-950">
              Procedure: Part B (Sulphur)
            </h4>
            <p className="text-[11px] text-foreground/85">
              Place a small quantity of powdered sulphur in a deflagrating spoon and heat it gently over a spirit lamp flame until it ignites with a blue flame.
            </p>
          </div>
        </div>

        {/* Right Column: Sulphur Gas Collection & Caution */}
        <div className="space-y-3 text-justify text-xs">
          <div className="rounded-xl border border-rose-300 bg-rose-50/60 p-2.5 text-[10.5px] text-rose-950">
            <strong className="block font-heading text-rose-900">⚠️ Caution:</strong>
            Do not inhale sulphur dioxide gas directly; it has a suffocating, harmful odor.
          </div>

          <p>
            As soon as sulphur starts burning, introduce the deflagrating spoon into a dry glass gas jar and cover it immediately with a glass lid. Once filled with fumes, add a small volume of water, replace the lid, and shake thoroughly to dissolve the gas ($SO_2 + H_2O \rightarrow H_2SO_3$). Test the solution with red and blue litmus papers.
          </p>
        </div>
      </div>

      {/* Table 7 & Fig-8 Container */}
      <div className="rounded-[22px] border border-amber-300 bg-white p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-heading text-xs font-bold text-amber-950">
            Table-7: Oxide Nature of Metal vs Non-metal
          </h4>
          <button
            onClick={() => setShowTable7(!showTable7)}
            className="rounded-lg bg-amber-700 hover:bg-amber-800 text-white px-2.5 py-1 text-[10px] font-semibold transition-colors shadow-2xs cursor-pointer"
          >
            {showTable7 ? "Hide Results" : "Reveal Litmus Results"}
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-amber-200">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-amber-100/90 text-amber-950 font-heading">
              <tr>
                <th className="p-2 border-b border-amber-200">Sample</th>
                <th className="p-2 border-b border-amber-200">Appearance before Reaction</th>
                <th className="p-2 border-b border-amber-200">Appearance after Reaction</th>
                <th className="p-2 border-b border-amber-200">Effect on Litmus Paper</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 bg-white">
              <tr>
                <td className="p-2 font-bold text-amber-950">Magnesium (Metal)</td>
                <td className="p-2 text-foreground/80">{showTable7 ? "Silvery shiny ribbon" : "..............."}</td>
                <td className="p-2 text-foreground/80">{showTable7 ? "White powdery ash (MgO)" : "..............."}</td>
                <td className="p-2">
                  {showTable7 ? (
                    <span className="font-bold text-blue-700">Red turns Blue (Basic oxide)</span>
                  ) : (
                    <span className="text-muted-foreground/40 italic">...............</span>
                  )}
                </td>
              </tr>
              <tr className="bg-amber-50/30">
                <td className="p-2 font-bold text-amber-950">Sulphur (Non-metal)</td>
                <td className="p-2 text-foreground/80">{showTable7 ? "Yellow crystalline powder" : "..............."}</td>
                <td className="p-2 text-foreground/80">{showTable7 ? "Colourless gas (SO₂)" : "..............."}</td>
                <td className="p-2">
                  {showTable7 ? (
                    <span className="font-bold text-rose-700">Blue turns Red (Acidic oxide)</span>
                  ) : (
                    <span className="text-muted-foreground/40 italic">...............</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Fig 8 Illustration Container */}
        <div className="flex flex-col items-center rounded-2xl border border-amber-200 bg-amber-50/40 p-3 text-center space-y-1 shadow-2xs">
          <img
            src="/assets/images/C8-Science/ch4_fig8.png"
            alt="Fig-8 Burning sulphur, shaking with water, and litmus testing"
            className="h-28 w-auto object-contain rounded"
          />
          <span className="text-[10.5px] font-semibold text-amber-950 italic">
            Fig-8 : Burning sulphur in deflagrating spoon, dissolving gas in water & testing with litmus
          </span>
        </div>

        {/* Chemical Reactions Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3 space-y-1 font-mono text-[11px]">
            <strong className="text-blue-950 font-heading block font-sans text-xs">
              Metal Oxide (Basic):
            </strong>
            <p className="text-blue-900 font-bold">
              Magnesium + Oxygen → Magnesium oxide
            </p>
            <p className="text-blue-800">
              2Mg (s) + O₂ (g) → 2MgO (s)
            </p>
          </div>

          <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3 space-y-1 font-mono text-[11px]">
            <strong className="text-rose-950 font-heading block font-sans text-xs">
              Non-metal Oxide (Acidic):
            </strong>
            <p className="text-rose-900 font-bold">
              Sulphur + Oxygen → Sulphur dioxide
            </p>
            <p className="text-rose-800">
              S (s) + O₂ (g) → SO₂ (g)
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">60</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-amber-900 font-semibold">Metals and Non-Metals</span>
      </div>
    </div>
  );
}
