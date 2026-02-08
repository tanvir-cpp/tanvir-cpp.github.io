/**
 * Application Constants
 * Centralized configuration values and magic strings
 */

// Page identifiers
export const PAGES = {
  HOME: "index.html",
  ABOUT: "about.html",
  PROJECTS: "projects.html",
  RESEARCH: "research.html",
  CONTACT: "contact.html",
};

// API Endpoints (Data files)
export const DATA_PATHS = {
  PROJECTS: "src/data/projects.json",
  PAPERS: "src/data/papers.json",
  CONFIG: "src/data/config.json",
};

// Animation/Performance constants
export const ANIMATION = {
  REVEAL_THRESHOLD: 0.1,
  REVEAL_DELAY_INCREMENT: 100, // ms between each reveal
  SPLASH_MIN_DURATION: 500, // ms
  TRANSITION_DURATION: 400, // ms for theme transitions
};

// Theme constants
export const THEME = {
  LIGHT: "light",
  STORAGE_KEY: "theme",
};

// Social links
export const SOCIAL = {
  GITHUB: "https://github.com/taanvirrahman",
  TWITTER: "https://x.com/tanvir_tweet",
  LINKEDIN: "https://www.linkedin.com/in/muhammud-tanvir-rahman/",
  EMAIL: "mailtanvirrahman@gmail.com",
};

// SEO/Meta
export const META = {
  SITE_NAME: "Tanvir Rahman",
  SITE_TAGLINE: "CSE Student at AIUB",
  LOCATION: "Dhaka, Bangladesh",
  COORDINATES: "23.8103N // 90.4125E",
};
