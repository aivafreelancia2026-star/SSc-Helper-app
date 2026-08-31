import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const COMPREHENSION_AB = [
  "మదునయ్య ఎవరు? ఏం చేసేవాడు?",
  "గంగయ్య ఎవరు? పాలేరుకు ఎందుకు వచ్చాడు?",
];

// Book page 113 (PDF/app P122) — "ఇవి చేయండి" begins. Section II Q1 is a
// word-reordering exercise built from the poem's own lines — the
// scrambled prompt is given, but the unscrambled answer (which would
// reconstruct actual verse text) is intentionally left for the student
// to work out rather than provided here. Q2 opens a factual reading
// passage about child labor (Madunayya/Gangayya), continued next page.
export function C6TeluguCh11Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <h3 className="inline-block rounded-full bg-pink-100 px-6 py-2 text-lg font-bold text-pink-700">
        ఇవి చేయండి
      </h3>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          I. విని, అర్థంచేసుకొని, ఆలోచించి మాట్లాడడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <TeluguAnswerBox
            question="1. పాటను విన్నారు కదా! ఈ పాటను రాగంతో పాడండి. (మీ అనుభవాన్ని రాయండి)"
            storageKey="c6-telugu-ch11-page6-sing"
            quickWords={["పాట", "రాగం"]}
          />
          <TeluguAnswerBox
            question="2. పల్లెటూరి పిల్లగాని బాధలు ఎట్లున్నాయో చెప్పండి."
            storageKey="c6-telugu-ch11-page6-troubles"
            quickWords={["జీతగాడు", "బాధలు", "కష్టం"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          II. ధారాళంగా చదవడం - అర్థం చేసుకొని ప్రతిస్పందించడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">
            1. కింది పదాలు తారుమారుగా ఉన్నాయి. వాటిని సరిచేసి, పాఠంలోని సరైన వరుసలో రాయండి.
          </p>
          <TeluguAnswerBox
            question="పాఠ్యపుస్తకంలోని (అ), (ఆ) రెండు భాగాలను చూసి, సరైన వరుసను ఇక్కడ రాయండి"
            storageKey="c6-telugu-ch11-page6-reorder"
            quickWords={["వరుస", "సరిచేయండి"]}
          />

          <p className="font-semibold text-pink-600">2. కింది పేరాను చదివి ప్రశ్నలకు జవాబులు రాయండి.</p>
          <p className="rounded-md bg-amber-50/50 p-3 italic">
            మదునయ్య చేపల వ్యాపారి. పాలేరు రిజర్వాయరులో చేపలు పట్టి అమ్ముతాడు. పెద్ద పెద్ద వలలను
            నీటిలో వేసి చేపలను పడుతాడు. ఇందుకోసం అతనికో పనిమనిషి కావాలని ఆలోచించి ఒరిస్సా
            రాష్ట్రంలోని బరంపూర్‌కు పోయి ఆరోతరగతి చదివే గంగయ్య అనే బాలుడి తల్లిదండ్రులతోటి మాట్లాడి
            పదివేలకు అతడిని పనికి కుదుర్చుకున్నాడు. (బాలకార్మిక వ్యవస్థ గురించిన పేరా — పూర్తి పాఠం
            పాఠ్యపుస్తకంలో చూడండి)
          </p>
          {COMPREHENSION_AB.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${String.fromCharCode(3077 + i)}. ${q}`}
              storageKey={`c6-telugu-ch11-page6-comprehension-${i + 1}`}
              quickWords={["మదునయ్య", "గంగయ్య", "పని"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
