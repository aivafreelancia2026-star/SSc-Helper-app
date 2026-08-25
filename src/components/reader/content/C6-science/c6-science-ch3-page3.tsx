import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh3Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            That means the amount of heat absorbed by water affects its evaporation. If water is heated
            more, it will evaporate faster.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>You might have observed evaporation in many situations in day-to-day life. Discuss them with your friends and prepare a list.</li>
          </ul>
          <p>
            Evaporation is a natural process which takes place on the Earth. Water evaporates
            continuously from the surfaces of water bodies like seas, oceans, rivers, ponds etc. water
            changes into water vapour from these water bodies due to the sunlight and air.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Where does this water vapour go after evaporation?</li>
          </ul>
          <p>The water vapour formed due to evaporation becomes a part of air and like air it cannot be seen.</p>
          <p>The water vapour which enters into air through the process of evaporation forms clouds in the sky.</p>
          
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What is a cloud?</li>
            <li>How are clouds formed?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-primary pt-2">3.3. Condensation</h2>
          <p>
            It is our common experience that on cold winter mornings when we speak, we observe
            smoke-like vapour coming out of our mouth.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Why does smoke-like vapour come out of our mouth in winter?</li>
            <li>Do we experience this in summer as well?</li>
          </ul>

          <p>
            In winter, the air in our atmosphere is very cool as compared to the air coming out from our
            mouth. Water vapour present in the air coming out from our mouth gets cooled suddenly to
            form very tiny droplets. These tiny droplets concentrated in a limited area, appear like
            smoke or a small cloud near our mouth.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch3_fig6.png"
              alt="Fig. 6 — Breath vapour"
              className="max-w-full h-auto rounded-lg shadow-sm max-h-[140px]"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 6
            </p>
          </div>

          <p className="pt-2">You might have observed that during mornings in winter, small dew drops appear on grass, leaves of plants (fig. 7).</p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>From where do these water drops come on to the leaves and grass?</li>
          </ul>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch3_fig7.png"
              alt="Fig. 7 : Dew on grass"
              className="max-w-full h-auto rounded-lg shadow-sm max-h-[140px]"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 7 : Dew on grass
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Rain drops vary in size from 0.02 inch to 0.31 inch diameter.</TipBox>
      </div>
    </div>
  );
}
