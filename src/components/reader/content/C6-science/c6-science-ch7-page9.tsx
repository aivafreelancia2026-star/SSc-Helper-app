import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const SUMMARY_POINTS = [
  "Substances can be separated from a mixture.",
  "Hand picking is used to separate substances when their sizes are sufficiently large.",
  "If mixtures have light and heavy substances, winnowing can be used for separation.",
  "An insoluble substance in a liquid can be separated by sedimentation and filtration.",
  "Sieving can be used for separating larger and smaller substances in a mixture.",
  "Crystallization is used for separation of dissolved substances from a liquid.",
  "Distillation is used to remove impurities from water.",
  "More than one method of separation can be used to separate the components of some mixtures.",
];

const EXERCISES: ExerciseItem[] = [
  { text: "Is it possible to separate sugar mixed with wheat flour? If yes, how will you do it? If powdered sugar is mixed with wheat flour, how do you separate them?" },
  { text: "Is hand picking necessary after winnowing? Why?" },
  { text: "Srikar accidentally mixed mustard seeds with rice and salt. How can he separate them?" },
  {
    text: "In the below situations, what methods may be used to seperate components from mixture?",
    subItems: [
      "Heavier than the other?",
      "Bigger than the other?",
      "Different shape and color from the other?",
      "One is soluble in water and the other is not?",
      "One floats and the other sinks in water?"
    ]
  },
  { text: "Visit a nearby dairy and report about the processes used to separate butter from milk." },
  {
    text: "Divya suggested some methods to separate mixtures given below. Are they correct? Find whether they are possible or not. Give reasons.",
    subItems: [
      "Pure water can be obtained from sea water by the process of filtration.",
      "Cheese is removed from curdled milk by the process of decantation.",
      "Separation of sugar from tea can be done by filtration."
    ]
  },
  { text: "Collect information regarding methods used to clean food grains at home and prepare a chart." },
  { text: "We observe that kerosene rises up in the wick of a lantern. Take a wick and put a spot of ink at one of its ends. Then dip the wick in kerosene just as you had dipped the chalk in water in the chromatography activity. Observe the change in ink mark. Note down your observations." }
];

export function C6ScienceCh7Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="rounded-[16px] border border-indigo-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-indigo-800 mb-2">What we have learnt</p>
            <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
              {SUMMARY_POINTS.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between border-b border-indigo-100 pb-4 pt-4">
            <h2 className="font-heading text-base font-bold text-indigo-800">Improve your learning</h2>
            <div className="flex flex-col items-center border border-indigo-200 rounded p-1.5 bg-white shadow-xs">
              <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-indigo-600 mb-1">QR CODE</span>
              <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700 font-mono select-none">
                M9G2C3
              </div>
            </div>
          </div>

          <ExerciseList title="" items={EXERCISES.slice(0, 3)} start={1} />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <ExerciseList title="" items={EXERCISES.slice(3)} start={4} />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Solid form of Carbon dioxide is called Dry Ice.</TipBox>
      </div>
    </div>
  );
}
