import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh6Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Great water boatman, leech and mosquito larva are found either below the surface water or
            in midwater. Fish and crabs also swim around this region. Pond margins have several grasses,
            frogs, crabs, cranes, etc. Fish usually lay eggs here.
          </p>
          <p>
            The bottom of the pond has plants like Hydrilla and animals like mussels, flatworms and
            some maggots (larva of some flies). Light is minimum here, but food, in the form of dead
            and decaying matter is in plenty.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-emerald-800">
            Activity-2: Organisms that live in different levels of a pond
          </h2>
          <p>
            Observe the pond or tank in your surroundings. Try to answer the following questions on
            the basis of what you have read so far:
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Name some organisms living in different regions in the pond? What makes them to stay in there?</li>
            <li>Can different regions in the pond also be called as habitat? Why or why not?</li>
            <li>Is there any animal with legs in the pond?</li>
            <li>Do all animals in the pond have tails?</li>
            <li>Do all animals in a pond float?</li>
            <li>What are the animals that share the surface of the pond as habitat?</li>
            <li>
              Are leaves of all plants growing in the pond similar? What is the difference between the
              leaves of a plant growing at the bottom (hydrilla) and that floating on the surface (lotus)?
              Try to think and write why such difference may be there.
            </li>
          </ul>

          <p className="pt-2">
            In all ponds we can see both plants and animals. The plants that we see in water are
            called <strong>aquatic plants.</strong> Animals are called <strong>aquatic animals.</strong>{" "}
            This type of habitat is said to be an <strong>aquatic habitat.</strong>
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>A wide variety of fauna is found near rivers, sea shores for food habitat and reproduction.</TipBox>
      </div>
    </div>
  );
}
