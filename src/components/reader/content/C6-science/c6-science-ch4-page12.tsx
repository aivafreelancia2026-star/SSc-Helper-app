import { FigureNote } from "@/components/reader/figure-note";
import { SummaryBox } from "@/components/reader/summary-box";
import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const SUMMARY_POINTS = [
  "Different types of animals that live in our surroundings have different food habits (way of taking in food and type of food).",
  "Sucking, licking, picking, chewing, swallowing are all the ways by which animals take in their food.",
  "Beaks of birds differ from one another depending upon the type of food they eat.",
  "Most wild animals that eat other animals have sharp teeth, strong legs and sharp claws.",
  "Animals are divided into three types on the basis of their food. They are carnivores, herbivores, omnivores.",
  "Food chain is the connection between animals on the basis of their food habits.",
  "Food chain explains the interdependence of diverse organisms in nature.",
];

const EXERCISES: ExerciseItem[] = [
  { text: "Name some animals in your house which have the same kind of food habit." },
  {
    text: "Observe your surroundings or go to a nearby field and write about the following:",
    subItems: [
      "How does the cow eat grass?",
      "What parts are used while doing so?",
      "In what way can you justify it as a herbivore?",
    ],
  },
  { text: "Compare the legs and nails of a dog and hen and say why they are different." },
  {
    text: "Go to a nearby pond where cranes are usually seen. Observe and write about the process of catching fish. (Take care of yourself when you are near the water take the help of elders.)",
  },
];

export function C6ScienceCh4Page12() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch4_fig_leafcutter.png"
              alt="Leafcutter ants carrying pieces of leaf back to their colony"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Leafcutter ants carrying pieces of leaf
            </p>
          </div>

          <p className="pt-2">Like us ants are good farmers as well they cut leaves into pieces and create a bed to grow a type of fungus which they eat!</p>
          <p>Think! What can we learn from ants? Write your opinion in your notebook.</p>

          <div className="rounded-[16px] border border-border/50 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-emerald-800">Keywords</p>
            <p className="mt-1 font-body text-xs text-foreground/80 leading-relaxed">
              Food habit, food chain, sucking, picking, chewing, habitat, herbivore, carnivore,
              omnivore, rumination, nocturnal.
            </p>
          </div>

          <SummaryBox title="What we have learnt" points={SUMMARY_POINTS.slice(0, 3)} />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <SummaryBox title="What we have learnt (continued)" points={SUMMARY_POINTS.slice(3)} />

          <div className="flex items-center justify-between border-b border-sky-100 pb-4 pt-2">
            <h2 className="font-heading text-base font-bold text-emerald-800">Improve your learning</h2>
            <div className="flex flex-col items-center border border-emerald-200 rounded p-1.5 bg-white shadow-xs">
              <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-emerald-600 mb-1">QR CODE</span>
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700 font-mono select-none">
                H8T6J9
              </div>
            </div>
          </div>

          <ExerciseList items={EXERCISES} />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>The leopard is a member of the cat family. The life span of leopard is between 12 to 17 years.</TipBox>
      </div>
    </div>
  );
}
