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
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <ul className="list-disc space-y-1.5 pl-5">
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

      <FigureNote emoji="🦗" caption="Fig. 2 — A pond skater insect" />

      <h2 className="font-heading text-base font-bold text-primary">4.4. Collecting food :</h2>
      <p>
        Finding food is one thing, but collecting or capturing it is quite another. Animals have
        specialized body parts such as mouthparts, hands or feet that help them collect their food
        most efficiently.
      </p>

      <IconGallery items={COLLECTING_FOOD_EXAMPLES} caption="Fig. 3 — Different animals collecting their food" />

      <TipBox>
        Animals are divided into six basic groups, which include invertebrates, fishes,
        amphibians, reptiles, birds and mammals.
      </TipBox>
    </div>
  );
}
