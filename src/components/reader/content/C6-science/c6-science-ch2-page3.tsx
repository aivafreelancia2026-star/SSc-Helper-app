import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

// The activity text names a fixed 14-item list to test (nail, jump-clip,
// plastic scale, glass, brass key, paper, iron bolt, pen, blade, pencil,
// knife, stainless steel spoon, chalk, wood) — two are already given as
// examples, so these remaining rows use more items from that same list
// rather than an open student choice, which makes Material/Attracted
// gradable instead of free text.
const TABLE1_ROWS: TableCell[][] = [
  [{ value: "Jump Clip" }, { value: "Iron" }, { value: "Yes" }],
  [{ value: "Scale" }, { value: "Plastic" }, { value: "No" }],
  [
    { value: "Iron bolt" },
    { value: "", editable: true, correctAnswers: ["Iron"] },
    { value: "", editable: true, correctAnswers: ["Yes"] },
  ],
  [
    { value: "Piece of glass" },
    { value: "", editable: true, correctAnswers: ["Glass"] },
    { value: "", editable: true, correctAnswers: ["No"] },
  ],
  [
    { value: "Wood" },
    { value: "", editable: true, correctAnswers: ["Wood"] },
    { value: "", editable: true, correctAnswers: ["No"] },
  ],
];

export function C6ScienceCh2Page3() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <h2 className="font-heading text-base font-bold text-primary">
        Activity-2: Which materials are attracted by magnets?
      </h2>
      <p>
        Take a bar magnet, nail, jump-clip, plastic scale, a piece of glass, brass key, paper, iron
        bolt, pen, blade, pencil, knife, stainless steel spoon, piece of chalk, wood and touch the
        magnet to each item. Does the magnet attract every object? Observe and record your
        observations duly mentioning the name of the material of which the object is made in table
        1.
      </p>

      <FillInTable
        title="Table 1"
        columns={["Name of the object", "Material of which the object is made (Iron/plastic/aluminum/wood/glass/ any other)", "Object attracted by magnet (Yes/No)"]}
        rows={TABLE1_ROWS}
        storageKey="c6-science-ch2-table1"
      />

      {/* Split Columns Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-4">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Which materials are attracted by a magnet?</li>
            <li>Which materials are not attracted by a magnet?</li>
          </ul>

          <p>
            The materials that are attracted by magnets are called <strong>magnetic materials</strong>.
            The materials that are not attracted by magnets are called{" "}
            <strong>non-magnetic materials</strong>.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Give your own examples for magnetic materials.</li>
            <li>Give your own examples for non-magnetic materials.</li>
          </ul>

          <p>
            Magnets have the property of attracting materials like Iron. Based on this property of
            magnets they can be used to separate some mixtures.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-primary">
            Activity-3: Can we separate iron filings from soil?
          </h2>
          <p>Take a bar magnet and roll it in the soil in your school ground for some time. Pull out the magnet.</p>
          <p>What do you find? Does anything get attached to the magnet?</p>
          <p>You may find some dark particles of soil sticking to the magnet.</p>
          <p>
            Now gently remove these dark particles from the magnet and collect them in a sheet of white
            paper. These are iron filings.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>
          Once the Greek scientist Archimedes used lodestone to win enemies in battles by using
          lodestone to get the nails from the ship. So the ship would sink.
        </TipBox>
      </div>
    </div>
  );
}
