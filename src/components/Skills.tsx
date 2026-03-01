import { useState, useRef, useEffect } from 'react';
import { skills } from '../data/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/skills.css';

gsap.registerPlugin(ScrollTrigger);

type SkillCategory = 'all' | 'data' | 'dev' | 'devops' | 'tools';

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Extract all individual skill items for the marquee
  const allSkillItems = Array.from(new Set(skills.flatMap(s => s.items)));

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    // Kill any existing ScrollTriggers to prevent duplicates
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === gridRef.current) {
        trigger.kill();
      }
    });

    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray<HTMLElement>('.bento-card');

      gsap.set(boxes, { opacity: 1, scale: 1, y: 0 });

      if (boxes.length > 0) {
        gsap.from(boxes, {
          opacity: 0,
          y: 40,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="section" ref={sectionRef} style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 className="section-title">
          Technical Skills
        </h2>
      </div>

      {/* Marquee Section */}
      <div className="skills-marquee-container">
        <div className="skills-marquee">
          {/* Double the list for seamless looping */}
          {[...allSkillItems, ...allSkillItems].map((item, idx) => (
            <div key={idx} className="marquee-pill">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="section-content">

          <div className="skills-tabs">
            <button
              className={`skills-tab ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            <button
              className={`skills-tab ${activeCategory === 'data' ? 'active' : ''}`}
              onClick={() => setActiveCategory('data')}
            >
              Data & Analytics
            </button>
            <button
              className={`skills-tab ${activeCategory === 'dev' ? 'active' : ''}`}
              onClick={() => setActiveCategory('dev')}
            >
              Development
            </button>
            <button
              className={`skills-tab ${activeCategory === 'devops' ? 'active' : ''}`}
              onClick={() => setActiveCategory('devops')}
            >
              DevOps
            </button>
            <button
              className={`skills-tab ${activeCategory === 'tools' ? 'active' : ''}`}
              onClick={() => setActiveCategory('tools')}
            >
              Tools
            </button>
          </div>

          <div className="skills-bento-grid" ref={gridRef}>
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="bento-card"
                data-category={skill.category}
              >
                <i className={`fas ${skill.icon} bento-icon`} />
                <h3 className="bento-title">{skill.title}</h3>
                <ul className="bento-list">
                  {skill.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
