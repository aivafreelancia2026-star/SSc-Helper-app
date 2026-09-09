"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh3Page3() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("c8-telugu-ch3-p33-answers");
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
      localStorage.setItem("c8-telugu-ch3-p33-answers", JSON.stringify(newAnswers));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Top Section: ప్రవేశిక */}
      <div className="relative border border-[#d1c4e0] rounded-xl p-6 pt-10 mt-6 bg-[#ebe6f2] shadow-sm max-w-[90%] mx-auto">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2f2b66] text-white px-12 py-1.5 rounded-full whitespace-nowrap shadow-md">
          <h2 className="font-bold text-[16px]">ప్రవేశిక</h2>
        </div>
        
        <div className="space-y-4 pt-2 text-justify text-[#4a4a4a] leading-[1.8] font-bold">
          <p className="indent-12">
            సదుద్దేశంతో చేసే పనులు ఎప్పుడూ మనిషిని సచ్చీలుడుగానే నిలబెడుతాయి. భగవంతుడు
            కూడా ఇటువంటి పనులను చేసే వారిని మెచ్చుకుంటాడు. దీనికి ఉదాహరణలు పురాణేతిహాసాలలో
            అనేకం కనిపిస్తాయి. ఆ కోవలోని వాడే బండారి బసవన్న. అతని జీవితంలో జరిగిన ఒక
            మహత్తర ఘట్టం గురించి ఇప్పుడు తెలుసుకుందాం.
          </p>
        </div>
      </div>

      {/* Main Content: 2-column layout (Image + Poem) */}
      <div className="flex flex-col md:flex-row gap-8 pt-8">
        
        {/* Left Column: Image */}
        <div className="w-full md:w-[320px] shrink-0 relative">
          <div className="w-full h-[450px] relative shadow-md rounded-md overflow-hidden border border-[#d1c4e0]">
            <Image
              src="/c8-t-ch3-p3-king.png"
              alt="King Abul Hasan Tanisha and Bandari Basavanna"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* Right Column: Poem */}
        <div className="flex-1 space-y-6">
          <div className="flex justify-center md:justify-start pl-8 text-[#2f2b66]">
            <span className="font-serif font-bold text-2xl">I</span>
          </div>
          
          <div className="pl-4 md:pl-12 text-[#2a87b8] font-bold leading-[2.2] text-[16px] space-y-2">
            <p>బండారి బసవన దండనాయకుని</p>
            <p>రప్పించి "మాయర్థ మొప్పించి పొమ్ము</p>
            <p>దప్పేమి? సాలుఁ బ్రధాని తనంబు</p>
            <p>'దండింప రా'దను తలఁపున నిట్లు</p>
            <p>బండార మంతయుఁ బాడు సేసితివి</p>
            <p>పరధనం బపహరింపని బాస యండ్రు</p>
            <p>పరధనం బెట్లకో బసవ! కైకొంటి</p>
            <p>వేయు మాటలు నేల వెఱతుము నీకు</p>
            <p>మాయర్థ మొప్పించి నీయంత నుండు"</p>
            <p>మనవుడుఁ గించి త్ప్రహాసితాస్యుఁడగుచు</p>
            <p>జననాథునకు బసవన మంత్రి యనియె</p>
            <p>"బరమేశు భక్తియున్ సురతరువుండ</p>
            <p>హరుభక్తియన్ కనకాచలంబుండ</p>
            <p>గామారి భక్తి చింతామణి యుండ</p>
            <p>సోమార్థ ధరు భక్తి సురధేనువుండ</p>
            <p>బగతుఁడాసించునే పరధనంబునకు</p>
            <p>మృగపతి యెద్దెస మేయునే పుల్లు?</p>
          </div>
        </div>
      </div>

      {/* Bottom Section: ఆలోచించండి-చెప్పండి */}
      <div className="flex justify-end pt-4 md:-mt-32 relative z-10">
        <div className="relative border border-[#d1c4e0] rounded-xl p-6 pt-10 bg-[#ebe6f2] shadow-md w-full md:w-[450px]">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#2f2b66] text-white px-8 py-1.5 rounded-full whitespace-nowrap shadow-md flex items-center gap-2">
            <span className="text-xl">👩🏽</span>
            <h2 className="font-bold text-[16px]">ఆలోచించండి-చెప్పండి</h2>
            <span className="text-xl">👦🏽</span>
          </div>
          
          <div className="space-y-6 pt-2 text-[#4a4a4a]">
            
            {/* Question 1 */}
            <div className="flex gap-3 items-start">
              <span className="text-[#e6007e] font-bold mt-1 text-lg leading-none">♦</span>
              <div className="flex-1 space-y-2">
                <p className="font-bold text-[#1e1b4b]">
                  సురతరువు, కనకాచలం, సురధేనువు,
                  భక్తిచింతామణి అనే పదాలను వాడడంలో
                  కవి ఉద్దేశం ఏమిటి?
                </p>
                <textarea
                  className="w-full h-24 border border-[#d1c4e0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#3e3470] shadow-inner resize-none bg-white text-[15px]"
                  placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                  value={answers["think-say-1"] || ""}
                  onChange={(e) => handleAnswerChange("think-say-1", e.target.value)}
                />
              </div>
            </div>

            {/* Question 2 */}
            <div className="flex gap-3 items-start">
              <span className="text-[#e6007e] font-bold mt-1 text-lg leading-none">♦</span>
              <div className="flex-1 space-y-2">
                <p className="font-bold text-[#1e1b4b]">
                  'బగతుఁడాసించునే పరధనమునకు' దీనిపై
                  మీ అభిప్రాయమేమిటి?
                </p>
                <textarea
                  className="w-full h-20 border border-[#d1c4e0] rounded p-3 focus:outline-none focus:ring-1 focus:ring-[#3e3470] shadow-inner resize-none bg-white text-[15px]"
                  placeholder="మీ జవాబు ఇక్కడ రాయండి..."
                  value={answers["think-say-2"] || ""}
                  onChange={(e) => handleAnswerChange("think-say-2", e.target.value)}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4">
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          24
        </div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
