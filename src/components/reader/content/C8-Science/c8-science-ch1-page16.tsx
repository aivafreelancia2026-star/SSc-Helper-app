import React from "react";

export function C8ScienceCh1Page16() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column */}
        <div className="space-y-4 text-justify">
          <p className="text-xs">
            As shown in Fig.-19, drop one brick vertically in one tray and the other brick horizontally in the second tray from certain height. What do you notice?
          </p>

          <ul className="rounded-xl border border-sky-200 bg-sky-50/40 p-3 text-xs text-sky-950 font-semibold list-disc list-inside">
            <li>Do both bricks sink to the same depth in lime powder? If not why?</li>
          </ul>

          {/* Fig-19 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-white p-3 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch1_fig19.png"
              alt="Fig-19 Bricks dropped vertically and horizontally"
              className="h-28 w-auto object-contain rounded"
            />
            <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
              Fig-19: (a) Vertical brick sinks deeper, (b) Horizontal brick sinks less.
            </span>
          </div>

          <p className="text-xs">
            You may notice that the brick standing vertically sinks deeper in lime powder than the brick standing horizontally.
          </p>

          <p className="text-xs">
            Since the masses of both bricks are similar, the force applied on lime powder by them is the same on both the trays. The difference lies in the surface area of the brick in contact with the lime powder and this is responsible for the change in the extent to which the brick sinks in the lime powder.
          </p>

          <p className="text-xs">
            In above activity, the contact area on which force is acting is different in each case. The depth to which the brick sinks in the first tray (Fig 19 a) is deeper than that in the second tray (Fig 19 b). This is because
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 text-justify">
          <p className="text-xs">
            in Fig 19(a), the contact area or the surface area on which force is acting is smaller and hence, the pressure exerted by the brick is more. In Fig 19(b), the contact area or the surface area on which force acting is larger. Hence the pressure exerted by the brick is less.
          </p>

          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3 text-xs text-sky-950">
            Why does the sharper side of a knife cuts more easily than the blunt side of it? A sharp side of knife has a smaller contact area. Therefore, for the same amount of force applied on it, the sharp side of knife exerts more pressure than the blunt side and hence cuts more easily.
          </div>

          <ul className="rounded-xl border border-fuchsia-200 bg-fuchsia-50/40 p-3 text-xs text-fuchsia-950 font-semibold list-disc list-inside">
            <li>Can you give some more examples of pressure?</li>
          </ul>

          <p className="text-xs">
            From the above examples, you can say that for a given force, if the surface area is smaller, the pressure will be greater. If you use a larger area, you are spreading out the force, and the pressure becomes smaller.
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
              Does pressure have direction? Explain.
            </p>
          </div>
        </div>
      </div>

      {/* Key Words Box matching textbook footer */}
      <div className="rounded-[18px] border-2 border-fuchsia-300 bg-fuchsia-50/40 p-4 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
          <span>🔑</span>
          <span>Key words</span>
        </div>
        <p className="text-xs italic text-fuchsia-950 leading-relaxed font-medium">
          Force, Push, Pull, Contact force, Force at a distance, Field, Friction, Muscular force, Gravitational force, Magnetic force, Electrostatic force, Net force, Magnitude, Equilibrium, Normal force, Tension, State of motion, Pressure, Freebody diagram.
        </p>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">16</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
      </div>
    </div>
  );
}
