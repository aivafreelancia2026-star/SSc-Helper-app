import React from "react";

export function C8ScienceCh3Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: PET bottles & Activity-6 & Resin Codes */}
        <div className="space-y-4 text-justify text-xs">
          <p>
            This base material can be used to make not just fibres for fabric but many other things: from soda bottles to boats.
          </p>

          <p>
            Have you seen or heard of <strong>PET bottles</strong>? PET (Polyethylene Terephthalate) is a very familiar form of polyester used for making bottles, utensils, films, wires, and many other useful items.
          </p>

          {/* 3.5 Section & Activity 6 */}
          <div className="rounded-[22px] border border-emerald-300 bg-white p-4 shadow-sm space-y-3">
            <h3 className="font-heading text-sm font-bold text-emerald-950">
              3.5 How can you say a bottle is PET bottle?
            </h3>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-2.5 space-y-2">
              <span className="inline-block rounded-full bg-emerald-700 px-3 py-0.5 text-[10px] font-bold text-white shadow-2xs font-heading">
                Activity-6
              </span>
              <p>
                Collect different kinds of water bottles and examine the triangle-shaped symbol at the bottom or on the brand label sticker.
              </p>

              {/* Fig 9 Container */}
              <div className="flex flex-col items-center rounded-xl border border-emerald-200 bg-white p-2 text-center">
                <img
                  src="/assets/images/C8-Science/ch3_fig9.png"
                  alt="Fig-9 Resin identification codes"
                  className="h-16 w-auto object-contain rounded"
                />
                <span className="mt-1 text-[10px] font-medium text-foreground/75 italic">
                  Fig-9 : Resin identification codes
                </span>
              </div>
            </div>

            {/* Standard 7 Resin Codes */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 space-y-1">
              <strong className="text-emerald-950 text-[11px] block font-heading">
                Standard Resin Identification Codes:
              </strong>
              <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-foreground/85">
                <li><strong>PET / PETE:</strong> Polyethylene Terephthalate</li>
                <li><strong>HDPE:</strong> High Density Polyethylene</li>
                <li><strong>PVC / Vinyl:</strong> Polyvinyl Chloride</li>
                <li><strong>LDPE:</strong> Low Density Polyethylene</li>
                <li><strong>PP:</strong> Polypropylene</li>
                <li><strong>PS:</strong> Polystyrene</li>
                <li><strong>OTHER:</strong> Multi-layer/Composite Resins</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Right Column: Activity-7 & Do you know & Plastics Around Us */}
        <div className="space-y-4 text-justify text-xs">
          {/* Activity 7 */}
          <div className="rounded-[20px] border border-emerald-300 bg-white p-4 space-y-2.5">
            <div className="inline-block rounded-full bg-emerald-700 px-3 py-0.5 text-[11px] font-bold text-white shadow-2xs font-heading">
              Activity -7
            </div>
            <h4 className="font-heading text-xs font-bold text-emerald-950">
              Identification of various articles with recycling codes
            </h4>
            <p>
              Collect bottles of soft drinks, juices, fruit jam, ketchup, shampoo, and coffee powder. Look for the triangle code: the number <strong>1</strong> inside the triangle identifies it as a <strong>PET bottle</strong>.
            </p>
          </div>

          {/* Do You Know Box */}
          <div className="rounded-2xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 space-y-1.5 text-emerald-950">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-3 py-0.5 text-[10px] font-bold text-white shadow-2xs font-heading">
              <span>💡</span>
              <span>Do you know?</span>
            </div>
            <p className="font-semibold text-xs leading-relaxed">
              Why are carbonated soft drinks stored in PET bottles? Soft drinks are carbonated (acidic with dissolved carbon dioxide); PET bottles are chemically inert and will not react with the contents or corrode.
            </p>
          </div>

          {/* Plastics Around Us Header */}
          <div className="rounded-[22px] border-2 border-emerald-300 bg-emerald-50/30 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
              <h3 className="font-heading text-sm font-bold text-emerald-950">
                Plastics around us
              </h3>

              {/* QR Code */}
              <div className="flex flex-col items-center rounded-lg bg-white p-1 shadow-2xs border border-emerald-200">
                <img
                  src="/assets/images/C8-Science/ch3_qr_plastics.png"
                  alt="QR Code E2FJ08"
                  className="h-8 w-8 object-contain"
                />
                <span className="font-mono text-[8px] font-bold tracking-widest text-emerald-950 mt-0.5">
                  E2FJ08
                </span>
              </div>
            </div>

            <p>
              Observe various articles around you in your house, kitchen, rooms, and bathrooms. What is the most common material used in making these objects?
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">42</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
      </div>
    </div>
  );
}
