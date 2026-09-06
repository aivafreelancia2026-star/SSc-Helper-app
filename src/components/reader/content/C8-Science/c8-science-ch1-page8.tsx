import React from "react";

export function C8ScienceCh1Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column */}
        <div className="space-y-4 text-justify">
          {/* Activity-8 Box */}
          <div className="rounded-[18px] border border-fuchsia-200 bg-fuchsia-50/40 p-4 shadow-sm space-y-3">
            <div className="inline-block rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              Activity-8
            </div>
            <h3 className="font-heading text-sm font-bold text-fuchsia-950">
              Observing the motion of objects on an inclined plane
            </h3>
            <p className="text-xs leading-relaxed text-foreground/85">
              Take a tray. Place a small ice cube, eraser and a rupee coin on a line at one end of the tray. Now slowly lift this end of the tray as shown in the figure-6.
            </p>

            {/* Fig-6 Container */}
            <div className="flex flex-col items-center rounded-xl border border-fuchsia-200 bg-white p-2.5 shadow-2xs text-center">
              <img
                src="/assets/images/C8-Science/ch1_fig6.png"
                alt="Fig-6 Motion of objects on an inclined plane"
                className="h-28 w-auto object-contain rounded"
              />
              <span className="mt-1.5 text-[11px] font-medium text-foreground/75 italic">
                Fig-6: Motion of objects on an inclined plane.
              </span>
            </div>

            <ul className="text-xs text-foreground/85 list-disc list-inside space-y-1.5 pt-1">
              <li>What do you observe?</li>
              <li>Which one of these three objects slides down first? Why?</li>
              <li>Do all the objects experience the same resistance to motion? If not why?</li>
              <li>Which one of the objects experiences more resistance to motion? Why?</li>
              <li>Why is there a change in resistance experienced by the objects though they all slide down on the same plane?</li>
            </ul>

            <p className="text-xs text-foreground/75 italic">
              Do this activity with different objects like a book, a ball, a pen, a stone etc., and record your observations.
            </p>
          </div>
        </div>

        {/* Right Column: Definition of Friction and Slipping */}
        <div className="space-y-4 text-justify">
          <div className="rounded-xl border-2 border-sky-300 bg-sky-50/70 p-3.5 shadow-2xs">
            <p className="text-xs font-semibold text-sky-950">
              <strong className="font-bold text-sky-900">Friction</strong> is the resistance to the movement of a body over the surface of another body.
            </p>
          </div>

          {/* Fig-7 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-white p-3 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch1_fig7.png"
              alt="Fig-7 Person slipping on wet floor"
              className="h-32 w-auto object-contain rounded"
            />
            <span className="mt-2 text-[11px] font-medium text-foreground/75 italic">
              Fig-7
            </span>
          </div>

          <p className="text-xs">
            Did you ever experience slipping on a floor? What conditions caused you to slip? Did you experience slipping while you are walking on wet mud? Why do most road accidents happen during rainy days?
          </p>

          <ul className="rounded-xl border border-sky-200 bg-sky-50/40 p-3 text-xs text-sky-950 font-semibold list-disc list-inside space-y-1">
            <li>Would it be possible to drive a car if there was no friction between the tyres and the road?</li>
          </ul>

          <p className="text-xs">
            The direction of friction is always opposite to the direction of motion relative to the surface. Let&apos;s imagine a world without friction. Without friction, would it be possible to write with a pen on a paper or with a piece of chalk on the black board? Can we atleast walk on a road without friction? You will learn more about friction in the next chapter.
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
              A book placed on a table is at rest. Is the force of friction acting on it or not? Explain.
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">8</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
      </div>
    </div>
  );
}
