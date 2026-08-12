import { FigureNote } from "@/components/reader/figure-note";
import { SummaryBox } from "@/components/reader/summary-box";
import { TipBox } from "@/components/reader/tip-box";

const SUMMARY_POINTS = [
  "Water on the Earth can exist in three forms: ice (solid form), water (liquid form) and water vapour (gaseous form).",
  "The process of changing of water into water vapour is called evaporation.",
  "All clouds do not always cause rain.",
  "If water receives more heat, it evaporates faster.",
  "Clouds are formed from tiny droplets of water vapour.",
  "Evaporation of water from the surface of seas, lakes, ponds etc. is part of cloud formation.",
  "As we move up from the surface of the Earth, air becomes cooler.",
];

export function C6ScienceCh3Page6() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <p>
        and December rains occur due to movements of clouds in the direction of winds blowing from
        Eastern side (North East side). These winds are called <strong>&quot;North East
        Monsoon&quot;.</strong> Now a days we are not getting timely rains and seasons are also
        changing slightly. Think, why is it happening so?
      </p>

      <h2 className="font-heading text-base font-bold text-primary">3.6. Water cycle</h2>
      <p>
        When it rains ponds, lakes etc are filled with water. Water from rainfall runs down as
        small streams. These small streams join together and make bigger streams. These bigger
        streams join the rivers. The rivers flow down to seas and oceans. Some of this rain water
        seeps into the ground and becomes ground water.
      </p>
      <p>
        As it is very hot during summer, large quantity of water evaporates from seas, lakes,
        rivers etc. and converts into water vapour. This goes up into the air to form clouds. These
        clouds again cool and produce rain.
      </p>

      <FigureNote emoji="🔄" caption="Fig. 12 : Water Cycle — sun heats water into vapour, which rises to form clouds, then falls as rain" />

      <p>
        The circulation of water into water vapour by evaporation, water vapour to clouds and
        clouds to rain by condensation is known as <strong>&quot;water cycle&quot;</strong> (Fig 12)
      </p>
      <p>This cycle of evaporation and condensation takes place continuously in nature.</p>
      <p>
        Deforestation and pollution from factories are now causing global warming. So, the
        atmospheric conditions are not favourable for clouds to get cooled. Consequently, there is a
        decrease in rainfall. This disturbs the water cycle and causes either floods or droughts.
      </p>

      <div className="rounded-[16px] border border-border/50 bg-white/70 p-4">
        <p className="font-heading text-sm font-bold text-primary">Keywords</p>
        <p className="mt-1 font-body text-sm text-foreground/80">
          Evaporation, cloud, stream, rain, condensation, water vapour, droplets, breeze, water
          cycle, atmosphere, dew, wind, hails.
        </p>
      </div>

      <SummaryBox points={SUMMARY_POINTS} />

      <TipBox>If the rain drops are very small, they are collectively termed drizzle.</TipBox>
    </div>
  );
}
