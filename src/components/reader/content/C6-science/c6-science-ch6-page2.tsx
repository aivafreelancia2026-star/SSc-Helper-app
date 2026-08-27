import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE1_ROWS: TableCell[][] = [
  [{ value: "snake" }, { value: "snake" }, { value: "snake" }, { value: "", editable: true }],
  [{ value: "earthworm" }, { value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "", editable: true }, { value: "cat" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "", editable: true }, { value: "", editable: true }, { value: "lotus" }, { value: "", editable: true }],
  [{ value: "", editable: true }, { value: "", editable: true }, { value: "", editable: true }, { value: "sparrow (in homes)" }],
  ...Array.from({ length: 3 }, () => [
    { value: "", editable: true },
    { value: "", editable: true },
    { value: "", editable: true },
    { value: "", editable: true },
  ]),
];

export function C6ScienceCh6Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Table 1 Spanning Full Width */}
      <FillInTable
        title="Table 1"
        columns={["Under the ground", "On the ground", "In/on water", "Some other place"]}
        rows={TABLE1_ROWS}
        storageKey="c6-science-ch6-table1"
      />

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>You could write the name of one organism in more than one column.</p>
          <p>
            If you put the organism in the column &apos;some other place&apos;, try to mention the
            place where you could find it.
          </p>
          <p>
            Some examples are filled in to help you. Copy the table 1 in your notebook. Try
            to enrich the list as much as you can.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>How many organisms are present in column - some other place? Why are they included there?</li>
            <li>In which column will you put a frog?</li>
          </ul>

          <p className="pt-2">
            We have seen that different organisms live in different places but many of them live in
            the same place. Living organisms have different needs. They usually stay in the places
            where most of their needs are met, that is, they get sufficient food, shelter and other
            conditions necessary for life.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <p>
            All organisms depend on their surrounding for their needs like food, water, air and
            shelter. The surrounding which meets the needs of a particular organism in the best
            manner is the <strong>habitat</strong> of that organism. For example, pond is the
            habitat of (royyalu) fresh water prawn. Fish lives in ponds so it is a habitat for fish
            as well.
          </p>
          <p>
            Can you say what is the habitat for crow? A crow makes its nest on the tree, So tree is
            a habitat for the crow. We often find some insects on the skin of buffalo, So, buffalo
            skin is the habitat for that insect.
          </p>
          <p>
            With such different types of organisms, it is difficult to find habitats with just one
            type of plant or animal. It is also difficult to study the needs of each organism
            separately, so usually we study them collectively according to the habitat.
          </p>
          <p className="pt-1 text-emerald-850 font-semibold">Now lets see what are the different habitats around us.</p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Alpine Mountain habitats are the highest mountain habitats in the world.</TipBox>
      </div>
    </div>
  );
}
