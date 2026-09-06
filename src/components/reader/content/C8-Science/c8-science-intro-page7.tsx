import React from "react";

export function C8ScienceIntroPage7() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      {/* Container simulating the textbook front page look */}
      <div className="rounded-[20px] border-2 border-fuchsia-200 bg-fuchsia-50/40 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-fuchsia-200/60">
          
          {/* Top Left: National Anthem */}
          <div className="space-y-3 pb-6 md:pb-0 md:pr-6">
            <div className="rounded-lg bg-fuchsia-100/80 border border-fuchsia-200 py-1 px-3 text-center shadow-2xs">
              <h2 className="font-heading text-sm font-bold text-fuchsia-900 tracking-wide uppercase">
                NATIONAL ANTHEM
              </h2>
            </div>
            <div className="whitespace-pre-line text-xs font-medium text-foreground/80 leading-loose text-center">
              {`Jana gana mana adhinayaka, jaya he
              Bharata bhagya vidhata.
              Punjab Sindh Gujarat Maratha
              Dravida Utkala Banga
              Vindhya Himachala Yamuna Ganga
              Uchchhala jaladhi taranga.
              Tava shubha name jage,
              Tava shubha asisa mage,
              Gahe tava jaya gatha,
              Jana gana mangaladayaka jaya he
              Bharata bhagya vidhata.
              Jaya he! jaya he! jaya he!
              Jaya jaya jaya, jaya he!`}
            </div>
            <p className="text-right text-xs font-bold text-fuchsia-800 italic pr-2">
              - Rabindranath Tagore
            </p>
          </div>

          {/* Top Right: Vande Mataram */}
          <div className="space-y-3 pt-6 md:pt-0 md:pl-6">
            <div className="rounded-lg bg-fuchsia-100/80 border border-fuchsia-200 py-1 px-3 text-center shadow-2xs">
              <h2 className="font-heading text-sm font-bold text-fuchsia-900 tracking-wide uppercase">
                VANDE MATARAM
              </h2>
            </div>
            <div className="whitespace-pre-line text-xs font-medium text-foreground/80 leading-loose text-center">
              {`Vande Mataram Vande Mataram
              Sujalam, suphalam, malayaja shitalam,
              Shasyashyamalam, Mataram
              Vande Mataram
              Shubhrajyotsna pulakita yaminim,
              Phullakusumita drumadala shobhinim,
              Suhasinim sumadhura bhashinim,
              Sukhadam varadam, Mataram
              Vande Mataram, Vande Mataram`}
            </div>
            <p className="text-right text-xs font-bold text-fuchsia-800 italic pr-2">
              - Bankimchandra Chatterjee
            </p>
          </div>
        </div>

        <div className="border-t border-fuchsia-200/60 my-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-fuchsia-200/60">
          
          {/* Bottom Left: State Song */}
          <div className="space-y-3 pb-6 md:pb-0 md:pr-6">
            <div className="rounded-lg bg-fuchsia-100/80 border border-fuchsia-200 py-1 px-3 text-center shadow-2xs">
              <h2 className="font-heading text-sm font-bold text-fuchsia-900 tracking-wide uppercase">
                STATE SONG
              </h2>
            </div>
            <div className="whitespace-pre-line text-[11px] font-medium text-foreground/80 leading-relaxed text-center">
              {`Jaya jayahe Telangana jananee jayakethanam
              Mukkoti gonthukalu okkataina chethanam
              Tharatharaala charithagala thallee neerajanam
              Padapadaana nee pillalu pranamillina shubha tharunam
              Jai Telangana Jai Jai Telangana
              Jai Telangana Jai Jai Telangana

              Jaanapada janajeevana jaavalilo jaaluvaara
              Kavi gaayaka vaithaalika kalaloe manjeeraalu
              Jaathini jagruthuparache geethaala jana jaathara
              Anunithyam nee gaanam amma neeve maa praanam
              Jai Telangana Jai Jai Telangana
              Jai Telangana Jai Jai Telangana

              Godavari krishnammalu thallee ninu thadupangaa
              Pachchani maa nelallo pasidi sirulu pandanga
              Sukhashanthula Telangana subhikshanga undaale
              Prathidinamadi Telangana prajala kalalu pandaali
              Jai Telangana Jai Jai Telangana
              Jai Telangana Jai Jai Telangana`}
            </div>
            <p className="text-right text-xs font-bold text-fuchsia-800 italic pr-2 mt-2">
              - Andhe Sri
            </p>
          </div>

          {/* Bottom Right: Pledge */}
          <div className="space-y-3 pt-6 md:pt-0 md:pl-6">
            <div className="rounded-lg bg-fuchsia-100/80 border border-fuchsia-200 py-1 px-3 text-center shadow-2xs">
              <h2 className="font-heading text-sm font-bold text-fuchsia-900 tracking-wide uppercase">
                PLEDGE
              </h2>
            </div>
            <div className="text-xs font-medium text-foreground/80 leading-loose text-justify px-2 space-y-2">
              <p>
                &ldquo;India is my country; all Indians are my brothers and sisters.
              </p>
              <p>
                I love my country, and I am proud of its rich and varied heritage. I shall always strive to be worthy of it.
              </p>
              <p>
                I shall give my parents, teachers and all elders respect, and treat everyone with courtesy. I shall be kind to animals.
              </p>
              <p>
                To my country and my people, I pledge my devotion. In their well-being and prosperity alone, lies my happiness.&rdquo;
              </p>
            </div>
            <p className="text-right text-xs font-bold text-fuchsia-800 italic pr-2">
              - Pydimarri Venkata Subba Rao
            </p>
          </div>
        </div>
      </div>

      {/* Textbook Footer */}
      <div className="flex justify-between items-center text-xs text-foreground/50 border-t border-border/40 pt-3">
        <span className="font-semibold">v</span>
        <span>Government&apos;s Gift for students&apos; progress</span>
      </div>
    </div>
  );
}
