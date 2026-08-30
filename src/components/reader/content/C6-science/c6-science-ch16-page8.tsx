import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh16Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">
            How does this plant respond when you touch it? How much time does it take to return to its
            previous position? This observation explains that plants also respond to stimulus.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch16_fig5.png"
              alt="Fig. 5 — Touch-me-not (mimosa pudica) plant leaves and pink flower heads"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 5: Touch-me-not plant
            </p>
          </div>

          <h3 className="font-heading text-base font-bold text-emerald-800 pt-2">
            16.8. Response to light by earthworms
          </h3>
          <p className="text-xs">
            <strong>Activity-8:</strong> Get an earthworm from nearby moist soil. Take a glass jar. Cover half
            of the glass jar with black paper as shown in Fig. 6. Put some soil in the jar and put the
            earthworm in the jar. Close the jar with a lid that contains small holes, to allow air into the
            jar. When earthworm crawls out of the covered portion, shed some light on the jar. Then take a
            look at what happens?
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[120px] mx-auto">
            <img
              src="/assets/images/C6-science/ch16_fig6.png"
              alt="Fig. 6 — Earthworm inside glass jar with black paper flashlight light response test"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 6
            </p>
          </div>

          <p className="text-xs pt-2">
            When we shed light on the earthworm, it moves to the dark portion. It seems that earthworms show
            response to stimulus, in this case light.
          </p>

          <h2 className="font-heading text-base font-bold text-emerald-800">
            Seeds - Living or not
          </h2>
          <p className="text-xs">
            Plants are produced by seeds. We know that plant is a living being. Can we say that seeds are also
            living? Let us discuss that characteristics of living beings that seeds have.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
            <li>Does a seed take in food? From where?</li>
            <li>Will seeds die if they are stored for a longer time?</li>
            <li>What happens when a seed is sown in soil?</li>
          </ul>
          <p className="text-xs">
            Seeds germinate and turn into a whole plant. So we can say that seed is a living thing. Can you
            think of any way of deciding whether dry seeds are living? (Fig-(6a))
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[120px] mx-auto">
            <img
              src="/assets/images/C6-science/ch16_fig6_a.png"
              alt="Fig. 6(a) — Dry green gram bean seeds pile"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 6(a)
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Bacteria can survive at even at highest and lowest temperatures.</TipBox>
      </div>
    </div>
  );
}
