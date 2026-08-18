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
  Info
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
              {product.modelNumber}
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
              {product.series}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Top Section: Gallery & Quick Purchase Meta */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Gallery Column */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={product.images.gallery[selectedImageIndex] || product.images.hero}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images.gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`h-16 w-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImageIndex === idx
                          ? 'border-amber-400 scale-95'
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
                <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                  {product.name}
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {product.tagline}
                </p>
              </div>

              {/* Price & Lead Time */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-400 uppercase font-medium">Starting Factory MSRP</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">
                    ${product.pricing.startingMSRP.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    In-Stock ({product.pricing.leadTimeDays}-Day Lead Time)
                  </span>
                  <span className="font-mono text-slate-300">US Continental Shipping</span>
                </div>
              </div>

              {/* Quantity Selector & Add to Quote Button */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-slate-950 border border-slate-700 rounded-lg p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-mono font-bold text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wide shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add Model to RFQ Quote</span>
                  </button>
                </div>

                <button
                  onClick={handleDownloadCutsheet}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {pdfDownloaded ? '✓ Spec Sheet PDF Downloaded!' : 'Download Technical PDF Cut Sheet'}
                  </span>
                </button>
              </div>

            </div>

          </div>

          {/* Optional Accessories Selector */}
          {product.accessories && product.accessories.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Optional OEM Upgrades & Accessories</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.accessories.map((acc, idx) => {
                  const isChecked = selectedAccessories.includes(acc.name);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleAccessory(acc.name)}
                      className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-start justify-between gap-2 ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold">{acc.name}</div>
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
          <div className="border-b border-slate-800 flex items-center gap-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'overview'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Machine Overview & Features
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'specs'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Full Engineering Spec Sheet
            </button>

            <button
              onClick={() => setActiveTab('compliance')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
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
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Standard Factory Equipment & Engineering
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
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
              <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>All measurements conform to ANSI/ITSDF B56 testing standards. Custom fork dimensions and high-lift masts available upon RFQ submission.</span>
              </div>
            </div>
          )}

          {/* Tab Content 3: Compliance & Warranty */}
          {activeTab === 'compliance' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
                  <Award className="w-4 h-4" />
                  <span>Safety Certifications</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {product.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{product.specs.warrantyMonths}-Month OEM Warranty</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Includes comprehensive parts replacement, factory technician telephone diagnostics, and express-air shipments for critical control modules and lithium packs.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
