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

const Contact = () => {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">06 / Contact</div>
          <h2 className="section-title">Let's Connect</h2>
          <div className="section-line" />
        </div>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info reveal">
            <h3>Open to Opportunities</h3>
            <p>
              I'm actively looking for internships, full-time roles, and interesting
              collaborative projects. Whether you have a question or just want to say hi,
              my inbox is always open!
            </p>

            <div className="contact-links">
              <a
                href="mailto:yashrawat2006@gmail.com"
                className="contact-link"
                data-hover
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                yashrawat2006@gmail.com
              </a>
              <a
                href="tel:8851998403"
                className="contact-link"
                data-hover
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 2H5a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                +91 8851998403
              </a>
              <a
                href="https://linkedin.com/in/yash-rawat"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
                data-hover
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                linkedin.com/in/yash-rawat
              </a>
              <a
                href="https://github.com/YashRawat0947"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
                data-hover
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                github.com/YashRawat0947
              </a>
            </div>
          </div>

          {/* Terminal-style widget */}
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <div
              style={{
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              {/* Terminal bar */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderBottom: '1px solid var(--border)',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'block' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                  contact.sh
                </span>
              </div>

              {/* Terminal content */}
              <div style={{ padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', lineHeight: 2 }}>
                <div><span style={{ color: 'var(--green)' }}>yash@portfolio</span><span style={{ color: 'var(--text-muted)' }}>:~$ </span><span style={{ color: 'var(--text-primary)' }}>whoami</span></div>
                <div style={{ color: 'var(--cyan)', paddingLeft: '1rem' }}>Yash Rawat — CS Student &amp; Developer</div>
                <div style={{ marginTop: '0.5rem' }}><span style={{ color: 'var(--green)' }}>yash@portfolio</span><span style={{ color: 'var(--text-muted)' }}>:~$ </span><span style={{ color: 'var(--text-primary)' }}>cat status.txt</span></div>
                <div style={{ color: 'var(--purple-bright)', paddingLeft: '1rem' }}>✓ Open to work — Actively seeking roles!</div>
                <div style={{ marginTop: '0.5rem' }}><span style={{ color: 'var(--green)' }}>yash@portfolio</span><span style={{ color: 'var(--text-muted)' }}>:~$ </span><span style={{ color: 'var(--text-primary)' }}>echo $LOCATION</span></div>
                <div style={{ color: '#f0f0f0', paddingLeft: '1rem' }}>India 🇮🇳</div>
                <div style={{ marginTop: '0.5rem' }}><span style={{ color: 'var(--green)' }}>yash@portfolio</span><span style={{ color: 'var(--text-muted)' }}>:~$ </span><span style={{ color: 'var(--text-primary)' }}>ping yash --message</span></div>
                <div style={{ color: 'var(--text-muted)', paddingLeft: '1rem' }}>&gt; Drop a message at yashrawat2006@gmail.com</div>
                <div style={{ color: 'var(--text-muted)', paddingLeft: '1rem' }}>
                  <span style={{ color: 'var(--cyan)', animation: 'blink 1s infinite' }}>█</span>
                </div>
              </div>
            </div>

            <a
              href="mailto:yashrawat2006@gmail.com"
              className="btn-primary"
              data-hover
              style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Send a Message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
