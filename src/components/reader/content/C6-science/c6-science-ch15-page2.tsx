import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh15Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Where does light come from? Which objects give us light? Think and write below :</li>
          </ul>
          
          <div className="grid grid-cols-2 gap-4 border border-sky-100 rounded-xl p-3 bg-sky-50/20">
            <div className="border-b border-sky-200 py-1" />
            <div className="border-b border-sky-200 py-1" />
            <div className="border-b border-sky-200 py-1" />
            <div className="border-b border-sky-200 py-1" />
          </div>

          <p className="text-xs">
            A substance which gives light is known as a <strong>light source.</strong> Sun, a glowing
            bulb, lighted candle etc. are some sources of light. Any object which burns or glows acts
            as a source of light.
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Is Moon a source of light?</li>
          </ul>
          <p className="text-xs">
            Can you give some more examples for source of light? You might have seen your shadow many
            times. When did you see it? Is it during day time or at night?
          </p>
          <p className="text-xs">
            It is our common experience that we see shadows in daytime. Are shadows formed at night? Try
            to see your shadow in moonlight on a full moon day. It is also possible to get your shadow
            at night, in your house, when the electric bulb is on. Is it possible to form shadows when
            there is no sunlight, bulb or any other light?
          </p>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>What do we need to form a shadow?</li>
          </ul>
          <p className="text-xs">We need light to get the shadow of any object.</p>

          <h3 className="font-heading text-base font-bold text-sky-805 pt-2">
            Activity-2: Do all objects form shadows?
          </h3>
          <p className="text-xs">
            Try to form shadows of a book, a pen, a duster, a polythene cover, and a glass plate on the
            wall of your classroom with the help of a torch light or sunlight.
          </p>
          <p className="text-xs">
            Do you find any differences in the shadows of the above objects? Do all objects form shadow?
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Which objects form the shadows?</li>
          </ul>
          <div className="grid grid-cols-2 gap-4 border border-sky-100 rounded-xl p-3 bg-sky-50/20">
            <div className="border-b border-sky-200 py-1" />
            <div className="border-b border-sky-200 py-1" />
            <div className="border-b border-sky-200 py-1" />
            <div className="border-b border-sky-200 py-1" />
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium pt-2">
            <li>Which objects do not form shadows?</li>
          </ul>
          <div className="grid grid-cols-2 gap-4 border border-sky-100 rounded-xl p-3 bg-sky-50/20">
            <div className="border-b border-sky-200 py-1" />
            <div className="border-b border-sky-200 py-1" />
            <div className="border-b border-sky-200 py-1" />
            <div className="border-b border-sky-200 py-1" />
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium pt-2">
            <li>Think and write why some objects form shadows? And others do not?</li>
          </ul>
          <div className="border-b border-sky-200 py-2" />
          <div className="border-b border-sky-200 py-2" />
          <div className="border-b border-sky-200 py-2" />

          <p className="text-xs pt-4">
            The substances like paper, plank, wood, iron etc. don&apos;t allow light to pass through them.
            These objects form shadow. These are called <strong>opaque substances.</strong>
          </p>
          <p className="text-xs">
            The substances like glass and air allow light to pass through them and hence we don&apos;t
            get their shadows. Such substances are called <strong>transparent.</strong>
          </p>
          <p className="text-xs">
            The substances such as polythene cover and oily paper partially allows the light to pass
            through them. Their shadows are unclear. These are called <strong>translucent substances.</strong>
            You have also come across these terms in the chapter on materials.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Red, green and blue are the primary colours of light. Mixing them in various ways will make all other colours, including white.</TipBox>
      </div>
    </div>
  );
}
