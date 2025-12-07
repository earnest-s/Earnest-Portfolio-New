import { useRef, useEffect } from 'react';
import { projects } from '../data/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Kill any existing ScrollTriggers for this section
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === sectionRef.current || trigger.vars.trigger === '.projects-grid') {
        trigger.kill();
      }
    });

    const ctx = gsap.context(() => {
      // Optimized stagger animation for cards
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');
      
      // Set initial state
      gsap.set(cards, { opacity: 1, scale: 1, y: 0 });
      
      if (cards.length > 0) {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.4,
          stagger: {
            amount: 0.3,
            from: 'start',
            ease: 'power2.out'
          },
          ease: 'back.out(1.2)',
          force3D: true,
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">
              <i className="fas fa-code-branch" />
              Projects
            </h2>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-icon">
                  <i className={`fas ${project.icon}`} />
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.tags && (
                  <div className="project-tags">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="project-tag">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="project-links">
                  <a
                    href={project.githubLink}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github" /> View Code
                  </a>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-external-link-alt" /> Live Demo
                    </a>
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
