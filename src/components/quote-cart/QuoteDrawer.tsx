import React, { useState } from 'react';
import { useQuoteCart } from '../../context/QuoteCartContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  FileText
} from 'lucide-react';

export const QuoteDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalEstimatedMSRP,
    totalItemCount,
    submitRFQ,
    clearCart
  } = useQuoteCart();

  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [deliveryType, setDeliveryType] = useState<'standard-dock' | 'liftgate-needed' | 'commercial-flatbed'>('standard-dock');
  const [urgency, setUrgency] = useState<'immediate' | '1-2-weeks' | 'next-month' | 'planning-budget'>('immediate');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'review' | 'contact'>('review');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !zipCode) {
      alert('Please fill in required fields (Name, Email, Phone, ZIP).');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitRFQ({
        fullName,
        companyName: companyName || 'Private Fleet / Individual',
        email,
        phone,
        zipCode,
        deliveryType,
        urgency,
        comments
      });
      // reset form
      setFullName('');
      setCompanyName('');
      setEmail('');
      setPhone('');
      setZipCode('');
      setComments('');
      setStep('review');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={closeCart}></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white uppercase font-display tracking-wide">
                Request For Quote (RFQ)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
                {totalItemCount} {totalItemCount === 1 ? 'Unit' : 'Units'}
              </span>
            </div>

            <button
              onClick={closeCart}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">Your RFQ List is Empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Browse KingLift's electric pallet jacks, scissor lifts, and stackers to request factory pricing.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Browse Machinery
                </button>
              </div>
            ) : step === 'review' ? (
              
              /* Step 1: Review Machinery in Cart */
              <div className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.product.images.hero}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-lg object-cover bg-slate-900 border border-slate-800 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0 space-y-0.5">
                          <div className="text-[10px] font-mono font-bold text-amber-400">
                            {item.product.modelNumber}
                          </div>
                          <div className="text-xs font-bold text-white truncate">
                            {item.product.name}
                          </div>
                          <div className="text-xs font-mono font-bold text-amber-300">
                            ${(item.product.pricing.startingMSRP * item.quantity).toLocaleString()}
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 self-start"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Accessories Tag list */}
                      {item.selectedAccessories && item.selectedAccessories.length > 0 && (
                        <div className="text-[10px] text-slate-400 bg-slate-900/60 p-2 rounded-lg space-y-1">
                          <div className="font-semibold text-slate-300">Included Accessories:</div>
                          {item.selectedAccessories.map((acc, idx) => (
                            <div key={idx} className="flex justify-between text-slate-400">
                              <span>+ {acc}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Quantity row */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                        <span className="text-[11px] text-slate-400">Quantity:</span>
                        <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 rounded text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-mono font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 rounded text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-slate-500 hover:text-slate-300 underline"
                  >
                    Clear all items
                  </button>
                </div>
              </div>

            ) : (

              /* Step 2: Contact & Freight Info Form */
              <form id="rfq-form" onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">
                    Contact Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Miller"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">
                    Company / Facility Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Midwest Logistics Hub LLC"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase">
                      Work Email <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase">
                      Phone Number <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">
                    Destination US Zip Code <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 60601"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">
                    Receiving Dock Type
                  </label>
                  <select
                    value={deliveryType}
                    onChange={(e) => setDeliveryType(e.target.value as any)}
                    className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                  >
                    <option value="standard-dock">Standard Commercial Loading Dock (Semi-Trailer)</option>
                    <option value="liftgate-needed">Ground Level (Liftgate Truck Required)</option>
                    <option value="commercial-flatbed">Flatbed Dedicated Carrier</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">
                    Required Procurement Timeline
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                  >
                    <option value="immediate">Immediate Dispatch (1-3 Days)</option>
                    <option value="1-2-weeks">1 to 2 Weeks</option>
                    <option value="next-month">Next Month / Next Quarter</option>
                    <option value="planning-budget">Planning / Budget Approval</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">
                    Special Inquiries or Custom Fork Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Add custom fork lengths, lift heights, or specific commercial terms..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                  />
                </div>

              </form>
            )}

          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-4">
              
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-slate-400 uppercase">Estimated Factory MSRP Total</div>
                  <div className="text-xs text-slate-500">(Subject to volume & fleet discounts)</div>
                </div>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  ${totalEstimatedMSRP.toLocaleString()}
                </div>
              </div>

              {step === 'review' ? (
                <button
                  onClick={() => setStep('contact')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wide shadow-xl shadow-amber-500/20 transition-all active:scale-95"
                >
                  <span>Proceed to Freight & RFQ Form</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('review')}
                    className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="rfq-form"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wide shadow-xl shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Transmitting RFQ...' : 'Submit Official RFQ Request'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Direct factory guarantee • Response within 2 hours</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
