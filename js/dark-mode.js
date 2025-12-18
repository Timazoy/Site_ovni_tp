(function(){
  const storageKey = 'site-dark-mode';
  const toggleId = 'dark-mode-toggle';

  function apply(isDark) {
    document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
    const btn = document.getElementById(toggleId);
    if (!btn) return;
    btn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
    btn.setAttribute('aria-pressed', String(isDark));
  }

  function init() {
    const saved = localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === null ? prefersDark : saved === 'true';
    apply(isDark);

    const btn = document.getElementById(toggleId);
    if (btn) {
      btn.addEventListener('click', () => {
        const nowDark = document.documentElement.getAttribute('data-bs-theme') !== 'dark';
        localStorage.setItem(storageKey, String(nowDark));
        apply(nowDark);
      });
    }

    window.addEventListener('storage', (e) => {
      if (e.key === storageKey) apply(e.newValue === 'true');
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
