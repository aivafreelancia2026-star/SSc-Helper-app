import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh13Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="font-heading text-base font-bold text-sky-805">
            Activity-5: Observe the drawing chart figures given below
          </h2>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[220px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig13.png"
              alt="Fig. 13 — Drawing chart A (blue) vs Drawing chart B (red) irregular polygon shapes"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 13
            </p>
          </div>

          <p className="text-xs pt-2">
            By seeing drawing charts given in Fig. 13. Can you decide which is the bigger and which is
            the smaller?
          </p>
          <p className="text-xs">
            If not, what method do you adopt to decide the bigger one or smaller one?
          </p>
          
          <p className="font-bold text-sky-850">Let us do:</p>
          <p className="text-xs">
            Take two sheets of A4 paper and cut them in the shapes as shown in Fig. 13. Now take some
            empty matchboxes of equal size and keep them on the sheet. Starting from one corner of the
            sheet, count how many matchboxes are needed to cover the entire surface of the sheet.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Which paper sheet needed more number of matchboxes?</li>
            <li>From this can you decide which paper sheet is bigger?</li>
          </ul>
          <p className="text-xs">
            You may find that one of the sheets needs more number of matchboxes which shows that one
            sheet is bigger in size than the other.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <p className="text-xs">
            Thus, we need to measure the surface of an object to decide whether it is bigger or smaller.
          </p>
          <p className="text-xs font-semibold text-sky-900">
            Area is the measure of the extent of plane surface occupied by an object.
          </p>
          <p className="text-xs">
            In the above activity, a matchbox is taken as a unit to measure area but it is not a
            standard unit. We need a standard unit to measure the area.
          </p>

          <h2 className="font-heading text-base font-bold text-sky-800 pt-2">
            13.6. What is the standard unit to measure area?
          </h2>
          <p className="text-xs">
            Observe Fig. 14. In each figure, vertical and horizontal lines divide the surface into
            certain number of parts.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[220px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig14.png"
              alt="Fig. 14 — Grid sheets: (a) square 4x4 layout, (b) narrow rectangular 2x8 layout"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 14: Grid layouts (a) and (b)
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>The Republic of India adopted the metric system on April 1, 1957.</TipBox>
      </div>
    </div>
  );
}
