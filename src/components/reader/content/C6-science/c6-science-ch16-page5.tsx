import { FillInTable, type TableCell } from "@/components/reader/fill-in-table";
import { TipBox } from "@/components/reader/tip-box";

const TABLE3_ROWS: TableCell[][] = [
  [{ value: "Grows for a certain period" }, { value: "hen, ..." }],
  [{ value: "Grows throughout its life" }, { value: "", editable: true }],
  [{ value: "Doesn't Grow" }, { value: "rock, ..." }],
];

export function C6ScienceCh16Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <FillInTable
            title="Table 3: Things that grow vs things that don't"
            columns={["Growth Type", "Examples"]}
            rows={TABLE3_ROWS}
            storageKey="c6-science-ch16-table3"
          />

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium pt-2">
            <li>Do all living things grow throughout life?</li>
            <li>Pick up any item from the column &apos;doesn&apos;t grow&apos; in the above. Does it need food?</li>
            <li>Do you grow for entire life time or why not?</li>
          </ul>

          <p className="text-xs">
            If we grew like trees, how would we look like? It&apos;s funny to think. Have you read stories of
            Lilliputs, David and Goliath?
          </p>
          <p className="text-xs">
            Non-living things cannot grow. Growth is also a characteristic feature of living things. Is it
            common to all living things?
          </p>

          <h3 className="font-heading text-base font-bold text-emerald-800 pt-2">
            16.5. Do all living things breath?
          </h3>
          <p className="text-xs">
            Observe the abdomen of a cow when it is in rest position. How is it? It moves slowly. This
            shows that the cow is breathing. If you keep a finger in front of your nose, you feel air coming
            out of your nostrils.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
            <li>Do all birds have noses? How do they breathe?</li>
            <li>When we breathe in or inhale, air moves from outside to inside our body. When we breathe out or exhale the air inside comes out.</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Fish can&apos;t remain alive in air. How might they breathe in water?</li>
          </ul>
          
          <p className="text-xs">
            Do all living things breathe? Do plants breathe like us? We know that they don&apos;t have a
            nose. How would they breathe? Let us try to understand.
          </p>

          <h3 className="font-heading text-base font-bold text-emerald-805 pt-2">
            Activity-4: Plant has nose
          </h3>
          <p className="text-xs">
            Take any fleshy leaf like, Aloe vera. Peel the upper layer from it and put it on a slide.
            Observe this under a microscope. You will see the structures as shown in Fig. 3. They are called
            stomata. These are useful for exchange of gases.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch16_fig3_a_b.png"
              alt="Fig. 3(a) & (b) — Aloe vera leaf stomata structure under microscope"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 3(a) & 3(b)
            </p>
          </div>

          <h3 className="font-heading text-base font-bold text-emerald-800 pt-4">
            16.6. Do all living things get rid of their waste?
          </h3>
          <p className="text-xs">
            We know that all living things take in food. After digestion, wastes have to be removed from
            the body. Our body produces different types of waste materials during different life processes.
            When we work hard our body becomes wet with sweat. Sweat is a waste material.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>An egg white is made mainly of a protein called albumen</TipBox>
      </div>
    </div>
  );
}
