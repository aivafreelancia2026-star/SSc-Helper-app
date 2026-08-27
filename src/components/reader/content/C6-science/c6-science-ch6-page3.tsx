import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh6Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            We find animals living on trees, in our houses, in different areas in the ponds on our
            hair, in a small pool of water after rains and several other places. As the area increases,
            the type and number of organisms living there usually increase.
          </p>
          <p>
            You would find more types of organisms living in our house than our hair, and more in
            the pond than our house, more in the river than pond and so on. These larger areas are
            suitable for supporting the life of more organisms.
          </p>
          <p>Now let us study some habitats more closely.</p>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">6.2. Pond as a habitat :</h2>
          <p>
            There are several organisms in a pond. To study them more closely we need to see the
            different regions in the pond where communities of some organisms are present.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch6_fig2.png"
              alt="Fig. 2 — Different regions in a pond as a habitat"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 2
            </p>
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 pt-2">
            <li>Which animals and plants do you think would live on the surface of the pond?</li>
            <li>Which animals and plants do you think would live in mid-water?</li>
            <li>Which animals and plants do you think would live in the pond margins?</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Which animals and plants do you think would live at the bottom of the pond?</li>
          </ul>

          <p className="pt-2">
            In the pond, we find different organisms live in different regions. This is due to some
            conditions like availability of food, air, light etc.
          </p>
          <p>
            We find organisms like dragonfly, mayfly and kingfisher living above the surface, that
            is, hovering above the pond and then resting over a bamboo pole or a stick jutting out of
            the surface of the pond. They get food from the surface of the pond.
          </p>
          <p>
            Organisms like snail, whirling beetle and pond skater live on the surface. The larva of
            dragonfly and mayfly also live on the surface of the pond.
          </p>
          <p>
            Plants like pistia, water hyacinth float on the surface completely while those like the
            lotus have roots going deep under. Organisms that live on surface are easily eaten up by
            others because there is little protection for them. However, there is plenty of food and
            air and this is why fish usually come to the surface to feed.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Mountains provide habitat for a wide range of terrestrial animals including mammals, birds, reptiles and amphibians.</TipBox>
      </div>
    </div>
  );
}
