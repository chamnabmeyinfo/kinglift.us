import React, { useState } from 'react';
import { 
  Weight, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2,
  Maximize2,
  Wrench,
  Flame
} from 'lucide-react';

interface HeavyShowcaseProps {
  onSelectProduct: (productId: string) => void;
  onOpenCalculator: () => void;
}

export const HeavyMachineryShowcase: React.FC<HeavyShowcaseProps> = ({ onSelectProduct, onOpenCalculator }) => {
  const [activeClass, setActiveClass] = useState<'4500' | '6000' | '3500' | 'scissor'>('4500');

  const classes = {
    '4500': {
      model: 'KL-EP45Li',
      name: 'Titan-Pro 4,500 lbs Electric Pallet Jack',
      capacity: '4,500 lbs (2,041 kg)',
      reach: '8.0" Lift Height',
      power: '48V / 30Ah Lithium-Ion',
      turnRadius: '56.7" Tight Turning Aisle',
      chassis: '5.5mm Heavy Stamped Steel Plate',
      hydraulic: 'Bucher High-Pressure Hydraulic Pump',
      leadTime: '3-Day Dispatch',
      price: '$2,850',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      description: 'Engineered for high-volume cross-docking and trailer loading. Built with brushless AC drive motor and dual butterfly speed throttles for maximum ergonomic control.'
    },
    '6000': {
      model: 'KL-EP60HD',
      name: 'Hercules 6,000 lbs Heavy-Duty Pallet Truck',
      capacity: '6,000 lbs (2,721 kg)',
      reach: '8.0" Lift Height',
      power: '48V / 60Ah High-Output Lithium',
      turnRadius: '62.0" Warehouse Aisle',
      chassis: '8.0mm Reinforced Robot-Welded Steel',
      hydraulic: 'Twin-Cylinder Industrial Lift Unit',
      leadTime: '5-Day Dispatch',
      price: '$4,200',
      image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
      description: 'Maximum tonnage capacity for steel fabrication plants, beverage distribution, and heavy manufacturing. Extreme duty cycle with spring-loaded caster wheels.'
    },
    '3500': {
      model: 'KL-ST35-14',
      name: 'StraddlePro 3,500 lbs Electric Walkie Stacker',
      capacity: '3,500 lbs (1,588 kg)',
      reach: '14.0 ft (168") Mast Reach',
      power: '48V / 100Ah Industrial Lithium',
      turnRadius: '59.0" Narrow Aisle Radius',
      chassis: 'Heavy Duplex I-Beam Mast Steel',
      hydraulic: 'Electro-Proportional Lift Valves',
      leadTime: '7-Day Dispatch',
      price: '$7,850',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
      description: 'Replaces expensive sit-down forklifts in narrow racking aisles. Features adjustable straddle outriggers for both standard 40x48" GMA pallets and Euro pallets.'
    },
    'scissor': {
      model: 'KL-SC19Li',
      name: 'SkyTitan 19ft Compact Lithium Scissor Lift',
      capacity: '500 lbs Platform (2-Person + Tools)',
      reach: '19.0 ft (25ft Working Height)',
      power: '24V / 120Ah LiFePO4 Pack',
      turnRadius: 'Zero Inside Turning Radius',
      chassis: 'All-Steel Scissor Stack & Deck',
      hydraulic: 'Dual Front-Wheel Hydraulic Drive',
      leadTime: '5-Day Dispatch',
      price: '$9,200',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      description: 'Zero-emission indoor aerial maintenance workhorse. Fits through standard 32" commercial doorways and passenger elevators. Full drive height capability.'
    }
  };

  const current = classes[activeClass];

  return (
    <section className="py-20 bg-slate-950 industrial-grid border-b border-slate-800 relative overflow-hidden">
      
      {/* Heavy Steel Ambient Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
        
        {/* Section Header with Industrial Strength Theme */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono font-black uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>HEAVY INDUSTRIAL ENGINEERING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-display">
              Built for Extreme Tonnage & 24/7 Shifts
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              Every KingLift chassis is engineered with high-strength structural steel, heavy-duty European hydraulics, and automotive-grade 48V lithium powertrains.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCalculator}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Weight className="w-4 h-4 text-amber-400" />
              <span>Calculate Required Tonnage</span>
            </button>
          </div>
        </div>

        {/* Tonnage Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: '4500', label: '4,500 LBS CLASS', sub: 'Electric Pallet Jack', tag: 'High Volume' },
            { id: '6000', label: '6,000 LBS CLASS', sub: 'Extreme Duty Truck', tag: 'Heavy Freight' },
            { id: '3500', label: '3,500 LBS STACKER', sub: '14ft High-Bay Reach', tag: 'Narrow Aisle' },
            { id: 'scissor', label: '19FT SCISSOR LIFT', sub: 'Overhead Aerial', tag: 'Zero Emission' },
          ].map((tab) => {
            const isSelected = activeClass === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveClass(tab.id as any)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-amber-400 text-white shadow-xl shadow-amber-500/10'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500"></div>
                )}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`font-mono text-xs font-black tracking-wide ${isSelected ? 'text-amber-400' : 'text-slate-300'}`}>
                    {tab.label}
                  </span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 font-mono">
                    {tab.tag}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium truncate">
                  {tab.sub}
                </div>
              </button>
            );
          })}
        </div>

        {/* Heavy Showcase Spotlight Card */}
        <div className="titanium-card p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Machinery Spec Deep-Dive */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono text-xs font-black">
                    {current.model}
                  </span>
                  <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Direct US Inventory ({current.leadTime})
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight">
                  {current.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {current.description}
                </p>
              </div>

              {/* 4-Grid Toughness Engineering Matrix */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
                    <Weight className="w-3.5 h-3.5 text-amber-400" />
                    <span>Rated Capacity</span>
                  </div>
                  <div className="text-xs sm:text-sm font-black text-white font-mono">{current.capacity}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Elevation Reach</span>
                  </div>
                  <div className="text-xs sm:text-sm font-black text-white font-mono">{current.reach}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Powertrain System</span>
                  </div>
                  <div className="text-xs sm:text-sm font-black text-amber-400 font-mono truncate">{current.power}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-amber-400" />
                    <span>Chassis Steel</span>
                  </div>
                  <div className="text-xs sm:text-sm font-black text-slate-200 font-mono truncate">{current.chassis}</div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Direct Factory MSRP</div>
                  <div className="text-2xl font-black text-amber-400 font-mono">{current.price}</div>
                </div>

                <button
                  onClick={() => onSelectProduct(current.model)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Inspect Engineering Blueprint</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right: High-Resolution Industrial Photo Showcase */}
            <div className="lg:col-span-6">
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                
                {/* Heavy Duty Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-700/80">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white uppercase font-mono">ANSI B56.1 Certified</span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 font-bold">5-Year Structural Frame</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Heavy-Duty Engineering Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-mono font-black text-sm">01 / ROBOTIC WELDS</div>
            <div className="text-xs font-bold text-white uppercase font-display">6mm High-Tensile Steel</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">Laser cut and robotic pulse-welded chassis prevents fork sagging under continuous full capacity loading.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-mono font-black text-sm">02 / EUROPEAN HYDRAULICS</div>
            <div className="text-xs font-bold text-white uppercase font-display">Bucher Power Units</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">Quiet, high-pressure Swiss/German hydraulic pumps with integrated overload relief and lowering speed valves.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-mono font-black text-sm">03 / CAN-BUS LITHIUM</div>
            <div className="text-xs font-bold text-white uppercase font-display">3,000+ Full Charge Cycles</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">Zero-maintenance LiFePO4 chemistry with smart battery management system and 2-hour rapid opportunity charging.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-mono font-black text-sm">04 / REGENERATIVE BRAKING</div>
            <div className="text-xs font-bold text-white uppercase font-display">Electromagnetic Safety</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">Automatic slope hill-hold holding brake prevents rollback on warehouse dock ramps and trailer lips.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
