import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const EXERCISES_L: ExerciseItem[] = [
  { text: "How can you say that a tree is living even though it doesn't move?" },
  { text: "How would you use the microscope present in your school lab?" },
  { text: "Thread like structure developed in bread are _____________________." },
  { text: "Which of the following is not a response to stimulus:\na) Feeling cold by touching ice.\nb) Feeling the weight of carrying a bag of books.\nc) Scratching the skin at the place of ant bite.\nd) Closing eyes immediately after seeing bright light." },
  { text: "Collect sweet potato, bottle, salt, and water. Take a bottle full of water and add salt, then put the sweet potato inside the bottle. Observe for a few days. What happens? Note your observations." },
];

const EXERCISES_R: ExerciseItem[] = [
  { text: "Venkatesh argues with his friend Tanveer about \"seed is living\". Think. What questions does Tanveer ask?" },
  { text: "What will happen if there is no stomata in leaves? Write your predictions." },
  { text: "Write down the steps of the experiment that you did in the lab to observe micro-organisms in pond water." },
  { text: "How do you feel when you touch 'Touch me not' plant? Write your feelings." },
  { text: "Prepare Venn diagram to represent living and non living characteristics of dog and tree." },
  { text: "Do you think both living and non living things are necessary for our environment. Why?" },
  { text: "Collect information from your school library / internet about Sir J.C. Bose who invented response to stimulus in plants." },
];

export function C6ScienceCh16Page13() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ExerciseList title="" items={EXERCISES_L} start={5} />

          <div className="pt-2">
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[180px] mx-auto">
              <img
                src="/assets/images/C6-science/ch16_sweet_potato.png"
                alt="Exercise 9 — Sweet potato sprout test illustration"
                className="max-w-full h-auto rounded"
              />
              <p className="text-center font-body text-[10px] italic text-foreground/40 mt-1">
                Sweet Potato setup
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <ExerciseList title="" items={EXERCISES_R} start={10} />

          <div className="pt-2">
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[160px] mx-auto">
              <img
                src="/assets/images/C6-science/ch16_venn_diagram.png"
                alt="Exercise 14 — Venn diagram representing dog vs tree characteristics comparisons"
                className="max-w-full h-auto rounded"
              />
              <p className="text-center font-body text-[10px] italic text-foreground/40 mt-1">
                Venn Diagram
              </p>
            </div>
          </div>

          <div className="rounded-[16px] border border-emerald-250 bg-emerald-50/50 p-4 pt-2">
            <p className="italic text-emerald-950 font-body text-xs font-semibold leading-snug">
              &ldquo;The right foundation is to learn science in order to preserve the bio-diversity that benefits all living things on earth.&rdquo;
            </p>
            <p className="text-right text-[10px] text-emerald-800 font-bold mt-1">— Amartya Sen</p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Algae are of great use in sewage water treatment plants.</TipBox>
      </div>
    </div>
  );
}
