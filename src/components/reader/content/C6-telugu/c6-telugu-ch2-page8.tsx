import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const OPPOSITES = ["అపవి", "స్నేహం", "సహాయం", "రాత్రి", "ఆకసం"];
const MATCH_WORDS = ["ఆకాశం", "సాయం", "రాత్రి", "నేయ్యం", "అదవి"];

const PHRASES = [
  "ఎలుక కన్నులమించి బయటకు వచ్చి, రంగం వైపు తొంగిచూసి, బిలంలో దూరింది.",
  "కొలనులో కమలం వికసించింది. తాబేలు సరస్సునుండి పైకి వచ్చింది.",
  "కాకి చెట్టుపైనుంచి చుట్టూ చూసింది. భయమేమి లేదని ఆ వాసనం తన మిత్రులకు చెప్పింది.",
  "కాకి, తాబేలు, ఎలుకల స్నేహం గొప్పది. ఇప్పుడు వాటికి జింకతో నేయ్యం కుదిరింది.",
];

const OWN_SENTENCES = [
  "గుబుక్కున",
  "తళుక్కున",
  "చటుక్కున",
  "మిరుమిట్లు గొలిపే",
  "మునిసిపోవు",
  "పదేపదిగా",
  "నివ్వెరపోయి",
];

export function C6TeluguCh2Page8() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">V. పదజాల వినియోగం</h3>
        <div className="space-y-4 px-5 pb-5 pt-4">
          <p className="text-lg font-bold leading-loose text-pink-600">
            కింది పట్టికలోని ప్రకృతి - వికృతి పదాలను జతపరచండి. అలా జతపరచిన ప్రకృతి,
            వికృతులను పట్టికరూపంలో రాయండి.
          </p>
          <div className="grid gap-3 rounded-[14px] border border-border/60 bg-muted/30 p-4 sm:grid-cols-2">
            <div>
              <p className="font-bold text-primary">పదాలు</p>
              <p className="mt-2 leading-loose">{OPPOSITES.join(" · ")}</p>
            </div>
            <div>
              <p className="font-bold text-primary">జతపరచండి</p>
              <p className="mt-2 leading-loose">{MATCH_WORDS.join(" · ")}</p>
            </div>
          </div>
          <TeluguAnswerBox
            question="మీ జతలను ఇక్కడ రాయండి."
            storageKey="c6-telugu-ch2-page8-matching"
          />

          <p className="pt-4 text-lg font-bold leading-loose text-pink-600">
            కింది వాక్యాలను చదవండి. ప్రతి వాక్యంలోనూ ఒక పదానికి అదే అర్థం వచ్చే మరొక పదం ఉంది.
            ఆ పదాలకింద గీత గీయండి.
          </p>
          {PHRASES.map((phrase, index) => (
            <TeluguAnswerBox
              key={phrase}
              question={`${["అ", "ఆ", "ఇ", "ఈ"][index]}. ${phrase}`}
              storageKey={`c6-telugu-ch2-page8-phrase-${index + 1}`}
            />
          ))}

          <p className="pt-4 text-lg font-bold leading-loose text-pink-600">
            కిందిపదాలు చదవండి. వీటిని ఉపయోగించి సొంతవాక్యాలు రాయండి.
          </p>
          {OWN_SENTENCES.map((word, index) => (
            <TeluguAnswerBox
              key={word}
              question={`${["అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ", "బు"][index]}. ${word}`}
              storageKey={`c6-telugu-ch2-page8-own-${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
