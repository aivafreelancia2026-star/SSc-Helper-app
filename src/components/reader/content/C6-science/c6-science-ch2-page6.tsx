import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh2Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What do you observe?</li>
            <li>When do the magnets attract each other?</li>
            <li>When do the magnets repel each other?</li>
          </ul>

          <p>
            You will notice that <strong>like poles (N-N, S-S) repel each other and unlike poles (N-S)
            attract each other.</strong>
          </p>

          <h2 className="font-heading text-base font-bold text-primary pt-2">2.5. Earth as a Magnet</h2>
          <p>We saw that a suspended bar magnet always comes to rest in the North-South direction.</p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Why does it come to rest in that particular direction only?</li>
            <li>What force is acting on it?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-primary pt-2">Activity-7:</h2>
          <p>
            Place a bar magnet on a table in any direction. Suspend another bar magnet over it as shown
            in Fig. 7. The suspended bar magnet should be fairly close to the one kept on the table.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch2_fig7.png"
              alt="Fig. 7 — A bar magnet suspended above another"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 7 — A bar magnet suspended above another
            </p>
          </div>

          <p className="pt-2">
            on the table. Observe in which direction the suspended bar magnet comes to rest. Change the direction of the bar magnet placed on the table.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Do you find any change in the direction of suspended bar magnet?</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <p>• What is that change?</p>
          <p>
            The suspended bar magnet always comes to rest in the direction of the bar magnet placed on
            the table. But the north pole of the suspended bar magnet points towards the south pole of
            the bar magnet placed on the table and south pole of the suspended bar magnet points
            towards the north pole of the bar magnet placed on the table.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What happens if you remove the bar magnet placed on the table?</li>
          </ul>

          <p>
            In this case the suspended magnet comes to rest in the North-South direction. We can say
            that there is some magnet below the suspended bar magnet which compels it to come to rest
            in that particular direction. Where does this invisible magnet come from? The earth
            possesses magnetic property which acts upon the suspended bar magnet (see Fig. 8).
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch2_fig8.png"
              alt="Fig. 8 — Earth acting as a giant bar magnet"
              className="max-w-full h-auto rounded-lg shadow-sm max-h-[160px]"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 8 — Earth acting as a giant bar magnet
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Simple magnets are made using iron or steel.</TipBox>
      </div>
    </div>
  );
}
