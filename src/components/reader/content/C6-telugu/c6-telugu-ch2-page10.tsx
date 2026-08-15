import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const LETTER_MATCH = [
  "కృష్ణపడి చదివితే ఫలితం తప్పక ఉంటుంది.",
  "బలం, కలం, గాలి, జలం, ఢోలు, తక్కు, కాలు, డబ్బు, గళం వంటి మాటల్లో సరళాలతో మొదలైన మాటలను గుర్తించండి.",
  "యమున, కారణం, పాలు, వంకర, రేళ, కల వంటి మాటల్లో అంతస్థాలను గుర్తించండి.",
  "భాష మనిషికి సహజమైన శక్తి.",
];

const PROJECTS = [
  "పొడుపులు, గ్రంథాలయం నుండి పంచతంత్రం / అక్బర్ బీర్బల్ కథలు / తెనాలి రామకృష్ణ కథలు / పరమానందయ్య శిష్యుల కథలు మొదలైన పుస్తకాలను సేకరించి అందులోంచి మీకు నచ్చిన కథను రాయండి.",
];

export function C6TeluguCh2Page10() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          భాషాభ్యాసం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {LETTER_MATCH.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch2-page10-language-${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          ప్రాజెక్టు పని
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {PROJECTS.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch2-page10-project-${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
