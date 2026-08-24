import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh3Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="font-heading text-base font-bold text-primary">3.4. Rain</h2>
          <p>The clouds do not stay at a place. They move from one place to another in the direction of winds.</p>
          <p>
            As more clouds come together they become laden with water vapour. Winds bring the clouds
            from the sea to the land. The cold air in the upper layers of the atmosphere cool these
            clouds.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Have you observed the colour of a clouds before it rains?</li>
            <li>How do clouds give rain?</li>
          </ul>
          <p>
            We all know that without clouds, it will not be possible to get rains and that all clouds do
            not cause rains. Some changes take place in the clouds before they cause rain.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch3_fig11.png"
              alt="Fig. 11 — A girl walking under an umbrella in the rain"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 11
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What changes do you notice in the sky and in the atmosphere before it rains?</li>
            <li>What changes take place in clouds before raining?</li>
          </ul>

          <p>
            Cooling of clouds increases the size of their water drops and clouds become heavy and
            descend towards the earth. The colour of such clouds changes from white to grey giving us
            the feeling of dark clouds gathering. When the size of the water drops increases further it
            becomes difficult for the cloud to hold them and water drops begin to fall. This is called{" "}
            <strong>&quot;rain&quot;</strong>. (Fig 11)
          </p>
          <p>
            In our daily life, we observe that before raining, clouds descend towards the earth&apos;s
            surface and we experience a cool breeze before rainfall.
          </p>
          <p>
            In very cold conditions, the drops of water turn into crystals of ice and fall as snow.
            Sometimes big drops of water solidify into ice and fall as pieces of ice known as{" "}
            <strong>hailstones.</strong>
          </p>

          <h2 className="font-heading text-base font-bold text-primary pt-2">3.5. Monsoons</h2>
          <p>
            Generally, we get rains in some particular months during the year. In our state, rains
            occur normally from June to September. During this season the sky is filled with clouds
            and move along with the winds blowing from western direction (South West side). These
            winds are called &quot;South West monsoon&quot;. Similarly, we observe in the months of
            November
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>
          Sulphur dioxide and nitrogen dioxide released from industries and vehicles pollute clouds.
          This causes acid rains.
        </TipBox>
      </div>
    </div>
  );
}
