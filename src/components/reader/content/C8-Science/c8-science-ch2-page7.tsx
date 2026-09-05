"use client";

import React, { useState } from "react";

export function C8ScienceCh2Page7() {
  const [activeDiscussion, setActiveDiscussion] = useState<number | null>(null);

  const discussions = [
    {
      q: "Does friction act on a table resting on the floor?",
      ans: "No horizontal frictional force acts on a table merely resting at rest on a level floor. Static friction comes into play only when an external horizontal force is applied attempting to move it.",
    },
    {
      q: "If normal force is doubled, what happens to friction? Discuss.",
      ans: "Since Friction ∝ Normal Force, doubling the normal force doubles the maximum limiting frictional force between the surfaces.",
    },
    {
      q: "Your friend says, 'Friction depends on the area of contact'. How do you correct your friend through some experiments?",
      ans: "Conduct Activity-4 using a spring balance to pull a brick lying flat, and then upright. Both orientations yield the exact same force reading on the spring balance, proving friction is independent of area of contact.",
    },
    {
      q: "'Friction is independent of weight, but depends on normal force between surfaces of contact where friction exists'. Do you agree with this statement? Discuss.",
      ans: "Yes, we agree. For instance, when pressing a block against a vertical wall, friction depends on the horizontal normal force pressed by hand, not on the block's weight directly.",
    },
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Normal Force Proportionality & Think and Discuss */}
        <div className="space-y-4 text-justify text-xs">
          <ul className="rounded-xl border border-sky-200 bg-sky-50/50 p-2.5 text-xs text-sky-950 font-semibold list-disc list-inside">
            <li>Is there any difference between frictional forces in two cases? If yes, why?</li>
          </ul>

          <p>
            From the above activity you can understand that there is a change in the values of frictional force. Frictional force is increasing.
          </p>

          <p>
            When we add a brick to the existing brick or apply a force by pressing it vertically, the normal force increases and hence, we find there is an increase in the frictional force. So, <strong>Friction is proportional to the Normal force</strong> i.e.,
          </p>

          <div className="rounded-2xl border-2 border-fuchsia-400 bg-gradient-to-r from-fuchsia-50 to-pink-50 p-3 text-center text-sm font-extrabold text-fuchsia-950 font-mono shadow-xs">
            Friction &prop; Normal Force
            <span className="block text-[10px] font-sans font-normal text-fuchsia-800/80 mt-0.5">
              (where &prop; is the symbol representing &ldquo;proportional to&rdquo;)
            </span>
          </div>

          {/* Think and Discuss Card */}
          <div className="rounded-[20px] border border-fuchsia-300 bg-fuchsia-50/30 p-4 space-y-3">
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

          {/* 2.4 Section Opener */}
          <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-3 space-y-1.5">
            <h3 className="font-heading text-xs font-bold text-sky-950 uppercase tracking-wide">
              2.4 Is friction necessary?
            </h3>
            <p>
              Have you ever tried to walk on muddy or slippery surface? Why do you find it difficult to walk on slippery surfaces? We cannot walk or run without friction.
            </p>
          </div>
        </div>

        {/* Right Column: World without friction & Activity-6 */}
        <div className="space-y-4 text-justify text-xs">
          <div className="rounded-[20px] border border-sky-300 bg-white p-4 space-y-2.5">
            <h4 className="font-heading text-xs font-bold text-sky-950">
              What would happen if friction were not present?
            </h4>
            <ul className="space-y-1 pl-4 list-disc text-foreground/85 text-[11.5px]">
              <li>We will not have any cars, bicycles or scooters; all move because of friction.</li>
              <li>Even if somebody pushes a car, we will not be able to stop it by applying brakes.</li>
              <li>Carpenters will not be able to smoothen surfaces.</li>
              <li>You will not be able to hold any appliances such as hammer, soap etc.</li>
              <li>It will not be possible to write with pen or pencil.</li>
              <li>You would not be able to fix a nail on the wall.</li>
              <li>No building could be constructed.</li>
            </ul>

            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-2.5 text-[11px] text-amber-950">
              <strong>Friction is also undesirable:</strong> It causes overheating and wear &amp; tear in moving machinery parts. We apply oil or grease to reduce friction.
            </div>
          </div>

          {/* Activity 6 */}
          <div className="rounded-[20px] border-2 border-fuchsia-300 bg-fuchsia-50/40 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-fuchsia-200 pb-2">
              <div className="inline-block rounded-full bg-fuchsia-700 px-3 py-1 text-xs font-bold text-white shadow-2xs font-heading">
                Activity-6
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center rounded-lg bg-white p-1 shadow-2xs border border-fuchsia-200">
                <img
                  src="/assets/images/C8-Science/ch2_qr_act6.png"
                  alt="QR Code 08HSQP"
                  className="h-8 w-8 object-contain"
                />
                <span className="font-mono text-[8px] font-bold tracking-widest text-fuchsia-950 mt-0.5">
                  08HSQP
                </span>
              </div>
            </div>

            <h3 className="font-heading text-sm font-bold text-fuchsia-950">
              Friction produces heat
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex flex-col items-center rounded-xl border border-fuchsia-200 bg-white p-2 shadow-2xs text-center shrink-0">
                <img
                  src="/assets/images/C8-Science/ch2_fig13.png"
                  alt="Fig-13 Rubbing the hands"
                  className="h-20 w-auto object-contain rounded"
                />
                <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
                  Fig-13 : Rubbing the hands
                </span>
              </div>
              <p className="text-xs">
                Rub your palms vigorously against each other for a few minutes. You will feel warmth because mechanical work done against friction is converted into heat energy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">26</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-fuchsia-900 font-semibold">Friction</span>
      </div>
    </div>
  );
}
