import React from "react";

export function C8ScienceIntroPage9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Decorative Traditional Preamble Border Container */}
      <div className="rounded-[24px] border-4 border-double border-amber-700/60 bg-gradient-to-b from-amber-50/70 via-white to-amber-50/70 p-6 md:p-8 shadow-md">
        <div className="rounded-[16px] border-2 border-amber-800/40 bg-white/90 p-6 text-center space-y-5 shadow-inner">
          <h1 className="font-heading text-xl md:text-2xl font-extrabold text-amber-950 tracking-wider">
            THE CONSTITUTION OF INDIA
          </h1>
          <h2 className="font-heading text-lg font-bold text-fuchsia-900 tracking-wide">
            Preamble
          </h2>

          <div className="mx-auto max-w-xl space-y-4 text-xs md:text-sm font-medium text-foreground/90 text-justify leading-relaxed">
            <p>
              <span className="font-bold text-foreground">WE, THE PEOPLE OF INDIA</span>, having solemnly resolved to constitute India into a{" "}
              <span className="font-bold text-fuchsia-950">SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC</span> and to secure to all its citizens:
            </p>

            <p className="pl-4">
              <strong className="font-bold text-foreground">JUSTICE</strong>, social, economic and political;
            </p>

            <p className="pl-4">
              <strong className="font-bold text-foreground">LIBERTY</strong> of thought, expression, belief, faith and worship;
            </p>

            <p className="pl-4">
              <strong className="font-bold text-foreground">EQUALITY</strong> of status and of opportunity; and to promote among them all
            </p>

            <p className="pl-4">
              <strong className="font-bold text-foreground">FRATERNITY</strong> assuring the dignity of the individual and the unity and integrity of the Nation;
            </p>

            <p className="pt-2">
              <strong className="font-bold text-foreground">IN OUR CONSTITUENT ASSEMBLY</strong> this twenty-sixth day of November, 1949 do{" "}
              <strong className="font-bold text-fuchsia-950">HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">vii</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
      </div>
    </div>
  );
}
