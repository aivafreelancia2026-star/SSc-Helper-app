"use client";

import Image from "next/image";

export function C6HindiChRead4Page1() {
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto bg-white min-h-screen font-sans shadow-lg pb-12 overflow-x-hidden">
      
      {/* Top Header */}
      <div className="p-8 pb-4">
        <div className="flex justify-between items-start mb-6 relative">
          
          <div className="bg-[#dcfce7] rounded-r-3xl py-3 px-8 shadow-sm border-l-4 border-green-600">
             <h1 className="text-3xl md:text-4xl font-bold text-slate-800" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
               हिंद देश के निवासी...
             </h1>
             <p className="text-right text-lg md:text-xl text-slate-700 italic font-semibold mt-1" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
               - विनयचंद्र मौदगल्य
             </p>
          </div>

          <div className="flex flex-col items-center bg-yellow-50 border border-yellow-600 rounded-xl p-2 shadow-sm mr-4">
             <div className="text-3xl">👨‍🎓👩‍🎓</div>
             <div className="bg-white px-3 py-1 rounded-full border border-yellow-600 mt-1">
               <span className="font-bold text-yellow-800 text-sm" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>पढ़ो-आनंद लो</span>
             </div>
          </div>
        </div>

        {/* Poem Container */}
        <div className="w-full flex flex-col border border-yellow-600 rounded-sm overflow-hidden bg-white shadow-md relative">
           
           {/* Top White Section (Stanzas 1 & 2) */}
           <div className="flex flex-col md:flex-row justify-between w-full p-8 md:px-16 bg-white z-10 relative">
             {/* Stanza 1 */}
             <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-yellow-600 flex items-center justify-center font-bold text-yellow-700 text-xl shrink-0 mt-1">1</div>
                <div className="text-xl md:text-2xl text-slate-800 leading-relaxed font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  <p>हिंद देश के निवासी,</p>
                  <p>सभी जन एक हैं।</p>
                  <p>रंग-रूप, वेश-भाषा,</p>
                  <p>चाहे अनेक हैं।।</p>
                </div>
             </div>
             
             {/* Stanza 2 */}
             <div className="flex items-start gap-4 mt-8 md:mt-0">
                <div className="w-8 h-8 rounded-full border border-yellow-600 flex items-center justify-center font-bold text-yellow-700 text-xl shrink-0 mt-1">2</div>
                <div className="text-xl md:text-2xl text-slate-800 leading-relaxed font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  <p>बेला, गुलाब, जूही,</p>
                  <p>चंपा चमेली।</p>
                  <p>प्यारे-प्यारे फूल गूँथे,</p>
                  <p>माला में एक हैं।।</p>
                </div>
             </div>
           </div>

           {/* Middle Tricolor Flag with Map Overlay */}
           <div className="w-full h-80 relative flex flex-col items-center justify-center bg-white overflow-hidden">
             
             {/* The Tricolor Background Strips */}
             <div className="absolute inset-0 flex flex-col w-full h-full">
               <div className="flex-1 bg-[#ea580c]"></div>
               <div className="flex-1 bg-white"></div>
               <div className="flex-1 bg-[#16a34a]"></div>
             </div>

             {/* The Image of India with Faces */}
             <div className="relative z-10 w-full h-full flex items-center justify-center mix-blend-multiply opacity-90 scale-[1.3] md:scale-100">
               <div className="relative w-[350px] h-[350px]">
                 <Image src="/india_map_faces.jpg" alt="India Map with diverse faces" fill className="object-contain" />
               </div>
             </div>
             
           </div>

           {/* Bottom White Section (Stanzas 3 & 4) */}
           <div className="flex flex-col md:flex-row justify-between w-full p-8 md:px-16 bg-white z-10 relative">
             {/* Stanza 3 */}
             <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-yellow-600 flex items-center justify-center font-bold text-yellow-700 text-xl shrink-0 mt-1">3</div>
                <div className="text-xl md:text-2xl text-slate-800 leading-relaxed font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  <p>कोयल की कूक न्यारी,</p>
                  <p>पपीहे की टेर प्यारी।</p>
                  <p>गा रही तराना बुलबुल,</p>
                  <p>राग मगर एक है।।</p>
                </div>
             </div>
             
             {/* Stanza 4 */}
             <div className="flex items-start gap-4 mt-8 md:mt-0">
                <div className="w-8 h-8 rounded-full border border-yellow-600 flex items-center justify-center font-bold text-yellow-700 text-xl shrink-0 mt-1">4</div>
                <div className="text-xl md:text-2xl text-slate-800 leading-relaxed font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                  <p>गंगा, जमुना, ब्रह्मपुत्र,</p>
                  <p>कृष्णा, कावेरी।</p>
                  <p>जाकर मिल गई सागर में,</p>
                  <p>हुई सब एक हैं।।</p>
                </div>
             </div>
           </div>

        </div>
      </div>

      {/* Page Number */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-12 mb-6 px-16 text-slate-500 text-sm font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        <span>छात्रों की प्रगति हेतु संस्कार का उपहार</span>
        <div className="bg-[#e4eed4] text-slate-700 font-bold px-4 py-1 rounded my-4 md:my-0">49</div>
        <span>हिंद देश के निवासी...</span>
      </div>

    </div>
  );
}
