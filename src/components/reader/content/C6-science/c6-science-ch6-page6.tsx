import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh6Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Is the tree chosen by you a habitat for this plant?</li>
            <li>Did you find any animal always present on the tree? Name them.</li>
            <li>Did you find any animals often coming and going on the tree? What were they?</li>
            <li>Did you spot the animals that are coming everyday?</li>
            <li>Are there any organisms that stay on the trees for a few days making it as its habitat and then disappear?</li>
            <li>Based on your observations, for which organisms is the tree observed by you is a habitat?</li>
          </ul>

          <p className="pt-2 font-semibold text-emerald-800">Discuss with the other groups what they observed and answer the following :</p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Do all the trees observed have the same animals?</li>
            <li>Is there any tree without animals?</li>
            <li>What are the animals we frequently see on trees?</li>
          </ul>

          <p className="pt-2 text-foreground/80 font-medium">Try to observe more plants and trees in your surroundings as well.</p>
          <p>
            There are different types of trees in our surroundings. Tree is a place where different
            types of animals live. Along with birds, squirrels, ants, spiders etc. Some very small
            plants grow on the barks of trees as well (you may have seen certain areas of the barks
            having green velvety growth especially in the rainy season). Thus trees are a good
            habitat for different organisms. Birds and squirrels come and go from a tree yet the tree
            is a habitat for them.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-emerald-800">6.4. Our house as a habitat :</h2>
          <p>
            We live in houses that protect us from heat, cold, rain and are a shelter for us. We keep
            some animals and birds as pets in our houses. We also grow some plants which give us fruits
            and vegetables.
          </p>

          <h2 className="font-heading text-base font-bold text-emerald-800 pt-2">Activity-4:</h2>
          <p className="italic text-foreground/75 text-xs">
            Discuss the different organisms living in your house. List them. Write in your note book.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 pt-2">
            <li>Can animals that live in our houses pet live in other places as well? Name the animals and also write the places where they can live.</li>
            <li>Animals not useful to us also live in our houses. Give examples of such animals.</li>
            <li>Why do only certain types of animals and plants live along with us?</li>
          </ul>

          <p className="pt-2">
            We domesticate some animals and plants for our needs and food. Think, why do we domesticate
            dogs and cats?
          </p>
          <p>
            Thus we can say that our house is also a habitat, isn&apos;t it? Several animals like dogs,
            cats, goats, cows, birds (like hens, ducks, pigeons), spiders, ants, cockroaches live
            with us. We keep plants like money plant and some crotons inside our houses.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Desert rats live longer than camels without drinking water.</TipBox>
      </div>
    </div>
  );
}
