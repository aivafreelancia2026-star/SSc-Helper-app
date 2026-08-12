import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh3Page5() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <h2 className="font-heading text-base font-bold text-primary">3.4. Rain</h2>
      <p>The clouds do not stay at a place. They move from one place to another in the direction of winds.</p>
      <p>
        As more clouds come together they become laden with water vapour. Winds bring the clouds
        from the sea to the land. The cold air in the upper layers of the atmosphere cool these
        clouds.
      </p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>Have you observed the colour of a clouds before it rains?</li>
        <li>How do clouds give rain?</li>
      </ul>
      <p>
        We all know that without clouds, it will not be possible to get rains and that all clouds do
        not cause rains. Some changes take place in the clouds before they cause rain.
      </p>

      <FigureNote emoji="🌦️" caption="Fig. 11 — A woman walking under an umbrella in the rain" />

      <ul className="list-disc space-y-1.5 pl-5">
        <li>What changes do you notice in the sky and in the atmosphere before it rains?</li>
        <li>What changes take place in clouds before raining?</li>
      </ul>

      <p>
        Cooling of clouds increases the size of their water drops and clouds become heavy and
        descend towards the earth. The colour of such clouds changes from white to grey giving us
        the feeling of dark clouds gathering. When the size of the water drops increases further it
        becomes difficult for the cloud to hold them and water drops begin to fall. This is called{" "}
        <strong>&quot;rain&quot;</strong>. (Fig 11)
      </p>
      <p>
        In our daily life, we observe that before raining, clouds descend towards the earth&apos;s
        surface and we experience a cool breeze before rainfall.
      </p>
      <p>
        In very cold conditions, the drops of water turn into crystals of ice and fall as snow.
        Sometimes big drops of water solidify into ice and fall as pieces of ice known as{" "}
        <strong>hailstones.</strong>
      </p>

      <h2 className="font-heading text-base font-bold text-primary">3.5. Monsoons</h2>
      <p>
        Generally, we get rains in some particular months during the year. In our state, rains
        occur normally from June to September. During this season the sky is filled with clouds
        and move along with the winds blowing from western direction (South West side). These
        winds are called &quot;South West monsoon&quot;. Similarly, we observe in the months of
        November
      </p>

      <TipBox>
        Sulphur dioxide and nitrogen dioxide released from industries and vehicles pollute clouds.
        This causes acid rains.
      </TipBox>
    </div>
  );
}
