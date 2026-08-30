import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const EXERCISES: ExerciseItem[] = [
  { text: "Collect news items about handloom workers and cotton farmers. Analyze one news item in your own way." },
  { text: "Write the questions you would ask a shopkeeper while purchasing a dress?" },
  { text: "How did you know whether artificial fibers give pungent smell while burning. Write the steps of your experiment." },
  { text: "There is a great effort of people behind the clothes we wear. Track the stages from seed to dress and write your feelings about the people working at different levels of the track." },
  { text: "Observe these logos. Collect related information about these logos." }
];

export function C6ScienceCh8Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4 pt-2">
          <ExerciseList title="" items={EXERCISES.slice(0, 3)} start={12} />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <ExerciseList title="" items={EXERCISES.slice(3, 4)} start={15} />

          <div className="pt-2">
            <p className="font-semibold text-indigo-805 text-sm mb-2">16. Observe these logos. Collect related information about these logos.</p>
            <div className="flex justify-center bg-white rounded-xl border border-indigo-100 p-3 max-w-[150px] mx-auto shadow-sm">
              <img
                src="/assets/images/C6-science/ch8_logos.png"
                alt="TSCO and Co-optex Handloom Logos"
                className="max-w-full h-auto"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-indigo-100/30 p-5 shadow-xs space-y-3 mt-4">
            <h3 className="font-heading text-sm font-bold text-indigo-900 border-b border-indigo-100 pb-1.5 uppercase tracking-wide">
              The Story of Jute
            </h3>
            <p className="text-xs text-foreground/80 leading-relaxed">
              In Andhra Pradesh State in the districts of Visakhapatnam, Vizianagaram and Srikakulam
              jute is widely grown. There is an interesting story about jute.
            </p>
            <p className="text-xs text-foreground/80 leading-relaxed">
              Long long ago a man was grazing his cattle in the forest near his village. Suddenly it
              started raining. It did not stop for days. Almost all the forest got submerged in floods.
              He saved himself by climbing on to a tree. After a couple of weeks he got down from the tree
              and walked through soaked plants in the mud. He observed that peels of plants stuck to his
              legs. He went home and removed those peelings from his body. One day his wife saw the dried
              peels and noticed that they were so strong and spun a thread. Since then everyone started
              growing the plant. Haven&apos;t you understood what the plant is?
            </p>

            <div className="flex justify-center pt-2">
              <img
                src="/assets/images/C6-science/ch8_jute_story.png"
                alt="Jute goods: gunny bag, mat, shopping bag, footwear"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>500 mts long thread can be obtained from a single &lsquo;cotton boll&rsquo;.</TipBox>
      </div>
    </div>
  );
}
