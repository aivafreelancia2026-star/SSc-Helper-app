"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh2Page5() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch2-p23-answers");
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
      localStorage.setItem("c8-telugu-ch2-p23-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Top Paragraph */}
      <div className="space-y-4 indent-12 text-justify">
        <p>
          రేడియో ఇంగ్లీషు భాష కూడా తెలియకపోయేది. నేను ధోవతి శేర్వాణీలో ఉంటిని. నేను తప్ప మిగతా భారతీయులు
          పాశ్చాత్య డ్రెస్లో ఉండిరి. నా దగ్గరికి చాలా మంది బ్రిటీష్ వాళ్ళు రాకపోతూ ఉండిరి. ఐనా కొంతమంది నన్ను
          మందలించేవారు. నా దగ్గరకు వచ్చి కూర్చుండి నాతో మాట్లాడేవారు. అందులో తరుచుగా మాట్లాడిన వ్యక్తి జైపూర్
          మహారాజా గారి కుమారునికి చదువు చెప్పిన వ్యక్తి. అతడు చాలా మంచివాడు. భారతదేశంలోని ఎందరో రాజకుమారులు
          వారికి శిష్యులు.
        </p>
      </div>

      {/* Two Column Layout: Think/Say Box + Text */}
      <div className="flex flex-col-reverse md:flex-row gap-6 items-start mt-8">
        
        {/* Left Column: ఆలోచించండి-చెప్పండి Box */}
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
              { id: "p23-q1", text: "ఇప్పుడు ప్రయాణంలో కాలక్షేపం కొరకు ప్రయాణీకులు ఏమేం చేస్తుంటారో చెప్పండి." },
              { id: "p23-q2", text: "ప్రయాణం చేసేటప్పుడు తోటి ప్రయాణీకులతో ఎట్లా ఉండాలి? ఎందుకు?" },
              { id: "p23-q3", text: "కొత్త ప్రదేశానికి వెళ్ళినప్పుడు అక్కడి భాష అర్థం కాకపోతే ఎటువంటి చిక్కులెదురవుతాయి? అప్పుడు మీరేం చేస్తారు?" }
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

        {/* Right Column Text */}
        <div className="flex-1 space-y-4 indent-12 text-justify">
          <p>
            ఇంకొకరు ఆంగ్లో ఇండియను. వ్యక్తి తెల్లగా
            లేకుండె. అతనిపేరు ఫార్వెట్టు. ఇంగ్లాండుకు సెలవుపైన
            వెళ్ళుతూ ఉండెను. అతనితో నాకు చాలా స్నేహం
            కలిగింది. అతడు నాకు పాశ్చాత్యుల అలవాట్లను
            కావలసిన వాటిని తెలుపుతూ ఉండేవాడు. బ్రిటీష్
            జీవితపు కథలు తెలుపుతూ ఉండేవాడు. బ్రిటన్‌లో
            చదువుకోవడం బీదవారీ తరం కాదనేవాడు. వేయిల
            రూపాయలు ఉంటేగాని బ్రిటన్‌లో జీవితం జరుగదు
            అనేవాడు. బ్రిటన్‌లో ఉద్యోగం దొరుకదు అనేవాడు.
          </p>
        </div>
      </div>

      {/* Section III */}
      <div className="flex flex-col items-center pt-8">
        <h2 className="text-3xl font-bold font-serif mb-6 text-[#1e1b4b]">III</h2>
        
        <div className="w-full space-y-4 indent-12 text-justify">
          <p>
            డెక్‌పైన మొదటిసారి నన్ను చూసినప్పుడు ఏదో రాజుగారికి వంటచేసే వాణ్ణని, నా డ్రస్సు చూసి అనుకున్నాడట.
            తరువాత నేను విద్యాభ్యాసానికి వెళ్ళుతున్నానని చెప్పినాను. నేను బీదవాణ్ణి, డబ్బులేకుండా వెళ్ళుతున్నానని వారికి తెలువదు.
            నేను చెప్పలేదు. నా దగ్గర డబ్బులేదని తెలిస్తే నన్ను ‘డీపోర్టు’ చేసి ఇండియాకు తిరిగి పంపుతారని నా భయం. దేవునికి
            తప్ప ఇంకెవరికీ చెప్పలేదు.
          </p>
          <p>
            ఇంగ్లాండుకు పడవ చేరగానే, బ్రిటీషు రేవులోని పోలీసులు, తగినంత పైసాలేని వారిని డీపోర్టు చేసి వాపసు పంపుతారనీ,
            బ్రిటీష్ పోలీసువారు చాలా స్ట్రిక్ట్ అని ఫార్వెట్ నాతో అనేవారు. వారి మాటలు విని, నన్ను ఇంగ్లండులో దిగనివ్వరని మళ్ళీ
            అదే పడవలో దేశం వెళ్ళగొట్టుతారని లోలోపల భయం వేసి “ఈశ్వరా నీవే దిక్కు నీవే నన్ను తలవని తలంపుగా తీసుకొని
            వస్తున్నావు. కనుక నీవే నన్ను డీపోర్టు చేయించకుండా ఇంగ్లండులో ప్రవేశపెట్టమని ప్రతి నిముషం మొక్కేవాణ్ణి.
          </p>
          <p>
            నేను నా దగ్గర ఎక్కువ సామాను లేకుండా 22 పౌండ్లతోనే ఇంగ్లాండుకు బయలుదేరినాను. అప్పుడు ఎక్స్చేంజ్ రేటు
            ఒక స్టెర్లింగ్ పౌండ్‌కు కల్లారు 13 రూపాయల 6 అణాలు. ఉన్ని బట్టలు నావద్ద సరిపోయేటన్ని లేకుండె. ధోతీ,
            పయిజామా, శేర్వాణీతోనే పడవలో తిరిగేవాణ్ణి. దేవునిపైన భారం వేసినాను. కనుక నాకు ఇంగ్లాండులో ఏదో పని
            చూపించి ద్రవ్యం సంపాదించే మార్గం చూపి నన్ను చదివించి తిరిగి తప్పక దేశం తెస్తాడన్న నమ్మకంతోనే బొంబాయి నుండి
            గ్రేట్‌బ్రిటన్‌కు బయలుదేరినాను. మా పడవ మెల్లగా నడిచేది. పడమర వైపుకు పోతూ ఉండిమి. కాబట్టి రోజూ గడియారం
            వెనుకకు తిప్పుకోవాలనీ, ఎన్ని నిమిషాలు వెనుకకు తిప్పాలో పడవ రిసెప్షన్ ఆఫీసులో నోటీసు పెట్టేవారు.
          </p>
          <p>
            గ్రేట్‌బ్రిటన్ చేరే వరకు అయిదున్నర గంటలు వెనుకకు తిప్పినాము. మొదటి హాల్ట్ మాది అడెన్ (ఏడెన్)లో. ఆడెన్
            పట్టణములోనికి వెళ్ళటానికి మాకు పర్మిషన్ ఇచ్చినారు. నా వెంబడి ఉన్న గుజరాతీ పిల్లల బంధువులు ఆడెన్‌లో ఉండిరి.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4">
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          14
        </div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
