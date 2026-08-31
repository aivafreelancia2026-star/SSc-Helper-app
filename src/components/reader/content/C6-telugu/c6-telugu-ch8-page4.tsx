import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const DISCUSS = [
  "'మనసు బాగున్నప్పుడే నాలుగు మాటలు చెవికెక్కుతాయి'. అనడంలో ఆంతర్యం ఏమిటి?",
  "భూగర్భజలానికి నేను 'శ్రీరామరక్ష' అని చెరువు అనడాన్ని మీరెట్లా సమర్థిస్తారు?",
];

// Book page 77 (PDF/app P86) — narration continues (poets/artists loving
// the lake), a discussion box, then Section II opens (children playing at
// the lake).
export function C6TeluguCh8Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          కవులకు, కళాకారులకు తానెంతో ఇష్టమైనదానినని చెరువు గర్వంగా చెప్పుకుంటుంది — తన ప్రశాంతమైన
          నీటిని, చుట్టూ ఉన్న ప్రకృతిని వారు తమ కళల్లో అందంగా చిత్రిస్తారని వివరిస్తుంది.
        </p>
      </section>

      <section className="rounded-sm border-2 border-amber-400 bg-amber-50/50">
        <h3 className="bg-amber-500 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {DISCUSS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${i + 1}. ${q}`}
              storageKey={`c6-telugu-ch8-page4-discuss-${i + 1}`}
              quickWords={["చెరువు", "మనసు", "భూగర్భజలం", "నీరు"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">II — పిల్లల ఆటస్థలం</h3>
        <p className="px-5 py-4">
          పిల్లలకు తానొక ఆటస్థలమని, వాళ్ళు తనమీద పెంకులు, రాళ్ళు విసురుతూ ఆడుకోవడం చూసి చెరువు
          సంతోషిస్తుంది.
        </p>
      </section>

      <FigureNote
        emoji="🌸🚶‍♀️🎉👦🛁"
        caption="బతుకమ్మలను మోసుకెళ్తున్న మహిళలు, ఆడుకుంటున్న పిల్లలు, ఎడ్లబండి, చెరువులో స్నానం చేస్తున్న గ్రామస్తుల దృశ్యం"
      />
    </div>
  );
}
