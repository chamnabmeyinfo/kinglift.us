import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  ShoppingCart, 
  Menu, 
  X, 
  Calculator, 
  Bot, 
  Search,
  ArrowRight,
  User,
  ShieldAlert,
  LogOut
} from 'lucide-react';
import { useQuoteCart } from '../../context/QuoteCartContext';
import { useProductFilter } from '../../context/FilterContext';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onOpenCalculator: () => void;
  onOpenAIAdvisor: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCalculator, onOpenAIAdvisor, onOpenAdmin }) => {
  const { totalItemCount, openCart } = useQuoteCart();
  const { searchQuery, setSearchQuery } = useProductFilter();
  const { user, isAuthenticated, isAdmin, openAuthModal, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Industrial Trust Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-xs text-slate-300 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1 text-amber-400 font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              DIRECT BRAND DISPATCH
            </span>
            <span className="hidden md:inline-block text-slate-500">•</span>
            <span className="hidden md:inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              OSHA & ANSI B56 Compliant
            </span>
            <span className="hidden lg:inline-block text-slate-500">•</span>
            <span className="hidden lg:inline-block text-slate-400">
              3 to 5-Year Powertrain Warranty Nationwide
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium ml-auto">
            <a 
              href="tel:1-800-555-KING" 
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>1-800-555-KING (5464)</span>
            </a>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400 text-[11px]">Mon–Fri: 7AM–7PM EST</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-2xl py-3' : 'bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/60 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              👑
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="font-black text-2xl tracking-tight text-white font-industrial">KINGLIFT</span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-400 border border-amber-400/30">.US</span>
              </div>
              <span className="text-[10px] tracking-wider text-slate-400 uppercase font-medium">Heavy Material Handling</span>
            </div>
          </a>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search models, capacity (e.g. 4500)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 text-sm text-slate-200 pl-9 pr-3 py-1.5 rounded-lg border border-slate-700/80 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors placeholder:text-slate-500"
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
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
            <button 
              onClick={() => scrollToSection('catalog')} 
              className="hover:text-amber-400 transition-colors"
            >
              Machinery Catalog
            </button>

            <button 
              onClick={onOpenCalculator} 
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Lift Calculator</span>
            </button>

            <button 
              onClick={onOpenAIAdvisor} 
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 hover:bg-amber-400/20 transition-colors"
            >
              <Bot className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>AI Advisor</span>
            </button>

            <button 
              onClick={() => scrollToSection('about')} 
              className="hover:text-amber-400 transition-colors"
            >
              Engineering & Warranty
            </button>

            <button 
              onClick={() => scrollToSection('contact')} 
              className="hover:text-amber-400 transition-colors"
            >
              Contact & Parts
            </button>
          </nav>

          {/* User Auth & RFQ Cart Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Admin Control Center Trigger */}
            {isAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all shadow-md"
              >
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Control Center</span>
              </button>
            )}

            {/* Auth Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-white truncate max-w-[100px]">{user?.name}</span>
                  <span className="text-[10px] text-amber-400 capitalize">{user?.role}</span>
                </div>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all hover:border-slate-600"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Sign In</span>
              </button>
            )}

            {/* RFQ Cart Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition-all active:scale-95"
              aria-label="View Quote Request List"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">RFQ Cart</span>
              {totalItemCount > 0 ? (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-slate-950 text-amber-400 text-xs font-black ring-2 ring-amber-500">
                  {totalItemCount}
                </span>
              ) : (
                <span className="text-xs bg-slate-950/20 px-1.5 py-0.5 rounded font-semibold text-slate-900">
                  0
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 py-5 space-y-4">
            <div className="relative w-full mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search catalog models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 text-sm text-slate-200 pl-9 pr-3 py-2 rounded-lg border border-slate-700"
              />
            </div>

            <div className="flex flex-col space-y-3 font-medium text-slate-200">
              {isAdmin && (
                <button 
                  onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }} 
                  className="flex items-center justify-between text-left py-2 border-b border-slate-800/80 text-amber-400 font-bold"
                >
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Admin Control Center</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button 
                onClick={() => scrollToSection('catalog')} 
                className="flex items-center justify-between text-left py-2 border-b border-slate-800/80"
              >
                <span>Machinery Catalog</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenCalculator(); }} 
                className="flex items-center justify-between text-left py-2 border-b border-slate-800/80 text-amber-300"
              >
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  <span>Lift Capacity Calculator</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAIAdvisor(); }} 
                className="flex items-center justify-between text-left py-2 border-b border-slate-800/80 text-amber-300"
              >
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  <span>AI Equipment Consultant</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                onClick={() => scrollToSection('about')} 
                className="flex items-center justify-between text-left py-2 border-b border-slate-800/80"
              >
                <span>Engineering & Warranty</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <button 
                onClick={() => scrollToSection('contact')} 
                className="flex items-center justify-between text-left py-2"
              >
                <span>Factory Contact & Support</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
