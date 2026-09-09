"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh2Page1() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch2-p19-answers");
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
      localStorage.setItem("c8-telugu-ch2-p19-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Chapter Header Block */}
      <div className="bg-[#dfd9e7] p-3 mx-4 mt-6">
        <div className="bg-[#2f2b66] rounded-[24px] rounded-br-[24px] flex relative overflow-hidden">
          {/* Number Box */}
          <div className="bg-white rounded-[24px] rounded-r-none w-24 sm:w-32 flex items-center justify-center shrink-0 border-r-4 border-[#2f2b66]">
            <span className="text-[80px] sm:text-[120px] font-bold text-[#2f2b66] leading-none" style={{ fontFamily: "'Times New Roman', serif" }}>
              2
            </span>
          </div>

          {/* Title Area */}
          <div className="flex-1 px-4 sm:px-8 py-6 sm:py-8 flex flex-col justify-center border-t-8 border-b-8 border-[#2f2b66]">
            <h1 className="text-white text-3xl sm:text-[42px] font-bold tracking-wide">సముద్ర ప్రయాణం</h1>
            <div className="mt-4 border-t-2 border-white/40 pt-2 flex justify-end">
              <span className="text-white text-lg sm:text-xl font-medium tracking-wide">
                - ముద్దు రామకృష్ణయ్య
              </span>
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-white m-3 rounded p-2 flex flex-col items-center justify-center border-2 border-black w-24 shrink-0">
            <div className="relative w-full aspect-square mb-1">
              <Image 
                src="/c8-t-ch2-p19-qr.png"
                alt="QR Code R9L7C9"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <span className="text-black font-bold text-xs tracking-widest">R9L7C9</span>
          </div>
        </div>
      </div>

      {/* చదవండి - ఆలోచించి చెప్పండి */}
      <div className="px-4 pt-6">
        <div className="relative pt-4">
          <div className="absolute top-0 left-6 bg-[#00a9e0] text-white px-6 py-1.5 rounded-full font-bold text-lg z-10">
            చదవండి - ఆలోచించి చెప్పండి
          </div>
          <div className="border border-[#00a9e0] rounded-xl rounded-tl-none p-6 pt-8 bg-blue-50/30">
            <div className="space-y-4 indent-8 text-justify">
              <p>
                పడవలో ఇంకా ఇద్దరు భారతీయ విద్యార్థులుండిరి. వారు నాతోమాట్లాడుతూ ఉండిరి.
                సర్కారువారు వారిని స్కాలర్‌షిప్ ఇచ్చి పంపినది. కొంతమంది తల్లిదండ్రుల పైసాతో వచ్చుచుండిరి.
                నేను ఎక్కువ సామాను లేకుండా 22 పౌండ్లతోనే ఇంగ్లండుకు బయలుదేరినాను. ఉన్నిబట్టలు నా
                వద్ద సరిపోయేటన్ని లేకుండె. ధోతి, పయిజామా, షేర్వాణీతోనే పడవలో తిరిగేవాణ్ణి. దేవుని పైన
                భారం వేసినాను. బొంబాయి నుండి గ్రేట్ బ్రిటన్‌కు బయలుదేరినాను.
              </p>
              <p>
                గ్రేట్‌బ్రిటన్ పడమటి తీరం పొడుగున ఉత్తరం వైపు మా ప్రయాణం సాగుచుండెను. గ్రేట్
                బ్రిటన్ భూమి కనపడుచుండెను. దేవుడు నన్ను తుదకు గ్రేట్ బ్రిటన్ చేర్చినందుకు సంతోషించి,
                కృతజ్ఞతా వందనంచేసితిని.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ప్రశ్నలు */}
      <div className="px-4 pt-6">
        <div className="relative pt-4">
          <div className="absolute top-0 left-10 bg-[#3e3470] text-white px-6 py-1.5 rounded-full font-bold text-lg z-10">
            ప్రశ్నలు
          </div>
          <div className="border border-[#3e3470] rounded-xl rounded-tl-none p-6 pt-8 bg-[#3e3470]/5">
            <div className="space-y-6">
              {[
                { id: "p19-q1", text: "1. పడవలోని వాళ్ళు ఎక్కడికి ప్రయాణమైపోతున్నారు?" },
                { id: "p19-q2", text: "2. వాళ్ళు బ్రిటన్‌కు ఎందుకు వెళ్ళి ఉండవచ్చు?" },
                { id: "p19-q3", text: "3. పడవలో ప్రయాణించిన వ్యక్తి దేవుడికి కృతజ్ఞతా వందనం చెప్పడానికి గల కారణాలు ఏమై ఉంటాయి?" }
              ].map((q) => (
                <div key={q.id} className="space-y-2">
                  <p className="font-bold text-[#1e1b4b] italic">{q.text}</p>
                  <textarea
                    className="w-full h-20 border border-gray-300 rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#3e3470] shadow-inner resize-none bg-white/80 ml-4 italic text-gray-700"
                    placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                    value={answers[q.id] || ""}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* పాఠం నేపథ్యం, ఉద్దేశం */}
      <div className="px-4 pt-6">
        <div className="relative pt-4">
          <div className="absolute top-0 left-6 bg-[#e6007e] text-white px-6 py-1.5 rounded-full font-bold text-lg z-10">
            పాఠం నేపథ్యం, ఉద్దేశం
          </div>
          <div className="border border-[#e6007e] rounded-xl rounded-tl-none p-6 pt-8 bg-pink-50/30">
            <div className="space-y-4 indent-8 text-justify">
              <p>
                రెండవ ప్రపంచ యుద్ధకాలంలో లండన్‌కు వెళ్ళి చదువుకోవడం వ్యయప్రయాసలతో
                కూడుకొన్నపని. అయినప్పటికీ ఉన్నత విద్యకోసం, పెద్దపల్లి జిల్లా మంథని గ్రామ వాసియైన ముద్దు
                రామకృష్ణయ్య సుదూర దేశమైన గ్రేట్ బ్రిటన్‌కు సముద్ర ప్రయాణం చేశాడు. ఆయన సముద్ర
                ప్రయాణ అనుభవాలే ఈ పాఠం నేపథ్యం.
              </p>
              <p>
                కార్యసాధకులు అనుకున్న లక్ష్యాన్ని సాధించడానికి ఎన్ని ఇబ్బందులు ఎదురైనా కృత నిశ్చయంతో
                దృఢసంకల్పంతో పూర్తి చేసుకుని విజయాన్ని సాధించ గలుగుతారని తెలియజేయడమే ఈ పాఠ్యాంశ
                ఉద్దేశం.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-12 pb-4">
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          10
        </div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
