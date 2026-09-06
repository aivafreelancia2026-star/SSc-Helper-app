import React from "react";

export function C8ScienceCh2Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Lab Activity continuation & Limiting Acceleration */}
        <div className="rounded-[22px] border border-sky-300 bg-white p-5 shadow-sm space-y-4 text-justify">
          <ul className="rounded-xl border border-sky-200 bg-sky-50/40 p-3 text-xs text-sky-950 font-semibold list-disc list-inside space-y-1">
            <li>What happens to the position of the block kept on the trolley?</li>
            <li>Does it fall or move along with the trolley?</li>
            <li>What changes occur in the motion of trolley and wooden block?</li>
          </ul>

          <p className="text-xs">
            You will notice that the trolley with the block on it moves towards left with an acceleration. The block is at rest with respect to the surface of the trolley, but it is in motion with respect to the surface of the table.
          </p>

          <p className="text-xs">
            Now keep on increasing the weight on the hanger. Observe the motions of both trolley and block.
          </p>

          <p className="text-xs">
            Here the surface of the trolley tries to keep the block at rest here with respect to its surface. The force of friction by the surface of the trolley acts on the block in the direction of motion. At the same time the block also applies a force on the trolley in opposite direction and tries to move towards the right.
          </p>

          {/* Fig 5 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-sky-50/40 p-2.5 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch2_fig5.png"
              alt="Fig-5 The direction of friction on the block"
              className="h-28 w-auto object-contain rounded"
            />
            <span className="mt-1 text-[11px] font-medium text-foreground/75 italic">
              Fig-5 : The direction of friction on the block
            </span>
          </div>

          <p className="text-xs">
            We can increase the trolley&apos;s acceleration by increasing the weight on the hanger. If we increase the acceleration of trolley gradually, at certain <strong>&lsquo;limiting weight&rsquo;</strong> or <strong>&lsquo;limiting acceleration&rsquo;</strong> the block comes into motion in the reverse direction. This means that now there exists relative motion between the surface of the trolley and the block.
          </p>
        </div>

        {/* Right Column: Experiment variations & Core Definitions */}
        <div className="rounded-[22px] border border-fuchsia-300 bg-white p-5 shadow-sm space-y-4 text-justify">
          <ul className="rounded-xl border border-fuchsia-200 bg-fuchsia-50/40 p-3 text-xs text-fuchsia-950 font-semibold list-disc list-inside space-y-1">
            <li>What happens when the experiment is repeated by using rock and iron blocks of the same mass; and by using rock and iron blocks of different masses?</li>
            <li>Does the limiting weight change? If so, why?</li>
          </ul>

          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-950 space-y-1.5">
            <p className="font-semibold">Lubrication Experiment:</p>
            <p>
              Apply some grease to the bottom of the wooden block and keep it on the trolley&apos;s surface and do the same experiment.
            </p>
            <ul className="list-disc list-inside text-foreground/80 space-y-0.5">
              <li>Is there any change in the limiting weight?</li>
              <li>What should we do to increase the limiting weight?</li>
            </ul>
          </div>

          <p className="text-xs">
            From the above activities we may define friction as follows,
          </p>

          {/* Master Definition: Frictional Force */}
          <div className="rounded-2xl border-2 border-fuchsia-500 bg-gradient-to-br from-fuchsia-50 to-purple-50 p-4 text-xs shadow-sm">
            <span className="block font-heading text-xs uppercase font-bold text-fuchsia-800 tracking-wider mb-1">
              Definition of Frictional Force
            </span>
            <p className="font-semibold text-fuchsia-950 text-sm leading-snug italic">
              &ldquo;The force which opposes the relative motion of two surfaces of bodies in contact, is called frictional force.&rdquo;
            </p>
          </div>

          {/* Sliding Friction Box */}
          <div className="rounded-xl border border-sky-300 bg-sky-50/50 p-3 text-xs space-y-1">
            <p className="text-foreground/85">
              In activity-1, the book moves with respect to the floor. So, this friction is called <strong>sliding friction</strong>.
            </p>
            <p className="font-semibold text-sky-950">
              <strong>Sliding friction</strong> is the friction which comes into play when the surface of one object moves relative to the surface of another object.
            </p>
          </div>

          {/* Static Friction Box */}
          <div className="rounded-xl border border-emerald-300 bg-emerald-50/50 p-3 text-xs space-y-1">
            <p className="text-foreground/85">
              In lab activity, the block is at rest relative to the surface of the trolley up to a certain limiting acceleration. The friction exists at this stage is a <strong>static friction</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">22</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-fuchsia-900 font-semibold">Friction</span>
      </div>
    </div>
  );
}
