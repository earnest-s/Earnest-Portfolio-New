import { useRef, useEffect, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import '../styles/hero.css';
import ErrorBoundary from './ErrorBoundary';

// Safe lazy-load: falls back to CSS grid if Spline is unavailable
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Spline = lazy(() =>
  (import('@splinetool/react-spline') as Promise<any>).catch(() => ({
    default: () => null,
  }))
);

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero-title-massive span', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
      })
        .from(
          '.hero-subtitle-new',
          { y: 30, opacity: 0, duration: 0.7 },
          '-=0.5'
        )
        .from(
          '.hero-description',
          { y: 20, opacity: 0, duration: 0.6 },
          '-=0.4'
        )
        .from(
          '.hero-buttons .btn-neon',
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.12 },
          '-=0.3'
        )
        .from(
          '.scroll-indicator',
          { y: 10, opacity: 0, duration: 0.5 },
          '-=0.2'
        )
        .from(
          rightContentRef.current,
          { x: 50, opacity: 0, duration: 0.8 },
          '-=1.2'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      className="section active"
      ref={heroRef}
      style={{
        padding: '150px 0 100px 0',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Spline 3D Background — lazy-loaded */}
      <Suspense fallback={<div className="hero-bg-grid" />}>
        <ErrorBoundary fallback={<div className="hero-bg-grid" />}>
          <div className="hero-spline-bg">
            <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
          </div>
        </ErrorBoundary>
      </Suspense>

      {/* Fallback grid (visible while Spline loads) */}
      <div className="hero-bg-grid" />

      <div className="container hero-content-wrap">
        <div className="hero-grid">

          {/* Left Side */}
          <div className="hero-left" ref={leftContentRef}>
            <div className="section-content">
              <h1 className="hero-title-massive">
                <span>EARNEST</span>
                <span>S</span>
              </h1>

              <div className="hero-subtitle-new">
                AI Engineer &amp; Data Analyst
                <span className="blinking-cursor" />
              </div>

              <p className="hero-description">
                A data-driven thinker who transforms real-time data into smart decisions.
                I build AI-powered tools, IoT systems, and interactive dashboards to help
                businesses solve real-world problems confidently.
              </p>

              <div className="hero-buttons">
                <a
                  href="/assets/Earnest_Resume.pdf"
                  download
                  className="btn-neon"
                >
                  <i className="fas fa-download" />
                  Download Resume
                </a>
                <a
                  href="/assets/Earnest_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon btn-neon-outline"
                >
                  <i className="fas fa-eye" />
                  View Resume
                </a>
              </div>

              {/* Scroll indicator */}
              <div className="scroll-indicator">
                <span>Scroll</span>
                <div className="scroll-dots">
                  <div className="scroll-dot" />
                  <div className="scroll-dot" />
                  <div className="scroll-dot" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="hero-right" ref={rightContentRef}>
            <div className="hero-visual-right">
              {/* Floating tags — evenly distributed around photo */}
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
