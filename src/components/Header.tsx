import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { navLinks } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';
import '../styles/header.css';

export const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 140;

      // Keep the last section active when user reaches page end.
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

    gsap.from('.brand, .nav-desktop .nav-link, .theme-toggle', {
      y: -16,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power2.out',
      delay: 0.1,
    });

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
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
