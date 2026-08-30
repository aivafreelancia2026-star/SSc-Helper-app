import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE2_ROWS: TableCell[][] = [
  [{ value: "Cow" }, { value: "Legs" }, { value: "", editable: true }],
  [{ value: "Human" }, { value: "", editable: true }, { value: "walks, runs, jumps" }],
  [{ value: "Snake" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "Bird" }, { value: "", editable: true }, { value: "hops, flies" }],
  [{ value: "Insect" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "Fish" }, { value: "", editable: true }, { value: "", editable: true }],
];

export function C6ScienceCh14Page11() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h3 className="font-heading text-base font-bold text-emerald-805">
            14.6.8. Fixed joints
          </h3>
          <p className="text-xs">
            Some joints between bones in our head can&apos;t move; such joints are called fixed joints.
            These joints are fused and seem to be a single bone in the skull. When you open your mouth, you
            can move your lower jaw.
          </p>
          
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Can you move the upper jaw as well?</li>
          </ul>

          <div className="flex gap-4 items-center pt-2">
            <img
              src="/assets/images/C6-science/ch14_fig19.png"
              alt="Fig. 19 — Girl pointing to her skull demonstrating fixed upper jaw"
              className="max-w-[45px] h-auto rounded shadow-xs"
            />
            <p className="text-xs">
              There is a joint between the upper jaw and the rest of the head. It is a fixed joint. So we
              cannot move the upper jaw. (Fig-19)
            </p>
          </div>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">
            14.7. Movements in other animals
          </h2>
          <p className="text-xs">
            We can move our body parts with the help of muscles bones and joints. Do all animals have these
            parts like us? Let us study how animals move.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <h3 className="font-heading text-sm font-bold text-emerald-805">
            Activity-11: Locomotion
          </h3>
          <p className="italic text-foreground/75 text-xs">
            Lets us observe how animals move from one place to another. Fill your observations in table-2.
          </p>

          <FillInTable
            title="Table 2"
            columns={["Animal", "Body part used for moving", "How does the animal move"]}
            rows={TABLE2_ROWS}
            storageKey="c6-science-ch14-table2"
          />

          <p className="text-xs pt-2">
            By analyzing table 2 you will see that different animals use different body parts for moving
            from one place to another (locomotion).
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Most of the Amphibian species have a life cycle that involves three stages egg, larva and adult.</TipBox>
      </div>
    </div>
  );
}
