"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh2Page6() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch2-p24-answers");
      if (saved) {
        setAnswers(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAnswerChange = (id: string, value: string) => {
    const newAnswers = { ...answers, [id]: value };
    setAnswers(newAnswers);
    try {
      localStorage.setItem("c8-telugu-ch2-p24-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Top Paragraph */}
      <div className="space-y-4 indent-12 text-justify">
        <p>
          అతడు కారు తెచ్చి మమ్ములను తీసుకొని వెళ్ళినాడు. ఆడెన్ ప్రాంతములోని చారిత్రాత్మకమైనవన్నీ చూపించినాడు. వారి
          ఇంట్లో మంచి శాకాహార భోజనం పెట్టి మళ్ళా పడవరెవులో విడచినాడు. ఆడెన్‌లో ఉండేవారందరు అరబ్బీ ముస్లిములు.
          మన హైదరాబాదులోని ముస్లింల మొహల్లా ఉన్నట్లు ఉంటుంది.
        </p>
      </div>

      {/* Two Column Layout: Text + Think/Say Box */}
      <div className="flex flex-col md:flex-row gap-6 items-start mt-8">
        
        {/* Left Column Text */}
        <div className="flex-1 space-y-4 indent-12 text-justify">
          <p>
            మా పడవ కొన్ని దినాలు పోర్టు సయీద్‌లో ఉండి,
            మధ్యధరా సముద్రములో ప్రవేశించెను. చాలా జాగ్రత్తగా
            ప్రయాణం చేసితిమి. మా వెంట ఉన్న యుద్ధ విమానాలు
            మా పడవపైన ఎగురుచుండెను. డిస్ట్రాయర్లు మైనులను
            తీసివేస్తూ ఉండెను. అప్పుడప్పుడు డేంజర్ ఉన్నదని మేసేజ్
            వస్తే మా పడవలు వెనుకకు తిరిగేవి. కొంతసేపు అయిన
            తరువాత మార్గం మార్చి మళ్ళీ ముందుకు నడిచేవి.
            'జిబ్రాల్టర్' రేవుకు చేరుకొంటిమి.
          </p>
        </div>

        {/* Right Column: ఆలోచించండి-చెప్పండి Box */}
        <div className="w-full md:w-[360px] shrink-0 border border-[#b2a1c7] rounded-xl bg-[#f2eef6] p-4 pt-10 relative mt-4 md:mt-0">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[160px] h-[45px]">
            <Image
              src="/c8-t-ch2-p22-think-say.png"
              alt="ఆలోచించండి-చెప్పండి"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          
          <div className="space-y-6 mt-2">
            {[
              { id: "p24-q1", text: "విదేశాలకు వెళ్ళేటప్పుడు గడియారంలో సమయాన్ని సరిచేసుకోవాలి. దీనికి కారణం ఏమిటి?" },
              { id: "p24-q2", text: "విదేశాలలో మనకు తెల్సినవారు, బంధువులుంటే ఎట్లాంటి సౌకర్యాలు పొందవచ్చో చెప్పండి?" },
              { id: "p24-q3", text: "“ఈశ్వరా నీవే దిక్కు” అని రచయిత అనుకోవటానికి కారణమేమిటి? మీకెదురైన అట్లాంటి సందర్భాన్ని చెప్పండి." }
            ].map((q) => (
              <div key={q.id} className="flex gap-2 items-start">
                <span className="text-[#e6007e] text-xl leading-none mt-1">♦</span>
                <div className="flex-1 space-y-2">
                  <p className="font-bold text-[#1e1b4b] text-[14px] leading-snug">{q.text}</p>
                  <textarea
                    className="w-full h-16 border border-[#d1c4e0] rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#3e3470] shadow-inner resize-none bg-white text-[14px] italic text-gray-700"
                    placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                    value={answers[q.id] || ""}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section IV */}
      <div className="flex flex-col items-center pt-8">
        <h2 className="text-3xl font-bold font-serif mb-6 text-[#1e1b4b]">IV</h2>
        
        <div className="w-full space-y-4 indent-12 text-justify">
          <p>
            అట్లాంటిక్ మహాసముద్రములో ప్రవేశించేటప్పుడు సముద్రము చాలా 'కామ్' (ప్రశాంతం)గా ఉండెను. యుద్ధ నౌకలు
            యుద్ధ విమానాలు జిబ్రాల్టర్ సంధిని కాపాడుచుండెను. మేము ‘బే ఆఫ్ బిస్కే’ చేరితిమి. సముద్రము చాలా ఘోరంగా వైల్డ్‌గా
            ఉండెను. వాతావరణం చల్లగా, మబ్బులతో నిండియుండెను. అప్పుడే ఇంగ్లాండు దగ్గరకు వస్తున్నదని, అందరూ దిగే
            సన్నాహాలు మొదలు పెట్టినారు. జర్మన్ బాంబుల నుండి బ్రతికి చివరకు ఇల్లు చేరుకొంటిమని బ్రిటీష్‌వారు సంతోషపడుచుండిరి.
          </p>
          <p>
            ఇంగ్లీష్ చానల్‌లో మా పడవ చేరగానే సముద్రం ‘కాం’ (ప్రశాంతం) అయింది. గ్రేట్ బ్రిటన్ పడమటి తీరం పొడుగున
            ఉత్తరం వైపు మా పడవ పోవుచుండెను. గ్రేట్ బ్రిటన్ భూమి కనపడుచుండెను. దేవుడు నన్ను తుదకు గ్రేట్ బ్రిటన్
            చేర్చినందుకు సంతోషించి, కృతజ్ఞతా వందనం చేసితిని. కాని ఫార్వెట్ గారు ఇతర భారతీయ విద్యార్థులు, బ్రిటీష్ కస్టం వారు
            పడవ దిగేముందు డబ్బు గురించి అడుగుతారనీ, సరిపోయేటంత డబ్బు లేకపోతే పడవ దిగనివ్వరని మాటిమాటికి గట్టిగా
            చెప్పుచుండిరి. కాబట్టి నన్ను గ్రేట్ బ్రిటన్‌లో దిగనిస్తారో లేదో అని లోలోపల చింతించుకొంటూ, మాటి మాటికి దేవుణ్ణి శరణు
            జొచ్చితిని.
          </p>
          <p>
            అప్పుడు నేను నాతో పాటు గ్రేట్ బ్రిటన్‌కు ప్రయాణిస్తున్న కరీంనగరు జిల్లా ఎగ్జిక్యూటివ్ ఇంజనీరు గారి అబ్బాయి
            సురేశ్ బాబును కలిసితిని. క్లుప్తంగా నా పరిస్థితి వివరించితిని. నా దగ్గర డబ్బు లేదన్న రహస్యం ఎవ్వరికీ చెప్పనని అతని
            నుండి వాగ్దానము తీసుకొంటిని. ఆ పిల్లవాడు చాలా మంచివాడు. అతని దగ్గర 150/- పౌండ్ల డ్రాఫ్ట్ ఉండె. అతడు
            గవర్నమెంట్ స్కాలర్‌షిప్ హోల్డర్ కాబట్టి అతన్ని డబ్బు ప్రశ్న అడుగరు. అతనికి పడవదిగే పర్మిషన్ తొందరగా దొరుకుతుందని
            అతనితో “బాబూ! నీకు డబ్బు ప్రశ్నలేదు. నిన్ను డబ్బు విషయం అడుగరు. నీవు గవర్నమెంట్ స్కాలర్‌షిప్ హోల్డరువు.
            కనుక నీ 150 పౌండ్ల డ్రాఫ్ట్‌లో నావి నూరు పౌండ్లు ఉన్నవనీ, నేను నీకు బంధువును కాబట్టి ఇద్దరి డబ్బు ఒకే డ్రాఫ్ట్‌లో
            ఉన్నవని చెప్పు. భయపడకు. నేను నీ డబ్బు తీసుకోను. నిన్ను డబ్బు అడుగను. నన్ను పడవ దిగేటట్టు చూడు” అని
            అంటిని. ఈ మాటకు సురేశ్‌బాబు ఒప్పుకొన్నాడు. గ్రేట్ బ్రిటన్ సాయంత్రం చేరినాము. గ్రేట్ బ్రిటన్ పశ్చిమ తీరపు
            స్కాట్‌లాండ్ యొక్క గ్లాస్గో రేవుపట్టణం దగ్గర పడవ ఆగింది. అక్కడి పోలీసువారు, మా పడవరెవుకు చేరకముందే పడవలోనికి
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4">
        <div className="text-sm font-bold pr-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          15
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
