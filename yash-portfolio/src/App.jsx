import { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

const LoadingScreen = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const phases = [
    'Initializing systems...',
    'Loading particle engine...',
    'Compiling portfolio...',
    'Ready!',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onDone, 300);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onDone]);

  useEffect(() => {
    if (progress < 30) setPhase(0);
    else if (progress < 60) setPhase(1);
    else if (progress < 90) setPhase(2);
    else setPhase(3);
  }, [progress]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg-dark)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontSize: '3rem',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '2rem',
          fontFamily: 'var(--font-sans)',
          letterSpacing: '-0.03em',
        }}
      >
        YR
      </div>

      {/* Phase text */}
      <div
        style={{
          fontSize: '0.75rem',
          color: 'var(--cyan)',
          letterSpacing: '0.15em',
          marginBottom: '1.5rem',
          minHeight: '1.2em',
        }}
      >
        {phases[phase]}
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: '200px',
          height: '2px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '2px',
          overflow: 'hidden',
          marginBottom: '0.75rem',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--cyan), var(--purple-bright))',
            borderRadius: '2px',
            boxShadow: '0 0 10px rgba(0,245,255,0.5)',
            transition: 'width 0.05s linear',
          }}
        />
      </div>

      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
        {progress}%
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="footer-logo">&lt;YR/&gt;</div>
    <p className="footer-text">
      Designed &amp; Built with <span className="footer-heart">♥</span> by Yash Rawat
    </p>
    <p className="footer-text" style={{ marginTop: '0.5rem', fontSize: '0.7rem' }}>
      Galgotias University · Computer Science (AI/ML) · 2024–25
    </p>
  </footer>
);

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      <div className="app" style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        {/* Background layers */}
        <ParticleBackground />
        <div className="grid-overlay" />

        {/* Custom cursor */}
        <CustomCursor />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main>
          <Hero />

          <div className="section-divider" />
          <About />

          <div className="section-divider" />
          <Experience />

          <div className="section-divider" />
          <Achievements />

          <div className="section-divider" />
          <Projects />

          <div className="section-divider" />
          <Skills />

          <div className="section-divider" />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
