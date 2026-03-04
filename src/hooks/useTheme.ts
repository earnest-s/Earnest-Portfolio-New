import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
type ToggleOrigin = HTMLElement | { x: number; y: number } | undefined;

const THEME_STORAGE_KEY = 'portfolio_theme';
const LIGHT_BG = '#f7f8fa';
const DARK_BG = '#0f1115';
const THEME_FILL_ID = 'theme-switch-fill';

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

    const existing = document.getElementById(THEME_FILL_ID);
    if (existing) {
      existing.remove();
    }

    const overlay = document.createElement('div');
    overlay.id = THEME_FILL_ID;
    overlay.style.position = 'fixed';
    // Between animated background and UI content.
    overlay.style.zIndex = '10';
    overlay.style.pointerEvents = 'none';
    overlay.style.background = nextTheme === 'dark' ? DARK_BG : LIGHT_BG;
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
    overlay.style.opacity = '1';
    document.body.appendChild(overlay);

    // Let the overlay render first to avoid a visible pop.
    window.requestAnimationFrame(() => setTheme(nextTheme));

    const expand = overlay.animate(
      [
        { transform: 'scale(0)', opacity: 1 },
        { transform: 'scale(1)', opacity: 1 },
      ],
      {
        duration: 560,
        easing: 'cubic-bezier(0.22, 0.8, 0.22, 1)',
        fill: 'forwards',
      },
    );

    expand.onfinish = () => {
      const fade = overlay.animate(
        [
          { opacity: 1 },
          { opacity: 0 },
        ],
        {
          duration: 220,
          easing: 'ease-out',
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
