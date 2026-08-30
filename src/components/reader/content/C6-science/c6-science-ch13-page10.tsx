import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh13Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">
            Each small square on this graph paper has a side equal to 1 cm. The area of each small square on
            this graph paper is 1 cm².
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig15.png"
              alt="Fig. 15 — Labeled rectangle cardboard card PQRS placed on grid sheet graph paper"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 15
            </p>
          </div>

          <p className="text-xs pt-2">
            Place the cardboard on the centimetre graph paper as shown in Fig. 15 and draw its outline
            with the help of a sharp pencil. Now remove the cardboard and mark the shape as PQRS. Count the
            number of squares inside the outline. The number of squares is 8.
          </p>
          <p className="text-xs">
            Area of the cardboard is equal to the area covered by PQRS on the graph paper.
          </p>
          
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 font-mono text-xs text-sky-950 space-y-1">
            <p>Area of PQRS = Total area of unit squares inside the PQRS</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = 8 × area of 1 unit square</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = 8 × 1cm²</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = 8 cm²</p>
          </div>

          <p className="text-xs">
            In this case, the cardboard we used has a regular shape - rectangle.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Can you relate this method of measuring area of cardboard to some formula of finding area?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-sky-805 pt-2">
            Activity-6: Measurement of the area of an irregular plane surface
          </h2>
          <p className="text-xs">
            Let us find out the area of an irregular surface. Take a leaf, which has irregular shape.
            Place the leaf on a graph paper as shown in Fig. 16. Mark the boundary of the leaf on the
            graph paper with a pencil. Now remove the leaf to find the outline or boundary of the leaf on
            graph paper.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[140px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig16.png"
              alt="Fig. 16 — Outline boundary of an irregular leaf traced on graph paper with a pencil"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 16
            </p>
          </div>

          <p className="text-xs pt-2">
            Count the number of complete squares (each of 1 cm² area) inside the boundary. Also count
            those squares, inside the boundary, which are half or greater than half. Add this to the number
            of complete squares.
          </p>
          <p className="text-xs">
            This total number of squares inside the boundary gives the area of the leaf. If there are
            &apos;n&apos; squares inside the boundary, the area of the leaf becomes &apos;n&apos; cm².
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>1 mile is equal to 1.61 kms</TipBox>
      </div>
    </div>
  );
}
