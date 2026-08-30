import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh13Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">
            Measure the total thickness with a scale and then divide it by the number of coins to get the
            thickness of one coin.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[160px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig11.png"
              alt="Fig. 11 — Measuring thickness of stacked coins with ruler scale"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 11
            </p>
          </div>

          <p className="text-xs pt-2">
            In the same way, try to measure the thickness of a page of your text book.
          </p>
          <p className="text-xs">
            We generally use a scale to measure the lengths which are in a straight line like the length of
            a room, length of a table etc. There are certain situations where the lengths are in curved
            line like the perimetre of bucket, perimetre of a tava or kadai etc.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Can we measure these curved lengths with a metre scale? If not, why?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-sky-805 pt-2">
            Activity-4: Measuring the length of a curved path
          </h2>
          <p className="text-xs">
            Fix alpins at the ends of the curved line to be measured as shown in the Fig. 12. Now tie a
            knot with cotton thread at the first point of the alpin A and move the cotton thread along
            points B, C, D, E etc.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig12.png"
              alt="Fig. 12 — Alpin pins A, B, C, D, E layout for measuring a curved line with thread"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 12
            </p>
          </div>

          <p className="text-xs pt-2">
            Care should be taken that the thread is neither too tight nor too loose and see that the
            thread coincides with the curve at each point while moving along the path. When the thread
            reaches the extreme end of the curved path, cut it at that point.
          </p>
          <p className="text-xs">
            Remove the thread from A and then place it straight along the length of a metre scale, and
            measure its length.
          </p>
          <p className="text-xs font-semibold text-sky-900">
            The length of the thread is the measure of the length of the curved path.
          </p>

          <h2 className="font-heading text-base font-bold text-sky-800 pt-2">
            13.5. Measurement of area
          </h2>
          <p className="text-xs">
            Ramu and Ravi&apos;s father brought two drawing sheets for them. After taking these sheets from
            their father, Ramu and Ravi started quarrelling with each other, each one claiming that his
            sheet was shorter than the others.
          </p>
          <p className="text-xs font-medium text-sky-800">
            Which sheet is smaller? Which sheet is bigger? How can we decide?
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>The Mughal measurement system measured land in terms of &ldquo;gaz&rdquo; and &ldquo;bigha&rdquo;.</TipBox>
      </div>
    </div>
  );
}
