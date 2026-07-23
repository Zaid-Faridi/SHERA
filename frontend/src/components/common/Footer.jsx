import React from 'react';

const Footer = ({ setActiveTab }) => {
  const quickLinks = [
    { name: 'Community',      tab: 'community',       icon: '👭' },
    { name: 'Doctors',        tab: 'resources',       icon: '🩺' },
    { name: 'Tracker',        tab: 'tracker',         icon: '📅' },
    { name: 'Early Detection',tab: 'early-detection', icon: '🔍' },
    { name: 'Resources',      tab: 'resources',       icon: '📚' },
    { name: 'Contact',        tab: 'contact',         icon: '✉️' },
  ];

  const socials = [
    { icon: '𝕏', label: 'Twitter',   href: '#' },
    { icon: '📘', label: 'Facebook',  href: '#' },
    { icon: '📸', label: 'Instagram', href: '#' },
    { icon: '▶️', label: 'YouTube',   href: '#' },
  ];

  return (
    <footer className="footer-premium" style={{ marginTop: 0 }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: 'clamp(40px,5vw,64px) clamp(20px,5vw,64px) 0',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.3fr) minmax(0,1fr) minmax(0,1fr)',
          gap: 'clamp(24px,4vw,64px)',
          paddingBottom: 40,
          borderBottom: '1px solid rgba(236,72,153,0.10)',
        }}
        className="footer-cols"
        >
          {/* Brand column */}
          <div>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'linear-gradient(135deg,#FB7185,#EC4899)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 6px 16px rgba(236,72,153,0.30)',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"
                    stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 10c1.2-1.5 4-1.2 4 1.2 0 2.1-3.1 3.9-4 4.3-.9-.4-4-2.2-4-4.3 0-2.4 2.8-2.7 4-1.2z"
                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ fontWeight: 900, fontSize: '1.35rem', color: '#1A0A2E', letterSpacing: '-0.02em' }}>
                SHE<span style={{ color: '#E11D48' }}>ra</span>
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#9B6B8A', lineHeight: 1.7, maxWidth: 260, marginBottom: 24 }}>
              AI-powered early detection and lifestyle guidance for PCOS/PCOD.
              Empowering women through compassionate clinical intelligence.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map((s, i) => (
                <a key={i} href={s.href} aria-label={s.label}
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(236,72,153,0.14)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem', textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 2px 8px rgba(159,18,57,0.06)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(225,29,72,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(225,29,72,0.25)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.7)';
                    e.currentTarget.style.borderColor = 'rgba(236,72,153,0.14)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontWeight: 800, fontSize: '0.8rem', color: '#E11D48',
              letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20,
            }}>
              Quick Links
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
              {quickLinks.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab && setActiveTab(item.tab)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', padding: '7px 10px', borderRadius: 8,
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: '0.875rem', fontWeight: 500, color: '#6B2A5F',
                    transition: 'all 0.22s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(225,29,72,0.06)';
                    e.currentTarget.style.color = '#E11D48';
                    e.currentTarget.style.paddingLeft = '14px';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.color = '#6B2A5F';
                    e.currentTarget.style.paddingLeft = '10px';
                  }}
                >
                  <span style={{ fontSize: '0.9rem' }}>{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter / trust */}
          <div>
            <h4 style={{
              fontWeight: 800, fontSize: '0.8rem', color: '#E11D48',
              letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20,
            }}>
              Stay in the Loop
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#9B6B8A', lineHeight: 1.65, marginBottom: 16 }}>
              Get wellness tips and PCOS insights delivered to your inbox.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="email"
                placeholder="your@email.com"
                className="aura-input"
                style={{ flex: 1, padding: '10px 14px', fontSize: '0.85rem' }}
              />
              <button
                className="aura-button"
                style={{ padding: '10px 18px', fontSize: '0.85rem', borderRadius: 12, flexShrink: 0 }}
              >
                →
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['🔒 HIPAA Safe', '🛡️ Encrypted', '✅ Verified AI'].map((b, i) => (
                <div key={i} style={{
                  fontSize: '0.72rem', fontWeight: 600, color: '#9B6B8A',
                  padding: '5px 12px', borderRadius: 999,
                  background: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(236,72,153,0.12)',
                }}>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: '20px 0',
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: 12,
        }}>
          <p style={{ fontSize: '0.78rem', color: '#9B6B8A' }}>
            © 2026 SHEra AI. All rights reserved.
          </p>

          <p style={{ fontSize: '0.75rem', color: '#B89AAA', textAlign: 'center', flex: 1, padding: '0 16px' }}>
            ⚕️ Educational information only, not medical advice. Consult a professional.
          </p>

          <div style={{ display: 'flex', gap: 16 }}>
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((l, i) => (
              <a key={i} href="#"
                style={{
                  fontSize: '0.78rem', color: '#9B6B8A',
                  textDecoration: 'none', transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#E11D48'}
                onMouseLeave={e => e.currentTarget.style.color = '#9B6B8A'}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive columns */}
      <style>{`
        @media (max-width: 768px) {
          .footer-cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
