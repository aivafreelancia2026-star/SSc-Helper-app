"use client";

import React, { useState } from "react";

export function C8ScienceCh2Page4() {
  const [activeDiscussion, setActiveDiscussion] = useState<number | null>(null);

  const discussions = [
    {
      q: "Does friction oppose motion or relative motion of surfaces in contact? Discuss.",
      ans: "Friction opposes relative motion between the two contact surfaces. For example, when walking, static friction between foot and ground actually propels us forward by opposing the backward slip of our shoes relative to the ground.",
    },
    {
      q: "What observations and experiments can you cite to show the existence of friction?",
      ans: "Rolling a ball on a floor stops after some distance; sliding a book comes to a halt; tires grip the road; striking a matchstick produces heat; and shoes wear out over time due to frictional contact.",
    },
    {
      q: "When do we speak of 'sliding friction'?",
      ans: "We speak of sliding (kinetic) friction when one body actually slides over the surface of another body with relative motion.",
    },
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Top Recap Box: Static Friction */}
      <div className="rounded-[20px] border border-sky-200 bg-sky-50/50 p-4 text-xs space-y-2 text-justify">
        <p className="italic font-medium text-sky-950">
          &ldquo;So, <strong>static friction</strong> is the friction which comes into play when surfaces of the objects are at rest relative to each other even though there is an external force acting on them.&rdquo;
        </p>
        <p className="text-foreground/80">
          In the lab activity we observe that there exist two types of frictional forces at a time: one is friction between the surface of the table and trolley, and the other is the static friction that exists between the surface of the trolley and wooden block kept on it.
        </p>
      </div>

      {/* 2.2 Section */}
      <div className="rounded-[22px] border border-fuchsia-300 bg-white p-5 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-fuchsia-100 pb-3">
          <h2 className="font-heading text-base font-bold text-fuchsia-950">
            2.2 Observing the variation of friction
          </h2>

          {/* QR Code */}
          <div className="flex flex-col items-center rounded-lg bg-fuchsia-50 p-1 shadow-2xs border border-fuchsia-200">
            <img
              src="/assets/images/C8-Science/ch2_qr_act2.png"
              alt="QR Code 08P9IY"
              className="h-10 w-10 object-contain"
            />
            <span className="font-mono text-[9px] font-bold tracking-widest text-fuchsia-950 mt-0.5">
              08P9IY
            </span>
          </div>
        </div>

        {/* Activity 2 */}
        <div className="rounded-[18px] border border-sky-200 bg-sky-50/30 p-4 space-y-4">
          <div className="inline-block rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
            Activity-2
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left Column: Fig 6 & Small force */}
            <div className="space-y-3 text-justify text-xs">
              <p>
                Push a heavy box which is kept on a floor with a small force to move horizontally as shown in <strong>fig-6</strong>. The box does not move because there is a frictional force which is equal and opposite to the applied force on the box.
              </p>

              {/* Fig 6 Container */}
              <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-white p-2.5 shadow-2xs text-center">
                <img
                  src="/assets/images/C8-Science/ch2_fig6.png"
                  alt="Fig-6 Pushing a heavy box with small force"
                  className="h-28 w-auto object-contain rounded"
                />
                <span className="mt-1 text-[11px] font-medium text-foreground/75 italic">
                  Fig-6 : Pushing a heavy box with small force
                </span>
              </div>

              <p>
                Now gradually increase the applied force, the box still does not move. The applied force and frictional force both are equal and opposite because the frictional force also increases accordingly and thus balances the increased applied force.
              </p>

              <div className="rounded-xl border-2 border-fuchsia-300 bg-fuchsia-50/70 p-3 text-xs text-fuchsia-950 font-semibold">
                From this experience we conclude that <strong>static friction is a self adjusting force</strong>.
              </div>
            </div>

            {/* Right Column: Fig 7 & Fig 8 & Limiting static friction */}
            <div className="space-y-3 text-justify text-xs">
              {/* Fig 7 Container */}
              <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-white p-2 shadow-2xs text-center">
                <img
                  src="/assets/images/C8-Science/ch2_fig7.png"
                  alt="Fig-7 Pushing a heavy box with increasing force"
                  className="h-24 w-auto object-contain rounded"
                />
                <span className="mt-1 text-[11px] font-medium text-foreground/75 italic">
                  Fig-7 : Pushing a heavy box with increasing force.
                </span>
              </div>

              <p>
                But there is a limit to this static friction. As you keep on increasing the applied force, at some point the box starts moving. That is, when the applied force is more than the limit of the static friction, the body starts to move as shown in <strong>fig-8</strong>.
              </p>

              {/* Fig 8 Container */}
              <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-white p-2 shadow-2xs text-center">
                <img
                  src="/assets/images/C8-Science/ch2_fig8.png"
                  alt="Fig-8 The heavy box starts moving"
                  className="h-24 w-auto object-contain rounded"
                />
                <span className="mt-1 text-[11px] font-medium text-foreground/75 italic">
                  Fig-8 : The heavy box starts moving
                </span>
              </div>

              <p className="font-medium text-sky-950">
                When the box is sliding on the floor, the friction between them is called <strong>sliding friction</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Think and Discuss Card */}
      <div className="rounded-[22px] border-2 border-fuchsia-400 bg-fuchsia-50/40 p-5 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-700 px-4 py-1.5 text-xs font-bold text-white shadow-2xs font-heading">
          <span>👥</span>
          <span>Think and Discuss</span>
        </div>

        <div className="space-y-2 text-xs">
          {discussions.map((d, idx) => (
            <div key={idx} className="rounded-xl border border-fuchsia-200 bg-white p-3 space-y-1.5">
              <div className="flex justify-between items-start gap-2">
                <p className="font-semibold text-fuchsia-950">&bull; {d.q}</p>
                <button
                  onClick={() => setActiveDiscussion(activeDiscussion === idx ? null : idx)}
                  className="shrink-0 rounded-md border border-fuchsia-300 bg-fuchsia-100/60 px-2 py-0.5 text-[11px] font-semibold text-fuchsia-900 hover:bg-fuchsia-200 transition-colors"
                >
                  {activeDiscussion === idx ? "Hide Answer" : "Discuss"}
                </button>
              </div>
              {activeDiscussion === idx && (
                <p className="text-foreground/80 pl-3 border-l-2 border-fuchsia-400 mt-1 animate-in fade-in">
                  {d.ans}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-fuchsia-900 font-semibold">Friction</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">23</span>
      </div>
    </div>
  );
}
