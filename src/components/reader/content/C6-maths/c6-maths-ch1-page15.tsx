"use client";

export function C6MathsCh1Page15() {
  return (
    <div className="w-full space-y-8 font-body text-sm leading-relaxed text-foreground/90 pb-8">

      {/* ── What Have We Discussed? (continued) ─── */}
      <div className="rounded-[16px] border border-sky-300 bg-sky-50/20 overflow-hidden shadow-sm">
        <div className="bg-sky-600 px-4 py-2 flex items-center gap-2">
          <span className="text-white text-xl">📚</span>
          <h2 className="font-heading text-base font-bold text-white uppercase tracking-wider">
            What Have We Discussed? (continued)
          </h2>
        </div>
        <div className="p-5">
          <ol className="list-decimal pl-5 space-y-5 text-foreground/90" start={4}>

            <li className="leading-relaxed">
              Use of commas helps in reading and writing large numbers. In the{" "}
              <strong>Indian system of numeration</strong> we have commas after{" "}
              <strong>3 digits</strong> starting from the right and thereafter every{" "}
              <strong>2 digits</strong>. The commas after 1st, 3rd and 5th digits to
              separate <em>thousand</em>, <em>lakh</em> and <em>crore</em> respectively.
              In the <strong>International system of numeration</strong> commas are placed
              after every <strong>3 digits</strong> starting from the right. The comma
              after 3rd and 6th digits to separate <em>thousand</em> and <em>million</em>{" "}
              respectively.
            </li>

            <li className="leading-relaxed">
              Large numbers are needed in many ways in daily life. For example, for
              counting number of students in a district, number of people in a village or
              town, money paid or received in large transactions (paying and selling), in
              measuring large distances say between various cities in a country or in the
              world and so on.
            </li>

            <li className="leading-relaxed">
              Remember that <strong>kilo</strong> means 1000, <strong>Centi</strong> means
              100<sup>th</sup> part and <strong>milli</strong> means 1000 part. Thus,
              <ul className="list-disc pl-6 mt-2 space-y-1 font-mono text-sm text-foreground/80">
                <li>1 kilometre = 1000 metres</li>
                <li>1 metre = 100 centimetres or 1000 millimetres</li>
              </ul>
            </li>

            <li className="leading-relaxed">
              There are a number of situations in which we do not need the exact quantity
              but need only a reasonable guess or an <strong>estimate</strong>. For
              example, while stating how many spectators watched a particular
              International hockey match, we state the approximate number, say{" "}
              <strong>51,000</strong>, we do not need to state the exact number.
            </li>

            <li className="leading-relaxed">
              <strong>Estimation</strong> involves approximating a quantity to an accuracy
              required. Thus, 4,117 may be approximated to{" "}
              <span className="font-mono font-semibold">4,100</span> or to{" "}
              <span className="font-mono font-semibold">4,000</span>, i.e. to the nearest
              hundred or to the nearest thousand depending on our need.
            </li>

            <li className="leading-relaxed">
              In number of situations, we have to estimate the outcome of number
              operations. This is done by <strong>rounding off</strong> the numbers
              involved and getting a quick, rough answer.
            </li>

            <li className="leading-relaxed">
              Use of numbers in Indo-Arabic system and International system.
            </li>

          </ol>
        </div>
      </div>

      {/* ── Ramanujan Profile Card ───────────────── */}
      <div className="rounded-[16px] border-2 border-emerald-400 overflow-hidden shadow-md bg-white">
        {/* Header */}
        <div className="bg-emerald-600 px-5 py-3">
          <h3 className="font-heading text-base font-bold text-white">
            Srinivasa Ramanujan (India)
          </h3>
          <p className="text-emerald-100 text-xs font-mono mt-0.5">1887 – 1920</p>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col md:flex-row gap-5">
          {/* Photo placeholder */}
          <div className="shrink-0 flex flex-col items-center gap-3">
            <div className="w-24 h-28 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 border-2 border-emerald-300 flex items-center justify-center overflow-hidden shadow-sm">
              <span className="text-5xl select-none">🧮</span>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-3 flex-1">
            <p className="leading-relaxed text-foreground/90">
              He worked on the <strong>Number Theory</strong>. He is the first Indian
              elected to the Fellow of <strong>Royal Society (England)</strong>.{" "}
              <span className="font-mono font-bold text-emerald-800">1729</span> is
              the <strong>Ramanujan's Number</strong>. Mathematics Day is celebrated
              on <strong>22nd December</strong> every year on his birthday.
            </p>

            {/* Stamp note */}
            <div className="flex items-start gap-3 bg-emerald-50 rounded-xl p-3 border border-emerald-100">
              <div className="w-14 h-16 shrink-0 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-dashed border-amber-400 flex items-center justify-center text-2xl shadow-sm">
                📮
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed">
                A Postal Stamp was released by the Government of India in memory of
                Ramanujan in 2011. Govt. of India Declared{" "}
                <strong>2012 as Maths year</strong>.
              </p>
            </div>

            {/* Fun fact highlight */}
            <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100 flex items-center gap-3">
              <span className="text-2xl shrink-0">💡</span>
              <p className="text-xs text-indigo-900 font-medium">
                <strong>Did you know?</strong> The number <strong>1729</strong> is
                called the Hardy–Ramanujan number — it is the smallest number
                expressible as the sum of two cubes in two different ways:{" "}
                <span className="font-mono">1³ + 12³ = 9³ + 10³ = 1729</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer banner ─────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 text-sm font-bold text-white mt-8"
        style={{ background: "linear-gradient(90deg, #16a34a 0%, #22c55e 100%)" }}
      >
        <span className="tracking-wide flex-1 text-center">KNOWING OUR NUMBERS</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-green-600 text-xs font-extrabold ml-3">
          15
        </span>
      </div>
    </div>
  );
}
