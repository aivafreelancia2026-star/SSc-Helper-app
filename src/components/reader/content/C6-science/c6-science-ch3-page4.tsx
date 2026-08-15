import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh3Page4() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <h2 className="font-heading text-base font-bold text-primary">Activity-1: Condensation</h2>
      <p>Take some water in a glass. Add some pieces of ice to it. Observe for few minutes.</p>

      <FigureNote emoji="🥛" caption="(Fig. 8) — A glass of water with ice cubes" />

      <ul className="list-disc space-y-1.5 pl-5">
        <li>What changes do you observe on the outer surface of the glass?</li>
      </ul>
      <p>You would observe formation of small drops of water on the outer surface of the glass.</p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>Why are these drops formed?</li>
        <li>Do drops form if there is no ice in the glass?</li>
      </ul>
      <p>
        Ice-cold water in the glass cools the glass surface. Air around the glass contains water
        vapour which is warmer than the surface of the glass. Due to the cold glass, air close to
        its surface will also become cooler. This changes the water vapour in the air around the
        surface of the glass into water and forms small drops on the outer surface of glass.
      </p>
      <p>Have you ever observed in your daily life where water vapour changes into water? List out them.</p>
      <p>
        <strong>The process of conversion of water vapour into water is called &quot;condensation&quot;.</strong>
      </p>

      <h2 className="font-heading text-base font-bold text-primary">Clouds and rain</h2>
      <p>
        On a warm day, the sun heats up the ground as well as the water in seas, oceans, rivers,
        ponds etc. This water converts into water vapour by the process of evaporation.
      </p>

      <FigureNote emoji="🌧️" caption="Fig. 9 : Water cycle" />

      <p>
        This water vapour rises up into the atmosphere, as it is lighter than air. As air moves away
        from the surface of the earth, it becomes cooler and cooler. When water vapour reaches
        higher levels it condenses due to contact with cool air and forms small water droplets.
        These tiny droplets remain floating in air at higher levels of the atmosphere and appear as
        clouds.
      </p>

      <h2 className="font-heading text-base font-bold text-primary">Activity-2: Clouds in kitchen</h2>
      <p>Take a vessel filled with water. Keep it on a stove and heat it slowly (Fig.10).</p>

      <FigureNote emoji="🍳" caption="Fig. 10 — A vessel of water heating on a stove" />

      <p>
        Observe for some time. Now cover the vessel with a plate. Remove the plate after a couple of
        minutes. Do you see any changes on the inner surface of the plate?
      </p>
      <p>
        Can water droplets formed on the inner surface of the plate be compared with rain drops.
        Pour some cool water on the plate and observe what happens.
      </p>
      <p>From both the activities discussed above, we know that water vapour helps to form clouds.</p>

      <TipBox>
        Egyptians designed umbrella to protect themselves from sun. Later on it was also used to
        protect from rain.
      </TipBox>
    </div>
  );
}
