import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE1_ROWS: TableCell[][] = [
  [{ value: "Objects which form shadows" }, { value: "", editable: true }],
  [{ value: "Objects which don't form shadows" }, { value: "", editable: true }],
  [{ value: "Objects which form unclear shadows" }, { value: "", editable: true }],
];

export function C6ScienceCh15Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Fig 2 and description */}
      <div className="space-y-4">
        <p className="text-xs">
          Observe Fig. 2. Write whether the sheet held by the boy is transparent, translucent or opaque
          below each of the pictures.
        </p>

        <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[280px] mx-auto">
          <img
            src="/assets/images/C6-science/ch15_fig2.png"
            alt="Fig. 2 — Boy holding opaque, transparent, and translucent sheets over face"
            className="max-w-full h-auto"
          />
          <div className="flex justify-between w-full text-[10px] text-foreground/50 px-6 font-semibold pt-1">
            <span>. . . . . . . . .</span>
            <span>. . . . . . . . .</span>
            <span>. . . . . . . . .</span>
          </div>
          <p className="text-center font-body text-xs italic text-foreground/50 mt-1 font-semibold">
            Fig. 2
          </p>
        </div>

        <p className="text-xs pt-2">
          Think, guess and write in table 1 which objects in your classroom and at home form shadows, which
          do not form shadows and which form an unclear shadow.
        </p>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <FillInTable
            title="Table 1"
            columns={["Classification of Objects", "Examples"]}
            rows={TABLE1_ROWS}
            storageKey="c6-science-ch15-table1"
          />

          <p className="text-xs">
            Check the above objects in sunlight to verify your guess and make corrections in table 1 if needed.
            After checking, give your own examples for transparent, translucent and opaque substances.
          </p>
          <div className="space-y-1.5 pt-2 text-xs">
            <p><strong>Transparent Substances:</strong> ___________________________________</p>
            <p><strong>Opaque Substances:</strong> ___________________________________</p>
            <p><strong>Translucent Substances:</strong> ___________________________________</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <p className="text-xs">
            Thus we see that all objects do not form shadows. Only opaque objects form shadows. We need a
            source of light and an opaque object to get a shadow.
          </p>
          <p className="text-xs">
            Are sources of light and an opaque object enough to get shadows? Do we need something more?
          </p>

          <h3 className="font-heading text-base font-bold text-sky-805 pt-2">
            Activity-3 :
          </h3>
          <p className="text-xs">
            Do this activity in a dark room with a torch and a book. Focus the light on the book with a torch
            as shown in Fig. 3 (keep the distance about 30 cm between the book and the torch).
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>When sunlight is intercepted by a drop of water in the atmosphere it gives RAINBOW</TipBox>
      </div>
    </div>
  );
}
