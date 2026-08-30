import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const EXERCISES: ExerciseItem[] = [
  { text: "List out common characteristics of living things." },
  { text: "Why do cockroaches come out of their places when lights are switched off?" },
  { text: "Which characteristics are same in both living and non-living things?" },
  { text: "Which of the following are derived from living things: sugar, coconut oil, pen, rice, fan, omelet, bus, wooden chair, garland, mango, clothes, fruit juice." },
];

export function C6ScienceCh16Page12() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">
            Is there any water without micro-organisms? Which water contains larger number of micro-organisms?
            Draw what you have observed. Describe the shapes of the micro-organisms.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Which water contains larger number of micro-organisms? Why?</li>
            <li>What difference do you find in the appearance of micro-organisms in pond water and bore well water?</li>
          </ul>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch16_fig11.png"
              alt="Fig. 11 — Microscopic views of pond water organisms (Amoeba and Paramecium)"
              className="max-w-full h-auto rounded"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 11
            </p>
          </div>

          <p className="text-xs pt-2">
            Thus we see that micro-organisms are present everywhere, although they are not visible to naked
            eyes. From our activities, we could see only a few of them. But there is a vast world of
            micro-organisms and they are all part of the living world.
          </p>

          <div className="rounded-[16px] border border-emerald-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-emerald-850">Keywords</p>
            <p className="mt-1 font-body text-xs text-foreground/80 leading-relaxed">
              Living things, non-living things, growth, breathing, excretion, response, stimulus, movement, micro-organisms, microscope.
            </p>
          </div>

          <div className="rounded-[16px] border border-emerald-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-emerald-800 mb-2">What we have learnt</p>
            <ul className="list-disc space-y-1.5 pl-5 text-emerald-805 text-xs">
              <li>There are living and non-living things around us.</li>
              <li>When living things lose their life they become dead.</li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <div className="rounded-[16px] border border-emerald-100 bg-white/70 p-4">
            <ul className="list-disc space-y-1.5 pl-5 text-emerald-805 text-xs">
              <li>Dead is an intermediate stage between living and non-living things.</li>
              <li>Dead material decomposes to form non-living things.</li>
              <li>Living things possess characteristics like growth, breathing, excretion, movement, response to stimulus and giving birth to young ones.</li>
              <li>Among living things, plants and trees can&apos;t move like animals.</li>
              <li>Seed is also a living thing but it doesn&apos;t have all characteristics of the living world.</li>
              <li>We can see minute things under a microscope.</li>
            </ul>
          </div>

          <div className="flex items-center justify-between border-b border-emerald-100 pb-4 pt-2">
            <h2 className="font-heading text-base font-bold text-emerald-805">Improve your learning</h2>
            <div className="flex flex-col items-center border border-emerald-200 rounded p-1.5 bg-white shadow-xs">
              <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-emerald-600 mb-1">QR CODE</span>
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700 font-mono select-none">
                R9X6R8
              </div>
            </div>
          </div>

          <ExerciseList title="" items={EXERCISES} start={1} />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Mushrooms we use as food are also fungi.</TipBox>
      </div>
    </div>
  );
}
