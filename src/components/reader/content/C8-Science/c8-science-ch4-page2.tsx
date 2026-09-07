"use client";

import React, { useState } from "react";

export function C8ScienceCh4Page2() {
  const [showTable1, setShowTable1] = useState(false);

  const tableData = [
    { sample: "Iron", shine: "Shining (Lustrous)", color: "Greyish-black" },
    { sample: "Zinc", shine: "Shining (Lustrous)", color: "Bluish-white" },
    { sample: "Copper", shine: "Shining (Lustrous)", color: "Reddish-brown" },
    { sample: "Sulphur", shine: "Not shining (Dull)", color: "Yellow" },
    { sample: "Aluminium", shine: "Shining (Lustrous)", color: "Silvery-white" },
    { sample: "Carbon (Coal)", shine: "Not shining (Dull)", color: "Black" },
    { sample: "Magnesium", shine: "Shining (Lustrous)", color: "Silvery-white" },
    { sample: "Iodine", shine: "Shining (Lustrous exception)", color: "Dark purple-black crystals" },
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Appearance, Activity-1, Table-1 */}
        <div className="space-y-4 text-justify text-xs">
          <div className="rounded-[22px] border border-amber-300 bg-white p-4 shadow-sm space-y-3">
            <h4 className="font-heading text-xs font-bold text-amber-950">
              Appearance
            </h4>

            <p>
              In previous classes, you learnt that materials that have a bright, shining surface and reflect light are called <strong>lustrous materials</strong>, and materials that do not shine are <strong>non-lustrous</strong>.
            </p>

            {/* Activity-1 */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 space-y-2">
              <span className="inline-block rounded-full bg-amber-700 px-3 py-0.5 text-[10px] font-bold text-white shadow-2xs font-heading">
                Activity-1
              </span>
              <h5 className="font-heading text-xs font-bold text-amber-950">
                Observing appearance and colour of some materials
              </h5>
              <p>
                Observe the appearance of your collected samples. Look at their colour. Decide whether they appear shining or dull, and record your observations in <strong>Table-1</strong>. (If the surface appears dirty or oxidized, rub it clean with sandpaper first).
              </p>
            </div>

            {/* Table 1 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-[11px] text-amber-950">
                  Table-1: Appearance & Colour
                </span>
                <button
                  onClick={() => setShowTable1(!showTable1)}
                  className="rounded-lg bg-amber-700 hover:bg-amber-800 text-white px-2.5 py-1 text-[10px] font-semibold transition-colors shadow-2xs cursor-pointer"
                >
                  {showTable1 ? "Hide Data" : "Reveal Lab Observations"}
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-amber-200">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-amber-100/80 text-amber-950 font-heading">
                    <tr>
                      <th className="p-2 border-b border-amber-200">Sample</th>
                      <th className="p-2 border-b border-amber-200">Appearance (Shining / Not shining)</th>
                      <th className="p-2 border-b border-amber-200">Colour</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100 bg-white">
                    {tableData.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 1 ? "bg-amber-50/30" : ""}>
                        <td className="p-2 font-medium text-amber-950">{row.sample}</td>
                        <td className="p-2 text-foreground/80">
                          {showTable1 ? (
                            <span
                              className={`font-semibold ${
                                row.shine.includes("Not") ? "text-rose-700" : "text-amber-800"
                              }`}
                            >
                              {row.shine}
                            </span>
                          ) : (
                            <span className="text-muted-foreground/40 italic">...............</span>
                          )}
                        </td>
                        <td className="p-2 text-foreground/80">
                          {showTable1 ? (
                            <span>{row.color}</span>
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

            <p>
              Your observations show that metals are generally <strong>lustrous</strong>. However, non-metals like sulphur and coal are non-lustrous (with rare crystalline exceptions like iodine).
            </p>
          </div>
        </div>

        {/* Right Column: 4.1.1 Sonority, Activity-2 & Fig-2 */}
        <div className="space-y-4 text-justify text-xs">
          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-3 space-y-1.5">
            <p className="font-semibold text-amber-950">
              • We all know that a mirror reflects light. Can a mirror be called a metal?
            </p>
            <p className="text-[11px] text-foreground/80">
              No. A mirror is primarily made of glass (a non-metal ceramic) with a microscopically thin reflective metallic coating of silver or aluminium behind it.
            </p>
          </div>

          {/* 4.1.1 Sonority */}
          <div className="rounded-[22px] border-2 border-amber-400 bg-white p-4 shadow-sm space-y-3">
            <h4 className="font-heading text-xs font-bold text-amber-950">
              4.1.1 Sonority
            </h4>

            <p>
              While Aryan was carrying his metal geometry box, he slipped and dropped it. He noticed that the box made a clear, vibrant <strong>ringing sound</strong> when it hit the hard floor, similar to the sound of a ringing bell.
            </p>

            <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-950 font-medium">
              <li>Have you observed the material used to make school bells or temple bells?</li>
              <li>Why are wooden bells not used in schools?</li>
              <li>Do all materials produce a ringing sound when dropped on a hard surface?</li>
            </ul>

            {/* Activity-2 */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 space-y-2">
              <span className="inline-block rounded-full bg-amber-700 px-3 py-0.5 text-[10px] font-bold text-white shadow-2xs font-heading">
                Activity-2
              </span>
              <h5 className="font-heading text-xs font-bold text-amber-950">
                Listening to the sound produced by some materials
              </h5>

              {/* Fig 2 Container */}
              <div className="flex flex-col items-center rounded-xl border border-amber-200 bg-white p-2 text-center space-y-1 shadow-2xs">
                <img
                  src="/assets/images/C8-Science/ch4_fig2.png"
                  alt="Fig-2 Sonority in metals"
                  className="h-20 w-auto object-contain"
                />
                <span className="text-[10px] font-semibold text-amber-950 italic">
                  Fig-2 : Striking metal plate, gong, and bell
                </span>
              </div>

              <p className="text-[11px] leading-relaxed">
                Drop a piece of coal on the floor and listen to the sound. Do you think coal is sonorous? Now drop pieces of zinc, copper, aluminium, and magnesium, and compare with sulphur and iodine.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-amber-900 font-semibold">Metals and Non-Metals</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">55</span>
      </div>
    </div>
  );
}
