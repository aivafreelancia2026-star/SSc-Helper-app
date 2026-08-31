import { FigureNote } from "@/components/reader/figure-note";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const MEANING_ITEMS = [
  { sentence: "మా అన్నయ్య బాగా చదివి సర్కారు కొలువు సంపాదించాడు.", underline: "కొలువు" },
  { sentence: "పెందలాడే లేచి వ్యాయామం చేస్తే ఆరోగ్యం బాగుంటుంది.", underline: "పెందలాడే" },
  { sentence: "మా ఊరు పక్కనే ఏరు పారుతున్నది.", underline: "ఏరు" },
  { sentence: "నీ ముఖం ఏంటి అట్లా వెలవెలబోయింది? ఏదైనా బాధ ఉన్నదా?", underline: "వెలవెలబోయింది" },
];

const PRAKRUTI_VIKRUTI = [
  { label: "అ.", word: "పసులు" },
  { label: "ఆ.", word: "అంబ" },
  { label: "ఇ.", word: "అటవి" },
  { label: "ఈ.", word: "గాసం" },
];
const PRAKRUTI_OPTIONS = ["క. అడవి", "ఖ. గ్రాసం", "గ. పశువులు", "ఘ. అమ్మ"];

// Book page 115 (PDF/app P124) — Section IV (creative writing, two
// options) and Section V (word meanings, prakruti-vikruti matching).
export function C6TeluguCh11Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">IV. సృజనాత్మకత / ప్రశంస</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <TeluguAnswerBox
            question="1. పాఠం ఆధారంగా పిల్లగాని జీవితాన్ని 'ఆత్మకథ'గా రాయండి. (ఐచ్ఛికం)"
            storageKey="c6-telugu-ch11-page8-autobiography"
            quickWords={["ఆత్మకథ", "జీవితం", "నేను"]}
          />
          <FigureNote emoji="🎒🧑‍🎓🐄👦" caption="బడికి వెళ్తున్న పిల్లవాడు, పశువులు కాస్తున్న పిల్లవాడు మాట్లాడుకుంటున్న దృశ్యం" />
          <TeluguAnswerBox
            question="2. పై బొమ్మను చూడండి. పిల్లలు ఏం మాట్లాడుకుంటున్నారో ఊహించి సంభాషణలు రాయండి."
            storageKey="c6-telugu-ch11-page8-dialogue"
            quickWords={["బడి", "పశువులు", "సంభాషణ"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">V. పదజాల వినియోగం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">1. కింది వాక్యాల్లోని గీత గీసిన పదాలకు అర్థాలను రాయండి.</p>
          {MEANING_ITEMS.map((item, i) => (
            <TeluguAnswerBox
              key={item.sentence}
              question={`${String.fromCharCode(3077 + i)}. ${item.sentence} (గీత: ${item.underline})`}
              storageKey={`c6-telugu-ch11-page8-meaning-${i + 1}`}
              quickWords={[item.underline]}
            />
          ))}

          <p className="font-semibold text-pink-600">2. కింది పట్టికలోని ప్రకృతి - వికృతి పదాలను జతపరుచండి.</p>
          <div className="overflow-x-auto rounded-md border border-[#8b7a58]/60">
            <table className="w-full border-collapse text-center">
              <tbody>
                {PRAKRUTI_VIKRUTI.map((item, i) => (
                  <tr key={item.label} className={i % 2 === 0 ? "bg-amber-50/50" : "bg-white"}>
                    <td className="border border-[#8b7a58]/30 px-3 py-2 font-semibold">{item.label} {item.word}</td>
                    <td className="border border-[#8b7a58]/30 px-3 py-2 text-foreground/40">( )</td>
                    <td className="border border-[#8b7a58]/30 px-3 py-2 font-semibold">{PRAKRUTI_OPTIONS[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TeluguAnswerBox
            question="జతపరిచిన జవాబులను ఇక్కడ రాయండి"
            storageKey="c6-telugu-ch11-page8-prakruti"
            quickWords={["అడవి", "గ్రాసం", "పశువులు", "అమ్మ"]}
          />
        </div>
      </section>
    </div>
  );
}
