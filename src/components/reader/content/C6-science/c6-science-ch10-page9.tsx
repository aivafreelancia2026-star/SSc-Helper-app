import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE4_ROWS: TableCell[][] = [
  [{ value: "1" }, { value: "Change from milk to curd" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "2" }, { value: "Change in seasons" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "3" }, { value: "Change of ice into water and water into ice" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "4" }, { value: "Rusting of iron" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "5" }, { value: "Growth in plants" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "6" }, { value: "Rice to cooked rice" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "7" }, { value: "Melting of ice-cream" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "8" }, { value: "Egg to boiled egg" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "9" }, { value: "Electric bulb on and off" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "10" }, { value: "Changes in leaves of 'Touch me not'" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
];

export function C6ScienceCh10Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            from winter to summer and summer to rains then rains to winter are continuous. Thus we get
            winter again. Change of milk into curd is a permanent one, because we cannot get back milk
            from curd.
          </p>
          <p>
            The comparision shows that it is possible to classify certain changes as slow or fast, natural
            or man-made and temporary or permanent.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Can you think of any other basis for categorization of changes?</li>
          </ul>
          <p>
            Write the indicators and causes for the other changes given below. You may not be able to write
            the causes of all changes. Try to discuss with your friends and elders to know the causes.
          </p>
        </div>

      </div>

      {/* Table 4 Spanning Full Width */}
      <div className="pt-2">
        <FillInTable
          title="Table 4"
          columns={["S. No.", "Change", "Natural", "Man made", "Temporary", "Permanent", "Changes state", "Changes shape"]}
          rows={TABLE4_ROWS}
          storageKey="c6-science-ch10-table4"
        />
      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Coal, oil and gas are called &ldquo;fossil fuels&rdquo; because they have been formed from the organic remains of prehistoric plants and animals.</TipBox>
      </div>
    </div>
  );
}
