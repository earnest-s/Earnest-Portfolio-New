import { useEffect, useRef, useState } from 'react';
import { certificates } from '../data/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/certificates.css';

gsap.registerPlugin(ScrollTrigger);

type CertificateCategory = 'all' | 'data-analytics' | 'job-simulation' | 'ai-ml' | 'networking' | 'development' | 'soft-skills' | 'iot';

export const Certificates = () => {
  const [activeCategory, setActiveCategory] = useState<CertificateCategory>('all');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.certificate-template-card', {
        y: 24,
        opacity: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const filteredCertificates = activeCategory === 'all'
    ? certificates
    : certificates.filter((cert) => cert.category === activeCategory);

  return (
    <section id="certificates" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Certificates</h2>
        </div>

        <div className="cert-filter-row">
          <button className={`cert-pill ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>All</button>
          <button className={`cert-pill ${activeCategory === 'data-analytics' ? 'active' : ''}`} onClick={() => setActiveCategory('data-analytics')}>Data</button>
          <button className={`cert-pill ${activeCategory === 'job-simulation' ? 'active' : ''}`} onClick={() => setActiveCategory('job-simulation')}>Simulation</button>
          <button className={`cert-pill ${activeCategory === 'ai-ml' ? 'active' : ''}`} onClick={() => setActiveCategory('ai-ml')}>AI/ML</button>
          <button className={`cert-pill ${activeCategory === 'development' ? 'active' : ''}`} onClick={() => setActiveCategory('development')}>Dev</button>
        </div>

        <div className="cert-template-grid">
          {filteredCertificates.map((cert) => (
            <article key={cert.id} className="certificate-template-card">
              <p className="cert-provider">{cert.provider}</p>
              <h3>{cert.title}</h3>
              <p className="cert-issued">Issued {cert.issueDate}</p>

              {cert.credentialUrl ? (
                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="cert-link-btn">
                  View Credential
                </a>
              ) : (
                <p className="cert-id-text">{cert.credentialId ? `ID: ${cert.credentialId}` : 'Credential available on request'}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
