import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const DISCUSS = [
  "చీమల విషయంలో 'కడు దుర్గమమైన బ్రతుకుబాట మీది' అని కవి ఎందుకన్నాడో చెప్పండి.",
  "పొదుపు పాటిస్తే దారిద్య్రం ఉండదని కవి అన్నాడుకదా! మనం ఏయే విషయాల్లో పొదుపు పాటించాలి?",
  "మనిషి బతకడానికి ఏయే విద్యలు నేర్చుకుంటున్నాడో ఆలోచించి చెప్పండి.",
];

// Book page 87 (PDF/app P96) — second stanza (thematic summary): the
// ants have no land of their own, yet through hard work and thrift they
// never go hungry.
export function C6TeluguCh9Page4() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">పద్యభాగం II — భావం</h3>
        <p className="px-5 py-4">
          చీమలకు సొంతంగా భూమి, ఆస్తులు ఏమీ లేవు. అయినా వాటి బతుకుబాట చాలా కష్టమైనదని కవి చెప్తాడు —
          ఎండనక వాననక అవి ఎప్పుడూ శ్రమిస్తూనే ఉంటాయి. వేసవిలోనే వానాకాలానికి కావలసిన ఆహారాన్ని
          జాగ్రత్తగా కూడబెట్టుకుంటాయి. ఈ పొదుపు గుణం వల్లే వాటికి ఎప్పుడూ కరువు రాదని, మనుషులు కూడా
          శ్రమించడం, పొదుపు చేయడం నేర్చుకోవాలని కవి సూచిస్తాడు.
        </p>
      </section>

      <FigureNote emoji="🐜🌾🏝️🌴" caption="తాటిచెట్టు దగ్గర పుట్టలోకి ఆహారధాన్యాలు మోసుకెళ్తున్న చీమల దృశ్యం" />

      <section className="rounded-sm border-2 border-amber-400 bg-amber-50/50">
        <h3 className="bg-amber-500 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {DISCUSS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${i + 1}. ${q}`}
              storageKey={`c6-telugu-ch9-page4-discuss-${i + 1}`}
              quickWords={["చీమలు", "పొదుపు", "శ్రమ", "బతుకుబాట"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
