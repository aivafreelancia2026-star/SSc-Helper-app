import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

const MATERIALS: [string, string][] = [
  ["Metal", "Utensils, "],
  ["Plastic", "Bags, "],
  ["Glass", "Mirror, "],
  ["Wood", "Table, "],
  ["Cotton", "Clothes, "],
  ["Leather", "Shoes, "],
  ["Ceramic", "Cups, "],
  ["Rocks", "Idols, "],
];

const TABLE3_ROWS: TableCell[][] = MATERIALS.map(([material, objects], i) => [
  { value: String(i + 1) },
  { value: material },
  { value: objects, editable: true },
]);

export function C6ScienceCh5Page3() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <FillInTable
        title="Table 3"
        columns={["S. No.", "Material", "Objects"]}
        rows={TABLE3_ROWS}
        storageKey="c6-science-ch5-table3"
      />

      <p>
        We see that the same material can be used to make different objects. (observe Fig. 3).
        Each object is used for a special purpose. So we need to know the properties of materials,
        as well as the use of the objects to decide which material should be used for making an
        object. Some materials are soft and some are hard. Similarly some are shiny whereas some
        are non-shiny. Depending on these properties materials are used for different objects.
      </p>

      <FigureNote emoji="🪵" caption="Fig. 3 — A wooden log made into a door and a table" />

      <h2 className="font-heading text-base font-bold text-primary">Discuss the following:</h2>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>On what basis can we classify materials?</li>
        <li>How do we decide which material should be used for making an object?</li>
        <li>How do use different materials for different purposes based on their properties?</li>
      </ul>

      <TipBox>An object sinks or floats in a medium, depends upon the density of the objet and also density of the medium.</TipBox>
    </div>
  );
}
