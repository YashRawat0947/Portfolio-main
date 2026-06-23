import { useEffect, useRef, useState } from 'react';

const TITLES = [
  'AI/ML Developer',
  'Full Stack Engineer',
  'Backend Developer',
  'Problem Solver',
  'SIH 2024 Finalist',
];

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const heroRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    const current = TITLES[titleIndex];
    let timeout;

    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setTitleIndex((i) => (i + 1) % TITLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, titleIndex]);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        heroRef.current.style.opacity = `${1 - window.scrollY / 600}`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="hero" className="hero">
      <div ref={heroRef} className="hero-inner">
        {/* Label */}
        <div className="hero-label" style={{ animation: 'fadeInUp 0.6s ease forwards' }}>
          &gt;_ Hello, World! I'm
        </div>

        {/* Name */}
        <h1
          className="hero-name"
          style={{ animation: 'fadeInUp 0.7s 0.1s ease both' }}
        >
          Yash Rawat
        </h1>

        {/* Typewriter */}
        <div
          className="hero-title"
          style={{ animation: 'fadeInUp 0.7s 0.2s ease both' }}
        >
          <span style={{ color: 'var(--cyan-dim)' }}>{'// '}</span>
          {displayed}
          <span className="typed-cursor">|</span>
        </div>

        {/* Description */}
        <p
          className="hero-desc"
          style={{ animation: 'fadeInUp 0.7s 0.3s ease both' }}
        >
          Computer Science undergraduate specializing in{' '}
          <span style={{ color: 'var(--cyan)' }}>AI/ML</span> &amp;{' '}
          <span style={{ color: 'var(--purple-bright)' }}>Full-Stack</span> development.
          Building real-time services, AI-powered systems, and secure REST backends.
          Smart India Hackathon 2024 Finalist.
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-actions"
          style={{ animation: 'fadeInUp 0.7s 0.4s ease both' }}
        >
          <a href="#projects" className="btn-primary" data-hover>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            View Projects
          </a>
          <a href="#contact" className="btn-outline" data-hover>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .82h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            Contact Me
          </a>
          <a
            href="https://github.com/YashRawat0947"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            data-hover
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Stats */}
        {/* <div
          className="hero-stats"
          style={{ animation: 'fadeInUp 0.7s 0.5s ease both' }}
        >
          {[
            { num: '3+', label: 'PROJECTS BUILT' },
            { num: 'SIH', label: '2024 FINALIST' },
            { num: '4+', label: 'MONTHS INTERN' },
            { num: '10+', label: 'TECHNOLOGIES' },
          ].map((stat) => (
            <div key={stat.label} className="stat-item">
              <div className="stat-num">{stat.num}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll">
        <div className="scroll-line" />
        SCROLL
      </div>
    </section>
  );
};

export default Hero;
