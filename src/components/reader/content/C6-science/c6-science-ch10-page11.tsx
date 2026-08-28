import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const EXERCISES: ExerciseItem[] = [
  { text: "Is the change of ice into water a temporary or permanent change? Explain." },
  { text: "How do you know that rusting of iron is a change?" },
  { text: "If a raw egg is boiled in water, what changes do you notice in it? If you are given two eggs, can you determine which one is boiled and which one is not? Explain." },
  { text: "Name five changes you notice in your surroundings. Classify them as natural or man-made changes." },
  { text: "Choose incorrect statements from the following and rewrite them correctly:\na) The coldness in air during winter is a permanent change.\nb) Boiled egg is a temporary change.\nc) There is a cause for every change.\nd) An electric bulb going on and off is a permanent change.\ne) There is a change in state when ice-cream melts." },
  { text: "Some changes are listed below, classify them as temporary and permanent.\na) Souring of curd\nb) Ripening of oranges\nc) The sawing of a piece of wood into two\nd) Cooked Rice.\ne) Heating of milk." },
  { text: "We use clay to make idols. Can we get back clay from the idol? What type of change is it? Explain." },
  { text: "Carpenter made a chair using wood, what type of change is it?" }
];

export function C6ScienceCh10Page11() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="rounded-[16px] border border-indigo-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-indigo-800">Keywords</p>
            <p className="mt-1 font-body text-xs text-foreground/80 leading-relaxed">
              Changes, change in state, duration of day, indicators of change, slow/fast change,
              temporary/permanent change, natural/man-made change.
            </p>
          </div>

          <div className="rounded-[16px] border border-indigo-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-indigo-800 mb-2">What we have learnt</p>
            <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
              <li>Many changes are taking place around us.</li>
              <li>Some changes take place naturally and some changes are initiated by human beings.</li>
              <li>There will be many indicators of changes to show that a change took place.</li>
              <li>There exists a cause for every change.</li>
              <li>We can classify changes around us in many ways; slow-fast, permanent-temporary, natural-man-made etc.</li>
              <li>Classification of changes is also made based on various indicators of change like the change in state, change in colour, change in size, change in taste etc.</li>
            </ul>
          </div>

          <div className="flex items-center justify-between border-b border-indigo-100 pb-4 pt-2">
            <h2 className="font-heading text-base font-bold text-indigo-805">Improve your learning</h2>
            <div className="flex flex-col items-center border border-indigo-200 rounded p-1.5 bg-white shadow-xs">
              <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-indigo-600 mb-1">QR CODE</span>
              <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700 font-mono select-none">
                B7M1N7
              </div>
            </div>
          </div>

          <ExerciseList title="" items={EXERCISES.slice(0, 1)} start={1} />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <ExerciseList title="" items={EXERCISES.slice(1)} start={2} />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>A common physical change occurs when matter changes from one phase to another.</TipBox>
      </div>
    </div>
  );
}
