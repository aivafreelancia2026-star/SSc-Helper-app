"use client";

import React, { useState } from "react";

export function C8ScienceCh3Page13() {
  const [showTeflonAnswer, setShowTeflonAnswer] = useState(false);
  const [showFiremanAnswer, setShowFiremanAnswer] = useState(false);

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Bakelite, Melamine, Fig-14, Fig-15 & 3.7.3 Why do we prefer plastics? */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            <strong>Bakelite</strong> is used for making handles of various cookware utensils due to its poor conductivity of heat and electricity. It is also used for making electrical switches, plug boards, and as a lustrous alternative for pearl and jade jewelry.
          </p>

          {/* Fig 14: Bakelite Articles */}
          <div className="flex flex-col items-center rounded-xl border border-purple-200 bg-white p-2.5 text-center space-y-1 shadow-2xs">
            <img
              src="/assets/images/C8-Science/ch3_fig14.png"
              alt="Fig-14 Articles made of Bakelite"
              className="h-16 w-auto object-contain"
            />
            <span className="text-[10px] font-semibold text-purple-950 italic">
              Fig-14 : Articles made of Bakelite (Switch board, pan handle, ornament)
            </span>
          </div>

          <p>
            The other thermosetting plastic, <strong>Melamine</strong>, is used extensively for making unbreakable dinnerware and kitchenware. Because of its exceptional <strong>fire resistance</strong>, it is also used in manufacturing fire-retardant floor tiles, firefighter uniforms, and computer/TV monitor cabinets.
          </p>

          {/* Fig 15: Melamine Articles */}
          <div className="flex flex-col items-center rounded-xl border border-purple-200 bg-white p-2.5 text-center space-y-1 shadow-2xs">
            <img
              src="/assets/images/C8-Science/ch3_fig15.png"
              alt="Fig-15 Articles of Melamine"
              className="h-16 w-auto object-contain"
            />
            <span className="text-[10px] font-semibold text-purple-950 italic">
              Fig-15 : Articles of Melamine (Keyboard casings, dinnerware)
            </span>
          </div>

          {/* Section 3.7.3 */}
          <div className="rounded-[20px] border border-emerald-300 bg-emerald-50/40 p-3.5 space-y-2">
            <h3 className="font-heading text-xs font-bold text-emerald-950">
              3.7.3 Why do we prefer plastics?
            </h3>
            <p>
              <strong>Plastics are non-reactive:</strong> Iron gates, nails, and metal objects exposed to moisture and air rapidly rust and corrode. Plastics do not react with water, air, or acids, making them ideal containers to store foods, liquids, and even harsh chemicals.
            </p>
          </div>
        </div>

        {/* Right Column: Baekeland & Hot Pin Test & Think and Discuss */}
        <div className="space-y-4 text-justify text-xs">
          {/* Do You Know: Leo Baekeland */}
          <div className="rounded-[22px] border-2 border-purple-400 bg-gradient-to-br from-purple-50/80 via-pink-50/40 to-purple-50/70 p-4 shadow-sm space-y-2.5 text-purple-950">
            <div className="flex items-center gap-1.5 border-b border-purple-300 pb-1.5">
              <span className="rounded-full bg-purple-700 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-2xs font-heading">
                💡 Do you know?
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="space-y-1 flex-1">
                <h4 className="font-heading text-[11.5px] font-bold text-purple-950">
                  Father of Plastic Industry
                </h4>
                <p className="text-[10.5px] leading-relaxed">
                  Belgian chemist <strong>Dr. Leo Hendrik Baekeland</strong> invented <strong>Bakelite in 1907</strong> by reacting carbolic acid (phenol) and formaldehyde. Upon reheating the cured material, he discovered it would never melt—becoming the first truly synthetic, thermosetting plastic.
                </p>
              </div>

              <div className="shrink-0 flex flex-col items-center rounded-lg border border-purple-300 bg-white p-1 shadow-2xs">
                <img
                  src="/assets/images/C8-Science/ch3_baekeland.png"
                  alt="Dr. Leo Hendrik Baekeland"
                  className="h-16 w-auto rounded object-cover"
                />
                <span className="text-[7.5px] font-semibold text-purple-950 mt-0.5">
                  L. Baekeland
                </span>
              </div>
            </div>

            {/* Hot Pin Test */}
            <div className="rounded-xl border border-purple-200 bg-white/80 p-2 text-[10.5px] space-y-1">
              <strong className="text-purple-950 font-heading block">Hot Pin Test for Bakelite:</strong>
              <p>
                Touch a glowing hot pin to the plastic item: if it is genuine Bakelite, the pin will <strong>not penetrate or melt</strong> the surface, but may emit a carbolic acid aroma and leave a faint mark.
              </p>
            </div>
          </div>

          <p>
            Plastics are lightweight, strong, durable, moldable into diverse geometries, and significantly cheaper than metals. They are also electrical and thermal insulators, which is why electrical wires have plastic sheathing and screwdrivers have plastic handles.
          </p>

          {/* Think and Discuss */}
          <div className="rounded-[20px] border-2 border-emerald-400 bg-emerald-50/50 p-3.5 space-y-2.5">
            <div className="flex items-center gap-1.5 border-b border-emerald-200 pb-1">
              <span className="text-xs">🤔</span>
              <h4 className="font-heading text-xs font-bold text-emerald-950">
                Think and Discuss
              </h4>
            </div>

            <div className="space-y-2 text-[11px]">
              {/* Question 1: Non-stick pan */}
              <div className="rounded-lg border border-emerald-200 bg-white p-2 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-emerald-950">
                    • What makes fry pans non-stick?
                  </span>
                  <button
                    onClick={() => setShowTeflonAnswer(!showTeflonAnswer)}
                    className="rounded bg-emerald-700 text-white px-2 py-0.5 text-[9px] font-semibold cursor-pointer"
                  >
                    {showTeflonAnswer ? "Hide" : "Answer"}
                  </button>
                </div>
                {showTeflonAnswer && (
                  <p className="text-[10px] text-emerald-900 pt-0.5">
                    <strong>Teflon (PTFE - Polytetrafluoroethylene)</strong> is a special plastic coated on cookware to which oil and water do not stick.
                  </p>
                )}
              </div>

              {/* Question 2: Fireman uniform */}
              <div className="rounded-lg border border-emerald-200 bg-white p-2 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-emerald-950">
                    • What fabric makes firemen suits fire-retardant?
                  </span>
                  <button
                    onClick={() => setShowFiremanAnswer(!showFiremanAnswer)}
                    className="rounded bg-emerald-700 text-white px-2 py-0.5 text-[9px] font-semibold cursor-pointer"
                  >
                    {showFiremanAnswer ? "Hide" : "Answer"}
                  </button>
                </div>
                {showFiremanAnswer && (
                  <p className="text-[10px] text-emerald-900 pt-0.5">
                    Firefighters wear uniforms coated with <strong>Melamine</strong>, a thermosetting plastic with exceptional flame resistance that chars without propagating flames.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">46</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
      </div>
    </div>
  );
}
