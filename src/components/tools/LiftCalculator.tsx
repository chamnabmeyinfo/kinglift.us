import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../types';
import { useQuoteCart } from '../../context/QuoteCartContext';
import { 
  Calculator, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Truck, 
  Maximize2,
  ShieldAlert,
  Weight
} from 'lucide-react';

interface LiftCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const LiftCalculator: React.FC<LiftCalculatorProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const { addToCart } = useQuoteCart();
  const [loadLbs, setLoadLbs] = useState<number>(3500);
  const [heightInches, setHeightInches] = useState<number>(8);
  const [application, setApplication] = useState<'transport' | 'stacking' | 'aerial' | 'truck-tail'>('transport');
  const [safetyBuffer, setSafetyBuffer] = useState<boolean>(true);

  if (!isOpen) return null;

  const targetCapacityNeeded = safetyBuffer ? Math.round(loadLbs * 1.2) : loadLbs;

  // Matching algorithm
  const matchedProducts = PRODUCTS.filter(p => {
    if (p.specs.ratedCapacityLbs < targetCapacityNeeded) return false;
    if (application === 'stacking' && p.category !== 'hydraulic-stackers') return false;
    if (application === 'aerial' && p.category !== 'scissor-lifts') return false;
    if (application === 'truck-tail' && p.category !== 'tail-lifts') return false;
    if (application === 'transport' && p.category !== 'electric-pallet-trucks') return false;
    return true;
  }).slice(0, 3);

  const recommendations = matchedProducts.length > 0
    ? matchedProducts
    : PRODUCTS.filter(p => p.specs.ratedCapacityLbs >= loadLbs).slice(0, 2);

  // Mast visual height percentage for simulation graphic
  const visualHeightPct = Math.min(Math.max(Math.round((heightInches / 312) * 100), 10), 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-md">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white font-display uppercase tracking-wide">
                KingLift Spec & Capacity Matcher
              </h3>
              <p className="text-[11px] text-slate-400">
                Determine required payload buffer & find the ideal KingLift model.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Step 1: Operation Application */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              1. Primary Lifting Application
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'transport', label: 'Pallet Jack Moving', icon: Truck },
                { id: 'stacking', label: 'Rack Stacking', icon: Layers },
                { id: 'aerial', label: 'Overhead Aerial', icon: Maximize2 },
                { id: 'truck-tail', label: 'Commercial Tailgate', icon: Truck },
              ].map((app) => {
                const Icon = app.icon;
                const isSelected = application === app.id;
                return (
                  <button
                    key={app.id}
                    onClick={() => setApplication(app.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-md shadow-amber-500/10'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="text-xs">{app.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Weight & Height Visual Simulation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Required Load Slider */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 uppercase flex items-center gap-1.5">
                  <Weight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Payload Weight</span>
                </span>
                <span className="text-amber-400 font-mono font-bold text-base">
                  {loadLbs.toLocaleString()} lbs
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="8000"
                step="250"
                value={loadLbs}
                onChange={(e) => setLoadLbs(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>500 lbs</span>
                <span>4,000 lbs</span>
                <span>8,000 lbs</span>
              </div>
            </div>

            {/* Height Slider */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 uppercase flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lift Height Reach</span>
                </span>
                <span className="text-amber-400 font-mono font-bold text-base">
                  {heightInches < 12 ? `${heightInches}" (Ground)` : `${heightInches}" (${(heightInches/12).toFixed(1)} ft)`}
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="320"
                step="6"
                value={heightInches}
                onChange={(e) => setHeightInches(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Ground (8")</span>
                <span>10 ft (120")</span>
                <span>26 ft (312")</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden">
                <div 
                  className="bg-amber-400 h-full transition-all duration-300"
                  style={{ width: `${visualHeightPct}%` }}
                ></div>
              </div>
            </div>

          </div>

          {/* Visual Simulation Mast Graphic */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-white uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>OSHA Dynamic Safety Margin (+20%)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Recommended Minimum Machine Rating: <strong className="text-amber-400 font-mono">{targetCapacityNeeded.toLocaleString()} lbs</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="safety-buffer"
                checked={safetyBuffer}
                onChange={(e) => setSafetyBuffer(e.target.checked)}
                className="w-4 h-4 rounded accent-amber-500"
              />
              <label htmlFor="safety-buffer" className="text-xs text-slate-300 font-semibold cursor-pointer">
                Enforce Buffer
              </label>
            </div>
          </div>

          {/* Matched Machinery Section */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Recommended KingLift Machinery ({recommendations.length} Matches)</span>
            </div>

            {recommendations.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400 space-y-2">
                <ShieldAlert className="w-6 h-6 text-amber-400 mx-auto" />
                <div>No standard model matches this high load. Contact our custom high-tonnage engineering department.</div>
              </div>
            ) : (
              <div className="space-y-3">
                {recommendations.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={prod.images.hero}
                        alt={prod.name}
                        className="w-16 h-16 rounded-xl object-cover bg-slate-900 border border-slate-800 flex-shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-black text-amber-400">{prod.modelNumber}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{prod.series}</span>
                        </div>
                        <div className="text-xs font-bold text-white truncate">{prod.name}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-3 font-mono">
                          <span>Cap: <strong className="text-slate-200">{prod.highlightSpecs.capacity}</strong></span>
                          <span>•</span>
                          <span>Lift: <strong className="text-slate-200">{prod.highlightSpecs.liftHeight}</strong></span>
                          <span>•</span>
                          <span className="text-emerald-400 font-bold">${prod.pricing.startingMSRP.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectProduct(prod);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                      >
                        Specs
                      </button>

                      <button
                        onClick={() => {
                          addToCart(prod, 1);
                          onClose();
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wide shadow-md shadow-amber-500/20"
                      >
                        Add to RFQ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
