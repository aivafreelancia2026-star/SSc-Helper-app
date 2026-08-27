import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

const TABLE1_ROWS: TableCell[][] = [
  [{ value: "Cotton" }, { value: "", editable: true }],
  [{ value: "Silk" }, { value: "Kurta, Sari, ...", editable: true }],
  [{ value: "Wool" }, { value: "", editable: true }],
  [{ value: "Polyester" }, { value: "", editable: true }],
  [{ value: "Linen" }, { value: "Shirts, ...", editable: true }],
];

export function C6ScienceCh8Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Along with protection, clothes can also be a symbol of beauty and status. Choice of
            fabric may vary from person to person. Some people may like to wear clothes made up of thin,
            light, shiny fabrics. Others may like to wear clothes that are thick, made of coarse fabric
            and bright coloured. Fabrics for casual and formal wear may be different. While selecting
            we give preference to personal choice. Along with our colour and personality, the cost of
            fabric is also important factor in the selection of the perfect fabric.
          </p>
          <p>
            Our need and the nature of a fabric together determines which type of fabric can be used
            for each purpose. Earlier coarse fabric was used for making gunny bags and other bags to
            get groceries but not for making clothes. Think why?
          </p>

          <CalloutBox title="Do you know?">
            <p className="text-xs text-foreground/80 leading-relaxed">
              The material used for making school bags is also a kind of fabric. Fabric used in
              bedsheets and pillows is another type. Fabrics are not only used for making clothes;
              but also used in making flags, banners, curtains, in book binding etc. Calico is a
              type of fabric used in book binding.
            </p>
          </CalloutBox>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-indigo-800">
            Activity-1: Things made up of fabric
          </h2>
          <p className="italic text-foreground/75 text-xs">
            List things in your house made up of any type of fabric. Classify them into cotton, silk,
            wool, polyester, terylene, nylon etc. For identifying the fabrics, you can take the help
            of your elders and teachers. Try to add some more in the table (Table-1).
          </p>

          <FillInTable
            title="Table 1"
            columns={["Type of fabric", "Manufactured Things"]}
            rows={TABLE1_ROWS}
            storageKey="c6-science-ch8-table1"
          />

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 pt-2">
            <li>Which kind of fabric is being used more in your house?</li>
            <li>How do you identify the type of fabric?</li>
          </ul>

          <p>
            Cotton fabrics are somewhat thicker than polyester fabrics. Coarse cotton clothes are
            heavier. After washing, cotton clothes get wrinkled and shrink. Silk fabric is smooth
            to touch whereas woolens are rough and heavier.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Try to find out the properties of each type of fabric (cotton, wool, silk, polyester, etc.).</li>
            <li>Based on what properties would you identify a particular type of fabric?</li>
          </ul>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Silk is commonly obtained from silkworms. However, in recent times, scientists have come up with an innovation wherein silk is produced from spiders.</TipBox>
      </div>
    </div>
  );
}
