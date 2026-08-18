import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Leaf,
  Clock,
  Layers
} from 'lucide-react';

export const TCOCalculator: React.FC = () => {
  const [fleetSize, setFleetSize] = useState<number>(4);
  const [hoursPerDay, setHoursPerDay] = useState<number>(10);

  // Economic calculations
  // Traditional Lead-Acid/Propane:
  // Propane/Battery watering maintenance: ~$1,800/unit/yr
  // Battery replacement every 3 yrs: ~$2,500/unit ($833/yr)
  // Electricity / Fuel efficiency loss: ~$1,200/unit/yr
  // Total Traditional Cost/unit/yr: ~$3,833/yr
  
  // KingLift 48V Lithium:
  // Electric consumption: ~$450/unit/yr
  // Maintenance: ~$150/unit/yr (zero watering, zero acid spill kits)
  // Total KingLift Cost/unit/yr: ~$600/yr

  const annualSavingsPerUnit = Math.round((3833 - 600) * (hoursPerDay / 8));
  const totalAnnualSavings = annualSavingsPerUnit * fleetSize;
  const fiveYearSavings = totalAnnualSavings * 5;
  const co2AvoidedTons = Math.round(fleetSize * hoursPerDay * 0.42);

  return (
    <section className="py-20 bg-slate-950 border-b border-slate-800 relative overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>TOTAL COST OF OWNERSHIP (TCO) ROI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-display">
              Calculate Your Fleet Savings with 48V Lithium
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              Replacing legacy lead-acid batteries and propane engines with KingLift Lithium-Ion eliminates acid watering, battery changeouts, and fuel surges.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 p-3 rounded-2xl border border-emerald-500/30">
            <Leaf className="w-4 h-4" />
            <span>Estimated {co2AvoidedTons} Tons CO₂ Avoided Annually</span>
          </div>
        </div>

        {/* Interactive Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders Control Column (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Slider 1: Fleet Size */}
            <div className="titanium-card p-6 rounded-3xl space-y-3 border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white uppercase flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Number of Material Handling Units</span>
                </span>
                <span className="text-amber-400 font-mono font-black text-base">{fleetSize} Machines</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={fleetSize}
                onChange={(e) => setFleetSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 Unit (Small Shop)</span>
                <span>10 Units</span>
                <span>25+ Units (Full Hub)</span>
              </div>
            </div>

            {/* Slider 2: Daily Operating Hours */}
            <div className="titanium-card p-6 rounded-3xl space-y-3 border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white uppercase flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Average Daily Shift Duration</span>
                </span>
                <span className="text-amber-400 font-mono font-black text-base">{hoursPerDay} Hours / Day</span>
              </div>
              <input
                type="range"
                min="4"
                max="24"
                step="2"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>4 Hrs (Single Shift)</span>
                <span>12 Hrs (Double Shift)</span>
                <span>24 Hrs (Continuous 24/7)</span>
              </div>
            </div>

          </div>

          {/* Results Summary Box (6 cols) */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-2xl space-y-6 relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-400 font-mono">Projected ROI Calculation</div>
                  <div className="text-base font-black text-white font-display uppercase">KingLift Lithium Fleet Economics</div>
                </div>
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>

              {/* Big Numbers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Annual Fleet Savings</div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">
                    ${totalAnnualSavings.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500">Per year saved in maintenance & fuel</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">5-Year Cumulative ROI</div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">
                    ${fiveYearSavings.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500">5-year total operational advantage</div>
                </div>
              </div>

              {/* 3 Value Pillars */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Zero Battery Watering & Acid Maintenance</span>
                  </span>
                  <strong className="text-emerald-400 font-mono">-$2,200/yr saved</strong>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Opportunity Fast Charging (Zero Battery Swapping Room)</span>
                  </span>
                  <strong className="text-emerald-400 font-mono">+100% Uptime</strong>
                </div>
              </div>

              {/* CTA Action */}
              <a
                href="#catalog"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Browse 48V Lithium Models</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </a>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
