import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh11Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            Don&apos;t forget to prepare questionnaire for interview. Display your observations in your
            wall magazine.
          </p>

          <h2 className="font-heading text-base font-bold text-indigo-805">
            11.5. Stages of safe drinking water supply
          </h2>

          {/* Styled Flow Chart */}
          <div className="flex flex-col items-center space-y-2 bg-indigo-50/40 border border-indigo-100 rounded-2xl p-4 max-w-[200px] mx-auto shadow-xs">
            <div className="w-full text-center bg-indigo-600 text-white rounded py-1 text-xs font-semibold shadow-xs">
              Tank / Pond
            </div>
            <div className="text-indigo-500 font-bold text-xs">↓</div>
            <div className="w-full text-center bg-indigo-500 text-white rounded py-1 text-xs font-semibold shadow-xs">
              Filtration
            </div>
            <div className="text-indigo-500 font-bold text-xs">↓</div>
            <div className="w-full text-center bg-indigo-400 text-white rounded py-1 text-xs font-semibold shadow-xs">
              Aeration
            </div>
            <div className="text-indigo-500 font-bold text-xs">↓</div>
            <div className="w-full text-center bg-indigo-500 text-white rounded py-1 text-xs font-semibold shadow-xs">
              Chlorination
            </div>
            <div className="text-indigo-500 font-bold text-xs">↓</div>
            <div className="w-full text-center bg-indigo-600 text-white rounded py-1 text-xs font-semibold shadow-xs">
              Overhead tank
            </div>
            <div className="text-indigo-500 font-bold text-xs">↓</div>
            <div className="w-full text-center bg-indigo-700 text-white rounded py-1 text-xs font-semibold shadow-xs">
              Taps
            </div>
          </div>

          <p className="pt-2 text-xs">
            Observe the stages in the supply of protected drinking water as shown in the flow chart.
            Based on your observation, write the steps followed in supplying the water to households
            from water resources. Compare these steps to the method of water supply in your village. Discuss
            your observations.
          </p>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">
            11.6. How the well was dug?
          </h2>
          <p className="font-semibold text-indigo-805">Activity-5:</p>
          <p className="italic text-foreground/75 text-xs">
            Go to nearby village and look at a well from where people get drinking water. Can you
            estimate the approximate volume of water in the well? Collect information from elders in the
            village about the level of water in the well over the years.
          </p>
          <ul className="list-disc space-y-1 pl-5 text-foreground/80">
            <li>Is the water level constant or has it changed?</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>How was the well dug?</li>
            <li>Have you seen a borewell being dug? Write the process in your notebook.</li>
          </ul>

          <CalloutBox title="Do you know?">
            <p className="text-xs text-foreground/80 leading-relaxed">
              Even though the river Krishna flows through Nalgonda district, it suffers from severe water
              scarcity. They are suffering from fluorosis. This is because ground water is contaminated
              with flourine.
            </p>
          </CalloutBox>

          <p className="pt-2">
            Tapping of ground water by digging a well or borewell is a tough job. Many people put in a
            lot of hard work in this process. We need to appreciate this and preserve water.
          </p>
          <p>
            You have read about the different types of water sources in our surroundings. The water level
            in them depends upon rainfall. Generally, we observe that the water levels in wells or other
            water sources go up in rainy season and down during the summer season.
          </p>
          <p>What happens if there is less rain fall or too much rain fall?</p>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">
            11.7. Droughts - water scarcity
          </h2>
          <p className="font-semibold text-indigo-805">Activity-6:</p>
          <p className="italic text-foreground/75 text-xs">
            Form groups of 4 to 5 students and discuss the following topics.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Unsafe water is the biggest killer of children under five; around 90% of all diarrhoeal deaths are in this age group.</TipBox>
      </div>
    </div>
  );
}
