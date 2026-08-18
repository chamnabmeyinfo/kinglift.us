import React from 'react';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { useProductFilter } from '../../context/FilterContext';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ProductGridProps {
  onViewDetails: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onViewDetails }) => {
  const { filteredProducts, resetFilters } = useProductFilter();

  if (filteredProducts.length === 0) {
    return (
      <div className="py-16 px-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white font-display">
          No Machinery Found Matching Criteria
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Try loosening your capacity range, selecting "All Categories", or clearing the search query.
        </p>
        <button
          onClick={resetFilters}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/10"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};
