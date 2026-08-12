import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh3Page1() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <FigureNote emoji="☂️" caption="Fig. 1 — A mother handing an umbrella to her daughters before school" />

      <p>
        Ramya and Sowmya were getting ready to go to school. Their mother advised them to keep an
        umbrella with them. Ramya asked her mother why the umbrella was needed as it was not
        raining. Looking at the sky, mother told them that it was likely to rain as it was cloudy
        and windy weather.
      </p>
      <p>They started to school wondering about how their mother was able to predict when it could rain.</p>

      <ul className="list-disc space-y-1.5 pl-5">
        <li>Why do we get rains?</li>
        <li>Where do these rains come from?</li>
        <li>How did mother know that it was likely to rain?</li>
        <li>Do all the clouds formed in the sky cause rain?</li>
      </ul>

      <p>
        Rain is a common phenomenon like air and sunlight. We generally get more rains in rainy
        season. Our general observation is that if the sky is cloudy then there is a possibility of
        rain. But clouds do not lead to rains every time, some times we witness sudden rains.
      </p>

      <ul className="list-disc space-y-1.5 pl-5">
        <li>Why do clouds cause rain?</li>
        <li>What is the relation between rains and clouds?</li>
        <li>Why don&apos;t all clouds cause rain?</li>
      </ul>

      <p>To understand about clouds and rains we need to first know about water.</p>

      <h2 className="font-heading text-base font-bold text-primary">3.1 Forms of Water</h2>
      <p>All of us know that water is available in nature in three forms.</p>

      <h3 className="font-heading text-sm font-bold text-primary">3.1.1. Solid Form</h3>
      <p>We call solid form of water as ice.</p>

      <FigureNote emoji="🧊" caption="Fig. 2 : Ice" />

      <p>Snow occurs naturally. Can we convert water into ice? Explain what we should do?</p>

      <TipBox>Rain drops travel at a speed of 7-18 miles/hr.</TipBox>
    </div>
  );
}
