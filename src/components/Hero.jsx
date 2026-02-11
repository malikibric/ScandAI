import { useNexus } from '../context/NexusContext';

function Bubble({ size, left, top, color, delay, animation }) {
  return (
    <div
      className={`absolute rounded-full ${animation}`}
      style={{
        width: size,
        height: size,
        left,
        top,
        backgroundColor: color,
        animationDelay: delay,
      }}
    />
  );
}

export default function Hero() {
  const { setActivePage } = useNexus();

  const bubbles = [
    // Large bubbles
    { size: '140px', left: '42%', top: '30%', color: '#9333EA', delay: '0s', animation: 'animate-float-slow' },
    { size: '120px', left: '70%', top: '15%', color: '#7C3AED', delay: '2s', animation: 'animate-float' },
    { size: '100px', left: '55%', top: '55%', color: '#A855F7', delay: '1s', animation: 'animate-float-reverse' },
    { size: '90px', left: '80%', top: '50%', color: '#6D28D9', delay: '3s', animation: 'animate-float-slow' },
    // Medium bubbles
    { size: '70px', left: '35%', top: '55%', color: '#8B5CF6', delay: '0.5s', animation: 'animate-float' },
    { size: '60px', left: '62%', top: '10%', color: '#C084FC', delay: '1.5s', animation: 'animate-float-reverse' },
    { size: '55px', left: '48%', top: '70%', color: '#7C3AED', delay: '2.5s', animation: 'animate-float-slow' },
    { size: '50px', left: '85%', top: '25%', color: '#A855F7', delay: '0.8s', animation: 'animate-float' },
    { size: '45px', left: '25%', top: '25%', color: '#9333EA', delay: '1.2s', animation: 'animate-pulse-bubble' },
    // Small bubbles
    { size: '30px', left: '20%', top: '40%', color: '#C084FC', delay: '0.3s', animation: 'animate-float' },
    { size: '25px', left: '75%', top: '65%', color: '#A855F7', delay: '1.8s', animation: 'animate-float-reverse' },
    { size: '20px', left: '55%', top: '25%', color: '#D8B4FE', delay: '2.2s', animation: 'animate-pulse-bubble' },
    { size: '18px', left: '90%', top: '40%', color: '#C084FC', delay: '0.7s', animation: 'animate-float' },
    { size: '15px', left: '30%', top: '65%', color: '#A855F7', delay: '3.5s', animation: 'animate-float-slow' },
    // Tiny dots
    { size: '10px', left: '45%', top: '15%', color: '#D8B4FE', delay: '1s', animation: 'animate-pulse-bubble' },
    { size: '8px', left: '65%', top: '45%', color: '#C084FC', delay: '0.4s', animation: 'animate-float-reverse' },
    { size: '8px', left: '38%', top: '75%', color: '#E9D5FF', delay: '2.8s', animation: 'animate-float' },
    { size: '6px', left: '82%', top: '60%', color: '#D8B4FE', delay: '1.6s', animation: 'animate-pulse-bubble' },
    { size: '6px', left: '50%', top: '5%', color: '#C084FC', delay: '3.2s', animation: 'animate-float' },
    { size: '5px', left: '72%', top: '75%', color: '#E9D5FF', delay: '0.9s', animation: 'animate-float-reverse' },
    { size: '4px', left: '88%', top: '15%', color: '#D8B4FE', delay: '2.1s', animation: 'animate-pulse-bubble' },
    // Extra cluster dots (right side)
    { size: '12px', left: '78%', top: '35%', color: '#C084FC', delay: '1.3s', animation: 'animate-float' },
    { size: '10px', left: '80%', top: '33%', color: '#A855F7', delay: '1.5s', animation: 'animate-pulse-bubble' },
    { size: '8px', left: '83%', top: '37%', color: '#D8B4FE', delay: '1.7s', animation: 'animate-float-reverse' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-bg min-h-[85vh] flex items-center">
        {/* Purple Bubbles */}
        <div className="absolute inset-0 overflow-hidden">
          {bubbles.map((bubble, i) => (
            <Bubble key={i} {...bubble} />
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 italic">
            Welcome to the<br />new tech<br />community
          </h1>
          <p className="text-lg sm:text-xl text-text-muted max-w-xl mb-10 leading-relaxed">
            We are gathering Sweden's tech industry to connect, share and act on key issues shaping a thriving future.
          </p>
          <button
            onClick={() => setActivePage('nexus')}
            className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold uppercase tracking-widest px-8 py-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 cursor-pointer"
          >
            Tell me more
          </button>
        </div>
      </section>

      {/* Core Offerings Section */}
      <section className="bg-bg-card py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-bg/60 border border-border p-8 rounded-2xl hover:border-primary/40 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Industry Panels</h3>
              <p className="text-text-muted leading-relaxed">
                Get expert perspectives on key tech challenges through curated panel discussions
              </p>
            </div>
            <div className="bg-bg/60 border border-border p-8 rounded-2xl hover:border-primary/40 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Open Roundtables</h3>
              <p className="text-text-muted leading-relaxed">
                Share knowledge peer-to-peer across sectors in intimate group settings
              </p>
            </div>
            <div className="bg-bg/60 border border-border p-8 rounded-2xl hover:border-primary/40 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Expert Keynotes</h3>
              <p className="text-text-muted leading-relaxed">
                Be inspired by industry leaders sharing their insights and vision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Ingredients Section */}
      <section className="bg-bg py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Key Ingredients</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Actionable Insights</h3>
              <p className="text-text-muted">
                Share practical knowledge that drives real change across industries
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Cross-Industry Connection</h3>
              <p className="text-text-muted">
                Connect with peers across different sectors of the tech landscape
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Breaking Silos</h3>
              <p className="text-text-muted">
                Build a collaborative tech community that transcends organizational boundaries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="bg-primary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join the Community</h2>
          <p className="text-xl mb-8 text-white/80">
            Membership is free and open to all professionals in Sweden's tech industry
          </p>
          <button
            onClick={() => setActivePage('nexus')}
            className="bg-white text-primary-dark px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-gray-100 transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
          >
            Be among the first to join — sign up now!
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-bg-card py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-bg/60 border border-border p-8 rounded-2xl">
              <p className="text-lg text-text-muted italic mb-4">
                "This is exactly what the Swedish tech industry needs - a space where we can come together, share challenges, and build something bigger than ourselves."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  MJ
                </div>
                <div>
                  <div className="font-semibold text-white">Maria Johansson</div>
                  <div className="text-sm text-text-muted">CTO, Leading Tech Company</div>
                </div>
              </div>
            </div>
            <div className="bg-bg/60 border border-border p-8 rounded-2xl">
              <p className="text-lg text-text-muted italic mb-4">
                "Finally, a platform that focuses on collaboration over competition. The cross-industry connections I've made here are invaluable."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  AL
                </div>
                <div>
                  <div className="font-semibold text-white">Anders Lindqvist</div>
                  <div className="text-sm text-text-muted">Head of Innovation, Manufacturing Group</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
