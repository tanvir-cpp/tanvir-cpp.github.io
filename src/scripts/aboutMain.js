import { initApp, observeReveal } from "./app.js";
import * as model from "./model.js";
import * as view from "./view.js";

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Core Initialization (Shared)
  initApp();

  // 2. Data Loading & Rendering (Page Specific)
  try {
    const config = await model.fetchConfig();
    if (config) {
      // Render Skills, Education, and Certifications
      view.renderSkills(config.skills);
      view.renderEducation(config.education);

      // Explicitly ensure certifications grid is targeted
      const certGrid =
        document.getElementById("certifications-grid") ||
        document.getElementById("certifications-list");
      if (certGrid) view.elements.certificationsGrid = certGrid;
      view.renderCertifications(config.certifications);

      // IMPORTANT: Observe newly added dynamic elements for reveal animation
      document.querySelectorAll(".reveal").forEach((el) => observeReveal(el));
    }

    // Load a few recent projects/papers
    const papers = await model.fetchResearchPapers();
    if (papers && papers.length > 0) {
      view.renderResearchList(papers.slice(0, 3));
      // Observe papers
      document
        .querySelectorAll("#research-list .reveal")
        .forEach((el) => observeReveal(el));
    }
  } catch (error) {
    console.error("About page initialization failed:", error);
  }
});
