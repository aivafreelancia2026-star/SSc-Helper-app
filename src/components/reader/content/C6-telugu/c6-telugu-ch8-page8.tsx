import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SHORT_ANSWERS = [
  "చెరువులు ఏకాలంలో నిండుగా ఉంటాయి? నిండుగా ఉండడానికి మనం ఏం చేయాలి?",
  "చెరువుల అలుగులు పారినప్పుడు ప్రజల కళ్ళలో వెలుగులు ఎందుకు వస్తాయి?",
  "మీ ఊరి చెరువు కాలుష్యం బారిన పడకుండా ఉండడానికి మీరిచ్చే సలహాలు ఏమిటి?",
  "చెరువుల వలన కలుగు లాభాలను రాయండి.",
];

// Book page 81 (PDF/app P90) — Section II (paragraph-titling exercise +
// a Mission Kakatiya reading passage referenced but not reproduced —
// students answer from the textbook page directly), Section III
// (short-answer + essay), Section IV (creative writing, both optional-
// style prompts).
export function C6TeluguCh8Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          II. ధారాళంగా చదవడం - అర్థం చేసుకొని ప్రతిస్పందించడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <TeluguAnswerBox
            question="1. పాఠంలోని 4, 8, 14, 20 పేరాలు చదివి, వాటికి శీర్షికను పెట్టండి. ఆ పేరాలోని 4, 5 కీలకపదాలు రాయండి."
            storageKey="c6-telugu-ch8-page8-titles"
            quickWords={["చెరువు", "శీర్షిక", "కీలకపదాలు"]}
          />
          <TeluguAnswerBox
            question="2. మిషన్ కాకతీయ, చెరువుల పరిరక్షణ, నీటి ఆదా గురించిన పేరాను (పాఠ్యపుస్తకంలో) చదివి ఐదు ప్రశ్నలు తయారు చేయండి."
            storageKey="c6-telugu-ch8-page8-questions"
            quickWords={["మిషన్ కాకతీయ", "నీటిఆదా", "చెరువు"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III. స్వీయరచన</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">1. కింది ప్రశ్నలకు ఐదు వాక్యాల్లో జవాబులు రాయండి.</p>
          {SHORT_ANSWERS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${String.fromCharCode(3077 + i)}) ${q}`}
              storageKey={`c6-telugu-ch8-page8-short-${i + 1}`}
              quickWords={["చెరువు", "నీరు", "కాలుష్యం", "వర్షం"]}
            />
          ))}
          <p className="font-semibold text-pink-600">2. కింది ప్రశ్నకు పది వాక్యాల్లో జవాబు రాయండి.</p>
          <TeluguAnswerBox
            question="'చెరువులు నిండితే గ్రామాలు సుభిక్షంగా ఉంటాయి' దీనిని సమర్థిస్తూ రాయండి."
            storageKey="c6-telugu-ch8-page8-essay"
            quickWords={["చెరువు", "వ్యవసాయం", "గ్రామం", "సుభిక్షం"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">IV. సృజనాత్మకత / ప్రశంస</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <TeluguAnswerBox
            question="1. చెరువు యొక్క గొప్పతనాన్ని ప్రశంసిస్తూ చిన్న కవిత లేదా పాట రాయండి. (ఐచ్ఛికం)"
            storageKey="c6-telugu-ch8-page8-poem"
            quickWords={["చెరువు", "కవిత", "పాట"]}
          />
          <TeluguAnswerBox
            question="2. పాఠం ఆధారంగా 'చెరువు' మాట్లాడుతున్నట్లుగా ఏకపాత్రాభినయం (మీ మాటల్లో) రాయండి."
            storageKey="c6-telugu-ch8-page8-monologue"
            quickWords={["చెరువు", "నేను", "గ్రామం"]}
          />
        </div>
      </section>
    </div>
  );
}
