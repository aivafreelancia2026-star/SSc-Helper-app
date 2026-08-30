import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const EXERCISES_L: ExerciseItem[] = [
  { text: "What would happen, if there were no bones in your body?" },
  { text: "Try to identify the joints in the body of a goat or a cow. Make a list of the joints present in them." },
  { text: "What difficulties would you face if your fingers had only a single bone?" },
  { text: "What is a ball and socket joint? How is it different from hinge joint?" },
  { text: "Fill in the blanks and give reasons:\ni) Joints of the bone help in the ______________.\nii) The contraction of the ______ pulls the bones during movement.\niii) The bones at the wrist are joined by a ______________ joint." },
];

const EXERCISES_R: ExerciseItem[] = [
  { text: "Guess who I am:\ni) I am a joint that works like joint of doors and window.\nii) I help to join two bones.\niii) Joint between upper jaw and skull.\niv) I am a chain of small-small bones.\nv) I join bone and muscle." },
  { text: "Collect X-Ray films and observe. Identify which body parts they represent. Write a note on them." },
  { text: "Prepare a questionnaire to take an interview of a yoga teacher or PET sir about asanas and exercises." },
  { text: "Crawling snake, jumping frog, flying bird - are they amazing to you? Why you think so?" },
  { text: "List out the activities that you performed at your home before coming to school. Prepare a list of joints which are involved in each activity." },
  { text: "\"Which joints involved in plucking flowers, making garlands\", Ravi's mother asked. Write down what he would have answered." },
];

export function C6ScienceCh14Page14() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="rounded-[16px] border border-emerald-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-emerald-800 mb-2">What we have learnt (contd.)</p>
            <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
              <li>Bones and muscles help us perform different movements and activities.</li>
              <li>Muscles work in pairs.</li>
              <li>Tendons join muscles to bones.</li>
              <li>Ligaments are thread-like structures which join one bone to another bone.</li>
              <li>Our spine works like a spring.</li>
              <li>The joint between upper jaw and skull is fixed joint.</li>
            </ul>
          </div>

          <div className="flex items-center justify-between border-b border-emerald-100 pb-4 pt-2">
            <h2 className="font-heading text-base font-bold text-emerald-805">Improve your learning</h2>
            <div className="flex flex-col items-center border border-emerald-200 rounded p-1.5 bg-white shadow-xs">
              <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-emerald-600 mb-1">QR CODE</span>
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700 font-mono select-none">
                C1M7J9
              </div>
            </div>
          </div>

          <ExerciseList title="" items={EXERCISES_L} start={1} />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <ExerciseList title="" items={EXERCISES_R} start={6} />

          <div className="pt-2">
            <h3 className="font-heading text-xs font-bold text-emerald-900 mb-2">
              12. What is this instrument? How you use this?
            </h3>
            <div className="flex gap-4 items-center bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 max-w-[200px] mx-auto">
              <img
                src="/assets/images/C6-science/ch14_dumbbell.png"
                alt="Exercise dumbbell tool"
                className="max-w-[45px] h-auto rounded"
              />
              <div className="text-[10px] text-emerald-950 font-semibold leading-tight">
                Fitness dumbbell weight
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>That the humans and giraffes have the same number of bones in their necks i.e. 7.</TipBox>
      </div>
    </div>
  );
}
