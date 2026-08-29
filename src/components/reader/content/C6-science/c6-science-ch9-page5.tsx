import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE3_ROWS: TableCell[][] = [
  [{ value: "1." }, { value: "Tridax plant" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  ...Array.from({ length: 4 }, (_, i) => [
    { value: `${i + 2}.` },
    { value: "", editable: true },
    { value: "", editable: true },
    { value: "", editable: true },
    { value: "", editable: true },
    { value: "", editable: true },
    { value: "", editable: true },
  ]),
];

export function C6ScienceCh9Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Table 3 Spanning Full Width */}
      <h2 className="font-heading text-base font-bold text-emerald-800">
        Activity-3: Are all leaves same?
      </h2>
      <p>
        Observe the leaves of the plants that you collected in activity-1. How are they? Do all the
        leaves have same size and shape? Compare the leaves of the plants, collected in activity-1 with
        Fig. 5. Write your observations in table 3. You can also draw the &apos;shape&apos; and
        &apos;edge&apos; of the leaf in columns if describing is difficult.
      </p>

      <FillInTable
        title="Table 3"
        columns={["S. No.", "Name of the Plant", "Leaf base Yes/No", "Petiole Yes/No", "Lamina Yes/No", "Shape of the leaf", "Edges of the leaf"]}
        rows={TABLE3_ROWS}
        storageKey="c6-science-ch9-table3"
      />

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What are the common parts that you observe in all leaves?</li>
            <li>Do all the leaves have the same shape?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">
            9.5. Venation :
          </h2>
          <p>
            Observe the leaf lamina carefully. What do you see? You may see some thin line-like
            structures spread over the leaf!
          </p>

          <h3 className="font-heading text-sm font-bold text-emerald-805 pt-2">
            Activity-4: Venation
          </h3>
          <p>
            To understand the venation let us do an activity.
          </p>
          <p>
            Put a leaf under a white sheet of paper or a sheet in your notebook. Hold the tip of a
            pencil flat and rub it on the paper.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <p>
            Impression of lines appear on the paper. Compare them with the lines on the leaf.
          </p>
          <p>
            These lines on the leaf are called <strong>veins.</strong> The long vein present in the middle
            of the lamina is called <strong>midrib.</strong> The branches arising from the midrib are
            called veins and the even finer divisions are veinlets.
          </p>
          <p>
            The arrangement of veins in the lamina is called <strong>venation.</strong> The leaf lamina
            usually consists of a midrib, veins and veinlets arranged in the form of a network. Veins
            spread all over the lamina of the leaf and give it a shape and support. Think what would
            happen if there are no veins in the leaf!
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Petals are usually colorful, they attract insects and birds for pollination.</TipBox>
      </div>
    </div>
  );
}
