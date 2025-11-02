import { useState, useRef, useEffect } from 'react';
import { ContactFormData } from '../types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
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
    setSubmitStatus('idle');

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
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        // Show success popup
        alert('Thank you for your message! I will get back to you soon.');
      } else {
        setSubmitStatus('error');
        alert('Oops! There was a problem sending your message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      alert('Oops! There was a problem sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHireMe = () => {
    window.location.href = 'mailto:contact@earnest.qzz.io?subject=Hire%20Request&body=Hi%20Earnest,%0D%0A%0D%0AI%20would%20like%20to%20discuss%20a%20project%20opportunity.%0D%0A%0D%0ARegards';
  };

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">
              <i className="fas fa-envelope" />
              Get in Touch
            </h2>
          </div>
          <p className="section-subtitle">Fill out the form below and I'll get back to you!</p>

          <form 
            ref={formRef}
            className="contact-form" 
            onSubmit={handleSubmit}
            aria-label="Contact Form"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-label="Name"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-label="Email"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              aria-label="Message"
            />

            <div className="contact-buttons">
              <button 
                type="submit" 
                className="btn outline"
                disabled={isSubmitting}
              >
                <i className="fas fa-paper-plane" /> 
                {isSubmitting ? 'Sending...' : 'Contact Me'}
              </button>
              <button 
                type="button" 
                className="btn primary hire-btn"
                onClick={handleHireMe}
              >
                <i className="fas fa-briefcase" /> Hire Me
              </button>
            </div>
          </form>

          <div className="contact-info">
            <div className="contact-links">
              <a
                href="https://www.linkedin.com/in/earnest-kirubakaran-oswarld-s/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link linkedin"
              >
                <i className="fab fa-linkedin" />
                <span>Connect on LinkedIn</span>
              </a>
              <a
                href="https://github.com/earnest-s"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link github"
              >
                <i className="fab fa-github" />
                <span>View My GitHub</span>
              </a>
              <a
                href="mailto:contact@earnest.qzz.io"
                className="contact-link email"
              >
                <i className="fas fa-envelope" />
                <span>contact@earnest.qzz.io</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
