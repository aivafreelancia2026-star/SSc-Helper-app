import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh7Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            are very fine and pass through the holes of a sieve, but the husk particles being large
            are left on the sieve.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[150px] mx-auto">
            <img
              src="/assets/images/C6-science/ch7_fig7.png"
              alt="Fig. 7 — Sieving flour particles"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 7
            </p>
          </div>

          <p>
            We use sieves to separate tea leaves (tea powder) from tea and sand from gravel. What are
            the differences between the sieves used in the two instances?
          </p>

          <CalloutBox title="Do you know?">
            <p className="text-xs text-foreground/80 leading-relaxed">
              Farmers separate grains which are bigger in size from the smaller ones by sieving. The
              bigger grains are then used as seeds or sold at higher price.
            </p>
          </CalloutBox>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 pt-2">
            <li>Can you separate mud from muddy water using a sieve? How small should the pores of the sieve be to do this? Use a cloth as a sieve and try to do this.</li>
            <li>Is the water clear after sieving?</li>
            <li>Gowthami filtered mud water with a filter paper. Can you do it? (See Fig. 8)</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>After using the filter paper to filter water what do you find? What do you see left behind on the paper? What is obtained in the beaker?</li>
          </ul>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch7_fig8.png"
              alt="Fig. 8 — Filtration setup with filter paper"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 8
            </p>
          </div>

          <div className="rounded-[16px] border border-indigo-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-indigo-800">Filter paper</p>
            <p className="mt-1 font-body text-xs text-foreground/80 leading-relaxed">
              Filter paper is a sieve made of paper which has very fine holes. We can filter very small
              particles using this type of sieve.
            </p>
          </div>

          <h3 className="font-heading text-sm font-bold text-indigo-800 pt-2">
            Activity-3: Why can&apos;t we filter salt from salt water
          </h3>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>
              Take water in a beaker. Dissolve some salt in it. Filter this mixture with a filter paper.
              Were you able to separate the salt from the salt water?
            </li>
            <li>Why could you not filter the salt from salt water?</li>
          </ul>
          <p>
            The pores in a filter paper are so minute that we cannot see them with naked eyes.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Handpicking is an excellent method of controlling pests especially when only a few plants are infested.</TipBox>
      </div>
    </div>
  );
}
