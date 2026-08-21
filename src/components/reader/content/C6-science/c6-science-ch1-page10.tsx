import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";

function VennDiagram() {
  return (
    <svg viewBox="0 0 240 200" className="mx-auto mt-3 h-48 w-full max-w-[280px]" role="img" aria-label="Three overlapping circles labelled milk giving, egg giving and meat giving">
      <circle cx="95" cy="85" r="60" fill="none" stroke="#4f46e5" strokeWidth="1.8" />
      <circle cx="150" cy="85" r="60" fill="none" stroke="#4f46e5" strokeWidth="1.8" />
      <circle cx="122" cy="135" r="60" fill="none" stroke="#4f46e5" strokeWidth="1.8" />
      <text x="60" y="70" textAnchor="middle" className="fill-foreground/80 text-[10px] font-semibold">
        milk
      </text>
      <text x="60" y="82" textAnchor="middle" className="fill-foreground/80 text-[10px] font-semibold">
        giving
      </text>
      <text x="185" y="70" textAnchor="middle" className="fill-foreground/80 text-[10px] font-semibold">
        egg
      </text>
      <text x="185" y="82" textAnchor="middle" className="fill-foreground/80 text-[10px] font-semibold">
        giving
      </text>
      <text x="122" y="180" textAnchor="middle" className="fill-foreground/80 text-[10px] font-semibold">
        meat giving
      </text>
    </svg>
  );
}

const EXERCISES: ExerciseItem[] = [
  {
    text: "Shahina's mother always cooks plain rice! If the same rice is used to make kichidi, payasam or biryani how would you feel eating those?",
  },
  { text: "List out the names of some plants that grow in your village. Which parts of it are used as food?" },
  {
    text: "Make a list of animals and insects from which we get food.",
    subItems: [
      "Write the names of these animals on slips of paper. On the other side of the slip write the names of food we get from the animals - milk, eggs or meat.",
      "Sort the slips into groups. Write the names of the animals in the correct portions of the circles shown below.",
      "Are there any portions where none of the animals fit? Explain why?",
    ],
    extra: <VennDiagram />,
  },
  {
    text: "With the help of your teacher form groups of 5 or 6 students of your class. Make a fruit chat or vegetable salad and eat it. How do you feel? Write few lines about your experience.",
  },
  {
    text: "Ask your friend to think of the name of any food item. Now you have to guess its name. For this you can ask some questions. Your friend can only answer Yes or No. How many and what questions did you ask before you could guess the name?",
  },
  { text: "List out the ingredients needed to make vada. Are they same for dosa? Identify the differences in your list." },
  {
    text: "Latha has prepared the following statements for you. Find out the wrong ones among these, don't forget to give your reasons.",
    subItems: [
      "We can get food from plants and animals only.",
      "Spices, oil, salt and meat are the ingredients of a chicken curry.",
      "Plants are the source of honey.",
    ],
  },
  { text: "Find out from your parents the various methods of preserving food and write a note on them." },
  {
    text: "Collect information about the main food habits of different states of India. Refer to the Atlas, library books and discuss with your teacher.",
  },
  { text: "Suppose if fish / raw mango / lemons are given to you how would you preserve them?" },
  {
    text: "Some food material is given below. What are the different possible ways of cooking them? Find out and write them.",
    extra: <p className="mt-1 italic text-foreground/70">Meat — Groundnuts — Potatoes — Spinach</p>,
  },
];

export function C6ScienceCh1Page10() {
  const leftExercises = EXERCISES.slice(0, 4);
  const rightExercises = EXERCISES.slice(4);

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <ExerciseList title="" items={leftExercises} start={5} />
        </div>
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <ExerciseList title="" items={rightExercises} start={9} />
        </div>
      </div>
    </div>
  );
}
