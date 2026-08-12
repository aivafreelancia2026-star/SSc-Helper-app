import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const EXERCISES: ExerciseItem[] = [
  {
    text: "Think and say, in which direction your house is facing? Use the compass and findout the exact direction of your house and compare it with your prediction. Similarly predict and find out the direction in the following cases.",
    subItems: [
      "In which direction you keep your head while sleeping at night?",
      "Which direction do you face while reading?",
      "Which direction do you face while eating?",
    ],
  },
  { text: "Prepare a toy using magnets and write the procedure of preparation briefly." },
  { text: "Think and say where the poles will be located in a ring magnet? Try to find out its poles using a bar magnet and check your prediction." },
  { text: "Magnetize a needle using a bar magnet. Make a compass with that needle by following the process explained in activity 10." },
  { text: "Sometimes people use magnets to keep the doors open and some times to close the doors firmly. Think and say how is it possible and how we should arrange the magnets in each case." },
  { text: "Does the Earth behave as a magnet? How do you prove it?" },
  { text: "If you have two similar bars, one a magnet and another a piece of iron. can you find out which one of these is a magnet? Explain the process." },
  { text: "Teacher said that Earth is a magnet. But Sreevidya has some doubts and she asked her teacher some questions. What may be the questions?" },
  {
    text: "(a) Surya was wonderstruck to know that Earth is a big magnet. How do you appreciate efforts of scientists to discover this?",
    subItems: ["Do you notice any such things in magnets to appreciate? Explain."],
  },
  {
    text: 'Kiran wants to prepare a toy using some magnets to make people understand the slogan "Reject bad food and accept only good food". Can you help him to prepare the toy? If yes, how?',
  },
];

export function C6ScienceCh2Page10() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <ExerciseList title="" items={EXERCISES} start={6} />

      <div className="rounded-[16px] border-2 border-primary/40 bg-primary/5 p-6 text-center italic text-foreground/80">
        <p>
          Every living creature is better alive than dead. Even a grasshopper, a mongoose or a
          mango tree have right to life. We shall understand this. This is our responsibility.
        </p>
        <p className="mt-2 font-semibold not-italic">— Saleem Ali</p>
      </div>

      <TipBox>
        It is believed that the earth&apos;s magnet power comes from a current in the liquid center
        of the Earth causing it to become a gigantic electromagnet!
      </TipBox>
    </div>
  );
}
