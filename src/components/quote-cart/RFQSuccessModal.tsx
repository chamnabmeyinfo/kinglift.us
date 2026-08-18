import React from 'react';
import { useQuoteCart } from '../../context/QuoteCartContext';
import { CheckCircle2, X, ShieldCheck } from 'lucide-react';

export const RFQSuccessModal: React.FC = () => {
  const { lastSubmission, clearLastSubmission } = useQuoteCart();

  if (!lastSubmission) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 text-slate-200">
        
        {/* Close Button */}
        <button
          onClick={clearLastSubmission}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon & Heading */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight">
            RFQ Transmitted Successfully
          </h3>
          <p className="text-xs text-slate-400">
            Your formal Request For Quote has been routed to KingLift Commercial Sales Engineering.
          </p>
        </div>

        {/* RFQ Tracking ID Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <span className="text-slate-400">RFQ Tracking ID:</span>
            <span className="text-amber-400 font-bold text-sm">{lastSubmission.id}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Contact:</span>
            <span className="text-white font-semibold">{lastSubmission.fullName} ({lastSubmission.companyName})</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Destination:</span>
            <span className="text-white">ZIP {lastSubmission.zipCode} • {lastSubmission.deliveryType.replace('-', ' ')}</span>
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <div className="text-slate-400 mb-1">Requested Equipment:</div>
            <div className="space-y-1">
              {lastSubmission.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-slate-300">
                  <span>{item.quantity}x {item.modelNumber} ({item.name})</span>
                  <span className="text-amber-400">${(item.msrp * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-2 text-xs text-slate-300">
          <div className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>What happens next?</span>
          </div>
          <ul className="space-y-1.5 text-slate-400 text-[11px] list-disc list-inside">
            <li>A dedicated KingLift technical engineer will email your formal itemized proposal within 2 business hours.</li>
            <li>Exact discounted freight transit times will be calculated from the closest US hub.</li>
            <li>Net-30 commercial credit terms available for qualified fleet buyers.</li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={clearLastSubmission}
            className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wide transition-all shadow-lg shadow-amber-500/20"
          >
            Done & Continue Browsing
          </button>
        </div>

      </div>
    </div>
  );
};
