"use client";

import React, { useState } from "react";

export function C8ScienceCh4Page4() {
  const [showTable4, setShowTable4] = useState(false);

  const tableData = [
    { sample: "Iron", wire: "Yes (Ductile)" },
    { sample: "Zinc", wire: "Yes (Ductile when warm)" },
    { sample: "Copper", wire: "Yes (Highly ductile)" },
    { sample: "Sulphur", wire: "No (Brittle non-metal)" },
    { sample: "Aluminium", wire: "Yes (Highly ductile)" },
    { sample: "Carbon (Coal)", wire: "No (Non-ductile)" },
    { sample: "Magnesium", wire: "Yes (Ductile)" },
    { sample: "Iodine", wire: "No (Non-ductile)" },
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Malleability conclusion, Fig-4 & 4.1.3 Ductility */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            Some of the samples, when beaten hard, were flattened, whereas some materials broke into pieces or became a powder.
          </p>

          <p>
            The materials that can be flattened into thin sheets are called <strong>malleable materials</strong>. Malleability is one of the characteristic physical properties associated with metals.
          </p>

          {/* Fig-4 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-amber-300 bg-white p-3 text-center space-y-1 shadow-2xs">
            <img
              src="/assets/images/C8-Science/ch4_fig4.png"
              alt="Fig-4 Hammering a nail"
              className="h-24 w-auto object-contain"
            />
            <span className="text-[10.5px] font-semibold text-amber-950 italic">
              Fig-4 : Beating iron nail with a hammer
            </span>
          </div>

          <p>
            What did you observe in the case of iron? You may not be able to flatten it cold, but the blacksmith can do it by heating it red-hot before beating. Materials differ in their range of malleability. Metals like <strong>aluminium, silver, and gold</strong> are exceptionally malleable.
          </p>

          {/* 4.1.3 Ductility Section */}
          <div className="rounded-[22px] border border-amber-300 bg-amber-50/40 p-4 space-y-3">
            <h4 className="font-heading text-xs font-bold text-amber-950">
              4.1.3 Ductility
            </h4>

            <p>
              We use wires in different situations in our daily life. Look at the samples given in <strong>Table-4</strong>.
            </p>

            {/* Table 4 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-[11px] text-amber-950">
                  Table-4: Can We Convert Samples into Wires?
                </span>
                <button
                  onClick={() => setShowTable4(!showTable4)}
                  className="rounded bg-amber-700 hover:bg-amber-800 text-white px-2 py-0.5 text-[9px] font-semibold cursor-pointer"
                >
                  {showTable4 ? "Hide" : "Reveal"}
                </button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-amber-200">
                <table className="w-full text-left text-[10.5px]">
                  <thead className="bg-amber-100/90 text-amber-950 font-heading">
                    <tr>
                      <th className="p-1.5 border-b border-amber-200">Sample</th>
                      <th className="p-1.5 border-b border-amber-200">Can we convert it into Wires (Yes/No)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100 bg-white">
                    {tableData.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 1 ? "bg-amber-50/30" : ""}>
                        <td className="p-1.5 font-medium text-amber-950">{row.sample}</td>
                        <td className="p-1.5 text-foreground/80">
                          {showTable4 ? (
                            <span
                              className={`font-semibold ${
                                row.wire.startsWith("Yes") ? "text-emerald-800" : "text-rose-700"
                              }`}
                            >
                              {row.wire}
                            </span>
                          ) : idx === 0 ? (
                            <span className="font-semibold text-emerald-800">Yes</span>
                          ) : (
                            <span className="text-muted-foreground/40 italic">...............</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Fig-5, Ductility Definition & 4.1.4 Electrical Conductivity */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            Have you ever seen wires made of the materials mentioned in Table-4? You may infer that some materials can be drawn into wires while others crumble.
          </p>

          {/* Fig-5 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-amber-300 bg-white p-3 text-center space-y-1 shadow-2xs">
            <img
              src="/assets/images/C8-Science/ch4_fig5.png"
              alt="Fig-5 Metal wire coils"
              className="h-24 w-auto object-contain"
            />
            <span className="text-[10.5px] font-semibold text-amber-950 italic">
              Fig-5 : Coils of Aluminium and Copper wire
            </span>
          </div>

          <div className="rounded-xl border border-amber-300 bg-amber-50/50 p-3 space-y-1.5">
            <p>
              The physical property of drawing a material into fine wires is called <strong>ductility</strong>. Most metals are ductile (especially copper, aluminium, gold, and silver).
            </p>
            <p className="text-[11px] text-amber-950 font-medium">
              We use connecting wires made of metals in electric circuits. Is ductility the only property of metals required for use in electric circuits?
            </p>
          </div>

          {/* 4.1.4 Electrical Conductivity */}
          <div className="rounded-[22px] border-2 border-amber-400 bg-white p-4 shadow-sm space-y-2.5">
            <h4 className="font-heading text-xs font-bold text-amber-950">
              4.1.4 Electrical Conductivity
            </h4>

            <p>
              You might have seen an electrician using a screwdriver during repairs.
            </p>

            <ul className="list-disc list-inside space-y-1 text-[11px] text-foreground/85">
              <li>What materials does an electrician&apos;s screwdriver contain?</li>
              <li>Why does a screwdriver have a plastic or rubber handle instead of a metallic handle?</li>
            </ul>

            <p className="text-[11px] text-amber-950 font-semibold pt-1">
              Let us explore the electrical conduction properties of metals and non-metals in the next activity!
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-amber-900 font-semibold">Metals and Non-Metals</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">57</span>
      </div>
    </div>
  );
}
