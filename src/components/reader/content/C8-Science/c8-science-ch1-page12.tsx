import React from "react";

export function C8ScienceCh1Page12() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Net Force Calculation & Sign Convention */}
        <div className="space-y-4 text-justify">
          <p className="text-xs">
            magnitude. Let us assume that one of you exerts a larger force, what will happen? Why?
          </p>

          <p className="text-xs">
            All forces have both magnitude and direction. While adding forces, the directions of forces have to be taken into account. When forces act on a body along a straight line and they are in the same direction the net force is taken as the sum of all forces acting on the body. To add forces, sign convention must be used.
          </p>

          {/* Fig-13 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-white p-3 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch1_fig13.png"
              alt="Fig-13 Opposing forces F1 and F2"
              className="h-12 w-auto object-contain"
            />
            <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
              Fig - 13
            </span>
          </div>

          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3.5 space-y-2 text-xs">
            <p>
              As shown in the above figure the force <strong className="text-sky-950">F₁</strong> directed towards right could be taken as positive and the force <strong className="text-sky-950">F₂</strong> acting towards left could be taken as negative. Let the forces F₁ and F₂ act on the table in opposite directions as shown in the figure and F₁ &gt; F₂.
            </p>
            <div className="rounded-lg border border-sky-300 bg-white p-2.5 text-center font-mono font-bold text-sky-950 shadow-2xs">
              F<sub>net</sub> = F₁ + (&minus;F₂) = F₁ &minus; F₂
            </div>
            <p>
              When the forces on a body in a straight line are in opposite directions, the net force is equal to difference between the two forces. The object at rest moves in the direction of the net force acting on it.
            </p>
          </div>

          {/* Activity-10 Box */}
          <div className="rounded-[18px] border border-fuchsia-200 bg-fuchsia-50/40 p-4 shadow-sm space-y-2">
            <div className="inline-block rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              Activity-10
            </div>
            <h3 className="font-heading text-sm font-bold text-fuchsia-950">
              Effects of stretched rubber bands on fingers
            </h3>
            <p className="text-xs leading-relaxed text-foreground/85">
              Take a rubber band, stretch it using your fingers. When you stretch the rubber band it exerts force on your fingers and you feel
            </p>
          </div>
        </div>

        {/* Right Column: Rubber Band Activity, SI Unit & Free Body Diagrams */}
        <div className="space-y-4 text-justify">
          <p className="text-xs">
            the force of pull on your fingers. What happens if you add one more similar rubber band around your fingers and stretch both together to the same length? Do you feel the combination of two bands exerts a larger force than that of one? Increase the number of rubber bands around your fingers and observe the force exerted on your fingers by the rubber bands.
          </p>

          {/* Fig-14 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-fuchsia-200 bg-white p-2.5 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch1_fig14.png"
              alt="Fig-14 Stretching rubber bands"
              className="h-24 w-auto object-contain rounded"
            />
            <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
              Fig-14 Stretching rubber bands
            </span>
          </div>

          <div className="rounded-xl border border-fuchsia-200 bg-fuchsia-50/60 p-3 space-y-1.5 text-xs">
            <p>
              Let us say the force exerted by one rubber band is <strong>F</strong> units and the force exerted by the second rubber band is also <strong>F</strong> units. Then what will be the net force of two rubber bands? We can express it as:
            </p>
            <p className="font-mono font-bold text-center text-fuchsia-950">
              F<sub>net</sub> = F + F = 2F units
            </p>
          </div>

          {/* SI Unit Box */}
          <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50/70 p-3 text-center shadow-2xs">
            <p className="text-xs font-bold text-emerald-950">
              The unit of force in SI system is <span className="underline decoration-emerald-600 font-extrabold">newton (N)</span>.
            </p>
          </div>

          <ul className="rounded-xl border border-fuchsia-200 bg-fuchsia-50/40 p-3 text-xs text-fuchsia-950 font-semibold list-disc list-inside">
            <li>What is the net force acting on your finger when three, four etc. rubber bands are used?</li>
          </ul>

          {/* Section 1.6 Free Body Diagrams */}
          <div className="pt-2 border-t border-sky-200/60 space-y-2">
            <h2 className="font-heading text-base font-bold text-sky-950">
              1.6 How to calculate net force from free body diagrams
            </h2>
            <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3 text-xs text-sky-950">
              The diagram showing all the forces acting on an object at a particular instant is called <strong className="font-bold">Free Body Diagram</strong>. It is denoted as <strong className="font-bold">FBD</strong>.
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">12</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
      </div>
    </div>
  );
}
