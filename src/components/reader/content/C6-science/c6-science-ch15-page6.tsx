import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh15Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>What do you find?</li>
            <li>By seeing shadows, were you able to guess the object correctly in all cases?</li>
          </ul>
          <p className="text-xs">
            You must have wondered when you compared your guesses and the actual objects of which shadows
            are formed. You may notice that the shadows that look like bird and animal are actually
            formed by hands. (Try to form similar shadows with your hands.)
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>What can you conclude from the above activity?</li>
            <li>Can we guess the object by observing its shadow?</li>
          </ul>

          <h3 className="font-heading text-base font-bold text-sky-805 pt-2">
            Activity-4: Colour of a shadow
          </h3>
          <p className="text-xs">
            Take four balls of equal size but different colours. Try to form shadow of each ball as shown in
            Fig. 8. Ask your friend who is facing the screen and not able to see the balls to guess the
            colour of each ball.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[180px] mx-auto">
            <img
              src="/assets/images/C6-science/ch15_fig8.png"
              alt="Fig. 8 — Children trying to guess the color of the ball's shadow on a screen"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 8
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Is your friend able to guess the colour of the ball correctly?</li>
            <li>In the same way, let your friend form a shadow of the ball and you try to find the colour of the ball.</li>
            <li>Is it possible to guess the colour of the object by observing its shadow? If not why?</li>
          </ul>
          <p className="text-xs">
            Shadow is an area where light is absent. Hence, the shadow is colourless irrespective of colour
            of the object.
          </p>
          <p className="text-xs">
            We have seen that we can&apos;t guess the object by observing it&apos;s shadow. Can we guess the
            shape of the shadow that would be formed by an object?
          </p>
          <p className="text-xs">Let us find.</p>

          <h3 className="font-heading text-base font-bold text-sky-805 pt-2">
            Activity-5: Shape of a shadow
          </h3>
          <p className="text-xs">
            Observe the shadows of a book, a pen a duster, a ball and a round plate, one by one, in
            sunlight. While doing this, rotate the objects to change their positions and observe the
            changes in shadows. Try to answer the following questions on the basis of your observations :
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 text-xs">
            <li>Is there any similarity between the shadows of ball and a plate? If yes, what?</li>
            <li>What change do you observe in the shadows formed when you hold the pen horizontally and then vertically?</li>
          </ul>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Scientists study the properties and behaviors of light in a branch of physics known as optics.</TipBox>
      </div>
    </div>
  );
}
