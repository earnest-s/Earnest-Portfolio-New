# Spline 3D Integration Guide

This guide will help you integrate Spline 3D scenes into your portfolio.

## Quick Start

The portfolio is already set up with `@splinetool/react-spline`. You just need to:

1. Create your 3D scene at [Spline](https://spline.design/)
2. Export and get your scene URL
3. Update the Hero component

## Step-by-Step Integration

### 1. Create Your Spline Scene

1. Go to [Spline.design](https://spline.design/)
2. Create a free account
3. Design your 3D scene
4. Export your scene:
   - Click "Export" button
   - Select "Code Export"
   - Choose "React/Next.js"
   - Copy the scene URL

### 2. Update Hero Component

Open `src/components/Hero.tsx` and locate the commented Spline section:

```tsx
{/* Optional: Spline 3D Scene - Uncomment when you have a Spline scene URL */}
{/* <div className="spline-container">
  <Spline scene="https://prod.spline.design/YOUR-SCENE-URL/scene.splinecode" />
</div> */}
```

Uncomment and replace with your URL:

```tsx
<div className="spline-container">
  <Spline 
    scene="https://prod.spline.design/YOUR-ACTUAL-SCENE-URL/scene.splinecode"
    onLoad={() => console.log('Spline scene loaded')}
  />
</div>
```

### 3. Hide the SVG Fallback (Optional)

If you want to use only Spline and hide the SVG:

```tsx
<div className="hero-image-placeholder">
  {/* Hide or remove the SVG */}
  {/* <svg className="hero-svg" ... /> */}
  
  {/* Show Spline */}
  <div className="spline-container">
    <Spline scene="YOUR-SCENE-URL" />
  </div>
</div>
```

## Advanced Configuration

### Add Loading State

```tsx
import { useState } from 'react';
import Spline from '@splinetool/react-spline';

export const Hero = () => {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  return (
    <div className="hero-image-placeholder">
      {!isSplineLoaded && (
        <div className="loading-placeholder">
          <p>Loading 3D scene...</p>
        </div>
      )}
      
      <div 
        className="spline-container"
        style={{ opacity: isSplineLoaded ? 1 : 0 }}
      >
        <Spline 
          scene="YOUR-SCENE-URL"
          onLoad={() => setIsSplineLoaded(true)}
        />
      </div>
    </div>
  );
};
```

### Interactive Spline Events

```tsx
import Spline from '@splinetool/react-spline';

export const Hero = () => {
  const onSplineMouseDown = (e: any) => {
    console.log('Mouse down on:', e);
  };

  const onSplineMouseHover = (e: any) => {
    console.log('Hovering:', e);
  };

  return (
    <Spline 
      scene="YOUR-SCENE-URL"
      onMouseDown={onSplineMouseDown}
      onMouseHover={onSplineMouseHover}
    />
  );
};
```

### Control Spline Scene

```tsx
import { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';

export const Hero = () => {
  const splineRef = useRef<Application>();

  const onLoad = (spline: Application) => {
    splineRef.current = spline;
    
    // Find object by name
    const obj = spline.findObjectByName('Cube');
    
    // Manipulate object
    if (obj) {
      obj.scale.x = 2;
    }
  };

  return (
    <Spline 
      scene="YOUR-SCENE-URL"
      onLoad={onLoad}
    />
  );
};
```

## Styling the Spline Container

The CSS is already set up in `src/styles/index.css`:

```css
.spline-container {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}
```

You can customize it further:

```css
.spline-container {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  
  /* Add custom styles */
  box-shadow: var(--glass-shadow);
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
}

/* Add hover effect */
.spline-container:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

/* Loading state */
.spline-container.loading {
  background: linear-gradient(
    90deg,
    rgba(220, 38, 38, 0.1),
    rgba(239, 68, 68, 0.1)
  );
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

## Performance Optimization

### 1. Lazy Load Spline

```tsx
import { lazy, Suspense } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export const Hero = () => {
  return (
    <Suspense fallback={<div>Loading 3D scene...</div>}>
      <Spline scene="YOUR-SCENE-URL" />
    </Suspense>
  );
};
```

### 2. Conditional Loading

Only load Spline on desktop:

```tsx
import { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

export const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <div className="hero-image-placeholder">
      {isMobile ? (
        <svg className="hero-svg" {...svgProps} />
      ) : (
        <Spline scene="YOUR-SCENE-URL" />
      )}
    </div>
  );
};
```

## Alternative: Multiple Spline Scenes

You can add Spline scenes to other sections:

### About Section with 3D

```tsx
// src/components/About.tsx
import Spline from '@splinetool/react-spline';

export const About = () => {
  return (
    <section id="about" className="section">
      <div className="about-with-3d">
        <div className="about-content">
          {/* Your about content */}
        </div>
        <div className="about-3d">
          <Spline scene="YOUR-ABOUT-SCENE-URL" />
        </div>
      </div>
    </section>
  );
};
```

### Projects with 3D Previews

```tsx
// src/components/Projects.tsx
import Spline from '@splinetool/react-spline';

export const Projects = () => {
  const projectScenes = {
    'iot-health': 'https://prod.spline.design/iot-scene.splinecode',
    'ai-chatbot': 'https://prod.spline.design/ai-scene.splinecode',
  };

  return (
    <div className="project-card">
      <div className="project-3d-preview">
        <Spline scene={projectScenes['iot-health']} />
      </div>
      {/* Rest of project card */}
    </div>
  );
};
```

## Recommended Spline Scenes for Portfolio

1. **Hero Section**: 
   - Rotating data visualization
   - Abstract geometric shapes
   - Tech-themed animation

2. **About Section**:
   - Subtle background animation
   - Professional 3D avatar or icon

3. **Skills Section**:
   - Floating tool icons
   - Interactive skill tree

4. **Projects Section**:
   - Mini 3D previews of each project
   - Interactive demos

## Troubleshooting

### Scene not loading
- Check if URL is correct
- Verify internet connection
- Check browser console for errors
- Ensure Spline scene is published (not in draft)

### Performance issues
- Reduce scene complexity in Spline editor
- Use lazy loading
- Consider mobile fallback
- Check memory usage in browser dev tools

### CORS errors
- Ensure scene is published publicly
- Check Spline export settings
- Verify URL format

## Resources

- [Spline Documentation](https://docs.spline.design/)
- [Spline React Integration](https://docs.spline.design/code-export-and-development/react)
- [Spline Community Examples](https://spline.design/community)
- [Performance Best Practices](https://docs.spline.design/code-export-and-development/performance)

---

Need help? Check the Spline Discord community or GitHub issues.
