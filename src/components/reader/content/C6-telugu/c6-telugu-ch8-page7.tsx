import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const DISCUSS = [
  "చెరువులు కలుషితం కాకుండా ఉండాలంటే మనమేం చేయాలి?",
  "'చెరువులు తరతరాల చరిత్రకు మౌనసాక్షి' దీనిపై మీ అభిప్రాయం చెప్పండి.",
];

const TOPICS = [
  "చెరువులే జీవనాధారం.",
  "చెరువులను రక్షించుకోవడం మన బాధ్యత.",
  "చెరువులు మన సంస్కృతి కేంద్రాలు.",
];

// Book page 80 (PDF/app P89) — narration closes (the lake says it lives
// only for people, whatever the era), a final discussion box, then
// exercises begin: Section I, an elocution-competition prompt with three
// topic choices.
export function C6TeluguCh8Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <p className="px-5 py-4">
          కాలం ఏదైనా, తానెప్పుడూ ప్రజల కోసమే జీవిస్తున్నానని చెరువు తన కథను ముగిస్తుంది.
        </p>
      </section>

      <section className="rounded-sm border-2 border-amber-400 bg-amber-50/50">
        <h3 className="bg-amber-500 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {DISCUSS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${i + 1}. ${q}`}
              storageKey={`c6-telugu-ch8-page7-discuss-${i + 1}`}
              quickWords={["చెరువు", "కాలుష్యం", "చరిత్ర", "సంరక్షణ"]}
            />
          ))}
        </div>
      </section>

      <h3 className="inline-block rounded-full bg-pink-100 px-6 py-2 text-lg font-bold text-pink-700">
        ఇవి చేయండి
      </h3>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          I. వినండి, అర్థంచేసుకొని, ఆలోచించి మాట్లాడడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">
            1. బడిలో ఉపన్యాసపోటీ నిర్వహిస్తున్నారు. మీరు కింది అంశాల్లో దేనిగురించి మాట్లాడాలనుకుంటున్నారో
            దాని గురించి చెప్పండి.
          </p>
          <ul className="space-y-1 px-2">
            {TOPICS.map((topic, i) => (
              <li key={topic}>
                {String.fromCharCode(3077 + i)}) {topic}
              </li>
            ))}
          </ul>
          <TeluguAnswerBox
            question="మీరు ఎంచుకున్న అంశంపై మీ ఉపన్యాసాన్ని ఇక్కడ రాయండి"
            storageKey="c6-telugu-ch8-page7-speech"
            quickWords={["చెరువు", "జీవనాధారం", "సంస్కృతి", "బాధ్యత"]}
          />
        </div>
      </section>
    </div>
  );
}
