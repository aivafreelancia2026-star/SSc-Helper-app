import { IconGallery } from "@/components/reader/icon-gallery";
import { TipBox } from "@/components/reader/tip-box";

const BIRD_BEAKS = [
  { emoji: "🦅", label: "Eagle" },
  { emoji: "🐦", label: "Sparrow" },
  { emoji: "🦆", label: "Duck" },
  { emoji: "🐓", label: "Cock" },
  { emoji: "🐦", label: "Wood pecker" },
  { emoji: "🕊️", label: "Pigeon" },
  { emoji: "🐦‍⬛", label: "Crow" },
];

export function C6ScienceCh4Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Also, different parts may be used to take in the same type of food, like, hens use their
            beaks to pick insects while frogs use their tongues for the same purpose.
          </p>
          <p>
            The same part in a similar group of animals may be used in ways that can be largely
            different. For example, beaks of different birds are used to eat different types of food.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <p>
            Let us take some specific examples to observe how animals eat their food. The type of food
            and the ways in which an animal collects it, form the food habit of the organism.
          </p>
          <p>Let us study the food habits of birds in detail. How do birds eat their food?</p>
          <p className="text-emerald-800 font-semibold">Look at Fig-4 and choose the correct options from the statements 1, 2 and 3.</p>
        </div>

      </div>

      {/* Fig 4 Spanning Full Width */}
      <div className="pt-4 border-t border-emerald-100 flex flex-col items-center justify-center bg-white rounded-2xl p-4 shadow-sm">
        <img
          src="/assets/images/C6-science/ch4_fig4.png"
          alt="Fig. 4 — Beak shapes of different birds"
          className="max-w-full h-auto rounded-lg shadow-sm"
        />
        <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
          Fig. 4 — Beak shapes of different birds
        </p>
      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-2">
        <TipBox>Animals like sponges have no motion. They are sedentary for the most of their life span.</TipBox>
      </div>
    </div>
  );
}
