import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE2_ROWS: TableCell[][] = [
  [{ value: "Lemon water" }, { value: "Lemon juice, sugar, water" }, { value: "Man-made" }],
  ...Array.from({ length: 3 }, () => [
    { value: "", editable: true },
    { value: "", editable: true },
    { value: "", editable: true },
  ]),
];

export function C6ScienceCh7Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Table 2 Spanning Full Width */}
      <p>
        The above items are <strong>mixtures</strong> as they contain more than one substance.
        Combination of more than one substance forms a mixture. Some mixtures are natural like soil.
        Some mixtures are man-made like laddu, lemon juice etc.
      </p>

      <FillInTable
        title="Table 2"
        columns={["Mixture", "Substances needed", "Natural / Man made"]}
        rows={TABLE2_ROWS}
        storageKey="c6-science-ch7-table2"
      />

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Identify the mixtures among the following : milk, tea, sand, turmeric powder, red chilly</li>
            <li>From which mixture in the examples mentioned above are you able to separate substances?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">
            Activity-1: Use of water in separation
          </h2>
          <p className="font-semibold text-indigo-850">Sink - Float</p>
          <p>
            Collect some solid materials such as ghee, wax, sugar, salt, turmeric powder, dal,
            plastic, wood, iron nails. Take a bucketful of water and a beaker. Now try to answer
            the following.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Which materials float on water?</li>
            <li>Which materials sink in water?</li>
            <li>Which materials are soluble in water?</li>
            <li>Which materials are not soluble in water?</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch7_fig3.png"
              alt="Fig. 3 — Separating components using a water beaker"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 3
            </p>
          </div>

          <p className="pt-2">
            You have studied about materials and their properties in a previous chapter. We make use
            of several properties of the materials for separating the desired items from the mixture.
          </p>
          <p>
            You might come across some situations where you have to separate some components from a
            mixture. Write down two examples of such situations.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Crystals such as salt and alum also contain water. This is called crystalline water.</TipBox>
      </div>
    </div>
  );
}
