import { ReadingTaskChecklist } from "@/components/reader/reading-task-checklist";
import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SELF_WRITING_QUESTIONS = [
  "ఎలుక, తాబేలు, కాకి మంచి మిత్రులని ఎట్లా చెప్పగలరు? వివరించండి.",
  "ఈ కథద్వారా మీరు గ్రహించిన మంచి విషయాలు ఏవి?",
  "సాధారణంగా పిల్లలు ఎట్లాంటి అపాయాలు / ప్రమాదాలు ఎదుర్కొంటారు? ఇందుకోసం ఎటువంటి జాగ్రత్తలు తీసుకోవాలి?",
  "ఈ కథకు ఇంకెవరు పెట్టవచ్చు? ఎందుకు?",
];

const CREATIVE_TASKS = [
  "జంతువులను, పక్షులను పాత్రలుగా ఉపయోగించి సొంతంగా ఒక కథ రాయండి.",
  "కథలో జింక మనోభావాల్లో మాట్లాడింది కదా! ఇట్లాగే అడవిలోని జంతువులు మనలాగే మాట్లాడితే మన గురించి అవి ఏం మాట్లాడుకుంటాయో ఊహించి రాయండి.",
];

const SENTENCE_QUESTIONS = [
  "కృష్ణచేలురు చెరువు గొప్పది.",
  "తామరలు కొలనులో పూస్తాయి.",
  "ఎలుక కన్నుల్లో నివసిస్తుంది.",
  "మహావిష్ణువు విస్తే అవతారాలలో కూర్మ అవతారం ఒకటి.",
  "నిప్పుతో చెలగాటం అపాయకరం.",
];

export function C6TeluguCh2Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III. స్వీయరచన</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-lg font-bold leading-loose text-pink-600">
            కింది ప్రశ్నలకు ఐదేసి వాక్యాల్లో జవాబులు రాయండి.
          </p>
          {SELF_WRITING_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${["అ", "ఆ", "ఇ", "ఈ"][index]}. ${question}`}
              storageKey={`c6-telugu-ch2-page7-self-${index + 1}`}
            />
          ))}

          <p className="pt-4 text-lg font-bold leading-loose text-pink-600">
            కింది ప్రశ్నకు పది వాక్యాల్లో జవాబు రాయండి.
          </p>
          <TeluguAnswerBox
            question="కథను క్లుప్తంగా సొంతమాటల్లో రాయండి."
            storageKey="c6-telugu-ch2-page7-story-summary"
          />
        </div>
      </section>

      <ReadingTaskChecklist
        title="IV. సృజనాత్మకత / ప్రశంస"
        tasks={CREATIVE_TASKS}
        storageKey="c6-telugu-ch2-page7-creative"
      />

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">V. పదజాల వినియోగం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-lg font-bold leading-loose text-pink-600">
            కింది గీత గీసిన పదాలకు సమానమైన అర్థంతో ఉన్న పదాలను పాఠం ఆధారంగా రాయండి.
          </p>
          {SENTENCE_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${["అ", "ఆ", "ఇ", "ఈ", "ఉ"][index]}. ${question}`}
              storageKey={`c6-telugu-ch2-page7-vocab-${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
