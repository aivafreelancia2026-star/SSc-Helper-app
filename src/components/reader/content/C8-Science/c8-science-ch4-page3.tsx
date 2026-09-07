"use client";

import React, { useState } from "react";

export function C8ScienceCh4Page3() {
  const [showTable2, setShowTable2] = useState(false);
  const [showTable3, setShowTable3] = useState(false);

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Top: Table 2 Sonorous Classification */}
      <div className="rounded-[22px] border border-amber-300 bg-white p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-heading text-xs font-bold text-amber-950">
            Table-2: Acoustic Ringing Property (Sonority)
          </h4>
          <button
            onClick={() => setShowTable2(!showTable2)}
            className="rounded-lg bg-amber-700 hover:bg-amber-800 text-white px-2.5 py-1 text-[10px] font-semibold transition-colors shadow-2xs cursor-pointer"
          >
            {showTable2 ? "Hide Table" : "Reveal Observations"}
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-amber-200">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-amber-100/80 text-amber-950 font-heading">
              <tr>
                <th className="p-2 border-b border-amber-200 w-1/2">Material Sample that Produces Ringing Sound (Sonorous)</th>
                <th className="p-2 border-b border-amber-200 w-1/2">Material Sample that does not Produce Ringing Sound (Non-sonorous)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 bg-white">
              <tr>
                <td className="p-2 font-medium text-amber-950">
                  {showTable2 ? "Iron nail, Zinc plate, Copper wire" : "..............."}
                </td>
                <td className="p-2 text-foreground/80">
                  {showTable2 ? "Piece of Coal / Carbon" : "..............."}
                </td>
              </tr>
              <tr className="bg-amber-50/30">
                <td className="p-2 font-medium text-amber-950">
                  {showTable2 ? "Aluminium strip, Magnesium ribbon" : "..............."}
                </td>
                <td className="p-2 text-foreground/80">
                  {showTable2 ? "Sulphur powder, Iodine crystals" : "..............."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Sonority conclusions & Transition */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            You may notice that some materials produce a clear, resonant ringing sound when struck, while others produce a dull thud. Materials that produce a ringing sound are called <strong>sonorous materials</strong>. Generally, most metals are sonorous.
          </p>

          <p>
            <strong>Lustre</strong> and <strong>sonority</strong> are two characteristic physical properties associated with metals. However, not all metals possess every property; for instance, <em>mercury</em> is a liquid metal and is not sonorous.
          </p>

          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 space-y-1">
            <p className="font-semibold text-amber-950">
              • Which property of metals first attracted the attention of early human beings?
            </p>
            <p className="text-[11px] text-amber-900 leading-relaxed">
              The ability of metals to be hammered, bent, and reshaped without breaking—their <strong>malleability</strong>—revolutionized prehistoric toolmaking!
            </p>
          </div>
        </div>

        {/* Right Column: 4.1.2 Malleability & Activity-3 & Table-3 */}
        <div className="space-y-4 text-justify text-xs">
          <div className="rounded-[22px] border-2 border-amber-400 bg-white p-4 shadow-sm space-y-3">
            <h4 className="font-heading text-xs font-bold text-amber-950">
              4.1.2 Malleability
            </h4>

            <p>
              Have you ever noticed the ultra-thin silver foil (<em>vark</em>) used to decorate Indian sweets, or the thin aluminium foil used for packing hot food?
            </p>

            <p>
              Observe a blacksmith at work: he beats red-hot iron repeatedly with a heavy hammer until its shape flattens and changes into an agricultural blade or tool.
            </p>

            {/* Activity-3 */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 space-y-2">
              <span className="inline-block rounded-full bg-amber-700 px-3 py-0.5 text-[10px] font-bold text-white shadow-2xs font-heading">
                Activity-3
              </span>
              <h5 className="font-heading text-xs font-bold text-amber-950">
                Identifying malleability of materials
              </h5>
              <p>
                Take a hammer and strike the material samples collected in Activity-2. Observe how their shapes change and record in <strong>Table-3</strong>.
              </p>
            </div>

            {/* Table 3 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-[11px] text-amber-950">
                  Table-3: Malleability Test
                </span>
                <button
                  onClick={() => setShowTable3(!showTable3)}
                  className="rounded bg-amber-700 hover:bg-amber-800 text-white px-2 py-0.5 text-[9px] font-semibold cursor-pointer"
                >
                  {showTable3 ? "Hide" : "Reveal"}
                </button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-amber-200">
                <table className="w-full text-left text-[10.5px]">
                  <thead className="bg-amber-100/90 text-amber-950 font-heading">
                    <tr>
                      <th className="p-1.5 border-b border-amber-200 w-1/2">Observing the change</th>
                      <th className="p-1.5 border-b border-amber-200 w-1/2">Name of sample</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100 bg-white">
                    <tr>
                      <td className="p-1.5 font-medium text-emerald-950">Flattens into thin sheet (Malleable)</td>
                      <td className="p-1.5 text-foreground/80">
                        {showTable3 ? "Iron, Aluminium, Copper, Zinc" : "Iron, ....."}
                      </td>
                    </tr>
                    <tr className="bg-amber-50/30">
                      <td className="p-1.5 font-medium text-rose-950">Breaks / converts into powder (Brittle)</td>
                      <td className="p-1.5 text-foreground/80">
                        {showTable3 ? "Coal (Carbon), Sulphur, Iodine" : "..............."}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-1.5 font-medium text-foreground/75">No change</td>
                      <td className="p-1.5 text-foreground/80">
                        {showTable3 ? "Hard stone / diamond" : "..............."}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story of Early Tools Box */}
      <div className="rounded-[22px] border-2 border-amber-400 bg-gradient-to-br from-amber-50/80 via-orange-50/50 to-amber-50/70 p-5 shadow-sm space-y-3 text-amber-950">
        <div className="flex items-center gap-2 border-b border-amber-300 pb-2">
          <span className="text-sm">🪵</span>
          <h4 className="font-heading text-xs font-bold text-amber-950">
            Story of Early Tools
          </h4>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="space-y-2 text-xs flex-1">
            <p>
              Do you think tools were always made of metals? Early human beings crafted their tools from materials that were readily available in nature—stone and wood. Later, they used the sharp bones of animals.
            </p>
            <p>
              Then they discovered metals like <strong>copper</strong> and <strong>iron</strong>. Tools made of copper and iron were vastly stronger and more durable than stone. Crucially, metals could be heated in a forge fire, beaten into shape, or melted and cast into sharp axes, plows, and spears!
            </p>
          </div>

          {/* Fig 3 Image */}
          <div className="shrink-0 flex flex-col items-center rounded-xl border border-amber-300 bg-white p-2 text-center shadow-2xs">
            <img
              src="/assets/images/C8-Science/ch4_fig3.png"
              alt="Fig-3 Tools are made of different materials"
              className="h-20 w-auto object-contain"
            />
            <span className="mt-1 text-[9.5px] font-semibold text-amber-950 italic">
              Fig-3 : Tools made of different materials
            </span>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">56</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-amber-900 font-semibold">Metals and Non-Metals</span>
      </div>
    </div>
  );
}
