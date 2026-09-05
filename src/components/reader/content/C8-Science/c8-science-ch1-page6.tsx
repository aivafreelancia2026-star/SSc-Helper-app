import React from "react";

export function C8ScienceCh1Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column */}
        <div className="space-y-4 text-justify">
          <ul className="rounded-xl border border-sky-200 bg-sky-50/40 p-3.5 text-xs text-sky-950 font-semibold list-disc list-inside space-y-1.5">
            <li>What do you observe? Do you find any pattern of iron filings there?</li>
            <li>Rotate the magnet in different directions and do the same. How has the pattern changed?</li>
          </ul>

          <p>
            You can see that in a small space around the magnet, iron filings set themselves in a pattern because they are affected by the magnetic force of the field created by the bar magnet. The pattern represents the magnetic field. The space around the magnet where its influence can be detected is called the <strong className="text-sky-950 font-bold">magnetic field</strong>. This field is three dimensional.
          </p>

          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3.5 space-y-2 text-xs">
            <p>
              Thus, a field is a region in which a force can be experienced by another magnetic object placed at any point in that region.
            </p>
            <p>
              A body creates a field and another body experiences the force by the field when it is placed in that field.
            </p>
          </div>

          <p className="text-xs">
            A magnetic field surrounds a magnet, an electric field surrounds electric charges and a gravitational field surrounds masses.
          </p>

          <p className="text-xs">
            The strength of a field in a particular region can be represented by field lines; the greater the density of lines, the stronger the forces in that part of the field.
          </p>

          {/* Think and Discuss Card */}
          <div className="rounded-[18px] border-2 border-fuchsia-300 bg-fuchsia-50/50 p-4 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-fuchsia-800 text-white font-bold text-xs">
                💡
              </span>
              <h3 className="font-heading text-sm font-bold text-fuchsia-950">
                Think and discuss
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-foreground/85">
              Two identical bars, one which is steel and the other a magnet, are painted with the same colour. How can you tell which one is the magnet using only these two bars? <span className="italic text-fuchsia-900">(don&apos;t break the bars)</span>
            </p>
          </div>
        </div>

        {/* Right Column: Contact Forces & Muscular Force */}
        <div className="space-y-4 text-justify">
          <div>
            <h2 className="font-heading text-base font-bold text-sky-950">
              1.4 Contact Forces
            </h2>
            <h3 className="font-heading text-sm font-bold text-fuchsia-900 mt-1">
              1.4.1 Muscular Force
            </h3>
          </div>

          {/* Fig-5 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-white p-3 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch1_fig5.png"
              alt="Fig-5 Bullock cart in river - Muscular Force"
              className="h-32 w-auto object-contain rounded"
            />
            <span className="mt-2 text-[11px] font-medium text-foreground/75 italic">
              Fig-5: Human beings and animals use muscular force
            </span>
          </div>

          <p>
            In all the actions that we perform in our daily life like brushing, bathing, eating, writing, driving and walking; we have to exert a force. Do you know from where the force comes? The force which we exert by using our body muscles is known as <strong className="text-fuchsia-950 font-bold">muscular force</strong>.
          </p>

          <p>
            Even when we smile our muscles exert force to bring changes in our face. Human beings and animals use muscular force to carry out their regular physical activities. Muscular forces can be exerted only through contact.
          </p>

          {/* Activity-5 */}
          <div className="rounded-[18px] border border-fuchsia-200 bg-fuchsia-50/40 p-4 shadow-sm space-y-2">
            <div className="inline-block rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              Activity-5
            </div>
            <h4 className="font-heading text-sm font-bold text-fuchsia-950">
              Preparing a list of examples for muscular force
            </h4>
            <p className="text-xs leading-relaxed text-foreground/85">
              List at least ten activities where we apply muscular force to perform various tasks, in table - 2.
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">6</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
      </div>
    </div>
  );
}
