import React, { useState, useEffect } from 'react';
import PeriodPredictor from './PeriodPredictor';

/* ─────────────────────────────────────────────────
   SVG ICON SYSTEM
   ───────────────────────────────────────────────── */
const Ic = ({ n, s = 18, c = 'currentColor' }) => {
  const p = {
    calendar:  <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    flower:    <><circle cx="12" cy="12" r="3"/><path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4-4z"/></>,
    leaf:      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>,
    heart:     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor" stroke="none"/>,
    brain:     <><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></>,
    activity:  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    lock:      <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    sparkle:   <><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.937A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></>,
    check:     <polyline points="20 6 9 11 4 16"/>,
    checkC:    <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    trash:     <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
    arrowR:    <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    info:      <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    zap:       <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    drop:      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>,
    moon:      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>,
    sun:       <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/></>,
    trend:     <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>,
    pencil:    <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    clock:     <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    shield:    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    eye:       <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    chevD:     <polyline points="6 9 12 15 18 9"/>,
    wave:      <><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></>,
    target:    <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    thermom:   <><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></>,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24"
      fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {p[n]}
    </svg>
  );
};

/* ─────────────────────────────────────────────────
   SYMPTOM METADATA
   ───────────────────────────────────────────────── */
const SYMPTOM_META = {
  'Irregular periods':   { icon: 'wave',    grad: 'linear-gradient(135deg,#EC4899,#F43F5E)' },
  'Heavy bleeding':      { icon: 'drop',    grad: 'linear-gradient(135deg,#F43F5E,#E11D48)' },
  'Acne':                { icon: 'eye',     grad: 'linear-gradient(135deg,#EC4899,#A855F7)' },
  'Weight gain':         { icon: 'activity',grad: 'linear-gradient(135deg,#F59E0B,#EC4899)' },
  'Hair loss':           { icon: 'leaf',    grad: 'linear-gradient(135deg,#A855F7,#7C3AED)' },
  'Excess hair growth':  { icon: 'sparkle', grad: 'linear-gradient(135deg,#8B5CF6,#A855F7)' },
  'Fatigue':             { icon: 'moon',    grad: 'linear-gradient(135deg,#6366F1,#8B5CF6)' },
  'Mood swings':         { icon: 'heart',   grad: 'linear-gradient(135deg,#EC4899,#F43F5E)' },
  'Pelvic pain':         { icon: 'thermom', grad: 'linear-gradient(135deg,#F97316,#EC4899)' },
  'Headaches':           { icon: 'brain',   grad: 'linear-gradient(135deg,#7C3AED,#6366F1)' },
  'None of the above':   { icon: 'check',   grad: 'linear-gradient(135deg,#6B7280,#9CA3AF)' },
};

/* Mood options — values match original select options exactly */
const MOODS = [
  { value: 'excellent', emoji: '😊', label: 'Excellent', col: '#059669' },
  { value: 'good',      emoji: '🙂', label: 'Good',      col: '#10B981' },
  { value: 'neutral',   emoji: '😌', label: 'Neutral',   col: '#6B7280' },
  { value: 'poor',      emoji: '😔', label: 'Poor',      col: '#F59E0B' },
  { value: 'very-poor', emoji: '😣', label: 'Stressed',  col: '#E11D48' },
];

/* ─────────────────────────────────────────────────
   CYCLE RING (SVG donut)
   ───────────────────────────────────────────────── */
const CycleRing = ({ dayOfCycle, cycleLength = 28 }) => {
  const radius = 52, circ = 2 * Math.PI * radius;
  const pct    = Math.min(dayOfCycle / cycleLength, 1);
  const offset = circ * (1 - pct);
  return (
    <div style={{ position: 'relative', width: 130, height: 130, margin: '0 auto' }}>
      <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(236,72,153,0.10)" strokeWidth="10"/>
        <circle cx="60" cy="60" r={radius} fill="none"
          stroke="url(#ringGrad)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.34,1.56,0.64,1)', filter: 'drop-shadow(0 0 6px rgba(236,72,153,0.5))' }}/>
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E11D48"/>
            <stop offset="100%" stopColor="#A855F7"/>
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontWeight: 900, fontSize: '1.6rem', color: '#1A0A2E', lineHeight: 1 }}>{dayOfCycle}</div>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9B6B8A', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Day</div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────
   MAIN TRACKER COMPONENT — ALL ORIGINAL LOGIC
   ───────────────────────────────────────────────── */
const Tracker = ({ cycleData, setCycleData, symptoms, setSymptoms, symptomOptions, setActiveTab }) => {

  /* ══ ORIGINAL STATE — UNTOUCHED ══ */
  const [cycles, setCycles]                       = useState([]);
  const [view, setView]                           = useState('form');
  const [prediction, setPrediction]               = useState(null);
  const [averageCycleLength, setAverageCycleLength] = useState(null);

  /* ══ ORIGINAL EFFECTS — UNTOUCHED ══ */
  useEffect(() => {
    const savedCycles = localStorage.getItem('cycles');
    if (savedCycles) setCycles(JSON.parse(savedCycles));
  }, []);

  useEffect(() => {
    if (cycles.length > 0) {
      localStorage.setItem('cycles', JSON.stringify(cycles));
      const avgLength = calculateAverageCycle();
      if (avgLength) predictNextPeriod(avgLength);
    }
  }, [cycles]);

  /* ══ ORIGINAL HANDLERS — UNTOUCHED ══ */
  const handleCycleSubmit = (e) => {
    e.preventDefault();
    if (!cycleData.startDate) { alert('Please enter a start date'); return; }
    const newCycle = {
      id: Date.now(),
      startDate: cycleData.startDate,
      endDate: cycleData.endDate,
      symptoms: cycleData.symptoms,
      mood: cycleData.mood,
      notes: cycleData.notes || ''
    };
    setCycles([...cycles, newCycle]);
    if (cycleData.symptoms.length > 0) setSymptoms(prev => [...prev, ...cycleData.symptoms]);
    setCycleData({ startDate: '', endDate: '', symptoms: [], mood: '', notes: '' });
    setView('history');
  };

  const calculateAverageCycle = () => {
    if (cycles.length < 2) return null;
    let totalDays = 0, count = 0;
    for (let i = 1; i < cycles.length; i++) {
      const diffTime = Math.abs(new Date(cycles[i].startDate) - new Date(cycles[i-1].startDate));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0 && diffDays < 100) { totalDays += diffDays; count++; }
    }
    if (count > 0) { const avg = Math.round(totalDays / count); setAverageCycleLength(avg); return avg; }
    return null;
  };

  const predictNextPeriod = (avgLength) => {
    const cycleLen = avgLength || averageCycleLength;
    if (!cycleLen || cycles.length === 0) return;
    const lastPeriod  = new Date(cycles[cycles.length - 1].startDate);
    const nextPeriod  = new Date(lastPeriod);
    nextPeriod.setDate(lastPeriod.getDate() + cycleLen);
    const fertileStart = new Date(nextPeriod); fertileStart.setDate(nextPeriod.getDate() - 14 - 5);
    const fertileEnd   = new Date(nextPeriod); fertileEnd.setDate(nextPeriod.getDate() - 14 + 1);
    setPrediction({
      nextPeriod:        nextPeriod.toISOString().split('T')[0],
      fertileWindowStart: fertileStart.toISOString().split('T')[0],
      fertileWindowEnd:   fertileEnd.toISOString().split('T')[0]
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const deleteCycle = (id) => {
    if (window.confirm('Are you sure you want to delete this cycle?'))
      setCycles(cycles.filter(cycle => cycle.id !== id));
  };
  /* ══ END ORIGINAL LOGIC ══ */

  /* ── UI helpers ── */
  const cycleDay = (() => {
    if (cycles.length === 0) return 1;
    const last = new Date(cycles[cycles.length - 1].startDate);
    const diff = Math.ceil(Math.abs(new Date() - last) / (1000 * 60 * 60 * 24));
    return Math.min(diff + 1, averageCycleLength || 28);
  })();

  const mostFreqSymptom = (() => {
    const counts = {};
    cycles.forEach(c => c.symptoms?.forEach(s => { counts[s] = (counts[s] || 0) + 1; }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';
  })();

  const TABS = [
    { id: 'form',       label: 'Log Period',    icon: 'pencil',   grad: 'linear-gradient(135deg,#E11D48,#EC4899)' },
    { id: 'history',    label: 'History',       icon: 'clock',    grad: 'linear-gradient(135deg,#0EA5E9,#38BDF8)' },
    { id: 'calendar',   label: 'Predictions',   icon: 'target',   grad: 'linear-gradient(135deg,#059669,#34D399)' },
    { id: 'ai-predict', label: 'AI Predictions', icon: 'brain',   grad: 'linear-gradient(135deg,#7C3AED,#A855F7)' },
  ];

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>

      {/* ════════════
          HERO SECTION
          ════════════ */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(36px,5vw,56px) clamp(20px,4vw,56px) 0' }}>
        <div style={{
          background: 'linear-gradient(135deg,rgba(225,29,72,0.90),rgba(168,85,247,0.85))',
          borderRadius: 28, overflow: 'hidden', position: 'relative',
          marginBottom: 28,
          animation: 'fadeInUp 0.5s ease both',
        }}>
          {/* Orbs */}
          <div style={{ position: 'absolute', top: -40, right: 120, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }}/>
          <div style={{ position: 'absolute', bottom: -30, left: 100, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}/>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24, padding: 'clamp(28px,4vw,44px)' }}>
            {/* Text */}
            <div style={{ position: 'relative' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999,
                background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
                fontSize: '0.7rem', fontWeight: 700, color: 'white', marginBottom: 14, letterSpacing: '0.05em',
              }}>
                <Ic n="sparkle" s={11} c="white"/> Health Journal
              </div>
              <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'white', letterSpacing: '-0.02em', marginBottom: 10, lineHeight: 1.1 }}>
                Period & Symptom Tracker
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.9rem', lineHeight: 1.65, maxWidth: 400 }}>
                Track your menstrual cycle, symptoms and wellness to receive personalized
                AI-powered insights and predictions.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
                {[`${cycles.length} Cycles Logged`, averageCycleLength ? `${averageCycleLength}-Day Avg` : 'Track to Predict', 'AI Ready'].map((b, i) => (
                  <div key={i} style={{
                    padding: '6px 14px', borderRadius: 999,
                    background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
                    fontSize: '0.75rem', fontWeight: 700, color: 'white',
                  }}>{b}</div>
                ))}
              </div>
            </div>

            {/* Floating illustration */}
            <div style={{ position: 'relative', width: 160, height: 140, flexShrink: 0, animation: 'floatY 5s ease-in-out infinite' }}>
              <svg viewBox="0 0 160 140" style={{ width: '100%', height: '100%' }}>
                {/* Calendar base */}
                <rect x="20" y="20" width="80" height="70" rx="10" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.30)" strokeWidth="1.5"/>
                <rect x="20" y="20" width="80" height="22" rx="10" fill="rgba(255,255,255,0.20)"/>
                <rect x="20" y="42" width="80" height="2" fill="rgba(255,255,255,0.25)"/>
                {/* Grid dots */}
                {[0,1,2,3].map(col => [0,1,2].map(row => (
                  <circle key={`${col}-${row}`} cx={34 + col * 18} cy={54 + row * 14} r="3.5"
                    fill={col === 1 && row === 1 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)'}
                    style={col === 1 && row === 1 ? { filter: 'drop-shadow(0 0 4px white)' } : {}}/>
                )))}
                {/* Flower top-right */}
                <g style={{ animation: 'floatY 4s 0.5s ease-in-out infinite' }}>
                  {[0,60,120,180,240,300].map((angle, i) => (
                    <ellipse key={i} cx={130 + 12 * Math.cos(angle * Math.PI/180)} cy={30 + 10 * Math.sin(angle * Math.PI/180)} rx="7" ry="4"
                      transform={`rotate(${angle},${130},${30})`}
                      fill="rgba(255,255,255,0.30)" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5"/>
                  ))}
                  <circle cx="130" cy="30" r="6" fill="rgba(255,255,255,0.60)"/>
                </g>
                {/* Leaf bottom-left */}
                <g style={{ animation: 'floatY 3.5s 1s ease-in-out infinite' }}>
                  <path d="M10 120 Q5 100 25 95 Q30 115 10 120Z" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.20)" strokeWidth="0.8"/>
                </g>
                {/* Floating hearts */}
                <path d="M135 75 Q138 71 142 75 Q146 71 149 75 Q149 79 142 85 Q135 79 135 75Z" fill="rgba(255,255,255,0.40)"/>
                <path d="M15 55 Q17 52 20 55 Q23 52 25 55 Q25 58 20 62 Q15 58 15 55Z" fill="rgba(255,255,255,0.30)"/>
              </svg>
            </div>
          </div>
        </div>

        {/* ════════════════
            PREMIUM TABS
            ════════════════ */}
        <div style={{
          display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28,
          animation: 'fadeInUp 0.5s 0.1s ease both',
        }}>
          {TABS.map(tab => {
            const active = view === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setView(tab.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px', borderRadius: 14,
                  cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem',
                  background: active ? tab.grad : 'rgba(255,255,255,0.88)',
                  backdropFilter: 'blur(12px)',
                  color: active ? 'white' : '#6B2A5F',
                  boxShadow: active ? '0 4px 18px rgba(225,29,72,0.25)' : '0 2px 8px rgba(0,0,0,0.05)',
                  border: active ? 'none' : '1px solid rgba(236,72,153,0.12)',
                  transform: active ? 'translateY(-1px)' : 'none',
                  transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)'; }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; }}}>
                <Ic n={tab.icon} s={15} c={active ? 'white' : '#9B6B8A'}/> {tab.label}
              </button>
            );
          })}
        </div>

        {/* ════════════════════════
            MAIN TWO-COLUMN LAYOUT
            ════════════════════════ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.8fr) 300px',
          gap: 24, alignItems: 'start',
          paddingBottom: 'clamp(48px,6vw,72px)',
        }} className="tracker-grid">

          {/* ══════════════════════════════════
              LEFT: MAIN CONTENT
              ══════════════════════════════════ */}
          <div>
            <div style={{
              background: 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(236,72,153,0.12)',
              borderRadius: 28,
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
              animation: 'fadeInUp 0.5s 0.15s ease both',
            }}>

              {/* ── FORM VIEW ── */}
              {view === 'form' && (
                <div style={{ padding: 'clamp(24px,4vw,36px)' }}>
                  {/* Section header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid rgba(236,72,153,0.08)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg,#E11D48,#EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(225,29,72,0.25)' }}>
                      <Ic n="pencil" s={20} c="white"/>
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1A0A2E' }}>Log Period Entry</div>
                      <div style={{ fontSize: '0.75rem', color: '#9B6B8A', marginTop: 2 }}>Record your cycle data for AI-powered insights</div>
                    </div>
                  </div>

                  <form onSubmit={handleCycleSubmit}>

                    {/* ── Cycle Dates ── */}
                    <div style={{ marginBottom: 28 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                        <Ic n="calendar" s={15} c="#E11D48"/>
                        <span style={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6B2A5F' }}>Cycle Dates</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="dates-grid">
                        {/* Start Date — original binding */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#9B6B8A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                            Start Date *
                          </label>
                          <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                              <Ic n="calendar" s={15} c="#9B6B8A"/>
                            </div>
                            <input
                              type="date"
                              value={cycleData.startDate}
                              onChange={(e) => setCycleData({ ...cycleData, startDate: e.target.value })}
                              required
                              style={{
                                width: '100%', padding: '13px 16px 13px 40px', borderRadius: 14,
                                border: `1.5px solid ${cycleData.startDate ? 'rgba(236,72,153,0.35)' : 'rgba(236,72,153,0.16)'}`,
                                background: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', color: '#1A0A2E', outline: 'none',
                              }}
                              onFocus={e => { e.target.style.borderColor = 'rgba(225,29,72,0.55)'; e.target.style.boxShadow = '0 0 0 3px rgba(225,29,72,0.10)'; }}
                              onBlur={e => { e.target.style.borderColor = cycleData.startDate ? 'rgba(236,72,153,0.35)' : 'rgba(236,72,153,0.16)'; e.target.style.boxShadow = 'none'; }}
                            />
                          </div>
                        </div>
                        {/* End Date — original binding */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#9B6B8A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                            End Date
                          </label>
                          <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                              <Ic n="calendar" s={15} c="#9B6B8A"/>
                            </div>
                            <input
                              type="date"
                              value={cycleData.endDate}
                              onChange={(e) => setCycleData({ ...cycleData, endDate: e.target.value })}
                              style={{
                                width: '100%', padding: '13px 16px 13px 40px', borderRadius: 14,
                                border: `1.5px solid ${cycleData.endDate ? 'rgba(236,72,153,0.35)' : 'rgba(236,72,153,0.16)'}`,
                                background: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', color: '#1A0A2E', outline: 'none',
                              }}
                              onFocus={e => { e.target.style.borderColor = 'rgba(225,29,72,0.55)'; e.target.style.boxShadow = '0 0 0 3px rgba(225,29,72,0.10)'; }}
                              onBlur={e => { e.target.style.borderColor = cycleData.endDate ? 'rgba(236,72,153,0.35)' : 'rgba(236,72,153,0.16)'; e.target.style.boxShadow = 'none'; }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── Symptoms — original checkbox logic preserved exactly ── */}
                    <div style={{ marginBottom: 28 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                        <Ic n="flower" s={15} c="#EC4899"/>
                        <span style={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6B2A5F' }}>Symptoms</span>
                        {cycleData.symptoms?.length > 0 && (
                          <span style={{ padding: '2px 10px', borderRadius: 999, background: 'rgba(236,72,153,0.10)', border: '1px solid rgba(236,72,153,0.20)', fontSize: '0.68rem', fontWeight: 700, color: '#E11D48' }}>
                            {cycleData.symptoms.length} selected
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 10 }}>
                        {symptomOptions.map(symptom => {
                          const meta    = SYMPTOM_META[symptom] || { icon: 'check', grad: 'linear-gradient(135deg,#9B6B8A,#6B2A5F)' };
                          const checked = cycleData.symptoms?.includes(symptom);
                          return (
                            <label key={symptom} style={{
                              display: 'flex', alignItems: 'center', gap: 10,
                              padding: '13px 14px', borderRadius: 16, cursor: 'pointer',
                              border: `1.5px solid ${checked ? 'rgba(225,29,72,0.35)' : 'rgba(236,72,153,0.12)'}`,
                              background: checked ? 'rgba(225,29,72,0.06)' : 'rgba(255,255,255,0.70)',
                              transition: 'all 0.22s ease',
                              transform: checked ? 'scale(1.02)' : 'scale(1)',
                              boxShadow: checked ? '0 4px 14px rgba(225,29,72,0.12)' : 'none',
                            }}>
                              {/* Original checkbox — binding unchanged */}
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => {
                                  const updatedSymptoms = checked
                                    ? cycleData.symptoms.filter(s => s !== symptom)
                                    : [...(cycleData.symptoms || []), symptom];
                                  setCycleData({ ...cycleData, symptoms: updatedSymptoms });
                                }}
                                style={{ display: 'none' }}
                              />
                              <div style={{ width: 34, height: 34, borderRadius: 10, background: meta.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: checked ? '0 3px 10px rgba(225,29,72,0.22)' : 'none' }}>
                                <Ic n={meta.icon} s={15} c="white"/>
                              </div>
                              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: checked ? '#1A0A2E' : '#6B2A5F', lineHeight: 1.3 }}>{symptom}</span>
                              {checked && (
                                <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
                                  <Ic n="checkC" s={14} c="#E11D48"/>
                                </div>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* ── Mood — original select binding preserved via hidden select ── */}
                    <div style={{ marginBottom: 28 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                        <Ic n="heart" s={15} c="#EC4899"/>
                        <span style={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6B2A5F' }}>Overall Mood</span>
                      </div>
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        {MOODS.map(m => {
                          const sel = cycleData.mood === m.value;
                          return (
                            <button key={m.value} type="button"
                              onClick={() => setCycleData({ ...cycleData, mood: m.value })}
                              style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                                padding: '14px 18px', borderRadius: 16, cursor: 'pointer',
                                border: `1.5px solid ${sel ? m.col + '50' : 'rgba(236,72,153,0.12)'}`,
                                background: sel ? `${m.col}10` : 'rgba(255,255,255,0.75)',
                                boxShadow: sel ? `0 4px 14px ${m.col}20` : 'none',
                                transform: sel ? 'scale(1.06)' : 'scale(1)',
                                transition: 'all 0.22s cubic-bezier(0.34,1.56,0.64,1)',
                                minWidth: 70,
                              }}>
                              <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{m.emoji}</span>
                              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: sel ? m.col : '#9B6B8A', letterSpacing: '0.04em' }}>{m.label}</span>
                            </button>
                          );
                        })}
                      </div>
                      {/* Hidden select preserves original mood value binding / form submission compatibility */}
                      <select
                        value={cycleData.mood}
                        onChange={(e) => setCycleData({ ...cycleData, mood: e.target.value })}
                        style={{ display: 'none' }}
                        aria-hidden="true">
                        <option value="">Select your mood</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="neutral">Neutral</option>
                        <option value="poor">Poor</option>
                        <option value="very-poor">Very Poor</option>
                      </select>
                    </div>

                    {/* ── Notes — original binding preserved ── */}
                    <div style={{ marginBottom: 28 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <Ic n="pencil" s={15} c="#9B6B8A"/>
                        <span style={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6B2A5F' }}>Notes</span>
                        <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: '#9B6B8A', fontWeight: 600 }}>
                          {(cycleData.notes || '').length} / 500
                        </span>
                      </div>
                      <textarea
                        value={cycleData.notes || ''}
                        onChange={(e) => setCycleData({ ...cycleData, notes: e.target.value })}
                        maxLength={500}
                        placeholder="Describe anything unusual about this cycle..."
                        style={{
                          width: '100%', minHeight: 110, padding: '14px 16px', borderRadius: 16,
                          border: '1.5px solid rgba(236,72,153,0.16)',
                          background: 'rgba(255,255,255,0.85)',
                          fontSize: '0.9rem', color: '#1A0A2E', resize: 'vertical', outline: 'none',
                          fontFamily: 'inherit', lineHeight: 1.6,
                          transition: 'border 0.2s ease, box-shadow 0.2s ease',
                        }}
                        onFocus={e => { e.target.style.borderColor = 'rgba(225,29,72,0.45)'; e.target.style.boxShadow = '0 0 0 3px rgba(225,29,72,0.08)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(236,72,153,0.16)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>

                    {/* ── Save button — original type="submit" + handleCycleSubmit preserved ── */}
                    <button
                      type="submit"
                      style={{
                        width: '100%', padding: '16px', borderRadius: 16, border: 'none',
                        background: 'linear-gradient(135deg,#E11D48,#EC4899,#A855F7)',
                        color: 'white', fontWeight: 800, fontSize: '1rem',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                        boxShadow: '0 8px 28px rgba(225,29,72,0.28)',
                        transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(225,29,72,0.38)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(225,29,72,0.28)'; }}>
                      <Ic n="checkC" s={18} c="white"/> Save Period Data
                    </button>
                  </form>
                </div>
              )}

              {/* ── HISTORY VIEW — original logic preserved ── */}
              {view === 'history' && (
                <div style={{ padding: 'clamp(24px,4vw,36px)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid rgba(236,72,153,0.08)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg,#0EA5E9,#38BDF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(14,165,233,0.25)' }}>
                      <Ic n="clock" s={20} c="white"/>
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1A0A2E' }}>Period History</div>
                      <div style={{ fontSize: '0.75rem', color: '#9B6B8A', marginTop: 2 }}>{cycles.length} cycles recorded</div>
                    </div>
                  </div>

                  {cycles.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {[...cycles].reverse().map((cycle, index) => (
                        <div key={cycle.id}
                          style={{
                            padding: '20px', borderRadius: 20,
                            background: 'rgba(255,255,255,0.80)',
                            border: '1px solid rgba(236,72,153,0.10)',
                            transition: 'all 0.25s ease',
                            animation: `fadeInUp 0.4s ${index * 0.06}s ease both`,
                          }}
                          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'; }}
                          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                          {/* Header row */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#E11D48,#EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '0.78rem', fontWeight: 900, color: 'white' }}>#{cycles.length - index}</span>
                              </div>
                              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1A0A2E' }}>Period #{cycles.length - index}</span>
                            </div>
                            {/* deleteCycle — original */}
                            <button
                              onClick={() => deleteCycle(cycle.id)}
                              style={{ padding: '6px 12px', borderRadius: 10, border: '1px solid rgba(239,68,68,0.20)', background: 'transparent', color: '#EF4444', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, transition: 'all 0.2s ease' }}
                              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                              <Ic n="trash" s={13} c="#EF4444"/> Delete
                            </button>
                          </div>

                          {/* Date row */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                            {[
                              { label: 'Start Date', val: formatDate(cycle.startDate), col: '#E11D48' },
                              { label: 'End Date',   val: cycle.endDate ? formatDate(cycle.endDate) : 'Not recorded', col: '#9B6B8A' },
                            ].map((d, i) => (
                              <div key={i} style={{ padding: '10px 14px', borderRadius: 12, background: `${d.col}08`, border: `1px solid ${d.col}14` }}>
                                <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: d.col, marginBottom: 4 }}>{d.label}</div>
                                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1A0A2E' }}>{d.val}</div>
                              </div>
                            ))}
                          </div>

                          {/* Symptoms */}
                          {cycle.symptoms?.length > 0 && (
                            <div style={{ marginBottom: 12 }}>
                              <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9B6B8A', marginBottom: 8 }}>Symptoms</div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {cycle.symptoms.map(symptom => (
                                  <span key={symptom} style={{
                                    padding: '4px 12px', borderRadius: 999,
                                    background: 'rgba(236,72,153,0.08)',
                                    border: '1px solid rgba(236,72,153,0.18)',
                                    fontSize: '0.72rem', fontWeight: 600, color: '#E11D48',
                                  }}>{symptom}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Mood */}
                          {cycle.mood && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9B6B8A' }}>Mood:</span>
                              <span style={{ fontSize: '1rem' }}>{MOODS.find(m => m.value === cycle.mood)?.emoji}</span>
                              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B2A5F', textTransform: 'capitalize' }}>{cycle.mood.replace('-', ' ')}</span>
                            </div>
                          )}

                          {/* Notes */}
                          {cycle.notes && (
                            <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 10, background: 'rgba(107,114,128,0.05)', border: '1px solid rgba(107,114,128,0.10)' }}>
                              <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9B6B8A', marginBottom: 4 }}>Notes</div>
                              <p style={{ fontSize: '0.82rem', color: '#6B2A5F', lineHeight: 1.6, margin: 0 }}>{cycle.notes}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                      <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(236,72,153,0.08)', border: '1px solid rgba(236,72,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <Ic n="calendar" s={28} c="#EC4899"/>
                      </div>
                      <p style={{ color: '#9B6B8A', fontSize: '0.9rem', marginBottom: 20 }}>No periods tracked yet. Start tracking to see your history.</p>
                      <button onClick={() => setView('form')} className="aura-button" style={{ padding: '11px 28px', borderRadius: 12 }}>
                        Start Tracking
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ── PREDICTIONS VIEW — original logic preserved ── */}
              {view === 'calendar' && (
                <div style={{ padding: 'clamp(24px,4vw,36px)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid rgba(5,150,105,0.10)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg,#059669,#34D399)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(5,150,105,0.25)' }}>
                      <Ic n="target" s={20} c="white"/>
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1A0A2E' }}>Period Predictions</div>
                      <div style={{ fontSize: '0.75rem', color: '#9B6B8A', marginTop: 2 }}>Based on your cycle history</div>
                    </div>
                  </div>

                  {prediction ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {/* Next period */}
                      <div style={{
                        padding: '28px', borderRadius: 22,
                        background: 'linear-gradient(135deg,rgba(225,29,72,0.06),rgba(236,72,153,0.04))',
                        border: '1px solid rgba(225,29,72,0.15)',
                        textAlign: 'center',
                      }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#E11D48', marginBottom: 10 }}>
                          Next Period Prediction
                        </div>
                        <div style={{ fontWeight: 900, fontSize: '2rem', color: '#1A0A2E' }}>{formatDate(prediction.nextPeriod)}</div>
                        <div style={{ fontSize: '0.8rem', color: '#9B6B8A', marginTop: 8 }}>Expected Start Date</div>
                      </div>

                      {/* Fertile window */}
                      <div style={{
                        padding: '22px 24px', borderRadius: 22,
                        background: 'linear-gradient(135deg,rgba(5,150,105,0.06),rgba(16,185,129,0.04))',
                        border: '1px solid rgba(5,150,105,0.15)',
                      }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#059669', marginBottom: 16 }}>
                          Fertility Window
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.65rem', color: '#9B6B8A', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Start</div>
                            <div style={{ fontWeight: 800, fontSize: '1rem', color: '#059669' }}>{formatDate(prediction.fertileWindowStart)}</div>
                          </div>
                          <div style={{ flex: 1, height: 3, borderRadius: 999, background: 'linear-gradient(90deg,#059669,#34D399)' }}/>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.65rem', color: '#9B6B8A', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>End</div>
                            <div style={{ fontWeight: 800, fontSize: '1rem', color: '#059669' }}>{formatDate(prediction.fertileWindowEnd)}</div>
                          </div>
                        </div>
                      </div>

                      {/* Disclaimer */}
                      <div style={{
                        padding: '16px 18px', borderRadius: 16,
                        background: 'rgba(107,114,128,0.05)', border: '1px solid rgba(107,114,128,0.10)',
                        display: 'flex', gap: 12, alignItems: 'flex-start',
                      }}>
                        <Ic n="info" s={16} c="#9B6B8A"/>
                        <div>
                          <p style={{ fontSize: '0.82rem', color: '#6B2A5F', lineHeight: 1.65, margin: '0 0 4px' }}>
                            Based on your average cycle of <strong style={{ color: '#E11D48' }}>{averageCycleLength} days</strong>.
                          </p>
                          <p style={{ fontSize: '0.75rem', color: '#9B6B8A', lineHeight: 1.55, margin: 0 }}>
                            These predictions are estimates and may vary. Continue tracking for more accurate predictions.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                      <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <Ic n="target" s={28} c="#059669"/>
                      </div>
                      <p style={{ color: '#9B6B8A', fontSize: '0.9rem', marginBottom: 20 }}>
                        {cycles.length === 0
                          ? 'No periods tracked yet. Start tracking to see predictions.'
                          : cycles.length === 1
                            ? 'Track at least one more period to see predictions.'
                            : 'Calculating predictions...'}
                      </p>
                      {cycles.length === 0 && (
                        <button onClick={() => setView('form')} className="aura-button" style={{ padding: '11px 28px', borderRadius: 12 }}>
                          Start Tracking
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ── AI PREDICTIONS — original PeriodPredictor preserved ── */}
              {view === 'ai-predict' && (
                <div style={{ padding: 'clamp(24px,4vw,36px)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid rgba(124,58,237,0.10)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg,#7C3AED,#A855F7)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(124,58,237,0.25)' }}>
                      <Ic n="brain" s={20} c="white"/>
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1A0A2E' }}>AI Predictions</div>
                      <div style={{ fontSize: '0.75rem', color: '#9B6B8A', marginTop: 2 }}>Powered by machine learning</div>
                    </div>
                  </div>
                  {/* Original PeriodPredictor — untouched */}
                  <PeriodPredictor cycleHistory={cycles} />
                </div>
              )}
            </div>

            {/* ══ BOTTOM INFO BAR ══ */}
            <div style={{
              marginTop: 20, padding: '18px 24px', borderRadius: 18,
              background: 'linear-gradient(135deg,rgba(251,207,232,0.40),rgba(237,233,254,0.30))',
              border: '1px solid rgba(236,72,153,0.12)',
              backdropFilter: 'blur(12px)',
              display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center',
              animation: 'fadeInUp 0.5s 0.3s ease both',
            }}>
              {[
                { icon: 'lock',    text: 'Your health data is encrypted',                  col: '#7C3AED' },
                { icon: 'brain',   text: 'AI improves with more cycle history',             col: '#E11D48' },
                { icon: 'trend',   text: 'Predictions become more accurate over time',       col: '#059669' },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <Ic n={b.icon} s={13} c={b.col}/>
                  <span style={{ fontSize: '0.78rem', color: b.col, fontWeight: 600 }}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════
              RIGHT SIDEBAR
              ══════════════════════════════════ */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 18, position: 'sticky', top: 20, animation: 'fadeInUp 0.5s 0.2s ease both' }}>

            {/* Card 1: Current Cycle */}
            <div style={{
              background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(236,72,153,0.12)', borderRadius: 24, padding: '22px',
              boxShadow: '0 8px 28px rgba(0,0,0,0.05)',
            }}>
              <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#1A0A2E', marginBottom: 18 }}>Current Cycle</div>
              <CycleRing dayOfCycle={cycleDay} cycleLength={averageCycleLength || 28}/>
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Cycle Length', val: averageCycleLength ? `${averageCycleLength} days` : 'N/A', col: '#E11D48' },
                  { label: 'Next Period',  val: prediction ? formatDate(prediction.nextPeriod) : '—', col: '#7C3AED' },
                  { label: 'Phase',        val: cycleDay <= 5 ? 'Menstrual' : cycleDay <= 13 ? 'Follicular' : cycleDay <= 16 ? 'Ovulation' : 'Luteal', col: '#059669' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? '1px solid rgba(236,72,153,0.07)' : 'none' }}>
                    <span style={{ fontSize: '0.75rem', color: '#9B6B8A', fontWeight: 600 }}>{r.label}</span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: r.col }}>{r.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: AI Insights */}
            <div style={{
              background: 'linear-gradient(145deg,rgba(124,58,237,0.07),rgba(236,72,153,0.05))',
              backdropFilter: 'blur(16px)', border: '1px solid rgba(124,58,237,0.16)', borderRadius: 24, padding: '22px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg,#7C3AED,#A855F7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Ic n="sparkle" s={14} c="white"/>
                </div>
                <span style={{ fontWeight: 800, fontSize: '0.875rem', color: '#1A0A2E' }}>AI Insights</span>
              </div>
              {[
                { label: 'Cycles Logged',     val: cycles.length.toString(),                          col: '#7C3AED' },
                { label: 'Avg Cycle',          val: averageCycleLength ? `${averageCycleLength}d` : '—', col: '#E11D48' },
                { label: 'Regularity',        val: cycles.length >= 3 ? 'Good' : 'More data needed',   col: '#059669' },
                { label: 'Top Symptom',        val: mostFreqSymptom.length > 12 ? mostFreqSymptom.slice(0,12) + '…' : mostFreqSymptom, col: '#9B6B8A' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? '1px solid rgba(124,58,237,0.07)' : 'none' }}>
                  <span style={{ fontSize: '0.75rem', color: '#9B6B8A', fontWeight: 600 }}>{r.label}</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: r.col }}>{r.val}</span>
                </div>
              ))}
              {cycles.length < 2 && (
                <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 10, background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.14)', fontSize: '0.72rem', color: '#7C3AED', lineHeight: 1.55 }}>
                  Track more cycles to unlock AI-powered insights and accurate predictions.
                </div>
              )}
            </div>

            {/* Card 3: Today's Wellness */}
            <div style={{
              background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(236,72,153,0.10)', borderRadius: 24, padding: '22px',
            }}>
              <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#1A0A2E', marginBottom: 16 }}>Today's Wellness Tips</div>
              {[
                { icon: 'drop',  tip: 'Drink 8+ glasses of water today',          col: '#0EA5E9' },
                { icon: 'sun',   tip: 'Light walk or yoga for 20 minutes',         col: '#F59E0B' },
                { icon: 'moon',  tip: 'Aim for 7–8 hours of quality sleep',        col: '#7C3AED' },
                { icon: 'leaf',  tip: 'Eat whole foods, reduce processed sugar',   col: '#059669' },
                { icon: 'heart', tip: 'Practice 5 minutes of mindful breathing',   col: '#EC4899' },
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '9px 0', borderBottom: i < 4 ? '1px solid rgba(236,72,153,0.06)' : 'none' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${t.col}12`, border: `1px solid ${t.col}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <Ic n={t.icon} s={13} c={t.col}/>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#6B2A5F', lineHeight: 1.55, fontWeight: 500 }}>{t.tip}</span>
                </div>
              ))}
            </div>

            {/* Card 4: Quick Stats */}
            <div style={{
              background: 'linear-gradient(145deg,rgba(225,29,72,0.06),rgba(236,72,153,0.04))',
              backdropFilter: 'blur(16px)', border: '1px solid rgba(225,29,72,0.14)', borderRadius: 24, padding: '22px',
            }}>
              <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#1A0A2E', marginBottom: 16 }}>Quick Stats</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { val: cycles.length, label: 'Cycles Logged',   col: '#E11D48', bg: 'rgba(225,29,72,0.08)' },
                  { val: averageCycleLength ? `${averageCycleLength}d` : '—', label: 'Avg Length', col: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
                  { val: cycles.reduce((a, c) => a + (c.symptoms?.length || 0), 0), label: 'Symptoms Logged', col: '#EC4899', bg: 'rgba(236,72,153,0.08)' },
                  { val: MOODS.find(m => m.value === (cycles[cycles.length-1]?.mood))?.emoji || '—', label: 'Last Mood', col: '#059669', bg: 'rgba(5,150,105,0.08)' },
                ].map((s, i) => (
                  <div key={i} style={{ padding: '12px', borderRadius: 14, background: s.bg, textAlign: 'center' }}>
                    <div style={{ fontWeight: 900, fontSize: '1.4rem', color: s.col, lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9B6B8A', marginTop: 4, lineHeight: 1.3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Responsive */}
      <style>{`
        @media (max-width: 960px) {
          .tracker-grid { grid-template-columns: 1fr !important; }
          .tracker-grid aside { position: static !important; }
        }
        @media (max-width: 540px) {
          .dates-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Tracker;