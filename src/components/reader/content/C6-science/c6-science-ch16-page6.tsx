import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE4_ROWS: TableCell[][] = [
  [{ value: "", editable: true }, { value: "", editable: true }],
  [{ value: "", editable: true }, { value: "", editable: true }],
  [{ value: "", editable: true }, { value: "", editable: true }],
  [{ value: "", editable: true }, { value: "", editable: true }],
  [{ value: "", editable: true }, { value: "", editable: true }],
];

export function C6ScienceCh16Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">
            The process of getting rid of wastes from our body is called <strong>excretion.</strong> In what
            forms do animals excrete?
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[150px] mx-auto">
            <img
              src="/assets/images/C6-science/ch16_fig4_a.png"
              alt="Fig. 4(a) — Tree trunk showing gummy excretions resins dripping"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 4(a)
            </p>
          </div>

          <p className="text-xs">
            Animals excrete wastes in different forms - dung, urine, sweat etc. Plants also excrete their
            wastes but this is not in the same way as animals. Have you ever observed sticky substance on the
            stems of trees?
          </p>
          <p className="text-xs">
            Actually this gummy substance are the excretions of plants. Generally we feel that excretions are
            useless and foul smelling material. But excretory products of animals are used as manure.
            Secretions of plants like, gums and resins, are also useful for us.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <h3 className="font-heading text-base font-bold text-emerald-800">
            16.7. Living things give birth to young ones
          </h3>
          <p className="text-xs">
            <strong>Activity-5:</strong> Make a group with 4 or 5 students. List out birds and animals from
            your surrounding. How do they produce their young ones? Write in table-4 whether they lay eggs
            or they give birth to young ones.
          </p>
          <p className="text-xs">
            Write the table in your note book and Extend the list.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[190px] mx-auto">
            <img
              src="/assets/images/C6-science/ch16_fig4_b.png"
              alt="Fig. 4(b) — Bird nests showing egg clutch and hatched chicks feeding"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 4(b)
            </p>
          </div>

          <FillInTable
            title="Table 4: Egg layers vs live births list"
            columns={["Animals/ birds that lay eggs", "Those which give birth to young ones"]}
            rows={TABLE4_ROWS}
            storageKey="c6-science-ch16-table4"
          />
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>The Atlantic Giants Squid&apos;s eye can be as large as 10 inches (25 cms) in diameter</TipBox>
      </div>
    </div>
  );
}
