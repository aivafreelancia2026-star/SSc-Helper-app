import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh2Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>Now disturb the magnet and again wait for some time.</p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Where does the coloured portion come to rest?</li>
          </ul>
          <p>Repeat this experiment in your classroom, playground and at your home.</p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What do you observe?</li>
          </ul>
          <p>
            Magnets always come to rest in the North-South direction. In each case the marked end
            points towards North. This end is known as North pole of the magnet. The other end, which
            points towards the South is known as South pole of the magnet. This property of magnets is
            called <strong>directional property</strong>. It is exhibited only by magnets. We use this
            property to make the <em>magnetic compass</em>.
          </p>

          <h2 className="font-heading text-base font-bold text-primary pt-2">2.4. Magnetic Compass</h2>
          <p>
            A compass is usually a small box with a glass covering it. A magnetized needle is pivoted
            inside the box in such a way that it can rotate freely. The compass also has a dial with
            directions North (N), South (S), East (E), West (W) marked on it.
          </p>
          <p>
            The compass is kept at the place where we wish to know the direction. Its needle indicates
            the North-South direction when it comes to rest. The compass is then rotated until the
            north and south marked on the dial are exactly below the two ends of the needle. To
            identify the North pole of the magnetic needle, it is usually painted in a different colour...
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <p>
            ...(see Fig. 5). Then we identify north and south at that place. After that we can also
            identify the East and West between them.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch2_fig5.png"
              alt="Fig. 5 — A magnetic compass"
              className="max-w-full h-auto rounded-lg shadow-sm max-h-[120px]"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 5 — A magnetic compass
            </p>
          </div>

          <p className="pt-1">
            A compass is used to find directions. It is mostly used in ships and airplanes.
            Mountaineers and army people also carry a compass with them so that they do not lose their
            way in an unknown place.
          </p>
          <p>Note: Don&apos;t place compass and magnets together.</p>

          <h2 className="font-heading text-base font-bold text-primary pt-2">
            Activity-6: Attraction and Repulsion between two Magnets
          </h2>
          <p>
            Take two similar magnets, place them in four different ways as shown in Fig. 6 and record
            your observations.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm">
            <img
              src="/assets/images/C6-science/ch2_fig6.png"
              alt="Fig. 6 — Two bar magnets brought together"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2">
              Fig. 6 — Attraction and Repulsion between two Magnets
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Some vets use magnets to retrieve wire and metal from animals&apos; stomachs.</TipBox>
      </div>
    </div>
  );
}
