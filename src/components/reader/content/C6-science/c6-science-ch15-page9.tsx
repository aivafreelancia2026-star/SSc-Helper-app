import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh15Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>What do you observe?</li>
          </ul>
          <p className="text-xs">
            The flame of the candle appears inverted on the screen. Why is it like that?
          </p>
          <p className="text-xs">
            This is not the <em>shadow</em> of the candle. It is its <strong>image.</strong>
          </p>
          <p className="text-xs">
            By observing Fig. 11(a), try to understand how light enters into the pinhole camera. This will
            explain the reason for inversion of image.
          </p>
          <p className="text-xs">
            The light from the candle travels straight in all directions from each point of the flame of
            the candle. But only the light coming in some particular directions can enter into the camera
            through its pinhole.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch15_fig11_a.png"
              alt="Fig. 11(a) — Candle flame ray diagram entering pinhole and projecting inverted image on screen"
              className="max-w-full h-auto"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 11(a)
            </p>
          </div>

          <p className="text-xs pt-2">
            Light which comes from the point at the top of the flame goes straight towards the bottom of the
            screen and light which comes from the point at the bottom of the flame goes straight towards the top
            of the screen, as shown in Fig. 11(a).
          </p>
          <p className="text-xs">
            In this way, light rays from the flame coming in the direction of pinhole enters the camera and
            light in other directions is blocked by the black sheet.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <p className="text-xs">
            This leads to the formation of an inverted image.
          </p>
          <p className="text-xs">
            The formation of inverted image on the screen of the pinhole camera explains that light travels
            in a straight line.
          </p>
          <p className="text-xs">
            Now look at a tree through the pinhole camera as shown in figure 11(b). We get the full image of
            the tree in the pinhole camera.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch15_fig11_b.png"
              alt="Fig. 11(b) — Tree ray diagram passing through pinhole projecting inverted image of tree"
              className="max-w-full h-auto"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 11(b)
            </p>
          </div>

          <p className="text-xs pt-2">
            But when we put a candle in front of the pinhole camera, we get the image of the flame only. The
            image of complete candle is not formed. Why is it so?
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
            <li>Predict what would happen if we make two pin holes in the camera? Now make two holes using a pin on the black paper cap of the pinhole camera and see a lighted candle through it. Write down your observations in your notebook.</li>
            <li>Did your predictions match with your observations?</li>
          </ul>

          <h3 className="font-heading text-base font-bold text-sky-805 pt-2">
            Activity-8: Image with a magnifying lens
          </h3>
          <p className="text-xs">
            Take a magnifying lens and try to form an image of a tree on a white drawing sheet.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>The white light from the sun is a mixture of seven colours of the rainbow.</TipBox>
      </div>
    </div>
  );
}
