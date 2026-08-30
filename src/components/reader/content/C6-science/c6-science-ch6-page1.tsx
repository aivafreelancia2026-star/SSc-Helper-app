import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh6Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Chapter 6 Banner */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-double border-emerald-400/60 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block rounded-full bg-emerald-200/60 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-800 uppercase">
              Chapter 6
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-emerald-950 sm:text-3xl">
              Habitat
            </h1>
          </div>
          <div className="flex flex-col items-center border border-emerald-200 rounded p-1.5 bg-white shadow-xs">
            <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-emerald-600 mb-1">QR CODE</span>
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700 font-mono select-none">
              R7U4D2
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Uma was swimming in the village pond with her elder brother. She enjoyed swimming there
            as she saw a variety of plants, flowers and insects in the pond different from what she
            could see around her house. Her brother would show her eggs of all sorts of creatures.
            Right below the lotus leaf was the snail&apos;s egg, within leafy bushes at the side of the
            pond were eggs of a fish and many more.
          </p>
          <p>
            There were several organisms vary - from very small to quite large ones like the fish
            that grandpa was rearing. Human beings would often hold their breath underwater for such
            explorations. But we would gasp for breath just after a short time and come to the surface.
          </p>
          <p>
            Uma often wondered how the organisms underwater could live there easily while it was so
            difficult for her to breathe?
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Do all organisms have different needs which are fulfilled by their surroundings?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-emerald-850 pt-2">6.1. Habitat</h2>
          <p>
            We see organisms living everywhere around us. We see them living on the ground or under
            the ground, in the water or on its surface etc.
          </p>
          <p>Let us explore all the places where organisms (plants and animals) live.</p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch6_fig1.png"
              alt="Fig. 1 — Uma and her brother exploring the pond habitat"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 1 (Note: Visit the pond in the presence of a teacher or parents only. Going inside the pond is dangerous)
            </p>
          </div>

          <h2 className="font-heading text-base font-bold text-emerald-850 pt-2">
            Activity-1: Who lives where
          </h2>
          <p className="text-foreground/80 text-sm">
            Here is a list of some organisms: Ant, human beings, elephant, lotus, spider, oyster, fish,
            rabbit, housefly, sparrow, dung beetle, earthworm, murrel (korameenu), squirrel, beetle,
            rat, bat, pistia, water hyacinth, monkey, prawn (royyalu)...
          </p>
          <p className="pt-1 text-foreground/75 italic">
            You may add the names of even more animals and plants that you see around you or remove those
            from the given list which are unfamiliar to you.
          </p>
          <p>
            Where is each organism found most often? In table 1 write the names of the organisms in the
            appropriate box according to where they can be found.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>The shark has about 4000 teeth in its mouth. Each teeth is about 3 mm long.</TipBox>
      </div>
    </div>
  );
}
