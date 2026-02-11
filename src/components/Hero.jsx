import { useEffect, useRef, useState, useCallback } from 'react';
import { useNexus } from '../context/NexusContext';

function BubbleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.parentElement.offsetWidth;
    let height = canvas.parentElement.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const colors = [
      '#9333EA', '#7C3AED', '#A855F7', '#6D28D9',
      '#8B5CF6', '#C084FC', '#D8B4FE', '#581C87',
      '#7E22CE', '#B47AFF',
    ];

    // Create bubbles matching the techforward.se layout:
    // - Scattered across center and right side
    // - Varying sizes from tiny dots (3px) to large circles (160px)
    // - Text area (left 35%) has fewer/smaller bubbles
    const bubbleData = [
      // Large bubbles (center-right area)
      { x: 0.43, y: 0.38, r: 75, color: '#9333EA' },
      { x: 0.55, y: 0.52, r: 60, color: '#7C3AED' },
      { x: 0.68, y: 0.22, r: 50, color: '#A855F7' },
      { x: 0.78, y: 0.48, r: 65, color: '#6D28D9' },
      { x: 0.52, y: 0.72, r: 45, color: '#8B5CF6' },
      { x: 0.85, y: 0.62, r: 55, color: '#A855F7' },
      // Medium bubbles
      { x: 0.35, y: 0.30, r: 30, color: '#C084FC' },
      { x: 0.60, y: 0.12, r: 25, color: '#9333EA' },
      { x: 0.72, y: 0.68, r: 35, color: '#7C3AED' },
      { x: 0.48, y: 0.18, r: 20, color: '#A855F7' },
      { x: 0.90, y: 0.30, r: 28, color: '#8B5CF6' },
      { x: 0.40, y: 0.65, r: 22, color: '#6D28D9' },
      { x: 0.62, y: 0.42, r: 18, color: '#C084FC' },
      { x: 0.82, y: 0.15, r: 32, color: '#9333EA' },
      // Small bubbles
      { x: 0.25, y: 0.45, r: 12, color: '#D8B4FE' },
      { x: 0.55, y: 0.32, r: 10, color: '#C084FC' },
      { x: 0.75, y: 0.55, r: 14, color: '#A855F7' },
      { x: 0.42, y: 0.82, r: 11, color: '#8B5CF6' },
      { x: 0.88, y: 0.42, r: 9, color: '#D8B4FE' },
      { x: 0.65, y: 0.78, r: 13, color: '#7C3AED' },
      { x: 0.30, y: 0.58, r: 8, color: '#C084FC' },
      { x: 0.50, y: 0.08, r: 10, color: '#A855F7' },
      // Tiny dots
      { x: 0.20, y: 0.35, r: 5, color: '#D8B4FE' },
      { x: 0.70, y: 0.38, r: 4, color: '#C084FC' },
      { x: 0.58, y: 0.62, r: 5, color: '#D8B4FE' },
      { x: 0.83, y: 0.72, r: 3, color: '#C084FC' },
      { x: 0.45, y: 0.48, r: 4, color: '#A855F7' },
      { x: 0.92, y: 0.52, r: 3, color: '#D8B4FE' },
      { x: 0.38, y: 0.15, r: 5, color: '#C084FC' },
      { x: 0.76, y: 0.85, r: 4, color: '#D8B4FE' },
      { x: 0.28, y: 0.72, r: 3, color: '#A855F7' },
      // Dot clusters (right side)
      { x: 0.80, y: 0.35, r: 6, color: '#C084FC' },
      { x: 0.82, y: 0.33, r: 4, color: '#D8B4FE' },
      { x: 0.81, y: 0.37, r: 3, color: '#A855F7' },
      { x: 0.84, y: 0.34, r: 5, color: '#C084FC' },
      // More dots scattered
      { x: 0.15, y: 0.52, r: 3, color: '#8B5CF6' },
      { x: 0.95, y: 0.20, r: 4, color: '#D8B4FE' },
      { x: 0.33, y: 0.88, r: 3, color: '#C084FC' },
      { x: 0.67, y: 0.05, r: 4, color: '#A855F7' },
    ];

    const bubbles = bubbleData.map((b) => ({
      x: b.x * width,
      y: b.y * height,
      baseX: b.x * width,
      baseY: b.y * height,
      r: b.r,
      color: b.color,
      // Each bubble gets unique drift parameters for organic movement
      driftSpeedX: (Math.random() - 0.5) * 0.3,
      driftSpeedY: (Math.random() - 0.5) * 0.3,
      phase: Math.random() * Math.PI * 2,
      amplitude: 15 + Math.random() * 25,
      frequency: 0.0005 + Math.random() * 0.001,
    }));

    let animationId;
    let startTime = performance.now();

    function draw(timestamp) {
      const elapsed = timestamp - startTime;
      ctx.clearRect(0, 0, width, height);

      for (const b of bubbles) {
        // Organic slow drifting motion using sine waves
        const offsetX = Math.sin(elapsed * b.frequency + b.phase) * b.amplitude
                      + Math.sin(elapsed * b.frequency * 0.7 + b.phase * 1.3) * b.amplitude * 0.5;
        const offsetY = Math.cos(elapsed * b.frequency * 0.8 + b.phase * 0.7) * b.amplitude
                      + Math.cos(elapsed * b.frequency * 0.5 + b.phase * 1.1) * b.amplitude * 0.4;

        const drawX = b.baseX + offsetX;
        const drawY = b.baseY + offsetY;

        ctx.beginPath();
        ctx.arc(drawX, drawY, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    function handleResize() {
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      // Recalculate base positions on resize
      bubbleData.forEach((b, i) => {
        bubbles[i].baseX = b.x * width;
        bubbles[i].baseY = b.y * height;
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}

function CircleCursor({ containerRef }) {
  const cursorRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;

    function onMove(e) {
      const rect = container.getBoundingClientRect();
      target.current.x = e.clientX - rect.left;
      target.current.y = e.clientY - rect.top;
      if (!visible.current) {
        visible.current = true;
        pos.current.x = target.current.x;
        pos.current.y = target.current.y;
        cursor.style.opacity = '1';
      }
    }

    function onEnter() {
      cursor.style.opacity = '1';
      visible.current = true;
    }

    function onLeave() {
      cursor.style.opacity = '0';
      visible.current = false;
    }

    let rafId;
    function animate() {
      // Smooth lerp follow
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      cursor.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px)`;
      rafId = requestAnimationFrame(animate);
    }

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [containerRef]);

  return (
    <div
      ref={cursorRef}
      className="absolute top-0 left-0 w-10 h-10 rounded-full border-2 border-white/50 pointer-events-none z-20 opacity-0 transition-opacity duration-200"
      style={{ willChange: 'transform' }}
    />
  );
}

export default function Hero() {
  const { setActivePage } = useNexus();
  const heroRef = useRef(null);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-bg cursor-none" style={{ minHeight: 'calc(100vh - 100px)' }}>
        {/* Canvas Bubble Animation */}
        <BubbleCanvas />

        {/* Custom circle cursor */}
        <CircleCursor containerRef={heroRef} />

        {/* Text content - bottom left aligned like techforward.se */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-full flex flex-col justify-end pb-20 sm:pb-28" style={{ minHeight: 'calc(100vh - 100px)' }}>
          <div className="max-w-[620px]">
            <h1
              className="text-white mb-6"
              style={{
                fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(3.25rem, 5.5vw, 6rem)',
                lineHeight: '90%',
                letterSpacing: 'clamp(-0.13rem, -0.4vw, -0.3rem)',
              }}
            >
              Welcome to the<br />new tech<br />community
            </h1>
            <p
              className="text-text-muted max-w-lg mb-10"
              style={{
                fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
                fontSize: 'clamp(0.95rem, 1.1vw, 1.125rem)',
                lineHeight: '170%',
                fontWeight: 400,
              }}
            >
              We are gathering Sweden's tech industry to connect, share and act on key issues shaping a thriving future.
            </p>
            <button
              onClick={() => setActivePage('nexus')}
              className="bg-primary hover:bg-primary-dark text-white text-[0.7rem] font-semibold uppercase tracking-[0.25em] px-7 py-3.5 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 cursor-none"
            >
              Tell me more
            </button>
          </div>
        </div>
      </section>

      {/* In the Spotlight */}
      <section className="bg-bg py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-10">In the Spotlight</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-bg-card border border-border rounded-2xl overflow-hidden group hover:border-primary/40 transition-colors">
              <div className="h-48 bg-gradient-to-br from-primary/40 to-accent/30 flex items-center justify-center">
                <span className="text-5xl">🤝</span>
              </div>
              <div className="p-6">
                <span className="tag bg-primary/20 text-primary-light text-xs mb-3">New feature</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-2">Launching Mentorship</h3>
                <p className="text-sm text-text-muted leading-relaxed">Exciting news! Our new mentorship program connects experienced tech leaders with emerging talent across Sweden.</p>
              </div>
            </div>
            <div className="bg-bg-card border border-border rounded-2xl overflow-hidden group hover:border-primary/40 transition-colors">
              <div className="h-48 bg-gradient-to-br from-purple-deep/40 to-primary/30 flex items-center justify-center">
                <span className="text-5xl">📡</span>
              </div>
              <div className="p-6">
                <span className="tag bg-accent/20 text-accent text-xs mb-3">Article</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-2">Trends from CES</h3>
                <p className="text-sm text-text-muted leading-relaxed">Insights from CES with Julia Valentin — the biggest takeaways for the Swedish tech industry.</p>
              </div>
            </div>
            <div className="bg-bg-card border border-border rounded-2xl overflow-hidden group hover:border-primary/40 transition-colors">
              <div className="h-48 bg-gradient-to-br from-accent/30 to-purple-dark/40 flex items-center justify-center">
                <span className="text-5xl">🏛️</span>
              </div>
              <div className="p-6">
                <span className="tag bg-success/20 text-success text-xs mb-3">News</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-2">Our Advisory Board</h3>
                <p className="text-sm text-text-muted leading-relaxed">We're excited to welcome our Advisory Board — a group of experienced leaders who bring deep insight from across the tech landscape.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Events */}
      <section className="bg-bg-card py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-10">Latest Events</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: 'Circular Economy & The Future of Consumption',
                emoji: '♻️',
                gradient: 'from-green-900/40 to-primary/20',
              },
              {
                title: 'Intelligent Impact: How Tech & AI Scale Sustainability',
                emoji: '🤖',
                gradient: 'from-primary/40 to-accent/20',
              },
              {
                title: 'How to change the world - Starting with a chocolate bar',
                emoji: '🍫',
                gradient: 'from-accent/30 to-purple-dark/30',
              },
            ].map((event) => (
              <div key={event.title} className="bg-bg/60 border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-colors">
                <div className={`h-40 bg-gradient-to-br ${event.gradient} flex items-center justify-center`}>
                  <span className="text-4xl">{event.emoji}</span>
                </div>
                <div className="p-6">
                  <span className="tag bg-primary/20 text-primary-light text-xs mb-3">Conference event</span>
                  <h3 className="text-base font-bold text-white mt-2 mb-2">{event.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    An exclusive event for the leaders in business, politics and academia that will impact the tomorrow.
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="bg-primary/20 text-primary-light hover:bg-primary/30 text-sm font-semibold uppercase tracking-[0.15em] px-8 py-3 rounded-md transition-colors cursor-pointer">
              All Latest events
            </button>
          </div>
        </div>
      </section>

      {/* Program Overview + Offerings */}
      <section className="bg-bg py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-text-muted leading-relaxed max-w-4xl mx-auto text-center mb-16">
            Tech Forward is a new initiative by Technology Industries of Sweden to increase knowledge sharing and build new connections in the tech industry. We'll be arranging a dynamic program of digital and live events, all focusing on interactivity — both at techforward.se and at key industry summits.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-bg-card border border-border p-8 rounded-2xl hover:border-primary/40 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Industry panels</h3>
              <p className="text-text-muted leading-relaxed">
                Listen in and interact with our expert panel as they take on the biggest challenges facing tech right now, offering insightful perspectives.
              </p>
            </div>
            <div className="bg-bg-card border border-border p-8 rounded-2xl hover:border-primary/40 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Open roundtables</h3>
              <p className="text-text-muted leading-relaxed">
                Take a seat at the table with your industry peers to share insights, make your voice heard and explore fresh perspectives on shared critical challenges.
              </p>
            </div>
            <div className="bg-bg-card border border-border p-8 rounded-2xl hover:border-primary/40 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Expert keynotes</h3>
              <p className="text-text-muted leading-relaxed">
                Learn and get inspired from leading experts who are taking bold, positive actions to drive progress around key topics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Ingredients for Positive Change */}
      <section className="bg-bg-card py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Key ingredients for positive change</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center px-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Share actionable insights</h3>
              <p className="text-text-muted leading-relaxed">
                What's your biggest challenge? Chances are your colleagues in other sectors have faced it before. We are lowering the barriers for sharing insights worth acting upon.
              </p>
            </div>
            <div className="text-center px-4">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Connect with peers</h3>
              <p className="text-text-muted leading-relaxed">
                When tech experts from different industries meet, magic happens. We're here to help you find others facing similar challenges – and work together to unlock new possibilities.
              </p>
            </div>
            <div className="text-center px-4">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Act beyond the silos</h3>
              <p className="text-text-muted leading-relaxed">
                Be part of a community of likeminded 'tech doers' who work in a cross-industry fashion and collaborate across silos to advance the Swedish tech industry and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="bg-primary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join us</h2>
          <p className="text-xl mb-8 text-white/80 leading-relaxed">
            Membership is free and open to anyone interested in shaping a positive, world-class future for the Swedish tech industry. Be among the first to join — sign up now!
          </p>
          <button
            onClick={() => setActivePage('nexus')}
            className="bg-white text-primary-dark px-8 py-3.5 rounded-md font-semibold text-sm uppercase tracking-[0.15em] hover:bg-gray-100 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            Join the community
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-bg py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-bg-card border border-border p-8 rounded-2xl">
              <p className="text-lg text-text-muted italic mb-6 leading-relaxed">
                "Our goal is to create a hub where industry peers can connect and work together towards a sustainable and competitive future for Swedish technology"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  PS
                </div>
                <div>
                  <div className="font-semibold text-white">Pia Sandvik</div>
                  <div className="text-sm text-text-muted">Teknikföretagen — CEO</div>
                </div>
              </div>
            </div>
            <div className="bg-bg-card border border-border p-8 rounded-2xl">
              <p className="text-lg text-text-muted italic mb-6 leading-relaxed">
                "The single most important factor in the Swedish innovation system is that large companies talk to each other and learn best practices on how to best collaborate with startups and SMEs."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  KS
                </div>
                <div>
                  <div className="font-semibold text-white">Karoly Szipka</div>
                  <div className="text-sm text-text-muted">IPercept — CEO and Founder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-bg-card py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Sound interesting?</h2>
          <p className="text-lg text-text-muted mb-8 leading-relaxed">
            Let's talk — we'd love to hear your ideas on advancing Swedish tech.
          </p>
          <a
            href="mailto:hello@techforward.se"
            className="text-primary hover:text-primary-light text-lg font-semibold hover:underline transition-colors"
          >
            hello@techforward.se
          </a>
        </div>
      </section>
    </>
  );
}
