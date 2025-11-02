# Earnest S - Portfolio

A modern, responsive portfolio website built with React, TypeScript, Vite, GSAP animations, and Spline 3D integration.

## 🚀 Features

- **Modern Stack**: Built with React 19, TypeScript, and Vite for fast development and optimal performance
- **Smooth Animations**: GSAP-powered scroll-triggered animations and hover effects
- **3D Integration**: Spline 3D scene integration ready (configurable in Hero component)
- **Responsive Design**: Fully responsive across all devices
- **Dark Mode**: System-aware theme toggle with smooth transitions
- **Interactive Sections**:
  - Hero section with typing animation and profile photo
  - About section with GSAP scroll animations
  - Experience timeline with certificates and achievements
  - Skills section with category filtering
  - Projects showcase with GitHub links
  - Contact form with Formspree integration

## 🛠️ Technologies

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Animations**: GSAP with ScrollTrigger
- **3D Graphics**: @splinetool/react-spline
- **Styling**: CSS with CSS Variables for theming
- **Form Handling**: Formspree
- **Icons**: Font Awesome 6
---

## 🎨 Customization

### Adding a Spline 3D Scene

1. Create your 3D scene at [Spline](https://spline.design/)
2. Export and get your scene URL
3. Update `src/components/Hero.tsx`:

```tsx
// Uncomment and replace with your Spline scene URL
<div className="spline-container">
  <Spline scene="https://prod.spline.design/YOUR-SCENE-URL/scene.splinecode" />
</div>
```

### Updating Content

- **Portfolio Data**: Edit `src/data/portfolio.ts`
- **Type Definitions**: Modify `src/types/index.ts`
- **Styles**: Update `src/styles/index.css`
- **Assets**: Place files in `public/assets/`

## 📁 Project Structure

```
src/
├── components/       # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── hooks/           # Custom React hooks
│   ├── useTheme.ts
│   ├── useTypingEffect.ts
│   └── useScrollTrigger.ts
├── data/            # Portfolio data
│   └── portfolio.ts
├── types/           # TypeScript type definitions
│   └── index.ts
├── styles/          # Global styles
│   └── index.css
├── App.tsx          # Main App component
└── main.tsx         # Entry point

public/
└── assets/          # Static assets (images, PDFs, etc.)
```

## 🎯 Performance Optimizations

- Lazy loading for images
- GSAP animations with proper cleanup
- Optimized bundle size with Vite
- Efficient re-renders with React hooks
- Responsive images and assets

## 👤 Author

**Earnest S**
- LinkedIn: [Earnest Kirubakaran Oswarld S](https://www.linkedin.com/in/earnest-kirubakaran-oswarld-s/)
- GitHub: [@earnest-s](https://github.com/earnest-s)
- Email: contact@earnest.qzz.io

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- GSAP for animation library
- Spline for 3D design tools
- Formspree for form handling

---