import { ANIMATION } from "./constants.js";

let _revealObserver = null;

export const initEffects = () => {
  const progressBar = document.getElementById("progress-bar");

  // Keyboard Accessibility for elements with role="button"
  document.querySelectorAll('[role="button"]').forEach((btn) => {
    // Ensure it's focusable
    if (!btn.hasAttribute("tabindex")) {
      btn.setAttribute("tabindex", "0");
    }

    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Premium Header Scroll Effect
  const header = document.querySelector(".header");
  if (header) {
    const handleScroll = () => {
      if (globalThis.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    globalThis.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
  }

  // Scroll Progress Logic
  if (progressBar) {
    let ticking = false;

    globalThis.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          globalThis.requestAnimationFrame(() => {
            const winScroll =
              globalThis.scrollY || document.documentElement.scrollTop;
            const height =
              document.documentElement.scrollHeight -
              document.documentElement.clientHeight;
            const scrolled = height > 0 ? winScroll / height : 0;
            progressBar.style.transform = `scaleX(${scrolled})`;
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true },
    );
  }

  // Reveal Animation Logic (Intersection Observer)
  const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  };

  _revealObserver = new IntersectionObserver(revealCallback, {
    threshold: ANIMATION.REVEAL_THRESHOLD,
  });

  const startObserving = () => {
    document.querySelectorAll(".reveal").forEach((el) => {
      _revealObserver.observe(el);
    });
  };

  // Only start observing after splash screen is gone
  if (document.body.classList.contains("loaded")) {
    startObserving();
  } else {
    globalThis.addEventListener("page-reveal", startObserving, { once: true });
  }
};

/**
 * Observe a new element for reveal animation.
 * Must call initEffects() first.
 */
export const observeReveal = (el) => {
  if (!el) return;

  if (!_revealObserver) {
    // Fallback: just activate the element immediately
    el.classList.add("active");
    return;
  }

  _revealObserver.observe(el);

  // Check if element is already in viewport - use more lenient check
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const isInViewport =
    rect.top < windowHeight &&
    rect.bottom > 0 &&
    rect.left < windowWidth &&
    rect.right > 0;

  if (isInViewport) {
    el.classList.add("active");
  }
};
