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
  LogOut,
  ChevronDown,
  Clock
} from 'lucide-react';
import { useQuoteCart } from '../../context/QuoteCartContext';
import { useProductFilter } from '../../context/FilterContext';
import { useAuth } from '../../context/AuthContext';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';
import { CATEGORIES } from '../../data/categories';
import type { ProductCategory } from '../../types';

interface NavbarProps {
  onOpenCalculator: () => void;
  onOpenAIAdvisor: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenCalculator, 
  onOpenAIAdvisor, 
  onOpenAdmin 
}) => {
  const { totalItemCount, openCart } = useQuoteCart();
  const { searchQuery, setSearchQuery, setSelectedCategory } = useProductFilter();
  const { user, isAuthenticated, isAdmin, openAuthModal, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (catId: ProductCategory) => {
    setSelectedCategory(catId);
    setMegaMenuOpen(false);
    scrollToSection('catalog');
  };

  return (
    <>
      {/* 1. Top Industrial Trust & Telemetry Bar */}
      <div className="bg-slate-950 border-b border-slate-800/90 text-xs text-slate-300 py-2 px-4 sm:px-8 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Trust Highlights Left */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              DIRECT FACTORY DISPATCH
            </span>

            <span className="hidden sm:inline-block text-slate-700">|</span>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>OSHA 1910.178 & ANSI B56.1 Certified</span>
            </span>

            <span className="hidden lg:inline-block text-slate-700">|</span>

            <span className="hidden lg:inline-flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>2-Hour Guaranteed RFQ Response</span>
            </span>
          </div>

          {/* Direct Commercial Line & Hub Hours Right */}
          <div className="flex items-center gap-4 text-xs ml-auto">
            <a 
              href="tel:1-800-555-KING" 
              className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-amber-400 hover:border-amber-400/50 transition-colors font-mono font-bold shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>1-800-555-KING (5464)</span>
            </a>

            <span className="hidden md:inline-block text-slate-700">|</span>
            <span className="hidden md:inline-block text-slate-400 text-[11px] font-mono">
              Chicago • Dallas • Atlanta • Ontario CA
            </span>
          </div>

        </div>
      </div>

      {/* 2. Main Sticky Titanium Navbar */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 shadow-2xl py-2.5' 
          : 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Tagline */}
          <a href="#" className="flex items-center gap-3.5 group cursor-pointer">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-xl shadow-amber-500/25 group-hover:scale-105 transition-all duration-300 border border-amber-300/40">
              👑
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-2xl sm:text-3xl tracking-tight text-white font-industrial leading-none">
                  KINGLIFT
                </span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-400/20 text-amber-400 border border-amber-400/40 font-mono">
                  .US
                </span>
              </div>
              <span className="text-[9px] tracking-widest text-slate-400 uppercase font-mono font-semibold pt-0.5">
                HEAVY MATERIAL HANDLING
              </span>
            </div>
          </a>

          {/* Desktop Smart Predictive Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-3">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search models (e.g. KL-EP45Li)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 text-xs text-slate-100 pl-10 pr-8 py-2 rounded-xl border border-slate-700/80 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors placeholder:text-slate-500 font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links & Mega Menu */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-bold uppercase tracking-wider text-slate-300">
            
            {/* Machinery Mega Menu Trigger */}
            <div className="relative" onMouseLeave={() => setMegaMenuOpen(false)}>
              <button 
                onMouseEnter={() => setMegaMenuOpen(true)}
                onClick={() => scrollToSection('catalog')}
                className="flex items-center gap-1 hover:text-amber-400 transition-colors py-2 cursor-pointer whitespace-nowrap"
              >
                <span>Machinery Lineup</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {megaMenuOpen && (
                <div className="absolute top-full left-0 w-80 p-3 rounded-2xl bg-slate-950/98 border border-slate-700 shadow-2xl backdrop-blur-2xl space-y-1 gold-border-pulse animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] text-slate-500 uppercase font-mono font-bold px-3 py-1">
                    Equipment Categories:
                  </div>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat.id)}
                      className="w-full p-2.5 rounded-xl hover:bg-slate-900 flex items-center justify-between text-left transition-colors group cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors whitespace-nowrap">
                          {cat.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-normal line-clamp-1">
                          {cat.description}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Lift Sizing Calculator */}
            <button 
              onClick={onOpenCalculator} 
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Lift Sizer</span>
            </button>

            {/* AI Advisor Badge */}
            <button 
              onClick={onOpenAIAdvisor} 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Bot className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>AI Spec Advisor</span>
            </button>

            {/* Engineering Trust */}
            <button 
              onClick={() => scrollToSection('about')} 
              className="hover:text-amber-400 transition-colors cursor-pointer whitespace-nowrap"
            >
              Engineering
            </button>

            {/* Contact & Parts */}
            <button 
              onClick={() => scrollToSection('contact')} 
              className="hover:text-amber-400 transition-colors cursor-pointer whitespace-nowrap"
            >
              Support
            </button>
          </nav>

          {/* Right Action Utilities (Theme, Auth, RFQ Cart, Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            
            {/* Theme Mode Switcher (Dark, Light, System) */}
            <ThemeSwitcher />

            {/* Master Admin Control Center Trigger */}
            {isAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all shadow-md cursor-pointer whitespace-nowrap flex-shrink-0"
              >
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Control Center</span>
              </button>
            )}

            {/* User Auth Profile Pill / Sign In */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-xl p-1 pl-3 shadow-sm flex-shrink-0">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-white truncate max-w-[110px] whitespace-nowrap">{user?.name}</span>
                  <span className="text-[9px] text-amber-400 font-mono uppercase font-bold whitespace-nowrap">{user?.role}</span>
                </div>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer flex-shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-slate-200 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-sm whitespace-nowrap flex-shrink-0"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Primary RFQ Quote Cart CTA Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wide shadow-xl shadow-amber-500/25 active:scale-95 transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
              aria-label="View RFQ Quote List"
            >
              <ShoppingCart className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">RFQ Cart</span>
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-slate-950 text-amber-400 text-xs font-mono font-black border border-amber-400 flex-shrink-0">
                {totalItemCount}
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* 3. Responsive Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-slate-950/98 border-b border-slate-800 px-4 py-6 space-y-4 backdrop-blur-2xl animate-in fade-in duration-200">
            
            {/* Mobile Search */}
            <div className="relative w-full mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search machinery models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 text-xs text-slate-200 pl-10 pr-3 py-2.5 rounded-xl border border-slate-700 font-medium"
              />
            </div>

            {/* Navigation Links List */}
            <div className="flex flex-col space-y-2 font-semibold text-slate-200 text-xs">
              
              {isAdmin && (
                <button 
                  onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }} 
                  className="flex items-center justify-between text-left p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold"
                >
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Admin Master Control Center</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button 
                onClick={() => scrollToSection('catalog')} 
                className="flex items-center justify-between text-left p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:bg-slate-900"
              >
                <span>Browse Full Catalog</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenCalculator(); }} 
                className="flex items-center justify-between text-left p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:bg-slate-900 text-amber-300"
              >
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-amber-400" />
                  <span>Lift Capacity Sizer & Matcher</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAIAdvisor(); }} 
                className="flex items-center justify-between text-left p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:bg-slate-900 text-amber-300"
              >
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-amber-400" />
                  <span>AI Equipment Consultant (Gemini)</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                onClick={() => scrollToSection('about')} 
                className="flex items-center justify-between text-left p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:bg-slate-900"
              >
                <span>Engineering Standards & Warranty</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <button 
                onClick={() => scrollToSection('contact')} 
                className="flex items-center justify-between text-left p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:bg-slate-900"
              >
                <span>Contact Factory Dispatch</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              {/* Direct Hotline Mobile */}
              <div className="pt-2">
                <a
                  href="tel:1-800-555-KING"
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wide"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call 1-800-555-KING (5464)</span>
                </a>
              </div>

              {/* Theme switcher */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between px-1">
                <span className="text-xs text-slate-400">Theme Mode:</span>
                <ThemeSwitcher compact />
              </div>

            </div>

          </div>
        )}

      </header>
    </>
  );
};
