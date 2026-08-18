import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../types';
import { useQuoteCart } from '../../context/QuoteCartContext';
import { 
  X, 
  Check, 
  SlidersHorizontal
} from 'lucide-react';

interface ComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ComparisonModal: React.FC<ComparisonProps> = ({ 
  isOpen, 
  onClose, 
  onSelectProduct 
}) => {
  const { addToCart } = useQuoteCart();
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'kl-ep45li',
    'kl-ep60hd',
    'kl-st35-14'
  ]);

  if (!isOpen) return null;

  const compareProducts = selectedIds
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined);

  const handleToggleProduct = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(prev => prev.filter(item => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds(prev => [...prev, id]);
      } else {
        setSelectedIds(prev => [prev[1], prev[2], id]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col gold-border-pulse"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white font-display uppercase tracking-wide">
                Side-by-Side Machinery Comparison Matrix
              </h3>
              <p className="text-[11px] text-slate-400">
                Compare technical parameters, load limits, turning dimensions, and factory MSRP.
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

        {/* Model Selection Selector Bar */}
        <div className="px-6 py-3 bg-slate-950/90 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto flex-shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 flex-shrink-0">Select Up to 3 Models:</span>
          {PRODUCTS.map((prod) => {
            const isChecked = selectedIds.includes(prod.id);
            return (
              <button
                key={prod.id}
                onClick={() => handleToggleProduct(prod.id)}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                  isChecked
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400/50'
                }`}
              >
                {isChecked && <Check className="w-3.5 h-3.5" />}
                <span>{prod.modelNumber}</span>
              </button>
            );
          })}
        </div>

        {/* Comparison Table Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {compareProducts.map((prod) => (
              <div 
                key={prod.id}
                className="titanium-card rounded-3xl p-5 flex flex-col justify-between space-y-4 border border-slate-800 relative"
              >
                {/* Image & Title */}
                <div className="space-y-3">
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                    <img 
                      src={prod.images.hero} 
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950/90 text-amber-400 font-mono text-xs font-bold border border-slate-700">
                        {prod.modelNumber}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-mono">{prod.series}</div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{prod.name}</h4>
                  </div>
                </div>

                {/* Spec Comparison List */}
                <div className="space-y-2 py-2 border-y border-slate-800/80 font-mono text-xs">
                  
                  <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Rated Capacity:</span>
                    <strong className="text-white font-bold">{prod.specs.ratedCapacityLbs.toLocaleString()} lbs</strong>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Lift Height Reach:</span>
                    <strong className="text-white font-bold">{prod.specs.maxLiftHeightInches}" ({prod.specs.maxLiftHeightMm}mm)</strong>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Powertrain:</span>
                    <strong className="text-amber-400 font-bold truncate max-w-[150px]">{prod.specs.powerSource}</strong>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Turning Aisle Radius:</span>
                    <strong className="text-slate-200">{prod.specs.turningRadiusInches}"</strong>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Chassis Weight:</span>
                    <strong className="text-slate-200">{prod.specs.operatingWeightLbs.toLocaleString()} lbs</strong>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Lead Time:</span>
                    <strong className="text-emerald-400 font-bold">{prod.pricing.leadTimeDays} Days Dispatch</strong>
                  </div>

                </div>

                {/* Pricing & Add */}
                <div className="space-y-3 pt-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Factory MSRP</span>
                    <span className="text-xl font-black text-amber-400 font-mono">${prod.pricing.startingMSRP.toLocaleString()}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProduct(prod);
                      }}
                      className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700"
                    >
                      Deep Specs
                    </button>

                    <button
                      onClick={() => {
                        addToCart(prod, 1);
                        onClose();
                      }}
                      className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md"
                    >
                      Add to RFQ
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
