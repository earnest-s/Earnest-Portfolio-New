import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/portfolio';
import { ShatterButton } from './ShatterButton';
import '../styles/skills.css';

gsap.registerPlugin(ScrollTrigger);

type SkillCategory = 'all' | 'data' | 'dev' | 'devops' | 'tools';

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.skill-card', {
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

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Skills</h2>
        </div>

        <div className="skills-filter-row">
          <ShatterButton className={`skills-pill ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')} shatterColor="var(--primary)"><i className="fas fa-layer-group" /> All</ShatterButton>
          <ShatterButton className={`skills-pill ${activeCategory === 'data' ? 'active' : ''}`} onClick={() => setActiveCategory('data')} shatterColor="var(--primary)"><i className="fas fa-chart-column" /> Data</ShatterButton>
          <ShatterButton className={`skills-pill ${activeCategory === 'dev' ? 'active' : ''}`} onClick={() => setActiveCategory('dev')} shatterColor="var(--primary)"><i className="fas fa-code" /> Development</ShatterButton>
          <ShatterButton className={`skills-pill ${activeCategory === 'devops' ? 'active' : ''}`} onClick={() => setActiveCategory('devops')} shatterColor="var(--primary)"><i className="fas fa-server" /> DevOps</ShatterButton>
          <ShatterButton className={`skills-pill ${activeCategory === 'tools' ? 'active' : ''}`} onClick={() => setActiveCategory('tools')} shatterColor="var(--primary)"><i className="fas fa-toolbox" /> Tools</ShatterButton>
        </div>

        <div className="skills-grid-template">
          {filteredSkills.map((skill) => (
            <article key={skill.id} className="skill-card">
              <div className="skill-title-row">
                <i className={`fas ${skill.icon}`} />
                <h3>{skill.title}</h3>
              </div>
              <div className="skill-chip-list">
                {skill.items.map((item, idx) => (
                  <span key={idx}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
