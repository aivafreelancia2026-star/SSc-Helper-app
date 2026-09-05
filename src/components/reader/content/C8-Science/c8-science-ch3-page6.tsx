"use client";

import React, { useState } from "react";

export function C8ScienceCh3Page6() {
  const [activeDiscussion, setActiveDiscussion] = useState<number | null>(null);

  const discussions = [
    {
      q: "What characteristics make rayon better than natural silk?",
      ans: "Rayon is significantly more affordable, easier to mass-produce, can be dyed in a vast array of vibrant shades, and provides the elegant drape and lustrous sheen of silk at a fraction of the cost.",
    },
    {
      q: "If you want to purchase a door mat made of synthetic fibre, which synthetic fibre door mat will you select? Why?",
      ans: "Nylon or polypropylene is ideal because these fibres are extremely tough, abrasion-resistant, and do not lose strength when exposed to moisture or mud, unlike rayon.",
    },
    {
      q: "If sanitary diapers and bandages are made of nylon, what will happen?",
      ans: "Nylon has virtually zero water absorbency. Diapers or wound dressings made of nylon would fail to absorb exudate or moisture, trapping fluids and leading to skin maceration and severe rashes.",
    },
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Rayon uses, Fig 6 & Think and Discuss */}
        <div className="space-y-4 text-justify text-xs">
          <ul className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-2.5 text-xs text-emerald-950 font-semibold list-disc list-inside space-y-0.5">
            <li>Is rayon used only for clothes?</li>
            <li>What are the other things that are made from rayon fabric?</li>
          </ul>

          <p>
            Rayon is mixed with cotton to make bed sheets. Rayon is mixed with wool in making of carpets. Rayon is often used in fashion and home furnishings. Rayon is also found in sanitary products, diapers and bandages and lints for dressing wounds (<strong>fig-6</strong>).
          </p>

          {/* Fig 6 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-emerald-200 bg-white p-2 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch3_fig6.png"
              alt="Fig-6 Articles made from rayon"
              className="h-24 w-auto object-contain rounded"
            />
            <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
              Fig-6 : Articles made from rayon.
            </span>
          </div>

          <p>
            Rayon is not a perfect fibre to prepare all fabrics because it is made from plant cellulose; it absorbs water easily. Absorbing water makes rayon weak and causes the fibre to break easily.
          </p>

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

        {/* Right Column: Activity-5 & Blending Concept */}
        <div className="rounded-[22px] border border-emerald-300 bg-white p-5 shadow-sm space-y-4 text-justify text-xs">
          {/* Activity 5 */}
          <div className="rounded-[18px] border border-emerald-200 bg-emerald-50/30 p-3.5 space-y-3">
            <div className="inline-block rounded-full bg-emerald-700 px-3 py-0.5 text-[11px] font-bold text-white shadow-2xs font-heading">
              Activity-5: Why do we combine fibres?
            </div>

            <p>
              Whenever you buy clothes or readymade garments observe the brand label. What do you notice? Or, visit a nearby garment shop and look at the labels on the cloth (<strong>fig-7</strong>).
            </p>

            {/* Fig 7 Container */}
            <div className="flex flex-col items-center rounded-xl border border-emerald-200 bg-white p-2 text-center">
              <img
                src="/assets/images/C8-Science/ch3_fig7.png"
                alt="Fig-7 Labels showing different percentages of blend"
                className="h-28 w-auto object-contain rounded"
              />
              <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
                Fig-7 : Labels showing different percentages of blend
              </span>
            </div>

            <p>
              Record the percentage of different fibres mentioned on the labels. You may find rayon mixed with wool and cotton, polyester mixed with cotton and wool.
            </p>
          </div>

          {/* Master Concept: Blending */}
          <div className="rounded-2xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 space-y-2 text-emerald-950">
            <span className="font-heading text-xs uppercase font-bold text-emerald-800 tracking-wider block">
              Concept of Blending
            </span>
            <p className="leading-relaxed">
              Any synthetic fibre can be combined with two or more other fibres. This is called <strong>blending</strong>. Natural and synthetic fibres are often blended for preparing better fabric. A blend does not simply mean alternating threads of cotton and polyester; it combines the best attributes of both fibres.
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">39</span>
      </div>
    </div>
  );
}
