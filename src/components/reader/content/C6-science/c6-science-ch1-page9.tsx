import { CalloutBox } from "@/components/reader/callout-box";
import { FigureNote } from "@/components/reader/figure-note";
import { SummaryBox } from "@/components/reader/summary-box";
import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const SUMMARY_POINTS = [
  "We get food from plants and animals.",
  "For cooking food, we need different types of ingredients.",
  "We use different parts of plants like stems, roots, leaves, fruits and flowers as food.",
  "The taste of food is based on its ingredients, method of preparation and cultural practices of the region.",
  "Boiling, steaming, fermentation are some methods of preparing food.",
  "We use preservatives to preserve food for some time.",
];

const EXERCISES: ExerciseItem[] = [
  { text: "What are the common food items you eat?" },
  {
    text: "Find out the ingredients of the given food items:",
    extra: (
      <p className="mt-1 italic text-foreground/70">Pachipulusu, coconut chutney, jilebi, onion pakodi</p>
    ),
  },
  { text: "Write down the process of making upma or any other snack of your choice." },
  {
    text: "Collect any wrapper of packaged food. Read the information details and answer the following questions.",
    subItems: [
      "Name of the food item",
      "Price of the food item",
      "When was it manufactured?",
      "How long can we use it?",
      "What ingredients does it contain?",
    ],
  },
];

export function C6ScienceCh1Page9() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <p>
        For preserving food we use different types of preservatives. But some food items which are
        available in the market have harmful preservatives. So we must be aware of the ingredients
        of packaged food.
      </p>
      <p>
        Joseph&apos;s father always observes the ingredients used and the date of manufacturing when
        he buys the readymade food items. Expired food items should not be consumed. They are
        harmful to our health.
      </p>

      <CalloutBox title="Do you know?">
        Preparation of food using vegetables and fruits is an art. Some people make different types
        of designs and decorations with vegetables. This is called vegetable carving. Try to make
        your own carving with the vegetables available to you.
      </CalloutBox>

      <FigureNote emoji="🍉" caption="Fig. 5 — Vegetable and fruit carving" />

      <div className="rounded-[16px] border border-border/50 bg-white/70 p-4">
        <p className="font-heading text-sm font-bold text-primary">Keywords</p>
        <p className="mt-1 font-body text-sm text-foreground/80">
          Ingredients, preservatives, fragrant materials, dry fruits
        </p>
      </div>

      <SummaryBox points={SUMMARY_POINTS} />

      <ExerciseList items={EXERCISES} />

      <TipBox>
        Tomatoes are rich in Carotenoid and Lycopene; eating foods containing Carotenoids can lower
        the risk of cancer.
      </TipBox>
    </div>
  );
}
