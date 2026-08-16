import { TeluguAnswerBox } from "@/components/reader/telugu-answer-box";

const MEANINGS = [
  "తిప్పన, పోతనలు అన్నదమ్ములు. తిప్పనకు తమ్ముడంటే చాలా ప్రేమ.",
  "తనకన్నా ఎవ్వరా తినడానికి ఏవైనా ఇస్తే తమ్మునికి ఇచ్చేవాడు.",
  "తిప్పన ఇష్టమైన పద్యాన్ని చదువుతుంటే పోతన దాన్ని ఒక్కసారి వినగానే అర్థం చేసుకొని చెప్పగలిగేవాడు.",
  "పోతన ఆటలాడుతూ, దూకుతూ, ఎగురుతూ ఉండేవాడు.",
  "ఆటల్లో అందరితో పోటీపడి ముందుండేవాడు.",
  "గురువాణి కొట్టడంతో ఒక గొల్లికూడా గురితప్పదు.",
  "కోతివలె చెల్లా కదలకుండా ఉండడు.",
  "అమ్మ గుడికి పోతుంటే అతడు కూడా వెళ్లి భక్తితో నమస్కారం చేసేవాడు.",
  "శివుని పద్యాలను పాడాలనే ఆసక్తి పెరిగింది.",
];

export function C6TeluguCh6Page6() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-center text-lg font-bold text-white">తాత్పర్యాలు</h3>
        <div className="space-y-3 px-5 py-5">
          {MEANINGS.map((meaning, index) => (
            <p key={meaning} className="rounded-[12px] border border-border/60 bg-white/80 px-4 py-3 text-lg leading-loose">
              {index + 1}. {meaning}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
