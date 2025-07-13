import { createProductCard } from '/productCard.js';
import { revealOnScroll } from '/scrollReveal.js';

Promise.all([
  fetch('/bestsellers.json').then(res => res.json()), // массив ID бестселлеров
  fetch('/products.json').then(res => res.json())     // все товары
])
.then(([bestsellers, products]) => {
  // Рендер бестселлеров
  const bestsellersContainer = document.querySelector('.bestsellers .cards-container');
  if (bestsellersContainer) {
    const bestsellersProducts = products.filter(product => bestsellers.includes(product.id));
    bestsellersProducts.forEach(product => {
      const card = createProductCard(product);
      bestsellersContainer.appendChild(card);
    });
  }

  // Рендер недавно просмотренных товаров
  const recentlyViewedIds = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
  const recentSection = document.querySelector('.recently-viewed');
  const recentContainer = recentSection?.querySelector('.cards-container');

  if (recentContainer && recentlyViewedIds.length > 0) {
    // Убираем дубли и ограничиваем максимум 4 товара
    const uniqueIds = [...new Set(recentlyViewedIds)].slice(0, 4);

    const recentProducts = uniqueIds
      .map(id => products.find(p => p.id === id))
      .filter(Boolean);

    recentProducts.forEach(product => {
      const card = createProductCard(product);
      recentContainer.appendChild(card);
    });
  } else if (recentSection) {
    // Если недавно просмотренных нет, скрываем или удаляем секцию
    // Вариант 1 — скрыть:
    // recentSection.style.display = 'none';

    // Вариант 2 — удалить из DOM:
    recentSection.remove();
  }

  revealOnScroll();
})
.catch(error => {
  console.error('Ошибка загрузки JSON:', error);
});
