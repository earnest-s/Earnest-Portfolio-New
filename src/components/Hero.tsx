import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ShatterButton } from './ShatterButton';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { typingPhrases } from '../data/portfolio';
import '../styles/hero.css';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const typedText = useTypingEffect(typingPhrases, 90, 45, 1200);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.from('.hero-kicker', { y: 16, opacity: 0, duration: 0.45 })
        .from('.hero-heading span', { y: 35, opacity: 0, stagger: 0.1, duration: 0.65 }, '-=0.2')
        .from('.hero-copy', { y: 16, opacity: 0, duration: 0.45 }, '-=0.35')
        .from('.hero-actions a', { y: 10, opacity: 0, stagger: 0.08, duration: 0.35 }, '-=0.25')
        .from('.hero-side', { x: 26, opacity: 0, duration: 0.55 }, '-=0.35');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="section hero-section" ref={heroRef}>
      <div className="container hero-layout">
        <div className="hero-main">
          <p className="hero-name">I'm Earnest S</p>
          <p className="hero-kicker">
            <span className="hero-typing">{typedText}</span>
          </p>

          <h1 className="hero-heading">
            <span>Building useful</span>
            <span>AI and analytics</span>
            <span>products</span>
          </h1>

          <p className="hero-copy">
            I turn data into decisions through dashboards, machine learning models, and practical
            automation systems built for real-world outcomes.
          </p>

          <div className="hero-actions">
            <ShatterButton
              href="/assets/Earnest_Resume.pdf"
              download
              className="btn-primary"
              shatterColor="var(--primary)"
            >
              <i className="fas fa-download" /> Download Resume
            </ShatterButton>
          </div>
        </div>

        <aside className="hero-side">
          <div className="hero-photo-wrap">
            <img src="/assets/earnest-photo.jpg" alt="Earnest S" />
          </div>
        </aside>
      </div>
    </section>
  );
};
