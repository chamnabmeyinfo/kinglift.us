import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, RotateCcw } from 'lucide-react';
import { useProductFilter } from '../../context/FilterContext';
import type { SortOption } from '../../context/FilterContext';

interface SearchBarProps {
  onToggleMobileFilter: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onToggleMobileFilter }) => {
  const { 
    searchQuery, 
    setSearchQuery, 
    sortBy, 
    setSortBy, 
    totalMatches,
    resetFilters
  } = useProductFilter();

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
      
      {/* Search Input Box */}
      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter by model, feature, keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-950 text-sm text-slate-200 pl-9 pr-8 py-2 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 placeholder:text-slate-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
          >
            ✕
          </button>
        )}
      </div>

      {/* Match count and Sort + Filter buttons */}
      <div className="flex items-center justify-between w-full md:w-auto gap-3 flex-wrap">
        
        {/* Match Count Badge */}
        <div className="text-xs font-semibold text-slate-400">
          Showing <span className="text-amber-400 font-mono font-bold">{totalMatches}</span> KingLift Models
        </div>

        <div className="flex items-center gap-2">
          
          {/* Mobile Filter Button */}
          <button
            onClick={onToggleMobileFilter}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-slate-700"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-slate-900 text-slate-200">Featured / Popular</option>
              <option value="capacity-desc" className="bg-slate-900 text-slate-200">Capacity: High to Low</option>
              <option value="capacity-asc" className="bg-slate-900 text-slate-200">Capacity: Low to High</option>
              <option value="price-asc" className="bg-slate-900 text-slate-200">Price: Low to High</option>
              <option value="price-desc" className="bg-slate-900 text-slate-200">Price: High to Low</option>
              <option value="model" className="bg-slate-900 text-slate-200">Model Number</option>
            </select>
          </div>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            title="Reset Filters"
            className="p-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-400 hover:text-amber-400 hover:border-slate-600 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

    </div>
  );
};
