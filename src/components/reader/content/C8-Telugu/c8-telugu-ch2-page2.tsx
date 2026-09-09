import Image from "next/image";

export function C8TeluguCh2Page2() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* పాఠ్యభాగ వివరాలు */}
      <div className="px-4">
        <div className="relative pt-4">
          <div className="absolute top-0 left-6 bg-[#2f2b66] text-white px-6 py-1.5 rounded-full font-bold text-lg z-10 shadow-sm">
            పాఠ్యభాగ వివరాలు
          </div>
          <div className="border-[1.5px] border-[#2f2b66] rounded-[20px] rounded-tl-none p-6 pt-10 bg-[#2f2b66]/5">
            <div className="space-y-4 indent-12 text-justify">
              <p>
                'యాత్రా చరిత్ర' ప్రక్రియకు చెందినదీ పాఠం. యాత్రవల్ల తమకు కలిగిన అనుభవాలను
                వివరిస్తూ రాసేదే యాత్రాచరిత్ర. దేశ, విదేశాలలో నెలకొన్న నాటి రాజకీయ, ఆర్థిక, సామాజిక
                స్థితిగతులను కూడా ఇవి వివరిస్తాయి.
              </p>
              <p>
                ఈ పాఠం ముద్దు రామకృష్ణయ్య రాసిన 'నా ప్రథమ విదేశీ యాత్ర' పుస్తకంలోనిది.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* రచయిత పరిచయం */}
      <div className="px-4">
        <div className="relative pt-4">
          <div className="absolute top-0 left-6 bg-[#e6007e] text-white px-6 py-1.5 rounded-full font-bold text-lg z-10 shadow-sm">
            రచయిత పరిచయం
          </div>
          <div className="border-[1.5px] border-[#e6007e] rounded-[20px] rounded-tl-none p-6 pt-10 bg-pink-50/30">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              
              {/* Author Portrait & Dates */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-[120px] h-[150px] relative rounded-[20px] overflow-hidden border-2 border-white shadow-md bg-white">
                  <Image
                    src="/c8-t-ch2-p20-author.png"
                    alt="ముద్దు రామకృష్ణయ్య"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="mt-2 text-center font-bold text-[#e6007e]">
                  <p>18-10-1907</p>
                  <p>21-10-1985</p>
                </div>
              </div>

              {/* Author Bio */}
              <div className="flex-1 text-justify indent-8 space-y-4 leading-[2]">
                <p>
                  ముద్దు రామకృష్ణయ్య పెద్దపల్లి జిల్లాలోని మంథని గ్రామంలో జన్మించాడు.
                  వీరి తండ్రి ముద్దు రాజన్న, తల్లి ముద్దు అమ్మాయి. 1946లో బ్రిటన్‌లోని
                  లీడ్స్ విశ్వవిద్యాలయం నుండి యం.ఇడి. పట్టా పొందాడు. 1951-58
                  మధ్య కాలంలో ఆసియా, ఆస్ట్రేలియా, యూరప్, అమెరికా ఖండాలలోని
                  పలుదేశాలు పర్యటించి, అక్కడి విద్యావిధానాలను అధ్యయనం చేశాడు. మన
                  దేశపు విద్యారంగంలో ఎన్నో సంస్కరణలు తెచ్చాడు. అవి నేటికీ
                  ఆదర్శప్రాయాలైనాయి. సమయపాలనకు ఆయన పెట్టింది పేరు. నిరక్షరాస్యత
                  నిర్మూలన కోసం 'ఈచ్ వన్ టీచ్ వన్' ఉద్యమాన్ని జీవిత చరమాంకం వరకు
                  కొనసాగించిన గొప్ప విద్యావేత్త.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* విద్యార్థులకు సూచనలు */}
      <div className="px-4">
        <div className="relative pt-4">
          <div className="absolute top-0 left-6 bg-[#00a9e0] text-white px-6 py-1.5 rounded-full font-bold text-lg z-10 shadow-sm">
            విద్యార్థులకు సూచనలు
          </div>
          <div className="border-[1.5px] border-[#00a9e0] rounded-[20px] rounded-tl-none p-6 pt-10 bg-blue-50/30">
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                <span className="text-[#e6007e] text-lg leading-none mt-0.5">❖</span>
                <p>పాఠం ప్రారంభంలోని ప్రవేశిక చదువండి. పాఠంలోని విషయాన్ని ఊహించండి.</p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-[#e6007e] text-lg leading-none mt-0.5">❖</span>
                <p>పాఠం చదువండి. అర్థంకాని పదాల కింద గీత గీయండి.</p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-[#e6007e] text-lg leading-none mt-0.5">❖</span>
                <p>వాటి అర్థాలను పుస్తకం చివర ఉన్న ‘పదవిజ్ఞానం’ పట్టికలో చూసి లేదా నిఘంటువులో చూసి తెలుసుకోండి.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4">
        <div className="text-sm font-bold pr-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          11
        </div>
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
      </div>
      
    </div>
  );
}
