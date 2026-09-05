"use client";

import React, { useState } from "react";

export function C8ScienceCh3Page16() {
  const [showReuseExamples, setShowReuseExamples] = useState(false);

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Reduce conclusions, Reuse, and Recycle introduction */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            ...of? Everything is made of plastic. Imagine how much plastic garbage accumulates from a single celebratory function! Is there a way to stop this &ldquo;Use and throw&rdquo; culture?
          </p>

          <p>
            Landfilling of plastics and burning of plastics in incinerators are other ways of disposing of plastics, but they too have serious negative environmental consequences. Therefore, we must reduce plastic usage whenever possible.
          </p>

          {/* 2. Reuse */}
          <div className="rounded-[20px] border border-emerald-300 bg-white p-4 shadow-sm space-y-2.5">
            <h4 className="font-heading text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-[10px] text-white font-mono">
                2
              </span>
              Reuse
            </h4>

            <p>
              Have you observed that when we go to the market to buy something, we often go without a bag? As a result, we return with numerous plastic bags. Every shopping trip leads to an accumulation of plastic bags.
            </p>

            <p>
              Articles made of plastics should be used repeatedly for optimum utilization. If any item feels out of fashion and you wish to buy a new one, donate it to someone who needs it rather than keeping it idle or throwing it away.
            </p>

            {/* Interactive Reuse Prompt */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-2.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-emerald-950 text-[11px]">
                  • Can you give instances where we can reuse plastics?
                </span>
                <button
                  onClick={() => setShowReuseExamples(!showReuseExamples)}
                  className="rounded bg-emerald-700 hover:bg-emerald-800 text-white px-2 py-0.5 text-[9.5px] font-semibold cursor-pointer transition-colors"
                >
                  {showReuseExamples ? "Hide" : "Explore Examples"}
                </button>
              </div>

              {showReuseExamples && (
                <ul className="list-disc list-inside space-y-1 text-[10.5px] text-emerald-900 pt-1">
                  <li>Carrying washable cloth or jute bags to the market repeatedly.</li>
                  <li>Reusing plastic buckets, jars, and oil tins for plant gardening or storage.</li>
                  <li>Refilling liquid soap dispensers and detergent containers instead of buying new dispensers.</li>
                </ul>
              )}
            </div>
          </div>

          {/* 3. Recycle */}
          <div className="rounded-[20px] border border-emerald-300 bg-white p-4 shadow-sm space-y-2.5">
            <h4 className="font-heading text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-[10px] text-white font-mono">
                3
              </span>
              Recycle
            </h4>

            <p>
              You might have noticed your family selling broken or unusable old plastic articles to the local scrap vendor (<em>kabadiwala</em>).
            </p>
          </div>
        </div>

        {/* Right Column: Recyclability & 60,000 Plastics & Resin Identification Code */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            What do vendors do with collected plastics? They aggregate all household plastic waste and send it to recycling facilities. From this recycled plastic, new products are manufactured after receiving proper processing and treatment.
          </p>

          <div className="rounded-[22px] border border-teal-300 bg-teal-50/30 p-4 space-y-2.5">
            <h4 className="font-heading text-xs font-bold text-teal-950">
              • Are all types of plastics recyclable?
            </h4>

            <p>
              There are over <strong>60,000 types of plastics</strong> available in the modern world! However, only <strong>6 primary varieties</strong> are commonly used in our everyday households. Each of these six plastics is assigned a specific numerical code to enable rapid sorting and recycling.
            </p>

            <div className="grid grid-cols-2 gap-2 text-[10.5px]">
              <div className="rounded-lg border border-teal-200 bg-white p-2 text-teal-950">
                <strong className="block text-emerald-800">Commonly Recycled:</strong>
                <p>• <strong>PET (Code 1):</strong> Water & soda bottles</p>
                <p>• <strong>HDPE (Code 2):</strong> Milk jugs, shampoo bottles</p>
                <p>• <strong>PS (Code 6):</strong> Egg boxes, takeout containers</p>
              </div>
              <div className="rounded-lg border border-teal-200 bg-white p-2 text-teal-950">
                <strong className="block text-rose-800">Harder / Rarely Recycled:</strong>
                <p>• <strong>PVC (Code 3):</strong> Plumbing pipes</p>
                <p>• <strong>LDPE (Code 4):</strong> Carrier grocery bags</p>
                <p>• <strong>PP (Code 5):</strong> Medicine bottles, straws</p>
              </div>
            </div>
          </div>

          {/* Section: Recycling Code & SPI History */}
          <div className="rounded-[22px] border-2 border-emerald-400 bg-white p-4 shadow-sm space-y-2.5">
            <h4 className="font-heading text-xs font-bold text-emerald-950">
              Recycling code
            </h4>

            <p>
              In Activity-7, we raised questions regarding recycling symbol codes and their purpose. Let us explore them here.
            </p>

            <p>
              The <strong>Society of the Plastics Industry, Inc. (SPI)</strong> introduced its voluntary resin identification coding system in <strong>1988</strong> to assist recycling programs worldwide.
            </p>

            <p>
              The SPI coding system provides an effective method to identify and sort the resin composition of containers found in household waste streams. Plastic containers are stamped with a number from 1 to 7 indicating the specific polymer resin.
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">49</span>
      </div>
    </div>
  );
}
