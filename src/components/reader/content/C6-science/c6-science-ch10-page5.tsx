import { TipBox } from "@/components/reader/tip-box";

const TABLE2_DATA = [
  { day: 1, decSR: "06:29", decSS: "17:40", maySR: "05:51", maySS: "18:36" },
  { day: 2, decSR: "06:30", decSS: "17:40", maySR: "05:50", maySS: "18:36" },
  { day: 3, decSR: "06:31", decSS: "17:41", maySR: "05:50", maySS: "18:37" },
  { day: 4, decSR: "06:31", decSS: "17:41", maySR: "05:49", maySS: "18:37" },
  { day: 5, decSR: "06:32", decSS: "17:41", maySR: "05:49", maySS: "18:37" },
  { day: 6, decSR: "06:32", decSS: "17:41", maySR: "05:48", maySS: "18:38" },
  { day: 7, decSR: "06:33", decSS: "17:41", maySR: "05:48", maySS: "18:38" },
  { day: 8, decSR: "06:34", decSS: "17:42", maySR: "05:47", maySS: "18:38" },
  { day: 9, decSR: "06:34", decSS: "17:42", maySR: "05:47", maySS: "18:38" },
  { day: 10, decSR: "06:35", decSS: "17:42", maySR: "05:46", maySS: "18:39" },
  { day: 11, decSR: "06:35", decSS: "17:43", maySR: "05:46", maySS: "18:39" },
  { day: 12, decSR: "06:36", decSS: "17:43", maySR: "05:46", maySS: "18:39" },
  { day: 13, decSR: "06:37", decSS: "17:43", maySR: "05:45", maySS: "18:40" },
  { day: 14, decSR: "06:37", decSS: "17:44", maySR: "05:45", maySS: "18:40" },
  { day: 15, decSR: "06:38", decSS: "17:44", maySR: "05:45", maySS: "18:41" },
  { day: 16, decSR: "06:38", decSS: "17:45", maySR: "05:44", maySS: "18:41" },
  { day: 17, decSR: "06:39", decSS: "17:45", maySR: "05:44", maySS: "18:41" },
  { day: 18, decSR: "06:39", decSS: "17:45", maySR: "05:44", maySS: "18:42" },
  { day: 19, decSR: "06:40", decSS: "17:46", maySR: "05:43", maySS: "18:42" },
  { day: 20, decSR: "06:40", decSS: "17:46", maySR: "05:43", maySS: "18:42" },
  { day: 21, decSR: "06:41", decSS: "17:47", maySR: "05:43", maySS: "18:43" },
  { day: 22, decSR: "06:41", decSS: "17:47", maySR: "05:43", maySS: "18:43" },
  { day: 23, decSR: "06:42", decSS: "17:48", maySR: "05:42", maySS: "18:43" },
  { day: 24, decSR: "06:42", decSS: "17:48", maySR: "05:42", maySS: "18:44" },
  { day: 25, decSR: "06:43", decSS: "17:49", maySR: "05:42", maySS: "18:44" },
  { day: 26, decSR: "06:43", decSS: "17:49", maySR: "05:42", maySS: "18:45" },
  { day: 27, decSR: "06:44", decSS: "17:50", maySR: "05:42", maySS: "18:45" },
  { day: 28, decSR: "06:44", decSS: "17:50", maySR: "05:42", maySS: "18:45" },
  { day: 29, decSR: "06:45", decSS: "17:51", maySR: "05:41", maySS: "18:46" },
  { day: 30, decSR: "06:45", decSS: "17:52", maySR: "05:41", maySS: "18:46" },
  { day: 31, decSR: "06:46", decSS: "17:52", maySR: "05:41", maySS: "18:46" },
];

export function C6ScienceCh10Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Similarly we observe that in the winter season is cool and hot in summer season in our
            surroundings.
          </p>
          <p>In winter, duration of night is longer than in summer.</p>
          <p>
            We take cool drinks in summer but prefer hot tea, coffee or milk in winter. These changes
            that we observe, show the change of seasons.
          </p>
          
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Which of the above changes are because of changes in seasons?</li>
            <li>Which changes could possibly be the causes for the change in seasons?</li>
            <li>List the changes that you think are caused by the change of seasons.</li>
          </ul>

          <p>We also need to think about the reasons for changing seasons.</p>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">
            Activity-3: Comparing duration of day in December and May.
          </h2>
          <p>
            See table 2, shows time of sunrise and sunset at a particular place in the month of December,
            and shows the same information in the month of May. Is there any changes observed in day
            time of everyday.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What is the duration of the longest day in December?</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <p className="font-heading text-sm font-bold text-indigo-900 text-center mb-1">
            Table-2: Sunrise & Sunset Timings
          </p>

          <div className="overflow-x-auto rounded-xl border border-indigo-100 bg-white/70 shadow-xs max-h-[360px] overflow-y-auto">
            <table className="w-full text-center text-xs border-collapse">
              <thead className="sticky top-0 bg-indigo-50 border-b border-indigo-100 font-heading text-[10px] font-bold text-indigo-900 uppercase">
                <tr>
                  <th className="py-1 px-2 border-r border-indigo-100" rowSpan={2}>Day</th>
                  <th className="py-1 px-2 border-r border-indigo-100" colSpan={2}>December (1)</th>
                  <th className="py-1 px-2" colSpan={2}>May (2)</th>
                </tr>
                <tr className="border-t border-indigo-100">
                  <th className="py-1 px-1 border-r border-indigo-100">Sunrise</th>
                  <th className="py-1 px-1 border-r border-indigo-100">Sunset</th>
                  <th className="py-1 px-1 border-r border-indigo-100">Sunrise</th>
                  <th className="py-1 px-1">Sunset</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-50 font-mono text-[11px] text-foreground/85">
                {TABLE2_DATA.map((row) => (
                  <tr key={row.day} className="hover:bg-indigo-50/30">
                    <td className="py-0.5 px-2 border-r border-indigo-100 font-bold bg-indigo-50/10">{row.day}</td>
                    <td className="py-0.5 px-1 border-r border-indigo-100">{row.decSR}</td>
                    <td className="py-0.5 px-1 border-r border-indigo-100">{row.decSS}</td>
                    <td className="py-0.5 px-1 border-r border-indigo-100">{row.maySR}</td>
                    <td className="py-0.5 px-1">{row.maySS}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>The seasons and changes in weather occur because earth rotates on its tilted axis.</TipBox>
      </div>
    </div>
  );
}
