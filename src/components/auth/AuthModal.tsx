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
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    authModalTab, 
    closeAuthModal, 
    openAuthModal, 
    login, 
    loginWithGoogle,
    signup 
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showGooglePicker, setShowGooglePicker] = useState(false);

  if (!authModalOpen) return null;

  const isEmailAllowedClient = (inputEmail: string): boolean => {
    const clean = inputEmail.trim().toLowerCase();
    if (clean === 'chamnabmey.info@gmail.com') return true;
    if (clean.endsWith('@kinglift.us')) return true;
    if (clean.endsWith('@s3vtgroup.com.kh')) return true;
    return false;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isEmailAllowedClient(email)) {
      setError('Access Restricted: Only accounts from @kinglift.us, @s3vtgroup.com.kh, or chamnabmey.info@gmail.com are permitted.');
      return;
    }

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

    if (!isEmailAllowedClient(email)) {
      setError('Access Restricted: Only authorized enterprise domain accounts (@kinglift.us, @s3vtgroup.com.kh, or chamnabmey.info@gmail.com) are permitted.');
      return;
    }

    setLoading(true);
    try {
      await signup({ name, email, password, company, phone });
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSelect = async (account: { email: string; name: string }) => {
    setError(null);
    setLoading(true);
    setShowGooglePicker(false);
    try {
      await loginWithGoogle({
        email: account.email,
        name: account.name
      });
    } catch (err: any) {
      setError(err.message || 'Google authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const allowedGoogleAccounts = [
    { email: 'chamnabmey.info@gmail.com', name: 'Chamnab Mey (Master Owner)' },
    { email: 'admin@kinglift.us', name: 'KingLift Administrator' },
    { email: 'admin@s3vtgroup.com.kh', name: 'S3VT Group Administrator' }
  ];

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
                KingLift Enterprise Portal
              </div>
              <div className="text-[10px] text-slate-400">Authorized Domain Control</div>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Authorized Domains Notification Bar */}
        <div className="bg-slate-950/90 px-6 py-2.5 border-b border-slate-800/80 text-[11px] space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authorized Enterprise Whitelist</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
            <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">@kinglift.us</span>
            <span className="px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-300">@s3vtgroup.com.kh</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">chamnabmey.info@gmail.com</span>
          </div>
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
            Register Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          
          {/* Error Banner */}
          {error && (
            <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400 mt-0.5" />
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* GOOGLE SIGN IN BUTTON */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setShowGooglePicker(!showGooglePicker)}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold shadow-md transition-all active:scale-98 disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.1s.7 5.4 1.9 7.8l3.7-2.9z"/>
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 6.3 10.1 6.3z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Google Account Selector Popover */}
            {showGooglePicker && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
                  <span>Select Authorized Google Account:</span>
                  <button onClick={() => setShowGooglePicker(false)} className="text-slate-500 hover:text-white">✕</button>
                </div>
                {allowedGoogleAccounts.map((acc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleGoogleSelect(acc)}
                    className="w-full p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-left flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="font-bold text-white text-xs group-hover:text-amber-400">{acc.name}</div>
                      <div className="font-mono text-[10px] text-slate-400">{acc.email}</div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px bg-slate-800 flex-1"></div>
            <span className="text-[10px] uppercase font-mono text-slate-500">or sign in with password</span>
            <div className="h-px bg-slate-800 flex-1"></div>
          </div>

          {authModalTab === 'login' ? (
            
            /* SIGN IN FORM */
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase">Authorized Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="chamnabmey.info@gmail.com or you@kinglift.us"
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
                <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick Fill Whitelist Buttons */}
              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">1-Click Authorized Credentials:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10px]">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('chamnabmey.info@gmail.com');
                      setPassword('admin1234');
                      setError(null);
                    }}
                    className="py-1.5 px-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-emerald-500/30 text-emerald-300 text-left font-mono truncate"
                  >
                    👑 chamnabmey.info@...
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEmail('admin@kinglift.us');
                      setPassword('admin1234');
                      setError(null);
                    }}
                    className="py-1.5 px-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-amber-500/30 text-amber-300 text-left font-mono truncate"
                  >
                    🏢 admin@kinglift.us
                  </button>
                </div>
              </div>

            </form>

          ) : (

            /* SIGN UP FORM */
            <form onSubmit={handleSignup} className="space-y-3 text-xs">
              
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chamnab Mey"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 pl-9 pr-3 py-2 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase">Enterprise Work Email *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="you@kinglift.us, you@s3vtgroup.com.kh, or chamnabmey.info@gmail.com"
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
                      placeholder="KingLift / S3VT Group"
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
                <span>{loading ? 'Registering Account...' : 'Register Authorized Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}

          <div className="pt-2 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Strict enterprise domain whitelist enforced</span>
          </div>

        </div>

      </div>
    </div>
  );
};
