import { FigureNote } from "@/components/reader/figure-note";
import { IconGallery } from "@/components/reader/icon-gallery";
import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

const COLLECTING_FOOD_EXAMPLES = [
  { emoji: "🐄", label: "Cow grazing on grass" },
  { emoji: "🦋", label: "Butterfly sipping nectar" },
  { emoji: "🐸", label: "Frog catching an insect" },
  { emoji: "🐦", label: "Hummingbird at a flower" },
  { emoji: "🐿️", label: "Squirrel eating a nut" },
  { emoji: "🦁", label: "Lion catching its prey" },
];

export function C6ScienceCh4Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What does the dog do when searching for food? Which sense of the dog, do you think, is more developed?</li>
            <li>Eagles find food on the ground even though they are flying very high in the sky. Which sense do they mainly use in finding their food?</li>
            <li>How do bats find their food at night?</li>
          </ul>

          <p>
            Thus we have seen that animals use some sense organs more strongly than other organs to
            find their food. For example, dogs use the sense of smell, vultures use vision. Bats depend
            more on hearing while some reptiles identify the food by tasting.
          </p>

          <CalloutBox title="Pond skaters">
            If you ever go near a pond, observe the pond skaters there (Fig. 2). Observe how quickly
            they move from one side of the pond to another to catch an insect that falls in water.
            Pond skaters (an insect which feeds on other insects) detect ripples produced in water by
            any other insect trapped on the water surface. They compare the ripples on the opposite
            side of the pond, calculate the distance and set out to grab it!
          </CalloutBox>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch4_fig2.png"
              alt="Fig. 2 — A pond skater insect"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 2
            </p>
          </div>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">4.4. Collecting food :</h2>
          <p>
            Finding food is one thing, but collecting or capturing it is quite another. Animals have
            specialized body parts such as mouthparts, hands or feet that help them collect their food
            most efficiently.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch4_fig3.png"
              alt="Fig. 3 — Different animals collecting their food"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 3
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>
          Animals are divided into six basic groups, which include invertebrates, fishes,
          amphibians, reptiles, birds and mammals.
        </TipBox>
      </div>
    </div>
  );
}
