import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SELF_WRITING = [
  "మనం ఇతరులకు మేలు చేయాలి. ఎందుకు?",
  "“మంచివారితో స్నేహం చేస్తే మనకూ మంచిగుణాలు అలవడుతాయి.” సమర్థిస్తూ రాయండి.",
  "“గొప్పలు చెప్పుకోవడం కూడా తప్పే” అని తెలుసుకున్నారుకదా. దీనిగురించి మీ అభిప్రాయం తెలుపండి.",
  "అనసర వాదాలకు ఎందుకు పోవద్దు?",
];

const WORDS = ["హితం", "హర్షించుట", "సంతోషం", "వర్తనం", "ధూర్తతి", "మేలు", "ప్రజలసేవ"];

export function C6TeluguCh5Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">III. స్వీయరచన</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-pink-600">1. కింది ప్రశ్నలకు ఐదేసి వాక్యాల్లో జవాబులు రాయండి.</p>
          {SELF_WRITING.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${String.fromCharCode(3077 + index)}. ${question}`}
              storageKey={`c6-telugu-ch5-page9-writing-${index + 1}`}
              quickWords={["మేలు", "మంచివారు", "స్నేహం", "గొప్పలు", "వాదాలు", "అభిప్రాయం"]}
            />
          ))}

          <p className="text-base font-bold text-pink-600">2. కింది ప్రశ్నకు పది వాక్యాల్లో జవాబు రాయండి.</p>
          <TeluguAnswerBox
            question="శతక కవులు వల్ల సమాజానికి ఎట్లాంటి మేలు జరుగుతుంది?"
            storageKey="c6-telugu-ch5-page9-long-answer"
            quickWords={["శతక కవులు", "సమాజం", "నీతి", "విలువలు", "మంచి ప్రవర్తన"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          IV. సృజనాత్మకత / ప్రశంస
        </h3>
        <p className="px-6 py-5 text-lg leading-loose">
          శతక పద్యాల ఆధారంగా మనం చేయకూడనివి, చేయవలసినవి పట్టిక తయారుచేసి ప్రదర్శించండి.
        </p>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">V. పదజాల వినియోగం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-pink-600">1. కింది పదాలతో సొంతవాక్యాలను రాయండి.</p>
          {WORDS.map((word, index) => (
            <TeluguAnswerBox
              key={word}
              question={`${String.fromCharCode(3077 + index)}. ${word}`}
              storageKey={`c6-telugu-ch5-page9-word-${index + 1}`}
              quickWords={["నేను", "మనం", "చేయాలి", "మంచి", "వాక్యం"]}
            />
          ))}
          <TeluguAnswerBox
            question="2. జట్టుపని: పద్యాల్లోని పదాల్లో ఏఏ పదాలు పుస్తకం చివరి అకారాది పట్టికలో ఉన్నాయో చూసి వాటికింద గీత గీయండి. అర్థాలు రాయండి."
            storageKey="c6-telugu-ch5-page9-dictionary"
            quickWords={["అకారాది", "పదాలు", "అర్థాలు", "పట్టిక", "గీత"]}
          />
        </div>
      </section>
    </div>
  );
}
