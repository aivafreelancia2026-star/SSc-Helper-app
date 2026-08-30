import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE2_ROWS: TableCell[][] = [
  [{ value: "1" }, { value: "Hair pin" }, { value: "", editable: true }],
  [{ value: "2" }, { value: "Safety pin" }, { value: "", editable: true }],
  [{ value: "3" }, { value: "Eraser" }, { value: "", editable: true }],
  [{ value: "4" }, { value: "Plastic scale" }, { value: "", editable: true }],
  [{ value: "5" }, { value: "Match stick" }, { value: "", editable: true }],
  [{ value: "6" }, { value: "Metal bangle" }, { value: "", editable: true }],
];

export function C6ScienceCh12Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="font-heading text-base font-bold text-sky-800">
            12.5. Torch-light :
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>What does a torch consist of?</li>
            <li>What makes the torch bulb glow?</li>
          </ul>
          <p>
            Take a torch and observe its internal parts (Fig. 7).
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[220px] mx-auto">
            <img
              src="/assets/images/C6-science/ch12_fig7.png"
              alt="Fig. 7 — Inside view of a torch showing cells, switch, reflector, spring"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 7: Inside view of a torch-light
            </p>
          </div>

          <p className="text-xs">
            &apos;Torch-light is used as a source of light. The parts of a torch-light are hollow
            cylindrical barrel, cells, bulb, switch, glass cover and metal spring.
          </p>
          <p className="text-xs">
            Torch consists of a hollow cylindrical barrel in which cells are fitted. At one end of it
            there is a lid with screw which can be opened and closed. When the lid is closed and switch
            is ON, the circuit is completed and current flows in the circuit which makes the bulb glow.
          </p>
          <p className="text-xs">
            In Niharika&apos;s case, it was just the position of cells that made the bulb to glow. Can you
            predict other reasons for the torch not working?
          </p>

          <h3 className="font-heading text-sm font-bold text-sky-805 pt-2">
            Activity-4: Let us do
          </h3>
          <p className="text-xs italic text-foreground/75">
            Take a torch which has two cells. Arrange the cells in the torch in as many ways as you can.
            In which cases does the bulb glow and in which cases it doesn&apos;t?
          </p>
          <p className="text-xs">
            Draw pictures showing different positions of cells and glowing of bulb. Can you find out why
            the bulb glows only when cells are placed in a particular position?
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-sky-800">
            12.6. Electric Conductors and insulators
          </h2>
          <p className="text-xs">
            In activity-2, we used wires after removing the plastic covering at both the ends. Why don&apos;t we
            use the wires without removing the plastic covering? What material do you find in electric
            wires? Why are we advised to wear rubber chappals while working with electricity?
          </p>
          <p>Let us find out.</p>

          <h3 className="font-heading text-sm font-bold text-sky-805">
            Activity-5: Identifying conductors and insulators
          </h3>
          <p className="text-xs">
            Take the circuit which we used in activity-3. As shown in Fig. 8, Remove the safety-pin from
            the drawing pins so that you have two open terminals A and B. Insert different objects like a
            hair pin, safety pin, eraser, plastic scale, match stick, piece of a metal bangle, piece of a
            glass bangle, paper clip etc. in the gap between A and B. With each insertion, check whether
            the bulb glows or not. Record your observations in table 2 for each case.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch12_fig8.png"
              alt="Fig. 8 — Open circuit showing open terminals A and B"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 8: An open electric circuit
            </p>
          </div>

          <FillInTable
            title="Table 2"
            columns={["S. No.", "Object", "Does the bulb glow (Yes/No)"]}
            rows={TABLE2_ROWS}
            storageKey="c6-science-ch12-table2"
          />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Danish physicist Hans Christian Oersted (1777-1851) put a compass near an electric cable and discovered that electricity can make magnetism.</TipBox>
      </div>
    </div>
  );
}
