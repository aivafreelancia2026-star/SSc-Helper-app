import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh10Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Table 3 - Styled HTML Table */}
      <div className="space-y-2">
        <p className="font-heading text-sm font-bold text-indigo-900 text-center">
          Table 3: Indicators and causes of the change
        </p>
        <div className="overflow-x-auto rounded-2xl border border-indigo-100 bg-white/70 shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-indigo-50 border-b border-indigo-100 font-heading text-[10px] font-bold text-indigo-900 uppercase">
              <tr>
                <th className="py-2 px-3 border-r border-indigo-100 w-12 text-center">S.No.</th>
                <th className="py-2 px-4 border-r border-indigo-100 w-44">Change</th>
                <th className="py-2 px-4 border-r border-indigo-100 w-56">Indicators of change</th>
                <th className="py-2 px-4">Causes of the change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-50 text-foreground/80">
              <tr className="hover:bg-indigo-50/20">
                <td className="py-2 px-3 border-r border-indigo-100 text-center font-bold">1.</td>
                <td className="py-2 px-4 border-r border-indigo-100 font-semibold text-indigo-950">Change from milk to curd</td>
                <td className="py-2 px-4 border-r border-indigo-100">
                  <ul className="list-disc pl-4 space-y-0.5">
                    <li>Change in state</li>
                    <li>Change in taste</li>
                    <li>Change in smell</li>
                  </ul>
                </td>
                <td className="py-2 px-4 leading-relaxed">
                  The small quantity of curd added to warm milk makes certain bacteria to grow in the
                  milk and it converts milk into curd.
                </td>
              </tr>
              <tr className="hover:bg-indigo-50/20">
                <td className="py-2 px-3 border-r border-indigo-100 text-center font-bold">2.</td>
                <td className="py-2 px-4 border-r border-indigo-100 font-semibold text-indigo-950">Changes in seasons</td>
                <td className="py-2 px-4 border-r border-indigo-100">
                  <ul className="list-disc pl-4 space-y-0.5">
                    <li>Change in dress we wear.</li>
                    <li>Change in coldness or hotness of air.</li>
                    <li>Change in food we take and drinks.</li>
                    <li>Change in availability duration of a day and night.</li>
                    <li>Change in the fruits and flowers.</li>
                  </ul>
                </td>
                <td className="py-2 px-4 leading-relaxed">
                  The slight change in the direction of sun rise.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            If we compare the two changes i.e. the &ldquo;change from milk to curd&rdquo; and &ldquo;change
            of seasons&rdquo;, we notice that the change of seasons is slow when compared to change of milk
            to curd.
          </p>
          <p>
            But if we compare change of milk to curd and change in electric bulb due to the switch being on
            or off, the change of milk to curd is a slow change.
          </p>
          <p>
            Thus the change of milk to curd is a fast change when compared with change of season but it is a
            slow change when compared with change in electric bulb being put on or off.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <p>
            Therefore, whether a change is slow or fast it can be understood only by comparing the changes.
          </p>
          <p>
            Similarly, the comparison of above two changes explains that change of seasons takes place
            naturally, but to change milk into curd we need to add some curd to the warm milk and keep it in
            such a way that it is not shaken and remains warm. Thus we need some initiation and intervention
            from human beings to bring a change in the milk.
          </p>
          <p>
            Also, seasonal changes are temporary as these changes repeat regularly.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Curd is a dairy product obtained by curdling (coagulating) milk with rennet.</TipBox>
      </div>
    </div>
  );
}
