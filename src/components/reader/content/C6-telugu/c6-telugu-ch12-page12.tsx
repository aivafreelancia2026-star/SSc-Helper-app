import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const VIBHAKTI_BLANKS = [
  "రాజు సేనల ............ వచ్చాడు.",
  "దొంగతనం చేయడం ............ పేదవానిగా ఉండటం మేలు.",
  "వృద్ధుల ............ ఆదరించాలి.",
  "దొంగల ............ పోలీసులు గాలిస్తున్నారు.",
];

const SAMASA_ITEMS = ["కృష్ణార్జునులు", "శివకేశవులు", "నిరాశానిస్పృహలు", "భయాందోళనలు", "న్యాయాన్యాయాలు"];
const SPLIT_WORDS = ["నీవెక్కడ", "లేకుంటె", "మరేమి", "రామాలయం"];
const COMBINE_WORDS = ["మేన + అత్త", "మనసు + ఐన", "ఏమి + అంటివి", "దేవ + ఇంద్రుడు"];

// Book page 129 (PDF/app P138) — Section VI grammar: vibhakti fill-
// blanks, dvandva-samasam identification, and word splitting/combining.
export function C6TeluguCh12Page12() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">VI. భాషను గురించి తెలుసుకుందాం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">1. కింది ఖాళీలను విభక్తులతో పూరించండి. విభక్తుల పేర్లు రాయండి.</p>
          {VIBHAKTI_BLANKS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${String.fromCharCode(3077 + i)}. ${q} ( )`}
              storageKey={`c6-telugu-ch12-page12-vibhakti-${i + 1}`}
              quickWords={["తో", "కంటే", "ని", "కోసం"]}
            />
          ))}

          <p className="font-semibold text-pink-600">2. కింది పదాలకు విగ్రహవాక్యాలు రాసి, సమాసం పేరు రాయండి.</p>
          {SAMASA_ITEMS.map((word, i) => (
            <TeluguAnswerBox
              key={word}
              question={`${String.fromCharCode(3077 + i)}. ${word} =`}
              storageKey={`c6-telugu-ch12-page12-samasa-${i + 1}`}
              quickWords={["ద్వంద్వసమాసం"]}
            />
          ))}

          <p className="font-semibold text-pink-600">3. కింది పదాలను విడదీసి రాయండి.</p>
          {SPLIT_WORDS.map((word, i) => (
            <TeluguAnswerBox
              key={word}
              question={`${String.fromCharCode(3077 + i)}) ${word} = .................... + ....................`}
              storageKey={`c6-telugu-ch12-page12-split-${i + 1}`}
              quickWords={[word]}
            />
          ))}

          <p className="font-semibold text-pink-600">4. కింది పదాలను కలిపి రాయండి.</p>
          {COMBINE_WORDS.map((item, i) => (
            <TeluguAnswerBox
              key={item}
              question={`${String.fromCharCode(3077 + i)}) ${item} =`}
              storageKey={`c6-telugu-ch12-page12-combine-${i + 1}`}
              quickWords={["కలిపి"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
