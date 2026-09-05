import React from "react";

export function C8ScienceCh2Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Tyres, Gymnasts, Carrom */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            It is done to provide the shoes better grip on the floor, so that you can move safely. Similarly, the tyres of cars, trucks and bulldozers are treaded (<strong>fig-16</strong>). Why?
          </p>

          <ul className="rounded-xl border border-sky-200 bg-sky-50/40 p-2.5 text-xs text-sky-950 font-semibold list-disc list-inside">
            <li>Why do you need to change the tyres when its treading is worn out?</li>
          </ul>

          {/* Fig 16 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-white p-2 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch2_fig16.png"
              alt="Fig-16 Pattern of tyre"
              className="h-24 w-auto object-contain rounded"
            />
            <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
              Fig-16 : Pattern of tyre
            </span>
          </div>

          <p>
            Gymnasts apply some coarse substance on their hands to increase friction for better grip.
          </p>

          <p>
            In some situations, however, friction is undesirable and we would like to minimize it.
          </p>

          {/* Fig 17 Container */}
          <div className="flex flex-col items-center rounded-2xl border border-fuchsia-200 bg-fuchsia-50/30 p-2 shadow-2xs text-center">
            <img
              src="/assets/images/C8-Science/ch2_fig17.png"
              alt="Fig-17 The carom board"
              className="h-24 w-auto object-contain rounded"
            />
            <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
              Fig-17 : The carom board
            </span>
          </div>

          <p>
            Play carom board without powder and then play with fine powder sprinkled on the board.
          </p>

          <ul className="rounded-xl border border-fuchsia-200 bg-white p-2.5 text-xs text-fuchsia-950 font-semibold list-disc list-inside space-y-1">
            <li>In which case is the movement of the striker and the coins easy? Why?</li>
            <li>Why do we apply a few drops of oil on the hinges of a door?</li>
          </ul>
        </div>

        {/* Right Column: Lubricants & Activity-8 Rollers */}
        <div className="space-y-4 text-justify text-xs">
          <ul className="rounded-xl border border-sky-200 bg-sky-50/40 p-2.5 text-xs text-sky-950 font-semibold list-disc list-inside">
            <li>Why do we use grease between the moving parts of motor vehicles?</li>
          </ul>

          <p>
            In all the above cases, we want to reduce friction in order to increase efficiency.
          </p>

          <p>
            When oil, grease or any other lubricants are applied between the moving parts of a machine, a thin layer is formed between the moving surfaces and hence they do not directly rub against each other. Interlocking of irregularities is avoided to a great extent by the application of lubricants. Hence movement becomes smooth.
          </p>

          {/* Lubricants Definition Box */}
          <div className="rounded-2xl border-2 border-fuchsia-400 bg-gradient-to-br from-fuchsia-50 to-pink-50 p-3.5 text-fuchsia-950">
            <span className="font-heading text-[11px] uppercase tracking-wider font-bold text-fuchsia-800 block mb-0.5">
              Definition of Lubricants
            </span>
            <p className="font-semibold italic text-xs">
              &ldquo;The substances which reduce friction between the moving parts of a machine are called <strong>Lubricants</strong>.&rdquo;
            </p>
          </div>

          {/* Activity 8 */}
          <div className="rounded-[20px] border-2 border-sky-300 bg-sky-50/30 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-sky-200 pb-2">
              <div className="inline-block rounded-full bg-fuchsia-700 px-3 py-1 text-xs font-bold text-white shadow-2xs font-heading">
                Activity -8
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center rounded-lg bg-white p-1 shadow-2xs border border-sky-200">
                <img
                  src="/assets/images/C8-Science/ch2_qr_act8.png"
                  alt="QR Code 0HPC6Z"
                  className="h-8 w-8 object-contain"
                />
                <span className="font-mono text-[8px] font-bold tracking-widest text-sky-950 mt-0.5">
                  0HPC6Z
                </span>
              </div>
            </div>

            <h3 className="font-heading text-sm font-bold text-sky-950">
              Effect of rollers on friction
            </h3>

            {/* Fig 18 Container */}
            <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-white p-2 shadow-2xs text-center">
              <img
                src="/assets/images/C8-Science/ch2_fig18.png"
                alt="Fig-18 Pulling suitcase with rollers"
                className="h-28 w-auto object-contain rounded"
              />
              <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
                Fig-18 : Pulling suitcase with rollers
              </span>
            </div>

            <p>
              Pull a suitcase without rollers and pull a suitcase which has rollers.
            </p>

            <ul className="rounded-xl border border-sky-200 bg-white p-2 text-xs text-sky-950 font-semibold list-disc list-inside">
              <li>In which case pulling is easy? Why?</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">28</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-fuchsia-900 font-semibold">Friction</span>
      </div>
    </div>
  );
}
