import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh3Page3() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <p>
        That means the amount of heat absorbed by water affects its evaporation. If water is heated
        more, it will evaporate faster.
      </p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>You might have observed evaporation in many situations in day-to-day life. Discuss them with your friends and prepare a list.</li>
      </ul>
      <p>
        Evaporation is a natural process which takes place on the Earth. Water evaporates
        continuously from the surfaces of water bodies like seas, oceans, rivers, ponds etc. water
        changes into water vapour from these water bodies due to the sunlight and air.
      </p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>Where does this water vapour go after evaporation?</li>
      </ul>
      <p>The water vapour formed due to evaporation becomes a part of air and like air it cannot be seen.</p>
      <p>The water vapour which enters into air through the process of evaporation forms clouds in the sky.</p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>What is a cloud?</li>
        <li>How are clouds formed?</li>
      </ul>

      <h2 className="font-heading text-base font-bold text-primary">3.3. Condensation</h2>
      <p>
        It is our common experience that on cold winter mornings when we speak, we observe
        smoke-like vapour coming out of our mouth. (Fig 6).
      </p>

      <ul className="list-disc space-y-1.5 pl-5">
        <li>Why does smoke-like vapour come out of our mouth in winter?</li>
        <li>Do we experience this in summer as well?</li>
      </ul>

      <p>
        In winter, the air in our atmosphere is very cool as compared to the air coming out from our
        mouth. Water vapour present in the air coming out from our mouth gets cooled suddenly to
        form very tiny droplets. These tiny droplets concentrated in a limited area, appear like
        smoke or a small cloud near our mouth.
      </p>

      <FigureNote emoji="🥶" caption="Fig. 6 — A child's breath forming smoke-like vapour in cold winter air" />

      <p>You might have observed that during mornings in winter, small dew drops appear on grass, leaves of plants (fig. 7).</p>

      <ul className="list-disc space-y-1.5 pl-5">
        <li>From where do these water drops come on to the leaves and grass?</li>
      </ul>

      <FigureNote emoji="🌿" caption="Fig. 7 : Dew on grass" />

      <TipBox>Rain drops vary in size from 0.02 inch to 0.31 inch diameter.</TipBox>
    </div>
  );
}
