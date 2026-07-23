import React, { useState, useEffect } from 'react';

const Header = ({ setActiveTab, onOpenLogin, onOpenSignup, currentUser, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { key: 'home',            label: 'Home' },
    { key: 'early-detection', label: 'Early Detection' },
    { key: 'tracker',         label: 'Period Tracker' },
    { key: 'resources',       label: 'Resources' },
    { key: 'community',       label: 'Community' },
  ];

  return (
    <header
      style={{
        background: scrolled
          ? 'rgba(255,241,244,0.88)'
          : 'rgba(255,241,244,0.70)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: scrolled ? '1px solid rgba(236,72,153,0.14)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(159,18,57,0.08)' : 'none',
        transition: 'all 0.4s ease',
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">

        {/* ── Logo ── */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 group"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <div
            style={{
              width: 42, height: 42,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #FB7185, #EC4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(236,72,153,0.35)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            className="group-hover:scale-110"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"
                stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 10c1.2-1.5 4-1.2 4 1.2 0 2.1-3.1 3.9-4 4.3-.9-.4-4-2.2-4-4.3 0-2.4 2.8-2.7 4-1.2z"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-left">
            <div style={{ fontWeight: 800, fontSize: '1.25rem', lineHeight: 1, color: '#1A0A2E', letterSpacing: '-0.02em' }}>
              SHE<span style={{ color: '#E11D48' }}>ra</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#9B6B8A', fontWeight: 500, letterSpacing: '0.04em' }}>
              AI for Women's Wellness
            </div>
          </div>
        </button>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              style={{
                padding: '8px 16px',
                borderRadius: 10,
                background: 'none',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#6B2A5F',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(225,29,72,0.07)';
                e.currentTarget.style.color = '#E11D48';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#6B2A5F';
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ── Auth Actions ── */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6B2A5F' }}>
                Hi, {currentUser.name.split(' ')[0]}
              </span>
              <button
                onClick={onLogout}
                className="aura-button-outline hidden sm:block"
                style={{ padding: '8px 16px', fontSize: '0.875rem', borderColor: '#E11D48', color: '#E11D48' }}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onOpenLogin}
                className="hidden sm:block"
                style={{
                  background: 'none', border: 'none',
                  padding: '8px 16px', borderRadius: 10,
                  fontSize: '0.875rem', fontWeight: 600,
                  color: '#6B2A5F', cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#E11D48'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#6B2A5F'; }}
              >
                Log in
              </button>

              <button
                onClick={onOpenSignup}
                className="aura-button"
                style={{ padding: '9px 22px', fontSize: '0.875rem' }}
              >
                Sign up
              </button>
            </>
          )}

          <button
            onClick={() => setActiveTab('onboarding')}
            className="aura-button-outline hidden md:flex"
            style={{ padding: '8px 20px', fontSize: '0.875rem' }}
          >
            My Profile
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(o => !o)}
            style={{
              background: 'rgba(225,29,72,0.07)', border: '1px solid rgba(225,29,72,0.14)',
              borderRadius: 10, padding: '8px 10px', cursor: 'pointer',
              color: '#E11D48', fontSize: '1.1rem',
            }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div
          style={{
            background: 'rgba(255,241,244,0.96)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(236,72,153,0.12)',
            padding: '12px 24px 20px',
            animation: 'fadeInUp 0.25s ease',
          }}
        >
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => { setActiveTab(item.key); setMobileOpen(false); }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '12px 16px', borderRadius: 10, marginBottom: 4,
                background: 'none', border: 'none',
                fontSize: '0.95rem', fontWeight: 600, color: '#6B2A5F', cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(225,29,72,0.07)'; e.currentTarget.style.color = '#E11D48'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#6B2A5F'; }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;