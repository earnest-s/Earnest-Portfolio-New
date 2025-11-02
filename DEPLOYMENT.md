# Deployment Guide

## Netlify Deployment

### Method 1: GitHub Integration (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit: React + TypeScript portfolio"
git push origin main
```

2. Go to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Choose your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

### Method 2: Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build your project:
```bash
npm run build
```

3. Deploy to Netlify:
```bash
netlify deploy --prod
```

### Method 3: Drag and Drop

1. Build your project:
```bash
npm run build
```

2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `dist` folder to the upload area

## Vercel Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to configure your deployment

## GitHub Pages Deployment

1. Install gh-pages:
```bash
npm install -D gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/repository-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts`:
```ts
export default defineConfig({
  base: '/repository-name/',
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

## Environment Variables

If you need to add environment variables:

1. Create `.env` file in root:
```env
VITE_FORMSPREE_ID=your_formspree_id
VITE_SPLINE_SCENE_URL=your_spline_url
```

2. Access in code:
```ts
const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
```

3. Add environment variables in your hosting platform:
   - **Netlify**: Site settings → Build & deploy → Environment
   - **Vercel**: Project settings → Environment Variables

## Performance Optimization

Before deploying, consider:

1. **Image Optimization**: Compress images in `public/assets/`
2. **Bundle Analysis**: 
```bash
npm run build -- --analyze
```

3. **Lazy Loading**: Components are already optimized with proper React patterns

4. **CDN**: Your hosting platform will automatically serve assets via CDN

## Custom Domain

### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS according to Netlify's instructions

### Vercel
1. Go to Project settings → Domains
2. Add your domain
3. Update DNS records as instructed

## SSL Certificate

Both Netlify and Vercel provide free SSL certificates automatically.

## Post-Deployment Checklist

- [ ] Test all navigation links
- [ ] Verify contact form submission
- [ ] Check theme toggle functionality
- [ ] Test responsive design on mobile
- [ ] Verify all assets load correctly
- [ ] Test PDF downloads
- [ ] Check external links (GitHub, LinkedIn)
- [ ] Verify GSAP animations work smoothly
- [ ] Test on different browsers

## Troubleshooting

### Assets not loading
- Ensure all asset paths start with `/` (e.g., `/assets/image.jpg`)
- Check that files are in the `public` folder

### 404 on page refresh
- Make sure `_redirects` file is in the `public` folder
- For Vercel, create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Contact form not working
- Verify Formspree endpoint URL
- Check browser console for CORS errors
- Ensure network requests are allowed

### Animations not working
- Check if GSAP loaded correctly
- Verify ScrollTrigger is registered
- Check browser console for errors

## Monitoring

Consider adding:
- **Google Analytics**: For traffic monitoring
- **Sentry**: For error tracking
- **Lighthouse**: For performance audits

Run Lighthouse audit:
```bash
npm install -g lighthouse
lighthouse https://your-site.com --view
```

---

Happy deploying! 🚀
