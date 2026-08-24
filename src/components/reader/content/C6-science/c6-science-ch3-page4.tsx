import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh3Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="font-heading text-base font-bold text-primary">Activity-1: Condensation</h2>
          <p>Take some water in a glass. Add some pieces of ice to it. Observe for few minutes.</p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[160px] mx-auto">
            <img
              src="/assets/images/C6-science/ch3_fig8.png"
              alt="Fig. 8 — A glass of water with ice cubes"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              (Fig. 8)
            </p>
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What changes do you observe on the outer surface of the glass?</li>
          </ul>
          <p>You would observe formation of small drops of water on the outer surface of the glass.</p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Why are these drops formed?</li>
            <li>Do drops form if there is no ice in the glass?</li>
          </ul>
          <p>
            Ice-cold water in the glass cools the glass surface. Air around the glass contains water
            vapour which is warmer than the surface of the glass. Due to the cold glass, air close to
            its surface will also become cooler. This changes the water vapour in the air around the
            surface of the glass into water and forms small drops on the outer surface of glass.
          </p>
          <p>Have you ever observed in your daily life where water vapour changes into water? List out them.</p>
          <p>
            <strong>The process of conversion of water vapour into water is called &quot;condensation&quot;.</strong>
          </p>

          <h2 className="font-heading text-base font-bold text-primary pt-2">Clouds and rain</h2>
          <p>
            On a warm day, the sun heats up the ground as well as the water in seas, oceans, rivers,
            ponds etc. This water converts into water vapour by the process of evaporation.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch3_fig9.png"
              alt="Fig. 9 : Water cycle"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 9 : Water cycle
            </p>
          </div>

          <p className="pt-2">
            This water vapour rises up into the atmosphere, as it is lighter than air. As air moves away
            from the surface of the earth, it becomes cooler and cooler. When water vapour reaches
            higher levels it condenses due to contact with cool air and forms small water droplets.
            These tiny droplets remain floating in air at higher levels of the atmosphere and appear as
            clouds.
          </p>

          <h2 className="font-heading text-base font-bold text-primary pt-2">Activity-2: Clouds in kitchen</h2>
          <p>Take a vessel filled with water. Keep it on a stove and heat it slowly (Fig.10).</p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch3_fig10.png"
              alt="Fig. 10 — A vessel of water heating on a stove"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 10
            </p>
          </div>

          <p className="pt-2">
            Observe for some time. Now cover the vessel with a plate. Remove the plate after a couple of
            minutes. Do you see any changes on the inner surface of the plate?
          </p>
          <p>
            Can water droplets formed on the inner surface of the plate be compared with rain drops.
            Pour some cool water on the plate and observe what happens.
          </p>
          <p>From both the activities discussed above, we know that water vapour helps to form clouds.</p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>
          Egyptians designed umbrella to protect themselves from sun. Later on it was also used to
          protect from rain.
        </TipBox>
      </div>
    </div>
  );
}
