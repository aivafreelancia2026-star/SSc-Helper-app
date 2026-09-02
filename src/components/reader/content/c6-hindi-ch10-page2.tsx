"use client";

import Image from "next/image";

export function C6HindiCh10Page2() {
  const paragraph1 = [
    "रामू काका आम के पेड़",
    "पर चढ़ गए। डाली ज़ोर से",
    "हिलाने लगे। टप-टप आम गिर",
    "पड़े। बच्चे खुशी से चिल्ला उठे -",
    "“वाह! वाह! कितने सारे आम गिरे",
    "हैं।”"
  ];

  const paragraph2 = [
    "निम्नी ने छप्पर से रस्सी उतारी।",
    "रामू काका ने रस्सी पेड़ की डाली",
    "से बाँध दी। बच्चे झूला झूलने",
    "लगे। चुक्की झूले से गिर",
    "गई और रोने लगी।",
    "जब्बार बोला -",
    "'खेल में चोट तो",
    "लगती ही रहती",
    "है। तुम बहादुर",
    "बच्ची हो। दर्द कम",
    "हो जाएगा।'"
  ];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">

      <div className="p-4 md:p-8 pb-4">

        {/* Main Interactive Story Area */}
        <div className="w-full relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white mt-4 flex flex-col md:flex-row min-h-[800px]">
           
           {/* Background Image Container */}
           <div className="absolute inset-0 w-full h-full">
             <Image 
               src="/original_page_60.png" 
               alt="Original textbook page 60 illustration" 
               fill 
               className="object-contain md:object-right drop-shadow-sm"
               priority
             />
             {/* Subtle gradient to ensure text readability */}
             <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-transparent"></div>
           </div>

           {/* Text Content Overlay (Left Side) */}
           <div className="relative z-10 w-full md:w-1/2 mr-auto flex flex-col justify-center p-6 md:p-12 mt-12 md:mt-0">
             
             <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,1)] border border-white/50">
               
               {/* Paragraph 1 */}
               <div className="flex flex-col gap-2 text-left mb-6">
                 {paragraph1.map((line, index) => (
                   <p 
                     key={`p1-${index}`} 
                     className="text-xl md:text-2xl lg:text-3xl text-slate-800 font-bold leading-relaxed cursor-pointer hover:text-green-700 transition-colors"
                     style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                   >
                     {line}
                   </p>
                 ))}
               </div>

               {/* Paragraph 2 */}
               <div className="flex flex-col gap-2 text-left">
                 {paragraph2.map((line, index) => (
                   <p 
                     key={`p2-${index}`} 
                     className="text-xl md:text-2xl lg:text-3xl text-slate-800 font-bold leading-relaxed cursor-pointer hover:text-green-700 transition-colors"
                     style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                   >
                     {line}
                   </p>
                 ))}
               </div>
               
             </div>

           </div>
           
        </div>

      </div>

      {/* Page Number */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-12 mb-6 px-16 text-slate-500 text-sm font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        <span>छात्रों की प्रगति हेतु संस्कार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0 text-lg">51</div>
        <span>चुक्की और जब्बार</span>
      </div>

    </div>
  );
}
