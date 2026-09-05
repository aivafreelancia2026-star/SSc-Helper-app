"use client";

import React, { useState } from "react";

export function C8ScienceCh3Page17() {
  const [showSpoilReason, setShowSpoilReason] = useState(false);

  const keywords = [
    "Acrylic",
    "Synthetic fibre",
    "Bakelite",
    "Biodegradable",
    "Blend",
    "Cellulose",
    "Melamine",
    "Natural fibres",
    "Non-biodegradable",
    "Nylon",
    "Petrochemicals",
    "Plastics",
    "Polymer",
    "Polyamide",
    "Polythene",
    "Polyester",
    "Rayon",
    "Recycling",
    "Spinneret",
    "Terricot",
    "Terylene",
    "Terriwool",
    "Thermoplastics",
    "Thermosetting plastics",
    "Universal recycling symbol",
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Chasing arrows, Fig-17, Role of codes */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            To identify the plastic, look at the recycling icon—the chasing arrows. Inside the arrows, there is a number that identifies the specific polymer resin. When the number is omitted, as seen in <strong>Figure 17</strong>, the symbol is known as the <strong>Universal Recycling Symbol</strong>, indicating generic recyclable materials.
          </p>

          {/* Fig 17 Container */}
          <div className="flex flex-col items-center rounded-xl border border-emerald-300 bg-white p-3 text-center space-y-1 shadow-2xs">
            <img
              src="/assets/images/C8-Science/ch3_fig17.png"
              alt="Fig-17 Universal recycling symbol"
              className="h-24 w-auto object-contain"
            />
            <span className="text-[11px] font-semibold text-emerald-950 italic">
              Fig-17 : Universal recycling symbol
            </span>
          </div>

          {/* Role of codes */}
          <div className="rounded-[20px] border border-emerald-300 bg-emerald-50/40 p-4 space-y-2.5">
            <h4 className="font-heading text-xs font-bold text-emerald-950">
              What is the role of codes in recycling process?
            </h4>

            <p>
              Each plastic polymer is manufactured with distinct chemical processes and melts at a unique temperature. During recycling, if distinct codes are not sorted separately, the entire batch will be contaminated and ruined.
            </p>

            <p>
              Therefore, it is essential to recycle the same codes in one lot. If you mix even a single PET bottle (Code 1) into a lot of other plastics (such as HDPE or PVC), the entire batch can be spoiled.
            </p>

            {/* Think Why Box */}
            <div className="rounded-lg border border-emerald-300 bg-white p-2.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-emerald-900 text-[10.5px]">
                  🤔 Think why?
                </span>
                <button
                  onClick={() => setShowSpoilReason(!showSpoilReason)}
                  className="rounded bg-emerald-700 hover:bg-emerald-800 text-white px-2 py-0.5 text-[9px] font-semibold cursor-pointer transition-colors"
                >
                  {showSpoilReason ? "Hide" : "Reveal Answer"}
                </button>
              </div>

              {showSpoilReason && (
                <p className="text-[10px] text-emerald-950 leading-relaxed pt-1">
                  Because PET melts at ~260°C while PVC melts at ~160°C and degrades into toxic chlorine gas if overheated. Mixing plastics creates phase separation, structural weakness, and toxic releases during remolding.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Uncoded Plastics, 4. Recover, Key Words */}
        <div className="space-y-4 text-justify text-xs">
          {/* Uncoded Plastics */}
          <div className="rounded-[20px] border border-emerald-300 bg-white p-3.5 space-y-2">
            <h4 className="font-heading text-xs font-bold text-emerald-950">
              Uncoded plastics
            </h4>

            <p>
              Do all plastics have resin identification codes? Plastic tarps, composite toys, computer keyboards, and electronic casings often do not fit neatly into standard 1–7 resin codes.
            </p>

            <p>
              Thousands of specialized consumer plastics use custom blends and copolymer resins. Recyclers focus primarily on <strong>Code 1 (PET)</strong> and <strong>Code 2 (HDPE)</strong> because their high volume and purity make them commercially viable.
            </p>
          </div>

          {/* 4. Recover */}
          <div className="rounded-[20px] border border-emerald-300 bg-emerald-50/40 p-3.5 space-y-2">
            <h4 className="font-heading text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-[10px] text-white font-mono">
                4
              </span>
              Recover
            </h4>

            <p>
              The Supreme Court of India mandated comprehensive municipal solid waste management guidelines across all Indian cities by 2003. Plastic waste forms the major fraction of municipal landfill refuse.
            </p>

            <p>
              Under the <strong>Recover</strong> principle, non-recyclable solid waste is converted into energy resources such as electricity, thermal heat, compost, and refuse-derived fuel (RDF) through controlled thermal and biological waste-to-energy technologies.
            </p>
          </div>

          {/* Key Words Box */}
          <div className="rounded-[22px] border-2 border-purple-400 bg-gradient-to-br from-purple-50/80 to-fuchsia-50/60 p-4 space-y-2.5">
            <div className="flex items-center gap-2 border-b border-purple-200 pb-1.5">
              <span className="text-sm">🔑</span>
              <h4 className="font-heading text-xs font-bold text-purple-950">
                Key words
              </h4>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {keywords.map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block rounded-md border border-purple-200 bg-white/90 px-2 py-0.5 text-[10px] font-medium text-purple-950 shadow-2xs hover:border-purple-400 transition-colors"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">50</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
      </div>
    </div>
  );
}
