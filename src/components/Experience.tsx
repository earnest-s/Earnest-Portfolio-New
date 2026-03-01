import { useRef, useEffect } from 'react';
import { experiences } from '../data/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/experience.css';

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate section header
      gsap.from('.section-header', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      const items = gsap.utils.toArray<HTMLElement>('.experience-item-new');

      items.forEach((item, index) => {
        const isLeft = index % 2 === 0;

        gsap.from(item, {
          opacity: 0,
          x: isLeft ? -50 : 50,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openCertificatePDF = (pdfPath: string) => {
    window.open(pdfPath, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="experience" className="section" ref={sectionRef} style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <div className="section-content">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title">
              Experience
            </h2>
          </div>

          <div className="experience-timeline-new">
            {experiences.map((exp, index) => (
              <div key={exp.id} className={`experience-item-new item-${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className={`exp-card ${exp.type}`}>
                  <span className="exp-date">{exp.date}</span>
                  <h3 className="exp-title">{exp.title}</h3>
                  <h4 className="exp-company">
                    <i className="fas fa-building" />
                    {exp.company}
                  </h4>

                  <ul className="exp-achievements">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>

                  {exp.certificate && (
                    <button
                      className="exp-cert-btn"
                      onClick={() => openCertificatePDF(exp.certificate!.pdfPath)}
                    >
                      <i className="fas fa-award" /> View Credential
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
