import React from 'react';
import type { Product } from '../../types';
import { useQuoteCart } from '../../context/QuoteCartContext';
import { Plus, Check, Eye, Shield, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart, items } = useQuoteCart();
  const isInCart = items.some(item => item.product.id === product.id);

  return (
    <div className="group rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Product Image & Top Badges */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-950/80 border-b border-slate-800/80">
        <img
          src={product.images.hero}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>

        {/* Model ID Ribbon */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className="px-2.5 py-1 rounded bg-slate-950/90 backdrop-blur-md border border-slate-700 text-amber-400 font-mono text-xs font-bold tracking-wider">
            {product.modelNumber}
          </span>
          {product.featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        {/* In-Stock Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            In Stock
          </span>
        </div>

        {/* Series label over image bottom */}
        <div className="absolute bottom-2.5 left-3 text-[11px] text-slate-300 font-medium tracking-wide">
          {product.series}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Name & Tagline */}
        <div className="space-y-1.5">
          <h3 
            onClick={() => onViewDetails(product)}
            className="text-base font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1 font-display"
          >
            {product.name}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Highlight Spec Matrix */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-medium">Capacity</div>
            <div className="text-xs font-black text-white font-mono">{product.highlightSpecs.capacity}</div>
          </div>
          <div className="border-x border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-medium">Lift Height</div>
            <div className="text-xs font-black text-white font-mono">{product.highlightSpecs.liftHeight}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-medium">Power</div>
            <div className="text-xs font-black text-amber-400 font-mono">{product.highlightSpecs.power}</div>
          </div>
        </div>

        {/* Pricing & Warranty row */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Starting MSRP</div>
            <div className="text-lg font-black text-amber-400 font-mono">
              ${product.pricing.startingMSRP.toLocaleString()}
            </div>
          </div>
          
          <div className="text-right text-[11px] text-slate-400 flex items-center gap-1">
            <Shield className="w-3 h-3 text-amber-400" />
            <span>{product.specs.warrantyMonths}M Warranty</span>
          </div>
        </div>

        {/* Actions Button Group */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onViewDetails(product)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>Full Specs</span>
          </button>

          <button
            onClick={() => addToCart(product, 1)}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
              isInCart
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>In RFQ List</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to RFQ</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
