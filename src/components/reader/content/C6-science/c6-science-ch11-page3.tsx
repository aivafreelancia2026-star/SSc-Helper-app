import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

const TABLE1_ROWS: TableCell[][] = [
  [{ value: "Drinking" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "Toilets" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "Bathing" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "Washing clothes" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "Otherworks" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "Total" }, { value: "", editable: true }, { value: "", editable: true }],
];

export function C6ScienceCh11Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="font-heading text-base font-bold text-indigo-805">
            Activity-2: Quantity of water
          </h2>
          <p>
            Collect different used water bottles or water pouches from nearby shops. Observe their labels.
            What quantity of water is mentioned on the label? Record your observations in your notebook.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Do all the bottles and pouches have the same quantity of water?</li>
            <li>You can also ask the water-vendor how much water there is in a water can or bottle.</li>
          </ul>

          <CalloutBox title="Do you know?">
            <p className="text-xs text-foreground/80 leading-relaxed">
              Volume of water and other liquids is measured in litres and millilitres. The water tanks
              in some villages and most towns and cities have the capacity to store gallons of water.
              Gallon is also a measure of volume of liquids.
            </p>
            <p className="text-xs text-foreground/80 leading-relaxed mt-2">
              Water level in the reservoirs is measured in feet. Water released from dams and projects
              during floods is measured in cusecs (cusec = cubic foot/sec).
            </p>
          </CalloutBox>

          <div className="rounded-[16px] border border-indigo-100 bg-white/70 p-4">
            <p className="font-heading text-xs font-bold text-indigo-900 uppercase tracking-wider">Think:</p>
            <p className="mt-1 font-body text-xs text-foreground/80">
              Air and water are freely available in nature but now people have to pay for water along
              with other commodities.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <p>Find out from your parents and grandparents whether they also paid for water.</p>

          <h2 className="font-heading text-base font-bold text-indigo-805 pt-2">
            Activity-3: How much water do we use daily?
          </h2>
          <p>
            We use water for different purposes. Can you estimate how much water your family uses in a
            day? Can you guess?
          </p>
          <p>
            Record your estimates in table 1. Also think how you could reduce the amount of water used
            and write how much water you can save.
          </p>

          <FillInTable
            title="Table 1"
            columns={["Work", "Water used (In litres)", "How much water can you save? (In litres)"]}
            rows={TABLE1_ROWS}
            storageKey="c6-science-ch11-table1"
          />

          <p className="pt-2">
            To estimate in litres the amount of water used, take any 1 litre bottle and find out how
            many bottles of water are needed to fill a bucket, a glass, a mug etc. Now, find out how much
            water is used in a whole day by you.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>43% of water related deaths are due to diarrhoea.</TipBox>
      </div>
    </div>
  );
}
