import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh12Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Can you observe a bulb and say if it can glow or not when connected in a circuit?</li>
          </ul>
          <p>
            Do you find any difference in the filament of glowing bulb and the bulb that is not glowing?
          </p>
          <p>
            Take one spoilt bulb and connect it in a circuit. It doesn&apos;t glow. When the filament of the
            bulb is broken, then no electric current will pass through it as the circuit is not closed. Hence
            the bulb doesn&apos;t glow.
          </p>

          <h2 className="font-heading text-base font-bold text-sky-800 pt-2">
            12.4. Switch :
          </h2>
          <p>
            We use switches to put ON or put OFF the torch light. Similarly we use various switches in our
            house to put ON or put OFF the electric bulbs, tubes, fans etc. What is a switch? How does it
            work?
          </p>
          
          <p className="font-semibold text-sky-850">Let us observe</p>
          <h3 className="font-heading text-sm font-bold text-sky-805">
            Activity-3: Electric Switch
          </h3>
          <p className="italic text-foreground/75 text-xs">
            Connect a circuit on a wooden plank or on a thermocol sheet as shown in Fig. 6.
          </p>
          <p className="text-xs">
            Insert two drawing pins at A and B. Insert a safety pin in between A and B, such that one end of
            the pin is completely in contact with B and the other end is left free. Does the bulb glow?
          </p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-sky-100 pt-6 md:pt-0 md:pl-8">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-sky-100 p-4 shadow-sm max-w-[200px] mx-auto">
            <img
              src="/assets/images/C6-science/ch12_fig6.png"
              alt="Fig. 6 — Safety pin switch circuit on board"
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center font-body text-xs italic text-foreground/50 mt-2 font-semibold">
              Fig. 6: Circuit with a switch
            </p>
          </div>

          <p className="pt-2">
            Now touch the safety-pin to pin A and observe the bulb again. What happens?
          </p>
          <p>
            Why doesn&apos;t the bulb glow when the safety pin is left free at one end?
          </p>
          <p>
            In the above activity, the safety pin is used to close /open the circuit. Electric switch is an
            arrangement to close or open (break) a circuit.
          </p>
          <p>
            The switch allows the flow of electricity when it is ON and cuts off the flow of electricity
            when it is OFF. In this way, the switch is used to allow / stop the flow of electricity to the
            bulb or any other electrical device.
          </p>
          <p>
            The flow of electricity in a circuit is called <strong>current.</strong>
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-sky-100">
        <TipBox>Italian biologist Luigi Galvani (1737-1798) touched two pieces of metal to a dead frog&apos;s leg and made it jump. This led him to believe electricity was made inside animals&apos; bodies.</TipBox>
      </div>
    </div>
  );
}
