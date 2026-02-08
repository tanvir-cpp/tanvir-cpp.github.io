/**
 * UI Components Module
 * Centralized export for all UI components and utilities
 */

// Export templates
export * as templates from "./templates.js";

// Export header
export { headerHTML, initMobileMenu, setActiveNavLink } from "./header.js";

// Export footer
export { footerHTML } from "./footer.js";

// Export layout components
export {
  scrollProgressHTML,
  gridBackgroundHTML,
  initLayoutComponents,
} from "./layout.js";

// Initialize all components
import { headerHTML, setActiveNavLink, initMobileMenu } from "./header.js";
import { footerHTML } from "./footer.js";
import { initLayoutComponents } from "./layout.js";

export const initComponents = () => {
  // Initialize layout components first
  initLayoutComponents();

  const header = document.querySelector(".header");
  const footer = document.querySelector(".footer");

  if (header) {
    header.innerHTML = headerHTML;
    setActiveNavLink();
    initMobileMenu();
  }

  if (footer) {
    footer.innerHTML = footerHTML;
  }
};
