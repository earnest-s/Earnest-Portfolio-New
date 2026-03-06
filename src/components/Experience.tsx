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

  const getTypeIcon = (type: string) => {
    if (type === 'internship') return 'fa-user-graduate';
    if (type === 'simulation') return 'fa-flask';
    return 'fa-briefcase';
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
              <div className="experience-layout">
                <div className="experience-main">
                  <div className="experience-meta">
                    <span className="experience-date"><i className="fas fa-calendar-days" /> {exp.date}</span>
                    <span className={`experience-type ${exp.type}`}>
                      <i className={`fas ${getTypeIcon(exp.type)} experience-type-icon`} />
                      {exp.type}
                    </span>
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
                </div>

                {exp.certificate && (
                  <div className="experience-cert-frame">
                    <div className="experience-cert-frame-head">
                      <span><i className="fas fa-award" /> {exp.certificate.title}</span>
                      <span><i className="fas fa-building-columns" /> {exp.certificate.provider}</span>
                    </div>
                    <div className="experience-cert-canvas">
                      <img
                        src={exp.certificate.imagePath}
                        alt={`${exp.title} certificate preview`}
                        loading="lazy"
                        className="experience-cert-image"
                      />
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
