import React from 'react';
import { ShieldCheck, Truck, Wrench, FileCheck, Award, Zap } from 'lucide-react';

export const BrandTrust: React.FC = () => {
  const trustPillars = [
    {
      icon: ShieldCheck,
      title: '3 to 5-Year Factory Warranty',
      desc: 'Full powertrain, hydraulic pump, and lithium battery cell coverage with US-based warranty claims.'
    },
    {
      icon: Truck,
      title: '48-Hour US Hub Dispatch',
      desc: 'Inventory stocked in 4 strategic North American distribution centers for fast LTL freight delivery.'
    },
    {
      icon: FileCheck,
      title: 'OSHA & ANSI B56 Certified',
      desc: 'Every machine passes rigorous safety protocols and meets ANSI/ITSDF standards for workplace safety.'
    },
    {
      icon: Wrench,
      title: 'Factory-Direct OEM Spare Parts',
      desc: 'Keep uptime high with overnight replacement wheels, hydraulic seals, and battery modules.'
    },
    {
      icon: Zap,
      title: 'Smart Lithium LiFePO4 Tech',
      desc: 'Zero-maintenance lithium cells with rapid 2-hour opportunity charging that outlasts lead-acid 3x.'
    },
    {
      icon: Award,
      title: 'Dedicated Commercial Accounts',
      desc: 'Volume fleet pricing, custom mast configurations, and direct net-30 invoicing for enterprise buyers.'
    }
  ];

  return (
    <section id="about" className="py-16 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            The KingLift Standard
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-display">
            Built for Zero Downtime. Backed by Brand Direct Support.
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            We engineer our lifting equipment with thicker gauge steel, sealed brushless drive motors, and modular electronics to keep your fleet moving every single shift.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-4 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
