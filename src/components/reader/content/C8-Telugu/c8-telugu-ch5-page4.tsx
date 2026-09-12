"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh5Page4() {
  const [answers, setAnswers] = useState<Record<string, string>>({
    q1: "",
    q2: ""
  });

  useEffect(() => {
    const savedAnswers = localStorage.getItem("c8-telugu-ch5-p4-answers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const handleChange = (id: string, value: string) => {
    const newAnswers = { ...answers, [id]: value };
    setAnswers(newAnswers);
    localStorage.setItem("c8-telugu-ch5-p4-answers", JSON.stringify(newAnswers));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#4a4a4a] pt-8 px-4 md:px-12 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Introduction Banner (ప్రవేశిక) */}
      <div className="bg-[#e6deea]/80 p-8 pt-10 rounded shadow-sm relative text-center mx-auto w-[90%]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2f2b66] text-white px-12 py-1.5 rounded-full font-bold shadow-sm">
          ప్రవేశిక
        </div>
        <p className="font-semibold text-gray-800 pt-2 leading-loose">
          విశిష్టమైన సాహిత్య ప్రక్రియల్లో శతకం ఒకటి. మేలిముత్యాల్లాంటి శతక పద్యాలనుండి<br/>
          కొన్నింటిని ఈ పాఠం ద్వారా చదువుకుందాం. నైతిక విలువలను పెంపొందించుకుందాం.
        </p>
      </div>

      {/* Section I */}
      <div className="text-center font-bold text-xl pt-4">I</div>
      
      <div className="space-y-12">
        {/* Poem 1 */}
        <div className="flex flex-col md:flex-row gap-6 items-start relative">
          <div className="font-bold w-6 shrink-0 pt-1">1.</div>
          <div className="flex-1 space-y-3 pt-1">
            <div className="flex gap-2">
              <span className="text-[#e6007e] font-bold">✿ మ.</span>
              <div className="space-y-2 font-medium text-[#2f2b66]">
                <p>సతతాచారము సూనృతంబు కృపయున్ సత్యంబునున్ శీలమున్</p>
                <p>నతి శాంతత్వము చిత్తశుద్ధి కరమున్నధ్యాత్మయున్ ధ్యానమున్</p>
                <p>ధృతియున్ ధర్మము సర్వజీవ హితముం దూరంబు గాకుండ స</p>
                <p>మ్మతికిం జేరువ మీ నివాస సుఖమున్ మానాథ నారాయణా!</p>
              </div>
            </div>
            <p className="text-right font-bold italic text-sm pr-12">నారాయణ శతకం - బమ్మెరపోతన</p>
          </div>
          <div className="relative w-32 h-40 shrink-0 mx-auto md:mx-0">
            <Image
              src="/assets/images/c8-telugu/ch5/ch5_p4_poem1.png"
              alt="Praying hands"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Poem 2 */}
        <div className="flex flex-col md:flex-row gap-6 items-start relative">
          <div className="font-bold w-6 shrink-0 pt-1">2.</div>
          <div className="flex-1 space-y-3 pt-1">
            <div className="flex gap-2">
              <span className="text-[#e6007e] font-bold">✿ ఉ.</span>
              <div className="space-y-2 font-medium text-[#2f2b66]">
                <p>బీదల కన్నవస్త్రములు పేర్మి నొసంగుము, తుచ్ఛ సౌఖ్యసం</p>
                <p>పాదనకై యబద్ధములఁ బల్కకు, వాదము లాడబోకు, మ</p>
                <p>ర్యాద నతిక్రమింపకు, పరస్పరమైత్రి మెలంగు, మిట్టి వౌ</p>
                <p>వేదములంచెరుంగుము, వివేకధనంబిది నమ్ము, చిత్తమా!</p>
              </div>
            </div>
            <p className="text-right font-bold italic text-sm pr-12">చిత్తశతకం - శ్రీపతి భాస్కరకవి</p>
          </div>
          <div className="relative w-36 h-32 shrink-0 mx-auto md:mx-0 mt-6">
            <Image
              src="/assets/images/c8-telugu/ch5/ch5_p4_poem2.png"
              alt="Giving clothes"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Think and Tell Box */}
        <div className="pl-8 pr-12 pt-4 w-full md:w-[75%]">
          <div className="bg-[#e6deea]/60 rounded-xl p-6 pt-8 relative">
            <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#2f2b66] text-white px-6 py-1.5 rounded-full font-bold shadow-sm flex items-center gap-2">
              <span>👦👧</span> ఆలోచించండి-చెప్పండి
            </div>
            
            <div className="space-y-6 pt-2">
              {[
                { id: "q1", text: "కవి ఉద్దేశంలో నిజమైన సుఖం అంటే ఏమిటి?" },
                { id: "q2", text: "'వివేకధనం'గా కవి వేటిని పేర్కొన్నాడు?" }
              ].map((q) => (
                <div key={q.id} className="space-y-2 pl-2 relative">
                  <span className="absolute -left-4 top-1 text-[#e6007e]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="rotate-45">
                      <rect x="2" y="2" width="20" height="20" rx="4" />
                    </svg>
                  </span>
                  <p className="font-semibold">{q.text}</p>
                  <textarea
                    className="w-full min-h-[60px] p-3 border border-black/10 rounded-lg outline-none focus:ring-2 focus:ring-[#6b5b95] bg-white resize-y shadow-inner text-sm"
                    placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                    value={answers[q.id]}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                  ></textarea>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section II */}
      <div className="text-center font-bold text-xl pt-8">II</div>
      
      {/* Poem 3 */}
      <div className="flex flex-col md:flex-row gap-6 items-start relative pt-4">
        <div className="font-bold w-6 shrink-0 pt-1">3.</div>
        <div className="flex-1 space-y-3 pt-1">
          <div className="flex gap-2">
            <span className="text-[#e6007e] font-bold">✿ చ.</span>
            <div className="space-y-2 font-medium text-[#2f2b66]">
              <p>చదువది యెంతగల్గిన రసజ్ఞత యించుక చాలకున్న నా</p>
              <p>చదువు నిరర్థకంబు గుణ సంయుతులెవ్వరు మెచ్చరెచ్చటం</p>
              <p>బదునుగ మంచి కూర నలపాకము చేసిననైన నందు నిం</p>
              <p>పొదవెడు నుప్పులేక రుచి పుట్టగ నేర్చునటయ్య భాస్కరా!</p>
            </div>
          </div>
          <p className="text-right font-bold italic text-sm pr-12">భాస్కర శతకం - మారద వెంకయ్య</p>
        </div>
        <div className="relative w-48 h-36 shrink-0 mx-auto md:mx-0">
          <Image
            src="/assets/images/c8-telugu/ch5/ch5_p4_poem3.png"
            alt="Reading girl and salt"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-12 pb-4 clear-both">
        <div className="text-sm font-bold pr-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          47
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
