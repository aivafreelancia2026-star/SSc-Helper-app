import React from "react";

export function C8ScienceCh1Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Top Section */}
      <div className="space-y-4">
        <p className="text-justify">
          When an object slips off your hand, why does it always fall down? If you roll a ball on a level ground, it slows down and after sometime it will come to a stop. What makes the ball stop? What forces acting on objects, change their state or position of motion?
        </p>

        {/* Section 1.2 Header Banner */}
        <div className="rounded-[18px] border border-sky-300 bg-sky-50/70 p-4 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="font-heading text-lg font-bold text-sky-950">
              1.2 Types of forces
            </h2>
            <p className="font-heading text-xs font-semibold text-sky-800">
              Contact forces and forces at a distance (Field Forces)
            </p>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center rounded-lg bg-white p-1.5 shadow-2xs border border-sky-200">
            <img
              src="/assets/images/C8-Science/ch1_qr2.png"
              alt="QR Code 07HQCD"
              className="h-10 w-10 object-contain"
            />
            <span className="font-mono text-[9px] font-bold tracking-widest text-sky-950 mt-0.5">
              07HQCD
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Contact Force intro & Figures */}
        <div className="space-y-4 text-justify">
          <p className="font-semibold text-sky-900">Observe the following figures.</p>

          <div className="grid grid-cols-2 gap-3">
            {/* Fig 1(a) */}
            <div className="flex flex-col items-center rounded-xl border border-sky-200 bg-white p-2.5 shadow-2xs text-center">
              <img
                src="/assets/images/C8-Science/ch1_fig1a.png"
                alt="Fig 1(a) Pressing tube"
                className="h-24 w-auto object-contain rounded"
              />
              <span className="mt-2 text-[11px] font-medium text-foreground/75 italic leading-tight">
                Fig 1 (a) Pressing tube to come out of the toothpaste.
              </span>
            </div>

            {/* Fig 1(b) */}
            <div className="flex flex-col items-center rounded-xl border border-sky-200 bg-white p-2.5 shadow-2xs text-center">
              <img
                src="/assets/images/C8-Science/ch1_fig1b.png"
                alt="Fig 1(b) Compass needle deflection"
                className="h-24 w-auto object-contain rounded"
              />
              <span className="mt-2 text-[11px] font-medium text-foreground/75 italic leading-tight">
                Fig-1(b) Change in direction of compass needle due to bar magnet.
              </span>
            </div>
          </div>

          <p>
            Why does the toothpaste come out when we press the tube? Why does the needle of a magnetic compass move when we place a bar magnet near it? Have you observed the difference between the force you applied on the tube and the force applied by a magnet on the needle of a compass?
          </p>

          <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-3.5 space-y-2">
            <p>
              In Fig 1 (a) you observe that there is direct physical contact (or interaction) between your hand and the tube. Force, which results when there is a direct physical contact between two interacting objects, is known as <strong className="text-sky-950 font-bold">contact force</strong>.
            </p>
          </div>
        </div>

        {/* Right Column: Field Force & Magnetic Force Activity */}
        <div className="space-y-4 text-justify">
          <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-3.5 space-y-2">
            <p>
              In Fig 1 (b) the needle of the compass changes its direction without any physical contact with the bar magnet. But a force must be acting on the needle. The force which occurs without any physical contact between two objects is known as a <strong className="text-sky-950 font-bold">force at a distance</strong> or <strong className="text-sky-950 font-bold">field force</strong>.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-base font-bold text-fuchsia-950">
              1.3 Forces acting at a distance (field forces)
            </h3>
            <h4 className="font-heading text-sm font-bold text-sky-900 mt-1">
              1.3.1 Magnetic force
            </h4>
            <p className="mt-1 text-xs">
              You must have done some experiments with magnets in class VI. Let us recall some of your experiences.
            </p>
          </div>

          {/* Activity-2 Box */}
          <div className="rounded-[18px] border border-fuchsia-200 bg-fuchsia-50/40 p-4 shadow-sm space-y-3">
            <div className="inline-block rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              Activity-2
            </div>
            <h4 className="font-heading text-sm font-bold text-fuchsia-950">
              Observing the magnetic force.
            </h4>
            <p className="text-xs leading-relaxed text-foreground/85">
              Take a sewing needle. Rub it with a bar magnet several times always moving the magnet in the same direction. Does the needle get magnetised? You may find that the needle acts like a magnet. With the help of a magnetic compass you can identify the north and south poles of the needle. Pin a red coloured cork ball to South Pole and white ball to North Pole of the needle; then drop it in a bowl of water, it floats. (Fig-2)
            </p>
            <p className="text-xs leading-relaxed text-foreground/85">
              Make another needle in the same way. Float both the needles such that same colour balls face each other (either red or white balls).
            </p>
            <ul className="text-xs text-fuchsia-950 font-semibold list-disc list-inside space-y-1">
              <li>What happens to the needles? How do they move?</li>
            </ul>
            <p className="text-xs leading-relaxed text-foreground/85">
              Similarly, float both the needles in such a way that different colour balls face each other.
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">3</span>
      </div>
    </div>
  );
}
