import { useEffect, useState } from 'react';
import { navLinks } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';
import '../styles/header.css';

const linkIconMap: Record<string, string> = {
  home: 'fa-house',
  about: 'fa-user',
  experience: 'fa-briefcase',
  skills: 'fa-code',
  certificates: 'fa-certificate',
  projects: 'fa-diagram-project',
  contact: 'fa-envelope',
};

export const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 140;

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 8) {
        const lastLink = navLinks[navLinks.length - 1];
        setActiveSection(lastLink.id);
        return;
      }

      for (const section of sections) {
        if (!section) continue;

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMobileMenuOpen(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', mobileMenuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;

    window.scrollTo({
      top: section.offsetTop - 88,
      behavior: 'smooth',
    });

    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-shell">
        <a href="#home" className="brand" onClick={(e) => scrollToSection(e, 'home')}>
          EARNEST S
        </a>

        <nav className="nav-desktop" aria-label="Desktop navigation">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, link.id)}
            >
              <i className={`fas ${linkIconMap[link.id] ?? 'fa-circle'} nav-link-icon`} aria-hidden="true" />
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} />
          </button>

          <button
            className="nav-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation"
            aria-expanded={mobileMenuOpen}
          >
            <i className="fas fa-bars" />
          </button>
        </div>
      </div>

      <div
        className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <button
          className="mobile-nav-close"
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen(false);
          }}
          aria-label="Close navigation"
        >
          <i className="fas fa-times" />
        </button>

        <button
          className="theme-toggle mobile-theme-toggle"
          onClick={(e) => {
            e.stopPropagation();
            toggleTheme();
          }}
          aria-label="Toggle theme"
        >
          <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} />
        </button>

        <nav className="mobile-nav-links" aria-label="Mobile navigation" onClick={(e) => e.stopPropagation()}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, link.id)}
            >
              <i className={`fas ${linkIconMap[link.id] ?? 'fa-circle'} nav-link-icon`} aria-hidden="true" />
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
