import { useEffect, useRef } from 'react';
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
      gsap.from('.experience-card', {
        y: 36,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openCertificatePDF = (pdfPath: string) => {
    window.open(pdfPath, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="experience" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
        </div>

        <div className="experience-list">
          {experiences.map((exp) => (
            <article key={exp.id} className="experience-card">
              <div className="experience-meta">
                <span className="experience-date">{exp.date}</span>
                <span className={`experience-type ${exp.type}`}>{exp.type}</span>
              </div>

              <h3>{exp.title}</h3>
              <p className="experience-company">
                <i className="fas fa-building" /> {exp.company}
              </p>

              <ul>
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>

              {exp.certificate && (
                <button className="experience-cert-btn" onClick={() => openCertificatePDF(exp.certificate!.pdfPath)}>
                  <i className="fas fa-award" /> View Credential
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
