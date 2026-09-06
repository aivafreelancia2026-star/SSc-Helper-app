import React from "react";

export function C8ScienceCh1Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Normal Force */}
        <div className="space-y-4 text-justify">
          <h2 className="font-heading text-base font-bold text-sky-950">
            1.4.3 Normal force
          </h2>

          {/* Fig-8 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-white p-3 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch1_fig8.png"
              alt="Fig-8 Force of gravitation and normal force acting on the book"
              className="h-32 w-auto object-contain rounded"
            />
            <span className="mt-2 text-[11px] font-medium text-foreground/75 italic">
              Fig-8: Force of gravitation and normal force acting on the book.
            </span>
          </div>

          <p className="text-xs">
            Place your science book on the table. Is it in a state of rest? Is there any force acting on that book? Imagine that the table has disappeared suddenly by magic. What will happen then? The book will fall down due to the gravitational pull of the Earth. Even when a book is lying on the table, the gravity pulls the book down all the time but it does not fall down because it is supported by the table. Therefore, there exists a force which supports the book against gravity by pushing it upward.
          </p>

          <ul className="text-xs text-sky-950 font-semibold list-disc list-inside space-y-1">
            <li>What do we call this force?</li>
          </ul>

          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3.5 space-y-2 text-xs">
            <p>
              Look at the fig.8 A direction which is perpendicular to the plane of a surface is said to be <strong className="text-sky-950 font-bold">normal</strong>. The force that a solid surface exerts on any object in the normal direction is called the <strong className="text-sky-950 font-bold">normal force</strong>.
            </p>
          </div>

          <p className="text-xs">
            In the above example the downward gravitational force is balanced by the upward normal force. Since these two forces are of equal magnitude and acting in opposite directions, we say that the net force acting on the book is zero and the book is in equilibrium.
          </p>
        </div>

        {/* Right Column: Tension */}
        <div className="space-y-4 text-justify">
          <h2 className="font-heading text-base font-bold text-fuchsia-950">
            1.4.4 Tension
          </h2>

          {/* Fig-9 & Intro */}
          <div className="flex items-start gap-4">
            <p className="text-xs flex-1">
              As shown in the figure-9 a wooden block is suspended with the help of a string and its free end is tied to the ceiling.
            </p>
            <div className="flex flex-col items-center rounded-xl border border-fuchsia-200 bg-white p-2 shadow-2xs text-center w-28">
              <img
                src="/assets/images/C8-Science/ch1_fig9.png"
                alt="Fig-9 Wooden block suspended by string"
                className="h-24 w-auto object-contain rounded"
              />
              <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
                Fig-9
              </span>
            </div>
          </div>

          <ul className="rounded-xl border border-fuchsia-200 bg-fuchsia-50/40 p-3 text-xs text-fuchsia-950 font-semibold list-disc list-inside space-y-1">
            <li>What is the state of the wooden block?</li>
            <li>What forces are acting on it?</li>
            <li>What will happen if the string is broken?</li>
          </ul>

          <p className="text-xs">
            We know that the wooden block would fall down due to gravitational pull (weight) of the earth if the string is broken.
          </p>

          <p className="text-xs">
            For a wooden block tied to the string, gravity pulls down the wooden block all the time but it does not fall down because it is supported by the string. Thus, there exists a force which supports the wooden block against gravity by pulling it upward.
          </p>

          {/* Fig-10 & Tension Definition */}
          <div className="flex items-start gap-4">
            <div className="space-y-2 flex-1">
              <ul className="text-xs text-fuchsia-950 font-semibold list-disc list-inside">
                <li>What do we call this force?</li>
              </ul>
              <div className="rounded-xl border border-fuchsia-200 bg-fuchsia-50/60 p-3 space-y-1 text-xs">
                <p>
                  When you try to stretch a rope or a string the tightness of rope or string is called <strong className="text-fuchsia-950 font-bold">tension</strong>. Tension is a contact force.
                </p>
                <p>
                  In the above example, as shown in fig-10, the upward tension force in the string is equal to downward gravitational force.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-fuchsia-200 bg-white p-2 shadow-2xs text-center w-24">
              <img
                src="/assets/images/C8-Science/ch1_fig10.png"
                alt="Fig-10 Tension T and Weight W"
                className="h-24 w-auto object-contain rounded"
              />
              <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
                Fig-10
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">9</span>
      </div>
    </div>
  );
}
