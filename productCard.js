import { getFavorites, setFavorites, toggleFavorite } from '/favorites.js';
export function createProductCard(product) {
  const dollarPrice = Math.ceil(product.price * 0.024);
  const sizesStr = Object.keys(product.sizes).map(s => s.toUpperCase()).join(', ');

  // Проверяем, есть ли товар в избранных
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const isFavorite = favorites.includes(product.id);

  const card = document.createElement('article');
  card.className = 'card loading';

  card.innerHTML = `
    <a href="/product/?id=${product.id}" class="product-img">
      <img src="${product.images[0] || ''}" alt="${product.name}">
      ${product.images[1] ? `<img src="${product.images[1]}" alt="${product.name}">` : ''}
      <div class="loader"></div>
    </a>
    <div class="product-info">
      <a href="/product/?id=${product.id}" class="product-title outfit-card-title">${product.name}</a>
      <span class="product-sizes outfit-card-sizes">${sizesStr}</span>
      <p class="product-price outfit-card-price">${dollarPrice} $ / ${product.price} ₴</p>
      <label class="favorite-checkbox">
        <input type="checkbox" ${isFavorite ? 'checked' : ''} />
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="favorite-icon" fill="${isFavorite ? '#000' : 'none'}" stroke="${isFavorite ? 'none' : '#000'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px; height:24px;">
          <path d="M14,4c-2.2,0-4,1.8-4,4v36l14-8l14,8V8c0-2.2-1.8-4-4-4H14z"></path>
        </svg>
      </label>
    </div>
  `;

  // Обработка загрузки изображений (как было)
  const images = card.querySelectorAll('img');
  let loaded = 0;
  images.forEach(img => {
    if (img.complete) {
      loaded++;
    } else {
      img.addEventListener('load', () => {
        loaded++;
        if (loaded === images.length) {
          card.classList.remove('loading');
        }
      });
    }
  });

  if (loaded === images.length) {
    card.classList.remove('loading');
  }

  // Обработка клика по избранному
  const checkbox = card.querySelector('.favorite-checkbox input');
  checkbox.addEventListener('change', () => {
    toggleFavorite(product.id);
    console.log('Favorites after toggle:', getFavorites());
  });

  return card;
}
