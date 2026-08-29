import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh9Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <CalloutBox title="Do you know?">
            <p className="text-xs text-foreground/80 leading-relaxed">
              Some plants like potato, turmeric, garlic, ginger and sugarcane store food material in the
              stem due to which they bulge in size. Generally we think that these all tubers or roots.
              Actually they are modified stems.
            </p>
            <div className="flex justify-center pt-2">
              <img
                src="/assets/images/C6-science/ch9_fig10.png"
                alt="Fig. 10 — Modified stems: garlic, ginger, turmeric, potato"
                className="max-w-[240px] h-auto rounded-lg shadow-sm"
              />
            </div>
            <p className="text-center font-body text-[10px] italic text-foreground/50 mt-1 font-semibold">
              Fig. 10
            </p>
          </CalloutBox>

          <p className="pt-2">
            How can you say that a potato is stem although it grows under the ground? Think it over.
          </p>
          <p>
            Most plants growing around us have roots, leaves, stems and flowers. All parts of the
            plants carry out some functions, essential for the whole plant. There are diverse forms of
            plants in nature and plants adapt themselves to the different conditions in nature in
            different ways. For example, while stems usually support the plant body, in some plants they
            modify and store food. Flower is another important part in the plant. Flower has different
            colourful structures called petals. They attract insects for pollination and produce
            fruits. We grow plants for colourful flowers which gives beauty to nature. We will learn
            more about flower in the next classes.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <div className="rounded-[16px] border border-emerald-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-emerald-800">Keywords</p>
            <p className="mt-1 font-body text-xs text-foreground/80 leading-relaxed">
              Tap root, fibrous roots, petiole, lamina, stomata, reticulate venation, parallel venation,
              transpiration.
            </p>
          </div>

          <div className="rounded-[16px] border border-emerald-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-emerald-800 mb-2">What we have learnt</p>
            <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
              <li>The important parts of a plant are roots, stem and leaves.</li>
              <li>Tap root system and fibrous root system are two types of root systems seen in plants.</li>
              <li>Roots absorb water and minerals from the soil and also help in anchoring the plant body to the soil.</li>
              <li>The branches of stem bears leaves, flowers and fruits.</li>
              <li>The stem carries the water absorbed by the roots to different parts of the plant.</li>
              <li>Leaves help in preparing food, exchange of gases and transpiration.</li>
            </ul>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>The substance that causes spicyness in chillies is capsaicin.</TipBox>
      </div>
    </div>
  );
}
