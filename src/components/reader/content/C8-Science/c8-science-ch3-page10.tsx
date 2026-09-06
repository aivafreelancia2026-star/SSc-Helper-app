import React from "react";

export function C8ScienceCh3Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Plastics everywhere & Fig-10 & 3.6 What is plastic? */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            Milk and oil pouches, containers to store pickles and rice, buckets to store water, chairs, water pipes, electric appliances, television, radio and computers, mobile phones—everything seems to be made of plastic.
          </p>

          <p>
            Talk to the elders in your family about the materials they used in the past. Particularly, what do they think about buying water in polythene pouches? What did they use to bring milk, oil, and other liquids from shop to home in the past? What were the containers, buckets, mugs, chairs, and tables used in the past made of? What do we use to make these articles nowadays?
          </p>

          <p>
            Plastic has taken over the place occupied by metals and wood earlier. Plastics have also replaced glass items. If we continue to write the list, it will be endless. Plastics completely occupied our life because of their characteristic properties.
          </p>

          {/* Fig-10: Articles made of plastics */}
          <div className="flex flex-col items-center rounded-xl border border-emerald-300 bg-white p-3 text-center space-y-1 shadow-2xs">
            <img
              src="/assets/images/C8-Science/ch3_fig10.png"
              alt="Fig-10 Articles made of plastics"
              className="h-24 w-auto object-contain"
            />
            <span className="text-[11px] font-semibold text-emerald-950 italic">
              Fig-10 : Articles made of plastics
            </span>
          </div>

          {/* 3.6 What is plastic? */}
          <div className="rounded-[20px] border border-emerald-300 bg-emerald-50/40 p-4 space-y-2.5">
            <h3 className="font-heading text-sm font-bold text-emerald-950">
              3.6 What is plastic?
            </h3>
            <p>
              Plastic is also a polymer like many synthetic fibres we have studied so far. But the monomers in plastic can be arranged in two ways: some are in <strong>linear chains</strong> (Fig. 11 a) and others are <strong>cross-linked</strong> (Fig. 11 b).
            </p>
          </div>
        </div>

        {/* Right Column: Fig-11a, Fig-11b, Alexander Parkes Do you know */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            Plastics are available in different shapes and sizes. They have a wide variety of uses. We also observed that they have different code numbers as mentioned in Activity-6. Does the arrangement of monomer units in plastics have any relation to this diversity in plastics?
          </p>

          {/* Monomer Arrangement Figures */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col items-center rounded-xl border border-emerald-200 bg-white p-3 text-center space-y-1 shadow-2xs">
              <img
                src="/assets/images/C8-Science/ch3_fig11a.png"
                alt="Fig-11(a) Linear arrangement of monomers"
                className="h-12 w-auto object-contain"
              />
              <span className="text-[10px] font-semibold text-emerald-950 italic">
                Fig-11(a): Linear arrangement
              </span>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-emerald-200 bg-white p-3 text-center space-y-1 shadow-2xs">
              <img
                src="/assets/images/C8-Science/ch3_fig11b.png"
                alt="Fig-11(b) Cross-linked arrangement"
                className="h-16 w-auto object-contain"
              />
              <span className="text-[10px] font-semibold text-emerald-950 italic">
                Fig-11(b): Cross-linked arrangement
              </span>
            </div>
          </div>

          {/* Do You Know: Alexander Parkes */}
          <div className="rounded-[22px] border-2 border-emerald-400 bg-gradient-to-br from-emerald-50/80 via-teal-50/50 to-emerald-50/70 p-4 shadow-sm space-y-3 text-emerald-950">
            <div className="flex items-center gap-2 border-b border-emerald-300 pb-2">
              <span className="rounded-full bg-emerald-700 px-3 py-0.5 text-[10px] font-bold text-white shadow-2xs font-heading">
                💡 Do you know?
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="space-y-1.5 flex-1">
                <h4 className="font-heading text-xs font-bold text-emerald-900 leading-snug">
                  Alexander Parkes (1813–1890) <br />
                  <span className="text-teal-800 font-semibold">Creator of first Plastic — &ldquo;Parkesine&rdquo;</span>
                </h4>
                <p className="text-[11px] leading-relaxed">
                  One of the many triumphs of modern science that has completely encompassed daily life across the world is the invention of plastics. The synthetically produced material was first presented in <strong>1862 in London</strong> by Alexander Parkes.
                </p>
              </div>

              <div className="shrink-0 flex flex-col items-center rounded-lg border border-emerald-300 bg-white p-1 shadow-2xs">
                <img
                  src="/assets/images/C8-Science/ch3_parkes.png"
                  alt="Alexander Parkes"
                  className="h-18 w-auto rounded object-cover"
                />
                <span className="text-[8.5px] font-semibold text-emerald-950 mt-0.5">
                  A. Parkes
                </span>
              </div>
            </div>

            <p className="text-[11px] leading-relaxed">
              To prepare this material, Parkes heated nitrated cotton (previously soaked in sulfuric acid) and made the fabric soft and elastic with oil and camphor. The end product was an ivory-colored material that distorted when subjected to heat, named <strong>Parkesine</strong>. It evolved into the foundational precursor for modern commercial plastics.
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">43</span>
      </div>
    </div>
  );
}
