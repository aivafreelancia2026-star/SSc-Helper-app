import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE2_ROWS: TableCell[][] = [
  [{ value: "1." }, { value: "Hair pin" }, { value: "Metal" }, { value: "Yes" }],
  [{ value: "2." }, { value: "Eraser" }, { value: "Rubber" }, { value: "", editable: true }],
  [{ value: "3." }, { value: "Plastic scale" }, { value: "Plastic" }, { value: "", editable: true }],
  [{ value: "4." }, { value: "Match stick" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "5." }, { value: "Divider from geometry box" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "6." }, { value: "Piece of paper" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "7." }, { value: "Iron nail" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "8." }, { value: "Piece of Glass bangle" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "9." }, { value: "Pencil lead" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "10." }, { value: "Paper clip" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "11." }, { value: "Piece of chalk" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "12." }, { value: "Safety pin" }, { value: "", editable: true }, { value: "", editable: true }],
];

export function C6ScienceCh12Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Table 2 Spanning Full Width */}
      <FillInTable
        title="Table 2"
        columns={["S.No.", "Object", "Name of the Material", "Does the bulb glow (Yes/No)"]}
        rows={TABLE2_ROWS}
        storageKey="c6-science-ch12-table2-full"
      />

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            If you look at table 2, after recording your observations you will find that the bulb
            glows in some cases and does not glow in other cases. Can you guess the reason?
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-2 pl-5 text-foreground/80 font-medium">
            <li>
              Substances which allow electric current to flow through them are known as{" "}
              <strong>conductors</strong> of electricity.
            </li>
            <li>
              Substances which do not allow electric current to flow through them are known as{" "}
              <strong>insulators.</strong>
            </li>
          </ul>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Michael Faraday (1791–1867), an English chemist and physicist, developed the first, primitive electric motor.</TipBox>
      </div>
    </div>
  );
}
