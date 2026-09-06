"use client";

import React, { useState } from "react";

export function C8ScienceCh2Page8() {
  const [activeDiscussion, setActiveDiscussion] = useState<number | null>(null);

  const discussions = [
    {
      q: "What important role does friction play in the life of human being and animals?",
      ans: "Friction enables humans and animals to walk, run, climb, and grasp objects without slipping. Without friction at foot/paw contact points, movement would be impossible.",
    },
    {
      q: "Why is friction important for transport?",
      ans: "Friction between tire treads and road surfaces allows vehicles to accelerate without spinning wheels in place, navigate turns safely without skidding, and come to a prompt stop when brakes are applied.",
    },
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Matchstick, Heat Shield & Think and Discuss */}
        <div className="space-y-4 text-justify text-xs">
          {/* Fig 14 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-fuchsia-200 bg-fuchsia-50/30 p-2.5 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch2_fig14.png"
              alt="Fig-14 Striking a matchstick against the surface of matchbox"
              className="h-24 w-auto object-contain rounded"
            />
            <span className="mt-1 text-[11px] font-medium text-foreground/75 italic">
              Fig-14 : Striking a matchstick against the surface of matchbox
            </span>
          </div>

          <ul className="rounded-xl border border-sky-200 bg-sky-50/40 p-2.5 text-xs text-sky-950 font-semibold list-disc list-inside space-y-1">
            <li>Rub your palms against each other for a few minutes. How do you feel?</li>
            <li>Strike a match stick against the rough surface of match box. What happens?</li>
          </ul>

          <p>
            In both activities we observe that because of friction, the temperature of the surfaces increases. A matchstick catches fire because of the increase in temperature caused by friction. Thus, we can conclude that <strong>friction can produce heat</strong>.
          </p>

          {/* Spacecraft Heat Shield Box */}
          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-3.5 space-y-1 text-amber-950">
            <span className="font-heading font-bold text-xs uppercase text-amber-900 block">
              🚀 Space Craft Heat Shield
            </span>
            <p>
              When a spacecraft re-enters the Earth&apos;s atmosphere at tremendous speeds, intense friction with atmospheric gases generates extreme heat. Specially designed thermal/ceramic <strong>heat shields</strong> insulate and protect the spacecraft from burning up.
            </p>
          </div>

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
        </div>

        {/* Right Column: 2.5 Increasing and decreasing friction & Activity-7 */}
        <div className="rounded-[22px] border border-fuchsia-300 bg-white p-5 shadow-sm space-y-4 text-justify text-xs">
          <div className="flex items-center justify-between border-b border-fuchsia-100 pb-2">
            <h2 className="font-heading text-sm font-bold text-fuchsia-950">
              2.5 Increasing and decreasing friction
            </h2>

            {/* QR Code */}
            <div className="flex flex-col items-center rounded-lg bg-fuchsia-50 p-1 shadow-2xs border border-fuchsia-200">
              <img
                src="/assets/images/C8-Science/ch2_qr_act7.png"
                alt="QR Code 08FGFC"
                className="h-8 w-8 object-contain"
              />
              <span className="font-mono text-[8px] font-bold tracking-widest text-fuchsia-950 mt-0.5">
                08FGFC
              </span>
            </div>
          </div>

          {/* Activity 7 */}
          <div className="rounded-xl border border-sky-200 bg-sky-50/30 p-3 space-y-2">
            <div className="inline-block rounded-full bg-fuchsia-700 px-3 py-0.5 text-[11px] font-bold text-white shadow-2xs font-heading">
              Activity-7: How to reduce friction?
            </div>
            <p>
              Take a spoon and hold its head (broader portion) in the left hand and hold the mid portion of the spoon with the right hand and pull it towards the other end of the spoon.
            </p>
            <ul className="list-disc list-inside text-foreground/80 space-y-0.5">
              <li>What do you notice?</li>
            </ul>
            <p>
              Now dip your right hand fingers in water, and do it again as described above. Repeat with coconut oil or grease.
            </p>
            <p className="font-semibold text-sky-950">
              In the former case (dry), friction is more; in the latter cases with water, oil, or grease (lubricants), friction is significantly reduced.
            </p>
          </div>

          {/* Increasing Friction: Grooved Shoes */}
          <div className="flex items-center gap-4 rounded-xl border border-fuchsia-200 bg-fuchsia-50/20 p-3">
            <div className="flex flex-col items-center rounded-xl border border-fuchsia-200 bg-white p-2 shadow-2xs text-center shrink-0">
              <img
                src="/assets/images/C8-Science/ch2_fig15.png"
                alt="Fig-15 Bottom of the shoe"
                className="h-20 w-auto object-contain rounded"
              />
              <span className="mt-1 text-[9px] font-medium text-foreground/75 italic">
                Fig-15 : Bottom of shoe
              </span>
            </div>
            <p className="text-xs">
              <strong>Why are shoe soles grooved?</strong> Grooving creates rougher treads on soles, which increases friction with the floor and provides firm grip, preventing us from slipping.
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-fuchsia-900 font-semibold">Friction</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">27</span>
      </div>
    </div>
  );
}
