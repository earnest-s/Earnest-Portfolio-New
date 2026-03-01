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

    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === sectionRef.current) {
        trigger.kill();
      }
    });

    const ctx = gsap.context(() => {
      gsap.from('.contact-left', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      gsap.from('.contact-right', {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
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
    } catch (error) {
      alert('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section" ref={sectionRef} style={{ padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <div className="contact-split-layout">

          <div className="contact-left">
            <h2 className="contact-headline">
              Let's Work <span>Together</span>
            </h2>

            <div className="contact-social-stack">
              <a href="mailto:contact@earnest.qzz.io" className="contact-social-link">
                <span>Email Me</span>
                <i className="fas fa-arrow-right arrow-icon" />
              </a>
              <a href="https://www.linkedin.com/in/earnest-kirubakaran-oswarld-s/" target="_blank" rel="noopener noreferrer" className="contact-social-link">
                <span>LinkedIn</span>
                <i className="fas fa-arrow-right arrow-icon" />
              </a>
              <a href="https://github.com/earnest-s" target="_blank" rel="noopener noreferrer" className="contact-social-link">
                <span>GitHub</span>
                <i className="fas fa-arrow-right arrow-icon" />
              </a>
            </div>
          </div>

          <div className="contact-right">
            <form
              className="contact-form-minimal"
              onSubmit={handleSubmit}
            >
              <div className="contact-input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact-input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact-input-group">
                <textarea
                  name="message"
                  placeholder="Your Message..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="contact-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} <i className="fas fa-arrow-right" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
