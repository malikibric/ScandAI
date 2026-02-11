import { ArrowRight, Shield, Sparkles, Network } from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { stats } from '../data/mockData';

export default function Hero() {
  const { setActivePage } = useNexus();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-bg">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-48 -left-24 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #1A1A1A 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light border border-primary/10 mb-8 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
              Teknikföretagen Innovation Platform
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-text leading-[1.08] tracking-tight mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            Bridging the Gap
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
              in Swedish Industry
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Where established manufacturers meet disruptive startups.
            AI-powered matchmaking, anonymous problem solving, and industrial
            symbiosis — all in one secure platform.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <button
              onClick={() => setActivePage('nexus')}
              className="btn-primary text-base px-8 py-3.5 rounded-xl shadow-lg shadow-primary/20"
            >
              Enter NEXUS Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="btn-secondary text-base px-8 py-3.5 rounded-xl">
              Watch Demo
            </button>
          </div>

          {/* Feature Pills */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 mb-16 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            {[
              { icon: Shield, label: 'Trust Vault', color: 'text-primary' },
              { icon: Sparkles, label: 'AI Matchmaker', color: 'text-accent' },
              { icon: Network, label: 'Symbiosis Agent', color: 'text-success' },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm"
              >
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-sm font-medium text-text">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div
          className="max-w-3xl mx-auto animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="glass-card p-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: stats.activeMembers, label: 'Active Members' },
              { value: stats.problemsSolved, label: 'Problems Solved' },
              { value: stats.resourceMatches, label: 'Resource Matches' },
              { value: stats.carbonSaved, label: 'Carbon Saved' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
                  {value}
                </div>
                <div className="text-xs sm:text-sm text-text-muted mt-1 font-medium">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
