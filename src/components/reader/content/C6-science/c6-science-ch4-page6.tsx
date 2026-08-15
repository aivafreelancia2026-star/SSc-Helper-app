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
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <p>
        Also, different parts may be used to take in the same type of food, like, hens use their
        beaks to pick insects while frogs use their tongues for the same purpose.
      </p>
      <p>
        The same part in a similar group of animals may be used in ways that can be largely
        different. For example, beaks of different birds are used to eat different types of food.
      </p>

      <p>
        Let us take some specific examples to observe how animals eat their food. The type of food
        and the ways in which an animal collects it, form the food habit of the organism.
      </p>
      <p>Let us study the food habits of birds in detail. How do birds eat their food?</p>
      <p>Look at Fig-4 and choose the correct options from the statements 1, 2 and 3.</p>

      <IconGallery items={BIRD_BEAKS} caption="Fig. 4 — Beak shapes of different birds" />

      <TipBox>Animals like sponges have no motion. They are sedentary for the most of their life span.</TipBox>
    </div>
  );
}
