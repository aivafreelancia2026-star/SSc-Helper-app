import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh7Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Think, how small should the particles of salt dissolved in water be if they are to pass
            through filter paper!
          </p>

          <h3 className="font-heading text-sm font-bold text-indigo-800 pt-2">
            7.3.5. Crystallization
          </h3>
          <p className="font-semibold text-indigo-850">Activity-4:</p>
          <p>
            Prepare salt solution as given in activity-3. Heat this salt water in a beaker, over a
            flame. Stir the solution with a glass rod (Fig. 9). Continue heating till all the water in
            the beaker has evaporated.
          </p>
          <p>
            What is left behind in the dish? You will find salt crystals and powder in the dish.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[120px] mx-auto">
            <img
              src="/assets/images/C6-science/ch7_fig9.png"
              alt="Fig. 9 — Heating salt solution in a beaker"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 9
            </p>
          </div>

          <CalloutBox title="Do you know?">
            <p className="text-xs text-foreground/80 leading-relaxed">
              Water is generally evaporated in sunlight. We use this property while extracting salt
              from sea water. Sea water is captured in wide pans and is exposed to air and sunlight.
              Then water evaporates and the salt is left behind in the pans.
            </p>
          </CalloutBox>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch7_fig10.png"
              alt="Fig. 10 — Salt extraction beds"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 10
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <h3 className="font-heading text-sm font-bold text-indigo-800">7.3.6. Distillation</h3>
          <p>
            Before administering injections to patients, doctors mix injection powder with some liquid.
            What is it? Is it water or any other liquid?
          </p>
          <p>
            This is water and it is known as distilled water. Where does this distilled water (pure
            water) come from?
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Let us know the process of distilling water?</li>
          </ul>

          <p className="font-semibold text-indigo-850 pt-2">
            Activity-5: Get your own distilled water
          </p>
          <p>
            Fill a conical flask with water, close it with a cork having a hole. Insert a glass tube
            through the hole. Take care that glass tube does not touch water. Take another conical flask
            with a cork having a hole and insert another glass tube through it. Connect both tubes with
            a rubber tube. Now heat the flask containing water using a Bunsen burner (Fig. 11).
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch7_fig11.png"
              alt="Fig. 11 — Distillation setup with Bunsen burner"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 11
            </p>
          </div>

          <p>
            After some time, water vapour goes into the second conical flask through the glass tube.
            The water vapour will slowly turn into water.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Soil and rock layers naturally filter the ground water to a high degree of clarity.</TipBox>
      </div>
    </div>
  );
}
