import * as model from "./model.js";
import { applyTheme as viewApplyTheme } from "./view.js";

/**
 * Theme Management System - LIGHT MODE ONLY
 * Enforces light theme across the application.
 */

export const applyTheme = (theme) => {
  // Always force light
  const targetTheme = "light";
  document.documentElement.dataset.theme = targetTheme;
  viewApplyTheme(targetTheme);
};

export const initTheme = () => {
  // Force light mode
  model.setTheme("light");
  applyTheme("light");

  // Remove old listeners logic as we only support light mode
};
