import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh15Page1() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Chapter 15 Banner */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-double border-sky-400/60 bg-gradient-to-br from-sky-50 to-sky-100/50 p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-block rounded-full bg-sky-200/60 px-3 py-1 text-xs font-semibold tracking-wider text-sky-800 uppercase">
              Chapter 15
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-sky-950 sm:text-3xl">
              Light, Shadows and Images
            </h1>
          </div>
          <div className="flex flex-col items-center border border-sky-200 rounded p-1.5 bg-white shadow-xs">
            <span className="text-[9px] font-mono font-bold leading-none tracking-widest text-sky-600 mb-1">QR CODE</span>
            <div className="w-12 h-12 bg-sky-50 border border-sky-100 flex items-center justify-center text-[10px] font-bold text-sky-700 font-mono select-none">
              G7H9B3
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p>
            One day Raju started for his home from school, late in the evening. When he started, he was
            able to see trees, buildings, animals, buses etc. on the road and on either side of the road.
            As he kept walking, it started growing dark and soon he was not able to see objects either on
            the road or on the sides as clearly as earlier. When he reached home, it was already dark. He
            started doing his homework. Suddenly the power went off. He was not able to see any objects
            in the room.
          </p>
          <p>Raju started wondering:</p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Why am I not able to see the objects clearly when it gets dark?</li>
            <li>Why am I not able to see the objects when power went off?</li>
            <li>How are we able to see the objects in the presence of light?</li>
            <li>Why are we not able to see the objects in the absence of light?</li>
          </ul>

          <h3 className="font-heading text-base font-bold text-sky-805 pt-2">
            Activity-1: How can we see objects?
          </h3>
          <p className="text-xs">
            Make your room dark by shutting the door and windows; put on the light. Look at any one of the
            objects in the room. After that, hold a plank or a writing pad in front of your face.
          </p>
          <p className="text-xs font-semibold text-sky-900">
            Is the object visible to you? Why is it not visible though there is light? What happens when
            you hold a plank between the object and you?
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-sky-800">
            15.1. Light, Shadows and Images
          </h2>
          <p className="text-xs">
            The object is visible when there is no obstruction between your eyes and the object. If we keep
            obstructions like plank or writing pad, they do not allow some thing that is coming from the
            object to reach us. What is that some thing coming from the object?
          </p>
          <p className="text-xs">
            When we put on the bulb, light falls on the object, bounces from the object and reaches us. We
            can see an object only when light falls on it and bounces back to our eyes. See Fig. 1 and
            observe the direction of light from bulb to the object and light from object to the eye.
          </p>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch15_fig1.png"
              alt="Fig. 1 — Light path from lamp bulb bouncing off a steel pitcher jug to girl's eyes"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 1
            </p>
          </div>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>It takes 8 minutes 17 seconds for light to travel from the Sun&apos;s surface to the Earth.</TipBox>
      </div>
    </div>
  );
}
