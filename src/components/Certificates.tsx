import { useState, useRef, useEffect } from 'react';
import { certificates } from '../data/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type CertificateCategory = 'all' | 'data-analytics' | 'job-simulation' | 'ai-ml' | 'networking' | 'development' | 'soft-skills' | 'iot';

export const Certificates = () => {
  const [activeCategory, setActiveCategory] = useState<CertificateCategory>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.certificate-card');
      
      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.4,
          delay: index * 0.06,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const filteredCertificates = activeCategory === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.category === activeCategory);

  return (
    <section id="certificates" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">
              <i className="fas fa-certificate" />
              Licenses & Certifications
            </h2>
          </div>

          <div className="certificates-tabs">
            <button
              className={`certificates-tab ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              <i className="fas fa-th-large" /> All
            </button>
            <button
              className={`certificates-tab ${activeCategory === 'data-analytics' ? 'active' : ''}`}
              onClick={() => setActiveCategory('data-analytics')}
            >
              <i className="fas fa-chart-line" /> Data Analytics
            </button>
            <button
              className={`certificates-tab ${activeCategory === 'job-simulation' ? 'active' : ''}`}
              onClick={() => setActiveCategory('job-simulation')}
            >
              <i className="fas fa-briefcase" /> Job Simulations
            </button>
            <button
              className={`certificates-tab ${activeCategory === 'ai-ml' ? 'active' : ''}`}
              onClick={() => setActiveCategory('ai-ml')}
            >
              <i className="fas fa-brain" /> AI & ML
            </button>
            <button
              className={`certificates-tab ${activeCategory === 'networking' ? 'active' : ''}`}
              onClick={() => setActiveCategory('networking')}
            >
              <i className="fas fa-network-wired" /> Networking
            </button>
            <button
              className={`certificates-tab ${activeCategory === 'development' ? 'active' : ''}`}
              onClick={() => setActiveCategory('development')}
            >
              <i className="fas fa-code" /> Development
            </button>
          </div>

          <div className="certificates-grid" ref={gridRef}>
            {filteredCertificates.map((cert) => (
              <div 
                key={cert.id} 
                className="certificate-card"
                data-category={cert.category}
              >
                <div className="certificate-header">
                  <div className="certificate-provider-icon">
                    {cert.provider === 'NVIDIA' && <i className="fas fa-microchip" />}
                    {cert.provider === 'Forage' && <i className="fas fa-briefcase" />}
                    {cert.provider === 'LinkedIn' && <i className="fab fa-linkedin" />}
                    {cert.provider === 'Cisco Networking Academy' && <i className="fas fa-network-wired" />}
                    {cert.provider === 'Geekster' && <i className="fab fa-github" />}
                    {cert.provider === 'Infosys Springboard' && <i className="fas fa-graduation-cap" />}
                    {cert.provider === 'MongoDB' && <i className="fas fa-leaf" />}
                    {cert.provider === 'TCS iON' && <i className="fas fa-award" />}
                    {cert.provider === 'IBM' && <i className="fas fa-cloud" />}
                  </div>
                  <div className="certificate-meta">
                    <h3 className="certificate-title">{cert.title}</h3>
                    <p className="certificate-provider">{cert.provider}</p>
                    <p className="certificate-date">Issued {cert.issueDate}</p>
                  </div>
                </div>

                {cert.credentialId && (
                  <p className="certificate-credential">
                    <i className="fas fa-fingerprint" /> Credential ID: {cert.credentialId}
                  </p>
                )}

                {cert.skills && cert.skills.length > 0 && (
                  <div className="certificate-skills">
                    <strong>Skills:</strong> {cert.skills.join(' · ')}
                  </div>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    className="certificate-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-external-link-alt" /> Show credential
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
