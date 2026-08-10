(() => {
  const storageKey = 'crtech-theme';
  const root = document.documentElement;
  const supportedThemes = new Set(['theme-1', 'theme-2', 'theme-3']);

  const applyTheme = (theme) => {
    const selectedTheme = supportedThemes.has(theme) ? theme : 'theme-1';
    root.dataset.theme = selectedTheme;
    document.querySelectorAll('[data-theme-switcher]').forEach((selector) => {
      selector.value = selectedTheme;
    });
  };

  try {
    applyTheme(localStorage.getItem(storageKey) || 'theme-1');
  } catch {
    applyTheme('theme-1');
  }

  document.addEventListener('change', (event) => {
    if (!event.target.matches('[data-theme-switcher]')) return;
    applyTheme(event.target.value);
    try {
      localStorage.setItem(storageKey, event.target.value);
    } catch {
      // El selector sigue funcionando aunque el almacenamiento no esté disponible.
    }
  });
})();
