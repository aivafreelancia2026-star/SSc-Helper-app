import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SYNONYMS = ["లక్ష్మి", "అన్నుడు", "బలరాముని", "ప్రతిరోజు"];
const MATCHING = [
  "భోజనం - బోనం / నిద్ర / పుస్తకం / గంగ",
  "నిదుర - బోనం / నిద్ర / పుస్తకం / గంగ",
  "పొత్తం - బోనం / నిద్ర / పుస్తకం / గంగ",
];
const SENTENCES = ["అనుజుడు", "గోంకుజంకులు", "మేటి", "అక్కజ", "వేగ", "అసాధ్యుడు"];

export function C6TeluguCh6Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          III. స్వీయరచన / IV. సృజనాత్మకత
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <TeluguAnswerBox
            question="పోతన బాల్యాన్ని మీ సొంతమాటల్లో రాయండి."
            storageKey="c6-telugu-ch6-page8-writing"
            quickWords={["పోతన", "బాల్యం", "తిప్పన", "భక్తి", "ఆటలు"]}
          />
          <TeluguAnswerBox
            question="పోతన తన బాల్యంలో ఆడుకున్న ఆటలు తెలుసుకున్నారు కదా! అట్లాగే మీరు ఆడుకునే ఆటలు ఏమి? ఆటలు ఎందుకోసం ఆడాలో వివరిస్తూ వ్యాసం రాయండి."
            storageKey="c6-telugu-ch6-page8-essay"
            quickWords={["ఆటలు", "ఆరోగ్యం", "స్నేహం", "ఆనందం", "వ్యాసం"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">V. పదజాల వినియోగం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-pink-600">1. గీత గీసిన పదాలకు అదే అర్థం వచ్చే పదాలను పాఠంలో వెతికి రాయండి.</p>
          {SYNONYMS.map((word, index) => (
            <TeluguAnswerBox key={word} question={`${String.fromCharCode(3077 + index)}. ${word}`} storageKey={`c6-telugu-ch6-page8-syn-${index + 1}`} quickWords={["పదం", "అర్థం", "పాఠం", "వెతికి", "రాయండి"]} />
          ))}
          <p className="text-base font-bold text-pink-600">2. పట్టికలోని ప్రకృతి - వికృతి పదాలను జతపరచండి.</p>
          {MATCHING.map((item, index) => (
            <TeluguAnswerBox key={item} question={`${String.fromCharCode(3077 + index)}. ${item}`} storageKey={`c6-telugu-ch6-page8-match-${index + 1}`} quickWords={["భోజనం", "బోనం", "నిదుర", "నిద్ర", "పొత్తం", "పుస్తకం"]} />
          ))}
          <p className="text-base font-bold text-pink-600">3. కింది పదాలతో సొంతవాక్యాలు రాయండి.</p>
          {SENTENCES.map((word, index) => (
            <TeluguAnswerBox key={word} question={`${String.fromCharCode(3077 + index)}. ${word}`} storageKey={`c6-telugu-ch6-page8-sentence-${index + 1}`} quickWords={["నేను", "మనం", "పోతన", "వాక్యం", "చూశాను"]} />
          ))}
        </div>
      </section>
    </div>
  );
}
