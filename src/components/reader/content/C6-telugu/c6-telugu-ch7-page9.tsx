import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const PRAKRUTI_VIKRUTI = [
  "మనుషులు దవ్వుగా ఉన్న మమతలు దూరం కాకూడదు.",
  "స్వచ్ఛభారత్ కార్యక్రమానికి నావంతు సహాయం చేస్తున్నాను, మీరూ నాలాగే సాయం చెయ్యండి.",
  "వానరుల శక్తితో పోలిస్తే ఉడుత శక్తి కొంచెమే అయినా ఆ కొంచెం సత్తువతోనే అది వారధి కట్టడంలో సాయం చేసింది.",
];

const PARTS_OF_SPEECH_BLANKS = [
  "రవి పుస్తకం తెరిచి పాఠం ...........................",
  "రాముడు ................... తో కలిసి అరణ్యానికి పోయాడు.",
  "కిరణ్ పరుగుపందెంలో పాల్గొన్నాడు. ................ చాలా వేగంగా పరుగెత్తి మొదటి స్థానంలో నిలిచాడు.",
  "................... ! అంతపని జరిగిందా?",
  "పండుగరోజు విమల ........................... బట్టలు కట్టుకున్నది.",
];

const VIBHAKTI_SENTENCES = [
  "మానిక మల్లెపూలను ధరించింది.",
  "రాజేందర్ అడవికి వెళ్ళి ఉసిరికాయలు తెచ్చాడు.",
  "చిన్నపిల్లలు పెద్దలతో గౌరవంగా మెలగాలి.",
  "కీర్తన ఇంజనీరింగ్ చదవడంకోసం బాసర వెళ్ళింది.",
  "సహాయం చేయడంవల్ల రహీమ్ కష్టాల్లోంచి గట్టెక్కాడు.",
];

// Book page 72 (PDF P81) — Section V's prakruti-vikruti matching (Q2) and
// Section VI's part-of-speech fill-blanks (Q1) and vibhakti-pratyaya
// identification (Q2). All free-text: prakruti-vikruti pairing and
// vibhakti identification both have some genuinely debatable edge cases
// depending on how a sentence is parsed, so — same rule as the rest of
// this app — they stay ungraded rather than force-matched.
export function C6TeluguCh7Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">2. కింది వాక్యాలలోని ప్రకృతి - వికృతులను గుర్తించి రాయండి.</p>
          <p className="rounded-md bg-amber-50/50 p-3 italic">
            ఉదా॥ హనుమంతుడు రామున్ణి భక్తితో కొలిచాడు. ఆ బత్తి ఎన్నటికీ తరగదు. → <span className="not-italic font-semibold">భక్తి - బత్తి</span>
          </p>
          {PRAKRUTI_VIKRUTI.map((sentence, i) => (
            <div key={sentence} className="space-y-2 rounded-md bg-amber-50/30 p-3">
              <p>
                <span className="font-semibold text-[#765f31]">{String.fromCharCode(3077 + i)}.</span> {sentence}
              </p>
              <TeluguAnswerBox
                question="ప్రకృతి - వికృతి జతను రాయండి"
                storageKey={`c6-telugu-ch7-page9-prakruti-${i + 1}`}
                quickWords={["ప్రకృతి", "వికృతి"]}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">VI. భాషను గురించి తెలుసుకుందాం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">
            1. ఖాళీలను సరైన భాషాభాగాలతో పూరించి అవి ఏ భాషాభాగాలో రాయండి.
          </p>
          {PARTS_OF_SPEECH_BLANKS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${String.fromCharCode(3077 + i)}) ${q}`}
              storageKey={`c6-telugu-ch7-page9-pos-${i + 1}`}
              quickWords={["నామవాచకం", "సర్వనామం", "విశేషణం", "క్రియ", "అవ్యయం"]}
            />
          ))}

          <p className="font-semibold text-pink-600">
            2. కింది వాక్యాల్లో విభక్తి ప్రత్యయాలను గుర్తించి వాటికింద గీతలు గీయండి. అవి ఏ విభక్తులో బ్రాకెట్లలో రాయండి.
          </p>
          {VIBHAKTI_SENTENCES.map((sentence, i) => (
            <div key={sentence} className="space-y-2 rounded-md bg-amber-50/30 p-3">
              <p>
                <span className="font-semibold text-[#765f31]">{String.fromCharCode(3077 + i)})</span> {sentence}
              </p>
              <TeluguAnswerBox
                question="విభక్తి ప్రత్యయం, విభక్తి పేరు రాయండి"
                storageKey={`c6-telugu-ch7-page9-vibhakti-${i + 1}`}
                quickWords={["ప్రథమా", "ద్వితీయా", "తృతీయా", "చతుర్థీ", "పంచమి", "షష్ఠి", "సప్తమి"]}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
