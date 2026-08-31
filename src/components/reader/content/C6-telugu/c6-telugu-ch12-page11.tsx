import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SYNONYM_WORDS = [
  "తొందరగా", "దురాక్రమణ", "శబ్దాలు", "సంతోషం", "కాలువలు",
  "ఇంతకుముందు కాలం", "ప్రాణులు", "పిల్లవాళ్లు", "వాహనాలు", "వేగంగాపోవడం",
];

const ODD_ONE_OUT = [
  "పులి, సింహం, ఎలుగుబంటి, కుక్క",
  "బావులు, నదులు, సముద్రాలు, చెరువులు",
  "కారు, స్కూటర్, సైకిలు, లారీ",
  "బీడిపొగ, వాహనాలపొగ, సాంబ్రాణిపొగ, ఫ్యాక్టరీపొగ",
];

// Book page 128 (PDF/app P137) — Section IV (a poster-making prompt and
// a tree-children dialogue prompt) and Section V (synonyms, odd-one-out,
// prakruti-vikruti, English loanwords).
export function C6TeluguCh12Page11() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">IV. సృజనాత్మకత / ప్రశంస</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <TeluguAnswerBox
            question="1. 'పర్యావరణ పరిరక్షణ'లో అందరూ పాలుపంచుకోవాలని ఒక పోస్టరు తయారుచేయండి. (మీ పోస్టరు ఆలోచనను వర్ణించండి)"
            storageKey="c6-telugu-ch12-page11-poster"
            quickWords={["పోస్టర్", "పర్యావరణం"]}
          />
          <FigureNote emoji="🌳😊🎁📚👧" caption="మనిషిలా చిరునవ్వుతో కొమ్మలను చాచి, పిల్లలకు పుస్తకాలు, బట్టలు ఇస్తున్న చెట్టు చిత్రం" />
          <TeluguAnswerBox
            question="2. పై బొమ్మను చూడండి. బొమ్మ ఆధారంగా చెట్టుకు, పిల్లలకు మధ్య సంభాషణలు రాయండి."
            storageKey="c6-telugu-ch12-page11-dialogue"
            quickWords={["చెట్టు", "పిల్లలు", "సంభాషణ"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">V. పదజాల వినియోగం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">1. కింది పదాలకు అదే అర్థం వచ్చే పదాలను పాఠం ఆధారంగా రాయండి.</p>
          {SYNONYM_WORDS.map((word, i) => (
            <TeluguAnswerBox
              key={word}
              question={`${String.fromCharCode(3077 + i)}. ${word}`}
              storageKey={`c6-telugu-ch12-page11-synonym-${i + 1}`}
              quickWords={[word]}
            />
          ))}

          <p className="font-semibold text-pink-600">2. కింది పదాలలో భిన్నమైన పదాన్ని గుర్తించి గీతగీయండి.</p>
          {ODD_ONE_OUT.map((group, i) => (
            <TeluguAnswerBox
              key={group}
              question={`${String.fromCharCode(3077 + i)}. ${group}`}
              storageKey={`c6-telugu-ch12-page11-odd-${i + 1}`}
              quickWords={["భిన్నమైనది"]}
            />
          ))}

          <p className="font-semibold text-pink-600">3. కింది పట్టికను చదివి అందులోని ప్రకృతి-వికృతులను రాయండి.</p>
          <p className="rounded-md bg-amber-50/50 p-3 text-xs">ఉదా॥ లక్ష్మి - లచ్చి (పట్టిక పాఠ్యపుస్తకంలో చూడండి)</p>
          <TeluguAnswerBox
            question="పట్టికలో దొరికిన ప్రకృతి-వికృతి పదాలను రాయండి"
            storageKey="c6-telugu-ch12-page11-prakruti"
            quickWords={["ప్రకృతి", "వికృతి"]}
          />

          <p className="font-semibold text-pink-600">4. పాఠంలో గల ఆంగ్లపదాలను, వాటి అర్థాలను రాయండి.</p>
          <p className="rounded-md bg-amber-50/50 p-3 text-xs">ఉదా: డాక్టరు - వైద్యుడు</p>
          <TeluguAnswerBox
            question="పాఠంలోని ఆంగ్లపదాలు, వాటి తెలుగు అర్థాలు రాయండి (ఉదా: సెల్‌టవర్, డీజే)"
            storageKey="c6-telugu-ch12-page11-english-words"
            quickWords={["సెల్‌టవర్", "డాక్టర్"]}
          />
        </div>
      </section>
    </div>
  );
}
