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
  const [isMobile, setIsMobile] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    const handleScroll = () => {
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const offset = isMobile ? 120 : 150;
      const scrollPosition = window.scrollY + offset;

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 8) {
        setActiveSection(navLinks[navLinks.length - 1].id);
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

    handleResize();
    handleScroll();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;

    const headerOffset = isMobile ? 18 : 92;
    window.scrollTo({ top: section.offsetTop - headerOffset, behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <header className="header-wrap">
      <div className="header-shell">
        <nav className="header-nav" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`header-item ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="header-item-label">{link.label}</span>
                <span className="header-item-icon" aria-hidden="true">
                  <i className={`fas ${linkIconMap[link.id] ?? 'fa-circle'}`} />
                </span>

                <span className={`header-lamp ${isActive ? 'active' : ''}`} aria-hidden="true">
                  <span className="header-lamp-top" />
                </span>
              </a>
            );
          })}

          <button
            className="theme-toggle theme-toggle-mobile"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} />
          </button>
        </nav>

        <button className="theme-toggle theme-toggle-desktop" onClick={toggleTheme} aria-label="Toggle theme">
          <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} />
        </button>
      </div>
    </header>
  );
};
