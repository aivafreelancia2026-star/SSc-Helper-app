"use client";

import Image from "next/image";

export function C6HindiCh12Page2() {
  const topText1 = [
    "गेंद हवा में। गेंद बाउंड्री लाइन के पार। सबने तालियाँ बजाईं। रमेश का हौंसला",
    "कुछ और बढ़ा। वह अगली गेंद का सामना करने के लिए तैयार था। लेकिन यह",
    "क्या...? गेंद रमेश के पैर पर ही आ लगी। महेश ज़ोर से चिल्लाया- “अम्पायर...!”",
    "अम्पायर ने इशारे से “ना” कहा।"
  ];

  const topText2 = [
    "महेश ने अगली गेंद डाली। रमेश ने बल्ला भी घुमाया। लेकिन गेंद बल्ले पर नहीं",
    "आई। सीधे विकेट पर गई और स्टंप्स उखड़ गए। महेश खुशी से उछल पड़ा।"
  ];

  const bottomText = [
    "अगला बैट्समैन खुद कप्तान विजय था। वह क्रीस पर पहुँचा। उसने",
    "अपनी नज़र आगे-पीछे और दाएँ-बाएँ दौड़ाई। बैटिंग करने के लिए तैयार। तभी",
    "ज़ोरदार बारिश शुरू हुई। बारिश इतनी हुई, इतनी हुई, इतनी हुई कि........."
  ];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">

      <div className="p-4 md:p-8 pb-4">
        
        {/* Main Interactive Story Area */}
        <div className="w-full relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white mt-4 flex flex-col min-h-[900px]">
           
           {/* Background Image Container */}
           <div className="absolute inset-0 w-full h-full">
             <Image 
               src="/original_page_61.png" 
               alt="Original textbook page 61" 
               fill 
               className="object-contain md:object-center drop-shadow-sm"
               priority
             />
             {/* Subtle gradient to ensure text readability */}
             <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-transparent to-white/95"></div>
           </div>

           {/* Text Content Overlay */}
           <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-12">
             
             {/* Top Text Box */}
             <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,1)] border border-white/50 mb-auto mt-4 max-w-4xl mx-auto w-full">
               
               <div className="flex flex-col gap-6 text-left">
                 <div className="flex flex-col gap-2">
                   {topText1.map((line, index) => (
                     <p 
                       key={`top1-${index}`} 
                       className={`${index === 0 ? "indent-12" : ""} text-xl md:text-2xl lg:text-3xl text-slate-800 font-bold leading-relaxed cursor-pointer hover:text-green-700 transition-colors`}
                       style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                     >
                       {line}
                     </p>
                   ))}
                 </div>
                 <div className="flex flex-col gap-2">
                   {topText2.map((line, index) => (
                     <p 
                       key={`top2-${index}`} 
                       className={`${index === 0 ? "indent-12" : ""} text-xl md:text-2xl lg:text-3xl text-slate-800 font-bold leading-relaxed cursor-pointer hover:text-green-700 transition-colors`}
                       style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                     >
                       {line}
                     </p>
                   ))}
                 </div>
               </div>
             </div>

             {/* Transparent Spacer for Illustration */}
             <div className="flex-1 min-h-[250px] md:min-h-[400px]"></div>

             {/* Bottom Text Box */}
             <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,1)] border border-white/50 mt-auto max-w-4xl mx-auto w-full mb-4">
               
               <div className="flex flex-col gap-2 text-left">
                 {bottomText.map((line, index) => (
                   <p 
                     key={`bot-${index}`} 
                     className={`${index === 0 ? "indent-12" : ""} text-xl md:text-2xl lg:text-3xl text-slate-800 font-bold leading-relaxed cursor-pointer hover:text-green-700 transition-colors`}
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
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 mb-6 px-16 text-slate-500 text-sm font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        <span>छात्रों की प्रगति हेतु संस्कार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0 text-lg">61</div>
        <span>बच्चे चले क्रिकेट खेलने</span>
      </div>

    </div>
  );
}
