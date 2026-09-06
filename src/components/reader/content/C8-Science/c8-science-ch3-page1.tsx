"use client";

import React, { useState } from "react";

export function C8ScienceCh3Page1() {
  const [tableData, setTableData] = useState({
    plant: "cotton saree, jute bag, linen shirt",
    animal: "silk saree, woolen sweater, blanket",
    synthetic: "nylon rope, polyester dress, acrylic shawl",
  });

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Chapter 3 Title Banner */}
      <div className="rounded-[22px] border-2 border-emerald-400 bg-gradient-to-r from-emerald-700 via-teal-800 to-emerald-950 p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white/15 px-4 py-2 backdrop-blur-xs border border-white/20">
              <span className="text-[11px] uppercase tracking-wider font-semibold opacity-80">Chapter</span>
              <span className="text-3xl font-extrabold font-heading">3</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tight">
                Synthetic Fibres and Plastics
              </h1>
              <p className="text-xs text-emerald-100/80 font-medium">Class 8 Science &bull; Chemistry</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Intro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column */}
        <div className="rounded-[20px] border border-emerald-200 bg-emerald-50/40 p-4 text-xs text-justify space-y-2">
          <p>
            In previous classes, you were familiar with different types of fibres. You know that clothes can be made from natural fibres such as cotton, silk and wool (<strong>figure-1</strong>). You also learnt how they are prepared.
          </p>
          <h3 className="font-heading text-sm font-bold text-emerald-950 pt-1">
            3.1 Clothes made of natural fibres
          </h3>
          <p>
            We wear a wide variety of fabrics in our daily life.
          </p>
          <ul className="list-disc list-inside text-emerald-950 font-semibold">
            <li>Are all of our clothes made of natural fibres?</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="rounded-[20px] border border-emerald-200 bg-emerald-50/40 p-4 text-xs text-justify space-y-2">
          <p>
            You might have heard about fabrics such as polyester, nylon and acrylic etc. They are examples of <strong>synthetic fibres</strong>.
          </p>
          <ul className="list-disc list-inside text-emerald-950 font-semibold">
            <li>Why do we call them synthetic?</li>
          </ul>
          <p>
            Synthetic fibres are not obtained from plant or animal sources. They are made from raw materials obtained from petroleum (petrochemicals). Synthetic fibres are used not only for fabrics but also in preparing many household articles.
          </p>
        </div>
      </div>

      {/* Fig 1: Clothes from Natural Resources */}
      <div className="flex flex-col items-center rounded-2xl border border-emerald-300 bg-white p-3 shadow-sm text-center">
        <img
          src="/assets/images/C8-Science/ch3_fig1.png"
          alt="Fig-1 Clothes from Natural Resources"
          className="max-h-24 w-auto object-contain rounded"
        />
        <span className="mt-1.5 text-xs font-medium text-foreground/75 italic">
          Fig-1 : Clothes from Natural Resources
        </span>
      </div>

      {/* Activity 1 */}
      <div className="rounded-[22px] border border-emerald-300 bg-white p-5 shadow-sm space-y-4">
        <div className="inline-block rounded-full bg-emerald-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
          Activity-1
        </div>
        <h3 className="font-heading text-sm font-bold text-emerald-950">
          Identify household articles made up of natural and synthetic fibres
        </h3>
        <p className="text-xs text-foreground/85">
          Identify the articles made of fibres at your home, school and in your surroundings and write their names against the relevant category in <strong>Table-1</strong>.
        </p>

        {/* Table 1 */}
        <div className="overflow-hidden rounded-xl border border-emerald-200">
          <div className="bg-emerald-700 p-2 text-center text-xs font-bold text-white font-heading">
            Table -1
          </div>
          <table className="w-full text-xs text-left">
            <thead className="bg-emerald-50 border-b border-emerald-200 text-emerald-950 font-heading">
              <tr>
                <th className="p-3 w-1/3 border-r border-emerald-200">Source</th>
                <th className="p-3">Articles / Object</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100">
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-emerald-950 border-r border-emerald-100">
                  Natural fibres from plants
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={tableData.plant}
                    onChange={(e) => setTableData({ ...tableData, plant: e.target.value })}
                    className="w-full rounded-md border border-emerald-200 p-1.5 text-xs focus:ring-1 focus:ring-emerald-500 bg-emerald-50/30"
                  />
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-emerald-950 border-r border-emerald-100">
                  Natural fibres from animals
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={tableData.animal}
                    onChange={(e) => setTableData({ ...tableData, animal: e.target.value })}
                    className="w-full rounded-md border border-emerald-200 p-1.5 text-xs focus:ring-1 focus:ring-emerald-500 bg-emerald-50/30"
                  />
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-emerald-950 border-r border-emerald-100">
                  Synthetic fibres
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={tableData.synthetic}
                    onChange={(e) => setTableData({ ...tableData, synthetic: e.target.value })}
                    className="w-full rounded-md border border-emerald-200 p-1.5 text-xs focus:ring-1 focus:ring-emerald-500 bg-emerald-50/30"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">34</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
      </div>
    </div>
  );
}
