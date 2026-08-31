import { FigureNote } from "@/components/reader/figure-note";

// Book page 120 (PDF/app P129) — Section I: introduces the four
// characters (grandparents Annamma & Narsayya, grandchildren Gopal &
// Lakshmi) and opens their conversation about monkeys raiding homes
// because their forest habitat is being destroyed.
export function C6TeluguCh12Page3() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      <section className="rounded-sm border border-[#8b7a58] bg-white">
        <h3 className="bg-[#765f31] px-5 py-2 text-lg font-bold text-white">I</h3>
        <div className="space-y-1 px-5 pt-4 text-xs font-semibold text-foreground/60">
          <p>పాఠంలోని పాత్రలు: అన్నమ్మ (అమ్మమ్మ), నర్సయ్య (తాత), గోపాల్ (మనుమడు), లక్ష్మి (మనుమరాలు)</p>
        </div>
        <p className="px-5 py-4">
          ఇంటిపైకప్పు మీద కోతులు కుండలు విసిరేస్తుండటం చూసి పిల్లలు ఆశ్చర్యపోతారు. తాత నర్సయ్య
          వాళ్ళకు కారణం చెప్తాడు — అడవులు నరికేయడం వల్ల అడవి జంతువులకు ఆవాసం లేకుండా పోయి, అవి
          మనుషుల ఊళ్లలోకి వచ్చేస్తున్నాయని వివరిస్తాడు.
        </p>
      </section>

      <FigureNote emoji="🐒🏠🫙🌳" caption="పెంకుటింటి పైకప్పుమీద కుండలు విసురుతున్న కోతులు, చెట్టుకొమ్మపై ఊగుతున్న మరో కోతి" />
    </div>
  );
}
