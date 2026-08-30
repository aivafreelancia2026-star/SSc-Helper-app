import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh6Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            We should take care of our pet animals. Most of the time, we concentrate on getting milk
            from cow/buffalo but not on their needs. Keeping their sheds clean, supplying fodder and
            water to them is our responsibility. If we show concern for animals they become affectionate
            to us.
          </p>
          <p>
            You notice your pet dog licks your feet, wags its tail, sits near you and walks with you.
            Have you ever experienced the affection that a buffalo / dog / cat shows towards you? Write
            your experience.
          </p>

          <CalloutBox title="Do you know?">
            <p className="text-xs text-foreground/80 leading-relaxed">
              Animals are partners of our habitat. They also have a right to live. We people are
              encroaching their habitat. If we cut a tree, birds that live on it lose their nests
              and fall in danger. We often see dogs, monkeys, cows roaming on roads due to lack of
              food and shelter. Blue Cross is one of the voluntary organisation that works for
              animal rights and protection.
            </p>
          </CalloutBox>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-emerald-800">6.5. Garden : A wonderful place</h2>
          <p>
            While travelling by bus or train, we can see different types of crop fields and orchards.
            Farmers generally grow mango, guava, sapota, banana, lemon, citrus (battai) trees in the
            villages. In orchards, farmers grow a single type of fruit plants; in a mango orchard
            will there only be mango trees? Below those trees we find several other small plants growing
            on the ground and different types of animals as well.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 pt-2">
            <li>Are all plants that grow in an orchard the same as the plants in a forest? Why is it so?</li>
          </ul>

          <p className="pt-2">
            Tamarind, mango, amla plants grow in forests, in the house-gardens or fields. Name some
            more like them.
          </p>
          <p>
            Plants and animals that live in different places on the land like those living on trees,
            in our houses, fields, forests etc. are said to belong to terrestrial habitat. All
            habitats on land are collectively known as <strong>terrestrial habitats.</strong>
          </p>
          <p>
            Now let us do a small activity to see the difference between plants and animals that adapt
            to their surroundings.
          </p>
          <p className="pt-1 text-foreground/75 italic">
            A study on the difference between aquatic and terrestrial plants will help us understand
            more about the specialities of plants.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Forests extend over about one-third of the world&apos;s land surface.</TipBox>
      </div>
    </div>
  );
}
