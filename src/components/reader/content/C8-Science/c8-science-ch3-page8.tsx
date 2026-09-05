"use client";

import React, { useState } from "react";

export function C8ScienceCh3Page8() {
  const [activeDiscussion, setActiveDiscussion] = useState<number | null>(null);

  const discussions = [
    {
      q: "Which fabrics do you prefer? Natural or synthetic? Why? Discuss comparatively.",
      ans: "Natural fabrics (cotton, linen) are preferred for everyday wear and warm seasons due to breathability and high sweat absorption. Synthetic fabrics (polyester, nylon) are preferred for rainwear, sportswear, and travel due to water resistance, elasticity, quick drying, and wrinkle resistance.",
    },
    {
      q: "What is the difference between washing clothes at home and dry cleaning at laundry?",
      ans: "Home washing uses water and soap/detergent, which can cause swelling and shrinkage in delicate natural fibres. Dry cleaning uses non-aqueous organic solvents (like perchloroethylene) without water, gently removing grease and stains without distorting or shrinking delicate fabrics.",
    },
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Why Synthetic Fibres & Fire Hazard & Laundry Codes */}
        <div className="space-y-4 text-justify text-xs">
          <h3 className="font-heading text-sm font-bold text-emerald-950">
            3.3.1 Why synthetic fibres?
          </h3>

          <p>
            What kind of umbrella would you use on a rainy day? Synthetic fibres absorb far less water and dry at a faster rate. Most of them are durable, less expensive, readily available, affordable and easy to maintain.
          </p>

          {/* Fire Hazard Warning Alert */}
          <div className="rounded-2xl border-2 border-rose-400 bg-rose-50/70 p-3.5 space-y-1 text-rose-950">
            <span className="font-heading font-bold text-xs uppercase text-rose-900 flex items-center gap-1.5">
              <span>⚠️</span> Safety Warning: Fire Hazard
            </span>
            <p className="leading-relaxed">
              Synthetic fibres <strong>melt on heating</strong>. If synthetic fabric catches fire, it melts and sticks directly to the skin of the person wearing it. <strong>Never wear synthetic clothes while working in the kitchen or in a chemistry laboratory!</strong>
            </p>
          </div>

          {/* Fig 8 Laundry Labels */}
          <div className="rounded-[18px] border border-emerald-200 bg-emerald-50/40 p-3 space-y-2">
            <div className="flex flex-col items-center rounded-xl border border-emerald-200 bg-white p-2 text-center">
              <img
                src="/assets/images/C8-Science/ch3_fig8.png"
                alt="Fig-8 Laundry label codes"
                className="h-24 w-auto object-contain rounded"
              />
              <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
                Fig-8 : Laundry label codes
              </span>
            </div>
            <p className="text-[11px] text-emerald-950 font-medium text-center">
              Symbols showing precautions to be followed while washing and ironing.
            </p>
          </div>
        </div>

        {/* Right Column: Think & Discuss & 3.4 Polyesters */}
        <div className="space-y-4 text-justify text-xs">
          {/* Think and Discuss Card */}
          <div className="rounded-[20px] border border-emerald-300 bg-emerald-50/30 p-3.5 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-3 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              <span>👥</span>
              <span>Think and Discuss</span>
            </div>

            <div className="space-y-2">
              {discussions.map((d, idx) => (
                <div key={idx} className="rounded-xl border border-emerald-200 bg-white p-2.5 space-y-1">
                  <div className="flex justify-between items-start gap-1">
                    <p className="font-semibold text-emerald-950 text-[11px]">&bull; {d.q}</p>
                    <button
                      onClick={() => setActiveDiscussion(activeDiscussion === idx ? null : idx)}
                      className="shrink-0 rounded-md border border-emerald-300 bg-emerald-100/60 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-900 hover:bg-emerald-200"
                    >
                      {activeDiscussion === idx ? "Hide" : "Discuss"}
                    </button>
                  </div>
                  {activeDiscussion === idx && (
                    <p className="text-foreground/80 pl-2 border-l-2 border-emerald-400 text-[11px] animate-in fade-in">
                      {d.ans}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3.4 Polyesters Header */}
          <div className="rounded-[22px] border border-emerald-300 bg-white p-4 shadow-sm space-y-3">
            <h3 className="font-heading text-sm font-bold text-emerald-950 border-b border-emerald-100 pb-1.5">
              3.4 Polyesters
            </h3>

            <p>
              <strong>Polyester</strong> is the most commonly used synthetic fibre. Fabric made from polyester does not get wrinkled easily, remains crisp, and is easily washable.
            </p>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-2.5 space-y-1">
              <strong className="text-emerald-950 block">Terylene &amp; Common Blends:</strong>
              <p>
                <strong>Terylene</strong> is a popular polyester drawn into very fine fibres. It blends well with natural fibres to produce <strong>terricot</strong> (terylene + cotton) and <strong>terriwool</strong> (terylene + wool).
              </p>
            </div>

            <p>
              Polyester is synthesized by reacting <strong>terephthalic acid</strong> with <strong>di-methyl ether</strong> and <strong>dihydric alcohol</strong>. It is spun into ultra-thin microfibers offering a soft, smooth feel.
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">41</span>
      </div>
    </div>
  );
}
