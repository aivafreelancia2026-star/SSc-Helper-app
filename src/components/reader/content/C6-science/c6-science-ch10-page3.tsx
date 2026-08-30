import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

const TABLE1_ROWS: TableCell[][] = [
  [{ value: "1" }, { value: "Milk" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "2" }, { value: "Curd" }, { value: "", editable: true }, { value: "", editable: true }],
];

export function C6ScienceCh10Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            You may notice that milk is somewhat sweet and curd can be slightly or highly sour in taste.
          </p>

          <CalloutBox title="Precautions">
            <p className="text-xs text-foreground/80 leading-relaxed">
              Do not try to taste any substance until you know what it is and its properties. Tasting
              of some substances can be hazardous to health. The test for taste is to be done only under
              the guidance of teacher and for substances we know are safe.
            </p>
          </CalloutBox>

          <p className="pt-2">
            Touch the milk and the curd with your finger to know their state. You will notice that
            milk is in liquid form. Guess the state of curd. Observe. Curd is neither in solid state
            nor in liquid state.
          </p>
          <p>What do you call this State of material?</p>
          <p>
            The curd is in semi-solid form. Now measure the level of milk in a bowl and its weight. Then
            measure the level of the curd and its weight in the bowl.
          </p>
          <p className="italic text-foreground/75 text-xs">
            Write the values of measurement in table-1
          </p>

          <FillInTable
            title="Table 1"
            columns={["S.No.", "Substance", "Level in bowl", "Weight"]}
            rows={TABLE1_ROWS}
            storageKey="c6-science-ch10-table1"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <p>Compare the measurements, what do you notice?</p>
          <p>
            From this activity, we find that there are changes in milk when it becomes curd. These include
            change in the colour, taste and in the state. These indicators of change explain that a change
            has taken place from milk to curd.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What can be the reasons for this change?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">
            Activity-2: Finding the conditions for making curd
          </h2>
          <p>
            Take three equal volumes of empty bowls with lids as shown in Fig. 2.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch10_fig2.png"
              alt="Fig. 2 — Bowl-1, Bowl-2, Bowl-3 for curd making"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 2
            </p>
          </div>

          <p className="pt-2">
            Add some ice-cold milk to bowl 1 and same quantity of some warm milk to the bowls- 2 and
            3. Then add small quantity of curd to the bowls 1 and 2.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>The change of state from liquid to solid is called solidification.</TipBox>
      </div>
    </div>
  );
}
