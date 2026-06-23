import { useEffect, useRef } from 'react';

const useInView = (ref, threshold = 0.1) => {
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
      { threshold }
    );

    const elements = ref.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ref, threshold]);
};

const About = () => {
  const sectionRef = useRef(null);
  useInView(sectionRef);

  const codeLines = [
    { ln: '1', parts: [{ cls: 'code-kw', text: 'const ' }, { cls: 'code-var', text: 'developer' }, { cls: 'code-op', text: ' = {' }] },
    { ln: '2', parts: [{ cls: '', text: '  ' }, { cls: 'code-var', text: 'name' }, { cls: 'code-op', text: ': ' }, { cls: 'code-str', text: '"Yash Rawat"' }, { cls: 'code-op', text: ',' }] },
    { ln: '3', parts: [{ cls: '', text: '  ' }, { cls: 'code-var', text: 'role' }, { cls: 'code-op', text: ': ' }, { cls: 'code-str', text: '"CS Undergrad (AI/ML)"' }, { cls: 'code-op', text: ',' }] },
    { ln: '4', parts: [{ cls: '', text: '  ' }, { cls: 'code-var', text: 'university' }, { cls: 'code-op', text: ': ' }, { cls: 'code-str', text: '"Galgotias University"' }, { cls: 'code-op', text: ',' }] },
    { ln: '5', parts: [{ cls: '', text: '  ' }, { cls: 'code-var', text: 'email' }, { cls: 'code-op', text: ': ' }, { cls: 'code-str', text: '"yashrawat2006@gmail.com"' }, { cls: 'code-op', text: ',' }] },
    { ln: '6', parts: [{ cls: '', text: '  ' }, { cls: 'code-var', text: 'passion' }, { cls: 'code-op', text: ': [' }] },
    { ln: '7', parts: [{ cls: '', text: '    ' }, { cls: 'code-str', text: '"AI/ML Systems"' }, { cls: 'code-op', text: ', ' }, { cls: 'code-str', text: '"Web Dev"' }] },
    { ln: '8', parts: [{ cls: '', text: '    ' }, { cls: 'code-str', text: '"Real-time Apps"' }, { cls: 'code-op', text: ',' }] },
    { ln: '9', parts: [{ cls: '', text: '  ' }, { cls: 'code-op', text: '],' }] },
    { ln: '10', parts: [{ cls: '', text: '  ' }, { cls: 'code-var', text: 'achievement' }, { cls: 'code-op', text: ': ' }, { cls: 'code-str', text: '"SIH 2024 Finalist"' }] },
    { ln: '11', parts: [{ cls: 'code-op', text: '};' }] },
  ];

  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">01 / About</div>
          <h2 className="section-title">Who Am I?</h2>
          <div className="section-line" />
        </div>

        <div className="about-grid">
          {/* Code Block */}
          <div className="about-code-block reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="code-dots">
              <span /><span /><span />
            </div>
            <div className="code-content">
              {codeLines.map((line) => (
                <div key={line.ln} className="code-line">
                  <span className="code-ln">{line.ln}</span>
                  <span>
                    {line.parts.map((part, i) => (
                      <span key={i} className={part.cls}>{part.text}</span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Text Content */}
          <div className="about-content reveal" style={{ transitionDelay: '0.2s' }}>
            <h3>Building the Future, One Line at a Time</h3>
            <p>
              I'm a Computer Science undergraduate specializing in{' '}
              <span style={{ color: 'var(--cyan)' }}>AI/ML</span> at Galgotias University.
              I'm passionate about creating real-world solutions through technology —
              from AI-powered image retrieval systems to real-time chat applications.
            </p>
            <p>
              As a{' '}
              <span style={{ color: 'var(--purple-bright)' }}>Backend Developer Intern</span>{' '}
              at 3W Business Pvt. Limited, I worked with Socket.io for real-time messaging,
              optimized MongoDB performance, and implemented JWT-based authentication systems.
            </p>
            <p>
              As a{' '}
              <span style={{ color: 'var(--orange)' }}>Smart India Hackathon 2024 Finalist</span>,{' '}
              I designed secure encryption/decryption modules for legacy system data protection
              at IIT Gandhinagar under PSID 1727.
            </p>

            <div className="about-highlights">
              {['Python', 'React', 'Node.js', 'FastAPI', 'MongoDB', 'Socket.io', 'AI/ML', 'REST API'].map((tech) => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <a
                href="https://www.linkedin.com/in/yash-rawat0947/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                data-hover
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.8rem' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/YashRawat0947"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                data-hover
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.8rem' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
