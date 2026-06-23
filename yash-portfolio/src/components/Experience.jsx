import { useRef, useEffect } from 'react';

/* ── Scroll-reveal hook ── */
const useReveal = (ref) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.08 }
    );
    const els = ref.current?.querySelectorAll('.reveal');
    els?.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ref]);
};

/* ── Centre glow line driven by scroll ── */
const ScrollTimeline = ({ containerRef }) => {
  const fillRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el  = containerRef.current;
      const fill = fillRef.current;
      if (!el || !fill) return;
      const { top, height } = el.getBoundingClientRect();
      const viewH    = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (viewH - top) / (height + viewH * 0.3)));
      fill.style.height = `${progress * 100}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [containerRef]);

  return (
    /* dim track */
    <div style={{
      position: 'absolute',
      left: '50%', top: 0, bottom: 0,
      transform: 'translateX(-50%)',
      width: '2px',
      background: 'rgba(0,245,255,0.07)',
      zIndex: 1,
    }}>
      {/* glowing fill */}
      <div
        ref={fillRef}
        style={{
          width: '100%', height: '0%',
          background: 'linear-gradient(to bottom, var(--cyan), var(--purple-bright))',
          boxShadow: '0 0 10px var(--cyan), 0 0 24px rgba(0,245,255,0.35)',
          borderRadius: '2px',
          position: 'relative',
          transition: 'height 0.12s linear',
        }}
      >
        {/* travelling dot */}
        <div style={{
          position: 'absolute', bottom: '-6px', left: '50%',
          transform: 'translateX(-50%)',
          width: '13px', height: '13px', borderRadius: '50%',
          background: 'var(--cyan)',
          boxShadow: '0 0 14px var(--cyan), 0 0 28px rgba(0,245,255,0.6)',
          border: '2.5px solid var(--bg-dark)',
        }} />
      </div>
    </div>
  );
};

/* ── Centre node dot ── */
const NodeDot = ({ color }) => (
  <div style={{
    width: '18px', height: '18px', borderRadius: '50%',
    background: color,
    boxShadow: `0 0 16px ${color}, 0 0 32px ${color}55`,
    border: '3px solid var(--bg-dark)',
    flexShrink: 0,
    zIndex: 2,
    position: 'relative',
  }} />
);

/* ── Horizontal connector from card to centre line ── */
const Connector = ({ side, color }) => (
  <div style={{
    position: 'absolute',
    top: '50%',
    [side]: '-2rem',
    transform: 'translateY(-50%)',
    width: '2rem',
    height: '1px',
    background: `linear-gradient(${side === 'right' ? 'to right' : 'to left'}, transparent, ${color})`,
  }} />
);

const Experience = () => {
  const sectionRef = useRef(null);
  const eduRef     = useRef(null);
  useReveal(sectionRef);

  return (
    <section id="experience" className="section" ref={sectionRef}>
      <div className="container">

        {/* ─── SECTION HEADER ─── */}
        <div className="section-header reveal">
          <div className="section-label">02 / Experience & Education</div>
          <h2 className="section-title">Education</h2>
          <div className="section-line" />
        </div>

        {/* ══════════════════════════════════════════
            VERTICAL CENTRE-LINE EDUCATION TIMELINE
        ══════════════════════════════════════════ */}
        <div ref={eduRef} style={{ position: 'relative', marginBottom: '5rem' }}>
          <ScrollTimeline containerRef={eduRef} />

          {/* ── ROW 1 : School — LEFT card, node centre, empty right ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 40px 1fr',
            alignItems: 'center',
            marginBottom: '4rem',           /* ← vertical space */
          }}>

            {/* LEFT — School card */}
            <div className="reveal" style={{ paddingRight: '2.5rem' }}>
              <div
                className="glass-card"
                style={{
                  border: '1px solid rgba(0,255,136,0.22)',
                  padding: '1.75rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,255,136,0.5)';
                  e.currentTarget.style.boxShadow  = '0 0 32px rgba(0,255,136,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,255,136,0.22)';
                  e.currentTarget.style.boxShadow  = '';
                }}
              >
                {/* corner glow */}
                <div style={{
                  position:'absolute', top:'-40px', left:'-40px',
                  width:'150px', height:'150px',
                  background:'radial-gradient(circle, rgba(0,255,136,0.12) 0%, transparent 70%)',
                  pointerEvents:'none',
                }} />

                {/* Connector → centre */}
                <Connector side="right" color="rgba(0,255,136,0.4)" />

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
                  <div style={{ fontSize:'1.8rem' }}>📚</div>
                  <div style={{
                    fontFamily:'var(--font-mono)', fontSize:'0.72rem',
                    background:'rgba(0,255,136,0.12)',
                    border:'1px solid rgba(0,255,136,0.3)',
                    color:'var(--green)',
                    padding:'0.32rem 0.9rem', borderRadius:'20px',
                    fontWeight:'700', letterSpacing:'0.06em',
                  }}>
                    82%
                  </div>
                </div>

                <div style={{ fontSize:'0.97rem', fontWeight:'700', color:'var(--text-primary)', marginBottom:'0.25rem' }}>
                  Class XII — CBSE
                </div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.78rem', color:'var(--green)', marginBottom:'0.3rem' }}>
                  Bal Bhavan Public Sr. Sec. School
                </div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--text-muted)', marginBottom:'1.25rem' }}>
                  May 2023
                </div>

                {/* Score bar */}
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.3rem' }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--text-muted)' }}>Score</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--green)' }}>82 / 100</span>
                  </div>
                  <div style={{ height:'3px', background:'rgba(255,255,255,0.05)', borderRadius:'3px', overflow:'hidden' }}>
                    <div style={{
                      height:'100%', width:'82%',
                      background:'linear-gradient(90deg, #00c864, var(--green))',
                      boxShadow:'0 0 8px rgba(0,255,136,0.5)', borderRadius:'3px',
                    }} />
                  </div>
                </div>
              </div>
            </div>

            {/* CENTRE — node on the line */}
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', position:'relative', zIndex:2 }}>
              <NodeDot color="var(--green)" />
            </div>

            {/* RIGHT — date label */}
            <div className="reveal" style={{ paddingLeft: '2rem' }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'var(--text-muted)', letterSpacing:'0.1em' }}>
                May 2023
              </div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'rgba(0,255,136,0.5)', marginTop:'0.3rem' }}>
                ← Senior Secondary
              </div>
            </div>
          </div>

          {/* ── ROW 2 : empty left, node centre, College — RIGHT card ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 40px 1fr',
            alignItems: 'center',
          }}>

            {/* LEFT — date label */}
            <div className="reveal" style={{ paddingRight: '2rem', textAlign: 'right' }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'var(--text-muted)', letterSpacing:'0.1em' }}>
                2023 – Present
              </div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'rgba(124,58,237,0.5)', marginTop:'0.3rem' }}>
                Undergraduate →
              </div>
            </div>

            {/* CENTRE — node on the line */}
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', position:'relative', zIndex:2 }}>
              <NodeDot color="var(--purple-bright)" />
            </div>

            {/* RIGHT — College card */}
            <div className="reveal" style={{ paddingLeft: '2.5rem', transitionDelay: '0.1s' }}>
              <div
                className="glass-card"
                style={{
                  border: '1px solid rgba(124,58,237,0.22)',
                  padding: '1.75rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)';
                  e.currentTarget.style.boxShadow  = '0 0 32px rgba(124,58,237,0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.22)';
                  e.currentTarget.style.boxShadow  = '';
                }}
              >
                {/* corner glow */}
                <div style={{
                  position:'absolute', top:'-40px', right:'-40px',
                  width:'150px', height:'150px',
                  background:'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
                  pointerEvents:'none',
                }} />

                {/* Connector ← centre */}
                <Connector side="left" color="rgba(124,58,237,0.4)" />

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
                  <div style={{ fontSize:'1.8rem' }}>🎓</div>
                  <div style={{
                    fontFamily:'var(--font-mono)', fontSize:'0.72rem',
                    background:'rgba(124,58,237,0.12)',
                    border:'1px solid rgba(124,58,237,0.35)',
                    color:'var(--purple-bright)',
                    padding:'0.32rem 0.9rem', borderRadius:'20px',
                    fontWeight:'700', letterSpacing:'0.06em',
                  }}>
                    CGPA 7.8
                  </div>
                </div>

                <div style={{ fontSize:'0.97rem', fontWeight:'700', color:'var(--text-primary)', marginBottom:'0.25rem' }}>
                  BTech — CS & Engineering (AI/ML)
                </div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.78rem', color:'var(--purple-bright)', marginBottom:'0.3rem' }}>
                  Galgotias University
                </div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--text-muted)', marginBottom:'1.25rem' }}>
                  2023 – Present (Current)
                </div>

                {/* CGPA bar */}
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.3rem' }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--text-muted)' }}>CGPA Progress</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--purple-bright)' }}>7.8 / 10</span>
                  </div>
                  <div style={{ height:'3px', background:'rgba(255,255,255,0.05)', borderRadius:'3px', overflow:'hidden' }}>
                    <div style={{
                      height:'100%', width:'78%',
                      background:'linear-gradient(90deg, var(--purple), var(--purple-bright))',
                      boxShadow:'0 0 8px rgba(124,58,237,0.55)', borderRadius:'3px',
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>{/* end edu timeline */}


        {/* ══════════════════════════════
            WORK EXPERIENCE — Hero Card
        ══════════════════════════════ */}
        <div
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
            color: 'var(--cyan)', letterSpacing: '0.18em',
            textTransform: 'uppercase', marginBottom: '1.5rem',
          }}
          className="reveal"
        >
          Work Experience
        </div>

        <div
          className="glass-card reveal"
          style={{
            border: '1px solid rgba(0,245,255,0.25)',
            background: 'linear-gradient(135deg, rgba(0,245,255,0.04) 0%, rgba(124,58,237,0.06) 100%)',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glow blobs */}
          <div style={{
            position:'absolute', top:'-60px', right:'-60px',
            width:'240px', height:'240px',
            background:'radial-gradient(circle, rgba(0,245,255,0.1) 0%, transparent 70%)',
            pointerEvents:'none',
          }} />
          <div style={{
            position:'absolute', bottom:'-50px', left:'-50px',
            width:'200px', height:'200px',
            background:'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
            pointerEvents:'none',
          }} />

          {/* Header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'1rem', marginBottom:'1.75rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'1.25rem' }}>
              <div style={{
                width:'58px', height:'58px', borderRadius:'14px', flexShrink:0,
                background:'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(124,58,237,0.2))',
                border:'1px solid rgba(0,245,255,0.3)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'1.6rem',
              }}>💼</div>
              <div>
                <div style={{
                  fontFamily:'var(--font-mono)', fontSize:'0.65rem',
                  color:'var(--cyan)', letterSpacing:'0.2em',
                  textTransform:'uppercase', marginBottom:'0.3rem',
                }}>● Full-time Internship</div>
                <h3 style={{ fontSize:'1.4rem', fontWeight:'800', color:'var(--text-primary)', lineHeight:1.1, margin:0 }}>
                  Backend Developer Intern
                </h3>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.88rem', color:'var(--cyan)', marginTop:'0.3rem' }}>
                  3W Business Pvt. Limited
                </div>
              </div>
            </div>
            <div style={{
              fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'var(--cyan)',
              background:'rgba(0,245,255,0.08)', border:'1px solid rgba(0,245,255,0.25)',
              padding:'0.45rem 1.1rem', borderRadius:'20px', whiteSpace:'nowrap',
              alignSelf:'flex-start',
            }}>Nov 2024 – Feb 2025</div>
          </div>

          {/* Divider */}
          <div style={{ height:'1px', background:'linear-gradient(90deg, rgba(0,245,255,0.3), transparent)', marginBottom:'1.75rem' }} />

          {/* 3 responsibility cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:'1rem', marginBottom:'1.75rem' }}>
            {[
              { icon:'⚡', title:'Real-Time Messaging',  desc:'Integrated Socket.io for bidirectional real-time messaging and live notifications.' },
              { icon:'🗄️', title:'DB Optimisation',      desc:'Profiled and optimized MongoDB queries for significantly faster read performance.' },
              { icon:'🔑', title:'Auth & Authorization', desc:'Implemented JWT authentication and role-based access control across all API endpoints.' },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background:'rgba(0,245,255,0.03)',
                  border:'1px solid rgba(0,245,255,0.1)',
                  borderRadius:'10px', padding:'1.25rem',
                  transition:'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,245,255,0.3)';
                  e.currentTarget.style.background  = 'rgba(0,245,255,0.07)';
                  e.currentTarget.style.transform   = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,245,255,0.1)';
                  e.currentTarget.style.background  = 'rgba(0,245,255,0.03)';
                  e.currentTarget.style.transform   = 'translateY(0)';
                }}
              >
                <div style={{ fontSize:'1.4rem', marginBottom:'0.5rem' }}>{item.icon}</div>
                <div style={{ fontSize:'0.87rem', fontWeight:'700', color:'var(--text-primary)', marginBottom:'0.4rem' }}>{item.title}</div>
                <div style={{ fontSize:'0.79rem', color:'var(--text-secondary)', lineHeight:1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div>
            <div style={{
              fontFamily:'var(--font-mono)', fontSize:'0.65rem',
              color:'var(--text-muted)', letterSpacing:'0.15em',
              textTransform:'uppercase', marginBottom:'0.75rem',
            }}>Tech Stack</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.45rem' }}>
              {['Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT', 'REST API'].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
