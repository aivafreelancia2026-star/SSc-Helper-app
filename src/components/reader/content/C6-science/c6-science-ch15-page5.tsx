import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh15Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">
            In our day-to-day life, we observe many shadows on the surface of the Earth. In all these
            cases, the earth is the screen.
          </p>

          {/* Do you know? Box */}
          <div className="rounded-[16px] border border-sky-200 bg-sky-50/40 p-4">
            <div className="flex items-center gap-2 text-sky-850 mb-2">
              <span className="text-base font-bold">💡</span>
              <p className="font-heading text-sm font-bold tracking-tight">Do you know?</p>
            </div>
            <p className="font-body text-xs text-foreground/80 leading-relaxed mb-2">
              Shadow puppetry is one of our traditional recreational activities. In this, some puppets
              are used to form shadows on a screen and a story is narrated with the help of these shadows.
              Observe Fig. 6.
            </p>
            
            <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-sky-100 p-2 max-w-[180px] mx-auto shadow-xs">
              <img
                src="/assets/images/C6-science/ch15_fig6.png"
                alt="Fig. 6 — Shadow puppetry traditional show screen performance"
                className="max-w-full h-auto rounded"
              />
              <p className="text-center font-body text-[10px] italic text-foreground/50 mt-1 font-semibold">
                Fig. 6
              </p>
            </div>

            <p className="mt-2 font-body text-xs text-foreground/80">
              Try to make puppets and do a shadow puppet show in your school.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-sky-800">
            15.2. Can we guess the object by observing its shadow?
          </h2>
          <p className="text-xs">
            Observe the shadows given in Fig. 7(a). Guess and write the names of the objects which form the
            shadows.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[280px] mx-auto">
            <img
              src="/assets/images/C6-science/ch15_fig7_a.png"
              alt="Fig. 7(a) — Hand animal shadow silhouettes: bird, dog, tree, pipe"
              className="max-w-full h-auto"
            />
            <div className="flex justify-between w-full text-[9px] text-foreground/40 font-semibold px-4 pt-1">
              <span>_________</span>
              <span>_________</span>
              <span>_________</span>
              <span>_________</span>
              <span>_________</span>
            </div>
            <p className="text-center font-body text-xs italic text-foreground/50 mt-1 font-semibold">
              Fig. 7(a)
            </p>
          </div>

          <p className="text-xs pt-2">
            See the objects in Fig. 7(b) and compare them with the names guessed by you.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[285px] mx-auto">
            <img
              src="/assets/images/C6-science/ch15_fig7_b.png"
              alt="Fig. 7(b) — Actual hands configurations and tools creating the shadows"
              className="max-w-full h-auto"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-1 font-semibold">
              Fig. 7(b)
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>The speed at which light travels is about 300,000 kilometres per second.</TipBox>
      </div>
    </div>
  );
}
