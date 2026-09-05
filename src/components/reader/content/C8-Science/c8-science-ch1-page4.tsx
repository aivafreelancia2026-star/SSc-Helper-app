import React from "react";

export function C8ScienceCh1Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column */}
        <div className="space-y-4 text-justify">
          <ul className="text-xs text-sky-950 font-semibold list-disc list-inside space-y-1">
            <li>What happens this time?</li>
          </ul>
          <p className="text-xs italic text-foreground/80">
            How do the needles attract each other? How do they repel?
          </p>

          {/* Fig-2 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-white p-3 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch1_fig2.png"
              alt="Fig 2 Floating needle magnets in water"
              className="h-28 w-auto object-contain rounded"
            />
            <span className="mt-2 text-[11px] font-medium text-foreground/75 italic">
              Fig-2: Making needle magnets and floating them in a bowl of water
            </span>
          </div>

          <p>
            You have learnt in class VI that like poles of two magnets repel each other and unlike poles attract each other. You can observe the red end of one needle and white end of another needle attract each other, and ends with same colour repel.
          </p>

          <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-3.5 space-y-2 text-xs">
            <p>
              Now, you know that like poles repel or push each other away and unlike poles attract or pull each other. This action of pull or push arises due to a <strong className="text-sky-950 font-bold">magnetic force</strong>. A magnet can attract or repel another magnet without contact. So magnetic force is a <strong className="text-sky-950 font-bold">field force</strong>.
            </p>
          </div>

          {/* Section 1.3.2 Electrostatic Force */}
          <div className="pt-2">
            <h3 className="font-heading text-base font-bold text-fuchsia-950">
              1.3.2 Electrostatic force
            </h3>
          </div>

          {/* Activity-3 */}
          <div className="rounded-[18px] border border-fuchsia-200 bg-fuchsia-50/40 p-4 shadow-sm space-y-2">
            <div className="inline-block rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              Activity-3
            </div>
            <h4 className="font-heading text-sm font-bold text-fuchsia-950">
              Observing electrostatic forces
            </h4>
            <p className="text-xs leading-relaxed text-foreground/85">
              Take a balloon. Inflate it and tie up the open end. Now cut a paper into small pieces and place them on the floor. Rub the balloon with a paper and bring the balloon near the pieces of papers. What happens now? Are the bits of paper pulled towards the balloon? (Fig-3) Why does the balloon pull or attract the pieces of paper? Try to use pepper and salt in the place of pieces of paper. What do you observe?
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 text-justify">
          {/* Fig-3 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-fuchsia-200 bg-white p-3 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch1_fig3.png"
              alt="Fig 3 Charged balloon attracting paper bits"
              className="h-32 w-auto object-contain rounded"
            />
            <span className="mt-2 text-[11px] font-medium text-foreground/75 italic">
              Fig-3: Charged balloon attracting bits of paper
            </span>
          </div>

          <p>
            We can say that when the balloon is rubbed with a paper, it acquires an electrostatic charge on its surface. The balloon is now said to be a <strong className="text-fuchsia-950 font-bold">charged body</strong>. When it is brought near the bits of paper, the pieces acquire opposite charge and will rise and cling to the balloon.
          </p>

          <div className="rounded-xl border border-fuchsia-200 bg-fuchsia-50/50 p-3.5 space-y-2 text-xs">
            <p>
              The force exerted by a charged body on another charged body is known as <strong className="text-fuchsia-950 font-bold">electrostatic force</strong>.
            </p>
            <p>
              This force comes into play even when the bodies are not in contact. It is an example of a force at a distance.
            </p>
          </div>

          {/* Section 1.3.3 Gravitational Force */}
          <div className="pt-3 border-t border-sky-200/60 space-y-3">
            <h3 className="font-heading text-base font-bold text-sky-950">
              1.3.3 Gravitational force
            </h3>
            <p>
              It is our common experience that if a pen slips off from our hands it falls down to the floor.
            </p>
            <ul className="rounded-xl border border-sky-200 bg-sky-50/40 p-3 text-xs text-sky-900 font-semibold list-disc list-inside space-y-1.5">
              <li>Why does the pen fall down?</li>
              <li>What is the force which pulls the pen down?</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">4</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
      </div>
    </div>
  );
}
