import React from "react";

export function C8ScienceCh1Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column */}
        <div className="space-y-4 text-justify">
          <p>
            If we keep the same pen on a table, it does not fall down. Why?
          </p>
          <p>
            Generally our answer would be that the table supports the pen. If the table does not support the pen it would fall down until it is supported by another object, like the floor.
          </p>

          <ul className="rounded-xl border border-sky-200 bg-sky-50/40 p-3.5 text-xs text-sky-950 font-semibold list-disc list-inside space-y-1.5">
            <li>Why does a stone thrown up into the sky fall back to the earth?</li>
            <li>Why do rivers flow down to the sea?</li>
            <li>How does the earth hold the atmosphere?</li>
            <li>Is there any force pulling the objects towards earth?</li>
          </ul>

          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3.5 space-y-2 text-xs">
            <p>
              If an object is thrown upwards, there exists a force which pulls it down towards the earth, because of this it falls down to the ground. We call this force as a <strong className="text-sky-950 font-bold">gravitational force</strong>.
            </p>
            <p>
              Every object on the Earth or close to Earth, will experience a gravitational pull. The force of gravity is not just due to the attraction of the Earth. It is a force of attraction that exists between any two bodies (or masses) everywhere in the universe.
            </p>
          </div>

          <p className="text-xs">
            As the earth is so massive and huge, all the other objects close to the earth are attracted or pulled towards it. When you sit in your class room, there will be a gravitational force between you and your teacher, and a similar force exists between you and the black board.
          </p>

          <p className="text-xs text-foreground/75">
            You cannot experience the gravitational force that exists between you and your teacher or between you and the black board because it is very small when compared to the gravitational force exerted by the earth on these objects. You will learn more about this in the lesson &ldquo;Gravitation&rdquo; in higher classes.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 text-justify">
          <p className="text-xs">
            Gravitational force works even if the objects are not in contact. So, this is an example of <strong className="text-sky-950 font-bold">field force</strong>.
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
              A cricket ball of mass &lsquo;m&rsquo; is thrown upward with some initial speed. If the air resistance is neglected, what forces are acting on the ball when it reaches:
            </p>
            <ol className="text-xs text-fuchsia-950 font-semibold list-decimal list-inside pl-2 space-y-1">
              <li>half its maximum height and</li>
              <li>its maximum height?</li>
            </ol>
          </div>

          {/* Section 1.3.4 Concept of Field */}
          <div>
            <h3 className="font-heading text-base font-bold text-sky-950">
              1.3.4 Explaining of force acting at a distance: concept of field
            </h3>
            <p className="mt-1 text-xs">
              The force which acts between two bodies, when the bodies are not directly touching each other is called force at a distance. We can explain the forces at a distance by using the concept of field.
            </p>
          </div>

          {/* Activity-4 */}
          <div className="rounded-[18px] border border-sky-200 bg-sky-50/40 p-4 shadow-sm space-y-3">
            <div className="inline-block rounded-full bg-sky-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              Activity-4
            </div>
            <h4 className="font-heading text-sm font-bold text-sky-950">
              Visualizing magnetic field.
            </h4>

            {/* Fig 4 Container */}
            <div className="flex flex-col items-center rounded-xl border border-sky-200 bg-white p-2 text-center">
              <img
                src="/assets/images/C8-Science/ch1_fig4.png"
                alt="Fig 4 Magnetic field lines with iron filings"
                className="h-24 w-auto object-contain rounded"
              />
              <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
                Fig-4 : Magnetic field
              </span>
            </div>

            <ul className="text-xs leading-relaxed text-foreground/85 list-disc list-inside space-y-1.5">
              <li>Take a bar magnet and place it on a table. Place a thick white paper over it (White drawing sheet).</li>
              <li>On the paper, sprinkle fine powder of iron (iron filings) as shown in the fig -4.</li>
              <li>Tap the table or the paper gently with pen/pencil.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">5</span>
      </div>
    </div>
  );
}
