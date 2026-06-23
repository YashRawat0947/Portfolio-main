import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['hero', 'about', 'experience', 'achievements', 'projects', 'skills', 'contact'];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#achievements', label: 'Achievements' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">
        &lt;YR<span>/&gt;</span>
      </a>
      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              data-text={link.label}
              style={{ color: active === link.href.slice(1) ? 'var(--cyan)' : '' }}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="mailto:yashrawat2006@gmail.com"
            className="btn-primary"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem', color: '#000' }}
            data-hover
          >
            Hire Me
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
