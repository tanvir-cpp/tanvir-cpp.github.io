/**
 * Theme Management - Light Mode Only
 * Simplified theme system with light mode enforced
 */

export const initTheme = () => {
  // Force light mode
  document.documentElement.dataset.theme = "light";
  localStorage.setItem("theme", "light");
};
