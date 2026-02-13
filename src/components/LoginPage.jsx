import { useState } from 'react';
import {
  Loader2,
  Eye,
  EyeOff,
  AlertCircle,
  Zap,
  ArrowRight,
  Mail,
  Lock,
  Sparkles,
  Users,
  Shield,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, authError, isLoading, clearError } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'join'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [joinName, setJoinName] = useState('');
  const [joinCompany, setJoinCompany] = useState('');
  const [joinSubmitted, setJoinSubmitted] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    await login(email.trim(), password.trim());
  };

  const handleJoin = (e) => {
    e.preventDefault();
    setJoinSubmitted(true);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    clearError();
    setJoinSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-800/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-[80px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #8B5CF6 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Floating orbs */}
        <div className="absolute top-[15%] right-[20%] w-3 h-3 rounded-full bg-purple-400/30 animate-pulse" />
        <div className="absolute top-[60%] left-[15%] w-2 h-2 rounded-full bg-violet-400/20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[25%] right-[35%] w-4 h-4 rounded-full border border-purple-500/20" />
        <div className="absolute top-[30%] left-[30%] w-6 h-6 rounded-full border border-violet-500/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-12">
        {/* Logo */}
        <div className="mb-10 text-center animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-light text-white tracking-wide lowercase">
              tech forward
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 text-purple-300/80 text-sm">
            <Sparkles className="w-4 h-4" />
            <span className="font-semibold tracking-wider uppercase text-xs">ScandAI Platform</span>
          </div>
        </div>

        {/* Auth Card */}
        <div
          className="w-full max-w-md animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="bg-bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl shadow-purple-900/20 overflow-hidden">
            {/* Tab Switcher */}
            <div className="flex border-b border-border">
              <button
                onClick={() => switchMode('login')}
                className={`flex-1 py-4 text-sm font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'text-white bg-primary/10 border-b-2 border-primary'
                    : 'text-text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => switchMode('join')}
                className={`flex-1 py-4 text-sm font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  mode === 'join'
                    ? 'text-white bg-primary/10 border-b-2 border-primary'
                    : 'text-text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                Join
              </button>
            </div>

            <div className="p-8">
              {/* ── LOGIN FORM ─────────────────────── */}
              {mode === 'login' && (
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-white mb-1">
                      Welcome back
                    </h2>
                    <p className="text-sm text-text-muted">
                      Sign in to access the ScandAI network
                    </p>
                  </div>

                  {/* Error Message */}
                  {authError && (
                    <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 animate-fade-in">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span className="text-sm text-red-300">{authError}</span>
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); clearError(); }}
                        placeholder="user@scand.ai"
                        className="input-field pl-11"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); clearError(); }}
                        placeholder="••••••••"
                        className="input-field pl-11 pr-11"
                        autoComplete="current-password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light hover:text-white transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot password link */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-xs text-primary hover:text-purple-300 transition-colors cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading || !email.trim() || !password.trim()}
                    className="btn-primary w-full justify-center py-3.5 text-[15px] rounded-xl"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Hint */}
                  <div className="mt-4 p-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
                    <p className="text-[11px] text-purple-300/60 text-center leading-relaxed">
                      <span className="font-semibold text-purple-300/80">Demo credentials:</span>{' '}
                      user@scand.ai / password123
                    </p>
                  </div>
                </form>
              )}

              {/* ── JOIN / SIGNUP FORM ─────────────── */}
              {mode === 'join' && !joinSubmitted && (
                <form onSubmit={handleJoin} className="space-y-5">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-white mb-1">
                      Join ScandAI
                    </h2>
                    <p className="text-sm text-text-muted">
                      Request access to Sweden's AI-powered industry network
                    </p>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={joinName}
                      onChange={(e) => setJoinName(e.target.value)}
                      placeholder="Anna Johansson"
                      className="input-field"
                      required
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={joinCompany}
                      onChange={(e) => setJoinCompany(e.target.value)}
                      placeholder="e.g. Ericsson, Scania, SAAB..."
                      className="input-field"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      placeholder="anna@company.se"
                      className="input-field"
                      required
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn-primary w-full justify-center py-3.5 text-[15px] rounded-xl"
                  >
                    Request Access
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* ── JOIN SUCCESS ────────────────────── */}
              {mode === 'join' && joinSubmitted && (
                <div className="text-center py-6 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
                    <Shield className="w-7 h-7 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Request Submitted
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-6">
                    Thank you, <span className="text-white font-medium">{joinName || 'member'}</span>.
                    Our team will review your application and you'll receive an
                    invitation within 24-48 hours.
                  </p>
                  <button
                    onClick={() => switchMode('login')}
                    className="btn-secondary text-sm"
                  >
                    Back to Login
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom features */}
          <div
            className="grid grid-cols-3 gap-3 mt-6 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            {[
              { icon: Shield, label: 'Encrypted', desc: 'End-to-end' },
              { icon: Users, label: '4,500+', desc: 'Members' },
              { icon: Sparkles, label: 'AI-Powered', desc: 'Matching' },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl bg-bg-card/40 border border-border/50"
              >
                <Icon className="w-4 h-4 text-purple-400/70" />
                <span className="text-xs font-semibold text-white">{label}</span>
                <span className="text-[10px] text-text-muted">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer text */}
        <p
          className="mt-8 text-[11px] text-text-muted/50 text-center animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          © 2026 Teknikföretagen — Technology Industries of Sweden
        </p>
      </div>
    </div>
  );
}
