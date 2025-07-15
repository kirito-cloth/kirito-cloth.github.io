function getScrollbarWidth() {
  // Создаем временный элемент
  const tempDiv = document.createElement('div');

  // Добавляем элемент в DOM и устанавливаем overflow: scroll
  tempDiv.style.overflow = 'scroll';
  tempDiv.style.width = '100px';
  tempDiv.style.height = '100px';
  tempDiv.style.visibility = 'hidden';
  document.body.appendChild(tempDiv);

  // Получаем ширину скроллбара
  const scrollbarWidth = tempDiv.offsetWidth - tempDiv.clientWidth;

  // Удаляем временный элемент
  document.body.removeChild(tempDiv);

  return scrollbarWidth;
}

export function disableScroll() {
  document.body.style.paddingRight = getScrollbarWidth() + 'px';
  document.body.style.overflow = 'hidden';
  document.querySelector('header .content').style.marginRight = getScrollbarWidth() + 'px';
  document.querySelector('header').classList.add('filters-opened')
}

export function enableScroll() {
  document.body.style.paddingRight = 0 + 'px';
  document.body.style.overflow = 'auto';
  document.querySelector('header .content').style.marginRight = 0 + 'px';
  document.querySelector('header').classList.remove('filters-opened')
}

