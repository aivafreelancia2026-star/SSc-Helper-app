import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

const TABLE5_ROWS_B: TableCell[][] = [
  [{ value: "Fermentation" }, { value: "", editable: true }],
  [{ value: "Roasting" }, { value: "Peanuts" }],
  [{ value: "Deep Frying" }, { value: "Pakodi, Puri" }],
  [{ value: "Shallow frying" }, { value: "Chicken, Fish" }],
  [{ value: "Chopping and mixing (made into small pieces and mixed)" }, { value: "", editable: true }],
  [{ value: "Cutting and mixing (made into large pieces and mixed)" }, { value: "", editable: true }],
  [{ value: "", editable: true }, { value: "", editable: true }],
];

export function C6ScienceCh1Page7() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <FillInTable
        title="Table 5 (continued)"
        columns={["Method of preparing food", "Food items"]}
        rows={TABLE5_ROWS_B}
        storageKey="c6-science-ch1-table5b"
      />

      <p>
        In table 5, you can also add any other method of cooking which you know. Don&apos;t forget
        to add the food items prepared by this method.
      </p>

      <h2 className="font-heading text-base font-bold text-primary">1.5. Tasty Food</h2>
      <p>
        We usually say food is tasty and delicious. But how does food get its taste? The taste of
        food depends on its ingredients, method of preparation and our cultural habits. Do you know
        the method of preparation of any food item?
      </p>
      <p>Joseph knows how to make tomato curry. Listen to him.</p>

      <blockquote className="rounded-[16px] border-l-4 border-primary/40 bg-primary/5 p-4 italic text-foreground/80">
        &quot;I like tomato curry. I learnt how to make it from my father. To prepare it, we need
        two tomatoes, one onion, two green chillies, one red chilly, turmeric powder, salt, oil,
        mustard seeds, black gram and jeera.
        <br />
        <br />
        First, clean all the vegetables in water, and chop them into pieces. Place a pan on the
        flame, pour three spoons of oil. When oil becomes hot, put one spoon-full of mustard, black
        gram and jeera. Then add green and red chilli pieces and put a pinch of turmeric powder.
        Half a minute later add pieces of onion and tomato. Then add some salt and close the lid.
        After five minutes the tasty curry is ready.&quot;
      </blockquote>

      <FigureNote emoji="🍳" caption="Fig. 4 — Joseph's father cooking tomato curry" />

      <TipBox>Sweet potatoes have carotenoids and antioxidants. These purify blood.</TipBox>
    </div>
  );
}
