import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { FigureNote } from "@/components/reader/figure-note";
import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const BODYPART_ROWS: TableCell[][] = [
  [{ value: "Beak" }, { value: "Hens, ", editable: true }],
  [{ value: "Tongue" }, { value: "", editable: true }],
  [{ value: "Teeth" }, { value: "", editable: true }],
  [{ value: "Sucker" }, { value: "", editable: true }],
  [{ value: "Legs with strong claws" }, { value: "", editable: true }],
];

const EXERCISES: ExerciseItem[] = [
  { text: "Name some animals which use tongue as a tool for taking in food." },
  { text: "Which body part of the butterfly used to suck honey from flowers." },
  {
    text: "Do the following and record your observations:",
    extra: (
      <p className="mt-1 text-foreground/80">
        Collect one or two earthworms and put them in a bottle containing wet soil. Close it with
        a lid which has holes. Observe how earthworms get their food.
      </p>
    ),
  },
  { text: "Which animals in the forest depend only on plants or only on animals for food?" },
  {
    text: "Fill up the following table",
    extra: (
      <FillInTable
        title=""
        columns={["Bodypart used to collect food", "Examples"]}
        rows={BODYPART_ROWS}
        storageKey="c6-science-ch4-bodypart-table"
      />
    ),
  },
  { text: "Why do most carnivores live in forests? Give reasons." },
  { text: "Make your own food chain and display it in your class room." },
  { text: "Collect the pictures of different animals and prepare a scrapbook by separating them into herbivores, carnivores, omnivores." },
  {
    text: "Identify which of the following statements are wrong and give reasons.",
    subItems: [
      "The animals that live in water cannot eat other animals.",
      "Elephants and deer are herbivores living in the forest.",
      "Birds' beaks are designed to suit their food habits.",
      "Sharp claws are useful for hunting.",
      "Most of the food chains end with herbivorous animals.",
    ],
  },
  { text: "If you want to understand more about food chain what questions would you like to ask?" },
  {
    text: "Write a play with dialogues between a parrot and a lion about their food habits and organs they use to get food. Act it with your friends. Send it to school/district childrens magzine.",
  },
  {
    text: "Identify the given animal :",
    subItems: ["What does it eat?", "Which part of the body helps it in eating?"],
    extra: <FigureNote emoji="🐜" caption="An anteater" />,
  },
];

export function C6ScienceCh4Page13() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ExerciseList title="" items={EXERCISES.slice(0, 8)} start={5} />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <ExerciseList
            title=""
            items={[
              ...EXERCISES.slice(8, 11),
              {
                text: "Identify the given animal :",
                subItems: ["What does it eat?", "Which part of the body helps it in eating?"],
                extra: (
                  <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm mt-3">
                    <img
                      src="/assets/images/C6-science/ch4_fig_anteater.png"
                      alt="An anteater"
                      className="max-w-full h-auto rounded-lg shadow-sm"
                    />
                    <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
                      An anteater
                    </p>
                  </div>
                )
              }
            ]}
            start={13}
          />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Birds are vertebrate animals. The reason is they have a backbone.</TipBox>
      </div>
    </div>
  );
}
