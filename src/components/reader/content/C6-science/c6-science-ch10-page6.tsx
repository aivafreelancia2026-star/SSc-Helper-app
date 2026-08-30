import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh10Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>What is the duration of the longest day in May?</li>
            <li>Do December and May belong to the same season? If not, to which seasons do they belong?</li>
          </ul>

          <p>
            By looking at the data regarding the times of sunrise and sunset on a particular day in
            December and May, we see that days are shorter in December and longer in May. Thus there
            are short duration days in winter and long duration days in summer.
          </p>

          <h2 className="font-heading text-base font-bold text-indigo-800">
            Activity-4: Does the sun rise exactly in the east in all seasons?
          </h2>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch10_fig3.png"
              alt="Fig. 3 — Sunrise direction and compass alignment"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 3
            </p>
          </div>

          <p className="pt-2">
            In the chapter &ldquo;playing with magnets&rdquo; we learnt about the magnetic compass. This
            helps us to find the North-South direction. Take a magnetic compass find the North-South
            directions with its help. We know that the East-West direction is exactly perpendicular to
            North-South direction. Mark East-West direction with the help of magnetic compass and
            compare it with the direction in which the sun rises during the winter season.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <p>
            Observe the direction of sunrise three to four times in winter and in summer. Compare it
            with the exact east direction marked with the help of the compass.
          </p>
          
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Do you find any change in direction of sunrise between winter and summer season?</li>
            <li>What difference do we notice?</li>
          </ul>

          <p>
            Try to find the direction in which the sun rises even if it is not winter at the time of
            reading the chapter.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Did the sun rise exactly in the east?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">
            Observing the changes in shadow during winter and summer seasons
          </h2>
          <p>
            Teja likes to take his photographs very much. His father took his photos in the months of
            December and May and are given below. Observe Fig. 4(a) and 4(b):
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch10_fig4_a.png"
              alt="Fig. 4(a) — Shadow of a boy standing at doorstep in December"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 4(a)
            </p>
          </div>

          <p className="pt-2 text-xs text-foreground/75 italic">
            Fig. 4(a) shows the shadow of a boy, standing on the doorstep of an east facing house,
            at the time of sunrise. This is on a day in the month of December.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Digestion is the mechanical and chemical breakdown of food into smaller components.</TipBox>
      </div>
    </div>
  );
}
