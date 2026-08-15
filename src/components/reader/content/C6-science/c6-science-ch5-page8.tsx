import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { SummaryBox } from "@/components/reader/summary-box";
import { TipBox } from "@/components/reader/tip-box";

const TABLE8_DATA: [string, string[]][] = [
  ["Sugar", ["Yes"]],
  ["Salt", ["Yes"]],
  ["Sand", ["No"]],
  ["Saw dust", ["No"]],
  ["Chalk powder", ["No"]],
];

const TABLE8_ROWS: TableCell[][] = TABLE8_DATA.map(([material, answer], i) => [
  { value: String(i + 1) },
  { value: material },
  { value: "", editable: true, correctAnswers: answer },
]);

const SUMMARY_POINTS = [
  "Objects around us are made of a large variety of materials.",
  "Based on their properties, we use different materials for different purposes.",
  "Some materials such as glass are transparent, some materials such as wood are opaque and materials like oily paper are translucent.",
  "Materials can exist in three states; as solids, liquids and gases.",
  "Some materials sink in water and some materials can float on water.",
  "Some materials are soluble in water and some materials are insoluble in water.",
  "Materials are grouped on the basis of similarities and differences in their properties.",
];

export function C6ScienceCh5Page8() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <h2 className="font-heading text-base font-bold text-primary">Activity 8: Do iron objects float?</h2>
      <p>Take some water in a wide mouthed bowl. Put an iron nail in it. What do you observe? Put an empty iron tin in that bowl. What do you observe?</p>
      <p>Also try to observe whether a wooden piece floats on water. What happens when a wooden bowl is dipped in water?</p>
      <p>What do you conclude from this activity?</p>
      <p>Some materials in one shape will sink in water but float on water when they are in another shape. The materials that can sink can be made to float, but all the materials that float cannot be made to sink.</p>

      <h2 className="font-heading text-base font-bold text-primary">Activity-9: Soluble or insoluble in water</h2>
      <p>Take five beakers with water. Take small quantities of sugar, salt, chalk powder, sand and saw dust. Add each material to separate beakers and stir. Observe the changes and record your observations in table 8.</p>

      <FillInTable
        title="Table 8"
        columns={["S. No.", "Material added", "Dissolves (Yes/No)"]}
        rows={TABLE8_ROWS}
        storageKey="c6-science-ch5-table8"
      />

      <p>
        We observe that certain materials dissolve when mixed with water. These substances are
        said to be <strong>soluble</strong> in water. The materials that do not dissolve are said
        to be <strong>insoluble.</strong> Repeat the activity with different liquids like vinegar,
        lemon juice, coconut oil and kerosene. What do you observe? Discuss with your friends.
      </p>
      <p>Materials around possess different properties, so we are able to use them according to our needs.</p>

      <div className="rounded-[16px] border border-border/50 bg-white/70 p-4">
        <p className="font-heading text-sm font-bold text-primary">Keywords</p>
        <p className="mt-1 font-body text-sm text-foreground/80">
          Material, object, metal, transparent, opaque, translucent, solid, liquid, gas, sink,
          float, soluble, insoluble
        </p>
      </div>

      <SummaryBox points={SUMMARY_POINTS} />

      <TipBox>The coloured light beam which passes through transparent material, the same coloured light beam comes out.</TipBox>
    </div>
  );
}
