import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Calculator, 
  Bot, 
  Award 
} from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenCalculator: () => void;
  onOpenAIAdvisor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onOpenCalculator, onOpenAIAdvisor }) => {
  return (
    <div className="relative overflow-hidden bg-slate-950 industrial-grid pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800">
      
      {/* Radial Atmospheric Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute -top-24 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Engineering Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-900/90 light:bg-amber-50 border border-amber-500/30 text-xs font-semibold shadow-lg">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-amber-400 font-mono font-bold tracking-wide uppercase text-[11px]">
                NEXT-GEN 48V LITHIUM MACHINERY
              </span>
              <span className="text-slate-600 dark:text-slate-600 light:text-slate-300">|</span>
              <span className="text-slate-300 dark:text-slate-300 light:text-slate-700 text-[11px] font-medium">Direct US Inventory</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[1.08] font-display">
                Rugged Power. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 drop-shadow-sm">
                  Precision Lifting.
                </span> <br />
                Factory Direct.
              </h1>
              <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-2xl font-normal leading-relaxed pt-2">
                Heavy-duty commercial material handling machinery engineered for North American logistics facilities, distribution warehouses, and manufacturing plants. Zero dealer markups.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreCatalog}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Browse Lineup</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white hover:bg-slate-800 border border-slate-700 dark:border-slate-700 light:border-slate-300 text-white dark:text-white light:text-slate-900 text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <Calculator className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Lift Capacity Matcher</span>
              </button>

              <button
                onClick={onOpenAIAdvisor}
                className="flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <Bot className="w-4 h-4 text-amber-400 animate-pulse flex-shrink-0" />
                <span>AI Spec Advisor</span>
              </button>
            </div>

            {/* Key Trust Signals Bar */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase font-mono">3–5 Year</div>
                  <div className="text-[10px] text-slate-400">Powertrain Warranty</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase font-mono">48-Hr Dispatch</div>
                  <div className="text-[10px] text-slate-400">Chicago & Dallas Hubs</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase font-mono">OSHA & ANSI</div>
                  <div className="text-[10px] text-slate-400">B56.1 Compliant</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Machinery Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative titanium-card rounded-3xl p-6 overflow-hidden gold-border-pulse shadow-2xl">
              
              {/* Top Banner Tag */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-400 font-mono font-bold text-[11px] uppercase">
                  ⭐ FLAGSHIP MODEL
                </span>
                <span className="text-[11px] text-emerald-400 font-mono font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  In Stock (14 Units Ready)
                </span>
              </div>

              {/* Machinery Image Preview */}
              <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 mb-5 group">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
                  alt="KingLift Heavy Pallet Truck"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <div className="font-mono font-black text-amber-400 text-sm">KL-EP45Li</div>
                    <div className="font-bold text-white text-xs">Titan-Pro 4,500 lbs Electric Pallet Jack</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Starting MSRP</div>
                    <div className="font-mono font-black text-amber-300 text-base">$2,850</div>
                  </div>
                </div>
              </div>

              {/* Dynamic Engineering Spec Bar */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs mb-4">
                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 uppercase">Capacity</div>
                  <div className="font-mono font-bold text-white">4,500 lbs</div>
                </div>

                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 uppercase">Lift Height</div>
                  <div className="font-mono font-bold text-white">8.0 in</div>
                </div>

                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 uppercase">Battery</div>
                  <div className="font-mono font-bold text-amber-400">48V Li-Ion</div>
                </div>

                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 uppercase">Lead Time</div>
                  <div className="font-mono font-bold text-emerald-400">3 Days</div>
                </div>
              </div>

              {/* Quick Spec Action */}
              <button
                onClick={onExploreCatalog}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/50 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>View Complete Engineering Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
