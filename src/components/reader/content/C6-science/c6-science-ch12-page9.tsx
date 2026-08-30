import { ExerciseList, type ExerciseItem } from "@/components/reader/exercise-list";
import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const EXERCISES_L: ExerciseItem[] = [
  { text: "Draw a circuit diagram showing a cell, switch and a bulb." },
  { text: "A circuit is connected with a cell, bulb and a switch, but the bulb is not glowing. Write all possible reasons for this." },
  { text: "You have studied the story of Thomas Alva Edison. Write a note appreciating his efforts in inventing the bulb." },
  { text: "List the daily activities in which we use electricity." },
  { text: "If you put the switch on, a light will glow, a fan will rotate, an iron box heats up etc. All these different functions will be performed by electricity. How do you feel about the comforts given by this great invention to human beings?" },
];

const TABLE14_ROWS: TableCell[][] = Array.from({ length: 4 }, () => [
  { value: "", editable: true },
  { value: "", editable: true },
  { value: "", editable: true },
]);

export function C6ScienceCh12Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <h3 className="font-heading text-xs font-bold text-sky-900 mb-2">
              8. What will happen if the cells in a torch are arranged as shown in the following figure-11?
            </h3>
            <div className="flex justify-center bg-white rounded-xl border border-sky-100 p-2 max-w-[200px] mx-auto shadow-xs">
              <img
                src="/assets/images/C6-science/ch12_fig11.png"
                alt="Fig. 11 — Wrongly oriented cell terminals inside a torch barrel diagram"
                className="max-w-full h-auto rounded"
              />
            </div>
            <p className="text-center font-body text-[10px] italic text-foreground/50 mt-1 font-semibold">
              Fig. 11
            </p>
          </div>

          <ExerciseList title="" items={EXERCISES_L} start={9} />

          <div className="pt-2">
            <h3 className="font-heading text-xs font-bold text-sky-900 mb-2">16. Match the following:</h3>
            <div className="grid grid-cols-2 gap-4 text-xs font-body text-foreground/80 bg-sky-50/50 border border-sky-100 rounded-xl p-3">
              <div className="space-y-1">
                <p>1) Cell <span className="text-foreground/40">( &nbsp; &nbsp; )</span></p>
                <p>2) Safety pin <span className="text-foreground/40">( &nbsp; &nbsp; )</span></p>
                <p>3) Eraser <span className="text-foreground/40">( &nbsp; &nbsp; )</span></p>
                <p>4) Glowing of bulb <span className="text-foreground/40">( &nbsp; &nbsp; )</span></p>
                <p>5) Switch <span className="text-foreground/40">( &nbsp; &nbsp; )</span></p>
              </div>
              <div className="space-y-1">
                <p>A) Electric Conductor</p>
                <p>B) Source of electricity</p>
                <p>C) Filament</p>
                <p>D) Electric Insulator</p>
                <p>E) To close or open a circuit</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <div>
            <h3 className="font-heading text-xs font-bold text-sky-900 mb-2">
              14. Write a list of electrical appliances in your house. Classify them as follows:
            </h3>
            <FillInTable
              title=""
              columns={["Works with cell as a source", "Works with electric current as a source", "Works with both"]}
              rows={TABLE14_ROWS}
              storageKey="c6-science-ch12-table14"
            />
          </div>

          <div className="pt-2">
            <h3 className="font-heading text-xs font-bold text-sky-900 mb-2">
              15. Connect circuits as shown in the following figure-12. Write your observation in each case.
            </h3>
            <div className="flex justify-center bg-white rounded-xl border border-sky-100 p-2 max-w-[220px] mx-auto shadow-xs">
              <img
                src="/assets/images/C6-science/ch12_fig12.png"
                alt="Fig. 12 — Three schematic circuit wiring configurations"
                className="max-w-full h-auto rounded"
              />
            </div>
            <p className="text-center font-body text-[10px] italic text-foreground/50 mt-1 font-semibold">
              Fig. 12
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Thomas Alva Edison (1846–1931) built the first large-scale electric power plant in the USA.</TipBox>
      </div>
    </div>
  );
}
