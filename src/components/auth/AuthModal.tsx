import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Building2, 
  Phone, 
  ShieldCheck, 
  ArrowRight, 
  KeyRound, 
  AlertCircle 
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    authModalTab, 
    closeAuthModal, 
    openAuthModal, 
    login, 
    signup 
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signup({ name, email, password, company, phone });
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemoAdmin = () => {
    setEmail('admin@kinglift.us');
    setPassword('admin1234');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-md">
              👑
            </div>
            <div>
              <div className="text-sm font-black text-white font-display uppercase tracking-wide">
                KingLift Account Portal
              </div>
              <div className="text-[10px] text-slate-400">Direct Brand Access & Control</div>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switching */}
        <div className="flex border-b border-slate-800 bg-slate-950/50">
          <button
            onClick={() => { setError(null); openAuthModal('login'); }}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              authModalTab === 'login'
                ? 'border-amber-400 text-amber-400 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setError(null); openAuthModal('signup'); }}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              authModalTab === 'signup'
                ? 'border-amber-400 text-amber-400 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          
          {/* Error Banner */}
          {error && (
            <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {authModalTab === 'login' ? (
            
            /* SIGN IN FORM */
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="admin@kinglift.us or you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 pl-9 pr-3 py-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 pl-9 pr-3 py-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wide shadow-lg shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Demo Admin 1-Click Button */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleFillDemoAdmin}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-amber-500/30 text-amber-300 text-[11px] font-semibold transition-colors"
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>Fill Demo Admin Credentials (admin@kinglift.us / admin1234)</span>
                </button>
              </div>

            </form>

          ) : (

            /* SIGN UP FORM */
            <form onSubmit={handleSignup} className="space-y-3.5 text-xs">
              
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 pl-9 pr-3 py-2 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase">Work Email *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="marcus@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 pl-9 pr-3 py-2 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase">Password (6+ characters) *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 pl-9 pr-3 py-2 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">Company</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Apex Logistics"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-slate-950 text-slate-200 pl-9 pr-3 py-2 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase">Phone</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-950 text-slate-200 pl-9 pr-3 py-2 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wide shadow-lg shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50"
              >
                <span>{loading ? 'Creating Account...' : 'Register Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}

          <div className="pt-2 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>256-bit encrypted factory session • US privacy compliant</span>
          </div>

        </div>

      </div>
    </div>
  );
};
