import React from "react";

export function C8ScienceCh2Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Forces acting on book & Frictional Force definition */}
        <div className="rounded-[22px] border border-sky-300 bg-white p-5 shadow-sm space-y-4 text-justify">
          {/* Fig 3 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-sky-50/40 p-3 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch2_fig3.png"
              alt="Fig-3 Forces acting on the book"
              className="h-32 w-auto object-contain rounded"
            />
            <span className="mt-1 text-[11px] font-medium text-foreground/75 italic">
              Fig-3 : Forces acting on the book
            </span>
          </div>

          <p className="text-xs">
            Two forces act on the book in the vertical direction as shown in <strong>fig-3</strong>.
          </p>

          <p className="text-xs">
            They are,
          </p>

          <ol className="space-y-1 pl-4 list-[lower-roman] text-xs text-foreground/85">
            <li><strong>Weight of the book (W)</strong> or gravitational force acting vertically down.</li>
            <li><strong>Normal force (N)</strong> or reaction force applied by the floor vertically up.</li>
          </ol>

          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3 text-xs text-sky-950 font-medium">
            As there is no change in motion of the book along the vertical direction, the net force acting on the book in the vertical direction is zero. That is,
            <div className="text-center font-mono font-bold text-sm my-1 text-sky-900">
              W - N = 0 &nbsp;&rArr;&nbsp; W = N
            </div>
          </div>

          <p className="text-xs">
            In the horizontal direction, the speed of the book is changing continuously. Its speed is decreasing gradually in the horizontal direction i.e., the book has acceleration opposite to the direction of motion (which we call <em>deceleration</em>).
          </p>

          <ul className="rounded-xl border border-sky-200 bg-sky-50/40 p-3 text-xs text-sky-950 font-semibold list-disc list-inside space-y-1">
            <li>What are the forces acting on the book in the horizontal direction?</li>
            <li>What is the net force acting in the horizontal direction?</li>
          </ul>

          <p className="text-xs">
            When the speed of the body moving in a straight line changes continuously, we say that the body has acquired an acceleration.
          </p>

          <p className="text-xs">
            By close observation of this activity, we can understand that the floor applies a force on the book against its motion. Similarly the book also applies the same amount of force on the floor in the opposite direction. Here it is clear that the floor is at rest. Hence the net force acts in the direction of the force applied by the floor on the book.
          </p>

          {/* Key Definition Box */}
          <div className="rounded-xl border-2 border-fuchsia-400 bg-fuchsia-50/60 p-3 text-xs text-fuchsia-950">
            The force applied by the floor on the book is called <strong>&ldquo;frictional force&rdquo;</strong> or <strong>friction</strong>.
          </div>
        </div>

        {/* Right Column: Lab Activity */}
        <div className="rounded-[22px] border-2 border-fuchsia-300 bg-fuchsia-50/20 p-5 shadow-sm space-y-4 text-justify">
          <div className="flex items-center justify-between border-b border-fuchsia-200 pb-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-700 px-4 py-1.5 text-xs font-bold text-white shadow-2xs font-heading">
              <span>🔬</span>
              <span>Lab Activity</span>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center rounded-lg bg-white p-1 shadow-2xs border border-fuchsia-200">
              <img
                src="/assets/images/C8-Science/ch2_qr_lab.png"
                alt="QR Code 08FDHB"
                className="h-10 w-10 object-contain"
              />
              <span className="font-mono text-[9px] font-bold tracking-widest text-fuchsia-950 mt-0.5">
                08FDHB
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <p>
              <strong>Aim:</strong> Understanding the nature of friction and the concept of static friction.
            </p>
            <p>
              <strong>Material required:</strong> Toy Trolley, small wooden block, inextensible string, weights, pulley weight hanger, and a long table.
            </p>
          </div>

          {/* Fig 4 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-fuchsia-200 bg-white p-2.5 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch2_fig4.png"
              alt="Fig-4 The trolley accelerating towards left"
              className="h-32 w-auto object-contain rounded"
            />
            <span className="mt-1 text-[11px] font-medium text-foreground/75 italic">
              Fig-4 : The trolley accelerating towards left
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <p className="font-bold text-fuchsia-950">Procedure:</p>
            <p>
              Take a small toy trolley and keep a small wooden block on it as shown in <strong>fig-4</strong>.
            </p>
            <p>
              Tie an inextensible string to the trolley and pass it over a pulley. And other end of the string is fixed to weight hanger.
            </p>
            <p>
              Take a small weight and keep it on weight hanger and observe the changes in motion of the trolley and block...
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-fuchsia-900 font-semibold">Friction</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">21</span>
      </div>
    </div>
  );
}
