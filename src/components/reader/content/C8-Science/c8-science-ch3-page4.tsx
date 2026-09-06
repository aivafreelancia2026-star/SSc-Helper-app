"use client";

import React, { useState } from "react";

export function C8ScienceCh3Page4() {
  const [weights, setWeights] = useState({
    cotton: "60 g",
    wool: "40 g",
    silk: "120 g",
    nylon: "500 g+",
  });

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Aprons & Nylon Articles List & Fig 3 */}
        <div className="space-y-4 text-justify text-xs">
          <ul className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-2.5 text-xs text-emerald-950 font-semibold list-disc list-inside">
            <li>Why do we wear an apron during cooking or working near fire?</li>
          </ul>

          <p>
            Many articles that we use in our daily life are made up of nylon: toothbrush bristles, ropes, fishing nets, tents, sarees, stockings, socks, car seat belts, sleeping bags, curtains, carpets, swim suits, sheer hosiery, sails, umbrella cloth, car tyres, etc.
          </p>

          {/* Fig 3 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-emerald-200 bg-white p-2.5 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch3_fig3.png"
              alt="Fig-3 Articles made of nylon"
              className="h-32 w-auto object-contain rounded"
            />
            <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
              Fig-3 : Articles made of nylon
            </span>
          </div>

          <p>
            Nylon has replaced wool as the fibre used in making carpets. Nylon is also used in making parachutes and rock climbing ropes because of its unmatched tensile strength.
          </p>
        </div>

        {/* Right Column: Fig 4 & Activity-4 Tensile Strength */}
        <div className="space-y-4 text-justify text-xs">
          {/* Fig 4 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-emerald-200 bg-white p-2 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch3_fig4.png"
              alt="Fig-4 Use of Nylon Fibres"
              className="h-24 w-auto object-contain rounded"
            />
            <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
              Fig-4 : Use of Nylon Fibres (Climber &amp; Parachute)
            </span>
          </div>

          {/* Activity 4 */}
          <div className="rounded-[20px] border border-emerald-300 bg-white p-4 space-y-3">
            <div className="inline-block rounded-full bg-emerald-700 px-3 py-0.5 text-[11px] font-bold text-white shadow-2xs font-heading">
              Activity -4: How strong is nylon?
            </div>

            <p>
              Take an iron stand with a clamp. Take cotton, wool, nylon and silk threads about 50cm in length. Tie a thread to the stand so that it hangs freely from it. At the free end, attach a pan so that weights can be placed on it.
            </p>

            <p>
              Add weights starting from 10 grams one by one until the thread breaks. Note down the total weight required to break the thread.
            </p>

            {/* Table 2 */}
            <div className="overflow-hidden rounded-xl border border-emerald-200">
              <div className="bg-emerald-700 p-1.5 text-center text-xs font-bold text-white font-heading">
                Table 2: Breaking Load of Different Threads
              </div>
              <table className="w-full text-xs text-left">
                <thead className="bg-emerald-50 border-b border-emerald-200 text-emerald-950 font-heading">
                  <tr>
                    <th className="p-2 w-12 text-center border-r border-emerald-200">S.No.</th>
                    <th className="p-2 border-r border-emerald-200">Type of thread / fibre</th>
                    <th className="p-2">Total weight to break thread</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100">
                  <tr>
                    <td className="p-2 text-center border-r border-emerald-100">1</td>
                    <td className="p-2 font-medium border-r border-emerald-100">Cotton</td>
                    <td className="p-1.5">
                      <input
                        type="text"
                        value={weights.cotton}
                        onChange={(e) => setWeights({ ...weights, cotton: e.target.value })}
                        className="w-full rounded border border-emerald-200 p-1 text-xs bg-emerald-50/20"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 text-center border-r border-emerald-100">2</td>
                    <td className="p-2 font-medium border-r border-emerald-100">Wool</td>
                    <td className="p-1.5">
                      <input
                        type="text"
                        value={weights.wool}
                        onChange={(e) => setWeights({ ...weights, wool: e.target.value })}
                        className="w-full rounded border border-emerald-200 p-1 text-xs bg-emerald-50/20"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 text-center border-r border-emerald-100">3</td>
                    <td className="p-2 font-medium border-r border-emerald-100">Silk</td>
                    <td className="p-1.5">
                      <input
                        type="text"
                        value={weights.silk}
                        onChange={(e) => setWeights({ ...weights, silk: e.target.value })}
                        className="w-full rounded border border-emerald-200 p-1 text-xs bg-emerald-50/20"
                      />
                    </td>
                  </tr>
                  <tr className="bg-emerald-50/40">
                    <td className="p-2 text-center border-r border-emerald-100 font-bold">4</td>
                    <td className="p-2 font-bold text-emerald-950 border-r border-emerald-100">Nylon</td>
                    <td className="p-1.5">
                      <input
                        type="text"
                        value={weights.nylon}
                        onChange={(e) => setWeights({ ...weights, nylon: e.target.value })}
                        className="w-full rounded border border-emerald-300 p-1 text-xs bg-white font-bold text-emerald-950"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">37</span>
      </div>
    </div>
  );
}
