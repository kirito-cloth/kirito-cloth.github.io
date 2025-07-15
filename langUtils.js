// langUtils.js

export function getCurrentLang() {
  const path = window.location.pathname;
  const firstSegment = path.split('/')[1];
  if (['ru', 'en'].includes(firstSegment)) return firstSegment;
  return 'ua'; // по умолчанию — украинский
}

export function getLangLabel(lang) {
  switch (lang) {
    case 'ru': return 'RU';
    case 'en': return 'EN';
    default: return 'UA';
  }
}

export function withLangPrefix(path, lang = getCurrentLang()) {
  if (lang === 'ua') return path;
  return `/${lang}${path.startsWith('/') ? path : '/' + path}`;
}

// === ДОБАВЬ: переключение языка ===

export function setupLangSwitcher() {
  document.querySelectorAll('[data-lang]').forEach(link => {
    link.addEventListener('click', () => {
      const selectedLang = link.dataset.lang; // '' | 'ru' | 'en'

      const path = window.location.pathname;
      const pathWithoutLang = path.replace(/^\/(ru|en)/, '');

      const newPath =
        selectedLang === '' ? pathWithoutLang : `/${selectedLang}${pathWithoutLang}`;

      window.location.pathname = newPath;
    });
  });
}
