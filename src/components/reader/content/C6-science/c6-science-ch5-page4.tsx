import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

const TABLE4_DATA: [string, string[]][] = [
  ["Plastic", ["Transparent", "Opaque"]],
  ["Glass jar", ["Transparent"]],
  ["Steel plate", ["Opaque"]],
  ["Mirror", ["Opaque"]],
  ["Wooden door", ["Opaque"]],
  ["Polythene bag", ["Transparent", "Translucent"]],
  ["Paper", ["Opaque"]],
];

const TABLE4_ROWS: TableCell[][] = TABLE4_DATA.map(([object, answers]) => [
  { value: object },
  { value: "", editable: true, correctAnswers: answers },
]);

export function C6ScienceCh5Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="font-heading text-base font-bold text-indigo-800">5.2. Properties of Materials :</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What type of material can you use to make a window when you don&apos;t want someone to see through it?</li>
            <li>What type of material can you use to make a window when you want to see through it?</li>
            <li>Can you make a cricket ball with soil or glass? Why?</li>
            <li>Can you make a chair with glass or mud? Why?</li>
          </ul>

          <p className="pt-2">Let us examine the properties of materials and their usage. We begin with properties of material that we easily recognize.</p>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">5.3. Transparency :</h2>
          <p>
            Why do shop keepers usually store eatables like sweets and biscuits in glass jars? The
            shopkeeper wants his customers to be able to see these items! We all know that we can
            easily see through glass. Such materials are said to be <strong>transparent.</strong>
          </p>
          <p>Can you see through plastic? Can you see through wood?</p>
          <p>
            We cannot see through some materials like wood, steel, card board. Such materials are said
            to be <strong>opaque.</strong>
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-indigo-800">
            Activity-3: Identifying transparent and opaque materials.
          </h2>
          <p className="text-xs text-foreground/75 italic">Identify the transparent and opaque objects from the table - 4.</p>

          <FillInTable
            title="Table 4"
            columns={["Objects", "Transparent or Opaque"]}
            rows={TABLE4_ROWS}
            storageKey="c6-science-ch5-table4"
          />

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch5_fig4.png"
              alt="Fig. 4 — A shopkeeper storing sweets in glass jars"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 4
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Water has a density of 1g/ml therefore if you had an object with a density less than 1g/ml, it will float.</TipBox>
      </div>
    </div>
  );
}
