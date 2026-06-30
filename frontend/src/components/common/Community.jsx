import React, { useState, useEffect, useRef } from 'react';

/* ────────────────────────────────────────────────
   SVG ICON SYSTEM
   ──────────────────────────────────────────────── */
const Ic = ({ n, s = 18, c = 'currentColor' }) => {
  const p = {
    heart:      <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor" stroke="none"/></>,
    heartOut:   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
    chat:       <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
    bookmark:   <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>,
    bookmarkF:  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" fill="currentColor" stroke="none"/>,
    share:      <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>,
    plus:       <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    trending:   <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>,
    chevR:      <polyline points="9 18 15 12 9 6"/>,
    star:       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    starF:      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" stroke="none"/>,
    check:      <polyline points="20 6 9 11 4 16"/>,
    shield:     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    users:      <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    award:      <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
    arrowR:     <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    bell:       <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    filter:     <><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="12" y1="18" x2="12" y2="18"/></>,
    sparkle:    <><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.937A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></>,
    leaf:       <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>,
    x:          <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>,
    send:       <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    edit:       <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    verified:   <><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="currentColor" stroke="none"/><path d="m9 12 2 2 4-4" stroke="white" strokeWidth="2" fill="none"/></>,
    clock:      <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    pin:        <><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></>,
    fire:       <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>,
    lightbulb:  <><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></>,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24"
      fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {p[n]}
    </svg>
  );
};

/* ────────────────────────────────────────────────
   COUNTER HOOK
   ──────────────────────────────────────────────── */
function useCounter(target, dur = 1600, go = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!go) return;
    let t0 = null;
    const step = ts => {
      if (!t0) t0 = ts;
      const pct = Math.min((ts - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - pct, 3);
      setVal(Math.floor(ease * target));
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, dur, go]);
  return val;
}

function useVisible(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

/* ────────────────────────────────────────────────
   SUPPORT CIRCLE ILLUSTRATION  (pure SVG/CSS)
   ──────────────────────────────────────────────── */
const SupportIllustration = () => (
  <div style={{ position: 'relative', width: '100%', maxWidth: 420, margin: '0 auto' }}>
    {/* Soft glow backdrop */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse at 50% 60%, rgba(236,72,153,0.18), rgba(168,85,247,0.10) 60%, transparent 80%)',
      borderRadius: '50%', filter: 'blur(24px)',
    }}/>

    <svg viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', position: 'relative' }}>
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="rgba(236,72,153,0.12)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FBCFE8"/>
          <stop offset="100%" stopColor="#F9A8D4"/>
        </linearGradient>
        <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DDD6FE"/>
          <stop offset="100%" stopColor="#C4B5FD"/>
        </linearGradient>
        <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE68A"/>
          <stop offset="100%" stopColor="#FCA5A5"/>
        </linearGradient>
        <linearGradient id="g4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#BAE6FD"/>
          <stop offset="100%" stopColor="#A5B4FC"/>
        </linearGradient>
        <linearGradient id="g5" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#BBF7D0"/>
          <stop offset="100%" stopColor="#86EFAC"/>
        </linearGradient>
      </defs>

      {/* Ground circle */}
      <ellipse cx="210" cy="300" rx="170" ry="28" fill="rgba(236,72,153,0.06)"/>

      {/* ── FIGURE 1 (centre-left) ── */}
      <g style={{ animation: 'floatY 5s ease-in-out infinite' }}>
        {/* body */}
        <ellipse cx="155" cy="280" rx="22" ry="12" fill="url(#g1)" opacity="0.5"/>
        <rect x="140" y="215" width="30" height="68" rx="14" fill="url(#g1)"/>
        {/* head */}
        <circle cx="155" cy="207" r="22" fill="url(#g1)"/>
        {/* hair */}
        <path d="M133 200 Q155 175 177 200 Q177 185 155 178 Q133 185 133 200Z" fill="#EC4899" opacity="0.7"/>
        {/* face dots */}
        <circle cx="148" cy="207" r="2.5" fill="#BE185D" opacity="0.5"/>
        <circle cx="162" cy="207" r="2.5" fill="#BE185D" opacity="0.5"/>
        <path d="M150 216 Q155 221 160 216" stroke="#BE185D" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {/* arms extended */}
        <path d="M140 235 Q120 245 110 255" stroke="url(#g1)" strokeWidth="12" strokeLinecap="round"/>
        <path d="M170 235 Q195 240 205 235" stroke="url(#g1)" strokeWidth="12" strokeLinecap="round"/>
        {/* legs */}
        <path d="M148 280 L144 308" stroke="url(#g1)" strokeWidth="11" strokeLinecap="round"/>
        <path d="M162 280 L166 308" stroke="url(#g1)" strokeWidth="11" strokeLinecap="round"/>
      </g>

      {/* ── FIGURE 2 (centre-right) ── */}
      <g style={{ animation: 'floatY 5.5s 0.5s ease-in-out infinite' }}>
        <ellipse cx="265" cy="280" rx="22" ry="12" fill="url(#g2)" opacity="0.5"/>
        <rect x="250" y="215" width="30" height="68" rx="14" fill="url(#g2)"/>
        <circle cx="265" cy="207" r="22" fill="url(#g2)"/>
        <path d="M243 200 Q265 175 287 200 Q287 185 265 180 Q243 185 243 200Z" fill="#7C3AED" opacity="0.7"/>
        <circle cx="258" cy="207" r="2.5" fill="#5B21B6" opacity="0.5"/>
        <circle cx="272" cy="207" r="2.5" fill="#5B21B6" opacity="0.5"/>
        <path d="M260 216 Q265 221 270 216" stroke="#5B21B6" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M250 235 Q215 240 205 235" stroke="url(#g2)" strokeWidth="12" strokeLinecap="round"/>
        <path d="M280 235 Q300 245 310 255" stroke="url(#g2)" strokeWidth="12" strokeLinecap="round"/>
        <path d="M258 280 L254 308" stroke="url(#g2)" strokeWidth="11" strokeLinecap="round"/>
        <path d="M272 280 L276 308" stroke="url(#g2)" strokeWidth="11" strokeLinecap="round"/>
      </g>

      {/* ── FIGURE 3 (far left) ── */}
      <g style={{ animation: 'floatY 4.5s 0.3s ease-in-out infinite' }}>
        <ellipse cx="80" cy="282" rx="18" ry="10" fill="url(#g3)" opacity="0.5"/>
        <rect x="67" y="225" width="26" height="60" rx="12" fill="url(#g3)"/>
        <circle cx="80" cy="218" r="18" fill="url(#g3)"/>
        <path d="M62 212 Q80 192 98 212 Q98 200 80 194 Q62 200 62 212Z" fill="#D97706" opacity="0.7"/>
        <circle cx="74" cy="218" r="2" fill="#92400E" opacity="0.5"/>
        <circle cx="86" cy="218" r="2" fill="#92400E" opacity="0.5"/>
        <path d="M76 226 Q80 230 84 226" stroke="#92400E" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M93 240 Q110 248 110 255" stroke="url(#g3)" strokeWidth="10" strokeLinecap="round"/>
        <path d="M67 240 Q52 248 44 258" stroke="url(#g3)" strokeWidth="10" strokeLinecap="round"/>
        <path d="M74 282 L70 306" stroke="url(#g3)" strokeWidth="10" strokeLinecap="round"/>
        <path d="M86 282 L90 306" stroke="url(#g3)" strokeWidth="10" strokeLinecap="round"/>
      </g>

      {/* ── FIGURE 4 (far right) ── */}
      <g style={{ animation: 'floatY 4.8s 0.8s ease-in-out infinite' }}>
        <ellipse cx="340" cy="282" rx="18" ry="10" fill="url(#g4)" opacity="0.5"/>
        <rect x="327" y="225" width="26" height="60" rx="12" fill="url(#g4)"/>
        <circle cx="340" cy="218" r="18" fill="url(#g4)"/>
        <path d="M322 212 Q340 192 358 212 Q358 200 340 194 Q322 200 322 212Z" fill="#2563EB" opacity="0.7"/>
        <circle cx="334" cy="218" r="2" fill="#1E3A8A" opacity="0.5"/>
        <circle cx="346" cy="218" r="2" fill="#1E3A8A" opacity="0.5"/>
        <path d="M336 226 Q340 230 344 226" stroke="#1E3A8A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M327 240 Q310 248 310 255" stroke="url(#g4)" strokeWidth="10" strokeLinecap="round"/>
        <path d="M353 240 Q370 250 376 258" stroke="url(#g4)" strokeWidth="10" strokeLinecap="round"/>
        <path d="M334 282 L330 306" stroke="url(#g4)" strokeWidth="10" strokeLinecap="round"/>
        <path d="M346 282 L350 306" stroke="url(#g4)" strokeWidth="10" strokeLinecap="round"/>
      </g>

      {/* ── FIGURE 5 (top centre, raised) ── */}
      <g style={{ animation: 'floatY 6s 0.2s ease-in-out infinite' }}>
        <ellipse cx="210" cy="195" rx="16" ry="9" fill="url(#g5)" opacity="0.45"/>
        <rect x="198" y="142" width="24" height="55" rx="11" fill="url(#g5)"/>
        <circle cx="210" cy="135" r="16" fill="url(#g5)"/>
        <path d="M194 130 Q210 112 226 130 Q226 118 210 113 Q194 118 194 130Z" fill="#059669" opacity="0.7"/>
        <circle cx="205" cy="135" r="1.8" fill="#064E3B" opacity="0.5"/>
        <circle cx="215" cy="135" r="1.8" fill="#064E3B" opacity="0.5"/>
        <path d="M207 142 Q210 146 213 142" stroke="#064E3B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M198 158 Q175 165 170 172" stroke="url(#g5)" strokeWidth="9" strokeLinecap="round"/>
        <path d="M222 158 Q242 164 248 170" stroke="url(#g5)" strokeWidth="9" strokeLinecap="round"/>
        <path d="M204 195 L200 214" stroke="url(#g5)" strokeWidth="9" strokeLinecap="round"/>
        <path d="M216 195 L220 214" stroke="url(#g5)" strokeWidth="9" strokeLinecap="round"/>
      </g>

      {/* Joined hands highlights */}
      <circle cx="110" cy="256" r="10" fill="rgba(236,72,153,0.25)" style={{ animation: 'neon-pulse 2s infinite' }}/>
      <circle cx="205" cy="236" r="10" fill="rgba(168,85,247,0.25)" style={{ animation: 'neon-pulse 2.3s 0.4s infinite' }}/>
      <circle cx="310" cy="256" r="10" fill="rgba(96,165,250,0.25)" style={{ animation: 'neon-pulse 2.1s 0.2s infinite' }}/>

      {/* Floating hearts */}
      {[[60, 120], [360, 110], [30, 210], [390, 200], [210, 60]].map(([x, y], i) => (
        <g key={i} style={{ animation: `floatY ${3.5 + i * 0.4}s ${i * 0.5}s ease-in-out infinite` }}>
          <text x={x} y={y} fontSize="18" textAnchor="middle" opacity="0.65">❤️</text>
        </g>
      ))}

      {/* Leaves */}
      {[[20, 160, 35], [400, 150, -35], [15, 270, 20], [405, 270, -20]].map(([x, y, rot], i) => (
        <g key={i} transform={`translate(${x},${y}) rotate(${rot})`} opacity="0.45">
          <ellipse rx="10" ry="20" fill="#86EFAC"/>
          <line y2="-18" stroke="#4ADE80" strokeWidth="1.2"/>
        </g>
      ))}

      {/* Stars / sparkles */}
      {[[100, 75], [320, 65], [200, 30], [380, 130]].map(([x, y], i) => (
        <g key={i} style={{ animation: `neon-pulse ${2 + i * 0.3}s ${i * 0.4}s infinite` }}>
          <text x={x} y={y} fontSize="14" textAnchor="middle" opacity="0.55">✨</text>
        </g>
      ))}
    </svg>
  </div>
);

/* ────────────────────────────────────────────────
   MOCK POSTS DATA
   ──────────────────────────────────────────────── */
const POSTS = [
  {
    id: 1,
    user: { name: 'Aisha Rahman', role: 'Member', verified: false, avatar: '🧕', color: '#EC4899' },
    category: 'Question',
    catColor: '#7C3AED',
    catBg: 'rgba(124,58,237,0.10)',
    title: 'Anyone else struggling with irregular periods after stopping birth control?',
    preview: "It's been 4 months since I stopped the pill and my cycle is all over the place. Doctor says it's normal but I'm worried. Has anyone else gone through this?",
    time: '2h ago',
    likes: 47,
    comments: 23,
    tag: '🔔 Trending',
    pinned: false,
  },
  {
    id: 2,
    user: { name: 'Dr. Priya Sharma', role: 'Verified Doctor', verified: true, avatar: '👩‍⚕️', color: '#059669' },
    category: 'Expert Advice',
    catColor: '#059669',
    catBg: 'rgba(5,150,105,0.10)',
    title: 'Managing stress for better hormonal balance — evidence-based strategies',
    preview: 'Cortisol is one of the most underestimated factors in PCOS. Here are 5 clinically-proven techniques to help regulate your stress response and improve hormonal balance...',
    time: '5h ago',
    likes: 134,
    comments: 41,
    tag: '⭐ Featured',
    pinned: true,
  },
  {
    id: 3,
    user: { name: 'Meera Singh', role: 'Member', verified: false, avatar: '🌸', color: '#E11D48' },
    category: 'Success Story',
    catColor: '#D97706',
    catBg: 'rgba(217,119,6,0.10)',
    title: 'Lost 8kg in 5 months after changing my PCOS lifestyle — here\'s what worked!',
    preview: 'I\'ve been struggling with weight my whole life until I found out it was PCOS-related. After changing my diet and adding yoga, everything changed. Here\'s my full journey...',
    time: '1d ago',
    likes: 289,
    comments: 76,
    tag: '🔥 Hot',
    pinned: false,
  },
  {
    id: 4,
    user: { name: 'Sara Malik', role: 'Nutritionist', verified: true, avatar: '🥗', color: '#0EA5E9' },
    category: 'Nutrition',
    catColor: '#059669',
    catBg: 'rgba(5,150,105,0.09)',
    title: 'My favorite 5 anti-inflammatory breakfast ideas for PCOS mornings',
    preview: 'Breakfast is the most important meal for blood sugar management. I\'ve put together my top 5 PCOS-friendly breakfasts that are quick, easy, and genuinely delicious...',
    time: '2d ago',
    likes: 92,
    comments: 18,
    tag: null,
    pinned: false,
  },
  {
    id: 5,
    user: { name: 'Fatima Al-Hassan', role: 'Member', verified: false, avatar: '💜', color: '#7C3AED' },
    category: 'Mental Health',
    catColor: '#7C3AED',
    catBg: 'rgba(124,58,237,0.10)',
    title: 'How I finally stopped hating my body with PCOS — a personal letter',
    preview: 'Two years ago I couldn\'t look in the mirror. Today I run a 5K every week. This is for every woman who feels invisible in her own body. You are not alone...',
    time: '3d ago',
    likes: 421,
    comments: 103,
    tag: '❤️ Most Loved',
    pinned: false,
  },
  {
    id: 6,
    user: { name: 'Anjali Verma', role: 'Member', verified: false, avatar: '🌻', color: '#F59E0B' },
    category: 'Tips',
    catColor: '#D97706',
    catBg: 'rgba(217,119,6,0.09)',
    title: 'Spearmint tea for excess hair growth — does it actually work?',
    preview: 'I\'ve seen it everywhere but was skeptical. After 8 weeks of 2 cups daily I noticed a real difference in my facial hair. Here\'s exactly what I did and what the research says...',
    time: '4d ago',
    likes: 176,
    comments: 55,
    tag: null,
    pinned: false,
  },
];

const CATEGORIES = ['All', 'Questions', 'Success Stories', 'Expert Advice', 'Tips', 'Nutrition', 'Mental Health', 'Trending', 'Latest'];

const TRENDING_TOPICS = [
  { label: 'Irregular Periods', count: '2.4K' },
  { label: 'Weight Loss', count: '1.8K' },
  { label: 'Natural Remedies', count: '1.2K' },
  { label: 'Acne & Skin Care', count: '984' },
  { label: 'Fertility Tips', count: '876' },
  { label: 'Mental Wellness', count: '743' },
];

const CONTRIBUTORS = [
  { name: 'Dr. Priya Sharma', avatar: '👩‍⚕️', badge: 'Top Doctor', score: 2840, color: '#059669' },
  { name: 'Meera Singh', avatar: '🌸', badge: 'Community Star', score: 1920, color: '#E11D48' },
  { name: 'Sara Malik', avatar: '🥗', badge: 'Nutrition Expert', score: 1456, color: '#0EA5E9' },
  { name: 'Fatima Al-Hassan', avatar: '💜', badge: 'Inspiration', score: 1203, color: '#7C3AED' },
];

const GUIDELINES = [
  { text: 'Be respectful and kind to everyone', icon: 'heart' },
  { text: 'Support others on their journey', icon: 'users' },
  { text: 'Share only verified information', icon: 'shield' },
  { text: 'Protect your privacy and others\'', icon: 'verified' },
  { text: 'No advertising or spam', icon: 'x' },
  { text: 'No harassment of any kind', icon: 'check' },
];

/* ────────────────────────────────────────────────
   POST CARD COMPONENT
   ──────────────────────────────────────────────── */
const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(l => !l);
    setLikes(n => liked ? n - 1 : n + 1);
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.82)',
      backdropFilter: 'blur(16px)',
      border: post.pinned ? '1px solid rgba(236,72,153,0.28)' : '1px solid rgba(236,72,153,0.10)',
      borderRadius: 22,
      padding: '22px 24px',
      transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
      boxShadow: post.pinned
        ? '0 4px 20px rgba(236,72,153,0.10)'
        : '0 2px 10px rgba(0,0,0,0.04)',
      position: 'relative',
      overflow: 'hidden',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 16px 40px rgba(159,18,57,0.10)';
      e.currentTarget.style.borderColor = 'rgba(236,72,153,0.22)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = post.pinned ? '0 4px 20px rgba(236,72,153,0.10)' : '0 2px 10px rgba(0,0,0,0.04)';
      e.currentTarget.style.borderColor = post.pinned ? 'rgba(236,72,153,0.28)' : 'rgba(236,72,153,0.10)';
    }}>
      {/* Pinned indicator */}
      {post.pinned && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg,#FB7185,#EC4899,#A855F7)',
          borderRadius: '22px 22px 0 0',
        }}/>
      )}

      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Avatar */}
          <div style={{
            width: 42, height: 42, borderRadius: 14,
            background: `linear-gradient(135deg,${post.user.color}20,${post.user.color}10)`,
            border: `2px solid ${post.user.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.3rem', flexShrink: 0,
          }}>
            {post.user.avatar}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1A0A2E' }}>{post.user.name}</span>
              {post.user.verified && (
                <span style={{ color: '#059669', display: 'flex' }}>
                  <Ic n="verified" s={14} c="#059669"/>
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
              <span style={{
                fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px',
                borderRadius: 999, background: `${post.user.color}15`,
                color: post.user.color, border: `1px solid ${post.user.color}25`,
              }}>
                {post.user.role}
              </span>
              <span style={{ fontSize: '0.68rem', color: '#9B6B8A', display: 'flex', alignItems: 'center', gap: 3 }}>
                <Ic n="clock" s={10} c="#9B6B8A"/> {post.time}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {post.tag && (
            <span style={{
              fontSize: '0.68rem', fontWeight: 700, padding: '3px 10px',
              borderRadius: 999, background: 'rgba(236,72,153,0.08)',
              color: '#E11D48', border: '1px solid rgba(236,72,153,0.18)',
            }}>
              {post.tag}
            </span>
          )}
          <span style={{
            fontSize: '0.68rem', fontWeight: 700, padding: '3px 10px',
            borderRadius: 999, background: post.catBg,
            color: post.catColor, border: `1px solid ${post.catColor}30`,
          }}>
            {post.category}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontWeight: 800, fontSize: '0.975rem',
        color: '#1A0A2E', lineHeight: 1.4, marginBottom: 8,
        letterSpacing: '-0.01em',
      }}>
        {post.title}
      </h3>

      {/* Preview */}
      <p style={{
        fontSize: '0.84rem', color: '#6B2A5F', lineHeight: 1.65,
        marginBottom: 18,
        display: '-webkit-box', WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {post.preview}
      </p>

      {/* Action bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {/* Like */}
        <button
          onClick={handleLike}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '6px 12px', borderRadius: 10,
            border: liked ? '1px solid rgba(236,72,153,0.30)' : '1px solid rgba(236,72,153,0.12)',
            background: liked ? 'rgba(236,72,153,0.08)' : 'transparent',
            color: liked ? '#E11D48' : '#9B6B8A',
            fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(236,72,153,0.08)'; e.currentTarget.style.color = '#E11D48'; }}
          onMouseLeave={e => { if (!liked) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9B6B8A'; } }}
        >
          <Ic n={liked ? 'heart' : 'heartOut'} s={14} c={liked ? '#E11D48' : '#9B6B8A'}/> {likes}
        </button>

        {/* Comment */}
        <button style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '6px 12px', borderRadius: 10,
          border: '1px solid rgba(236,72,153,0.12)', background: 'transparent',
          color: '#9B6B8A', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.06)'; e.currentTarget.style.color = '#7C3AED'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.20)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9B6B8A'; e.currentTarget.style.borderColor = 'rgba(236,72,153,0.12)'; }}>
          <Ic n="chat" s={14} c="currentColor"/> {post.comments}
        </button>

        {/* Bookmark */}
        <button
          onClick={() => setSaved(s => !s)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, borderRadius: 9,
            border: saved ? '1px solid rgba(124,58,237,0.30)' : '1px solid rgba(236,72,153,0.12)',
            background: saved ? 'rgba(124,58,237,0.08)' : 'transparent',
            color: saved ? '#7C3AED' : '#9B6B8A', cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}>
          <Ic n={saved ? 'bookmarkF' : 'bookmark'} s={13} c={saved ? '#7C3AED' : '#9B6B8A'}/>
        </button>

        {/* Share */}
        <button style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 32, height: 32, borderRadius: 9,
          border: '1px solid rgba(236,72,153,0.12)', background: 'transparent',
          color: '#9B6B8A', cursor: 'pointer', transition: 'all 0.25s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(14,165,233,0.06)'; e.currentTarget.style.color = '#0EA5E9'; e.currentTarget.style.borderColor = 'rgba(14,165,233,0.20)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9B6B8A'; e.currentTarget.style.borderColor = 'rgba(236,72,153,0.12)'; }}>
          <Ic n="share" s={13} c="currentColor"/>
        </button>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────
   CREATE POST MODAL
   ──────────────────────────────────────────────── */
const CreatePostModal = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('Question');

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(10,5,20,0.60)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
        animation: 'fadeInUp 0.3s ease',
      }}>
      <div style={{
        width: '100%', maxWidth: 600,
        background: 'rgba(255,247,250,0.98)',
        borderRadius: 28, padding: 32,
        boxShadow: '0 40px 100px rgba(0,0,0,0.25)',
        border: '1px solid rgba(236,72,153,0.18)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.3rem', color: '#1A0A2E' }}>Create Discussion</div>
            <div style={{ fontSize: '0.8rem', color: '#9B6B8A', marginTop: 2 }}>Share with the community</div>
          </div>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: 10,
            border: '1px solid rgba(236,72,153,0.18)',
            background: 'rgba(255,255,255,0.8)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Ic n="x" s={16} c="#9B6B8A"/>
          </button>
        </div>

        {/* Category */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6B2A5F', display: 'block', marginBottom: 8 }}>Category</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Question', 'Success Story', 'Tips', 'Nutrition', 'Mental Health'].map(c => (
              <button key={c} onClick={() => setCategory(c)} style={{
                padding: '6px 14px', borderRadius: 999, border: 'none', cursor: 'pointer',
                fontSize: '0.78rem', fontWeight: 700,
                background: category === c ? 'linear-gradient(135deg,#E11D48,#EC4899)' : 'rgba(236,72,153,0.08)',
                color: category === c ? 'white' : '#6B2A5F',
                transition: 'all 0.2s ease',
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6B2A5F', display: 'block', marginBottom: 8 }}>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)}
            placeholder="What's on your mind?"
            style={{
              width: '100%', padding: '12px 16px', borderRadius: 12,
              border: '1.5px solid rgba(236,72,153,0.20)',
              background: 'rgba(255,255,255,0.9)', fontSize: '0.9rem',
              color: '#1A0A2E', outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = '#E11D48'}
            onBlur={e => e.target.style.borderColor = 'rgba(236,72,153,0.20)'}
          />
        </div>

        {/* Body */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6B2A5F', display: 'block', marginBottom: 8 }}>Share Your Story</label>
          <textarea value={body} onChange={e => setBody(e.target.value)}
            placeholder="Share your experience, question, or advice..."
            rows={5}
            style={{
              width: '100%', padding: '12px 16px', borderRadius: 12,
              border: '1.5px solid rgba(236,72,153,0.20)',
              background: 'rgba(255,255,255,0.9)', fontSize: '0.875rem',
              color: '#1A0A2E', outline: 'none', resize: 'vertical',
              fontFamily: 'inherit',
            }}
            onFocus={e => e.target.style.borderColor = '#E11D48'}
            onBlur={e => e.target.style.borderColor = 'rgba(236,72,153,0.20)'}
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{
            padding: '10px 22px', borderRadius: 12,
            border: '1.5px solid rgba(236,72,153,0.20)',
            background: 'transparent', color: '#9B6B8A',
            fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer',
          }}>
            Cancel
          </button>
          <button className="aura-button" style={{ padding: '10px 28px', borderRadius: 12, fontSize: '0.875rem' }}>
            <Ic n="send" s={15} c="white"/> Post to Community
          </button>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────
   MAIN COMMUNITY COMPONENT
   ──────────────────────────────────────────────── */
const Community = ({ setActiveTab }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showCreate, setShowCreate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  /* Stats counters */
  const [statsRef, statsVis] = useVisible(0.15);
  const [ctaRef, ctaVis]     = useVisible(0.15);

  const c0 = useCounter(12600, 1800, statsVis);
  const c1 = useCounter(8300,  1600, statsVis);
  const c2 = useCounter(24100, 2000, statsVis);

  const filteredPosts = POSTS.filter(p => {
    const matchCat = activeCategory === 'All' ||
      p.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      (activeCategory === 'Trending' && p.tag) ||
      (activeCategory === 'Latest') ||
      (activeCategory === 'Questions' && p.category === 'Question') ||
      (activeCategory === 'Success Stories' && p.category === 'Success Story');
    const matchSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>

      {/* ══════════════════════════════
          HERO
          ══════════════════════════════ */}
      <section style={{
        maxWidth: 1280, margin: '0 auto',
        padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,64px)',
      }}>
        <div style={{
          background: 'linear-gradient(145deg,rgba(255,255,255,0.85),rgba(255,241,244,0.80))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(236,72,153,0.12)',
          borderRadius: 32, overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(159,18,57,0.08)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)',
          gap: 0, minHeight: 400,
          position: 'relative',
        }} className="hero-grid">

          {/* Gradient orbs */}
          <div style={{ position: 'absolute', top: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(236,72,153,0.08)', filter: 'blur(60px)', pointerEvents: 'none' }}/>
          <div style={{ position: 'absolute', bottom: -40, right: -40, width: 260, height: 260, borderRadius: '50%', background: 'rgba(168,85,247,0.08)', filter: 'blur(60px)', pointerEvents: 'none' }}/>

          {/* Left copy */}
          <div style={{
            padding: 'clamp(32px,4vw,56px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            position: 'relative', zIndex: 1,
          }}>
            {/* Badge */}
            <div className="section-pill" style={{ marginBottom: 24, display: 'inline-flex', width: 'fit-content' }}>
              <span style={{ color: '#E11D48' }}>❤️</span> You Are Not Alone
            </div>

            <h1 style={{
              fontWeight: 900, fontSize: 'clamp(2.4rem,5vw,4rem)',
              color: '#1A0A2E', letterSpacing: '-0.03em', lineHeight: 1.1,
              marginBottom: 12,
            }}>
              Community
            </h1>

            <div style={{
              fontSize: 'clamp(1rem,2vw,1.3rem)', fontWeight: 700,
              background: 'linear-gradient(135deg,#E11D48,#EC4899,#A855F7)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              marginBottom: 18,
            }}>
              Share. Support. Heal. Together.
            </div>

            <p style={{
              fontSize: '1rem', color: '#6B2A5F', lineHeight: 1.75,
              maxWidth: 440, marginBottom: 32,
            }}>
              Connect with women experiencing similar PCOS and PCOD journeys.
              Ask questions, share success stories, support each other, and find trusted advice.
            </p>

            {/* Buttons — EXACTLY PRESERVED */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <button
                className="aura-button"
                onClick={() => setActiveTab('resources')}
                style={{ padding: '13px 28px', fontSize: '0.95rem', borderRadius: 14 }}
              >
                <Ic n="leaf" s={16} c="white"/> Explore Resources
              </button>
              <button
                className="aura-button-outline"
                onClick={() => setActiveTab('home')}
                style={{ padding: '12px 26px', fontSize: '0.95rem', borderRadius: 14 }}
              >
                ← Back to Home
              </button>
            </div>

            {/* Quick stats row */}
            <div style={{ display: 'flex', gap: 20, marginTop: 32, flexWrap: 'wrap' }}>
              {[
                { val: '12.6K+', label: 'Members' },
                { val: '4.9★', label: 'Rating' },
                { val: '24/7', label: 'Active' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#E11D48' }}>{s.val}</div>
                  <div style={{ fontSize: '0.72rem', color: '#9B6B8A', fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right illustration */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px 32px',
            background: 'linear-gradient(135deg,rgba(251,207,232,0.20),rgba(237,233,254,0.20))',
          }}>
            <SupportIllustration />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          STATS CARDS
          ══════════════════════════════ */}
      <section ref={statsRef} style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 clamp(20px,5vw,64px) 40px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
          gap: 16,
        }}>
          {[
            { val: c0 > 999 ? `${(c0/1000).toFixed(1)}K+` : c0, label: 'Active Members', icon: 'users', grad: 'linear-gradient(135deg,#FB7185,#E11D48)', glow: '#E11D48' },
            { val: c1 > 999 ? `${(c1/1000).toFixed(1)}K+` : c1, label: 'Discussions', icon: 'chat', grad: 'linear-gradient(135deg,#A78BFA,#7C3AED)', glow: '#7C3AED' },
            { val: c2 > 999 ? `${(c2/1000).toFixed(1)}K+` : c2, label: 'Messages Shared', icon: 'send', grad: 'linear-gradient(135deg,#34D399,#059669)', glow: '#059669' },
            { val: '4.9★', label: 'Community Rating', icon: 'star', grad: 'linear-gradient(135deg,#FBBF24,#D97706)', glow: '#D97706' },
          ].map((m, i) => (
            <div key={i} className="metric-card"
              style={{
                opacity: statsVis ? 1 : 0,
                transform: statsVis ? 'none' : 'translateY(20px)',
                transition: `all 0.6s ${0.1 * i}s ease`,
              }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, margin: '0 auto 14px',
                background: m.grad, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 6px 18px ${m.glow}30`,
              }}>
                <Ic n={m.icon} s={22} c="white"/>
              </div>
              <div style={{ fontWeight: 900, fontSize: '1.9rem', color: m.glow, lineHeight: 1, marginBottom: 4 }}>
                {m.val}
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6B2A5F' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          MAIN 2-COLUMN LAYOUT
          ══════════════════════════════ */}
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 clamp(20px,5vw,64px) 80px',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) 320px',
        gap: 28, alignItems: 'start',
      }} className="community-layout">

        {/* ── LEFT MAIN COLUMN ── */}
        <div>
          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 20 }}>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search discussions..."
              style={{
                width: '100%', padding: '13px 48px 13px 18px',
                borderRadius: 14, border: '1.5px solid rgba(236,72,153,0.18)',
                background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)',
                fontSize: '0.9rem', color: '#1A0A2E', outline: 'none',
                boxShadow: '0 4px 16px rgba(236,72,153,0.07)',
                transition: 'all 0.25s ease',
              }}
              onFocus={e => { e.target.style.borderColor = '#E11D48'; e.target.style.boxShadow = '0 4px 20px rgba(225,29,72,0.14)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(236,72,153,0.18)'; e.target.style.boxShadow = '0 4px 16px rgba(236,72,153,0.07)'; }}
            />
            <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}>
              <Ic n="filter" s={16} c="#9B6B8A"/>
            </div>
          </div>

          {/* Category filters */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24,
          }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '7px 16px', borderRadius: 999,
                border: activeCategory === cat ? 'none' : '1px solid rgba(236,72,153,0.15)',
                background: activeCategory === cat
                  ? 'linear-gradient(135deg,#E11D48,#EC4899)'
                  : 'rgba(255,255,255,0.75)',
                color: activeCategory === cat ? 'white' : '#6B2A5F',
                fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                boxShadow: activeCategory === cat ? '0 4px 14px rgba(225,29,72,0.28)' : 'none',
                transform: activeCategory === cat ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Feed header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: '#1A0A2E' }}>
              {filteredPosts.length} Discussion{filteredPosts.length !== 1 ? 's' : ''}
            </div>
            <button onClick={() => setShowCreate(true)} className="aura-button"
              style={{ padding: '8px 18px', fontSize: '0.8rem', borderRadius: 10 }}>
              <Ic n="plus" s={14} c="white"/> New Post
            </button>
          </div>

          {/* Posts */}
          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0', color: '#9B6B8A' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>💬</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>No discussions found</div>
              <div style={{ fontSize: '0.875rem' }}>Try a different filter or be the first to post!</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filteredPosts.map((post, i) => (
                <div key={post.id}
                  style={{
                    opacity: 1, animation: `fadeInUp 0.5s ${i * 0.07}s ease both`,
                  }}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 90 }}>

          {/* Create Post CTA */}
          <div style={{
            background: 'linear-gradient(135deg,#E11D48,#EC4899,#A855F7)',
            borderRadius: 22, padding: '24px',
            boxShadow: '0 12px 32px rgba(225,29,72,0.28)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'white', marginBottom: 6 }}>Share Your Story</div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.6, marginBottom: 18 }}>
              Every voice matters. Start a discussion, ask a question, or share your journey.
            </p>
            <button onClick={() => setShowCreate(true)} style={{
              width: '100%', padding: '12px', borderRadius: 12,
              background: 'rgba(255,255,255,0.20)', border: '1px solid rgba(255,255,255,0.30)',
              color: 'white', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.30)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.20)'}>
              <Ic n="plus" s={16} c="white"/> Create New Post
            </button>
          </div>

          {/* Trending Topics */}
          <div style={{
            background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(236,72,153,0.10)', borderRadius: 22, padding: '22px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#FB7185,#E11D48)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ic n="trending" s={15} c="white"/>
              </div>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1A0A2E' }}>Trending Topics</span>
            </div>
            {TRENDING_TOPICS.map((t, i) => (
              <button key={i} onClick={() => setSearchQuery(t.label)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px', borderRadius: 12, border: 'none',
                  background: 'transparent', cursor: 'pointer',
                  marginBottom: 4, transition: 'all 0.22s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(225,29,72,0.05)'; e.currentTarget.style.paddingLeft = '16px'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '12px'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#9B6B8A', minWidth: 20 }}>#{i+1}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A0A2E' }}>{t.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9B6B8A' }}>{t.count}</span>
                  <Ic n="chevR" s={12} c="#9B6B8A"/>
                </div>
              </button>
            ))}
          </div>

          {/* Top Contributors */}
          <div style={{
            background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(236,72,153,0.10)', borderRadius: 22, padding: '22px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#FBBF24,#D97706)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ic n="award" s={15} c="white"/>
              </div>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1A0A2E' }}>Top Contributors</span>
            </div>
            {CONTRIBUTORS.map((c, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 0', borderBottom: i < CONTRIBUTORS.length - 1 ? '1px solid rgba(236,72,153,0.08)' : 'none',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 11, flexShrink: 0,
                  background: `linear-gradient(135deg,${c.color}20,${c.color}10)`,
                  border: `2px solid ${c.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem',
                }}>
                  {c.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#1A0A2E', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: c.color }}>{c.badge}</div>
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#9B6B8A', flexShrink: 0 }}>
                  {c.score.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Community Guidelines */}
          <div style={{
            background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(236,72,153,0.10)', borderRadius: 22, padding: '22px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#A78BFA,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ic n="shield" s={15} c="white"/>
              </div>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1A0A2E' }}>Community Guidelines</span>
            </div>
            {GUIDELINES.map((g, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '8px 0', borderBottom: i < GUIDELINES.length - 1 ? '1px solid rgba(236,72,153,0.07)' : 'none',
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 7, flexShrink: 0,
                  background: 'rgba(16,185,129,0.10)',
                  border: '1px solid rgba(16,185,129,0.20)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Ic n="check" s={11} c="#059669"/>
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#6B2A5F', lineHeight: 1.5 }}>{g.text}</span>
              </div>
            ))}
            <div style={{
              marginTop: 14, padding: '10px 14px', borderRadius: 10,
              background: 'rgba(245,158,11,0.07)',
              border: '1px solid rgba(245,158,11,0.20)',
              fontSize: '0.72rem', color: '#B45309', lineHeight: 1.55, fontWeight: 500,
            }}>
              ⚕️ This is a peer support community — not a substitute for professional medical advice.
            </div>
          </div>
        </aside>
      </div>

      {/* ══════════════════════════════
          BOTTOM CTA
          ══════════════════════════════ */}
      <section ref={ctaRef} style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 clamp(20px,5vw,64px) clamp(48px,7vw,80px)',
      }}>
        <div style={{
          background: 'linear-gradient(135deg,#3B0764 0%,#6D28D9 35%,#BE185D 70%,#9F1239 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 8s ease infinite',
          borderRadius: 28, padding: 'clamp(36px,5vw,60px)',
          position: 'relative', overflow: 'hidden',
          opacity: ctaVis ? 1 : 0,
          transform: ctaVis ? 'none' : 'translateY(32px)',
          transition: 'all 0.8s ease',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          gap: 32,
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.07), transparent 60%)', pointerEvents: 'none' }}/>

          <div style={{ position: 'relative', maxWidth: 560 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '5px 16px', borderRadius: 999, marginBottom: 20,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.20)',
              fontSize: '0.75rem', fontWeight: 700, color: 'white',
              letterSpacing: '0.06em',
            }}>
              🌸 STRONGER TOGETHER
            </div>

            <h2 style={{
              fontWeight: 900, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)',
              color: 'white', letterSpacing: '-0.02em', marginBottom: 14, lineHeight: 1.15,
            }}>
              Every Story Matters.
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.80)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 28 }}>
              Join thousands of women supporting each other every single day.
              Your voice, your journey, your community — always here for you.
            </p>

            <button
              onClick={() => setShowCreate(true)}
              style={{
                padding: '14px 36px', borderRadius: 14,
                background: 'white', border: 'none',
                color: '#E11D48', fontWeight: 800, fontSize: '1rem',
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10,
                boxShadow: '0 8px 28px rgba(0,0,0,0.22)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(0,0,0,0.32)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.22)'; }}
            >
              <Ic n="sparkle" s={18} c="#E11D48"/> Join Discussion
            </button>
          </div>

          {/* Right floating element */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 12,
            animation: 'floatY 5s ease-in-out infinite',
            position: 'relative',
          }}>
            {[
              { emoji: '❤️', text: '"You\'re not alone"', color: 'rgba(255,255,255,0.95)' },
              { emoji: '🌸', text: '"We are here for you"', color: 'rgba(255,255,255,0.85)' },
              { emoji: '✨', text: '"Share your light"', color: 'rgba(255,255,255,0.75)' },
            ].map((q, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: 14, padding: '12px 16px',
                display: 'flex', alignItems: 'center', gap: 10,
                fontSize: '0.82rem', fontWeight: 600, color: q.color,
                transform: `translateX(${i * 8}px)`,
                transition: 'all 0.3s ease',
              }}>
                <span style={{ fontSize: '1.2rem' }}>{q.emoji}</span> {q.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CREATE POST MODAL
          ══════════════════════════════ */}
      {showCreate && <CreatePostModal onClose={() => setShowCreate(false)} />}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .community-layout { grid-template-columns: 1fr !important; }
          .community-layout aside { position: static !important; }
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Community;