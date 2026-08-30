import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh16Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">
            Can you list these natural ways of seed dispersal? We will learn more about this in the next
            class.
          </p>

          <h3 className="font-heading text-base font-bold text-emerald-800 pt-2">
            16.3. Food and living beings :
          </h3>
          <p className="text-xs">
            We have learnt in the chapter &apos;our food&apos; that for us as well as for all other
            animals need food to perform different activities.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Do plants also need food?</li>
          </ul>

          <p className="text-xs">
            In the chapter &quot;plants parts and functions&quot;, we have seen that some parts of plants like
            root, stem and fruits store food.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Where do plants get their food from?</li>
          </ul>

          <p className="text-xs">
            Most of the plants absorb water and minerals from the soil and prepare their food in the
            presence of sunlight. In plants food is prepared in the leaves. This is called
            <strong>photosynthesis.</strong>
          </p>

          {/* Do you know? Box */}
          <div className="rounded-[16px] border border-emerald-200 bg-emerald-50/40 p-4">
            <div className="flex items-center gap-2 text-emerald-850 mb-2">
              <span className="text-base font-bold">💡</span>
              <p className="font-heading text-sm font-bold tracking-tight">Do you know?</p>
            </div>
            <p className="font-body text-xs text-foreground/80 leading-relaxed">
              We also prepare food. Is our food preparation process is same as that of plants? Some plants
              cannot prepare their own food. They depends on the other platns for their nutrition. These
              plants are called &apos;Parasitic Plants&apos;. eg. <em>Cuscuta</em> (dodder plant).
            </p>
          </div>

          <h3 className="font-heading text-base font-bold text-emerald-800 pt-2">
            16.4. Growth in living beings :
          </h3>
          <p className="text-xs">
            You notice that kittens, pups and chicks grow into adults. You become taller every year.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <p className="text-xs">
            Similarly, a seed germinates into a plant. Some plants grow into trees. A human child grows into
            man/woman. Plants also produce branches that show their growth. They grow throughout their life but
            we don&apos;t grow like that. We will grow upto certain age and height. But some parts of the body
            grow throughout our life. Think what are those parts? (Fig, 2(a) and 2(b)). Sounds fun to think of
            what it would be like if we were also constantly growing like trees!
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch16_fig2_a.png"
              alt="Fig. 2(a) — Human growth stages sequence from baby to child, adult, and old man"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 2(a)
            </p>
          </div>

          <h3 className="font-heading text-base font-bold text-emerald-805 pt-2">
            Activity-3: Some Grow - Some Doesn&apos;t Grow
          </h3>
          <p className="text-xs">
            You listed several living things in activity 1. How do they grow? Analyze your observations. Also
            add some things that don&apos;t grow. Record in table 3.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[190px] mx-auto">
            <img
              src="/assets/images/C6-science/ch16_fig2_b.png"
              alt="Fig. 2(b) — Bean seed germination underground showing roots and initial leaves"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 2(b)
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>The average cough comes out of your mouth at 60 miles (96.5 km) per hour.</TipBox>
      </div>
    </div>
  );
}
