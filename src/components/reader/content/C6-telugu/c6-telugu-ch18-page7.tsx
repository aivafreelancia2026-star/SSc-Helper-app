const NANARTHALU: [string, string][] = [
  ["అవ్వ", "తల్లి, అమ్మమ్మ, నాయినమ్మ"],
  ["ఆశ", "కోరిక, దిక్కు"],
  ["ఉత్తరం", "లేఖ, ఒకదిక్కు"],
  ["కథ", "కత, గౌరి"],
  ["కరం", "చేయి, తొండం, కప్పము, కిరణం"],
  ["కపి", "వానరం, సూర్యుడు, ఏనుగు, విష్ణువు"],
  ["కర్కోటకుడు", "నాగుపాము, మారేడు, విషభేదం"],
  ["కాలము", "సమయం, నలుపు, చావు"],
  ["కాపు", "కాయలు కాయుట, రైతు, రక్షణ"],
  ["కారు", "కాలం, నలుపు"],
  ["కీడు", "అపకారం, ఆపద, అశుభం"],
  ["కులం", "వంశం, తెగ, శరీరం, ఇల్లు, ఊరు"],
  ["కొలువు", "ఉద్యోగం, ఆస్థానం, సేవ"],
  ["గుణము", "స్వభావం, అల్లెత్రాడు"],
  ["గోవు", "ఆవు, కన్ను, బాణం, సరస్వతి, భూమి"],
  ["చిత్రం", "చిత్తరువు, బొట్టు, ఆశ్చర్యం"],
  ["ధర", "భూమి, వెల"],
  ["దహనం", "కాల్చుట, జీడి"],
  ["దిక్కు", "దిశ, శరణం, దారి"],
  ["నిజం", "సత్యం, విధము"],
  ["నిగ్గు", "ఉత్కృష్ట కాంతి, కిరణం, సారం"],
  ["పాలు", "క్షీరం, భాగం"],
  ["ప్రాణం", "ఊపిరి, గాలి, బలిమి"],
  ["మతం", "అభిప్రాయం, సమ్మతి, శాస్త్రం"],
  ["రాజు", "చంద్రుడు, భూపాలుడు"],
  ["రీతి", "విధము, మేర, ఇత్తడి"],
  ["వర్ణము", "అక్షరం, రంగు, ఆకారం, జాతి"],
  ["వర్షము", "సంవత్సరం, వాన, మబ్బు"],
  ["సాధువు", "సజ్జనుడు, ముని"],
  ["సిరి", "సంపద, లక్ష్మీదేవత"],
  ["సీమ", "దేశం, వరిమడి, గుర్తు"],
  ["హంస", "శ్రేష్ఠం, ఒకపక్షి, పరమాత్మ"],
];

// Book page 165 (PDF/app P174) — నానార్థాలు (words with multiple
// meanings), then విశేషాంశాలు (special notes) begins: the story behind
// నలుడు, గండభేరుండ పక్షి, జానపద సాహిత్యం, and జినవల్లభుని శాసనం — all
// factual background notes, continued next page.
export function C6TeluguCh18Page7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="space-y-4">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">నానార్థాలు</h3>
        <div className="grid grid-cols-1 gap-x-6 gap-y-2 rounded-md border border-[#8b7a58]/60 bg-white p-4 sm:grid-cols-2">
          {NANARTHALU.map(([word, meanings]) => (
            <div key={word} className="flex gap-2">
              <span className="shrink-0 font-semibold text-[#765f31]">{word}</span>
              <span className="text-foreground/40">=</span>
              <span>{meanings}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="inline-block bg-[#765f31] px-5 py-2 text-lg font-bold text-white">విశేషాంశాలు</h3>

        <div className="rounded-md border border-[#8b7a58]/60 bg-white p-4">
          <p><span className="font-semibold text-pink-600">నలుడు:</span> విశ్వకర్మ అంశతో పుట్టిన ఒక వానరుడు. ఇతడు వానరసేన లంకకు పోవడానికి సముద్రానికి సేతువు కడతాడు.</p>
        </div>
        <div className="rounded-md border border-[#8b7a58]/60 bg-white p-4">
          <p><span className="font-semibold text-pink-600">గండభేరుండ పక్షి:</span> రెండు తలలుగల పక్షి. ఇది ఏనుగులను తన్నుకొనిపోవు శక్తిగలది.</p>
        </div>
        <div className="rounded-md border border-[#8b7a58]/60 bg-white p-4">
          <p><span className="font-semibold text-pink-600">జానపద సాహిత్యం:</span> జనపదం అంటే గ్రామం. జనపదాలలో నివసించేవారు జానపదులు. జానపద సాహిత్యం ఎప్పుడు, ఎక్కడ, ఎట్ల పుట్టిందో చెప్పడం కష్టం. జానపద సాహిత్యం మౌఖికంగా ప్రసారమవుతూ ఉంటుంది. జానపద సాహిత్యానికి కర్త ఎవరో తెలియదు. సామూహిక కర్తృత్వం, సామూహిక ప్రచారం దీని లక్షణం. జానపద సాహిత్యాన్ని అధ్యయనం చెయ్యడంవల్ల ప్రజల ఆచార వ్యవహారాలు, సంస్కృతి, సంప్రదాయాలు తెలుసుకోవచ్చు.</p>
        </div>
        <div className="rounded-md border border-[#8b7a58]/60 bg-white p-4">
          <p><span className="font-semibold text-pink-600">జినవల్లభుని శాసనం:</span> వేములవాడ చాళుక్య రాజైన రెండవ అరికేసరి ఆస్థానకవి పంపడు. పంపని తమ్ముడు జినవల్లభుడు. ఈయన క్రీ.శ. 940లో 'కుర్క్యాలశాసనం' వేయించాడు. ఇది తెలంగాణలో తొలి పద్యశాసనం.</p>
        </div>
      </section>
    </div>
  );
}
