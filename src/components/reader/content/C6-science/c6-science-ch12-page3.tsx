import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE1_ROWS: TableCell[][] = [
  [{ value: "Fig 4(b)" }, { value: "", editable: true }],
  [{ value: "Fig 4(c)" }, { value: "", editable: true }],
  [{ value: "Fig 4(d)" }, { value: "", editable: true }],
  [{ value: "Fig 4(e)" }, { value: "", editable: true }],
  [{ value: "Fig 4(f)" }, { value: "", editable: true }],
  [{ value: "Fig 4(g)" }, { value: "", editable: true }],
];

export function C6ScienceCh12Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch12_fig4_b_to_g.png"
              alt="Fig. 4(b) to 4(g) — Different wiring combinations of battery and bulb"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 4(b) to 4(g)
            </p>
          </div>

          <FillInTable
            title="Table 1"
            columns={["Connection", "Does the bulb glow (Yes/No)"]}
            rows={TABLE1_ROWS}
            storageKey="c6-science-ch12-table1"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <p>
            In which case does the bulb glow? Why?
          </p>
          <p>
            In which case the bulb does not glow? why?
          </p>
          <p className="text-xs">
            The blub glows only in connections shown in Fig.4(d) and Fig.4(e). In Fig.4(d) and
            Fig.4(e), there is a closed path for the flow of electric current. In Fig.4(f), Fig.4(g),
            Fig.4(b) and Fig.4(c), there is no closed path for the flow of electric current. In Fig.4(b),
            Fig.4(c) the bulb is connected to the same terminal of the cell.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch12_fig5.png"
              alt="Fig. 5 — Simple electric circuit loop"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 5: A simple electric circuit
            </p>
          </div>

          <h2 className="font-heading text-base font-bold text-sky-800 pt-2">
            12.3.1. What is a circuit?
          </h2>
          <p className="text-xs">
            Fig. 5 shows a simple electric circuit. It consists of a cell (power source), a bulb, and
            connecting wires. In an electric circuit, the electric current flows from positive terminal
            to negative terminal.
          </p>
          <p className="text-xs">
            An electric circuit provides a complete path for electricity to flow between cell and the
            bulb. The top part of the cell with protrusion is positive terminal and bottom part is
            negative terminal.
          </p>
          <p className="text-xs">
            A similar circuit exists for an electric bulb which we use in our houses. The two electric
            supply wires are connected to the two terminals of the bulb through a switch. When the
            switch is ON the circuit provides complete path for electricity.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>American printer, journalist, scientist, and statesman Benjamin Franklin (1706-1790) carried out further experiments and named the two kinds of electric charge &ldquo;positive&rdquo; and &ldquo;negative.&rdquo;</TipBox>
      </div>
    </div>
  );
}
