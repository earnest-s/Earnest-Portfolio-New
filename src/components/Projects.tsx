import { useRef, useEffect } from 'react';
import { projects } from '../data/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/projects.css';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Kill any existing ScrollTriggers for this section
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === sectionRef.current || trigger.vars.trigger === containerRef.current) {
        trigger.kill();
      }
    });

    const ctx = gsap.context(() => {
      // Optimized stagger animation for cards
      const cards = gsap.utils.toArray<HTMLElement>('.project-cinematic-card');

      // Set initial state
      gsap.set(cards, { opacity: 1, scale: 1, y: 0 });

      if (cards.length > 0) {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="section" ref={sectionRef} style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        <div className="section-content">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title">
              Featured Projects
            </h2>
          </div>

          <div className="projects-hscroll-container" ref={containerRef}>
            {projects.map((project) => (
              <div key={project.id} className="project-cinematic-card">
                <i className={`fas ${project.icon} project-cinematic-icon`} />

                <div className="project-cinematic-content">
                  <h3 className="project-cinematic-title">{project.title}</h3>
                  <p className="project-cinematic-desc">{project.description}</p>

                  {project.tags && (
                    <div className="project-cinematic-tags">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="project-cinematic-tag">{tag}</span>
                      ))}
                    </div>
                  )}

                  <div className="project-cinematic-links">
                    <a
                      href={project.githubLink}
                      className="project-cinematic-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github" /> View Code
                    </a>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        className="project-cinematic-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fas fa-external-link-alt" /> Live Demo
                      </a>
                    )}
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
