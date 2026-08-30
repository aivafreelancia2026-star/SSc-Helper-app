export function C6ScienceCh16Page17() {
  return (
    <div className="w-full space-y-6 font-body text-sm leading-relaxed text-foreground/90">
      
      {/* Learning Outcomes Header Block */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-double border-emerald-400 bg-gradient-to-r from-emerald-500/10 via-emerald-600/5 to-emerald-500/10 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="font-heading text-xl font-extrabold tracking-tight text-emerald-950">
              Learning Outcomes
            </h1>
            <p className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
              SCIENCE — CLASS 6
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white/80 border border-emerald-100 rounded-2xl p-3 shadow-xs">
            <img
              src="/assets/images/C6-science/ch16_learning_outcomes.png"
              alt="Class 6 Science learning Outcomes badge"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-[10px] text-emerald-900 font-bold leading-tight uppercase tracking-wider">
              Class 6<br />Science
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-emerald-900">
            The learner....
          </h2>
          <ul className="space-y-3">
            <li className="flex gap-2 text-xs">
              <span className="text-emerald-600 font-bold text-base leading-none">•</span>
              <span><strong>Identifies</strong> materials and organisms, such as plant fibres, flowers, on the basis of observable features i.e., appearance, texture, function, aroma, etc.</span>
            </li>
            <li className="flex gap-2 text-xs">
              <span className="text-emerald-600 font-bold text-base leading-none">•</span>
              <span><strong>Differentiates</strong> materials and organisms, such as tap and fibrous roots, electrical conductors and insulators, on the basis of their properties, structure and functions.</span>
            </li>
            <li className="flex gap-2 text-xs">
              <span className="text-emerald-600 font-bold text-base leading-none">•</span>
              <span><strong>Classifies</strong> materials, organisms and process based on observable properties e.g. materials as soluble, insoluble transparent, translucent and opaque; of habitat as biotic and abiotic.</span>
            </li>
            <li className="flex gap-2 text-xs">
              <span className="text-emerald-600 font-bold text-base leading-none">•</span>
              <span><strong>Conducts</strong> simple investigations to seek answers to queries, e.g., what are the does a freely suspended magnet align in a particular direction?</span>
            </li>
            <li className="flex gap-2 text-xs">
              <span className="text-emerald-600 font-bold text-base leading-none">•</span>
              <span><strong>Relates</strong> process and phenomenon with causes, e.g., deficiency diseases with diet adaptations of animals and plants with their habitats.</span>
            </li>
            <li className="flex gap-2 text-xs">
              <span className="text-emerald-600 font-bold text-base leading-none">•</span>
              <span><strong>Explains</strong> processes and phenomenon, e.g. processing of plant fibres movement in plants and animals; formation of shadows reflection of light from plane mirror.</span>
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
          <ul className="space-y-3">
            <li className="flex gap-2 text-xs">
              <span className="text-emerald-600 font-bold text-base leading-none">•</span>
              <span><strong>Measures</strong> physical quantities and express in SI units e.g. length, mass, temperature etc.</span>
            </li>
            <li className="flex gap-2 text-xs">
              <span className="text-emerald-600 font-bold text-base leading-none">•</span>
              <span><strong>Draws</strong> labelled diagrams / flow charts of organisms and processes e.g., parts of flower, joints, filtration, water cycle etc.</span>
            </li>
            <li className="flex gap-2 text-xs">
              <span className="text-emerald-600 font-bold text-base leading-none">•</span>
              <span><strong>Constructs</strong> model using materials from surroundings and explains their working e.g., pinhole camera, periscope, electric torch etc.</span>
            </li>
            <li className="flex gap-2 text-xs">
              <span className="text-emerald-600 font-bold text-base leading-none">•</span>
              <span><strong>Applies</strong> learning of scientific concepts in day-to-day life e.g., selecting food items for a balanced diet separating materials selecting season appropriate fabrics; using compass needle for finding directions; suggesting ways to cope with heaving rain/drought etc.</span>
            </li>
            <li className="flex gap-2 text-xs">
              <span className="text-emerald-600 font-bold text-base leading-none">•</span>
              <span><strong>Makes efforts</strong> to protect environment, e.g., minimising wastage of food, water, electricity and generation of waste, spreading awareness for rain water harvesting; care for plants etc.</span>
            </li>
            <li className="flex gap-2 text-xs">
              <span className="text-emerald-600 font-bold text-base leading-none">•</span>
              <span><strong>Exhibits</strong> value of honest, objectivity, cooperation, freedom from fear and prejudices.</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
