import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE5_ROWS: TableCell[][] = Array.from({ length: 5 }, (_, i) => [
  { value: `${i + 1}.` },
  { value: "", editable: true },
  { value: "", editable: true },
  { value: "", editable: true },
]);

export function C6ScienceCh9Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Table 5 Spanning Full Width */}
      <FillInTable
        title="Table 5"
        columns={["S.No.", "Name of the plant", "Stem grows Vertically/Horizontally", "Branches are Present/Absent"]}
        rows={TABLE5_ROWS}
        storageKey="c6-science-ch9-table5"
      />

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Leaves and flowers grow from the stem. If you observe carefully, you will see a scar on
            the stem where the leaf arises. The stem branches into sub-branches and bears leaves,
            flowers and fruits.
          </p>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">
            9.8. Carrying food material
          </h2>
          <p className="font-semibold text-emerald-850">Activity-8:</p>
          <p className="italic text-foreground/75 text-xs">
            Take two soft stemmed plants. Set them up like you did in activity-2 (Fig. 9). Wait for 2-3
            hours and record your observations.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What differences did you find between the stem of both the plants?</li>
            <li>Do red spots appear on the leaves or flowers of any of the plants?</li>
          </ul>

          <p>
            Take the stem of a plant which was kept in water with red ink and cut a small section
            transversely with a sharp blade. Take the help of your teacher for this. Put it on a
            slide. Observe it under a microscope.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <p>
            Do you observe any coloured portion? Now, cut the stem into two halves vertically, from
            top to bottom Observe it.
          </p>
          <p>
            The coloured ring like structure that you see act as a tube. The water absorbed by the
            root is carried through the stem to all parts of the plant.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[220px] mx-auto">
            <img
              src="/assets/images/C6-science/ch9_fig9.png"
              alt="Fig. 9 — Transverse and vertical stem conduction experiment"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 9
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Creeping plants such as grapes have weak stem. Tendrils and hooks formed by the plant helps in climbing.</TipBox>
      </div>
    </div>
  );
}
