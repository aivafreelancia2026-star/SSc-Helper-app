import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh14Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[150px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig1.png"
              alt="Fig. 1 — Bulging upper arm biceps muscle on bending elbow"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 1
            </p>
          </div>

          <h2 className="font-heading text-base font-bold text-emerald-805 pt-2">
            Activity-3: Fold and un-fold
          </h2>
          <p className="text-xs">
            Hold one of your hands in front of you, in the manner shown in Fig. 2(b), with the palm
            facing downwards. Fold and unfold the fingers of this hand one by one. Observe the back of
            your palm between the fingers and the wrist and observe the movement of the muscles.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Could you identify the different muscles that move as you fold and unfold each finger?</li>
          </ul>
          
          <p className="text-xs">
            Now hold your hand with the palm facing upwards, in the manner shown in Fig. 2(a), and fold and
            unfold your fingers one by one. Study the moving muscles between the wrist and elbow.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Could you identify the movements in different muscles of hand?</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <p className="text-xs">
            Try to fold and unfold your fingers without moving these muscles. Is it possible to do so?
          </p>
          <p className="text-xs">
            Move the toes in the similar manner, try to observe the movements of muscles in your legs.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[150px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig2.png"
              alt="Fig. 2 — Hand palm facing up (a) and down (b) finger folding muscles"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 2(a) and 2(b)
            </p>
          </div>

          <p className="text-xs pt-2">
            After doing all these activities do you find out any relation between moving body parts and
            muscles?
          </p>
          <p className="text-xs">
            Perform the following actions and say whether you were able to notice the movement of muscle
            here as well:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
            <li>Fluttering your eyelashes.</li>
            <li>Chewing.</li>
            <li>Breathing in and out.</li>
            <li>Lifting a weight.</li>
            <li>Moving your toes.</li>
          </ul>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>There are more than 2,700 species of snakes in the world</TipBox>
      </div>
    </div>
  );
}
