import { TipBox } from "@/components/reader/tip-box";

export function C6ScienceCh10Page2() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>Can you find answers to these questions? Discuss with your friends and think of the answers.</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-indigo-800 pt-2">
            10.1. Changes Around Us
          </h2>
          <p>
            In our daily life we notice many changes around us. These include the changes from time to
            time, in the crops growing in the fields fall of leaves, the growth of fresh leaves on trees,
            change in the colour of the sky, change in colour of leaves of trees etc. Flowers bloom and
            then wither away. Apart from this we notice some changes in our body like increase in length
            of nails and hair, increase or decrease in weight, and increase in height etc.
          </p>
          <p>
            Of all the changes we observe in our daily life, we are able to find out reasons for some
            of them. For other changes, we are not able to find reasons. To explain about any change
            we observed or noticed, we need to ask the following questions:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What has changed?</li>
            <li>How do we know that change has taken place?</li>
            <li>What are the possible reasons for that change?</li>
            <li>Which seems to be the most appropriate reason?</li>
            <li>How would we check if the reason is correct?</li>
          </ul>
          <p>Let us discuss certain changes in detail.</p>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-indigo-100 pt-6 md:pt-0 md:pl-8">
          <h2 className="font-heading text-base font-bold text-indigo-800">
            10.2. Changing of milk into curd
          </h2>
          <p>
            We know that curd is prepared from milk. Curd is prepared in almost every house. It is a
            common experience!
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80 font-medium">
            <li>Do you know how milk can be converted into curd?</li>
          </ul>
          <p>
            Generally curd is prepared by adding a very small quantity of curd (sample curd) to the
            bowl containing lukewarm milk. Then the bowl containing milk with the sample curd is
            covered by a lid and kept still and undisturbed. We notice that the milk turns into curd after
            few hours.
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-foreground/80">
            <li>What changes do you see when milk is converted into curd?</li>
            <li>How do you know that milk is changed into curd?</li>
            <li>Is there any change in the state of the milk?</li>
            <li>Is there any change in its volume?</li>
            <li>Is there any change in the weight of the milk?</li>
          </ul>

          <h2 className="font-heading text-base font-bold text-indigo-805 pt-2">
            Activity-1: Comparing milk and curd
          </h2>
          <p>
            Take some milk in a bowl and some curd in another bowl, compare the colour of the milk and
            curd carefully.
          </p>
          <p>
            What do you notice? You may notice that there is slight difference in colour from milk to
            curd.
          </p>
          <p>
            Now take some milk and curd in separate tea spoons and taste them.
          </p>
          <p>
            Do you find any difference in the taste of milk and curd?
          </p>
        </div>

      </div>

      {/* Tip Box spanning full-width */}
      <div className="pt-4 border-t border-indigo-100">
        <TipBox>The change of state from gas to liquid is called condensation.</TipBox>
      </div>
    </div>
  );
}
