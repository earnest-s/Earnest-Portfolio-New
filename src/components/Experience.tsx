import { useRef, useEffect } from 'react';
import { experiences } from '../data/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.experience-item');
      
      items.forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          x: index % 2 === 0 ? -30 : 30,
          duration: 0.4,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
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
    <section id="experience" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">
              <i className="fas fa-briefcase" />
              Experience
            </h2>
          </div>

          <div className="experience-timeline">
            {experiences.map((exp) => (
              <div key={exp.id} className="experience-item">
                <div className="experience-date">
                  <span className="date-badge">{exp.date}</span>
                </div>
                <div className="experience-content">
                  <div className="experience-header">
                    <h3 className="experience-title">{exp.title}</h3>
                    <h4 className="experience-company">
                      <i className="fas fa-building" />
                      {exp.company}
                    </h4>
                  </div>
                  <div className="experience-details">
                    {exp.grade && (
                      <div className="experience-grade">
                        <i className="fas fa-star" />
                        <span className="grade-text">{exp.grade}</span>
                      </div>
                    )}
                    {!exp.grade && (
                      <div className="experience-grade">
                        <i className="fas fa-certificate" />
                        <span className="grade-text">Virtual Experience Program</span>
                      </div>
                    )}
                    <div className="experience-description">
                      <p>{exp.description}</p>
                      <div className="experience-achievements">
                        <h5>
                          <i className="fas fa-trophy" /> Key Achievements:
                        </h5>
                        <ul>
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      </div>

                      {exp.certificate && (
                        <div className="experience-projects">
                          <h5>
                            <i className="fas fa-certificate" /> Certificate:
                          </h5>
                          <div className="certificate-display">
                            <div
                              className="certificate-pdf-preview"
                              onClick={() => openCertificatePDF(exp.certificate!.pdfPath)}
                              role="button"
                              tabIndex={0}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') openCertificatePDF(exp.certificate!.pdfPath);
                              }}
                            >
                              <i className="fas fa-award certificate-pdf-icon" />
                              <span className="certificate-preview-text">View Certificate</span>
                            </div>
                            <div className="certificate-info">
                              <span className="certificate-title">{exp.certificate.title}</span>
                              <span className="certificate-desc">{exp.certificate.description}</span>
                              <span className="certificate-provider">{exp.certificate.provider}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {exp.relatedWork && (
                        <div className="experience-projects" style={{ marginTop: '1.5rem' }}>
                          <h5>
                            <i className="fas fa-code-branch" /> Related Work:
                          </h5>
                          <div className="project-link-card">
                            <a
                              href={exp.relatedWork.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link"
                            >
                              <div className="project-link-content">
                                <div className="project-link-icon">
                                  <i className="fab fa-github" />
                                </div>
                                <div className="project-link-info">
                                  <span className="project-link-title">{exp.relatedWork.title}</span>
                                  <span className="project-link-desc">{exp.relatedWork.description}</span>
                                </div>
                                <div className="project-link-arrow">
                                  <i className="fas fa-external-link-alt" />
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
