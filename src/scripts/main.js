import { initApp, observeReveal } from "./app.js";
import * as controller from "./controller.js";
import * as model from "./model.js";
import * as view from "./view.js";
import { PAGES } from "./constants.js";

/**
 * Unified Entry Point
 * Detects current page and executes appropriate initialization logic.
 *
 * projects.html → fetches projects.json, renders bento grid
 * about.html    → fetches config.json, renders skills/education/certs/research
 * other pages   → uses controller.init() (index, research, contact)
 */

/** Activate all .reveal elements — in-viewport ones immediately, rest via observer */
const activateRevealElements = () => {
  const vh = window.innerHeight || document.documentElement.clientHeight;
  document.querySelectorAll(".reveal").forEach((el) => {
    const rect = el.getBoundingClientRect();
    // In viewport → make visible right now (no delay)
    if (rect.top < vh && rect.bottom > 0) {
      el.classList.add("active");
    }
    // Also register with observer for scroll-triggered reveals
    observeReveal(el);
  });
};

const PAGE_HANDLERS = {
  [PAGES.PROJECTS]: async () => {
    try {
      // 1. Bind grid element
      const grid = document.getElementById("projects-bento-grid");
      if (grid) view.elements.bentoGrid = grid;

      // 2. Fetch & render
      const projects = await model.fetchProjects();
      if (projects && projects.length > 0) {
        view.renderProjects(projects);
      }

      // 3. Activate all reveal animations (sections + cards)
      activateRevealElements();
    } catch (error) {
      console.error("Projects page failed:", error);
    }
  },

  [PAGES.ABOUT]: async () => {
    try {
      // 1. Bind certifications element (not found by class in refreshElements)
      const certGrid =
        document.getElementById("certifications-grid") ||
        document.getElementById("certifications-list");
      if (certGrid) view.elements.certificationsGrid = certGrid;

      // 2. Fetch config.json & render sections
      const config = await model.fetchConfig();
      if (config) {
        view.renderSkills(config.skills);
        view.renderEducation(config.education);
        view.renderCertifications(config.certifications);
      }

      // 3. Fetch papers.json & render research list
      const papers = await model.fetchResearchPapers();
      if (papers && papers.length > 0) {
        view.renderResearchList(papers.slice(0, 3));
      }

      // 4. Activate all reveal animations (sections + dynamic content)
      activateRevealElements();
    } catch (error) {
      console.error("About page failed:", error);
    }
  },
};

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Shared initialization (model, components, theme, effects)
  initApp();

  // 2. Detect current page — handle both "projects.html" and "projects" (clean URLs)
  let currentPage =
    globalThis.location.pathname.split("/").pop() || "index.html";
  if (!currentPage.includes(".")) currentPage += ".html";

  const handler = PAGE_HANDLERS[currentPage];

  if (handler) {
    await handler();
  } else {
    // Default: index.html, research.html, contact.html
    controller.init();
  }
});
