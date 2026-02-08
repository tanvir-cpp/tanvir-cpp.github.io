import * as model from "./model.js";
import * as view from "./view.js";
import { observeReveal } from "./effects.js";

/**
 * Setup click delegation for bento cards.
 * Follows MVC: Controller handles events, delegates to View actions.
 */
// Click listeners removed as projects are now native links

export const init = async () => {
  await initHeroBadges();
  await initDynamicContent();
};

const initHeroBadges = async () => {
  try {
    const papers = await model.fetchResearchPapers();

    if (view.elements.latestResearchBadge && papers.length > 0) {
      view.renderLatestResearchBadge(papers[0]);
    }
  } catch (error) {
    console.warn("Failed to load hero badges:", error);
  }
};

const initDynamicContent = async () => {
  // 1. Projects (Always load if grid exists)
  if (view.elements.bentoGrid || view.elements.homeProjectsGrid) {
    try {
      let projects = await model.fetchProjects();

      view.renderProjects(projects);

      // Initialize Reveal for project cards
      document
        .querySelectorAll("#featured-projects-grid .reveal")
        .forEach((el) => observeReveal(el));
    } catch (error) {
      console.warn("Failed to load projects:", error);
    }
  }

  // 2. Skills (Homepage and About page)
  if (view.elements.skillsGrid || view.elements.homeSkillsGrid) {
    try {
      const config = await model.fetchConfig();
      if (config?.skills) {
        view.renderSkills(config.skills);

        document
          .querySelectorAll(".skills-category.reveal")
          .forEach((el) => observeReveal(el));
      }
    } catch (error) {
      console.warn("Failed to load skills:", error);
    }
  }

  // 3. Specialized Page Logic - Research/About (Redirected from main logic)
  if (view.elements.researchList || view.elements.recommendedList) {
    try {
      const papers = await model.fetchResearchPapers();
      const publications = papers.filter(
        (p) => !p.type || p.type === "publication",
      );
      const recommendations = papers.filter((p) => p.type === "recommendation");

      if (view.elements.researchList) view.renderResearchList(publications);
      if (view.elements.recommendedList)
        view.renderRecommendedList(recommendations);

      document.querySelectorAll(".reveal").forEach((el) => observeReveal(el));
    } catch (error) {
      console.warn("Failed to load research:", error);
    }
  }
};
