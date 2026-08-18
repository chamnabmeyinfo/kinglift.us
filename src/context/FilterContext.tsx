import React, { createContext, useContext, useState, useMemo } from 'react';
import type { ProductCategory, Product } from '../types';
import { PRODUCTS } from '../data/products';

export type SortOption = 'featured' | 'capacity-desc' | 'capacity-asc' | 'price-desc' | 'price-asc' | 'model';

interface FilterContextType {
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  minCapacity: number;
  setMinCapacity: (val: number) => void;
  maxCapacity: number;
  setMaxCapacity: (val: number) => void;
  selectedPower: string;
  setSelectedPower: (power: string) => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
  filteredProducts: Product[];
  totalMatches: number;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [minCapacity, setMinCapacity] = useState<number>(0);
  const [maxCapacity, setMaxCapacity] = useState<number>(35000);
  const [selectedPower, setSelectedPower] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMinCapacity(0);
    setMaxCapacity(35000);
    setSelectedPower('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchModel = product.modelNumber.toLowerCase().includes(q);
        const matchTagline = product.tagline.toLowerCase().includes(q);
        const matchSeries = product.series.toLowerCase().includes(q);
        const matchFeatures = product.features.some(f => f.toLowerCase().includes(q));
        if (!matchName && !matchModel && !matchTagline && !matchSeries && !matchFeatures) {
          return false;
        }
      }

      // Capacity Range
      if (product.specs.ratedCapacityLbs < minCapacity || product.specs.ratedCapacityLbs > maxCapacity) {
        return false;
      }

      // Power Type
      if (selectedPower !== 'all') {
        if (!product.specs.powerSource.toLowerCase().includes(selectedPower.toLowerCase())) {
          return false;
        }
      }

      // In Stock
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          return (a.popularRank || 99) - (b.popularRank || 99);
        case 'capacity-desc':
          return b.specs.ratedCapacityLbs - a.specs.ratedCapacityLbs;
        case 'capacity-asc':
          return a.specs.ratedCapacityLbs - b.specs.ratedCapacityLbs;
        case 'price-desc':
          return b.pricing.startingMSRP - a.pricing.startingMSRP;
        case 'price-asc':
          return a.pricing.startingMSRP - b.pricing.startingMSRP;
        case 'model':
          return a.modelNumber.localeCompare(b.modelNumber);
        default:
          return 0;
      }
    });
  }, [selectedCategory, searchQuery, minCapacity, maxCapacity, selectedPower, inStockOnly, sortBy]);

  return (
    <FilterContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        minCapacity,
        setMinCapacity,
        maxCapacity,
        setMaxCapacity,
        selectedPower,
        setSelectedPower,
        inStockOnly,
        setInStockOnly,
        sortBy,
        setSortBy,
        resetFilters,
        filteredProducts,
        totalMatches: filteredProducts.length
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useProductFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useProductFilter must be used within a FilterProvider');
  }
  return context;
};
