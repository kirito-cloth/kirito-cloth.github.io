export function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

export function disableScroll() {
  let scrollbarWidth = getScrollbarWidth();

  if (scrollbarWidth === 0) {
    // Подставим типичную ширину
    scrollbarWidth = 15.1;
  }

  document.body.style.paddingRight = `${scrollbarWidth}px`;
  const header = document.querySelector('header .content');
  if (header) header.style.marginRight = `${scrollbarWidth}px`;

  requestAnimationFrame(() => {
    document.body.classList.add('no-scroll');
  });

  document.querySelector('header').classList.add('filters-opened');
}


export function enableScroll() {
  document.body.classList.remove('no-scroll');
  document.body.style.paddingRight = '';

  const header = document.querySelector('header .content');
  if (header) {
    header.style.marginRight = '';
  }

  document.querySelector('header').classList.remove('filters-opened');
}
