import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { useProductFilter } from '../../context/FilterContext';
import { 
  Truck, 
  Maximize2, 
  Layers, 
  ArrowUpFromLine, 
  Anchor, 
  Cpu, 
  LayoutGrid,
  Check,
  RotateCcw,
  BatteryCharging
} from 'lucide-react';
import type { ProductCategory } from '../../types';

interface FilterSidebarProps {
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Truck': return Truck;
    case 'Maximize2': return Maximize2;
    case 'Layers': return Layers;
    case 'ArrowUpFromLine': return ArrowUpFromLine;
    case 'Anchor': return Anchor;
    case 'Cpu': return Cpu;
    default: return LayoutGrid;
  }
};

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ isMobileDrawer, onCloseMobile }) => {
  const {
    selectedCategory,
    setSelectedCategory,
    maxCapacity,
    setMaxCapacity,
    selectedPower,
    setSelectedPower,
    inStockOnly,
    setInStockOnly,
    resetFilters
  } = useProductFilter();

  const powerOptions = [
    { label: 'All Power Types', value: 'all' },
    { label: 'Lithium-Ion (48V / 24V)', value: 'lithium' },
    { label: 'AGM Deep Cycle', value: 'agm' },
    { label: 'Hydraulic / Vehicle', value: 'hydraulic' },
    { label: 'AC Electric Station', value: 'ac' },
  ];

  return (
    <aside className={`space-y-6 ${isMobileDrawer ? 'p-6 bg-slate-950 h-full overflow-y-auto' : 'w-full'}`}>
      
      {/* Header for Filter Sidebar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
          Product Filters
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* 1. Category Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          Equipment Category
        </label>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.iconName);
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id as ProductCategory);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                  isSelected
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{cat.shortName}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Rated Capacity Range */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-400 uppercase tracking-wider">Max Capacity (lbs)</span>
          <span className="text-amber-400 font-mono font-bold">{maxCapacity.toLocaleString()} lbs</span>
        </div>
        <input
          type="range"
          min="1000"
          max="35000"
          step="500"
          value={maxCapacity}
          onChange={(e) => setMaxCapacity(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>1,000 lbs</span>
          <span>15,000 lbs</span>
          <span>35,000 lbs</span>
        </div>
      </div>

      {/* 3. Power Source Filter */}
      <div className="space-y-2 pt-4 border-t border-slate-800">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <BatteryCharging className="w-3.5 h-3.5 text-amber-400" />
          <span>Power Technology</span>
        </label>
        <div className="space-y-1">
          {powerOptions.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                selectedPower === opt.value
                  ? 'bg-slate-900 text-amber-300 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <span className="text-xs">{opt.label}</span>
              <input
                type="radio"
                name="powerSource"
                checked={selectedPower === opt.value}
                onChange={() => setSelectedPower(opt.value)}
                className="accent-amber-500"
              />
            </label>
          ))}
        </div>
      </div>

      {/* 4. In Stock Filter Toggle */}
      <div className="pt-4 border-t border-slate-800">
        <label className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
          <div>
            <div className="text-xs font-bold text-white">In Stock & Ready</div>
            <div className="text-[11px] text-slate-400">48-hour warehouse dispatch</div>
          </div>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-700 focus:ring-amber-500 accent-amber-500"
          />
        </label>
      </div>

      {/* Direct Quote Help Card */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 space-y-2">
        <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
          <span>👑 Need Custom Specs?</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          KingLift manufactures custom fork lengths, heavy mast heights, and cold-storage seals on request.
        </p>
        <a
          href="tel:1-800-555-KING"
          className="inline-block text-xs text-amber-300 hover:text-white font-bold underline"
        >
          Call Engineering: 1-800-555-KING
        </a>
      </div>

    </aside>
  );
};
