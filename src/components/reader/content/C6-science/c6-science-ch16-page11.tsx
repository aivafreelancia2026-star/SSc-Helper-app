import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh16Page11() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">
            If you touch this material black colour substance sticks to your fingers. Collect this rotten
            material and observe it under a microscope. Note your observation and discuss with your friends.
            Draw the structures seen by you under the microscope.
          </p>
          <p className="text-xs">
            These tiny thread like structure are commonly called <strong>mould.</strong> Can we say that mould
            is also living?
          </p>
          <p className="text-xs">
            The mould that develops on spoiled material is able to produce new mould. It grows. So we can say
            the mould is also living.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[170px] mx-auto">
            <img
              src="/assets/images/C6-science/ch16_fig9.png"
              alt="Fig. 9 — Mold developing on a slice of spoiled bread"
              className="max-w-full h-auto rounded shadow-xs"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 9
            </p>
          </div>

          <p className="text-xs">
            We all know that cows gives us milk. So they are useful. Do micro-organisms help us in any way?
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Why is idly batter prepared the day before?</li>
            <li>Why do we add little amount of butter milk to milk to get curd?</li>
          </ul>

          <h3 className="font-heading text-base font-bold text-emerald-805 pt-2">
            Activity-11: Let us see bacteria
          </h3>
          <p className="text-xs">
            Take the watery substance in curd. Put a drop of this substance on a glass slide. Cover it
            gently with another slide. Observe this under a microscope. Note your observations. Draw a
            picture of what you see under the microscope.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <p className="text-xs">
            The micro-organisms that you see under the microscope are called <strong>bacteria.</strong> Bacteria
            are in different shapes. The bacterium that you see in curd is helpful. This bacteria named
            <em>lactobacillus</em> helps to convert milk into curd.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[110px] mx-auto">
            <img
              src="/assets/images/C6-science/ch16_fig10.png"
              alt="Fig. 10 — Microscopic view showing rod-shaped bacteria cells"
              className="max-w-full h-auto rounded"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 10
            </p>
          </div>

          <h3 className="font-heading text-base font-bold text-emerald-800 pt-2">
            16.11. Are bacteria harmful?
          </h3>
          <p className="text-xs">
            Discuss with your teacher how bacteria are harmful. Some bacteria cause diseases in human beings
            as well as animals and birds. These bacteria spread from one person to the other and cause various
            types of diseases. They spread all over the world. There is no place in the world without
            bacteria.
          </p>
          <p className="text-xs">
            When you suffer from a disease, the doctor advises you to take boiled water. Are there
            micro-organisms in water? Is the water that you drink regularly, pure?
          </p>

          <h3 className="font-heading text-base font-bold text-emerald-805 pt-2">
            Activity-12: Micro organisms in water
          </h3>
          <p className="text-xs">
            Collect water samples from a pond, well and borewell. Keep them in separate glasses. Put a drop of
            water on a slide. Keep another slide on it. Observe under microscope. What type of
            micro-organisms do you see in water samples? Do all water samples have the same type of
            micro-organisms?
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Microscope was invented by dutch scientists, Zacharias Janssen and his father Hans Martens in the year 1590 A.D.</TipBox>
      </div>
    </div>
  );
}
