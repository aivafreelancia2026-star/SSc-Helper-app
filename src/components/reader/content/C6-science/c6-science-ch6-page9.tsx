import { SummaryBox } from "@/components/reader/summary-box";
import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

const SUMMARY_POINTS = [
  "Habitat is a dwelling place for plants and animals that gives them optimum conditions for life.",
  "Tree, pond, house are some examples of habitats.",
  "Temperature, moisture, air, water, food, shelter are the components of a habitat.",
];

export function C6ScienceCh6Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <CalloutBox title="Do you know?">
            <p className="text-xs text-foreground/80 leading-relaxed">
              Different kinds of birds come from long distances to Kolleru and Pulicat lakes of A.P
              state. During the months of October to March, pelican birds appear near those lakes.
              In Kurnool district we can see a bird called battameka pitta which flies over long
              distances to come here. Generally we can see birds flying over long distances to find
              suitable conditions to reproduce. Animals like turtles and fish also move from place
              to place. Some kinds of turtles come from coasts of West Bengal and Orissa to the
              coasts of Vishakhapatnam for laying eggs.
            </p>
            <p className="mt-2 text-xs text-foreground/85 italic leading-relaxed">
              Have you heard about the Pulasa fish? Gather information about them. How and why do
              they change their habitat in some seasons.
            </p>
          </CalloutBox>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">6.7. Good habitat - good life!</h2>
          <p>
            Suppose the doors of your house are destroyed somehow. If someone comes and throws things
            here and there, How do you feel?
          </p>
          <p>
            We fail to accept even little changes in our house or surroundings. We feel disturbed.
            When we disturb the habitats, Do we feel the same way for animals and plants? We are dumping
            wastes in nearby ponds, lakes, rivers and grounds and destroying thousands of acres of forests
            to set up industries. Think what would happen to all the organisms living in these areas.
            What will be the result of all this? Can we live without depending on other organisms?
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch6_fig4.png"
              alt="Fig. 4 — A sparrow perched on a concrete ledge"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 4
            </p>
          </div>

          <p className="pt-2 font-medium text-emerald-800">
            You have already studied about the interdependence of different organisms. Try to give your
            answer on the basis of that. If we harm them wouldn&apos;t we be harmed as well?
          </p>
          <p className="italic text-emerald-75">
            Think how a good unharmed habitat leads to a better life for us.
          </p>

          <div className="rounded-[16px] border border-border/50 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-emerald-800">Keywords</p>
            <p className="mt-1 font-body text-sm text-foreground/80">
              Habitat, Terrestrial, Aquatic
            </p>
          </div>

          <SummaryBox title="What we have learnt" points={SUMMARY_POINTS} />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Aquatic habitats come in many forms: lakes, wetlands, lagoons, streams, rivers and swamps.</TipBox>
      </div>
    </div>
  );
}
