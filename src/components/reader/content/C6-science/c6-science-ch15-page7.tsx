import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh15Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>What differences do you observe in the shadows when the duster is kept in different positions by rotating it?</li>
            <li>Why are the shapes of the shadows of the same object different when you change the position of the object?</li>
          </ul>
          
          <p className="text-xs">
            Observe the objects, formation of shadows and the path of light in Fig. 9(a) and 9(b). Similarly,
            draw the shadows for the objects given in Fig. 9(c), (d). Extend the path of light and draw shadow
            on given screen.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[280px] mx-auto">
            <img
              src="/assets/images/C6-science/ch15_fig9.png"
              alt="Fig. 9(a)-(d) — Light rays casting shadows table of jars, rectangular block and screen"
              className="max-w-full h-auto rounded-lg"
            />
            <div className="flex justify-between w-full text-[9px] text-foreground/50 px-6 font-semibold pt-1">
              <span>Fig. 9(a)</span>
              <span>Fig. 9(b)</span>
            </div>
            <div className="flex justify-between w-full text-[9px] text-foreground/50 px-6 font-semibold">
              <span>Fig. 9(c)</span>
              <span>Fig. 9(d)</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <p className="text-xs">
            We have drawn arrows in the above figures assuming that light travels like rays that are
            straight. We can predict the shapes of the shadows only when we consider that light travel as
            rays along a straight path. In ancient days, by observing the shapes of shadows, people came
            to an understanding that light travels in a straight line.
          </p>

          <h3 className="font-heading text-base font-bold text-sky-805 pt-2">
            Activity-6: Getting different shapes of shadows of a single object:
          </h3>
          <p className="text-xs">
            Take a rectangular piece of cardboard. Try to form shadows of different shapes by using it.
            You can do this in the sunlight or with the light from torch. Now, answer the following
            questions :
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
            <li>What is the shape of the shadow when cardboard is held perpendicular to the light rays?</li>
            <li>What is the shape of the shadow when the cardboard is held parallel to the light rays?</li>
          </ul>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Light takes 1.255 seconds to get from the Earth to the Moon.</TipBox>
      </div>
    </div>
  );
}
