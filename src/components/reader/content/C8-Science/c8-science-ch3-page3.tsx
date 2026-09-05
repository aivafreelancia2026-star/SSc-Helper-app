import React from "react";

export function C8ScienceCh3Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Activity-3 Burning Test & 3.2.1 Nylon Intro */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            You can&apos;t identify fibres by simple visual inspection alone in the absence of a brand label. Then how to identify them?
          </p>

          {/* Activity 3 */}
          <div className="rounded-[20px] border border-emerald-300 bg-white p-4 space-y-2.5">
            <div className="inline-block rounded-full bg-emerald-700 px-3 py-0.5 text-[11px] font-bold text-white shadow-2xs font-heading">
              Activity-3: Identifying fibres &ndash; burning test
            </div>

            <p>
              Unravel several warp and weft yarns. Using tweezers hold the yarn to the edge of a flame. Observe the changes:
            </p>

            <ul className="space-y-1.5 pl-2">
              <li className="p-2 rounded-lg bg-amber-50/70 border border-amber-200 text-amber-950">
                &bull; <strong>Smells like burning hair:</strong> Wool or Silk (animal protein fibres).
              </li>
              <li className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950">
                &bull; <strong>Smells like burning paper:</strong> Cotton or Rayon (plant cellulose fibres).
              </li>
              <li className="p-2 rounded-lg bg-rose-50/70 border border-rose-200 text-rose-950">
                &bull; <strong>Melts and shrinks in flame:</strong> Synthetic fibres like Nylon or Acrylic.
              </li>
            </ul>
          </div>

          {/* Think and Discuss Card */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3 space-y-1">
            <div className="inline-flex items-center gap-1 rounded-full bg-emerald-700 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-2xs font-heading">
              <span>👥</span>
              <span>Think and Discuss</span>
            </div>
            <p className="font-semibold text-emerald-950 text-xs">
              How did synthetic fibres evolve to the present position?
            </p>
          </div>

          {/* 3.2.1 Nylon Header */}
          <div className="space-y-1.5">
            <h3 className="font-heading text-sm font-bold text-emerald-950">
              3.2.1 Nylon
            </h3>
            <p>
              Nylon is a synthetic fibre prepared from <strong>coal, water, and air</strong>. It was the first fully processed synthetic fibre. It became immensely popular during the Second World War; today nylon has replaced silk in most hosiery articles such as stockings.
            </p>
          </div>
        </div>

        {/* Right Column: How is Nylon made & Static Electricity & Properties */}
        <div className="space-y-4 text-justify text-xs">
          {/* How is Nylon Made Box */}
          <div className="rounded-2xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 space-y-2 text-emerald-950">
            <span className="font-heading text-xs uppercase font-bold text-emerald-800 tracking-wide block">
              How is nylon made?
            </span>
            <p className="leading-relaxed">
              Nylon is a polymer made of chemical units called <strong>&lsquo;polyamides&rsquo;</strong>. Polyamides are synthesized from monomers: <strong>hexamethylene diamine</strong> and <strong>adipic acid</strong>. Solid chips of these polyamides are melted and forced through a heated spinneret with very tiny holes to form filaments as they cool.
            </p>
          </div>

          {/* Static Electricity Box */}
          <div className="rounded-xl border border-purple-300 bg-purple-50/50 p-3 space-y-1 text-purple-950">
            <span className="font-bold block text-xs">⚡ Static Electricity Sparks</span>
            <p className="text-[11px]">
              Have you ever heard a crackling sound when taking off synthetic clothes in the dark? This is due to the discharge of static electricity accumulated on non-conducting synthetic fibres.
            </p>
          </div>

          {/* Nylon Properties */}
          <div className="rounded-[20px] border border-emerald-300 bg-white p-4 space-y-2">
            <h4 className="font-heading text-xs font-bold text-emerald-950">
              Key Properties of Nylon
            </h4>
            <ul className="list-disc list-inside space-y-1 text-foreground/85">
              <li>Strong, elastic, and lightweight.</li>
              <li>Lustrous and very easy to wash.</li>
              <li>Does not absorb water (water-repellent).</li>
              <li>Easily catches fire and melts &mdash; <em>avoid wearing near stoves or heavy machineries</em>.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">36</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
      </div>
    </div>
  );
}
