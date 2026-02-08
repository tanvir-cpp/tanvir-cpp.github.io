import { SOCIAL } from "../constants.js";

/**
 * Footer Component
 * Site footer with contact information and navigation links
 */

export const footerHTML = `
    <div class="footer-inner">
      <!-- Ghost Typography -->
      <div class="footer-ghost">
        <h2>tanvir</h2>
      </div>

      <div class="container footer-container">
        <div class="footer-grid">

          <!-- Brand & Mission -->
          <div class="footer-brand">
            <div class="footer-brand-top">
              <a href="index.html" class="footer-logo">tanvir<span class="footer-logo-dot">.</span></a>
              <p class="footer-tagline">
                CSE student at AIUB, interested in <span class="footer-tagline-highlight">web development</span>, databases & AI.
              </p>
            </div>

            <div class="footer-status">
               <div class="footer-location">
                 <span class="footer-status-dot"></span>
                 <span class="footer-status-text">Currently in Dhaka, BD</span>
               </div>
               <a href="mailto:${SOCIAL.EMAIL}" class="footer-email-link">
                 Get in Touch <span class="footer-email-arrow">→</span>
               </a>
            </div>
          </div>

          <!-- Quick Access Grid -->
          <div class="footer-links-grid">
            <div class="footer-links-col">
              <h4 class="footer-links-heading">Explore</h4>
              <ul class="footer-links-list">
                <li><a href="about.html">About</a></li>
                <li><a href="projects.html">Projects</a></li>
                <li><a href="research.html">Research</a></li>
              </ul>
            </div>

            <div class="footer-links-col">
              <h4 class="footer-links-heading">Connect</h4>
              <ul class="footer-links-list">
                <li><a href="contact.html">Contact</a></li>
                <li><a href="mailto:${SOCIAL.EMAIL}">Email</a></li>
              </ul>
            </div>

            <div class="footer-links-col">
              <h4 class="footer-links-heading">Social</h4>
              <ul class="footer-links-list footer-social-list">
                <li>
                  <a href="${SOCIAL.GITHUB}" target="_blank" rel="noopener noreferrer">
                    <svg class="footer-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a href="${SOCIAL.TWITTER}" target="_blank" rel="noopener noreferrer">
                    <svg class="footer-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                    <span>Twitter</span>
                  </a>
                </li>
                <li>
                  <a href="${SOCIAL.LINKEDIN}" target="_blank" rel="noopener noreferrer">
                    <svg class="footer-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    <span>LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <!-- Meta Strip -->
        <div class="footer-meta">
          <span class="footer-copyright">&copy; ${new Date().getFullYear()} Tanvir Rahman</span>
        </div>
      </div>
    </div>
  `;
