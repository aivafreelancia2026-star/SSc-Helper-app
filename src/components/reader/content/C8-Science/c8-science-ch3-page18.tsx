"use client";

import React, { useState } from "react";

export function C8ScienceCh3Page18() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const keyLearnings = [
    "Synthetic fibres are made of very large repeating units called polymers.",
    "Rayon is artificial silk made from regenerated wood cellulose fibre.",
    "Nylon is made synthetically using coal, water, and air without any natural raw plant or animal fibre.",
    "Polyester is a synthetic fibre made of ester monomers (such as Terylene/PET).",
    "Acrylic is artificial wool prepared from petrochemical precursors.",
    "Petrochemicals are the foundational petroleum-derived raw materials used to manufacture synthetic fibres.",
    "Commonly used synthetic fibres are rayon, nylon, polyester, and acrylic.",
    "Different fibres vary in tensile strength, water absorbing capacity, flame reaction, cost, and durability.",
    "Synthetic fibres and plastics have enveloped modern daily life.",
    "The waste created by discarded plastics is non-biodegradable and harmful to the environment.",
    "Plastics take hundreds of years to decompose naturally.",
    "Enjoy the benefits of synthetic materials while actively reducing indiscriminate plastic usage to protect the environment.",
    "Synthetic fibres find applications ranging from common household articles to advanced healthcare and engineering.",
    "Synthetic fibres readily blend with natural fibres (e.g., Terricot, Terriwool) to combine strength and comfort.",
  ];

  const questions = [
    {
      q: "1. Why are some fibres called Synthetic? Explain. (AS1)",
      a: "Fibres that are not obtained directly from plant or animal sources, but are instead synthesized artificially by humans through chemical processing of petroleum-based raw materials (petrochemicals), are called synthetic fibres. Examples include nylon, polyester, and acrylic.",
    },
    {
      q: "2. What are thermosetting plastics? Give two examples. (AS1)",
      a: "Plastics that, once molded and set into shape, cannot be softened or remolded upon reheating are called thermosetting plastics. They feature cross-linked polymer networks that resist heat. Two common examples are Bakelite (used for electrical switches) and Melamine (used for fire-resistant kitchenware and floor tiles).",
    },
    {
      q: "3. Give reasons 'for using plastic containers as storing devices.' (AS1)",
      a: "Plastic containers are widely preferred for storage because: (1) They are chemically non-reactive and do not corrode when storing water, food, or chemicals; (2) They are lightweight, strong, and durable; (3) They can be easily molded into diverse shapes and sizes; and (4) They are relatively inexpensive compared to metal containers.",
    },
  ];

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* What We Have Learnt Summary Card */}
      <div className="rounded-[22px] border-2 border-emerald-400 bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-emerald-50/60 p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 border-b border-emerald-300 pb-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-700 text-white font-bold text-xs shadow-2xs">
            ✓
          </span>
          <h3 className="font-heading text-sm font-bold text-emerald-950">
            What we have learnt?
          </h3>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs text-emerald-950">
          {keyLearnings.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Improve Your Learning Section */}
      <div className="rounded-[22px] border-2 border-emerald-400 bg-white p-5 shadow-sm space-y-4">
        {/* Header with QR Code */}
        <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-bold text-white shadow-2xs font-heading">
              Improve your learning
            </span>
          </div>

          {/* QR Code Container */}
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/50 p-1.5">
            <img
              src="/assets/images/C8-Science/ch3_qr_learn.png"
              alt="QR Code 67BPLM"
              className="h-9 w-9 object-contain rounded"
            />
            <div className="text-right">
              <span className="block font-mono text-[9px] font-bold tracking-widest text-emerald-950">
                67BPLM
              </span>
              <span className="text-[8px] text-muted-foreground">Digital Content</span>
            </div>
          </div>
        </div>

        {/* Reflections on Concepts */}
        <div className="space-y-3">
          <h4 className="font-heading text-xs font-bold text-emerald-950">
            I. Reflections on concepts
          </h4>

          <div className="space-y-2.5">
            {questions.map((item, idx) => {
              const isOpen = openQuestion === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-emerald-200 bg-emerald-50/20 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleQuestion(idx)}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-emerald-50/50 transition-colors cursor-pointer"
                  >
                    <span className="font-heading font-semibold text-xs text-emerald-950 pr-2">
                      {item.q}
                    </span>
                    <span className="shrink-0 rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold">
                      {isOpen ? "Hide Answer" : "View Answer"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-3 pb-3 pt-1 text-xs text-emerald-900 border-t border-emerald-100 bg-white/70">
                      <p className="leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">51</span>
      </div>
    </div>
  );
}
