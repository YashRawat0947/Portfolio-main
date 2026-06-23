import { useRef, useEffect } from 'react';

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

const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    variant: 'default',
    items: ['C++', 'Java', 'Python', 'JavaScript', 'MySQL'],
  },
  {
    title: 'Frontend',
    variant: 'green',
    items: ['React', 'Next.js', 'TailwindCSS', 'Bootstrap', 'Tkinter'],
  },
  {
    title: 'Backend & APIs',
    variant: 'orange',
    items: ['Node.js', 'Express', 'FastAPI', 'Flask', 'Django', 'REST API', 'Socket.io', 'WebSockets'],
  },
  {
    title: 'AI / ML',
    variant: 'default',
    items: ['Hugging Face API', 'OpenCV', 'Image Embeddings', 'Vision Models'],
  },
  {
    title: 'Databases',
    variant: 'green',
    items: ['MongoDB', 'MySQL'],
  },
  {
    title: 'Tools & DevOps',
    variant: 'orange',
    items: ['Git', 'GitHub', 'JWT Auth', 'Cryptography', 'VS Code'],
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

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
          className="glass-card reveal"
          style={{
            marginTop: '2rem',
            padding: '2rem',
            transitionDelay: '0.5s',
          }}
        >
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { name: 'Python & AI/ML', pct: 85, color: 'var(--cyan)' },
              { name: 'Node.js / Backend Dev', pct: 80, color: 'var(--purple-bright)' },
              { name: 'React / Frontend', pct: 75, color: 'var(--green)' },
              { name: 'Database (MongoDB / MySQL)', pct: 78, color: 'var(--orange)' },
              { name: 'REST APIs & Authentication', pct: 82, color: 'var(--cyan)' },
            ].map((skill) => (
              <div key={skill.name}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.35rem',
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
                    }}
                  >
                    {skill.pct}%
                  </span>
                </div>
                <div
                  style={{
                    height: '4px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${skill.pct}%`,
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                      borderRadius: '4px',
                      boxShadow: `0 0 8px ${skill.color}44`,
                      transition: 'width 1.5s cubic-bezier(0.4,0,0.2,1)',
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
