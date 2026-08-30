import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh13Page11() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">
            Neglect those squares, inside the boundary, which are less than half.
          </p>
          <p className="text-xs">
            This process will give us the value of area which is close to the actual area.
          </p>
          <p className="text-xs font-semibold text-sky-850">
            How can you use the graph paper to get a more accurate answer? Think!
          </p>

          <h2 className="font-heading text-base font-bold text-sky-800 pt-2">
            13.7. Measurement of volume :
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>How do you find the volume of a solid?</li>
          </ul>
          
          <p className="text-xs">
            Janakamma is constructing a house. She needs sand and enquired about prices. The supplier
            informed her that two tractor loads of sand costs Rs. 4000/- and one lorry load of sand
            costs about Rs. 4000/-.
          </p>
          
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
            <li>Which deal is cheaper for Janakamma? A lorry load or two tractor loads of sand?</li>
            <li>How can you decide which load has more quantity of sand?</li>
          </ul>
          <p className="text-xs">
            To decide the volume of sand contained either in a lorry or tractor, we need to know the
            volume of the body of lorry as well as that of the body of tractor.
          </p>
          <p className="text-xs font-bold text-sky-950 bg-sky-50 border border-sky-100 rounded-xl p-3">
            Volume is a measure of the extent of space occupied by a body.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-sky-800">
            13.8. Measurement of volume of liquids:
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>How can you measure the volume of kerosene?</li>
            <li>How do you decide the volume of milk?</li>
          </ul>
          <p className="text-xs">
            We use some measuring cylinders to measure the volumes of liquids such as kerosene, milk,
            oils, water, etc. The volume of liquids is expressed in litres (l) or millilitres (ml).
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[130px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig17.png"
              alt="Fig. 17 — Labeled graduated measuring cylinder cylinder for liquid volume"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 17: Measuring cylinder
            </p>
          </div>

          <div className="rounded-[16px] border border-sky-100 bg-sky-50/50 p-4">
            <p className="font-heading text-xs font-bold text-sky-950 mb-1">Measuring cylinder :</p>
            <p className="text-[11px] leading-relaxed text-foreground/80">
              It is cylindrical in shape, with graduations marked on its body. Measuring cylinders are
              available in different sizes. They are used in laboratories to measure a certain volume of
              a liquid and to measure milk, oils, etc by shop keepers. We can fill it with the liquid to
              be measured and then read the marking at the lowest point of the concave surface of liquid.
              We must bring our eyes in line with this level of liquid and then read it.
            </p>
          </div>

          <p className="text-xs">
            Apart from measuring the volumes of liquids, we also measure the volumes of solids, for example,
            loose solids like sand, clay, and ready mix of cement, sand, concrete which is used for laying
            slabs while constructing houses.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Astronomers use a method called parallax to measure the distance to some stars</TipBox>
      </div>
    </div>
  );
}
