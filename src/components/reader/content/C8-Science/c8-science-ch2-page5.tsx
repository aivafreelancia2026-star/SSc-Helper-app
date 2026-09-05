import React from "react";

export function C8ScienceCh2Page5() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* 2.3 Section */}
      <div className="rounded-[22px] border border-fuchsia-300 bg-white p-5 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-fuchsia-100 pb-3">
          <h2 className="font-heading text-base font-bold text-fuchsia-950">
            2.3 Factors affecting friction
          </h2>

          {/* QR Code */}
          <div className="flex flex-col items-center rounded-lg bg-fuchsia-50 p-1 shadow-2xs border border-fuchsia-200">
            <img
              src="/assets/images/C8-Science/ch2_qr_act3.png"
              alt="QR Code 08Y5KL"
              className="h-10 w-10 object-contain"
            />
            <span className="font-mono text-[9px] font-bold tracking-widest text-fuchsia-950 mt-0.5">
              08Y5KL
            </span>
          </div>
        </div>

        {/* Activity 3 */}
        <div className="rounded-[18px] border border-sky-200 bg-sky-50/30 p-4 space-y-4">
          <div className="inline-block rounded-full bg-fuchsia-700 px-3.5 py-1 text-xs font-bold text-white shadow-2xs font-heading">
            Activity-3
          </div>
          <h3 className="font-heading text-sm font-bold text-sky-950">
            Effect of roughness on frictional force
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left Column: Fig 9 & Inclined plane procedure */}
            <div className="space-y-3 text-justify text-xs">
              {/* Fig 9 Container */}
              <div className="flex flex-col items-center rounded-2xl border border-sky-200 bg-white p-2.5 shadow-2xs text-center">
                <img
                  src="/assets/images/C8-Science/ch2_fig9.png"
                  alt="Fig-9 Motion of a Ball on an inclined plane"
                  className="h-28 w-auto object-contain rounded"
                />
                <span className="mt-1 text-[11px] font-medium text-foreground/75 italic">
                  Fig-9 : Motion of a Ball on an inclined plane.
                </span>
              </div>

              <p>
                Set up an inclined plane on the horizontal floor. Use a wooden board as inclined plane. Put a mark &lsquo;A&rsquo; at any point on the inclined plane. Now let a glass marble or ball move down from this point. Note the distance covered by the glass marble from the bottom of the inclined plane to the point where it comes to a stop.
              </p>

              <p>
                Now, spread a cloth over the floor. Make sure that there are no wrinkles in the cloth. Try again with glass marble or ball. Now measure and note down the distance.
              </p>

              <ul className="rounded-xl border border-sky-200 bg-white p-3 text-xs text-sky-950 font-semibold list-disc list-inside space-y-1">
                <li>What are your observations from these experiments?</li>
                <li>In which case is the distance covered maximum?</li>
                <li>In which case is the distance covered minimum?</li>
              </ul>
            </div>

            {/* Right Column: Surface variations & Interlocking explanation */}
            <div className="space-y-3 text-justify text-xs">
              <ul className="rounded-xl border border-fuchsia-200 bg-white p-3 text-xs text-fuchsia-950 font-semibold list-disc list-inside">
                <li>Why is the distance covered by the glass marble or ball different on different surfaces? Discuss the result.</li>
              </ul>

              <p>
                If you do the above activity by replacing the cloth with white marble surface or glass surface, can you predict the distance covered by the glass marble? You can conclude that <strong>smoothness / roughness</strong> of the surfaces of both the floor and the glass marble could affect the distance travelled by it.
              </p>

              <p>
                Though many surfaces look like perfect planes, there exist many ups and downs on them. That type of surfaces are called <strong>irregular surfaces</strong>. Friction is caused by the <strong>irregularities</strong> on the two surfaces which are in contact.
              </p>

              {/* Interlocking Box */}
              <div className="rounded-2xl border-2 border-fuchsia-400 bg-gradient-to-br from-fuchsia-50 to-pink-50 p-4 space-y-2 text-fuchsia-950">
                <span className="block font-heading text-xs uppercase font-bold text-fuchsia-800 tracking-wider">
                  Microscopic Interlocking Mechanism
                </span>
                <p className="text-xs leading-relaxed">
                  Irregularities on the two surfaces lock into one another when we attempt to move on any surface. We have to apply a force to overcome interlocking. On rough surfaces, there exists a large number of irregularities (ups and downs). <strong>Hence, the force of friction is greater if a rough surface is involved.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold font-heading">24</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
        <span className="italic text-fuchsia-900 font-semibold">Friction</span>
      </div>
    </div>
  );
}
