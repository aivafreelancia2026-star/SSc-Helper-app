import React from "react";

export function C8ScienceCh3Page11() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: 3.7 Types of Plastics & Activity-8 & Fig-12 */}
        <div className="space-y-4 text-justify text-xs">
          <div className="rounded-[22px] border border-emerald-300 bg-white p-4 shadow-sm space-y-3">
            <h3 className="font-heading text-sm font-bold text-emerald-950">
              3.7 Types of Plastics
            </h3>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 space-y-2">
              <span className="inline-block rounded-full bg-emerald-700 px-3 py-0.5 text-[10px] font-bold text-white shadow-2xs font-heading">
                Activity-8
              </span>
              <p>
                Let&apos;s take two bottles made of plastic: one is a <strong>PP bottle (Code 5)</strong> and another an ordinary <strong>PET bottle (Code 1)</strong>. Pour some hot water into both. What changes do you notice? Have you experienced such instances in your daily life? Look at <strong>Figure 12</strong> to see the bottle that gets deformed.
              </p>
            </div>

            {/* Fig 12 Container */}
            <div className="flex flex-col items-center rounded-xl border border-emerald-200 bg-white p-3 text-center space-y-1 shadow-2xs">
              <img
                src="/assets/images/C8-Science/ch3_fig12.png"
                alt="Fig-12 Deformed bottle"
                className="h-28 w-auto object-contain"
              />
              <span className="text-[11px] font-semibold text-emerald-950 italic">
                Fig-12 : Deformed bottle
              </span>
            </div>

            <p>
              Plastics that get deformed easily upon heating and can be easily bent are known as <strong>thermoplastics</strong>. Common examples include <em>polythene</em> and <em>PVC</em>. These are widely used in manufacturing toys, combs, and various storage containers.
            </p>

            <p>
              On the other hand, some plastics, once molded into shape, cannot be softened by heating. These are called <strong>thermosetting plastics</strong>. <em>Bakelite</em> and <em>melamine</em> are prime examples.
            </p>

            <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-2.5 text-teal-950 italic text-[11px]">
              🤔 Can you tell whether PP (Polypropylene) is a thermosetting plastic or a thermoplastic?
            </div>

            <p>
              Thus, we can conclude that different plastics possess distinct physical properties. Plastics are easily moldable, convertible into diverse geometries, recyclable, reusable, colorable, and can be melted and drawn into sheets and wires.
            </p>
          </div>
        </div>

        {/* Right Column: Lab Activity (Flame Test) & Fig-13 */}
        <div className="space-y-4 text-justify text-xs">
          <div className="rounded-[22px] border-2 border-purple-400 bg-white p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-purple-200 pb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-700 text-white text-xs shadow-2xs font-mono font-bold">
                🔬
              </span>
              <h4 className="font-heading text-xs font-bold text-purple-950">
                Lab Activity: Flame Test on Plastics
              </h4>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <p>
                <strong className="text-purple-950">Aim:</strong> Identifying thermoplastic and thermosetting plastics by flame test.
              </p>
              <p>
                <strong className="text-purple-950">Materials required:</strong> Pair of tongs, spirit lamp, samples of plastics (collect small pieces from objects like comb, toothbrush handle, plastic bucket, utensil handle, electric switch, melamine meal plate, and coffee mug).
              </p>
            </div>

            {/* Fig 13 Container */}
            <div className="flex flex-col items-center rounded-xl border border-purple-200 bg-purple-50/40 p-2.5 text-center space-y-1 shadow-2xs">
              <img
                src="/assets/images/C8-Science/ch3_fig13.png"
                alt="Fig-13 Conducting flame test"
                className="h-24 w-auto object-contain rounded"
              />
              <span className="text-[10.5px] font-semibold text-purple-950 italic">
                Fig-13 : Conducting flame test
              </span>
            </div>

            {/* Procedure */}
            <div className="space-y-1.5 text-[11px]">
              <strong className="text-purple-950 font-heading block">Procedure:</strong>
              <ol className="list-decimal list-inside space-y-1 text-foreground/85">
                <li>Light a spirit lamp in a well-ventilated laboratory area.</li>
                <li>Clamp one plastic sample securely with metal tongs (e.g., piece of toothbrush).</li>
                <li>Carefully hold the sample near the edge of the spirit lamp flame (Fig. 13). Observe the changes during heating.</li>
                <li>Record whether the sample softens, burns with a specific odor, chars, or becomes hard.</li>
                <li>Repeat the test for all remaining plastic samples and record in Table-3.</li>
              </ol>
            </div>

            {/* Safety Note */}
            <div className="rounded-xl border border-amber-300 bg-amber-50/70 p-2.5 text-[10.5px] text-amber-950 space-y-0.5">
              <strong className="block font-heading text-amber-900">⚠️ Safety Precaution:</strong>
              <p>
                Cover nose and mouth with a protective mask to avoid inhaling toxic polymer fumes. Keep face and hands at a safe stretched distance from the flame.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">44</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
      </div>
    </div>
  );
}
