/**
 * Reusable UI Templates
 * Template functions for generating consistent UI components
 */

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
