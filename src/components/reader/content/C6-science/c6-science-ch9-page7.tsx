import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh9Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>Compare the parts that you have seen under the microscope with Fig. 7.</p>
          <p>
            The bean shaped parts in the leaf are guard cells. The pore in between them is called
            stomatal pore or stomata. It acts like our nose. It is useful in the exchange of gases
            between the plant and atmosphere.
          </p>

          <CalloutBox title="Do you know?">
            <p className="text-xs text-foreground/80 leading-relaxed">
              In Warangal district, there is a traditional cottage industry where pictures of various
              traditional and mythological figures are drawn with bright colours on dried leaves. This
              artwork is famous throughout the world.
            </p>
          </CalloutBox>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">9.6. Transpiration</h2>
          <p className="font-semibold text-emerald-850">Activity-7:</p>
          <p className="italic text-foreground/75 text-xs">
            Do you know that excess water is removed in the form of vapour from the leaf surface? To
            understand this let us do the following activity. Do this activity on a sunny day.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch9_fig8.png"
              alt="Fig. 8 — Leaf transpiration experiment with polythene bags"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 8
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <p>
            Select a well watered healthy plant that has been growing in the sun. Enclose a leafy
            branch of the plant in a polythene bag and tie up its mouth (Fig. 8). Take another polythene
            bag of same size and tie up its mouth without keeping any plant. Keep both the polythene bags
            in the sun. After a few hours observe the inner surface of the bags. What do you see?
          </p>
          <p>Which bag has water droplets? Think how they are formed there?</p>
          <p>
            Plants release excess water in their body through stomata and some other parts as well. The
            water is released in the form of vapour and this process is called{" "}
            <strong>transpiration.</strong> These vapours condense and are seen as droplets in the
            polythene bag. Think, what will happen if transpiration does not take place in plants.
          </p>
          <p>
            Another important leaf function is the preparation of food for the plant by the process of{" "}
            <strong>photosynthesis.</strong> We will discuss more about this in the higher classes.
          </p>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">
            9.7. Stem provides support to the plant
          </h2>
          <p>
            Observe the stem portion of some plants that you collected for Activity 1. Record your
            observations in table-5.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Do all plants have stems?</li>
            <li>Are the stems of all plants similar?</li>
            <li>How is the stem of the plant that grows horizontally on the ground?</li>
          </ul>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Branches, leaves and flowers develop from the small outgrowths present on the stem.</TipBox>
      </div>
    </div>
  );
}
