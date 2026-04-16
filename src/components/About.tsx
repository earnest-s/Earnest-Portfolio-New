import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/about.css';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-intro-card, .about-pillars .pillar-card', {
        y: 24,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About</h2>
        </div>

        <div className="about-template-grid">
          <article className="about-intro-card">
            <p className="about-lead">
              I transform complex data into clear insights and build AI systems that solve practical
              business problems.
            </p>
            <p>
              With a strong foundation in Python, SQL, Power BI, and machine learning, I focus on
              solutions that are reliable, measurable, and easy to maintain.
            </p>
          </article>

          <div className="about-pillars">
            <article className="pillar-card">
              <h3><i className="fas fa-chart-line" /> Data Analysis</h3>
              <p>Structured analysis, visual reporting, and KPI-first thinking.</p>
            </article>
            <article className="pillar-card">
              <h3><i className="fas fa-robot" /> AI Workflows</h3>
              <p>Model-driven solutions and automation for real operations.</p>
            </article>
            <article className="pillar-card">
              <h3><i className="fas fa-microchip" /> IoT Integration</h3>
              <p>Sensor-based systems and monitoring dashboards.</p>
            </article>
            <article className="pillar-card">
              <h3><i className="fas fa-check-circle" /> Execution</h3>
              <p>Clean implementation from idea to delivery.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
