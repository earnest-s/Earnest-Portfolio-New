import { useState, useRef, useEffect } from 'react';
import { ContactFormData } from '../types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/contact.css';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        alert('Thank you! I will get back to you soon.');
      } else {
        alert('Oops! Please try again.');
      }
    } catch {
      alert('Connection error. Please try again.');
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
            <a className="contact-link-email" href="mailto:contact@earnest.qzz.io"><i className="fas fa-envelope" /> Email</a>
            <a className="contact-link-linkedin" href="https://www.linkedin.com/in/earnest-kirubakaran-oswarld-s/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" /> LinkedIn</a>
            <a className="contact-link-github" href="https://github.com/earnest-s" target="_blank" rel="noopener noreferrer"><i className="fab fa-github" /> GitHub</a>
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

            <button type="submit" disabled={isSubmitting}>
              <i className="fas fa-paper-plane" /> {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
