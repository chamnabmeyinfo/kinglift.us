import React, { useState } from 'react';
import type { Product } from '../../types';
import { useQuoteCart } from '../../context/QuoteCartContext';
import { useToast } from '../../context/ToastContext';
import { exportProductToDocx } from '../../utils/docxExport';
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
  CheckCircle2,
  FileText
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useQuoteCart();
  const { showToast } = useToast();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'compliance'>('overview');
  const [quantity, setQuantity] = useState(1);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [isExportingDocx, setIsExportingDocx] = useState(false);

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
    showToast(`Added ${quantity}x ${product.modelNumber} to Quote Cart`, 'success');
    onClose();
  };

  const handleExportDocx = async () => {
    try {
      setIsExportingDocx(true);
      await exportProductToDocx(product);
      showToast(`Exported ${product.modelNumber} Technical Spec (.docx)`, 'success');
    } catch (err) {
      console.error('Failed to export DOCX', err);
      showToast('Failed to generate DOCX document', 'error');
    } finally {
      setIsExportingDocx(false);
    }
  };

  const handlePrintPDF = () => {
    window.print();
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
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
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
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all ${
                        selectedImageIndex === idx
                          ? 'border-amber-400 ring-2 ring-amber-400/30'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Pricing & Configuration Meta */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                  {product.category.replace('-', ' ')}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {product.tagline}
                </p>
              </div>

              {/* Pricing Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Direct Factory Price</span>
                    <div className="text-2xl font-black text-amber-400 font-mono tracking-tight">
                      ${totalCalculated.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Powertrain Warranty</span>
                    <div className="text-xs font-mono font-bold text-emerald-400">
                      {product.specs.warrantyMonths} Months Nationwide
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <span className="flex items-center gap-1 text-emerald-400 font-mono font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    In-Stock ({product.pricing.leadTimeDays}-Day Dispatch)
                  </span>
                  <span className="font-mono text-slate-300">US Logistics Hubs</span>
                </div>
              </div>

              {/* Quantity Selector & Actions */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-sm font-mono font-bold text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
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

                {/* 2 Export Options: Word (.docx) with Khmer Unicode + PDF Print */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={handleExportDocx}
                    disabled={isExportingDocx}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-950/50 hover:bg-blue-900/60 text-blue-300 hover:text-blue-200 text-xs font-bold border border-blue-700/60 transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
                    title="Export to Microsoft Word (.docx) with full Khmer font support"
                  >
                    <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>{isExportingDocx ? 'Generating Word...' : 'Download Word (.docx)'}</span>
                  </button>

                  <button
                    onClick={handlePrintPDF}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Print / Save PDF</span>
                  </button>
                </div>
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

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                {product.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <div className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Full Spec Table */}
          {activeTab === 'specs' && (
            <div>
              <SpecTable specs={product.specs} />
            </div>
          )}

          {/* Tab 3: Compliance & Warranty */}
          {activeTab === 'compliance' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Safety & Standards Compliance</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {product.certifications.map((cert, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Award className="w-4 h-4" />
                    <span>Nationwide Warranty Terms</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Standard {product.specs.warrantyMonths}-month comprehensive powertrain and hydraulic warranty with direct factory replacement parts dispatched within 24 hours.
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
