import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE2_ROWS: TableCell[][] = [
  [{ value: "At the base of the tree" }, { value: "ants, ...", editable: true }],
  [{ value: "On the trunk" }, { value: "", editable: true }],
  [{ value: "Between the branches" }, { value: "monkeys, ...", editable: true }],
  [{ value: "On or within leaves" }, { value: "", editable: true }],
];

export function C6ScienceCh6Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            There are several aquatic habitats on earth, from very small ones like ponds, ditches pools,
            small garden pools, pools that form after rain and large ones like saltwater lakes, rivers,
            seas etc.
          </p>

          <h2 className="font-heading text-base font-bold text-emerald-805 pt-2">6.3. Tree as a habitat :</h2>
          <p>Plant/Tree is also a habitat same as pond. Now, let us study a plant or a tree as habitat.</p>
          <p>
            Birds, monkeys, squirrels, snakes, ants, spiders, caterpillars, moths, bees, wasps, small
            plants (mosses), mosquito, are some organisms that you may find on a tree. Try to classify
            them based on where you find them in table 2. Add some more examples that you know:
          </p>

          <FillInTable
            title="Table 2"
            columns={["", ""]}
            rows={TABLE2_ROWS}
            storageKey="c6-science-ch6-table2"
          />

          <p className="pt-2 text-foreground/75 italic">Take the help of Fig. 3 if needed.</p>
          <p>
            Now try to explore the types of organisms that you may see living on a tree or even a
            medium sized plant found in your surroundings.
          </p>

          <h2 className="font-heading text-base font-bold text-emerald-805 pt-2">Activity-3:</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Select a tree/plant in your school (you may work in a group of 4-5 students of your class).</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch6_fig3.png"
              alt="Fig. 3 — Organisms distribution levels on a tree"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 3
            </p>
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 pt-2">
            <li>Observe the tree that you have selected over a period of time, say a week, by visiting it atleast two different times a day. Do this everyday.</li>
            <li>Let each member of your group note the observations individually whenever they can.</li>
          </ul>

          <p className="pt-2 font-semibold text-emerald-800">Note the following :</p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Make a list of all the organisms seen by you on your first visit. Add the names of organisms that you may find in your next visits.</li>
            <li>Make a rough sketch of the tree in your note book and mark the places on the tree where you spot these organisms. Take the help of Fig. 3.</li>
          </ul>

          <p className="pt-2 font-semibold text-emerald-800">Based on your exploration find out the following :</p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Did you find some small plants growing on the tree? (You can look for a green velvety growth for this).</li>
          </ul>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Coral reefs that stretches for miles at the bottom of the sea is also a habitat.</TipBox>
      </div>
    </div>
  );
}
