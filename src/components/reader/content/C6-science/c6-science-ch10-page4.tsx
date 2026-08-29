import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh10Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Stir them well. The curd must mix in the milk. Cover all the bowls with lids and keep them in
            your classroom. Leave them and ensure they are not touched even after you have left for home.
            Observe the changes in the three bowls when you come back to the school next day.
          </p>
          <p>
            What do you notice about the milk in the three bowls?
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Has the milk in all the three bowls changed into curd?</li>
            <li>Which has not changed into curd? Why?</li>
          </ul>

          <p className="pt-2 font-medium text-indigo-805">
            Compare bowls 1 and 2, and bowls 2 and 3 separately and try to answer the following questions:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Why do we notice change only in bowl 2, though we added curd to the milk of bowl 1 as well?</li>
            <li>Why do we notice change in bowl-2 though we took warm milk in both bowls 2 and 3?</li>
          </ul>

          <p>
            When we compare the bowls 1 and 2 though the sample curd is added in both bowls, the bowl
            having warm milk is converted into curd. The cold milk does not change into curd.
          </p>
          <p>
            Similarly if we compare bowls 2 and 3, though we have taken warm milk in both bowls, only the
            milk in the bowl 2 to which sample curd has been added changes into curd. We may note that the
            warm milk in the other bowl does not change into curd.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <p>
            These two observations explain that the reason for change of milk into curd is due to
            addition of sample curd to warm milk.
          </p>
          <p>
            The adding of sample curd to the milk helps to grow some kind of bacteria (Lactobacillus)
            in it and enables conversion of the milk into curd. You will learn more about this type of
            bacteria in the lesson &ldquo;living and non-living&rdquo;.
          </p>

          <p className="font-semibold text-indigo-800">Now let us discuss one more change</p>

          <h2 className="font-heading text-base font-bold text-indigo-800">
            10.3. Changing seasons
          </h2>
          <p>
            Every year we observe that the seasons changes.
          </p>
          <p>
            The rainy season is followed by winter season. It is followed by summer season and the rainy
            season. Like this the seasons change regularly one after the other.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What changes do you observe from winter season to summer season?</li>
            <li>Is there any change in the clothes we wear?</li>
            <li>Is there any change in coldness and hotness of the air around us?</li>
            <li>Is there any change in duration of day and duration of night?</li>
            <li>Is there any change in the food that we eat or drink?</li>
          </ul>

          <p>
            If the winter season changes into summer, we observe change in our clothes. For example,
            wearing of woolen clothes in winter changes to wearing of cotton clothes in summer.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Due to heat, a place gets heated and pressure gets lowered.</TipBox>
      </div>
    </div>
  );
}
