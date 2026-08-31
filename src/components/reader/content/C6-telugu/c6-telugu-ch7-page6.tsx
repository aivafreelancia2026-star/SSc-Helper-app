import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const MEANING_ITEMS = [
  "త్వరగా సేతువు నిర్మాణం కావాలి.",
  "తన ఒంటికంటిన ఇసుకను రాలుస్తున్నది.",
  "పలు విధాల పొగడి.",
  "భక్తితో గడ్డిపోచంత పనిచేసినా అది కొండతో సమానం.",
];

const MCQ1 = {
  verse:
    "ఉపకారికి ఉపకారము విపరీతము కాదు సేయ వివరింపంగా | నపకారికి ఉపకారము నెరపెన్నిక చేయువాడె నేర్పరి సుమతీ!",
  questions: [
    { q: "అపకారి", options: "క) కీడు చేసేవాడు   ఖ) మేలు చేసేవాడు   గ) సాహసం చేసేవాడు   ఘ) ఏదీకాదు" },
    { q: "పద్యం ఎవరి గురించి తెలియపరుస్తున్నది?", options: "క) ఉపకారి   ఖ) మమకారి   గ) అపకారి   ఘ) నేర్పరి" },
  ],
};

// Book page 69 (PDF P78) — "ఇవి చేయండి" exercises begin. Section I is
// recitation/reflection prompts. Section II opens with a padyapadam-
// locating exercise plus an MCQ built on a traditional Sumati Shatakam
// verse — that verse is centuries-old public-domain didactic literature
// (not this chapter's own copyrighted content), reproduced here only
// because the exercise itself needs it to be answerable.
export function C6TeluguCh7Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <h3 className="inline-block rounded-full bg-pink-100 px-6 py-2 text-lg font-bold text-pink-700">
        ఇవి చేయండి
      </h3>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          I. విని, అర్థంచేసుకొని, ఆలోచించి మాట్లాడడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <TeluguAnswerBox
            question="1. పాఠాన్ని (ద్విపదను) రాగ, భావయుక్తంగా పాడండి. (మీ అనుభవాన్ని ఇక్కడ రాయండి)"
            storageKey="c6-telugu-ch7-page6-recite"
            quickWords={["ద్విపద", "పాడాను", "భావం", "రాగం"]}
          />
          <TeluguAnswerBox
            question="2. మీరు ఎవరికైనా సాయం చేశారా? అప్పుడు వారు ఏవిధంగా స్పందించారు?"
            storageKey="c6-telugu-ch7-page6-help-story"
            quickWords={["సాయం", "చేశాను", "సంతోషం", "కృతజ్ఞత"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          II. ధారాళంగా చదవడం - అర్థం చేసుకొని ప్రతిస్పందించడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="font-semibold text-pink-600">
            1. కింది అర్థం గల పద్యపాదాలు మీ పాఠంలోని పద్యాలలో ఎక్కడ ఉన్నాయో గుర్తించి ఆ పాదాలు రాయండి.
          </p>
          {MEANING_ITEMS.map((item, i) => (
            <TeluguAnswerBox
              key={item}
              question={`${String.fromCharCode(3077 + i)}. ${item}`}
              storageKey={`c6-telugu-ch7-page6-locate-${i + 1}`}
              quickWords={["పద్యం I", "పద్యం II", "వరుస సంఖ్య"]}
            />
          ))}

          <p className="font-semibold text-pink-600">2. కింది పద్యాన్ని చదివి సరైన జవాబును గుర్తించండి.</p>
          <div className="rounded-md bg-amber-50/60 p-4 italic">{MCQ1.verse}</div>
          {MCQ1.questions.map((item, i) => (
            <div key={item.q} className="space-y-1">
              <p className="font-semibold">
                {String.fromCharCode(3077 + i)}. {item.q}
              </p>
              <p className="text-foreground/70">{item.options}</p>
              <TeluguAnswerBox
                question="మీ జవాబు (అక్షరం రాయండి: క/ఖ/గ/ఘ)"
                storageKey={`c6-telugu-ch7-page6-mcq-${i + 1}`}
                quickWords={["క", "ఖ", "గ", "ఘ"]}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
