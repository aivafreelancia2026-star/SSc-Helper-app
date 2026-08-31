import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const COMPREHENSION_QS = [
  "పై కవిత ప్రకారం చీమల గొప్పతనం ఏమిటి?",
  "పక్షుల గొప్పదనం ఏమిటి?",
  "కోకిల గానం ఎట్లా ఉంటుంది?",
  "ప్రకృతిని ఎందుకు కాపాడాలి?",
  "ఈ కవితకు శీర్షికను పెట్టండి.",
];

const TRUE_FALSE = [
  "చీమలు చాలా సోమరులు.",
  "చీమలకు క్రమశిక్షణ ఎక్కువ.",
  "పొదుపు చేయడం చీమల నుంచి నేర్చుకోవాలి.",
  "చీమలకు ముందుచూపు ఉండదు.",
  "చీమలనేత చీమలన్నింటినీ నడిపిస్తాడు.",
];

// Book page 89 (PDF/app P98) — "ఇవి చేయండి" begins. Section II Q2 reads
// an unrelated short poem about birds/unity — described thematically
// here (not transcribed, since it's still a poem) so the comprehension
// questions built around it stay answerable.
export function C6TeluguCh9Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <h3 className="inline-block rounded-full bg-pink-100 px-6 py-2 text-lg font-bold text-pink-700">
        ఇవి చేయండి
      </h3>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          I. వినండి, అర్థంచేసుకొని, ఆలోచించి మాట్లాడడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <TeluguAnswerBox
            question="1. పాఠం చదివారుకదా! ఈ కవితను కవి ఎందుకు రాసి ఉండవచ్చు?"
            storageKey="c6-telugu-ch9-page6-why"
            quickWords={["చీమలు", "క్రమశిక్షణ", "శ్రమ", "పాఠం"]}
          />
          <TeluguAnswerBox
            question="2. చీమల క్రమశిక్షణను తెలుసుకున్నారుకదా! క్రమశిక్షణను పాటించే విషయంలో మనిషి తీరు ఎట్లా ఉంటున్నదో చెప్పండి."
            storageKey="c6-telugu-ch9-page6-human-discipline"
            quickWords={["మనిషి", "క్రమశిక్షణ", "చీమలు"]}
          />
        </div>
      </section>

      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">
          II. ధారాళంగా చదవడం - అర్థం చేసుకొని ప్రతిస్పందించడం
        </h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <TeluguAnswerBox
            question="1. పాఠం చదివి చీమల గొప్పదనాన్ని తెలిపే ముఖ్యమైన పదాలను వెతికి రాయండి."
            storageKey="c6-telugu-ch9-page6-keywords"
            quickWords={["క్రమశిక్షణ", "శ్రమ", "పొదుపు", "ఐక్యత"]}
          />

          <div className="space-y-2 rounded-md bg-amber-50/50 p-3">
            <p className="font-semibold text-pink-600">2. కింది కవితను చదివి ప్రశ్నలకు జవాబులు రాయండి.</p>
            <p className="italic">
              (ఎగిరే పక్షులలో ఉన్న ఐక్యతను, కోకిల మధురగానాన్ని, ప్రకృతిని కాపాడుకోవాల్సిన అవసరాన్ని
              తెలిపే ఒక చిన్న కవిత — పాఠ్యపుస్తకంలో చూడండి)
            </p>
          </div>
          {COMPREHENSION_QS.map((q, i) => (
            <TeluguAnswerBox
              key={q}
              question={`${String.fromCharCode(3077 + i)}. ${q}`}
              storageKey={`c6-telugu-ch9-page6-comprehension-${i + 1}`}
              quickWords={["పక్షులు", "కోకిల", "ప్రకృతి", "ఐక్యత"]}
            />
          ))}

          <p className="font-semibold text-pink-600">
            3. గేయం ఆధారంగా కింది వాక్యాల్లో ఒప్పును (✓) తో, తప్పును (x) తో గుర్తించండి.
          </p>
          {TRUE_FALSE.map((statement, i) => (
            <TeluguAnswerBox
              key={statement}
              question={`${String.fromCharCode(3077 + i)}. ${statement} ( )`}
              storageKey={`c6-telugu-ch9-page6-tf-${i + 1}`}
              quickWords={["✓", "x"]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
