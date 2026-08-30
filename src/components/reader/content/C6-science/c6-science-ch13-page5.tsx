import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh13Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">One kilometre is 1000 times longer than a metre.</p>
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 font-mono text-xs text-sky-950">
            <p>1 kilometre = 1000 metres</p>
            <p>1 Km = 1000 m</p>
          </div>

          <h2 className="font-heading text-base font-bold text-sky-805 pt-2">
            Activity-2: How do we measure?
          </h2>
          <p className="italic text-foreground/75 font-semibold text-sky-900">How do you measure the height of your classmate using a meter scale?</p>
          
          <p className="font-bold text-sky-805">Do this :</p>
          <p className="text-xs">
            Ask your classmate to stand with his/her back against a wall. Make a mark on the wall exactly
            above his/her head as shown in Fig.8.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[120px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig8.png"
              alt="Fig. 8 — Standing boy height marking illustration against wall"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 8
            </p>
          </div>

          <p className="text-xs">
            Now measure the distance, from the floor to this mark on the wall, with a scale. Let all other
            students measure this length in a similar way. Record your observations in your notebook.
          </p>
          <p className="text-xs">Study carefully the measurements reported by different students.</p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Do you all have the same readings of measurements?</li>
            <li>If not, what could be the reason for the differences?</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <p className="text-xs">
            In the above activity, though the measurement was done using a standard scale, results may
            be close to each other but not exactly equal.
          </p>
          <p className="text-xs">
            The difference in reading is due to some errors in measurement. For example:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
            <li>Not marking the point exactly at the top of the head.</li>
            <li>Not using the metre scale in a proper manner.</li>
          </ul>

          <p className="text-xs pt-2">
            To measure the lengths accurately using the standard measuring instruments like metre scale,
            centimetre scale and tape etc., we should take some precautions.
          </p>

          <h2 className="font-heading text-base font-bold text-sky-800 pt-2">
            13.3. How to measure length accurately with a metre scale?
          </h2>
          <p className="text-xs">
            In our day to day work, we use a wooden/plastic scale to measure lengths. It is marked or
            graduated in centimetres and millimetres. Suppose we are asked to measure the length of a
            table. We will take a metre scale. The zero mark on the scale is made to coincide with one end
            of the table and the reading at the point which is coinciding with the other end of the table
            is taken as length of the table.
          </p>
          <p className="text-xs">
            Since a metre scale has some thickness, we may make an error if the eye is not correctly
            positioned while noting the reading.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>The initial metric unit of mass, the &ldquo;gram,&rdquo; was defined as the mass of one cubic centimeter.</TipBox>
      </div>
    </div>
  );
}
