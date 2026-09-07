"use client";

import React, { useState } from "react";

export function C8ScienceCh4Page6() {
  const [showTable6, setShowTable6] = useState(false);

  const tableData = [
    { sample: "Iron", lustrous: "Yes", sonorous: "Yes", heat: "Yes", electricity: "Yes", malleable: "Yes", ductile: "Yes" },
    { sample: "Zinc", lustrous: "Yes", sonorous: "Yes", heat: "Yes", electricity: "Yes", malleable: "Yes", ductile: "Yes" },
    { sample: "Copper", lustrous: "Yes", sonorous: "Yes", heat: "Yes", electricity: "Yes", malleable: "Yes", ductile: "Yes" },
    { sample: "Sulphur", lustrous: "No", sonorous: "No", heat: "No", electricity: "No", malleable: "No", ductile: "No" },
    { sample: "Aluminium", lustrous: "Yes", sonorous: "Yes", heat: "Yes", electricity: "Yes", malleable: "Yes", ductile: "Yes" },
    { sample: "Carbon", lustrous: "No", sonorous: "No", heat: "No", electricity: "Yes (Graphite)", malleable: "No", ductile: "No" },
    { sample: "Magnesium", lustrous: "Yes", sonorous: "Yes", heat: "Yes", electricity: "Yes", malleable: "Yes", ductile: "Yes" },
    { sample: "Iodine", lustrous: "Yes (Exception)", sonorous: "No", heat: "No", electricity: "No", malleable: "No", ductile: "No" },
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Top Section: Fig-7 & Heat Conduction */}
      <div className="rounded-[22px] border border-amber-300 bg-white p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="shrink-0 flex flex-col items-center rounded-xl border border-amber-200 bg-amber-50/40 p-2 text-center shadow-2xs">
            <img
              src="/assets/images/C8-Science/ch4_fig7.png"
              alt="Fig-7 Heat conduction through an iron rod"
              className="h-24 w-auto object-contain"
            />
            <span className="text-[10px] font-semibold text-amber-950 italic mt-1">
              Fig-7 : Conduction of heat in an iron rod
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-justify flex-1">
            <p>
              You observe that the pins fall sequentially because the heat supplied to the iron rod makes the wax melt. The wax closer to the flame melts first.
            </p>
            <p>
              This activity clearly demonstrates that thermal energy travels from the heated end of the iron rod to the other end by <strong>conduction of heat</strong>. Iron, copper, and aluminium cooking vessels are preferred in kitchens due to their excellent thermal conductivity.
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Comprehensive Physical Properties Matrix (Table-6) */}
        <div className="space-y-3 text-justify text-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-heading text-xs font-bold text-amber-950">
              Table-6: Master Physical Properties Matrix
            </h4>
            <button
              onClick={() => setShowTable6(!showTable6)}
              className="rounded bg-amber-700 hover:bg-amber-800 text-white px-2.5 py-1 text-[9.5px] font-semibold transition-colors cursor-pointer"
            >
              {showTable6 ? "Hide Matrix" : "Reveal All Properties"}
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-amber-300">
            <table className="w-full text-center text-[10px]">
              <thead className="bg-amber-100/90 text-amber-950 font-heading">
                <tr>
                  <th className="p-1.5 border-b border-amber-200 text-left">Sample</th>
                  <th className="p-1 border-b border-amber-200">Lustrous</th>
                  <th className="p-1 border-b border-amber-200">Sonorous</th>
                  <th className="p-1 border-b border-amber-200">Heat</th>
                  <th className="p-1 border-b border-amber-200">Electric</th>
                  <th className="p-1 border-b border-amber-200">Malleable</th>
                  <th className="p-1 border-b border-amber-200">Ductile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100 bg-white">
                {tableData.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? "bg-amber-50/30" : ""}>
                    <td className="p-1.5 font-medium text-left text-amber-950">{row.sample}</td>
                    <td className="p-1">{showTable6 ? (row.lustrous.startsWith("Yes") ? "✓" : "✗") : "..."}</td>
                    <td className="p-1">{showTable6 ? (row.sonorous.startsWith("Yes") ? "✓" : "✗") : "..."}</td>
                    <td className="p-1">{showTable6 ? (row.heat.startsWith("Yes") ? "✓" : "✗") : "..."}</td>
                    <td className="p-1">{showTable6 ? (row.electricity.startsWith("Yes") ? "✓" : "✗") : "..."}</td>
                    <td className="p-1">{showTable6 ? (row.malleable.startsWith("Yes") ? "✓" : "✗") : "..."}</td>
                    <td className="p-1">{showTable6 ? (row.ductile.startsWith("Yes") ? "✓" : "✗") : "..."}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: 4.2 Chemical Properties & 4.2.1 Reaction with Oxygen */}
        <div className="space-y-4 text-justify text-xs">
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 space-y-1.5">
            <h4 className="font-heading text-xs font-bold text-amber-950">
              4.2 Chemical Properties of Metals & Non-metals
            </h4>
            <p className="text-[11px] text-foreground/85 leading-relaxed">
              While physical properties provide quick clues, chemical reactions are definitive indicators to determine whether an element behaves as a metal or non-metal.
            </p>
          </div>

          {/* Lab Activity: Reaction with Oxygen */}
          <div className="rounded-[22px] border-2 border-purple-400 bg-white p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-purple-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-700 text-white text-xs shadow-2xs font-mono font-bold">
                  🔬
                </span>
                <h4 className="font-heading text-xs font-bold text-purple-950">
                  Lab Activity: Reaction with Oxygen
                </h4>
              </div>

              {/* QR Code Container */}
              <div className="flex flex-col items-center rounded-lg border border-purple-300 bg-white p-1 shadow-2xs">
                <img
                  src="/assets/images/C8-Science/ch4_qr_chem.png"
                  alt="QR Code E3871B"
                  className="h-7 w-7 object-contain"
                />
                <span className="font-mono text-[7.5px] font-bold tracking-widest text-purple-950 mt-0.5">
                  E3871B
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <p>
                <strong className="text-purple-950">Aim:</strong> To investigate the reaction of oxygen with metals (magnesium) and non-metals (sulphur).
              </p>
              <p>
                <strong className="text-purple-950">Materials required:</strong> Magnesium ribbon, sulphur powder, spirit lamp / Bunsen burner, red and blue litmus papers, petridishes, deflagrating spoon, glass jar with lid.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-amber-900 font-semibold">Metals and Non-Metals</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">59</span>
      </div>
    </div>
  );
}
