import { useState, useRef, useEffect } from 'react';
import { ContactFormData } from '../types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShatterButton } from './ShatterButton';
import '../styles/contact.css';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-panel, .contact-form-panel', {
        y: 36,
        opacity: 0,
        duration: 0.65,
        stagger: 0.14,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xandgjvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'New Portfolio Contact',
        }),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' });
        setIsSent(true);
        window.setTimeout(() => setIsSent(false), 2000);
      }
    } catch {
      // Silently keep button state controlled in UI (no alert box).
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <div className="container contact-template-grid">
        <aside className="contact-panel">
          <p className="contact-kicker">LET'S BUILD SOMETHING REAL</p>
          <h2>Contact</h2>
          <p>
            Open to internships, freelance work, and full-time opportunities in AI, analytics, and
            IoT product development.
          </p>

          <div className="contact-links">
            <ShatterButton className="contact-link-email" href="mailto:contact@earnest.qzz.io" shatterColor="var(--primary)">
              <i className="fas fa-envelope" /> Email
            </ShatterButton>
            <ShatterButton
              className="contact-link-linkedin"
              href="https://www.linkedin.com/in/earnest-kirubakaran-oswarld-s/"
              target="_blank"
              rel="noopener noreferrer"
              shatterColor="var(--primary)"
            >
              <i className="fab fa-linkedin" /> LinkedIn
            </ShatterButton>
            <ShatterButton
              className="contact-link-github"
              href="https://github.com/earnest-s"
              target="_blank"
              rel="noopener noreferrer"
              shatterColor="var(--primary)"
            >
              <i className="fab fa-github" /> GitHub
            </ShatterButton>
          </div>
        </aside>

        <div className="contact-form-panel">
          <form className="contact-form-template" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            />

            <ShatterButton
              type="submit"
              disabled={isSubmitting || isSent}
              className="contact-submit-btn"
              shatterColor="var(--primary)"
            >
              <i className={`fas ${isSent ? 'fa-check' : 'fa-paper-plane'}`} />{' '}
              {isSubmitting ? 'Sending...' : isSent ? 'Sent' : 'Send Message'}
            </ShatterButton>
          </form>
        </div>
      </div>
    </section>
  );
};
