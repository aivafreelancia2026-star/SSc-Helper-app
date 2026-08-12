import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

const TABLE6_ROWS: TableCell[][] = [
  [{ value: "Adding salt, chilli powder and oil" }, { value: "pickles" }],
  [{ value: "Adding only salt" }, { value: "", editable: true }],
  [{ value: "Drying" }, { value: "", editable: true }],
  [{ value: "Adding sugar syrup" }, { value: "", editable: true }],
];

export function C6ScienceCh1Page8() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <h2 className="font-heading text-base font-bold text-primary">Activity-3: Let us cook</h2>
      <p>What is your favourite food? Find out how it is prepared. Write the recipe in your note book.</p>

      <h2 className="font-heading text-base font-bold text-primary">1.6. Preservation of food</h2>
      <p>
        The discussion about food will be incomplete unless we talk about food preservation. How do
        farmers protect rice from pests and insects after it is harvested? How is rice stored in
        your home? Why does curry get spoiled when kept out for a couple of days but pickle stays
        fresh for so long? It is only because of preservation. For preserving certain food-items,
        they are salted and dried. They are used when needed. In certain areas dried fish is
        commonly used. Vegetables and meat are stored by drying and also pickled.
      </p>

      <div className="space-y-1">
        <p>• Try to find out how vegetables are pickled at home.</p>
        <p>• Find out the ingredients that help to preserve vegetables.</p>
      </div>

      <p>
        Salt, Chilli Powder, Oil and turmeric powder are used for preservation while making
        pickles.
      </p>
      <p>In coastal areas it&apos;s a common sight to see fish being smoked for preservation.</p>

      <div className="space-y-1">
        <p>• Try to find out more about this process.</p>
        <p>• What are the other food material preserved by this process?</p>
      </div>

      <CalloutBox title="Do you know?">
        Sugar syrup or honey is a good preservative. Fruits are often preserved in sugar syrup or
        honey. Jams and fruit juices are good examples of preservation with sugar.
      </CalloutBox>

      <p>Ask your parents other ways of preservation that they follow.</p>

      <h2 className="font-heading text-base font-bold text-primary">Activity-4: Let us store food</h2>
      <p>
        Form groups of 4-5 members, discuss and write in table form the preservatives used to store
        different food items.
      </p>

      <FillInTable
        title="Table 6 - How to preserve food?"
        columns={["Methods of preservation", "Examples"]}
        rows={TABLE6_ROWS}
        storageKey="c6-science-ch1-table6"
      />

      <TipBox>
        Tomatoes are an excellent source of vitamin C. The vitamin C is most concentrated in the
        jelly-like substance that surrounds the seeds. It helps to build up immunity.
      </TipBox>
    </div>
  );
}
