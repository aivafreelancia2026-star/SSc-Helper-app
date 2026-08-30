import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh14Page13() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">
            <strong>Activity 13:</strong> Observe the Hens and Sparrows roaming at your surroundings.
            Notice how do they move? Write your findings about similarity and dissimilarities in your note
            book.
          </p>

          <h3 className="font-heading text-base font-bold text-emerald-800 pt-2">
            14.7.3. Locomotion in snake
          </h3>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig23.png"
              alt="Fig. 23 — Wavy loop curves of snake locomotion"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 23
            </p>
          </div>

          <p className="text-xs">
            Snakes have a long back bone and several muscles. Usually the snake&apos;s body curves into many
            loops, while moving. Each loop of the snake gives it a forward push by pressing against the
            ground. This helps the snake move forward very fast. There are other ways in which snakes move. Do
            you know what they are? Collect those pictures, information and display them on wall magazine.
          </p>

          <h3 className="font-heading text-base font-bold text-emerald-805 pt-2">
            14.7.4. Locomotion in snail
          </h3>
          <p className="text-xs">
            <strong>Activity-14:</strong> Collect a snail from a garden or from the field. Have you seen
            the rounded structure it carries on its back? Place the snail on a glass plate and watch it, when
            it starts moving Fig. 24 (a). A thick structure may come out of an opening in the shell. The thick
            structure is its foot,
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[100px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig24_a.png"
              alt="Fig. 24(a) — Girl holding glass plate with a snail to observe from below"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 24(a)
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <p className="text-xs">
            made of strong muscle. The wavy motions of its foot is the reason why a snail moves slowly.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[130px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig24_b.png"
              alt="Fig. 24(b) — Detailed drawing of a snail showing muscular foot and shell"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 24(b)
            </p>
          </div>

          <p className="text-xs">
            Don&apos;t forget to put back the snail from where you collected it. Otherwise it may die.
          </p>
          <p className="text-xs">
            Movement or locomotion is an important function in every living organism. It is very
            interesting to watch ants running hurriedly in a line one after the other, squirrels and monkeys
            jumping on trees. Lets make into the habit of watching and enjoying the various locomotions in the
            fauna (animals) around us.
          </p>

          <div className="rounded-[16px] border border-emerald-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-emerald-800">Keywords</p>
            <p className="mt-1 font-body text-xs text-foreground/80 leading-relaxed">
              Bones, muscles, ligament, tendon, clavicle, pelvic girdle, hinge joint, locomotion, cartilage, ball and socket joint.
            </p>
          </div>

          <div className="rounded-[16px] border border-emerald-100 bg-white/70 p-4">
            <p className="font-heading text-sm font-bold text-emerald-805 mb-2">What we have learnt</p>
            <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
              <li>All the bones of different body parts combine together to form a single structure called, skeleton.</li>
              <li>There are different kinds of joints in our body like ball and socket, hinge, pivotal etc. to help us in performing several activities.</li>
            </ul>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>We have 206 bones and over 230 moveable and semi-moveable joints in our body.</TipBox>
      </div>
    </div>
  );
}
