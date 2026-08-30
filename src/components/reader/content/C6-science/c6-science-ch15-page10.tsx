import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh15Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>What do you observe? How is the image formed on the sheet?</li>
          </ul>
          <p className="text-xs">
            The image on the white drawing sheet is inverted. Isn&apos;t it? What difference do you notice
            between the images formed through the pinhole camera and through the magnifying glass?
          </p>
          <p className="text-xs">
            You may notice that the image formed through the magnifying lens is clearer than that formed with
            a pinhole camera.
          </p>

          <h3 className="font-heading text-base font-bold text-sky-800 pt-2">
            15.4. Differences between Image and Shadow:
          </h3>
          <p className="text-xs">
            We see our face in the mirror everyday. Is this picture in mirror a shadow or an image? How do you
            decide that?
          </p>
          <p className="text-xs">
            We know that shadows are not coloured but an image has colours that are same as that of the
            object. Also, a shadow shows only the outline of the object but an image shows the complete
            object as it is, just like a photograph.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium pt-2">
            <li>Can you find any other differences or similarities between shadows and images? Write in your note book.</li>
          </ul>

          <div className="flex gap-4 items-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[220px] mx-auto">
            <img
              src="/assets/images/C6-science/ch15_fig12.png"
              alt="Fig. 12 — Comparing detailed colored image of a tree vs its flat black shadow"
              className="max-w-[70px] h-auto rounded"
            />
            <div className="text-xs text-foreground/70 leading-tight">
              <strong>Fig. 12</strong> shows the difference between a shadow and an image of the same tree.
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <h3 className="font-heading text-base font-bold text-sky-805">
            Activity-9: Observe the Reflection
          </h3>
          <p className="text-xs">
            Make your class room dark by closing doors and windows. Ask one of your friends to hold a mirror
            in his hand. Take a torch and cover its glass with a black paper. Make a thin slit in the middle.
            Now switch on the torch and adjust it so that light falls on the mirror in your friend&apos;s
            hand. Ask your friend to adjust the mirror so that the patch of light falls on another friend
            standing in front of him at some distance, as shown in Fig. 13.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[190px] mx-auto">
            <img
              src="/assets/images/C6-science/ch15_fig13.png"
              alt="Fig. 13 — Kids reflecting torch light slit beam using a mirror onto another classmate"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 13
            </p>
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs pt-2">
            <li>What do you observe from the above activity?</li>
          </ul>
          <p className="text-xs">
            When light falls on any object, it rebounds back. This is called <strong>reflection.</strong>
          </p>
          <p className="text-xs">
            Ask your friend to cover the mirror with a book. Now switch on the torch and focus it on the
            book. Can you see the reflected light on other friend? If not, Why?
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Laser is also a kind of light. Lasers are used to destroy and kill tumours and many other purposes.</TipBox>
      </div>
    </div>
  );
}
