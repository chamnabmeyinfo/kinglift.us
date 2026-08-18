import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { QuoteCartProvider } from './context/QuoteCartContext';
import { FilterProvider } from './context/FilterContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/layout/Hero';
import { BrandTrust } from './components/layout/BrandTrust';
import { SearchBar } from './components/catalog/SearchBar';
import { FilterSidebar } from './components/catalog/FilterSidebar';
import { ProductGrid } from './components/catalog/ProductGrid';
import { ProductModal } from './components/product-detail/ProductModal';
import { QuoteDrawer } from './components/quote-cart/QuoteDrawer';
import { RFQSuccessModal } from './components/quote-cart/RFQSuccessModal';
import { LiftCalculator } from './components/tools/LiftCalculator';
import { AIConsultant } from './components/tools/AIConsultant';
import { ContactSection } from './components/contact/ContactSection';
import { AuthModal } from './components/auth/AuthModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Footer } from './components/layout/Footer';
import type { Product } from './types';
import { X } from 'lucide-react';

const MainApp: React.FC = () => {
  const { isAdmin } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [aiAdvisorOpen, setAiAdvisorOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleExploreCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar 
        onOpenCalculator={() => setCalculatorOpen(true)}
        onOpenAIAdvisor={() => setAiAdvisorOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero 
          onExploreCatalog={handleExploreCatalog}
          onOpenCalculator={() => setCalculatorOpen(true)}
          onOpenAIAdvisor={() => setAiAdvisorOpen(true)}
        />

        {/* Brand Trust & Warranty Strip */}
        <BrandTrust />

        {/* Product Catalog Showcase */}
        <section id="catalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Section Heading */}
          <div className="mb-8 space-y-2">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Commercial Machinery Lineup
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-display">
                Proprietary KingLift Machinery
              </h2>
              <p className="text-xs text-slate-400 max-w-md">
                Direct factory pricing with comprehensive specs, instant quotes, and verified North American inventory.
              </p>
            </div>
          </div>

          {/* Search & Sort Bar */}
          <SearchBar onToggleMobileFilter={() => setMobileFilterOpen(true)} />

          {/* Catalog Layout: Sidebar + Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Desktop Filter Sidebar (3 cols) */}
            <div className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-24">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
                <FilterSidebar />
              </div>
            </div>

            {/* Products Grid (9 cols) */}
            <div className="md:col-span-8 lg:col-span-9">
              <ProductGrid onViewDetails={(product) => setSelectedProduct(product)} />
            </div>

          </div>

        </section>

        {/* Factory Contact & Support */}
        <ContactSection />

      </main>

      {/* Global Modals & Drawers */}
      
      {/* 1. Deep Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* 2. RFQ Quote Cart Drawer */}
      <QuoteDrawer />

      {/* 3. RFQ Submission Success Modal */}
      <RFQSuccessModal />

      {/* 4. Interactive Lift Capacity Calculator */}
      <LiftCalculator
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      {/* 5. Google AI Studio Gemini Advisor */}
      <AIConsultant
        isOpen={aiAdvisorOpen}
        onClose={() => setAiAdvisorOpen(false)}
      />

      {/* 6. User Authentication Modal (Sign In / Sign Up) */}
      <AuthModal />

      {/* 7. Master Admin Control Center Dashboard */}
      {isAdmin && adminOpen && (
        <AdminDashboard onClose={() => setAdminOpen(false)} />
      )}

      {/* 8. Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm md:hidden">
          <div className="absolute inset-0" onClick={() => setMobileFilterOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
            <div className="w-screen max-w-xs bg-slate-950 border-r border-slate-800 shadow-2xl relative flex flex-col">
              <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase">Filters</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <FilterSidebar
                  isMobileDrawer
                  onCloseMobile={() => setMobileFilterOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer 
        onOpenCalculator={() => setCalculatorOpen(true)}
        onOpenAIAdvisor={() => setAiAdvisorOpen(true)}
      />

    </div>
  );
};

import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QuoteCartProvider>
          <FilterProvider>
            <MainApp />
          </FilterProvider>
        </QuoteCartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
