"use client";

import React, { useState } from "react";

export function C8ScienceCh3Page2() {
  const [activeDiscussion, setActiveDiscussion] = useState<number | null>(null);

  const discussions = [
    {
      q: "What made human beings search for the alternative for natural fibres?",
      ans: "Natural fibres such as silk and wool are expensive, labor-intensive, scarce, and dependent on agriculture and livestock. Synthetic fibres were developed to provide durable, affordable, water-resistant, and mass-producible alternatives.",
    },
    {
      q: "Which fibre source is not exhaustible? Why?",
      ans: "Plant-derived natural fibres (like cotton, jute, and hemp) are renewable and non-exhaustible because crops can be grown and harvested continuously each year, unlike petroleum-derived synthetic fibres.",
    },
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: What is synthetic fibre & Activity-2 */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            You notice that the list of household articles made of synthetic fibres is very long. It encompasses all our day to day activities.
          </p>

          <h3 className="font-heading text-sm font-bold text-emerald-950">
            What is synthetic fibre?
          </h3>

          <p>
            Have you seen a bead necklace? Do you observe any pattern in arrangement of beads? (<strong>Figure 2 (a)</strong>). Can you describe the pattern?
          </p>

          {/* Activity 2 Box */}
          <div className="rounded-[20px] border border-emerald-300 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
              <div className="inline-block rounded-full bg-emerald-700 px-3 py-0.5 text-[11px] font-bold text-white shadow-2xs font-heading">
                Activity-2: Beads &amp; paper clips pattern
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center rounded-lg bg-emerald-50 p-1 shadow-2xs border border-emerald-200">
                <img
                  src="/assets/images/C8-Science/ch3_qr_poly.png"
                  alt="QR Code DNGZLX"
                  className="h-8 w-8 object-contain"
                />
                <span className="font-mono text-[8px] font-bold tracking-widest text-emerald-950 mt-0.5">
                  DNGZLX
                </span>
              </div>
            </div>

            {/* Figures 2a, 2b, 2c */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="flex flex-col items-center border border-emerald-100 rounded-lg p-1 bg-emerald-50/20">
                <img
                  src="/assets/images/C8-Science/ch3_fig2a.png"
                  alt="Fig-2(a) bead necklace"
                  className="h-16 w-auto object-contain"
                />
                <span className="text-[9px] text-foreground/75 mt-1 italic">Fig-2(a) bead necklace</span>
              </div>
              <div className="flex flex-col items-center border border-emerald-100 rounded-lg p-1 bg-emerald-50/20">
                <img
                  src="/assets/images/C8-Science/ch3_fig2b.png"
                  alt="Fig-2(b) single paper clip"
                  className="h-16 w-auto object-contain"
                />
                <span className="text-[9px] text-foreground/75 mt-1 italic">Fig-2(b) paper clip</span>
              </div>
              <div className="flex flex-col items-center border border-emerald-100 rounded-lg p-1 bg-emerald-50/20">
                <img
                  src="/assets/images/C8-Science/ch3_fig2c.png"
                  alt="Fig-2(c) paper clips chain"
                  className="h-16 w-auto object-contain"
                />
                <span className="text-[9px] text-foreground/75 mt-1 italic">Fig-2(c) clips chain</span>
              </div>
            </div>

            <p>
              Each paper clip or bead is a separate unit, but when joined together they form a long continuous chain.
            </p>

            <p>
              Similarly, synthetic fibres are chain-like structures formed by joining small units together. Each small unit is called a <strong>monomer</strong>. Thousands of small identical monomers combine to form a giant unit called a <strong>polymer</strong>.
            </p>
          </div>
        </div>

        {/* Right Column: Do You Know, Think & Discuss, 3.2 Intro */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            Unlike natural fibres, synthetic fibres are made from petroleum-based chemicals (petrochemicals) subjected to various chemical polymerization processes.
          </p>

          {/* Do You Know Box */}
          <div className="rounded-2xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 space-y-1.5 text-emerald-950">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-3 py-0.5 text-[10px] font-bold text-white shadow-2xs font-heading">
              <span>💡</span>
              <span>Do you know?</span>
            </div>
            <h4 className="font-heading text-xs font-bold text-emerald-900">
              What does Polymer mean?
            </h4>
            <p className="leading-relaxed">
              <strong>&lsquo;Poly&rsquo;</strong> means many and <strong>&lsquo;mer&rsquo;</strong> means part or unit in Greek. Thus, a polymer is a large macromolecular structure made up of many small repeating units linked together.
            </p>
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

          {/* 3.2 Some synthetic fibres */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3 space-y-1">
            <h3 className="font-heading text-xs font-bold text-emerald-950 uppercase tracking-wider">
              3.2 Some synthetic fibres
            </h3>
            <p>
              How do you find whether a fabric is synthetic or not? Take a piece of cloth and pull out a thread (yarn). Unravel this yarn: is it long, lustrous, or strong?
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">35</span>
      </div>
    </div>
  );
}
