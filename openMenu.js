export function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

export function disableScroll() {
  document.body.classList.add('no-scroll');
  document.querySelector('header').classList.add('filters-opened');
}

export function enableScroll() {
  document.body.classList.remove('no-scroll');
  document.querySelector('header').classList.remove('filters-opened');
}

