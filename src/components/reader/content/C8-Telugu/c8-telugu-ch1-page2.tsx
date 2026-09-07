import React from "react";
import Image from "next/image";

export function C8TeluguCh1Page2() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-10 font-body text-[15px] leading-loose text-[#1e1b4b] pt-8" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* Section 1: Lesson Details */}
      <div className="relative pt-6">
        {/* Dark Blue Title Badge */}
        <div className="absolute top-0 left-6 bg-[#2f2b66] text-white px-8 py-1.5 rounded-full font-bold text-sm z-10 shadow-md tracking-wide">
          పాఠ్యభాగ వివరాలు
        </div>
        
        {/* Outline Box */}
        <div className="border border-[#2f2b66] rounded-xl rounded-tl-none p-6 pt-8 bg-blue-50/20 shadow-sm">
          <div className="space-y-4 indent-8 text-justify font-medium text-gray-800">
            <p>
              ఈ పాఠం ఇతిహాస ప్రక్రియకు చెందినది. ఇతిహాసం అంటే &apos;ఇది ఇట్లా జరిగింది&apos; అని అర్థం. ఇతిహాసంలో కథకు ఎక్కువ ప్రాధాన్యం ఉంటుంది.
            </p>
            <p>
              ఈ కథలు గ్రంథస్థం కాకముందు వాగ్రూపంలో ఉండేవి.
            </p>
            <p>
              భారత రామాయణాలను ఇతిహాసాలు అంటారు.
            </p>
            <p>
              ఈ పాఠాన్ని శ్రీమదాంధ్ర మహాభారతంలోని అరణ్యపర్వంలోని తృతీయాశ్వాసం నుండి గ్రహించారు.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Author Intro */}
      <div className="relative pt-6">
        {/* Pink Title Badge */}
        <div className="absolute top-0 left-6 bg-[#e6007e] text-white px-8 py-1.5 rounded-full font-bold text-sm z-10 shadow-md tracking-wide">
          కవి పరిచయం
        </div>
        
        {/* Outline Box */}
        <div className="border border-[#e6007e] rounded-xl rounded-tl-none p-6 pt-8 bg-pink-50/20 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
          
          {/* Author Image Column */}
          <div className="flex flex-col items-center flex-shrink-0 w-full sm:w-[150px]">
            <div className="w-[120px] h-[160px] overflow-hidden rounded-lg shadow-md border-2 border-white relative bg-white">
              <Image 
                src="/nannaya-portrait.png"
                alt="Nannaya Portrait"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="text-[#e6007e] font-bold mt-3 text-[15px]">
              (11వ శతాబ్దం)
            </div>
          </div>

          {/* Author Text Column */}
          <div className="flex-1 space-y-4 text-justify font-medium text-gray-800">
            <p className="indent-8">
              రాజమహేంద్రవరాన్ని రాజధానిగా పరిపాలించిన రాజరాజ నరేంద్రుని ఆస్థానకవి నన్నయ. ఇతనికి వాగనుశాసనుడనే బిరుదు ఉన్నది.
            </p>
            <p className="indent-8">
              వ్యాసుడు మహాభారతాన్ని సంస్కృతంలో రాశాడు. నన్నయ మహాభారతంలోని పద్దెనిమిది పర్వాలలో ఆది, సభా పర్వాలు, అరణ్యపర్వంలో 4వ ఆశ్వాసంలో ‘శారదరాత్రులు’ అనే పద్యం వరకు తెలుగులోకి అనువదించాడు. ‘ఆంధ్రశబ్ద చింతామణి’ అనే తెలుగు వ్యాకరణ గ్రంథాన్ని సంస్కృతంలో రాశాడు. తన కవిత్వంలో ప్రసన్నకథా కలితార్థయుక్తి, అక్షరరమ్యత, నానారుచిరార్థసూక్తి నిధిత్వం’ అనే లక్షణాలున్నాయని చెప్పుకున్నాడు.
            </p>
          </div>

        </div>
      </div>

      {/* Section 3: Student Instructions */}
      <div className="relative pt-6">
        {/* Cyan Title Badge */}
        <div className="absolute top-0 left-6 bg-[#00a3e0] text-white px-8 py-1.5 rounded-full font-bold text-sm z-10 shadow-md tracking-wide">
          విద్యార్థులకు సూచనలు
        </div>
        
        {/* Outline Box */}
        <div className="border border-[#00a3e0] rounded-xl rounded-tl-none p-6 pt-8 bg-blue-50/30 shadow-sm space-y-4 text-gray-800 font-medium">
          
          <div className="flex gap-4 items-start">
            <div className="text-[#e6007e] mt-1 text-lg">❖</div>
            <p>పాఠం ప్రారంభంలోని ప్రవేశిక చదవండి. పాఠంలోని విషయాన్ని ఊహించండి.</p>
          </div>

          <div className="flex gap-4 items-start">
            <div className="text-[#e6007e] mt-1 text-lg">❖</div>
            <p>పాఠం చదవండి. అర్థంకాని పదాల కింద గీత గీయండి.</p>
          </div>

          <div className="flex gap-4 items-start">
            <div className="text-[#e6007e] mt-1 text-lg">❖</div>
            <p>వాటి అర్థాలను పుస్తకం చివర ఉన్న ‘పదవిజ్ఞానం’ పట్టికలో చూసి లేదా నిఘంటువులో చూసి తెలుసుకోండి.</p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4">
        <div className="text-sm font-bold pr-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          3
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
