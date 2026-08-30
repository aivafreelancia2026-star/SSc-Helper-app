import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE4_ROWS: TableCell[][] = Array.from({ length: 4 }, (_, i) => [
  { value: `${i + 1}` },
  { value: "", editable: true },
  { value: "", editable: true },
  { value: "", editable: true },
]);

const EXERCISES_L: ExerciseItem[] = [
  { text: "A carpenter who makes wooden furniture, needs accuracy in measurments. Do you ever notice how he measures? How would you appreciate him?" },
  { text: "Make a visit to panchayat office collect information how VRO measure areas of agricultural lands in your village. Prepare a questionnaire for this." },
];

const EXERCISES_R: ExerciseItem[] = [
  { text: "Collect any invitation card with envelope. Find out the difference between the measurments of card and cover. Write down the process that you follow." },
  { text: "The distance between numbers in a clock is accurately same. List out the things that you observe in your surroundings with accurate distance between them." },
  { text: "Try to imagine the area of CD, sim card, mobile phone then find out the area of the above by using graph paper. Compare the values of your guess with graph paper measurment. Which area is closely related to your guess?" }
];

export function C6ScienceCh13Page15() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <FillInTable
            title="Table 4"
            columns={["S. No.", "Name of the student", "Volume of Kalakanda", "Volume of Patika"]}
            rows={TABLE4_ROWS}
            storageKey="c6-science-ch13-table4"
          />

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium pt-2">
            <li>Are all the values of volumes of Kalakanda equal?</li>
            <li>Are all the values of volumes of Patika equal?</li>
            <li>If not, state the possible reasons.</li>
          </ul>

          <ExerciseList title="" items={EXERCISES_L} start={12} />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <ExerciseList title="" items={EXERCISES_R} start={14} />

          {/* Swaminathan Quote Box */}
          <div className="relative overflow-hidden rounded-2xl border border-sky-200 bg-sky-50/30 p-5 shadow-xs">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 rounded-full bg-sky-200/20" />
            <p className="font-heading text-xs font-bold text-sky-850 uppercase tracking-wider mb-2">Environmental Wisdom</p>
            <p className="font-body text-xs italic text-sky-950/80 leading-relaxed font-semibold">
              &ldquo;Nature is like our favourite dinner.
              <br />
              But to control our hunger is also necessary.
              <br />
              The more is our hunger, the more will nature reduce.&rdquo;
            </p>
            <p className="mt-2 text-right font-body text-[10px] font-bold text-sky-800">
              — M. S. Swaminathan
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>The purity of gold and diamonds is measured in carats.</TipBox>
      </div>
    </div>
  );
}
