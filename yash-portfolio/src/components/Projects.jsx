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

const PROJECTS = [
  {
    id: 1,
    name: 'AI-Based Misplaced Item Detection',
    desc: 'An AI-powered system to match user-uploaded images of lost items using Hugging Face vision models. Implements embedding-based image similarity with secure REST APIs for upload, processing, and result retrieval.',
    tags: ['Python', 'FastAPI', 'Flask', 'Hugging Face API', 'OpenCV'],
    github: 'https://github.com/YashRawat0947',
    color: 'var(--cyan)',
    featured: true,
  },
  {
    id: 2,
    name: 'Real-Time Chat App',
    desc: 'Full-featured real-time chat application allowing users to create custom rooms, send instant messages, and track active participants per room with WebSocket bidirectional communication.',
    tags: ['Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT', 'React'],
    github: 'https://github.com/YashRawat0947',
    live: '#',
    color: 'var(--purple-bright)',
    featured: true,
  },
  {
    id: 3,
    name: 'QR Code Scanner — Secure Payload',
    desc: 'Encrypted QR scanning pipeline using Flask and OpenCV with a complete secure encode/decode flow, ensuring payload integrity and tamper-proof transmission.',
    tags: ['Flask', 'React', 'Cryptography', 'OpenCV', 'Python'],
    github: 'https://github.com/YashRawat0947',
    color: 'var(--green)',
  },
  {
    id: 4,
    name: 'Real-Time Sign Language Translation',
    desc: 'Built a real-time ASL translator recognizing 36 gestures (A–Z, 0–9) via webcam using MediaPipe to extract 63 hand keypoints. Trained a custom MLP on 36K images achieving 90–95% accuracy. Deployed via TensorFlow.js for <1ms client-side browser inference with frame-buffering for flicker-free sentence generation in a Glassmorphism UI.',
    tags: ['Python', 'TensorFlow/Keras', 'TensorFlow.js', 'MediaPipe', 'React'],
    github: 'https://github.com/YashRawat0947',
    live: '#',
    color: '#f59e0b',
    featured: true,
  },
  {
    id: 5,
    name: 'Car Parts Detection System',
    desc: 'AI-powered car component detection and localization system using YOLOv8. Detects and localizes individual car components including bumper, hood, door, and other parts from a single uploaded image. Built as the first stage of a two-stage CV pipeline for automated vehicle inspection and repair cost estimation.',
    tags: ['Python', 'YOLOv8', 'OpenCV', 'Computer Vision', 'Deep Learning'],
    github: 'https://github.com/YashRawat0947',
    color: '#ef4444',
  },
  {
    id: 6,
    name: 'Car Damage Severity Classifier',
    desc: 'Fine-tuned ResNet-50 model for classifying car part damage severity from images with annotation support. Integrated with a YOLOv8 detection pipeline to estimate repair costs automatically. Achieves reliable severity classification across multiple damage categories for insurance assessment workflows.',
    tags: ['Python', 'ResNet-50', 'PyTorch', 'Computer Vision', 'Classification'],
    github: 'https://github.com/YashRawat0947',
    color: '#eab308',
  },
];

const ExternalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const Projects = () => {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <section id="projects" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">04 / Projects</div>
          <h2 className="section-title">Things I've Built</h2>
          <div className="section-line" />
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              className="glass-card project-card reveal"
              style={{
                transitionDelay: `${i * 0.1}s`,
                borderColor: project.featured ? `color-mix(in srgb, ${project.color} 25%, transparent)` : '',
              }}
            >
              {/* Top */}
              <div className="project-top">
                <div className="project-links">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" data-hover title="Live Demo">
                      <ExternalIcon />
                    </a>
                  )}
                  <a href={project.github} target="_blank" rel="noopener noreferrer" data-hover title="View Code">
                    <GithubIcon />
                  </a>
                </div>
              </div>

              {/* Featured badge */}
              {project.featured && (
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: project.color,
                    letterSpacing: '0.12em',
                    marginBottom: '0.5rem',
                    opacity: 0.8,
                  }}
                >
                  ★ FEATURED PROJECT
                </div>
              )}

              <div className="project-name" style={{ color: project.color === 'var(--cyan)' ? 'var(--text-primary)' : 'var(--text-primary)' }}>
                {project.name}
              </div>
              <p className="project-desc">{project.desc}</p>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View more */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }} className="reveal">
          <a
            href="https://github.com/YashRawat0947"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            data-hover
          >
            <GithubIcon />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;