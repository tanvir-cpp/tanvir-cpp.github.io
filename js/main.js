document.addEventListener("DOMContentLoaded", () => {
  const page = globalThis.location.pathname;
  const isHome = page === "/" || page.endsWith("index.html") || page === "";
  const isResume = page.includes("resume");

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.error(`Fetch error for ${url}:`, err);
      return null;
    }
  };

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  };

  const renderConfig = (config) => {
    if (!config) return;
    document.querySelectorAll("[data-config]").forEach((el) => {
      const path = el.dataset.config;
      const val = getNestedValue(config, path) || config[path];

      if (val !== undefined && val !== null) {
        if (el.tagName === "A") {
          if (path.includes("email")) {
            el.href = `mailto:${val}`;
          } else {
            el.href = val;
          }
          // Only update text if empty or placeholder
          const currentText = el.innerText.trim().toLowerCase();
          if (currentText === "" || currentText.includes("@") || currentText === "loading..." || currentText === "link" || currentText === "connect" || currentText === "contact") {
            el.innerText = val;
          }
        } else if (el.tagName === "IMG") {
          el.src = val;
        } else {
          el.innerHTML = val;
        }
      }
    });

    // Special handling for dual name (Tanvir Rahman) across nav/hero
    if (config.name) {
      document.querySelectorAll("[id$='first-name']").forEach(el => el.innerText = config.name.first);
      document.querySelectorAll("[id$='last-name']").forEach(el => el.innerText = config.name.last);
    }
  };

  const renderHomeHero = (hero) => {
    if (!hero) return;
    ["badge", "title", "description"].forEach(f => {
      const el = document.getElementById(`hero-${f}`);
      if (el && hero[f]) el.innerHTML = hero[f];
    });
  };

  const renderHomeStats = (stats) => {
    const statsEl = document.getElementById("about-stats");
    if (!statsEl || !stats) return;

    statsEl.innerHTML = stats.map((s, index) => {
      const isLast = index === stats.length - 1;
      const bgClass = isLast ? "bg-accent-indigo" : "bg-white";
      const textClass = isLast ? "text-white" : "text-primary";
      const labelClass = isLast ? "text-white/60" : "text-secondary/70";
      const borderClass = isLast ? "border-accent-indigo" : "border-border-main";

      return `
        <div class="aspect-square p-6 ${bgClass} border ${borderClass} rounded-none flex flex-col justify-end transition-transform duration-500 hover:-translate-y-1">
          <h3 class="text-3xl font-bold tracking-tighter ${textClass} mb-1">${s.value}</h3>
          <p class="text-[9px] font-bold uppercase tracking-widest ${labelClass}">${s.label}</p>
        </div>`;
    }).join("");
  };

  const renderHomeSkills = (skills) => {
    if (!skills) return;
    Object.entries(skills).forEach(([key, list]) => {
      const container = document.getElementById(`home-skills-${key}`);
      if (container) {
        container.innerHTML = list.map(s => `
          <div class="px-5 py-2.5 bg-tertiary/10 border border-border-main rounded-none transition-all duration-300 hover:border-accent-indigo hover:bg-white group cursor-default">
            <span class="text-xs font-bold uppercase tracking-widest text-secondary group-hover:text-accent-indigo transition-colors">${s}</span>
          </div>
        `).join("");
      }
    });
  };

  const renderHome = (config) => {
    if (!config || !isHome) return;

    // About Summary
    if (config.about?.summary) {
      const summaryEl = document.getElementById("about-summary");
      if (summaryEl) {
        summaryEl.innerHTML = config.about.summary.map(p => `<p>${p}</p>`).join("");
      }
    }

    renderHomeStats(config.about?.stats);
    renderHomeHero(config.hero);
    renderHomeSkills(config.skills);

    // Misc items
    if (config.email) {
      const emailEl = document.getElementById("contact-email");
      if (emailEl) {
        emailEl.textContent = config.email;
        emailEl.href = `mailto:${config.email}`;
      }
    }

    if (config.internshipStatus) {
      const statusEl = document.getElementById("internship-status");
      if (statusEl) statusEl.innerText = config.internshipStatus;
    }
  };

  const renderResume = (config) => {
    if (!config || !isResume) return;

    // About/Contact fields are handled by renderConfig

    // Experience
    if (config.experience) {
      const container = document.getElementById("resume-experience");
      if (container) {
        container.innerHTML = config.experience.map(exp => `
          <div class="print:mb-1 group hover:bg-zinc-50/50 p-4 -mx-4 rounded-xl transition-colors">
            <div class="flex justify-between items-baseline mb-1 print:mb-0">
              <h3 class="text-lg font-bold print:text-sm">${exp.role}</h3>
              <span class="text-[10px] font-bold whitespace-nowrap print:text-[8px]">${exp.period}</span>
            </div>
            <div class="flex justify-between items-baseline mb-3 print:mb-1">
              <p class="text-xs font-bold text-secondary uppercase tracking-wider print:text-[9px] group-hover:text-accent-indigo transition-colors">
                ${exp.company}
              </p>
              <p class="text-[9px] text-secondary/60 italic font-mono print:text-[8px]">
                ${exp.location}
              </p>
            </div>
            <ul class="space-y-2 mb-4 print:space-y-0.5 print:mb-1">
              ${exp.bullets.map(b => `
                <li class="relative pl-4 text-xs font-medium leading-[1.6] text-secondary/80 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-accent-indigo print:text-[10px] print:leading-tight">
                  ${b}
                </li>`).join("")}
            </ul>
          </div>
        `).join("");
      }
    }

    // Education
    if (config.education) {
      const container = document.getElementById("resume-education");
      if (container) {
        container.innerHTML = config.education.map(edu => `
          <div>
            <div class="flex justify-between items-baseline mb-1 print:mb-0">
              <h3 class="text-lg font-bold print:text-sm">${edu.degree}</h3>
              <span class="text-[10px] font-bold print:text-[8px]">${edu.period}</span>
            </div>
            <div class="flex justify-between items-baseline mb-2 print:mb-1">
              <p class="text-xs font-bold text-secondary uppercase tracking-wider print:text-[9px]">
                ${edu.school}
              </p>
              <p class="text-[9px] text-secondary/60 italic font-mono print:text-[8px]">
                ${edu.location}
              </p>
            </div>
            <p class="text-xs font-medium leading-relaxed text-secondary/80 print:text-[10px] print:leading-tight">
              ${edu.description}
            </p>
          </div>
        `).join("");
      }
    }

    // Skills (detailed)
    if (config.skills) {
      Object.entries(config.skills).forEach(([key, list]) => {
        const container = document.getElementById(`resume-skills-${key}`);
        if (container) {
          container.innerHTML = list.map(s => `
          <span class="px-2 py-1 bg-zinc-100 text-[10px] font-bold text-secondary uppercase tracking-wider rounded-none print:px-0 print:bg-transparent print:text-[10px] print:mr-2 print:after:content-['•'] last:print:after:content-['']">
            ${s}
          </span>
        `).join("");
        }
      });
    }

    // Awards
    if (config.awards) {
      const container = document.getElementById("resume-awards");
      if (container) {
        container.innerHTML = config.awards.map(a => `
          <li class="relative pl-4 text-xs font-medium leading-relaxed text-secondary/80 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-accent-indigo print:text-[10px] print:leading-tight">
            ${a}
          </li>
        `).join("");
      }
    }
  };

  const renderProjects = async (projects) => {
    if (!projects) return;

    const projectsContainer = document.getElementById("featured-projects") || document.getElementById("all-projects");
    const isHome = page === "index.html" || page === "";

    if (projectsContainer) {
      // Sort projects by date descending (newest first)
      projects.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

      const isScroller = projectsContainer.id === "featured-projects";
      const displayProjects = isHome ? projects.filter((p) => p.featured).slice(0, 6) : projects;

      projectsContainer.innerHTML = displayProjects
        .map(
          (p) => `
        <div class="group relative aspect-square overflow-hidden bg-gray-100 cursor-pointer transition-all duration-500 
                    ${isScroller ? 'flex-shrink-0 snap-start w-full md:w-1/2 lg:w-1/3' : 'w-full'}">
          <img src="${p.heroImage || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200"}" 
               alt="${p.title}" 
               class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end transition-opacity duration-500">
            <h3 class="text-white font-bold text-lg mb-1 group-hover:text-accent-indigo transition-colors">${p.title}</h3>
            <p class="text-white/70 text-[10px] mb-4 line-clamp-2">${p.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
               ${(p.tags || []).slice(0, 2).map(t => `<span class="text-[8px] font-bold text-white/50 uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded-none">${t}</span>`).join('')}
            </div>
            <div class="flex gap-3">
               ${p.github ? `<a href="${p.github}" target="_blank" class="text-white/50 hover:text-white transition-colors" title="GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>` : ""}
               ${p.demo ? `<a href="${p.demo}" target="_blank" class="text-white/50 hover:text-white transition-colors" title="Launch Demo"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" x2="21" y1="14" y2="3"></line></svg></a>` : ""}
            </div>
          </div>
        </div>`
        )
        .join("");
    }

    // Check if we are on the project detail page by looking for the content container

  };

  const initMobileMenu = () => {
    const btn = document.querySelector("button[aria-label='Open menu']") || document.getElementById("menu-btn");
    const menu = document.getElementById("mobile-menu");
    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
      const isHidden = menu.classList.contains("hidden");
      menu.classList.toggle("hidden", !isHidden);
      menu.classList.toggle("flex", isHidden);
    });
  };

  const initRevealObserver = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const observeNew = () => {
      document.querySelectorAll(".reveal:not(.active)").forEach((el) => observer.observe(el));
    };

    observeNew();
    new MutationObserver(observeNew).observe(document.body, { childList: true, subtree: true });
  };

  const renderNavbar = async (config) => {
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    if (!navbarPlaceholder) return;

    try {
      const response = await fetch("components/navbar.html");
      if (!response.ok) throw new Error("Navbar load failed");
      const html = await response.text();
      navbarPlaceholder.innerHTML = html;

      // Re-run config rendering to populate dynamic names in navbar
      if (config) renderConfig(config);

      // Initialize icons for the newly injected navbar if any
      if (globalThis.lucide) globalThis.lucide.createIcons();

      // Active link styling
      const currentPath = globalThis.location.pathname.split("/").pop() || "index.html";
      navbarPlaceholder.querySelectorAll("a").forEach(a => {
        const href = a.getAttribute("href");
        if (href === currentPath) {
          a.classList.add("text-accent-indigo");
        }
      });

    } catch (err) {
      console.error("Navbar error:", err);
    }
  };

  const renderFooter = async (config) => {
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (!footerPlaceholder) return;

    try {
      const response = await fetch("components/footer.html");
      if (!response.ok) throw new Error("Footer load failed");
      const html = await response.text();
      footerPlaceholder.innerHTML = html;

      if (config) renderConfig(config);

      // Page specific footer adjustments
      const quoteEl = footerPlaceholder.querySelector("#footer-quote");
      if (quoteEl && page !== "index.html") {
        quoteEl.classList.add("hidden");
      }

    } catch (err) {
      console.error("Footer error:", err);
    }
  };

  const initProjectScroller = () => {
    const scroller = document.getElementById("featured-projects");
    const nextBtn = document.getElementById("next-project");
    const prevBtn = document.getElementById("prev-project");

    if (!scroller || !nextBtn || !prevBtn) return;

    nextBtn.addEventListener("click", () => {
      scroller.scrollBy({ left: scroller.clientWidth, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      scroller.scrollBy({ left: -scroller.clientWidth, behavior: "smooth" });
    });
  };

  const initApp = async () => {
    try {
      const [config, projects] = await Promise.all([
        fetchData("data/userconfig.json"),
        fetchData("data/projects.json"),
      ]);

      await Promise.all([
        renderNavbar(config),
        renderFooter(config)
      ]);

      renderConfig(config);
      renderHome(config);
      renderResume(config);
      renderProjects(projects);
      initMobileMenu();
      initRevealObserver();
      initProjectScroller();

      // Final icon catch-all for anything in the main body
      if (globalThis.lucide) globalThis.lucide.createIcons();
    } catch (err) {
      console.error("Init failed:", err);
    }
  };

  initApp();
});
