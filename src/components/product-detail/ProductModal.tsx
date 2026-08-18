import React, { useState } from 'react';
import type { Product } from '../../types';
import { useQuoteCart } from '../../context/QuoteCartContext';
import { SpecTable } from './SpecTable';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Download, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Award,
  Zap,
  Info,
  CheckCircle2
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useQuoteCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'compliance'>('overview');
  const [quantity, setQuantity] = useState(1);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  if (!product) return null;

  const toggleAccessory = (accName: string) => {
    setSelectedAccessories(prev =>
      prev.includes(accName)
        ? prev.filter(a => a !== accName)
        : [...prev, accName]
    );
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedAccessories);
    onClose();
  };

  const handleDownloadCutsheet = () => {
    setPdfDownloaded(true);
    setTimeout(() => {
      setPdfDownloaded(false);
    }, 3000);
  };

  const accessoriesTotal = selectedAccessories.reduce((sum, accName) => {
    const found = product.accessories?.find(a => a.name === accName);
    return sum + (found ? found.price * quantity : 0);
  }, 0);

  const totalCalculated = (product.pricing.startingMSRP * quantity) + accessoriesTotal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-xl">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col gold-border-pulse"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-black tracking-wider">
              {product.modelNumber}
            </span>
            <span className="text-xs text-slate-300 font-bold uppercase hidden sm:inline-block font-mono">
              {product.series}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Top Section: Gallery & Quick Purchase Meta */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Gallery Column */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative h-64 sm:h-76 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={product.images.gallery[selectedImageIndex] || product.images.hero}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Thumbnails */}
              {product.images.gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`h-16 w-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-amber-400 scale-95 shadow-md shadow-amber-500/20'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Specs & Buy Direct Column */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight">
                  {product.name}
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {product.tagline}
                </p>
              </div>

              {/* Price & Lead Time */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Starting Factory MSRP</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-amber-400 font-mono">
                      ${totalCalculated.toLocaleString()}
                    </span>
                    {quantity > 1 && (
                      <div className="text-[10px] text-slate-500 font-mono">(${product.pricing.startingMSRP.toLocaleString()} / unit)</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <span className="flex items-center gap-1 text-emerald-400 font-mono font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    In-Stock ({product.pricing.leadTimeDays}-Day Dispatch)
                  </span>
                  <span className="font-mono text-slate-300">US Logistics</span>
                </div>
              </div>

              {/* Quantity Selector & Add to Quote Button */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-sm font-mono font-bold text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wide shadow-xl shadow-amber-500/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <ShoppingCart className="w-4 h-4 flex-shrink-0" />
                    <span>Add to RFQ Cart</span>
                  </button>
                </div>

                <button
                  onClick={handleDownloadCutsheet}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>
                    {pdfDownloaded ? '✓ Engineering PDF Cutsheet Exported!' : 'Download Technical Spec Cutsheet (PDF)'}
                  </span>
                </button>
              </div>

            </div>

          </div>

          {/* Optional Accessories Selector */}
          {product.accessories && product.accessories.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Optional Factory Add-Ons & Attachments</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.accessories.map((acc, idx) => {
                  const isChecked = selectedAccessories.includes(acc.name);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleAccessory(acc.name)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500/50 text-amber-300 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold">{acc.name}</div>
                        <div className="text-[10px] text-slate-400">{acc.description}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs font-mono font-bold text-amber-400">+${acc.price}</div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-1 rounded accent-amber-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="border-b border-slate-800 flex items-center gap-4 sm:gap-6 pt-2 overflow-x-auto pb-0.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Overview & Features
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Full Engineering Table
            </button>

            <button
              onClick={() => setActiveTab('compliance')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'compliance'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Certifications & Warranty
            </button>
          </div>

          {/* Tab Content 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>
              
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
                  Standard Factory Engineering & Safety Systems
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                      <Check className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab Content 2: Technical Specs Table */}
          {activeTab === 'specs' && (
            <div className="space-y-3">
              <SpecTable specs={product.specs} />
              <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>All ratings conform to ANSI/ITSDF B56.1 testing standards. Custom fork lengths and mast heights available upon RFQ request.</span>
              </div>
            </div>
          )}

          {/* Tab Content 3: Compliance & Warranty */}
          {activeTab === 'compliance' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
                  <Award className="w-4 h-4" />
                  <span>Safety Certifications</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {product.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{product.specs.warrantyMonths}-Month Factory Warranty</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Includes comprehensive powertrain component replacement, telephone engineering diagnostics, and expedited freight on emergency replacement parts.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
