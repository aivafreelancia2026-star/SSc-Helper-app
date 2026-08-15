import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "అంబేద్కర్ న్యాయపాండిత్యం గురించి ఈ పేజీ ద్వారా ఏమి తెలుసుకున్నారు?",
  "సమానత్వం, సౌభ్రాతృత్వం అనే విలువలను ఆయన ఎలా ప్రోత్సహించాడు?",
  "అంబేద్కర్ జీవితంలో మీకు ప్రేరణనిచ్చిన విషయం ఏది?",
];

export function C6TeluguCh3Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#765f31] bg-[#f4efe4]">
        <h3 className="bg-[#765f31] px-5 py-2 text-center text-lg font-bold text-white">
          చదవండి - తెలుసుకోండి
        </h3>
        <p className="px-6 py-5 text-lg leading-loose">
          ఈ పేజీ అంబేద్కర్ గారి చదువు, న్యాయపాండిత్యం, సమాజసేవ, ప్రజాస్వామ్య భావనలను
          పరిచయం చేస్తుంది. చదివి ముఖ్యాంశాలను మీ మాటల్లో రాయండి.
        </p>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          ఆలోచించి రాయండి
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch3-page10-ambedkar-${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
