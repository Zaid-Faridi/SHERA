import React, { useState, useEffect, useRef } from 'react';

/* ── Animated counter hook ── */
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = ts => {
      if (!startTime) startTime = ts;
      const pct = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - pct, 3);
      setCount(Math.floor(ease * target));
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ── Intersection observer ── */
function useVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Risk Ring SVG ── */
const RiskRing = ({ pct = 72, size = 120 }) => {
  const r = (size - 20) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#FB7185" />
          <stop offset="50%"  stopColor="#EC4899" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      <circle
        cx={size/2} cy={size/2} r={r}
        fill="none" stroke="rgba(236,72,153,0.12)" strokeWidth="10"
      />
      <circle
        cx={size/2} cy={size/2} r={r}
        fill="none" stroke="url(#ringGrad)" strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(.34,1.56,.64,1)' }}
        filter="drop-shadow(0 0 6px rgba(236,72,153,0.55))"
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
        style={{ fill: '#E11D48', fontSize: size * 0.22, fontWeight: 800, fontFamily: 'Inter,sans-serif' }}>
        {pct}%
      </text>
      <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle"
        style={{ fill: '#9B6B8A', fontSize: size * 0.10, fontWeight: 600, fontFamily: 'Inter,sans-serif' }}>
        Moderate
      </text>
    </svg>
  );
};

/* ── Hologram figure (pure CSS/SVG) ── */
const HologramFigure = () => (
  <div style={{
    position: 'relative', width: 130, display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    animation: 'floatY 4s ease-in-out infinite',
  }}>
    <svg width="110" height="220" viewBox="0 0 110 220" fill="none">
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(236,72,153,0.6)" />
          <stop offset="100%" stopColor="rgba(168,85,247,0.3)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Body silhouette */}
      <ellipse cx="55" cy="30" rx="18" ry="18" fill="url(#bodyGrad)" opacity="0.8" filter="url(#glow)"/>
      <path d="M30 60 Q55 50 80 60 L88 140 Q55 155 22 140 Z" fill="url(#bodyGrad)" opacity="0.7" filter="url(#glow)"/>
      <path d="M30 65 L14 125 Q18 130 26 128 L36 80" fill="url(#bodyGrad)" opacity="0.55"/>
      <path d="M80 65 L96 125 Q92 130 84 128 L74 80" fill="url(#bodyGrad)" opacity="0.55"/>
      <path d="M40 140 L34 200 Q40 206 48 204 L52 155" fill="url(#bodyGrad)" opacity="0.65"/>
      <path d="M70 140 L76 200 Q70 206 62 204 L58 155" fill="url(#bodyGrad)" opacity="0.65"/>
      {/* Data scan lines */}
      {[80, 100, 120, 145].map((y, i) => (
        <line key={i} x1="18" y1={y} x2="92" y2={y}
          stroke="rgba(236,72,153,0.3)" strokeWidth="1"
          strokeDasharray="4 6"
          style={{ animation: `neon-pulse ${1.8 + i * 0.3}s ${i * 0.2}s infinite` }}
        />
      ))}
      {/* Pulse dots */}
      {[[55,95],[55,120],[55,148]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="3"
          fill="rgba(236,72,153,0.85)"
          style={{ animation: `neon-pulse ${1.2 + i * 0.4}s ${i * 0.3}s infinite` }}
        />
      ))}
    </svg>
    {/* Outer glow ring */}
    <div style={{
      position: 'absolute', inset: -20,
      borderRadius: '50%',
      background: 'radial-gradient(ellipse, rgba(236,72,153,0.15) 0%, transparent 70%)',
    }}/>
  </div>
);

/* ── Mini progress bar ── */
const MiniBar = ({ label, val, color = '#EC4899' }) => (
  <div style={{ marginBottom: 10 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#6B2A5F' }}>{label}</span>
      <span style={{ fontSize: '0.72rem', fontWeight: 700, color }}>
        {val === 'High' ? '🔴 High' : val === 'Medium' ? '🟡 Med' : '🟢 Low'}
      </span>
    </div>
    <div style={{ height: 5, background: 'rgba(236,72,153,0.10)', borderRadius: 999, overflow: 'hidden' }}>
      <div style={{
        height: '100%', borderRadius: 999,
        width: val === 'High' ? '80%' : val === 'Medium' ? '50%' : '25%',
        background: color, transition: 'width 1.4s ease',
      }}/>
    </div>
  </div>
);

/* ════════════════════════════════════
   HOME COMPONENT
   ════════════════════════════════════ */
const Home = ({ setActiveTab, onOpenLogin, onOpenSignup }) => {

  /* Feature cards */
  const features = [
    {
      title: 'Early Detection',
      description: 'AI-powered risk assessment to identify potential PCOS/PCOD before symptoms worsen.',
      icon: '🔍',
      tab: 'early-detection',
      gradient: 'linear-gradient(135deg,rgba(251,113,133,0.12),rgba(236,72,153,0.06))',
      iconBg: 'linear-gradient(135deg,#FB7185,#E11D48)',
      accent: '#E11D48',
      bg: 'rgba(254,205,211,0.3)',
    },
    {
      title: 'Period Tracking',
      description: 'Monitor your cycle, symptoms, and identify irregular patterns with smart insights.',
      icon: '📅',
      tab: 'tracker',
      gradient: 'linear-gradient(135deg,rgba(236,72,153,0.10),rgba(168,85,247,0.06))',
      iconBg: 'linear-gradient(135deg,#EC4899,#A855F7)',
      accent: '#A855F7',
      bg: 'rgba(237,233,254,0.3)',
    },
    {
      title: 'Lifestyle Recommendations',
      description: 'Get personalized diet, exercise, and wellness plans tailored to your unique profile.',
      icon: '🥗',
      tab: 'resources',
      gradient: 'linear-gradient(135deg,rgba(52,211,153,0.10),rgba(16,185,129,0.06))',
      iconBg: 'linear-gradient(135deg,#34D399,#059669)',
      accent: '#059669',
      bg: 'rgba(209,250,229,0.3)',
    },
    {
      title: 'Mental Health Support',
      description: 'Access tools for stress management, mood tracking, and guided meditation sessions.',
      icon: '🧠',
      tab: 'home',
      gradient: 'linear-gradient(135deg,rgba(139,92,246,0.10),rgba(109,40,217,0.06))',
      iconBg: 'linear-gradient(135deg,#8B5CF6,#6D28D9)',
      accent: '#7C3AED',
      bg: 'rgba(237,233,254,0.3)',
    },
    {
      title: 'Doctor Finder',
      description: 'Locate specialists near you for consultations and professional medical advice.',
      icon: '👩‍⚕️',
      tab: 'resources',
      gradient: 'linear-gradient(135deg,rgba(251,191,36,0.10),rgba(245,158,11,0.06))',
      iconBg: 'linear-gradient(135deg,#FBBF24,#D97706)',
      accent: '#B45309',
      bg: 'rgba(254,243,199,0.3)',
    },
    {
      title: 'Community Support',
      description: 'Connect with others, share experiences, and access educational resources.',
      icon: '👭',
      tab: 'community',
      gradient: 'linear-gradient(135deg,rgba(6,182,212,0.10),rgba(14,165,233,0.06))',
      iconBg: 'linear-gradient(135deg,#06B6D4,#0EA5E9)',
      accent: '#0284C7',
      bg: 'rgba(224,242,254,0.3)',
    },
  ];

  /* Impact metrics */
  const metrics = [
    { value: 10000, suffix: '+', label: 'Women Empowered', icon: '👩', color: '#E11D48' },
    { value: 92,    suffix: '%', label: 'Detection Accuracy', icon: '📊', color: '#A855F7' },
    { value: 50,    suffix: '+', label: 'Expert Specialists', icon: '🩺', color: '#059669' },
    { value: 24,    suffix: '/7', label: 'AI Support',        icon: '✨', color: '#D97706' },
  ];

  /* Intersection observers */
  const [heroRef,   heroVis]   = useVisible(0.1);
  const [diagRef,   diagVis]   = useVisible(0.1);
  const [impactRef, impactVis] = useVisible(0.15);
  const [ctaRef,    ctaVis]    = useVisible(0.15);

  const c0 = useCounter(metrics[0].value, 2000, impactVis);
  const c1 = useCounter(metrics[1].value, 1600, impactVis);
  const c2 = useCounter(metrics[2].value, 1400, impactVis);
  const c3 = useCounter(metrics[3].value, 800,  impactVis);
  const counters = [c0, c1, c2, c3];

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ══════════════════════════════
          HERO SECTION
          ══════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          padding: 'clamp(48px,7vw,96px) clamp(20px,5vw,80px)',
          maxWidth: 1280, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)',
          gap: 'clamp(32px,5vw,72px)',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* ── LEFT COPY ── */}
        <div style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? 'none' : 'translateX(-32px)', transition: 'all 0.75s ease' }}>

          {/* Pill badge */}
          <div className="section-pill" style={{ marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E11D48', display: 'inline-block', animation: 'neon-pulse 1.8s infinite' }}/>
            Next-Gen AI Diagnostics
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2.6rem,5vw,4.2rem)',
            fontWeight: 900, letterSpacing: '-0.03em',
            lineHeight: 1.1, color: '#1A0A2E', marginBottom: 24,
          }}>
            Empowering<br />
            Women's{' '}
            <span className="brand-gradient-text">Wellness.</span>
          </h1>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(1rem,1.5vw,1.13rem)',
            color: '#6B2A5F', lineHeight: 1.75,
            maxWidth: 500, marginBottom: 36,
          }}>
            SHEra combines advanced clinical intelligence with compassionate care
            to provide early detection, smart tracking, and personalized wellness
            plans for PCOS and PCOD.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
            <button
              onClick={() => setActiveTab('early-detection')}
              className="aura-button"
              style={{ padding: '14px 32px', fontSize: '1rem', borderRadius: 16 }}
            >
              Assess My Risk <span style={{ fontSize: '1.1rem' }}>→</span>
            </button>
            <button
              onClick={() => setActiveTab('tracker')}
              className="aura-button-outline"
              style={{ padding: '13px 30px', fontSize: '1rem', borderRadius: 16 }}
            >
              <span style={{ fontSize: '1rem' }}>📅</span> Launch Tracker
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {[
              { label: 'Clinical Grade AI', icon: '🛡️' },
              { label: 'Privacy Encrypted', icon: '🔒' },
              { label: 'Specialist Network', icon: '🌐' },
            ].map((b, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 16px', borderRadius: 999,
                background: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(236,72,153,0.14)',
                boxShadow: '0 2px 8px rgba(159,18,57,0.06)',
                fontSize: '0.8rem', fontWeight: 600, color: '#6B2A5F',
              }}>
                <span>{b.icon}</span>{b.label}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT DASHBOARD ── */}
        <div style={{
          opacity: heroVis ? 1 : 0,
          transform: heroVis ? 'none' : 'translateX(32px)',
          transition: 'all 0.85s 0.2s ease',
          position: 'relative',
        }}>
          {/* Glow orbs behind */}
          <div className="glow-orb" style={{
            width: 280, height: 280, top: -40, right: -40,
            background: 'rgba(236,72,153,0.15)',
          }}/>
          <div className="glow-orb" style={{
            width: 220, height: 220, bottom: -30, left: -30,
            background: 'rgba(168,85,247,0.12)',
          }}/>

          {/* Main dashboard card */}
          <div className="hero-dashboard" style={{ padding: '24px' }}>

            {/* Dashboard header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1A0A2E', letterSpacing: '0.03em' }}>
                🔮 AI HEALTH INSIGHTS
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6,
                fontSize: '0.7rem', fontWeight: 600, color: '#059669',
                background: 'rgba(5,150,105,0.08)', padding: '4px 10px', borderRadius: 999,
                border: '1px solid rgba(5,150,105,0.18)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'neon-pulse 1.5s infinite', display: 'inline-block' }}/>
                Live Analysis
              </div>
            </div>

            {/* Main content: ring + hologram + factors */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center', marginBottom: 20 }}>

              {/* Left: risk ring */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9B6B8A', marginBottom: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  PCOS Risk Assessment
                </div>
                <RiskRing pct={72} size={118} />
                <div style={{
                  marginTop: 10, fontSize: '0.68rem', fontWeight: 600,
                  color: '#E11D48', background: 'rgba(225,29,72,0.07)',
                  padding: '5px 10px', borderRadius: 8, display: 'inline-flex',
                  alignItems: 'center', gap: 6, border: '1px solid rgba(225,29,72,0.14)',
                }}>
                  ⚡ Early detection window
                </div>
              </div>

              {/* Centre: hologram */}
              <HologramFigure />

              {/* Right: key factors */}
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9B6B8A', marginBottom: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  KEY FACTORS
                </div>
                <MiniBar label="Hormonal Balance" val="High" color="#E11D48"/>
                <MiniBar label="Metabolic Health" val="Medium" color="#A855F7"/>
                <MiniBar label="Lifestyle Factors" val="Medium" color="#F59E0B"/>
                <MiniBar label="Stress Level" val="Low" color="#059669"/>

                <div className="hero-mini-card" style={{ marginTop: 14 }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9B6B8A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                    🤖 RECOMMENDATION
                  </div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#1A0A2E', lineHeight: 1.45 }}>
                    Personalized plan ready for you
                  </div>
                  <button
                    onClick={() => setActiveTab('early-detection')}
                    style={{
                      marginTop: 8, background: 'linear-gradient(135deg,#FB7185,#EC4899)',
                      border: 'none', borderRadius: 8, padding: '5px 12px',
                      color: 'white', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(236,72,153,0.3)',
                    }}
                  >
                    View →
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom 4 feature pills */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
              {[
                { icon: '📍', label: 'Smart Tracking', sub: 'Cycle & symptoms' },
                { icon: '🤖', label: 'AI Predictions', sub: 'Accurate insights' },
                { icon: '📋', label: 'Personalized Plans', sub: 'Just for you' },
                { icon: '💬', label: 'Expert Support', sub: 'Anytime, anywhere' },
              ].map((f, i) => (
                <div key={i} style={{
                  textAlign: 'center', padding: '12px 8px',
                  background: 'rgba(255,255,255,0.6)',
                  borderRadius: 12, border: '1px solid rgba(236,72,153,0.10)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(236,72,153,0.14)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <div style={{ fontSize: '1.3rem', marginBottom: 4 }}>{f.icon}</div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#1A0A2E', lineHeight: 1.2 }}>{f.label}</div>
                  <div style={{ fontSize: '0.6rem', color: '#9B6B8A', marginTop: 2 }}>{f.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          DIAGNOSTIC SUITE
          ══════════════════════════════ */}
      <section
        ref={diagRef}
        style={{
          padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,64px)',
          background: 'rgba(255,255,255,0.40)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: 56,
            opacity: diagVis ? 1 : 0, transform: diagVis ? 'none' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}>
            <div className="section-pill" style={{ marginBottom: 16 }}>🏥 Comprehensive Suite</div>
            <h2 style={{ fontSize: 'clamp(1.9rem,3.5vw,2.8rem)', fontWeight: 800, color: '#1A0A2E', marginBottom: 12 }}>
              Diagnostic Suite
            </h2>
            <p style={{ color: '#9B6B8A', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto' }}>
              Comprehensive tools for your complete wellness journey
            </p>
            <div style={{ width: 60, height: 4, borderRadius: 999, margin: '20px auto 0',
              background: 'linear-gradient(90deg,#FB7185,#EC4899,#A855F7)' }}/>
          </div>

          {/* Cards grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
            gap: 24,
          }}>
            {features.map((f, idx) => (
              <div
                key={idx}
                className="diag-card"
                style={{
                  background: f.gradient,
                  border: '1px solid rgba(236,72,153,0.10)',
                  opacity: diagVis ? 1 : 0,
                  transform: diagVis ? 'none' : 'translateY(28px)',
                  transition: `opacity 0.6s ${0.08*idx}s ease, transform 0.6s ${0.08*idx}s ease`,
                }}
                onClick={() => setActiveTab(f.tab)}
              >
                {/* Background illustration */}
                <div style={{
                  position: 'absolute', right: -20, top: -20, width: 120, height: 120,
                  borderRadius: '50%', background: f.bg, zIndex: 0,
                  transition: 'transform 0.4s ease',
                }}/>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Icon */}
                  <div className="diag-card-icon" style={{ background: f.iconBg, boxShadow: `0 8px 20px ${f.accent}33` }}>
                    <span style={{ fontSize: '1.6rem' }}>{f.icon}</span>
                  </div>

                  {/* Text */}
                  <h3 style={{ fontWeight: 800, fontSize: '1.12rem', color: '#1A0A2E', marginBottom: 10 }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#6B2A5F', lineHeight: 1.65, marginBottom: 0 }}>
                    {f.description}
                  </p>

                  {/* CTA arrow */}
                  <div className="diag-card-arrow" style={{ color: f.accent }}>
                    Access Tool <span style={{ fontSize: '1rem' }}>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          IMPACT METRICS
          ══════════════════════════════ */}
      <section
        ref={impactRef}
        style={{
          padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,64px)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: 48,
            opacity: impactVis ? 1 : 0, transform: impactVis ? 'none' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}>
            <div className="section-pill" style={{ marginBottom: 16 }}>📈 By the Numbers</div>
            <h2 style={{ fontWeight: 800, color: '#1A0A2E', marginBottom: 8 }}>SHEra Impact</h2>
            <p style={{ color: '#9B6B8A', fontSize: '1rem' }}>
              Trusted by thousands of women worldwide
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
            gap: 20,
          }}>
            {metrics.map((m, i) => (
              <div key={i} className="metric-card"
                style={{
                  opacity: impactVis ? 1 : 0,
                  transform: impactVis ? 'none' : 'translateY(28px)',
                  transition: `all 0.65s ${0.1*i}s ease`,
                }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 18, margin: '0 auto 16px',
                  background: `${m.color}14`,
                  border: `2px solid ${m.color}28`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.7rem',
                  boxShadow: `0 6px 18px ${m.color}20`,
                }}>
                  {m.icon}
                </div>
                <div style={{
                  fontWeight: 900, fontSize: 'clamp(2rem,3.5vw,2.8rem)',
                  lineHeight: 1, color: m.color, marginBottom: 6,
                  animation: impactVis ? `counter-pulse 0.6s ${0.3+i*0.15}s ease` : 'none',
                }}>
                  {i === 0
                    ? `${(counters[0]/1000).toFixed(1)}k+`
                    : i === 3
                    ? `${counters[3]}${m.suffix}`
                    : `${counters[i]}${m.suffix}`}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#6B2A5F' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA BANNER
          ══════════════════════════════ */}
      <section
        ref={ctaRef}
        style={{
          padding: 'clamp(24px,4vw,48px) clamp(20px,5vw,64px)',
          maxWidth: 1280, margin: '0 auto',
          paddingBottom: 'clamp(48px,7vw,80px)',
        }}
      >
        <div
          className="cta-banner"
          style={{
            padding: 'clamp(40px,5vw,64px) clamp(28px,5vw,72px)',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 32, alignItems: 'center',
            opacity: ctaVis ? 1 : 0,
            transform: ctaVis ? 'none' : 'translateY(32px)',
            transition: 'all 0.8s ease',
          }}
        >
          {/* Left */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 999, marginBottom: 20,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.20)',
              fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)',
              letterSpacing: '0.06em',
            }}>
              🌸 PROACTIVE HEALTH MANAGEMENT
            </div>

            <h2 style={{
              fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 900,
              color: '#fff', marginBottom: 16, letterSpacing: '-0.02em',
            }}>
              Take Control of<br />Your Wellness Today
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 520, marginBottom: 32 }}>
              The SHEra ecosystem is built on the latest clinical datasets and ultrasound
              imaging analysis to provide you with a comprehensive risk profile, long before
              symptoms manifest.
            </p>

            <button
              onClick={() => setActiveTab('early-detection')}
              style={{
                background: 'white',
                border: 'none', borderRadius: 14,
                padding: '14px 36px', fontSize: '1rem', fontWeight: 800,
                color: '#E11D48', cursor: 'pointer',
                boxShadow: '0 8px 28px rgba(0,0,0,0.25)',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 14px 40px rgba(0,0,0,0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.25)';
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>✨</span>
              Initialize AI Analysis
            </button>
          </div>

          {/* Right illustration */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
            animation: 'floatY 5s ease-in-out infinite',
          }} className="hidden md:flex">
            {/* Medical shield */}
            <div style={{
              width: 140, height: 140, borderRadius: '50%',
              background: 'rgba(255,255,255,0.10)',
              border: '2px solid rgba(255,255,255,0.20)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '4rem',
              boxShadow: '0 0 48px rgba(255,255,255,0.10)',
            }}>
              🛡️
            </div>
            {/* Decorative rings */}
            <div style={{
              position: 'absolute', width: 200, height: 200,
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '50%', animation: 'spin-slow 20s linear infinite',
              top: '50%', transform: 'translate(-50%,-50%)',
            }}/>
            <div style={{
              background: 'rgba(255,255,255,0.12)', borderRadius: 14,
              padding: '12px 20px', fontSize: '0.8rem', fontWeight: 700,
              color: 'white', border: '1px solid rgba(255,255,255,0.20)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.4rem', marginBottom: 4 }}>📈</div>
              AI Health Score<br />
              <span style={{ fontSize: '1.2rem', fontWeight: 900 }}>92%</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* Responsive hero grid */
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 900px) {
    .hero-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;
if (!document.getElementById('home-responsive')) {
  style.id = 'home-responsive';
  document.head.appendChild(style);
}

export default Home;