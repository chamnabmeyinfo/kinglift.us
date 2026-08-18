import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Zap,
  PhoneCall
} from 'lucide-react';

interface QuickQuoteProps {
  onOpenCalculator?: () => void;
}

export const QuickQuoteBanner: React.FC<QuickQuoteProps> = ({ onOpenCalculator }) => {
  const [zip, setZip] = useState('');
  const [transitEstimate, setTransitEstimate] = useState<string | null>(null);

  const handleCalculateTransit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zip.trim()) return;

    const firstDigit = zip.trim().charAt(0);
    if (['6', '4', '5'].includes(firstDigit)) {
      setTransitEstimate('1–2 Business Days (Chicago Hub Dispatch)');
    } else if (['7', '8'].includes(firstDigit)) {
      setTransitEstimate('1–2 Business Days (Dallas Hub Dispatch)');
    } else if (['9'].includes(firstDigit)) {
      setTransitEstimate('2–3 Business Days (Ontario, CA Hub Dispatch)');
    } else if (['3'].includes(firstDigit)) {
      setTransitEstimate('1–2 Business Days (Atlanta Hub Dispatch)');
    } else {
      setTransitEstimate('2–4 Business Days (Direct Continental US Freight)');
    }
  };

  return (
    <section className="py-12 bg-slate-950 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 gold-border-pulse shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left: Quick Dispatch Header */}
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>INSTANT FREIGHT DISPATCH ESTIMATOR</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-display">
              Fast Nationwide Commercial Freight Delivery
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              KingLift maintains inventory across 4 regional US hubs. Enter your delivery ZIP code to estimate transit days and dock arrival.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Liftgate Available
              </span>
              <span className="flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Fully Assembled & Tested
              </span>
              <span className="flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Ready To Work Out of Box
              </span>
            </div>
          </div>

          {/* Right: ZIP Code Form & Result Box */}
          <div className="w-full lg:w-auto flex-shrink-0 space-y-3">
            <form onSubmit={handleCalculateTransit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  maxLength={5}
                  placeholder="Enter 5-digit ZIP..."
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full sm:w-56 bg-slate-950 text-slate-100 text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                Estimate Freight
              </button>
            </form>

            {transitEstimate && (
              <div className="p-3 rounded-xl bg-slate-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Est. Delivery: <strong>{transitEstimate}</strong></span>
              </div>
            )}

            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
              {onOpenCalculator ? (
                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className="text-slate-400 hover:text-amber-400 font-semibold cursor-pointer underline text-[10px]"
                >
                  Need help sizing capacity? Open Calculator →
                </button>
              ) : (
                <span>Have fleet requirements?</span>
              )}
              <a href="tel:1-800-555-KING" className="text-amber-400 font-bold hover:underline flex items-center gap-1 font-mono">
                <PhoneCall className="w-3 h-3" />
                <span>1-800-555-KING</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
