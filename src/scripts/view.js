import { templates } from "./ui/index.js";

export const elements = {};

// Configure marked with highlight.js
if (typeof marked !== "undefined" && typeof hljs !== "undefined") {
  marked.setOptions({
    highlight: function (code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
    breaks: true,
  });
}

export const refreshElements = () => {
  elements.resumeBtn = document.getElementById("resume-btn");

  // Hero Badges
  elements.latestResearchBadge = document.getElementById(
    "latest-research-badge",
  );

  // Core Grids
  elements.bentoGrid = document.querySelector(".bento-grid");
  elements.homeProjectsGrid = document.getElementById("featured-projects-grid");
  elements.skillsGrid = document.querySelector(".skills-grid");
  elements.homeSkillsGrid = document.getElementById("home-skills-grid");
  elements.certificationsGrid = document.querySelector(".certifications-grid");

  elements.researchList = document.getElementById("research-list");
  elements.recommendedList = document.getElementById("recommended-list");
  elements.educationList = document.getElementById("education-list");
};

// Initial run
refreshElements();

export const renderLatestResearchBadge = (paper) => {
  if (!elements.latestResearchBadge || !paper) return;

  const badgeText = elements.latestResearchBadge.querySelector(".badge-text");
  if (badgeText) badgeText.innerText = paper.title;

  elements.latestResearchBadge.href =
    paper.links?.PDF || paper.links?.Code || "research.html";
  elements.latestResearchBadge.classList.remove("hidden");
};

export const renderProjects = (projects) => {
  if (!projects) return;

  // Update project count badge
  const countEl = document.getElementById("project-count");
  if (countEl) countEl.textContent = `${projects.length} Projects`;

  // Homepage: render featured cards into the home projects grid
  if (
    elements.homeProjectsGrid &&
    !elements.homeProjectsGrid.closest(".projects-section")
  ) {
    const featured = projects.filter((p) => p.featured);
    if (featured.length > 0) {
      elements.homeProjectsGrid.innerHTML = featured
        .map((project, i) => templates.featuredCard(project, i))
        .join("");
    }
    return;
  }

  // Projects page: render featured cards in separate grid
  const featuredGrid = document.getElementById("projects-featured-grid");
  if (featuredGrid) {
    const featured = projects.filter((p) => p.featured);
    if (featured.length > 0) {
      featuredGrid.innerHTML = featured
        .map((project, i) => templates.featuredCard(project, i))
        .join("");
    } else {
      const featuredSection = featuredGrid.closest("section");
      if (featuredSection) featuredSection.style.display = "none";
    }
  }

  // Bento grid (projects page list view)
  if (!elements.bentoGrid) return;

  if (projects.length === 0) {
    elements.bentoGrid.innerHTML = `
      <div class="col-span-full py-12 text-center text-secondary/40 font-mono text-sm capitalize">
        Projects are being updated. Check back soon.
      </div>
    `;
    return;
  }

  elements.bentoGrid.innerHTML = projects
    .map((project) => templates.card(project, "project"))
    .join("");
};

export const renderSkills = (skills) => {
  const html = skills.map((group) => templates.skillGroup(group)).join("");

  if (elements.skillsGrid) {
    elements.skillsGrid.innerHTML = html;
  }

  if (elements.homeSkillsGrid) {
    elements.homeSkillsGrid.innerHTML = html;
  }
};

export const renderCertifications = (certifications) => {
  if (!elements.certificationsGrid || !certifications) return;

  // Ensure we keep the grid class and don't overwrite it with list
  if (!elements.certificationsGrid.classList.contains("certifications-list")) {
    elements.certificationsGrid.classList.add("certifications-list");
  }

  elements.certificationsGrid.innerHTML = certifications
    .map((cert, index) => templates.certification(cert, index))
    .join("");

  initCertListeners();
};

const initCertListeners = () => {
  document.querySelectorAll(".cert-item").forEach((card) => {
    // Prevent duplicate listeners if re-rendered
    if (card.dataset.listened) return;
    card.dataset.listened = "true";

    card.addEventListener("click", () => {
      const url = card.dataset.url;
      if (url) globalThis.open(url, "_blank");
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const url = card.dataset.url;
        if (url) globalThis.open(url, "_blank");
      }
    });
  });
};

export const renderResearchList = (papers) => {
  if (!elements.researchList || !papers) return;

  if (papers.length === 0) {
    elements.researchList.innerHTML =
      '<p class="loading-indicator">No research papers found.</p>';
    return;
  }

  elements.researchList.innerHTML = `
    <div class="research-items">
        ${papers
          .map(
            (paper, index) => `
            <a href="${Object.values(paper.links)[0] || "#"}" target="_blank" class="research-item reveal" style="transition-delay: ${index * 100}ms; text-decoration: none;">
                <div class="research-item-meta">
                    <span class="research-item-venue">${paper.venue}</span>
                    <span class="research-item-year">${paper.year}</span>
                </div>
                <div class="research-item-body">
                    <h3 class="research-item-title">${paper.title}</h3>
                    <p class="research-item-authors">${paper.authors}</p>
                    <p class="research-item-abstract">${paper.abstract}</p>
                    <div class="research-item-tags">
                        ${paper.tags.map((tag) => `<span class="research-tag">${tag}</span>`).join("")}
                    </div>
                </div>
                <div class="research-item-links">
                     ${Object.entries(paper.links)
                       .map(
                         ([label, url]) => `
                        <span class="research-link-label">${label}</span>
                     `,
                       )
                       .join("")}
                    <span class="research-link-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </span>
                </div>
            </a>
        `,
          )
          .join("")}
    </div>
  `;
};

export const renderRecommendedList = (items) => {
  if (!elements.recommendedList || !items) return;

  if (items.length === 0) {
    elements.recommendedList.innerHTML =
      '<p class="loading-indicator">No recommendations found.</p>';
    return;
  }

  // Use Standard Bento Grid (Global Style)
  elements.recommendedList.innerHTML = `
    <div class="bento-grid">
        ${items
          .map(
            (item, index) => `
            <a href="${item.links.read || item.links.paper || "#"}" target="_blank" class="bento-card reveal group" style="transition-delay: ${index * 100}ms; text-decoration: none;">
                <div class="bento-content">
                    <div class="flex justify-between items-start">
                        <span class="bento-tag">${item.venue || "Read"}</span>
                        <span class="text-neutral-600 font-mono text-xs">${item.year}</span>
                    </div>

                    <h3 class="bento-title group-hover:text-white transition-colors">${item.title}</h3>
                    <p class="bento-desc text-sm">by ${item.authors}</p>
                    <p class="bento-desc line-clamp-3">${item.abstract}</p>

                    <div class="bento-link mt-auto group-hover:translate-x-1 transition-transform">Read Now</div>
                </div>
            </a>
        `,
          )
          .join("")}
    </div>
  `;
};

export const renderEducation = (education) => {
  if (!elements.educationList || !education) return;

  elements.educationList.innerHTML = education
    .map(
      (edu, index) => `
    <div class="education-item reveal" style="transition-delay: ${index * 100}ms">
      <div class="edu-header">
        <h3 class="edu-degree">${edu.degree}</h3>
        <span class="edu-period">${edu.period}</span>
      </div>
      <div class="edu-institution">${edu.institution}</div>
      <div class="edu-location">
        <svg class="edu-loc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        ${edu.location}
      </div>
      <p class="edu-desc">${edu.description}</p>
    </div>
  `,
    )
    .join("");
};
