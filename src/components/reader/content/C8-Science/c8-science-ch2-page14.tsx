import React from "react";

export function C8ScienceCh2Page14() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Experiments Section */}
      <div className="rounded-[22px] border border-fuchsia-300 bg-fuchsia-50/40 p-5 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-700 px-4 py-1.5 text-xs font-bold text-white shadow-2xs font-heading">
          <span>🔬</span>
          <span>Experiments</span>
        </div>
        <ol className="space-y-3 pl-5 list-decimal text-xs text-foreground/90 font-medium leading-relaxed">
          <li>
            Conduct an experiment to understand the nature of friction and the concept of Static friction and prepare a report.
          </li>
          <li>
            Conduct an experiment to find out the effect of roughness on frictional force and prepare a report.
          </li>
        </ol>
      </div>

      {/* Project Works Section */}
      <div className="rounded-[22px] border border-sky-300 bg-sky-50/40 p-5 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-700 px-4 py-1.5 text-xs font-bold text-white shadow-2xs font-heading">
          <span>💡</span>
          <span>Project Works</span>
        </div>
        <ol className="space-y-3 pl-5 list-decimal text-xs text-foreground/90 leading-relaxed">
          <li>
            Collect information about various new techniques being adopted by human beings to reduce energy losses due to friction. Prepare a report on it.
          </li>
          <li>
            Collect information about the substances used to reduce friction in different machines and prepare a report on it.
          </li>
        </ol>
      </div>

      {/* Chapter 2 Completion Banner */}
      <div className="rounded-[22px] border-2 border-emerald-400 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 text-center space-y-1">
        <span className="text-base font-bold text-emerald-950 font-heading">
          🎉 End of Chapter 2: Friction
        </span>
        <p className="text-xs text-emerald-800">
          You have completed all concepts, lab activities, reflections, and exercises for Chapter 2!
        </p>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="italic text-fuchsia-900 font-semibold">Friction</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="font-semibold font-heading">33</span>
      </div>
    </div>
  );
}
