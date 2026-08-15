import { IconGallery } from "@/components/reader/icon-gallery";
import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

const MAGNET_SHAPES = [
  { emoji: "🧲", label: "Horse Shoe Magnet" },
  { emoji: "🟧", label: "Bar Magnet" },
  { emoji: "⭕", label: "Ring Magnet" },
  { emoji: "🔘", label: "Disc Magnet" },
];

export function C6ScienceCh2Page2() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <CalloutBox title="Story of Magnet">
        Around 2500 years ago, there lived an old shepherd named Magnus. He used to take his goats
        and sheep to the hills for grazing. He always carried a wooden stick which had an iron cap
        on its lower end. One day, while his goats were grazing, Magnus dipped his stick into a
        spring of water and poked at the pebbles and stones at the bottom with it. Suddenly he felt
        something pulling his stick. When he took it out of water, he saw a stone stuck to the iron
        cap. The stone which Magnus pulled out was called Lode stone. It is a natural magnet and
        possesses the property of attracting iron.
      </CalloutBox>

      <p>
        The magnets we discussed in pin holder and iron doors are not natural magnets. These
        magnets are man-made magnets.
      </p>

      <h2 className="font-heading text-base font-bold text-primary">2.2 Magnets of different shapes</h2>
      <p>
        The magnets we see and use in our daily life possess different shapes. Some of the usual
        shapes of magnets are shown in Fig. 2.
      </p>

      <IconGallery items={MAGNET_SHAPES} caption="Fig. 2 — Bar, Horse Shoe, Ring and Disc magnets" />

      <p>Can we make a magnet in whatever shape we desire? Think.</p>

      <TipBox>
        Usually special alloys of iron, nickel, copper, cobalt, and aluminum can be made into
        powerful magnets.
      </TipBox>
    </div>
  );
}
