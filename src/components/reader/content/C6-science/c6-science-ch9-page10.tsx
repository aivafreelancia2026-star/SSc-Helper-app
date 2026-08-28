import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

const EXERCISES: ExerciseItem[] = [
  { text: "What are the important parts of a plant?" },
  { text: "How can you say that one part of a plant is the stem and the other is root?" },
  { text: "Collect any plant from your surroundings. Draw its root structure. What can you say about its root system of those plants?" },
  { text: "John has no place in his house but he wants to plant vegetables like tomato in his house. Suggest him different ways to do so." },
  { text: "What will happen if a plant doesn&apos;t have any leaves?" },
  { text: "How does the stem help the plant?" },
  { text: "What type of venation is found in the leaves of plants with fibrous root system?" },
  { text: "If the leaves have reticulate venation what would be the type of root?" },
  { text: "Explain the various parts of a plant with the help of a diagram." },
  { text: "Explain the parts of a leaf with the help of a diagram." },
  { text: "How can you show that plants absorb water through their roots?" },
  { text: "Rajani said &ldquo;Plants also breathe in&rdquo;. How can you support this statement." },
  { text: "Collect the leaves of various plants, prepare a herbarium. Write a brief report on their shapes, size and venation." },
  { text: "Prepare a greeting card with dry leaves." },
  { text: "Observe a plant which has healthy green leaves and beautiful flowers. Write your feelings about the plant in your notebook." }
];

export function C6ScienceCh9Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Leaf base, petiole and lamina are the parts of a leaf.</li>
            <li>Reticulate and parallel venation are found in leaves.</li>
          </ul>

          <div className="flex items-center justify-between border-b border-emerald-100 pb-4 pt-2">
            <h2 className="font-heading text-base font-bold text-emerald-805">Improve your learning</h2>
            <div className="flex flex-col items-center border border-emerald-200 rounded p-1.5 bg-white shadow-xs">
              <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-emerald-600 mb-1">QR CODE</span>
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700 font-mono select-none">
                Y4H3R5
              </div>
            </div>
          </div>

          <ExerciseList title="" items={EXERCISES.slice(0, 6)} start={1} />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <ExerciseList title="" items={EXERCISES.slice(6)} start={7} />

          <CalloutBox title="Bonsai">
            <p className="text-xs text-foreground/80 leading-relaxed">
              Usually we grow rose and chrysanthemum plants in pots. Can we grow a big tree in a pot in
              a similar way? You may wonder how a big tree can be grown in a pot! There is a method
              that would make any tree fit in a pot. This method is known as Bonsai. The word Bonsai
              means dwarf tree. These are also known as Liliput Trees. Bonsai is Japanese art. They grow
              trees in wide pots for years. Time to time the roots and branches of the trees are trimmed.
              You too may try it out.
            </p>
          </CalloutBox>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>In plants like ginger, the stem is underground, while the leaves are aerial.</TipBox>
      </div>
    </div>
  );
}
