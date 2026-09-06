import React from "react";

export function C8ScienceCh3Page14() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Plastics and environment & Fig-16 */}
        <div className="space-y-4 text-justify text-xs">
          <div className="rounded-[22px] border border-emerald-300 bg-white p-4 shadow-sm space-y-3">
            <h3 className="font-heading text-sm font-bold text-emerald-950">
              3.7.4 Plastics and environment
            </h3>

            <p>
              You must have seen garbage (waste) dumps. Some articles there seem to remain for a long time while some others disappear. You may notice that most of the material that does not disappear are the polythene bags. Polythene is a plastic; it is mainly used for making carry bags.
            </p>

            <p>
              The polythene bags thrown around are responsible for clogging drains. Animals in urban areas, particularly cows, eat polythene bags containing food material. Can you imagine the consequences? See <strong>Fig-16</strong> and read the comments of the Supreme Court of India about the effect of plastic on the environment.
            </p>

            {/* Fig 16 Container */}
            <div className="flex flex-col items-center rounded-xl border border-rose-200 bg-rose-50/40 p-3 text-center space-y-1.5">
              <img
                src="/assets/images/C8-Science/ch3_fig16.png"
                alt="Fig-16 Plastic bags found in the stomach of a cow after a postmortem"
                className="max-h-40 w-auto rounded-lg object-contain border border-rose-300 shadow-sm"
              />
              <span className="text-[11px] font-semibold text-rose-950 italic">
                Fig-16 : Plastic bags found in the stomach of a cow after a postmortem
              </span>
            </div>

            <p>
              With the direction of the Supreme Court of India, very thin polythene bags have been banned to stop indiscriminate usage of polythene bags. What is the difference between the banned polythene bags and the bags used presently in place of previous ones? What do you notice on those bags?
            </p>

            <p>
              Some efforts are taking place to reduce negative consequences of plastics on the environment. If we burn plastic, it creates a lot of air pollution.
            </p>
          </div>
        </div>

        {/* Right Column: Supreme Court Callout Box */}
        <div className="space-y-4 text-justify text-xs">
          <div className="rounded-[22px] border-2 border-fuchsia-400 bg-gradient-to-br from-fuchsia-50/70 via-pink-50/50 to-purple-50/60 p-4 shadow-sm space-y-3 text-fuchsia-950">
            <div className="border-b border-fuchsia-300 pb-2">
              <h4 className="font-heading text-xs font-bold leading-snug text-fuchsia-900">
                &ldquo;Plastic bags are more danger than atom bomb for future generations&rdquo;: <br />
                <span className="text-purple-800 font-semibold">Supreme Court of India.</span>
              </h4>
            </div>

            <p className="italic text-[11.5px] leading-relaxed">
              &ldquo;Excessive use of plastic bags and their unregulated disposal has been choking lakes, ponds and urban sewerage systems,&rdquo; the Supreme Court said while warning that it posed a threat more serious than the atom bomb for the next generation.
            </p>

            <p className="italic text-[11.5px] leading-relaxed">
              Andhra Pradesh-based NGOs drew the court&apos;s attention to <strong>30–60 kg of plastic bags</strong> recovered from the stomachs of cows because of irresponsible disposal of plastic bags and defunct municipal waste collection systems. But the bench wanted to address the larger questions arising from indiscriminate use of plastic bags, which not only posed a grave threat to nature and environment but also to the human race itself.
            </p>

            <div className="rounded-xl border border-fuchsia-200 bg-white/75 p-3 italic text-[11px] text-fuchsia-950 shadow-2xs space-y-2">
              <p>
                &ldquo;All of us are watching how our lakes, ponds and urban sewerage systems are getting choked by plastic bags. Unless we examine a total ban on plastic bags or put in place a system for manufacturers mandating them to collect back all plastic bags, the next generation will be threatened with something more serious than the atom bomb&rdquo;, Justices Singhvi and Mukhopadhaya said.
              </p>
              <p>
                Large quantities of water packed in plastic pouches were thrown around in an undisciplined and uncivil manner across the country every day. <em>&ldquo;A rough estimate shows more than 100 million water pouches are thrown all over the cities and towns in a day,&rdquo;</em> the bench noted.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-emerald-900 font-semibold">Synthetic Fibres and Plastics</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">47</span>
      </div>
    </div>
  );
}
