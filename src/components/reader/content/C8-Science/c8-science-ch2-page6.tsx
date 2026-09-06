import React from "react";

export function C8ScienceCh2Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Activity 4 Box */}
      <div className="rounded-[22px] border border-sky-300 bg-white p-5 shadow-sm space-y-4">
        <div className="inline-block rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
          Activity-4
        </div>
        <h2 className="font-heading text-base font-bold text-sky-950">
          Effect of area of contact on frictional force
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left Column: Pulling flat brick & horizontal forces */}
          <div className="space-y-3 text-justify text-xs">
            {/* Fig 10 Container */}
            <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-sky-50/40 p-2 shadow-2xs text-center">
              <img
                src="/assets/images/C8-Science/ch2_fig10.png"
                alt="Fig-10 Pulling a brick with spring balance"
                className="h-20 w-auto object-contain rounded"
              />
              <span className="mt-1 text-[11px] font-medium text-foreground/75 italic">
                Fig-10 : Pulling a brick with spring balance
              </span>
            </div>

            <p>
              Tie a string around a brick and pull the brick by using a spring balance as shown in <strong>fig-10</strong>. We use a spring balance as a device to measure the applied force.
            </p>

            <p>
              In a spring balance, the spring is stretched by the applied force. The change in the length of the spring is proportional to the applied force. So the scale of the spring balance directly gives the applied force in Newtons and in some spring balances the force is given in kilogram-weight also.
            </p>

            <p>
              Pull it to move the brick. Note down the reading of spring balance when the brick <strong>just begins to move</strong>.
            </p>

            <ul className="rounded-xl border border-sky-200 bg-sky-50/50 p-2.5 text-xs text-sky-950 font-semibold list-disc list-inside">
              <li>How many forces do act on the brick in the horizontal direction?</li>
            </ul>

            <p>
              Two forces act on the brick in the horizontal direction as shown in <strong>fig-11</strong>.
            </p>

            {/* Fig 11 Container */}
            <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-white p-2 shadow-2xs text-center">
              <img
                src="/assets/images/C8-Science/ch2_fig11.png"
                alt="Fig-11 Horizontal forces on the brick"
                className="h-16 w-auto object-contain rounded"
              />
              <span className="mt-1 text-[11px] font-medium text-foreground/75 italic">
                Fig-11 : Horizontal forces on the brick
              </span>
            </div>

            <p>
              One is the force applied (F) by you and the other is force of friction (f). The applied force is equal to the maximum limit of the frictional force at the instant when the brick just begins to move. But they act in opposite directions.
            </p>
          </div>

          {/* Right Column: Upright brick & Activity-5 */}
          <div className="space-y-4 text-justify text-xs">
            <p>
              Now turn the brick upright as shown in <strong>fig-12</strong> so that the contact area with the floor becomes small. Repeat the same experiment and measure the friction using the spring balance.
            </p>

            {/* Fig 12 Container */}
            <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-sky-50/40 p-2 shadow-2xs text-center">
              <img
                src="/assets/images/C8-Science/ch2_fig12.png"
                alt="Fig-12 Pulling same brick with another orientation"
                className="h-20 w-auto object-contain rounded"
              />
              <span className="mt-1 text-[11px] font-medium text-foreground/75 italic">
                Fig-12 : Pulling same brick with another orientation
              </span>
            </div>

            <ul className="rounded-xl border border-sky-200 bg-sky-50/50 p-2.5 text-xs text-sky-950 font-semibold list-disc list-inside">
              <li>How does the frictional force vary with the change in the area of contact?</li>
            </ul>

            {/* Core Finding Box */}
            <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50/70 p-3.5 text-emerald-950 font-medium">
              <strong>Conclusion:</strong> The frictional force appears to be the <strong>same in both cases irrespective of area of contact</strong> of the surfaces.
            </div>

            {/* Activity 5 Box */}
            <div className="rounded-[18px] border-2 border-fuchsia-300 bg-fuchsia-50/30 p-4 space-y-2">
              <div className="inline-block rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
                Activity-5
              </div>
              <h3 className="font-heading text-sm font-bold text-fuchsia-950">
                Effect of normal force on friction
              </h3>
              <p>
                As in activity-4, keep a brick on the horizontal floor and pull it with the spring balance attached to it and measure the frictional force.
              </p>
              <p>
                Now put another brick over the brick tied to the spring balance or press it vertically with your hand and then measure the force of friction as described above.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-fuchsia-900 font-semibold">Friction</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">25</span>
      </div>
    </div>
  );
}
