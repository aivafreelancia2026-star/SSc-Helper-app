import { IconGallery } from "@/components/reader/icon-gallery";
import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

const CONDIMENT_ITEMS = [
  { emoji: "🪵", label: "Cinnamon (dalchini)" },
  { emoji: "🟢", label: "Cardamom (ilaichi)" },
  { emoji: "🥜", label: "Cashew nuts" },
  { emoji: "🌰", label: "Almonds" },
  { emoji: "🍃", label: "Biryani leaves" },
  { emoji: "🍇", label: "Kismis (dried grapes)" },
];

const TABLE4_ROWS: TableCell[][] = [
  [{ value: "Fenugreek (Menthulu)" }, { value: "Leaves, seeds" }],
  [
    { value: "Mustard (Avalu)" },
    { value: "", editable: true, correctAnswers: ["Seeds", "Leaves", "Leaves, seeds"] },
  ],
  [{ value: "Sugarcane" }, { value: "", editable: true, correctAnswers: ["Stem"] }],
  [{ value: "Carrot" }, { value: "", editable: true, correctAnswers: ["Root"] }],
  [{ value: "Onion" }, { value: "", editable: true, correctAnswers: ["Bulb", "Stem"] }],
  [{ value: "Cabbage" }, { value: "", editable: true, correctAnswers: ["Leaves"] }],
  [
    { value: "Asafoetida (Inguva)" },
    { value: "", editable: true, correctAnswers: ["Root", "Resin", "Stem"] },
  ],
];

export function C6ScienceCh1Page5() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <IconGallery items={CONDIMENT_ITEMS} caption="Fig 3" />

      <CalloutBox title="Do you know?">
        To make biryani, we use different types of ingredients such as ilaichi (cardamom), lavang
        (clove), dalchini (cinnamon), biryani leaves, pepper etc. They are called condiments
        (sugandha dravyalu / fragrant material) to make kheer. Cashew nuts, almonds, kismis (dried
        grapes) etc are used. These are dry fruits. Condiments and dry fruits grow in particular
        places only. They are not available in large quantities. So, they are expensive.
      </CalloutBox>

      <p>Now look at table 4 and fill it as shown.</p>

      <FillInTable
        title="Table 4"
        columns={["Name of plant", "Parts that we eat"]}
        rows={TABLE4_ROWS}
        storageKey="c6-science-ch1-table4"
      />

      <TipBox>
        The Green Pea contain beneficial protein, but many people are allergic to them and find
        them hard to digest.
      </TipBox>
    </div>
  );
}
