/**
 * Reusable UI Templates
 * Template functions for generating consistent UI components
 */

/**
 * Status/Category Badge
 */
export const badge = (label, type = "default", extraClass = "") => {
  const types = {
    default: "bg-tertiary/20 border-main text-secondary/60",
    success:
      "bg-accent-emerald/10 border-accent-emerald/20 text-accent-emerald",
    accent: "bg-accent-indigo/10 border-accent-indigo/20 text-accent-indigo",
    note: "bg-accent-rose/10 border-accent-rose/20 text-accent-rose",
  };

  const themeClass = types[type] || types.default;
  const pulse =
    type === "success"
      ? `
      <span class="relative flex h-2 w-2 mr-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald/40 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald"></span>
      </span>`
      : "";

  return `
      <div class="inline-flex items-center px-3 py-1 rounded-full border backdrop-blur-md text-[9px] font-bold uppercase tracking-[0.2em] ${themeClass} ${extraClass}">
        ${pulse}${label}
      </div>
    `;
};

/**
 * Quick Fact / Stat Card - Minimal Horizontal Design
 */
export const fact = (fact, index = 0) => {
  return `
          <div class="group py-5 md:py-6 px-4 md:px-6 text-center transition-all duration-500 reveal hover:bg-secondary/20" style="transition-delay: ${index * 100}ms">
              <p class="text-base md:text-lg lg:text-xl font-semibold text-primary tracking-tight mb-1 group-hover:text-accent-indigo transition-colors">${fact.value}</p>
              <h3 class="text-[8px] md:text-[9px] font-medium text-secondary/40 uppercase tracking-[0.2em]">${fact.label}</h3>
          </div>
        `;
};

/**
 * Skill Category Group
 */
export const skillGroup = (group) => {
  return `
    <div class="skills-category reveal">
      <h3 class="skills-cat-title">${group.category}</h3>
      <div class="skills-items">
        ${group.items
          .map((item) => `<div class="skill-item">${item}</div>`)
          .join("")}
      </div>
    </div>
  `;
};

/**
 * Certification Item
 */
export const certification = (cert, index = 0) => {
  return `
    <div class="cert-item reveal" style="transition-delay: ${index * 100}ms" tabindex="0" data-url="${cert.url}" role="button">
      <div class="cert-details">
        <h3 class="cert-name">${cert.name}</h3>
        <span class="cert-issuer">${cert.issuer}</span>
      </div>
      <div class="cert-meta">
        <span class="cert-date">${cert.date}</span>
        <svg class="cert-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
      </div>
    </div>
  `;
};

/**
 * Card Component - Projects Layout
 * Renders project cards in bento grid format
 */
export const card = (data, layout = "project") => {
  const { id, title, desc, tag, date, url, thumbnail, readingTime, size } =
    data;

  // PROJECT (BENTO) LAYOUT
  const sizeMap = { large: "bento-large", wide: "bento-wide" };
  const sizeClass = sizeMap[size] || "bento-normal";
  return `
      <a href="${url}" class="bento-card ${sizeClass} github-project reveal group" data-tilt>
        <div class="bento-content">
          <div class="bento-header">
              <span class="bento-tag">${tag}</span>
              <h3 class="bento-title group-hover:text-accent-indigo transition-colors">${title}</h3>
          </div>
          <p class="bento-desc">${desc}</p>
          <div class="bento-link group-hover:text-accent-indigo">
            <span>View Project</span>
            <span class="link-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </span>
          </div>
        </div>
        ${data.icon ? `<div class="bento-visual opacity-10 group-hover:opacity-20 transition-opacity">${data.icon}</div>` : ""}
      </a>
    `;
};

/**
 * Featured Project Card — Rich card style for projects page
 */
export const featuredCard = (data, index = 0) => {
  const { title, desc, tag, url, icon } = data;
  return `
    <a href="${url}" class="project-featured-card reveal" style="transition-delay: ${index * 100}ms">
      ${icon ? `<div class="card-icon">${icon}</div>` : ""}
      <div>
        <div class="card-tag">${tag}</div>
        <h3 class="card-title">${title}</h3>
        <p class="card-desc">${desc}</p>
      </div>
      <div class="card-footer">
        <span class="card-link-label">View Project</span>
        <span class="card-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </span>
      </div>
      ${icon ? `<div class="card-bg-visual">${icon}</div>` : ""}
    </a>
  `;
};

/**
 * Loading Skeleton Component
 */
export const skeleton = (type = "list") => {
  if (type === "article") {
    return `
        <div class="animate-pulse space-y-8 max-w-3xl mx-auto">
          <div class="h-12 bg-secondary/40 rounded-xl w-3/4"></div>
          <div class="space-y-3">
             <div class="h-4 bg-secondary/20 rounded w-full"></div>
             <div class="h-4 bg-secondary/20 rounded w-5/6"></div>
             <div class="h-4 bg-secondary/20 rounded w-4/6"></div>
          </div>
          <div class="h-64 bg-secondary/20 rounded-3xl w-full"></div>
        </div>
      `;
  }
  return `<div class="animate-pulse bg-secondary/20 rounded-2xl h-32 w-full"></div>`;
};
