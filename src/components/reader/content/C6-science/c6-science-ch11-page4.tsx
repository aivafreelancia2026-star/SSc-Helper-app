import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh11Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="italic text-foreground/75">
            and your family. (Also, calculate the amount of water you and your family were able to save.)
          </p>
          <p>
            You have a rough idea of how much water your family uses in a day. With this information you
            may be able to calculate the approximate quantity of water required for your colony / village
            / town / city. For this, you will need to know the population as well. Ask your teacher
            about population.
          </p>

          <ul className="list-disc space-y-2 pl-5 text-foreground/80 font-medium">
            <li>
              Approximate quantity of water used per day by a person: <span className="border-b border-indigo-300 px-4">                    </span> in litres.
            </li>
            <li>
              Number of people in the colony / village / town: <span className="border-b border-indigo-300 px-4">                    </span>
            </li>
            <li>
              Approximate quantity of water used per day in the colony / village / town: <span className="border-b border-indigo-300 px-4">                    </span> in litres.
            </li>
            <li>
              Approximate quantity of water used per month in the colony / village / town: <span className="border-b border-indigo-300 px-4">                    </span> in litres.
            </li>
            <li>
              Approximate quantity of water used per year in the colony / village / town: <span className="border-b border-indigo-300 px-4">                    </span> in litres.
            </li>
          </ul>

          <p className="pt-2 text-xs italic text-foreground/70">
            Imagine how much water is needed across the total world population per day / month / a year.
          </p>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">
            11.3. Where do we get water from?
          </h2>
          <p>
            We get water from different water sources in our surroundings. In most villages wells,
            canals, tanks, ponds, rivers, etc are the main water sources.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>List out the sources from where you get water in your village / town.</li>
            <li>
              Are the sources from where you get water for your daily needs and crops the same or not?
              Give your reasons.
            </li>
          </ul>

          <CalloutBox title="Do you know?">
            <p className="text-xs text-foreground/80 leading-relaxed">
              Water is not only available from sources such as the rivers, lakes and ponds but also present
              in certain fruits and vegetables. Fruits like watermelon and vegetables like cucumber contain
              a lot of water. Can you suggest some other examples? Our body also contains 70% of water by
              weight. Think, why we take juicy fruits in summer.
            </p>
          </CalloutBox>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">
            11.4. Water on the earth
          </h2>
          <p>
            There are different sources of water on the earth. We know that nearly 3/4<sup>ths</sup> of the surface
            of the earth is occupied by water. Is this water useful for us?
          </p>
          <p>Can we drink the water available in the sea?</p>
          <p>
            Sea-water is salty. Hence it is not used in our daily needs but water used by us in our
            daily purposes is not salty. It is known as fresh water. Water in ponds, puddles, river,
            from tube-wells and our taps at home is usually fresh water.
          </p>

          <h2 className="font-heading text-base font-bold text-indigo-855 pt-2">
            Activity-4: Safe drinking water stages
          </h2>
          <p className="italic text-foreground/75 text-xs">
            Meet your panchayat officer and collect information about safe drinking water scheme in your
            village.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>98% of water related deaths occur in the developing world.</TipBox>
      </div>
    </div>
  );
}
