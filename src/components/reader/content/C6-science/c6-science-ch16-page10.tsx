import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh16Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-xs">
            there are some things that are not visible. We cannot see them. We can see those small organisms
            under a microscope. Living beings that we can see only under the microscope are called
            <strong>micro-organisms.</strong> Let us try to understand about a microscope and then use it for
            observing some micro-organisms.
          </p>

          <h3 className="font-heading text-base font-bold text-emerald-800 pt-2">
            16.10. What is a microscope?
          </h3>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch16_fig8.png"
              alt="Fig. 8 — Labeled diagram of a compound microscope showing eye piece, objective lens, stage, slide, light, and focus controls"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 8
            </p>
          </div>

          <p className="text-xs pt-2">
            Microscope is an instrument with the help of which we are able to see minute things that we
            cannot see with our naked eyes. It works like a magnifying lens but it is much more powerful.
          </p>
          <p className="text-xs">
            Basically, there are two components in a microscope - 1) the structural component 2) the visual
            components.
          </p>
          <p className="text-xs">
            Structural components are the head/body, base and arm. Visual components are eyepiece,
            objective, nosepiece, coarse and fine adjustment knobs, stage, aperture etc.
          </p>
          <p className="text-xs">
            Fig. 8 shows a labeled diagram of a compound microscope. Taking its help identify different
            parts of microscope in your school.
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <p className="text-xs">
            Now we want to see some micro-organism. Where can we find them?
          </p>

          <h3 className="font-heading text-base font-bold text-emerald-805 pt-2">
            Activity-10: Bread Mould
          </h3>
          <p className="text-xs">
            Generally our elder say that we should not put wet spoons in pickle jars. Why do they say this?
            When you put wet spoons in a pickle jar, the pickle will spoil. What happens when you pack bread
            or vegetable and keep for a couple of days? You observe that they become rotten and they emit a
            foul smell. We can see thin, thread like grey colour substance. After some days this grey colour
            substance turns black.
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-emerald-100">
        <TipBox>Bacteria are found everywhere - in air, water, soil, animals, people and food.</TipBox>
      </div>
    </div>
  );
}
