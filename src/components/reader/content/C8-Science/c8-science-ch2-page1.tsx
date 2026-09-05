import React from "react";

export function C8ScienceCh2Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Chapter 2 Title Banner */}
      <div className="rounded-[22px] border-2 border-fuchsia-400 bg-gradient-to-r from-fuchsia-700 via-fuchsia-800 to-purple-900 p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white/15 px-4 py-2 backdrop-blur-xs border border-white/20">
              <span className="text-[11px] uppercase tracking-wider font-semibold opacity-80">Chapter</span>
              <span className="text-3xl font-extrabold font-heading">2</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tight">
                Friction
              </h1>
              <p className="text-xs text-fuchsia-100/80 font-medium">Class 8 Science &bull; Physics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Text */}
      <div className="rounded-[20px] border border-sky-200 bg-sky-50/40 p-4 text-xs text-sky-950 font-medium text-justify">
        We have learnt about the various types of forces in the chapter &lsquo;Force&rsquo;. We also have learnt about the &lsquo;force of friction&rsquo; which plays an important role in daily life. Let us learn in detail about frictional force in this chapter.
      </div>

      {/* 2.1 Section */}
      <div className="rounded-[22px] border border-fuchsia-300 bg-white p-5 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-fuchsia-100 pb-3">
          <h2 className="font-heading text-base font-bold text-fuchsia-950">
            2.1 Force of friction and its Types
          </h2>

          {/* QR Code */}
          <div className="flex flex-col items-center rounded-lg bg-fuchsia-50 p-1 shadow-2xs border border-fuchsia-200">
            <img
              src="/assets/images/C8-Science/ch2_qr1.png"
              alt="QR Code 08GHFN"
              className="h-10 w-10 object-contain"
            />
            <span className="font-mono text-[9px] font-bold tracking-widest text-fuchsia-950 mt-0.5">
              08GHFN
            </span>
          </div>
        </div>

        {/* Activity 1 */}
        <div className="rounded-[18px] border border-sky-200 bg-sky-50/30 p-4 space-y-4">
          <div className="inline-block rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
            Activity - 1
          </div>
          <h3 className="font-heading text-sm font-bold text-sky-950">
            Identifying forces acting on a body and effect of frictional force
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left Column: Fig 1 & observations */}
            <div className="space-y-3 text-justify">
              <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-white p-2.5 shadow-2xs text-center">
                <img
                  src="/assets/images/C8-Science/ch2_fig1.png"
                  alt="Fig-1 Pushing the book"
                  className="h-32 w-auto object-contain rounded"
                />
                <span className="mt-1 text-[11px] font-medium text-foreground/75 italic">
                  Fig-1 : Pushing the book
                </span>
              </div>

              <p className="text-xs">
                Gently push a book on a horizontal floor as shown in <strong>fig. 1</strong> and then leave it.
              </p>

              <ul className="rounded-xl border border-sky-200 bg-white p-3 text-xs text-sky-950 font-semibold list-disc list-inside space-y-1">
                <li>What do you observe?</li>
              </ul>

              <p className="text-xs">
                You may observe that the book acquires a certain speed in the direction of push. However, the speed of the book gradually decreases and after some time it stops.
              </p>
            </div>

            {/* Right Column: Fig 2 & inquiry */}
            <div className="space-y-3 text-justify">
              <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-white p-2.5 shadow-2xs text-center">
                <img
                  src="/assets/images/C8-Science/ch2_fig2.png"
                  alt="Fig-2 The book acquires a speed"
                  className="h-32 w-auto object-contain rounded"
                />
                <span className="mt-1 text-[11px] font-medium text-foreground/75 italic">
                  Fig-2 : The book acquires a speed
                </span>
              </div>

              <ul className="rounded-xl border border-fuchsia-200 bg-white p-3 text-xs text-fuchsia-950 font-semibold list-disc list-inside space-y-1">
                <li>Why does the book stop after covering some distance?</li>
                <li>Is the book moving with uniform speed?</li>
                <li>Why does the speed of the book change gradually?</li>
              </ul>

              <p className="text-xs">
                You know that the book is in non-uniform motion with respect to the floor. In the &lsquo;Force&rsquo; chapter we studied that non-uniform motion of a body takes place only when a net force acts on it.
              </p>

              <ul className="rounded-xl border border-fuchsia-200 bg-white p-3 text-xs text-fuchsia-950 font-semibold list-disc list-inside">
                <li>How many forces act on the book when it is pushed on the floor?</li>
              </ul>

              <p className="text-xs font-medium text-sky-950">
                Let us observe the forces acting on the book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">20</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-fuchsia-900 font-semibold">Friction</span>
      </div>
    </div>
  );
}
