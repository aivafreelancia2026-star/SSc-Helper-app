"use client";

import React from "react";
import Image from "next/image";

export function C8TeluguCh5Page2() {
  const poets = [
    {
      id: 1,
      image: "poet_narayana.png",
      century: "15వ శతాబ్దం",
      title: "నారాయణ శతకం :",
      description: (
        <>
          &apos;నారాయణా!&apos; అన్నమకుటంతో మనస్సుకు ఆహ్లాదాన్ని కలిగించే అద్భుతమైన పద్యాలు ఇందులో ఉన్నవి. 
          దీనిని పోతన రాశాడు. ఇతడు జనగామ జిల్లా బమ్మెరవాసి. ఆంధ్ర మహాభాగవతం, భోగినీదండకం, వీరభద్ర విజయం రాశాడు.
        </>
      )
    },
    {
      id: 2,
      image: "poet_chittha.png",
      century: "17వ శతాబ్దం",
      title: "చిత్త శతకం :",
      description: (
        <>
          శ్రీపతిభాస్కర కవి &apos;చిత్తమా!&apos; అనే మకుటంతో పద్యాలను రాశాడు. 
          ఈయన శైవ పండిత త్రయంలో ఒకరైన శ్రీపతి పండితుని వంశం వాడని పరిశోధకుల అభిప్రాయం.
        </>
      )
    },
    {
      id: 3,
      image: "poet_bhaskara.png",
      century: "17వ శతాబ్దం",
      title: "భాస్కర శతకం :",
      description: (
        <>
          మారద వెంకయ్య &apos;భాస్కరా!&apos; అనే మకుటంతో పద్యాలను రాశాడు. 
          భాస్కర శతకంలోని ప్రతి పద్యంలోను మొదటి, రెండు పాదాలలో ఒక నీతిని చెప్పి, 
          తరువాతి పాదాలలో దానిని సమర్థిస్తూ ఒక దృష్టాంతాన్ని చెప్పడం ఈ శతకంలోని ప్రత్యేకత.
        </>
      )
    },
    {
      id: 4,
      image: "poet_dasharathi.png",
      century: "17వ శతాబ్దం",
      title: "దాశరథి శతకం :",
      description: (
        <>
          కంచెర్ల గోపన్న (భక్త రామదాసు) ఖమ్మం జిల్లా నేలకొండపల్లి వాస్తవ్యుడు. 
          &apos;దాశరథీ కరుణాపయోనిధీ!&apos; అనే మకుటంతో పద్యాలను రాశాడు. భద్రాచల రామునిపై అనేక కీర్తనలు రాశాడు.
        </>
      )
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 font-body text-[15px] leading-relaxed text-[#4a4a4a] pt-8 px-4 md:px-12 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Lesson Details Box */}
      <div className="pt-4 relative z-0">
        <div className="border border-[#2f2b66]/30 rounded-xl p-6 md:p-8 pt-10 shadow-[4px_4px_0px_0px_rgba(47,43,102,0.1)] bg-[#f8f9fc] ml-4 md:ml-12">
          <div className="absolute top-0 -left-4 md:-left-8 bg-[#2f2b66] text-white px-8 py-1.5 rounded-full font-bold shadow-sm text-lg">
            పాఠ్యభాగ వివరాలు
          </div>
          
          <div className="space-y-4 pt-2 text-justify">
            <p className="indent-12">
              ఈ పాఠం శతక ప్రక్రియకు చెందినది. శతకం అంటే నూరు పద్యాలు కలది. కాని 
              నూటెనిమిది పద్యాలు ఉండడం శతకానికి పరిపాటి. ఈ పద్యాలకు సాధారణంగా మకుటం 
              ఉంటుంది. పద్యం చివరి పదంగాని పాదంగాని లేక రెండు పాదాలుగాని అన్ని పద్యాల్లో ఒకే 
              విధంగా ఉంటే దాన్ని మకుటం అంటారు. మకుటమంటే కిరీటం అని కూడా అర్థం.
            </p>
            <p className="indent-12">
              శతకంలోని ప్రతి పద్యం దేనికదే స్వతంత్రభావాన్ని కల్గి ఉంటుంది.
            </p>
            <p className="indent-12">
              ఈ పాఠంలోని పద్యాలను నారాయణ, చిత్త, భాస్కర, దాశరథి, నరసింహ, విశ్వకర్మ, శ్రీ 
              వేంకటేశ్వర, శ్రీ బాకవరాంజనేయ శతకాల నుండి తీసుకున్నారు.
            </p>
          </div>
        </div>
      </div>

      {/* Poet Intro Box */}
      <div className="pt-6 relative z-0">
        <div className="border border-[#e6007e] rounded-xl p-6 md:p-8 pt-10 shadow-[4px_4px_0px_0px_rgba(230,0,126,0.1)] bg-white ml-2">
          <div className="absolute top-0 -left-2 bg-[#e6007e] text-white px-8 py-1.5 rounded-full font-bold shadow-sm text-lg">
            కవి పరిచయం
          </div>
          
          <div className="space-y-8 pt-2">
            {poets.map((poet) => (
              <div key={poet.id} className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex flex-col items-center shrink-0 w-28">
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden border border-[#e6007e]/30 shadow-sm">
                    <Image
                      src={`/assets/images/c8-telugu/ch5/${poet.image}`}
                      alt={poet.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <span className="text-[#e6007e] font-bold text-xs mt-1 text-center">ఊహాచిత్రం</span>
                  <span className="text-[#e6007e] font-bold text-xs text-center">({poet.century})</span>
                </div>
                
                <div className="flex-1 text-justify flex gap-2">
                  <span className="font-bold">{poet.id}.</span>
                  <p>
                    <span className="text-[#e6007e] font-bold italic">{poet.title} </span>
                    {poet.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4 clear-both">
        <div className="text-sm font-bold pr-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          45
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
