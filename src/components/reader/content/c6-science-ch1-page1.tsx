import { IconGallery } from "@/components/reader/icon-gallery";
import { TipBox } from "@/components/reader/tip-box";

const FOOD_ITEMS = [
  { emoji: "🫓", label: "Chapati" },
  { emoji: "🍥", label: "Idly" },
  { emoji: "🥟", label: "Samosa" },
  { emoji: "🍛", label: "Rice & Dal" },
  { emoji: "🥘", label: "Idly with chutney" },
  { emoji: "🌯", label: "Paratha with curry" },
  { emoji: "🍡", label: "Laddu" },
  { emoji: "🍮", label: "Kheer" },
  { emoji: "🍨", label: "Ice cream sundae" },
];

export function C6ScienceCh1Page1() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <p>
        If any one asks you about your favourite food item, what will you answer? The list may
        include several things like laddu, biryani, idly-sambar, pulihora, cheese, butter,
        biscuits, dal, brinjal curry and so on.
      </p>
      <p>
        But if you are asked about the food ingredients needed and how they have been cooked,
        then, it may be difficult for you to answer.
      </p>
      <p>
        Generally we take interest in eating variety of food and don&apos;t bother about other
        things, like what ingredients are needed to prepare brinjal curry or biryani and how idly
        can be made soft?
      </p>

      <h2 className="font-heading text-base font-bold text-primary">1.1. Our Food</h2>
      <p>
        We take food for energy and health. Not only eating food but also knowing the information
        about the ingredients needed for preparing food and their sources is also important. In
        this chapter, we will discuss about the ingredients needed, cooking methods and food
        sources.
      </p>
      <p className="font-semibold">Observe the following food items and name them.</p>

      <IconGallery items={FOOD_ITEMS} caption="Fig 1 : Variety of food" />

      <TipBox>Banana contains potassium which is useful for us.</TipBox>
    </div>
  );
}
