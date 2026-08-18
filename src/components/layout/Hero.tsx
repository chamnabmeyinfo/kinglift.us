import React from 'react';
import { ArrowRight, Zap, Truck, CheckCircle2, FileSpreadsheet } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenCalculator: () => void;
  onOpenAIAdvisor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onOpenCalculator }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800">
      {/* Background Subtle Industrial Accents */}
      <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none"></div>
      <div className="absolute -top-40 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value & CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Direct Brand Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="text-amber-400 font-bold uppercase tracking-wider">KingLift™ US Direct</span>
              <span className="text-slate-500">•</span>
              <span>Zero Middleman Markups</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.1] uppercase font-display">
              Heavy Power. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                Lithium Electric
              </span> Precision.
            </h1>

            {/* Sub-copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Equip your warehouse, logistics fleet, and job sites with KingLift's proprietary line of heavy-duty electric pallet trucks, scissor lifts, walkie stackers, and hydraulic tail lifts. Factory direct from North American distribution centers.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>OSHA & ANSI Certified</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
                <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>48V Fast-Charge LiFePO4</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
                <Truck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>48-Hour US Dispatch</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExploreCatalog}
                className="flex items-center gap-2 px-7 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>EXPLORE MACHINERY CATALOG</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition-all hover:border-slate-600"
              >
                <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                <span>Spec & Lift Calculator</span>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Machine Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 shadow-2xl overflow-hidden group">
              
              {/* Highlight ribbon */}
              <div className="absolute top-4 right-4 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                BESTSELLER MODEL
              </div>

              {/* Machine Hero Visual */}
              <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-slate-950/80 mb-5 border border-slate-800/80">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80"
                  alt="KingLift KL-EP45Li Electric Pallet Jack"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                
                {/* Floating Model Badge */}
                <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-sm border border-slate-700 px-3 py-1 rounded-md text-xs font-mono text-amber-400 font-bold">
                  MODEL: KL-EP45Li
                </div>
              </div>

              {/* Card Meta */}
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-black text-white font-display">
                    KingLift Pro-Lithium 4,500 lbs
                  </h3>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Starting MSRP</div>
                    <div className="text-lg font-black text-amber-400 font-mono">$2,850</div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2">
                  Ultracompact 48V Lithium-Ion walkie pallet jack built for high-throughput logistics and 53ft trailer staging.
                </p>

                {/* Quick specs grid */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center">
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-medium">Capacity</div>
                    <div className="text-xs font-black text-white font-mono">4,500 lbs</div>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-medium">Power</div>
                    <div className="text-xs font-black text-amber-400 font-mono">48V Li-Ion</div>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-medium">Turn Radius</div>
                    <div className="text-xs font-black text-white font-mono">53.5 in</div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onExploreCatalog}
                    className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Specifications & Direct Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
