import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE5_ROWS: TableCell[][] = Array.from({ length: 3 }, (_, i) => [
  { value: `${i + 1}.` },
  { value: "", editable: true },
  { value: "", editable: true },
]);

const TABLE6_ROWS: TableCell[][] = Array.from({ length: 3 }, (_, i) => [
  { value: `${i + 1}.` },
  { value: "", editable: true },
  { value: "", editable: true },
]);

const TABLE7_ROWS: TableCell[][] = Array.from({ length: 3 }, (_, i) => [
  { value: `${i + 1}.` },
  { value: "", editable: true },
  { value: "", editable: true },
]);

export function C6ScienceCh10Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="font-heading text-base font-bold text-indigo-805">
            Activity-6: Categorizing changes
          </h2>
          <p>
            Table 4 describes some changes. Study the changes, discuss in groups with your friends and
            state the category of each change by writing &apos;yes&apos; or &apos;no&apos; in relevant
            columns.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>How many changes are natural?</li>
            <li>How many changes are man-made?</li>
            <li>How many changes are temporary?</li>
            <li>How many changes are permanent?</li>
            <li>How many changes are slow?</li>
            <li>How many changes are fast?</li>
          </ul>

          <p className="pt-2">List them in tables 5, 6 &amp; 7</p>

          <FillInTable
            title="Table 5"
            columns={["S. No.", "Slow Change", "Fast Change"]}
            rows={TABLE5_ROWS}
            storageKey="c6-science-ch10-table5"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <FillInTable
            title="Table 6"
            columns={["S. No.", "Permanent Change", "Temporary Change"]}
            rows={TABLE6_ROWS}
            storageKey="c6-science-ch10-table6"
          />

          <FillInTable
            title="Table 7"
            columns={["S. No.", "Natural Change", "Man made Change"]}
            rows={TABLE7_ROWS}
            storageKey="c6-science-ch10-table7"
          />

          <p className="pt-2">
            In this activity we have categorized ten changes in three ways - slow/ fast, permanent/temporary
            and natural/ man-made.
          </p>
          
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>
              In addition to these are there any other properties by which you can categorize the above
              changes?
            </li>
          </ul>
          <p>
            Discuss with your friends and list properties other than those mentioned above for
            categorization. Prepare a new table for grouping.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Firing of crackers during deepavali is an example of chemical change.</TipBox>
      </div>
    </div>
  );
}
