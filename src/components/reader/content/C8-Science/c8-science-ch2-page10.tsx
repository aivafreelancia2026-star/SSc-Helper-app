"use client";

import React, { useState } from "react";

export function C8ScienceCh2Page10() {
  const [activeDiscussion, setActiveDiscussion] = useState<number | null>(null);

  const discussions = [
    {
      q: "Can we reduce friction to zero? Explain.",
      ans: "No, friction can never be reduced to absolute zero because no surface is perfectly smooth at the microscopic atomic level. Some interlocking irregularities and intermolecular adhesion always remain.",
    },
    {
      q: "What purposes are served by ball bearings in machines? Explain with daily life situations.",
      ans: "Ball bearings replace high sliding friction with much lower rolling friction between the rotating shaft and fixed hub, saving power and preventing wear. Common in ceiling fans, bicycles, roller skates, and dynamos.",
    },
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Rolling Friction & Activity-9 Ball Bearings */}
        <div className="space-y-4 text-justify text-xs">
          {/* Fig 19 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-sky-50/40 p-2 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch2_fig19.png"
              alt="Fig-19 Pushing a book on pencils"
              className="h-16 w-auto object-contain rounded"
            />
            <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
              Fig-19 : Pushing a book on pencils
            </span>
          </div>

          <p>
            Try to push a book lying on the table. Now place the book on two to three pencils or pens without caps. Push the book again.
          </p>

          <ul className="rounded-xl border border-sky-200 bg-white p-2.5 text-xs text-sky-950 font-semibold list-disc list-inside space-y-1">
            <li>What do you notice? Why?</li>
            <li>In which case is it easy to pull the book? Why?</li>
          </ul>

          <div className="rounded-2xl border-2 border-fuchsia-400 bg-fuchsia-50/60 p-3.5 text-fuchsia-950 space-y-1">
            <p>
              It is always easier to roll a body than to slide it over a surface. So it is convenient to pull a suitcase fitted with rollers.
            </p>
            <p className="font-semibold italic">
              &ldquo;When one body rolls over the surface of another body, the friction offered is called <strong>rolling friction</strong>.&rdquo;
            </p>
          </div>

          {/* Activity 9 */}
          <div className="rounded-[20px] border border-sky-300 bg-sky-50/30 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-sky-200 pb-2">
              <div className="inline-block rounded-full bg-fuchsia-700 px-3 py-0.5 text-[11px] font-bold text-white shadow-2xs font-heading">
                Activity-9
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center rounded-lg bg-white p-1 shadow-2xs border border-sky-200">
                <img
                  src="/assets/images/C8-Science/ch2_qr_act9.png"
                  alt="QR Code 0HY8IN"
                  className="h-8 w-8 object-contain"
                />
                <span className="font-mono text-[8px] font-bold tracking-widest text-sky-950 mt-0.5">
                  0HY8IN
                </span>
              </div>
            </div>

            <h3 className="font-heading text-sm font-bold text-sky-950">
              Understanding the principle of ball bearings
            </h3>

            <div className="flex items-center gap-3">
              <img
                src="/assets/images/C8-Science/ch2_fig20.png"
                alt="Fig-20 Rotating the lids"
                className="h-16 w-auto object-contain rounded border border-sky-200 bg-white p-1"
              />
              <p className="text-xs flex-1">
                Take two lids and rotate them by putting one on top of the other. Now place four to five marbles between them and rotate the top lid again.
              </p>
            </div>

            <p className="font-medium text-sky-950">
              This is the principle of <strong>ball bearings</strong>: to reduce friction between rotating shafts of machine tools.
            </p>
          </div>
        </div>

        {/* Right Column: Think & Discuss & 2.6 Fluid Friction */}
        <div className="space-y-4 text-justify text-xs">
          {/* Think and Discuss Card */}
          <div className="rounded-[20px] border border-fuchsia-300 bg-fuchsia-50/30 p-3.5 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-fuchsia-700 px-3 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              <span>👥</span>
              <span>Think and Discuss</span>
            </div>

            <div className="space-y-2">
              {discussions.map((d, idx) => (
                <div key={idx} className="rounded-xl border border-fuchsia-200 bg-white p-2.5 space-y-1">
                  <div className="flex justify-between items-start gap-1">
                    <p className="font-semibold text-fuchsia-950 text-[11px]">&bull; {d.q}</p>
                    <button
                      onClick={() => setActiveDiscussion(activeDiscussion === idx ? null : idx)}
                      className="shrink-0 rounded-md border border-fuchsia-300 bg-fuchsia-100/60 px-1.5 py-0.5 text-[10px] font-semibold text-fuchsia-900 hover:bg-fuchsia-200"
                    >
                      {activeDiscussion === idx ? "Hide" : "Discuss"}
                    </button>
                  </div>
                  {activeDiscussion === idx && (
                    <p className="text-foreground/80 pl-2 border-l-2 border-fuchsia-400 text-[11px] animate-in fade-in">
                      {d.ans}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 2.6 Fluid Friction Header */}
          <div className="rounded-[22px] border border-sky-300 bg-white p-4 shadow-sm space-y-3">
            <h2 className="font-heading text-sm font-bold text-sky-950 border-b border-sky-100 pb-2">
              2.6 Fluid friction
            </h2>

            {/* Activity 10 */}
            <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="inline-block rounded-full bg-fuchsia-700 px-3 py-0.5 text-[11px] font-bold text-white shadow-2xs font-heading">
                  Activity -10: Observing fluid friction
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center rounded-lg bg-white p-1 shadow-2xs border border-sky-200">
                  <img
                    src="/assets/images/C8-Science/ch2_qr_act10.png"
                    alt="QR Code 0N84KA"
                    className="h-8 w-8 object-contain"
                  />
                  <span className="font-mono text-[8px] font-bold tracking-widest text-sky-950 mt-0.5">
                    0N84KA
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center rounded-xl border border-sky-200 bg-white p-1.5 shadow-2xs text-center shrink-0">
                  <img
                    src="/assets/images/C8-Science/ch2_fig21.png"
                    alt="Fig-21 Stirring water"
                    className="h-20 w-auto object-contain rounded"
                  />
                  <span className="mt-0.5 text-[9px] font-medium text-foreground/75 italic">
                    Fig-21 : Stirring water
                  </span>
                </div>
                <p className="text-xs">
                  Take a glass of water and stir it with a spoon. Water whirls around an axis. Stop stirring: the whirling speed gradually decreases and the water comes to rest.
                </p>
              </div>

              <p>
                <strong>Which force stops the rotation of water?</strong> Frictional forces between liquid layers and between liquid surfaces in contact with the glass surface oppose motion and stop the swirling water.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-fuchsia-900 font-semibold">Friction</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">29</span>
      </div>
    </div>
  );
}
