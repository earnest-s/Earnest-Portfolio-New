import { useState, useRef, useEffect } from 'react';
import { certificates } from '../data/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/certificates.css';

gsap.registerPlugin(ScrollTrigger);

type CertificateCategory = 'all' | 'data-analytics' | 'job-simulation' | 'ai-ml' | 'networking' | 'development' | 'soft-skills' | 'iot';

export const Certificates = () => {
  const [activeCategory, setActiveCategory] = useState<CertificateCategory>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === gridRef.current || trigger.vars.trigger === sectionRef.current) {
        trigger.kill();
      }
    });

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.certificate-card');

      gsap.set(cards, { opacity: 1, scale: 1, y: 0 });

      if (cards.length > 0) {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const filteredCertificates = activeCategory === 'all'
    ? certificates
    : certificates.filter(cert => cert.category === activeCategory);

  return (
    <section id="certificates" className="section" ref={sectionRef} style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <div className="section-content">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title">
              Licenses & Certifications
            </h2>
          </div>

          <div className="certificates-tabs">
            <button
              className={`certificates-tab ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            <button
              className={`certificates-tab ${activeCategory === 'data-analytics' ? 'active' : ''}`}
              onClick={() => setActiveCategory('data-analytics')}
            >
              Data Analytics
            </button>
            <button
              className={`certificates-tab ${activeCategory === 'job-simulation' ? 'active' : ''}`}
              onClick={() => setActiveCategory('job-simulation')}
            >
              Job Simulations
            </button>
            <button
              className={`certificates-tab ${activeCategory === 'ai-ml' ? 'active' : ''}`}
              onClick={() => setActiveCategory('ai-ml')}
            >
              AI & ML
            </button>
            <button
              className={`certificates-tab ${activeCategory === 'networking' ? 'active' : ''}`}
              onClick={() => setActiveCategory('networking')}
            >
              Networking
            </button>
            <button
              className={`certificates-tab ${activeCategory === 'development' ? 'active' : ''}`}
              onClick={() => setActiveCategory('development')}
            >
              Development
            </button>
          </div>

          <div className="certificates-grid" ref={gridRef}>
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                className="certificate-card"
                data-category={cert.category}
              >
                <div className="cert-issuer-icon">
                  {cert.provider === 'NVIDIA' ? <i className="fas fa-microchip" /> :
                    cert.provider === 'Forage' ? <i className="fas fa-briefcase" /> :
                      cert.provider === 'LinkedIn' ? <i className="fab fa-linkedin" /> :
                        cert.provider === 'Cisco Networking Academy' ? <i className="fas fa-network-wired" /> :
                          cert.provider === 'Geekster' ? <i className="fab fa-github" /> :
                            cert.provider === 'Infosys Springboard' ? <i className="fas fa-graduation-cap" /> :
                              cert.provider === 'MongoDB' ? <i className="fas fa-leaf" /> :
                                cert.provider === 'TCS iON' ? <i className="fas fa-award" /> :
                                  cert.provider === 'IBM' ? <i className="fas fa-cloud" /> :
                                    <i className="fas fa-certificate" />}
                </div>

                <h3 className="cert-name">{cert.title}</h3>

                <div className="cert-meta">
                  <span><strong>{cert.provider}</strong></span>
                  <span>Issued {cert.issueDate}</span>
                </div>

                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    className="view-cred-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Credential
                  </a>
                ) : (
                  cert.credentialId && (
                    <div className="view-cred-btn" style={{ opacity: 0.7, cursor: 'default', textDecoration: 'none' }}>
                      ID: {cert.credentialId}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
