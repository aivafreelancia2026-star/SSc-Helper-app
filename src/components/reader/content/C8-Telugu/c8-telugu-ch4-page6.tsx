"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function C8TeluguCh4Page6() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem("c8-telugu-ch4-p6-answers");
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading answers", e);
      }
    }
  }, []);

  const handleAnswerChange = (id: string, value: string) => {
    const newAnswers = { ...answers, [id]: value };
    setAnswers(newAnswers);
    localStorage.setItem("c8-telugu-ch4-p6-answers", JSON.stringify(newAnswers));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 font-body text-[15px] leading-relaxed text-[#4a4a4a] pt-8 px-4 md:px-12 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Cobbler Section */}
      <div className="relative text-justify leading-[2.2]">
        <div className="float-none md:float-right md:ml-6 mb-4 w-full md:w-[220px] h-[260px] relative mt-2 bg-white overflow-hidden">
          <Image
            src="/c8-t-ch4-p6-cobbler.png"
            alt="Cobbler making shoes"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        
        <p className="indent-12">
          తెల్లవారినప్పటినుంచి అడుగు బయటకు వేయాలంటే చెప్పుల్లో 
          కాళ్లు పెట్టాల్సిందే. చెప్పుల చరిత్రను చెప్పుకొంటే ఆవేదన, ఆశ్చర్యం 
          కలుగుతాయి. ఏదైనా జంతువు చనిపోతే దాన్ని చూసి దూరంగా 
          వెళ్తాం. కాని తోలు పనివాళ్ళు ఆ జంతువు చర్మాన్ని ఒడుపుగా 
          ఒలుస్తారు. శుభ్రం చేస్తారు. దానితోనే చెప్పులు తయారుచేస్తారు. 
          ఒక వ్యర్థపదార్థంనుంచి అందరికీ ఉపయోగపడే వస్తువును 
          సృష్టించినవారి తెలివి ఎంతో గొప్పది. అందుకు వాళ్ళు పడే శ్రమ 
          అంత ఇంత కాదు. అసలు దీనికి వెలకట్టగలమా? వీరి ఔదార్యాన్ని 
          చాటుతున్న ఈ పద్యం చదువండి.
        </p>
      </div>

      {/* Poem / Quote */}
      <div className="text-[#1e1b4b] space-y-2 md:w-3/4 mx-auto pl-4 md:pl-12">
        <p className="leading-[2.2]">
          "ముప్పు ఘటించి వీని కులమున్, కలిమిన్ కబళించి దేహమున్<br/>
          పిప్పి యొనర్చు నీ భరతవీరుని పాదము కందకుండగా<br/>
          చెప్పులు గుట్టి జీవనము సేయును గాని నిరాకరింప లే<br/>
          దెప్పుడు అప్పువడ్డది సుమీ భరతావని వీని సేవకున్."
        </p>
      </div>
      <div className="text-justify leading-[2.2] pt-2">
        <p className="indent-12">
          అని గుఱ్ఱం జాషువగారు నొక్కి వక్కాణించారు.
        </p>
      </div>

      {/* Think & Say Box + Wrapped Text */}
      <div className="relative text-justify leading-[2.2] pt-4">
        <div className="float-none md:float-right md:ml-6 mb-6 w-full md:w-[320px] relative bg-[#f1ebf4] rounded-2xl p-4 pt-10 border border-[#d1c4e0] shadow-sm">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[180px] h-[55px]">
            <Image
              src="/c8-t-ch4-p4-think-badge.png"
              alt="ఆలోచించండి-చెప్పండి"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <div className="flex gap-2 items-start">
                <div className="w-2 h-2 bg-[#e6007e] rotate-45 shrink-0 mt-2.5"></div>
                <p className="text-sm font-semibold text-[#1e1b4b]">బంగారానికే సౌందర్యం తెచ్చే స్వర్ణకారుల జీవితాలు ఎందుకు కళ తప్పుతున్నాయో చర్చించండి.</p>
              </div>
              <textarea
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[50px]"
                value={answers["q1"] || ""}
                onChange={(e) => handleAnswerChange("q1", e.target.value)}
                placeholder="మీ సమాధానం రాయండి..."
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex gap-2 items-start">
                <div className="w-2 h-2 bg-[#e6007e] rotate-45 shrink-0 mt-2.5"></div>
                <p className="text-sm font-semibold text-[#1e1b4b]">'కమ్మరి పని ఒక ఇంజనీరు ప్రక్రియ' అని ఎట్లా చెప్పగలవు?</p>
              </div>
              <textarea
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[50px]"
                value={answers["q2"] || ""}
                onChange={(e) => handleAnswerChange("q2", e.target.value)}
                placeholder="మీ సమాధానం రాయండి..."
              />
            </div>

            <div className="space-y-2">
              <div className="flex gap-2 items-start">
                <div className="w-2 h-2 bg-[#e6007e] rotate-45 shrink-0 mt-2.5"></div>
                <p className="text-sm font-semibold text-[#1e1b4b]">వస్తుసామగ్రి, ఇంటిసామగ్రి తయారుచేయడంలో వడ్రంగి శ్రమ విలువను గురించి మాట్లాడండి.</p>
              </div>
              <textarea
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[50px]"
                value={answers["q3"] || ""}
                onChange={(e) => handleAnswerChange("q3", e.target.value)}
                placeholder="మీ సమాధానం రాయండి..."
              />
            </div>

            <div className="space-y-2">
              <div className="flex gap-2 items-start">
                <div className="w-2 h-2 bg-[#e6007e] rotate-45 shrink-0 mt-2.5"></div>
                <p className="text-sm font-semibold text-[#1e1b4b]">వ్యర్థ పదార్థాలనుండి పాదాలకు రక్షణ ఇచ్చే చెప్పులు సృష్టించిన వారి తెలివి ఎంత గొప్పదో చెప్పండి.</p>
              </div>
              <textarea
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[50px]"
                value={answers["q4"] || ""}
                onChange={(e) => handleAnswerChange("q4", e.target.value)}
                placeholder="మీ సమాధానం రాయండి..."
              />
            </div>
          </div>
        </div>
        
        <p className="indent-12">
          జంతుచర్మాన్ని అనేక రకాలుగా మలుచడంలో వీరి 
          ప్రతిభ కనిపిస్తుంది. చర్మంతో ‘డప్పు’ లాంటి వాద్యాలను 
          తయారు చేశారు. ఇప్పటికీ ఊళ్ళలో ఏదైనా విషయం 
          చాటింపువేయాలంటే డప్పు కొట్టాల్సిందే. చివరకు మనిషిని 
          కాటికి పంపడానికి కూడా డప్పే ముందుంటుంది. ఒకప్పుడు 
          వ్యవసాయ బాయిలోని నీటిని పైకి తోడే మోటకు పెద్ద 
          బొక్కెనలుండేవి. వాటి తొండాలను కూడా చర్మంతో వీళ్ళే 
          తయారుచేసేవారు.
        </p>

        <p className="indent-12 mt-4">
          సమాజానికి ఎనలేని సేవలు చేసిన దళితులను అంటరానితనం పేరిట 
          దూరంగా ఉంచారు. గాంధీ, అంబేడ్కర్ వంటి ప్రముఖుల కృషి ఫలితంగా వీరికి 
          రాజ్యాంగ పరమైన రక్షణ లభించింది. వీరిపట్ల సమాజం ప్రత్యేక దృష్టి 
          సారించాలి. వారికి సమాన గౌరవం లభించేందుకు అన్ని కోణాలలో కృషి 
          జరగాలి.
        </p>
      </div>

      {/* Barber Section with Section III Marker */}
      <div className="relative text-justify leading-[2.2] clear-both pt-4">
        
        <div className="float-none md:float-left md:mr-6 mb-4 w-full md:w-[200px] h-[220px] relative mt-16 bg-white overflow-hidden">
          <Image
            src="/c8-t-ch4-p6-barber.png"
            alt="Barber cutting hair"
            fill
            className="object-contain"
            unoptimized
          />
        </div>

        <div className="flex justify-center pb-6">
          <h3 className="font-serif font-bold text-2xl text-[#1e1b4b]">III</h3>
        </div>
        
        <p className="indent-12">
          సంఘంలో క్షురకుల సేవలు మరవరానివి. (క్షురమంటే కత్తి, 
          తలవెంట్రుకలను కత్తిరించేవాడు క్షురకుడన్నమాట) ప్రజల ఆరోగ్యాన్ని 
          పరిరక్షించడంలో వారి భాగస్వామ్యం ఉన్నది. కత్తి, కత్తెరలతో వారు చూపే 
          పనితనం నాణ్యమైందే కాదు, సున్నితమైంది కూడా. క్షురకులకు తరతరాలుగా
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4 clear-both">
        <div className="text-sm font-bold pr-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          35
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
