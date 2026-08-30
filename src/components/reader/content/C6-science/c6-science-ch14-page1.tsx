import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE1_ROWS: TableCell[][] = [
  [{ value: "1" }, { value: "Neck" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "2" }, { value: "Wrist" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "3" }, { value: "Finger" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "4" }, { value: "Knee" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "5" }, { value: "Ankle" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "6" }, { value: "Toe" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
];

export function C6ScienceCh14Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Chapter 14 Banner (Emerald Green Theme for Biology) */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-double border-emerald-400/60 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block rounded-full bg-emerald-200/60 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-800 uppercase">
              Chapter 14
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-emerald-950 sm:text-3xl">
              Movements in Animals
            </h1>
          </div>
          <div className="flex flex-col items-center border border-emerald-200 rounded p-1.5 bg-white shadow-xs">
            <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-emerald-600 mb-1">QR CODE</span>
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700 font-mono select-none">
              T1R5K5
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            While doing physical exercise we move our body parts in different ways. We lift and bend our
            legs, hands and other body parts. We can also rotate some parts of our body Have you ever
            noticed how we are able to move this way? What parts of our body are responsible for these
            movements?
          </p>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">
            14. Movements in Animals
          </h2>
          <p className="text-xs">
            Usually, when we have to go a short distance from one place to another, we walk or run. But
            how do animals like fish, snails, snakes etc. move their body or move from one place to
            another? Can all animal move their body parts like us? Let us look closely at some of our own
            movements.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-emerald-850">
            Activity-1: Human body and its movement
          </h2>
          <p className="italic text-foreground/75 text-xs">
            Do the following actions. Observe the movements in the body.
          </p>
          <p className="text-xs">
            Bowl an imaginary ball at an imaginary wicket. Lie down and try to rotate your leg at the hip.
            Bend your arm at the elbow and your leg at the knee. Stretch your arms sideways, chew some
            food, bend your arm to touch your shoulder with your finger and try to move other body parts
            as well. Record your observations in table 1.
          </p>

          <FillInTable
            title="Table 1"
            columns={["S. No.", "Body Part", "Rotates Partially/Completely", "Bends (Yes/No)", "Lifts up, down (Yes/No)", "Moves back and front (Yes/No)"]}
            rows={TABLE1_ROWS}
            storageKey="c6-science-ch14-table1"
          />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>The cheetah (Acinonyx jubatus) is one of the fastest mammals found in the animal kingdom. It runs at a speed of 97 km per hour.</TipBox>
      </div>
    </div>
  );
}
