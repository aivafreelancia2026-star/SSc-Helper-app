"use client";

import React, { useState } from "react";

export function C8ScienceCh3Page19() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [openSection, setOpenSection] = useState<{ [key: string]: boolean }>({
    app: true,
    hot: true,
  });

  const mcqs = [
    {
      id: 1,
      q: "1. Rayon is prepared by",
      options: [
        { label: "a", text: "Coal" },
        { label: "b", text: "Oxygen" },
        { label: "c", text: "Fibre" },
        { label: "d", text: "Cellulose" },
      ],
      correct: "d",
      explanation: "Rayon is artificial silk obtained by the chemical treatment of wood pulp (cellulose).",
    },
    {
      id: 2,
      q: "2. Necessity of labels on clothes",
      options: [
        { label: "a", text: "Required by law" },
        { label: "b", text: "To identify fabric content" },
        { label: "c", text: "Both A and B" },
        { label: "d", text: "Not decompose" },
      ],
      correct: "c",
      explanation: "Garment labels are legally mandated and inform consumers of exact fabric composition and care instructions.",
    },
    {
      id: 3,
      q: "3. The material which is not decomposed by natural process is called",
      options: [
        { label: "a", text: "Non bio-degradable material" },
        { label: "b", text: "Bio-degradable material" },
        { label: "c", text: "Polyester" },
        { label: "d", text: "Nylon" },
      ],
      correct: "a",
      explanation: "Materials that cannot be broken down easily by natural biological actions (microorganisms) are non-biodegradable.",
    },
    {
      id: 4,
      q: "4. The symbol ♶ (4 inside chasing arrows) represents",
      options: [
        { label: "a", text: "PET" },
        { label: "b", text: "HDPE" },
        { label: "c", text: "LDPE" },
        { label: "d", text: "Others" },
      ],
      correct: "c",
      explanation: "Resin identification code 4 corresponds to Low-Density Polyethylene (LDPE), commonly used in grocery carry bags.",
    },
    {
      id: 5,
      q: "5. Which is a Natural fibre among the following?",
      options: [
        { label: "a", text: "Rayon" },
        { label: "b", text: "Nylon" },
        { label: "c", text: "Polyester" },
        { label: "d", text: "Silk" },
      ],
      correct: "d",
      explanation: "Silk is a natural protein fibre produced by the silkworm cocoon, whereas the others are man-made synthetic/regenerated fibres.",
    },
  ];

  const handleSelect = (qId: number, optionLabel: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionLabel }));
  };

  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* II. Application of concepts */}
      <div className="rounded-[22px] border border-emerald-300 bg-white p-4 shadow-sm space-y-3">
        <button
          onClick={() => setOpenSection((prev) => ({ ...prev, app: !prev.app }))}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <h3 className="font-heading text-xs font-bold text-emerald-950">
            II. Application of concepts
          </h3>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 rounded-full px-2 py-0.5">
            {openSection.app ? "Collapse" : "Expand"}
          </span>
        </button>

        {openSection.app && (
          <div className="space-y-2.5 text-xs text-emerald-950 pt-1 border-t border-emerald-100">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-2.5 space-y-1">
              <strong className="block font-semibold">
                1. How do synthetic fibres have changed our daily life? (AS1)
              </strong>
              <p className="text-[11px] text-foreground/80">
                Synthetic fibres provide high tensile strength, elasticity, water resistance, wrinkle recovery, and durability at low cost. They have transformed apparel, ropes, parachutes, sportswear, and home furnishings.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-2.5 space-y-1">
              <strong className="block font-semibold">
                2. What would happen, if we make electric switches with thermoplastics? (AS2)
              </strong>
              <p className="text-[11px] text-foreground/80">
                Thermoplastics melt and deform easily when subjected to heat. When high current flows or sparking occurs, the switches would melt, lose shape, and cause short-circuits or electrical fires. Hence, heat-resistant thermosetting plastics like Bakelite are used.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-2.5 space-y-1">
              <strong className="block font-semibold">
                3. What could be the consequences if plastics are not properly disposed? (AS1)
              </strong>
              <p className="text-[11px] text-foreground/80">
                Improper disposal chokes sewerage drains causing urban flooding, contaminates soil and water bodies, harms cattle and aquatic life when ingested, and releases toxic carcinogenic fumes if burned openly.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-2.5 space-y-1">
              <strong className="block font-semibold">
                4. Rani wants to buy clothes for her parents for winter wear. What types of clothes would you suggest? Specify reasons. (AS3)
              </strong>
              <p className="text-[11px] text-foreground/80">
                Suggest woollen or <strong>Acrylic (artificial wool)</strong> garments. Acrylic is lightweight, warm, moth-resistant, durable, and more affordable than natural wool while effectively trapping body heat.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* III. Higher Order Thinking Questions */}
      <div className="rounded-[22px] border border-emerald-300 bg-white p-4 shadow-sm space-y-3">
        <button
          onClick={() => setOpenSection((prev) => ({ ...prev, hot: !prev.hot }))}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <h3 className="font-heading text-xs font-bold text-emerald-950">
            III. Higher Order Thinking Questions
          </h3>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 rounded-full px-2 py-0.5">
            {openSection.hot ? "Collapse" : "Expand"}
          </span>
        </button>

        {openSection.hot && (
          <div className="space-y-2.5 text-xs text-emerald-950 pt-1 border-t border-emerald-100">
            <div className="rounded-xl border border-teal-200 bg-teal-50/30 p-2.5 space-y-1">
              <strong className="block font-semibold">
                1. What made human beings search for alternatives to natural fibres? (AS2)
              </strong>
              <p className="text-[11px] text-foreground/80">
                High demand from growing populations, high cost of natural silk and wool, agricultural land limitations, and vulnerability of natural fibres to pests, moisture, and wrinkles inspired synthetic alternatives.
              </p>
            </div>

            <div className="rounded-xl border border-teal-200 bg-teal-50/30 p-2.5 space-y-1">
              <strong className="block font-semibold">
                2. Imagine what would happen if we did not discover plastics? (AS2)
              </strong>
              <p className="text-[11px] text-foreground/80">
                Wood, glass, and metal extraction would have skyrocketed, increasing deforestation and mining costs. However, our landfills, oceans, and urban drain systems would be free from non-biodegradable microplastic pollution.
              </p>
            </div>

            <div className="rounded-xl border border-teal-200 bg-teal-50/30 p-2.5 space-y-1">
              <strong className="block font-semibold">
                3. &ldquo;Indiscriminate usage of plastic is a serious threat to biodiversity.&rdquo; What are the efforts of Government and Non-government organizations in this regard? (AS7)
              </strong>
              <p className="text-[11px] text-foreground/80">
                Government banned single-use thin polythene bags (&lt;120 microns), enforced Extended Producer Responsibility (EPR), and promoted 4R waste-to-energy projects. NGOs run public beach cleanups, awareness drives, and cow shelter rescue surgeries.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Multiple Choice Questions */}
      <div className="rounded-[22px] border-2 border-emerald-400 bg-white p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-white text-xs font-bold font-mono">
              ✓
            </span>
            <h3 className="font-heading text-xs font-bold text-emerald-950">
              Multiple Choice Questions
            </h3>
          </div>
          <span className="text-[10px] text-muted-foreground italic">
            Click an option to check your answer
          </span>
        </div>

        <div className="space-y-3.5">
          {mcqs.map((item) => {
            const userChoice = selectedAnswers[item.id];
            const isCorrect = userChoice === item.correct;

            return (
              <div
                key={item.id}
                className="rounded-xl border border-emerald-200 bg-emerald-50/20 p-3 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-heading text-xs font-semibold text-emerald-950 flex items-center gap-1.5">
                    {item.q}
                    {item.id === 4 && (
                      <span className="inline-flex items-center justify-center rounded border border-emerald-400 bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-900 shadow-2xs">
                        ♶ 4
                      </span>
                    )}
                  </p>
                  <span className="shrink-0 font-mono text-xs font-bold text-emerald-900">
                    ( {userChoice ? userChoice.toUpperCase() : "  "} )
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {item.options.map((opt) => {
                    const isSelected = userChoice === opt.label;
                    let btnStyle = "border-emerald-200 bg-white hover:bg-emerald-50 text-emerald-950";

                    if (userChoice) {
                      if (opt.label === item.correct) {
                        btnStyle = "border-emerald-500 bg-emerald-100 text-emerald-950 font-bold";
                      } else if (isSelected) {
                        btnStyle = "border-rose-400 bg-rose-50 text-rose-950 font-semibold";
                      }
                    }

                    return (
                      <button
                        key={opt.label}
                        onClick={() => handleSelect(item.id, opt.label)}
                        className={`rounded-lg border p-2 text-left transition-all shadow-2xs cursor-pointer ${btnStyle}`}
                      >
                        <span className="font-bold mr-1.5">{opt.label})</span>
                        {opt.text}
                      </button>
                    );
                  })}
                </div>

                {userChoice && (
                  <div
                    className={`rounded-lg p-2 text-[11px] leading-snug border ${
                      isCorrect
                        ? "border-emerald-300 bg-emerald-100/70 text-emerald-950"
                        : "border-amber-300 bg-amber-50 text-amber-950"
                    }`}
                  >
                    <span className="font-bold mr-1">
                      {isCorrect ? "✓ Correct!" : `✗ Incorrect (Correct answer is ${item.correct.toUpperCase()}):`}
                    </span>
                    {item.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">52</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
      </div>
    </div>
  );
}
