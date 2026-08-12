import { FigureNote } from "@/components/reader/figure-note";
import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh3Page2() {
  return (
    <div className="w-full space-y-4 font-body text-sm leading-relaxed text-foreground/90">
      <h3 className="font-heading text-sm font-bold text-primary">3.1.2 Liquid Form</h3>
      <p>What happens if ice is kept in the open air? It changes into water. If we heat ice, it will change into water.</p>
      <p>
        Water in liquid form is present in oceans, seas, lakes, rivers (Fig.3). Think in what form
        water is present underground.
      </p>

      <FigureNote emoji="🏞️" caption="Fig. 3 : Water - Liquid form" />

      <h3 className="font-heading text-sm font-bold text-primary">3.1.3. Gaseous Form</h3>
      <p>What happens when water is heated?</p>
      <p>
        The gaseous form of water is water vapour which is present in the air around us. Water in
        oceans, seas get heated up to form water vapour.
      </p>
      <p>
        We know that when ice is heated it converts into water and if water is heated it turns into
        water vapour. Similarly when water vapour is cooled we can get back water. If water is
        cooled further we will get ice.
      </p>

      <FigureNote emoji="🍲" caption="Fig. 4 : Water vapour - Gaseous form" />

      <div className="flex items-center justify-center gap-2 rounded-[16px] border border-border/50 bg-white/70 p-4 text-center font-heading text-sm font-bold text-primary">
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-semibold text-foreground/60">Heated →</span>
          <span>ICE</span>
          <span className="text-[10px] font-semibold text-foreground/60">← Cooled</span>
        </div>
        <span>⇌</span>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-semibold text-foreground/60">Heated →</span>
          <span>WATER</span>
          <span className="text-[10px] font-semibold text-foreground/60">← Cooled</span>
        </div>
        <span>⇌</span>
        <span>WATER VAPOUR</span>
      </div>

      <p>So, we understand that these three forms of water are interchangeable.</p>

      <h2 className="font-heading text-base font-bold text-primary">3.2. Evaporation and formation of clouds</h2>

      <FigureNote emoji="👕" caption="Fig. 5 — Wet clothes drying on a line" />

      <p>
        What happens to the water in wet clothes when they are dried in sunlight? When we want to
        dry clothes quickly we wave them about or keep them under a fan.
      </p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>Does the water in wet cloths dry up only due to sunlight or due to other reasons?</li>
      </ul>
      <p>You must have seen that rain water on wet roads, roof tops and some other places dries up after sometime.</p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>Where does this water go after drying up?</li>
      </ul>
      <p>
        If you heat water in a bowl on stove, you may have noticed water vapour coming from the
        surface of water. Thus, when water is heated, it gets converted into vapour and goes into
        the air. This is what happens to the water in wet clothes also.
      </p>
      <p>
        <strong>The process of water changing into water vapour is called &quot;evaporation&quot;</strong> If
        water is gently heated it will become warm, if it is heated more, it starts boiling. If we
        heat it further, it evaporates and converts completely into water vapour.
      </p>

      <TipBox>Rain drop is not really shaped like we see. It takes the shape as it falls from the clouds.</TipBox>
    </div>
  );
}
