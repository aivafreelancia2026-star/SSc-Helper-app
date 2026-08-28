import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh11Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>What problems were faced by Ramana? What are the reasons for the problems?</li>
            <li>How can Firoz help Ramana?</li>
          </ul>

          <p>
            Water scarcity is a problem in some districts of our state, as mentioned earlier. Here
            rainfall is less and farmers are largely dependent on irrigation using underground water to
            raise crops.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What will happen if farmer grow crops that require more water in these districts?</li>
            <li>
              If several bore wells are dug and underground water is tapped constantly, what will
              happen to the source of ground water?
            </li>
          </ul>
          <p>
            Discuss with your friends and teachers about the reasons that can cause reduction of ground
            water.
          </p>

          <h2 className="font-heading text-base font-bold text-indigo-805 pt-2">
            Activity-8: How much water do we waste?
          </h2>
          <p className="text-xs leading-relaxed text-foreground/85">
            After playing in the ground you may wash your hands and legs under the tap in your school.
            Measure the time the tap is on open for you to complete your wash. Then take a bucket put it
            under the tap open the tap for the same time that you measured with the same flow of water.
            How many students of your class can wash thier hands and feet with the bucket of water that
            you collect from the tap?
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <p>
            List out those situations in our life where we waste water unwisely and make suggestions to
            avoid this.
          </p>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">
            11.8. Floods a natural hazard
          </h2>
          <p>
            <strong className="text-indigo-805">Activity-9:</strong> Waterless conditions lead to droughts while high water
            levels due to more rain fall can leads to floods.
          </p>
          <p className="text-xs">
            Usually, during the rainy season, you may have come across pictures of this type in
            newspapers (Fig. 4). Discuss the following.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch11_fig4.png"
              alt="Fig. 4 — People carrying child in container wading through deep flood waters"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 4
            </p>
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 pt-2">
            <li>What does the picture tell us?</li>
            <li>Does excessive rainfall in certain areas of our country lead to such a condition?</li>
            <li>Are there other reasons as well that can lead to this situation?</li>
            <li>Did you ever face or hear about flood?</li>
            <li>
              On the basis of the newspaper cutting or your own experience, write down a few lines on
              floods.
            </li>
            <li>
              We can&apos;t live single day without water. It is unwise pumping of water that leads to
              drought.
            </li>
          </ul>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>Inability of harvesting rainwater is one of the reasons for drought.</TipBox>
      </div>
    </div>
  );
}
