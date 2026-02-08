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
 * Polymorphic Card Component
 * Supports Bento (Project), Note, and Resource layouts.
 */
export const card = (data, layout = "note") => {
  const { id, title, desc, tag, date, url, thumbnail, readingTime, size } =
    data;

  // 1. PROJECT (BENTO) LAYOUT
  if (layout === "project") {
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
              View Project
            </div>
          </div>
          ${data.icon ? `<div class="bento-visual opacity-10 group-hover:opacity-20 transition-opacity">${data.icon}</div>` : ""}
        </a>
      `;
  }

  // 2. NOTE (GRID) LAYOUT
  if (layout === "note") {
    const displayTag = tag || (data.tags && data.tags[0]) || "Note";
    return `
        <a href="notes.html#${id}" class="group relative p-8 bg-secondary/20 border border-main/10 rounded-3xl hover:bg-secondary/40 hover:border-accent-rose/20 transition-all duration-500 reveal">
          <div class="flex justify-between items-start mb-6">
            <span class="text-[9px] font-bold uppercase tracking-[0.4em] text-accent-rose/60">${displayTag}</span>
            <span class="text-[9px] font-bold uppercase tracking-[0.3em] text-secondary/30">${date}</span>
          </div>
          <h3 class="text-xl md:text-2xl font-serif italic text-primary group-hover:text-accent-rose transition-colors mb-8">${title}</h3>
          <div class="flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 group-hover:text-primary transition-colors">
            Read Article <span class="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </div>
        </a>
      `;
  }

  // 3. RESOURCE (LIST) LAYOUT
  if (layout === "resource") {
    return `
        <article class="resource-item group flex flex-col md:flex-row gap-8 py-8 border-b border-main/10 hover:bg-secondary/5 transition-all duration-300 transform reveal" data-resource-id="${id}" role="button" tabindex="0">
          ${
            thumbnail
              ? `
          <div class="shrink-0 w-full md:w-48 h-32 overflow-hidden rounded-2xl bg-tertiary/10">
              <img src="${thumbnail}" alt="${title}" class="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110" loading="lazy" />
          </div>`
              : ""
          }
          <div class="flex-1 flex flex-col justify-center">
              <div class="mb-2">
                <span class="text-[9px] font-black uppercase tracking-[0.4em] text-accent-indigo/60">${tag || "Resource"}</span>
              </div>
              <h3 class="text-2xl font-bold tracking-tight text-primary mb-3 group-hover:text-accent-indigo transition-colors">${title}</h3>
              <p class="text-sm font-light text-secondary/60 leading-relaxed mb-4 max-w-2xl">${desc || readingTime || "A curated resource for developers."}</p>
              <div class="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-secondary/30">
                <span>${date}</span>
              </div>
          </div>
        </article>
      `;
  }
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
