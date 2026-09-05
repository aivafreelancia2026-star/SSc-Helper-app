import React from "react";

export function C8ScienceCh2Page11() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Drag definition & Activity-11 */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            You can observe fluid friction when you travel in a boat.
          </p>

          <p>
            Not only liquids, gases and air also offer friction to bodies like aeroplanes, jets when they move through air.
          </p>

          {/* Drag Definition Box */}
          <div className="rounded-2xl border-2 border-fuchsia-400 bg-gradient-to-br from-fuchsia-50 to-pink-50 p-3.5 space-y-1 text-fuchsia-950">
            <span className="font-heading text-[11px] uppercase tracking-wider font-bold text-fuchsia-800 block">
              Fluid Friction &amp; Drag
            </span>
            <p className="leading-relaxed">
              In science, the common name for gases and liquids is <strong>&lsquo;fluids&rsquo;</strong>. Fluids exert a force of friction on objects in motion through them. The frictional force exerted by fluids is also called <strong>&ldquo;drag&rdquo;</strong>.
            </p>
          </div>

          {/* Activity 11 */}
          <div className="rounded-[20px] border border-sky-300 bg-sky-50/30 p-4 space-y-2.5">
            <div className="inline-block rounded-full bg-fuchsia-700 px-3 py-0.5 text-[11px] font-bold text-white shadow-2xs font-heading">
              Activity-11
            </div>
            <h3 className="font-heading text-sm font-bold text-sky-950">
              Identifying the factors influencing the fluid friction
            </h3>

            <p>
              Take a tub of water. Try to move your hand in water in the direction of stretched fingers (up and down). Now try to move your hand in the direction perpendicular to the plane of the hand (to and fro).
            </p>

            <ul className="rounded-xl border border-sky-200 bg-white p-2.5 text-xs text-sky-950 font-semibold list-disc list-inside">
              <li>In which orientation of your hand, do you experience more drag? Why?</li>
            </ul>

            <p className="text-[11px] text-foreground/80">
              Moving your hand flat perpendicular to the water creates a large surface area opposing motion, resulting in much higher drag.
            </p>
          </div>
        </div>

        {/* Right Column: Streamlining & Fig-22 & Key Words */}
        <div className="space-y-4 text-justify text-xs">
          <div className="rounded-[20px] border border-sky-300 bg-white p-4 space-y-3">
            <p>
              Frictional force on an object in a fluid depends on its <strong>speed with respect to fluid</strong>, on the <strong>shape of the object</strong>, and on the <strong>nature of the fluid</strong>.
            </p>

            {/* Fig 22 Container */}
            <div className="flex flex-col items-center rounded-xl border border-sky-200 bg-sky-50/40 p-2 text-center">
              <img
                src="/assets/images/C8-Science/ch2_fig22.png"
                alt="Fig-22 Bird and Aeroplane"
                className="h-20 w-auto object-contain rounded"
              />
              <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
                Fig-22 : Bird and Aeroplane
              </span>
            </div>

            <p>
              Birds and fishes have to move about in fluids all the time. Their bodies have evolved to <strong>streamlined shapes</strong> which allow them to overcome fluid friction without wasting much energy. All aeroplanes, speedboats, and automobiles are designed with streamlined contours to minimize drag.
            </p>
          </div>

          {/* Key Words Box */}
          <div className="rounded-[20px] border-2 border-fuchsia-400 bg-fuchsia-50/40 p-4 space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-fuchsia-700 px-3 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              <span>🔑</span>
              <span>Key words</span>
            </div>
            <p className="font-medium text-fuchsia-950 text-xs italic leading-relaxed">
              Friction, Static Friction, Sliding friction, Lubricants, Rolling friction, Ball bearings, Drag, Fluid Friction.
            </p>
          </div>
        </div>
      </div>

      {/* What we have learnt? Part 1 */}
      <div className="rounded-[22px] border-2 border-fuchsia-300 bg-fuchsia-50/30 p-4 space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-fuchsia-700 px-3 py-1 text-xs font-bold text-white shadow-2xs font-heading">
          <span>📑</span>
          <span>What we have learnt?</span>
        </div>
        <ul className="text-xs list-disc list-inside text-foreground/85 space-y-1">
          <li>Friction opposes the relative motion between two surfaces in contact. It acts on both the surfaces.</li>
        </ul>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">30</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-fuchsia-900 font-semibold">Friction</span>
      </div>
    </div>
  );
}
