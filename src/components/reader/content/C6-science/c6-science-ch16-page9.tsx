import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh16Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Decaying tree trunk Fig 7 */}
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[280px] mx-auto">
          <img
            src="/assets/images/C6-science/ch16_fig7.png"
            alt="Fig. 7 — Dead tree trunk decaying on forest ground with mushrooms growing on it"
            className="max-w-full h-auto rounded-lg"
          />
          <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
            Fig. 7
          </p>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">
            Venkatesh noticed that growth, breathing, excretion, taking food, giving birth to young ones,
            response to stimulus, movement are some of the characteristics of living beings. He also observed
            that these are not common among all living organisms. But, non-living things do not possess
            these characters. He observed that people depend upon both living and non-living things.
          </p>
          <p className="text-xs">
            Generally we are told that the plant is dead when it has dry leaves and stem. If an animal
            doesn&apos;t show living characteristics, we can say that the animal is dead. Is a dead plant or a
            dead animal non-living?
          </p>
          <p className="text-xs">
            Dead plants, animals or any other living beings decompose to form non-living constituents. So we
            can&apos;t say dead things are non-living things. They are intermediate things between living and
            non-living things.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <h3 className="font-heading text-base font-bold text-emerald-805">
            16.9. Living things under a microscope
          </h3>
          <p className="text-xs">
            The letters in a book are quiet small. What do old people do to read books? Children frequently
            play with magnifying lens. When we see objects through magnifying lens they seem to be bigger than
            their actual size.
          </p>
          
          <p className="font-bold text-emerald-850">Activity-9 : Prepare your own magnifier</p>
          <p className="text-xs">
            Collect an used electric bulb. Remove its filament. Fill water in half of the bulb. See a book
            through this bulb. Do the letters in the book seem bigger?
          </p>
          <p className="text-xs">
            Are all things around us visible to us? Name some small animals that you see. Can we see antenna
            of ants and small insects with our naked eye? When you touch flowers, a yellow colour powder
            sticks your fingers. If you want to know what it is, what can you do?
          </p>
          <p className="text-xs font-semibold">
            We cannot see all things around us with our naked eye. Because those things like antenna of ants,
            yellow powder of flowers are very small. In the living world
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Some moulds are used in cheese manufacturing. It is called as fermentation.</TipBox>
      </div>
    </div>
  );
}
