import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SHORT_ANSWERS = [
  "'చెరుపకురా చెరువులను, చెడిపోతావు' దీనిపై మీ అభిప్రాయాన్ని రాయండి?",
  "'అడవులను నాశనం చేసుకుంటపోతే ఇంకా భయపడే కాలం వస్తది' అనడంలో గల ఉద్దేశం ఏమై ఉంటుంది?",
  "'మనం సరిగ్గా బతుకుతలేం - జీవరాసులను బతుకనిస్తలేం' దీనితో మీరు ఏకీభవిస్తారా? విభేదిస్తారా? ఎందుకు?",
  "'వాకిళ్ళు కాంక్రీటు గచ్చులాయె' ఇది ఎటువంటి నష్టాలను కలిగిస్తుందో వివరించండి?",
  "మీ ప్రాంతంలో ప్రకృతిని ఎన్ని విధాలుగా నాశనం చేస్తున్నారో రాయండి.",
];

// Book page 127 (PDF/app P136) — Section III: short answers, then a
// choice of two ten-sentence essay prompts.
export function C6TeluguCh12Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III. స్వీయరచన</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">1. కింది ప్రశ్నలకు అయిదేసి వాక్యాల్లో జవాబులు రాయండి.</p>
          {SHORT_ANSWERS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${String.fromCharCode(3077 + i)}. ${q}`}
              storageKey={`c6-telugu-ch12-page10-short-${i + 1}`}
              quickWords={["చెరువు", "అడవి", "కాంక్రీటు"]}
            />
          ))}

          <p className="font-semibold text-pink-600">2. కింది ప్రశ్నలకు పదేసి వాక్యాల్లో జవాబులు రాయండి.</p>
          <TeluguAnswerBox
            question="1. 'ప్రకృతిని కాపాడితేనే భావితరాలకు భవిష్యత్తు' దీనిని విశ్లేషిస్తూ రాయండి. (లేదా)"
            storageKey="c6-telugu-ch12-page10-essay1"
            quickWords={["ప్రకృతి", "భవిష్యత్తు"]}
          />
          <TeluguAnswerBox
            question="2. మానవులు, పక్షులు, పశువులు ... సుఖంగా జీవించాలంటే ప్రకృతి పట్ల మన ఆచరణ ఎట్లా వుండాలి?"
            storageKey="c6-telugu-ch12-page10-essay2"
            quickWords={["ఆచరణ", "ప్రకృతి"]}
          />
        </div>
      </section>
    </div>
  );
}
