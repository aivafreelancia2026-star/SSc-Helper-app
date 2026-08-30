import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh13Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>How many smaller parts are there in each figure?</li>
            <li>Are all the smaller parts in both figures equal?</li>
            <li>What is the shape of the smaller part in each diagram?</li>
            <li>Is the length and breadth of each smaller part equal?</li>
            <li>Measure the length and breadth of any one part of each diagram. What do you notice?</li>
          </ul>

          <p className="text-xs">
            You may notice that the small parts in each diagram have equal length and breadth, one
            centimeter each. This small part is called <strong>square unit.</strong>
          </p>

          {/* Table 3: Units of measurement - Standard HTML Table */}
          <div className="space-y-2 pt-2">
            <p className="font-heading text-xs font-bold text-sky-900 text-center">
              Table 3: Units of measurement
            </p>
            <div className="overflow-x-auto rounded-xl border border-sky-100 bg-white/70 shadow-xs">
              <table className="w-full text-center text-xs border-collapse">
                <thead className="bg-sky-50 border-b border-sky-100 font-heading text-[10px] font-bold text-sky-900 uppercase">
                  <tr>
                    <th className="py-2 px-2 border-r border-sky-100">S.No.</th>
                    <th className="py-2 px-3 border-r border-sky-100">Units of Length</th>
                    <th className="py-2 px-2 border-r border-sky-100">Symbol</th>
                    <th className="py-2 px-3 border-r border-sky-100">Units of Area</th>
                    <th className="py-2 px-2">Symbol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-50 text-foreground/85">
                  <tr className="hover:bg-sky-50/20">
                    <td className="py-1.5 px-2 border-r border-sky-100 font-bold">1</td>
                    <td className="py-1.5 px-3 border-r border-sky-100">metre</td>
                    <td className="py-1.5 px-2 border-r border-sky-100 font-mono">m</td>
                    <td className="py-1.5 px-3 border-r border-sky-100">Square metre</td>
                    <td className="py-1.5 px-2 font-mono">m²</td>
                  </tr>
                  <tr className="hover:bg-sky-50/20">
                    <td className="py-1.5 px-2 border-r border-sky-100 font-bold">2</td>
                    <td className="py-1.5 px-3 border-r border-sky-100">centimetre</td>
                    <td className="py-1.5 px-2 border-r border-sky-100 font-mono">cm</td>
                    <td className="py-1.5 px-3 border-r border-sky-100">Square Centimetre</td>
                    <td className="py-1.5 px-2 font-mono">cm²</td>
                  </tr>
                  <tr className="hover:bg-sky-50/20">
                    <td className="py-1.5 px-2 border-r border-sky-100 font-bold">3</td>
                    <td className="py-1.5 px-3 border-r border-sky-100">millimetre</td>
                    <td className="py-1.5 px-2 border-r border-sky-100 font-mono">mm</td>
                    <td className="py-1.5 px-3 border-r border-sky-100">Square millimetre</td>
                    <td className="py-1.5 px-2 font-mono">mm²</td>
                  </tr>
                  <tr className="hover:bg-sky-50/20">
                    <td className="py-1.5 px-2 border-r border-sky-100 font-bold">4</td>
                    <td className="py-1.5 px-3 border-r border-sky-100">foot</td>
                    <td className="py-1.5 px-2 border-r border-sky-100 font-mono">ft</td>
                    <td className="py-1.5 px-3 border-r border-sky-100">Square feet</td>
                    <td className="py-1.5 px-2 font-mono">ft²</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <p className="text-xs">
            Area of each part is equal to one square centimetre and it is written as cm².
          </p>
          <p className="text-xs">
            Since Fig. 14 (a) and 14 (b) have same number of squares (of area 1 cm² each) both the
            figures have a total area of 16 cm² each.
          </p>
          <p className="text-xs font-semibold text-sky-900">
            Thus, these figures have different shapes but equal areas.
          </p>
          <p className="text-xs">
            Square centimetre (cm²) is a standard unit to measure the area of a surface.
          </p>
          <p className="text-xs">
            We use m² (square metre), mm² (square millimetre), foot² (square foot), etc., also to measure
            the areas according to need and requirement of the situation.
          </p>

          <h2 className="font-heading text-base font-bold text-sky-800 pt-2">
            Activity-6: Measuring the area of a regular surface
          </h2>
          <p className="text-xs">
            Cut a cardboard into a shape of rectangle having length 4 cm and breadth 2 cm as shown in Fig. 15.
            Let us measure its area.
          </p>
          <p className="text-xs">
            The convenient unit to measure the area of given cardboard would be cm². Take a centimetre
            graph paper.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>The distance travelled by Aeroplane or Ship is measured by knots or nautical miles. 1 Knot is equal to 1.852 Km/h.</TipBox>
      </div>
    </div>
  );
}
