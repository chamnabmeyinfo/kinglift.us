import React from 'react';
import { ShieldCheck, PhoneCall, Mail, MapPin, FileCode2 } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { useProductFilter } from '../../context/FilterContext';
import type { ProductCategory } from '../../types';

interface FooterProps {
  onOpenCalculator: () => void;
  onOpenAIAdvisor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCalculator, onOpenAIAdvisor }) => {
  const { setSelectedCategory } = useProductFilter();

  const handleCategoryClick = (catId: ProductCategory) => {
    setSelectedCategory(catId);
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-lg">
                👑
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-black text-2xl tracking-tight text-white font-industrial">KINGLIFT</span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-400 border border-amber-400/30">.US</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              KingLift™ is an American brand specializing in electric material handling, lithium pallet jacks, scissor lifts, and commercial truck tail lifts. Built for high uptime, safety compliance, and direct factory pricing.
            </p>

            <div className="flex items-center gap-3 pt-2 text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                OSHA 1910.178
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                ANSI/ITSDF B56.1
              </span>
            </div>
          </div>

          {/* Col 2: Machinery Lineup */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Machinery Lineup
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id as ProductCategory)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {cat.shortName}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Interactive Tools & Tech */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Tools & Knowledge
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenCalculator}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Lift Capacity Matcher
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAIAdvisor}
                  className="hover:text-amber-400 transition-colors text-left text-amber-400 font-semibold"
                >
                  AI Equipment Advisor (Gemini)
                </button>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  Warranty & Powertrain Terms
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  North America Logistics Hubs
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Factory Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Factory Headquarters
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <a href="tel:1-800-555-KING" className="hover:text-amber-400">1-800-555-KING (5464)</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <a href="mailto:sales@kinglift.us" className="hover:text-amber-400">sales@kinglift.us</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">Chicago, IL • Dallas, TX • Atlanta, GA • Ontario, CA</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright and AI Agent Note */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} KingLift™ USA Inc. All Rights Reserved. Domain: <span className="text-slate-400 font-semibold">kinglift.us</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
              Obsidian Knowledge Base Ready (`/vault`)
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
