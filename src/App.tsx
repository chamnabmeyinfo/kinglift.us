import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { QuoteCartProvider } from './context/QuoteCartContext';
import { FilterProvider } from './context/FilterContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
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
import { ComparisonModal } from './components/tools/ComparisonModal';
import { HeavyMachineryShowcase } from './components/home/HeavyMachineryShowcase';
import { TCOCalculator } from './components/home/TCOCalculator';
import { IndustrySectors } from './components/home/IndustrySectors';
import { QuickQuoteBanner } from './components/home/QuickQuoteBanner';
import { FloatingCommandBar } from './components/layout/FloatingCommandBar';
import { ContactSection } from './components/contact/ContactSection';
import { AuthModal } from './components/auth/AuthModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Footer } from './components/layout/Footer';
import type { Product } from './types';
import { PRODUCTS } from './data/products';
import { X, SlidersHorizontal } from 'lucide-react';

const MainApp: React.FC = () => {
  const { isAdmin } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [aiAdvisorOpen, setAiAdvisorOpen] = useState(false);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleExploreCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProductById = (id: string) => {
    const found = PRODUCTS.find(p => p.id === id || p.modelNumber === id);
    if (found) {
      setSelectedProduct(found);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 relative">
      
      {/* Top Navbar */}
      <Navbar 
        onOpenCalculator={() => setCalculatorOpen(true)}
        onOpenAIAdvisor={() => setAiAdvisorOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1 pb-16">
        
        {/* 1. Hero Section */}
        <Hero 
          onExploreCatalog={handleExploreCatalog}
          onOpenCalculator={() => setCalculatorOpen(true)}
          onOpenAIAdvisor={() => setAiAdvisorOpen(true)}
        />

        {/* 2. Brand Trust & 48-Hour Dispatch Hubs */}
        <BrandTrust />

        {/* 3. Heavy Industrial Tonnage Showcase */}
        <HeavyMachineryShowcase 
          onSelectProduct={handleSelectProductById}
          onOpenCalculator={() => setCalculatorOpen(true)}
        />

        {/* 4. Total Cost of Ownership (TCO) & Fleet ROI Calculator */}
        <TCOCalculator />

        {/* 5. Instant ZIP Transit & Quote Estimator */}
        <QuickQuoteBanner 
          onOpenCalculator={() => setCalculatorOpen(true)}
        />

        {/* 6. Key Industry Verticals */}
        <IndustrySectors />

        {/* 7. Product Catalog Showcase */}
        <section id="catalog" className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Section Heading */}
          <div className="mb-10 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-widest">
                  FULL COMMERCIAL INVENTORY
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-display tracking-tight">
                  Proprietary KingLift Machinery Lineup
                </h2>
              </div>

              <button
                onClick={() => setComparisonOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-amber-400 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Side-by-Side Spec Compare</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              Direct factory pricing with comprehensive specs, instant quotes, and verified North American inventory.
            </p>
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

        {/* 8. Factory Contact & Direct Support */}
        <ContactSection />

      </main>

      {/* Global Floating Quick Command Dock */}
      <FloatingCommandBar
        onOpenCalculator={() => setCalculatorOpen(true)}
        onOpenAIAdvisor={() => setAiAdvisorOpen(true)}
      />

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

      {/* 5. 3-Way Equipment Comparison Modal */}
      <ComparisonModal
        isOpen={comparisonOpen}
        onClose={() => setComparisonOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      {/* 6. Google AI Studio Gemini Advisor */}
      <AIConsultant
        isOpen={aiAdvisorOpen}
        onClose={() => setAiAdvisorOpen(false)}
      />

      {/* 7. User Authentication Modal (Sign In / Sign Up) */}
      <AuthModal />

      {/* 8. Master Admin Control Center Dashboard */}
      {isAdmin && adminOpen && (
        <AdminDashboard onClose={() => setAdminOpen(false)} />
      )}

      {/* 9. Mobile Filter Drawer */}
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

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QuoteCartProvider>
          <FilterProvider>
            <ToastProvider>
              <MainApp />
            </ToastProvider>
          </FilterProvider>
        </QuoteCartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
