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
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <FigureNote emoji="🐜" caption="Leafcutter ants carrying pieces of leaf back to their colony" />

      <p>Like us ants are good farmers as well they cut leaves into pieces and create a bed to grow a type of fungus which they eat!</p>
      <p>Think! What can we learn from ants? Write your opinion in your notebook.</p>

      <div className="rounded-[16px] border border-border/50 bg-white/70 p-4">
        <p className="font-heading text-sm font-bold text-primary">Keywords</p>
        <p className="mt-1 font-body text-sm text-foreground/80">
          Food habit, food chain, sucking, picking, chewing, habitat, herbivore, carnivore,
          omnivore, rumination, nocturnal.
        </p>
      </div>

      <SummaryBox points={SUMMARY_POINTS} />

      <ExerciseList items={EXERCISES} />

      <TipBox>The leopard is a member of the cat family. The life span of leopard is between 12 to 17 years.</TipBox>
    </div>
  );
}
