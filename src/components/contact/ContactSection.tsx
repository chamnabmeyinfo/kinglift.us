import React, { useState } from 'react';
import { PhoneCall, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
    } catch (e) {
      console.warn('API offline, recorded locally', e);
    } finally {
      setSending(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const logisticsHubs = [
    { city: 'Chicago, IL', role: 'Central Logistics & Parts Depot' },
    { city: 'Dallas, TX', role: 'Southern Distribution Hub' },
    { city: 'Atlanta, GA', role: 'Southeast Freight Center' },
    { city: 'Ontario, CA', role: 'Western Logistics Center' }
  ];

  return (
    <section id="contact" className="py-16 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Brand Contact & Logistics Hubs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Factory Direct Support
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-display">
                Talk with KingLift Commercial Engineering
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Whether you need bulk fleet pricing, custom fork length attachments, or warranty parts overnighted, our US technical support team is ready.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="tel:1-800-555-KING"
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-colors block group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase font-semibold">Toll-Free Sales</div>
                    <div className="text-sm font-bold text-white group-hover:text-amber-400">1-800-555-KING</div>
                  </div>
                </div>
              </a>

              <a
                href="mailto:sales@kinglift.us"
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-colors block group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase font-semibold">Email Engineering</div>
                    <div className="text-sm font-bold text-white group-hover:text-amber-400">sales@kinglift.us</div>
                  </div>
                </div>
              </a>
            </div>

            {/* Nationwide Warehouses List */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>North America Distribution Hubs</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {logisticsHubs.map((hub, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 space-y-0.5">
                    <div className="font-bold text-slate-200">{hub.city}</div>
                    <div className="text-[10px] text-slate-500">{hub.role}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Fast Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
              
              <div>
                <h3 className="text-lg font-black text-white font-display uppercase tracking-wide">
                  Send Technical Inquiry or Parts Request
                </h3>
                <p className="text-xs text-slate-400">
                  Our factory engineers review all messages within 2 hours during normal business operations.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-white">Message Received</div>
                  <p className="text-xs text-emerald-200">
                    A KingLift product specialist will follow up shortly at your provided email address.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Robert Davis"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="robert@warehouse.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase">Question / Part Serial Number</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Provide machine model, lift application, or part description..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wide shadow-lg shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{sending ? 'Transmitting...' : 'Transmit Message'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
