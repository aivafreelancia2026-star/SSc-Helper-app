import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const SPLIT_WORDS = ["నిజాశ్రమంబు", "పోయితివయ్యా", "నిజమూహింప", "వలయమందు", "ముఖారవిందం"];
const COMBINE_WORDS = ["నిన్ను + అడుగ", "ఇడుమకు + ఓర్చి", "ఇప్పుడు + ఏమిటి", "ఎవ్వరు + ఏమనిన", "నిమిషము + ఏని"];

const SAMASA_ITEMS = [
  { sentence: "మనిషి జీవితంలో వెలుగునీడల వలె కష్టసుఖాలు వచ్చిపోతుంటాయి.", word: "వెలుగునీడల" },
  { sentence: "భూమ్యాకాశాలు ఎప్పుడూ కలువవు.", word: "భూమ్యాకాశాలు" },
  { sentence: "ధర్మాధర్మాలు ఆలోచించి పనిచేయాలి.", word: "ధర్మాధర్మాలు" },
  { sentence: "శాంత్యహింసలు భారతీయ ధర్మానికి మూలస్తంభాలు.", word: "శాంత్యహింసలు" },
  { sentence: "సూర్యచంద్రులు లోకానికి వెలుగునిస్తారు.", word: "సూర్యచంద్రులు" },
  { sentence: "జీవితంలో పైకి రావాలంటే నీతినిజాయతీలు చాలా ముఖ్యం.", word: "నీతినిజాయతీలు" },
  { sentence: "జాతరకు చిన్నపెద్దలు అందరూ తరలిపోతారు.", word: "చిన్నపెద్దలు" },
];

// Book page 116 (PDF/app P125) — Section VI: splitting/combining words,
// and identifying dvandva-samasa words with విగ్రహవాక్యాలు, then the
// chapter's project work.
export function C6TeluguCh11Page9() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">VI. భాషను గురించి తెలుసుకుందాం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">1. కింది పదాలను విడదీసి రాయండి.</p>
          <p className="rounded-md bg-amber-50/50 p-3 text-xs">ఉదా: నాయనమ్మ = నాయన + అమ్మ</p>
          {SPLIT_WORDS.map((word, i) => (
            <TeluguAnswerBox
              key={word}
              question={`${String.fromCharCode(3077 + i)}. ${word} = .................... + ....................`}
              storageKey={`c6-telugu-ch11-page9-split-${i + 1}`}
              quickWords={[word]}
            />
          ))}

          <p className="font-semibold text-pink-600">2. కింద విడదీసిన పదాలను కలిపి రాయండి.</p>
          {COMBINE_WORDS.map((item, i) => (
            <TeluguAnswerBox
              key={item}
              question={`${String.fromCharCode(3077 + i)}. ${item} =`}
              storageKey={`c6-telugu-ch11-page9-combine-${i + 1}`}
              quickWords={["కలిపి"]}
            />
          ))}

          <p className="font-semibold text-pink-600">3. కింది గీతగీసిన పదాలకు విగ్రహ వాక్యాలను రాసి, సమాసము పేరు రాయండి.</p>
          {SAMASA_ITEMS.map((item, i) => (
            <TeluguAnswerBox
              key={item.word}
              question={`${String.fromCharCode(3077 + i)}. ${item.sentence} (గీత: ${item.word})`}
              storageKey={`c6-telugu-ch11-page9-samasa-${i + 1}`}
              quickWords={["ద్వంద్వసమాసం", "విగ్రహవాక్యం"]}
            />
          ))}
        </div>
      </section>

      <section className="rounded-sm border-2 border-[#765f31] bg-[#f7f1e3]">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">ప్రాజెక్టు పని</h3>
        <div className="space-y-3 px-5 pb-5 pt-4">
          <p>
            మీ ప్రాంతంలో బడికిపోకుండా ఉండే పిల్లల్ని కలవండి. వారెందుకు బడికి రావడంలేదో, బడిగురించి,
            చదువుగురించి వారేమనుకుంటున్నారో వివరాలు సేకరించి నివేదిక రాయండి.
          </p>
          <TeluguAnswerBox
            question="మీ నివేదికను ఇక్కడ రాయండి"
            storageKey="c6-telugu-ch11-page9-project"
            quickWords={["బడి", "పిల్లలు", "నివేదిక"]}
          />
        </div>
      </section>
    </div>
  );
}
