import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const IDIOM_PHRASES = [
  "చెవినిల్లుగట్టుకొని", "కుండబద్దలుకొట్టినట్లు", "గుండెచెరువైంది", "ఉర్కబోయి బోర్లపడ్డట్టు",
  "వండినకుండ", "తామరతంపర", "చేతులు కాలాక ఆకులు పట్టుకున్నట్లు", "గాలం వేయడం", "కన్నెర్ర",
];

const IDIOM_WORDS = [
  "కోరిక", "ముసలికన్నీరు", "కలుగు", "నిండుకుండోలె", "పండ్లుకొరుకు",
  "మాధుర్యం", "పూసల్లో దారము", "జాతర", "కొట్టినపిండి", "తలలో నాలుక", "చెరువు", "చల్లగాలి",
];

const CONJUNCT_SOUNDS = ["అక్క", "ముగ్ధ", "మూర్ఖ"];
const UNDERLINE_SENTENCES = [
  "ఎప్పటికైనా జాగ్రత్తపడతారని ఆశ.",
  "నీళ్ళెంత ఎక్కువగా ఉంటే తామర అంత వృద్ధిచెందుతుంది.",
  "అవి ఎక్కడుంటయో తెలియదు.",
];

// Book page 82 (PDF/app P91) — Section V (జాతీయం vs సామెత distinction,
// then identifying జాతీయాలు in a word list) and Section VI opens with
// సంయుక్త/ద్విత్వాక్షరాల ధ్వని breakdown and a "విడదీసి రాయడం" (splitting
// combined words) lead-in, continued on the next page.
export function C6TeluguCh8Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">V. పదజాల వినియోగం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">1. కింది పదాలు, వాక్యాలు చదవండి.</p>
          <p className="rounded-md bg-amber-50/50 p-3">{IDIOM_PHRASES.join(", ")}</p>
          <p>
            పై వాటిలో ఉన్న తేడాలు ఏమిటి? వాటిని ఏమంటారు? (జాతీయం అంటే ఒక ప్రత్యేక అర్థంలో స్థిరపడిన
            పదబంధం; సామెత అంటే అనుభవసారాన్ని క్లుప్తంగా చెప్పే వాక్యం.)
          </p>
          <TeluguAnswerBox
            question="పై పదబంధాల్లో జాతీయాలు, సామెతలుగా వేరుచేసి రాయండి"
            storageKey="c6-telugu-ch8-page9-idiom-sort"
            quickWords={["జాతీయం", "సామెత"]}
          />

          <p className="font-semibold text-pink-600">
            2. కింది వాటిలోని జాతీయాలను గుర్తించండి. వాటిని ఏ అర్థంలో వాడుతారో తెలుపండి.
          </p>
          <p className="rounded-md bg-amber-50/50 p-3">{IDIOM_WORDS.join(", ")}</p>
          <TeluguAnswerBox
            question="గుర్తించిన జాతీయాలు, వాటి అర్థాలు రాయండి"
            storageKey="c6-telugu-ch8-page9-idiom-meaning"
            quickWords={["జాతీయం", "అర్థం"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">VI. భాషను గురించి తెలుసుకుందాం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">
            1. కింది పదాల్లోని సంయుక్త, ద్విత్వాక్షరాల్లోని ధ్వనులు రాయండి.
          </p>
          <p className="rounded-md bg-amber-50/50 p-3 font-semibold">ఉదా॥ విద్య = వ్, ద్ + య్ + అ</p>
          {CONJUNCT_SOUNDS.map((word, i) => (
            <TeluguAnswerBox
              key={word}
              question={`${String.fromCharCode(3077 + i)}) ${word} = ...........................`}
              storageKey={`c6-telugu-ch8-page9-sound-${i + 1}`}
              quickWords={["్", "అ", "ఆ"]}
            />
          ))}

          <p className="font-semibold text-pink-600">కింది వాక్యాలలో గీత గీసిన పదాలను గమనించండి.</p>
          <ul className="space-y-1 px-2">
            {UNDERLINE_SENTENCES.map((s, i) => (
              <li key={s}>
                {String.fromCharCode(3077 + i)}. {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
