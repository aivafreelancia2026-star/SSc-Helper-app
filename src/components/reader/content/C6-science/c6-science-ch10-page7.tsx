import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh10Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-indigo-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch10_fig4_b.png"
              alt="Fig. 4(b) — Shadow of a boy standing at doorstep in May"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 4(b)
            </p>
          </div>

          <p className="text-xs text-foreground/75 italic">
            Fig. 4(b) shows the shadow formed at the time of sunrise on a day in the month of May.
          </p>

          <p className="pt-2">Observe the two photos.</p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>What difference do you notice in length and direction of the two shadows?</li>
            <li>What does it say about the change in the direction of sunrise in December and in May?</li>
          </ul>

          <p>
            You may also ask some elders about the change in the direction of the sun rays coming through
            windows or doors facing east during winter and summer. You can also observe shadows formed
            by the sun rays through windows and doors in your house.
          </p>
          <p>You will notice that the sun does not exactly rise in the east.</p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <p>
            In our State around 20<sup>th</sup> December, the direction of sunrise is a little south of
            east. Around 15<sup>th</sup> May, the direction of sunrise is very close to the east.
            Because of this, we find that the shadow of the boy is right behind him in May and shifts
            towards his left in December.
          </p>
          <p>
            This slight change in the direction of the sunrise is one of the reasons for changes in
            seasons. We will learn more about the exact reasons for the changes in higher classes.
          </p>
          <p>
            In the two changes discussed above, we notice that for every change there are indicators to
            confirm that a change has taken place and there is a cause (reason) of the change.
          </p>

          <h2 className="font-heading text-base font-bold text-indigo-805 pt-2">
            Activity-5: Indicators and causes for change.
          </h2>
          <p className="italic text-foreground/75">
            The changes observed, indicators of the changes, and possible causes for the changes
            discussed above are shown in table 3.
          </p>

          <p className="pt-2 font-semibold text-indigo-800">
            Compare the change of milk to curd with change of seasons.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Which change is slow and which is fast? Why?</li>
            <li>Which change takes place naturally?</li>
            <li>Which change needs initiation/intervention of human beings to occur?</li>
            <li>Which is a temporary change and which is permanent?</li>
          </ul>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>We have used running water as an energy source for thousands of years.</TipBox>
      </div>
    </div>
  );
}
