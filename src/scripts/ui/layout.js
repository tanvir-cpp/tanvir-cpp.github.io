/**
 * Layout Components
 * Reusable structural elements (scroll progress, grid background)
 */

export const scrollProgressHTML = `
  <div class="scroll-progress-container">
    <div class="scroll-progress-bar" id="progress-bar"></div>
  </div>
`;

export const gridBackgroundHTML = `
  <div class="grid-background">
    <div class="grid-line"></div>
    <div class="grid-line"></div>
    <div class="grid-line"></div>
    <div class="grid-line"></div>
    <div class="grid-line"></div>
    <div class="grid-line"></div>
    <div class="grid-line"></div>
    <div class="grid-line"></div>
  </div>
`;

export const initLayoutComponents = () => {
  // Inject scroll progress if not present
  if (!document.querySelector(".scroll-progress-container")) {
    document.body.insertAdjacentHTML("afterbegin", scrollProgressHTML);
  }

  // Inject grid background if not present
  if (!document.querySelector(".grid-background")) {
    document.body.insertAdjacentHTML("afterbegin", gridBackgroundHTML);
  }
};
