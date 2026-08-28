import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE1_ROWS: TableCell[][] = [
  [{ value: "1." }, { value: "Tridax plant" }, { value: "Yes" }, { value: "Yes" }, { value: "Yes" }, { value: "Yes" }],
  ...Array.from({ length: 4 }, (_, i) => [
    { value: `${i + 2}.` },
    { value: "", editable: true },
    { value: "", editable: true },
    { value: "", editable: true },
    { value: "", editable: true },
    { value: "", editable: true },
  ]),
];

const TABLE2_ROWS: TableCell[][] = [
  [{ value: "1." }, { value: "Tridax plant" }, { value: "2(a)", editable: true }],
  ...Array.from({ length: 4 }, (_, i) => [
    { value: `${i + 2}.` },
    { value: "", editable: true },
    { value: "", editable: true },
  ]),
];

export function C6ScienceCh9Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Table 1 Spanning Full Width */}
      <FillInTable
        title="Table 1"
        columns={["S.No.", "Name of the plant", "Root Yes/No", "Stem Yes/No", "Leaf Yes/No", "Flower Yes/No"]}
        rows={TABLE1_ROWS}
        storageKey="c6-science-ch9-table1"
      />

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Although there are variations in the size and shape of plants but generally all plants
            have roots, stems and leaves. Have you ever thought about the importance of root, stem and
            leaves in plants? What is their role in plants? Let us try to understand these things.
          </p>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">
            9.2. Different types of roots :
          </h2>
          <p>Observe the roots of the plants you collected. How are they?</p>
          <p>Do all plants have similar types of roots? Is there any difference?</p>
          <p>
            Compare the roots of your sample plants with Fig. 2(a) and Fig. 2(b). Write 2(a) or 2(b), in
            the column &apos;roots are similar to&apos;, according to your observations.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex justify-center gap-6 bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[280px] mx-auto">
            <div className="flex flex-col items-center">
              <img
                src="/assets/images/C6-science/ch9_fig2_a.png"
                alt="Fig. 2(a) — Tap root system"
                className="max-w-[80px] h-auto rounded-lg shadow-sm"
              />
              <p className="text-center font-body text-xs italic text-foreground/50 mt-1 font-semibold">
                Fig. 2(a)
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/assets/images/C6-science/ch9_fig2_b.png"
                alt="Fig. 2(b) — Fibrous root system"
                className="max-w-[80px] h-auto rounded-lg shadow-sm"
              />
              <p className="text-center font-body text-xs italic text-foreground/50 mt-1 font-semibold">
                Fig. 2(b)
              </p>
            </div>
          </div>

          <FillInTable
            title="Table 2"
            columns={["S. No.", "Name of the plant", "Roots are similar to Fig."]}
            rows={TABLE2_ROWS}
            storageKey="c6-science-ch9-table2"
          />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>&apos;Banana oil&apos; is made from petroleum.</TipBox>
      </div>
    </div>
  );
}
