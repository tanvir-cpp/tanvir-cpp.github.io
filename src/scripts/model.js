import { DATA_PATHS } from "./constants.js";

/**
 * Private state object - not directly exported to prevent external mutations.
 * Access state through getter functions for encapsulation.
 */
const _state = {
  researchPapers: [],
  config: null,
  projects: [],
  cache: new Map(),
};

// Specific getters for commonly accessed values

/**
 * Initialize model - must be called explicitly.
 * Pre-fetches client IP in background (non-blocking).
 */
export const initModel = async () => {
  // Model initialization
};

export const fetchResearchPapers = async () => {
  if (_state.researchPapers.length > 0) return _state.researchPapers;
  try {
    const response = await fetch(DATA_PATHS.PAPERS);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    _state.researchPapers = data;
    return _state.researchPapers;
  } catch (error) {
    console.error("Error fetching research papers:", error);
    return [];
  }
};

export const fetchConfig = async () => {
  if (_state.config) return _state.config;
  try {
    const response = await fetch(DATA_PATHS.CONFIG);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    _state.config = await response.json();
    return _state.config;
  } catch (error) {
    console.error("Error fetching config:", error);
    return null;
  }
};

export const fetchProjects = async () => {
  if (_state.projects.length > 0) return _state.projects;
  try {
    const response = await fetch(DATA_PATHS.PROJECTS);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    _state.projects = data;
    return _state.projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};
