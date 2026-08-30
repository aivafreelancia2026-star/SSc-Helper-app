import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE5_ROWS: TableCell[][] = [
  [{ value: "When you step on a sharp object" }, { value: "", editable: true }],
  [{ value: "Touch a flame or fire" }, { value: "", editable: true }],
  [{ value: "Touch ice-cream" }, { value: "", editable: true }],
  [{ value: "See a bright light" }, { value: "Blink, ..." }],
  [{ value: "Get bitten by an ant or mosquito" }, { value: "", editable: true }],
  [{ value: "When you hear the word 'tamarind'" }, { value: "Mouth waters, ..." }],
];

export function C6ScienceCh16Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch16_fig4_c.png"
              alt="Fig. 4(c) — Viviparous mother-child pairs: dog, cat, cow, human"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 4(c)
            </p>
          </div>

          <p className="text-xs pt-2">
            Birds and animals that lay eggs are known as <strong>oviparous.</strong> (Fig-4(b)) Those which
            give birth to young ones without laying eggs are known as <strong>viviparous.</strong> (Fig-4(c))
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Can plants be classified as Oviparous or Viviparous?</li>
            <li>We know that seed germinates into plants. This means that plants also produce their young ones. Seed germination is one of the ways of doing this.</li>
            <li>Are there any other ways in which plants produce their young ones?</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <h3 className="font-heading text-base font-bold text-emerald-805">
            Activity-6 : Response to stimulus
          </h3>
          <p className="text-xs">
            Discuss with your friend how would we respond in the conditions given in table-5.
          </p>

          <FillInTable
            title="Table 5: Stimulus and Response"
            columns={["Stimulus", "Response"]}
            rows={TABLE5_ROWS}
            storageKey="c6-science-ch16-table5"
          />

          <p className="text-xs pt-2">
            All living beings possess the characteristic feature of response to stimulus.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
            <li>Do other animals also respond to stimuli like us?</li>
            <li>Do plants respond to stimuli like animals?</li>
          </ul>
          <p className="text-xs">
            A famous Indian scientist <strong>Jagadeesh Chandrabose</strong> proved that plants have life and
            they respond to stimulus. We can understand the responses of plants through the following
            observations. Some flowers bloom in day times whereas some others bloom at nights. They respond
            to light. They respond to temperature. Many trees shed leaves in autumn.
          </p>

          <h3 className="font-heading text-base font-bold text-emerald-800 pt-2">
            Activity-7 : Atti-Patti
          </h3>
          <p className="text-xs">
            It is very interesting to observe a touch me not (Atti-patti or mimosa) plant.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>The human heart creates enough pressure to squirt blood 30 feet distance.</TipBox>
      </div>
    </div>
  );
}
