"use client";

import React, { useState } from "react";

export function C8ScienceCh3Page5() {
  const [activeDiscussion, setActiveDiscussion] = useState<number | null>(null);

  const discussions = [
    {
      q: "If we use cotton cloth and cotton ropes in preparing a parachute, what will happen?",
      ans: "Cotton ropes have much lower tensile strength and higher weight compared to nylon. A cotton parachute would be excessively heavy and prone to tearing under high atmospheric tension, leading to catastrophic failure.",
    },
    {
      q: "Traditionally fishermen used cotton nets. Now they are using nylon nets. What is the advantage of using nylon nets?",
      ans: "Nylon nets are far stronger, lighter, non-absorbent, rot-resistant in seawater, and can withstand heavy catches without breaking.",
    },
    {
      q: "Nylon sarees are better than cotton sarees. It is better to use only nylon sarees. Do you agree with this? Why?",
      ans: "No, we do not agree. While nylon is durable and wrinkle-free, cotton allows air circulation and absorbs sweat, making cotton much healthier and more comfortable in tropical/summer climates and safer near heat sources.",
    },
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Thread strength & Think and Discuss & 3.2.2 Rayon */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            Arrange the threads in order of their increasing strength. What do you observe from the above activity?
          </p>

          {/* Steel vs Nylon Standout */}
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-300 bg-emerald-50/50 p-3">
            <img
              src="/assets/images/C8-Science/ch3_fig5.png"
              alt="Fig-5 An iron stand with thread"
              className="h-24 w-auto object-contain rounded border border-emerald-200 bg-white p-1"
            />
            <p className="text-xs font-semibold text-emerald-950 flex-1">
              Do you know that if you compare a nylon thread with a steel wire of the same thickness, <strong>nylon will be as strong as a steel wire?</strong>
            </p>
          </div>

          {/* Think and Discuss Card */}
          <div className="rounded-[20px] border border-emerald-300 bg-emerald-50/30 p-3.5 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-3 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              <span>👥</span>
              <span>Think and discuss</span>
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

          {/* 3.2.2 Rayon Intro */}
          <div className="space-y-2">
            <h3 className="font-heading text-sm font-bold text-emerald-950">
              3.2.2 Rayon (Artificial Silk)
            </h3>
            <p>
              We know about natural silk which is obtained from silkworms. Fabrics made of silk are very costly. Production and maintenance of silk clothes are also difficult, but its texture fascinates everyone.
            </p>
            <p>
              The first commercial production of artificial silk was achieved in USA in 1911. This fibre was named as <strong>rayon</strong> in 1924. The first rayon factory in India was established in Kerala in 1946.
            </p>
          </div>
        </div>

        {/* Right Column: How Rayon is Made */}
        <div className="rounded-[22px] border border-emerald-300 bg-white p-5 shadow-sm space-y-4 text-justify text-xs">
          <h3 className="font-heading text-sm font-bold text-emerald-950 border-b border-emerald-100 pb-2">
            How rayon is made?
          </h3>

          <p>
            The source material for rayon is <strong>wood pulp</strong>. It is the only synthetic (semi-synthetic) fibre obtained from plant cellulose, so it is called a <strong>cellulose fibre</strong>.
          </p>

          {/* Chemical Process Box */}
          <div className="rounded-2xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 space-y-2 text-emerald-950">
            <span className="font-heading text-xs uppercase font-bold text-emerald-800 tracking-wide block">
              Manufacturing Process of Rayon
            </span>
            <p className="leading-relaxed">
              1. The cellulose collected from wood or bamboo pulp is treated with chemicals: <strong>sodium hydroxide</strong> is added, followed by <strong>carbon disulphide</strong>.
            </p>
            <p className="leading-relaxed">
              2. The cellulose dissolves into a thick syrup called <strong>viscose</strong>.
            </p>
            <p className="leading-relaxed">
              3. Viscose is forced through a <strong>Spinneret</strong> (metal plates with tiny holes) into a solution of dilute sulphuric acid.
            </p>
            <p className="leading-relaxed">
              4. Silk-like threads are formed, cleaned with soap, and dried to produce <strong>rayon</strong>.
            </p>
          </div>

          <p>
            Rayon is cheaper than natural silk and can be woven like silk fibres. It can be easily dyed in a wide variety of vibrant colours.
          </p>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">38</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
      </div>
    </div>
  );
}
