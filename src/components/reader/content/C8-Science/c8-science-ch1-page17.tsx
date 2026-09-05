import React from "react";

export function C8ScienceCh1Page17() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* What we have learnt box */}
      <div className="rounded-[22px] border-2 border-fuchsia-300 bg-fuchsia-50/40 p-5 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-700 px-4 py-1.5 text-xs font-bold text-white shadow-2xs font-heading">
          <span>📑</span>
          <span>What we have learnt?</span>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs leading-relaxed text-foreground/85 list-disc list-inside">
          <li>Force is a push or a pull.</li>
          <li>A force can act on an object with or without being in contact with it. A force acting on a body is either a contact force or force acting at a distance.</li>
          <li>Field is a three dimensional region. If an object is kept at any point in the field, it will experience the force.</li>
          <li>Friction is the force that opposes relative motion of surfaces in contact.</li>
          <li>The force which we exert by using our body muscles is known as muscular force.</li>
          <li>The attractive force between any two massive objects is called gravitational force.</li>
          <li>The magnetic force attracts a magnetic material such as iron. But it either attracts or repels another magnet.</li>
          <li>The force exerted by a charged body on other charged body is known as electrostatic force.</li>
          <li>Force has magnitude as well as direction.</li>
          <li>The algebraic sum of all the forces acting on a body is known as net force, and is denoted by F<sub>net</sub>.</li>
          <li>A force can change the state of motion of an object.</li>
          <li>Force may cause a change in the shape of an object.</li>
          <li className="md:col-span-2 font-semibold text-fuchsia-950">
            The force acting perpendicularly on a unit area of a surface is called pressure.
          </li>
        </ul>
      </div>

      {/* Improve your learning section */}
      <div className="rounded-[22px] border border-sky-300 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-sky-200 pb-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-700 px-4 py-1.5 text-xs font-bold text-white shadow-2xs font-heading">
            <span>📝</span>
            <span>Improve your learning</span>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center rounded-lg bg-sky-50 p-1 shadow-2xs border border-sky-200">
            <img
              src="/assets/images/C8-Science/ch1_qr4.png"
              alt="QR Code G6SKIC"
              className="h-10 w-10 object-contain"
            />
            <span className="font-mono text-[9px] font-bold tracking-widest text-sky-950 mt-0.5">
              G6SKIC
            </span>
          </div>
        </div>

        {/* Exercises */}
        <div className="space-y-4 text-xs">
          <div>
            <h3 className="font-heading text-sm font-bold text-sky-950 mb-2">
              I. Reflections on concepts
            </h3>
            <ol className="space-y-2 pl-4 list-decimal text-foreground/85">
              <li>What is a force? What changes can be produced by a Force? <span className="font-semibold text-fuchsia-900">(AS₁)</span></li>
              <li>Give two examples each for a contact force and a force at a distance. <span className="font-semibold text-fuchsia-900">(AS₁)</span></li>
              <li>Explain Gravitational Force by giving a suitable example. <span className="font-semibold text-fuchsia-900">(AS₁)</span></li>
              <li>Draw and explain a free body diagram (FBD) to show all the forces acting on a car? <span className="font-semibold text-fuchsia-900">(AS₅)</span></li>
              <li>Why do tools meant for cutting always have sharp edges? <span className="font-semibold text-fuchsia-900">(AS₁)</span></li>
            </ol>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold text-sky-950 mb-2">
              II. Application of concepts
            </h3>
            <ol className="space-y-2 pl-4 list-decimal text-foreground/85">
              <li>Explain the differences between a contact force and a force at a distance with examples? <span className="font-semibold text-fuchsia-900">(AS₁)</span></li>
            </ol>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">17</span>
      </div>
    </div>
  );
}
