import { CalloutBox } from "@/components/reader/callout-box";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh11Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="italic text-foreground/75">
            in each group. Prepare and submit a group report. The topics to be discussed are:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-indigo-900 font-medium text-xs leading-relaxed">
            <li>
              <strong className="text-indigo-950 font-heading">Topic-1 :</strong> What will happen if
              rainfall is less this year than the last year?
            </li>
            <li>
              <strong className="text-indigo-950 font-heading">Topic-2 :</strong> What would happen if
              there is no proper rainfall for five years?
            </li>
            <li>
              <strong className="text-indigo-950 font-heading">Topic-3 :</strong> What could be the
              possible reasons for water scarcity in a particular place?
            </li>
            <li>
              <strong className="text-indigo-950 font-heading">Topic-4 :</strong> What problems can arise
              due to water scarcity in a particular place?
            </li>
          </ul>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch11_fig3.png"
              alt="Fig. 3 — Severely cracked soil during dry drought"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 3
            </p>
          </div>

          <p className="pt-2 text-xs leading-relaxed">
            In our region, if there is no rain for a long period (4 to 5 years), it may cause droughts.
            During this period, it is very difficult to get food and fodder; drinking water is scarce.
            People need to travel long distances to collect water. Soil becomes dry as a result agriculture
            and cultivation is difficult. Many people who depend on farming for their livelihood, migrate
            to other places in search of jobs. In our state, Mahabubnagar district is treated as drought
            prone areas.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-indigo-855">
            Activity-7: Droughts have a severe impact on our lives.
          </h2>
          <p>
            Here is a Ramana&apos;s letter for you to try to understand how drought affects our lives.
          </p>

          <CalloutBox title="Kosgi">
            <div className="font-body text-[11px] text-foreground/80 space-y-2 leading-relaxed">
              <p className="font-bold text-right">Kosgi</p>
              <p>Dear Firoz,</p>
              <p>
                I hope you are fine there. Nowadays, we are facing severe problems due to drought. For
                the last five years we have had no rains. All our fields have dried and there are cracks on
                them. We fail to grow any crop. My father invested money on bore wells with no results.
                Now we get water, after a great struggle from the bore-well which is five - six kilometers
                from our village. The days have become very bad. Several people have sold their cattle and
                migrated to Hyderabad and Bengaluru. My family also wants to do so. I request you to ask
                your parents to search for a job for my father at your place. My father has been a
                well-known, rich farmer here but he is willing to do any kind of job there.
              </p>
              <p className="text-right">
                Yours loving friend<br />
                <span className="font-bold">Ramana</span>
              </p>
            </div>
          </CalloutBox>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>The recommended daily water requirement for sanitation, bathing, cooking and consumption is approximately 50 litres per person per day.</TipBox>
      </div>
    </div>
  );
}
