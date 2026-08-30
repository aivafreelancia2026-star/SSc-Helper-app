import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh13Page13() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          {/* Do you know? Box */}
          <div className="rounded-[16px] border border-sky-200 bg-sky-50/40 p-4">
            <div className="flex items-center gap-2 text-sky-800 mb-2">
              <span className="text-base font-bold">💡</span>
              <p className="font-heading text-sm font-bold tracking-tight">Do you know?</p>
            </div>
            <p className="font-body text-xs text-foreground/80 leading-relaxed">
              You must have noticed that the volumes of liquids are written in ml while those of solids
              are written in cm³. Do you know the relation between these two units. The two units are
              related as follows:
            </p>
            <p className="mt-2 font-mono text-xs font-bold text-center text-sky-950">
              1 ml = 1 cm³
            </p>
          </div>

          <h2 className="font-heading text-base font-bold text-sky-800 pt-2">
            Measurement of volume of irregular solids using a measuring cylinder
          </h2>
          <p className="text-xs">
            Take a measuring cylinder and fill almost half of it with water. Record the volume of water
            (Fig. 20). Let us assume it is &quot;a&quot; cm³ (or &quot;a&quot; ml). Now tie a small irregular
            solid (stone) with a fine cotton thread. Put the solid gently into the water in the cylinder
            so that it is completely immersed in water.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>What changes do you notice in the water level of the cylinder?</li>
          </ul>
          <p className="text-xs">
            You may notice that the level of water in the measuring cylinder rises as the stone displaces
            water equal to its own volume. Record the new volume of water. Let us assume that it is
            &quot;b&quot; ml.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch13_fig20.png"
              alt="Fig. 20 — Water level shift in graduated cylinders before and after stone immersion"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 20
            </p>
          </div>

          <p className="pt-2 text-xs font-bold text-sky-950 bg-sky-50 border border-sky-100 rounded-xl p-3">
            Now the volume of stone will be the difference between the second volume and the first volume
            <br />
            &nbsp;&nbsp;i.e volume of the stone = (b - a) cm³ or ml.
          </p>

          <div className="rounded-[16px] border border-sky-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-sky-800">Keywords</p>
            <p className="mt-1 font-body text-xs text-foreground/80 leading-relaxed">
              Measure, standard unit, area, volume, regular surface, irregular surface, rectangular body, measuring cylinder, graph paper
            </p>
          </div>

          <div className="rounded-[16px] border border-sky-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-sky-800 mb-2">What we have learnt</p>
            <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
              <li>We use some conventional ways like hand-span, foot-span, cubit, etc. for rough measurements in our daily life.</li>
              <li>We need standard instruments to measure lengths accurately.</li>
              <li>Metre scale is a standard instrument to measure length. Metre is the standard unit for measuring length. Larger distances can be measured in kilometers.</li>
              <li>Area is a measure of the extent of the plane surface occupied by an object.</li>
            </ul>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Computer memory is measured by Bytes, Kilobyte (KB), Megabyte (MB), Gigabyte (GB) and Terabyte (TB)</TipBox>
      </div>
    </div>
  );
}
