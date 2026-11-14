import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  EyeOff
} from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup' && !name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const displayName = mode === 'signup' ? name : (email.split('@')[0] || 'Alex Morgan');
      const initials = displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase() || 'AM';

      const user: UserProfile = {
        id: `usr-${Date.now()}`,
        name: displayName,
        email,
        initials,
        role: 'Personal account',
        dateJoined: 'Nov 2026'
      };

      onSuccess(user);
    }, 700);
  };

  const handleQuickDemoLogin = (demoName: string, demoEmail: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const initials = demoName
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

      const user: UserProfile = {
        id: `usr-${Date.now()}`,
        name: demoName,
        email: demoEmail,
        initials,
        role: 'Personal account',
        dateJoined: 'Nov 2026'
      };
      onSuccess(user);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-[#dce6dd] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="bg-[#f4f8f4] border-b border-[#e1eae2] p-6 text-center relative">
          {/* Custom HealthMate Emblem Logo */}
          <div className="flex justify-center mb-3">
            <img 
              src="/assets/healthmate-logo-tight.png" 
              alt="HEALTHMATE Logo" 
              className="w-14 h-14 object-contain mix-blend-multiply"
            />
          </div>

          <h2 className="text-xl font-bold text-[#1b2b1f]">
            {mode === 'login' ? 'Welcome back to HealthMate' : 'Create your HealthMate account'}
          </h2>
          <p className="text-xs text-[#5d7062] mt-1 max-w-xs mx-auto">
            {mode === 'login' 
              ? 'Access your private medical reports, reminders, and AI health summaries.' 
              : 'Keep all your health records in one calm, easy-to-understand place.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#e5ece5] bg-[#fafcfa] text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-3 transition text-center cursor-pointer ${
              mode === 'login'
                ? 'border-b-2 border-[#2c4a34] text-[#2c4a34] bg-white font-bold'
                : 'text-[#647768] hover:text-[#2c4a34]'
            }`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(''); }}
            className={`flex-1 py-3 transition text-center cursor-pointer ${
              mode === 'signup'
                ? 'border-b-2 border-[#2c4a34] text-[#2c4a34] bg-white font-bold'
                : 'text-[#647768] hover:text-[#2c4a34]'
            }`}
          >
            Sign up
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#27382b] mb-1">
                  Full name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#f8faf8] border border-[#dce6dd] rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#2c4a34]/25 focus:border-[#2c4a34]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#27382b] mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="alex.morgan@healthmate.app"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#f8faf8] border border-[#dce6dd] rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#2c4a34]/25 focus:border-[#2c4a34]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-[#27382b]">
                  Password
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset instructions sent to your email!')}
                    className="text-[11px] text-[#2c4a34] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 bg-[#f8faf8] border border-[#dce6dd] rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#2c4a34]/25 focus:border-[#2c4a34]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <label className="flex items-start gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded text-[#2c4a34] focus:ring-[#2c4a34]"
                />
                <span className="text-[11px] text-[#556959] leading-tight">
                  I agree that HealthMate is an educational tool and does not replace medical emergencies or direct physician orders.
                </span>
              </label>
            )}

            <button
              type="submit"
              disabled={isLoading || (mode === 'signup' && !agreeTerms)}
              className="w-full bg-[#2c4a34] hover:bg-[#203626] disabled:opacity-50 text-white py-3 rounded-xl text-xs md:text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2 shadow-xs mt-2"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Securing personal vault...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Log in to HealthMate' : 'Create free account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Demo Login */}
          <div className="pt-2 border-t border-[#edf3ed]">
            <span className="text-[11px] text-[#718474] font-medium block text-center mb-2">
              Or quick test with demo profiles:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Alex Morgan', 'alex.morgan@healthmate.app')}
                className="p-2 text-left bg-[#f4f8f4] hover:bg-[#eaf1eb] border border-[#dbe6dc] rounded-xl transition text-[11px] text-[#2c4a34] font-medium"
              >
                <span className="font-bold block text-[#1b2b1f]">Alex Morgan</span>
                <span className="text-[10px] text-[#637667]">Personal account</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Dr. Sarah Chen', 'dr.sarah.chen@clinic.org')}
                className="p-2 text-left bg-[#f4f8f4] hover:bg-[#eaf1eb] border border-[#dbe6dc] rounded-xl transition text-[11px] text-[#2c4a34] font-medium"
              >
                <span className="font-bold block text-[#1b2b1f]">Dr. Sarah Chen</span>
                <span className="text-[10px] text-[#637667]">Clinician view</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Security Badge */}
        <div className="p-3.5 bg-[#f4f8f4] border-t border-[#e2ece3] flex items-center justify-center gap-1.5 text-[11px] text-[#556958]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2c4a34]" />
          <span>Encrypted patient vault • No commercial profiling</span>
        </div>
      </div>
    </div>
  );
};
