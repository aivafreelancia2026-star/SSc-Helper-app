import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh15Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Where do you find the shadow of the book in the room?</li>
          </ul>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[150px] mx-auto">
            <img
              src="/assets/images/C6-science/ch15_fig3.png"
              alt="Fig. 3 — Boy holding book casting shadow on wall screen"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 3
            </p>
          </div>

          <p className="text-xs pt-2">
            Now put the torch under the book at a distance of about 30 cm as shown in Fig. 4.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Where do you find the shadow of the book this time?</li>
          </ul>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[100px] mx-auto">
            <img
              src="/assets/images/C6-science/ch15_fig4.png"
              alt="Fig. 4 — Girl casting book shadow on the ceiling by holding torch below"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 4
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <p className="text-xs">
            Do the same activity, in open air (outside) at night. Where are the shadows formed in this
            situation? Do you see a shadow in open air when the torch is under the book? If not, why? As
            shown in Fig.5, place a drawing sheet or a plank at a distance of 1 m. above the book and try to
            find the shadow of the book.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[160px] mx-auto">
            <img
              src="/assets/images/C6-science/ch15_fig5.png"
              alt="Fig. 5 — Children holding drawing sheet plank above book in dark field to get shadow"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 5
            </p>
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium pt-2">
            <li>Now, Did you see the shadow of the book? Where is the shadow formed? Do you find the shadow of the book if you remove the sheet?</li>
            <li>What do you understand from the above activity?</li>
          </ul>
          <p className="text-xs">
            We understand that only light and opaque object are not enough to form the shadow of an
            object. In addition to these, we need a screen. In the above activity, we used a drawing sheet
            or plank to get the shadow.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>When you turn on a light bulb only 10 per cent of the electricity used is turned into light, the other 90 per cent is wasted as heat.</TipBox>
      </div>
    </div>
  );
}
