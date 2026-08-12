import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh2Page5() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <p>Now disturb the magnet and again wait for some time.</p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>Where does the coloured portion come to rest?</li>
      </ul>
      <p>Repeat this experiment in your classroom, playground and at your home.</p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>What do you observe?</li>
      </ul>
      <p>
        Magnets always come to rest in the North-South direction. In each case the marked end
        points towards North. This end is known as North pole of the magnet. The other end, which
        points towards the South is known as South pole of the magnet. This property of magnets is
        called <strong>directional property</strong>. It is exhibited only by magnets. We use this
        property to make the <em>magnetic compass</em>.
      </p>

      <h2 className="font-heading text-base font-bold text-primary">2.4. Magnetic Compass</h2>
      <p>
        A compass is usually a small box with a glass covering it. A magnetized needle is pivoted
        inside the box in such a way that it can rotate freely. The compass also has a dial with
        directions North (N), South (S), East (E), West (W) marked on it.
      </p>
      <p>
        The compass is kept at the place where we wish to know the direction. Its needle indicates
        the North-South direction when it comes to rest. The compass is then rotated until the
        north and south marked on the dial are exactly below the two ends of the needle. To
        identify the North pole of the magnetic needle, it is usually painted in a different colour
        (see Fig. 5). Then we identify north and south at that place. After that we can also
        identify the East and West between them.
      </p>

      <FigureNote emoji="🧭" caption="Fig. 5 — A magnetic compass" />

      <p>
        A compass is used to find directions. It is mostly used in ships and airplanes.
        Mountaineers and army people also carry a compass with them so that they do not lose their
        way in an unknown place.
      </p>
      <p>Note: Don&apos;t place compass and magnets together.</p>

      <h2 className="font-heading text-base font-bold text-primary">
        Activity-6: Attraction and Repulsion between two Magnets
      </h2>
      <p>
        Take two similar magnets, place them in four different ways as shown in Fig. 6 and record
        your observations.
      </p>

      <FigureNote
        emoji="🧲"
        caption="Fig. 6 — Two bar magnets brought together with poles facing each other in four ways: S–N and N–S, N–S and S–N, N–S and N–S, S–N and S–N"
      />

      <TipBox>Some vets use magnets to retrieve wire and metal from animals&apos; stomachs.</TipBox>
    </div>
  );
}
