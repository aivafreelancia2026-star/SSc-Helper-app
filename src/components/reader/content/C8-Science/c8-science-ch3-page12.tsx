"use client";

import React, { useState } from "react";

export function C8ScienceCh3Page12() {
  const [showFlameResults, setShowFlameResults] = useState(false);

  const tableData = [
    {
      sno: 1,
      sample: "Tooth brush handle",
      reaction: "Softens & bends easily upon heating",
      type: "Thermoplastic",
    },
    {
      sno: 2,
      sample: "Comb",
      reaction: "Softens & melts readily",
      type: "Thermoplastic",
    },
    {
      sno: 3,
      sample: "Piece of bucket",
      reaction: "Softens & deforms under heat",
      type: "Thermoplastic",
    },
    {
      sno: 4,
      sample: "Handle of utensil",
      reaction: "Does not soften; chars / retains hardness",
      type: "Thermosetting plastic (Bakelite)",
    },
    {
      sno: 5,
      sample: "Electric Switch",
      reaction: "Does not melt; resists heat & chars",
      type: "Thermosetting plastic (Bakelite)",
    },
    {
      sno: 6,
      sample: "Meals plate (Melamine)",
      reaction: "Resists flame, does not soften",
      type: "Thermosetting plastic (Melamine)",
    },
    {
      sno: 7,
      sample: "Coffee mug (Melamine/Thermoset)",
      reaction: "Resists deformation upon heating",
      type: "Thermosetting plastic",
    },
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Table 3: Flame Test Results */}
      <div className="rounded-[22px] border border-emerald-300 bg-white p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-heading text-xs font-bold text-emerald-950">
            Table-3: Identification of Plastic Types via Flame Test
          </h4>
          <button
            onClick={() => setShowFlameResults(!showFlameResults)}
            className="rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white px-2.5 py-1 text-[10px] font-semibold transition-colors shadow-2xs cursor-pointer"
          >
            {showFlameResults ? "Hide Results" : "Reveal Lab Observations"}
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-emerald-200">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-emerald-100/80 text-emerald-950 font-heading">
              <tr>
                <th className="p-2 border-b border-emerald-200 w-12 text-center">Sl.No.</th>
                <th className="p-2 border-b border-emerald-200">Name of plastic sample</th>
                <th className="p-2 border-b border-emerald-200">Softened / Burnt with smell & become hard</th>
                <th className="p-2 border-b border-emerald-200">Thermoplastic / Thermosetting plastic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100 bg-white">
              {tableData.map((row) => (
                <tr key={row.sno} className={row.sno % 2 === 0 ? "bg-emerald-50/30" : ""}>
                  <td className="p-2 text-center font-mono font-medium text-emerald-900">{row.sno}.</td>
                  <td className="p-2 font-medium text-emerald-950">{row.sample}</td>
                  <td className="p-2 text-foreground/80">
                    {showFlameResults ? (
                      <span>{row.reaction}</span>
                    ) : (
                      <span className="text-muted-foreground/40 italic">...............</span>
                    )}
                  </td>
                  <td className="p-2 text-foreground/80">
                    {showFlameResults ? (
                      <span
                        className={`font-semibold ${
                          row.type.includes("Thermosetting")
                            ? "text-purple-800"
                            : "text-emerald-800"
                        }`}
                      >
                        {row.type}
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

      {/* Two Column Layout: Thermoplastic & Thermosetting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: 3.7.1 Thermoplastic & Hermann Staudinger */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            In the activity above, we tested known household samples. If an unknown sample is given, how do you decide whether it is a thermoplastic or a thermosetting plastic?
          </p>

          {/* 3.7.1 Thermoplastic */}
          <div className="rounded-[20px] border border-emerald-300 bg-emerald-50/40 p-4 space-y-2">
            <h4 className="font-heading text-xs font-bold text-emerald-950">
              3.7.1 Thermoplastic
            </h4>
            <p>
              This is a plastic that softens when heated and hardens when cooled. A <strong>thermoplastic</strong> is a linear or branched polymer that turns into a viscous liquid when heated and freezes to a glassy or rigid state when cooled sufficiently.
            </p>
          </div>

          {/* Do You Know: Hermann Staudinger */}
          <div className="rounded-[22px] border-2 border-emerald-400 bg-gradient-to-br from-emerald-50/80 via-teal-50/50 to-emerald-50/70 p-4 shadow-sm space-y-2.5 text-emerald-950">
            <div className="flex items-center gap-1.5 border-b border-emerald-300 pb-1.5">
              <span className="rounded-full bg-emerald-700 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-2xs font-heading">
                💡 Do you know?
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="space-y-1 flex-1">
                <h5 className="font-heading text-[11.5px] font-bold text-emerald-950">
                  Hermann Staudinger (1881–1965)
                </h5>
                <p className="text-[10.5px] leading-relaxed">
                  Hermann Staudinger, a German Chemist, made a monumental step forward in 1920 when he developed stable thermoplastics. He demonstrated that <strong>polymers are long-chain giant molecules</strong> (macromolecules), for which he won the <strong>Nobel Prize in Chemistry in 1953</strong>.
                </p>
              </div>

              <div className="shrink-0 flex flex-col items-center rounded-lg border border-emerald-300 bg-white p-1 shadow-2xs">
                <img
                  src="/assets/images/C8-Science/ch3_staudinger.png"
                  alt="Hermann Staudinger"
                  className="h-16 w-auto rounded object-cover"
                />
                <span className="text-[8px] font-semibold text-emerald-950 mt-0.5">
                  H. Staudinger
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3.7.2 Thermosetting Plastic */}
        <div className="space-y-4 text-justify text-xs">
          <div className="rounded-[20px] border border-purple-300 bg-purple-50/30 p-4 space-y-2.5">
            <h4 className="font-heading text-xs font-bold text-purple-950">
              3.7.2 Thermosetting Plastic
            </h4>

            <p>
              Thermosetting plastics are plastics that, when molded into shape and allowed to cool down, remain permanently in that molded form. When heated again, they will not soften—they will char or burn.
            </p>

            <p>
              Thermosetting plastics gain strength during initial thermal molding. Strong covalent <strong>cross-links</strong> form during the curing process, giving the polymer a rigid three-dimensional network.
            </p>

            <p>
              Because of their remarkable thermal stability and electrical insulation, they are used where heat and electrical resistance are essential.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-white p-3.5 space-y-2">
            <p>
              Observe the kitchenware in your house or visit any home appliance store. Is all cookware made entirely of metal? What materials are the handles of frying pans and pressure cookers made of?
            </p>
            <p className="font-semibold text-emerald-950 text-[11px]">
              While pans are made of metals like aluminum, copper, or steel, the handles are coated with heat-resistant thermosetting plastics!
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">45</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
      </div>
    </div>
  );
}
