"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

const DEFAULT_TABLE2_ROWS = [
  { sno: 1, activity: "Lowering a basket", isDefault: true },
  { sno: 2, activity: "", isDefault: false, placeholder: "e.g. Lifting a bucket of water" },
  { sno: 3, activity: "", isDefault: false, placeholder: "e.g. Peddling a bicycle" },
  { sno: 4, activity: "", isDefault: false, placeholder: "e.g. Kicking a football" },
  { sno: 5, activity: "", isDefault: false, placeholder: "e.g. Digging the soil" },
  { sno: 6, activity: "", isDefault: false, placeholder: "e.g. Brushing teeth" },
];

export function C8ScienceCh1Page7() {
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";

  const [rows, setRows] = useState<Record<number, string>>({
    1: "Lowering a basket",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });

  const storageKeyPrefix = "c8-science-ch1-table2";

  useEffect(() => {
    const saved: Record<number, string> = { 1: "Lowering a basket" };
    [2, 3, 4, 5, 6].forEach((sno) => {
      const val = localStorage.getItem(`${storageKeyPrefix}-${sno}`);
      if (val) saved[sno] = val;
    });
    setRows(saved);
  }, []);

  useEffect(() => {
    function handleReset() {
      const resetMap: Record<number, string> = { 1: "Lowering a basket" };
      [2, 3, 4, 5, 6].forEach((sno) => {
        localStorage.removeItem(`${storageKeyPrefix}-${sno}`);
        resetMap[sno] = "";
      });
      setRows(resetMap);
    }
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () => window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, []);

  const handleChange = (sno: number, val: string) => {
    setRows((prev) => ({ ...prev, [sno]: val }));
    localStorage.setItem(`${storageKeyPrefix}-${sno}`, val);
  };

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Table-2 and Muscle activity */}
        <div className="space-y-4 text-justify">
          <div className="space-y-1">
            <h3 className="font-heading text-sm font-bold text-fuchsia-950 text-center">
              Table-2
            </h3>
            <p className="text-xs text-foreground/70 text-center font-medium">
              List of activities where we exert force
            </p>
          </div>

          {/* Interactive Table-2 */}
          <div className="overflow-x-auto rounded-2xl border-2 border-fuchsia-200 bg-white shadow-sm">
            <table className="min-w-full border-collapse text-left text-xs font-body">
              <thead>
                <tr className="bg-fuchsia-200/80 text-fuchsia-950 font-heading font-bold uppercase tracking-wider">
                  <th className="border-b border-fuchsia-300 px-3 py-2.5 text-center w-14">Sl.No</th>
                  <th className="border-b border-l border-fuchsia-300 px-4 py-2.5">
                    List of activities where we exert force
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-fuchsia-100 font-medium">
                {DEFAULT_TABLE2_ROWS.map((row) => (
                  <tr key={row.sno} className="hover:bg-fuchsia-50/30 transition-colors">
                    <td className="px-3 py-2 text-center font-bold text-fuchsia-950">
                      {row.sno}
                    </td>
                    <td className="border-l border-fuchsia-100 px-3 py-1.5">
                      {row.isDefault ? (
                        <span className="font-semibold text-foreground/90 pl-1">{row.activity}</span>
                      ) : (
                        <input
                          type="text"
                          value={rows[row.sno] ?? ""}
                          onChange={(e) => handleChange(row.sno, e.target.value)}
                          placeholder={isRevealed ? row.placeholder?.replace("e.g. ", "") : row.placeholder}
                          className={`w-full rounded-lg border px-2.5 py-1 text-xs transition-all focus:outline-none ${
                            isRevealed
                              ? "border-fuchsia-300 bg-fuchsia-50/50 text-fuchsia-900 font-semibold"
                              : "border-fuchsia-200 bg-fuchsia-50/20 text-foreground focus:border-fuchsia-500 focus:bg-white focus:ring-1 focus:ring-fuchsia-500"
                          }`}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs">
            Usually we are unaware of the muscular forces that are responsible for the various actions taking place inside our body, like blood circulation, expansion and contraction of lungs during breathing, heart beat etc.
          </p>

          <ul className="rounded-xl border border-fuchsia-200 bg-fuchsia-50/40 p-3 text-xs text-fuchsia-950 font-semibold list-disc list-inside space-y-1">
            <li>Do you feel your muscles get tightened while performing any physical activity? What could be the reason for it?</li>
          </ul>

          {/* Activity-6 */}
          <div className="rounded-[18px] border border-fuchsia-200 bg-fuchsia-50/40 p-4 shadow-sm space-y-2">
            <div className="inline-block rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              Activity-6
            </div>
            <h4 className="font-heading text-sm font-bold text-fuchsia-950">
              Observing the changes in any muscle while working
            </h4>
            <p className="text-xs leading-relaxed text-foreground/85">
              Take a dumbbell and lift it in different ways. Observe while doing this exercise which muscle is going to be shortened. Ask your friends to do the same and observe the movement of their muscles.
            </p>
            <p className="text-xs leading-relaxed text-foreground/85">
              The term muscle refers to multiple bundles of muscle cells held together. Muscles are normally arranged in such a way that as one group of muscles contract or shortens, another group relaxes or expands. For example, when you are throwing a ball, the muscles in the front of the chest and shoulder expand and pull our hand forward, while the muscles in the back of the shoulder contract and control the movement of our hand.
            </p>
          </div>
        </div>

        {/* Right Column: 1.4.2 Force of Friction & Activity-7 */}
        <div className="space-y-4 text-justify">
          <div>
            <h3 className="font-heading text-base font-bold text-sky-950">
              1.4.2 Force of Friction
            </h3>
            <p className="mt-1 text-xs">
              When you roll a ball on a level ground it invariably stops after sometime.
            </p>
            <ul className="rounded-xl border border-sky-200 bg-sky-50/40 p-3 text-xs text-sky-950 font-semibold list-disc list-inside space-y-1 mt-2">
              <li>Why does the ball stop?</li>
              <li>Is there any hidden force which brings it to stop?</li>
            </ul>
          </div>

          <p className="text-xs">
            If you stop peddling your bicycle on a level road you observe that its speed decreases gradually.
          </p>

          <ul className="rounded-xl border border-sky-200 bg-sky-50/40 p-3 text-xs text-sky-950 font-semibold list-disc list-inside space-y-1">
            <li>Why does the speed of the bicycle decrease gradually?</li>
            <li>Is there any force acting on it which tends to reduce its speed?</li>
          </ul>

          <p className="text-xs">
            Does the change in speed of the ball and bicycle depend on roughness and smoothness of the surface on which they move? Let us find out.
          </p>

          {/* Activity-7 */}
          <div className="rounded-[18px] border border-sky-200 bg-sky-50/40 p-4 shadow-sm space-y-2">
            <div className="inline-block rounded-full bg-sky-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              Activity-7
            </div>
            <h4 className="font-heading text-sm font-bold text-sky-950">
              Observing the motion of a ball on different surfaces
            </h4>
            <p className="text-xs leading-relaxed text-foreground/85">
              Try to roll a ball on different surfaces like carpet, rough roads, smooth floor etc. See that surfaces are plane, exerted force is same.
            </p>
            <ul className="text-xs text-sky-950 font-semibold list-disc list-inside space-y-1">
              <li>On which surface does the ball roll farther?</li>
            </ul>
            <p className="text-xs leading-relaxed text-foreground/85">
              The motion of the ball is different in each case. The force of resistance to the motion seems to be more on the rough surface than on the smooth surface. The rolling ball moves farther on a smooth marble floor than on a rough sandy surface.
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">7</span>
      </div>
    </div>
  );
}
