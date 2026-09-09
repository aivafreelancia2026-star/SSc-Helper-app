import Image from "next/image";

export function C8TeluguCh2Page3() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 font-body text-[15px] leading-relaxed text-[#1e1b4b] pt-8 px-4 pb-12" style={{ fontFamily: "'Noto Sans Telugu', sans-serif" }}>
      
      {/* ప్రవేశిక */}
      <div className="px-4">
        <div className="bg-[#e4dbe3] p-8 rounded-sm relative mt-4">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3e3470] text-white px-12 py-1.5 rounded-full font-bold text-lg z-10 shadow-sm">
            ప్రవేశిక
          </div>
          <div className="space-y-4 indent-12 text-justify pt-2 text-[15px] leading-loose">
            <p>
              ప్రయాణం మొదలయ్యింది. ఎక్కడికి పోవాలో తెలవదు. ఎవరిని కలవాలో తెలవదు.
              కాని, ఏదైనా ఎదుర్కొనే ధైర్యం ఉన్నది. జీవితమంటే అన్నీ ఉంటాయి. కండ్ల ముందు ఒకటే
              లక్ష్యం. లక్ష్యసాధనే నా సిద్ధాంతం. ఏదో ఒక దారి దొరుకకపోదు.
            </p>
            <p>
              అనుకున్న విధంగా ఉన్నత విద్య పూర్తి చెయ్యాలి. దేశం కోసం ఏదో ఒకటి చెయ్యాలి.
              ఏం చెయ్యాలి? ఎట్లా చెయ్యాలి? పరి పరి విధాలుగా ఆలోచిస్తున్నది మనసు.
            </p>
            <p>
              ప్రయాణం కొనసాగుతున్నది!
            </p>
            <p>
              అనంతాకాశంలాగా పరుచుకున్న సాగరంలో ఆ ప్రయాణం ఏ తీరం చేరుకున్నది? ఎట్లా
              చేరుకున్నది ..... తెలుసుకుందాం.
            </p>
          </div>
        </div>
      </div>

      {/* Section I & Content */}
      <div className="px-4 flex flex-col items-center pt-4">
        <h2 className="text-3xl font-bold font-serif mb-6 text-[#1e1b4b]">I</h2>
        
        <div className="space-y-6 w-full">
          <p className="indent-12 text-justify text-[16px] leading-[2.2] text-[#4a4a4a]">
            పడవ యునైటెడ్ కింగ్‌డమ్‌కు బయలుదేరింది. రెండవ ప్రపంచ యుద్ధకాలము. యుద్ధం 1939లో
            మొదలయింది. అప్పటి నుండి గ్రేట్ బ్రిటన్‌కు పడవలు తరుచుగా పోవటంలేదు. నేను వెళ్ళినది
            సెప్టెంబర్ 8-1944లో. గ్రేట్ బ్రిటన్‌కు చేరేవరకు ఏవేళ ప్రాణం పోతుందో అనే భయమే. కాబట్టి
            వెళ్ళినప్పుడల్లా ఒక్కొక్క పడవ వెళ్ళేది కాదు. సైన్యపు బందోబస్తులో చాలా నౌకల
            “కాన్వాయి” వెళ్ళేది.
          </p>

          <div className="w-full relative aspect-[48/37] mt-8 overflow-hidden rounded shadow-sm border border-gray-100">
            <Image
              src="/c8-t-ch2-p21-ship.png"
              alt="Ship Illustration"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center pt-8 pb-4">
        <div className="h-2 bg-[#2f2b66] flex-1"></div>
        <div className="bg-[#2f2b66] text-white font-bold px-4 py-1.5 mx-2 text-sm rounded shadow-sm">
          12
        </div>
        <div className="text-sm font-bold pl-2 whitespace-nowrap text-gray-600">
          విద్యార్థుల వికాసానికి ప్రభుత్వ కానుక
        </div>
      </div>
      
    </div>
  );
}
