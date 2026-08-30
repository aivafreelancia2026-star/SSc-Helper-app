import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh15Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Were you able to make a square shaped shadow?</li>
            <li>Were you able to make a triangular shadow?</li>
            <li>Were you able to make a circular shadow?</li>
            <li>What are the other possible shapes?</li>
            <li>Why are we getting different shapes of shadows when the object is same?</li>
          </ul>
          
          <p className="text-xs">
            Because of the straight line path followed by light rays, we can get different shaped shadows
            for a single object by changing its position.
          </p>
          <p className="text-xs">
            The nature of straight line motion of light can also be understood by pinhole camera.
          </p>
          <p className="text-xs font-semibold text-sky-950">
            Did you ever hear about a pinhole camera?
          </p>
          <p className="text-xs">
            With this camera we can observe a big object through a pinhole. Isn&apos;t it interesting? Let&apos;s
            make a pinhole camera.
          </p>

          <h3 className="font-heading text-base font-bold text-sky-805 pt-2">
            15.3. Making a pinhole camera
          </h3>
          <p className="text-xs font-bold text-sky-900">Activity-7:</p>
          <p className="text-xs font-semibold">Materials required:</p>
          <ul className="list-disc space-y-1 pl-5 text-foreground/80 text-xs">
            <li>A pvc pipe, about 8 cm in diameter and of length 30 cm.</li>
            <li>A pvc pipe, about 7 cm in diameter and of length 30 cm.</li>
            <li>One black drawing sheet.</li>
            <li>Oil - 1 ml, two rubber bands, a pin, and white paper (A4 size).</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <p className="text-xs text-foreground/75 italic">
            (If you cannot get pvc pipes, take a thick sheet of paper and roll it to form tubes. The diameter
            and length of the tubes should be the same as that given for the pipes.)
          </p>
          <p className="text-xs">
            Cut a piece of black paper and put it like a cap at one end of the big pvc pipe and fix it with a
            rubber band as shown in Fig. 10(a). Put the white paper like a cap at one end of the thinner pvc
            pipe. Fix it with a rubber band as shown in Fig. 10(a). Now make a hole in the middle of black paper
            cap with the help of a pin. Put 2 to 3 drops of oil on the white paper cap so that it becomes
            translucent.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[120px] mx-auto">
            <img
              src="/assets/images/C6-science/ch15_fig10_a.png"
              alt="Fig. 10(a) — PVC tubes with paper cap covers and rubber bands model"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 10(a)
            </p>
          </div>

          <p className="text-xs">
            Insert the thin pipe into the big pipe. Your pinhole camera is ready.
          </p>
          <p className="text-xs">
            Arrange a lighted candle in front of the pinhole of the camera. Move the thinner pipe forward and
            backward to get a clear picture of the candle on the screen of the thin pipe. This picture is to
            be observed from the back of the thin pipe (see figure 10b).
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[160px] mx-auto">
            <img
              src="/assets/images/C6-science/ch15_fig10_b.png"
              alt="Fig. 10(b) — Boy looking through pinhole camera at a lighted candle"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 10(b)
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Sunlight can reach a depth of around 80 metres (262 feet) in the ocean.</TipBox>
      </div>
    </div>
  );
}
