"use client";

import Image from "next/image";

export function C8TeluguCh3Page2() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Section 1: పాఠ్యభాగ వివరాలు */}
      <div className="relative border border-[#d1c4e0] rounded-xl p-6 pt-10 mt-6 bg-[#f8f5fb] shadow-sm max-w-[80%] mx-auto">
        <div className="absolute -top-5 left-8 bg-[#2f2b66] text-white px-8 py-1.5 rounded-full whitespace-nowrap shadow-md">
          <h2 className="font-bold text-[16px]">పాఠ్యభాగ వివరాలు</h2>
        </div>
        
        <div className="space-y-4 pt-2 text-justify text-[#4a4a4a] leading-[1.8]">
          <p className="indent-12">
            ఈ పాఠం ద్విపద. ఇది దేశికవితా ప్రక్రియ. ఇది రెండేసి పాదాల చొప్పున మాత్రాగణాలతో
            సాగేరచన. మొత్తం కావ్యాన్ని ద్విపద ఛందస్సులో రాస్తే దాన్ని 'ద్విపద కావ్యం' అంటారు.
          </p>
          <p className="indent-12">
            ఈ పాఠం పాల్కురికి సోమనాథుడు రాసిన 'బసవపురాణం' తృతీయాశ్వాసం లోనిది.
          </p>
        </div>
      </div>

      {/* Section 2: కవి పరిచయం */}
      <div className="relative border border-[#e6007e] rounded-xl p-6 pt-10 mt-10 bg-[#fef5f9] shadow-sm">
        <div className="absolute -top-5 left-8 bg-[#e6007e] text-white px-8 py-1.5 rounded-full whitespace-nowrap shadow-md">
          <h2 className="font-bold text-[16px]">కవి పరిచయం</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 pt-2">
          {/* Poet Image Column */}
          <div className="flex flex-col items-center shrink-0 w-full md:w-[150px] space-y-2">
            <div className="w-[120px] h-[140px] relative border border-[#e6007e] bg-white rounded shadow-sm overflow-hidden p-2">
              <Image
                src="/c8-t-ch3-p2-poet.png"
                alt="పాల్కురికి సోమనాథుడు"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <p className="text-[#e6007e] font-bold text-sm text-center">(ఊహాచిత్రం)</p>
            <p className="text-[#e6007e] font-bold text-sm text-center">12వ శతాబ్దం</p>
          </div>

          {/* Text Column */}
          <div className="flex-1 space-y-4 text-justify text-[#4a4a4a] leading-[1.8]">
            <p className="indent-12">
              దేశీ సంప్రదాయంలో రచనలు చేసిన మొట్టమొదటి కవి పాల్కురికి
              సోమనాథుడు. తెలుగులో స్వతంత్ర కావ్యాన్ని రాసిన తొలికవి. బసవేశ్వరుని
              చరిత్రను పురాణంగా నిర్మించి ద్విపదకు కావ్య గౌరవం కలిగించిన శైవకవి.
              జనగామ జిల్లా పాలకుర్తి (పాలకురికి / పాల్కురికి) సోమన జన్మస్థలం.
            </p>
            <p className="indent-12">
              బసవపురాణము, అనుభవసారము, బసవోదాహరణము,
              వృషాధిపశతకము, చతుర్వేదసారము, చెన్నమల్లు సీసములు, పండితారాధ్య
              చరిత్రము మొదలయినవి సోమన కృతులు. రగడ, గద్య, పంచకం, అష్టకం,
              ద్విపద, శతకం, ఉదాహరణం మొదలయిన సాహితీ ప్రక్రియలకు ఈయన
              ఆద్యుడు. సంస్కృత, తమిళ, కన్నడ, మరాఠీభాషా పదాలను యథేచ్ఛగా తన
              రచనలో ఉపయోగించిన బహుభాషా కోవిదుడు. తెలుగులో 'మణి ప్రవాళ
              శైలి'ని వాడిన తొలికవి.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: విద్యార్థులకు సూచనలు */}
      <div className="relative border border-[#00a3e0] rounded-xl p-6 pt-10 mt-10 bg-[#f0f9fd] shadow-sm max-w-[90%] mx-auto">
        <div className="absolute -top-5 left-8 bg-[#00a3e0] text-white px-8 py-1.5 rounded-full whitespace-nowrap shadow-md">
          <h2 className="font-bold text-[16px]">విద్యార్థులకు సూచనలు</h2>
        </div>
        
        <div className="space-y-4 pt-2 text-[#4a4a4a] pl-4 md:pl-8">
          {[
            "పాఠం ప్రారంభంలోని ప్రవేశిక చదువండి. పాఠంలోని విషయాన్ని ఊహించండి.",
            "పాఠం చదువండి. అర్థంకాని పదాల కింద గీత గీయండి.",
            "వాటి అర్థాలను పుస్తకం చివర ఉన్న 'పదవిజ్ఞానం' పట్టికలో చూసి లేదా నిఘంటువులో చూసి తెలుసుకోండి."
          ].map((text, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <span className="text-[#e6007e] font-bold mt-1 text-lg leading-none">♦</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-12 pb-4">
        <div className="text-sm font-bold pr-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          23
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
