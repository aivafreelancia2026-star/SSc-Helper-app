import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const THINK_AND_SAY = [
  "ప్రాచీన వస్తువులు భద్రపరచడం వల్ల కలిగే ఉపయోగాలేమిటి?",
  "మధుర జ్ఞాపకాలను డైరీలో ఎందుకు రాస్తారు?",
  "యాత్ర ముగించుకొని ఇంటికి వస్తుంటే శైలజకు ఎందుకు బాధ కలిగియుండవచ్చు?",
];

const DISCUSSION = [
  "ఇంత పెద్ద నిర్మాణం ఎట్లా కట్టారో! అని ఆశ్చర్యం వేసింది.",
  "తోలి కందకాలు ఇక్కడ శిలపై చెక్కబడి ఉన్నాయి.",
  "ముఖ్యంగా మేము మరికొన్ని రాజులకాలంలో ఉన్నము! అని అనిపించింది.",
  "ఆకట్టుకున్న గొప్ప బాల్యాన్ని చూసినం.",
  "అద్భుతమైన వాస్తుకలా నైపుణ్యంతో దీనిని కట్టారు.",
];

export function C6TeluguCh4Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-cyan-500 bg-cyan-50/40">
        <h3 className="inline-block bg-cyan-600 px-5 py-2 text-lg font-bold text-white">ఆలోచించండి - చెప్పండి</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          {THINK_AND_SAY.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${index + 1}. ${question}`}
              storageKey={`c6-telugu-ch4-page8-think-${index + 1}`}
              quickWords={["ప్రాచీన", "వస్తువులు", "భద్రపరచడం", "డైరీ", "యాత్ర", "శైలజ"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          I. విని, అర్థంచేసుకొని, ఆలోచించి మాట్లాడడం
        </h3>
        <p className="px-5 pt-4 text-lg leading-loose">
          హైదరాబాద్, వరంగల్ వంటి దర్శనీయ స్థలాల గురించి తెలుసుకున్నాక, మరి మీ ప్రాంతంలో ఉన్న దర్శనీయ స్థలాల గురించి
          చెప్పండి.
        </p>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          II. ధారాళంగా చదువడం - అర్థం చేసుకొని ప్రతిస్పందించడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-base font-bold text-pink-600">
            1. కింది వాక్యాలు చదివి వాటికి సంబంధించిన స్థలాల పేర్లు పాఠంలో వెతికి రాయండి.
          </p>
          {DISCUSSION.map((question, index) => (
            <TeluguAnswerBox
              key={question}
              question={`${String.fromCharCode(3077 + index)}. ${question}`}
              storageKey={`c6-telugu-ch4-page8-place-${index + 1}`}
              quickWords={["హైదరాబాద్", "వరంగల్", "నాగార్జునసాగర్", "గోల్కొండ", "చార్మినార్", "పిల్లలమర్రి"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
