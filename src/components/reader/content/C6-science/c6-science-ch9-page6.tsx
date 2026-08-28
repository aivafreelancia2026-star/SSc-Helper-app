import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE4_ROWS: TableCell[][] = [
  [{ value: "1." }, { value: "", editable: true }, { value: "", editable: true }],
  ...Array.from({ length: 4 }, (_, i) => [
    { value: `${i + 2}.` },
    { value: "", editable: true },
    { value: "", editable: true },
  ]),
];

export function C6ScienceCh9Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="font-heading text-base font-bold text-emerald-805">
            Activity-5: Types of Venation
          </h2>
          <p>
            Observe the venation of the leaves that you collected in activity-1. Now compare them
            with the venations of the leaves shown in Fig. 6. Record your observations in table 4.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch9_fig6.png"
              alt="Fig. 6 — Reticulate (web-like) vs Parallel venation"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 6
            </p>
          </div>

          <FillInTable
            title="Table 4"
            columns={["S. No.", "Plant", "Venation (Reticulate / Parallel)"]}
            rows={TABLE4_ROWS}
            storageKey="c6-science-ch9-table4"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <p>Now compare the results obtained in table 2 with table 4.</p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What type of roots are there in plants having parallel venation in their leaves?</li>
            <li>What type of roots are there in plants having web-like venation in their leaves?</li>
            <li>Is there any relation between venation and root system?</li>
          </ul>

          <p>
            You will see that the plants with tap root system have leaves with web-like or reticulate
            venation and plants with fibrous roots have parallel venation.
          </p>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">
            9.6. Functions of a leaf :
          </h2>
          <p>
            Leaves play an important role in the life of a plant. Plants also breathe like us, just as
            we breath air with the nose. Which part of the plant does this work?
          </p>

          <h2 className="font-heading text-base font-bold text-emerald-805 pt-2">
            Activity-6: Observation of Stomata
          </h2>
          <p>
            Take a fleshy leaf. Peel the outer layer of the leaf and place it on a slide. Put a drop of
            water on it and observe it under a microscope. Try to find some bean shaped parts in it.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch9_fig7.png"
              alt="Fig. 7 — Stomata diagram showing guard cells and stomatal pore"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 7
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Cashew is not a fruit. It is a fruit stalk.</TipBox>
      </div>
    </div>
  );
}
