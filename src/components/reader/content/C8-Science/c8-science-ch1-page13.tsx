import React from "react";

export function C8ScienceCh1Page13() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: FBD Example of Car */}
        <div className="space-y-4 text-justify">
          <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-3.5 space-y-2 text-xs">
            <p className="font-bold text-sky-950">Example:</p>
            <p>
              Let a car be moving with a non uniform speed along a road. What are the forces acting on the car? What is the net force acting along the vertical direction? What is the net force acting on the car along horizontal direction?
            </p>
            <p>
              Draw all the relevant forces acting on the car. We call it a free body diagram (FBD).
            </p>
            <p>
              Choose a coordinate system with X-axis and Y-axis as shown in figure-15. Add forces algebraically with sign conventions along X and Y axes separately. Then those values give net forces along X and Y directions respectively.
            </p>
          </div>

          <p className="text-xs font-bold text-sky-950">Solution:</p>

          {/* Fig-15 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-white p-3 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch1_fig15.png"
              alt="Fig-15 Free Body Diagram (FBD) of Car"
              className="h-28 w-auto object-contain"
            />
            <span className="mt-1.5 text-[10px] font-medium text-foreground/75 italic">
              Fig-15: Free Body Diagram (FBD)
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-foreground/85">
            <p>The forces acting on the car are shown in the fig-15. They are:</p>
            <ul className="pl-2 space-y-0.5 list-disc list-inside">
              <li>Force applied by the engine = <strong className="text-sky-950">F</strong></li>
              <li>Friction applied by road = <strong className="text-sky-950">f</strong></li>
              <li>Normal forces = <strong className="text-sky-950">N₁</strong> and <strong className="text-sky-950">N₂</strong></li>
              <li>Gravitational force (F<sub>g</sub>) = <strong className="text-sky-950">W</strong></li>
            </ul>

            <div className="rounded-lg border border-sky-200 bg-sky-50/60 p-2.5 space-y-1 font-mono text-xs">
              <p className="font-bold text-sky-950">Net force along X-axis:</p>
              <p className="pl-4">F<sub>net, x</sub> = f &minus; F</p>
              <p className="font-bold text-sky-950 pt-1">Net force along y-axis:</p>
              <p className="pl-4">F<sub>net, y</sub> = N₁ + N₂ &minus; W</p>
            </div>
          </div>
        </div>

        {/* Right Column: Think & Discuss, 1.7 What Forces Can Do?, Activity-11 */}
        <div className="space-y-4 text-justify">
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
              Play arm wrestling with your friend. Explain the winning of the game by using the concept of net force. Name forces acting on arm and their direction while playing the game. Try to draw FBD for this situation.
            </p>
          </div>

          {/* Section 1.7 */}
          <div>
            <h2 className="font-heading text-base font-bold text-fuchsia-950">
              1.7 What Forces can do?
            </h2>
          </div>

          {/* Activity-11 Box */}
          <div className="rounded-[18px] border border-fuchsia-200 bg-fuchsia-50/40 p-4 shadow-sm space-y-3">
            <div className="inline-block rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              Activity-11
            </div>
            <h3 className="font-heading text-sm font-bold text-fuchsia-950">
              Effect of force on state of motion of an object and it&apos;s direction.
            </h3>
            <p className="text-xs leading-relaxed text-foreground/85">
              Place a football on the ground. The ball will remain in a state of rest unless someone kicks the ball. Now kick the ball (Fig-16a). What happens? Does the ball start moving? Kick the moving ball again in the same direction (Fig-16b). What will be the result? Place your hand or leg against the ball. Does the ball stop? Or does it change its direction? Note your observations.
            </p>

            {/* Fig 16 Container */}
            <div className="flex flex-col items-center rounded-xl border border-fuchsia-200 bg-white p-2.5 shadow-2xs text-center">
              <img
                src="/assets/images/C8-Science/ch1_fig16.png"
                alt="Fig 16 Football kicks"
                className="h-28 w-auto object-contain rounded"
              />
              <span className="mt-1 text-[10px] font-medium text-foreground/75 italic leading-tight">
                Fig-16: (a) Force applied on a ball at rest. (b) Force applied on a moving ball in the direction of motion.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">13</span>
      </div>
    </div>
  );
}
