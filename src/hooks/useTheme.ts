import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
type ToggleOrigin = HTMLElement | { x: number; y: number } | undefined;

const THEME_STORAGE_KEY = 'portfolio_theme';
const LIGHT_BG = '#f7f8fa';
const DARK_BG = '#0f1115';
const LIGHT_FILL = 'rgba(247, 248, 250, 0.64)';
const DARK_FILL = 'rgba(15, 17, 21, 0.64)';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = (origin?: ToggleOrigin) => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    // Between animated background and UI content.
    overlay.style.zIndex = '10';
    overlay.style.pointerEvents = 'none';
    overlay.style.background = nextTheme === 'dark' ? DARK_FILL : LIGHT_FILL;
    overlay.style.mixBlendMode = nextTheme === 'dark' ? 'multiply' : 'screen';
    overlay.style.borderRadius = '50%';
    overlay.style.willChange = 'transform, opacity';

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (origin instanceof HTMLElement) {
      const rect = origin.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else if (origin) {
      x = origin.x;
      y = origin.y;
    }

    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const diameter = Math.ceil(maxRadius * 2);
    overlay.style.width = `${diameter}px`;
    overlay.style.height = `${diameter}px`;
    overlay.style.left = `${x - maxRadius}px`;
    overlay.style.top = `${y - maxRadius}px`;
    overlay.style.transformOrigin = '50% 50%';
    overlay.style.transform = 'scale(0)';
    overlay.style.opacity = '0.82';
    document.body.appendChild(overlay);

    // Let the overlay render first to avoid a visible pop.
    window.requestAnimationFrame(() => setTheme(nextTheme));

    const expand = overlay.animate(
      [
        { transform: 'scale(0)', opacity: 0.42 },
        { transform: 'scale(0.55)', opacity: 0.82 },
        { transform: 'scale(1.03)', opacity: 0.82 },
      ],
      {
        duration: 880,
        easing: 'cubic-bezier(0.19, 0.8, 0.22, 1)',
        fill: 'forwards',
      },
    );

    expand.onfinish = () => {
      const fade = overlay.animate(
        [
          { opacity: 0.82 },
          { opacity: 0.52 },
          { opacity: 0 },
        ],
        {
          duration: 420,
          easing: 'cubic-bezier(0.18, 0.84, 0.22, 1)',
          fill: 'forwards',
        },
      );

      fade.onfinish = () => {
        overlay.remove();
      };
    };
  };

  return { theme, toggleTheme };
};
