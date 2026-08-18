import React from 'react';
import { 
  Building2, 
  Snowflake, 
  Factory, 
  Truck, 
  HardHat, 
  ArrowRight
} from 'lucide-react';

export const IndustrySectors: React.FC = () => {
  const sectors = [
    {
      icon: Building2,
      title: 'High-Volume 3PL & Fulfillment',
      metric: '400+ Pallets / Shift',
      desc: 'Engineered for relentless 24/7 cross-docking and high-velocity trailer loading with quick opportunity battery swapping.',
      models: 'KL-EP45Li • KL-EP60HD'
    },
    {
      icon: Snowflake,
      title: 'Cold Storage & Food Logistics',
      metric: 'Down to -20°F Rating',
      desc: 'Sub-zero rated synthetic hydraulic oils, sealed IP54 electronic harnesses, and corrosion-resistant baked powder coats.',
      models: 'KL-EP45Li Cold Spec • KL-ST35'
    },
    {
      icon: Factory,
      title: 'Heavy Manufacturing & Foundries',
      metric: '6,000 LBS High Tonnage',
      desc: 'Reinforced 8mm steel forks and structural I-beam masts for heavy steel coils, engine blocks, and raw industrial materials.',
      models: 'KL-EP60HD • KL-ST35-14'
    },
    {
      icon: Truck,
      title: 'Commercial Trucking Fleets',
      metric: '3,300 LBS Tailgate Lift',
      desc: 'Aluminum and steel truck tail lifts for box trucks and semi-trailers, enabling ground delivery anywhere without loading docks.',
      models: 'KL-TL22A • KL-TL33HD'
    },
    {
      icon: HardHat,
      title: 'Facility Maintenance & Aviation',
      metric: '26 FT Working Height',
      desc: 'Zero-emission electric scissor lifts that fit through standard doorways and elevators for lighting, HVAC, and overhead work.',
      models: 'KL-SC19Li • KL-SC26Li'
    }
  ];

  return (
    <section className="py-20 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-widest">
            PROVEN IN HARSH ENVIRONMENTS
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-display">
            Heavy Lifting Solutions Across Key North American Industries
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            From freezing grocery distribution centers to heavy automotive stamping plants, KingLift machinery powers mission-critical supply chains.
          </p>
        </div>

        {/* 5-Column Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                className="titanium-card p-6 rounded-3xl space-y-4 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
                      {sec.metric}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-white font-display uppercase tracking-tight">
                    {sec.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {sec.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-slate-400">Models: <strong className="text-slate-200">{sec.models}</strong></span>
                  <a href="#catalog" className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Configure</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}

          {/* Custom Engineering Build Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-950 border border-amber-500/40 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-lg shadow-amber-500/20">
                ⚙️
              </div>
              <h3 className="text-base font-black text-white font-display uppercase tracking-tight">
                Need Custom High-Tonnage or Special Dimensions?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                KingLift's engineering team designs custom extended fork lengths, explosion-proof electricals, high-lift masts, and automated fleet attachments.
              </p>
            </div>

            <a
              href="#contact"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wide shadow-md transition-all active:scale-95"
            >
              <span>Contact Factory Engineers</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
