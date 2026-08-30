import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { TipBox } from "@/components/reader/tip-box";

const KITCHEN_ROWS: TableCell[][] = Array.from({ length: 3 }, () => [
  { value: "", editable: true },
  { value: "", editable: true },
  { value: "", editable: true },
]);

const EXERCISES: ExerciseItem[] = [
  { text: "Name any five objects which are made up of only one material?" },
  { text: "Name any five objects which are made up of more than two or more materials?" },
  {
    text: "List five things which we can make using each of the following materials :",
    extra: <p className="mt-1 italic text-foreground/70">a. glass &nbsp; b. metal &nbsp; c. plastic &nbsp; d. wood</p>,
  },
  { text: "Mary saw a ship travelling on a sea. She knows that iron nail sinks in water. She has many doubts, what are her doubts? Write them." },
  { text: "Mary, while examining whether a boiled egg sinks or floats, found that it floats but Vakula made it sink, How is it possible? Guess and write it." },
  { text: "Drop an egg in a beaker of water. Now drop the same egg in another beaker of water in which excessive salt is added. Write your observation." },
  {
    text: "Do the following activities. Write down your observations.",
    subItems: ["Mix chalk powder in water.", "Place a piece of candle in water.", "Add some oil drops to a beaker of water."],
  },
  {
    text: "Make a list of items from your kitchen like utensils, food ingredients etc. classify them as follows.",
    extra: (
      <FillInTable
        title=""
        columns={["Item", "Sink / Float in water", "Soluble / Insoluble in water"]}
        rows={KITCHEN_ROWS}
        storageKey="c6-science-ch5-kitchen-table"
      />
    ),
  },
  { text: "Collect different plastic items from your surroundings. Classify them as transparent, opaque and translucent." },
  { text: "Draw different objects made up of wood which we use in our daily life." },
  { text: "Make a few models you like using clay. Think how can you make them to float on water." },
  { text: "We know that a ship, even though it is madeup of tonnes of iron, floats on water. How do you feel about the scientists who found the scientific principles and efforts in making a ship?" },
  { text: "We use so many wooden items in our daily life. Is it good to use wood? What happens by excessive use of it? What is the reason? Is there any alternative for this?" },
];

export function C6ScienceCh5Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-100 pb-4 pt-2">
            <h2 className="font-heading text-base font-bold text-indigo-800">Improve your learning</h2>
            <div className="flex flex-col items-center border border-indigo-200 rounded p-1.5 bg-white shadow-xs">
              <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-indigo-600 mb-1">QR CODE</span>
              <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700 font-mono select-none">
                A6B4F1
              </div>
            </div>
          </div>

          <ExerciseList title="" items={EXERCISES.slice(0, 7)} start={1} />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <ExerciseList title="" items={EXERCISES.slice(7)} start={8} />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>When white light falls on an object it may reflected, absorbed or transmitted.</TipBox>
      </div>
    </div>
  );
}
