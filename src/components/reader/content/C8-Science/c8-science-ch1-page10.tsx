"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { RESET_PAGE_ANSWERS_EVENT } from "@/lib/reset-event";

const DEFAULT_LAB_ROWS = [
  { sno: 1, type: "Cotton thread", force: "" },
  { sno: 2, type: "Nylon thread", force: "" },
  { sno: 3, type: "Silk thread", force: "" },
  { sno: 4, type: "Jute thread", force: "" },
];

export function C8ScienceCh1Page10() {
  const searchParams = useSearchParams();
  const isRevealed = searchParams.get("reveal") === "1";

  const [forces, setForces] = useState<Record<number, string>>({
    1: "",
    2: "",
    3: "",
    4: "",
  });

  const storageKeyPrefix = "c8-science-ch1-lab-forces";

  useEffect(() => {
    const saved: Record<number, string> = {};
    [1, 2, 3, 4].forEach((sno) => {
      const val = localStorage.getItem(`${storageKeyPrefix}-${sno}`);
      if (val) saved[sno] = val;
    });
    setForces(saved);
  }, []);

  useEffect(() => {
    function handleReset() {
      const resetMap: Record<number, string> = {};
      [1, 2, 3, 4].forEach((sno) => {
        localStorage.removeItem(`${storageKeyPrefix}-${sno}`);
        resetMap[sno] = "";
      });
      setForces(resetMap);
    }
    window.addEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
    return () => window.removeEventListener(RESET_PAGE_ANSWERS_EVENT, handleReset);
  }, []);

  const handleChange = (sno: number, val: string) => {
    setForces((prev) => ({ ...prev, [sno]: val }));
    localStorage.setItem(`${storageKeyPrefix}-${sno}`, val);
  };

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Lab Activity */}
        <div className="space-y-4 text-justify">
          <p className="text-xs">
            to downward gravitational force but in opposite direction. Hence, the two forces balance each other.
          </p>

          {/* Lab Activity Box */}
          <div className="rounded-[18px] border-2 border-fuchsia-300 bg-fuchsia-50/40 p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-fuchsia-800 text-white font-bold text-xs">
                🔬
              </span>
              <h3 className="font-heading text-sm font-bold text-fuchsia-950 uppercase tracking-wide">
                Lab Activity
              </h3>
            </div>

            <p className="text-xs">
              <strong className="text-fuchsia-950">Aim:</strong> To find the limiting force that can be borne by a string.
            </p>

            <p className="text-xs">
              <strong className="text-fuchsia-950">Material used:</strong> Spring balance, weights, light strings are of 10 cm length and of equal thickness, weight hanger.
            </p>

            <div className="flex items-start gap-4">
              <div className="space-y-2 flex-1 text-xs">
                <p className="font-bold text-fuchsia-950">Procedure:</p>
                <p>
                  1. Arrange the system as shown in figure-11. Put some small weights like 50 gm on the weight hanger and note the readings of the spring balance. Now, add some more weights to the hanger and note the readings of spring balance.
                </p>
                <p>
                  Do the same till the string is broken. Note the reading of the balance in the following table when the string is broken.
                </p>
                <p>
                  Find out the limiting force of different types of strings and mention the values in the given table.
                </p>
              </div>

              {/* Fig-11 Container */}
              <div className="flex flex-col items-center rounded-xl border border-fuchsia-200 bg-white p-2 shadow-2xs text-center w-24">
                <img
                  src="/assets/images/C8-Science/ch1_fig11.png"
                  alt="Fig-11 Spring balance"
                  className="h-32 w-auto object-contain rounded"
                />
                <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
                  Fig-11
                </span>
              </div>
            </div>

            {/* Interactive Lab Table */}
            <div className="overflow-x-auto rounded-xl border border-fuchsia-200 bg-white shadow-2xs">
              <table className="min-w-full border-collapse text-left text-xs font-body">
                <thead>
                  <tr className="bg-fuchsia-200/80 text-fuchsia-950 font-heading font-bold uppercase">
                    <th className="border-b border-fuchsia-300 px-2.5 py-2 text-center w-12">Sl.No.</th>
                    <th className="border-b border-l border-fuchsia-300 px-3 py-2">Type of String</th>
                    <th className="border-b border-l border-fuchsia-300 px-3 py-2 text-center">Limiting Force</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-fuchsia-100 font-medium">
                  {DEFAULT_LAB_ROWS.map((row) => (
                    <tr key={row.sno} className="hover:bg-fuchsia-50/30">
                      <td className="px-2.5 py-1.5 text-center font-bold text-fuchsia-950">
                        {row.sno}
                      </td>
                      <td className="border-l border-fuchsia-100 px-3 py-1.5 text-foreground/90">
                        {row.type}
                      </td>
                      <td className="border-l border-fuchsia-100 px-2 py-1">
                        <input
                          type="text"
                          value={forces[row.sno] ?? ""}
                          onChange={(e) => handleChange(row.sno, e.target.value)}
                          placeholder={isRevealed ? "e.g. 2.5 N" : "Record value (N)"}
                          className="w-full rounded border border-fuchsia-200 bg-fuchsia-50/20 px-2 py-0.5 text-xs text-center focus:border-fuchsia-500 focus:outline-none"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-foreground/80">
              2. Separate the whole system from the ceiling, and tie the string to weight hanger and now slowly pull up the whole system with your hand when there is a small weight on the hanger.
            </p>
          </div>
        </div>

        {/* Right Column: Lab Observations, Think & Discuss, Net Force */}
        <div className="space-y-4 text-justify">
          <p className="text-xs">
            While pulling up, note the readings of spring balance. Similarly, while slowly moving down, note the readings of spring balance.
          </p>

          <ul className="rounded-xl border border-sky-200 bg-sky-50/40 p-3 text-xs text-sky-950 font-semibold list-disc list-inside space-y-1">
            <li>What do you observe from the readings when it is pulled up and released to move down?</li>
            <li>Is the string broken when the whole system is pulled quickly up?</li>
          </ul>

          {/* Think and Discuss Card */}
          <div className="rounded-[18px] border-2 border-fuchsia-300 bg-fuchsia-50/50 p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-fuchsia-800 text-white font-bold text-xs">
                💡
              </span>
              <h3 className="font-heading text-sm font-bold text-fuchsia-950">
                Think and discuss
              </h3>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs leading-relaxed text-foreground/85 flex-1">
                A system of two bodies A and B are placed as shown in figure. How many forces are acting on A and B respectively?
              </p>
              <div className="rounded-lg border border-fuchsia-200 bg-white p-1.5 shadow-2xs">
                <img
                  src="/assets/images/C8-Science/ch1_fig_blocks.png"
                  alt="Block A on Block B"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>

            <p className="text-xs leading-relaxed text-foreground/85">
              Why is it necessary to separate contact force into a normal force and frictional force? Give at least two reasons.
            </p>
          </div>

          {/* Section 1.5 Net Force */}
          <div className="pt-2 border-t border-sky-200/60 space-y-3">
            <h2 className="font-heading text-base font-bold text-sky-950">
              1.5 Net force
            </h2>
            <p className="text-xs">
              In reality, many forces can act simultaneously on a body. For example, there exists two forces on an object at rest placed on a horizontal floor. One is gravitational force (vertically down) and other is normal force (vertically up).
            </p>
            <p className="text-xs">
              Do you observe any change in the state of rest of that object because of these forces? Obviously your answer is &ldquo;No&rdquo;.
            </p>
            <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3 text-xs text-sky-950 font-semibold">
              In this case two forces acting on the object are equal and opposite in direction. Hence, the object remains in the state of rest.
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">10</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-fuchsia-900 font-semibold">Force</span>
      </div>
    </div>
  );
}
