/**
 * Header Component
 * Navigation header with mobile menu support
 */

export const headerHTML = `
    <nav class="nav container" aria-label="Main Navigation">
      <a href="index.html" class="nav-logo" aria-label="Tanvir Rahman Home">
        tanvir<span class="logo-dot">.</span>
      </a>
      <div class="nav-right">
        <ul class="nav-list" role="list">
          <li><a href="about.html" class="nav-link">about</a></li>
          <li><a href="projects.html" class="nav-link">projects</a></li>
          <li><a href="research.html" class="nav-link">research</a></li>
          <li><a href="contact.html" class="nav-link">contact</a></li>
        </ul>

        <button id="mobile-menu-btn" class="mobile-menu-btn" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobile-nav">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </nav>
    <div class="mobile-nav" id="mobile-nav" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div class="mobile-nav-content" role="list">
        <a href="index.html" class="mobile-nav-link">home</a>
        <a href="about.html" class="mobile-nav-link">about</a>
        <a href="projects.html" class="mobile-nav-link">projects</a>
        <a href="research.html" class="mobile-nav-link">research</a>
        <a href="contact.html" class="mobile-nav-link">contact</a>
      </div>
    </div>
  `;

export const initMobileMenu = () => {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileNav = document.getElementById("mobile-nav");

  if (!menuBtn || !mobileNav) return;

  const toggleMenu = (forceClose = null) => {
    const isNowActive =
      forceClose === null
        ? !mobileNav.classList.contains("active")
        : !forceClose;

    menuBtn.setAttribute("aria-expanded", isNowActive);
    menuBtn.classList.toggle("active", isNowActive);
    mobileNav.classList.toggle("active", isNowActive);
    document.body.style.overflow = isNowActive ? "hidden" : "";
  };

  menuBtn.addEventListener("click", () => toggleMenu());

  // Close menu when a link is clicked
  const mobileLinks = mobileNav.querySelectorAll(".mobile-nav-link");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMenu(true));
  });

  // Close on ESC key
  globalThis.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav.classList.contains("active")) {
      toggleMenu(true);
    }
  });
};

export const setActiveNavLink = () => {
  const currentPath =
    globalThis.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const hrefBase = href.split("#")[0];
    let isActive = false;

    // Home logic
    if (hrefBase === "index.html" || hrefBase === "") {
      isActive = currentPath === "index.html" || currentPath === "";
    } else {
      // Default exact match
      isActive = hrefBase === currentPath;
    }

    if (isActive) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
};
