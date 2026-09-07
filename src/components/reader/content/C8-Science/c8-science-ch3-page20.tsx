"use client";

import React, { useState } from "react";

export function C8ScienceCh3Page20() {
  const [activeTab, setActiveTab] = useState<"exp1" | "exp2" | "proj3">("exp1");

  const recyclingCodeChart = [
    { code: 1, acronym: "PET", name: "Polyethylene Terephthalate", uses: "Water & soda bottles, jars", recycled: "Yes (Commonly)", newProduct: "Fleece jackets, carpet fibres, tote bags" },
    { code: 2, acronym: "HDPE", name: "High-Density Polyethylene", uses: "Milk containers, shampoo bottles, buckets", recycled: "Yes (Widely)", newProduct: "Detergent bottles, piping, recycling bins" },
    { code: 3, acronym: "PVC", name: "Polyvinyl Chloride", uses: "Plumbing pipes, cable insulation, window frames", recycled: "Rarely", newProduct: "Speed bumps, mud flaps, flooring" },
    { code: 4, acronym: "LDPE", name: "Low-Density Polyethylene", uses: "Grocery carry bags, squeeze bottles, shrink wraps", recycled: "Low rate", newProduct: "Trash can liners, plastic lumber" },
    { code: 5, acronym: "PP", name: "Polypropylene", uses: "Medicine bottles, straws, yogurt cups, syrup bottles", recycled: "Increasing", newProduct: "Battery cables, brooms, ice scrapers" },
    { code: 6, acronym: "PS", name: "Polystyrene", uses: "Disposable coffee cups, egg cartons, packing peanuts", recycled: "Difficult", newProduct: "Insulation panels, egg cartons, rulers" },
    { code: 7, acronym: "OTHER", name: "Miscellaneous / Composite Resins", uses: "Eyeglasses, baby bottles, electronic casings", recycled: "Rarely", newProduct: "Custom plastic lumber & industrial parts" },
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Experiments Section */}
      <div className="rounded-[22px] border-2 border-emerald-400 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-emerald-200 pb-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-700 text-white text-xs font-mono font-bold shadow-2xs">
            🔬
          </span>
          <h3 className="font-heading text-sm font-bold text-emerald-950">
            Experiments
          </h3>
        </div>

        <div className="space-y-3 text-xs text-emerald-950">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3.5 space-y-1.5">
            <strong className="block font-heading text-xs font-bold text-emerald-900">
              1. Conduct an experiment to identify Thermoplastics and Thermosetting plastics and prepare a report.
            </strong>
            <p className="text-[11px] text-foreground/80 leading-relaxed">
              Take samples of combs, switches, toothbrush handles, pan handles, and bucket pieces. Hold each with tongs over a flame. Record whether the sample deforms and melts (thermoplastic) or retains its form and chars without softening (thermosetting plastic).
            </p>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3.5 space-y-1.5">
            <strong className="block font-heading text-xs font-bold text-emerald-900">
              2. Take wool, silk, cotton thread, bandage, piece of umbrella cloth, thread of sweater, and piece of rope and carefully conduct a flame test. Based on smell and type of melting, classify them as natural and artificial fibres.
            </strong>
            <p className="text-[11px] text-foreground/80 leading-relaxed">
              <strong>Observations:</strong> Cotton and bandage burn with a paper odor and powdery ash (plant cellulose); wool and silk burn slowly with burning hair odor and crumbly black bead (natural protein); umbrella cloth and nylon rope melt, shrink, and form hard uncrushable plastic beads (synthetic polymers).
            </p>
          </div>
        </div>
      </div>

      {/* Project Works Section */}
      <div className="rounded-[22px] border-2 border-teal-400 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-teal-200 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-700 text-white text-xs font-mono font-bold shadow-2xs">
              📊
            </span>
            <h3 className="font-heading text-sm font-bold text-teal-950">
              Project Works
            </h3>
          </div>
          <span className="text-[10px] text-muted-foreground italic">
            Student Research Guides
          </span>
        </div>

        <div className="space-y-3 text-xs text-teal-950">
          <div className="rounded-xl border border-teal-200 bg-teal-50/30 p-3.5 space-y-1">
            <strong className="block font-heading text-xs font-bold text-teal-900">
              1. Prepare a table of various synthetic fibres which are used to make household articles from them.
            </strong>
            <p className="text-[11px] text-foreground/80">
              Include Nylon (ropes, bristles, stockings), Polyester (curtains, PET bottles, dress material), Acrylic (blankets, sweaters, rugs), and Rayon (bedsheets, surgical dressings).
            </p>
          </div>

          <div className="rounded-xl border border-teal-200 bg-teal-50/30 p-3.5 space-y-1">
            <strong className="block font-heading text-xs font-bold text-teal-900">
              2. Collect figures made up of thermosetting and thermoplastics used in your daily life and make a poster.
            </strong>
            <p className="text-[11px] text-foreground/80">
              Create dual visual columns on chart paper categorizing household objects (Thermoplastics: toys, combs, PVC pipes; Thermosetting: Bakelite switches, Melamine crockery, cooker handles).
            </p>
          </div>

          {/* Project 3 Interactive Chart */}
          <div className="rounded-xl border border-teal-300 bg-teal-50/50 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <strong className="font-heading text-xs font-bold text-teal-950">
                3. Interactive Resin Identification Code (SPI) Chart
              </strong>
            </div>

            <p className="text-[11px] text-teal-900">
              Prepare a comprehensive chart explaining resin codes, full names, acronyms, common household articles, recyclability, and secondary recycled products:
            </p>

            <div className="overflow-x-auto rounded-xl border border-teal-200">
              <table className="w-full text-left text-[10.5px]">
                <thead className="bg-teal-100/90 text-teal-950 font-heading">
                  <tr>
                    <th className="p-2 border-b border-teal-200 text-center w-12">Code</th>
                    <th className="p-2 border-b border-teal-200">Acronym & Name</th>
                    <th className="p-2 border-b border-teal-200">Household Articles</th>
                    <th className="p-2 border-b border-teal-200">Recycled Products</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-100 bg-white">
                  {recyclingCodeChart.map((row) => (
                    <tr key={row.code} className={row.code % 2 === 0 ? "bg-teal-50/30" : ""}>
                      <td className="p-2 text-center font-mono font-bold text-teal-900">♳ {row.code}</td>
                      <td className="p-2 font-medium text-teal-950">
                        <span className="font-bold">{row.acronym}</span> ({row.name})
                      </td>
                      <td className="p-2 text-foreground/80">{row.uses}</td>
                      <td className="p-2 text-foreground/80">{row.newProduct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">53</span>
      </div>
    </div>
  );
}
