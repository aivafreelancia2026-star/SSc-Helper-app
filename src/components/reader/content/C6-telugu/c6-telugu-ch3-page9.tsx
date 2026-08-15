import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const QUESTIONS = [
  "డా॥ బి. ఆర్. అంబేద్కర్ బాల్యం గురించి మీకు తెలిసింది రాయండి.",
  "అంబేద్కర్ ఏయే రంగాలలో కృషి చేశాడు?",
  "ఆయన సమాజానికి చేసిన సేవను మీ మాటల్లో రాయండి.",
  "భారతరత్న అంబేద్కర్ నుండి మనం నేర్చుకోవలసిన గుణాలు ఏవి?",
];

export function C6TeluguCh3Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#765f31] bg-[#f4efe4]">
        <h3 className="bg-[#765f31] px-5 py-2 text-center text-lg font-bold text-white">
          చదవండి - తెలుసుకోండి
        </h3>
        <p className="px-6 py-5 text-lg leading-loose">
          ఈ పేజీలో డా॥ బి. ఆర్. అంబేద్కర్ జీవిత విశేషాలు ఉన్నాయి. ఆయన విద్య, సామాజిక
          న్యాయం, సమానత్వం కోసం చేసిన కృషిని చదివి తెలుసుకోండి.
        </p>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          చదివి సమాధానం రాయండి
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {QUESTIONS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch3-page9-ambedkar-${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
