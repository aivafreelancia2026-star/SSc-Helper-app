import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE1_ROWS: TableCell[][] = [
  [{ value: "Tea" }, { value: "Milk, ...", editable: true }],
  [{ value: "Laddu" }, { value: "", editable: true }],
  [{ value: "Lemon Juice" }, { value: "", editable: true }],
  [{ value: "Concrete" }, { value: "", editable: true }],
  [{ value: "Soil" }, { value: "", editable: true }],
];

export function C6ScienceCh7Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Chapter 7 Start Banner */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-double border-indigo-400/60 bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block rounded-full bg-indigo-200/60 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-800 uppercase">
              Chapter 7
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-indigo-950 sm:text-3xl">
              Separation of Substances
            </h1>
          </div>
          <div className="flex flex-col items-center border border-indigo-200 rounded p-1.5 bg-white shadow-xs">
            <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-indigo-600 mb-1">QR CODE</span>
            <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700 font-mono select-none">
              L2R7R8
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Hemanth&apos;s mother sent him to a grocery store to buy grocery and vegetables. He
            purchased green chilli, coriander seeds, tomato, red gram, wheat flour and kept them
            safely in a bag. While returning home he fell on the ground and all the items in the bag
            got mixed. How will he separate them now?
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[150px] mx-auto">
            <img
              src="/assets/images/C6-science/ch7_fig1.png"
              alt="Fig. 1 — Boy holding grocery bag"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 1
            </p>
          </div>

          <p className="pt-2 font-semibold text-indigo-800">Discuss the following :</p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Which material will he separate first?</li>
            <li>How would he separate tomato and chilli?</li>
            <li>How would he separate wheat flour?</li>
            <li>How would he separate coriander seeds?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">7.1. Separation of Substances</h2>
          <p>
            We separate components in mixtures for different purposes in our daily life. For example,
            we remove small stones from rice before cooking, remove worms and husk from flour by
            seiving before preparing roti. Similarly we separate impurities from water, tea leaves
            (tea powder) from tea etc. Can you mention some more?
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch7_fig2.png"
              alt="Fig. 2 — Preparing tea on a stove"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 2
            </p>
          </div>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">7.2. Mixtures</h2>
          <p>
            Have you observed tea being prepared? What substances are used for preparing tea? List them
            in table 1. and also list out the different substances that are used to make the items
            given in table 1.
          </p>

          <FillInTable
            title="Table 1"
            columns={["Mixture", "Substances"]}
            rows={TABLE1_ROWS}
            storageKey="c6-science-ch7-table1"
          />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Camphor, is obtained by steam distillation of the bark of the camphor tree (Cinnamomum camphora)</TipBox>
      </div>
    </div>
  );
}
