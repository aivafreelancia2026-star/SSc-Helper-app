import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh8Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="font-heading text-base font-bold text-indigo-800">8.2. How are fabrics made?</h2>
          <p>
            When you look at any fabric, it appears to be a single, continuous piece. Now look at it
            closely; what do you notice?
          </p>

          <h3 className="font-heading text-sm font-bold text-indigo-805">
            Activity-2: Threads in the fabric
          </h3>
          <p className="italic text-foreground/75 text-xs">
            Take a piece of fabric. With the help of a magnifying lens, observe how the threads are. Pull
            out threads one by one from the ends of the fabric. Observe these threads. What did you observe?
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[120px] mx-auto">
            <img
              src="/assets/images/C6-science/ch8_fig3.png"
              alt="Fig. 3 — Pulling a thread out of a piece of fabric"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 3
            </p>
          </div>

          <p>
            Take one thread. Press its end with the fingers. Observe it through a magnifying lens.
            Were you able to see the fine structure at the end of the thread?
          </p>
          <p>
            Take a needle and try to insert this thread into the eye of the needle. Can you? Isn&apos;t it
            difficult? Have you ever seen what people do to overcome this problem? Generally when we
            are not able to put thread into the eye of the needle, either we twist the end of the thread
            or we wet the end using saliva.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-indigo-800">8.3. Types of fibres</h2>
          <p>
            We know that there are different kinds of fabrics like cotton, wool, silk, polyester etc.
            These are made of different fibres. The fibres of some fabrics such as cotton, jute are
            obtained from plants. Silk and wool are obtained from animals. The fibres that are derived
            from plants and animals are natural fibres.
          </p>
          <p>
            Nowadays, clothes are also made up of chemically developed yarn like polyester, terylene,
            nylon, acrylic etc. These are all called artificial fibres.
          </p>

          <CalloutBox title="Do you know?">
            <p className="text-xs text-foreground/80 leading-relaxed">
              Human beings in ancient times used leaves and skins of animals as clothes. In those
              days, clothes were also made from metal. Warriors used to wear metal jackets during wars.
              You can see such clothes in historical museums or in television shows.
            </p>
          </CalloutBox>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Most of the woollen clothes used world wide are made from sheep&apos;s wool.</TipBox>
      </div>
    </div>
  );
}
