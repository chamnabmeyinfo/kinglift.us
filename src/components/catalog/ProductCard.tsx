import React, { useState } from 'react';
import type { Product } from '../../types';
import { useQuoteCart } from '../../context/QuoteCartContext';
import { 
  Plus, 
  Check, 
  Shield, 
  Sparkles, 
  Weight, 
  ArrowUpRight
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart, items } = useQuoteCart();
  const [showMetric, setShowMetric] = useState(false);
  const isInCart = items.some(item => item.product.id === product.id);

  // Capacity calculation for visual gauge bar (relative to 10,000 lbs scale)
  const capacityPercent = Math.min(Math.round((product.specs.ratedCapacityLbs / 8000) * 100), 100);

  const displayCapacity = showMetric 
    ? `${product.specs.ratedCapacityKg.toLocaleString()} kg`
    : `${product.specs.ratedCapacityLbs.toLocaleString()} lbs`;

  const displayHeight = showMetric
    ? `${product.specs.maxLiftHeightMm} mm`
    : `${product.specs.maxLiftHeightInches} in`;

  return (
    <div className="group rounded-3xl titanium-card flex flex-col overflow-hidden transition-all duration-300 relative border border-slate-800 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10">
      
      {/* Product Image & Top Badges */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-950/90 border-b border-slate-800/80">
        <img
          src={product.images.hero}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90"></div>

        {/* Top Badges Left */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
          <span className="px-3 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md border border-slate-700 text-amber-400 font-mono text-xs font-black tracking-wider shadow-md">
            {product.modelNumber}
          </span>
          {product.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3 h-3" />
              Flagship Series
            </span>
          )}
        </div>

        {/* In-Stock & Unit Switcher Top Right */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMetric(!showMetric);
            }}
            title="Toggle Imperial / Metric units"
            className="px-2 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-amber-400 text-[10px] font-mono font-bold transition-colors shadow-sm"
          >
            {showMetric ? 'METRIC (KG)' : 'IMP (LBS)'}
          </button>

          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md ${
            product.inStock 
              ? 'bg-emerald-950/90 border border-emerald-500/50 text-emerald-400' 
              : 'bg-slate-900/90 border border-slate-700 text-slate-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`}></span>
            {product.inStock ? 'Ready To Ship' : 'Special Order'}
          </span>
        </div>

        {/* Series Badge & Model Tagline Over Bottom Image */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-xs">
          <span className="text-[11px] font-semibold text-slate-300 tracking-wide uppercase font-mono">
            {product.series}
          </span>
          <span className="text-[11px] text-amber-400 font-mono font-bold">
            Lead Time: {product.pricing.leadTimeDays} Days
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Name & Tagline */}
        <div className="space-y-1.5">
          <h3 
            onClick={() => onViewDetails(product)}
            className="text-base font-black text-white group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1 font-display uppercase tracking-tight"
          >
            {product.name}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-normal">
            {product.tagline}
          </p>
        </div>

        {/* Load Capacity Power Meter Gauge */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-mono">
            <span className="text-slate-400 uppercase font-semibold flex items-center gap-1">
              <Weight className="w-3 h-3 text-amber-400" />
              <span>Rated Payload Capacity</span>
            </span>
            <strong className="text-white font-bold">{displayCapacity}</strong>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${capacityPercent}%` }}
            ></div>
          </div>
        </div>

        {/* 3-Col Key Engineering Matrix */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-medium">Lift Height</div>
            <div className="text-xs font-black text-white font-mono">{displayHeight}</div>
          </div>

          <div className="border-x border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-medium">Powertrain</div>
            <div className="text-xs font-black text-amber-400 font-mono truncate px-1">
              {product.specs.powerSource.replace('Lithium-Ion', 'Li-Ion')}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400 uppercase font-medium">Warranty</div>
            <div className="text-xs font-black text-emerald-400 font-mono">
              {product.specs.warrantyMonths} Mos
            </div>
          </div>
        </div>

        {/* Pricing & Guarantee Strip */}
        <div className="flex items-end justify-between pt-1 border-t border-slate-800/80">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Direct Factory MSRP</div>
            <div className="text-xl font-black text-amber-400 font-mono tracking-tight">
              ${product.pricing.startingMSRP.toLocaleString()}
            </div>
          </div>

          <div className="text-right text-[11px] text-slate-400 flex items-center gap-1 font-mono">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>OSHA Certified</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onViewDetails(product)}
            className="flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-[11px] font-bold transition-all border border-slate-700/80 hover:border-slate-600 cursor-pointer shadow-sm whitespace-nowrap"
          >
            <span>Full Specs</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          </button>

          <button
            onClick={() => addToCart(product, 1)}
            className={`flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              isInCart
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 active:scale-95'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>In RFQ Cart</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Add to RFQ</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
