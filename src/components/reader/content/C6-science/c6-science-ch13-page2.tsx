import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE1_ROWS: TableCell[][] = Array.from({ length: 5 }, (_, i) => [
  { value: `${i + 1}.` },
  { value: "", editable: true },
  { value: "", editable: true },
]);

const TABLE2_ROWS: TableCell[][] = Array.from({ length: 5 }, (_, i) => [
  { value: `${i + 1}.` },
  { value: "", editable: true },
  { value: "", editable: true },
]);

export function C6ScienceCh13Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig3.png"
              alt="Fig. 3 — Hand-span measurement on table surface"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 3
            </p>
          </div>

          <FillInTable
            title="Table 1"
            columns={["S. No.", "Name of the student", "Number of hand-spans"]}
            rows={TABLE1_ROWS}
            storageKey="c6-science-ch13-table1"
          />

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Do all of you get the same number of hand-spans for the length of the table?</li>
            <li>Who got more number of hand-spans? Why?</li>
            <li>Why is there a difference in number of hand spans though you measured the same table?</li>
          </ul>

          <p className="pt-2 text-xs">
            Now find the length of your classroom using your foot-span. Ask your classmates to do the
            same. Enter your observations in terms of number of foot-spans in table 2 :
          </p>

          <FillInTable
            title="Table 2"
            columns={["S. No.", "Name of the student", "Number of foot-spans"]}
            rows={TABLE2_ROWS}
            storageKey="c6-science-ch13-table2"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Is the number of foot-spans same when different students measure the length of class room?</li>
            <li>Who got more number of foot-spans? Why?</li>
            <li>Who got least number of foot-spans? Why?</li>
          </ul>

          <p className="text-xs">
            We do not get the same measurements in two cases mentioned above because the hand-spans /
            foot-spans are not same for each one of us.
          </p>
          <p className="text-xs">
            We often use these type of conventional methods to measure certain lengths. For example,
            cubits for measuring the length of a string of flowers and strides for measuring length and
            breadth of a playground. Similarly, we use another system of measurement while playing
            &apos;silla gona&apos; (gilli danda), where the length of the stick is used as the unit to
            measure the desired distance.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig4.png"
              alt="Fig. 4 — Conventional metrics showing Foot-span, Hand-span, and Cubit"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 4
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>The Danyang-Kunshan Grand Bridge is the world&apos;s longest bridge. It is a 164.8 kilometres (102.4 mi) long.</TipBox>
      </div>
    </div>
  );
}
