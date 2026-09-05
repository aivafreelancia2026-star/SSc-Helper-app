import React from "react";

export function C8ScienceCh1Page11() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Net Force theory & Activity-9 intro */}
        <div className="space-y-4 text-justify">
          <p className="text-xs">
            Technically, we say that the net force on this object is zero.
          </p>
          <p className="text-xs">
            Imagine that the same object is kept in a lift which is accelerating.
          </p>

          <ul className="rounded-xl border border-sky-200 bg-sky-50/40 p-3 text-xs text-sky-950 font-semibold list-disc list-inside space-y-1">
            <li>How many forces are acting on this object?</li>
            <li>Is the net force acting on the object zero? Why?</li>
          </ul>

          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-xs text-amber-950">
            <strong>Note:</strong> When an object is in non-uniform motion, it is said to be in acceleration.
          </div>

          <p className="text-xs">
            The net force acting on an object kept in a lift which is accelerating is not zero, as the object is in non-uniform motion.
          </p>

          <p className="text-xs">
            When two forces act on a body, as in the above case, one of the forces should be greater than the other to set the body in motion.
          </p>

          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3 text-xs text-sky-950">
            The strength of a force is usually represented by its <strong>magnitude</strong>. The direction of a force is as important as its magnitude. We represent the direction of force, magnitude using &ldquo;arrows&rdquo; (&rarr;).
          </div>

          {/* Activity-9 Box (Part 1) */}
          <div className="rounded-[18px] border border-fuchsia-200 bg-fuchsia-50/40 p-4 shadow-sm space-y-3">
            <div className="inline-block rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              Activity-9
            </div>
            <h3 className="font-heading text-sm font-bold text-fuchsia-950">
              Effects of net force acting on a table
            </h3>
            <ul className="text-xs text-fuchsia-950 font-semibold list-disc list-inside">
              <li>Try to push a heavy wooden table. (Fig-12a). Is it hard to push?</li>
            </ul>

            {/* Fig 12(a) Container */}
            <div className="flex flex-col items-center rounded-xl border border-fuchsia-200 bg-white p-2.5 shadow-2xs text-center">
              <img
                src="/assets/images/C8-Science/ch1_fig12a.png"
                alt="Fig-12(a) Single boy pushing table"
                className="h-28 w-auto object-contain rounded"
              />
              <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
                Fig - 12(a)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Activity-9 Figures 12(b) & 12(c) */}
        <div className="space-y-4 text-justify">
          <ul className="rounded-xl border border-fuchsia-200 bg-fuchsia-50/40 p-3 text-xs text-fuchsia-950 font-semibold list-disc list-inside space-y-1">
            <li>Ask your friend to help you in pushing the table in the same direction, as shown in the fig.12 (b). Do you find it easier to move the table now? Why?</li>
          </ul>

          {/* Fig 12(b) Container */}
          <div className="flex flex-col items-center rounded-2xl border border-fuchsia-200 bg-white p-2.5 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch1_fig12b.png"
              alt="Fig-12(b) Two friends pushing table in same direction"
              className="h-28 w-auto object-contain rounded"
            />
            <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
              Fig - 12 (b)
            </span>
          </div>

          <p className="text-xs">
            You may notice that it is easier to push the table when you take the help of your friend. The force applied by your friend added to the force exerted by you, results in both forces being applied on the table in the same direction. The total force applied by both of you made it easy to move the table.
          </p>

          <ul className="rounded-xl border border-fuchsia-200 bg-fuchsia-50/40 p-3 text-xs text-fuchsia-950 font-semibold list-disc list-inside space-y-1">
            <li>Now ask your friend to push the table from the opposite side as shown in fig.12(c). Does it move? If it moves, then in which direction does it move?</li>
          </ul>

          {/* Fig 12(c) Container */}
          <div className="flex flex-col items-center rounded-2xl border border-fuchsia-200 bg-white p-2.5 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch1_fig12c.png"
              alt="Fig-12(c) Two friends pushing table from opposite sides"
              className="h-28 w-auto object-contain rounded"
            />
            <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
              Fig-12(c)
            </span>
          </div>

          <p className="text-xs">
            When you and your friend push the table from opposite sides, the table doesn&apos;t move if both of you apply force with equal magnitude.
          </p>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">11</span>
      </div>
    </div>
  );
}
