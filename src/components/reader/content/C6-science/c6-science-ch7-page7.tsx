import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh7Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            The water in the second conical flask is called distilled water. It is free from
            impurities.
          </p>

          <h3 className="font-heading text-sm font-bold text-indigo-800 pt-2">7.3.7. Sublimation</h3>
          <p>
            In order to separate the components of a mixture we make use of their difference in color,
            shape, size, weight, solubility.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Can we use these features for separating mixtures of powdered salt and camphor?</li>
            <li>What other properties can we use?</li>
          </ul>

          <p className="font-semibold text-indigo-850 pt-2">
            Activity-6: Sublimation of camphor
          </p>
          <p>
            Take a mixture of camphor and powdered salt in a china dish and cover it with a funnel.
            Close the tube of the funnel with cotton. Place the dish on a stand and heat it with a
            burner (Fig. 12).
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[150px] mx-auto">
            <img
              src="/assets/images/C6-science/ch7_fig12.png"
              alt="Fig. 12 — Camphor sublimation setup"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 12
            </p>
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 pt-2">
            <li>What do you observe in the dish?</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <p>
            When camphor is heated, did it transform into liquid or directly change into gaseous form?
            Similarly, on cooling, the gaseous form of camphor changes directly into a solid without
            going to the liquid state. Guess, is same change found on heating salt?
          </p>
          <p>
            The process in which a substance changes directly from solid to gaseous form and vice-versa
            is called <strong>sublimation.</strong>
          </p>

          <h3 className="font-heading text-sm font-bold text-indigo-800 pt-2">
            7.3.8. Chromatography:
          </h3>
          <p>Can we separate colours from a mixture of colours?</p>
          <p className="font-medium">Let us do an interesting activity!</p>

          <p className="font-semibold text-indigo-850 pt-1">
            Activity-7: A chalk with different colours
          </p>
          <p>
            Take a whole stick of white chalk. Around the curved surface of the chalk put an ink mark
            with blue or black ink.
          </p>
          <p>
            Now pour some water in a plate and keep the piece of chalk in the water (Fig. 13). Ensure that
            the water in the plate is very little and does not touch the ink mark.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[150px] mx-auto">
            <img
              src="/assets/images/C6-science/ch7_fig13.png"
              alt="Fig. 13 — Chalk chromatography setup"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 13
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Chilka lake in Orissa is the India&apos;s largest salt water lake.</TipBox>
      </div>
    </div>
  );
}
