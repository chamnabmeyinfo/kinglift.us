import React from 'react';
import { 
  ShoppingCart, 
  Bot, 
  Calculator, 
  PhoneCall
} from 'lucide-react';
import { useQuoteCart } from '../../context/QuoteCartContext';

interface FloatingBarProps {
  onOpenCalculator: () => void;
  onOpenAIAdvisor: () => void;
}

export const FloatingCommandBar: React.FC<FloatingBarProps> = ({ 
  onOpenCalculator, 
  onOpenAIAdvisor
}) => {
  const { totalItemCount, openCart } = useQuoteCart();

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 px-3 py-2 rounded-2xl bg-slate-950/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl flex items-center gap-1.5 sm:gap-3 gold-border-pulse">
      
      {/* 1. RFQ Cart Button */}
      <button
        onClick={openCart}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wide shadow-lg shadow-amber-500/25 active:scale-95 transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
      >
        <ShoppingCart className="w-4 h-4 flex-shrink-0" />
        <span className="hidden sm:inline whitespace-nowrap">RFQ Cart</span>
        <span className="px-1.5 py-0.5 rounded-full bg-slate-950 text-amber-400 text-[10px] font-mono font-bold flex-shrink-0">
          {totalItemCount}
        </span>
      </button>

      <div className="h-5 w-px bg-slate-800 flex-shrink-0"></div>

      {/* 2. AI Gemini Advisor */}
      <button
        onClick={onOpenAIAdvisor}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 text-amber-400 hover:text-amber-300 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap flex-shrink-0"
        title="Ask KingLift AI Assistant"
      >
        <Bot className="w-4 h-4 animate-pulse flex-shrink-0" />
        <span className="hidden md:inline whitespace-nowrap">AI Spec Advisor</span>
      </button>

      {/* 3. Lift Sizing Calculator */}
      <button
        onClick={onOpenCalculator}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-white text-xs font-bold transition-colors cursor-pointer whitespace-nowrap flex-shrink-0"
        title="Lift Capacity Matcher"
      >
        <Calculator className="w-4 h-4 text-amber-400 flex-shrink-0" />
        <span className="hidden md:inline whitespace-nowrap">Lift Sizer</span>
      </button>

      <div className="h-5 w-px bg-slate-800 hidden sm:block flex-shrink-0"></div>

      {/* 4. Direct Call */}
      <a
        href="tel:1-800-555-KING"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-amber-400 text-xs font-mono font-bold transition-colors cursor-pointer whitespace-nowrap flex-shrink-0"
        title="Call 1-800-555-KING"
      >
        <PhoneCall className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
        <span className="hidden lg:inline whitespace-nowrap">1-800-555-KING</span>
      </a>

    </div>
  );
};
