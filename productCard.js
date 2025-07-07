// productCard.js
export function createProductCard(product) {
  const dollarPrice = Math.ceil(product.price * 0.024);
  const sizesStr = Object.keys(product.sizes).map(s => s.toUpperCase()).join(', ');

  const card = document.createElement('article');
  card.className = 'card loading'; // Добавляем класс loading изначально

  const hasSecondImage = product.images[1];

  card.innerHTML = `
    <a href="/product/?id=${product.id}" class="product-img">
      <img src="${product.images[0] || ''}" alt="${product.name}">
      ${hasSecondImage ? `<img src="${product.images[1]}" alt="${product.name}">` : ''}
      <div class="loader"></div>
    </a>
    <div class="product-info">
      <a href="/product/?id=${product.id}" class="product-title outfit-card-title">${product.name}</a>
      <span class="product-sizes outfit-card-sizes">${sizesStr}</span>
      <p class="product-price outfit-card-price">${dollarPrice} $ / ${product.price} ₴</p>
    </div>
  `;

  // Обработка загрузки изображений
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

  return card;
}