import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh8Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            The process of making yarn from fibers is called <strong>spinning.</strong>
          </p>

          <CalloutBox title="Do you know?">
            <p className="text-xs text-foreground/80 leading-relaxed">
              During the freedom struggle, Mahatma Gandhi encouraged people to wear clothes made of
              homespun (khadi) yarn. People burnt imported clothes during Swadeshi movement.
            </p>
          </CalloutBox>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">8.6. Jute yarn</h2>
          <p>
            Have you seen gunny bags? Where did you see them? Paddy, chilli, ground nut, red gram etc.
            other commercial crops are packed in gunny bags. They are usually used to store and transport
            the materials. All bags of these types are made up of coarse jute fabric. These bags are
            suitable for carrying heavy material.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[120px] mx-auto">
            <img
              src="/assets/images/C6-science/ch8_fig7.png"
              alt="Fig. 7 — Jute plant"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 7
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <p>
            Do you know how jute yarn is made? Is this process same as that for cotton or is there
            any difference?
          </p>
          <p>
            Like cotton, jute yarn is also useful in making fabric. It is also called golden fibre. Jute
            fabric is not the same as cotton fabric. It is harder, stronger and more rough. It is not
            used in making clothes.
          </p>

          <CalloutBox title="Do you know?">
            <p className="text-xs text-foreground/80 leading-relaxed">
              We all use polythene bags for different purposes. Polythene is very difficult to decompose.
              To protect our environment, we should make a habit to use cloth bags instead of
              polythene bags.
            </p>
          </CalloutBox>

          <h3 className="font-heading text-sm font-bold text-indigo-800 pt-2">8.6.1. Making of Jute Yarn</h3>
          <p>
            Jute fibre is obtained from stem of jute plant. The stem of the harvested plant is cut and
            immersed in water for some days. When the stem is soaked in water the bark becomes rotten and
            it will be easy to peel. Then the fibres are separated from the stem to make jute yarn. This
            is thoroughly combed and cleaned. Gunny bags are made using this cleaned jute.
          </p>

          <h3 className="font-heading text-sm font-bold text-indigo-850 pt-2">
            Activity-6: How is jute yarn?
          </h3>
          <p>
            Collect a gunny bag. Pull out a thread from the bag and observe under magnifying lens. You
            will see thin strands of yarn. Observe how the fibre looks like? Compare these fibers with
            cotton fibers.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>In 1970, Toray Industries scientist Dr. Miyoshi Okamoto invented the world&apos;s first microfiber.</TipBox>
      </div>
    </div>
  );
}
