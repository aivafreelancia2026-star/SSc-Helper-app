import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

const TABLE1_ROWS: TableCell[][] = [
  [{ value: "Objects that would have broken" }, { value: "Cup, ", editable: true }],
  [{ value: "Objects that would not have broken" }, { value: "Stainless steel glass, ", editable: true }],
];

export function C6ScienceCh5Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Chapter 5 Banner */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-double border-indigo-400/60 bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block rounded-full bg-indigo-200/60 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-800 uppercase">
              Chapter 5
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-indigo-950 sm:text-3xl">
              Materials - Objects
            </h1>
          </div>
          <div className="flex flex-col items-center border border-indigo-200 rounded p-1.5 bg-white shadow-xs">
            <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-indigo-600 mb-1">QR CODE</span>
            <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700 font-mono select-none">
              Z5A8W1
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>Mary was sitting in her room and studying. Suddenly she heard a loud sound from the kitchen. Mary went to the kitchen and saw a cat running away.</p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Can you guess what could have happened? Write it down in your note book.</li>
          </ul>

          <p className="pt-2">
            Mary saw that many objects had fallen on the floor. Some of them were broken and some
            were not. Can you guess which objects might have broken and which might not have broken?
            Fill in the table 1.
          </p>

          <FillInTable title="Table 1" columns={["", ""]} rows={TABLE1_ROWS} storageKey="c6-science-ch5-table1" />

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Can you guess reasons why some objects broke and some did not?</li>
          </ul>

          <p className="pt-2">In our day to day life, we use several things for different activities. These things are made of different materials.</p>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">5.1. Materials and Objects</h2>
          <h2 className="font-heading text-base font-bold text-indigo-800 pt-1">
            Activity-1: Finding the materials used to make different objects
          </h2>
          <p>Every object is made up of some material. To make any object one or more materials are needed.</p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch5_fig1.png"
              alt="Fig. 1 — Mary in kitchen"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 1
            </p>
          </div>

          <p className="pt-2">For example body of your pen is made of plastic, where as its clip is made of Iron.</p>
          <p>
            A list of things is given in table 2. Name the materials from which each object may
            possibly be made of. Add some more things you know to the list?
          </p>
          <p className="italic text-foreground/75">(If you don&apos;t know which material the object is made of, discuss with your friends and find out.)</p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>The color of a object depends on the color of light it transmits.</TipBox>
      </div>
    </div>
  );
}
