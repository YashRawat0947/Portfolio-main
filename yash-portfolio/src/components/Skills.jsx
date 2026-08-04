import { useRef, useEffect, useState } from 'react';

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
      { threshold: 0.05 }
    );
    const els = ref.current?.querySelectorAll('.reveal');
    els?.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ref]);
};

/* ── Animate bars when container enters view ── */
const useBarAnimation = (ref) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return visible;
};

const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    variant: 'default',
    items: ['C++', 'Java', 'Python', 'JavaScript', 'MySQL'],
  },
  {
    title: 'Frontend',
    variant: 'green',
    items: ['React.js', 'Next.js'],
  },
  {
    title: 'Backend',
    variant: 'orange',
    items: ['Node.js', 'Express.js', 'Flask', 'FastAPI', 'Django'],
  },
  {
    title: 'Databases',
    variant: 'green',
    items: ['MongoDB', 'MySQL'],
  },
  {
    title: 'Machine Learning & AI',
    variant: 'default',
    items: [
      'TensorFlow',
      'Keras',
      'Scikit-Learn',
      'OpenCV',
      'NumPy',
      'Hugging Face API',
      'YOLOv8',
      'ResNet-50',
      'MediaPipe',
      'TensorFlow.js',
      'Computer Vision',
    ],
  },
  {
    title: 'Tools & Technologies',
    variant: 'orange',
    items: ['GitHub', 'REST APIs', 'Socket.io', 'JWT', 'Cryptography'],
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const barsRef = useRef(null);
  useReveal(sectionRef);
  const barsVisible = useBarAnimation(barsRef);

  const skills = [
    { name: 'Python & AI / ML Stack', pct: 88, color: 'var(--cyan)' },
    { name: 'Node.js / Backend Development', pct: 82, color: 'var(--purple-bright)' },
    { name: 'React.js / Frontend', pct: 78, color: 'var(--green)' },
    { name: 'Databases (MongoDB / MySQL)', pct: 80, color: 'var(--orange)' },
    { name: 'REST APIs, Socket.io & Auth', pct: 84, color: 'var(--cyan)' },
  ];

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">05 / Skills</div>
          <h2 className="section-title">Tech Arsenal</h2>
          <div className="section-line" />
        </div>

        <div className="skills-grid">
          {SKILL_CATEGORIES.map((cat, i) => (
            <div
              key={cat.title}
              className="glass-card reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="skill-category-title">{cat.title}</div>
              <div className="skill-items">
                {cat.items.map((item) => (
                  <span key={item} className={`skill-tag ${cat.variant !== 'default' ? cat.variant : ''}`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skill level indicators */}
        <div
          ref={barsRef}
          className="glass-card reveal"
          style={{
            marginTop: '2rem',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
            transitionDelay: '0.5s',
          }}
        >
          {/* ── Corner glow blobs ── */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '220px',
            height: '220px',
            background: 'radial-gradient(circle, rgba(0,245,255,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-50px',
            left: '-50px',
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--cyan)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            Proficiency Overview
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {skills.map((skill, i) => (
              <div key={skill.name}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.4rem',
                  }}
                >
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {skill.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: skill.color,
                      opacity: barsVisible ? 1 : 0,
                      transition: 'opacity 0.4s ease 0.3s',
                    }}
                  >
                    {skill.pct}%
                  </span>
                </div>
                {/* Track */}
                <div
                  style={{
                    height: '6px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  {/* Fill - animates from 0 to target */}
                  <div
                    style={{
                      height: '100%',
                      width: barsVisible ? `${skill.pct}%` : '0%',
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                      borderRadius: '6px',
                      boxShadow: `0 0 12px ${skill.color}44, 0 0 24px ${skill.color}22`,
                      transition: `width 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.15}s`,
                    }}
                  />
                  {/* Glow tip */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: barsVisible ? `${skill.pct}%` : '0%',
                      transform: 'translate(-50%, -50%)',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: skill.color,
                      boxShadow: `0 0 10px ${skill.color}, 0 0 20px ${skill.color}66`,
                      opacity: barsVisible ? 1 : 0,
                      transition: `left 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.15}s, opacity 0.3s ease ${i * 0.15 + 0.3}s`,
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;