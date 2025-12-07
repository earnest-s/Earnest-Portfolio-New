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
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Kill any existing ScrollTriggers for this section
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === sectionRef.current || 
          trigger.vars.trigger === formRef.current || 
          trigger.vars.trigger === '.contact-links') {
        trigger.kill();
      }
    });

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(formRef.current, { opacity: 1, y: 0 });
      gsap.set('.contact-form input, .contact-form textarea', { opacity: 1, x: 0 });
      gsap.set('.contact-link', { opacity: 1, y: 0, scale: 1 });
      
      // Animate form with stagger for inputs
      gsap.from(formRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });
      
      // Stagger animate form fields
      gsap.from('.contact-form input, .contact-form textarea', {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 75%',
          once: true,
        },
      });
      
      // Animate contact links
      gsap.from('.contact-link', {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.4)',
        force3D: true,
        scrollTrigger: {
          trigger: '.contact-links',
          start: 'top 85%',
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
        
        // Show success message with better UX
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! I\'ll get back to you soon.';
        formRef.current?.appendChild(successMsg);
        
        setTimeout(() => {
          successMsg.remove();
        }, 5000);
      } else {
        // Show error message
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! Please try again.';
        formRef.current?.appendChild(errorMsg);
        
        setTimeout(() => {
          errorMsg.remove();
        }, 5000);
      }
    } catch (error) {
      // Show error message
      const errorMsg = document.createElement('div');
      errorMsg.className = 'error-message';
      errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Connection error. Please try again.';
      formRef.current?.appendChild(errorMsg);
      
      setTimeout(() => {
        errorMsg.remove();
      }, 5000);
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
