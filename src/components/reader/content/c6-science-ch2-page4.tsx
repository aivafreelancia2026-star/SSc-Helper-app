import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh2Page4() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <p>(Keep these iron filings in a box to use in further activities.)</p>

      <ul className="list-disc space-y-1.5 pl-5">
        <li>Which part of magnet attracts more iron filings?</li>
        <li>From which part of the magnet do you feel more difficulty in removing iron filings?</li>
      </ul>

      <h2 className="font-heading text-base font-bold text-primary">2.3. Poles of a Bar Magnet</h2>
      <p>Does the property of attracting iron filings remain same for all parts of a bar magnet?</p>

      <h2 className="font-heading text-base font-bold text-primary">Activity-4:</h2>
      <p>
        Spread some iron filings uniformly on a sheet of white paper. Place a bar magnet below this
        sheet and keep moving the bar magnet.
      </p>

      <ul className="list-disc space-y-1.5 pl-5">
        <li>What do you observe?</li>
        <li>Do you observe any change in the pattern of iron filings spread over the sheet?</li>
      </ul>

      <p>
        You will observe that the uniformly spread iron filings concentrate opposite at two points
        of the paper sheet. At some distance you will find some scattered iron filings between
        these two points (see Fig. 3).
      </p>

      <FigureNote emoji="🧷" caption="Fig. 3 — Iron filings concentrating at the two ends of a bar magnet" />

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

      <h2 className="font-heading text-base font-bold text-primary">
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

      <FigureNote emoji="🧲" caption="Fig. 4 — Bar magnet suspended freely, settling North-South" />

      <TipBox>Electromagnets are made by using wire coils wound around a steel rod.</TipBox>
    </div>
  );
}
