import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh9Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Add red ink in one of the tumblers. Do not add red ink to the second tumbler. Place the
            plants in each of the tumbler (Fig. 3). Let them be for 2-3 hours and then record your
            observations.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Why do you think we added red ink in only one tumbler?</li>
            <li>Did you see any red spots on the stem or other parts of the plant?</li>
            <li>Why did red spots appear on the stem or flowers?</li>
          </ul>

          <p>
            Roots absorb water from the soil by absorption. Minerals present in the soil are also
            absorbed along with the water.
          </p>

          <CalloutBox title="Do you know?">
            <p className="text-xs text-foreground/80 leading-relaxed">
              Some plants store food. Some store in roots and some in their stem. Radish, carrot, beetroot
              store food in their roots. Therefore, these roots bulge out and are called tuberous roots. Can
              you give some more examples of tubers. Carrot, sweet potato can also be eaten raw!
            </p>
            <div className="flex justify-center pt-2">
              <img
                src="/assets/images/C6-science/ch9_fig4.png"
                alt="Fig. 4 — Carrot, beetroot and radish tuberous roots"
                className="max-w-[120px] h-auto rounded-lg shadow-sm"
              />
            </div>
          </CalloutBox>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-emerald-800">
            9.4. Parts of a leaf
          </h2>
          <p>
            Leaves are another important part of plants. Most plants that we see in our surroundings
            have different types of leaves.
          </p>
          <p>
            Observe the given picture of a leaf and its parts (Fig. 5).
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch9_fig5.png"
              alt="Fig. 5 — Leaf diagram parts: Midrib, Lamina, Veins, Petiole, Leaf base"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 5
            </p>
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 pt-2">
            <li>Where is the leaf attached to the stem?</li>
            <li>What is the flat portion of the leaf called?</li>
            <li>What do you call the small line like structure in the flat portion of the leaf?</li>
            <li>Which part connects leaf lamina with stem?</li>
          </ul>

          <p className="pt-2">
            A leaf contains important parts such as leaf base, petiole and lamina.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Ovary, stigma, style, anther are the sexual parts of a flower.</TipBox>
      </div>
    </div>
  );
}
