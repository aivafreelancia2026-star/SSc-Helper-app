import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh14Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h3 className="font-heading text-base font-bold text-emerald-805">
            14.6.2. Hinge joint :
          </h3>
          <p className="text-xs">
            Straighten your arm and hold your elbow in the palm of your other hand. Try and rotate your
            forearm in all directions at the elbow joint. Is it possible at the elbow as well? No. Why?
          </p>
          <p className="text-xs">
            Try one more thing; bend your arm towards your shoulder in the opposite direction. Can you
            touch the shoulder? Repeat this exercise two to three times. We can fold the arm back only to
            a certain extent. Were you able to fold your arm backward than that limit?
          </p>
          <p className="text-xs font-semibold text-emerald-900">
            Could you move your hand from your elbow in all the directions? Why?
          </p>
          <p className="text-xs">
            Fig. 17 shows a hinge. Where do you find such hinges in your house? Observe how doors, windows
            attached by these hinges move. Compare these things with that of your elbow and knee.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig17.png"
              alt="Fig. 17 — Hinge joints in body (finger, elbow, knee) compared to a door hinge"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 17
            </p>
          </div>

          <p className="text-xs">Identify and list the hinge joints in your body by taking help of Fig. 17.</p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <h3 className="font-heading text-base font-bold text-emerald-805">
            14.6.3. Your spine is like a spring :
          </h3>
          <p className="text-xs">
            You may have often done the exercise in which you stand straight up and touch the floor with
            your palms by bending your body but without bending your knees. You may have also done the
            exercise in which you have bent your body to the left and right at the waist.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Could you explain what property of the spine enabled you to perform both these exercises?</li>
          </ul>

          <p className="text-xs">
            There is tender and flexible cartilage between the vertebrae of the backbone. This cartilage
            between the vertebrae helps in rotating the backbone in all directions. (Fig-18)
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[130px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig18.png"
              alt="Fig. 18 — Vertebrae cartilage compression on bending sideways and forward"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 18
            </p>
          </div>

          <h3 className="font-heading text-base font-bold text-emerald-800 pt-2">
            14.6.4. Neck joint
          </h3>
          <p className="text-xs">
            Neck joint is different from both the hinge joint and the ball and the socket joint. This
            joint helps us to move our head up-down and side to side.
          </p>
          <p className="text-xs font-semibold text-emerald-950">
            Neck joint is a type of joint called pivotal joint. But, can we rotate our head totally like a
            top?
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>The human skull actually has 22 bones. All of these fuse together appear to be one. It is also called as cranium.</TipBox>
      </div>
    </div>
  );
}
