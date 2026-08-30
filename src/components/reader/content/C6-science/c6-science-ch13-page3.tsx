import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh13Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="font-heading text-base font-bold text-sky-800">
            13.2. The story of the scale
          </h2>
          <p className="text-xs">
            Many hundred years ago, people used to measure distances with their hand-spans, cubits,
            strides or foot-spans. One day a very tall man went to a shop to buy some cloth. He asked for
            three-and-a-half cubit length of cloth. The shopkeeper measured three cubit lengths of cloth
            and then added approximately another half-cubit length and gave it to the man.
          </p>
          <p className="text-xs">
            The man felt that the shopkeeper had cheated him. So he measured the cloth with his cubit and
            found that the cloth was not even three cubit lengths. He told the shopkeeper that the length
            of the cloth was less than three-and-a-half cubit when he measured with his own cubit. The shop
            keeper replied that his own arm was the standard for measuring. They both argued about whose
            cubit was to be taken as standard measure. In those days, people used to measure the length of
            fields with ropes. Some people used to argue that measurements are not correct and end up in a
            fight.
          </p>
          
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Whose cubit should be taken as standard for measurement?</li>
            <li>How should one measure a half or a quarter cubit length?</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <p className="text-xs">
            No one in those days could give scientific and satisfactory answer to such questions.
          </p>
          <p className="text-xs">
            Finally, some sensible people got together and decided to have a scale of a fixed length. In
            order to measure subunits, they marked this scale with several smaller but equal divisions. They
            then decided that everyone would measure lengths with this scale. They used wood and metal to
            make scales of the same length.
          </p>
          <p className="text-xs">
            At one place, people decided to use the distance between the nose and the tip of the middle
            finger of their king as a measure (Fig. 5). They called this distance <strong>one yard.</strong>
            They used wood and metal to make scales of this length and called this distance one yard.
          </p>
          <p className="text-xs">
            This yard was divided into three equal parts and each part was called a foot. They then divided
            each foot into twelve equal parts called inches. They even divided each inch into smaller
            segments!
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig5.png"
              alt="Fig. 5 — Historical yard metric defined by the king's arm span from nose to finger tip"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 5
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>By using protractor of a Geometry box, we can measure angles less than 180°.</TipBox>
      </div>
    </div>
  );
}
