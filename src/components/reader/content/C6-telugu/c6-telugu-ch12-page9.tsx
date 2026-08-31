import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const WHO_SAID = [
  "పెద్ద చెరువు ఎప్పుడు ఎండిపోలేదటగదా! అయితే ఈసారి ఎందుకు ఎండిపోయింది?",
  "జనం మధ్యలో సెల్‌టవర్లాయె. ఇక ఎట్లా బతుకుతయ్?",
  "బావులు, నదులు ఇవన్నీ నీళ్లతోటి కళకళలాడితే నీళ్లకేం కష్టం.",
  "తేళ్లు, పాములు భయంతోటి అల్లాడవట్టె.",
];

// Book page 126 (PDF/app P135) — "ఇవి చేయండి" begins. Section II Q1 asks
// students to identify who said which line in the dialogue (the lines
// themselves are short functional quotes, fine to give directly). Q2 is
// a short personified "tree's plea" passage — summarized thematically
// here rather than transcribed, since it's still creative writing, with
// the table exercise built around it.
export function C6TeluguCh12Page9() {
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
            question="1. ఈ పాఠం ద్వారా మీరు ఏం గ్రహించారో చెప్పండి?"
            storageKey="c6-telugu-ch12-page9-learned"
            quickWords={["ప్రకృతి", "కాపాడుకోవడం"]}
          />
          <TeluguAnswerBox
            question="2. 'పర్యావరణ పరిరక్షణ ప్రతి ఒక్కరి బాధ్యత' దీన్ని సమర్థిస్తూ మాట్లాడండి?"
            storageKey="c6-telugu-ch12-page9-responsibility"
            quickWords={["బాధ్యత", "పర్యావరణం"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          II. ధారాళంగా చదవడం - అర్థం చేసుకొని ప్రతిస్పందించడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">1. పాఠం చదివి కింది మాటలు ఎవరు ఎవరితో అన్నారో రాయండి.</p>
          {WHO_SAID.map((line, i) => (
            <TeluguAnswerBox
              key={line}
              question={`${String.fromCharCode(3077 + i)}. "${line}"`}
              storageKey={`c6-telugu-ch12-page9-whosaid-${i + 1}`}
              quickWords={["నర్సయ్య", "అన్నమ్మ", "గోపాల్", "లక్ష్మి"]}
            />
          ))}

          <p className="font-semibold text-pink-600">2. కింది పేరాను చదివి పట్టికను పూరించండి.</p>
          <p className="rounded-md bg-amber-50/50 p-3 italic">
            ఒక చెట్టు తనను తాను మనుషుల తల్లితో పోలుస్తూ, తనను నరకవద్దని, పండ్లను నీడను ప్రాణవాయువును
            ఇచ్చే తన త్యాగగుణాన్ని గుర్తించమని వేడుకుంటుంది. (పూర్తి పేరా పాఠ్యపుస్తకంలో చూడండి)
          </p>
          <div className="overflow-x-auto rounded-md border border-[#8b7a58]/60">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="bg-[#765f31] text-white">
                  <th className="border border-white/30 px-3 py-2">చేయకూడనివి</th>
                  <th className="border border-white/30 px-3 py-2">చేయవలసినవి</th>
                  <th className="border border-white/30 px-3 py-2">త్యాగజీవులు అందించేవి</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-amber-50/50">
                  <td className="border border-[#8b7a58]/30 px-3 py-6 text-foreground/30">…</td>
                  <td className="border border-[#8b7a58]/30 px-3 py-6 text-foreground/30">…</td>
                  <td className="border border-[#8b7a58]/30 px-3 py-6 text-foreground/30">…</td>
                </tr>
              </tbody>
            </table>
          </div>
          <TeluguAnswerBox
            question="పట్టికను, పేరాకు తగిన శీర్షికను ఇక్కడ రాయండి"
            storageKey="c6-telugu-ch12-page9-tree-table"
            quickWords={["నరకడం", "నీడ", "పండ్లు", "ప్రాణవాయువు"]}
          />
        </div>
      </section>
    </div>
  );
}
