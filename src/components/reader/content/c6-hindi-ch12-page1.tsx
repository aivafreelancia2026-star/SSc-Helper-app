"use client";

import Image from "next/image";

export function C6HindiCh12Page1() {
  const topText = [
    "बच्चे मैच देख रहे थे। वे बहुत खुश थे। टीम का कप्तान बोला-",
    "“रमेश अब तुम्हारी बैटिंग है, जीत के लिए और दस रन चाहिए। इसलिए",
    "समझदारी से खेलना। महेश की बॉलिंग में खेलना मुश्किल है। उसने अब तक",
    "चार विकेट लिए हैं।”"
  ];

  const bottomText1 = [
    "रमेश “हाँ-हाँ” कहते हुए खड़ा हो गया। ग्लॉव्ज पहना। बैट पकड़ा और",
    "क्रीस पर पहुँचा।"
  ];

  const bottomText2 = [
    "श्रीनू, वासु, रवि, अली, जानी सब महेश के पास पहुँचे। सब महेश को",
    "कुछ बता रहे थे। महेश ने तेज़ी से बाउंसर गेंद फेंकी। रमेश ने बल्ला घुमाया। और"
  ];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">

      <div className="p-4 md:p-8 pb-4">
        
        {/* Main Interactive Story Area */}
        <div className="w-full relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white mt-4 flex flex-col min-h-[900px]">
           
           {/* Background Image Container */}
           <div className="absolute inset-0 w-full h-full">
             <Image 
               src="/original_page_60.png" 
               alt="Original textbook page 60" 
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
               
               {/* Header Area with Title and QR inside the box for better layout */}
               <div className="flex justify-between items-center mb-6 border-b-2 border-slate-100 pb-4">
                 <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-wide" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                   12. बच्चे चले क्रिकेट खेलने
                 </h1>
                 <div className="flex flex-col items-center bg-white p-1 rounded-lg shadow-sm border border-slate-200">
                    <div className="w-12 h-12 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=L1G5E1')] bg-cover bg-center rounded-sm"></div>
                 </div>
               </div>

               <div className="flex flex-col gap-2 text-left">
                 {topText.map((line, index) => (
                   <p 
                     key={`top-${index}`} 
                     className={`${index === 0 ? "indent-12" : ""} text-xl md:text-2xl lg:text-3xl text-slate-800 font-bold leading-relaxed cursor-pointer hover:text-green-700 transition-colors`}
                     style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                   >
                     {line}
                   </p>
                 ))}
               </div>
             </div>

             {/* Transparent Spacer for Illustration */}
             <div className="flex-1 min-h-[250px] md:min-h-[400px]"></div>

             {/* Bottom Text Box */}
             <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,1)] border border-white/50 mt-auto max-w-4xl mx-auto w-full mb-4">
               
               <div className="flex flex-col gap-6 text-left">
                 <div className="flex flex-col gap-2">
                   {bottomText1.map((line, index) => (
                     <p 
                       key={`bot1-${index}`} 
                       className={`${index === 0 ? "indent-12" : ""} text-xl md:text-2xl lg:text-3xl text-slate-800 font-bold leading-relaxed cursor-pointer hover:text-green-700 transition-colors`}
                       style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                     >
                       {line}
                     </p>
                   ))}
                 </div>
                 <div className="flex flex-col gap-2">
                   {bottomText2.map((line, index) => (
                     <p 
                       key={`bot2-${index}`} 
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
      </div>

      {/* Page Number */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 mb-6 px-16 text-slate-500 text-sm font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        <span>छात्रों की प्रगति हेतु संस्कार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0 text-lg">60</div>
        <span>बच्चे चले क्रिकेट खेलने</span>
      </div>

    </div>
  );
}
