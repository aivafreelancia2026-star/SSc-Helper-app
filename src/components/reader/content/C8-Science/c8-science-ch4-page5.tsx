"use client";

import React, { useState } from "react";

export function C8ScienceCh4Page5() {
  const [showTable5, setShowTable5] = useState(false);

  const tableData = [
    { sample: "Iron", glow: "Yes (Good conductor)" },
    { sample: "Zinc", glow: "Yes (Good conductor)" },
    { sample: "Copper", glow: "Yes (Excellent conductor)" },
    { sample: "Sulphur", glow: "No (Poor conductor / Insulator)" },
    { sample: "Aluminium", glow: "Yes (Excellent conductor)" },
    { sample: "Carbon (Graphite / Coal)", glow: "Yes (Graphite conducts)" },
    { sample: "Magnesium", glow: "Yes (Good conductor)" },
    { sample: "Iodine", glow: "No (Insulator)" },
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Activity-4, Fig-6, QR Code & Table-5 */}
        <div className="space-y-4 text-justify text-xs">
          <div className="rounded-[22px] border border-amber-300 bg-white p-4 shadow-sm space-y-3">
            <span className="inline-block rounded-full bg-amber-700 px-3 py-0.5 text-[10px] font-bold text-white shadow-2xs font-heading">
              Activity-4
            </span>
            <h4 className="font-heading text-xs font-bold text-amber-950">
              Identifying electric conductivity of a material
            </h4>

            <p>
              Arrange a simple electric circuit with a battery cell, torch bulb, and connecting wires. Close the gap in the circuit using an iron nail as shown in <strong>Figure 6</strong>.
            </p>

            {/* Fig-6 & QR Code Container */}
            <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50/40 p-3 shadow-2xs">
              <div className="flex flex-col items-center">
                <img
                  src="/assets/images/C8-Science/ch4_fig6.png"
                  alt="Fig-6 Electric circuit tester"
                  className="h-20 w-auto object-contain"
                />
                <span className="text-[10px] font-semibold text-amber-950 italic mt-1">
                  Fig-6 : Circuit with iron nail
                </span>
              </div>

              <div className="flex flex-col items-center rounded-lg border border-amber-300 bg-white p-1.5 shadow-2xs">
                <img
                  src="/assets/images/C8-Science/ch4_qr_electric.png"
                  alt="QR Code E2YBGH"
                  className="h-9 w-9 object-contain"
                />
                <span className="font-mono text-[8px] font-bold tracking-widest text-amber-950 mt-0.5">
                  E2YBGH
                </span>
              </div>
            </div>

            <p>
              Observe whether the bulb glows or not. Repeat the same test using the other samples and record your observations in <strong>Table-5</strong>.
            </p>

            {/* Table 5 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-[11px] text-amber-950">
                  Table-5: Electrical Conductivity Test
                </span>
                <button
                  onClick={() => setShowTable5(!showTable5)}
                  className="rounded bg-amber-700 hover:bg-amber-800 text-white px-2 py-0.5 text-[9px] font-semibold cursor-pointer"
                >
                  {showTable5 ? "Hide" : "Reveal Results"}
                </button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-amber-200">
                <table className="w-full text-left text-[10.5px]">
                  <thead className="bg-amber-100/90 text-amber-950 font-heading">
                    <tr>
                      <th className="p-1.5 border-b border-amber-200">Sample</th>
                      <th className="p-1.5 border-b border-amber-200">Does the bulb glow? (Yes/No)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100 bg-white">
                    {tableData.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 1 ? "bg-amber-50/30" : ""}>
                        <td className="p-1.5 font-medium text-amber-950">{row.sample}</td>
                        <td className="p-1.5 text-foreground/80">
                          {showTable5 ? (
                            <span
                              className={`font-semibold ${
                                row.glow.startsWith("Yes") ? "text-emerald-800" : "text-rose-700"
                              }`}
                            >
                              {row.glow}
                            </span>
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

        {/* Right Column: Conductors definition, Think and discuss & Activity-5 */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            Materials that allow electricity to pass freely through them and cause the tester bulb to glow are called <strong>electric conductors</strong>. Most metals (iron, copper, aluminium, zinc, magnesium) are good conductors of electricity.
          </p>

          <p>
            The handles of electrical appliances and tools are made of insulating plastics or rubber because electric current cannot pass through insulators, protecting technicians from electric shocks.
          </p>

          {/* Think and Discuss */}
          <div className="rounded-2xl border border-amber-300 bg-amber-50/60 p-3.5 space-y-1.5 text-amber-950">
            <div className="flex items-center gap-1.5 font-heading text-xs font-bold text-amber-900">
              <span>🤔</span>
              <span>Think and discuss</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              How will you close the circuit using sulphur, carbon, or iodine? Since they may be in powder form, try tightly packing the powder inside a hollow plastic straw with metal wire leads at both ends!
            </p>
          </div>

          {/* Activity-5 */}
          <div className="rounded-[22px] border-2 border-amber-400 bg-white p-4 shadow-sm space-y-2.5">
            <span className="inline-block rounded-full bg-amber-700 px-3 py-0.5 text-[10px] font-bold text-white shadow-2xs font-heading">
              Activity-5
            </span>
            <h4 className="font-heading text-xs font-bold text-amber-950">
              Observing heat conduction by metals
            </h4>

            <p>
              Take an iron rod. Stick small iron pins along its length at equal intervals using melted candle wax (see Fig-7 on the next page). Clamp the rod to a stand horizontally. Heat the free end of the rod with a spirit lamp and observe how the pins fall off sequentially.
            </p>

            <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-950 font-medium">
              <li>Why did the pins fall from the iron rod?</li>
              <li>The pin at which end fell first?</li>
              <li>What is the scientific explanation for this observation?</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">58</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-amber-900 font-semibold">Metals and Non-Metals</span>
      </div>
    </div>
  );
}
