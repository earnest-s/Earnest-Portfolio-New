import { useRef, useEffect } from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { typingPhrases } from '../data/portfolio';
import { gsap } from 'gsap';
import Spline from '@splinetool/react-spline';

export const Hero = () => {
  const typingText = useTypingEffect(typingPhrases);
  const heroRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Animate hero content on load
      gsap.from(leftContentRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.from(rightContentRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.5,
        delay: 0.15,
        ease: 'power2.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="section active" ref={heroRef}>
      <div className="container">
        <div className="hero-grid">
          <div className="hero-left" ref={leftContentRef}>
            <div className="section-content">
              <h2 className="hero-title">Hi, I'm Earnest</h2>

              <p className="hero-subtitle" aria-live="polite">
                {typingText}
                <span className="typing-cursor">|</span>
              </p>

              <p className="hero-description">
                A data-driven thinker who transforms real-time data into smart decisions. 
                I build AI-powered tools, IoT systems, and interactive dashboards to help 
                people and businesses solve real-world problems.
              </p>

              <div className="hero-buttons">
                <a 
                  href="/assets/Earnest_Resume.pdf" 
                  download 
                  className="btn primary"
                >
                  <i className="fas fa-download" /> Download Resume
                </a>
                <a 
                  href="/assets/Earnest_Resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn outline"
                >
                  <i className="fas fa-eye" /> View Resume
                </a>
              </div>
            </div>
          </div>

          <div className="hero-right" ref={rightContentRef}>
            <div className="profile-photo-container">
              <div className="profile-photo-frame">
                <img 
                  src="/assets/earnest-photo.jpg" 
                  alt="Earnest S" 
                  className="profile-photo"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
            <div className="hero-image-placeholder">
              {/* Fallback SVG animation */}
              <svg 
                className="hero-svg" 
                viewBox="0 0 500 400" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern 
                    id="grid" 
                    width="40" 
                    height="40" 
                    patternUnits="userSpaceOnUse"
                  >
                    <path 
                      d="M 40 0 L 0 0 0 40" 
                      fill="none" 
                      stroke="rgba(128,128,128,0.1)" 
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                <g className="chart-container" transform="translate(50, 50)">
                  <line x1="0" y1="0" x2="0" y2="300" stroke="currentColor" strokeWidth="2"/>
                  <line x1="0" y1="300" x2="400" y2="300" stroke="currentColor" strokeWidth="2"/>

                  <g className="data-visualization">
                    <path 
                      className="chart-line" 
                      d="M0,250 L100,200 L200,150 L300,100 L400,50"
                      fill="none"
                      stroke="var(--primary-color)"
                      strokeWidth="3"
                    />

                    <circle cx="0" cy="250" r="6" className="data-point" fill="var(--primary-color)"/>
                    <circle cx="100" cy="200" r="6" className="data-point" fill="var(--primary-color)"/>
                    <circle cx="200" cy="150" r="6" className="data-point" fill="var(--primary-color)"/>
                    <circle cx="300" cy="100" r="6" className="data-point" fill="var(--primary-color)"/>
                    <circle cx="400" cy="50" r="6" className="data-point" fill="var(--primary-color)"/>
                  </g>

                  <g className="floating-elements">
                    <rect 
                      x="50" 
                      y="50" 
                      width="40" 
                      height="40" 
                      rx="8" 
                      className="float-item" 
                      fill="var(--primary-color)" 
                      opacity="0.2"
                    />
                    <circle 
                      cx="350" 
                      cy="150" 
                      r="25" 
                      className="float-item" 
                      fill="var(--primary-color)" 
                      opacity="0.2"
                    />
                    <path 
                      d="M250,200 L270,180 L290,200 L270,220 Z" 
                      className="float-item" 
                      fill="var(--primary-color)" 
                      opacity="0.2"
                    />
                  </g>
                </g>
              </svg>
              
              {/* Optional: Spline 3D Scene - Uncomment when you have a Spline scene URL */}
              {/* <div className="spline-container">
                <Spline scene="https://prod.spline.design/YOUR-SCENE-URL/scene.splinecode" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
