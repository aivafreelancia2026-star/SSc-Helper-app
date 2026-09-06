"use client";

import React, { useState } from "react";

export function C8ScienceCh3Page7() {
  const [activeDiscussion, setActiveDiscussion] = useState<number | null>(null);

  const discussions = [
    {
      q: "Which type of blended fabrics do you find more comfortable in winter? Why?",
      ans: "Wool-acrylic or polywool blends offer superior comfort in winter: natural wool provides cozy breathability and heat retention, while acrylic/polyester prevents shrinkage, adds durability, and reduces bulkiness.",
    },
    {
      q: "Which fabrics will you prefer to wear for rare occasions like functions and in routine? Why?",
      ans: "For daily routine, 100% cotton or polycot blends are ideal for absorbency and skin health. For festive functions, silk or lustrous synthetic/blended fabrics (polyester/rayon) offer vibrant elegance and wrinkle-free drape.",
    },
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Benefits of Blending & 3.3 Acrylic Intro */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            When a fibre is combined with another fibre, certain qualities of the first fibre are combined with the qualities of other fibres, giving us a blended fabric possessing the best qualities of both. Blending helps us reduce the limitations of individual fibres.
          </p>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 space-y-1.5">
            <strong className="text-emerald-950 block">Example: Cotton &amp; Polyester Blend (Polycot)</strong>
            <p>
              Cotton is comfortable to wear but forms wrinkles. Polyester is wrinkle-free. Cotton shrinks in washing while polyester does not. When combined in a proper ratio, the resultant material is comfortable, wrinkle-free, and resistant to shrinkage.
            </p>
          </div>

          <p>
            The higher the percentage of natural fibre in a blend, the greater the comfort to the skin because natural fibres allow the skin to breathe easily.
          </p>

          {/* 3.3 Acrylic Header */}
          <div className="rounded-[20px] border border-emerald-300 bg-white p-4 space-y-2">
            <h3 className="font-heading text-sm font-bold text-emerald-950">
              3.3 Acrylic (Artificial Wool)
            </h3>
            <p>
              What type of clothes do you wear in winter? We wear sweaters, shawls or blankets. Wool is very expensive and not accessible to everyone. Think: how many sheep would be needed to obtain wool for everyone in India?
            </p>
            <p>
              All modern winter wear is largely made of a synthetic fibre called <strong>acrylic</strong>, which became commercially available in 1941.
            </p>
          </div>
        </div>

        {/* Right Column: Acrylic Properties, Uses & Think and Discuss */}
        <div className="space-y-4 text-justify text-xs">
          <div className="rounded-[20px] border border-emerald-300 bg-white p-4 space-y-2.5">
            <p>
              Acrylic looks like natural wool and is considered <strong>artificial wool</strong> (often called <em>&lsquo;fake fur&rsquo;</em>).
            </p>

            <p>
              It is made from petrochemicals and spun by either <strong>dry spinning</strong> (dissolved polymers extruded into warm air to solidify by evaporation) or <strong>wet spinning</strong> (extruded into a chemical coagulation bath).
            </p>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 space-y-1">
              <span className="font-bold text-emerald-950 block">Applications of Acrylic:</span>
              <p>
                Knitted apparels, socks, sportswear, sweaters, craft yarns, upholstery fabric, carpets, luggage awnings, and vehicle covers.
              </p>
            </div>
          </div>

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
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">40</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
      </div>
    </div>
  );
}
