import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh14Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="font-heading text-base font-bold text-emerald-800">
            14.6. Different types of joints
          </h2>
          <p className="text-xs">
            <strong>Activity-10:</strong> We knew that muscles help move a bone. How does one bone help
            the other to move? Is there any arrangement between bones? Are ligaments of bones sufficient
            for body movement?
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Let us understand different types of joints in our body.</li>
          </ul>

          <p className="text-xs">
            Put a meter scale under your arm so that your elbow is in the centre. Ask your friend to tie the
            scale and your arm together as shown in Fig. 15. Now try to bend your elbow. Is it possible?
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[130px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig15.png"
              alt="Fig. 15 — Tied scale on girl's arm to test elbow joint movement limitation"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 15
            </p>
          </div>

          <p className="text-xs">
            Bones can&apos;t bend. You have seen that the human skeleton is made up of many bones. What will
            happen if bones can&apos;t move? Bones of our body move in their own way, How is it possible?
            These bones have joints between them. We can move various parts of our body because of these
            joints.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <p className="text-xs">
            There are different types of joints in our body to help us carry out different movements and
            activities. Let us learn about them.
          </p>

          <h3 className="font-heading text-base font-bold text-emerald-805">
            14.6.1. Ball and socket joint
          </h3>
          <p className="text-xs">
            Let us make a model to understand how the joint between the shoulder blades and the bones of
            your arm works. Place a fused bulb inside the half shell of a coconut and rotate it in the way
            shown in Fig. 16(a).
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[120px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig16_a.png"
              alt="Fig. 16(a) — Hands rotating light bulb inside half coconut shell model"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 16(a)
            </p>
          </div>

          <p className="text-xs">
            A joint made by fitting a ball into a socket is called a &ldquo;ball and socket joint&rdquo;. In
            this joint, a bone can rotate easily in all directions. (Fig-16(b))
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[120px] mx-auto">
            <img
              src="/assets/images/C6-science/ch14_fig16_b.png"
              alt="Fig. 16(b) — Ball and socket hip joint skeletal bone diagram"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 16(b)
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>According to the Science Museum of Minnesota (SMM), the lungs are the only organ in the body that can float.</TipBox>
      </div>
    </div>
  );
}
