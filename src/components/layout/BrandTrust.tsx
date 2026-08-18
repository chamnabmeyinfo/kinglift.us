import React from 'react';
import { 
  ShieldCheck, 
  DollarSign, 
  Clock, 
  BatteryCharging, 
  CheckCircle2, 
  MapPin, 
  ArrowRight
} from 'lucide-react';

export const BrandTrust: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      badge: 'SAFETY & COMPLIANCE',
      title: 'OSHA & ANSI B56.1 Certified',
      description: 'Factory rated, inspected, and certified to meet all OSHA 1910.178 and ANSI/ITSDF commercial material handling safety standards.'
    },
    {
      icon: DollarSign,
      badge: 'FACTORY DIRECT SAVINGS',
      title: 'Zero Distributor Markups',
      description: 'Buy proprietary machinery directly from the brand. Save up to 35% compared to multi-tier dealer networks with transparent MSRP pricing.'
    },
    {
      icon: Clock,
      badge: 'NATIONWIDE SERVICE',
      title: '3–5 Year Powertrain Warranty',
      description: 'Supported by 4 central US parts depots (Chicago, Dallas, Atlanta, Ontario CA) with 48-hour emergency component overnighting.'
    },
    {
      icon: BatteryCharging,
      badge: 'NEXT-GEN TECH',
      title: '48V Lithium Fast Charging',
      description: 'Zero maintenance lithium-ion battery technology with 2-hour rapid opportunity charging for continuous multi-shift warehouse uptime.'
    }
  ];

  return (
    <section id="about" className="py-16 bg-slate-950 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-widest">
            THE KINGLIFT STANDARD
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-display">
            Engineered for High-Uptime Commercial Operations
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Every machine is built with heavy-gauge robotic-welded steel chassis, premium European hydraulic pumps, and North American electronics.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="titanium-card p-6 rounded-3xl space-y-4 border border-slate-800/80 hover:border-amber-500/50 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] text-amber-400 font-mono font-bold tracking-wider uppercase">
                    {p.badge}
                  </div>
                  <h3 className="text-base font-black text-white font-display uppercase tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Factory Guaranteed</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* US Logistics Centers Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-display uppercase">
                4 Central North American Warehouses & Parts Hubs
              </div>
              <div className="text-xs text-slate-400">
                Chicago, IL (Central) • Dallas, TX (South) • Atlanta, GA (Southeast) • Ontario, CA (West Coast)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct Commercial Freight</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
