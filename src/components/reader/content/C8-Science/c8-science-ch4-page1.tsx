import React from "react";

export function C8ScienceCh4Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Chapter Opener Banner */}
      <div className="rounded-[24px] border-2 border-amber-400 bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 p-6 text-white shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 text-2xl font-bold font-heading shadow-inner">
            4
          </div>
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-200 block font-heading">
              Chapter 4 • Chemistry
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-white drop-shadow-xs">
              Metals and Non-metals
            </h1>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Intro & Fig-1 */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            In previous classes, you studied various materials used in our daily life—such as natural fibres, soils, acids, bases, salts, and their characteristics. You also studied changes around us like the rusting of iron. In this chapter, you will learn about the properties of <strong>metals</strong> and <strong>non-metals</strong>.
          </p>

          <p>
            You are familiar with a number of metals like <em>aluminium, copper, gold, and iron</em>, which are normally solid in state at room temperature. <strong>Mercury</strong> is a notable exception, existing as a liquid at room temperature.
          </p>

          <p className="font-semibold text-amber-950">
            • Can you name some objects made of metals around you?
          </p>

          <p>
            Observe <strong>Fig-1</strong>. Try to name the metals from which these objects are made. Add names of more metals that you know to your list.
          </p>

          {/* Fig 1 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-amber-300 bg-white p-3 text-center space-y-1.5 shadow-2xs">
            <img
              src="/assets/images/C8-Science/ch4_fig1.png"
              alt="Fig-1 Objects made of metals"
              className="h-28 w-auto object-contain"
            />
            <span className="text-[11px] font-semibold text-amber-950 italic">
              Fig-1 : Objects made of metals (Axe, bucket, gold jewelry)
            </span>
          </div>

          <p>
            Your first answer is likely gold. You might have also added aluminium, silver, lead, iron, copper, tin, and mercury.
          </p>
        </div>

        {/* Right Column: Steel discussion, Property questions, 4.1 Physical Properties */}
        <div className="space-y-4 text-justify text-xs">
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 space-y-2">
            <p className="font-semibold text-amber-950">
              • Did any of your friends add steel to the list of metals? Do you think that steel is a metal?
            </p>
            <p className="text-[11px] text-amber-900 leading-relaxed">
              Let us learn the properties of metals so that you are able to answer these questions at the end of the chapter. You will also learn about another category of materials called <strong>non-metals</strong>, which may be new to you.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-300 bg-white p-4 space-y-2">
            <h4 className="font-heading text-xs font-bold text-amber-950">
              Now observe carefully all the materials you have listed as metals:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-foreground/85 text-[11px]">
              <li>Do all of these look alike?</li>
              <li>Do all of them shine?</li>
              <li>Are they hard or soft?</li>
              <li>Do they break easily?</li>
              <li>Can you group materials into two categories by looking at their properties?</li>
            </ul>
            <p className="text-[11px] text-foreground/80 pt-1">
              We try to find two distinct groups, then discuss and compare them in detail throughout this chapter.
            </p>
          </div>

          {/* Section 4.1 Physical Properties */}
          <div className="rounded-[22px] border-2 border-amber-400 bg-amber-50/40 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-amber-200 pb-2">
              <h3 className="font-heading text-sm font-bold text-amber-950">
                4.1 Physical Properties
              </h3>

              {/* QR Code Container */}
              <div className="flex flex-col items-center rounded-lg border border-amber-300 bg-white p-1 shadow-2xs">
                <img
                  src="/assets/images/C8-Science/ch4_qr_metals.png"
                  alt="QR Code E2PFF1"
                  className="h-8 w-8 object-contain"
                />
                <span className="font-mono text-[8px] font-bold tracking-widest text-amber-950 mt-0.5">
                  E2PFF1
                </span>
              </div>
            </div>

            <p>
              Before we start this section, you will need to collect pieces of <strong>iron (iron nails), copper, zinc, sulphur powder, aluminium, carbon (coal), magnesium ribbon, and iodine</strong> for carrying out the lab activities.
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">54</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-amber-900 font-semibold">Metals and Non-Metals</span>
      </div>
    </div>
  );
}
