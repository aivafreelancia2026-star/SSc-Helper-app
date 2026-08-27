import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const SEASONS_ROWS: TableCell[][] = [
  [{ value: "Summer" }, { value: "", editable: true }],
  [{ value: "Rainy" }, { value: "", editable: true }],
  [{ value: "Winter" }, { value: "", editable: true }],
];

export function C6ScienceCh8Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Chapter 8 Start Banner */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-double border-indigo-400/60 bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block rounded-full bg-indigo-200/60 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-800 uppercase">
              Chapter 8
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-indigo-950 sm:text-3xl">
              Fibre to Fabric
            </h1>
          </div>
          <div className="flex flex-col items-center border border-indigo-200 rounded p-1.5 bg-white shadow-xs">
            <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-indigo-600 mb-1">QR CODE</span>
            <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700 font-mono select-none">
              Q8L9I2
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Neelima lives in a town. Her father is a salesman at a cloth shop. One Sunday she went
            there along with him. She was amazed to see so many varieties of cloth (fabrics). Her father
            and other salesmen were showing different types of fabric to the customers. They were
            telling customers about their price and quality in detail. They were also telling them how
            to take care of the fabrics, whether they were washable or needed to be dry-cleaned.
          </p>
          <p>
            She also noticed that some materials cost less than the others. On the way back home she
            asked her father many questions. Why was there a difference in the price? How are these
            fabrics made? What materials are these fabrics made of? Is the process of making fabrics
            the same for all types? Let us try to find the answers to Neelima&apos;s questions.
          </p>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">8.1. Types of Fabrics</h2>
          <p>
            We wear different clothes in different seasons. List the types of clothes we wear in the
            following seasons:
          </p>

          <FillInTable
            title=""
            columns={["Seasons", "Cloths we wear"]}
            rows={SEASONS_ROWS}
            storageKey="c6-science-ch8-seasons-table"
          />

          <p className="pt-2">
            We can say that we use fabric as a shield to protect ourselves from different weather
            conditions.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch8_fig1.png"
              alt="Fig. 1 — Neelima and father at the cloth store"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 1
            </p>
          </div>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[220px] mx-auto">
            <img
              src="/assets/images/C6-science/ch8_fig2.png"
              alt="Fig. 2 — Seasonal clothes"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 2
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Corn fibre is a new innovation in the textile industry.</TipBox>
      </div>
    </div>
  );
}
