import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh2Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>(Keep these iron filings in a box to use in further activities.)</p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Which part of magnet attracts more iron filings?</li>
            <li>From which part of the magnet do you feel more difficulty in removing iron filings?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-primary pt-2">2.3. Poles of a Bar Magnet</h2>
          <p>Does the property of attracting iron filings remain same for all parts of a bar magnet?</p>

          <h2 className="font-heading text-base font-bold text-primary pt-2">Activity-4:</h2>
          <p>
            Spread some iron filings uniformly on a sheet of white paper. Place a bar magnet below this
            sheet and keep moving the bar magnet.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What do you observe?</li>
            <li>Do you observe any change in the pattern of iron filings spread over the sheet?</li>
          </ul>

          <p className="pt-2">
            You will observe that the uniformly spread iron filings concentrate opposite at two points
            of the paper sheet. At some distance you will find some scattered iron filings between
            these two points.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch2_fig3.png"
              alt="Fig. 3 — Iron filings concentrating at the two ends of a bar magnet"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 3 — Iron filings concentrating at the two ends of a bar magnet
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <p>
            This change in the spread of iron filings on the sheet of paper is due to the magnet
            present below it. The iron filings accumulate more at the places on the paper where the
            ends of magnets are. Thus the ends of the bar magnet attract more iron filings than the
            middle part of the magnet.
          </p>
          <p>
            By this activity we can conclude that every bar magnet always has two ends whose attracting
            capacity is more than its other parts. These ends are called <strong>poles</strong> of the
            magnet.
          </p>

          <h2 className="font-heading text-base font-bold text-primary pt-2">
            Activity-5: Finding directions with a bar magnet.
          </h2>
          <p>
            Suspend the bar magnet freely with the help of a thread tied around its center as shown in
            Fig. 4. Does the magnet remain stationary? Wait for some time. What do you observe?
          </p>
          <p>
            You will notice that when the magnet comes to rest it takes a position in the North-South
            direction. Mark the end that points towards the North with some colour.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch2_fig4.png"
              alt="Fig. 4 — Bar magnet suspended freely, settling North-South"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 4 — Bar magnet suspended freely, settling North-South
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Electromagnets are made by using wire coils wound around a steel rod.</TipBox>
      </div>
    </div>
  );
}
