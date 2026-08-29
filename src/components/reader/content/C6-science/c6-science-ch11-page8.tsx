import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const EXERCISES: ExerciseItem[] = [
  { text: "How can you say water is necessary for us?" },
  { text: "Pavan wants to know the measuring units of water. What will you tell him?" },
  { text: "Why do people need protected drinking water scheme?" },
  { text: "List out the activities that we perform in our daily life that consume water." },
  { text: "In --------- season we face severe water scarcity. Give your reason." },
  { text: "The taste of sea water is -------\na) Salty\nb) Tasteless\nc) Bitter\nd) Sweet" },
  { text: "If we misuse water what will happen in future. Write your suggestions to prevent water wastage." },
  { text: "Prepare a map of your village showing different water sources." },
  { text: "Make a pamphlet on &ldquo;Don&apos;t waste water&rdquo;. Display it on wall magazine." },
  { text: "Collect information about water related games and make a scrap book." },
  { text: "Find out the relationship between water shortage and drought?" },
  { text: "Justify the statement &ldquo;droughts and floods are a result of actions made by man&rdquo;. What are your reasons." },
  { text: "Aravind never forget to switch off water pumping motor in time. Do you support him? Why?" },
  { text: "If people are suffering due to severe floods, what would you do to help them?" }
];

export function C6ScienceCh11Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Arvind decided that water is precious. Don&apos;t waste even a single drop of water. We must
            preserve water not only for us but also for future generations.
          </p>

          <div className="rounded-[16px] border border-indigo-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-indigo-800">Keywords</p>
            <p className="mt-1 font-body text-xs text-foreground/80 leading-relaxed">
              Water sources, drought, floods, migration.
            </p>
          </div>

          <div className="rounded-[16px] border border-indigo-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-indigo-800 mb-2">What we have learnt</p>
            <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
              <li>We need water for domestic use, agriculture, industries.</li>
              <li>We get water from sources like wells, ponds, lakes, rivers etc.</li>
              <li>Of the water available on the earth, only 1% is fresh water.</li>
              <li>We depend on rains for water.</li>
              <li>Long periods of less rainfall usually causes condition of droughts.</li>
              <li>Floods are natural disasters they cause property damage and loss of life.</li>
            </ul>
          </div>

          <div className="flex items-center justify-between border-b border-indigo-100 pb-4 pt-2">
            <h2 className="font-heading text-base font-bold text-indigo-805">Improve your learning</h2>
            <div className="flex flex-col items-center border border-indigo-200 rounded p-1.5 bg-white shadow-xs">
              <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-indigo-600 mb-1">QR CODE</span>
              <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700 font-mono select-none">
                A3AS16
              </div>
            </div>
          </div>

          <ExerciseList title="" items={EXERCISES.slice(0, 2)} start={1} />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <ExerciseList title="" items={EXERCISES.slice(2)} start={3} />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>It takes up to 5000 litres of water to produce 1kg of rice.</TipBox>
      </div>
    </div>
  );
}
