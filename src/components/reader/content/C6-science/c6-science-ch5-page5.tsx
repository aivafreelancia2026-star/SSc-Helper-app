import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh5Page5() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <h2 className="font-heading text-base font-bold text-primary">Activity-4: Are we able to See through a paper</h2>
      <p>
        Take a sheet of white paper and try to see a lighted bulb through it (Fig. 5). Record your
        observations. Now put a few drops of oil on that sheet and again try to see the bulb
        through it (Fig. 6). What difference do you notice?
      </p>

      <FigureNote emoji="💡" caption="Fig. 5 & 6 — Looking at a lighted bulb through plain paper, then through oiled paper" />

      <p>You notice that in the first case you can&apos;t see the bulb but in second case you are able to see the bulb.</p>
      <p>
        The materials through which we can see objects, but not very clearly, are said to be{" "}
        <strong>translucent</strong>. Oily paper is an example of a translucent substance.
      </p>
      <p>
        Some glass panes fixed to windows allow some light to come through but you can&apos;t see
        clearly through them; such type of glass is translucent glass.
      </p>
      <p>Can you give some more examples of translucent objects?</p>

      <h2 className="font-heading text-base font-bold text-primary">Try This Activity</h2>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>Take a torch, switch it on and see. Does the light pass through the torch glass?</li>
        <li>Now cover the torch glass with your palm. What do you observe?</li>
        <li>Now cover the torch glass with oily paper. What do you observe?</li>
      </ul>

      <p>In the above activity, when do you observe transparent, translucent, and opaque property? Discuss.</p>

      <h2 className="font-heading text-base font-bold text-primary">5.4. State of the materials</h2>
      <p>In the chapter on rain you have studied the three states of water. Ice, water and water vapour.</p>
      <p>You would have noticed that when ice is put into a glass, the ice begins to melt and after some time all of it becomes water and the glass becomes cold.</p>
      <p>If we heat the water in a vessel we notice that after some time water vapour is produced. If heating is continued, more and more vapour is produced in the form of steam and the quantity of water in the vessel keeps decreasing.</p>
      <p>Some materials change their state from solid to liquid, liquid to gas on being heated and from gas to liquid, liquid to solid on being cooled. So we can classify materials as solids, liquids or gases based on their state at normal temperature.</p>
      <p>Can you think of any material other than ice that goes from solid to liquid, liquid to gas (vapour)?</p>

      <h2 className="font-heading text-base font-bold text-primary">Activity-5: Light a candle</h2>
      <p>Can you light the candle without touching the wick with a burning matchstick? Let us try.</p>

      <TipBox>Though ice has crystalline structure, its density is less than that of water, so it floats on water.</TipBox>
    </div>
  );
}
