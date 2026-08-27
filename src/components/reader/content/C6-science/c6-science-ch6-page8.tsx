import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

const TABLE3_ROWS: TableCell[][] = [
  [{ value: "Stem" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "Leaf" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "Root" }, { value: "", editable: true }, { value: "", editable: true }],
  [{ value: "Others" }, { value: "", editable: true }, { value: "", editable: true }],
];

export function C6ScienceCh6Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Table 3 Spanning Full Width */}
      <h2 className="font-heading text-base font-bold text-emerald-800">Activity-5: Compare water plants with land plants</h2>
      <p>
        Collect an aquatic plant say a hydrilla or valisneria. Also collect any Terrestrial plant
        like Tulsi. Now compare the two and write your observations in table 3.
      </p>

      <FillInTable
        title="Table 3"
        columns={["Parts", "Terrestrial plant (tulsi)", "Aquatic plant (valisneria / hydrilla)"]}
        rows={TABLE3_ROWS}
        storageKey="c6-science-ch6-table3"
      />

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>On the basis of your observations write how is the aquatic plant suited to living in water?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">6.6. Diversity of habitats in Telugu States :</h2>
          <p>
            The plants that grow in coastal regions differ from those of Telangana or Rayalaseema. We
            can see mangroves only in coastal districts. Grapes are grown in Telangana. Similarly, we can
            see same type of plants in many places of our state.
          </p>

          <CalloutBox title="Do you know?">
            <p className="text-xs text-foreground/80 leading-relaxed">
              Cactus, Acacia, Aloe vera (Kalabanda) plants need less water than chilly or jasmine
              plants. They are called desert plants. We can see camels frequently in the desert.
              Desert plants and animals are suited to dry conditions and high temperature. Burrowing
              animals like snakes and rats are also seen. Different characteristics in the desert
              make up desert habitats.
            </p>
          </CalloutBox>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <p className="font-semibold text-emerald-800">Discuss with your friends and write :</p>
          <ul className="list-disc space-y-2 pl-5 text-foreground/80">
            <li>Do animals change their habitats?</li>
            <li>Will domestic animals change their habitats?</li>
            <li>Have you seen some birds in your surroundings only during a particular season? Why do they come there?</li>
            <li>
              Can we see all types of birds throughout the year? We hear songs of cuckoo only in a
              spring season. We see cranes on trees in rainy season. Where do they come from? Where do
              they go at other times?
            </li>
          </ul>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Savannas are habitats characterized by the predominance of grass vegetation and the absence of forests.</TipBox>
      </div>
    </div>
  );
}
