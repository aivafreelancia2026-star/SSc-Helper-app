import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

const TABLE5_ROWS: TableCell[][] = [
  [{ value: "Stone" }, { value: "Milk" }, { value: "Smoke" }],
  ...Array.from({ length: 5 }, () => [
    { value: "", editable: true },
    { value: "", editable: true },
    { value: "", editable: true },
  ]),
];

export function C6ScienceCh5Page6() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <p>Place a candle in a safe place and light it. For first time, lit the candle by touching the wick with the burning matchstick. Let the candle burn for about 2 mins.</p>
      <p>Now blow the candle out. What did you notice? Did you see a column of white smoke rising from the wick as soon as you extinguish the flame?</p>
      <p>Now quickly bring the burning matchstick close to this smoke, but do not touch the wick with it. What happens?</p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>Could the candle catch fire from a distance?</li>
      </ul>
      <p>What is the maximum distance from which you could lit the candle?</p>
      <p>How is it possible? Discuss.</p>

      <FigureNote emoji="🕯️" caption="Fig. 7 — Lighting a candle with a matchstick, and relighting it via the smoke trail" />

      <ul className="list-disc space-y-1.5 pl-5">
        <li>Is the white smoke gaseous state of candle wax?</li>
      </ul>

      <h2 className="font-heading text-base font-bold text-primary">How can you know the diffrent states of materials?</h2>
      <p>
        We observe that certain materials can change their shape according to the shape of the
        containers they are put into, while some retain their shape. Those materials which change
        shape are mainly <strong>liquids</strong> such as water, milk, oil, kerosene, etc. Those
        materials which do not change shape are <strong>solids</strong> such as wood, rock, brick,
        plastic objects, and vegetables etc.
      </p>

      <h2 className="font-heading text-base font-bold text-primary">Activity-6: Classification of Materials</h2>
      <p>Identify the different solids, liquids and gases materials around you and write them in table 5.</p>

      <FillInTable
        title="Table 5"
        columns={["Solids", "Liquids", "Gases"]}
        rows={TABLE5_ROWS}
        storageKey="c6-science-ch5-table5"
      />

      <p>Discuss with your friends and find out who had the longest list.</p>
      <p>Now consider only one group, say liquids, from the observation of liquids can you list their properties?</p>
      <p>For example, liquids take the shape of the container they are put into. Write all possible properties of solids, liquids and gases in your notebook. Discuss about them with your friends and teachers.</p>

      <TipBox>The word candle is derived from the latin word candere, meaning to shine.</TipBox>
    </div>
  );
}
