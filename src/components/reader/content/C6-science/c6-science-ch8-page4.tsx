import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE2_ROWS: TableCell[][] = [
  [{ value: "1." }, { value: "Water absorbing nature" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "2." }, { value: "Time taken to dry" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "3." }, { value: "Smell while burning" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "4." }, { value: "The rest after burning" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "5." }, { value: "Elastic property" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "6." }, { value: "Smoothness" }, { value: "", editable: true }, { value: "", editable: true }],
];

export function C6ScienceCh8Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Table 2 Spanning Full Width */}
      <h2 className="font-heading text-base font-bold text-indigo-800">
        Activity-3: Characteristics of fabrics
      </h2>
      <p>
        Collect some natural and artificial fabrics and observe the following characteristics. Do
        necessary experiments and record your observations in table 2.
      </p>

      <FillInTable
        title="Table 2"
        columns={["S. No.", "Character", "Natural fabric", "Artificial fabric"]}
        rows={TABLE2_ROWS}
        storageKey="c6-science-ch8-table2"
      />

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Which types of fabrics are smooth in nature?</li>
            <li>Which type of fabrics dry in a short time?</li>
            <li>Do you find any relation between smoothness and time to dry?</li>
            <li>Which fabrics gives ash when they are burnt?</li>
          </ul>

          <p>
            Silk fabrics are smooth and slippery in nature, whereas cotton fabrics may be coarse as
            well as smooth. When we burn fabric made up of artificial fibres it gives a pungent smell.
          </p>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">8.4. Natural Fibres :</h2>
          <p>
            Cotton, jute, wool and silk are some common examples of natural fibres. In this section,
            we will discuss about cotton and jute in detail.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <p>
            Cotton is obtained from cotton balls or cotton fruits. Usually cotton plants are cultivated
            in black soil. In our State, cotton crop is widely grown in districts like Adilabad, Nalgonda
            and Warangal.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Look at the Telangana State map and list out the places where cotton is grown.</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">
            Activity-4: Making cotton yarn.
          </h2>
          <p>
            Collect cotton balls from nearby houses or cotton growing fields. Remove seeds from the
            cotton balls and separate cotton. Take a small piece of cotton; observe it using a
            magnifying lens or under a microscope. What do you observe?
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Charles Macintosh was a Scottish chemist who invented (1823) a method for making waterproof garments.</TipBox>
      </div>
    </div>
  );
}
