# Troubleshooting Guide

Common issues and their solutions for the portfolio project.

## Development Issues

### Server won't start

**Error**: `npm run dev` fails or shows errors

**Solutions**:
1. Delete `node_modules` and reinstall:
```bash
Remove-Item -Recurse -Force node_modules
npm install
```

2. Clear npm cache:
```bash
npm cache clean --force
npm install
```

3. Check Node version (should be 16+):
```bash
node --version
```

### TypeScript errors

**Error**: Red squiggly lines or build failures

**Solutions**:
1. Run TypeScript check:
```bash
npm run lint
```

2. Restart VS Code TypeScript server:
   - Press `Ctrl+Shift+P`
   - Type "TypeScript: Restart TS Server"

3. Check `tsconfig.json` is correct

4. Ensure all types are imported:
```tsx
import type { YourType } from './types';
```

### Module not found errors

**Error**: `Cannot find module '@/components/...'`

**Solutions**:
1. Check import paths are correct
2. Use relative imports instead:
```tsx
import { Header } from '../components/Header';
```

3. Verify file extensions (.tsx, .ts)

## Build Issues

### Build fails

**Error**: `npm run build` fails

**Solutions**:
1. Check for TypeScript errors:
```bash
npm run lint
```

2. Clear dist folder:
```bash
Remove-Item -Recurse -Force dist
npm run build
```

3. Check for circular dependencies

4. Ensure all imports are valid

### Blank page after build

**Error**: Production build shows blank page

**Solutions**:
1. Check browser console for errors

2. Verify base path in `vite.config.ts`:
```ts
export default defineConfig({
  base: '/',  // or '/your-repo-name/' for GitHub Pages
})
```

3. Check that all assets are in `public` folder

4. Verify build output:
```bash
npm run preview
```

## Runtime Issues

### GSAP animations not working

**Error**: No animations or console errors about GSAP

**Solutions**:
1. Check GSAP is imported:
```tsx
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

2. Verify cleanup in useEffect:
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // animations
  });
  
  return () => ctx.revert();
}, []);
```

3. Check element refs are not null:
```tsx
if (!ref.current) return;
```

### Theme toggle not working

**Error**: Theme doesn't change or persists incorrectly

**Solutions**:
1. Check localStorage access in browser

2. Verify theme hook:
```tsx
const { theme, toggleTheme } = useTheme();
```

3. Check CSS variables in `index.css`

4. Clear browser cache

### Contact form not submitting

**Error**: Form submission fails

**Solutions**:
1. Check Formspree endpoint:
```tsx
<form action="https://formspree.io/f/YOUR-FORM-ID">
```

2. Verify form fields have `name` attributes

3. Check network tab for errors

4. Ensure CORS is not blocking request

5. Test with browser console:
```js
fetch('https://formspree.io/f/YOUR-FORM-ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com', message: 'test' })
})
```

### Spline 3D not loading

**Error**: Spline scene doesn't appear

**Solutions**:
1. Verify scene URL is correct

2. Check Spline import:
```tsx
import Spline from '@splinetool/react-spline';
```

3. Ensure scene is published (not draft)

4. Check browser console for WebGL errors

5. Test with simpler scene first

6. Add error handling:
```tsx
<Spline 
  scene="YOUR-URL"
  onLoad={() => console.log('Loaded')}
  onError={(error) => console.error('Error:', error)}
/>
```

## Styling Issues

### Styles not applying

**Error**: CSS changes don't show up

**Solutions**:
1. Check CSS import in `main.tsx`:
```tsx
import './styles/index.css';
```

2. Clear browser cache (Ctrl+Shift+R)

3. Check CSS selector specificity

4. Verify CSS variables are defined:
```css
:root {
  --primary-color: #dc2626;
}
```

### Responsive issues

**Error**: Layout broken on mobile/tablet

**Solutions**:
1. Check media queries:
```css
@media (max-width: 768px) {
  /* mobile styles */
}
```

2. Use browser dev tools device emulation

3. Test on actual devices

4. Check for fixed widths:
```css
/* Bad */
width: 800px;

/* Good */
width: 100%;
max-width: 800px;
```

### Dark mode colors wrong

**Error**: Colors don't change or look bad in dark mode

**Solutions**:
1. Check dark mode CSS variables:
```css
[data-theme="dark"] {
  --primary-color: #f87171;
}
```

2. Use CSS variables instead of hardcoded colors:
```css
/* Bad */
color: #000000;

/* Good */
color: var(--text-primary);
```

## Performance Issues

### Page loads slowly

**Solutions**:
1. Optimize images:
   - Use WebP format
   - Compress images (< 500KB each)
   - Use appropriate dimensions

2. Lazy load heavy components:
```tsx
const Spline = lazy(() => import('@splinetool/react-spline'));
```

3. Check bundle size:
```bash
npm run build
```

4. Use Lighthouse audit:
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit

### Animations are janky

**Solutions**:
1. Use CSS transforms instead of position:
```css
/* Bad */
left: 100px;

/* Good */
transform: translateX(100px);
```

2. Reduce animation complexity

3. Use `will-change` sparingly:
```css
.animated-element {
  will-change: transform;
}
```

4. Check for memory leaks:
   - Open DevTools Performance tab
   - Record and analyze

### Memory leaks

**Solutions**:
1. Clean up event listeners:
```tsx
useEffect(() => {
  const handler = () => {};
  window.addEventListener('scroll', handler);
  
  return () => {
    window.removeEventListener('scroll', handler);
  };
}, []);
```

2. Clean up GSAP animations:
```tsx
return () => {
  ctx.revert();
  ScrollTrigger.getAll().forEach(t => t.kill());
};
```

3. Cancel fetch requests:
```tsx
useEffect(() => {
  const abortController = new AbortController();
  
  fetch(url, { signal: abortController.signal });
  
  return () => abortController.abort();
}, []);
```

## Asset Issues

### Images not loading

**Error**: 404 errors for images

**Solutions**:
1. Check asset path:
```tsx
// Assets in public folder
<img src="/assets/image.jpg" />

// NOT
<img src="assets/image.jpg" />
```

2. Verify file exists in `public/assets/`

3. Check file name case (case-sensitive on Linux servers)

4. Check file permissions

### PDF downloads not working

**Error**: PDFs don't download or open

**Solutions**:
1. Check PDF path:
```tsx
<a href="/assets/resume.pdf" download>
```

2. Verify PDF exists in `public/assets/`

3. Test PDF opens directly in browser:
   - Navigate to `http://localhost:3000/assets/resume.pdf`

4. Check PDF file size (< 10MB recommended)

### Favicon not showing

**Error**: Favicon doesn't appear in browser tab

**Solutions**:
1. Check favicon paths in `index.html`

2. Clear browser cache

3. Verify favicon files in `public/assets/`

4. Try hard refresh (Ctrl+Shift+R)

5. Check favicon.ico is valid (16x16 or 32x32)

## Deployment Issues

### Site not deploying

**Error**: Deployment fails on Netlify/Vercel

**Solutions**:
1. Check build command: `npm run build`

2. Check publish directory: `dist`

3. Verify Node version in deployment settings

4. Check build logs for errors

5. Test build locally first:
```bash
npm run build
npm run preview
```

### 404 on page refresh

**Error**: Direct URLs return 404

**Solutions**:
1. Add `_redirects` file to `public/`:
```
/*    /index.html   200
```

2. For Vercel, create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Environment variables not working

**Error**: `import.meta.env.VITE_*` is undefined

**Solutions**:
1. Check variable prefix is `VITE_`:
```env
VITE_API_KEY=your_key
```

2. Add to deployment platform settings

3. Restart dev server after adding .env

4. Don't commit .env to git

## Browser-Specific Issues

### Safari issues

**Solutions**:
1. Add `-webkit-` prefixes:
```css
-webkit-backdrop-filter: blur(10px);
backdrop-filter: blur(10px);
```

2. Test scrolling behavior

3. Check for date parsing issues

### Firefox issues

**Solutions**:
1. Test GSAP animations

2. Check CSS Grid compatibility

3. Verify flexbox behavior

### Mobile Safari issues

**Solutions**:
1. Fix 100vh issue:
```css
height: 100vh;
height: -webkit-fill-available;
```

2. Test touch events

3. Check for scroll bounce issues

## Getting More Help

### Enable Debug Mode

Add to your component:
```tsx
useEffect(() => {
  console.log('Component mounted');
  console.log('Props:', props);
  console.log('State:', state);
}, [props, state]);
```

### Check Browser Console

Always check for:
- Red errors
- Yellow warnings
- Network errors (Network tab)
- Failed requests

### Use React DevTools

1. Install React DevTools extension
2. Inspect component props and state
3. Track re-renders
4. Check component hierarchy

### Test in Incognito Mode

Sometimes browser extensions cause issues:
1. Open incognito window
2. Test functionality
3. If it works, disable extensions one by one

### Still Stuck?

1. Check GitHub Issues
2. Review component code comments
3. Compare with working examples
4. Ask in React community forums
5. Create a minimal reproduction

## Prevention Tips

### Best Practices

1. **Commit often**: Small, frequent commits
2. **Test locally**: Always test before deploying
3. **Use TypeScript**: Catch errors early
4. **Clean code**: Remove console.logs and TODOs
5. **Document changes**: Update README when needed
6. **Backup**: Keep code on GitHub
7. **Monitor**: Check site regularly after deployment

### Debugging Checklist

When something breaks:
- [ ] Check browser console
- [ ] Check Network tab
- [ ] Test in incognito mode
- [ ] Try different browser
- [ ] Clear cache
- [ ] Restart dev server
- [ ] Check recent changes (git diff)
- [ ] Review error message carefully
- [ ] Search error online
- [ ] Check documentation

---

**Remember**: Most issues are simple fixes. Stay calm, read error messages carefully, and debug systematically!


## Favicon and PDF Display

### Favicon not showing on PDF

**Issue**: When clicking 'View Resume' to open PDF in new tab, the favicon doesn't show.

**Explanation**: This is normal browser behavior. PDFs opened in browser tabs are document viewers, not web pages, so they don't display website favicons.

**Solutions**:
1.  **Main portfolio site** - Favicon shows correctly
2.  **Downloaded PDFs** - Users save the file (no favicon needed)
3.  **PDF Branding** - Add a header with your logo/name to the PDF itself

**How to add branding to PDF**:
1. Open your resume in a PDF editor (Adobe Acrobat, etc.)
2. Add a small header with your logo/name
3. Add footer with website URL
4. This ensures branding even when PDF is viewed standalone

**Favicon Configuration**:
- Favicon is in \/public/favicon.ico\`n- Also available in \/public/assets/\ in multiple sizes
- Configured in \index.html\`n- Cached by browsers (hard refresh with Ctrl+Shift+R to see updates)

