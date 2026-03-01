import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/about.css';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
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
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 80%',
        },
      });

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
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section" ref={sectionRef} style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <div className="section-content" ref={contentRef}>
          <div className="about-grid">

            {/* Left: Pull-quote bio */}
            <div className="about-left">
              <div className="about-quote">
                I transform complex datasets into actionable insights and build AI systems that solve real-world challenges confidently.
                <span className="about-quote-author">Earnest S.</span>
              </div>
              <p style={{ marginTop: '30px', color: '#a3a3a3', fontSize: '1.1rem', lineHeight: '1.8' }}>
                With strong foundations in Python, SQL, Power BI, and Machine Learning, I specialize in bridging the gap between raw data and strategic decision-making. My professional journey encompasses hands-on experience in IoT systems development, predictive modeling, and interactive business intelligence dashboards.
              </p>
            </div>

            {/* Right: Stats Grid */}
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
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
