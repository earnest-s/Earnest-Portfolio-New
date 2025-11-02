import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-content" ref={contentRef}>
          <div className="section-header">
            <h2 className="section-title">
              <i className="fas fa-user" />
              About Me
            </h2>
          </div>
          <div className="about-content">
            <p>
              As a dedicated Data Analyst, I bring a unique combination of analytical 
              expertise and technical proficiency to every project. My professional 
              journey encompasses hands-on experience in IoT systems development, AI 
              implementation, and advanced data visualization.
            </p>
            <p>
              With strong foundations in Python, SQL, Power BI, and Tableau, I specialize 
              in transforming complex datasets into actionable insights. My experience 
              extends to developing IoT healthcare solutions, implementing machine learning 
              models, and creating interactive business intelligence dashboards that drive 
              data-informed decision-making.
            </p>
            <p>
              I am particularly passionate about leveraging emerging technologies to solve 
              real-world challenges. My work in patient health monitoring systems and 
              agricultural IoT solutions demonstrates my commitment to creating meaningful 
              impact through technology. I consistently strive to stay ahead of industry 
              trends and embrace new tools that enhance data analysis capabilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
