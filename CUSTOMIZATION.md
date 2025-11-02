# Customization Guide

This guide will help you customize the portfolio to match your personal brand and content.

## Table of Contents
- [Colors and Theme](#colors-and-theme)
- [Content Updates](#content-updates)
- [Adding New Sections](#adding-new-sections)
- [Animations](#animations)
- [Typography](#typography)

## Colors and Theme

### Changing Color Scheme

Edit `src/styles/index.css` and modify the CSS variables:

```css
:root {
  /* Change primary colors */
  --primary-color: #dc2626;  /* Your brand color */
  --primary-hover: #b91c1c;
  --accent-color: #ef4444;
  --accent-hover: #dc2626;
  
  /* Adjust text colors */
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --heading-color: #111827;
}

[data-theme="dark"] {
  /* Dark mode colors */
  --primary-color: #f87171;
  --accent-color: #fca5a5;
  /* ... etc */
}
```

### Popular Color Schemes

**Blue Tech:**
```css
--primary-color: #3b82f6;
--primary-hover: #2563eb;
--accent-color: #60a5fa;
```

**Green Nature:**
```css
--primary-color: #10b981;
--primary-hover: #059669;
--accent-color: #34d399;
```

**Purple Creative:**
```css
--primary-color: #8b5cf6;
--primary-hover: #7c3aed;
--accent-color: #a78bfa;
```

## Content Updates

### Personal Information

#### Update Hero Section

Edit `src/components/Hero.tsx`:

```tsx
<h2 className="hero-title">Hi, I'm [Your Name]</h2>

<p className="hero-description">
  [Your personal description]
</p>
```

#### Update Typing Phrases

Edit `src/data/portfolio.ts`:

```ts
export const typingPhrases = [
  'Your Title 1',
  'Your Title 2',
  'Your Title 3',
  'Your Title 4',
];
```

### Experience Section

Edit `src/data/portfolio.ts`:

```ts
export const experiences: Experience[] = [
  {
    id: 'unique-id',
    date: 'Month Year',
    title: 'Your Job Title',
    company: 'Company Name',
    type: 'internship' | 'simulation' | 'job',
    grade: 'Optional Grade',
    description: 'Description...',
    achievements: [
      'Achievement 1',
      'Achievement 2',
    ],
    certificate: {
      title: 'Certificate Title',
      description: 'Description',
      provider: 'Provider Name',
      pdfPath: '/assets/certificate.pdf',
      credentialId: 'Optional ID',
    },
    relatedWork: {
      title: 'Project Title',
      description: 'Description',
      link: 'https://github.com/...',
    },
  },
];
```

### Projects Section

Edit `src/data/portfolio.ts`:

```ts
export const projects: Project[] = [
  {
    id: 'project-id',
    title: 'Project Title',
    description: 'Project description...',
    icon: 'fa-chart-line',  // Font Awesome icon class
    githubLink: 'https://github.com/...',
    liveLink: 'https://example.com',  // Optional
    tags: ['Tag1', 'Tag2', 'Tag3'],  // Optional
  },
];
```

### Skills Section

Edit `src/data/portfolio.ts`:

```ts
export const skills: Skill[] = [
  {
    id: 'skill-id',
    category: 'data' | 'dev' | 'devops' | 'tools',
    title: 'Skill Category',
    icon: 'fa-icon-name',
    items: ['Skill 1', 'Skill 2', 'Skill 3'],
  },
];
```

### Contact Information

Edit `src/components/Contact.tsx`:

```tsx
// Update social links
<a href="https://linkedin.com/in/your-profile">
  LinkedIn
</a>

<a href="https://github.com/your-username">
  GitHub
</a>

<a href="mailto:your-email@example.com">
  your-email@example.com
</a>

// Update Formspree endpoint
<form action="https://formspree.io/f/YOUR-FORM-ID">
```

### Navigation Links

Edit `src/data/portfolio.ts`:

```ts
export const navLinks: NavLink[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  // Add or remove sections as needed
  { id: 'blog', label: 'Blog', href: '#blog' },
];
```

## Adding New Sections

### Step 1: Create Component

Create `src/components/Blog.tsx`:

```tsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="blog" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">
              <i className="fas fa-blog" />
              Blog
            </h2>
          </div>
          {/* Your blog content */}
        </div>
      </div>
    </section>
  );
};
```

### Step 2: Add to App

Edit `src/App.tsx`:

```tsx
import { Blog } from './components/Blog';

function App() {
  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Blog />  {/* Add new section */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

### Step 3: Export Component

Add to `src/components/index.ts`:

```ts
export { Blog } from './Blog';
```

### Step 4: Add Navigation

Already done if you added it to `navLinks` in portfolio.ts!

## Animations

### Adjust Animation Speed

Edit component animation settings:

```tsx
gsap.from(element, {
  opacity: 0,
  y: 50,
  duration: 1,  // Change this (in seconds)
  delay: 0.2,   // Add delay
  ease: 'power3.out',  // Change easing
});
```

### Popular GSAP Easings
- `power1.out` - Gentle
- `power2.out` - Medium
- `power3.out` - Strong
- `elastic.out` - Bouncy
- `back.out` - Slight overshoot

### Disable Animations

To disable all animations, comment out the useEffect hooks or set duration to 0:

```tsx
gsap.from(element, {
  opacity: 0,
  y: 50,
  duration: 0,  // No animation
});
```

### Custom ScrollTrigger

```tsx
ScrollTrigger.create({
  trigger: element,
  start: 'top 80%',     // When element is 80% from top
  end: 'bottom 20%',    // When element is 20% from bottom
  scrub: true,          // Smooth scrubbing
  markers: true,        // Debug markers (remove in production)
  onEnter: () => console.log('Entered'),
  onLeave: () => console.log('Left'),
});
```

## Typography

### Change Fonts

Edit `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;600;700&display=swap" rel="stylesheet" />
```

Update `src/styles/index.css`:

```css
body {
  font-family: 'YourFont', -apple-system, BlinkMacSystemFont, sans-serif;
}

.logo,
.section-title,
.hero-title {
  font-family: 'YourHeadingFont', sans-serif;
}
```

### Recommended Font Pairings

**Modern Professional:**
- Headings: Poppins
- Body: Inter

**Classic Elegant:**
- Headings: Playfair Display
- Body: Source Sans Pro

**Tech/Futuristic:**
- Headings: Orbitron
- Body: Roboto

### Adjust Font Sizes

Edit `src/styles/index.css`:

```css
.hero-title {
  font-size: 3.5rem;  /* Adjust size */
}

.section-title {
  font-size: 2.5rem;
}

body {
  font-size: 1rem;
  line-height: 1.6;  /* Adjust line height */
}
```

## Assets

### Replace Profile Photo

1. Add your photo to `public/assets/`
2. Update `src/components/Hero.tsx`:

```tsx
<img 
  src="/assets/your-photo.jpg" 
  alt="Your Name" 
  className="profile-photo"
/>
```

### Update Favicon

Replace files in `public/assets/`:
- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`

Use [RealFaviconGenerator](https://realfavicongenerator.net/) to create all sizes.

### Update Resume

Replace `public/assets/Earnest_Resume.pdf` with your resume.

### Add Certificates

1. Add PDF to `public/assets/`
2. Update certificate path in `src/data/portfolio.ts`

## Responsive Design

### Adjust Breakpoints

Edit `src/styles/index.css`:

```css
/* Mobile */
@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  /* Tablet styles */
}

/* Desktop */
@media (min-width: 1025px) {
  /* Desktop styles */
}
```

## Advanced Customization

### Custom Hooks

Create `src/hooks/useCustomHook.ts`:

```tsx
import { useState, useEffect } from 'react';

export const useCustomHook = () => {
  const [state, setState] = useState();
  
  useEffect(() => {
    // Your logic
  }, []);
  
  return { state };
};
```

### Global State Management

For complex state, consider adding Context API:

```tsx
// src/context/AppContext.tsx
import { createContext, useContext, useState } from 'react';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [state, setState] = useState();
  
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
```

## Testing Your Changes

1. Save your files
2. Check browser at `http://localhost:3000`
3. Check browser console for errors
4. Test on mobile view
5. Test theme toggle
6. Test all links and forms

## Need More Help?

- Check the [README.md](./README.md) for project structure
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment
- Review [SPLINE_INTEGRATION.md](./SPLINE_INTEGRATION.md) for 3D scenes
- Check component files for inline comments

---

Happy customizing! 🎨
