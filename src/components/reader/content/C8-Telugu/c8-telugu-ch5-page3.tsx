"use client";

import React from "react";
import Image from "next/image";

export function C8TeluguCh5Page3() {
  const poets = [
    {
      id: 5,
      image: "poet_narasimha.png",
      dateLines: ["ఊహాచిత్రం", "(18వ శతాబ్దం)"],
      title: "నరసింహ శతకం :",
      description: (
        <>
          ఈ శతక కర్త కాకుత్థ్సం శేషప్పకవి. జగిత్యాల జిల్లా ధర్మపురికి చెందినవాడు. 
          &apos;దుష్టసంహార నరసింహ దురితదూర!&apos; అనే మకుటంతో పద్యాలను రాశాడు. ఈయన మృదంగం 
          వాయించడంలో నేర్పరి. తన జీవితాన్ని శ్రీధర్మపురి నరసింహ స్వామికి అంకితం చేశాడు. 
          ఈయన నరహరి, నృకేసరీ శతకాలు, ధర్మపురీరామాయణం మొదలగు రచనలు చేశాడు.
        </>
      )
    },
    {
      id: 6,
      image: "poet_vishwakarma.png",
      dateLines: ["(1855-1963)"],
      title: "విశ్వకర్మ శతకం :",
      description: (
        <>
          &apos;విశ్వపాలన ధర్మ! శ్రీ విశ్వకర్మ!&apos; అనే మకుటంతో పండిత రామసింహకవి &apos;విశ్వకర్మ&apos; 
          శతకాన్ని రాశాడు. ఈయన జగిత్యాల జిల్లాలోని జగిత్యాల మండలం రాఘవపట్నం వాసి. 
          ఈయన ఆశుకవి. దుష్ట ప్రపంచ వర్ణన, కలియుగ వర్ణాశ్రమ ధర్మాలు, భజన కీర్తనలు మొదలగునవి ఇతని రచనలు.
        </>
      )
    },
    {
      id: 7,
      image: "poet_venkateshwara.png",
      dateLines: ["11-04-1936", "09-01-2011"],
      title: "శ్రీ వేంకటేశ్వర శతకం :",
      description: (
        <>
          నల్గొండ జిల్లా మునగాల మండలం నరసింహాపురం గ్రామంలో జన్మించిన ఆసూరి మరింగంటి 
          పురుషోత్తమాచార్యులు &apos;వేంకటేశ్వరా!&apos; అనే మకుటంతో పద్యాలను రాశాడు. ఈయన గోదాదేవి, 
          యాదగిరి లక్ష్మీనరసింహ శతకం, గోదావరి, సత్యవతీ సాంత్వనం, మారుతి మొదలగు రచనలు 
          చేశాడు. ఈయన &apos;విద్వత్ కవి&apos;గా ప్రసిద్ధి పొందాడు.
        </>
      )
    },
    {
      id: 8,
      image: "poet_bakavaranjaneya.png",
      dateLines: ["03-02-1937", "26-08-1994"],
      title: "శ్రీ బాకవరాంజనేయ శతకం :",
      description: (
        <>
          రంగారెడ్డి జిల్లా శంకర్పల్లి నివాసియైన వేంకటరావు పంతులు, తాండూర్ దగ్గరలోని 
          బాకవరం గ్రామంలో వెలసిన ఆంజనేయస్వామిపై &apos;బాకవరాంజనేయ! ఖలభంజన! సాధుజనానురంజనా!&apos; 
          అనే మకుటంతో పద్యాలను రాశాడు. యక్షగానాలు, కీర్తనలు, గేయాలు రాశాడు.
        </>
      )
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 font-body text-[15px] leading-relaxed text-[#4a4a4a] pt-8 px-4 md:px-12 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Poet Intro Box (Continuation) */}
      <div className="pt-2 relative z-0">
        <div className="border border-[#e6007e] rounded-xl rounded-t-none border-t-0 p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(230,0,126,0.1)] bg-white ml-2">
          
          <div className="space-y-8">
            {poets.map((poet) => (
              <div key={poet.id} className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex flex-col items-center shrink-0 w-28">
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden border border-[#e6007e]/30 shadow-sm mb-1">
                    <Image
                      src={`/assets/images/c8-telugu/ch5/${poet.image}`}
                      alt={poet.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  {poet.dateLines.map((line, idx) => (
                    <span key={idx} className="text-[#e6007e] font-bold text-xs text-center">{line}</span>
                  ))}
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

      {/* Instructions to Students Section */}
      <div className="pt-8 relative z-0">
        <div className="border border-[#00a2e8] rounded-xl p-6 md:p-8 pt-10 shadow-[4px_4px_0px_0px_rgba(0,162,232,0.1)] bg-[#f4faff] ml-6">
          <div className="absolute top-0 -left-6 bg-[#00a2e8] text-white px-6 py-1.5 rounded-full font-bold shadow-sm">
            విద్యార్థులకు సూచనలు
          </div>
          
          <ul className="space-y-4 pt-2">
            {[
              "పాఠం ప్రారంభంలోని ప్రవేశిక చదువండి. పాఠంలోని విషయాన్ని ఊహించండి.",
              "పాఠం చదువండి. అర్థంకాని పదాల కింద గీత గీయండి.",
              "వాటి అర్థాలను పుస్తకం చివర ఉన్న 'పదవిజ్ఞానం' పట్టికలో చూసి లేదా నిఘంటువులో చూసి తెలుసుకోండి."
            ].map((instruction, index) => (
              <li key={index} className="flex gap-4 items-start">
                <span className="text-[#e6007e] shrink-0 mt-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="rotate-45">
                    <rect x="2" y="2" width="20" height="20" rx="4" />
                  </svg>
                </span>
                <span className="font-semibold text-gray-800">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4 clear-both">
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          46
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
