import { useEffect, useRef } from 'react';
import { projects } from '../data/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShatterButton } from './ShatterButton';
import '../styles/projects.css';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.project-template-card', {
        y: 40,
        opacity: 0,
        scale: 0.96,
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

  return (
    <section id="projects" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="projects-template-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-template-card">
              {project.thumbnail && (
                <div className="project-thumb-wrap">
                  <img
                    src={project.thumbnail}
                    alt={`${project.title} preview`}
                    loading="lazy"
                    className="project-thumb"
                  />
                </div>
              )}
              <div className="project-head">
                <i className={`fas ${project.icon}`} />
                <h3>{project.title}</h3>
              </div>

              <p>{project.description}</p>

              {project.tags && (
                <div className="project-tag-list">
                  {project.tags.map((tag, idx) => (
                    <span key={idx}>{tag}</span>
                  ))}
                </div>
              )}

              <div className="project-action-row">
                <ShatterButton
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  shatterColor="var(--primary)"
                  className="project-action-btn"
                >
                  <i className="fab fa-github" /> Code
                </ShatterButton>
                {project.liveLink && (
                  <ShatterButton
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    shatterColor="var(--primary)"
                    className="project-action-btn"
                  >
                    <i className="fas fa-arrow-up-right-from-square" /> Live
                  </ShatterButton>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
