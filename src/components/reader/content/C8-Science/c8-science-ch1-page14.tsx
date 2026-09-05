import React from "react";

export function C8ScienceCh1Page14() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column */}
        <div className="space-y-4 text-justify">
          <p className="text-xs">
            We can move the ball from its position of rest by applying a force on it. We can stop the moving ball and bring it back to rest by catching it. Give few more examples where the state of motion of an object changes due to the application of force.
          </p>

          <p className="text-xs">
            You might have seen children playing with a rubber tyre by pushing it with a stick. They push the tyre again and again with the stick to increase its speed. Do you understand why the speed of the tyre increases whenever it is pushed by the stick?
          </p>

          <p className="text-xs">
            With every push they are applying a little more force on the moving tyre in the direction of motion. Hence the speed of the tyre increases continuously.
          </p>

          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3.5 space-y-2 text-xs">
            <p>
              If the net force acts in the direction of motion, the speed of an object moving with constant speed also increases. If the net force acts in a direction opposite to the motion, then it either slows down the object or brings it to a rest or it may change the direction of motion.
            </p>
          </div>

          <p className="text-xs">
            Give some more examples where the object speeds up or slows down or a change may occur in its direction of motion when we exert a force on it.
          </p>

          {/* Activity-12 */}
          <div className="rounded-[18px] border border-fuchsia-200 bg-fuchsia-50/40 p-4 shadow-sm space-y-2">
            <div className="inline-block rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              Activity-12
            </div>
            <h3 className="font-heading text-sm font-bold text-fuchsia-950">
              Effect of net force on direction of moving object
            </h3>
            <p className="text-xs leading-relaxed text-foreground/85">
              Hit a carrom coin with the striker. Ask your friends to do the same. Does the coin move in the same direction in each case? If not, why?
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 text-justify">
          {/* Fig-17 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-fuchsia-200 bg-white p-3 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch1_fig17.png"
              alt="Fig 17 Carrom Board"
              className="h-28 w-auto object-contain rounded"
            />
            <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
              Fig-17
            </span>
          </div>

          <p className="text-xs">
            You can observe that in each case the direction of the coin changes.
          </p>

          <p className="text-xs">
            When you hit the coin with the striker, not only does the coin change its direction, but the striker changes its direction too. What might be the cause for that?
          </p>

          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3.5 text-xs text-sky-950">
            From these observations, we can say that a net force stops a moving object or makes a stationary object move and also changes the speed and direction of a moving object.
          </div>

          <p className="text-xs italic text-foreground/80">
            Does the force change only the state of motion? Are there any other effects of force?
          </p>

          {/* Section 1.8 */}
          <div className="pt-2 border-t border-sky-200/60 space-y-3">
            <h2 className="font-heading text-base font-bold text-fuchsia-950">
              1.8 Other effects of force
            </h2>

            {/* Activity-13 Box */}
            <div className="rounded-[18px] border border-fuchsia-200 bg-fuchsia-50/40 p-4 shadow-sm space-y-3">
              <div className="inline-block rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
                Activity-13
              </div>
              <h3 className="font-heading text-sm font-bold text-fuchsia-950">
                Effects of force on the shape of an object
              </h3>

              <div className="flex items-start gap-4">
                {/* QR Code Container */}
                <div className="flex flex-col items-center rounded-lg bg-white p-1.5 shadow-2xs border border-fuchsia-200 shrink-0">
                  <img
                    src="/assets/images/C8-Science/ch1_qr3.png"
                    alt="QR Code 07HLE1"
                    className="h-10 w-10 object-contain"
                  />
                  <span className="font-mono text-[9px] font-bold tracking-widest text-fuchsia-950 mt-0.5">
                    07HLE1
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-foreground/85">
                  In table-3 some situations are given in the first column showing how the force is applied on an object. Observe the shape of the objects carefully before and after applying the force. In the above situations, observe if there is permanent or temporary change in shape of the object and fill the table.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">14</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
      </div>
    </div>
  );
}
