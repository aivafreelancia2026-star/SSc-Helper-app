import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const EXERCISES_L: ExerciseItem[] = [
  { text: "Rafi said that &ldquo;Flour from Rice / Wheat is a man-made change.&rdquo; He wants to make a list of examples of this kind of change, help him expand his list." },
  { text: "Select a plant in your house / school observe and record changes keeping in view height of plant, number and size of leaves and flowers etc. over a period of 2 months. Display your observations." },
];

const EXERCISES_R: ExerciseItem[] = [
  { text: "What will happen if a decorative colour paper is dipped in water? Predict the possible changes. Verify your predictions by doing experiments and write down the steps of the process." },
  { text: "Write various processes involved in making ghee from milk, what changes do you find, during this process." }
];

const EXERCISES_BOTTOM: ExerciseItem[] = [
  { text: "Farha wondered &ldquo;How it could be possible for Nature to bring changes in seasons periodically&rdquo;. Can you add some changes like this. How will you explain them?" },
  { text: "Sita wondered and felt very happy to see the beauty of the fields and insects like twinkling beetle (Anudra) during rainy season in their village. Can you list some such changes which make you wonder and feel happy?" }
];

export function C6ScienceCh10Page12() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ExerciseList title="" items={EXERCISES_L} start={9} />

          <p className="font-heading text-sm font-bold text-indigo-900 pt-2">
            13. Observe the following table and answer the questions given below:
          </p>

          <div className="overflow-x-auto rounded-xl border border-indigo-100 bg-white/70 shadow-xs">
            <table className="w-full text-center text-xs border-collapse">
              <thead className="bg-indigo-50 border-b border-indigo-100 font-heading text-[10px] font-bold text-indigo-900 uppercase">
                <tr>
                  <th className="py-2 px-2 border-r border-indigo-100" rowSpan={2}>Place</th>
                  <th className="py-2 px-2 border-r border-indigo-100" rowSpan={2}>Month</th>
                  <th className="py-2 px-2 border-r border-indigo-100" colSpan={2}>Temperature</th>
                  <th className="py-2 px-2 border-r border-indigo-100" rowSpan={2}>Rainfall</th>
                  <th className="py-2 px-2 border-r border-indigo-100" rowSpan={2}>Sunrise</th>
                  <th className="py-2 px-2" rowSpan={2}>Sunset</th>
                </tr>
                <tr className="border-t border-indigo-100">
                  <th className="py-1 px-1 border-r border-indigo-100">Min.</th>
                  <th className="py-1 px-1 border-r border-indigo-100">Max.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-50 text-foreground/80 font-mono">
                <tr>
                  <td className="py-2 px-2 border-r border-indigo-100 font-semibold font-body" rowSpan={3}>Rentachintala</td>
                  <td className="py-2 px-2 border-r border-indigo-100 font-body">January</td>
                  <td className="py-2 px-2 border-r border-indigo-100">21°C</td>
                  <td className="py-2 px-2 border-r border-indigo-100">27°C</td>
                  <td className="py-2 px-2 border-r border-indigo-100">2.41mm</td>
                  <td className="py-2 px-2 border-r border-indigo-100">6.50</td>
                  <td className="py-2 px-2">17.12</td>
                </tr>
                <tr>
                  <td className="py-2 px-2 border-r border-indigo-100 font-body">April</td>
                  <td className="py-2 px-2 border-r border-indigo-100">39°C</td>
                  <td className="py-2 px-2 border-r border-indigo-100">47°C</td>
                  <td className="py-2 px-2 border-r border-indigo-100">0.01mm</td>
                  <td className="py-2 px-2 border-r border-indigo-100">6.11</td>
                  <td className="py-2 px-2">17.47</td>
                </tr>
                <tr>
                  <td className="py-2 px-2 border-r border-indigo-100 font-body">August</td>
                  <td className="py-2 px-2 border-r border-indigo-100">24°C</td>
                  <td className="py-2 px-2 border-r border-indigo-100">34°C</td>
                  <td className="py-2 px-2 border-r border-indigo-100">39.12mm</td>
                  <td className="py-2 px-2 border-r border-indigo-100">6.37</td>
                  <td className="py-2 px-2">17.31</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <ExerciseList title="" items={EXERCISES_R} start={11} />

          <ul className="list-alpha space-y-1.5 pl-5 text-foreground/80 text-xs pt-2">
            <li>i) Which month had maximum rainfall?</li>
            <li>ii) Which season occurs in the month of August? How can you support your answer.</li>
            <li>iii) In which month is the duration of day minimum? What could be the reason for this?</li>
            <li>iv) Do you find any relation between sunrise and seasons?</li>
            <li>v) What changes can you identify from January to August?</li>
          </ul>

          <div className="pt-2">
            <ExerciseList title="" items={EXERCISES_BOTTOM} start={14} />
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>The energy stored in fuels can be used to perform mechanical work in a controlled manner.</TipBox>
      </div>
    </div>
  );
}
