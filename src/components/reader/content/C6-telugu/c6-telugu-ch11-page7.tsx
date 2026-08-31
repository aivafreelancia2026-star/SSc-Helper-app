import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const COMPREHENSION_CONT = [
  "గంగయ్య పనిలో చేరడంవల్ల ఏమేం కోల్పోయాడు?",
  "బాలల హక్కులలో గంగయ్య ఏ హక్కులకు దూరమయ్యాడు?",
  "మదునయ్యను ఎందుకు శిక్షించారు? ఇట్లా చేయడం సరైందేనా?",
  "గంగయ్య తల్లిదండ్రులు చేసిన పని సరైందేనా? ఎందుకు?",
];

const TRUE_FALSE = [
  "చదువుకోవడం అందరి హక్కు",
  "బాలికలు కూడా బాలురతోపాటు సమానంగా చదువడం",
  "బాలబాలికలకు సమానహక్కులు ఉంటాయి",
  "బాలబాలికలను భయపెట్టడం, కొట్టడం, తిట్టడం",
  "తల్లిదండ్రులు తమ పిల్లలను పనిలో పెట్టడం",
  "పిల్లలు మంచి ఆహారం పొందడం",
  "తెలియనివాటిని, రానివాటిని ఉపాధ్యాయులను అడిగి తెలుసుకోవడం, నేర్చుకోవడం",
];

const SHORT_ANSWERS = [
  "'సగము ఖాళీ, చల్లగాలి' అని కవి ఏ సందర్భంలో అన్నాడు? ఎందుకు?",
  "పశువుల కాపరి వలె బాల్యాన్ని కోల్పోతున్నవారు ఇంకెవరెవరు ఉండవచ్చు?",
  "బడిలోని తోటి పిల్లలను చూసిన పసుల కాసే పిల్లవాడు ఎందుకు బాధపడ్డాడో కారణాలు ఊహించి రాయండి.",
  "సుద్దాల హనుమంతు గురించి రాయండి.",
];

// Book page 114 (PDF/app P123) — comprehension questions continue,
// then a true/false exercise about children's rights, then Section III
// (short answers + a 10-sentence essay prompt).
export function C6TeluguCh11Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <div className="space-y-4 px-5 pb-5 pt-4">
          {COMPREHENSION_CONT.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${String.fromCharCode(3081 + i)}. ${q}`}
              storageKey={`c6-telugu-ch11-page7-comprehension-${i + 1}`}
              quickWords={["బాలలహక్కులు", "చదువు", "గంగయ్య"]}
            />
          ))}

          <p className="font-semibold text-pink-600">3. కింది వాక్యాలను చదివి తప్పో, ఒప్పో గుర్తించండి. కారణం రాయండి.</p>
          {TRUE_FALSE.map((statement, i) => (
            <TeluguAnswerBox
              key={statement}
              question={`${String.fromCharCode(3077 + i)}. ${statement} (తప్పు/ఒప్పు)`}
              storageKey={`c6-telugu-ch11-page7-tf-${i + 1}`}
              quickWords={["తప్పు", "ఒప్పు"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III. స్వీయరచన</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">1. కింది ప్రశ్నలకు ఐదేసి వాక్యాల్లో జవాబులు రాయండి.</p>
          {SHORT_ANSWERS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${String.fromCharCode(3077 + i)}. ${q}`}
              storageKey={`c6-telugu-ch11-page7-short-${i + 1}`}
              quickWords={["జీతగాడు", "బడి", "కవి"]}
            />
          ))}
          <p className="font-semibold text-pink-600">2. కింది ప్రశ్నకు 10 వాక్యాల్లో జవాబు రాయండి.</p>
          <TeluguAnswerBox
            question="'పల్లెటూరి పిల్లగాడు, పశువుల కాపరి లాంటి వాళ్ళ జీవితాలు చదువుకుంటేనే బాగుపడుతాయి?' దీనిని సమర్థిస్తూ రాయండి."
            storageKey="c6-telugu-ch11-page7-essay"
            quickWords={["చదువు", "బాగుపడటం", "జీవితం"]}
          />
        </div>
      </section>
    </div>
  );
}
