import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const MEANING_SENTENCES = [
  { label: "అ.", sentence: "ఈ సీమ సీతాఫలాలకు ప్రసిద్ధి.", word: "సీమ" },
  { label: "ఆ.", sentence: "కృష్ణుని అల్లరి చేష్టలకు విసిగి గోపికలు కయ్యానికి దిగారు.", word: "కయ్యానికి" },
  { label: "ఇ.", sentence: "ప్రార్థన సమయంలో విద్యార్థులు బారుకట్టి నిలబడ్డారు.", word: "బారుకట్టి" },
  { label: "ఈ.", sentence: "నల్లరేగడి మాన్యాలలో పంటలు బాగా పండుతాయి.", word: "మాన్యాలలో" },
  { label: "ఉ.", sentence: "ఓరిమి ఉంటే దేనినైనా సాధించగలం.", word: "ఓరిమి" },
];

const OWN_SENTENCE_WORDS = ["ఘనులు", "పోకడ", "ఎగుమతి", "వివేకం", "కొల్లలు", "ఇంగితజ్ఞులు"];

const SAMASA_SENTENCES = [
  { label: "అ.", sentence: "మాకు దేశభక్తి ఉన్నది.", word: "దేశభక్తి" },
  { label: "ఆ.", sentence: "సురేశ్ వేసుకున్నది తెల్లచొక్క.", word: "తెల్లచొక్క" },
  { label: "ఇ.", sentence: "లక్ష్మీపతి దయ నాపై ఉన్నది.", word: "లక్ష్మీపతి" },
  { label: "ఈ.", sentence: "ఏకలవ్యుడు గురుదక్షిణ ఇచ్చాడు.", word: "గురుదక్షిణ" },
  { label: "ఉ.", sentence: "పావని అంగడికి పోయి కూరగాయలు తెచ్చింది.", word: "కూరగాయలు" },
  { label: "ఊ.", sentence: "మాధవునికి పది ఎకరాల పొలం ఉన్నది.", word: "పది ఎకరాల" },
];

// Book page 91 (PDF/app P100) — Section V (word-meanings, own-sentences,
// prakruti-vikruti matching) and Section VI opens grammar: సమాసం
// (compound words) with six example sentences, then a ద్వంద్వసమాసం
// (dvandva/co-ordinate compound) example. Grammar terms defined here are
// standard factual Telugu grammar, not the textbook's own creative
// content, so given in full.
export function C6TeluguCh9Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">V. పదజాల వినియోగం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">1. కింది వాక్యాలలో గీతగీసిన పదాలకు అర్థాలు రాయండి.</p>
          {MEANING_SENTENCES.map((item) => (
            <TeluguAnswerBox
              key={item.label}
              question={`${item.label} ${item.sentence.replace(item.word, `**${item.word}**`)}`}
              storageKey={`c6-telugu-ch9-page8-meaning-${item.label}`}
              quickWords={[item.word]}
            />
          ))}

          <p className="font-semibold text-pink-600">2. కింది పదాలనుపయోగించి సొంత వాక్యాలు రాయండి.</p>
          {OWN_SENTENCE_WORDS.map((word, i) => (
            <TeluguAnswerBox
              key={word}
              question={`${String.fromCharCode(3077 + i)}. ${word}`}
              storageKey={`c6-telugu-ch9-page8-sentence-${i + 1}`}
              quickWords={[word]}
            />
          ))}

          <p className="font-semibold text-pink-600">
            3. కింది పట్టిక కింద ప్రకృతి పదాలకు వికృతి పదాలను పట్టికలో వెతికి రాయండి.
          </p>
          <p className="rounded-md bg-amber-50/50 p-3 text-xs">
            (పదాలు: చితుకు, మన్నెం, చిత్రరువు, విధం, విద్యె, బరువు)
          </p>
          {["విద్య", "చిత్రం", "మాన్యం"].map((word, i) => (
            <TeluguAnswerBox
              key={word}
              question={`${String.fromCharCode(3077 + i)}. ${word} — వికృతి పదం రాయండి`}
              storageKey={`c6-telugu-ch9-page8-prakruti-${i + 1}`}
              quickWords={["విద్యె", "చిత్రరువు", "మన్నెం"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">VI. భాషను గురించి తెలుసుకుందాం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">సమాసం</p>
          <p>
            రెండు లేదా అంతకంటే ఎక్కువ పదాలు కలిసి, మధ్యలో విభక్తి ప్రత్యయాలు కనిపించకుండా ఒకే పదంగా
            ఏర్పడటాన్ని 'సమాసం' అంటారు. కింది వాక్యాలు చదవండి — గీత గీసిన పదాలు సమాసపదాలు.
          </p>
          {SAMASA_SENTENCES.map((item) => (
            <TeluguAnswerBox
              key={item.label}
              question={`${item.label} ${item.sentence.replace(item.word, `**${item.word}**`)} — ఈ సమాసపదాన్ని విడదీసి రాయండి`}
              storageKey={`c6-telugu-ch9-page8-samasa-${item.label}`}
              quickWords={[item.word]}
            />
          ))}

          <p>పై వాక్యాల్లో గీతగీసిన పదాల అర్థాలను గమనించండి:</p>
          <div className="space-y-1 rounded-md bg-amber-50/50 p-3">
            {[
              "దేశభక్తి — దేశమునందు భక్తి",
              "తెల్లచొక్క — తెల్లనైన చొక్క",
              "లక్ష్మీపతి — లక్ష్మియొక్క పతి",
              "గురుదక్షిణ — గురువుకొరకు దక్షిణ",
              "కూరగాయలు — కూర మరియు కాయ",
              "పది ఎకరాలు — పది సంఖ్యగల ఎకరాలు",
            ].map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p>
            పై పదాల్లో వేరువేరు అర్థాలు గల రెండు పదాలు కలిసి ఒకే పదంగా ఏర్పడ్డాయి కదా! ఈ విధంగా
            అర్థవంతమైన రెండు పదాలు కలిసి కొత్తపదంగా ఏర్పడటాన్నే <span className="font-semibold text-pink-600">సమాసం</span> అంటారు.
            సమాసంలో మొదటి పదాన్ని <span className="font-semibold">'పూర్వపదం'</span> అని, రెండవ పదాన్ని{" "}
            <span className="font-semibold">'ఉత్తరపదం'</span> అని అంటారు. సమాసంలోని పదాల అర్థాలను
            వివరించి చెప్పే వాక్యాన్ని <span className="font-semibold">'విగ్రహవాక్యం'</span> అంటారు.
            సమాసంలో ఉండే పదాల, అర్థాల ప్రాధాన్యతను బట్టి సమాసాలకు లక్షణాలు (పేర్లు) ఏర్పడతాయి.
          </p>

          <p className="font-semibold text-pink-600">ద్వంద్వసమాసం</p>
          <p>కింది వాక్యాన్ని పరిశీలించండి —</p>
          <p className="rounded-md bg-amber-50/50 p-3 font-semibold">'గురుశిష్యుల బంధం చాలా గొప్పది'.</p>
          <p>
            ఈ వాక్యంలో <span className="font-semibold">గురుశిష్యులు</span> అనే మాటలో రెండు పదాలను
            సులభంగా గుర్తించవచ్చు. అవి <span className="font-semibold">గురువు, శిష్యుడు</span> అని.
            ఇట్లా విడదీసి చెప్పడాన్ని <span className="font-semibold">విగ్రహవాక్యం</span> అంటారు.
            ఇందులో గురువు, శిష్యుడు ఇద్దరూ ముఖ్యులే. ఇట్లా రెండుకాని అంతకంటే ఎక్కువగానీ
            సమప్రాధాన్యంగల నామవాచకాలు కలిసి ఒకే మాటగా ఏర్పడే సమాసాన్ని{" "}
            <span className="font-semibold text-pink-600">ద్వంద్వసమాసం</span> అంటారు.
          </p>
          <TeluguAnswerBox
            question="ద్వంద్వసమాసానికి మీ సొంతంగా ఒక ఉదాహరణ రాయండి (ఉదా: అమ్మానాన్నలు, అన్నదమ్ములు వంటివి)"
            storageKey="c6-telugu-ch9-page8-dvandva"
            quickWords={["అమ్మానాన్నలు", "అన్నదమ్ములు", "రామలక్ష్మణులు"]}
          />
        </div>
      </section>
    </div>
  );
}
