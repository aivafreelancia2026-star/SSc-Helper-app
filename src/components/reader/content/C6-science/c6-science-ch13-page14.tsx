import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const EXERCISES_L: ExerciseItem[] = [
  { text: "What is the smallest distance that you can measure with a centimetre scale?" },
  { text: "Are we able to measure the thickness of a metal wire using a scale? Explain." },
  { text: "A class room measures 20 m in length and 15 m in breadth. Find its area." },
  { text: "Ramu's father had a rectangular plot of length 60 ft. and breadth 50 ft. He built a house occupying length 40 ft. of the plot and breadth 40 ft. and in the remaining area he planned a garden. Can you help Ramu to find out the area of his garden?" },
  { text: "Millilitre is a unit for measuring _________." },
  { text: "For measuring long distances we can use _________ as a unit." },
];

const EXERCISES_R: ExerciseItem[] = [
  { text: "What method will you adopt to measure the volume of a banana? Explain." },
  { text: "Identify incorrect statements among the following and rewrite them with necessary corrections:\na) One square metre is equal to 10,000 square centimetres.\nb) The appropriate unit for reporting the volume of a cylindrical rod is cm².\nc) The appropriate instrument to measure the thickness of a 25 paisa coin is a tailor's tape.\nd) A measuring cylinder can directly measure the volume of solids." },
  { text: "How will you measure the area of your palm using graph paper? Explain." },
  { text: "Measure the volume of \"Kalakanda\" (sugar crystal) and piece of \"Patika\" (alum). Record your measurements in table 4. Ask your friends to measure volumes of the same pieces of Kalakanda and Patika and record the values." }
];

export function C6ScienceCh13Page14() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="rounded-[16px] border border-sky-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-sky-800 mb-2">What we have learnt (contd.)</p>
            <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
              <li>Generally we measure area in square metres or square centimetres etc.</li>
              <li>Volume is a measure of the extent of space occupied by a body.</li>
              <li>Volume of solids is measured in cubic metres or cubic centimetres.</li>
              <li>Volume of liquids is measured in litres or millilitres.</li>
              <li>1 cm³ = 1 ml</li>
            </ul>
          </div>

          <div className="flex items-center justify-between border-b border-sky-100 pb-4 pt-2">
            <h2 className="font-heading text-base font-bold text-sky-805">Improve your learning</h2>
            <div className="flex flex-col items-center border border-sky-200 rounded p-1.5 bg-white shadow-xs">
              <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-sky-600 mb-1">QR CODE</span>
              <div className="w-12 h-12 bg-sky-50 border border-sky-100 flex items-center justify-center text-[10px] font-bold text-sky-700 font-mono select-none">
                F1K2V6
              </div>
            </div>
          </div>

          <ExerciseList title="" items={EXERCISES_L} start={1} />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <div>
            <h3 className="font-heading text-xs font-bold text-sky-900 mb-2">7. Match the following:</h3>
            <div className="grid grid-cols-2 gap-4 text-xs font-body text-foreground/80 bg-sky-50/50 border border-sky-100 rounded-xl p-3">
              <div className="space-y-1">
                <p>a) A litre <span className="text-foreground/40">( &nbsp; &nbsp; )</span></p>
                <p>b) A metre <span className="text-foreground/40">( &nbsp; &nbsp; )</span></p>
                <p>c) A Kilometre <span className="text-foreground/40">( &nbsp; &nbsp; )</span></p>
                <p>d) A Centimetre <span className="text-foreground/40">( &nbsp; &nbsp; )</span></p>
                <p>e) 1 hectare <span className="text-foreground/40">( &nbsp; &nbsp; )</span></p>
              </div>
              <div className="space-y-1">
                <p>i) 10000 m²</p>
                <p>ii) 1000 ml</p>
                <p>iii) 100 cm</p>
                <p>iv) 1000 m</p>
                <p>v) 10 mm</p>
              </div>
            </div>
          </div>

          <ExerciseList title="" items={EXERCISES_R} start={8} />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>To grow 1 kilograms of rice, 5000 litres of water is used.</TipBox>
      </div>
    </div>
  );
}
