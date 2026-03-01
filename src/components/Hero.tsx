import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../styles/hero.css';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(leftContentRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(rightContentRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });

      gsap.from('.hero-buttons .btn-neon', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.4,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="section active" ref={heroRef} style={{ padding: '150px 0 100px 0', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="hero-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center', '@media (max-width: 900px)': { gridTemplateColumns: '1fr' } } as any}>

          {/* Left Side */}
          <div className="hero-left" ref={leftContentRef}>
            <div className="section-content">
              <h1 className="hero-title-massive">
                <span>EARNEST</span>
                <span>S</span>
              </h1>

              <div className="hero-subtitle-new">
                AI Engineer & Data Analyst
                <span className="blinking-cursor"></span>
              </div>

              <p className="hero-description" style={{ color: '#a3a3a3', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '40px', maxWidth: '500px' }}>
                A data-driven thinker who transforms real-time data into smart decisions.
                I build AI-powered tools, IoT systems, and interactive dashboards to help
                businesses solve real-world problems confidently.
              </p>

              <div className="hero-buttons" style={{ display: 'flex', gap: '20px' }}>
                <a
                  href="/assets/Earnest_Resume.pdf"
                  download
                  className="btn-neon"
                >
                  Download Resume
                </a>
                <a
                  href="/assets/Earnest_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon"
                >
                  View Resume
                </a>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="hero-right" ref={rightContentRef}>
            <div className="hero-visual-right">
              {/* Floating tags */}
              <div className="floating-tag tag-1">Python</div>
              <div className="floating-tag tag-2">IoT</div>
              <div className="floating-tag tag-3">Power BI</div>

              <div className="hero-photo-frame">
                <img
                  src="/assets/earnest-photo.jpg"
                  alt="Earnest S - AI Engineer"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

