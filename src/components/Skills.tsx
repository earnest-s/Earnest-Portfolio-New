import { useState, useRef, useEffect } from 'react';
import { skills } from '../data/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type SkillCategory = 'all' | 'data' | 'dev' | 'devops' | 'tools';

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray<HTMLElement>('.skill-box');
      
      boxes.forEach((box, index) => {
        gsap.from(box, {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          delay: index * 0.05,
          scrollTrigger: {
            trigger: box,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">
              <i className="fas fa-tools" />
              Technical Skills
            </h2>
          </div>

          <div className="skills-tabs">
            <button
              className={`skills-tab ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              <i className="fas fa-th-large" /> All
            </button>
            <button
              className={`skills-tab ${activeCategory === 'data' ? 'active' : ''}`}
              onClick={() => setActiveCategory('data')}
            >
              <i className="fas fa-chart-bar" /> Data & Analytics
            </button>
            <button
              className={`skills-tab ${activeCategory === 'dev' ? 'active' : ''}`}
              onClick={() => setActiveCategory('dev')}
            >
              <i className="fas fa-code" /> Development
            </button>
            <button
              className={`skills-tab ${activeCategory === 'devops' ? 'active' : ''}`}
              onClick={() => setActiveCategory('devops')}
            >
              <i className="fas fa-server" /> DevOps
            </button>
            <button
              className={`skills-tab ${activeCategory === 'tools' ? 'active' : ''}`}
              onClick={() => setActiveCategory('tools')}
            >
              <i className="fas fa-toolbox" /> Tools
            </button>
          </div>

          <div className="skills-section skills-grid" ref={gridRef}>
            {filteredSkills.map((skill) => (
              <div 
                key={skill.id} 
                className="skill-box" 
                data-category={skill.category}
              >
                <i className={`fas ${skill.icon} skill-icon`} />
                <div>
                  <strong>{skill.title}</strong>
                  <ul>
                    {skill.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
