import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const LETTER_QUESTIONS = [
  "లేఖను ఎవరు, ఎక్కడినుంచి రాశారు?",
  "రైతులు పంటలకు దిగజారడానికి ముఖ్య కారణం ఏమిటి?",
  "చెరువును ఎందుకు సరైన వేశారు?",
  "పర్యావరణ పరిరక్షణ కోసం మనమేం చేయాలి?",
];

const CREATIVE_QUESTIONS = [
  "ఉత్తరాల ద్వారా కాకుండా నేటికాలంలో సమాచారాన్ని పంపడానికి వేటిని ఉపయోగిస్తున్నారు?",
  "యాత్రలకు వెళ్ళేటప్పుడు ఏఏ జాగ్రత్తలు పాటించాలి?",
  "పురాతన కట్టడాలు, నగరాలు, దేవాలయాలు మొదలైనవాటిని చూడటానికి పోయినప్పుడు మనం ఎలా ప్రవర్తించాలి? ఎందుకు?",
  "శైలజకు యాత్ర ఇంకొన్ని రోజులుంటే బాగుండు అని ఎందుకు అనిపించింది?",
  "‘విజ్ఞానయాత్రలు వల్ల విద్యార్థుల్లో విజ్ఞానం పెరుగుతుంది’ దీన్ని సమర్థిస్తూ రాయండి.",
];

export function C6TeluguCh4Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          II. ధారాళంగా చదువడం - అర్థం చేసుకొని ప్రతిస్పందించడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-pink-600">2. కింది లేఖను చదివి ఇచ్చిన ప్రశ్నలకు జవాబులు రాయండి.</p>
          {LETTER_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${String.fromCharCode(3077 + index)}. ${question}`}
              storageKey={`c6-telugu-ch4-page9-letter-${index + 1}`}
              quickWords={["మందమర్రి", "లేఖ", "రైతులు", "చెరువు", "పర్యావరణం", "పరిరక్షణ"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III. స్వీయరచన</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-pink-600">1. కింది ప్రశ్నలకు ఐదేసి వాక్యాల్లో జవాబులు రాయండి.</p>
          {CREATIVE_QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${String.fromCharCode(3077 + index)}. ${question}`}
              storageKey={`c6-telugu-ch4-page9-creative-${index + 1}`}
              quickWords={["ఉత్తరాలు", "సమాచారం", "యాత్ర", "జాగ్రత్తలు", "పురాతన కట్టడాలు", "విజ్ఞానం"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
