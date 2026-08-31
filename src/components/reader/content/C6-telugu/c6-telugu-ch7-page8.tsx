import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SYNONYM_SENTENCES = [
  {
    label: "అ.",
    sentence: "హిమాలయపర్వతాల్లోని ఎవరెస్టు శిఖరాన్ని పూర్తి, ఆనంద్‌లు ఎక్కి, ఆ అద్రిపై భారత జాతీయపతాకం ఎగురవేసి, కొండంత కీర్తిని పొందారు.",
    hint: "పర్వతం, శిఖరం, అద్రి, కొండ — ఒకే అర్థం వచ్చే పదాలు",
  },
  {
    label: "ఆ.",
    sentence: "రామాపురానికి, రంగాపురానికి మధ్యన వంతెన కట్టడంవల్ల రెండు గ్రామాల ప్రజలు ఆ వారధి మీదుగా రాకపోకలు సాగిస్తున్నారు. ఆ సేతువు పుణ్యంకొద్ది ఆ గ్రామాల మధ్య దూరం చాలా తగ్గింది.",
    hint: "వంతెన, వారధి, సేతువు — ఒకే అర్థం వచ్చే పదాలు",
  },
  {
    label: "ఇ.",
    sentence: "ప్రజాధనం పచ్చికలా మేసినవాళ్ళి గడ్డిపోచలా భావించి, వాడికి తృణమే తిండిగా పెట్టాలి.",
    hint: "పచ్చిక, గడ్డిపోచ, తృణం — ఒకే అర్థం వచ్చే పదాలు",
  },
  {
    label: "ఈ.",
    sentence: "సముద్రంలో ముత్యాలు దొరుకుతాయి. అదే వార్ధిలో జలచరాలు ఎక్కువగా ఉంటాయి. ఆ వనధినీటి నుండే ఉప్పు లభిస్తుంది.",
    hint: "సముద్రం, వార్ధి, వనధి — ఒకే అర్థం వచ్చే పదాలు",
  },
];

// Book page 71 (PDF P80) — the illustration referenced by the previous
// page's conversation prompt (an ant offering a squirrel fruit), plus
// Section V's synonym-underline exercise, four sentences this time.
export function C6TeluguCh7Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <FigureNote
        emoji="🐿️🍎🐜"
        caption="ఒక చీమ ఉడుతకు పండును ఇస్తూ మాట్లాడుతున్న దృశ్యం — పరస్పర సాయాన్ని చూపే చిత్రం"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">V. పదజాల వినియోగం</h3>
        <div className="space-y-5 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">
            1. ఈ కింది వాక్యాలు చదవండి. ప్రతి వాక్యంలోనూ ఒక పదానికి అదే అర్థం వచ్చే మరో రెండు పదాలు
            ఉన్నాయి. ఆ పదాలకింద గీత గీయండి.
          </p>
          {SYNONYM_SENTENCES.map((set) => (
            <div key={set.label} className="space-y-2 rounded-md bg-amber-50/60 p-3">
              <p>
                <span className="font-semibold text-[#765f31]">{set.label}</span> {set.sentence}
              </p>
              <TeluguAnswerBox
                question={`ఒకే అర్థం వచ్చే పదాలను రాయండి: (${set.hint})`}
                storageKey={`c6-telugu-ch7-page8-syn-${set.label}`}
                quickWords={set.hint.split("—")[0].split(",").map((w) => w.trim())}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
