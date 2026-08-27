import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh7Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch7_fig5.png"
              alt="Fig. 5 — Winnowing method"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 5
            </p>
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 pt-2">
            <li>What property helped in separating the husk from grain?</li>
          </ul>
          <p>
            Husk is very light as compared to the grains, and farmers use this property.
          </p>

          <h3 className="font-heading text-sm font-bold text-indigo-800 pt-2">
            7.3.3. Sedimentation and decantation
          </h3>
          <p className="font-semibold text-indigo-850">Activity-2:</p>
          <p className="italic text-foreground/75 text-xs">
            Take a glass tumbler and fill it upto half with water. Add soil to it and stir. Then keep
            it undisturbed for sometime.
          </p>
          
          <p className="font-semibold text-indigo-800 pt-1">What do you observe?</p>
          <p>
            Observe the bottom of the tumbler. What happened to the dissolved soil?
          </p>
          <p>
            You will find that the sand and the mud particles in the soil settle down at the bottom of
            the glass tumbler (Fig. 6(a)). These are called <strong>sediments.</strong> This process
            of separation of mud and sand is called <strong>sedimentation.</strong>
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <p>
            After sedimentation, the tumbler is gently lifted. The tip of the tumbler is inclined on
            the edge of another tumbler without disturbing the sediments (Fig. 6(b)). The water gets
            seperated from the sediment (mud). This process is called <strong>decantation.</strong>
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch7_fig6.png"
              alt="Fig. 6 — Sedimentation (a) and decantation (b)"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 6
            </p>
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 pt-2">
            <li>Why did mud particles settled at the bottom of the tumbler?</li>
          </ul>
          <p>
            Laxmi says that sedimentation and decantation are used at home while cleaning rice and
            pulses for cooking. Describe the sediments in this process.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Think of other examples where we use this method of separation and list them.</li>
          </ul>

          <h3 className="font-heading text-sm font-bold text-indigo-800 pt-2">
            7.3.4. Sieving and filtration
          </h3>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>How will you separate the tea-leaves from tea?</li>
          </ul>
          <p>
            Tea-leaves are separated from tea using a strainer. Which property helped in separation
            of tea-leaves (tea powder) from tea?
          </p>
          <p>
            You must have seen flour being seived in the kitchen (Fig. 7). The flour particles
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>We can easily float on the water in the dead sea of Jordan. The dead sea is a salt lake.</TipBox>
      </div>
    </div>
  );
}
