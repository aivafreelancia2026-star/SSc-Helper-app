import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh13Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">
            A, B, C are three students reading a scale by keeping their eye in three different
            positions as shown in Fig. 9. Among them, position of B is correct as her eye is vertically
            above the point of measurement.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig9.png"
              alt="Fig. 9 — Three students viewing ruler from angles A, B, and C"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 9
            </p>
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium pt-2">
            <li>Don&apos;t we get proper measure by viewing from A and C places? Why?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-sky-850 pt-2">
            Precautions while using a metre scale
          </h2>
          <p className="text-xs">
            We must take the following precautions while using a metre scale for measuring length :
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[160px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig10.png"
              alt="Fig. 10 — Placing the ruler flat on a wooden box"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 10
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <ol className="list-decimal space-y-2 pl-5 text-foreground/85 text-xs">
            <li>The scale should be placed exactly along the length to be measured.</li>
            <li>Zero point on the scale should coincide with the starting point of the length to be measured.</li>
            <li>Our eye must be vertically above the point of coincidence of scale where the measurement is to be taken.</li>
            <li>Ensure that the ends of the scale are not worn out.</li>
            <li>Measure the length of an object more than two times and then take the average of these measurements for accuracy.</li>
          </ol>

          <div className="rounded-[16px] border border-sky-100 bg-white/70 p-4">
            <p className="font-heading text-xs font-bold text-sky-900 uppercase tracking-wider">Think!</p>
            <p className="mt-1 font-body text-xs text-foreground/80">
              What can you do to know a scale is accurate or not?
            </p>
          </div>

          <h2 className="font-heading text-base font-bold text-sky-800 pt-2">
            13.4. How can we measure a small thickness?
          </h2>
          <p className="text-xs">
            Can you accurately measure the thickness of the cover page of your text book or a coin using
            the scale?
          </p>
          <p className="text-xs">
            If we want to measure the thickness of a page of notebook or a coin it is not possible to
            directly use a scale.
          </p>
          <p className="text-xs">
            Let us look at the method to measure the thickness of a coin.
          </p>

          <h3 className="font-heading text-sm font-bold text-sky-805 pt-2">
            Activity-3: Measuring thickness of a coin
          </h3>
          <p className="text-xs">
            Take about 10 one rupee coins of same size and place them one upon the other as shown in Fig. 11.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>The Arthashastra offers a wealth of evidence for the wide varieties of standardized weights and measures of the time.</TipBox>
      </div>
    </div>
  );
}
