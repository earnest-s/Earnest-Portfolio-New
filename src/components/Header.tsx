import { useState, useEffect } from 'react';
import '../styles/header.css';
import { navLinks } from '../data/portfolio';
export const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      const headerHeight = 80;
      const targetPosition = section.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">ES</h1>

        <nav className="nav">
          {navLinks.map(link => (
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

        <button
          className="nav-toggle"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation"
        >
          <i className="fas fa-bars" />
        </button>

        <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <button
            className="mobile-nav-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation"
          >
            <i className="fas fa-times" />
          </button>

          {navLinks.map(link => (
            <a
              key={link.id}
              href={link.href}
              className="nav-link"
              onClick={(e) => scrollToSection(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};
