import { useEffect, useRef, useState } from 'react';
import { certificates } from '../data/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShatterButton } from './ShatterButton';
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
          <button className={`cert-pill ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}><i className="fas fa-layer-group" /> All</button>
          <button className={`cert-pill ${activeCategory === 'data-analytics' ? 'active' : ''}`} onClick={() => setActiveCategory('data-analytics')}><i className="fas fa-chart-line" /> Data</button>
          <button className={`cert-pill ${activeCategory === 'job-simulation' ? 'active' : ''}`} onClick={() => setActiveCategory('job-simulation')}><i className="fas fa-flask" /> Simulation</button>
          <button className={`cert-pill ${activeCategory === 'ai-ml' ? 'active' : ''}`} onClick={() => setActiveCategory('ai-ml')}><i className="fas fa-brain" /> AI/ML</button>
          <button className={`cert-pill ${activeCategory === 'development' ? 'active' : ''}`} onClick={() => setActiveCategory('development')}><i className="fas fa-code" /> Dev</button>
        </div>

        <div className="cert-template-grid">
          {filteredCertificates.map((cert) => (
            <article key={cert.id} className="certificate-template-card">
              <p className="cert-provider"><i className="fas fa-building-columns" /> {cert.provider}</p>
              <h3>{cert.title}</h3>
              <p className="cert-issued"><i className="fas fa-calendar-days" /> Issued {cert.issueDate}</p>

              {cert.credentialUrl ? (
                <ShatterButton
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-link-btn"
                  shatterColor="var(--primary)"
                >
                  <i className="fas fa-up-right-from-square" /> View Credential
                </ShatterButton>
              ) : (
                <p className="cert-id-text"><i className="fas fa-fingerprint" /> {cert.credentialId ? `ID: ${cert.credentialId}` : 'Credential available on request'}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
