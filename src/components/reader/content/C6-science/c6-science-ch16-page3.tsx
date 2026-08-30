import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE2_ROWS: TableCell[][] = [
  [{ value: "Myself" }, { value: "walk, run, ..." }],
  [{ value: "Housefly" }, { value: "", editable: true }],
  [{ value: "Grasshopper" }, { value: "", editable: true }],
  [{ value: "Frog" }, { value: "", editable: true }],
  [{ value: "Snake" }, { value: "crawls, ..." }],
  [{ value: "Pigeon" }, { value: "", editable: true }],
  [{ value: "Fish" }, { value: "", editable: true }],
  [{ value: "Plant" }, { value: "", editable: true }],
];

export function C6ScienceCh16Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>What characteristics are same in plants and animals?</li>
            <li>Do you agree that you are the same as other animals?</li>
            <li>What characteristics do you observe in rocks?</li>
          </ul>

          <p className="text-xs">
            The things around us that possess the characteristics listed above are known as <strong>living
            things.</strong> Those which do not possess these characteristics are known as non-living things.
          </p>
          <p className="text-xs">
            Some of the characteristics are common in all living things. Can we say all characteristics listed
            in activity 2 apply to all living beings?
          </p>
          <p className="text-xs">
            You know that plants are also living beings like us. Plants grow like we do but do they move like us?
          </p>
          <p className="text-xs">
            Is it essential for a living thing to have all of these properties or could a thing be considered
            living if it has some of these properties? Let&apos;s take a closer look at the characteristics
            of living things.
          </p>

          <h3 className="font-heading text-base font-bold text-emerald-800 pt-2">
            16.2. Movement in living beings :
          </h3>
          <p className="text-xs">
            How do the following living beings go from one place to another? Observe the following table-2
            discuss in groups and write the way the organisms move.
          </p>
          <p className="text-xs font-semibold text-emerald-900">
            Do you have more examples of different kinds of movements in animals? List them in your notebook.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <FillInTable
            title="Table 2: Living organisms and their moving methods"
            columns={["Living organism", "Moving method"]}
            rows={TABLE2_ROWS}
            storageKey="c6-science-ch16-table2"
          />

          <p className="text-xs pt-2">
            We see that plants don&apos;t move like us. Should we consider them as living beings? There are
            some movements in plants for example, closing and opening of flowers. Discuss in groups. List
            out the movements in plants. Track your discussions in your notebook.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
            <li>We say that plants don&apos;t move but we find plants of the same types in different locations. How is this possible?</li>
            <li>Other than plantation by human beings there are many natural ways of seed dispersion. The seeds grow into plants and we feel that plants have moved from one place to another.</li>
          </ul>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>The longest living cells in our body are brain cells which can live an entire lifetime.</TipBox>
      </div>
    </div>
  );
}
