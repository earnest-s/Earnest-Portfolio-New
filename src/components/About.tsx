import { useRef, useEffect, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/about.css';

gsap.registerPlugin(ScrollTrigger);

// Safe lazy-load: falls back to null if Spline is unavailable
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Spline = lazy(() =>
  (import('@splinetool/react-spline') as Promise<any>).catch(() => ({
    default: () => null,
  }))
);

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Clip-path reveal for section title
      gsap.from('.about-section-title', {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
      });

      gsap.from('.about-quote', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      gsap.from('.stat-card', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 82%',
        },
      });

      // Count-up animation using IntersectionObserver + GSAP
      const stats = gsap.utils.toArray<HTMLElement>('.stat-number');
      stats.forEach((stat) => {
        const target = parseFloat(stat.getAttribute('data-target') || '0');
        const suffix = stat.getAttribute('data-suffix') || '';
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
          },
          onUpdate: () => {
            stat.innerText = Math.floor(obj.val) + suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className="section"
      ref={sectionRef}
      style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="container">
        <div className="section-content" ref={contentRef}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title about-section-title">About Me</h2>
          </div>

          <div className="about-grid">

            {/* Left: Pull-quote bio */}
            <div className="about-left">
              <div className="about-quote">
                I transform complex datasets into actionable insights and build AI systems that solve real-world challenges confidently.
                <span className="about-quote-author">Earnest S.</span>
              </div>
              <p style={{ marginTop: '30px', color: '#a3a3a3', fontSize: '1.05rem', lineHeight: '1.8' }}>
                With strong foundations in Python, SQL, Power BI, and Machine Learning, I specialize in bridging the gap between raw data and strategic decision-making. My professional journey encompasses hands-on experience in IoT systems development, predictive modeling, and interactive business intelligence dashboards.
              </p>
            </div>

            {/* Right: Stats Grid + Spline Orb */}
            <div className="about-right">
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-number" data-target="12" data-suffix="+">0</span>
                  <span className="stat-label">Certifications</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number" data-target="3" data-suffix="">0</span>
                  <span className="stat-label">AI Projects</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number" data-target="2" data-suffix="+">0</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number" data-target="100" data-suffix="%">0</span>
                  <span className="stat-label">Data Driven</span>
                </div>
              </div>

              {/* Spline 3D Orb */}
              <div className="about-spline-orb">
                <Suspense fallback={<div className="spline-spinner" />}>
                  <Spline scene="https://prod.spline.design/uZcO9FPQbMDoJgHy/scene.splinecode" />
                </Suspense>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
