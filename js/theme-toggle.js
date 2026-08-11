const THEME_STORAGE_KEY = 'dashboard_theme';
const THEME_BUTTON_ID = 'theme-toggle-button';
const THEME_BUTTON_CLASS = 'theme-toggle-btn';

const LABELS = {
  light: '☀️ Claro',
  dark: '🌙 Oscuro',
};

function getStoredTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY);
}

function getSystemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme() {
  return getStoredTheme() || getSystemTheme();
}

function updateThemeButton(theme) {
  const button = document.getElementById(THEME_BUTTON_ID);
  if (!button) return;

  button.textContent = LABELS[theme] || LABELS.light;
  button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle('dark-mode', theme === 'dark');
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  updateThemeButton(theme);
}

function createThemeToggleButton() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return null;

  const button = document.createElement('button');
  button.type = 'button';
  button.id = THEME_BUTTON_ID;
  button.className = THEME_BUTTON_CLASS;
  button.setAttribute('aria-label', 'Alternar modo claro y oscuro');
  button.setAttribute('aria-pressed', 'false');

  const userSection = topbar.querySelector('.topbar__user');
  if (userSection) {
    topbar.insertBefore(button, userSection);
  } else {
    topbar.appendChild(button);
  }
  return button;
}

function initThemeToggle() {
  const theme = resolveTheme();
  const button = document.getElementById(THEME_BUTTON_ID) || createThemeToggleButton();

  if (button) {
    button.addEventListener('click', () => {
      const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  applyTheme(theme);
}

initThemeToggle();

export { initThemeToggle, applyTheme };
