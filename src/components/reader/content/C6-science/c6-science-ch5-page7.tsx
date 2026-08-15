import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

const TABLE6_ROWS: TableCell[][] = [
  [{ value: "Sinks" }, { value: "Stone …", editable: true }],
  [{ value: "Floats" }, { value: "", editable: true }],
];

const TABLE7_ROWS: TableCell[][] = Array.from({ length: 2 }, () => [
  { value: "", editable: true },
  { value: "", editable: true },
  { value: "", editable: true },
]);

export function C6ScienceCh5Page7() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <h2 className="font-heading text-base font-bold text-primary">A dilemma with sugar</h2>
      <p>
        While thinking about properties of solids, a group of students in class 6, put sugar in a
        glass and in a bowl. They observed that sugar takes the shape of the container. Since they
        know that liquids take the shape of the container, they concluded that sugar is a liquid.
      </p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>The second group in the class disagreed with the first. What do you think? Is sugar a solid or a liquid? How will you decide?</li>
      </ul>
      <p>
        Razia, a student from the second group came up with an idea. She took a single crystal of
        sugar and one drop of water and declared that sugar is a solid while water is a liquid. The
        first group also had to agree with her argument.
      </p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>What must she have argued using only one crystal of sugar and one drop of water?</li>
        <li>Discuss with your friends and find out why sugar is a solid although it takes the shape of the container.</li>
        <li>Is common salt is a solid or a liquid?</li>
      </ul>

      <h2 className="font-heading text-base font-bold text-primary">Activity-7: Sinking or floating in water</h2>
      <p>
        Let us assume that a tomato, brinjal, potato, iron nail, sponge, wood, stone, leaf, piece
        of chalk and paper are given to you. Predict which of them sink or float in water. Record
        your predictions in table 6.
      </p>

      <FigureNote emoji="🧪" caption="Fig. 8 — Students testing objects in a bowl of water" />

      <FillInTable title="Table 6" columns={["Prediction", "Object"]} rows={TABLE6_ROWS} storageKey="c6-science-ch5-table6" />

      <p>
        Now try to test whether your predictions are correct or wrong by dropping the above
        objects in a beaker of water one by one. What do you find record your observations in the
        following table 7.
      </p>

      <FillInTable title="Table 7" columns={["Object", "Prediction", "Finding"]} rows={TABLE7_ROWS} storageKey="c6-science-ch5-table7" />

      <p>Are your predictions right / wrong?</p>
      <p>Now, add a lot of salt to the water in the beaker. Try this same activity with water which is excessively salty.</p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>What do you observe?</li>
        <li>Do you get the same result? Discuss.</li>
        <li>Are there any objects which has sinked in normal water but float in salt water? Think why do they float in salt water.</li>
      </ul>

      <TipBox>Candles made of bee wax have sweet smell and give less smoke.</TipBox>
    </div>
  );
}
