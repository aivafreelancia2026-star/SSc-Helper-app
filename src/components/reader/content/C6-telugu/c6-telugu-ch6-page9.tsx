import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SENTENCE_SETS = [
  {
    label: "అ.",
    sentence: "అరుణాస్పదమనే పురంలో ప్రవరుడు నివసించేవాడు. ఆ పట్టణం చాలా అందమైనది. ఆ నగరంలో ఆకాశాన్ని తాకే మేడలున్నాయి.",
    hint: "పురం, పట్టణం, నగరం — ఒకే అర్థం వచ్చే పదాలు",
  },
  {
    label: "ఆ.",
    sentence: "సకాలంలో వర్షాలు పడితే ధరణి పులకరిస్తుంది. అప్పుడు రైతు పుడమిని దున్ని విత్తనాలు చల్లుతాడు. దాంతో పచ్చని పంటలతోటి అవని శోభిస్తుంది.",
    hint: "ధరణి, పుడమి, అవని — ఒకే అర్థం వచ్చే పదాలు",
  },
  {
    label: "ఇ.",
    sentence: "కార్తీక్ ఇంటిమీద కోతి కూర్చున్నది. ఆ కపి చేతిలో కొబ్బరి చిప్ప ఉన్నది. అది చూసి మరో వానరం ఉరికొచ్చింది.",
    hint: "కోతి, కపి, వానరం — ఒకే అర్థం వచ్చే పదాలు",
  },
  {
    label: "ఈ.",
    sentence: "మా గ్రామంలోని గుడి చాలా పెద్దది. నేను ప్రతినిత్యం ఆ కోవెలకు పోతాను. ఆ దేవాలయంలో ఎంతో ప్రశాంతత లభిస్తుంది.",
    hint: "గుడి, కోవెల, దేవాలయం — ఒకే అర్థం వచ్చే పదాలు",
  },
];

const CLASSIFY_WORDS = [
  "బాలుడు", "పుట్ట", "బాలురు", "ఆమె", "పర్వతం",
  "ఆహ్", "సీత", "అమ్మో", "డబ్బు", "ఆటలు",
  "అతడు", "శభాష్", "మహిళలు", "పత్రిక", "సుధాకర్",
  "రచయిత్రి", "చెట్టు", "చంద్రుడు", "ఉంగరం", "నటి",
  "అట్లని", "రచనలు", "బలరాం", "బల్ల", "ఆకాశం",
];

const CLASSIFY_CATEGORIES = [
  { label: "అ. పుంలింగ పదాలు (Masculine words)", key: "masc", quickWords: ["బాలుడు", "అతడు", "సుధాకర్", "చంద్రుడు", "బలరాం"] },
  { label: "ఆ. స్త్రీలింగ పదాలు (Feminine words)", key: "fem", quickWords: ["ఆమె", "సీత", "మహిళలు", "రచయిత్రి", "నటి"] },
  { label: "ఇ. నపుంసకలింగ పదాలు (Neuter words)", key: "neu", quickWords: ["పుట్ట", "పర్వతం", "డబ్బు", "చెట్టు", "బల్ల"] },
  { label: "ఈ. ఏకవచనం (Singular words)", key: "sg", quickWords: ["బాలుడు", "ఆమె", "సీత", "అతడు", "నటి"] },
  { label: "ఉ. బహువచనం (Plural words)", key: "pl", quickWords: ["బాలురు", "మహిళలు", "ఆటలు", "రచనలు"] },
  { label: "ఊ. అవ్యయం (Indeclinable words)", key: "avy", quickWords: ["ఆహ్", "అమ్మో", "శభాష్", "అట్లని"] },
];

// Book pages 61-62 (PDF P70-71): continuation of "పోతన బాల్యం" (V. పదజాల
// వినియోగం Q4 + VI. భాషను గురించి తెలుసుకుందాం Q1). This 25-word gender/
// number/avyayam grid mixes several genuinely ambiguous items (e.g. some
// words could plausibly sit in more than one bucket depending on usage),
// so — same rule as everywhere else in this app — it stays an open
// free-text sort per category rather than a forced exact-match grading;
// the textbook's own six buckets are given as headings, and the reveal
// toggle has nothing to show here (that's expected, not a bug).
export function C6TeluguCh6Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          V. పదజాల వినియోగం (కొనసాగింపు)
        </h3>
        <div className="space-y-5 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-pink-600">
            4. కింది వాక్యాలను చదవండి. ప్రతి వాక్యంలోనూ ఒక పదానికి అదే అర్థం వచ్చే మరికొన్ని పదాలున్నాయి. వాటి కింద గీత గీయండి.
          </p>
          {SENTENCE_SETS.map((set) => (
            <div key={set.label} className="space-y-2 rounded-md bg-amber-50/60 p-3">
              <p className="font-semibold">
                <span className="text-[#765f31]">{set.label}</span> {set.sentence}
              </p>
              <TeluguAnswerBox
                question={`ఒకే అర్థం వచ్చే పదాలను రాయండి: (${set.hint})`}
                storageKey={`c6-telugu-ch6-page9-q4-${set.label}`}
                quickWords={set.hint.split("—")[0].split(",").map((w) => w.trim())}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          VI. భాషను గురించి తెలుసుకుందాం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-pink-600">
            1. కింది పట్టికలోని పదాలను చదివి, పుంలింగ, స్త్రీలింగ, నపుంసకలింగ పదాలను, ఏకవచన-బహువచనాలను, అవ్యయాలను గుర్తించండి.
          </p>

          <div className="overflow-x-auto rounded-md border border-[#8b7a58]/60">
            <table className="w-full border-collapse text-center">
              <tbody>
                {Array.from({ length: 5 }).map((_, row) => (
                  <tr key={row} className={row % 2 === 0 ? "bg-amber-50/50" : "bg-white"}>
                    {CLASSIFY_WORDS.slice(row * 5, row * 5 + 5).map((word) => (
                      <td key={word} className="border border-[#8b7a58]/30 px-3 py-2 font-semibold">
                        {word}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs italic text-foreground/50">
            ఈ పదాలను ఒకటి కంటే ఎక్కువ గుంపులలో ఉంచవచ్చు (ఉదా: ఏకవచనం + పుంలింగం రెండూ కావచ్చు) — మీకు తోచిన విధంగా వర్గీకరించండి.
          </p>

          {CLASSIFY_CATEGORIES.map((cat) => (
            <TeluguAnswerBox
              key={cat.key}
              question={cat.label}
              storageKey={`c6-telugu-ch6-page9-classify-${cat.key}`}
              quickWords={cat.quickWords}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
