/**
 * Application constants
 */

// Animation durations (in seconds)
export const ANIMATION_DURATION = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 1.0,
  VERY_SLOW: 1.5,
} as const;

// Breakpoints (in pixels)
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const;

// Z-index layers
export const Z_INDEX = {
  BASE: 1,
  DROPDOWN: 100,
  STICKY: 500,
  FIXED: 600,
  MODAL_BACKDROP: 900,
  MODAL: 1000,
  POPOVER: 1100,
  TOOLTIP: 1200,
} as const;

// Timing functions
export const EASING = {
  LINEAR: 'linear',
  EASE: 'ease',
  EASE_IN: 'ease-in',
  EASE_OUT: 'ease-out',
  EASE_IN_OUT: 'ease-in-out',
  POWER1_OUT: 'power1.out',
  POWER2_OUT: 'power2.out',
  POWER3_OUT: 'power3.out',
  POWER4_OUT: 'power4.out',
  ELASTIC: 'elastic.out',
  BACK: 'back.out',
} as const;

// Contact information
export const CONTACT = {
  EMAIL: 'contact@earnest.qzz.io',
  LINKEDIN: 'https://www.linkedin.com/in/earnest-kirubakaran-oswarld-s/',
  GITHUB: 'https://github.com/earnest-s',
  FORMSPREE_ENDPOINT: 'https://formspree.io/f/xandgjvp',
} as const;

// Meta information
export const META = {
  TITLE: 'S. Earnest | Portfolio',
  DESCRIPTION: 'Portfolio of Earnest S - Data Analyst with expertise in IoT, AI, and data visualization.',
  KEYWORDS: 'Earnest, Data Analyst, AI, IoT, Python, Power BI, Portfolio, SQL, Projects',
  AUTHOR: 'Earnest S',
  SITE_URL: 'https://earnest.qzz.io',
  OG_IMAGE: '/assets/og-image.jpg',
} as const;

// Social media links
export const SOCIAL_LINKS = {
  LINKEDIN: 'https://www.linkedin.com/in/earnest-kirubakaran-oswarld-s/',
  GITHUB: 'https://github.com/earnest-s',
  TWITTER: '',  // Add if applicable
  INSTAGRAM: '',  // Add if applicable
} as const;

// External links
export const EXTERNAL_LINKS = {
  RESUME_DOWNLOAD: '/assets/Earnest_Resume.pdf',
  RESUME_VIEW: '/assets/Earnest_Resume.pdf',
} as const;

// Skill categories
export const SKILL_CATEGORIES = {
  ALL: 'all',
  DATA: 'data',
  DEV: 'dev',
  DEVOPS: 'devops',
  TOOLS: 'tools',
} as const;

// Experience types
export const EXPERIENCE_TYPES = {
  INTERNSHIP: 'internship',
  SIMULATION: 'simulation',
  JOB: 'job',
} as const;

// Theme
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'portfolio-theme',
  FORM_DATA: 'portfolio-form-data',
} as const;

// Form validation
export const VALIDATION = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 1000,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// Animation delays (in seconds)
export const ANIMATION_DELAY = {
  STAGGER: 0.1,
  BETWEEN_SECTIONS: 0.3,
  CARD_HOVER: 0.2,
} as const;

// Scroll trigger settings
export const SCROLL_TRIGGER = {
  START: 'top 80%',
  END: 'bottom 20%',
  START_IMMEDIATE: 'top bottom',
  END_IMMEDIATE: 'bottom top',
} as const;

// Feature flags
export const FEATURES = {
  ENABLE_ANALYTICS: false,
  ENABLE_SPLINE: false,  // Set to true when you add Spline scenes
  ENABLE_PARTICLES: false,
  ENABLE_SMOOTH_SCROLL: true,
  ENABLE_DARK_MODE: true,
} as const;
