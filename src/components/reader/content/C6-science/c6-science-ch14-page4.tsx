import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh14Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="font-heading text-base font-bold text-emerald-800">
            14.3. How do Muscles work?
          </h2>
          <p className="text-xs">
            Muscles always work in pairs. When one of them contracts, the bone is pulled in that
            direction and the other muscle of the pair relaxes. To move the bone in the opposite
            direction, the relaxed muscle contracts and the first one relaxes. Thus two muscles have
            to work together to move a bone. Are all the muscles attached to bones? Some muscles are
            connected directly to bones. Some muscles have round, white, rope-like fibres at their
            ends that connect them to the bone (Fig. 3). These fibrous structures are called
            <strong> tendons.</strong>
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[160px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig4_a.png"
              alt="Fig. 4(a) — Bending elbow muscle contractions"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 4 (a)
            </p>
          </div>

          {/* Do you know? Box */}
          <div className="rounded-[16px] border border-emerald-200 bg-emerald-50/40 p-4">
            <div className="flex items-center gap-2 text-emerald-800 mb-2">
              <span className="text-base font-bold">💡</span>
              <p className="font-heading text-sm font-bold tracking-tight">Do you know?</p>
            </div>
            <p className="font-body text-xs text-foreground/80 leading-relaxed">
              Almost all our body movements depend on muscles, bones and joints. Expansion and
              contraction of muscle makes the bone move. Muscles always work in pairs.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex gap-4 items-center">
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[90px] mx-auto">
              <img
                src="/assets/images/C6-science/ch14_fig3.png"
                alt="Fig. 3 — Tendon fibers on a bone diagram"
                className="max-w-full h-auto rounded-lg"
              />
              <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
                Fig. 3
              </p>
            </div>
            
            <p className="text-xs">
              You can notice the presence of tendons in several parts of your body. For example, above the
              elbow, beneath the knee, near the ankle (Fig. 4 (a,b,c)).
              <br />
              Try to find out and notice tendons in other parts of your body.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-3 shadow-sm">
              <img
                src="/assets/images/C6-science/ch14_fig4_b.png"
                alt="Fig. 4(b) — Sitting boy leg flex tendons"
                className="max-w-full h-auto rounded-lg"
              />
              <p className="text-center font-body text-xs italic text-foreground/50 mt-1 font-semibold">
                Fig. 4 (b)
              </p>
            </div>

            <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-3 shadow-sm">
              <img
                src="/assets/images/C6-science/ch14_fig4_c.png"
                alt="Fig. 4(c) — Sitting girl ankle tendon hold"
                className="max-w-full h-auto rounded-lg"
              />
              <p className="text-center font-body text-xs italic text-foreground/50 mt-1 font-semibold">
                Fig. 4 (c)
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>The smallest bird is &ldquo;Hummingbird&rdquo;. Its length is 2.24 inches (or) 5.7 cms.</TipBox>
      </div>
    </div>
  );
}
