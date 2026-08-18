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
  Maximize2
} from 'lucide-react';

interface LiftCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const LiftCalculator: React.FC<LiftCalculatorProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const { addToCart } = useQuoteCart();
  const [loadLbs, setLoadLbs] = useState<number>(3000);
  const [heightInches, setHeightInches] = useState<number>(8);
  const [application, setApplication] = useState<'transport' | 'stacking' | 'aerial' | 'truck-tail'>('transport');
  const [safetyBuffer, setSafetyBuffer] = useState<boolean>(true);

  if (!isOpen) return null;

  const targetCapacityNeeded = safetyBuffer ? Math.round(loadLbs * 1.2) : loadLbs;

  // Matching algorithm
  const matchedProducts = PRODUCTS.filter(p => {
    // Check load capacity
    if (p.specs.ratedCapacityLbs < targetCapacityNeeded) return false;

    // Check height
    if (application === 'stacking' && p.category !== 'hydraulic-stackers') return false;
    if (application === 'aerial' && p.category !== 'scissor-lifts') return false;
    if (application === 'truck-tail' && p.category !== 'tail-lifts') return false;
    if (application === 'transport' && p.category !== 'electric-pallet-trucks') return false;

    return true;
  }).slice(0, 3);

  // If strict filter has no match, fallback to closest by capacity
  const recommendations = matchedProducts.length > 0
    ? matchedProducts
    : PRODUCTS.filter(p => p.specs.ratedCapacityLbs >= loadLbs).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white font-display uppercase tracking-wide">
                KingLift Spec & Capacity Matcher
              </h3>
              <p className="text-[11px] text-slate-400">
                Calculate recommended load margin & match the optimal KingLift model.
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
              1. What is your primary lifting operation?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'transport', label: 'Pallet Moving', icon: Truck },
                { id: 'stacking', label: 'Rack Stacking', icon: Layers },
                { id: 'aerial', label: 'Overhead Aerial', icon: Maximize2 },
                { id: 'truck-tail', label: 'Truck Tailgate', icon: Truck },
              ].map((app) => {
                const Icon = app.icon;
                const isSelected = application === app.id;
                return (
                  <button
                    key={app.id}
                    onClick={() => setApplication(app.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="text-xs">{app.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Weight & Height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Required Load Slider */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">Pallet / Payload Weight</span>
                <span className="text-amber-400 font-mono font-bold text-sm">
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
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>500 lbs</span>
                <span>4,000 lbs</span>
                <span>8,000 lbs</span>
              </div>
            </div>

            {/* Height Slider */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">Required Lift Height</span>
                <span className="text-amber-400 font-mono font-bold text-sm">
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
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Ground (8")</span>
                <span>10 ft (120")</span>
                <span>26 ft (312")</span>
              </div>
            </div>

          </div>

          {/* Safety Buffer Checkbox */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="safety-buffer"
                checked={safetyBuffer}
                onChange={(e) => setSafetyBuffer(e.target.checked)}
                className="w-4 h-4 rounded accent-amber-500"
              />
              <label htmlFor="safety-buffer" className="text-xs text-slate-300 cursor-pointer">
                Apply +20% OSHA Dynamic Safety Factor (Recommended Target: <span className="text-amber-400 font-mono font-bold">{targetCapacityNeeded.toLocaleString()} lbs</span>)
              </label>
            </div>
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
          </div>

          {/* Matched Machinery Section */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Recommended KingLift Machinery ({recommendations.length} Matches)</span>
            </div>

            {recommendations.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
                No standard model matches this payload. Contact KingLift engineering for custom high-tonnage builds.
              </div>
            ) : (
              <div className="space-y-3">
                {recommendations.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={prod.images.hero}
                        alt={prod.name}
                        className="w-14 h-14 rounded-lg object-cover bg-slate-900 border border-slate-800 flex-shrink-0"
                      />
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-amber-400">{prod.modelNumber}</span>
                          <span className="text-[10px] text-slate-400">{prod.series}</span>
                        </div>
                        <div className="text-xs font-bold text-white truncate">{prod.name}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-3">
                          <span>Cap: <strong className="text-slate-200">{prod.highlightSpecs.capacity}</strong></span>
                          <span>•</span>
                          <span>Height: <strong className="text-slate-200">{prod.highlightSpecs.liftHeight}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectProduct(prod);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                      >
                        Specs
                      </button>

                      <button
                        onClick={() => {
                          addToCart(prod, 1);
                          onClose();
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
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
