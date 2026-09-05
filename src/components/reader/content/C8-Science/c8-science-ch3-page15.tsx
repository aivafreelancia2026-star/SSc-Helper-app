"use client";

import React, { useState } from "react";

export function C8ScienceCh3Page15() {
  const [showTableAnswers, setShowTableAnswers] = useState(false);

  const tableData = [
    {
      waste: "Peels of fruits and vegetables",
      time: "1 to 2 weeks",
      nature: "Biodegradable (Decomposes rapidly)",
    },
    {
      waste: "Left over food stuff",
      time: "1 to 2 weeks",
      nature: "Biodegradable (Decomposes quickly)",
    },
    {
      waste: "Waste paper",
      time: "10 to 30 days",
      nature: "Biodegradable (Breaks down readily)",
    },
    {
      waste: "Cotton cloth",
      time: "2 to 5 months",
      nature: "Biodegradable (Plant cellulose)",
    },
    {
      waste: "Plastic bag",
      time: "Several hundred years",
      nature: "Non-biodegradable (Persists indefinitely)",
    },
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Activity-9 & Table-4 */}
        <div className="space-y-4 text-justify text-xs">
          <div className="rounded-[22px] border border-emerald-300 bg-white p-4 shadow-sm space-y-3">
            <div className="inline-block rounded-full bg-emerald-700 px-3 py-0.5 text-[11px] font-bold text-white shadow-2xs font-heading">
              Activity-9
            </div>

            <h4 className="font-heading text-xs font-bold text-emerald-950">
              Biodegradable, Non-bio degradable
            </h4>

            <p>
              Let&apos;s take peels of fruits and vegetables, leftover foodstuff, waste paper, cotton cloth, and a plastic bag. Keep this material buried in a compost pit. Open the pit after some days and list the materials that remain for a long time and those that disappear quickly in <strong>Table-4</strong>.
            </p>

            {/* Table 4 Container */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-[11px] text-emerald-950">
                  Table-4: Waste Decomposition
                </span>
                <button
                  onClick={() => setShowTableAnswers(!showTableAnswers)}
                  className="rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white px-2.5 py-1 text-[10px] font-semibold transition-colors shadow-2xs cursor-pointer"
                >
                  {showTableAnswers ? "Hide Standard Times" : "Reveal Scientific Data"}
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-emerald-300">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-emerald-100/80 text-emerald-950 font-heading">
                    <tr>
                      <th className="p-2 border-b border-emerald-200">Type of waste</th>
                      <th className="p-2 border-b border-emerald-200">Approximate time to degrade</th>
                      <th className="p-2 border-b border-emerald-200">Change / Classification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-100 bg-white">
                    {tableData.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 1 ? "bg-emerald-50/30" : ""}>
                        <td className="p-2 font-medium text-emerald-950">{row.waste}</td>
                        <td className="p-2 text-foreground/80">
                          {showTableAnswers ? (
                            <span className="font-semibold text-emerald-900">{row.time}</span>
                          ) : (
                            <span className="text-muted-foreground/50 italic">...............</span>
                          )}
                        </td>
                        <td className="p-2 text-foreground/80">
                          {showTableAnswers ? (
                            <span
                              className={`font-semibold ${
                                row.nature.includes("Non-biodegradable")
                                  ? "text-rose-700"
                                  : "text-emerald-700"
                              }`}
                            >
                              {row.nature}
                            </span>
                          ) : (
                            <span className="text-muted-foreground/50 italic">...............</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              You observe that certain materials can break down into smaller fragments in the presence of water, sunlight, and oxygen. These fragments get further broken down by bacteria. This natural process is called <strong>decomposition</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div className="rounded-xl border border-emerald-300 bg-emerald-50/50 p-2.5 space-y-1">
                <span className="font-heading text-[11px] font-bold text-emerald-950 block">
                  Bio-degradable
                </span>
                <p className="text-[10.5px] text-emerald-900 leading-snug">
                  A material that is easily decomposed by natural biological processes (bacteria, microorganisms).
                </p>
              </div>

              <div className="rounded-xl border border-rose-300 bg-rose-50/50 p-2.5 space-y-1">
                <span className="font-heading text-[11px] font-bold text-rose-950 block">
                  Non-bio degradable
                </span>
                <p className="text-[10.5px] text-rose-900 leading-snug">
                  A material that is not easily decomposed by natural biological processes and persists for centuries.
                </p>
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground italic">
              Explore various sources of material including plastic to know the time required for them to decompose.
            </p>
          </div>
        </div>

        {/* Right Column: 4R Principle & Reduce */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            Plastics take several years to decompose compared to other materials like peels of fruits, vegetables, and waste foodstuff which decompose within a short period. Slow decomposition causes environmental pollution.
          </p>

          <p>
            The burning process of synthetic material is also very slow and cannot be burnt completely. The process of burning releases a lot of poisonous fumes into the air, causing air pollution. So it is better to avoid or minimize the use of plastics.
          </p>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3 italic text-[11px] text-emerald-950">
            💡 Make a list of occasions in daily life where you can avoid plastics and use eco-friendly alternatives.
          </div>

          {/* Section 3.7.5 4R Principle */}
          <div className="rounded-[22px] border-2 border-emerald-400 bg-white p-4 shadow-sm space-y-3">
            <h3 className="font-heading text-sm font-bold text-emerald-950">
              3.7.5 Reduce, Recycle, Reuse and Recover – 4R principle
            </h3>

            <p>
              Can we avoid using plastics altogether? The entire civilization is enveloped with them. Every walk of life is linked with plastics. You cannot avoid the use of plastics completely, but we can <strong>reduce</strong>, <strong>recycle</strong>, and <strong>reuse</strong> plastics and avoid their indiscriminate usage.
            </p>

            <p>
              We can also adopt recovery mechanisms to convert waste into usable resources. Let us discuss the <strong>4R principle</strong> for creating an eco-friendly environment.
            </p>

            {/* Reduce Subsection */}
            <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-3 space-y-2">
              <h4 className="font-heading text-xs font-bold text-teal-950">
                1. Reduce
              </h4>
              <p>
                What do you observe when you attend a marriage or function? What plates do they use to serve food? What type of glasses are supplied for drinking water? What containers do they use to serve sweets and ice cream? What are the spoons made up of?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">48</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
      </div>
    </div>
  );
}
