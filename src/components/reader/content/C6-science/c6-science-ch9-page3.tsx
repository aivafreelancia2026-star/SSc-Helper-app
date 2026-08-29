import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh9Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>In Fig. 2(a), how does the main root look like?</li>
            <li>Compare this main root with the remaining roots of the plant shown in Fig. 2(a).</li>
            <li>Do you find any such main root in plant shown in Fig. 2(b)? How are the roots of this plant?</li>
            <li>Do you find any other differences between Fig. 2(a) and Fig. 2(b)</li>
          </ul>

          <p>
            In some plants, the main root becomes thick and has thin rootlets. This main root is known
            as <strong>tap root</strong> and the rootlets are called <strong>lateral roots</strong> (Fig. 2(a)).
          </p>
          <p>
            In some plants small hair-like roots arise from the base of the stem. This type of roots
            are known as <strong>fibrous roots.</strong> Here there is no main root. All roots are
            similar (Fig. 2(b)).
          </p>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">
            9.3. Functions of roots :
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>In activity-1, could you pull out the plants easily from the soil? Or was it difficult? Think why?</li>
          </ul>
          <p>
            Observe the roots of the plants. Is soil attached to the roots? Roots help to hold the
            plant tightly in the soil. So, we cannot easily uproot the plant.
          </p>
          <p>Do you know why the roots penetrate deep into the soil?</p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-emerald-800">
            Activity-2: Absorption of Water
          </h2>
          <p className="italic text-foreground/75 text-xs">
            Take two glass tumblers filled with water. Collect two plants having soft stems, along
            with their roots.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[260px] mx-auto">
            <img
              src="/assets/images/C6-science/ch9_fig3.png"
              alt="Fig. 3 — Plants in water: with red ink vs without ink"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 3
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>84% of a raw apple and 96% of a raw cucumber is water.</TipBox>
      </div>
    </div>
  );
}
