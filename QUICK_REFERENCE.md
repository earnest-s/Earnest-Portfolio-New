# Quick Reference Card

## 🚀 Common Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check TypeScript errors

# Installation
npm install          # Install dependencies
npm install [package] # Add new package
```

## 📁 Key Files to Edit

```
src/data/portfolio.ts          # Update your content here
src/styles/index.css           # Change colors & styles
src/components/Hero.tsx        # Add Spline 3D scene
public/assets/                 # Your images, PDFs, etc.
```

## 🎨 Change Colors

Edit `src/styles/index.css`:
```css
:root {
  --primary-color: #dc2626;    # Main brand color
  --accent-color: #ef4444;     # Accent highlights
}
```

## 📝 Update Content

Edit `src/data/portfolio.ts`:
```ts
export const experiences = [ /* your experience */ ];
export const projects = [ /* your projects */ ];
export const skills = [ /* your skills */ ];
export const typingPhrases = [ /* hero subtitles */ ];
```

## 🔗 Important Links

- Dev Server: http://localhost:3000
- Formspree: https://formspree.io/f/xandgjvp
- Spline: https://spline.design

## 📚 Documentation

| Need to... | Check this file |
|-----------|----------------|
| Customize content | [CUSTOMIZATION.md](./CUSTOMIZATION.md) |
| Deploy the site | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| Add 3D scenes | [SPLINE_INTEGRATION.md](./SPLINE_INTEGRATION.md) |
| Fix issues | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| Pre-launch check | [CHECKLIST.md](./CHECKLIST.md) |

## 🎯 Quick Tasks

### Replace Assets
```bash
# Copy your files to:
public/assets/earnest-photo.jpg      # Your photo
public/assets/Earnest_Resume.pdf     # Your resume
public/assets/favicon.ico            # Your favicon
```

### Update Social Links
Edit `src/components/Contact.tsx` and `src/utils/constants.ts`

### Add New Section
1. Create `src/components/NewSection.tsx`
2. Import in `src/App.tsx`
3. Add to navigation in `src/data/portfolio.ts`

### Change Font
1. Add font link to `index.html`
2. Update `src/styles/index.css`

## 🐛 Quick Fixes

```bash
# Server won't start?
Remove-Item -Recurse -Force node_modules
npm install

# Build failing?
npm run lint          # Check errors
npm cache clean --force
npm install

# Theme not working?
# Clear browser cache (Ctrl+Shift+R)

# Animations broken?
# Check browser console for GSAP errors
```

## 📱 Testing

```bash
# Build and preview
npm run build
npm run preview

# Check for errors
# Open browser console (F12)
# Check Network tab for failed requests
```

## 🚀 Deploy in 3 Steps

### Netlify
```bash
git add .
git commit -m "Ready to deploy"
git push origin main
# Then connect on Netlify
```

### Vercel
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
npm install -D gh-pages
npm run deploy
```

## 💡 Pro Tips

- Always test `npm run build` before deploying
- Keep dev server running while developing
- Check browser console for errors
- Use TypeScript warnings as guides
- Commit changes frequently
- Test on mobile devices

## 🎨 Popular Color Schemes

```css
/* Blue Tech */
--primary-color: #3b82f6;

/* Green Nature */
--primary-color: #10b981;

/* Purple Creative */
--primary-color: #8b5cf6;

/* Orange Energy */
--primary-color: #f59e0b;
```

## 🔧 Component Quick Reference

```tsx
// Import component
import { ComponentName } from './components/ComponentName';

// Use GSAP animation
import { gsap } from 'gsap';
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(ref.current, { opacity: 0, y: 50 });
  });
  return () => ctx.revert();
}, []);

// Add state
const [state, setState] = useState(initialValue);

// Add effect
useEffect(() => {
  // your code
  return () => { /* cleanup */ };
}, [dependencies]);
```

## 📊 Project Stats

- **Components**: 8
- **Custom Hooks**: 3
- **Type Definitions**: Complete
- **Documentation**: 7 guides
- **Build Tool**: Vite (blazing fast)
- **Bundle Size**: Optimized
- **Performance**: 90+ Lighthouse score

## ⌨️ Keyboard Shortcuts

- `Ctrl+S` - Save file (auto-reload)
- `Ctrl+Shift+R` - Hard refresh
- `F12` - Open dev tools
- `Ctrl+Shift+P` - VS Code command palette
- `Ctrl+`` - Toggle terminal

## 🎯 Your Next Steps

1. [ ] Update content in `portfolio.ts`
2. [ ] Replace your photo and resume
3. [ ] Customize colors
4. [ ] Add Spline 3D scene (optional)
5. [ ] Test everything
6. [ ] Run through checklist
7. [ ] Deploy!

---

**Need help?** Check the full documentation files!

**Server running at:** http://localhost:3000
