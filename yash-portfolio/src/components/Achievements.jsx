import { useRef, useEffect } from 'react';

const useReveal = (ref) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
          }
        });
      },
      { threshold: 0.05 }
    );
    const els = ref.current?.querySelectorAll('.reveal');
    els?.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px) scale(0.97)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ref]);
};

const Achievements = () => {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <section id="achievements" className="section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <div className="section-label">03 / Achievements</div>
          <h2 className="section-title">Milestones & Recognition</h2>
          <div className="section-line" />
        </div>

        {/* Main SIH Card — Hero Achievement */}
        <div
          className="glass-card reveal"
          style={{
            transitionDelay: '0.1s',
            border: '1px solid rgba(255, 107, 53, 0.3)',
            background: 'linear-gradient(135deg, rgba(255,107,53,0.04) 0%, rgba(124,58,237,0.06) 100%)',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background glow */}
          <div style={{
            position: 'absolute',
            top: '-60px', right: '-60px',
            width: '250px', height: '250px',
            background: 'radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-40px', left: '-40px',
            width: '200px', height: '200px',
            background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Trophy icon */}
              <div style={{
                width: '60px', height: '60px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(255,107,53,0.25), rgba(255,180,0,0.2))',
                border: '1px solid rgba(255,107,53,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                flexShrink: 0,
              }}>
                🏆
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--orange)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: '0.3rem',
                }}>
                  ★ National Finalist
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  color: 'var(--text-primary)',
                  lineHeight: 1.1,
                }}>
                  Smart India Hackathon 2024
                </h3>
              </div>
            </div>

            {/* Date badge */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--orange)',
              background: 'rgba(255,107,53,0.1)',
              border: '1px solid rgba(255,107,53,0.3)',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              whiteSpace: 'nowrap',
            }}>
              SIH 2024 Finalist
            </div>
          </div>

          {/* Meta info */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
            {[
              {  label: 'Venue', value: 'IIT Gandhinagar' },
              {  label: 'Problem ID', value: 'PSID 1727' },
              {  label: 'Level', value: 'National' },
            ].map((meta) => (
              <div key={meta.label}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
                  {meta.icon} {meta.label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                  {meta.value}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,107,53,0.3), transparent)', marginBottom: '1.75rem' }} />

          {/* Achievements grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
            {[
              {
                title: 'National Finalist',
                desc: 'Selected as a national finalist among thousands of teams from across India at Smart India Hackathon 2024.',
              },
              {
                title: 'Secure Legacy Framework',
                desc: 'Designed a robust security framework for legacy applications addressing real-world vulnerabilities under PSID 1727.',
              },
              {
                title: 'Encryption Modules',
                desc: 'Implemented advanced encryption and decryption modules for system-level data protection ensuring tamper-proof payloads.',
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: 'rgba(255,107,53,0.04)',
                  border: '1px solid rgba(255,107,53,0.12)',
                  borderRadius: '10px',
                  padding: '1.25rem',
                  transition: 'var(--transition)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,107,53,0.3)';
                  e.currentTarget.style.background = 'rgba(255,107,53,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,107,53,0.12)';
                  e.currentTarget.style.background = 'rgba(255,107,53,0.04)';
                }}
              >
                <div style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Tech used */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Technologies Applied
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['Python', 'Cryptography', 'Flask', 'System Security', 'Data Encryption', 'Secure APIs'].map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,107,53,0.22)',
                    color: 'var(--orange)',
                    background: 'rgba(255,107,53,0.07)',
                    letterSpacing: '0.03em',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stat counters below */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginTop: '1.5rem',
            transitionDelay: '0.25s',
          }}
        >
          {[
            { num: '#1727', label: 'Problem Statement ID', color: 'var(--orange)' },
            { num: 'IIT', label: 'Venue: IIT Gandhinagar', color: 'var(--cyan)' },
            { num: '2024', label: 'Smart India Hackathon', color: 'var(--purple-bright)' },
          ].map((s) => (
            <div
              key={s.label}
              className="glass-card"
              style={{ textAlign: 'center', padding: '1.5rem 1rem' }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.8rem',
                fontWeight: '800',
                color: s.color,
                textShadow: `0 0 20px ${s.color}55`,
                marginBottom: '0.4rem',
              }}>
                {s.num}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
