import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh12Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Chapter 12 Banner */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-double border-sky-400/60 bg-gradient-to-br from-sky-50 to-sky-100/50 p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block rounded-full bg-sky-200/60 px-3 py-1 text-xs font-semibold tracking-wider text-sky-800 uppercase">
              Chapter 12
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-sky-950 sm:text-3xl">
              Simple Electric Circuits
            </h1>
          </div>
          <div className="flex flex-col items-center border border-sky-200 rounded p-1.5 bg-white shadow-xs">
            <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-sky-600 mb-1">QR CODE</span>
            <div className="w-12 h-12 bg-sky-50 border border-sky-100 flex items-center justify-center text-[10px] font-bold text-sky-700 font-mono select-none">
              P7T4D6
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Niharika&apos;s father Ranganna had to go to the fields after dinner. Watering the field in the
            night had become a usual practice due to power cuts throughout the day. Ranganna walked out of the
            house and called Niharika asking for a torch-light. She took the torch and cells out from the
            cupboard and handed over the torch-light to her father after inserting the cells. He switched on
            the torch but it did not light up.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Why it did not light up?</li>
            <li>What could be the problem?</li>
          </ul>
          <p>
            Was there something wrong with the torch-light? Niharika took back the torch and opened it and
            realised her mistake. She had inserted the cells in a wrong way. She changed the position of the
            cells and handed over the working torch-light to her father.
          </p>

          <h2 className="font-heading text-base font-bold text-sky-800 pt-2">
            12.1. Cell
          </h2>
          <p>
            Why does the position of cells affect the working of a torch-light?
          </p>
          <p>
            What does a cell contain? How does it help the torch light glow? Now let us take a cell and
            observe it carefully.
          </p>
          
          <h2 className="font-heading text-base font-bold text-sky-805 pt-2">
            Activity-1: Observe the cell
          </h2>
          <p className="italic text-foreground/75 text-xs">
            Let us take a torch cell (Fig. 2) and observe it. Can you describe it? Write your observations
            in your notebook.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[240px] mx-auto">
            <img
              src="/assets/images/C6-science/ch12_fig1.png"
              alt="Fig. 1 — Niharika giving a torch to her father Ranganna"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 1
            </p>
          </div>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[160px] mx-auto">
            <img
              src="/assets/images/C6-science/ch12_fig2.png"
              alt="Fig. 2 — Dry cell battery cylinder"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 2
            </p>
          </div>

          <p className="pt-2 text-xs">
            The cell consists of a cylindrical metal can. Its heaviness suggests that it is filled with some
            chemicals. The protrusion on one end is due to a carbon rod in the centre. At the top of the
            cell a metal cap is fixed. The entire can is sealed.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Greek philosopher Thales of Miletus (c.624-546 BCE) discovered static electricity.</TipBox>
      </div>
    </div>
  );
}
